package com.teamtop.system.openDaysSystem.monsterKingSearchMonster;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.TypeReference;
import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.openDaysSystem.monsterKingSearchMonster.model.MonsterKingSearchPartInfo;
import com.teamtop.util.cache.union.UC;

import excel.config.Config_wszwxsxspm_325;
import excel.struct.Struct_wszwxsxspm_325;

public class MonsterKingSearchMonsterSysCache extends AbsServerEvent {
	
	private static Map<Integer, Map<Integer, Struct_wszwxsxspm_325>> qsMap = UC.reg("monsterKingSearchMonsterMap", new HashMap<>());

	/**
	 * key:partId(跨服分组id), value:对应分组排行相关信息
	 */
	private static ConcurrentHashMap<Integer, MonsterKingSearchPartInfo> partMap = UC.reg("monsterKingSearchMonsterPartMap", new ConcurrentHashMap<>());

	public static boolean isOpen = false;

	public static int synTime = 0;

	public static Map<Integer, Map<Integer, Struct_wszwxsxspm_325>> getQsMap() {
		return qsMap;
	}

	public static void setQsMap(Map<Integer, Map<Integer, Struct_wszwxsxspm_325>> qsMap) {
		MonsterKingSearchMonsterSysCache.qsMap = qsMap;
	}

	public static Map<Integer, MonsterKingSearchPartInfo> getPartMap() {
		return partMap;
	}

	public static void setPartMap(ConcurrentHashMap<Integer, MonsterKingSearchPartInfo> partMap) {
		MonsterKingSearchMonsterSysCache.partMap = partMap;
	}

	@Override
	public void startServer() throws RunServerException {
		GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.MONSTER_KING_SEARCH_MONSTER);
		String content = globalData.getContent();
		if (content == null || content.equals("") || content.equals("{}")) {

		} else {
			Type type = new TypeReference<ConcurrentHashMap<Integer, MonsterKingSearchPartInfo>>() {}.getType();
			ConcurrentHashMap<Integer, MonsterKingSearchPartInfo> map = JSONObject.parseObject(content, type);
			partMap.putAll(map);
		}
	}

	@Override
	public void shutdownServer() {
		GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.MONSTER_KING_SEARCH_MONSTER);
		globalData.setContent(JSON.toJSONString(partMap));
		GlobalCache.doSync(globalData);
	}

	@Override
	public void initExcel() throws RunServerException {
		List<Struct_wszwxsxspm_325> sortList = Config_wszwxsxspm_325.getIns().getSortList();
		int size = sortList.size();
		for (int i = 0; i < size; i++) {
			Struct_wszwxsxspm_325 wszwxsxspm_325 = sortList.get(i);
			if (wszwxsxspm_325.getXtid() == SystemIdConst.MONSTER_KING_SEARCH_MONSTER) {
				int qs = wszwxsxspm_325.getQs();
				Map<Integer, Struct_wszwxsxspm_325> map = qsMap.get(qs);
				if (map == null) {
					map = new HashMap<>();
					qsMap.put(qs, map);
				}
				map.put(wszwxsxspm_325.getId(), wszwxsxspm_325);
			}
		}
	}

}
