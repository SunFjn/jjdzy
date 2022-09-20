package com.teamtop.system.activity.ativitys.caoCaoCome;

import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.MonsterOpTaskRunnable;
import com.teamtop.synHandleCore.orderedRunnable.OpTaskConst;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.util.exector.schedule.AbsScheduleExecutor;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_xtcs_004;

public class CaoCaoComeSchedule extends AbsScheduleExecutor {

	public CaoCaoComeSchedule(long delay, long interval, boolean useLong) {
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
		boolean checkActOpen = ActivityFunction.getIns().checkActOpen(ActivitySysId.CAOCAOCOME_SYSID);
		if (!checkActOpen) {
			//节日boss 没有开启
			return;
		}
		
		CaoCaoComeCache caoCaoComeCache = CaoCaoComeSysCache.getIns().getCaoCaoComeCache();
		//判断boss是否到了开启时间
		int[][] openTimes = Config_xtcs_004.getIns().get(CaoCaoComeConst.BEGINTIME).getOther();
		for (int i = 0; i < openTimes.length; i++) {
			int j[] = openTimes[i];
			int hour=j[0];
			int min=j[1];
			int openTime = TimeDateUtil.getOneTime(0, hour, min, 0);
			int endTime=TimeDateUtil.getOneTime(0, hour, min+30, 0);
			int currentTime = TimeDateUtil.getCurrentTime();
			
			int openTime3=openTime+3;
			int endTime3=endTime+3;
			
			if (currentTime>=openTime&&currentTime<=openTime3&&caoCaoComeCache.getState()==CaoCaoComeConst.STATE0) {
				CaoCaoComeFunction.getIns().start();
				LogTool.info("CaoCaoComeFunction.getIns().start() ", CaoCaoComeSchedule.class);
			}else if (currentTime>=endTime&&currentTime<=endTime3&&caoCaoComeCache.getState()==CaoCaoComeConst.STATE1) {
				CaoCaoComeFunction.getIns().end();
				LogTool.info("CaoCaoComeFunction.getIns().end() ", CaoCaoComeSchedule.class);
				caoCaoComeCache.setState(CaoCaoComeConst.STATE0);
			}
			
		}
		if (caoCaoComeCache.getState()==CaoCaoComeConst.STATE0) {
			return;
		}
		//活动 
		OpTaskExecutorService.PublicOrderService.execute(new MonsterOpTaskRunnable() {
			@Override
			public void run() {
				CaoCaoComeFunction.getIns().scheduleMonster(caoCaoComeCache, now, finalSend);
			}
			@Override
			public Object getSession() {
				return OpTaskConst.CAOCAOCOME_SYSID;
			}
		});
	
		
	}
}
