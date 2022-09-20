package com.teamtop.system.generalSoul;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.generalSoul.model.GeneralSoul;
import com.teamtop.system.generalSoul.model.GeneralSoulModel;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;

public class GeneralSoulSysEvent extends AbsSystemEvent {

	private static GeneralSoulSysEvent generalSoulSysEvent;

	private GeneralSoulSysEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized GeneralSoulSysEvent getIns() {
		if (generalSoulSysEvent == null) {
			generalSoulSysEvent = new GeneralSoulSysEvent();
		}
		return generalSoulSysEvent;
	}

	@Override
	public void init(Hero hero) {
		GeneralSoul generalSoul = hero.getGeneralSoul();
		if (generalSoul != null) {
			return;
		}
		generalSoul = new GeneralSoul();
		hero.setGeneralSoul(generalSoul);
		Map<Integer, GeneralSoulModel> generalSoulMap = new HashMap<>();// 将魂信息
		Set<Integer> setList = new HashSet<>();// 套装信息
		generalSoul.setGeneralSoulMap(generalSoulMap);
		generalSoul.setSetList(setList);
	}

	@Override
	public void login(Hero hero) {
		boolean redPoint = GeneralSoulFunction.getIns().checkRedPoint(hero);
		if (redPoint) {
			RedPointFunction.getIns().addLoginRedPoint(hero, GeneralSoulConst.SysId, GeneralSoulConst.RedPoint,
					RedPointConst.HAS_RED);
		}
	}

}
