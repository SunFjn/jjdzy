package com.teamtop.system.compound;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;

import excel.config.Config_compose_245;
import excel.struct.Struct_compose_245;

public class CompoundEvent extends AbsSystemEvent{
	
	private static CompoundEvent ins = null;

	public static CompoundEvent getIns() {
		if (ins == null) {
			ins = new CompoundEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void login(Hero hero) {
		if (!HeroFunction.getIns().checkSystemOpen(hero, CompoundConst.SYS_COMPOUND)) {
			return;
		}
		boolean isHong=false;
		for (Struct_compose_245 compose_245:Config_compose_245.getIns().getSortList()) {
			if(UseAddUtil.canUse(hero, compose_245.getItem())) {
				isHong=true;
			}
		}
		//红点
		if (isHong) {
			RedPointFunction.getIns().addLoginRedPoint(hero, CompoundConst.SYS_COMPOUND, 0, RedPointConst.HAS_RED);
		}
		
	}

}
