package com.teamtop.pf;

import org.apache.commons.lang3.StringUtils;

import com.teamtop.gameCommon.GameProperties;

/**
 * 平台功能接口类
 * @author lobbyer
 * @date 2016年4月26日
 */
public class PFFunction {
	private static PFFunction ins;
	public static PFFunction getIns() {
		if(ins == null) {
			ins = new PFFunction();
		}
		return ins;
	}
	
	/**
	 * 判断当前平台是否可操作
	 * @author lobbyer
	 * @param pf
	 * @return true可操  false不可操
	 * @date 2016年4月26日
	 */
	public static boolean checkPfCanDo(String pf,String split) {
		if(StringUtils.isBlank(pf)) {
			
			return false;
		}
		String[] splits = pf.split(split);
		for(String str:splits) {
			if(str.equals(PfConst.PF_ALL) || GameProperties.platform.equals(str)) return true;
		}
		return false;
	}

	/**
	 * 判断当前平台是否可操作
	 * @author lobbyer
	 * @param pf
	 * @return true可操  false不可操
	 * @date 2016年4月26日
	 */
	public static boolean checkPfCanDo(String pf,String checkPf,String split) {
		if(StringUtils.isBlank(pf)) {
			
			return false;
		}
		String[] splits = pf.split(split);
		for(String str:splits) {
			if(str.equals(PfConst.PF_ALL) || checkPf.equals(str)) return true;
		}
		return false;
	}
	
	
	
}
