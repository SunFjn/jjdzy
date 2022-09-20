package com.teamtop.system.activity.ativitys.godGenSendGiftAct;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * GodGenSendGiftActSender.java
 * 神将送礼(活动)
 */
public class GodGenSendGiftActSender{
		/**
		 * 打开排名奖励返回
		 * @param rankList 排名奖励列表
		 * @param myRank 我的排名,没上排名则为0
		 * @param times 抽奖次数
		 * @param qs 期数
		**/
		public static void sendCmd_4872(long hid  ,   Object[]  rankList  ,   int  myRank  ,   int  times  ,   int  qs ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rankList,myRank,times,qs};
			if(!hero.isCanSend(4872, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4872);
		}
		/**
		 * 打开目标奖励界面返回
		 * @param stateList 奖励状态列表
		**/
		public static void sendCmd_4874(long hid  ,   Object[]  stateList ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{stateList};
			if(!hero.isCanSend(4874, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4874);
		}
		/**
		 * 领取奖励返回
		 * @param state 领取状态，0:没有该奖励，1:成功，2:未达到条件，3:已领取
		 * @param awardId 领取的奖励id
		**/
		public static void sendCmd_4876(long hid  ,  int  state  ,   int  awardId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,awardId};
			if(!hero.isCanSend(4876, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4876);
		}
		/**
		 * 打开上期排名界面返回
		 * @param lastRankList 上期排名奖励列表
		 * @param myLastRank 我的上期排名,没上排名则为0
		 * @param myLasttimes 我的上期抽奖次数
		 * @param lastQs 上期期数
		**/
		public static void sendCmd_4878(long hid  ,   Object[]  lastRankList  ,   int  myLastRank  ,   int  myLasttimes  ,   int  lastQs ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{lastRankList,myLastRank,myLasttimes,lastQs};
			if(!hero.isCanSend(4878, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4878);
		}
}