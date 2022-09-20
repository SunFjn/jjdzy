package com.teamtop.system.crossTeamKing.local;

import java.util.concurrent.ConcurrentHashMap;

import com.alibaba.fastjson.JSON;
import com.teamtop.main.RunServerException;
import com.teamtop.system.crossTeamKing.cross.TeamKingRankSys;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.util.log.LogTool;

import excel.config.Config_kfwzdw_770;
import excel.config.Config_kfwzmb_770;
import excel.struct.Struct_kfwzdw_770;
import excel.struct.Struct_kfwzmb_770;

public class CrossTeamKingLocalCache extends AbsServerEvent {
	/**
	 * 跨服王者-目标表 转生段位-》序号->奖励目标
	 */
	public static ConcurrentHashMap<Integer,ConcurrentHashMap<Integer, Struct_kfwzmb_770>> goalRewardMap=new ConcurrentHashMap<>();
	/**
	 * 转生-》段位-》段位信息
	 */
	public static ConcurrentHashMap<Integer,ConcurrentHashMap<Integer, Struct_kfwzdw_770>> duanweiRewardMap=new ConcurrentHashMap<>();
	
	/**
	 * 排行榜本地缓存
	 */
	private static TeamKingRankSys teamKingRankSys=new TeamKingRankSys();
	
	/**跨服王者周重置时间**/
	public static  int weekRestTime=0;
	
	public static TeamKingRankSys getTeamKingRankSys() {
		return teamKingRankSys;
	}

	public static void setTeamKingRankSys(TeamKingRankSys teamKingRankSys) {
		CrossTeamKingLocalCache.teamKingRankSys = teamKingRankSys;
	}

	public static int getWeekRestTime() {
		return weekRestTime;
	}

	public static void setWeekRestTime(int weekRestTime) {
		CrossTeamKingLocalCache.weekRestTime = weekRestTime;
	}
	
	

	public static ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, Struct_kfwzdw_770>> getDuanweiRewardMap() {
		return duanweiRewardMap;
	}

	public static void setDuanweiRewardMap(
			ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, Struct_kfwzdw_770>> duanweiRewardMap) {
		CrossTeamKingLocalCache.duanweiRewardMap = duanweiRewardMap;
	}

	@Override
	public void startServer() throws RunServerException {
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.CROSS_TEAMKING_WEEKREST);
			String content = globalData.getContent();
			if (content == null || content.equals("") || content.equals("{}")) {

			} else {
				setWeekRestTime(Integer.parseInt(content));
			}
		} catch (Exception e) {
			LogTool.error(e, CrossTeamKingLocalCache.class, "CrossTeamKingLocalCache startServer");
		}
		
		
	}
	
	@Override
    public void initExcel() throws RunServerException{
		try {
			goalRewardMap.clear();
			duanweiRewardMap.clear();
			for (Struct_kfwzmb_770 kfwzmb_770:Config_kfwzmb_770.getIns().getSortList()) {
				int zs = kfwzmb_770.getZs();
				if (!goalRewardMap.containsKey(zs)) {
					ConcurrentHashMap<Integer, Struct_kfwzmb_770> indexRewardMap=new ConcurrentHashMap<>();
					goalRewardMap.put(zs, indexRewardMap);
					indexRewardMap.put(kfwzmb_770.getId(), kfwzmb_770);
				}else {
					ConcurrentHashMap<Integer, Struct_kfwzmb_770> indexRewardMap = goalRewardMap.get(zs);
					indexRewardMap.put(kfwzmb_770.getId(), kfwzmb_770);
				}
			}
			
			for (Struct_kfwzdw_770 kfwzdw_770:Config_kfwzdw_770.getIns().getSortList()) {
				int zs = kfwzdw_770.getZs();
				if (!duanweiRewardMap.containsKey(zs)) {
					ConcurrentHashMap<Integer, Struct_kfwzdw_770> indexRewardMap=new ConcurrentHashMap<>();
					duanweiRewardMap.put(zs, indexRewardMap);
					indexRewardMap.put(kfwzdw_770.getDw(), kfwzdw_770);
				}else {
					ConcurrentHashMap<Integer, Struct_kfwzdw_770> indexRewardMap = duanweiRewardMap.get(zs);
					indexRewardMap.put(kfwzdw_770.getDw(), kfwzdw_770);
				}
			}
			
		} catch (Exception e) {
			LogTool.error(e, CrossTeamKingLocalCache.class, "CrossTeamKingLocalCache initExcel has wrong");
		}
	}
	
	@Override
	public void shutdownServer(){
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.CROSS_TEAMKING_WEEKREST);
			globalData.setContent(JSON.toJSONString(getWeekRestTime()));
			GlobalCache.doSync(globalData);
		} catch (Exception e) {
			LogTool.error(e, CrossTeamKingLocalCache.class, "CrossTeamKingLocalCache has wrong");
		}
	}

}
