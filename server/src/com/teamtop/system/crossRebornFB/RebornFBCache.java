package com.teamtop.system.crossRebornFB;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.main.RunServerException;
import com.teamtop.system.crossRebornFB.model.RebornFBBoss;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventFactory;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.cache.union.UC;
import com.teamtop.util.excel.ExcelJsonUtils;

import excel.config.Config_lhfb_337;
import excel.struct.Struct_lhfb_337;

public class RebornFBCache extends AbsServerEvent {
	private static RebornFBCache ins = null;

	public static RebornFBCache getIns() {
		if (ins == null) {
			ins = new RebornFBCache();
		}
		return ins;
	}

	/** * boss缓存 key:队伍ID */
	private static Map<Integer, RebornFBBoss> bossMap = UC.reg("bossMap",
			new ConcurrentHashMap<Integer, RebornFBBoss>());
	/** * 普通奖励 */
	private static Map<Integer, List<ProbabilityEventModel>> commonAwardsMap = new ConcurrentHashMap<Integer, List<ProbabilityEventModel>>();
	/** * 额外奖励 */
	private static Map<Integer, List<ProbabilityEventModel>> otherAwardsMap = new ConcurrentHashMap<Integer, List<ProbabilityEventModel>>();
	/** * 初始轮回副本*/
	private static Map<Integer, ProbabilityEventModel> initFBMap = new ConcurrentHashMap<>();

	@Override
	public void startServer() throws RunServerException {

	}

	@Override
	public void initExcel() throws RunServerException {
		commonAwardsMap.clear();
		initFBMap.clear();
		List<Struct_lhfb_337> excelList = Config_lhfb_337.getIns().getSortList();
		for (Struct_lhfb_337 excel : excelList) {
			List<ProbabilityEventModel> bossDropData = ExcelJsonUtils.getGeneralDropData(excel.getDiaoluo());
			int id = excel.getId();
			commonAwardsMap.put(id, bossDropData);

			int reLv = id / 1000;
			ProbabilityEventModel probabilityEventModel = initFBMap.get(reLv);
			if (probabilityEventModel == null) {
				probabilityEventModel = ProbabilityEventFactory.getProbabilityEvent();
				initFBMap.put(reLv, probabilityEventModel);
			}
			probabilityEventModel.addProbabilityEvent(excel.getCs(), id);
		}
	}

	public static Map<Integer, RebornFBBoss> getBossMap() {
		return bossMap;
	}

	public static void removeBossMap(int teamID) {
		bossMap.remove(teamID);
	}

	public static void setBossMap(Map<Integer, RebornFBBoss> crossTeamBossMap) {
		RebornFBCache.bossMap = crossTeamBossMap;
	}

	public static void setBossMap(int teamID, RebornFBBoss crossTeamBoss) {
		RebornFBCache.bossMap.put(teamID, crossTeamBoss);
	}

	public static Map<Integer, List<ProbabilityEventModel>> getCommonAwardsMap() {
		return commonAwardsMap;
	}

	public static void setCommonAwardsMap(Map<Integer, List<ProbabilityEventModel>> commonAwardsMap) {
		RebornFBCache.commonAwardsMap = commonAwardsMap;
	}

	public static Map<Integer, List<ProbabilityEventModel>> getOtherAwardsMap() {
		return otherAwardsMap;
	}

	public static void setOtherAwardsMap(Map<Integer, List<ProbabilityEventModel>> otherAwardsMap) {
		RebornFBCache.otherAwardsMap = otherAwardsMap;
	}

	public static Map<Integer, ProbabilityEventModel> getInitFBMap() {
		return initFBMap;
	}

	public static void setInitFBMap(Map<Integer, ProbabilityEventModel> initFBMap) {
		RebornFBCache.initFBMap = initFBMap;
	}
}
