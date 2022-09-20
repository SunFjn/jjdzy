package com.teamtop.system.alarmSystem.crossActAlarm.imp;

import java.util.List;

import com.teamtop.system.activityNotice.ActivityNoticeFunction;
import com.teamtop.system.alarmSystem.crossActAlarm.CrossActAlarmHandleAbs;
import com.teamtop.system.crossWenDingTianXia.CrossWenDingTianXiaCache;
import com.teamtop.system.crossWenDingTianXia.CrossWenDingTianXiaConst;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.util.time.TimeDateUtil;

public class CrossWenDingTianXiaHandleImp extends CrossActAlarmHandleAbs {

	public boolean weekHandle(List<Object[]> objList) {
		// TODO Auto-generated method stub
		boolean isOpen = true;
		if (ActivityNoticeFunction.getIns().isNewServer() && !ActivityNoticeFunction.getIns().isOpenSpecialHandle()) {
			// 问鼎天下特殊处理 前3天新服按开服第1和第3天开
			isOpen = false;
		}
		int state = CrossWenDingTianXiaCache.getState();
		if (isOpen && state != CrossWenDingTianXiaConst.STATE_1) {
			int week = TimeDateUtil.getWeek();
			objList.add(new Object[] { SystemIdConst.CROSS_WEN_DING_TIAN_XIA, "问鼎天下开启失败", week });
			return true;
		}
		return false;
	}

}
