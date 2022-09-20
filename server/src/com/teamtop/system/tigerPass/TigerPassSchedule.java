package com.teamtop.system.tigerPass;

import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.MonsterOpTaskRunnable;
import com.teamtop.synHandleCore.orderedRunnable.OpTaskConst;
import com.teamtop.util.exector.schedule.AbsScheduleExecutor;

public class TigerPassSchedule extends AbsScheduleExecutor {

	public TigerPassSchedule(long delay, long interval, boolean useLong) {
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
		
		OpTaskExecutorService.PublicOrderService.execute(new MonsterOpTaskRunnable() {
			@Override
			public void run() {
				TigerPassFunction.getIns().scheduleMonster(finalSend);
			}
			@Override
			public Object getSession() {
				return OpTaskConst.TIGERPASS_SYSID;
			}
		});
		
	}

}
