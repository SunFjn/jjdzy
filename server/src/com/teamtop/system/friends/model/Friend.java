package com.teamtop.system.friends.model;

import java.util.List;
import java.util.Map;

import com.teamtop.util.cache.CacheModel;
import com.teamtop.util.db.trans.FieldOrder;

/**
 * 好友
 * 
 * @author Administrator
 *
 */
public class Friend extends CacheModel {
	
	private long hid;
	/**
	 * 好友
	 */
	private Map<Long, FriendModel> goodFriends;
	/**
	 * 黑名单
	 */
	private Map<Long, FriendModel> badFriends;
	/**
	 * 最近联系
	 */
	private List<Long> recentChat;
	/**
	 * 所拥有的好友个数
	 */
	private int hasFriendNum;
	/**
	 * 好友申请列表
	 */
	private List<FriendApply> friendApply;
	/**
	 * 备份的好友列表（从好友、黑名单被删的好友）
	 */
	private Map<Long, FriendModel> backupList;
	/**
	 * 在别人黑名单中
	 */
	private List<Long> inOtherBadList;
	
	/**
	 * 私聊未读消息（下线时候清空）
	 */
	private Map<Long, MsgModel> msgModelMap;
	
	public long getHid() {
		return hid;
	}
	public void setHid(long hid) {
		this.hid = hid;
	}
	public Map<Long, FriendModel> getGoodFriends() {
		return goodFriends;
	}
	public void setGoodFriends(Map<Long, FriendModel> goodFriends) {
		this.goodFriends = goodFriends;
	}
	public Map<Long, FriendModel> getBadFriends() {
		return badFriends;
	}
	public void setBadFriends(Map<Long, FriendModel> badFriends) {
		this.badFriends = badFriends;
	}
	public List<Long> getRecentChat() {
		return recentChat;
	}
	public void setRecentChat(List<Long> recentChat) {
		this.recentChat = recentChat;
	}
	public int getHasFriendNum() {
		return hasFriendNum;
	}
	public void setHasFriendNum(int hasFriendNum) {
		this.hasFriendNum = hasFriendNum;
	}
	public List<FriendApply> getFriendApply() {
		return friendApply;
	}
	public void setFriendApply(List<FriendApply> friendApply) {
		this.friendApply = friendApply;
	}
	public Map<Long, FriendModel> getBackupList() {
		return backupList;
	}
	public void setBackupList(Map<Long, FriendModel> backupList) {
		this.backupList = backupList;
	}
	public List<Long> getInOtherBadList() {
		return inOtherBadList;
	}
	public void setInOtherBadList(List<Long> inOtherBadList) {
		this.inOtherBadList = inOtherBadList;
	}
	public Map<Long, MsgModel> getMsgModelMap() {
		return msgModelMap;
	}
	public void setMsgModelMap(Map<Long, MsgModel> msgModelMap) {
		this.msgModelMap = msgModelMap;
	}
	
}
