package com.teamtop.system.house.yanhui.cross;

import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;

import com.teamtop.cross.CrossPartCache;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.house.yanhui.YanhuiConst;
import com.teamtop.system.house.yanhui.YanhuiSender;
import com.teamtop.system.house.yanhui.model.Yanhui;
import com.teamtop.system.house.yanhui.model.YanhuiMember;
import com.teamtop.util.exector.schedule.AbsScheduleExecutor;
import com.teamtop.util.log.LogTool;

public class YanhuiCrossSchedule extends AbsScheduleExecutor{

	public YanhuiCrossSchedule(long delay, long interval, boolean useLong) {
		super(delay, interval, useLong);
	}

	@Override
	public void execute(int now) {
		Iterator<Integer> iterator = CrossPartCache.getPartMap().keySet().iterator();
		for (; iterator.hasNext();) {
			int partId = iterator.next();
			Map<Integer, Yanhui> yanhuiMap = YanhuiCrossCache.getIns().getAllYanhuibyPartId(partId);
			if(yanhuiMap != null) {
				Iterator<Entry<Integer, Yanhui>> it = yanhuiMap.entrySet().iterator();
				while(it.hasNext()) {
					Entry<Integer, Yanhui> entry = it.next();
					Yanhui yanhui = entry.getValue();
					int time = YanhuiCrossFunction.getIns().getTime(yanhui);
					if(time == 0) {
						YanhuiCrossFunction.getIns().removeYanhui(partId, yanhui);
						Map<Long, YanhuiMember> members = yanhui.getYanhuiMemberMap();
						for(long hid : members.keySet()) {
							YanhuiCrossCache.getIns().removeYanhuiId(hid);
							YanhuiSender.sendCmd_11472(hid, SystemIdConst.YANHUI, YanhuiConst.JUBAN_END);
						}
						it.remove();
						
						LogTool.info("YanhuiCrossSchedule execute hid="+ yanhui.getHid()+ " partId="+partId, YanhuiCrossSchedule.class);
					}
				}
			}
		}
	}

}
