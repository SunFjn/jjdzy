package com.teamtop.houtaiHttp.events.systemSwitch;

import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.system.event.backstage.BSUC;

/**
 * 系统开关缓存类
 * @author hepl
 *
 */
public class SystemSwitchCache{
	/**
	 * 系统开关缓存，保存系统开启表的funId，key为区号
	 */
	private static ConcurrentHashMap<Integer, List<Integer>> funIdCache = BSUC.reg("funIdCache", new ConcurrentHashMap<Integer, List<Integer>>());
	
	public static ConcurrentHashMap<Integer, List<Integer>> getFunIdCache(){
		return funIdCache;
	}
}
