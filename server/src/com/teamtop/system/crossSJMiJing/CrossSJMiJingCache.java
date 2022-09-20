package com.teamtop.system.crossSJMiJing;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.main.RunServerException;
import com.teamtop.system.crossSJMiJing.model.CrossSJMiJingBoss;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.cache.union.UC;
import com.teamtop.util.excel.ExcelJsonUtils;

import excel.config.Config_sjmjfb_258;
import excel.struct.Struct_sjmjfb_258;

public class CrossSJMiJingCache extends AbsServerEvent{
	private static CrossSJMiJingCache ins = null;

	public static  CrossSJMiJingCache getIns() {
		if (ins == null) {
			ins = new CrossSJMiJingCache();
		}
		return ins;
	}
	/**	 * boss缓存   key:队伍ID	 */
	private static Map<Integer, CrossSJMiJingBoss> crossSJMJBossMap = UC.reg("crossSJMJBossMap", new ConcurrentHashMap<Integer, CrossSJMiJingBoss>());
	/**	 * BOSS掉落奖励	 */
	private static Map<Integer, List<ProbabilityEventModel>> bossAwardsMap = new ConcurrentHashMap<Integer, List<ProbabilityEventModel>>();
	/**	 * 首通奖励	 */
//	private static Map<Integer, List<ProbabilityEventModel>> fristAwardsMap = new ConcurrentHashMap<Integer, List<ProbabilityEventModel>>();
	/**	 * 协助奖励	 */
	private static Map<Integer, List<ProbabilityEventModel>> halpAwardsMap = new ConcurrentHashMap<Integer, List<ProbabilityEventModel>>();
	
	@Override
	public void startServer() throws RunServerException {
		
	}

	@Override
	public void initExcel() throws RunServerException {
		List<Struct_sjmjfb_258> excelList = Config_sjmjfb_258.getIns().getSortList();
		for (Struct_sjmjfb_258 excel : excelList) {
			List<ProbabilityEventModel> bossDropData = ExcelJsonUtils.getGeneralDropData(excel.getReward1());
			bossAwardsMap.put(excel.getId(), bossDropData);
			
			List<ProbabilityEventModel> helpData = ExcelJsonUtils.getGeneralDropData(excel.getReward3());
			halpAwardsMap.put(excel.getId(), helpData);
		}
	}

	public static Map<Integer, CrossSJMiJingBoss> getCrossSJMJBossMap() {
		return crossSJMJBossMap;
	}
	public static void setCrossSJMJBossMap(Map<Integer, CrossSJMiJingBoss> crossSJMJBossMap) {
		CrossSJMiJingCache.crossSJMJBossMap = crossSJMJBossMap;
	}
	public static void setCrossSJMJBossMap( int teamID, CrossSJMiJingBoss bossData) {
		CrossSJMiJingCache.crossSJMJBossMap.put(teamID, bossData);
	}
	public static void removeCrossSJMJBossMap( int teamID) {
		CrossSJMiJingCache.crossSJMJBossMap.remove(teamID);
	}
	public static Map<Integer, List<ProbabilityEventModel>> getBossAwardsMap() {
		return bossAwardsMap;
	}
	public static void setBossAwardsMap(Map<Integer, List<ProbabilityEventModel>> bossAwardsMap) {
		CrossSJMiJingCache.bossAwardsMap = bossAwardsMap;
	}
	public static Map<Integer, List<ProbabilityEventModel>> getHalpAwardsMap() {
		return halpAwardsMap;
	}
	public static void setHalpAwardsMap(Map<Integer, List<ProbabilityEventModel>> halpAwardsMap) {
		CrossSJMiJingCache.halpAwardsMap = halpAwardsMap;
	}

}
