package com.teamtop.system.activity.ativitys.firstRechargeTriple;

public class FirstRechargeTripleFunction {

	private static FirstRechargeTripleFunction ins;

	private FirstRechargeTripleFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized FirstRechargeTripleFunction getIns() {
		if (ins == null) {
			ins = new FirstRechargeTripleFunction();
		}
		return ins;
	}

}
