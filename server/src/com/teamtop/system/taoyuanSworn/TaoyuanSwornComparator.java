package com.teamtop.system.taoyuanSworn;

import java.util.Comparator;

import com.teamtop.system.taoyuanSworn.model.SortTemplate;

/**
 * 桃园结义排序比较器
 */
public class TaoyuanSwornComparator implements Comparator<SortTemplate> {

	@Override
	public int compare(SortTemplate o1, SortTemplate o2) {
		if(o1.getNum() > o2.getNum()){//比较成员人数
			return 1;
		}else if(o1.getNum() < o2.getNum()){
			return -1;
		}else if(o1.getStrength() < o2.getStrength()){//比较战力
			return 1;
		}else if(o1.getStrength() > o2.getStrength()){
			return -1;
		}else {
			return 0;
		}
	}

}
