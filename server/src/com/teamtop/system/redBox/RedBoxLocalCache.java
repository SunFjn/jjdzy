package com.teamtop.system.redBox;

import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.system.redBox.cross.RedBoxCross;

public class RedBoxLocalCache {
	
	private static ConcurrentHashMap<Long, RedBoxCross>  redBoxMap=new ConcurrentHashMap<>();

	public static ConcurrentHashMap<Long, RedBoxCross> getRedBoxMap() {
		return redBoxMap;
	}

	public static void setRedBoxMap(ConcurrentHashMap<Long, RedBoxCross> redBoxMap) {
		RedBoxLocalCache.redBoxMap = redBoxMap;
	}
	
	

}
