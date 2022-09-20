package com.teamtop.system.tigerPass.cross;

import com.teamtop.gameCommon.GameProperties;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.log.LogTool;

public class TigerPassCrossEvent extends AbsSystemEvent{
	
	private static TigerPassCrossEvent ins;
	public static TigerPassCrossEvent getIns(){
		if(ins == null) {
			ins = new TigerPassCrossEvent();
		}
		return ins;
	}
	

	@Override
	public void init(Hero hero) {
		
		
	}

	@Override
	public void login(Hero hero) {
		
		
	}
	
	public void zeroPub(int now){
		TigerPassCrossCache.getTigerPassEmployerMap().clear();
		try {
			TigerPassEmployerDao.getIns().truncate(GameProperties.getFirstZoneId());
		} catch (Exception e) {
			LogTool.error(e, TigerPassCrossEvent.class, "truncate has wrong");
		}
	}

}
