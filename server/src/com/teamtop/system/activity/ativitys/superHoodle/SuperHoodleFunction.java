package com.teamtop.system.activity.ativitys.superHoodle;

public class SuperHoodleFunction {

	private static SuperHoodleFunction ins;

	private SuperHoodleFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized SuperHoodleFunction getIns() {
		if (ins == null) {
			ins = new SuperHoodleFunction();
		}
		return ins;
	}

}
