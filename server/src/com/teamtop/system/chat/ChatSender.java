package com.teamtop.system.chat;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * ChatSender.java
 * 聊天频道
 */
public class ChatSender{
		/**
		 * GC广播聊天频道内容
		 * @param type (1跨服,2本服,3国家4系统)
		 * @param rid 玩家id
		 * @param headId 头像id
		 * @param headUi 头像框id
		 * @param level 等级
		 * @param str 战斗力
		 * @param jinshen 晋升
		 * @param reborn 转生
		 * @param countryid 国家
		 * @param genLv 将衔
		 * @param titleid 称号
		 * @param name 名字
		 * @param vip vip
		 * @param job 职业时装
		 * @param godWeapon 专属神兵
		 * @param showtype 是否展示（0不是展示1图鉴2宝物3兵法4异宝5神剑6战甲7天书8武将）
		 * @param msg  内容 （id_星级_等阶_战力）（武将：id_时装_星级_等阶_战力_技能等级1_2_3）_专属神兵_神将天赋_神将之力技能进阶等级
		 * @param reincarnationLevel 轮回等级
		 * @param mountId 坐骑
		**/
		public static void sendCmd_452(long hid  ,  int  type  ,   long  rid  ,   int  headId  ,   int  headUi  ,   int  level  ,   long  str  ,   int  jinshen  ,   int  reborn  ,  int  countryid  ,   int  genLv  ,   int  titleid  ,   String  name  ,  int  vip  ,   int  job  ,   int  godWeapon  ,  int  showtype  ,   String  msg  ,   int  reincarnationLevel  ,   int  mountId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{type,rid,headId,headUi,level,str,jinshen,reborn,countryid,genLv,titleid,name,vip,job,godWeapon,showtype,msg,reincarnationLevel,mountId};
			if(!hero.isCanSend(452, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 452);
		}
		/**
		 * 禁言返回
		 * @param result B(0：否  1：是 2：自己能看到自己发言但是别人看不到    )
		**/
		public static void sendCmd_454(long hid  ,  int  result ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{result};
			if(!hero.isCanSend(454, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 454);
		}
		/**
		 * GC广播
		 * @param id 广播编号
		 * @param params 参数集合
		**/
		public static void sendCmd_456(long hid  ,   int  id  ,   String  params ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{id,params};
			if(!hero.isCanSend(456, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 456);
		}
		/**
		 * GC 聊天结果 成功推送452
		 * @param result 1：成功，2：还没到等级，3：聊天内容过长 4：时间冷却中 5：已到聊天次数上限 6：不够元宝，7：敏感字  8服务器维护中，9：请勿发送重复内容
		 * @param time 下次发言剩余时间
		**/
		public static void sendCmd_458(long hid  ,  int  result  ,  int  time ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{result,time};
			if(!hero.isCanSend(458, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 458);
		}
		/**
		 * GC 打开聊天界面信息
		 * @param info 聊天信息
		**/
		public static void sendCmd_460(long hid  ,   Object[]  info ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{info};
			if(!hero.isCanSend(460, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 460);
		}
		/**
		 * GC 后台推送公告
		 * @param content 公告内容
		**/
		public static void sendCmd_462(long hid  ,   String  content ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{content};
			if(!hero.isCanSend(462, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 462);
		}
		/**
		 * GC 客服反馈返回
		 * @param rtnCode 0成功，1达到上限
		**/
		public static void sendCmd_472(long hid  ,  int  rtnCode ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode};
			if(!hero.isCanSend(472, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 472);
		}
		/**
		 * GC 添加黑名单返回
		 * @param rest 0成功1失败 2已经存在
		 * @param bid 玩家id
		**/
		public static void sendCmd_474(long hid  ,  int  rest  ,   long  bid ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,bid};
			if(!hero.isCanSend(474, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 474);
		}
		/**
		 * GC 取消拉黑
		 * @param rest 0成功 1失败
		 * @param bid 玩家id
		**/
		public static void sendCmd_476(long hid  ,  int  rest  ,   long  bid ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,bid};
			if(!hero.isCanSend(476, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 476);
		}
		/**
		 * GC 打开黑名单
		 * @param blackList 
		**/
		public static void sendCmd_478(long hid  ,   Object[]  blackList ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{blackList};
			if(!hero.isCanSend(478, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 478);
		}
		/**
		 * GC 通知次数
		 * @param cross 跨服聊天已经使用次数
		 * @param local 本服聊天已经使用次数
		 * @param country 国家聊天已经使用次数
		**/
		public static void sendCmd_480(long hid  ,  int  cross  ,  int  local  ,  int  country ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{cross,local,country};
			if(!hero.isCanSend(480, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 480);
		}
		/**
		 * GC 聊天展示结果
		 * @param rest 0成功 1失败
		**/
		public static void sendCmd_482(long hid  ,  int  rest ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest};
			if(!hero.isCanSend(482, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 482);
		}
}