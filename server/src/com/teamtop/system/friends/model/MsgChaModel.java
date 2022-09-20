package com.teamtop.system.friends.model;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * 未读消息个体
 * @author Administrator
 *
 */
public class MsgChaModel {
	
	/**
	 * 聊天消息
	 */
	private Map<Long, List<MsgModel>> msgMap = new ConcurrentHashMap<Long, List<MsgModel>>();

	public Map<Long, List<MsgModel>> getMsgMap() {
		return msgMap;
	}

	public void setMsgMap(Map<Long, List<MsgModel>> msgMap) {
		this.msgMap = msgMap;
	}
	
}
