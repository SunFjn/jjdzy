package com.teamtop.system.activity.ativitys.yuanXiao;

import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;

public class YuanXiaoLocalEvent extends AbsSystemEvent {

	private static YuanXiaoLocalEvent ins;

	private YuanXiaoLocalEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized YuanXiaoLocalEvent getIns() {
		if (ins == null) {
			ins = new YuanXiaoLocalEvent();
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
	
	public void loginReset(Hero hero,int now){
		zeroHero(hero, now);
	}
	
	public void zeroHero(Hero hero,int now){
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_YUANXIAO)) {
			return;
		}
		YuanXiaoLocal yuanXiaoLocal = (YuanXiaoLocal)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.ACT_YUANXIAO);
		yuanXiaoLocal.setHasGetNum(0);
	}

}
