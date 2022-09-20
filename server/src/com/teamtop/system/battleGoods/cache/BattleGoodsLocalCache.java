package com.teamtop.system.battleGoods.cache;

import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.main.RunServerException;
import com.teamtop.system.activity.ativitys.hefuGodGift.HeFuGodGiftSysCache;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.util.log.LogTool;

public class BattleGoodsLocalCache extends AbsServerEvent {
	
	private static BattleGoodsLocalCache ins = null;

	public static  BattleGoodsLocalCache getIns() {
		if (ins == null) {
			ins = new BattleGoodsLocalCache();
		}
		return ins;
	}
	
	/**	 * 活动状态  0关闭 2开始 	 */
	private static int state = 0;
	/**
	 * 玩家中途离开活动时间缓存
	 */
	public static ConcurrentHashMap<Long,Integer> outTimeByHid=new ConcurrentHashMap<Long,Integer>();
	/**
	 * 粮草mvp
	 */
	public static String mvpName;
	
	public static int getState() {
		return state;
	}

	public static void setState(int state) {
		BattleGoodsLocalCache.state = state;
	}

	public static ConcurrentHashMap<Long, Integer> getOutTimeByHid() {
		return outTimeByHid;
	}

	public static void setOutTimeByHid(ConcurrentHashMap<Long, Integer> outTimeByHid) {
		BattleGoodsLocalCache.outTimeByHid = outTimeByHid;
	}

	public static String getMvpName() {
		return mvpName;
	}

	public static void setMvpName(String mvpName) {
		BattleGoodsLocalCache.mvpName = mvpName;
	}

	@Override
	public void startServer() throws RunServerException {
		GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.CROSS_BATTLEGOODS_MVP);
		String content = globalData.getContent();
		if (content == null || content.equals("") || content.equals("{}")) {
			
		} else {
			setMvpName(content);
		}
		
	}
	
	@Override
	public void shutdownServer(){
		updateGlobalData();
	}
	
	public static void  updateGlobalData() {
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.CROSS_BATTLEGOODS_MVP);
			globalData.setContent(getMvpName());
			GlobalCache.doSync(globalData);
		} catch (Exception e) {
			LogTool.error(e, HeFuGodGiftSysCache.class, " updateGlobalData exception");
		}

	}
	
	

}
