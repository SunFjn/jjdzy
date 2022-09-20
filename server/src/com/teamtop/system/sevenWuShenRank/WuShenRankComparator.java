package com.teamtop.system.sevenWuShenRank;

import java.util.Comparator;
/**
 * 七日武圣榜
 * @author jjjjyyy
 *
 */
public class WuShenRankComparator implements Comparator<WuShenRank>{

	@Override
	public int compare(WuShenRank o1, WuShenRank o2) {
		//比较战力
		if(o1.getCount() < o2.getCount()){
			return 1;
		}else if(o1.getCount() > o2.getCount()){
			return -1;
		}else {
			//比较时间
			if(o1.getTime() > o2.getTime()){
				return 1;
			}else if(o1.getTime() < o2.getTime()){
				return -1;
			}else {
					return 0;
				}
			}
	}

}
