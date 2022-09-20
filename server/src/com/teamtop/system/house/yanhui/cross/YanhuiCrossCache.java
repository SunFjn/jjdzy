package com.teamtop.system.house.yanhui.cross;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.teamtop.cross.CrossCache;
import com.teamtop.cross.upload.CrossHeroBaseModel;
import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.house.yanhui.model.CrossYanhui;
import com.teamtop.system.house.yanhui.model.Yanhui;
import com.teamtop.system.house.yanhui.model.YanhuiMember;
import com.teamtop.util.log.LogTool;

public class YanhuiCrossCache extends AbsServerEvent{
	
	public static YanhuiCrossCache ins;
	
	public static synchronized YanhuiCrossCache getIns() {
		if(ins == null){
			ins = new YanhuiCrossCache();
		}
		return ins;
	}
	/** 跨服宴会 */
	private static CrossYanhui crossYanhui;
	/** 宴会唯一ID */
	private static AtomicInteger yanhuiUnitId = new AtomicInteger(1);
	/** <玩家id,宴会id> */
	private static Map<Long,Integer> yanhuiIdMap = new HashMap<Long, Integer>();
	/** 在副本里面的玩家，key:宴会id,value:角色id */
	//private static Map<Integer, Set<Long>> fubenRoleMap = new HashMap<>();
	
	
	/**
	 * 获得宴会副本玩家
	 * @param id
	 * @return
	 */
//	public Set<Long> getFubenRoles(int id){
//		return fubenRoleMap.get(id);
//	}
	
	/**
	 * 添加宴会副本玩家
	 * @param id
	 * @param hid
	 */
//	public void addFubenRole(int id, long hid) {
//		Set<Long> set = fubenRoleMap.get(id);
//		if(set == null) {
//			set = new HashSet<Long>();
//		}
//		set.add(hid);
//	}
	/**
	 * 移除宴会副本玩家
	 * @param id
	 * @param hid
	 */
//	public void removeFubenRole(int id, long hid) {
//		Set<Long> list = fubenRoleMap.get(id);
//		if(list != null) {
//			list.remove(hid);
//		}
//	}
	
	/**
	 * 移除玩家宴会id
	 * @param hid
	 */
	public void removeYanhuiId(long hid) {
		yanhuiIdMap.remove(hid);
	}
	/**
	 * 移除玩家宴会
	 * @param hid
	 */
	public void removeYanhui(int partId, Yanhui yanhui) {
		Map<Integer, Yanhui> yanhuiMap = crossYanhui.getCrossYanhuiMap(partId);
		if(yanhuiMap != null) {
			yanhuiMap.remove(yanhui.getId());
		}
	}
	/**
	 * 获得宴会id
	 * @param hid
	 * @return
	 */
	public int getYanhuiId(long hid) {
		Integer id = yanhuiIdMap.get(hid);
		if(id == null) {
			return 0;
		}
		return id;
	}
	
	/**
	 * 获得宴会
	 * @return
	 */
	public Yanhui getYanhui(Hero hero) {
		long hid = hero.getId();
		int id = YanhuiCrossCache.getIns().getYanhuiId(hid);
		if(id == 0) return null;
		int zoneid = hero.getZoneid();
		int partId = CrossCache.getPartId(zoneid);
		Map<Integer, Yanhui> crossYanhuiMap = crossYanhui.getCrossYanhuiMap(partId);
		if(crossYanhuiMap == null) return null;
		return crossYanhuiMap.get(id);
	}
	/**
	 * 获得宴会
	 * @param id 宴会id
	 * @return
	 */
	public Yanhui getYanhui(Hero hero,int id) {
		int zoneid = hero.getZoneid();
		int partId = CrossCache.getPartId(zoneid);
		Map<Integer, Yanhui> crossYanhuiMap = crossYanhui.getCrossYanhuiMap(partId);
		return crossYanhuiMap.get(id);
	}
	/**
	 * 获得宴会
	 * @param id 宴会id
	 * @return
	 */
	public Yanhui getYanhui(int id,int partId) {
		Map<Integer, Yanhui> crossYanhuiMap = crossYanhui.getCrossYanhuiMap(partId);
		return crossYanhuiMap.get(id);
	}
	/**
	 * 获得宴会
	 * @param id 宴会id
	 * @return
	 */
	public Yanhui getYanhuiById(int id) {
		Map<Integer, Map<Integer, Yanhui>> crossYanhuiMap = crossYanhui.getCrossYanhuiMap();
		for(Map<Integer, Yanhui> map : crossYanhuiMap.values()) {
			Yanhui yanhui = map.get(id);
			if(yanhui != null) {
				return yanhui;
			}
		}
		return null;
	}
	
