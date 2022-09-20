package com.teamtop.system.crossBoss.cross;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.cross.CrossCache;
import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.CrossBossOpTaskRunnable;
import com.teamtop.synHandleCore.orderedRunnable.OpTaskConst;
import com.teamtop.system.crossBoss.CrossBossCache;
import com.teamtop.system.crossBoss.CrossBossConst;
import com.teamtop.system.crossBoss.CrossBossFunction;
import com.teamtop.util.exector.schedule.AbsScheduleExecutor;
/**
 * 转生boss定时器
 * @author Administrator
 *
 */
public class CrossBossSchedule extends AbsScheduleExecutor{
	
	public CrossBossSchedule(long delay, long interval, boolean useLong) {
		super(delay, interval, useLong);
	}
	
	private int send = 0;
	@Override
	public void execute(int now) {
		if(CrossBossCache.CROSS_STATE!=CrossBossConst.STATE_START) return;
		boolean senddata = false;
		send++;
		if(send==2){
			send = 0;
			senddata = true;
		}
		//long time1=System.currentTimeMillis();
		final boolean finalSend = senddata;
		
		for (int partId:CrossCache.getZoneidToChannelMap().keySet()) {
			Map<Integer, ConcurrentHashMap<Integer, ZSBoss>> zsbossMapByZoneid = CrossBossCache.getZsbossMap(partId);
			for(ConcurrentHashMap<Integer, ZSBoss> zsBossMap: zsbossMapByZoneid.values()){
				for (ZSBoss zsBoss:zsBossMap.values()) {
					OpTaskExecutorService.PublicOrderService.execute(new CrossBossOpTaskRunnable() {
						
						@Override
						public void run() {
							CrossBossFunction.getIns().onAtt(zsBoss, now, finalSend);
						}
						
						@Override
						public Object getSession() {
							return OpTaskConst.CROSS_BOSS;
						}
					});
				}
			}
			
		}
		/*long time2= System.currentTimeMillis()-time1;
		System.err.println("use time"+time2);*/
	}
}
