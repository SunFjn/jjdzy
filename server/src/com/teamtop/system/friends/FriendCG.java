package com.teamtop.system.friends;
import com.teamtop.system.hero.Hero;

/**
 * FriendCG.java
 * 好友
 */
public class FriendCG{

	private static FriendCG ins = null;

	public static FriendCG getIns(){
		if(ins == null){
			ins = new FriendCG();
		}
		return ins;
	}

	/**
	 * 获得好友列表 401
	 * @param type| 好友类型(1好友，2黑名单)| byte
	 */
	public void getInfo(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		FriendManager.getIns().getInfo(hero, type);
	} 
	/**
	 * 添加好友 403
	 * @param name| 要添加的好友名字| String
	 */
	public void addFriend(Hero hero, Object[] datas){
		String name = (String)datas[0];
		FriendManager.getIns().addFriend(hero, name);
	} 
	/**
	 * 添加黑名单 409
	 * @param id| 要添加的黑名单玩家ID| long
	 */
	public void addToBadFriend(Hero hero, Object[] datas){
		long id = (long)datas[0];
		FriendManager.getIns().addToBadFriend(hero, id);
	} 
	/**
	 * 同意添加请求 407
	 * @param flag| 0 同意 1 拒绝| byte
	 * @param id| 同意加的好友ID| long
	 */
	public void agreeAddFriend(Hero hero, Object[] datas){
		int flag = (byte)datas[0];
		long id = (long)datas[1];
		FriendManager.getIns().agreeAddFriend(hero, flag, id);
	} 
	/**
	 * 删除好友 415
	 * @param id| 要删除的好友ID| long
	 */
	public void delFriend(Hero hero, Object[] datas){
		long id = (long)datas[0];
		FriendManager.getIns().delFriend(hero, id);
	} 
	/**
	 * 移除黑名单 417
	 * @param id| 移除的玩家ID| long
	 */
	public void delBlack(Hero hero, Object[] datas){
		long id = (long)datas[0];
		FriendManager.getIns().delBlack(hero, id);
	} 
	/**
	 * 发送聊天信息 419
	 * @param id| 接收的玩家ID| long
	 * @param content| 聊天内容| String
	 */
	public void chat(Hero hero, Object[] datas){
		long id = (long)datas[0];
		String content = (String)datas[1];
		FriendManager.getIns().chat(hero, id, content);
	} 
	/**
	 * 获取最近联系人列表 427
	 */
	public void getRecentChatFriend(Hero hero, Object[] datas){
		FriendManager.getIns().getRecentChatFriend(hero);
	} 
}