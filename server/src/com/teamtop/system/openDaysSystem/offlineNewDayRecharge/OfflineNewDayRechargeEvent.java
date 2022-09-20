package com.teamtop.system.openDaysSystem.offlineNewDayRecharge;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
/** 暂时不用 */
public class OfflineNewDayRechargeEvent extends AbsSystemEvent {
	
	private static OfflineNewDayRechargeEvent ins;
	public static OfflineNewDayRechargeEvent getIns(){
		if(ins == null) {
			ins = new OfflineNewDayRechargeEvent();
		}
		return ins;
	}
	
	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public void login(Hero hero) {
		// TODO Auto-generated method stub

	}
	
	@Override
	public void zeroHero(Hero hero,int now){
		
	}
	
	public void loginReset(Hero hero,int now){
		zeroHero(hero, now);
	}
}
