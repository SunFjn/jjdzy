package com.teamtop.system.crossTrial;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.crossTrial.model.FightInfo;
import com.teamtop.system.crossTrial.model.FloorBuffInfo;
import com.teamtop.system.crossTrial.model.FloorFightInfo;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.cache.union.UC;
import com.teamtop.util.excel.ExcelJsonUtils;

import excel.config.Config_slbuff_767;
import excel.config.Config_slbx_767;
import excel.config.Config_slzd_767;
import excel.struct.Struct_slbuff_767;
import excel.struct.Struct_slbx_767;
import excel.struct.Struct_slzd_767;

public class CrossTrialCache extends AbsServerEvent {

	/**
	 * buff
	 * key:层数， value:<type(1：初级，2：中级，3：高级), buff信息>
	 */
	private static Map<Integer, Map<Integer, FloorBuffInfo>> floorBuffMap = UC.reg("FloorBuffMap", new HashMap<>());

	/**
	 * key:层数， value:<type(1：普通，2：困难，3：噩梦), 战斗信息>
	 */
	private static Map<Integer, Map<Integer, FloorFightInfo>> floorFigthMap = UC.reg("FloorFigthMap", new HashMap<>());

	/**
	 * key:层数， value:开宝箱概率模型
	 */
	private static Map<Integer, List<ProbabilityEventModel>> floorChestMap = UC.reg("FloorChestMap", new HashMap<>());

	/**
	 * 
	 */
	private static Map<Long, FightInfo> fightMap = UC.reg("TrialFightMap", new HashMap<>());
	
	public static Map<Integer, Map<Integer, FloorBuffInfo>> getFloorBuffMap() {
		return floorBuffMap;
	}

	public static void setFloorBuffMap(Map<Integer, Map<Integer, FloorBuffInfo>> floorBuffMap) {
		CrossTrialCache.floorBuffMap = floorBuffMap;
	}

	public static Map<Integer, Map<Integer, FloorFightInfo>> getFloorFigthMap() {
		return floorFigthMap;
	}

	public static void setFloorFigthMap(Map<Integer, Map<Integer, FloorFightInfo>> floorFigthMap) {
		CrossTrialCache.floorFigthMap = floorFigthMap;
	}

	public static Map<Integer, List<ProbabilityEventModel>> getFloorChestMap() {
		return floorChestMap;
	}

	public static void setFloorChestMap(Map<Integer, List<ProbabilityEventModel>> floorChestMap) {
		CrossTrialCache.floorChestMap = floorChestMap;
	}

	public static Map<Long, FightInfo> getFightMap() {
		return fightMap;
	}

	public static void setFightMap(Map<Long, FightInfo> fightMap) {
		CrossTrialCache.fightMap = fightMap;
	}

	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub

	}

	@Override
	public void initExcel() throws RunServerException {
		floorBuffMap.clear();
		floorFigthMap.clear();
		floorChestMap.clear();
		List<Struct_slbuff_767> buffList = Config_slbuff_767.getIns().getSortList();
		int buffSize = buffList.size();
		for (int i = 0; i < buffSize; i++) {
			Struct_slbuff_767 struct_slbuff_767 = buffList.get(i);
			int id = struct_slbuff_767.getId();
			Map<Integer, FloorBuffInfo> map = floorBuffMap.get(id);
			if (map == null) {
				map = new HashMap<>();
				floorBuffMap.put(id, map);
			}
			FloorBuffInfo info1 = new FloorBuffInfo(id, 1, struct_slbuff_767.getCj(), struct_slbuff_767.getDj1());
			map.put(1, info1);
			FloorBuffInfo info2 = new FloorBuffInfo(id, 2, struct_slbuff_767.getZj(), struct_slbuff_767.getDj2());
			map.put(2, info2);
			FloorBuffInfo info3 = new FloorBuffInfo(id, 3, struct_slbuff_767.getGj(), struct_slbuff_767.getDj3());
			map.put(3, info3);
		}
		List<Struct_slzd_767> fightList = Config_slzd_767.getIns().getSortList();
		int fightSize = fightList.size();
		for (int i = 0; i < fightSize; i++) {
			Struct_slzd_767 struct_slzd_767 = fightList.get(i);
			int id = struct_slzd_767.getId();
			Map<Integer, FloorFightInfo> map = floorFigthMap.get(id);
			if (map == null) {
				map = new HashMap<>();
				floorFigthMap.put(id, map);
			}
			FloorFightInfo fgInfo1 = new FloorFightInfo(id, 1, struct_slzd_767.getPtsld(), struct_slzd_767.getPtslq(),
					struct_slzd_767.getPtqj()[0]);
			map.put(1, fgInfo1);
			FloorFightInfo fgInfo2 = new FloorFightInfo(id, 2, struct_slzd_767.getKnsld(), struct_slzd_767.getKnslq(),
					struct_slzd_767.getKnqj()[0]);
			map.put(2, fgInfo2);
			FloorFightInfo fgInfo3 = new FloorFightInfo(id, 3, struct_slzd_767.getEmsld(), struct_slzd_767.getEmslq(),
					struct_slzd_767.getEmqj()[0]);
			map.put(3, fgInfo3);
		}
		List<Struct_slbx_767> chestList = Config_slbx_767.getIns().getSortList();
		int chestSize = chestList.size();
		for (int i = 0; i < chestSize; i++) {
			Struct_slbx_767 struct_slbx_767 = chestList.get(i);
			String jl = struct_slbx_767.getJl();
			List<ProbabilityEventModel> pList = ExcelJsonUtils.getGeneralDropData(jl);
			floorChestMap.put(struct_slbx_767.getId(), pList);
		}
	}

}
