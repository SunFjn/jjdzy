package com.teamtop.system.event.backstage.events.backstage;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentLinkedQueue;

import com.teamtop.system.event.backstage.BSUC;
import com.teamtop.system.event.backstage.events.backstage.loginInfo.B_FlowLoginInfo;
import com.teamtop.system.event.backstage.events.backstage.loginInfo.B_FlowLoginout;

/**
 * 登陆信息相关缓存类
 * @author hepl
 *
 */
public class HoutaiCache {
	/**
	 * 登陆流水缓存（每次登陆）
	 */
	private static final ConcurrentHashMap<Integer,ConcurrentLinkedQueue<B_FlowLoginInfo>> flowLoginInfoEvery = BSUC.reg("flowLoginInfoEvery", new ConcurrentHashMap<Integer,ConcurrentLinkedQueue<B_FlowLoginInfo>>());
	/**
	 * 登出流水缓存（每天登出）
	 */
	private static final ConcurrentHashMap<Integer,ConcurrentLinkedQueue<B_FlowLoginout>> flowLogoutInfoCache = BSUC.reg("flowLogoutInfoCache", new ConcurrentHashMap<Integer,ConcurrentLinkedQueue<B_FlowLoginout>>());
	
	/**
	 * 登陆流水缓存（每次登陆）
	 * @return
	 */
	public static ConcurrentHashMap<Integer,ConcurrentLinkedQueue<B_FlowLoginInfo>> getFlowLoginInfoCache(){
		return flowLoginInfoEvery;
	}
	
	/**
	 * 登出流水缓存（每天登出）
	 * @return
	 */
	public static ConcurrentHashMap<Integer,ConcurrentLinkedQueue<B_FlowLoginout>> getFlowLogoutInfoCache(){
		return flowLogoutInfoCache;
	}
	
}
