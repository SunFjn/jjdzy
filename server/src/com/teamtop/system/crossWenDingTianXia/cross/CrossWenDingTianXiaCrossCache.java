package com.teamtop.system.crossWenDingTianXia.cross;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.main.RunServerException;
import com.teamtop.system.crossWenDingTianXia.model.CrossWenDingTianXiaRoom;
import com.teamtop.system.crossWenDingTianXia.model.CrossWenDingTianXiaTop10Strength;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.cache.union.UC;

import excel.config.Config_wdtx_260;
import excel.struct.Struct_wdtx_260;

public class CrossWenDingTianXiaCrossCache extends AbsServerEvent{
	private static CrossWenDingTianXiaCrossCache ins = null;

	public static  CrossWenDingTianXiaCrossCache getIns() {
		if (ins == null) {
			ins = new CrossWenDingTianXiaCrossCache();
		}
		return ins;
	}
	
	/**	 * 问鼎天下所有区top10总战力排行榜	 */
	private static Map<Integer, List<CrossWenDingTianXiaTop10Strength>> pRankListMap = UC
			.reg("wdtxTop10StrengthRankList", new HashMap<Integer, List<CrossWenDingTianXiaTop10Strength>>());// Collections.synchronizedList(new
																												// ArrayList<
																												// CrossWenDingTianXiaTop10Strength>())
	/**	 * 问鼎天下开服前N天的区ID，自己一个房间	 */
	private static List<Integer> wdtxNewServerList=UC.reg("wdtxNewServerList", Collections.synchronizedList(new ArrayList< Integer>()));
	/**	 * 房间缓存  key:< key:分区id, <key:房间ID  value:房间数据>>	 */
	private static Map<Integer, ConcurrentHashMap<Integer, CrossWenDingTianXiaRoom>> pWdtxRoomMap = UC.reg("pWdtxRoomMap", new HashMap<Integer, ConcurrentHashMap<Integer, CrossWenDingTianXiaRoom>>());
	/**	 * 区对应房间ID缓存   key:ZID  value:房间ID	 */
	private static Map<Integer, ConcurrentHashMap<Integer, Integer>> pWdtxZidToRoomIDMap = UC.reg("pWdtxZidToRoomIDMap", new HashMap<Integer, ConcurrentHashMap<Integer, Integer>>());
	/**	 * 活动结束时间	 */
	private static int endTime = 0;
	/**	 * 活动阶段	 */
	private static int state = 0;
	/**	 * 上一次发放定时奖励的时间	 */
	private static int timeSendTimeAwards = 0;
	/**	 * 首次进入楼层的概率事件	 */
	private static ProbabilityEventModel pm;
	
	
//	/**	 * 普通奖励	 */
//	private static Map<Integer, List<ProbabilityEventModel>> commonAwardsMap = new ConcurrentHashMap<Integer, List<ProbabilityEventModel>>();
//	/**	 * 额外奖励	 */
//	private static Map<Integer, List<ProbabilityEventModel>> otherAwardsMap = new ConcurrentHashMap<Integer, List<ProbabilityEventModel>>();
	
	@Override
	public void startServer() throws RunServerException {
		
	}

	@Override
	public void initExcel() throws RunServerException {
		pm = new ProbabilityEventModel();
		List<Struct_wdtx_260> sortList = Config_wdtx_260.getIns().getSortList();
		for(Struct_wdtx_260 temp: sortList) {
			int join = temp.getJoin();
			if(join!=0) {
				pm.addProbabilityEvent( join, temp.getId());
			}
		}
		
	}

	public static Map<Integer, ConcurrentHashMap<Integer, CrossWenDingTianXiaRoom>> getpWdtxRoomMap() {
		return pWdtxRoomMap;
	}

	public static Map<Integer, ConcurrentHashMap<Integer, Integer>> getpWdtxZidToRoomIDMap() {
		return pWdtxZidToRoomIDMap;
	}

	public static Map<Integer, List<CrossWenDingTianXiaTop10Strength>> getpRankListMap() {
		return pRankListMap;
	}

	public static List<CrossWenDingTianXiaTop10Strength> getWdtxTop10StrengthRankList(int partId) {
		return pRankListMap.get(partId);
	}
	public static void setWdtxTop10StrengthRankList(List<CrossWenDingTianXiaTop10Strength> wdtxTop10StrengthRankList, int partId) {
		CrossWenDingTianXiaCrossCache.pRankListMap.put(partId, wdtxTop10StrengthRankList);
	}
	public static Map<Integer, CrossWenDingTianXiaRoom> getWdtxRoomMap(int partId) {
		return pWdtxRoomMap.get(partId);
	}

	public static void setWdtxRoomMap(ConcurrentHashMap<Integer, CrossWenDingTianXiaRoom> wdtxRoomMap, int partId) {
		CrossWenDingTianXiaCrossCache.pWdtxRoomMap.put(partId, wdtxRoomMap);
	}
	public static Map<Integer, Integer> getWdtxZidToRoomIDMap(int partId) {
		return pWdtxZidToRoomIDMap.get(partId);
	}

	public static void setWdtxZidToRoomIDMap(ConcurrentHashMap<Integer, Integer> wdtxZidToRoomIDMap, int partId) {
		CrossWenDingTianXiaCrossCache.pWdtxZidToRoomIDMap.put(partId, wdtxZidToRoomIDMap);
	}

	public static int getEndTime() {
		return endTime;
	}
	public static void setEndTime(int endTime) {
		CrossWenDingTianXiaCrossCache.endTime = endTime;
	}
	public static int getState() {
		return state;
	}
	public static void setState(int state) {
		CrossWenDingTianXiaCrossCache.state = state;
	}
	public static List<Integer> getWdtxNewServerList() {
		return wdtxNewServerList;
	}
	public static void setWdtxNewServerList(List<Integer> wdtxNewServerList) {
		CrossWenDingTianXiaCrossCache.wdtxNewServerList = wdtxNewServerList;
	}
	public static void addWdtxNewServerList(int zid) {
		CrossWenDingTianXiaCrossCache.wdtxNewServerList.add(zid);
	}
	public static int getTimeSendTimeAwards() {
		return timeSendTimeAwards;
	}
	public static void setTimeSendTimeAwards(int timeSendTimeAwards) {
		CrossWenDingTianXiaCrossCache.timeSendTimeAwards = timeSendTimeAwards;
	}
	public static ProbabilityEventModel getPm() {
		return pm;
	}
	public static void setPm(ProbabilityEventModel pm) {
		CrossWenDingTianXiaCrossCache.pm = pm;
	}
}
