package com.teamtop.system.saintMonsterTreasureSystem;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * SaintMonsterTreasureSystemSender.java
 * 圣兽寻宝
 */
public class SaintMonsterTreasureSystemSender{
		/**
		 * 返回界面信息
		 * @param round 当前圈数
		 * @param grid 当前所在格子
		 * @param ranking 排名
		 * @param rewardData 奖励数据
		 * @param goalRewardData 目标奖励数据
		**/
		public static void sendCmd_5332(long hid  ,   int  round  ,   int  grid  ,   int  ranking  ,   Object[]  rewardData  ,   Object[]  goalRewardData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{round,grid,ranking,rewardData,goalRewardData};
			if(!hero.isCanSend(5332, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 5332);
		}
		/**
		 * 掷骰子结果
		 * @param rtnCode 结果：0：失败，1：成功
		 * @param round 当前圈数
		 * @param grid 当前所在格子
		 * @param myRanking 自身排名
		 * @param rewardData 获得的奖励
		 * @param newReward 新一轮的奖励数据
		 * @param restNum 目标奖励领取数量，，没变化的时候为0
		 * @param id 奖励id，没变化的时候为0
		**/
		public static void sendCmd_5334(long hid  ,  int  rtnCode  ,   int  round  ,   int  grid  ,   int  myRanking  ,   Object[]  rewardData  ,   Object[]  newReward  ,   int  restNum  ,   int  id ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,round,grid,myRanking,rewardData,newReward,restNum,id};
			if(!hero.isCanSend(5334, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 5334);
		}
		/**
		 * 返回排行数据
		 * @param type 类型：1：本期排行，2：上期排行
		 * @param myRanking 个人排名
		 * @param myRound 个人圈数
		 * @param rankData 排行数据
		**/
		public static void sendCmd_5336(long hid  ,  int  type  ,   int  myRanking  ,   int  myRound  ,   Object[]  rankData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{type,myRanking,myRound,rankData};
			if(!hero.isCanSend(5336, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 5336);
		}
		/**
		 * 领取奖励结果
		 * @param rtnCode 0：失败，1：成功
		 * @param id 失败（1:未达条件，2：已领取），成功：奖励id
		 * @param restNum 目标奖励领取数量，-1已领完，0未达到，2剩余领取次数
		**/
		public static void sendCmd_5338(long hid  ,  int  rtnCode  ,   int  id  ,   int  restNum ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,id,restNum};
			if(!hero.isCanSend(5338, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 5338);
		}
}