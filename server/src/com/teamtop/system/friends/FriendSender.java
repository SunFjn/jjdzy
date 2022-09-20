package com.teamtop.system.friends;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * FriendSender.java
 * 好友
 */
public class FriendSender{
		/**
		 * 好友列表
		 * @param type 好友类型
		 * @param friendInfo 好友信息（暂时这样定，最后按策划需求添加）
		**/
		public static void sendCmd_402(long hid  ,  int  type  ,   Object[]  friendInfo ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{type,friendInfo};
			if(!hero.isCanSend(402, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 402);
		}
		/**
		 * 添加好友返回
		 * @param flag 成功标识，1，成功，2对方不存在，3，已经是好友，4，对方已被拉黑，5，好友已经加满，6，对方好友已经加满，7，不在申请列表，8，拒绝成功，
		 * @param agreeId 同意的玩家ID
		 * @param id 玩家id
		 * @param name 名字
		 * @param level 级别
		 * @param zsLevel 转生等级
		 * @param job 职业
		 * @param sex 性别
		 * @param strength 战力
		 * @param onlineFlag 在线状态 1在线 0不在线
		 * @param logoutTime 下线时间
		**/
		public static void sendCmd_408(long hid  ,  int  flag  ,   long  agreeId  ,   long  id  ,   String  name  ,   int  level  ,   int  zsLevel  ,  int  job  ,  int  sex  ,   long  strength  ,  int  onlineFlag  ,   int  logoutTime ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{flag,agreeId,id,name,level,zsLevel,job,sex,strength,onlineFlag,logoutTime};
			if(!hero.isCanSend(408, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 408);
		}
		/**
		 * 添加黑名单返回
		 * @param flag 成功失败标识，1成功，2 已经在黑名单中，3 夫妻不可以拉黑（预留），4，黑名单已满，5，对方不存在，
		 * @param id id
		 * @param name 名字
		 * @param level 级别
		 * @param zsLevel 转生等级
		 * @param job 职业
		 * @param sex 性别
		 * @param onlineFlag 在线状态
		 * @param logoutTime 下线时间
		**/
		public static void sendCmd_410(long hid  ,  int  flag  ,   long  id  ,   String  name  ,   int  level  ,   int  zsLevel  ,  int  job  ,  int  sex  ,  int  onlineFlag  ,   int  logoutTime ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{flag,id,name,level,zsLevel,job,sex,onlineFlag,logoutTime};
			if(!hero.isCanSend(410, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 410);
		}
		/**
		 * 添加好友通知列表
		 * @param type 通知类型（0列表类型，1添加类型）
		 * @param reqFriends 请求添加好友列表
		**/
		public static void sendCmd_406(long hid  ,  int  type  ,   Object[]  reqFriends ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{type,reqFriends};
			if(!hero.isCanSend(406, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 406);
		}
		/**
		 * 私聊信息列表返回
		 * @param msgs 玩家聊天消息
		**/
		public static void sendCmd_412(long hid  ,   Object[]  msgs ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{msgs};
			if(!hero.isCanSend(412, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 412);
		}
		/**
		 * 请求添加好友返回
		 * @param flag 成功失败标识，1成功，2，请输入内容，3接收者不存在，4，不能发送给自己，5,已经是好友，6，好友列表已满，7，对方等级未达到，8，在对方黑名单中，9，在自己黑名单中，10，对方好友已满 11，已经申请过了 12 对方申请列表已满 
		**/
		public static void sendCmd_404(long hid  ,  int  flag ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{flag};
			if(!hero.isCanSend(404, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 404);
		}
		/**
		 * 通知被添加黑名单的玩家
		 * @param id 添加黑名单的玩家ID
		**/
		public static void sendCmd_414(long hid  ,   long  id ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{id};
			if(!hero.isCanSend(414, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 414);
		}
		/**
		 * 删除好友后端返回
		 * @param flag 成功标识 1成功，2，没有好友对象，3，对方不是好友 
		 * @param id 删除的玩家ID
		 * @param ohid 被删除的玩家ID
		**/
		public static void sendCmd_416(long hid  ,  int  flag  ,   long  id  ,   long  ohid ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{flag,id,ohid};
			if(!hero.isCanSend(416, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 416);
		}
		/**
		 * 移除黑名单返回
		 * @param flag 成功失败标志 1成功，2，没有好友对象，3，对方不是好友 
		 * @param id 移除的玩家ID
		 * @param oHid 被移除的玩家ID
		**/
		public static void sendCmd_418(long hid  ,  int  flag  ,   long  id  ,   long  oHid ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{flag,id,oHid};
			if(!hero.isCanSend(418, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 418);
		}
		/**
		 * 私聊发送消息
		 * @param flag 发送返回标志 1成功 2  违规信息，3内容过长，4，发送给对方的离线信息大于10条，5 对方不存在，6对方不是好友
		 * @param id 发给的玩家ID
		**/
		public static void sendCmd_420(long hid  ,  int  flag  ,   long  id ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{flag,id};
			if(!hero.isCanSend(420, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 420);
		}
		/**
		 * 发送消息给玩家
		 * @param id 消息发送者id
		 * @param content 内容
		**/
		public static void sendCmd_422(long hid  ,   long  id  ,   String  content ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{id,content};
			if(!hero.isCanSend(422, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 422);
		}
		/**
		 * 好友上下线通知
		 * @param id 上下线玩家ID
		 * @param name 上下线的好友名字
		 * @param type 1、上线 2、下线
		**/
		public static void sendCmd_424(long hid  ,   long  id  ,   String  name  ,  int  type ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{id,name,type};
			if(!hero.isCanSend(424, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 424);
		}
		/**
		 * 好友信息改变
		 * @param friendData id好友ID key属性值(level：等级，name：名称，job:职业，online：上下线，sex：性别,logoutTime:下线时间) value为属性值
		**/
		public static void sendCmd_426(long hid  ,   String  friendData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{friendData};
			if(!hero.isCanSend(426, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 426);
		}
		/**
		 * 后端发送最近联系人列表
		 * @param friendId 最近联系人列表
		**/
		public static void sendCmd_428(long hid  ,   Object[]  friendId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{friendId};
			if(!hero.isCanSend(428, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 428);
		}
		/**
		 * 是否显示小红点，1、显示
		 * @param flag 是否需要显示小红点
		**/
		public static void sendCmd_400(long hid  ,  int  flag ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{flag};
			if(!hero.isCanSend(400, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 400);
		}
}