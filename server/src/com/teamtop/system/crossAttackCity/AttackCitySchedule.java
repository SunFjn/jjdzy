package com.teamtop.system.crossAttackCity;

import java.util.Iterator;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.crossAttackCity.cross.AttackCityCrossCache;
import com.teamtop.system.crossAttackCity.cross.AttackCityCrossFunction;
import com.teamtop.system.crossAttackCity.cross.AttackCityEnum;
import com.teamtop.system.crossAttackCity.model.AttackCity;
import com.teamtop.system.crossAttackCity.model.AttackCityDao;
import com.teamtop.system.crossAttackCity.model.CityInfo;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.exector.schedule.AbsScheduleExecutor;
import com.teamtop.util.time.TimeDateUtil;

import io.netty.channel.Channel;

public class AttackCitySchedule extends AbsScheduleExecutor {

	public AttackCitySchedule(long delay, long interval, boolean useLong) {
		super(delay, interval, useLong);
	}

	@Override
	public void execute(int now) {

		// 检测城池状态
		ConcurrentHashMap<Integer, AttackCity> map = AttackCityCrossCache.allAttackCityCache;
		Iterator<AttackCity> iterator = map.values().iterator();
		while (iterator.hasNext()) {
			AttackCity next = iterator.next();
			AttackCityCrossFunction.getIns().checkCityInfo(next);
			Map<Integer, CityInfo> cityInfoMap = next.getCityInfoMap();
			if (cityInfoMap == null) {
				continue;
			}
			Iterator<CityInfo> iterator2 = cityInfoMap.values().iterator();
			while (iterator2.hasNext()) {
				CityInfo cityInfo2 = iterator2.next();
				if (cityInfo2.getState() == 2) {
					// 发放奖励
					CrossData crossData1 = new CrossData();
					crossData1.putObject(AttackCityEnum.hid, cityInfo2.getHid());
					crossData1.putObject(AttackCityEnum.StartTime, cityInfo2.getStartTime());
					crossData1.putObject(AttackCityEnum.ChTime, TimeDateUtil.getCurrentTime());
					crossData1.putObject(AttackCityEnum.cityId, cityInfo2.getCityId());
					Channel c = CrossCache.getChannel(CommonUtil.getZoneIdById(cityInfo2.getHid()));
					if (c == null) {
						// 还没初始化
						continue;
					}
					NettyWrite.writeXData(c, CrossConst.CROSS_ATTACK_CITY_REMOVE, crossData1);
					iterator2.remove();
				}
			}
		}
		// 30分钟定时存库
		if (TimeDateUtil.getCurrentTime() - AttackCityCrossCache.LastSaveTime >= 30 * 60) {
			try {
				ConcurrentHashMap<Integer, AttackCity> allAttackCityMap = new ConcurrentHashMap<>();

				if (map != null) {
					allAttackCityMap.putAll(map);
				}
				
				AttackCityDao.getIns().updateDataBatch(allAttackCityMap.values());
			} catch (Exception e) {
				e.printStackTrace();
			}
			AttackCityCrossCache.LastSaveTime = TimeDateUtil.getCurrentTime();
		}
	}

}
