package com.teamtop.system.crossSelectKing.local;

import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.main.RunServerException;
import com.teamtop.system.crossSelectKing.cross.CrossSelectKing;
import com.teamtop.system.crossSelectKing.cross.CrossSelectKingCache;
import com.teamtop.system.crossSelectKing.cross.CrossSelectKingInfo;
import com.teamtop.system.crossSelectKing.cross.CrossSelectKingNode;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.util.db.trans.ObjStrTransUtil;
import com.teamtop.util.log.LogTool;

public class CrossSelectKingLocalCache  extends AbsServerEvent{
	/**
	 * 比赛信息第几届 阶段等等
	 */
	private static CrossSelectKingInfo kingInfo;
	/**
	 * 转生房间id->参与者id->参与者
	 */
	private static ConcurrentHashMap<Integer,ConcurrentHashMap<Long, CrossSelectKing>> kingHeroMap=new ConcurrentHashMap<Integer,ConcurrentHashMap<Long, CrossSelectKing>>();
	/*** 转生房间id-比赛节点*/
	public static ConcurrentHashMap<Integer, CrossSelectKingNode[][]> battleNodeMap = new ConcurrentHashMap<Integer, CrossSelectKingNode[][]>();
	/**买输赢缓存**/
	public static CrossSelectKingLocalBuyWin crossSelectKingLocalBuyWin=new CrossSelectKingLocalBuyWin();
	/**本地服战斗节点缓存**/
	public static ConcurrentHashMap<Integer, CrossSelectKingNode[][]> localBattleNodeMap=new ConcurrentHashMap<Integer, CrossSelectKingNode[][]>();
	
	public static CrossSelectKingInfo getKingInfo() {
		return CrossSelectKingLocalCache.kingInfo ;
	}
	public static void setKingInfo(CrossSelectKingInfo kingInfo) {
		CrossSelectKingLocalCache.kingInfo = kingInfo;
	}
	public static ConcurrentHashMap<Integer, ConcurrentHashMap<Long, CrossSelectKing>> getKingHeroMap() {
		return CrossSelectKingLocalCache.kingHeroMap ;
	}
	public static void setKingHeroMap(ConcurrentHashMap<Integer, ConcurrentHashMap<Long, CrossSelectKing>> kingHeroMap) {
		CrossSelectKingLocalCache.kingHeroMap = kingHeroMap;
	}
	public static ConcurrentHashMap<Integer, CrossSelectKingNode[][]> getLocalBattleNodeMap() {
		return localBattleNodeMap;
	}
	public static void setLocalBattleNodeMap(ConcurrentHashMap<Integer, CrossSelectKingNode[][]> localBattleNodeMap) {
		CrossSelectKingLocalCache.localBattleNodeMap = localBattleNodeMap;
	}
	@Override
	public void startServer() throws RunServerException {
		GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.BUYWINFINAL);
		String content = globalData.getContent();
		CrossSelectKingLocalBuyWin buyWinCache = null;
		if(content!=null && !"".equals(content)){
			try {
				buyWinCache = ObjStrTransUtil.toObj(content, CrossSelectKingLocalBuyWin.class);
			} catch (Exception e) {
				throw new RunServerException(e, "startServer info Exception!");
			}
		}
		if(buyWinCache == null){
			buyWinCache = new CrossSelectKingLocalBuyWin();
		}
		crossSelectKingLocalBuyWin = buyWinCache;
	}
	
	
	@Override
	public void shutdownServer(){
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.BUYWINFINAL);
			globalData.setContent(ObjStrTransUtil.toStr(crossSelectKingLocalBuyWin));
			GlobalCache.doSync(globalData);
		} catch (Exception e) {
			LogTool.error(e, CrossSelectKingCache.class, "shutdownServer info Exception!");
		}
	}

}
