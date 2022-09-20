package com.teamtop.system.alarmSystem.crossActAlarm.imp;

import java.util.List;

import com.teamtop.system.alarmSystem.crossActAlarm.CrossActAlarmHandleAbs;
import com.teamtop.system.crossFireBeacon.CrossFireBeaconFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.util.time.TimeDateUtil;

public class CrossFireBeaconHandleImp extends CrossActAlarmHandleAbs {

	public boolean weekHandle(List<Object[]> objList) {
		// TODO Auto-generated method stub
		boolean open = CrossFireBeaconFunction.getIns().isOpen();
		if (!open) {
			int week = TimeDateUtil.getWeek();
			objList.add(new Object[] { SystemIdConst.CROSS_FIRE_BEACON, "烽火狼烟开启失败", week });
			return true;
		}
		return false;
	}

}
