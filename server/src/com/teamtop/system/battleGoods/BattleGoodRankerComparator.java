package com.teamtop.system.battleGoods;

import java.util.Comparator;

import com.teamtop.system.battleGoods.model.BattleGoodRanker;


public class BattleGoodRankerComparator implements Comparator<BattleGoodRanker>{

	@Override
	public int compare(BattleGoodRanker o1, BattleGoodRanker o2) {
		//比较战力
		if(o1.getSource() < o2.getSource()){
			return 1;
		}else if(o1.getSource() > o2.getSource()){
			return -1;
		}else {
			//比较时间
			if(o1.getSourceTime() > o2.getSourceTime()){
				return 1;
			}else if(o1.getSourceTime() < o2.getSourceTime()){
				return -1;
			}else {
				return 0;
			}
		}
	}
}
