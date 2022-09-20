package com.teamtop.system.compound;

/**
 * 合成
 * @author jjjjyyy
 *
 */
public class CompoundFunction {
	private static CompoundFunction ins = null;

	public static CompoundFunction getIns() {
		if (ins == null) {
			ins = new CompoundFunction();
		}
		return ins;
	}

	
	
}
