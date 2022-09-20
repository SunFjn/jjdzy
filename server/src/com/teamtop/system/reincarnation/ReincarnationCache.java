package com.teamtop.system.reincarnation;

import java.util.HashMap;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.linglongge.LingLongGeSysCache;
import com.teamtop.util.log.LogTool;

import excel.config.Config_lunhui_274;
import excel.struct.Struct_lunhui_274;

public class ReincarnationCache extends AbsServerEvent {
	/** 轮回等级Map key为轮回等级 **/
	private static Map<Integer, Integer> trueLevelMap = new HashMap<>();

	public static Map<Integer, Integer> getTrueLevelMap() {
		return trueLevelMap;
	}

	public static void setTrueLevelMap(Map<Integer, Integer> trueLevelMap) {
		ReincarnationCache.trueLevelMap = trueLevelMap;
	}

	@Override
	public void startServer() throws RunServerException {

	}

	@Override
	public void shutdownServer() {

	}

	@Override
	public void initExcel() throws RunServerException {
		LogTool.info("ReincarnationCache initExcel start", LingLongGeSysCache.class);
		trueLevelMap.clear();
		for (Struct_lunhui_274 config : Config_lunhui_274.getIns().getSortList()) {
			trueLevelMap.put(config.getId(), config.getLv());
		}
		LogTool.info("ReincarnationCache initExcel trueLevelMap =" + trueLevelMap.size(), ReincarnationCache.class);
	}

}
