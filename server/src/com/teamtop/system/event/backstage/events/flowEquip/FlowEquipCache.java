package com.teamtop.system.event.backstage.events.flowEquip;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentLinkedQueue;

import com.teamtop.system.event.backstage.BSUC;

/**
 * 装备流水缓存
 * @author Administrator
 *
 */
public class FlowEquipCache {
	/**
	 * 装备状态流水
	 */
	private static final ConcurrentHashMap<Integer, ConcurrentLinkedQueue<B_FlowEquip>> flowEquipMap = BSUC.reg("flowEquipMap", new ConcurrentHashMap<Integer, ConcurrentLinkedQueue<B_FlowEquip>>());
	
	public static ConcurrentHashMap<Integer, ConcurrentLinkedQueue<B_FlowEquip>> getFlowEquipMap(){
		return flowEquipMap;
	}
}
