package com.teamtop.system.godWeapon;

import java.util.HashMap;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;

public class GodWeaponEvent extends AbsSystemEvent {
	
	public static GodWeaponEvent ins;

	public static GodWeaponEvent getIns() {
		if (ins == null) {
			ins = new GodWeaponEvent();
		}
		return ins;
	}

	private GodWeaponEvent() {
	}

	@Override
	public void init(Hero hero) {
		GodWeapon godWeapon = hero.getGodWeapon();
		if (godWeapon==null) {
			godWeapon=new GodWeapon();
			godWeapon.setHid(hero.getId());
			godWeapon.setWeaponIdByWuJiang(new HashMap<>());
			godWeapon.setQs(1);
			hero.setGodWeapon(godWeapon);
		}
		
	}

	@Override
	public void login(Hero hero) {
		// TODO Auto-generated method stub
		
	}

}
