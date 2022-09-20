package com.teamtop.system.sevenGroupBuy;

public class SevenGroupBuyFunction {
	
	
	private static SevenGroupBuyFunction ins;
	public static SevenGroupBuyFunction getIns(){
		if(ins == null) {
			ins = new SevenGroupBuyFunction();
		}
		return ins;
	}
	
	
}
