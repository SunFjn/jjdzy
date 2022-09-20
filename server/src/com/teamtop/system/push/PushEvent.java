package com.teamtop.system.push;

import java.util.ArrayList;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;

public class PushEvent extends AbsSystemEvent {

	private static PushEvent pushEvent;

	private PushEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized PushEvent getIns() {
		if (pushEvent == null) {
			pushEvent = new PushEvent();
		}
		return pushEvent;
	}

	@Override
	public void init(Hero hero) {

	}

	@Override
	public void login(Hero hero) {
		Push push = hero.getPush();
		if (push == null) {
			push = new Push();
			push.setHid(hero.getId());
			push.setPushList(new ArrayList<Object[]>());
			}
		hero.setPush(push);
	}


}
