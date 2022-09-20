package com.teamtop.system.battleNew;

import com.teamtop.util.exector.schedule.AbsScheduleExecutor;

public class BattleNewSchedule extends AbsScheduleExecutor {

	public BattleNewSchedule(long delay, long interval) {
		super(delay, interval, false);
	}

	@Override
	public void execute(int now) {
		// buff检测
		BattleNewFunction.getIns().checkBuff();
	}

}
