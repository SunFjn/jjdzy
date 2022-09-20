package com.teamtop.system.crossFireBeacon;

import java.util.Iterator;
import java.util.Map;
import java.util.Set;

import com.teamtop.system.crossFireBeacon.model.FireBeaconRoom;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.exector.schedule.AbsScheduleExecutor;
import com.teamtop.util.log.LogTool;

public class CrossFireBeaconSchedule extends AbsScheduleExecutor {

	public CrossFireBeaconSchedule(long delay, long interval) {
		super(delay, interval, false);
	}

	@Override
	public void execute(int now) {
		try {
			// 活动期间定时检测 征收、战斗
			if (CrossFireBeaconSysCache.FireBeaconState != CrossFireBeaconConst.FB_OPEN) {
				return;
			}
			Set<Integer> keySet = CrossFireBeaconSysCache.getFireBeaconCacheMap().keySet();
			for (int partId : keySet) {
				try {
					Map<Integer, FireBeaconRoom> roomMap = CrossFireBeaconSysCache.getRoomMap(partId);
					Iterator<FireBeaconRoom> iterator = roomMap.values().iterator();
					FireBeaconRoom fireBeaconRoom = null;
					Hero hero = null;
					long hid = 0;
					for (; iterator.hasNext();) {
						fireBeaconRoom = iterator.next();
						// 修改为前端触发积分结算
						// Set<Long> members = new HashSet<>(fireBeaconRoom.getMembers());
						// Iterator<Long> mbIte = members.iterator();
						// for (; mbIte.hasNext();) {
						// hid = mbIte.next();
						// hero = HeroCache.getHero(hid);
						// if (hero == null) {
						// continue;
						// }
						// // 征收
						// CrossFireBeaconFunction.getIns().levyHandle(hero, false);
						// }
						CrossFireBeaconFunction.getIns().updateServerScore(fireBeaconRoom.getRoomId(), partId);
						// 战斗检测
						CrossFireBeaconFunction.getIns().battleCheck(fireBeaconRoom);
					}
				} catch (Exception e) {
					LogTool.error(e, CrossFireBeaconSchedule.class, "CrossFireBeaconSchedule partId=" + partId);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, CrossFireBeaconSchedule.class, "CrossFireBeaconSchedule levy");
		}
	}

}
