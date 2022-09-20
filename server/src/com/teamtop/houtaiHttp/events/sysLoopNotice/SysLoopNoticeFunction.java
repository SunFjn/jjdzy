package com.teamtop.houtaiHttp.events.sysLoopNotice;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.teamtop.cross.CrossCache;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.time.TimeDateUtil;

import io.netty.channel.Channel;

public class SysLoopNoticeFunction {
	private static SysLoopNoticeFunction ins;

	private SysLoopNoticeFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized SysLoopNoticeFunction getIns() {
		if (ins == null) {
			ins = new SysLoopNoticeFunction();
		}
		return ins;
	}

	/**
	 * 检查时间
	 * 
	 * @param beginTime
	 * @param endTime
	 * @param spacetime
	 * @return true通过 ，false未通过
	 */
	public boolean checkTime(int beginTime, int endTime, int spaceTime) {
		if (beginTime <= 0 || endTime <= 0 || spaceTime <= 0) {
			return false;
		}
		if (beginTime > endTime) {
			return false;
		}
		int currentTime = TimeDateUtil.getCurrentTime();
		if (currentTime >= endTime) {
			return false;
		}
		return true;
	}

	/**
	 * 检查等级和充值范围
	 * 
	 * @param min
	 * @param max
	 * @return true通过 ，false未通过
	 */
	public boolean checkLevelOrMoneyRange(String[] levelRangeSplit, String[] moneyRangeSplit) {
		if (!(levelRangeSplit.length == 2) || !(moneyRangeSplit.length == 2)) {
			return false;
		}
		int lMin = Integer.parseInt(levelRangeSplit[0]);
		int lMax = Integer.parseInt(levelRangeSplit[1]);
		if (lMin > lMax) {
			return false;
		}
		int mMin = Integer.parseInt(moneyRangeSplit[0]);
		int mMax = Integer.parseInt(moneyRangeSplit[1]);
		if (mMin > mMax) {
			return false;
		}
		return true;
	}

	/**
	 * 检查区服
	 * 
	 * @param zoneid
	 * @return true通过 ，false未通过
	 */
	public boolean checkZoneId(String zoneidStr) {
		List<Integer> zoneIdArray = getZoneIdList(zoneidStr);
		Map<Integer, Channel> zoneidToChannel = CrossCache.getZoneidToChannel();
		for (Integer zoneid : zoneIdArray) {
			if (!zoneidToChannel.containsKey(zoneid)) {
				return false;
			}
		}
		return true;
	}

	/**
	 * 获取区服数组
	 * 
	 * @param zoneidStr
	 * @return
	 */
	public List<Integer> getZoneIdList(String zoneidStr) {
		ArrayList<Integer> arrayList = new ArrayList<Integer>();
		if (zoneidStr.equals("all")) {
			Map<Integer, Channel> zoneidToChannel = CrossCache.getZoneidToChannel();
			for (Integer zoneid : zoneidToChannel.keySet()) {
				arrayList.add(zoneid);
			}
		} else {
			String[] split1 = zoneidStr.split(";");
			for (String str : split1) {
				String[] split2 = str.split("-");
				for (String zoneid : split2) {
					arrayList.add(Integer.valueOf(zoneid));
				}
			}
		}
		return arrayList;
	}

	public int getDelayTime(int beginTime, int endTime) {
		int currentTime = TimeDateUtil.getCurrentTime();
		if (currentTime <= beginTime) {
			return beginTime - currentTime;
		} else if (currentTime > beginTime && currentTime < endTime) {
			return 0;
		}
		return 0;
	}

	public boolean checkHeroLvAndMoney(Hero hero, int lMin, int lMax, int mMin, int mMax) {
		int lv = hero.getRealLevel();
		long chongZhiYuan = hero.getChongZhiYuan();
		if (lv >= lMin && lv <= lMax && chongZhiYuan >= mMin && chongZhiYuan <= mMax) {
			return true;
		}
		return false;
	}
}
