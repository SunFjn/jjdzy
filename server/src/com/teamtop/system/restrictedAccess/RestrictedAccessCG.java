package com.teamtop.system.restrictedAccess;

public class RestrictedAccessCG{
	private static RestrictedAccessCG ins = null;

	public static RestrictedAccessCG getIns(){
		if(ins == null){
			ins = new RestrictedAccessCG();
		}
		return ins;
	}
}