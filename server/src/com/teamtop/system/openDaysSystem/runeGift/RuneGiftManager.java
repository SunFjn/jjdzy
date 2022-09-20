package com.teamtop.system.openDaysSystem.runeGift;

import java.util.Map;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.openDaysSystem.AbsOpenDaysManager;
import com.teamtop.system.openDaysSystem.OpenDaysSystemSysCache;
import com.teamtop.system.openDaysSystem.model.AbsOpenDaysSystemModel;
import com.teamtop.system.openDaysSystem.model.HeroOpenDaysSysData;
import com.teamtop.system.openDaysSystem.runeGift.model.RuneGiftModel;

import excel.struct.Struct_hdfl_012;

public class RuneGiftManager extends AbsOpenDaysManager {

	private static RuneGiftManager ins;

	private RuneGiftManager() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized RuneGiftManager getIns() {
		if (ins == null) {
			ins = new RuneGiftManager();
		}
		return ins;
	}

	@Override
	public void handleOpenPub() {
		// TODO Auto-generated method stub

	}

	@Override
	public void handleOpen(Hero hero, int uid) {
		// TODO Auto-generated method stub

	}

	@Override
	public void handleEndPub() {
		// TODO Auto-generated method stub

	}

	@Override
	public void handleEnd(Hero hero, int uid) {
		// TODO Auto-generated method stub

	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		return RuneGiftSysEvent.getIns();
	}

	@Override
	public void openUI(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public AbsOpenDaysSystemModel getSystemModel(Hero hero, int uid) {
		HeroOpenDaysSysData heroOpenDaysSysData = hero.getHeroOpenDaysSysData();
		Map<Integer, AbsOpenDaysSystemModel> opSysDataMap = heroOpenDaysSysData.getOpSysDataMap();
		AbsOpenDaysSystemModel model = opSysDataMap.get(uid);
		if (model == null) {
			model = new AbsOpenDaysSystemModel();
			model.setHid(hero.getId());
			model.setUid(uid);
			Struct_hdfl_012 hdfl_012 = OpenDaysSystemSysCache.gethdflData(uid);
			model.setQs(hdfl_012.getQs());
			opSysDataMap.put(uid, model);
		}
		return model;
	}

	@Override
	public Class<?> getSystemModel() {
		// TODO Auto-generated method stub
		return RuneGiftModel.class;
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		// TODO Auto-generated method stub

	}

	@Override
	public void consumeHandle(Hero hero, int consumeNum, int reason) {
		// TODO Auto-generated method stub

	}

}
