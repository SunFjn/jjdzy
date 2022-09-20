package com.teamtop.system.event.backstage.events.backstage.recharge;

import java.util.Comparator;


public class B_PayAccountComparator implements Comparator<B_PayAccount>{

	@Override
	public int compare(B_PayAccount o1, B_PayAccount o2) {
		//比较战力
		if(o1.getPayTime() > o2.getPayTime()){
			return 1;
		}else if(o1.getPayTime() < o2.getPayTime()){
			return -1;
		}
		return 1;
	}
}