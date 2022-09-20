package com.teamtop.system.alarmSystem.crossActAlarm.imp;

import java.util.List;

import com.teamtop.system.alarmSystem.crossActAlarm.CrossActAlarmHandleAbs;
import com.teamtop.system.battleGoods.BattleGoodConst;
import com.teamtop.system.battleGoods.cache.BattleGoodsLocalCache;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.util.time.TimeDateUtil;

public class CrossBattleGoodsHandleImp extends CrossActAlarmHandleAbs {

	public boolean weekHandle(List<Object[]> objList) {
		// TODO Auto-generated method stub
		int state = BattleGoodsLocalCache.getState();
		if (state != BattleGoodConst.ACT_STATE_2) {
			int week = TimeDateUtil.getWeek();
			objList.add(new Object[] { SystemIdConst.CROSS_BTTLE_GOOD, "粮草抢夺开启失败", week });
			return true;
		}
		return false;
	}

}
