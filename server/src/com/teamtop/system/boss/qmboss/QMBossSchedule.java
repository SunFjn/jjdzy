package com.teamtop.system.boss.qmboss;

import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;

import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.OpTaskConst;
import com.teamtop.synHandleCore.orderedRunnable.QmbossOpTaskRunnable;
import com.teamtop.util.exector.schedule.AbsScheduleExecutor;
import com.teamtop.util.time.TimeDateUtil;

/**
 * 全民boss
 * @author Administrator
 *
 */
public class QMBossSchedule extends AbsScheduleExecutor{
	public QMBossSchedule(long delay, long interval, boolean useLong) {
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
		Map<Integer, QMBoss> qmbossMap = QMBossCache.getQmbossMap();
		Iterator<Entry<Integer, QMBoss>> it = qmbossMap.entrySet().iterator();
		while(it.hasNext()){
			Entry<Integer, QMBoss> next = it.next();
			int key = next.getKey();
			QMBoss qmboss = next.getValue();
			OpTaskExecutorService.PublicOrderService.execute(new QmbossOpTaskRunnable() {
				@Override
				public void run() {
					QMBossFunction.getIns().scheduleAttQmBoss(qmboss, TimeDateUtil.getCurrentTime(), key, finalSend);
				}
				@Override
				public Object getSession() {
					return OpTaskConst.QMBOSS;
				}
			});
		}
	}
	
}
