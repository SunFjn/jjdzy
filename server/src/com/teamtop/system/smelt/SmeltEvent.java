package com.teamtop.system.smelt;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.smelt.model.Smelt;
/**
 * 进阶装备熔炉个人事件
 * @author lobbyer
 * @date 2016年10月21日
 */
public class SmeltEvent extends AbsSystemEvent {
	private static SmeltEvent ins;
	public static SmeltEvent getIns(){
		if(ins == null) {
			ins = new SmeltEvent();
		}
		return ins;
	}
	@Override
	public void init(Hero hero) {
		if(hero.getSmelt() == null) {
			hero.setSmelt(new Smelt());
		}
	}

	@Override
	public void login(Hero hero) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void levelUp(Hero hero, int newLv, int oldLv) {
		init(hero);
	}
	
	@Override
	public void loginReset(Hero hero,int now){
		Smelt smelt = hero.getSmelt();
		smelt.setTodayMaxExp(0);
	}
	
	@Override
	public void zeroHero(Hero hero,int now){
		Smelt smelt = hero.getSmelt();
		smelt.setTodayMaxExp(0);
	}
}
