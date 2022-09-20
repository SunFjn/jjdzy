package com.teamtop.system.openDaysSystem.shaozhuSevenDayTarget;

import com.teamtop.system.hero.Hero;

public abstract class ShaoZhuSevenDayTargetAbs {

	/**
	 * 进度处理
	 * 
	 * @param hero
	 * @param c2   配置表参数2
	 * @return
	 */
	public abstract int scheduleHandle(Hero hero, int c2);

	/**
	 * 更新处理,主要用于要在本系统内进行数据记录的处理
	 * 
	 * @param hero
	 * @param type 类型
	 * @param obj  额外参数
	 */
	public void updateHandle(Hero hero, int type, Object... obj) {
	}
}
