package com.teamtop.system.hiddentreasure;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventFactory;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;

import excel.config.Config_cbg2_729;
import excel.config.Config_cbg_729;
import excel.struct.Struct_cbg2_729;
import excel.struct.Struct_cbg_729;

public class HiddenTreasureCache extends AbsServerEvent {
	/** 配置数据缓存 */
	private static Map<Integer, Map<Integer, ProbabilityEventModel>> qsGradeMap = new HashMap<>();

	/**
	 * key:期数，value:<阶段 ：幸运值区间>
	 */
	private static Map<Integer, Map<Integer, int[][]>> qsLuckyGradeMap = new HashMap<>();

	/**
	 * key:期数，value:下一期
	 */
	private static Map<Integer, Integer> qsNextMap = new HashMap<>();

	/**
	 * 幸运奖励
	 */
	private static Map<Integer, List<Struct_cbg2_729>> qsLuckyAwardMap = new HashMap<>();

	/** 大奖公告记录 10条 */
	private static List<Object[]> noticeList = new ArrayList<>();

	// private static int QS = 1;

	// public static int getQS() {
	// return QS;
	// }
	//
	// public static void setQS(int qS) {
	// QS = qS;
	// }

	public static Map<Integer, List<Struct_cbg2_729>> getQsLuckyAwardMap() {
		return qsLuckyAwardMap;
	}

	public static void setQsLuckyAwardMap(Map<Integer, List<Struct_cbg2_729>> qsLuckyAwardMap) {
		HiddenTreasureCache.qsLuckyAwardMap = qsLuckyAwardMap;
	}

	public static List<Object[]> getNoticeList() {
		return noticeList;
	}

	public static void setNoticeList(List<Object[]> noticeList) {
		HiddenTreasureCache.noticeList = noticeList;
	}

	public static Map<Integer, Map<Integer, int[][]>> getQsLuckyGradeMap() {
		return qsLuckyGradeMap;
	}

	public static void setQsLuckyGradeMap(Map<Integer, Map<Integer, int[][]>> qsLuckyGradeMap) {
		HiddenTreasureCache.qsLuckyGradeMap = qsLuckyGradeMap;
	}

	public static Map<Integer, Integer> getQsNextMap() {
		return qsNextMap;
	}

	public static void setQsNextMap(Map<Integer, Integer> qsNextMap) {
		HiddenTreasureCache.qsNextMap = qsNextMap;
	}

	public static Map<Integer, Map<Integer, ProbabilityEventModel>> getQsGradeMap() {
		return qsGradeMap;
	}

	public static void setQsGradeMap(Map<Integer, Map<Integer, ProbabilityEventModel>> qsGradeMap) {
		HiddenTreasureCache.qsGradeMap = qsGradeMap;
	}

	public static int getGrade(int qs, int lucky) {
		Map<Integer, int[][]> map = qsLuckyGradeMap.get(qs);
		for (int gid : map.keySet()) {
			int[][] arr = map.get(gid);
			if (lucky >= arr[0][0] && lucky <= arr[0][1]) {
				return gid;
			}
		}
		return 1;
	}

	public static ProbabilityEventModel getProModel(int qs, int lucky) {
		int grade = getGrade(qs, lucky);
		Map<Integer, ProbabilityEventModel> gradeMap = qsGradeMap.get(qs);
		ProbabilityEventModel probabilityEventModel = gradeMap.get(grade);
		return probabilityEventModel;
	}

	@Override
	public void shutdownServer() {
		// try {
		// GlobalData globalData =
		// GlobalCache.getGlobalData(GlobalConst.HIDDEN_TREASURE);
		// globalData.setContent(ObjStrTransUtil.toStr(getQS()));
		// GlobalCache.doSync(globalData);
		// } catch (Exception e) {
		// LogTool.error(e, HiddenTreasureCache.class, "HiddenTreasureCache
		// shutdownServer");
		// }
	}

	@Override
	public void startServer() throws RunServerException {
		// try {
		// GlobalData globalData =
		// GlobalCache.getGlobalData(GlobalConst.HIDDEN_TREASURE);
		// String content = globalData.getContent();
		// if (content == null || content.equals("") || content.equals("{}")) {
		// setQS(1);
		// } else {
		// setQS(Integer.parseInt(content));
		// }
		// } catch (Exception e) {
		// LogTool.error(e, HiddenTreasureCache.class, "HiddenTreasureCache
		// startServer");
		// throw new RunServerException(e, "");
		// }
	}

	@Override
	public void initExcel() throws RunServerException {
		List<Struct_cbg_729> sortList = Config_cbg_729.getIns().getSortList();
		int size = sortList.size();
		Struct_cbg_729 struct_cbg_729 = null;
		for (int i = 0; i < size; i++) {
			struct_cbg_729 = sortList.get(i);
			int gid = struct_cbg_729.getBianhao();
			int sQs = struct_cbg_729.getQs();
			int nextQs = struct_cbg_729.getNext();
			Map<Integer, ProbabilityEventModel> gradeMap = qsGradeMap.get(sQs);
			if (gradeMap == null) {
				gradeMap = new HashMap<>();
				qsGradeMap.put(sQs, gradeMap);
			}
			ProbabilityEventModel probabilityModel = gradeMap.get(gid);
			if (probabilityModel == null) {
				probabilityModel = ProbabilityEventFactory.getProbabilityEvent();
				gradeMap.put(gid, probabilityModel);
			}
			Map<Integer, int[][]> luckyGradeMap = qsLuckyGradeMap.get(sQs);
			if (luckyGradeMap == null) {
				luckyGradeMap = new HashMap<>();
				qsLuckyGradeMap.put(sQs, luckyGradeMap);
			}
			int[][] arr = luckyGradeMap.get(gid);
			if (arr == null) {
				luckyGradeMap.put(gid, struct_cbg_729.getJieduan());
			}
			probabilityModel.addProbabilityEvent(struct_cbg_729.getGailv(), struct_cbg_729);
			qsNextMap.put(sQs, nextQs);
		}
		if (qsNextMap.size() != qsGradeMap.size()) {
			throw new RunServerException(new Exception("藏宝阁初始化数据有误"), "");
		}
		// 幸运奖励
		List<Struct_cbg2_729> awardList = Config_cbg2_729.getIns().getSortList();
		int aSize = awardList.size();
		Struct_cbg2_729 cbg2_729 = null;
		for (int i = 0; i < aSize; i++) {
			cbg2_729 = awardList.get(i);
			int aQs = cbg2_729.getQs();
			List<Struct_cbg2_729> list = qsLuckyAwardMap.get(aQs);
			if (list == null) {
				list = new ArrayList<>();
				qsLuckyAwardMap.put(aQs, list);
			}
			list.add(cbg2_729);
		}

	}

}
