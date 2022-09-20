package com.teamtop.system.friends;

/**
 * FriendCmd.java
 * 好友
 */
public class FriendCmd{


	/**
	 * 获得好友列表
	 */
	public final static int CG_GetInfo_401 = 401;


	/**
	 * 好友列表
	 */
	public final static int GC_SendAllInfo_402 = 402;


	/**
	 * 添加好友
	 */
	public final static int CG_AddFriend_403 = 403;


	/**
	 * 添加好友返回
	 */
	public final static int GC_AgreeAddFriendBack_408 = 408;


	/**
	 * 添加黑名单
	 */
	public final static int CG_AddToBadFriend_409 = 409;


	/**
	 * 添加黑名单返回
	 */
	public final static int GC_AddBlackBack_410 = 410;


	/**
	 * 添加好友通知列表
	 */
	public final static int GC_NoticeAddInfo_406 = 406;


	/**
	 * 同意添加请求
	 */
	public final static int CG_AgreeAddFriend_407 = 407;


	/**
	 * 私聊信息列表返回
	 */
	public final static int GC_GetMsgBack_412 = 412;


	/**
	 * 请求添加好友返回
	 */
	public final static int GC_AddFriendBack_404 = 404;


	/**
	 * 通知被添加黑名单的玩家
	 */
	public final static int GC_BeBlack_414 = 414;


	/**
	 * 删除好友
	 */
	public final static int CG_DelFriend_415 = 415;


	/**
	 * 删除好友后端返回
	 */
	public final static int GC_DelFriendBack_416 = 416;


	/**
	 * 移除黑名单
	 */
	public final static int CG_DelBlack_417 = 417;


	/**
	 * 移除黑名单返回
	 */
	public final static int GC_DelBlackBack_418 = 418;


	/**
	 * 发送聊天信息
	 */
	public final static int CG_Chat_419 = 419;


	/**
	 * 私聊发送消息
	 */
	public final static int GC_ChatBack_420 = 420;


	/**
	 * 发送消息给玩家
	 */
	public final static int GC_ChatMsg_422 = 422;


	/**
	 * 好友上下线通知
	 */
	public final static int GC_NoticeOnlineState_424 = 424;


	/**
	 * 好友信息改变
	 */
	public final static int GC_InfoChange_426 = 426;


	/**
	 * 获取最近联系人列表
	 */
	public final static int CG_GetRecentChatFriend_427 = 427;


	/**
	 * 后端发送最近联系人列表
	 */
	public final static int GC_RecentChatFriend_428 = 428;


	/**
	 * 是否显示小红点，1、显示
	 */
	public final static int GC_Notice_400 = 400;

}