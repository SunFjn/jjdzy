package com.teamtop.system.activity.ativitys.magicDiscount;

/**
 * MagicDiscountCG.java
 * 神兵折扣(活动)
 */
public class MagicDiscountCG{

	private static MagicDiscountCG ins = null;

	public static MagicDiscountCG getIns(){
		if(ins == null){
			ins = new MagicDiscountCG();
		}
		return ins;
	}

}