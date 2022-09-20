package com.teamtop.system.activity.ativitys.hefuZhangFeiBoss;

import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.MonsterOpTaskRunnable;
import com.teamtop.synHandleCore.orderedRunnable.OpTaskConst;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.util.exector.schedule.AbsScheduleExecutor;

public class HeFuZhangFeiSchedule extends AbsScheduleExecutor{

	public HeFuZhangFeiSchedule(long delay, long interval, boolean useLong) {
		super(delay, interval, useLong);
	}
	private int send=0;
	
	@Override
	public void execute(int now) {
		boolean senddata = false;
		send++;
		if(send==2){
			send = 0;
			senddata = true;
		}
		final boolean finalSend = senddata;
		
		//判断节日活动 是否开启
		boolean checkActOpen = ActivityFunction.getIns().checkActOpen(ActivitySysId.HEFU_ZHANGFEIBOSS);
		if (!checkActOpen) {
			//节日boss 没有开启
			return;
		}
		OpTaskExecutorService.PublicOrderService.execute(new MonsterOpTaskRunnable() {
			@Override
			public void run() {
				HeFuZhangFeiBossFunction.getIns().scheduleMonster(finalSend);
			}
			@Override
			public Object getSession() {
				return OpTaskConst.HEFU_ZHANGFEIBOSS;
			}
		});
		
	}

}
