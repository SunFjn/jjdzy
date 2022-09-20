package com.teamtop.system.taoyuanSworn;

import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.CountrybossOpTaskRunnable;
import com.teamtop.synHandleCore.orderedRunnable.OpTaskConst;
import com.teamtop.system.taoyuanSworn.model.TaoyuanBossModel;
import com.teamtop.util.exector.schedule.AbsScheduleExecutor;

import excel.config.Config_xtcs_004;
import excel.struct.Struct_xtcs_004;
/**
 * 桃园boss 线程
 */
public class TaoyuanSwornSchedule extends AbsScheduleExecutor{

	public TaoyuanSwornSchedule(long delay, long interval, boolean useLong) {
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
		
		Struct_xtcs_004 struct_xtcs_004 = Config_xtcs_004.getIns().get(TaoyuanSwornConst.CD_FUHUO_TIME);
		int time = struct_xtcs_004.getNum();
		ConcurrentHashMap<Long, TaoyuanBossModel> taoyuanBossCache = TaoyuanSwornSysCache.getTaoyuanSwornBossMap();
		
		for (TaoyuanBossModel taoyuanBossModel : taoyuanBossCache.values()) {
			if (taoyuanBossModel.getCurhp() > 0) {
				OpTaskExecutorService.PublicOrderService.execute(new CountrybossOpTaskRunnable() {
					@Override
					public void run() {
						TaoyuanSwornFunction.getIns().scheduleAttCoutryBoss(taoyuanBossModel,now,time,finalSend);
					}
					@Override
					public Object getSession() {
						return OpTaskConst.TAOYUAN_BOSS;
					}
				});
			}
		}
	}

}
