package com.teamtop.system.crossTeamFuBen;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.main.RunServerException;
import com.teamtop.system.crossTeamFuBen.model.CrossTeamFubenBoss;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.cache.union.UC;
import com.teamtop.util.excel.ExcelJsonUtils;

import excel.config.Config_zdfb_255;
import excel.struct.Struct_zdfb_255;

public class CrossTeamFubenCache extends AbsServerEvent{
	private static CrossTeamFubenCache ins = null;

	public static  CrossTeamFubenCache getIns() {
		if (ins == null) {
			ins = new CrossTeamFubenCache();
		}
		return ins;
	}
	/**	 * boss缓存   key:队伍ID	 */
	private static Map<Integer, CrossTeamFubenBoss> crossTeamBossMap = UC.reg("crossTeamBossMap", new ConcurrentHashMap<Integer, CrossTeamFubenBoss>());
	/**	 * 普通奖励	 */
	private static Map<Integer, List<ProbabilityEventModel>> commonAwardsMap = new ConcurrentHashMap<Integer, List<ProbabilityEventModel>>();
	/**	 * 额外奖励	 */
	private static Map<Integer, List<ProbabilityEventModel>> otherAwardsMap = new ConcurrentHashMap<Integer, List<ProbabilityEventModel>>();
	
	@Override
	public void startServer() throws RunServerException {
		
	}

	@Override
	public void initExcel() throws RunServerException {
		List<Struct_zdfb_255> excelList = Config_zdfb_255.getIns().getSortList();
		for (Struct_zdfb_255 excel : excelList) {
			List<ProbabilityEventModel> bossDropData = ExcelJsonUtils.getGeneralDropData(excel.getReward1());
			commonAwardsMap.put(excel.getId(), bossDropData);
			
			List<ProbabilityEventModel> otherData = ExcelJsonUtils.getGeneralDropData(excel.getReward2());
			otherAwardsMap.put(excel.getId(), otherData);
		}
	}

	public static Map<Integer, CrossTeamFubenBoss> getCrossTeamBossMap() {
		return crossTeamBossMap;
	}
	public static void removeCrossTeamBossMap(int teamID) {
		crossTeamBossMap.remove(teamID);
	}
	public static void setCrossTeamBossMap(Map<Integer, CrossTeamFubenBoss> crossTeamBossMap) {
		CrossTeamFubenCache.crossTeamBossMap = crossTeamBossMap;
	}
	public static void setCrossTeamBossMap(int teamID, CrossTeamFubenBoss crossTeamBoss) {
		CrossTeamFubenCache.crossTeamBossMap.put(teamID, crossTeamBoss);
	}
	public static Map<Integer, List<ProbabilityEventModel>> getCommonAwardsMap() {
		return commonAwardsMap;
	}
	public static void setCommonAwardsMap(Map<Integer, List<ProbabilityEventModel>> commonAwardsMap) {
		CrossTeamFubenCache.commonAwardsMap = commonAwardsMap;
	}
	public static Map<Integer, List<ProbabilityEventModel>> getOtherAwardsMap() {
		return otherAwardsMap;
	}
	public static void setOtherAwardsMap(Map<Integer, List<ProbabilityEventModel>> otherAwardsMap) {
		CrossTeamFubenCache.otherAwardsMap = otherAwardsMap;
	}
}
