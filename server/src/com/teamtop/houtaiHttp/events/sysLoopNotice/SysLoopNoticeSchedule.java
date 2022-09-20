package com.teamtop.houtaiHttp.events.sysLoopNotice;

import java.util.Map;

import com.teamtop.system.chat.ChatSender;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.util.exector.schedule.AbsScheduleExecutor;
import com.teamtop.util.exector.schedule.ScheduleUtil;
import com.teamtop.util.exector.schedule.Scheduler;
import com.teamtop.util.time.TimeDateUtil;

public class SysLoopNoticeSchedule extends AbsScheduleExecutor {
	private String id;
	private int endTime;
	private int delay;
	private int lMin;
	private int lMax;
	private int mMin;
	private int mMax;
	private String content;

	public SysLoopNoticeSchedule(String id, int endTime, long delay, long interval, boolean useLong, String content,
			String[] levelRange, String[] moneyRange) {
		// TODO Auto-generated constructor stub
		super(delay, interval, useLong);
		this.id = id;
		this.endTime = endTime;
		this.delay = (int) delay / Scheduler.ONE_SECOND_MILLISECOND;
		this.lMin = Integer.parseInt(levelRange[0]);
		this.lMax = Integer.parseInt(levelRange[1]);
		this.mMin = Integer.parseInt(moneyRange[0]);
		this.mMax = Integer.parseInt(moneyRange[1]);
		this.content = content;
	}

	@Override
	public void execute(int now) {
		// TODO Auto-generated method stub
		int currentTime = TimeDateUtil.getCurrentTime();
		if ((currentTime + delay) >= endTime) {// 判断下次是否超过结束时间，是的话就删掉任务，删掉后还会执行一次
			ScheduleUtil.cancelTask(id);
		}
		Map<Long, Hero> heroMap = HeroCache.getHeroMap();
		for (Hero hero : heroMap.values()) {
			if (!SysLoopNoticeFunction.getIns().checkHeroLvAndMoney(hero, lMin, lMax, mMin, mMax)) {
				continue;
			}
			ChatSender.sendCmd_456(hero.getId(), 0, content);
		}

	}

}