	/**
	 * 添加宴会
	 * @param id
	 * @param Yanhui
	 * @param partId
	 */
	public void addYanhui(int id,Yanhui yanhui,int partId) {
		Map<Integer, Yanhui> map = crossYanhui.getCrossYanhuiMap(partId);
		if(map == null) {
			map = new HashMap<Integer, Yanhui>();
			crossYanhui.getCrossYanhuiMap().put(partId, map);
		}
		map.put(id, yanhui);
	}
	
	/**
	 * 添加宴会成员
	 * @param hero
	 * @param yanhuiModel
	 * @param type 礼物类型
	 */
	public void addYanhuiMember(CrossHeroBaseModel heroBase,Yanhui yanhui,int type) {
		Map<Long, YanhuiMember> yanhuiMemberMap = yanhui.getYanhuiMemberMap();
		long hid = heroBase.getId();
		YanhuiMember yanhuiMember = new YanhuiMember(hid,heroBase.getNameZoneid(),type);
		yanhuiMemberMap.put(hid, yanhuiMember);
		yanhuiIdMap.put(hid, yanhui.getId());
	}
	/**
	 * 添加宴会成员
	 * @param hero
	 * @param yanhuiModel
	 * @param type 礼物类型
	 */
	public void addYanhuiMember(long hid,String name,Yanhui yanhui,int type) {
		Map<Long, YanhuiMember> yanhuiMemberMap = yanhui.getYanhuiMemberMap();
		YanhuiMember yanhuiMember = new YanhuiMember(hid,name,type);
		yanhuiMemberMap.put(hid, yanhuiMember);
		yanhuiIdMap.put(hid, yanhui.getId());
	}
	
	/**
	 * 获得跨服组所有宴会
	 * @return
	 */
	public Map<Integer, Yanhui> getAllYanhuibyPartId(int partId) {
		if(crossYanhui == null) {
			crossYanhui = new CrossYanhui();
		}
		return crossYanhui.getCrossYanhuiMap(partId);
	}
	
	
	@Override
	public void initExcel() throws RunServerException {
		try {
			
		} catch (Exception e) {
			LogTool.error(e, YanhuiCrossCache.class, "YanhuiCrossCache initExcel has wrong");
			throw e;
		}
	}
	
	public static synchronized int getYanhuiUnitId() {
		if (yanhuiUnitId.get() >= Integer.MAX_VALUE) {
			yanhuiUnitId.set(1);
		}
		int incId = yanhuiUnitId.getAndIncrement();
		crossYanhui.setIncId(incId);
		return incId;
	}
	public static void setYanhuiUnitId(int unitId) {
		yanhuiUnitId.set(unitId);
	}

	@Override
	public void startServer() throws RunServerException {
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.CROSS_YANHUI);
			String content = globalData.getContent();
			if (content == null || content.equals("") || content.equals("{}")) {
				crossYanhui = new CrossYanhui();
				//Map<Integer,Map<Integer,Yanhui>> crossYanhuiMap = new HashMap<Integer, Map<Integer,Yanhui>>();
				//crossYanhui.setCrossYanhuiMap(crossYanhuiMap);
			} else {
				CrossYanhui tempCache = JSONObject.parseObject(content, CrossYanhui.class);
				if (tempCache != null) {
					crossYanhui = tempCache;
					int incId = crossYanhui.getIncId();
					if(incId < Integer.MAX_VALUE) {
						incId = incId+1;
					}
					setYanhuiUnitId(incId);
					Map<Integer, Map<Integer, Yanhui>> crossyanhuiMap = crossYanhui.getCrossYanhuiMap();
					if(crossyanhuiMap!=null && crossyanhuiMap.values() != null) {
						for(Map<Integer, Yanhui> yanhuiMap : crossyanhuiMap.values()) {
							if(yanhuiMap.values() != null) {
								for(Yanhui yanhui : yanhuiMap.values()) {
									int id = yanhui.getId();
									Map<Long, YanhuiMember> members = yanhui.getYanhuiMemberMap();
									for(YanhuiMember member : members.values()) {
										yanhuiIdMap.put(member.getHid(), id);
									}
								}
							}
						}
					}
				}
			}
		} catch (Exception e) {
			LogTool.error(e, YanhuiCrossCache.class, "YanhuiCrossCache startServer has wrong");
		}
	}
	/**
	 * 关闭服务器
	 */
	@Override
	public void shutdownServer(){
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.CROSS_YANHUI);
			globalData.setContent(JSON.toJSONString(crossYanhui));
			GlobalCache.doSync(globalData);
		} catch (Exception e) {
			LogTool.error(e, YanhuiCrossCache.class, "YanhuiCrossCache shutdownServer has wrong");
		}
	}
}
