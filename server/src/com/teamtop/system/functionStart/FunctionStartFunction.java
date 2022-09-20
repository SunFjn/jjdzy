package com.teamtop.system.functionStart;

import java.util.List;

import com.teamtop.system.hero.Hero;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;

import excel.config.Config_sysshow_228;
import excel.struct.Struct_sysshow_228;

public class FunctionStartFunction {
	private static FunctionStartFunction ins;

	public static FunctionStartFunction getIns() {
		if (ins == null) {
			ins = new FunctionStartFunction();
		}
		return ins;
	}

	private FunctionStartFunction() {
		// TODO Auto-generated constructor stub
	}

	/**
	 * 登录发送红点
	 * 
	 * @param hero
	 */
	public void loginSendRedPoint(Hero hero) {
		int size = hero.getOpenSysReward().size();
		int reachConfigSize = getReachConfigSize(hero);
		if (size < reachConfigSize) {
			RedPointFunction.getIns().addLoginRedPoint(hero, FunctionStartConst.FUNCTIONSTART_SYSID,
					FunctionStartConst.REDPOINT, RedPointConst.HAS_RED);
		}
	}

	/**
	 * 获取功能预览版可达到的任务数
	 * 
	 * @param hero
	 * @return
	 */
	public int getReachConfigSize(Hero hero) {
		int curGuanqia = hero.getCurGuanqia();
		List<Struct_sysshow_228> sortList = Config_sysshow_228.getIns().getSortList();
		int size = sortList.size();
		for (int i = 0; i < size; i++) {
			int needGuanqia = sortList.get(i).getId();
			if (curGuanqia < needGuanqia) {
				return i;
			}
		}
		return size;
	}

	/**
	 * 快速发送红点
	 * 
	 * @param hero
	 */
	public void fastSendRedPoint(Hero hero) {
		int size = hero.getOpenSysReward().size();
		int reachConfigSize = getReachConfigSize(hero);
		if (size < reachConfigSize) {
			RedPointFunction.getIns().fastUpdateRedPoint(hero, FunctionStartConst.FUNCTIONSTART_SYSID,
					FunctionStartConst.REDPOINT, RedPointConst.HAS_RED);
		}
	}
}
