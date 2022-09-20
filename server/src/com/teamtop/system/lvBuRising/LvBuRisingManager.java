package com.teamtop.system.lvBuRising;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.Set;
import java.util.TreeSet;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.lvBuRising.model.LvBuRisingModel;
import com.teamtop.system.lvBuRising.model.LvBuRisingRankModel;
import com.teamtop.util.log.LogTool;

import excel.config.Config_lbjlpoint_250;
import excel.struct.Struct_lbjlpoint_250;

/**
 * 吕布降临
 * 
 * @author hzp
 *
 */
public class LvBuRisingManager {

	private static LvBuRisingManager ins;

	private LvBuRisingManager() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized LvBuRisingManager getIns() {
		if (ins == null) {
			ins = new LvBuRisingManager();
		}
		return ins;
	}

	public void openUI(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, LvBuRisingConst.SysId)) {
				return;
			}
			LvBuRisingModel model = hero.getLvBuRisingModel();
			ArrayList<Object[]> sendList = new ArrayList<>();
			TreeSet<LvBuRisingRankModel> rankSet = new TreeSet<>(LvBuRisingCache.rankSet);
			Iterator<LvBuRisingRankModel> iterator = rankSet.iterator();
			int ranking = 1;
			int myRanking = 0;
			for (; iterator.hasNext();) {
				LvBuRisingRankModel rankModel = iterator.next();
				if (ranking <= 3) {
					sendList.add(new Object[] { ranking, rankModel.getName(), rankModel.getJob(), rankModel.getIcon(),
							rankModel.getFrame(), rankModel.getScore() });
				}
				if (rankModel.getHid() == hero.getId()) {
					myRanking = ranking;
				}
				ranking++;
			}
			ArrayList<Object[]> targetList = new ArrayList<>();
			Set<Integer> targetSet = model.getTargetSet();
			Iterator<Integer> targetIter = targetSet.iterator();
			for (; targetIter.hasNext();) {
				int index = targetIter.next();
				targetList.add(new Object[] { index });
			}
			LvBuRisingSender.sendCmd_2712(hid, sendList.toArray(), targetList.toArray(), myRanking, model.getScore());
		} catch (Exception e) {
			LogTool.error(e, LvBuRisingManager.class, hid, hero.getName(), "LvBuRisingManager openUI");
		}
	}

	/**
	 * 排行榜
	 * @param hero
	 */
	public void getRankingList(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, LvBuRisingConst.SysId)) {
				return;
			}
			ArrayList<Object[]> sendList = new ArrayList<>();
			TreeSet<LvBuRisingRankModel> rankSet = new TreeSet<>(LvBuRisingCache.rankSet);
			Iterator<LvBuRisingRankModel> iterator = rankSet.iterator();
			int ranking = 1;
			for (; iterator.hasNext();) {
				LvBuRisingRankModel rankModel = iterator.next();
				sendList.add(new Object[] { ranking, rankModel.getName(), rankModel.getScore() });
				ranking++;
			}
			LvBuRisingSender.sendCmd_2714(hid, sendList.toArray());
		} catch (Exception e) {
			LogTool.error(e, LvBuRisingManager.class, hid, hero.getName(), "LvBuRisingManager getRankingList");
		}
	}

	/**
	 * 领取目标奖励
	 * @param hero
	 * @param index
	 */
	public void getTargetReward(Hero hero, int index) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, LvBuRisingConst.SysId)) {
				return;
			}
			LvBuRisingModel lvBuRisingModel = hero.getLvBuRisingModel();
			Set<Integer> targetSet = lvBuRisingModel.getTargetSet();
			if (targetSet.contains(index)) {
				// 已领取
				LvBuRisingSender.sendCmd_2716(hid, 0, 1);
				return;
			}
			int score = lvBuRisingModel.getScore();
			Struct_lbjlpoint_250 struct_lbjlpoint_250 = Config_lbjlpoint_250.getIns().get(index);
			int point = struct_lbjlpoint_250.getPoint();
			if (score < point) {
				// 积分未达标
				LvBuRisingSender.sendCmd_2716(hid, 0, 2);
				return;
			}
			int[][] reward = struct_lbjlpoint_250.getReward();
			targetSet.add(index);
			UseAddUtil.add(hero, reward, SourceGoodConst.LVBURISING_TARGET, null, true);
			LvBuRisingSender.sendCmd_2716(hid, 1, index);
			// 更新红点
			LvBuRisingFunction.getIns().updateRedPoint(hero);
		} catch (Exception e) {
			LogTool.error(e, LvBuRisingManager.class, hid, hero.getName(), "LvBuRisingManager getTargetReward");
		}
	}

}
