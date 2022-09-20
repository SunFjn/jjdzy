package com.teamtop.system.eightDoorAppraiseRank;

import java.util.ArrayList;
import java.util.List;
import java.util.TreeSet;

import com.teamtop.system.eightDoor.EightDoorFunction;
import com.teamtop.system.eightDoorAppraiseRank.cross.model.CrossEightDoorAppraiseRankModel;
import com.teamtop.system.eightDoorAppraiseRank.model.EightDoorAppraiseRank;
import com.teamtop.system.fashionClothes.FashionClothesManager;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;

public class EightDoorAppraiseRankManager {
	private static volatile EightDoorAppraiseRankManager ins = null;

	public static EightDoorAppraiseRankManager getIns() {
		if (ins == null) {
			synchronized (EightDoorAppraiseRankManager.class) {
				if (ins == null) {
					ins = new EightDoorAppraiseRankManager();
				}
			}
		}
		return ins;
	}

	private EightDoorAppraiseRankManager() {
	}

	public void openUI(Hero hero) {
		// TODO Auto-generated method stub
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.EIGHTDOOR_APPRAISERANK)) {
			return;
		}
		int endTime = EightDoorAppraiseRankSysCache.getEndTime();
		int isOpen = EightDoorAppraiseRankFunction.getIns().isOpen(0);
		boolean isEightDoorOpen = EightDoorFunction.getIns().isOpen();
		if (isOpen == 0 || (isOpen == 2 && !isEightDoorOpen)) {
			// 八门金锁活动结束，不开
			EightDoorAppraiseRankSender.sendCmd_7302(hero.getId(), null, 0, null, 0, 0, endTime);
			return;
		}
		EightDoorAppraiseRank model = hero.getEightDoorAppraiseRank();
		int myTimes = model.getAppraiseTimes();
		TreeSet<CrossEightDoorAppraiseRankModel> rankTreeSet = EightDoorAppraiseRankSysCache.getRankTreeSet();
		List<Object[]> objRankList = new ArrayList<Object[]>();
		List<Object[]> objOtherList = new ArrayList<Object[]>();
		int firstBodyId = 0;
		int myRank = 0;
		int rank = 1;
		for (CrossEightDoorAppraiseRankModel rankModel : rankTreeSet) {
			if (rank == 1) {
				firstBodyId = FashionClothesManager.getIns().getBodyid(rankModel.getJob(), rankModel.getBodyId());
			}
			if (rank == 2) {
				objOtherList.add(new Object[] { rankModel.getIcon(), rankModel.getFrame(), rankModel.getCountryType(),
						rankModel.getVipLv() });
			}
			if (rank == 3) {
				objOtherList.add(new Object[] { rankModel.getIcon(), rankModel.getFrame(), rankModel.getCountryType(),
						rankModel.getVipLv() });
			}
			int appraiseTimes = rankModel.getAppraiseTimes();
			if (rankModel.getHid() == hero.getId()) {
				myRank = rank;
				appraiseTimes = myTimes;
			}
			objRankList.add(new Object[] { rankModel.getName(), appraiseTimes });
			rank++;
		}
		EightDoorAppraiseRankSender.sendCmd_7302(hero.getId(), objRankList.toArray(), firstBodyId,
				objOtherList.toArray(), myTimes, myRank, endTime);
	}

}
