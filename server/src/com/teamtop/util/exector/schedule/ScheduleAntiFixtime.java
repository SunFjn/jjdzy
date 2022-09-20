package com.teamtop.util.exector.schedule;

import com.teamtop.cross.CrossZone;

/**
 * 防沉迷定时任务
 * @author lobbyer
 * @date 2016年9月15日
 */
public class ScheduleAntiFixtime extends AbsScheduleExecutor {
	
	public ScheduleAntiFixtime(long delay, long interval) {
		super(delay, interval,false);
	}

	@Override
	public void execute(int now) {
		boolean crossServer = CrossZone.isCrossServer();
		if(crossServer) {
//			AntiCrossIO.getIns().checkCalcTime();
		}else{
//			AntiAddcationFunction.getIns().checkTime();
		}
	}
}
