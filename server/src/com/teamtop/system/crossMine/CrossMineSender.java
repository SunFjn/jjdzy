package com.teamtop.system.crossMine;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * CrossMineSender.java
 * 跨服矿藏
 */
public class CrossMineSender{
		/**
		 * 打开界面返回
		 * @param state 状态:0-正常,1-不在活动时间内
		 * @param stealTimes 剩余顺手次数
		 * @param fightTimes 剩余抢夺次数
		 * @param mineInfo 矿信息
		**/
		public static void sendCmd_7202(long hid  ,  int  state  ,  int  stealTimes  ,  int  fightTimes  ,   Object[]  mineInfo ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,stealTimes,fightTimes,mineInfo};
			if(!hero.isCanSend(7202, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 7202);
		}
		/**
		 * 邀请挖矿返回
		 * @param type  1成功 2你没在队伍中 3你不是队长 5队员已满 6操作太频繁
		**/
		public static void sendCmd_7204(long hid  ,  int  type ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{type};
			if(!hero.isCanSend(7204, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 7204);
		}
		/**
		 * 加入挖矿返回
		 * @param state 0成功 1失败 2不存在 3已满
		**/
		public static void sendCmd_7206(long hid  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state};
			if(!hero.isCanSend(7206, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 7206);
		}
		/**
		 * 刷新矿藏返回
		 * @param rest 0成功 1失败 2钱不够
		 * @param kuanglv 我的矿等级
		**/
		public static void sendCmd_7208(long hid  ,  int  rest  ,   int  kuanglv ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,kuanglv};
			if(!hero.isCanSend(7208, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 7208);
		}
		/**
		 * 开始挖矿返回
		 * @param rest 0开始挖矿成功 1失败
		**/
		public static void sendCmd_7210(long hid  ,  int  rest ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest};
			if(!hero.isCanSend(7210, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 7210);
		}
		/**
		 * 踢出矿工返回
		 * @param rest 0成功 1失败
		 * @param minerId 踢出旷工id
		**/
		public static void sendCmd_7212(long hid  ,  int  rest  ,   long  minerId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,minerId};
			if(!hero.isCanSend(7212, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 7212);
		}
		/**
		 * 离开挖矿返回
		 * @param rest 0成功 1失败 
		**/
		public static void sendCmd_7214(long hid  ,  int  rest ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest};
			if(!hero.isCanSend(7214, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 7214);
		}
		/**
		 * 前往跨服矿区返回
		 * @param state 状态
		 * @param searchTimes 剩余免费搜索次数
		 * @param mineInfo 矿信息
		**/
		public static void sendCmd_7216(long hid  ,  int  state  ,   int  searchTimes  ,   Object[]  mineInfo ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,searchTimes,mineInfo};
			if(!hero.isCanSend(7216, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 7216);
		}
		/**
		 * 搜索矿藏返回
		 * @param state 状态
		 * @param mineInfo 矿信息
		**/
		public static void sendCmd_7218(long hid  ,  int  state  ,   Object[]  mineInfo ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,mineInfo};
			if(!hero.isCanSend(7218, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 7218);
		}
		/**
		 * 顺手牵羊返回
		 * @param state 状态0成功 1失败 2对方没有次数
		**/
		public static void sendCmd_7220(long hid  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state};
			if(!hero.isCanSend(7220, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 7220);
		}
		/**
		 * 战斗抢夺返回
		 * @param ret 战斗结果0成功 1采矿时间已结束,矿场关闭 2今日抢夺次数已耗尽4该矿藏已被抢夺X次,给条活路吧
		 * @param awards 抢夺奖励
		 * @param winerID 胜利者ID
		 * @param headid 头像ID
		 * @param jiangXianID 将衔ID
		 * @param winerPower 胜利者战力
		 * @param winerName 胜利者名字
		 * @param leftPlayerID 左边玩家ID
		 * @param rightPlayerID 右边玩家ID
		**/
		public static void sendCmd_7222(long hid  ,  int  ret  ,   Object[]  awards  ,   long  winerID  ,   int  headid  ,   int  jiangXianID  ,   long  winerPower  ,   String  winerName  ,   long  leftPlayerID  ,   long  rightPlayerID ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{ret,awards,winerID,headid,jiangXianID,winerPower,winerName,leftPlayerID,rightPlayerID};
			if(!hero.isCanSend(7222, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 7222);
		}
		/**
		 * 打开战报返回
		 * @param report 战报数据
		**/
		public static void sendCmd_7224(long hid  ,   Object[]  report ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{report};
			if(!hero.isCanSend(7224, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 7224);
		}
		/**
		 * 战报推送
		 * @param state 状态
		**/
		public static void sendCmd_7226(long hid  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state};
			if(!hero.isCanSend(7226, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 7226);
		}
		/**
		 * 查看录像返回
		 * @param awards 抢夺奖励
		 * @param winerID 胜利玩家ID
		 * @param headid 头像ID
		 * @param jiangXianID 将衔ID
		 * @param winerPower 胜利者战力
		 * @param winerName 胜利者名字
		 * @param leftPlayerID 左边玩家ID
		 * @param rightPlayerID 右边玩家ID
		**/
		public static void sendCmd_7228(long hid  ,   Object[]  awards  ,   long  winerID  ,   int  headid  ,   int  jiangXianID  ,   long  winerPower  ,   String  winerName  ,   long  leftPlayerID  ,   long  rightPlayerID ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{awards,winerID,headid,jiangXianID,winerPower,winerName,leftPlayerID,rightPlayerID};
			if(!hero.isCanSend(7228, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 7228);
		}
		/**
		 * 推送有新矿工加入(弃用)
		 * @param newMinerId 新矿工id
		 * @param newMinerName 新矿工名字
		 * @param minerId 矿主id
		 * @param minerInfo 矿工信息
		**/
		public static void sendCmd_7232(long hid  ,   long  newMinerId  ,   String  newMinerName  ,   long  minerId  ,   Object[]  minerInfo ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{newMinerId,newMinerName,minerId,minerInfo};
			if(!hero.isCanSend(7232, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 7232);
		}
		/**
		 * 邀请广播
		 * @param playerID 矿主ID
		 * @param playerName 矿主名字
		 * @param type 矿类型
		**/
		public static void sendCmd_7230(long hid  ,   long  playerID  ,   String  playerName  ,   int  type ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{playerID,playerName,type};
			if(!hero.isCanSend(7230, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 7230);
		}
		/**
		 * 领取采矿奖励返回
		 * @param state 状态:0-成功,1-失败
		 * @param cfgID I:矿配置id
		**/
		public static void sendCmd_7234(long hid  ,  int  state  ,   int  cfgID ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,cfgID};
			if(!hero.isCanSend(7234, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 7234);
		}
		/**
		 * 推送矿藏信息
		 * @param type 推送类型:1-开始采集,2-角色加入,3-队长踢人,4-队长刷新矿的品质,5-被抢夺,6-被顺手,7-矿工离开8采集完成9-发送奖励(后端用)10-通知改名
		 * @param name 对象名字
		 * @param mineId 矿配置id
		 * @param minerId 矿主id
		 * @param stealTimes 已被顺次数
		 * @param fightTimes 已被抢次数
		 * @param time 剩余采集时间(-1为未开始开采)_
		 * @param rewardInfo 资源信息
		 * @param minerInfo 矿工信息
		**/
		public static void sendCmd_7236(long hid  ,  int  type  ,   String  name  ,   int  mineId  ,   long  minerId  ,   int  stealTimes  ,   int  fightTimes  ,   int  time  ,   Object[]  rewardInfo  ,   Object[]  minerInfo ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{type,name,mineId,minerId,stealTimes,fightTimes,time,rewardInfo,minerInfo};
			if(!hero.isCanSend(7236, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 7236);
		}
		/**
		 * 推送矿藏活动开启
		 * @param state 状态:0-正常,1-不在活动时间内
		**/
		public static void sendCmd_7238(long hid  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state};
			if(!hero.isCanSend(7238, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 7238);
		}
}