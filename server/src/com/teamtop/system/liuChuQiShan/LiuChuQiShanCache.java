package com.teamtop.system.liuChuQiShan;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.liuChuQiShan.model.LiuChuQiShanBoss;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.cache.union.UC;
import com.teamtop.util.excel.ExcelJsonUtils;

import excel.config.Config_six_279;
import excel.struct.Struct_six_279;

public class LiuChuQiShanCache extends AbsServerEvent{
	private static LiuChuQiShanCache ins = null;

	public static  LiuChuQiShanCache getIns() {
		if (ins == null) {
			ins = new LiuChuQiShanCache();
		}
		return ins;
	}
	/**	 * boss缓存   key:队伍ID	 */
	private static Map<Integer, LiuChuQiShanBoss> liuChuQiShanBossMap = UC.reg("liuChuQiShanBossMap",
			new ConcurrentHashMap<Integer, LiuChuQiShanBoss>());
	/**	 * BOSS掉落奖励	 */
	private static Map<Integer, List<ProbabilityEventModel>> bossAwardsMap = new ConcurrentHashMap<Integer, List<ProbabilityEventModel>>();
	/**	 * 协助奖励	 */
	private static Map<Integer, List<ProbabilityEventModel>> halpAwardsMap = new ConcurrentHashMap<Integer, List<ProbabilityEventModel>>();
	
	@Override
	public void startServer() throws RunServerException {
		
	}

	@Override
	public void initExcel() throws RunServerException {
		List<Struct_six_279> excelList = Config_six_279.getIns().getSortList();
		for (Struct_six_279 excel : excelList) {
			List<ProbabilityEventModel> bossDropData = ExcelJsonUtils.getGeneralDropData(excel.getReward1());
			bossAwardsMap.put(excel.getId(), bossDropData);
			
			List<ProbabilityEventModel> helpData = ExcelJsonUtils.getGeneralDropData(excel.getReward3());
			halpAwardsMap.put(excel.getId(), helpData);
		}
	}

	public static Map<Integer, LiuChuQiShanBoss> getliuChuQiShanBossMap() {
		return liuChuQiShanBossMap;
	}

	public static void setliuChuQiShanBossMap(Map<Integer, LiuChuQiShanBoss> liuChuQiShanBossMap) {
		LiuChuQiShanCache.liuChuQiShanBossMap = liuChuQiShanBossMap;
	}

	public static void setliuChuQiShanBossMap(int teamID, LiuChuQiShanBoss bossData) {
		LiuChuQiShanCache.liuChuQiShanBossMap.put(teamID, bossData);
	}

	public static void removeliuChuQiShanBossMap(int teamID) {
		LiuChuQiShanCache.liuChuQiShanBossMap.remove(teamID);
	}
	public static Map<Integer, List<ProbabilityEventModel>> getBossAwardsMap() {
		return bossAwardsMap;
	}
	public static void setBossAwardsMap(Map<Integer, List<ProbabilityEventModel>> bossAwardsMap) {
		LiuChuQiShanCache.bossAwardsMap = bossAwardsMap;
	}
	public static Map<Integer, List<ProbabilityEventModel>> getHalpAwardsMap() {
		return halpAwardsMap;
	}
	public static void setHalpAwardsMap(Map<Integer, List<ProbabilityEventModel>> halpAwardsMap) {
		LiuChuQiShanCache.halpAwardsMap = halpAwardsMap;
	}

}
