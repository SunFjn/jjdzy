package com.teamtop.system.activity.ativitys.luckyTwist;

public class LuckyTwistFunction {
	private static LuckyTwistFunction ins;

	private LuckyTwistFunction() {
	}

	public static synchronized LuckyTwistFunction getIns() {
		if (ins == null) {
			ins = new LuckyTwistFunction();
		}
		return ins;
	}



}
