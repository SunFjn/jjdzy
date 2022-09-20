package com.teamtop.system.activity.ativitys.godGenThisLifeAct;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * GodGenThisLifeSender.java
 * 神将现世(活动)
 */
public class GodGenThisLifeActSender{
		/**
		 * 通知
		 * @param endTime 结束时间
		 * @param times 抽奖次数
		**/
		public static void sendCmd_9550(long hid  ,   int  endTime  ,   int  times ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{endTime,times};
			if(!hero.isCanSend(9550, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 9550);
		}
		/**
		 * 抽奖返回
		 * @param state 状态：1：成功，2：元宝不足，3：背包已满
		 * @param resultList 抽奖结果
		 * @param times 抽奖次数
		**/
		public static void sendCmd_9552(long hid  ,  int  state  ,   Object[]  resultList  ,   int  times ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,resultList,times};
			if(!hero.isCanSend(9552, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 9552);
		}
		/**
		 * 打开排行榜返回
		 * @param rankList 排行榜数据
		 * @param myRank 我的排名  0未进排行榜 
		 * @param myTimes 我的抽奖次数
		**/
		public static void sendCmd_9554(long hid  ,   Object[]  rankList  ,  int  myRank  ,   int  myTimes ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rankList,myRank,myTimes};
			if(!hero.isCanSend(9554, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 9554);
		}
		/**
		 * 打开目标奖励界面返回
		 * @param awardList 奖励状态列表
		**/
		public static void sendCmd_9556(long hid  ,   Object[]  awardList ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{awardList};
			if(!hero.isCanSend(9556, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 9556);
		}
		/**
		 * 领取目标奖励返回
		 * @param state 领取状态，0:没有该奖励，1:成功，2:未达到条件，3:已领取
		 * @param awardId 领取的奖励id
		**/
		public static void sendCmd_9558(long hid  ,  int  state  ,   int  awardId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,awardId};
			if(!hero.isCanSend(9558, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 9558);
		}
}