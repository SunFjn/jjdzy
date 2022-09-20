package com.teamtop.system.bag;

import com.teamtop.util.exector.schedule.AbsScheduleExecutor;

public class BagSchedule extends AbsScheduleExecutor{

	public BagSchedule(long delay, long interval, boolean useLong) {
		super(delay, interval, useLong);
	}

	@Override
	public void execute(int now) {
		BagCache.doCheck();
	}

}
