package com.teamtop.system.eightDoorAppraiseRank;

import com.teamtop.system.eightDoorAppraiseRank.cross.CrossEightDoorAppraiseRankSysCache;
import com.teamtop.util.time.TimeDateUtil;

import io.netty.channel.Channel;

public class EightDoorAppraiseRankFunction {

	private static volatile EightDoorAppraiseRankFunction ins = null;

	public static EightDoorAppraiseRankFunction getIns() {
		if (ins == null) {
			synchronized (EightDoorAppraiseRankFunction.class) {
				if (ins == null) {
					ins = new EightDoorAppraiseRankFunction();
				}
			}
		}
		return ins;
	}

	private EightDoorAppraiseRankFunction() {
	}

	/**
	 * 八门金锁是否开启,中央服用
	 * 
	 * @return
	 */
	public boolean isOpenCen(Channel channel, int addEndTime) {
		int beginTime = CrossEightDoorAppraiseRankSysCache.getBeginTime(channel);
		int endTime = CrossEightDoorAppraiseRankSysCache.getEndTime(channel) + addEndTime;
		int nowTime = TimeDateUtil.getCurrentTime();
		if (nowTime >= beginTime && nowTime < endTime) {
			return true;
		}
		return false;
	}

	/**
	 * 八门金锁是否结束,中央服用
	 * 
	 * @return
	 */
	public boolean isEndCen(int partId) {
		int endTime = CrossEightDoorAppraiseRankSysCache.getEndTime(partId);
		int nowTime = TimeDateUtil.getCurrentTime();
		if (endTime != 0 && nowTime > endTime) {
			return true;
		}
		return false;
	}

	/**
	 * 八门金锁是否开启
	 * 
	 * @return 0:还没开始，1:开始中，2:已结束
	 */
	public int isOpen(int addEndTime) {
		int beginTime = EightDoorAppraiseRankSysCache.getBeginTime();
		int endTime = EightDoorAppraiseRankSysCache.getEndTime() + addEndTime;
		int nowTime = TimeDateUtil.getCurrentTime();
		if (endTime == 0 || nowTime < beginTime) {
			return 0;
		}
		if (nowTime >= endTime) {
			return 2;
		}

		return 1;
	}

	/**
	 * 获取对应开服天数的时间
	 * 
	 * @param days  开服多少天
	 * @param isEnd true(为当天23:59:59)
	 * @return
	 */
	public int getOpenDaysTime(int serverOpenTime, int days, boolean isEnd) {
		int zeroTime = TimeDateUtil.getOneDayZeroTime(serverOpenTime);
		zeroTime = zeroTime + TimeDateUtil.ONE_DAY_INT * (days - 1);
		if (isEnd) {
			zeroTime = zeroTime + TimeDateUtil.ONE_DAY_INT - 1;
		}
		return zeroTime;
	}

}
