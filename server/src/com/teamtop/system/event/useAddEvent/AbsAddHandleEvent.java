package com.teamtop.system.event.useAddEvent;

import com.teamtop.system.hero.Hero;

public abstract class AbsAddHandleEvent {

	public abstract void addFunctionHandle(Hero hero, int type, int itemId, long num);

}
