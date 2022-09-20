package com.teamtop.util.cache;

import com.teamtop.system.event.backstage.events.flowMMCache.FlowMMCache;


public abstract class NormalCache{
	protected boolean threadSafe;
	protected void addMMCache(String name,Object obj) {
		if(name!=null){
			FlowMMCache.addCache(name, obj);
		}
	}
	protected void setThreadSafe(boolean threadSafe) {
		this.threadSafe = threadSafe;
	}
	
}
