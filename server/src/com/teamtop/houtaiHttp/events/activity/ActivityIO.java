package com.teamtop.houtaiHttp.events.activity;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.activity.ActivitySysCache;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.util.log.LogTool;

import io.netty.channel.Channel;

public class ActivityIO {

	private static ActivityIO ins;

	private ActivityIO() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized ActivityIO getIns() {
		if (ins == null) {
			ins = new ActivityIO();
		}
		return ins;
	}

	public void actSwitch(List<Integer> zoneList, int activityId, int type) {
		try {
			ConcurrentHashMap<Integer, Channel> zoneidToChannel = CrossCache.getZoneidToChannel();
			int size = zoneList.size();
			if (size == 0) {
				zoneList = new ArrayList<>(zoneidToChannel.keySet());
				size = zoneList.size();
			}
			int zoneid = 0;
			Channel channel = null;
			for (int i = 0; i < size; i++) {
				zoneid = zoneList.get(i);
				channel = CrossCache.getChannel(zoneid);
				CrossData data = new CrossData();
				data.putObject(ActivityIOEnum.activityId.name(), activityId);
				data.putObject(ActivityIOEnum.zoneid.name(), zoneid);
				data.putObject(ActivityIOEnum.type.name(), type);
				NettyWrite.writeXData(channel, CrossConst.ACT_SWITCH, data);
			}
		} catch (Exception e) {
			LogTool.error(e, ActivityIO.class, "ActivityIO actOpen, type=" + type);
			throw e;
		}
	}

	public void actSwitchHandle(Channel channel, CrossData crossData) {
		int type = -1;
		try {
			int activityId = crossData.getObject(ActivityIOEnum.activityId.name(), Integer.class);
			int zoneid = crossData.getObject(ActivityIOEnum.zoneid.name(), Integer.class);
			type = crossData.getObject(ActivityIOEnum.type.name(), Integer.class);
			ActivityInfo activityInfo = ActivitySysCache.getActivityMap().get(activityId);
			// 1开启,2关闭
			if (type == 1) {
				activityInfo.setSwitchOn();
			} else if (type == 2) {
				activityInfo.setSwitchOff();
			}
		} catch (Exception e) {
			LogTool.error(e, ActivityIO.class, "ActivityIO actOpen, type=" + type);
		}
	}

}
