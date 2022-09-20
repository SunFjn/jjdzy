package com.teamtop.system.crossTrial.cross;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.log.LogTool;

public class CrossTrialCentralSysEvent extends AbsSystemEvent {

	private static CrossTrialCentralSysEvent ins;

	private CrossTrialCentralSysEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized CrossTrialCentralSysEvent getIns() {
		if (ins == null) {
			ins = new CrossTrialCentralSysEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public void login(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public void fixTime(int cmdId, int now) {
		try {
			if (cmdId == 1) {
				CrossTrialCentralFunction.getIns().initMatchMap();
			}
		} catch (Exception e) {
			LogTool.error(e, CrossTrialCentralSysEvent.class, "CrossTrialCentralSysEvent fixTime");
		}
	}

	@Override
	public void zeroPub(int now) {
		CrossTrialCentralFunction.getIns().clearAll();
	}

}
