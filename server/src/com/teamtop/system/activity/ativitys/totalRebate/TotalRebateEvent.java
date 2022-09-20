package com.teamtop.system.activity.ativitys.totalRebate;

import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.totalRebate.model.TotalRebate;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;

public class TotalRebateEvent extends AbsSystemEvent {
	public static TotalRebateEvent ins;
	public static synchronized TotalRebateEvent getIns() {
		if(ins == null){
			ins = new TotalRebateEvent();
		}
		return ins;
	}
	private TotalRebateEvent() {
	}
	@Override
	public void init(Hero hero) {
	}
	
	@Override
	public void login(Hero hero) {
		TotalRebateFunction.getIns().loginRed(hero);
	}
	
	@Override
	public void fixTime(int cmdId, int now) {
	}
	
	@Override
	public void zeroHero(Hero hero,int now){
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_TOTALREBATE))
			return;
		TotalRebate totalRebate = (TotalRebate) ActivityFunction.getIns().getActivityData(hero, ActivitySysId.ACT_TOTALREBATE);//个人数据
		totalRebate.setTips(0);
	}

}
