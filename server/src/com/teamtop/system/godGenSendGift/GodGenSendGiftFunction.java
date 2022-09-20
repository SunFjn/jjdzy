package com.teamtop.system.godGenSendGift;

import java.util.Collections;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.teamtop.gameCommon.GameProperties;
import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.OpTaskConst;
import com.teamtop.synHandleCore.orderedRunnable.RankingOpTaskRunnable;
import com.teamtop.system.activity.ativitys.godGenSendGiftAct.GodGenSendGiftActFunction;
import com.teamtop.system.activity.ativitys.godGenSendGiftAct.model.GodGenSendGiftActRankModel;
import com.teamtop.system.godGenSendGift.model.GodGenSendGift;
import com.teamtop.system.godGenSendGift.model.GodGenSendGiftRankModel;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.struct.Struct_cbgmb1_729;

public class GodGenSendGiftFunction {

	private static GodGenSendGiftFunction ins;

	private GodGenSendGiftFunction() {
		// TODO Auto-generated constructor stub
	}

	public static GodGenSendGiftFunction getIns() {
		if (ins == null) {
			ins = new GodGenSendGiftFunction();
		}
		return ins;
	}

	/**
	 * 刷新排名
	 * 
	 * @param hero
	 * @param rankMode
	 * @param type     1:刷新排名，0：更改名字
	 */
	public void refreshRankList(Hero hero, int type) {
		if (!GodGenSendGiftFunction.getIns().checkOpen(hero)) {
			return;
		}
		int totalTimes = hero.getGodGenSendGift().getTotalTimes();
		try {
			OpTaskExecutorService.PublicOrderService.execute(new RankingOpTaskRunnable() {

				@Override
				public void run() {
					List<GodGenSendGiftRankModel> rankList = GodGenSendGiftSysCache.getRankList();
					int currentTime = TimeDateUtil.getCurrentTime();
					GodGenSendGiftRankModel rankModel = new GodGenSendGiftRankModel(hero.getId(), hero.getNameZoneid(),
							totalTimes, currentTime);
					int indexOf = rankList.indexOf(rankModel);

					if (type == 1) {
						if (indexOf < 0) {
							rankList.add(rankModel);
						} else {
							GodGenSendGiftRankModel rankModel2 = rankList.get(indexOf);
							rankModel2.setTotalTimes(totalTimes);
							rankModel2.setReachTime(currentTime);
						}
						sortRank(rankList);
					} else {
						if (indexOf >= 0) {
							GodGenSendGiftRankModel rankModel2 = rankList.get(indexOf);
							rankModel2.setName(hero.getNameZoneid());
						}
					}

				}

				@Override
				public Object getSession() {
					return OpTaskConst.GODGENSENDGIFT_RANK;
				}
			});
		} catch (Exception e) {
			LogTool.error(e, this, hero.getId(), hero.getName(),
					"GodGenSendGiftFunction refreshRankList " + "type:" + type + " totalTimes" + totalTimes);
		}
	}

	public void sortRank(List<GodGenSendGiftRankModel> rankList) {
		Collections.sort(rankList, new GodGenSendGiftRankComparator());
		Iterator<GodGenSendGiftRankModel> iterator = rankList.iterator();
		int maxNum = GodGenSendGiftConst.RANK_NUM;
		int i = 1;
		while (iterator.hasNext()) {
			iterator.next();
			if (i > maxNum) {
				iterator.remove();
			}
			i++;
		}
	}

	/**
	 * 取得期数
	 * 
	 * @return
	 */
	public int getQs() {
		int awardCycle = GodGenSendGiftConst.AWARD_CYCLE;
		int betweenOpen = TimeDateUtil.betweenOpen();
		if (isOldServer()) {
			// 老服按原来的方式开启
			return betweenOpen % awardCycle == 0 ? (betweenOpen / awardCycle) : (betweenOpen / awardCycle) + 1;
		} else {
			// 新服按新的方式开启
			int openDay = GodGenSendGiftConst.NEW_OPEN_DAY;
			if (betweenOpen >= openDay) {
				// 第八天开第一期
				betweenOpen = (betweenOpen - openDay + 1);
				return betweenOpen % awardCycle == 0 ? (betweenOpen / awardCycle) : (betweenOpen / awardCycle) + 1;
			}
		}
		return 0;
	}

	/**
	 * 取得每期第几天
	 * 
	 * @return
	 */
	public int getQsDay() {
		int awardCycle = GodGenSendGiftConst.AWARD_CYCLE;
		int betweenOpen = TimeDateUtil.betweenOpen();
		if (isOldServer()) {
			// 老服按原来的方式
		} else {
			// 新服按新的方式
			int openDay = GodGenSendGiftConst.NEW_OPEN_DAY;
			if (betweenOpen >= openDay) {
				// 第八天开第一期
				betweenOpen = (betweenOpen - openDay + 1);
			}
		}
		return betweenOpen % awardCycle;
	}

