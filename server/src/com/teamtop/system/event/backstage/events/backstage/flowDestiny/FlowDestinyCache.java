package com.teamtop.system.event.backstage.events.backstage.flowDestiny;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentLinkedQueue;

import com.teamtop.util.cache.union.UC;

public class FlowDestinyCache {
	
	private static ConcurrentHashMap<Integer, ConcurrentLinkedQueue<B_FlowDestiny>> flowDestinyMap = UC.reg("flowDestinyMap",new ConcurrentHashMap<Integer, ConcurrentLinkedQueue<B_FlowDestiny>>());
	public static ConcurrentHashMap<Integer, ConcurrentLinkedQueue<B_FlowDestiny>> getFlowDestinyMap(){
		return flowDestinyMap;
	}

}
