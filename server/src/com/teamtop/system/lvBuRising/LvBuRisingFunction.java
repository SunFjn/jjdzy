package com.teamtop.system.lvBuRising;

import java.util.Iterator;
import java.util.List;
import java.util.Set;

import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.LvBuRisingOpTaskRunable;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.lvBuRising.model.LvBuRisingModel;
import com.teamtop.system.lvBuRising.model.LvBuRisingRankModel;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_lbjl_250;
import excel.config.Config_lbjlpoint_250;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_lbjl_250;
import excel.struct.Struct_lbjlpoint_250;

public class LvBuRisingFunction {

	private static LvBuRisingFunction ins;

	private LvBuRisingFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized LvBuRisingFunction getIns() {
		if (ins == null) {
			ins = new LvBuRisingFunction();
		}
		return ins;
	}

	public void changeScore(Hero hero, int score) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, LvBuRisingConst.SysId)) {
				return;
			}
			LvBuRisingModel model = hero.getLvBuRisingModel();
			model.setScore(score);
			refreshRanking(hero, score);
			updateRedPoint(hero);
		} catch (Exception e) {
			LogTool.error(e, LvBuRisingFunction.class, hero.getId(), hero.getName(), "LvBuRisingFunction addScore");
		}
	}

	/**
	 * 刷新排行榜
	 * 
	 * @param hero
	 * @param score
	 */
	public void refreshRanking(Hero hero, int score) {
		OpTaskExecutorService.PublicOrderService.execute(new LvBuRisingOpTaskRunable() {

			@Override
			public void run() {
				refreshRankingHandle(hero, score);
			}

			@Override
			public Object getSession() {
				return hero.getId();
			}
		});
	}

	/**
	 * 刷新排行
	 * 
	 * @param hero
	 */
	private void refreshRankingHandle(Hero hero, int score) {
		try {
			LvBuRisingRankModel newModel = new LvBuRisingRankModel();
			newModel.setHid(hero.getId());
			newModel.setName(hero.getNameZoneid());
			newModel.setJob(hero.getJob());
			newModel.setLevel(hero.getLevel());
			newModel.setVipLvl(hero.getVipLv());
			newModel.setIcon(hero.getIcon());
			newModel.setFrame(hero.getFrame());
			newModel.setShowCountry(hero.getCountryType());
			newModel.setScore(score);
			newModel.setZoneid(hero.getZoneid());
			newModel.setCreateTime(TimeDateUtil.getCurrentTime());
			Iterator<LvBuRisingRankModel> iterator = LvBuRisingCache.rankSet.iterator();
			LvBuRisingRankModel rankModel = null;
			LvBuRisingRankModel oldRank = null;
			for (; iterator.hasNext();) {
				rankModel = iterator.next();
				if (rankModel.getHid() == hero.getId()) {
					oldRank = rankModel;
					iterator.remove();
					break;
				}
			}
			if (oldRank != null) {
				LvBuRisingCache.rankSet.add(newModel);
			} else {
				int size = LvBuRisingCache.rankSet.size();
				if (size < LvBuRisingConst.RANK_SIZE) {
					LvBuRisingCache.rankSet.add(newModel);
				} else {
					LvBuRisingRankModel last = LvBuRisingCache.rankSet.last();
					if (last.getScore() >= newModel.getScore()) {
						return;
					}
					LvBuRisingCache.rankSet.add(newModel);
					// LvBuRisingCache.rankSet.remove(LvBuRisingCache.rankSet.last());
					LvBuRisingCache.rankSet.pollLast();
				}
			}
		} catch (Exception e) {
			LogTool.error(e, LvBuRisingFunction.class, hero.getId(), hero.getName(),
					"LvBuRisingFunction refreshRanking");
		}
	}

	/**
	 * 发放排行奖励
	 */
	public void sendRankingAward() {
		try {
			Iterator<LvBuRisingRankModel> iterator = LvBuRisingCache.rankSet.iterator();
			int ranking = 1;
			LvBuRisingRankModel model = null;
			int mailId = MailConst.MAIL_ID_LVBURISING;
			for (; iterator.hasNext();) {
				model = iterator.next();
				try {
					long hid = model.getHid();
					int[][] reward = getReward(ranking, model.getScore());
					MailFunction.getIns().sendMailWithFujianData2(hid, mailId, new Object[] { mailId, ranking }, reward);
					LogTool.info(hid, model.getName(), "sendRankingAward", LvBuRisingFunction.class);
				} catch (Exception e) {
					LogTool.error(e, LvBuRisingFunction.class, model.getHid(), model.getName(),
							"LvBuRisingFunction refreshRanking");
				}
				ranking++;
			}
		} catch (Exception e) {
			LogTool.error(e, LvBuRisingFunction.class, "LvBuRisingFunction sendRankingAward");
		}
	}

	public int[][] getReward(int ranking, int score) {
		int scoreLimit = Config_xtcs_004.getIns().get(LvBuRisingConst.SCORE_LIMIT_ID).getNum();
		List<Struct_lbjl_250> sortList = Config_lbjl_250.getIns().getSortList();
		int size = sortList.size();
		Struct_lbjl_250 struct_lbjl_250 = null;
		for (int i = 0; i < size; i++) {
			struct_lbjl_250 = sortList.get(i);
			int[][] rank = struct_lbjl_250.getRank();
			if (ranking >= rank[0][0] && ranking <= rank[0][1]) {
				int[][] reward = struct_lbjl_250.getReward();
				if (score >= scoreLimit) {
					int[][] reward1 = struct_lbjl_250.getReward1();
					int[][] total = CommonUtil.arrayPlusArrays(reward, reward1);
					return total;
				} else {
					return reward;
				}
			}
		}
		return null;
	}
	
	/**
	 * 检测红点
	 * @param hero
	 * @return
	 */
	public boolean checkRedPoint(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, LvBuRisingConst.SysId)) {
				return false;
			}
			LvBuRisingModel lvBuRisingModel = hero.getLvBuRisingModel();
			Set<Integer> targetSet = lvBuRisingModel.getTargetSet();
			int score = lvBuRisingModel.getScore();
			List<Struct_lbjlpoint_250> sortList = Config_lbjlpoint_250.getIns().getSortList();
			int size = sortList.size();
			for (int i = 0; i < size; i++) {
				Struct_lbjlpoint_250 struct_lbjlpoint_250 = sortList.get(i);
				if (score < struct_lbjlpoint_250.getPoint()) {
					continue;
				}
				if (!targetSet.contains(struct_lbjlpoint_250.getId())) {
					return true;
				}
			}
		} catch (Exception e) {
			LogTool.error(e, LvBuRisingSysEvent.class, hero.getId(), hero.getName(), "checkRedPoint");
		}
		return false;
	}

	public void updateRedPoint(Hero hero) {
		boolean redPoint = checkRedPoint(hero);
		if (!redPoint) {
			RedPointFunction.getIns().fastUpdateRedPoint(hero, LvBuRisingConst.SysId, LvBuRisingConst.RED_POINT,
					RedPointConst.NO_RED);
		} else {
			RedPointFunction.getIns().fastUpdateRedPoint(hero, LvBuRisingConst.SysId, LvBuRisingConst.RED_POINT,
					RedPointConst.HAS_RED);
		}
	}

	public void gmHandle(Hero hero, int addScore) {
		if (!HeroFunction.getIns().checkSystemOpen(hero, LvBuRisingConst.SysId)) {
			return;
		}
		LvBuRisingModel lvBuRisingModel = hero.getLvBuRisingModel();
		changeScore(hero, lvBuRisingModel.getScore() + addScore);
	}

}
