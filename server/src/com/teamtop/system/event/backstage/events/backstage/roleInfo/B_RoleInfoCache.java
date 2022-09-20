package com.teamtop.system.event.backstage.events.backstage.roleInfo;

import java.util.concurrent.ConcurrentHashMap;

public class B_RoleInfoCache {
	
	
	private static final ConcurrentHashMap<Integer,ConcurrentHashMap<Long,B_RoleInfo>> B_RoleInfoMap=new ConcurrentHashMap<Integer,ConcurrentHashMap<Long,B_RoleInfo>>();

	public static ConcurrentHashMap<Integer,ConcurrentHashMap<Long,B_RoleInfo>> getRoleinfomap() {
		return B_RoleInfoMap;
	}
	
	

	
}
