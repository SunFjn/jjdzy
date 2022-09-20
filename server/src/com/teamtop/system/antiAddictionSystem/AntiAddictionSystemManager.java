package com.teamtop.system.antiAddictionSystem;

/**
 * 防沉迷系统
 * @author hzp
 *
 */
public class AntiAddictionSystemManager {

	private static AntiAddictionSystemManager ins;

	private AntiAddictionSystemManager() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized AntiAddictionSystemManager getIns() {
		if (ins == null) {
			ins = new AntiAddictionSystemManager();
		}
		return ins;
	}

}
