package com.teamtop.system.crossTeamKing.cross;

import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.util.db.trans.ObjStrTransUtil;
import com.teamtop.util.log.LogTool;




public class CrossTeamKingCroCache extends AbsServerEvent {
	/**	 * 队伍ID，自动+1	 */
	private static AtomicInteger teamIdGen = new AtomicInteger();
	/**
	 * 分区partid-》转生区间->队伍id-》参与者
	 */
	private static ConcurrentHashMap<Integer,ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, CrossTeamKingter>>> jointeamMap =new ConcurrentHashMap<Integer,ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, CrossTeamKingter>>>();
	/**
	 * 玩家id->对于队伍id
	 */
	private static ConcurrentHashMap<Long,CrossTeamKingter> teamidMapByHid=new ConcurrentHashMap<Long,CrossTeamKingter>();
	/**
	 * 玩家对应-》战报集合 最新战报为当前战斗
	 */
	private static ConcurrentHashMap<Long,List<CrossTeamKingterBattleInfo>> BattleInfos=new ConcurrentHashMap<Long,List<CrossTeamKingterBattleInfo>>();
	/**
	 * 正在匹配的队伍
	 */
	private static  ConcurrentHashMap<Integer,CrossTeamKingter> teamInMarrys=new ConcurrentHashMap<Integer,CrossTeamKingter>();
	
	/**
	 * 玩家对应-》战报集合 最新战报为当前战斗
	 */
	private static ConcurrentHashMap<Long,List<CrossTeamKingBattleHis>> BattleHisByHid=new ConcurrentHashMap<Long,List<CrossTeamKingBattleHis>>();
	
	
	
	private static TeamKingRankSys teamKingRankSys=new TeamKingRankSys();
	
	
	public static ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, CrossTeamKingter>>> getJointeamMap() {
		return jointeamMap;
	}

	public static ConcurrentHashMap<Long, CrossTeamKingter> getTeamidMapByHid() {
		return teamidMapByHid;
	}
	
	public static ConcurrentHashMap<Long, List<CrossTeamKingterBattleInfo>> getBattleInfos() {
		return BattleInfos;
	}

	public static TeamKingRankSys getTeamKingRankSys() {
		return teamKingRankSys;
	}

	public static void setTeamKingRankSys(TeamKingRankSys teamKingRankSys) {
		CrossTeamKingCroCache.teamKingRankSys = teamKingRankSys;
	}

	public static ConcurrentHashMap<Integer, CrossTeamKingter> getTeamInMarrys() {
		return teamInMarrys;
	}

	public static void setTeamInMarrys(ConcurrentHashMap<Integer, CrossTeamKingter> teamInMarrys) {
		CrossTeamKingCroCache.teamInMarrys = teamInMarrys;
	}
	
	

	public static ConcurrentHashMap<Long, List<CrossTeamKingBattleHis>> getBattleHisByHid() {
		return BattleHisByHid;
	}

	public static void setBattleHisByHid(ConcurrentHashMap<Long, List<CrossTeamKingBattleHis>> battleHisByHid) {
		BattleHisByHid = battleHisByHid;
	}

	public static ConcurrentHashMap<Integer, CrossTeamKingter> getTeamByReborn(int partId,int rebronType){
		ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, CrossTeamKingter>> partidHashMap = jointeamMap.get(partId);
		if (partidHashMap!=null) {
			ConcurrentHashMap<Integer, CrossTeamKingter> rebronTypeHashMap = partidHashMap.get(rebronType);
			return rebronTypeHashMap;
		}
		return null;

	}

	public static  CrossTeamKingter getJointeam(int partId,int rebronType,Integer teamid) {
		ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, CrossTeamKingter>> partidHashMap = jointeamMap.get(partId);
		if (partidHashMap!=null) {
			ConcurrentHashMap<Integer, CrossTeamKingter> rebronTypeHashMap = partidHashMap.get(rebronType);
			if (rebronTypeHashMap!=null) {
				CrossTeamKingter crossTeamKingter = rebronTypeHashMap.get(teamid);
				if (crossTeamKingter!=null) {
					return crossTeamKingter;
				}
			}
		}
		return null;
	}
	/**
	 * 获取新的队伍id
	 */
	public static int getTeamId(){
		int i = teamIdGen.get();
		if (i >= Integer.MAX_VALUE || i==0) teamIdGen.set(1);
		return teamIdGen.getAndIncrement();
	}

	@Override
	public void startServer() throws RunServerException {
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.CROSS_TEAMKING_RANK);
			String content = globalData.getContent();
			if (content == null || content.equals("") || content.equals("{}")) {
				setTeamKingRankSys(new TeamKingRankSys());
			} else {
				setTeamKingRankSys(ObjStrTransUtil.toObj(content, TeamKingRankSys.class));
			}
		} catch (Exception e) {
			LogTool.error(e, CrossTeamKingCroCache.class, "CrossTeamKingCroCache startServer");
		}
	}
	
	@Override
	public void shutdownServer(){
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.CROSS_TEAMKING_RANK);
			globalData.setContent(ObjStrTransUtil.toStr(getTeamKingRankSys()));
			GlobalCache.doSync(globalData);
		} catch (Exception e) {
			LogTool.error(e, CrossTeamKingCroCache.class, "CrossTeamKingCroCache has wrong");
		}
	}
	
	
	

}
