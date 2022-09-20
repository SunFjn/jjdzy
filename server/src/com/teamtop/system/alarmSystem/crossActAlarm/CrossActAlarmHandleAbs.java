package com.teamtop.system.alarmSystem.crossActAlarm;

import java.util.List;

/**
 * 跨服活动预警处理抽象类
 * 
 * @author jjjjyyy
 *
 */
public abstract class CrossActAlarmHandleAbs {
	public int time;

	/**
	 * 按星期开启处理
	 */
	public abstract boolean weekHandle(List<Object[]> objList);
}
