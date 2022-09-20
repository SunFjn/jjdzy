package com.teamtop.util.exector.schedule;

import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.system.event.systemEvent.ISystemEvent;
import com.teamtop.system.event.systemEvent.SystemEventFunction;
import com.teamtop.util.exector.Fixtime;
import com.teamtop.util.exector.FixtimeRecord;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

public class ScheduleFixtime extends AbsScheduleExecutor {
	public ScheduleFixtime(long delay, long interval) {
		super(delay, interval,false);
	}

	private static final Logger logger = LoggerFactory.getLogger(ScheduleFixtime.class);
	private static int nextZeroTime = 0;
	/**
	 * 0点处理
	 * @param now
	 */
	private static void checkZeroTime(int now){
//		logger.info("now:"+now);
		try {
			if(nextZeroTime==0){
				nextZeroTime = TimeDateUtil.getTomorrowZeroTimeReturnInt();
			}
			if(now-nextZeroTime>0 /*&& now-nextZeroTime<60*/){
				//0点
				nextZeroTime = TimeDateUtil.getTomorrowZeroTimeReturnInt();
				try {
					SystemEventFunction.triggerZeroHandlerEvent(now);
				} catch (Exception e) {
					logger.error(LogTool.exception(e));
				}
			}
		} catch (Exception e1) {
			logger.error(LogTool.exception(e1));
		}
	}
	@Override
	public void execute(int now) {
		try{
			checkZeroTime(now);
			Map<FixtimeRecord,Fixtime[]> FixtimeMap = SystemEventFunction.hanleQuartzFixtimeEvents;
			Iterator<Entry<FixtimeRecord, Fixtime[]>> iter = FixtimeMap.entrySet().iterator();
			//用于相隔多久执行的任务
//			int timeBeginhourInt = TimeDateUtil.getTimeBeginhourInt(now);
//			int oneDayMinute = (timeBeginhourInt/ 100) * 60 + timeBeginhourInt %10000;
//			int oneDayTimeHour = timeBeginhourInt / 100;
			while(iter.hasNext()) {
				Entry<FixtimeRecord, Fixtime[]> next = iter.next();
				FixtimeRecord time = next.getKey();
				Fixtime[] fixtimes = next.getValue();
				int type = time.getType();
				int dayTime = time.getTime();
				int opTime = time.getOpTime();
				switch(type) {
				case 1://相隔多少时间
					for(Fixtime ft: fixtimes){
						try{
							Set<Integer> opWeekSet = ft.getOpWeekSet();
							int nowWeek = TimeDateUtil.getWeek();
							if (opWeekSet != null && (!opWeekSet.contains(nowWeek))) {
								continue;
							}
							int fEndtime = ft.getEndtime();
							int endTime = 0;
							if (fEndtime > 0) {
								endTime = TimeDateUtil.getOneTime(0, fEndtime / 100, fEndtime % 100, 0);
							}
							int startTime = TimeDateUtil.getOneTime(0, ft.getStarttime()/100, ft.getStarttime()%100, 0);
							if(now < startTime) {
								continue;
							}
							if (fEndtime > 0 && now > endTime) {
								continue;
							}
							if (now >= opTime) {
								ISystemEvent event = ft.getEvent();
								if (event == null) {
									logger.warn(LogTool.getmsg("type = " + type + ", time = " + dayTime));
									continue;
								}
								if (ft.getFixType() == 1) {
									event.fixTime(ft.getCmd(), now);
//									logger.info("event:" + event + ",now:" + now + ",starttime:" + ft.getStarttime() + ",dayTime:" + dayTime);
								} else {
									event.fixtimeSyncPub(now);
								}
							}
						}catch(Exception e) {
							logger.error(LogTool.exception(e, "excute event ocurs an error"));
							//e.printStackTrace();
						}
					}
					//重新设置时间
					if(now >= opTime){
						time.setOpTime(opTime + dayTime * TimeDateUtil.ONE_MINUTE);
					}
					break;
				case 2://每天
					for(Fixtime ft: fixtimes){
						try{
//							if(TimeDateUtil.getTimeBeginhourInt(now) == dayTime * 100) {
							if(now >= opTime) {
								ISystemEvent event = ft.getEvent();
								if(event == null) {
									logger.warn(LogTool.getmsg("type = " + type + ", time = " + dayTime));
									continue;
								}
								event.fixTime(ft.getCmd(),now);
								logger.info("day event:"+event+",now:"+now+",dayTime:"+dayTime);
							}
						}catch(Exception e) {
							logger.error(LogTool.exception(e, "excute event ocurs an error"));
							//e.printStackTrace();
						}
					}
					//重新设置时间
					if(now >= opTime){
						time.setOpTime(opTime + TimeDateUtil.ONE_DAY_INT);
					}
					break;
				case 3://每周
					int week = time.getWeek();
					int nowWeek = TimeDateUtil.getWeek();
					for(Fixtime ft: fixtimes){
						try{
//							if(week == nowWeek && TimeDateUtil.getTimeBeginhourInt(now) == dayTime * 100){
							if(week == nowWeek && now >= opTime) {
								ISystemEvent event = ft.getEvent();
								if(event == null) {
									logger.warn(LogTool.getmsg("type = " + type + ", time = " + dayTime));
									continue;
								}
								event.fixTime(ft.getCmd(),now);
								logger.info("week event:"+event+",now:"+now+",dayTime:"+dayTime);
							}
						}catch(Exception e) {
							logger.error(LogTool.exception(e, "excute event ocurs an error"));
							//e.printStackTrace();
						}
					}
					//重新设置时间
					if(now >= opTime){
						time.setOpTime(opTime + TimeDateUtil.ONE_DAY_INT * 7);
					}
					break;
				case 4://每年
//					int nowMonthDate = TimeDateUtil.getTimeBeginMonth(now);
					for(Fixtime ft : fixtimes) {
						try{
//							if(dayTime == nowMonthDate) {
							if(now >= opTime) {
								ISystemEvent event = ft.getEvent();
								if(event == null) {
									logger.warn(LogTool.getmsg("type = " + type + ", time = " + dayTime));
									return;
								}
								event.fixTime(ft.getCmd(),now);
								logger.info("year event:"+event+",now:"+now+",dayTime:"+dayTime);
							}
						}catch(Exception e) {
							logger.error(LogTool.exception(e, "excute event ocurs an error"));
						}
					}
					//重新设置时间
					if(now >= opTime){
						int md = dayTime / 10000; //月日
						int hm = dayTime % 10000; //时分
						time.setOpTime(TimeDateUtil.getYearOneTime(1, md/100, md%100, hm/100, hm%100, 0));
					}
					break;
				default:
					logger.error("type is error, type : " + type);
				}
				
			}
		}catch(Exception e){
			logger.error(LogTool.exception(e));
		}
	}
}
