package com.teamtop.system.rankNew;

import java.util.ArrayList;
import java.util.List;
import java.util.TreeSet;
import java.util.concurrent.ConcurrentSkipListSet;

import com.teamtop.system.fashionClothes.FashionClothesManager;
import com.teamtop.system.godOfWar.model.GodOfWarCache;
import com.teamtop.system.godOfWar.model.GodOfWarRank;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.rankNew.rankModel.BaseRankModel;
import com.teamtop.system.rankNew.rankModel.HuoShaoChiBiRankModel;
import com.teamtop.system.rankNew.rankModel.PeacockRankModel;
import com.teamtop.util.log.LogTool;

public class RankingManager {

	private static RankingManager rankingManager;

	private RankingManager() {
	}

	public static synchronized RankingManager getIns() {
		if (rankingManager == null) {
			rankingManager = new RankingManager();
		}
		return rankingManager;
	}

	public void getRankList(Hero hero, int rankType) {
		try {
			ConcurrentSkipListSet<BaseRankModel> treeSet = RankingCache.getRankingmap().get(rankType);
			if (treeSet == null&&rankType != RankingConst.GOD_OF_WAR_RANKING) {
				return;
			}
			List<Object[]> sendList = new ArrayList<>();
			int rankCondition = 0;
			if (rankType == RankingConst.GOD_OF_WAR_RANKING) {// 三国战神特殊处理
				getGodOfWarRankList(sendList);
			} else {
				TreeSet<BaseRankModel> sendSet = new TreeSet<>(treeSet);
				int ranking = 1;
				for (BaseRankModel model : sendSet) {
					rankCondition = 0;
					if (rankType == RankingConst.PEACOCK_RANKING) {
						PeacockRankModel rank = (PeacockRankModel) model;
						rankCondition = rank.getFloorNum();
					}
					if (rankType == RankingConst.HUOSHAOCHIBI_RANKING) {
						HuoShaoChiBiRankModel rank1 = (HuoShaoChiBiRankModel) model;
						rankCondition = rank1.getFloorNum();
						if (rankCondition == 0) {
							continue;
						}
					}
					int body=FashionClothesManager.getIns().getBodyid(model.getJob(), model.getBodyid());
					sendList.add(new Object[] { ranking, model.getHid(), model.getName(), body,model.getGodWeapon(),
							model.getLevel(),model.getReincarnationLevel(), model.getVipLv(), model.getOfficial(),
							model.getCountryType(), model.getShowCountry(), model.getStrength(), rankCondition,
							model.getIcon(), model.getFrame(), model.getTitleId(), model.getTotalStrength(),model.getMountId() });
					ranking++;
				}
			}
			RankingSender.sendCmd_1452(hero.getId(), rankType, sendList.toArray());
		} catch (Exception e) {
			LogTool.error(e, RankingManager.class, hero.getId(), hero.getName(), "");
		}
	}

	public void getGodOfWarRankList(List<Object[]> sendList) {
		List<GodOfWarRank> godOfWarRankList = GodOfWarCache.getGodOfWarRankList();
		int size = godOfWarRankList.size();
		if (size > RankingConst.RANK_SIZE) {
			size = RankingConst.RANK_SIZE;
		}
		for (int i = 0; i < size; i++) {
			GodOfWarRank model = godOfWarRankList.get(i);
			String name = model.getName() + ".S" + model.getZoneid();
			int showCountry = model.getCountry()==0?1:0;
			int body=FashionClothesManager.getIns().getBodyid(model.getJob(), model.getBodyid());
			sendList.add(new Object[] { model.getRanking(), model.getHid(), name, body, model.getGodWeapon(),
					model.getLevel(),model.getReincarnationLevel(), model.getVipLevel(), model.getOfficial(), 
					model.getCountry(),showCountry,model.getStrength(), 0, 
					model.getIcon(), 
					model.getFrame(), model.getTitleId(), model.getStrength(),model.getMountId() });
		}
	}
}


