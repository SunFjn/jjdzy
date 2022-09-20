package com.teamtop.system.title;

import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.util.log.LogTool;

import excel.struct.Struct_chenghao_702;

public class TitleEvent extends AbsSystemEvent {
	private static TitleEvent ins = null;

	public static TitleEvent getIns(){
		if(ins == null){
			ins = new TitleEvent();
		}
		return ins;
	}
	@Override
	public void init(Hero hero) {
		TitleFunction.getIns().init(hero);
	}

	@Override
	public void levelUp(Hero hero, int newLv, int oldLv) {
		Map<Integer, List<Struct_chenghao_702>> titleActivateTypeMap = TitleCache.getTitleActivateTypeMap();
		List<Struct_chenghao_702> list = titleActivateTypeMap.get(TitleActivateType.LEVEL_ACT.getActivateType());
		if (list == null) {
			return;
		}
		for (Struct_chenghao_702 title : list) {
			int[][] condtion = title.getCondtion();
			if (newLv == condtion[0][2]) {
				TitleFunction.getIns().addTitle(hero.getId(), title.getID());
			}
		}
	}

	@Override
	public void passGuanqia(Hero hero, int passGuanqia) {
		Map<Integer, List<Struct_chenghao_702>> titleActivateTypeMap = TitleCache.getTitleActivateTypeMap();
		List<Struct_chenghao_702> list = titleActivateTypeMap.get(TitleActivateType.PASS_GUANQIA_ACT.getActivateType());
		if(list==null) {
			return;
		}
		for (Struct_chenghao_702 title : list) {
			int[][] condtion = title.getCondtion();
			if (passGuanqia == condtion[0][2]) {
				TitleFunction.getIns().addTitle(hero.getId(), title.getID());
			}
		}
	}

	@Override
	public void login(Hero hero) {

	}

	@Override
	public void zeroPub(int now) {
		Map<Long, Hero> heroMap = HeroCache.getHeroMap();
		Iterator<Hero> iterator = heroMap.values().iterator();
		Hero hero = null;
		while (iterator.hasNext()) {
			try {
				hero = iterator.next();
				// 检测角色是否在线
				if (!HeroFunction.getIns().isOnline(hero.getId())) {
					continue;
				}
				TitleFunction.getIns().checkOverTime(hero);
			} catch (Exception e) {
				LogTool.error(e, TitleSchedule.class, "hid:" + hero.getId());
			}
		}
	}

}
