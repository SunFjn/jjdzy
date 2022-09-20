package com.teamtop.system.battleGoods;

import com.teamtop.cross.CrossZone;
import com.teamtop.util.exector.schedule.AbsScheduleExecutor;

public class BattleGoodsSchedule extends AbsScheduleExecutor{

	public BattleGoodsSchedule(long delay, long interval, boolean useLong) {
		super(delay, interval, useLong);
	}

	@Override
	public void execute(int now) {
		if(!CrossZone.isCrossServer()){
			//本服
			return;
		}
		BattleGoodsFunction.getIns().schedule();
	}

}