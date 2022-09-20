package com.teamtop.system.littleLeader;

import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;

import excel.config.Config_sonstar_267;
import excel.struct.Struct_sonstar_267;

public class LittleLeaderSysCache extends AbsServerEvent{
	
	public static LittleLeaderSysCache littleLeaderSysCache;

	public LittleLeaderSysCache() {
		
	}
	public static synchronized LittleLeaderSysCache getIns() {
		if (littleLeaderSysCache == null) {
			littleLeaderSysCache = new LittleLeaderSysCache();
		}
		return littleLeaderSysCache;
	}


	/**
	 * 小主升星缓存
	 */
	public static ConcurrentHashMap<Integer,ConcurrentHashMap<Integer,Struct_sonstar_267>> leaderByStarMap =new ConcurrentHashMap<Integer,ConcurrentHashMap<Integer,Struct_sonstar_267>>();
	
	

	
	
	@Override
	public void initExcel() throws RunServerException{
		for (Struct_sonstar_267 sonstar_267:Config_sonstar_267.getIns().getSortList()) {
			int index=sonstar_267.getId()/1000;
			if (!leaderByStarMap.containsKey(index)) {
				leaderByStarMap.put(index, new ConcurrentHashMap<Integer,Struct_sonstar_267>());
			}
			ConcurrentHashMap<Integer, Struct_sonstar_267> concurrentHashMap = leaderByStarMap.get(index);
			int star=sonstar_267.getId()%1000;
			concurrentHashMap.put(star, sonstar_267);
		}
		
		
		
		
	}
	
	
	@Override
	public void startServer() throws RunServerException {
		
		
	}

}
