package com.teamtop.util.cache.union;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class UCTriggerCache {
	private static Map<String, AbsUCTrigger<?>> triggerMap = new HashMap<String, AbsUCTrigger<?>>();
	private static List<String> findTrigger = new ArrayList<String>();
	
	public static AbsUCTrigger<?> getTrigger(String key){
		return triggerMap.get(key);
	}
	public static void putTrigger(String key,AbsUCTrigger<?> trigger){
		triggerMap.put(key, trigger);
	}
	
	public static boolean findFromDB(String key){
		return findTrigger.contains(key);
	}
}
