package com.teamtop.system.crossWenDingTianXia.comparator;

import java.util.Comparator;

import com.teamtop.system.crossWenDingTianXia.model.CrossWenDingTianXiaTop10Strength;

public class CrossWenDingTianXiaTop10StrengthComparator implements Comparator<CrossWenDingTianXiaTop10Strength>{
	private static CrossWenDingTianXiaTop10StrengthComparator ins = null;

	public static CrossWenDingTianXiaTop10StrengthComparator getIns() {
		if (ins == null) {
			ins = new CrossWenDingTianXiaTop10StrengthComparator();
		}
		return ins;
	}

	@Override
	public int compare(CrossWenDingTianXiaTop10Strength o1, CrossWenDingTianXiaTop10Strength o2) {
		if(o1.getTop10StrengthAll()<o2.getTop10StrengthAll()){
			return 1;
		}else if(o1.getTop10StrengthAll()>o2.getTop10StrengthAll()){
			return -1;
		}else if(o1.getZid()>o2.getZid()){
			return 1;
		}else if(o1.getZid()<o2.getZid()){
			return -1;
		}
		return 0;
	}

}
