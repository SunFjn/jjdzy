package com.teamtop.system.guanqia;

import java.util.Comparator;

/**
 * 关卡排行比较器
 *
 */
public class GuanqiaComparator implements Comparator<GuanqiaRank>{
	private static GuanqiaComparator ins = null;

	public static GuanqiaComparator getIns() {
		if (ins == null) {
			ins = new GuanqiaComparator();
		}
		return ins;
	}

	@Override
	public int compare(GuanqiaRank o1, GuanqiaRank o2) {
		if(o1.getHid()==o2.getHid())return 0;
		if(o2.getGuanqia()>o1.getGuanqia()){
			return 1;
		}else if(o2.getGuanqia()<o1.getGuanqia()){
			return -1;
		}else{
			if(o2.getTimeTopGuanQia()>o1.getTimeTopGuanQia()){
				return -1;
			}else if(o2.getTimeTopGuanQia()<o1.getTimeTopGuanQia()){
				return 1;
			}
		}
		return 0;
	}
	
	
}
