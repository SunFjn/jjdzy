package com.teamtop.system.shaozhuEscort;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeSet;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.shaozhuEscort.model.ShaoZhuEscortInfo;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventFactory;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.common.CommonUtil;

import excel.config.Config_szhs_401;
import excel.struct.Struct_szhs_401;

public class ShaoZhuEscortSysCache extends AbsServerEvent {
	/** 概率事件Map key为配置表id **/
	private static Map<Integer, ProbabilityEventModel> idToProbabilityMap = new HashMap<>();
	/** 损失奖励Map key为配置表id **/
	private static Map<Integer, Object[]> lossAwardArrayMap = new HashMap<>();
	private static ShaoZhuEscortCache shaozhuEscortCache = new ShaoZhuEscortCache();
	private static List<ShaoZhuEscortInfo> shaozhuEscortInfoList = new ArrayList<>();
	/** 同屏刷新时间 **/
	private static int refreshTime = 0;

	public static Map<Integer, ProbabilityEventModel> getIdToProbabilityMap() {
		return idToProbabilityMap;
	}

	public static TreeSet<ShaoZhuEscortInfo> getShaozhuEscortInfoTreeSet() {
		return shaozhuEscortCache.getShaozhuEscortInfoTreeSet();
	}

	public static ShaoZhuEscortCache getShaozhuEscortCache() {
		return shaozhuEscortCache;
	}

	public static void setShaozhuEscortInfoList(List<ShaoZhuEscortInfo> shaozhuEscortInfoList) {
		ShaoZhuEscortSysCache.shaozhuEscortInfoList = shaozhuEscortInfoList;
	}

	public static List<ShaoZhuEscortInfo> getShaozhuEscortInfoList() {
		return shaozhuEscortInfoList;
	}

	public static int getRefreshTime() {
		return refreshTime;
	}

	public static void setRefreshTime(int refreshTime) {
		ShaoZhuEscortSysCache.refreshTime = refreshTime;
	}

	public static Map<Integer, Object[]> getLossAwardArrayMap() {
		return lossAwardArrayMap;
	}

	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub

	}

	@Override
	public void shutdownServer() {
		// TODO Auto-generated method stub
	}

	@Override
	public void initExcel() throws RunServerException {
		// TODO Auto-generated method stub
		lossAwardArrayMap.clear();
		idToProbabilityMap.clear();
		List<Struct_szhs_401> sortList = Config_szhs_401.getIns().getSortList();
		for (Struct_szhs_401 struct_szhs_401 : sortList) {
			// 损失奖励配置
			int id = struct_szhs_401.getId();
			int[][] lj = struct_szhs_401.getLj();
			Map<Integer, Map<Integer, Integer>> ljMap = new HashMap<>();
			CommonUtil.arrayIntoMap(ljMap, lj, 1);
			Object[][] lossAwardArray = CommonUtil.awardMap2ObjcetArray(ljMap);
			lossAwardArrayMap.put(id, lossAwardArray);

			// 初始化概率事件配置
			ProbabilityEventModel pm = ProbabilityEventFactory.getProbabilityEvent();
			int[][] up = struct_szhs_401.getUp();
			if (up == null) {
				continue;
			}
			for (int[] array : up) {
				pm.addProbabilityEvent(array[1], array[0]);
			}
			idToProbabilityMap.put(id, pm);
		}
	}

}
