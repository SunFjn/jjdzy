package com.teamtop.system.event.backstage.events.backstage.flowAppraise;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentLinkedQueue;

import com.teamtop.system.event.backstage.BSUC;

/**
 * 鉴定流水缓存
 * 
 * @author Administrator
 *
 */
public class FlowAppraiseCache {
	/**
	 * 装备状态流水
	 */
	private static final ConcurrentHashMap<Integer, ConcurrentLinkedQueue<B_FlowAppraise>> flowAppraiseMap = BSUC
			.reg("flowAppraiseMap", new ConcurrentHashMap<>());

	public static ConcurrentHashMap<Integer, ConcurrentLinkedQueue<B_FlowAppraise>> getFlowappraiseMap() {
		return flowAppraiseMap;
	}

}
