package com.teamtop.system.event.backstage.events.flowJianKong;

import java.util.concurrent.ConcurrentLinkedQueue;

import com.teamtop.util.cache.union.UC;
/**
 * 玩家物品、货币监控
 * @author Administrator
 *
 */
public class FlowJianKongCache {
	
	/**
	 * 监控记录
	 */
	private static ConcurrentLinkedQueue<B_FlowJianKong> jiankongQueue = UC.reg("jiankongQueue",new ConcurrentLinkedQueue<B_FlowJianKong>());
	
	/**
	 * 监控记录
	 * @return
	 */
	public static ConcurrentLinkedQueue<B_FlowJianKong> getJiankongQueue(){
		return jiankongQueue;
	}
}
