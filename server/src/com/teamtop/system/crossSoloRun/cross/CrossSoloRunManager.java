package com.teamtop.system.crossSoloRun.cross;

public class CrossSoloRunManager {
	
	private static CrossSoloRunManager crossSoloRunManager;
	
	public CrossSoloRunManager() {
		// TODO Auto-generated constructor stub
	}
	
	public static synchronized CrossSoloRunManager getIns() {
		if(crossSoloRunManager==null) {
			crossSoloRunManager = new CrossSoloRunManager();
		}
		return crossSoloRunManager;
	}

}
