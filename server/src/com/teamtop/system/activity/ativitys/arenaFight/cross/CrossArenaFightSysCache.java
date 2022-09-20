package com.teamtop.system.activity.ativitys.arenaFight.cross;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.teamtop.cross.upload.CrossHeroBaseModel;
import com.teamtop.main.RunServerException;
import com.teamtop.system.activity.ativitys.arenaFight.ArenaFightFunction;
import com.teamtop.system.activity.ativitys.arenaFight.model.ArenaFightModel;
import com.teamtop.system.activity.ativitys.arenaFight.model.PartArenaFightMaster;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_leitai_500;
import excel.config.Config_leitaitime_500;
import excel.struct.Struct_leitai_500;
import excel.struct.Struct_leitaitime_500;

public class CrossArenaFightSysCache extends AbsServerEvent {

	// 配置数据
	private static ConcurrentHashMap<Integer, List<Struct_leitai_500>> qsMap = new ConcurrentHashMap<>();

	/**
	 * 小阶段时间
	 * key:阶段id
	 */
	private static ConcurrentHashMap<Integer, ArenaOpenTime> arenaTimeMap = new ConcurrentHashMap<>();;

	// 缓存
	/**
	 * 分组擂台数据
	 */
	private static ConcurrentHashMap<Integer, PartArenaFightMaster> partArenaMap = new ConcurrentHashMap<>();

	/**
	 * 玩家活动数据
	 */
	private static ConcurrentHashMap<Long, ArenaFightModel> heroArenaMap = new ConcurrentHashMap<>();

	/**
	 * 玩家镜像数据
	 */
	private static ConcurrentHashMap<Long, CrossHeroBaseModel> heroFightMap = new ConcurrentHashMap<>();

	/**
	 * 战斗缓存
	 */
	private static ConcurrentHashMap<Long, Integer> fightMap = new ConcurrentHashMap<>();

	/**
	 * 挑战缓存
	 */
	private static ConcurrentHashMap<Long, ArenaChaInfo> chaMap = new ConcurrentHashMap<>();

	/**
	 * 活动开始时间
	 */
	public static int startTime;

	/**
	 * 活动结束时间
	 */
	public static int endTime;

	/**
	 * 小阶段开启状态
	 */
	public static int opState;

	/**
	 * 期数
	 */
	public static int qs;

	/**
	 * 活动是否开启
	 * @return
	 */
	public static boolean isActOpen() {
		int currentTime = TimeDateUtil.getCurrentTime();
		if (startTime > 0 && endTime > 0) {
			if (currentTime >= startTime && currentTime < endTime) {
				return true;
			}
		}
		return false;
	}

	/**
	 * 擂台战斗是否开启
	 * @return
	 */
	public static boolean isfightOpen() {
		if (opState > 0) {
			return true;
		}
		return false;
	}

	public static ConcurrentHashMap<Integer, List<Struct_leitai_500>> getQsMap() {
		return qsMap;
	}

	public static void setQsMap(ConcurrentHashMap<Integer, List<Struct_leitai_500>> qsMap) {
		CrossArenaFightSysCache.qsMap = qsMap;
	}

	public static ConcurrentHashMap<Integer, ArenaOpenTime> getArenaTimeMap() {
		return arenaTimeMap;
	}

	public static void setArenaTimeMap(ConcurrentHashMap<Integer, ArenaOpenTime> arenaTimeMap) {
		CrossArenaFightSysCache.arenaTimeMap = arenaTimeMap;
	}

	public static ConcurrentHashMap<Integer, PartArenaFightMaster> getPartArenaMap() {
		return partArenaMap;
	}

	public static void setPartArenaMap(ConcurrentHashMap<Integer, PartArenaFightMaster> partArenaMap) {
		CrossArenaFightSysCache.partArenaMap = partArenaMap;
	}

	public static ConcurrentHashMap<Long, ArenaFightModel> getHeroArenaMap() {
		return heroArenaMap;
	}

	public static void setHeroArenaMap(ConcurrentHashMap<Long, ArenaFightModel> heroArenaMap) {
		CrossArenaFightSysCache.heroArenaMap = heroArenaMap;
	}

	public static ConcurrentHashMap<Long, CrossHeroBaseModel> getHeroFightMap() {
		return heroFightMap;
	}

	public static void setHeroFightMap(ConcurrentHashMap<Long, CrossHeroBaseModel> heroFightMap) {
		CrossArenaFightSysCache.heroFightMap = heroFightMap;
	}

	public static ConcurrentHashMap<Long, Integer> getFightMap() {
		return fightMap;
	}

	public static void setFightMap(ConcurrentHashMap<Long, Integer> fightMap) {
		CrossArenaFightSysCache.fightMap = fightMap;
	}

	public static ConcurrentHashMap<Long, ArenaChaInfo> getChaMap() {
		return chaMap;
	}

