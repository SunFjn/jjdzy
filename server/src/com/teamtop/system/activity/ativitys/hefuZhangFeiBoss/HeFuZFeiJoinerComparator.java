package com.teamtop.system.activity.ativitys.hefuZhangFeiBoss;

import java.util.Comparator;

public class HeFuZFeiJoinerComparator implements Comparator<HeFuZhangFeiJoiner>{

	@Override
	public int compare(HeFuZhangFeiJoiner o1, HeFuZhangFeiJoiner o2) {
		//比较战力
		if(o1.getZuiyiNum() < o2.getZuiyiNum()){
			return 1;
		}else if(o1.getZuiyiNum() > o2.getZuiyiNum()){
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