	/**
	 * 更新目标奖励
	 * 
	 * @param hero
	 * @param addTimes 增加的抽奖次数
	 */
	public void updateTargetAwardStateMap(Hero hero, int addTimes) {
		// TODO Auto-generated method stub
		int newTotalTimes = 0;
		try {
			if (!GodGenSendGiftFunction.getIns().checkOpen(hero)) {
				return;
			}
			GodGenSendGift godGenSendGiftModel = hero.getGodGenSendGift();
			int totalTimes = godGenSendGiftModel.getTotalTimes();
			godGenSendGiftModel.setTotalTimes(totalTimes + addTimes);
			newTotalTimes = godGenSendGiftModel.getTotalTimes();
			Map<Integer, Integer> awardStateMap = godGenSendGiftModel.getAwardStateMap();
			int qs = getQs();
			Map<Integer, Map<Integer, Struct_cbgmb1_729>> targetConfigMap = GodGenSendGiftSysCache.getTargetConfigMap();
			Map<Integer, Struct_cbgmb1_729> map = targetConfigMap.get(qs);
			boolean flag = false;
			for (Struct_cbgmb1_729 struct_cbgmb1_729 : map.values()) {
				int id = struct_cbgmb1_729.getId();
				if (newTotalTimes >= struct_cbgmb1_729.getTime() && awardStateMap.get(id) == null) {
					awardStateMap.put(id, GodGenSendGiftConst.CAN_GET);
					flag = true;
				}
			}

			if (flag) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.GODGENSENDGIFT, 1,
						RedPointConst.HAS_RED);
			}
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(),
					"GodGenSendGiftFunction updateTargetAwardStateMap addTimes:" + addTimes + " newTotalTimes"
							+ newTotalTimes);
		}
	}

	/**
	 * 保存上一期排行
	 */
	public void addLastRankList() {
		List<GodGenSendGiftRankModel> rankList = GodGenSendGiftSysCache.getRankList();
		if (isDelayLastDay()) {
			// 系统最后一期排名
			List<GodGenSendGiftActRankModel> lastRankList = GodGenSendGiftActFunction.getIns().getLastRankList();
			lastRankList.clear();
			for (int i = 0; i < rankList.size(); i++) {
				GodGenSendGiftRankModel rankModel = rankList.get(i);
				GodGenSendGiftActRankModel lastRankModel = new GodGenSendGiftActRankModel(rankModel.getHid(),
						rankModel.getName(), rankModel.getTotalTimes(), rankModel.getReachTime());
				lastRankList.add(lastRankModel);
			}
		} else {
			// 系统上一期排名
			List<GodGenSendGiftRankModel> lastRankList = GodGenSendGiftSysCache.getLastRankList();
			lastRankList.clear();
			lastRankList.addAll(rankList);
		}
	}

	/**
	 * 是否老服
	 * 
	 * @return
	 */
	public boolean isOldServer() {
		int judgeTime = GodGenSendGiftConst.JUDGE_TIME;
		int serverOpenTime = GameProperties.serverOpenTime;
		if (serverOpenTime <= judgeTime) {
			return true;
		}
		return false;
	}

	/**
	 * 检查系统开启
	 * 
	 * @param hero
	 * @return
	 */
	public boolean checkOpen(Hero hero) {
		int oldEndDay = GodGenSendGiftConst.OLD_END_DAY;
		int betweenOpen = TimeDateUtil.betweenOpen();
		if (isOldServer() && betweenOpen <= oldEndDay) {
			// 老服而且没有到跑完系统的前30天
			if (HeroFunction.getIns().checkSystemOpenSpecialHandleDay(hero, SystemIdConst.GODGENSENDGIFT,
					oldEndDay + 1000)) {
				return true;
			}
		} else if (!isOldServer()) {
			// 新服且满足开服条件的
			int openDay = GodGenSendGiftConst.NEW_OPEN_DAY;
			if (HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.GODGENSENDGIFT) && betweenOpen >= openDay) {
				return true;
			}
		}
		// 老服跑完30天或者新服开服前8天
		return false;
	}

	/**
	 * 是否系统开启表开启天数延迟一天后的最后那一天
	 * 
	 * @param hero
	 * @return
	 */
	public boolean isDelayLastDay() {
		int oldEndDay = GodGenSendGiftConst.OLD_END_DAY;
		int betweenOpen = TimeDateUtil.betweenOpen();
		if (isOldServer() && betweenOpen < oldEndDay) {
			// 老服而且没有到跑完系统的前30天
			if (TimeDateUtil.isDelayLastDay(SystemIdConst.GODGENSENDGIFT, false, oldEndDay + 1000)) {
				return true;
			}
		} else if (!isOldServer()) {
			// 新服
			int openDay = GodGenSendGiftConst.NEW_OPEN_DAY;
			if (TimeDateUtil.isDelayLastDay(SystemIdConst.GODGENSENDGIFT, true, 0) && betweenOpen >= openDay) {
				return true;
			}
		}
		return false;
	}

}
