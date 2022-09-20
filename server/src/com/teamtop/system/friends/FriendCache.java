package com.teamtop.system.friends;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.friends.model.MsgChaModel;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.cache.union.UC;

/**
 * 好友缓存
 * @author Administrator
 *
 */
public class FriendCache extends AbsServerEvent{

	/**
	 * 离线聊天信息缓存，包括在线和离线但没删除的
	 */
	private static Map<Long,MsgChaModel> msgChaModelMap = UC.reg("msgChaModelMap", new ConcurrentHashMap<Long,MsgChaModel>());//消息缓存
	
	public static Map<Long,MsgChaModel> getMsgModelMap(){
		return msgChaModelMap;
	} 

	@Override
	public void startServer() throws RunServerException {
		
	}
	@Override
	public void shutdownServer() {
//		FriendEvent.getIns().updateCache();
	}
}
