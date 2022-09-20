package com.teamtop.system.push;

public class PushFunction {

	private static PushFunction pushManager;

	public PushFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized PushFunction getIns() {
		if (pushManager == null) {
			pushManager = new PushFunction();
		}
		return pushManager;
	}

	


}
