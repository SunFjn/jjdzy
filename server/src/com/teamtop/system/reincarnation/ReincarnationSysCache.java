package com.teamtop.system.reincarnation;

import java.util.HashMap;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.linglongge.LingLongGeSysCache;
import com.teamtop.util.log.LogTool;

import excel.config.Config_lunhui_274;
import excel.struct.Struct_lunhui_274;

public class ReincarnationSysCache extends AbsServerEvent {
	/** 轮回真实等级Map key为轮回等级 **/
	private static Map<Integer, Integer> trueLevelMap = new HashMap<>();

	@Override
	public void startServer() throws RunServerException {
	}

	@Override
	public void shutdownServer() {
	}

	@Override
	public void initExcel() throws RunServerException {
		LogTool.info("ReincarnationSysCache initExcel start", LingLongGeSysCache.class);
		trueLevelMap.clear();

		int sumLevel = 0;
		for (Struct_lunhui_274 config : Config_lunhui_274.getIns().getSortList()) {
			trueLevelMap.put(config.getId(), sumLevel);
			sumLevel += config.getLv();
		}
		LogTool.info("ShaoZhuQiYuanSysCache initExcel trueLevelMap =" + trueLevelMap.size(),
				ReincarnationSysCache.class);
	}

	public static Map<Integer, Integer> getTrueLevelMap() {
		return trueLevelMap;
	}

	public static void setTrueLevelMap(Map<Integer, Integer> trueLevelMap) {
		ReincarnationSysCache.trueLevelMap = trueLevelMap;
	}

}