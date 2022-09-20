package com.teamtop.system.guanQiaHelp;

import java.util.Date;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;

import excel.config.Config_xtcs_004;
import excel.struct.Struct_xtcs_004;

public class GuanQiaHelpSystemEvent extends AbsSystemEvent {
	private static GuanQiaHelpSystemEvent ins = null;

	private GuanQiaHelpSystemEvent() {

	}

	public static synchronized GuanQiaHelpSystemEvent getIns() {
		if (ins == null) {
			ins = new GuanQiaHelpSystemEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		GuanQiaHelp guanQiaHelp = hero.getGuanqiahelp();
		if (guanQiaHelp == null) {
			guanQiaHelp = new GuanQiaHelp();
			Struct_xtcs_004 excel = Config_xtcs_004.getIns().get(GuanQiaHelpConst.CONST_3925);
			guanQiaHelp.setSeekHelpTimes(excel.getNum());
			excel = Config_xtcs_004.getIns().get(GuanQiaHelpConst.CONST_3926);
			guanQiaHelp.setHelpTimes(excel.getNum());
			guanQiaHelp.setLastRefreshTime(new Date().getTime());
			guanQiaHelp.setHid(hero.getId());
		}
		hero.setGuanqiahelp(guanQiaHelp);
	}

	@Override
	public void login(Hero hero) {

	}

	public void loginReset(Hero hero, int now) {
		dailyReset(hero, now);
	}

	public void zeroHero(Hero hero, int now) {
		dailyReset(hero, now);
	}

	public void dailyReset(Hero hero, int now) {
		GuanQiaHelp guanQiaHelp = hero.getGuanqiahelp();
		Struct_xtcs_004 excel = Config_xtcs_004.getIns().get(GuanQiaHelpConst.CONST_3925);
		guanQiaHelp.setSeekHelpTimes(excel.getNum());
		excel = Config_xtcs_004.getIns().get(GuanQiaHelpConst.CONST_3926);
		guanQiaHelp.setHelpTimes(excel.getNum());
		guanQiaHelp.setLastRefreshTime(new Date().getTime());
	}

}
