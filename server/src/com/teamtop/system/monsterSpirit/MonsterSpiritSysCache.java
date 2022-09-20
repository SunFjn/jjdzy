package com.teamtop.system.monsterSpirit;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventFactory;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventUtil;

import excel.config.Config_shjx_266;
import excel.config.Config_shjxstartz_266;
import excel.config.Config_shjxxl_266;
import excel.config.Config_shjxyj_266;
import excel.config.Config_xj_266;
import excel.config.Config_xjtz_266;
import excel.struct.Struct_shjx_266;
import excel.struct.Struct_shjxstartz_266;
import excel.struct.Struct_shjxxl_266;
import excel.struct.Struct_shjxyj_266;
import excel.struct.Struct_xj_266;
import excel.struct.Struct_xjtz_266;

public class MonsterSpiritSysCache extends AbsServerEvent {

	/** 初始星宿 */
	private static Map<Integer, Integer> starBaseMap = new HashMap<>();

	/** 普通洗练随机数据 */
	private static Map<int[], ProbabilityEventModel> washMap = new HashMap<>();

	/** 印记道具洗练随机数据 */
	private static Map<Integer, Map<Integer, ProbabilityEventModel>> stampWashMap = new HashMap<>();

	/** 类型套装数据 */
	private static Map<Integer, Map<Integer, Struct_shjx_266>> typeSetMap = new HashMap<>();

	/** 星级套装数据 */
	private static Map<Integer, Map<Integer, Struct_shjxstartz_266>> starSetMap = new HashMap<>();

	/** 星宿套装数据 */
	private static Map<Integer, List<Struct_xjtz_266>> starGradeSetMap = new HashMap<>();

	private static List<Integer> siteList = new ArrayList<>();
	/** 青龙位置集合 */
	private static List<Integer> qinglongSiteList = new ArrayList<>();
	/** 白虎位置集合 */
	private static List<Integer> baihuSiteList = new ArrayList<>();
	/** 朱雀位置集合 */
	private static List<Integer> zhuqueSiteList = new ArrayList<>();
	/** 玄武位置集合 */
	private static List<Integer> xuanwuSiteList = new ArrayList<>();

	public static List<Integer> getSiteList() {
		return siteList;
	}

	public static void setSiteList(List<Integer> siteList) {
		MonsterSpiritSysCache.siteList = siteList;
	}

	static {
		siteList.add(GameConst.INDEX_110);
		siteList.add(GameConst.INDEX_111);
		siteList.add(GameConst.INDEX_112);
		qinglongSiteList.add(GameConst.INDEX_110);
		qinglongSiteList.add(GameConst.INDEX_111);
		qinglongSiteList.add(GameConst.INDEX_112);
		siteList.add(GameConst.INDEX_120);
		siteList.add(GameConst.INDEX_121);
		siteList.add(GameConst.INDEX_122);
		baihuSiteList.add(GameConst.INDEX_120);
		baihuSiteList.add(GameConst.INDEX_121);
		baihuSiteList.add(GameConst.INDEX_122);
		siteList.add(GameConst.INDEX_130);
		siteList.add(GameConst.INDEX_131);
		siteList.add(GameConst.INDEX_132);
		zhuqueSiteList.add(GameConst.INDEX_130);
		zhuqueSiteList.add(GameConst.INDEX_131);
		zhuqueSiteList.add(GameConst.INDEX_132);
		siteList.add(GameConst.INDEX_140);
		siteList.add(GameConst.INDEX_141);
		siteList.add(GameConst.INDEX_142);
		xuanwuSiteList.add(GameConst.INDEX_140);
		xuanwuSiteList.add(GameConst.INDEX_141);
		xuanwuSiteList.add(GameConst.INDEX_142);
	}

	public static int getTypeByEquipPart(int equipPart) {
		int type = 0;
		if (qinglongSiteList.contains(equipPart)) {
			type = 1;
		} else if (baihuSiteList.contains(equipPart)) {
			type = 2;
		} else if (zhuqueSiteList.contains(equipPart)) {
			type = 3;
		} else if (xuanwuSiteList.contains(equipPart)) {
			type = 4;
		}
		return type;
	}

	public static Map<Integer, Integer> getStarBaseMap() {
		return starBaseMap;
	}

	public static void setStarBaseMap(Map<Integer, Integer> starBaseMap) {
		MonsterSpiritSysCache.starBaseMap = starBaseMap;
	}

	public static Map<int[], ProbabilityEventModel> getWashMap() {
		return washMap;
	}

	public static void setWashMap(Map<int[], ProbabilityEventModel> washMap) {
		MonsterSpiritSysCache.washMap = washMap;
	}

	public static Map<Integer, Map<Integer, ProbabilityEventModel>> getStampWashMap() {
		return stampWashMap;
	}

	public static void setStampWashMap(Map<Integer, Map<Integer, ProbabilityEventModel>> stampWashMap) {
		MonsterSpiritSysCache.stampWashMap = stampWashMap;
	}

	public static Map<Integer, Map<Integer, Struct_shjx_266>> getTypeSetMap() {
		return typeSetMap;
	}

	public static void setTypeSetMap(Map<Integer, Map<Integer, Struct_shjx_266>> typeSetMap) {
		MonsterSpiritSysCache.typeSetMap = typeSetMap;
	}

	public static Map<Integer, Map<Integer, Struct_shjxstartz_266>> getStarSetMap() {
		return starSetMap;
	}

	public static void setStarSetMap(Map<Integer, Map<Integer, Struct_shjxstartz_266>> starSetMap) {
		MonsterSpiritSysCache.starSetMap = starSetMap;
	}

