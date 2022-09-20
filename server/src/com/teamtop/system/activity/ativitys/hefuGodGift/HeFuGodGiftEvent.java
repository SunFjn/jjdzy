package com.teamtop.system.activity.ativitys.hefuGodGift;

import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;

public class HeFuGodGiftEvent extends AbsSystemEvent {
	
	private static HeFuGodGiftEvent ins;

	private HeFuGodGiftEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized HeFuGodGiftEvent getIns() {
		if (ins == null) {
			ins = new HeFuGodGiftEvent();
		}
		return ins;
	}


	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void login(Hero hero) {
		boolean checkReadPoint = HeFuGodGiftFunction.getIns().checkReadPoint(hero);
		if (checkReadPoint) {
			RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.HEFU_GODGIFT, RedPointConst.RED_1,
					RedPointConst.HAS_RED);
		}
		
	}

}
