package com.teamtop.system.activity.ativitys.wishingTree;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * WishingTreeActSender.java
 * 许愿树
 */
public class WishingTreeActSender{
		/**
		 * 打开界面返回
		 * @param targetRewardList 目标列表
		 * @param num 许愿次数
		**/
		public static void sendCmd_10040(long hid  ,   Object[]  targetRewardList  ,   int  num ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{targetRewardList,num};
			if(!hero.isCanSend(10040, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10040);
		}
		/**
		 * 许愿返回
		 * @param state 状态 1成功 2元宝不足
		 * @param awardList 道具列表
		 * @param targetRewardList 目标列表
		 * @param num 许愿次数
		 * @param sysId 系统id
		**/
		public static void sendCmd_10042(long hid  ,  int  state  ,   Object[]  awardList  ,   Object[]  targetRewardList  ,   int  num  ,   int  sysId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,awardList,targetRewardList,num,sysId};
			if(!hero.isCanSend(10042, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10042);
		}
		/**
		 * 领取奖励返回
		 * @param state 状态 1成功 2条件不符 3背包已满 4参数错误 5已领取
		 * @param id 目标id
		 * @param flag 目标奖励状态 -1已领取 0条件不符 >0可领取次数
		 * @param sysId 系统id
		**/
		public static void sendCmd_10044(long hid  ,  int  state  ,   int  id  ,   int  flag  ,   int  sysId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,id,flag,sysId};
			if(!hero.isCanSend(10044, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10044);
		}
		/**
		 * 打开排行榜返回
		 * @param openUIObjArray 排行列表
		 * @param myRank 我的排名 没进排名为0
		 * @param myTimes 我的许愿次数
		**/
		public static void sendCmd_10046(long hid  ,   Object[]  openUIObjArray  ,  int  myRank  ,   int  myTimes ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{openUIObjArray,myRank,myTimes};
			if(!hero.isCanSend(10046, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10046);
		}
		/**
		 * 打开目标页面返回
		 * @param list 目标列表
		 * @param sysId 系统id
		 * @param num 次数
		**/
		public static void sendCmd_10048(long hid  ,   Object[]  list  ,   int  sysId  ,   int  num ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{list,sysId,num};
			if(!hero.isCanSend(10048, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10048);
		}
		/**
		 * 领取页面目标奖励返回
		 * @param state 状态
		 * @param id 目标id
		 * @param sysId 系统id
		**/
		public static void sendCmd_10050(long hid  ,  int  state  ,   int  id  ,   int  sysId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,id,sysId};
			if(!hero.isCanSend(10050, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10050);
		}
}