	public static Map<Integer, List<Struct_xjtz_266>> getStarGradeSetMap() {
		return starGradeSetMap;
	}

	public static void setStarGradeSetMap(Map<Integer, List<Struct_xjtz_266>> starGradeSetMap) {
		MonsterSpiritSysCache.starGradeSetMap = starGradeSetMap;
	}

	/** 获取随机的印记星级id */
	public static int getRandomStampStarId(int washTimes) {
		Iterator<int[]> iterator = washMap.keySet().iterator();
		int[] section = null;
		ProbabilityEventModel eventModel = null;
		Integer stampStarId = 0;
		for(;iterator.hasNext();) {
			section = iterator.next();
			if (section[1] == 0 && washTimes >= section[0]) {
				eventModel = washMap.get(section);
				stampStarId = (Integer) ProbabilityEventUtil.getEventByProbability(eventModel);
				break;
			} else if (washTimes >= section[0] && washTimes <= section[1]) {
				eventModel = washMap.get(section);
				stampStarId = (Integer) ProbabilityEventUtil.getEventByProbability(eventModel);
				break;
			}
		}
		if (stampStarId == null) {
			stampStarId = 0;
		}
		return stampStarId;
	}

	/** 使用印记道具获取随机的印记星级id */
	public static int getRandomStampStarIdByStamp(int type, int stampId) {
		Map<Integer, ProbabilityEventModel> map = stampWashMap.get(type);
		ProbabilityEventModel eventModel = map.get(stampId);
		Integer stampStarId = (Integer) ProbabilityEventUtil.getEventByProbability(eventModel);
		if (stampStarId == null) {
			stampStarId = 0;
		}
		return stampStarId;
	}

	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub

	}

	@Override
	public void initExcel() throws RunServerException {
		starBaseMap.clear();
		washMap.clear();
		stampWashMap.clear();
		typeSetMap.clear();
		starSetMap.clear();
		starGradeSetMap.clear();
		List<Struct_xj_266> sortList = Config_xj_266.getIns().getSortList();
		int size = sortList.size();
		for (int i = 0; i < size; i++) {
			int lv = sortList.get(i).getLv();
			int type = lv / 100000;
			Integer baseLv = starBaseMap.get(type);
			if (baseLv == null) {
				starBaseMap.put(type, lv);
			}
		}
		List<Struct_shjxxl_266> shjxxlSortList = Config_shjxxl_266.getIns().getSortList();
		size = shjxxlSortList.size();
		for (int i = 0; i < size; i++) {
			Struct_shjxxl_266 shjxxl_266 = shjxxlSortList.get(i);
			int[] key = shjxxl_266.getTime()[0];
			ProbabilityEventModel eventModel = washMap.get(key);
			if (eventModel == null) {
				eventModel = ProbabilityEventFactory.getProbabilityEvent();
				washMap.put(key, eventModel);
			}
			int[][] star = shjxxl_266.getStar();
			int starSize = star.length;
			for (int j = 0; j < starSize; j++) {
				eventModel.addProbabilityEvent(star[j][1], star[j][0]);
			}
		}
		List<Struct_shjxyj_266> stampSortList = Config_shjxyj_266.getIns().getSortList();
		size = stampSortList.size();
		for (int i = 0; i < size; i++) {
			Struct_shjxyj_266 shjxyj_266 = stampSortList.get(i);
			int yj = shjxyj_266.getYj();
			Map<Integer, ProbabilityEventModel> map = stampWashMap.get(yj);
			if (map == null) {
				map = new HashMap<>();
				stampWashMap.put(yj, map);
			}
			int id = shjxyj_266.getId();
			ProbabilityEventModel eventModel = map.get(id);
			if (eventModel == null) {
				eventModel = ProbabilityEventFactory.getProbabilityEvent();
				map.put(id, eventModel);
			}
			int[][] star = shjxyj_266.getStar();
			int starSize = star.length;
			for (int j = 0; j < starSize; j++) {
				eventModel.addProbabilityEvent(star[j][1], star[j][0]);
			}
		}

		List<Struct_shjx_266> typeList = Config_shjx_266.getIns().getSortList();
		size = typeList.size();
		for (int i = 0; i < size; i++) {
			Struct_shjx_266 shjx_266 = typeList.get(i);
			int type = shjx_266.getYj();
			Map<Integer, Struct_shjx_266> map = typeSetMap.get(type);
			if (map == null) {
				map = new HashMap<>();
				typeSetMap.put(type, map);
			}
			int id = shjx_266.getId();
			map.put(id, shjx_266);
		}
		
		List<Struct_shjxstartz_266> starList = Config_shjxstartz_266.getIns().getSortList();
		size = starList.size();
		for(int i=0;i<size;i++) {
			Struct_shjxstartz_266 shjxstartz_266 = starList.get(i);
			int bw = shjxstartz_266.getBw();
			int star = shjxstartz_266.getStar();
			Map<Integer, Struct_shjxstartz_266> map = starSetMap.get(bw);
			if (map == null) {
				map = new HashMap<>();
				starSetMap.put(bw, map);
			}
			map.put(star, shjxstartz_266);
		}

		List<Struct_xjtz_266> starSetList = Config_xjtz_266.getIns().getSortList();
		size = starSetList.size();
		for (int i = 0; i < size; i++) {
			Struct_xjtz_266 xjtz_266 = starSetList.get(i);
			int type = xjtz_266.getLx();
			List<Struct_xjtz_266> list = starGradeSetMap.get(type);
			if (list == null) {
				list = new ArrayList<>();
				starGradeSetMap.put(type, list);
			}
			list.add(xjtz_266);
		}
	}

}