	public static void setChaMap(ConcurrentHashMap<Long, ArenaChaInfo> chaMap) {
		CrossArenaFightSysCache.chaMap = chaMap;
	}

	@Override
	public void startServer() throws RunServerException {
		GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.CROSS_ARENA_FIGHT);
		String content = globalData.getContent();
		if (content == null || content.equals("") || content.equals("{}")) {

		} else {
			CrossAreanSave save = JSONObject.parseObject(content, CrossAreanSave.class);
			heroArenaMap.putAll(save.getHeroArenaMap());
			heroFightMap.putAll(save.getHeroFightMap());
			partArenaMap.putAll(save.getPartArenaMap());
			startTime = save.getStartTime();
			endTime = save.getEndTime();
			opState = save.getOpState();
			qs = save.getQs();
		}
	}
	
	public static void checkStart() {
		try {
			if (CrossArenaFightSysCache.isActOpen()) {
				if (CrossArenaFightSysCache.opState == 0) {
					int hour = TimeDateUtil.getHour();
					int minute = TimeDateUtil.getMinute();
					Iterator<ArenaOpenTime> iterator = CrossArenaFightSysCache.getArenaTimeMap().values().iterator();
					for (; iterator.hasNext();) {
						ArenaOpenTime at = iterator.next();
						int startHour = at.getStartHour();
						int startMinute = at.getStartMinute();
						int endHour = at.getEndHour();
						int endMinute = at.getEndMinute();
						if (hour >= startHour && hour <= endHour) {
							if (hour == startHour && (minute == startMinute || minute == startMinute + 1)) {
								// 开始
								ArenaFightFunction.getIns().initArenaMaster(CrossArenaFightSysCache.qs);
								CrossArenaFightSysCache.opState = at.getId();
								ArenaFightFunction.getIns().noticeFightOpen();
								break;
							}
						}
					}
				} else {
					int hour = TimeDateUtil.getHour();
					int minute = TimeDateUtil.getMinute();
					ArenaOpenTime at = arenaTimeMap.get(CrossArenaFightSysCache.opState);
					int startHour = at.getStartHour();
					int startMinute = at.getStartMinute();
					int endHour = at.getEndHour();
					int endMinute = at.getEndMinute();
					if (hour >= startHour && hour <= endHour) {
						if (minute >= startMinute && minute <= endMinute) {
							// 活动在开
						} else {
							CrossArenaFightSysCache.opState = 0;
							ArenaFightFunction.getIns().clearCache();
						}
					} else {
						CrossArenaFightSysCache.opState = 0;
						ArenaFightFunction.getIns().clearCache();
					}
				}
			}
		} catch (Exception e) {
			LogTool.error(e, CrossArenaFightSysCache.class, "CrossArenaFightSysCache checkStart");
		}
	}

	@Override
	public void shutdownServer() {
		CrossAreanSave save = new CrossAreanSave();
		save.setStartTime(startTime);
		save.setEndTime(endTime);
		save.setOpState(opState);
		save.setQs(qs);
		save.getHeroArenaMap().putAll(heroArenaMap);
		save.getHeroFightMap().putAll(heroFightMap);
		save.getPartArenaMap().putAll(partArenaMap);
		GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.CROSS_ARENA_FIGHT);
		globalData.setContent(JSON.toJSONString(save));
		GlobalCache.doSync(globalData);
	}

	@Override
	public void initExcel() throws RunServerException {
		qsMap.clear();
		arenaTimeMap.clear();
		List<Struct_leitai_500> sortList = Config_leitai_500.getIns().getSortList();
		int size = sortList.size();
		Struct_leitai_500 struct_leitai_500 = null;
		for (int i = 0; i < size; i++) {
			struct_leitai_500 = sortList.get(i);
			int qs = struct_leitai_500.getQs();
			List<Struct_leitai_500> list = qsMap.get(qs);
			if (list == null) {
				list = new ArrayList<>();
				qsMap.put(qs, list);
			}
			list.add(struct_leitai_500);
		}

		List<Struct_leitaitime_500> timeList = Config_leitaitime_500.getIns().getSortList();
		size = timeList.size();
		for (int i = 0; i < size; i++) {
			Struct_leitaitime_500 struct_leitaitime_500 = timeList.get(i);
			int id = struct_leitaitime_500.getId();
			String star = struct_leitaitime_500.getStar();
			String end = struct_leitaitime_500.getEnd();
			ArenaOpenTime at = new ArenaOpenTime();
			at.setId(id);
			String[] startArr = star.split(":");
			at.setStartHour(Integer.parseInt(startArr[0]));
			at.setStartMinute(Integer.parseInt(startArr[1]));

			String[] endArr = end.split(":");
			at.setEndHour(Integer.parseInt(endArr[0]));
			at.setEndMinute(Integer.parseInt(endArr[1]));
			arenaTimeMap.put(id, at);
		}
		checkStart();
	}

}
