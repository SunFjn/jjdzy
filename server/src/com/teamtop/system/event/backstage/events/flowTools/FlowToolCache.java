package com.teamtop.system.event.backstage.events.flowTools;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentLinkedQueue;

import com.teamtop.util.cache.union.UC;

/**
 * 装备流水缓存
 * @author Administrator
 *
 */
public class FlowToolCache {
	//道具流水
	private static ConcurrentHashMap<Integer, ConcurrentLinkedQueue<B_FlowTool>> flowToolMap = UC.reg("flowToolMap",new ConcurrentHashMap<Integer, ConcurrentLinkedQueue<B_FlowTool>>());
	public static ConcurrentHashMap<Integer, ConcurrentLinkedQueue<B_FlowTool>> getFlowEquipMap(){
		return flowToolMap;
	}
}
