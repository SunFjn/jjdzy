package com.teamtop.system.activity.ativitys.serverConsumeAct;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;
import java.util.concurrent.atomic.AtomicLong;

import com.alibaba.fastjson.JSON;
import com.teamtop.cross.CrossZone;
import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.util.common.ConcurrentHashSet;
import com.teamtop.util.log.LogTool;

import excel.config.Config_qfxf_768;
import excel.struct.Struct_qfxf_768;

public class ServerConsumeActSysCache extends AbsServerEvent {
	/** 新活动-全服消费奖励配置 第一层key:期数 第二层key:全服消费 **/
	private static Map<Integer, Map<Integer, List<Struct_qfxf_768>>> configMap = new HashMap<>();

	private static AtomicLong serverConsume;

	private static Set<Integer> redPointStateSet = new ConcurrentHashSet<>();

	public static Set<Integer> getRedPointStateSet() {
		return redPointStateSet;
	}

	public static AtomicLong getServerConsume() {
		return serverConsume;
	}

	public static Map<Integer, Map<Integer, List<Struct_qfxf_768>>> getConfigMap() {
		return configMap;
	}

	@Override
	public void initExcel() throws RunServerException {
		// TODO Auto-generated method stub
		if (CrossZone.isCrossServer()) {
			return;
		}
		configMap.clear();
		List<Struct_qfxf_768> sortList = Config_qfxf_768.getIns().getSortList();
		for (Struct_qfxf_768 struct_qfxf_768 : sortList) {
			int qs = struct_qfxf_768.getQs();
			Map<Integer, List<Struct_qfxf_768>> map = configMap.get(qs);
			if (map == null) {
				map = new TreeMap<>();
				configMap.put(qs, map);
			}
			int qf = struct_qfxf_768.getQf();
			List<Struct_qfxf_768> list = map.get(qf);
			if (list == null) {
				list = new ArrayList<>();
				map.put(qf, list);
			}
			list.add(struct_qfxf_768);
		}

	}

	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub
		String content = "";
		try {
			content = GlobalCache.getGlobalData(GlobalConst.SERVERCONSUME_NEWACT_CONSUMENUM).getContent();
			if (content == null || content.equals("") || content.equals("{}")) {
				serverConsume = new AtomicLong();
			} else {
				long serverConsumeLong = Long.parseLong(content);
				serverConsume = new AtomicLong(serverConsumeLong);
			}
		} catch (Exception e) {
			serverConsume = new AtomicLong();
			LogTool.error(e, this, "ServerConsumeActSysCache startServer content:" + content);
		}
	}

	@Override
	public void shutdownServer() {
		// TODO Auto-generated method stub
		String content = "";
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.SERVERCONSUME_NEWACT_CONSUMENUM);
			content = JSON.toJSONString(serverConsume);
			globalData.setContent(content);
			GlobalCache.doSync(globalData);
		} catch (Exception e) {
			LogTool.error(e, this, "ServerConsumeActSysCache shutdownServer:" + content);
		}
	}

}
