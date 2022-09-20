package com.teamtop.system.country.newkingship;

import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.main.RunServerException;
import com.teamtop.system.country.CountrySysCache;
import com.teamtop.system.country.kingship.model.KingShipModel;
import com.teamtop.system.country.model.Country;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.util.db.trans.ObjStrTransUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

public class NewKingShipCache extends AbsServerEvent{
	
	public volatile static boolean isWWStartTime = false;
	
	public static NewKingShipCache newKingShipCache;
	
	public NewKingShipCache() {
		
	}
	public static synchronized NewKingShipCache getIns() {
		if (newKingShipCache == null) {
			newKingShipCache = new NewKingShipCache();
		}
		return newKingShipCache;
	}
	
	/**
	 * 新王位之争上榜的人/npc 国家-》站位-》新王位之争参与者
	 */
	private static NewKingShipSysCache newKingShipSysCache=new NewKingShipSysCache();
	/**
	 * 战斗map 位置-》int【0】 对战玩家Aid/npcid 对战开始时间【1】 对战玩家B id/npcid 对战开始时间【2】
	 */
	private static ConcurrentHashMap<Integer, long[]> battleMap=new ConcurrentHashMap<Integer, long[]>();
	
	
	public static ConcurrentHashMap<Integer, long[]> getBattleMap() {
		return battleMap;
	}
	public static void setBattleMap(ConcurrentHashMap<Integer, long[]> battleMap) {
		NewKingShipCache.battleMap = battleMap;
	}
	public static NewKingShipSysCache getNewKingShipSysCache() {
		return newKingShipSysCache;
	}
	public static void setNewKingShipSysCache(NewKingShipSysCache newKingShipSysCache) {
		NewKingShipCache.newKingShipSysCache = newKingShipSysCache;
	}
	/**
	 * 是否开启星期当天
	 * @return
	 */
	public boolean isStartWeek() {
		int[] START_WEEK_BEFORE7 = { 2, 5 };// 王位之争开启星期配置(前七天)(顺序配)
		int START_BEFORE = 7;
		int betweenOpen = TimeDateUtil.betweenOpen();
		int week = TimeDateUtil.getWeek();
		if (betweenOpen <= START_BEFORE) {// 开服前7天
			for (int day : START_WEEK_BEFORE7) {
				if (day == betweenOpen) {
					return true;
				}
			}
			return false;
		} else {// 开服后7天
			for (int week1 : NewKingShipConst.START_WEEK_ARRAY) {
				if (week == week1) {
					return true;
				}
			}
			return false;
		}
	}

	@Override
	public void startServer() throws RunServerException {
		GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.NEW_KINGSHIP);
		try {
			if(globalData!=null){
				String content = globalData.getContent();
				if(content!=null && !"".equals(content)){
					NewKingShipSysCache data;
					data = ObjStrTransUtil.toObj(content, NewKingShipSysCache.class);
					if(data!=null){
						NewKingShipCache.setNewKingShipSysCache(data);
					}

				}
			}
			if(NewKingShipCache.getNewKingShipSysCache()==null||NewKingShipCache.getNewKingShipSysCache().getJoinerNewKingShiper().size()==0){
				//第一期兼容老问鼎
				ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, NewKingShip>> joinerNewKingShiper = NewKingShipCache.getNewKingShipSysCache().getJoinerNewKingShiper();
				ConcurrentHashMap<Integer, Country> countryMap = CountrySysCache.getCountryCache().getCountryMap();
				for (Country country : countryMap.values()) {
					int cid = country.getCid();
					if (!joinerNewKingShiper.containsKey(cid)) {
						joinerNewKingShiper.put(cid, new ConcurrentHashMap<Integer, NewKingShip>());
					}
					ConcurrentHashMap<Integer, NewKingShip> concurrentHashMap = joinerNewKingShiper.get(cid);
					List<KingShipModel> kingShipModelList = country.getKingShipModelList();
					if (kingShipModelList.size()>0) {
						for (int i = 0; i < kingShipModelList.size(); i++) {
							KingShipModel kingShipModel = kingShipModelList.get(i);
							int sit=cid*100+i+1;
							NewKingShip newKingShip =new NewKingShip();
							newKingShip.setId(kingShipModel.getId());
							newKingShip.setNpcid(0);
							newKingShip.setType(NewKingShipConst.TYPE_1);
							newKingShip.setSit(sit);
							concurrentHashMap.put(sit, newKingShip);
						}
					}
					List<KingShipModel> kingShipModelList1 = country.getKingShiplGuardList();
					if (kingShipModelList1.size()>0) {
						for (int i = 0; i < kingShipModelList1.size(); i++) {
							KingShipModel kingShipModel = kingShipModelList1.get(i);
							int sit=cid*100+i+4;
							NewKingShip newKingShip =new NewKingShip();
							newKingShip.setId(kingShipModel.getId());
							newKingShip.setNpcid(0);
							newKingShip.setType(NewKingShipConst.TYPE_1);
							newKingShip.setSit(sit);
							concurrentHashMap.put(sit, newKingShip);
						}
					}
					
					
				}
			}
			int currentTime = TimeDateUtil.getCurrentTime();
			if (isStartWeek()) {
				String[] openSplit = NewKingShipConst.OPEN_TIME.split(":");
				Integer openHour = Integer.valueOf(openSplit[0]);
				Integer openMin = Integer.valueOf(openSplit[1]);
				int openTime = TimeDateUtil.getOneTime(0, openHour, openMin, 0);

				String[] endSplit = NewKingShipConst.END_TIME.split(":");
				Integer endHour = Integer.valueOf(endSplit[0]);
				Integer endMin = Integer.valueOf(endSplit[1]);
				int endTime = TimeDateUtil.getOneTime(0, endHour, endMin, 0);

				if (currentTime >= openTime && currentTime < endTime) {
					NewKingShipCache.isWWStartTime = true;
				} else {
					NewKingShipCache.isWWStartTime = false;
				}
			} else {
				NewKingShipCache.isWWStartTime = false;
			}
			
		} catch (Exception e) {
			LogTool.error(e, NewKingShipCache.class, "startServer has wrong");
		}
	}
	
	public static void  updateGlobalData() {
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.NEW_KINGSHIP);
			String dataStr = ObjStrTransUtil.toStr(NewKingShipCache.getNewKingShipSysCache());
			globalData.setContent(dataStr);
			GlobalCache.doSync(globalData);
		} catch (Exception e) {
			LogTool.error(e, NewKingShipCache.class, " updateGlobalData exception");
		}

	}
	
	@Override
	public void shutdownServer() {
		updateGlobalData();
	}

}
