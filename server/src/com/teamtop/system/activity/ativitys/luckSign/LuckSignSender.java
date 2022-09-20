package com.teamtop.system.activity.ativitys.luckSign;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * LuckSignSender.java
 * 新活动-幸运福签
 */
public class LuckSignSender{
		/**
		 * 打开界面返回
		 * @param awardList 总的目标奖励数据
		 * @param awardList1 每日目标奖励数据
		 * @param num 总抽签次数
		 * @param dayNum 每日抽签次数
		**/
		public static void sendCmd_12150(long hid  ,   Object[]  awardList  ,   Object[]  awardList1  ,   int  num  ,   int  dayNum ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{awardList,awardList1,num,dayNum};
			if(!hero.isCanSend(12150, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 12150);
		}
		/**
		 * 抽福签返回
		 * @param state 状态 0成功 1元宝不足
		 * @param awardList 道具数据
		 * @param num 总抽签次数
		 * @param dayNum 每日抽签次数
		**/
		public static void sendCmd_12152(long hid  ,  int  state  ,   Object[]  awardList  ,   int  num  ,   int  dayNum ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,awardList,num,dayNum};
			if(!hero.isCanSend(12152, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 12152);
		}
		/**
		 * 打开排行返回
		 * @param awardList 排行数据
		 * @param myRank 我的排名
		 * @param myTimes 我的次数
		**/
		public static void sendCmd_12154(long hid  ,   Object[]  awardList  ,  int  myRank  ,   int  myTimes ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{awardList,myRank,myTimes};
			if(!hero.isCanSend(12154, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 12154);
		}
		/**
		 * 领取目标奖励返回
		 * @param state 状态 0成功 1配置表不存在 2期数不对 3不可领取 4已领取
		 * @param sysId 领取类型 1是总的目标类型 2是每日目标类型
		 * @param id 目标表id
		**/
		public static void sendCmd_12156(long hid  ,  int  state  ,  int  sysId  ,   int  id ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,sysId,id};
			if(!hero.isCanSend(12156, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 12156);
		}
		/**
		 * 合成福签返回
		 * @param state 状态 0成功 1配置表不存在 2道具不足
		**/
		public static void sendCmd_12158(long hid  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state};
			if(!hero.isCanSend(12158, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 12158);
		}
		/**
		 * 开启福签返回
		 * @param state 状态 0成功 1道具不足 2配置表不存在
		 * @param awardList 道具数据
		**/
		public static void sendCmd_12160(long hid  ,  int  state  ,   Object[]  awardList ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,awardList};
			if(!hero.isCanSend(12160, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 12160);
		}
}