package com.teamtop.houtaiHttp.events.kuaFuFenQu;

import com.teamtop.util.exector.schedule.AbsScheduleExecutor;
import com.teamtop.util.log.LogTool;

public class KuaFuFenQuSchedule extends AbsScheduleExecutor {

	public KuaFuFenQuSchedule(long delay, long interval, boolean useLong) {
		super(delay, interval, useLong);
	}

	@Override
	public void execute(int now) {
		try {
			KuaFuFenQuCache.initKuafuFenQuMap();
		} catch (Exception e) {
			LogTool.error(e, KuaFuFenQuSchedule.class, "KuaFuFenQuSchedule initKuafuFenQuMap");
		}
	}

}
