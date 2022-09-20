package com.teamtop.system.commonData;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;

public class CommonDataEvent extends AbsSystemEvent {
	public static CommonDataEvent ins;

	public static CommonDataEvent getIns() {
		if (ins == null) {
			ins = new CommonDataEvent();
		}
		return ins;
	}

	private CommonDataEvent() {
	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub
		CommonData commonData = hero.getCommonData();
		if (commonData == null) {
			commonData = new CommonData();
			commonData.setHid(hero.getId());
			hero.setCommonData(commonData);
		}

	}

	@Override
	public void login(Hero hero) {
		// TODO Auto-generated method stub

	}

}
