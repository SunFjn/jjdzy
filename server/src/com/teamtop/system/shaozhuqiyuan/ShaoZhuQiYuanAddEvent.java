package com.teamtop.system.shaozhuqiyuan;

import com.teamtop.system.event.useAddEvent.AbsAddHandleEvent;
import com.teamtop.system.hero.Hero;

public class ShaoZhuQiYuanAddEvent extends AbsAddHandleEvent {

	@Override
	public void addFunctionHandle(Hero hero, int type, int itemId, long num) {
		if (itemId == ShaoZhuQiYuanConst.QIYUANFU_ID) {
			ShaoZhuQiYuanFunction.getIns().updateRedPoint(hero);
		}
	}

}
