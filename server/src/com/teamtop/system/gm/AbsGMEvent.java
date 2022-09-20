package com.teamtop.system.gm;

import com.teamtop.system.hero.Hero;

public abstract class AbsGMEvent {
	/**
	 * 此事件的gm方法
	 * @type 若事件gm包含多个功能，可以用此区分
	 * @param 参数
	 */
	public abstract void gm(Hero hero,int type,String[] param);
}
