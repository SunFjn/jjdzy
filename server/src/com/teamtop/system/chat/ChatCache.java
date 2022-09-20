package com.teamtop.system.chat;

import java.util.ArrayList;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.util.cache.union.UC;

public class ChatCache {
	/**
	 * 聊天信息缓存，1 跨服30条  2本服30条 3国家30
	 */
	private static ConcurrentHashMap<Integer,ArrayList<ChatHistorys>> ChatHistorys = UC.reg("ChatHistorys", new ConcurrentHashMap<Integer,ArrayList<ChatHistorys>>());//消息缓存
	
	/** 上一次预警时间 */
	public static int WARN_NOTICE_TIME = 0;

	public static ConcurrentHashMap<Integer,ArrayList<ChatHistorys>> getChaHistorys(){
		return ChatHistorys;
	} 


}
