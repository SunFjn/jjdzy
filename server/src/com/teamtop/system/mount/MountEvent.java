package com.teamtop.system.mount;

import java.util.HashMap;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;

public class MountEvent extends AbsSystemEvent{
	
	private static MountEvent ins;
	
	private MountEvent() {
		
	}
	
	public static synchronized MountEvent getIns() {
		if (ins == null) {
			ins = new MountEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		Mount mount = hero.getMount();
		if (mount==null) {
			mount=new Mount();
			mount.setHid(hero.getId());
			mount.setMountModels(new HashMap<>());
			hero.setMount(mount);
		}
	}

	@Override
	public void login(Hero hero) {
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.MOUNT)) {
			return;
		}
		MountFunction.getIns().mountRedPoint(hero);
	}

}
