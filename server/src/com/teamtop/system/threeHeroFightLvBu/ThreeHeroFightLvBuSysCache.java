package com.teamtop.system.threeHeroFightLvBu;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.threeHeroFightLvBu.model.TeamChaInfo;
import com.teamtop.util.cache.union.UC;

import excel.config.Config_syzlb_762;
import excel.struct.Struct_syzlb_762;

public class ThreeHeroFightLvBuSysCache extends AbsServerEvent{
	
	/**
	 * key:难度，value：
	 */
	private static ConcurrentHashMap<Integer, List<Struct_syzlb_762>> hardGuanqiaMap = UC.reg(
			"threeHeroFightLvBuHardGuanqiaMap",
			new ConcurrentHashMap<>());

	/**
	 * 队伍挑战信息
	 */
	private static ConcurrentHashMap<Integer, TeamChaInfo> teamChaMap = UC.reg("threeHeroFightLvBuTeamChaMap",
			new ConcurrentHashMap<>());
	/**
	 * 队伍挑战难度
	 */
	private static ConcurrentHashMap<Integer, Integer> teamHardMap = UC.reg("threeHeroFightLvBuTeamHardMap",
			new ConcurrentHashMap<>());

	/**
	 * 难度队伍信息
	 * key:难度，value:队伍集合
	 */
	private static ConcurrentHashMap<Integer, Set<Integer>> hardTeamMap = UC.reg("threeHeroFightLvBuHardTeamMap",
			new ConcurrentHashMap<>());

	private static ConcurrentHashMap<Integer, Integer> fightingMap = UC.reg("threeHeroFightLvBuFightingMap",
			new ConcurrentHashMap<>());

	public static ConcurrentHashMap<Integer, TeamChaInfo> getTeamChaMap() {
		return teamChaMap;
	}

	public static void setTeamChaMap(ConcurrentHashMap<Integer, TeamChaInfo> teamChaMap) {
		ThreeHeroFightLvBuSysCache.teamChaMap = teamChaMap;
	}

	public static ConcurrentHashMap<Integer, Integer> getFightingMap() {
		return fightingMap;
	}

	public static void setFightingMap(ConcurrentHashMap<Integer, Integer> fightingMap) {
		ThreeHeroFightLvBuSysCache.fightingMap = fightingMap;
	}

	public static ConcurrentHashMap<Integer, Integer> getTeamHardMap() {
		return teamHardMap;
	}

	public static void setTeamHardMap(ConcurrentHashMap<Integer, Integer> teamHardMap) {
		ThreeHeroFightLvBuSysCache.teamHardMap = teamHardMap;
	}

	public static ConcurrentHashMap<Integer, List<Struct_syzlb_762>> getHardGuanqiaMap() {
		return hardGuanqiaMap;
	}

	public static void setHardGuanqiaMap(ConcurrentHashMap<Integer, List<Struct_syzlb_762>> hardGuanqiaMap) {
		ThreeHeroFightLvBuSysCache.hardGuanqiaMap = hardGuanqiaMap;
	}

	public static ConcurrentHashMap<Integer, Set<Integer>> getHardTeamMap() {
		return hardTeamMap;
	}

	public static void setHardTeamMap(ConcurrentHashMap<Integer, Set<Integer>> hardTeamMap) {
		ThreeHeroFightLvBuSysCache.hardTeamMap = hardTeamMap;
	}

	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub
		
	}
	
	static {
		hardTeamMap.put(1, new HashSet<>());// 普通
		hardTeamMap.put(2, new HashSet<>());// 困难
		hardTeamMap.put(3, new HashSet<>());// 地狱
		hardTeamMap.put(4, new HashSet<>());// 噩梦
	}

	@Override
	public void initExcel() throws RunServerException {
		hardGuanqiaMap.clear();
		List<Struct_syzlb_762> sortList = Config_syzlb_762.getIns().getSortList();
		int size = sortList.size();
		Struct_syzlb_762 struct_syzlb_762 = null;
		for (int i = 0; i < size; i++) {
			struct_syzlb_762 = sortList.get(i);
			int hardType = struct_syzlb_762.getNd();
			List<Struct_syzlb_762> list = hardGuanqiaMap.get(hardType);
			if (list == null) {
				list = new ArrayList<>();
				hardGuanqiaMap.put(hardType, list);
			}
			list.add(struct_syzlb_762);
		}
	}

}
