package com.teamtop.system.boss.countryBoss;

import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.CountrybossOpTaskRunnable;
import com.teamtop.synHandleCore.orderedRunnable.OpTaskConst;
import com.teamtop.util.exector.schedule.AbsScheduleExecutor;
import com.teamtop.util.log.LogTool;

import excel.config.Config_gjboss_738;
/**
 * 国家boss 线程
 * @author 张苏波
 *
 */
public class CountryBossSchedule extends AbsScheduleExecutor{

	public CountryBossSchedule(long delay, long interval, boolean useLong) {
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
		int size = getSize();
		
		CountryBossCache countryBossCache = CountryBossSysCache.getCountryBossCache();
		if (countryBossCache==null) {
			LogTool.warn("countryBossCache==null", CountryBossSchedule.class);
			return;
		}
		if (countryBossCache.getCountryBossMap()==null) {
			LogTool.warn("countryBossCache.getCountryBossMap()==null", CountryBossSchedule.class);
			return;
		}
		for (CountryBossModel countryBossModel:countryBossCache.getCountryBossMap().values()) {
			if (countryBossModel==null) {
				LogTool.warn("countryBossModel==null", CountryBossSchedule.class);
				continue;
			}
			if (countryBossModel.getBossId()==size&&countryBossModel.getCurhp()<=0) {
				continue;
			}
			OpTaskExecutorService.PublicOrderService.execute(new CountrybossOpTaskRunnable() {
				@Override
				public void run() {
					CountryBossFunction.getIns().scheduleAttCoutryBoss(countryBossModel,finalSend);
				}
				@Override
				public Object getSession() {
					return OpTaskConst.CROUTRY_BOSS;
				}
			});
			
		}
	
		
	}

	public int getSize() {
		int size = Config_gjboss_738.getIns().getSortList().size();
		return size;
	}

}
