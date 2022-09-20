package com.teamtop.system.openDaysSystem.talentSendGiftActive;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;

public class TalentSendGiftActiveSysEvent extends AbsSystemEvent {

	private static TalentSendGiftActiveSysEvent ins;

	private TalentSendGiftActiveSysEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized TalentSendGiftActiveSysEvent getIns() {
		if (ins == null) {
			ins = new TalentSendGiftActiveSysEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public void login(Hero hero) {
		if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.TALENT_SEND_GIFT)) {
			return;
		}
		boolean redPoint = TalentSendGiftActiveFunction.getIns().checkRedPoint(hero);
		if (redPoint) {
			RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.TALENT_SEND_GIFT,
					RedPointConst.RED_1, RedPointConst.HAS_RED);
		}
	}
	
	@Override
	public void loginReset(Hero hero, int now) {
	}
	
	@Override
	public void zeroHero(Hero hero, int now) {
	}
	


}
