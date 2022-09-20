package com.teamtop.system.dengFengZaoJi;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * DengFengZaoJiSender.java
 * 登峰造极
 */
public class DengFengZaoJiSender{
		/**
		 * 登峰造极数据返回
		 * @param type 0.海选  1.决赛
		 * @param objectList 排名数据
		 * @param strength 我的战力
		 * @param myRank 我的排名：0.未上榜
		 * @param score 我的积分
		 * @param num 今日挑战次数
		 * @param buyNum 已购买次数
		**/
		public static void sendCmd_11952(long hid  ,  int  type  ,   Object[]  objectList  ,   long  strength  ,  int  myRank  ,   int  score  ,   int  num  ,   int  buyNum ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{type,objectList,strength,myRank,score,num,buyNum};
			if(!hero.isCanSend(11952, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11952);
		}
		/**
		 * 购买次数返回
		 * @param state 1.成功 2.元宝不足 3.该阶段已结束 4.本周赛事已结束
		 * @param num 挑战次数
		 * @param type 0.海选 1.决赛
		 * @param buyNum 已购买次数
		**/
		public static void sendCmd_11954(long hid  ,  int  state  ,   int  num  ,  int  type  ,   int  buyNum ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,num,type,buyNum};
			if(!hero.isCanSend(11954, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11954);
		}
		/**
		 * 排名奖励返回
		 * @param rankList 排名数据
		 * @param score 我的积分
		 * @param myRank 我的排名
		**/
		public static void sendCmd_11956(long hid  ,   Object[]  rankList  ,   int  score  ,  int  myRank ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rankList,score,myRank};
			if(!hero.isCanSend(11956, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11956);
		}
		/**
		 * 积分奖励数据返回
		 * @param idList 
		**/
		public static void sendCmd_11958(long hid  ,   Object[]  idList ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{idList};
			if(!hero.isCanSend(11958, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11958);
		}
		/**
		 * 换一批数据返回
		 * @param type 0.海选 1.决赛
		 * @param state 1.成功 2.元宝不足 3.本周赛事已结束
		 * @param objectList 
		**/
		public static void sendCmd_11960(long hid  ,  int  type  ,  int  state  ,   Object[]  objectList ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{type,state,objectList};
			if(!hero.isCanSend(11960, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11960);
		}
		/**
		 * 冠军预测数据返回
		 * @param objectList 预测数据
		 * @param betHid 0.未下注   -1.已超时  >0.下注玩家id
		**/
		public static void sendCmd_11962(long hid  ,   Object[]  objectList  ,   long  betHid ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{objectList,betHid};
			if(!hero.isCanSend(11962, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11962);
		}
		/**
		 * 下注返回
		 * @param state 1.成功 2.元宝不足 3.已超时 4.已下注
		 * @param thid 下注玩家id
		**/
		public static void sendCmd_11964(long hid  ,  int  state  ,   long  thid ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,thid};
			if(!hero.isCanSend(11964, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11964);
		}
		/**
		 * 挑战返回
		 * @param state 1.成功 2.没有挑战次数 3.不可越级挑战 4.已挑战 5.不在活动期间时不可挑战 6.第一名需要前5名才可挑战 7.不能挑战自己 8.参数错误 9.未进入决赛不能挑战 10.排名已变更 11.比赛尚未开始 12.本周赛事已结束
		 * @param type 0.海选 1.决赛
		 * @param thid 被挑战玩家id
		**/
		public static void sendCmd_11966(long hid  ,  int  state  ,  int  type  ,   long  thid ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,type,thid};
			if(!hero.isCanSend(11966, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11966);
		}
		/**
		 * 战斗结果返回
		 * @param state 1.胜利 0.失败 2.退出
		 * @param type 0.海选 1.决赛
		 * @param thid 被挑战玩家id  
		 * @param isPlayAll 1.全部挑战完 0.否
		**/
		public static void sendCmd_11968(long hid  ,  int  state  ,  int  type  ,   long  thid  ,  int  isPlayAll ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,type,thid,isPlayAll};
			if(!hero.isCanSend(11968, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11968);
		}
		/**
		 * 领取积分奖励返回
		 * @param state 1.成功 2.已领 3.积分不足 4.参数错误 5.背包已满
		 * @param id 积分id
		**/
		public static void sendCmd_11970(long hid  ,  int  state  ,   int  id ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,id};
			if(!hero.isCanSend(11970, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11970);
		}
		/**
		 * 活动开启与结束
		 * @param state 1.海选开启 2.决赛开启 0.结束
		**/
		public static void sendCmd_11972(long hid  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state};
			if(!hero.isCanSend(11972, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11972);
		}
}