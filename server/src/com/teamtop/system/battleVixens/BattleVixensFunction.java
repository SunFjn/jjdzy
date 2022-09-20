package com.teamtop.system.battleVixens;

import java.util.Collections;
import java.util.List;

import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.OpTaskConst;
import com.teamtop.synHandleCore.orderedRunnable.RankingOpTaskRunnable;
import com.teamtop.system.battleVixens.model.BattleVixens;
import com.teamtop.system.battleVixens.model.BattleVixensRank;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.log.LogTool;

public class BattleVixensFunction {

	private static BattleVixensFunction battleVixensFunction;

	private BattleVixensFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized BattleVixensFunction getIns() {
		if (battleVixensFunction == null) {
			battleVixensFunction = new BattleVixensFunction();
		}
		return battleVixensFunction;
	}

	public void changeName(Hero hero) {
		List<BattleVixensRank> rankList = BattleVixensCache.getRankList();
		for (BattleVixensRank battleVixensRank : rankList) {
			if (battleVixensRank.getHid() == hero.getId()) {
				battleVixensRank.setName(hero.getNameZoneid());
				break;
			}
		}
	}

	public void refresh(final Hero hero, final int hardType, final int maxPassId) {
		OpTaskExecutorService.PublicOrderService.execute(new RankingOpTaskRunnable() {

			@Override
			public void run() {
				try {
					List<BattleVixensRank> rankList = BattleVixensCache.getRankList();
					BattleVixensRank model = new BattleVixensRank();
					model.setHid(hero.getId());
					BattleVixensRank oldModel = null;
					BattleVixensRank rank = null;
					int size = rankList.size();
					for (int i = 0; i < size; i++) {
						rank = rankList.get(i);
						if (rank.getHid() == hero.getId()) {
							oldModel = rank;
						}
					}
					if (oldModel != null) {
						oldModel.setStrength(hero.getTotalStrength());
						// 在排行榜里
						if (oldModel.getHardType() > hardType) {
							return;
						} else if (oldModel.getHardType() == hardType && oldModel.getMaxPassId() > maxPassId) {
							return;
						}
						model = oldModel;
					} else {
						// 不在排行榜
						rankList.add(model);
					}
					model.setHardType(hardType);
					model.setMaxPassId(maxPassId);
					model.setName(hero.getNameZoneid());
					model.setStrength(hero.getTotalStrength());
					// 刷新排行榜
					Collections.sort(rankList, BattleVixensComparator.getIns());
					while (rankList.size() > BattleVixensConst.RANKING_LIMIT) {
						rankList.remove(rankList.size() - 1);
					}
				} catch (Exception e) {
					LogTool.error(e, BattleVixensFunction.class, hero.getId(), hero.getNameZoneid(), "BattleVixens refresh");
				}
			}

			@Override
			public Object getSession() {
				return OpTaskConst.RANKING_KEY;
			}

		});
	}

	/**
	 * 使用一骑当千令增加挑战次数
	 * 
	 * @param hero
	 * @param id
	 * @param num
	 */
	public boolean addChaNum(Hero hero, int id, int num) {
		boolean finish = false;
		try {
			BattleVixens battleVixens = hero.getBattleVixens();
			if (battleVixens == null) {
				// 系统未开启
				return false;
			}
			int addNum = battleVixens.getAddNum();
			battleVixens.setAddNum(addNum + num);
			finish = true;
			BattleVixensManager.getIns().openBattleVixens(hero);
		} catch (Exception e) {
			LogTool.error(e, BattleVixensFunction.class, hero.getId(), hero.getName(),
					"BattleVixensFunction addChaNum");
			return false;
		}
		return finish;
	}

	/**
	 * gm方法
	 * 
	 */
	public void gmHandle(Hero hero, String[] param) {
		try {
			BattleVixens battleVixens = hero.getBattleVixens();
			if (battleVixens == null) {
				// 系统未开启
				return;
			}
			int handleType = Integer.parseInt(param[0]);
			if (handleType == 1) {// 增加挑战次数
				int challengeNum = battleVixens.getChallengeNum();
				int addNum = Integer.parseInt(param[1]);
				int mNum = challengeNum - addNum;
				if (mNum >= 0) {
					battleVixens.setChallengeNum(mNum);
				} else {
					battleVixens.setChallengeNum(0);
					battleVixens.setBuyNum(battleVixens.getBuyNum() - mNum);
				}
				BattleVixensManager.getIns().openBattleVixens(hero);
			}
		} catch (Exception e) {
			LogTool.error(e, BattleVixensFunction.class, hero.getId(), hero.getName(), "BattleVixensFunction gmHandle");
		}
	}

}
