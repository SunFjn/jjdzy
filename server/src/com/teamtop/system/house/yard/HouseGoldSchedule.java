package com.teamtop.system.house.yard;

import java.util.Iterator;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.system.crossCommonRank.cross.CrossCommonRankCL;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.house.yard.cross.CrossHouseCache;
import com.teamtop.system.house.yard.cross.CrossHouseFunction;
import com.teamtop.system.house.yard.model.CrossHouse;
import com.teamtop.system.house.yard.model.CrossHouseDao;
import com.teamtop.util.exector.schedule.AbsScheduleExecutor;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

/**
 * 府邸金库
 */
public class HouseGoldSchedule extends AbsScheduleExecutor {

	public HouseGoldSchedule(long delay, long interval, boolean useLong) {
		super(delay, interval, useLong);

	}

	@Override
	public void execute(int now) {
		try {
			// 30分钟定时存库
			ConcurrentHashMap<Long, CrossHouse> allCrossHouseCache = new ConcurrentHashMap<>();
			if (TimeDateUtil.getCurrentTime() - CrossHouseCache.LastSaveTime >= 10 * 60) {
				try {

					Iterator<ConcurrentHashMap<Long, CrossHouse>> iterator = CrossHouseCache.pAllCrossHouseCache
							.values().iterator();
					for (; iterator.hasNext();) {
						ConcurrentHashMap<Long, CrossHouse> map = iterator.next();
						if (map != null) {
							allCrossHouseCache.putAll(map);
						}
					}
					CrossHouseDao.getIns().updateBatch(allCrossHouseCache.values());
				} catch (Exception e) {
					e.printStackTrace();
				}
				CrossHouseCache.LastSaveTime = TimeDateUtil.getCurrentTime();
			}

			if (TimeDateUtil.getCurrentTime() > CrossHouseCache.LastZeroTime) {
				// 发放排名
				CrossHouseCache.LastZeroTime = TimeDateUtil.getTomorrowZeroTimeReturnInt();
				CrossCommonRankCL.getIns().sendMailAwardToLocal(SystemIdConst.YARD);
				LogTool.info("排名奖励发放完毕", HouseGoldSchedule.class);
				
				// 清除天工炉被借用次数
				Iterator<ConcurrentHashMap<Long, CrossHouse>> iterator = CrossHouseCache.pAllCrossHouseCache.values()
						.iterator();
				for (; iterator.hasNext();) {
					ConcurrentHashMap<Long, CrossHouse> map = iterator.next();
					if (map != null) {
						for (CrossHouse cHouse : map.values()) {
							cHouse.setDrawAwardTimes(0);
						}
					}
				}
			}

			Iterator<ConcurrentHashMap<Long, CrossHouse>> iterator = CrossHouseCache.pAllCrossHouseCache.values()
					.iterator();
			for (; iterator.hasNext();) {
				ConcurrentHashMap<Long, CrossHouse> map = iterator.next();
				if (map != null) {
					for (CrossHouse cHouse : map.values()) {
						// 添加金库库存
						CrossHouseFunction.getIns().checkMoney(cHouse);
						// 检查随机事件
						CrossHouseFunction.getIns().checkEvent(cHouse);
						// 检查强盗事件
						CrossHouseFunction.getIns().reshMapNpc(cHouse);
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
