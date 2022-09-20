package com.teamtop.system.openDaysSystem.saintMonsterTreasure;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * SaintMonsterTreasureSender.java
 * 圣兽降临-圣兽寻宝
 */
public class SaintMonsterTreasureSender{
		/**
		 * 返回界面信息
		 * @param round 当前圈数
		 * @param grid 当前所在格子
		 * @param ranking 排名
		 * @param rewardData 奖励数据
		 * @param goalRewardData 目标奖励数据
		**/
		public static void sendCmd_5010(long hid  ,   int  round  ,   int  grid  ,   int  ranking  ,   Object[]  rewardData  ,   Object[]  goalRewardData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{round,grid,ranking,rewardData,goalRewardData};
			if(!hero.isCanSend(5010, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 5010);
		}
		/**
		 * 掷骰子结果
		 * @param rtnCode 结果：0：失败，1：成功
		 * @param round 当前圈数
		 * @param grid 当前所在格子
		 * @param myRanking 自身排名
		 * @param rewardData 获得的奖励
		 * @param newReward 新一轮的奖励数据
		**/
		public static void sendCmd_5012(long hid  ,  int  rtnCode  ,   int  round  ,   int  grid  ,   int  myRanking  ,   Object[]  rewardData  ,   Object[]  newReward ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,round,grid,myRanking,rewardData,newReward};
			if(!hero.isCanSend(5012, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 5012);
		}
		/**
		 * 返回排行数据
		 * @param myRanking 个人排名
		 * @param myRound 个人圈数
		 * @param rankData 排行数据
		**/
		public static void sendCmd_5014(long hid  ,   int  myRanking  ,   int  myRound  ,   Object[]  rankData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{myRanking,myRound,rankData};
			if(!hero.isCanSend(5014, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 5014);
		}
		/**
		 * 领取奖励结果
		 * @param rtnCode 0：失败，1：成功
		 * @param id 失败（1:未达条件，2：已领取），成功：奖励id
		**/
		public static void sendCmd_5016(long hid  ,  int  rtnCode  ,   int  id ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,id};
			if(!hero.isCanSend(5016, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 5016);
		}
}