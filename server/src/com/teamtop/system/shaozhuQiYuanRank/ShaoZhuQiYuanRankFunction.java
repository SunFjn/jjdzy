package com.teamtop.system.shaozhuQiYuanRank;

import com.teamtop.system.shaozhuQiYuanRank.cross.CrossShaoZhuQiYuanRankSysCache;
import com.teamtop.util.time.TimeDateUtil;

import io.netty.channel.Channel;

public class ShaoZhuQiYuanRankFunction {

	private static volatile ShaoZhuQiYuanRankFunction ins = null;

	public static ShaoZhuQiYuanRankFunction getIns() {
		if (ins == null) {
			synchronized (ShaoZhuQiYuanRankFunction.class) {
				if (ins == null) {
					ins = new ShaoZhuQiYuanRankFunction();
				}
			}
		}
		return ins;
	}

	private ShaoZhuQiYuanRankFunction() {
	}

	/**
	 * 少年英主-祈愿排名是否开启,中央服用
	 * 
	 * @return
	 */
	public boolean isOpenCen(Channel channel, int addEndTime) {
		int beginTime = CrossShaoZhuQiYuanRankSysCache.getBeginTime(channel);
		int endTime = CrossShaoZhuQiYuanRankSysCache.getEndTime(channel) + addEndTime;
		int nowTime = TimeDateUtil.getCurrentTime();
		if (nowTime >= beginTime && nowTime < endTime) {
			return true;
		}
		return false;
	}

	/**
	 * 少年英主-祈愿排名是否结束,中央服用
	 * 
	 * @return
	 */
	public boolean isEndCen(int partId) {
		int endTime = CrossShaoZhuQiYuanRankSysCache.getEndTime(partId);
		int nowTime = TimeDateUtil.getCurrentTime();
		if (endTime != 0 && nowTime > endTime) {
			return true;
		}
		return false;
	}

	/**
	 * 少年英主-祈愿排名是否开启
	 * 
	 * @return 0:还没开始，1:开始中，2:已结束
	 */
	public int isOpen(int addEndTime) {
		int beginTime = ShaoZhuQiYuanRankSysCache.getBeginTime();
		int endTime = ShaoZhuQiYuanRankSysCache.getEndTime() + addEndTime;
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
