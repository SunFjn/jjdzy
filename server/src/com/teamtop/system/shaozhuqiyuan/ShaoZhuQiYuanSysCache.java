package com.teamtop.system.shaozhuqiyuan;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.linglongge.LingLongGeFunction;
import com.teamtop.system.linglongge.LingLongGeSysCache;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.excel.ExcelJsonUtils;
import com.teamtop.util.log.LogTool;

import excel.config.Config_sonpoint_267;
import excel.config.Config_sonqy_267;
import excel.config.Config_sonqydj_267;
import excel.struct.Struct_sonpoint_267;
import excel.struct.Struct_sonqy_267;
import excel.struct.Struct_sonqydj_267;

public class ShaoZhuQiYuanSysCache extends AbsServerEvent {
	/** 少主祈愿积分表 key为少主祈愿积分表配置次数 **/
	private static Map<Integer, Struct_sonpoint_267> szqyScoreTableMap = new HashMap<>();
	/** 普通奖励概率事件Map key为少主祈愿表id **/
	private static List<ProbabilityEventModel> genAwardList = new ArrayList<>();
	/** 高级奖励概率事件Map key为少主祈愿大奖表次数 **/
	private static Map<Integer, List<List<ProbabilityEventModel>>> higtAwardMap = new HashMap<>();

	private static int maxTimes;

	private static int maxScore;

	public static Map<Integer, Struct_sonpoint_267> getSzqyScoreTableMap() {
		return szqyScoreTableMap;
	}

	public static void setSzqyScoreTableMap(Map<Integer, Struct_sonpoint_267> szqyScoreTableMap) {
		ShaoZhuQiYuanSysCache.szqyScoreTableMap = szqyScoreTableMap;
	}

	public static List<ProbabilityEventModel> getGenAwardList() {
		return genAwardList;
	}

	public static void setGenAwardList(List<ProbabilityEventModel> genAwardList) {
		ShaoZhuQiYuanSysCache.genAwardList = genAwardList;
	}

	public static Map<Integer, List<List<ProbabilityEventModel>>> getHigtAwardMap() {
		return higtAwardMap;
	}

	public static void setHigtAwardMap(Map<Integer, List<List<ProbabilityEventModel>>> higtAwardMap) {
		ShaoZhuQiYuanSysCache.higtAwardMap = higtAwardMap;
	}

	@Override
	public void startServer() throws RunServerException {

	}

	@Override
	public void shutdownServer() {

	}

	@Override
	public void initExcel() throws RunServerException {
		LogTool.info("ShaoZhuQiYuanSysCache initExcel start", LingLongGeSysCache.class);
		szqyScoreTableMap.clear();
		genAwardList.clear();
		higtAwardMap.clear();

		for (Struct_sonpoint_267 sonpoint : Config_sonpoint_267.getIns().getSortList()) {
			szqyScoreTableMap.put(sonpoint.getPoint(), sonpoint);
			if (sonpoint.getPoint() > maxScore) {
				maxScore = sonpoint.getPoint();
			}
		}
		
		for (Struct_sonqy_267 sonqy : Config_sonqy_267.getIns().getSortList()) {
			genAwardList = ExcelJsonUtils.getGeneralDropData(sonqy.getReward());
		}

		for (Struct_sonqydj_267 sonqydj : Config_sonqydj_267.getIns().getSortList()) {
			List<List<ProbabilityEventModel>> list = new ArrayList<>();
			list.add(ExcelJsonUtils.getGeneralDropData(sonqydj.getReward1()));
			list.add(ExcelJsonUtils.getGeneralDropData(sonqydj.getReward2()));
			list.add(ExcelJsonUtils.getGeneralDropData(sonqydj.getReward3()));
			higtAwardMap.put(sonqydj.getYq(), list);
			if (sonqydj.getYq() > maxTimes) {
				maxTimes = sonqydj.getYq();
			}
		}

		int tableId = LingLongGeFunction.getIns().getTableId();
		LogTool.info("ShaoZhuQiYuanSysCache initExcel end tableId=" + tableId, ShaoZhuQiYuanSysCache.class);
		int size1 = szqyScoreTableMap.size();
		int size2 = genAwardList.size();
		int size3 = higtAwardMap.size();
		LogTool.info("ShaoZhuQiYuanSysCache initExcel szqyScoreTableMap =" + size1, ShaoZhuQiYuanSysCache.class);
		LogTool.info("ShaoZhuQiYuanSysCache initExcel genAwardList =" + size2, ShaoZhuQiYuanSysCache.class);
		LogTool.info("ShaoZhuQiYuanSysCache initExcel higtAwardMap =" + size3, ShaoZhuQiYuanSysCache.class);
	}

	public static int getMaxTimes() {
		return maxTimes;
	}

	public static void setMaxTimes(int maxTimes) {
		ShaoZhuQiYuanSysCache.maxTimes = maxTimes;
	}

	public static int getMaxScore() {
		return maxScore;
	}

	public static void setMaxScore(int maxScore) {
		ShaoZhuQiYuanSysCache.maxScore = maxScore;
	}
}
