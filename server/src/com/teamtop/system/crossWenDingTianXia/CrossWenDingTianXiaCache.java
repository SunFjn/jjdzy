package com.teamtop.system.crossWenDingTianXia;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;

public class CrossWenDingTianXiaCache extends AbsServerEvent{
	private static CrossWenDingTianXiaCache ins = null;

	public static  CrossWenDingTianXiaCache getIns() {
		if (ins == null) {
			ins = new CrossWenDingTianXiaCache();
		}
		return ins;
	}
	
	
	/**	 * 活动状态   	 */
	private static int state = 0;
	
	
	
	
//	/**	 * boss缓存   key:队伍ID	 */
//	private static Map<Integer, CrossTeamFubenBoss> crossTeamBossMap = UC.reg("crossTeamBossMap", new ConcurrentHashMap<Integer, CrossTeamFubenBoss>());
//	/**	 * 普通奖励	 */
//	private static Map<Integer, List<ProbabilityEventModel>> commonAwardsMap = new ConcurrentHashMap<Integer, List<ProbabilityEventModel>>();
//	/**	 * 额外奖励	 */
//	private static Map<Integer, List<ProbabilityEventModel>> otherAwardsMap = new ConcurrentHashMap<Integer, List<ProbabilityEventModel>>();
	
	@Override
	public void startServer() throws RunServerException {
	}

	
	public void shutdownServer() {
		GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.WDTX_MVP);
		GlobalCache.doSync(globalData);
	}


	@Override
	public void initExcel() throws RunServerException {
//		List<Struct_zdfb_255> excelList = Config_zdfb_255.getIns().getSortList();
//		for (Struct_zdfb_255 excel : excelList) {
//			List<ProbabilityEventModel> bossDropData = ExcelJsonUtils.getGeneralDropData(excel.getReward1());
//			commonAwardsMap.put(excel.getId(), bossDropData);
//			
//			List<ProbabilityEventModel> otherData = ExcelJsonUtils.getGeneralDropData(excel.getReward2());
//			otherAwardsMap.put(excel.getId(), otherData);
//		}
	}

	public static int getState() {
		return state;
	}
	public static void setState(int state) {
		CrossWenDingTianXiaCache.state = state;
	}


	
}
