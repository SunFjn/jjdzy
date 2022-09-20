package com.teamtop.system.global;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
/**
 * 系统全局事件
 * @author lobbyer
 * @date 2017年4月13日
 */
public class GlobalEvent extends AbsSystemEvent {
	private static GlobalEvent ins;
	public static GlobalEvent getIns(){
		if(ins == null) {
			ins = new GlobalEvent();
		}
		return ins;
	}
	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void login(Hero hero) {
		GlobalManager.getIns().getServerTime(hero);
		GlobalManager.getIns().getKaiFuTime(hero);
		GlobalFunction.getIns().sendVersion(hero);
	}
	@Override
	public void levelUp(Hero hero, int newLv, int oldLv) {
		//腾讯积分上报用
		//LoginReportEvent.addTypeReport(hero, TXReportConst.set_achievement, "",1,100065);
	}
	
	
	@Override
	public void zeroPub(int now){
		GlobalCache.doSync();
	}

}
