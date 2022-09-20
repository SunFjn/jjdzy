package com.teamtop.system.event.backstage.events.flowHero;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentLinkedQueue;

import com.teamtop.util.cache.union.UC;

/**
 * 角色流水缓存
 * @author hepl
 *
 */
public class FlowHeroCache {
	/**
	 * 角色经验流水缓存
	 */
	private static ConcurrentHashMap<Integer, ConcurrentLinkedQueue<B_FlowHeroExp>> flowExpCache = UC.reg("flowExpCache",new ConcurrentHashMap<Integer, ConcurrentLinkedQueue<B_FlowHeroExp>>());
	/**
	 * 角色战力流水缓存
	 */
	private static ConcurrentHashMap<Integer, ConcurrentLinkedQueue<B_FlowHeroStrength>> flowStrengthCache = UC.reg("flowStrengthCache",new ConcurrentHashMap<Integer, ConcurrentLinkedQueue<B_FlowHeroStrength>>());
	/**
	 * 角色货币流水缓存(元宝除外)
	 */
	private static ConcurrentHashMap<Integer, ConcurrentLinkedQueue<B_FlowHeroMoney>> flowMoneyCache = UC.reg("flowMoneyCache",new ConcurrentHashMap<Integer, ConcurrentLinkedQueue<B_FlowHeroMoney>>());
	/**
	 * 商城购买流水缓存
	 */
	private static ConcurrentHashMap<Integer, ConcurrentLinkedQueue<B_FlowShop>> flowShopCache = UC.reg("flowShopCache",new ConcurrentHashMap<Integer, ConcurrentLinkedQueue<B_FlowShop>>());
	
	/**
	 * 系统参与流水缓存
	 */
	private static ConcurrentHashMap<Integer, ConcurrentLinkedQueue<B_FlowJoinFunction>> flowJionFuncCache = UC.reg("flowJionFuncCache",new ConcurrentHashMap<Integer, ConcurrentLinkedQueue<B_FlowJoinFunction>>());
	
	/**
	 * 系统参与流水缓存
	 */
	private static ConcurrentHashMap<Integer, ConcurrentLinkedQueue<B_FlowHeroExAct>> flowExtActCache = UC.reg("flowExtActCache",new ConcurrentHashMap<Integer, ConcurrentLinkedQueue<B_FlowHeroExAct>>());
	/**
	 * 角色元宝流水缓存
	 */
	private static ConcurrentHashMap<Integer, ConcurrentLinkedQueue<B_FlowHeroYuanbaoMoney>> flowYuanbaoMoneyCache = UC.reg("flowYuanbaoMoneyCache",new ConcurrentHashMap<Integer, ConcurrentLinkedQueue<B_FlowHeroYuanbaoMoney>>());
	
	public static ConcurrentHashMap<Integer, ConcurrentLinkedQueue<B_FlowHeroExp>> getFlowExpCache(){
		return flowExpCache;
	}
	public static ConcurrentHashMap<Integer, ConcurrentLinkedQueue<B_FlowHeroStrength>> getFlowStrengthCache(){
		return flowStrengthCache;
	}
	public static ConcurrentHashMap<Integer, ConcurrentLinkedQueue<B_FlowHeroMoney>> getFlowMoneyCache(){
		return flowMoneyCache;
	}
	public static ConcurrentHashMap<Integer, ConcurrentLinkedQueue<B_FlowShop>> getFlowShopCache(){
		return flowShopCache;
	}
	public static ConcurrentHashMap<Integer, ConcurrentLinkedQueue<B_FlowJoinFunction>> getFlowJionFuncCache() {
		return flowJionFuncCache;
	}
	public static ConcurrentHashMap<Integer, ConcurrentLinkedQueue<B_FlowHeroExAct>> getFlowExtActCache() {
		return flowExtActCache;
	}
	public static ConcurrentHashMap<Integer, ConcurrentLinkedQueue<B_FlowHeroYuanbaoMoney>> getFlowYuanbaoMoneyCache() {
		return flowYuanbaoMoneyCache;
	}
}
