package com.teamtop.system.event.backstage.events.backstage.roleInfo;

import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.system.account.Account;
import com.teamtop.system.event.backstage.AbsBackstageEvent;
import com.teamtop.system.event.backstage.dao.BackstageDao;
import com.teamtop.system.event.backstage.events.backstage.dao.HoutaiDao;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.TempData;
import com.teamtop.util.log.LogTool;

public class B_RoleInfoEvent extends AbsBackstageEvent{

	private static B_RoleInfoEvent ins = null;

	public static synchronized B_RoleInfoEvent getIns() {
		if (ins == null) {
			ins = new B_RoleInfoEvent();	
		}
		return ins;
	}
	
	public void login(int currTime,Hero hero){
		
	}
	
	@Override
	public void shutdownServer(){
		save();
	}
	
	public void executeFiveMin(int currTime){
		save();
	}
	
	private void save(){
		try {
			if (B_RoleInfoCache.getRoleinfomap().size()>0) {
				for (int zoneid:B_RoleInfoCache.getRoleinfomap().keySet()) {
					ConcurrentHashMap<Long,B_RoleInfo> m_roleInfoMapById=B_RoleInfoCache.getRoleinfomap().get(zoneid);
					BackstageDao.insertOnDuplicateBatch(m_roleInfoMapById.values(), B_RoleInfo.class,zoneid,null,1000);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, B_RoleInfoEvent.class, "executeFiveMin has wrong");
		}
	}
	
	
}
