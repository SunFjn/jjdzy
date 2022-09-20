package com.teamtop.system.event.useAddEvent;

import com.teamtop.system.hero.Hero;

public abstract class AbsUseHandleEvent {

	public abstract void useFunctionHandle(Hero hero, int type, int itemId, long num);

}
