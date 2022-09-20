package com.teamtop.system.openDaysSystem.wishingTree;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.excel.ExcelJsonUtils;

import excel.config.Config_xysjlb_328;
import excel.config.Config_xysmbb_328;
import excel.config.Config_xysslb_328;
import excel.struct.Struct_xysjlb_328;
import excel.struct.Struct_xysmbb_328;
import excel.struct.Struct_xysslb_328;

public class WishingTreeSysCache extends AbsServerEvent {
	/** 普通和高级奖励概率事件Map key为期数 **/
	private static Map<Integer, List<List<ProbabilityEventModel>>> awardMap = new HashMap<>();
	/** 最大抽奖次数 **/
	private static int maxNum;
	/** 许愿树(系统)目标奖励配置 key:期数 **/
	private static Map<Integer, List<Struct_xysslb_328>> targetConfigMap = new HashMap<>();
	
	@Override
	public void startServer() throws RunServerException {

	}
	
	@Override
	public void initExcel() throws RunServerException {
		awardMap.clear();
		targetConfigMap.clear();
		maxNum = 0;
		for (Struct_xysjlb_328 struct_xysjlb_328 : Config_xysjlb_328.getIns().getSortList()) {
			List<List<ProbabilityEventModel>> list = new ArrayList<>();
			list.add(ExcelJsonUtils.getGeneralDropData(struct_xysjlb_328.getPt()));
			list.add(ExcelJsonUtils.getGeneralDropData(struct_xysjlb_328.getGj()));
			awardMap.put(struct_xysjlb_328.getQs(), list);
		}

		List<Struct_xysslb_328> targetList = Config_xysslb_328.getIns().getSortList();
		for (Struct_xysslb_328 struct_xysslb_328 : targetList) {
			int qs = struct_xysslb_328.getQs();
			List<Struct_xysslb_328> list = targetConfigMap.get(qs);
			if (list == null) {
				list = new ArrayList<>();
				targetConfigMap.put(qs, list);
			}
			list.add(struct_xysslb_328);
		}
	}

	public static Map<Integer, List<List<ProbabilityEventModel>>> getAwardMap() {
		return awardMap;
	}

	public static void setAwardMap(Map<Integer, List<List<ProbabilityEventModel>>> awardMap) {
		WishingTreeSysCache.awardMap = awardMap;
	}

	public static int getMaxNum(int periods) {
		List<Struct_xysmbb_328> sortList = Config_xysmbb_328.getIns().getSortList();
		for (Struct_xysmbb_328 struct_xysmbb_328 : sortList) {
			int qs = struct_xysmbb_328.getQs();
			if (periods != qs) {
				continue;
			}
			if (struct_xysmbb_328.getCs() > maxNum) {
				maxNum = struct_xysmbb_328.getCs();
			}
		}
		return maxNum;
	}

	public static void setMaxNum(int maxNum) {
		WishingTreeSysCache.maxNum = maxNum;
	}

	public static Map<Integer, List<Struct_xysslb_328>> getTargetConfigMap() {
		return targetConfigMap;
	}

	public static void setTargetConfigMap(Map<Integer, List<Struct_xysslb_328>> targetConfigMap) {
		WishingTreeSysCache.targetConfigMap = targetConfigMap;
	}

	public static int getMaxNum() {
		return maxNum;
	}

}
