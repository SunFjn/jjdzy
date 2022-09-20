package com.teamtop.system.shaozhuQiYuanRank;

import java.util.ArrayList;
import java.util.List;
import java.util.TreeSet;

import com.teamtop.system.fashionClothes.FashionClothesManager;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;
import com.teamtop.system.shaozhuQiYuanRank.cross.model.CrossShaoZhuQiYuanRankModel;
import com.teamtop.system.shaozhuQiYuanRank.model.ShaoZhuQiYuanRank;

public class ShaoZhuQiYuanRankManager {
	private static volatile ShaoZhuQiYuanRankManager ins = null;

	public static ShaoZhuQiYuanRankManager getIns() {
		if (ins == null) {
			synchronized (ShaoZhuQiYuanRankManager.class) {
				if (ins == null) {
					ins = new ShaoZhuQiYuanRankManager();
				}
			}
		}
		return ins;
	}

	private ShaoZhuQiYuanRankManager() {
	}

	public void openUI(Hero hero) {
		// TODO Auto-generated method stub
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SHAOZHU_QIYUANRANK)) {
			return;
		}
		int endTime = ShaoZhuQiYuanRankSysCache.getEndTime();
		int isOpen = ShaoZhuQiYuanRankFunction.getIns().isOpen(0);
		boolean isShaoZhuQiYuanOpen = OpenDaysSystemFunction.getIns().isSystemActOpen(hero,
				SystemIdConst.SHAOZHU_SEVENDAYTARGET);
		if (isOpen == 0 || (isOpen == 2 && !isShaoZhuQiYuanOpen)) {
			// 少年英主-祈愿排名结束，不开
			ShaoZhuQiYuanRankSender.sendCmd_7402(hero.getId(), null, 0, null, 0, 0, endTime);
			return;
		}
		ShaoZhuQiYuanRank model = hero.getShaoZhuQiYuanRank();
		int myTimes = model.getQiyuanTimes();
		TreeSet<CrossShaoZhuQiYuanRankModel> rankTreeSet = ShaoZhuQiYuanRankSysCache.getRankTreeSet();
		List<Object[]> objRankList = new ArrayList<Object[]>();
		List<Object[]> objOtherList = new ArrayList<Object[]>();
		int firstBodyId = 0;
		int myRank = 0;
		int rank = 1;
		for (CrossShaoZhuQiYuanRankModel rankModel : rankTreeSet) {
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
			int qiyuanTimes = rankModel.getQiyuanTimes();
			if (rankModel.getHid() == hero.getId()) {
				myRank = rank;
			}
			objRankList.add(new Object[] { rankModel.getName(), qiyuanTimes });
			rank++;
		}
		ShaoZhuQiYuanRankSender.sendCmd_7402(hero.getId(), objRankList.toArray(), firstBodyId, objOtherList.toArray(),
				myTimes, myRank, endTime);
	}
}
