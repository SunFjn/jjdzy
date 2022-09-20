package com.teamtop.system.tigerPass.cross;

import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.cross.CrossCache;
import com.teamtop.main.RunServerException;
import com.teamtop.system.crossSelectKing.cross.CrossSelectKingCache;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.tigerPass.model.TigerPassEmployer;
import com.teamtop.util.log.LogTool;


public class TigerPassCrossCache extends AbsServerEvent{
	
	/**
	 * 大分区-》雇佣兵id->雇佣兵
	 */
	private static ConcurrentHashMap<Integer,ConcurrentHashMap<Long, TigerPassEmployer>> TigerPassEmployerMap=new ConcurrentHashMap<Integer,ConcurrentHashMap<Long, TigerPassEmployer>>();
	
	public static ConcurrentHashMap<Integer, ConcurrentHashMap<Long, TigerPassEmployer>> getTigerPassEmployerMap() {
		return TigerPassEmployerMap;
	}

	public static void setTigerPassEmployerMap(
			ConcurrentHashMap<Integer, ConcurrentHashMap<Long, TigerPassEmployer>> tigerPassEmployerMap) {
		TigerPassEmployerMap = tigerPassEmployerMap;
	}

	public static ConcurrentHashMap<Long, TigerPassEmployer> getTigerPassEmployerMap(int partid) {
		if (!TigerPassEmployerMap.containsKey(partid)) {
			TigerPassEmployerMap.put(partid, new ConcurrentHashMap<Long, TigerPassEmployer>());
		}
		return TigerPassEmployerMap.get(partid);
	}



	@Override
	public void startServer() throws RunServerException {
		try {
			List<TigerPassEmployer> findAllTigerPassEmployerData = TigerPassEmployerDao.getIns().findAllTigerPassEmployerData();
			for(TigerPassEmployer data:findAllTigerPassEmployerData) {
				 ConcurrentHashMap<Long, TigerPassEmployer> tigerPassEmployerMap2 = getTigerPassEmployerMap(data.getBelongZoneid());
				 tigerPassEmployerMap2.put(data.getHid(), data);
			}
			
		} catch (Exception e) {
			LogTool.error(e, TigerPassCrossCache.class, "startServer has wrong");
		}
		
		
	}
	
	@Override
	public void shutdownServer(){
		updateData();
	}
	
	/**
	 * 更新数据
	 * @author lobbyer
	 * @date 2017年8月2日
	 */
	public static void updateData() {
		try {
			for (int partId:CrossCache.getZoneidToChannelMap().keySet()) {
			    ConcurrentHashMap<Long, TigerPassEmployer> tigerPassEmployerMap1 = getTigerPassEmployerMap(partId);
			    if (tigerPassEmployerMap1.size()>0) {
			    	TigerPassEmployerDao.getIns().update(tigerPassEmployerMap1.values());
				}
				
			}
		} catch (Exception e) {
			LogTool.error(e, CrossSelectKingCache.class, "updateCrossSelectKing Exception!");
		}
	}

	
	
}
