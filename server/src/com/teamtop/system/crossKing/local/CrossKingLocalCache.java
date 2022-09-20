package com.teamtop.system.crossKing.local;

import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.main.RunServerException;
import com.teamtop.system.crossKing.CrossKingConst;
import com.teamtop.system.crossKing.model.CrossKingInfo;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.util.db.trans.ObjStrTransUtil;
import com.teamtop.util.log.LogTool;
/**
 * 最强王者缓存类
 * @author lobbyer
 * @date 2016年8月29日
 */
public class CrossKingLocalCache extends AbsServerEvent{
	
	public static CrossKingLocalCache ins;
	
	public static  CrossKingLocalCache getIns() {
		if(ins == null){
			ins = new CrossKingLocalCache();
		}
		return ins;
	}
	
    /***活动信息**/
	private static CrossKingInfo info;
	/***角色信息*/
	private static ConcurrentHashMap<Long, CrossKing> crossKingPlayerMap=new ConcurrentHashMap<Long, CrossKing>();
	/***活动第一次需要手动开启 0 1**/
	private static int openState;
	/**被击败战报**/
	private static ConcurrentHashMap<Long, String> isbeatMap=new ConcurrentHashMap<Long, String>();
	
	public static CrossKingInfo getInfo(){
		return info;
	}
	public static void setInfo(CrossKingInfo ckInfo) {
		info = ckInfo;
		if (CrossKingLocalCache.getOpenState()==0) {
			CrossKingLocalCache.setOpenState(1);
			CrossKingLocalCache.updateOpenState();
		}
	}
	public static boolean isOpen() {
		if(info == null || info.getState() != CrossKingConst.STATE_START) return false;
		return true;
	}
	
	public static ConcurrentHashMap<Long, CrossKing> getHeroDataMap() {
		return crossKingPlayerMap;
	}
	public static CrossKing getHeroKingData(long hid) {
		return crossKingPlayerMap.get(hid);
	}
	public static int getOpenState() {
		return openState;
	}
	public static void setOpenState(int openState) {
		CrossKingLocalCache.openState = openState;
	}
	public static ConcurrentHashMap<Long, String> getIsbeatMap() {
		return isbeatMap;
	}
	public static void setIsbeatMap(ConcurrentHashMap<Long, String> isbeatMap) {
		CrossKingLocalCache.isbeatMap = isbeatMap;
	}
	@Override
	public void startServer() throws RunServerException {
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.GM_CROSSKING);
			String content = globalData.getContent();
			if (content==null||content.equals("")||content.equals("{}")) {
				setOpenState(0);
			}else{
				setOpenState(ObjStrTransUtil.toObj(content, Integer.class));
			}
		} catch (Exception e) {
			LogTool.error(e, CrossKingLocalCache.class, "CrossKingLocalCache has wrong");
		}
	}
	
	@Override
	public void shutdownServer(){
		updateOpenState();
	}
	
	public static void updateOpenState() {
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.GM_CROSSKING);
			globalData.setContent(ObjStrTransUtil.toStr(getOpenState()));
			GlobalCache.doSync(globalData);
		} catch (Exception e) {
			LogTool.error(e,  CrossKingLocalCache.class, "CrossKingLocalCache shutdownServer has wrong");
		}
	}
	
}
