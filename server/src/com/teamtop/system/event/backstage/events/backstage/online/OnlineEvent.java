package com.teamtop.system.event.backstage.events.backstage.online;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map.Entry;
import java.util.Set;

import com.teamtop.system.event.backstage.AbsBackstageEvent;
import com.teamtop.system.event.backstage.dao.BackstageDao;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

/**
 * 每天在线人数记录事件类
 * @author hepl
 *
 */
public class OnlineEvent extends AbsBackstageEvent {

	@Override
	public void executeFiveMin(int currTime) {
		try {
			//每5分钟统计一次数据
			int zoneid = 0;
			String pfcode = null;
			String ip = null;
			HashMap<Integer, HashMap<String,List<Set<Object>>>> tempMap = new HashMap<Integer, HashMap<String, List<Set<Object>>>>();
			for (Hero  hero : HeroCache.getHeroMap().values()) {
				if (HeroFunction.getIns().isOnline(hero.getId()) && hero.getTempData() != null) {
					zoneid = hero.getZoneid();
					pfcode = hero.getTempData().getAccount().getPfcode();
					ip = hero.getLoginIp();
					//放入缓存
					setOnlineMap(tempMap, zoneid, pfcode, ip, hero.getId());
				}
			}
			/*while(iter.hasNext()){
				Entry<Long, Hero> next = iter.next();
				hid = next.getKey();
				hero = next.getValue();
				if(hero != null && hero.getTempData() != null){
					
				}
			}*/
			//入库
			insertOnline(tempMap, currTime);
		} catch (Exception e) {
			LogTool.error(e, OnlineEvent.class, "OnlineEvent executeFiveMin has error!");
		}
	}
	
	@Override
	public void shutdownServer() {
		executeFiveMin(TimeDateUtil.getCurrentTime());
	}
	
	/**
	 * 在线map
	 */
	public void setOnlineMap(HashMap<Integer, HashMap<String, List<Set<Object>>>> map, int zoneid, String pfcode,  String ip, long hid) {
		if (map.containsKey(zoneid)) {
			HashMap<String,  List<Set<Object>>> terraceMap = map.get(zoneid);
			if (terraceMap.containsKey(pfcode)) {// 平台代码
				List<Set<Object>> childwebMap = terraceMap.get(pfcode);
				Set<Object> ipSet = childwebMap.get(0);
				Set<Object> hidSet = childwebMap.get(1);
				ipSet.add(ip);// IP
				hidSet.add(hid);// 角色id
				childwebMap.add(ipSet);
				childwebMap.add(hidSet);
			}else {
				List<Set<Object>> list = new ArrayList<Set<Object>>();
				Set<Object> ipSet = new HashSet<Object>();
				Set<Object> hidSet = new HashSet<Object>();
				ipSet.add(ip);// IP
				hidSet.add(hid);// 角色id
				list.add(ipSet);
				list.add(hidSet);
				terraceMap.put(pfcode, list);
			}
		} else {
			HashMap<String, List<Set<Object>>> terraceMap = new HashMap<String,  List<Set<Object>>>();
			List<Set<Object>> list = new ArrayList<Set<Object>>();
			Set<Object> ipSet = new HashSet<Object>();
			Set<Object> hidSet = new HashSet<Object>();
			ipSet.add(ip);// IP
			hidSet.add(hid);// 角色id
			list.add(ipSet);
			list.add(hidSet);
			terraceMap.put(pfcode, list);
			map.put(zoneid, terraceMap);
		}
	}
	
	/**
	 * 在线统计入库
	 * @param map
	 * @param currentTime 当前时间
	 */
	public void insertOnline(HashMap<Integer,  HashMap<String, List<Set<Object>>>> map, int currentTime) {
		try {
			Iterator<Entry<Integer,  HashMap<String, List<Set<Object>>>>> iterat = map.entrySet().iterator();
			while (iterat.hasNext()) {
				//入库数据
				Entry<Integer, HashMap<String, List<Set<Object>>>> nnn = iterat.next();
				Integer zoneid = nnn.getKey();
				try {
					List<B_Online> tempList = new ArrayList<B_Online>();
					HashMap<String,  List<Set<Object>>> pfMap = nnn.getValue();
					Iterator<Entry<String,  List<Set<Object>>>> ite1 = pfMap.entrySet().iterator();
					while (ite1.hasNext()) {
						Entry<String, List<Set<Object>>> next = ite1.next();
						String pfcode = next.getKey();
						List<Set<Object>> list = next.getValue();

						Set<Object> ipSet = list.get(0);
						Set<Object> hidSet = list.get(1);
						B_Online online = new B_Online();
						int hidNum = hidSet.size();
						online.setPfcode(pfcode);
						online.setZoneid(zoneid);
						online.setIpNum(ipSet.size());
						online.setOnlineNum(hidNum);
						online.setTime(currentTime);
						tempList.add(online);
//						TXReportCache.addReport(null, TXReportConst.report_online, new Object[]{pf,zoneid,hidNum});
					}
					//入库
					BackstageDao.insertBatch(tempList, zoneid);
				} catch (Exception e) {
					LogTool.error(e, OnlineEvent.class, "insert online err，zoneid:" + zoneid);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, OnlineEvent.class, "insert online err");
		} 
	}
}
