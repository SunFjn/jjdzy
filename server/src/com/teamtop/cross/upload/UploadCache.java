package com.teamtop.cross.upload;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class UploadCache {
	private static Map<Integer, AbsCrossUploadEvent> checkMap = new ConcurrentHashMap<Integer, AbsCrossUploadEvent>();
	public static AbsCrossUploadEvent getCheck(int sysId){
		return checkMap.get(sysId);
	}
//	public static UploadModel getUploadModel(int sysId,int zoneid){
//		AbsCrossUploadEvent AbsCrossUploadEvent = checkMap.get(sysId);
//		if(AbsCrossUploadEvent!=null){
//			return AbsCrossUploadEvent.getProcessMap().get(zoneid);
//		}
//		return null;
//	}
	public static Map<Integer, AbsCrossUploadEvent> getCheckMap() {
		return checkMap;
	}
	
	public static void addCrossUploadEvent(AbsCrossUploadEvent event){
		checkMap.put(event.getId(), event);
	}
}
