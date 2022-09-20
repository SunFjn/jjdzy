package com.teamtop.system.activity.ativitys.godGenDiscount;
import com.teamtop.system.hero.Hero;

/**
 * GodGenDiscountCG.java
 * 神将折扣
 */
public class GodGenDiscountCG{

	private static GodGenDiscountCG ins = null;

	public static GodGenDiscountCG getIns(){
		if(ins == null){
			ins = new GodGenDiscountCG();
		}
		return ins;
	}

}