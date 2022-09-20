package com.teamtop.system.equip;

import java.util.Comparator;

import com.teamtop.system.equip.model.Equip;

/**
 * 装备排序比较器，根据评分排序
 * @author hepl
 *
 */
public class EquipScoreComparator implements Comparator<Equip> {

	@Override
	public int compare(Equip o1, Equip o2) {
		int score1 = EquipFunction.getIns().getEquipStrength(o1.getSysId());
		int score2 = EquipFunction.getIns().getEquipStrength(o2.getSysId());
		//比较评分
		if(score1 < score2){
			return 1;
		}else if(score1 > score2){
			return -1;
		}else {
			return 0;
		}
	}

}
