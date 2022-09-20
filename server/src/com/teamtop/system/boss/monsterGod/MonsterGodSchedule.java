package com.teamtop.system.boss.monsterGod;

import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.MonsterOpTaskRunnable;
import com.teamtop.synHandleCore.orderedRunnable.OpTaskConst;
import com.teamtop.util.exector.schedule.AbsScheduleExecutor;
import com.teamtop.util.log.LogTool;

/**
 * 魔神吕布
 * @author Administrator
 *
 */
public class MonsterGodSchedule extends AbsScheduleExecutor{
	public MonsterGodSchedule(long delay, long interval, boolean useLong) {
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
		MonsterGodCache monsterGodCache=MonsterGodSysCache.getIns().getMonsterGodCache();
		if (monsterGodCache==null) {
			LogTool.warn("monsterGodCache==null has wrong", MonsterGodSchedule.class);
			return;
		}
		OpTaskExecutorService.PublicOrderService.execute(new MonsterOpTaskRunnable() {
			@Override
			public void run() {
				MonsterGodFunction.getIns().scheduleMonster(monsterGodCache, now, finalSend);
			}
			@Override
			public Object getSession() {
				return OpTaskConst.MONSTER_GOD;
			}
		});
		
	}
	


}
