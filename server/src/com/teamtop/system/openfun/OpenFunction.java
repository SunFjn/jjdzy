package com.teamtop.system.openfun;

import com.teamtop.system.hero.SystemIdConst;

/**
 * 功能开启接口类
 * @author lobbyer
 * @date 2017年7月26日
 */
public class OpenFunction {
	private static OpenFunction ins;
	public static OpenFunction getIns(){
		if(ins == null) {
			ins = new OpenFunction();
		}
		return ins;
	}
	
	/**
	 * 判断平台能否进行该功能( 注：主要用于部分定时器与GM控制)
	 * @author lobbyer
	 * @param funId 系统功能id
	 * @return
	 * @date 2017年7月26日
	 */
	public static boolean checkCanRunByFunId(int funId) {
		switch (funId) {
		case SystemIdConst.FUN_CROSS_PRIMARY:
		default:
			break;
		}
		return true;
	}
}
