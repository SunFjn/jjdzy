package com.teamtop.houtaiHttp.events.sysLoopNotice;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.callback.Callback;
import com.teamtop.houtaiHttp.HoutaiConst;
import com.teamtop.houtaiHttp.HoutaiResponseUtil;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.util.exector.schedule.ScheduleUtil;
import com.teamtop.util.exector.schedule.Scheduler;
import com.teamtop.util.log.LogTool;

import io.netty.channel.Channel;
import io.netty.channel.ChannelHandlerContext;

public class SysLoopNoticeCrossIO {
	private static SysLoopNoticeCrossIO ins = null;

	public static SysLoopNoticeCrossIO getIns() {
		if (ins == null) {
			ins = new SysLoopNoticeCrossIO();
		}
		return ins;
	}

	private SysLoopNoticeCrossIO() {
		// TODO Auto-generated constructor stub
	}

	/**
	 * 中央服向子服系统循环公告
	 * 
	 * @param zoneidList
	 * @param type
	 * @param id
	 * @param beginTime
	 * @param endTime
	 * @param spaceTime
	 * @param content
	 * @param levelRangeSplit
	 * @param moneyRangeSplit
	 * @param ctx
	 */
	public void sysLoopNotice(List<Integer> zoneidList, int type, String id, int beginTime, int endTime, int spaceTime,
			String content, String[] levelRangeSplit, String[] moneyRangeSplit, ChannelHandlerContext ctx) {
		CrossData crossData = new CrossData();
		crossData.putObject(SysLoopNoticeCrossEnum.type, type);
		crossData.putObject(SysLoopNoticeCrossEnum.id, id);
		crossData.putObject(SysLoopNoticeCrossEnum.begintime, beginTime);
		crossData.putObject(SysLoopNoticeCrossEnum.endtime, endTime);
		crossData.putObject(SysLoopNoticeCrossEnum.spacetime, spaceTime);
		crossData.putObject(SysLoopNoticeCrossEnum.content, content);
		crossData.putObject(SysLoopNoticeCrossEnum.levelrange, levelRangeSplit);
		crossData.putObject(SysLoopNoticeCrossEnum.moneyrange, moneyRangeSplit);
		try {
			Set<Channel> tempSet = new HashSet<>();
			ConcurrentHashMap<Integer, Channel> zoneidToChannel = CrossCache.getZoneidToChannel();
			for (int i = 0; i < zoneidList.size(); i++) {
				Integer zoneid = zoneidList.get(i);
				Channel channel = zoneidToChannel.get(zoneid);
				if (tempSet.contains(channel)) {
					return;
				}
				tempSet.add(channel);
				int flagi = i;
				NettyWrite.writeXData(channel, CrossConst.SYSLOOPNOTICE, crossData, new Callback() {
					@Override
					public void dataReci(Channel channel, CrossData crossData) {
						boolean flag = crossData.getObject(SysLoopNoticeCrossEnum.callbackState, Boolean.class);
						if (!flag) {
							HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_500, ctx);
							return;
						}
						if (flagi == zoneidList.size() - 1) {
							HoutaiResponseUtil.responseSucc(ctx);
						}
					}
				});
			}
		} catch (Exception e) {
			LogTool.error(e, SysLoopNoticeCrossIO.class, "SysLoopNoticeCrossIO sysLoopNotice, ");
			HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_500, ctx);
		}

	}

	/**
	 * 子服系统循环公告
	 * 
	 * @param channel
	 * @param crossData
	 */
	public void sysLoopNoticeHandle(Channel channel, CrossData crossData) {
		int type = crossData.getObject(SysLoopNoticeCrossEnum.type, Integer.class);
		String id = crossData.getObject(SysLoopNoticeCrossEnum.id, String.class);
		int beginTime = crossData.getObject(SysLoopNoticeCrossEnum.begintime, Integer.class);
		int endTime = crossData.getObject(SysLoopNoticeCrossEnum.endtime, Integer.class);
		int spaceTime = crossData.getObject(SysLoopNoticeCrossEnum.spacetime, Integer.class);
		String content = crossData.getObject(SysLoopNoticeCrossEnum.content, String.class);
		String[] levelRange = crossData.getObject(SysLoopNoticeCrossEnum.levelrange, String[].class);
		String[] moneyRange = crossData.getObject(SysLoopNoticeCrossEnum.moneyrange, String[].class);

		try {
			if (type == 1) {
				int delayTime = SysLoopNoticeFunction.getIns().getDelayTime(beginTime, endTime);
				ScheduleUtil.addTask(id,
						new SysLoopNoticeSchedule(id, endTime, delayTime * Scheduler.ONE_SECOND_MILLISECOND,
								spaceTime * Scheduler.ONE_SECOND_MILLISECOND, false, content, levelRange, moneyRange));
			} else {
				ScheduleUtil.cancelTask(id);
			}
			crossData.putObject(SysLoopNoticeCrossEnum.callbackState, true);
			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
		} catch (Exception e) {
			crossData.putObject(SysLoopNoticeCrossEnum.callbackState, false);
			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
			LogTool.error(e, SysLoopNoticeCrossIO.class, "SysLoopNoticeCrossIO sysLoopNoticeHandle, ");
		}
	}
}
