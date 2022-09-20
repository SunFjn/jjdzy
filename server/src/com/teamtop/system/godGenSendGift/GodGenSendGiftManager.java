package com.teamtop.system.godGenSendGift;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.godGenSendGift.model.GodGenSendGift;
import com.teamtop.system.godGenSendGift.model.GodGenSendGiftRankModel;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.struct.Struct_cbgmb1_729;

public class GodGenSendGiftManager {
	private static GodGenSendGiftManager ins;

	private GodGenSendGiftManager() {
		// TODO Auto-generated constructor stub
	}

	public static GodGenSendGiftManager getIns() {
		if (ins == null) {
			ins = new GodGenSendGiftManager();
		}
		return ins;
	}

	public void openRankUI(Hero hero) {
		// TODO Auto-generated method stub
		if (hero == null) {
			return;
		}
		if (!GodGenSendGiftFunction.getIns().checkOpen(hero)) {
			return;
		}
		List<GodGenSendGiftRankModel> rankList = GodGenSendGiftSysCache.getRankList();
		int size = rankList.size();
		List<Object[]> objList = new ArrayList<>();
		int myRank = 0;
		long hid = hero.getId();
		for (int i = 0; i < size; i++) {
			GodGenSendGiftRankModel rankModel = rankList.get(i);
			objList.add(new Object[] { i + 1, rankModel.getName(), rankModel.getTotalTimes() });
			if (rankModel.getHid() == hid) {
				myRank = i + 1;
			}
		}
		int totalTimes = hero.getGodGenSendGift().getTotalTimes();
		int qs = GodGenSendGiftFunction.getIns().getQs();
		GodGenSendGiftSender.sendCmd_4852(hero.getId(), objList.toArray(), myRank, totalTimes, qs);
	}

	public void openTargetUI(Hero hero) {
		// TODO Auto-generated method stub
		if (hero == null) {
			return;
		}
		if (!GodGenSendGiftFunction.getIns().checkOpen(hero)) {
			return;
		}
		GodGenSendGift godGenSendGiftModel = hero.getGodGenSendGift();
		Map<Integer, Integer> awardStateMap = godGenSendGiftModel.getAwardStateMap();
		int qs = GodGenSendGiftFunction.getIns().getQs();
		Map<Integer, Map<Integer, Struct_cbgmb1_729>> targetConfigMap = GodGenSendGiftSysCache.getTargetConfigMap();
		Map<Integer, Struct_cbgmb1_729> map = targetConfigMap.get(qs);
		ArrayList<Object[]> awardList = new ArrayList<>();
		for (int configId : map.keySet()) {
			Integer state = awardStateMap.get(configId);
			if (state == null) {
				awardList.add(new Object[] { configId, GodGenSendGiftConst.NOT_REACH });
			} else {
				awardList.add(new Object[] { configId, state });
			}
		}
		GodGenSendGiftSender.sendCmd_4854(hero.getId(), awardList.toArray());
	}

	public void getAward(Hero hero, int awardId) {
		// TODO Auto-generated method stub
		if (hero == null) {
			return;
		}
		try {
			if (!GodGenSendGiftFunction.getIns().checkOpen(hero)) {
				return;
			}
			int qs = GodGenSendGiftFunction.getIns().getQs();
			Map<Integer, Map<Integer, Struct_cbgmb1_729>> targetConfigMap = GodGenSendGiftSysCache.getTargetConfigMap();
			Map<Integer, Struct_cbgmb1_729> map = targetConfigMap.get(qs);
			Struct_cbgmb1_729 struct_cbgmb1_729 = map.get(awardId);

			if (struct_cbgmb1_729 == null) {
				GodGenSendGiftSender.sendCmd_4856(hero.getId(), GodGenSendGiftConst.FAILURE_NOT_AWARD, awardId);
				return;
			}
			GodGenSendGift godGenSendGiftModel = hero.getGodGenSendGift();
			Map<Integer, Integer> awardStateMap = godGenSendGiftModel.getAwardStateMap();
			Integer state = awardStateMap.get(awardId);
			if (state == null) {
				GodGenSendGiftSender.sendCmd_4856(hero.getId(), GodGenSendGiftConst.FAILURE_NOT_REACH, awardId);
				return;
			}
			if (state == GodGenSendGiftConst.GETTED) {
				GodGenSendGiftSender.sendCmd_4856(hero.getId(), GodGenSendGiftConst.FAILURE_NOT_REP, awardId);
				return;
			}
			awardStateMap.put(awardId, GodGenSendGiftConst.GETTED);
			int[][] reward = struct_cbgmb1_729.getReward();
			// 发放奖励
			UseAddUtil.add(hero, reward, SourceGoodConst.GODGENSENDAWARD_TARGETAWARD, UseAddUtil.getDefaultMail(),
					true);
			GodGenSendGiftSender.sendCmd_4856(hero.getId(), GodGenSendGiftConst.SUCCESS, awardId);
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(), "getAward awardId:" + awardId);
		}
	}

	/**
	 * 打开上期排名界面
	 * 
	 * @param hero
	 */
	public void openLastRankUI(Hero hero) {
		// TODO Auto-generated method stub
		if (hero == null) {
			return;
		}
		if (!GodGenSendGiftFunction.getIns().checkOpen(hero)) {
			return;
		}
		List<GodGenSendGiftRankModel> lastRankList = GodGenSendGiftSysCache.getLastRankList();
		int size = lastRankList.size();
		List<Object[]> objList = new ArrayList<>();
		int myLastRank = 0;
		int myLastTotalTimes = 0;
		long hid = hero.getId();
		for (int i = 0; i < size; i++) {
			GodGenSendGiftRankModel rankModel = lastRankList.get(i);
			objList.add(new Object[] { i + 1, rankModel.getName(), rankModel.getTotalTimes() });
			if (rankModel.getHid() == hid) {
				myLastRank = i + 1;
				myLastTotalTimes = rankModel.getTotalTimes();
			}
		}
		GodGenSendGiftSender.sendCmd_4858(hero.getId(), objList.toArray(), myLastRank, myLastTotalTimes, getLastQs());
	}

	/**
	 * 取得上期期数
	 * 
	 * @return
	 */
	public int getLastQs() {
		int awardCycle = GodGenSendGiftConst.AWARD_CYCLE;
		int betweenOpen = TimeDateUtil.betweenOpen();
		if (betweenOpen % awardCycle == 0) {
			return betweenOpen / awardCycle - 1;
		}
		return betweenOpen / awardCycle;
	}

}
