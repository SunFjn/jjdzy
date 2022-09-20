package com.teamtop.system.activity.ativitys.goldenMouse;

import excel.config.Config_jssc_774;
import excel.struct.Struct_jssc_774;

public class GoldenMouseFunction {
	
	public static GoldenMouseFunction ins;

	public static synchronized GoldenMouseFunction getIns() {
		if (ins == null) {
			ins = new GoldenMouseFunction();
		}
		return ins;
	}
	
	public int getMaxBuyNumByRechrge(int rechargeNum) {
		int maxBuyNum=0;
		int size = Config_jssc_774.getIns().getMap().size();
		for (int i = 1; i <=size; i++) {
			Struct_jssc_774 struct_jssc_774 = Config_jssc_774.getIns().get(i);
			if (rechargeNum>=struct_jssc_774.getCz()) {
				maxBuyNum=struct_jssc_774.getCs();
			}
		}
		return maxBuyNum;
	}
	
	
	

}
