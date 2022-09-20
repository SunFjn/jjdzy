package com.teamtop.system.sevenWuShenRank;

import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.gameCommon.GameProperties;
import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.system.peacockFloor.PeacockFloorSysCache;
import com.teamtop.util.db.trans.ObjStrTransUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_wsmb_238;
import excel.struct.Struct_wsmb_238;

/**
 * 7日武圣榜缓存
 * @author jjjjyyy
 *
 */
public class SevenWuShenRankCache extends AbsServerEvent{
	
	public static SevenWuShenRankCache ins;
	
	public static  SevenWuShenRankCache getIns() {
		if(ins == null){
			ins = new SevenWuShenRankCache();
		}
		return ins;
	}
	
	public static WuShenRankSys wuShenRankSys=new WuShenRankSys();
	
	public static ConcurrentHashMap<Integer, ConcurrentHashMap<Integer,Struct_wsmb_238>>  WuShenRankGoalMap=new ConcurrentHashMap<Integer, ConcurrentHashMap<Integer,Struct_wsmb_238>>(); 

	public static WuShenRankSys getWushenranksys() {
		return wuShenRankSys;
	}
	public static ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, Struct_wsmb_238>> getWuShenRankGoalMap() {
		return WuShenRankGoalMap;
	}

	public static void setWuShenRankGoalMap(
			ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, Struct_wsmb_238>> wuShenRankGoalMap) {
		WuShenRankGoalMap = wuShenRankGoalMap;
	}



	@Override
	public void startServer() throws RunServerException {
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.WUSHENRANK);
			String content = globalData.getContent();
			if (content==null||content.equals("")||content.equals("{}")) {
				wuShenRankSys=new WuShenRankSys();
			}else{
				wuShenRankSys=ObjStrTransUtil.toObj(content, WuShenRankSys.class);
			}
			//7.9-7.16
			int openDayZero = TimeDateUtil.getOneDayZeroTime(GameProperties.serverOpenTime);
			int beginTime   = TimeDateUtil.getTimeIntByStr("2019-07-09 02:00:00");
			int overTime   = TimeDateUtil.getTimeIntByStr("2019-07-16 23:59:50");
			if (openDayZero>beginTime&&openDayZero<overTime) {
				//并且这个服没处理过
				if (SevenWuShenRankCache.getWushenranksys().getIsSendBuChang()==0) {
					//补发奖励
					int num=TimeDateUtil.betweenOpen()-1;
					if (num<=7&&num>0) {
						for (int i = 1; i <=num; i++) {
							SevenWuShenRankFunction.getIns().buFaReward(i);
						}
					}
					SevenWuShenRankCache.getWushenranksys().setIsSendBuChang(1);
					LogTool.info("resendReward sccess", SevenWuShenRankFunction.class);
					
					globalData = GlobalCache.getGlobalData(GlobalConst.WUSHENRANK);
					globalData.setContent(ObjStrTransUtil.toStr(getWushenranksys()));
					GlobalCache.doSync(globalData);
				}
				
				
			}
			
		} catch (Exception e) {
			LogTool.error(e, PeacockFloorSysCache.class, "SevenWuShenRankCache has wrong");
		}
		
	}
	
	public void update() {
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.WUSHENRANK);
			globalData.setContent(ObjStrTransUtil.toStr(getWushenranksys()));
			GlobalCache.doSync(globalData);
		} catch (Exception e) {
			LogTool.error(e, this, "SevenWuShenRankCache update has wrong");
		}
	}

	@Override
	public void shutdownServer(){
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.WUSHENRANK);
			globalData.setContent(ObjStrTransUtil.toStr(getWushenranksys()));
			GlobalCache.doSync(globalData);
		} catch (Exception e) {
			LogTool.error(e, this, "SevenWuShenRankCache shutdownServer has wrong");
		}
	}
	
	@Override
	public void initExcel() throws RunServerException{
		for (Struct_wsmb_238 wsmb_238:Config_wsmb_238.getIns().getSortList()) {
			int type=wsmb_238.getId()/100;
			if(!SevenWuShenRankCache.getWuShenRankGoalMap().containsKey(type)) {
				SevenWuShenRankCache.getWuShenRankGoalMap().put(type, new ConcurrentHashMap<Integer, Struct_wsmb_238>());
			}
			SevenWuShenRankCache.getWuShenRankGoalMap().get(type).put(wsmb_238.getId(), wsmb_238);
		}
		
	}
}
