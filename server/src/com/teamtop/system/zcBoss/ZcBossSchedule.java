package com.teamtop.system.zcBoss;

import com.teamtop.util.exector.schedule.AbsScheduleExecutor;

public class ZcBossSchedule extends AbsScheduleExecutor{
	
	public ZcBossSchedule(long delay, long interval, boolean useLong) {
		super(delay, interval, useLong);
	}


	@Override
	public void execute(int now) {
		ZcBossFunction.getIns().newChangeBossStatus();
		
	}
	


}
