package com.teamtop.system.crossMine;

import com.teamtop.util.exector.schedule.AbsScheduleExecutor;

public class CrossMineSchedule extends AbsScheduleExecutor {

	public CrossMineSchedule(long delay, long interval, boolean useLong) {
		super(delay, interval, useLong);
	}

	@Override
	public void execute(int now) {
		CrossMineFunction.getIns().scheduleAddReward();
	}

}
