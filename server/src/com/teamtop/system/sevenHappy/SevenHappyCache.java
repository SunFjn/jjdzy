package com.teamtop.system.sevenHappy;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.TypeReference;
import com.teamtop.main.RunServerException;
import com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationHaoLiZhuanPan.model.CelebrationHaoLiZhuanPanRank;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.util.log.LogTool;

import excel.config.Config_party_240;
import excel.struct.Struct_party_240;


public class SevenHappyCache extends AbsServerEvent{
	
	public static SevenHappyCache ins;
	
	public static  SevenHappyCache getIns() {
		if(ins == null){
			ins = new SevenHappyCache();
		}
		return ins;
	}
	public static ConcurrentHashMap<Integer,Struct_party_240> SevenHappyByType=new ConcurrentHashMap<Integer,Struct_party_240>();
	
	public static ConcurrentHashMap<Integer, ConcurrentHashMap<Integer,Struct_party_240>>  SevenHappyMap=new ConcurrentHashMap<Integer, ConcurrentHashMap<Integer,Struct_party_240>>(); 
	
	/**限量奖励数量,第一层key：party_240.getType()，第二层key为party_240.getId()*/
	public static Map<Integer, Map<Integer,AtomicInteger>>  limitNumMap;
	
	public static Map<Integer, Map<Integer, AtomicInteger>> getLimitNumMap() {
		return limitNumMap;
	}
	public static ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, Struct_party_240>> getSevenHappyMap() {
		return SevenHappyMap;
	}
	public static void setSevenHappyMap(ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, Struct_party_240>> sevenHappyMap) {
		SevenHappyMap = sevenHappyMap;
	}
	
	
	public static ConcurrentHashMap<Integer, Struct_party_240> getSevenHappyByType() {
		return SevenHappyByType;
	}
	public static void setSevenHappyByType(ConcurrentHashMap<Integer, Struct_party_240> sevenHappyByType) {
		SevenHappyByType = sevenHappyByType;
	}
	
	
	@Override
	public void startServer() throws RunServerException {
		String content=null;
		try {
		GlobalData globalDataRankData = GlobalCache.getGlobalData(GlobalConst.SEVENHAPPY_LIMITNUM);
		content = globalDataRankData.getContent();
		if (content == null || content.equals("") || content.equals("{}")) {
			limitNumMap = new HashMap<>();
			initOrUpdateLimitNumMap();
		}else {
			limitNumMap = JSONObject.parseObject(content, new TypeReference<Map<Integer, Map<Integer,AtomicInteger>>>(){}.getType());
			initOrUpdateLimitNumMap();
		}
		}catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, "SevenHappyCache startServer has wrong" + " content:" + content);
		}
	}
	
	/**
	 * 启动服务器初始化和更新limitNumMap
	 */
	public void initOrUpdateLimitNumMap() {
		for (Struct_party_240  party_240: Config_party_240.getIns().getSortList()) {
			if(party_240.getSl()>0) {
				int type = party_240.getType();
				Map<Integer, AtomicInteger> map = limitNumMap.get(type);
				if(map==null) {
					map=new HashMap<>();
					limitNumMap.put(type, map);
				}
				//只添加不存在的id
				if(!map.containsKey(party_240.getId())) {
					map.put(party_240.getId(), new AtomicInteger(party_240.getSl()));
				}
			}
		}
	}
	
	@Override
	public void shutdownServer() {
		// TODO Auto-generated method stub
		String content=null;
		try {
		GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.SEVENHAPPY_LIMITNUM);
		content = JSON.toJSONString(limitNumMap);
		globalData.setContent(content);
		GlobalCache.doSync(globalData);
		}catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, "SevenHappyCache shutdownServer has wrong" + " content:" + content);
		}
	}
	@Override
	public void initExcel() throws RunServerException{
		for (Struct_party_240  party_240: Config_party_240.getIns().getSortList()) {
			int type=party_240.getType();
			if (!SevenHappyCache.SevenHappyMap.containsKey(type)) {
				SevenHappyCache.SevenHappyMap.put(type, new ConcurrentHashMap<Integer, Struct_party_240>());
			}
			SevenHappyCache.SevenHappyMap.get(type).put(party_240.getId(), party_240);
			SevenHappyCache.SevenHappyByType.put(type, party_240);
		}
		
	}

}
