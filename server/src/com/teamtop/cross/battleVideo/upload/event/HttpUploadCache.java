package com.teamtop.cross.battleVideo.upload.event;

import java.util.HashMap;
import java.util.Map;

import com.teamtop.main.RunServerException;

public class HttpUploadCache{
	private static Map<Integer, AbsUploadEvent> uploadEvents = new HashMap<Integer, AbsUploadEvent>();

	public static void startServer() throws RunServerException {
		uploadEvents.put(HttpUploadConst.TYPE_BATTLE_VIDEO, BattleVideoUploadEvent.getIns());
		uploadEvents.put(HttpUploadConst.TYPE_HOTSWAP, HotswapUploadEvent.getIns());
		uploadEvents.put(HttpUploadConst.TYPE_PRIMARY_VIDEO, PrimaryVideoUploadEvent.getIns());
	}
	
	public static AbsUploadEvent getEvent(int type){
		return uploadEvents.get(type);
	}
}
