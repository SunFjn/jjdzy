package com.teamtop.system.zcBoss;

import java.util.HashMap;
import java.util.TreeSet;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;

public class ZcBossHeroEvent  extends AbsSystemEvent  {

	private static ZcBossHeroEvent ins;
	public static ZcBossHeroEvent getIns(){
		if(ins == null) {
			ins = new ZcBossHeroEvent();
		}
		return ins;
	}
	
	@Override
	public void init(Hero hero) {
		ZcBossHero zcBossHero = hero.getZcBossHero();
		if (zcBossHero==null) {
			zcBossHero=new ZcBossHero();
			zcBossHero.setHid(hero.getId());
			zcBossHero.setJoinTime(new HashMap<>());
			hero.setZcBossHero(zcBossHero);
		}
		if (zcBossHero.getHasKill()==null) {
			zcBossHero.setHasKill(new TreeSet<Integer>());
		}
		
	}

	@Override
	public void login(Hero hero) {
		ZcBossFunction.getIns().isLocalReadPoint(hero,true);
		ZcBossFunction.getIns().isCrossReadPoint(hero,true);
		ZcBossHeroManager.getIns().quit(hero);
		
	}
	
	@Override
	public void logout(Hero hero){
		ZcBossHeroManager.getIns().quit(hero);
		
	}
	
	public void loginReset(Hero hero,int now){
		
	}
	
	public void zeroHero(Hero hero,int now){
		
	}

}
