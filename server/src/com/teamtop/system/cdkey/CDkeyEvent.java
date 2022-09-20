package com.teamtop.system.cdkey;

import java.util.HashMap;
import com.teamtop.system.cdkey.model.CDkey;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;

public class CDkeyEvent extends AbsSystemEvent {
	public static CDkeyEvent ins;

	public static CDkeyEvent getIns() {
		if (ins == null) {
			ins = new CDkeyEvent();
		}
		return ins;
	}

	private CDkeyEvent() {
	}

	@Override
	public void init(Hero hero) {
		CDkey cdkey = hero.getCdkey();
		if (cdkey == null) {
			cdkey = new CDkey();
			cdkey.setHid(hero.getId());
			HashMap<Integer, Integer> gainCDkeyRecordMap = new HashMap<Integer, Integer>();
			cdkey.setGainCDkeyRecordMap(gainCDkeyRecordMap);
			hero.setCdkey(cdkey);
		}
	}

	@Override
	public void login(Hero hero) {

	}

}
