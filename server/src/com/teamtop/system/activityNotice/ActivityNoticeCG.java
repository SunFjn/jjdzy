package com.teamtop.system.activityNotice;

/**
 * ActivityNoticeCG.java 活动预告
 */
public class ActivityNoticeCG {

	private static ActivityNoticeCG ins = null;

	public static ActivityNoticeCG getIns() {
		if (ins == null) {
			ins = new ActivityNoticeCG();
		}
		return ins;
	}

}