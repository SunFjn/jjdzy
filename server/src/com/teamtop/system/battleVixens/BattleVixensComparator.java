package com.teamtop.system.battleVixens;

import java.util.Comparator;

import com.teamtop.system.battleVixens.model.BattleVixensRank;

public class BattleVixensComparator implements Comparator<BattleVixensRank> {

	private static BattleVixensComparator battleVixensComparator;

	private BattleVixensComparator() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized BattleVixensComparator getIns() {
		if (battleVixensComparator == null) {
			battleVixensComparator = new BattleVixensComparator();
		}
		return battleVixensComparator;
	}

	@Override
	public int compare(BattleVixensRank o1, BattleVixensRank o2) {
		if (o1.getHid() == o2.getHid())
			return 0;
		if (o2.getHardType() > o1.getHardType()) {
			return 1;
		} else if (o2.getHardType() == o1.getHardType()) {
			if (o2.getMaxPassId() > o1.getMaxPassId()) {
				return 1;
			} else if (o2.getMaxPassId() == o1.getMaxPassId()) {
				if (o2.getStrength() > o1.getStrength()) {
					return 1;
				} else if (o2.getStrength() == o1.getStrength()) {
					return 0;
				}
			}
		}
		return -1;
	}

}
