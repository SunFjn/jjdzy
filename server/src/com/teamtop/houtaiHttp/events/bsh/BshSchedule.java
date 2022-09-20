package com.teamtop.houtaiHttp.events.bsh;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.HeroCmd;
import com.teamtop.util.exector.schedule.AbsScheduleExecutor;
import com.teamtop.util.exector.schedule.ScheduleUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

public class BshSchedule extends AbsScheduleExecutor {

	private int time;

	private long hid;

	public BshSchedule(long delay, long interval, long hid) {
		super(delay, interval, false);
		time = TimeDateUtil.getCurrentTime();
		this.hid = hid;
	}

	@Override
	public void execute(int now) {
		try {
			int currentTime = TimeDateUtil.getCurrentTime();
			if (time == 0) {
				time = currentTime;
			}
			int passTime = currentTime - time;
			Map<Integer, String> resultMap = BshIO.getResultMap();
			if (time == 0) {
				ScheduleUtil.cancelTask(BshIO.taskId);
			}
			int zSize = BshIO.getzSize();
			if (resultMap.size() == zSize || passTime >= 300) {
				List<JSONObject> list = new ArrayList<>();
				Iterator<Entry<Integer, String>> iterator = resultMap.entrySet().iterator();
				for (; iterator.hasNext();) {
					Entry<Integer, String> entry = iterator.next();
					JSONObject data = new JSONObject();
					data.put("zoneid", entry.getKey());
					data.put("result", entry.getValue());
					list.add(data);
				}
				String jsonString = JSON.toJSONString(list);
				LogTool.info("bsh result: " + jsonString, BshSchedule.class);
				NettyWrite.writeData(hid, new Object[] { jsonString, 0 }, HeroCmd.GC_NoticeMsg_164);
				ScheduleUtil.cancelTask(BshIO.taskId);
			}
		} catch (Exception e) {
			LogTool.error(e, BshSchedule.class, "BshSchedule execute");
			ScheduleUtil.cancelTask(BshIO.taskId);
		}
	}

}
