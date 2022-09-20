package com.teamtop.system.hero;

import java.util.Comparator;

public class GeneralPosComparator implements Comparator<General>{
	private static GeneralPosComparator ins = null;

	public static GeneralPosComparator getIns() {
		if (ins == null) {
			ins = new GeneralPosComparator();
		}
		return ins;
	}

	@Override
	public int compare(General o1, General o2) {
		if(o1.getId()==o2.getId()) return 0;
		if(o1.getPos()>o2.getPos()){
			return 1;
		}else{
			return -1;
		}
	}
}
