package com.teamtop.system.activity.ativitys.luckTurnCardAct;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * LuckTurnCardActSender.java
 * 新活动-幸运翻牌
 */
public class LuckTurnCardActSender{
		/**
		 * 打开界面返回
		 * @param turncardList 翻牌列表
		 * @param turnCardTimes 翻牌次数
		 * @param victoryTimes 累胜次数
		**/
		public static void sendCmd_10340(long hid  ,   Object[]  turncardList  ,   int  turnCardTimes  ,   int  victoryTimes ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{turncardList,turnCardTimes,victoryTimes};
			if(!hero.isCanSend(10340, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10340);
		}
		/**
		 * 翻牌返回
		 * @param state 状态：1：已抽中(必胜翻牌和十连胜则为成功)，2：未抽中，3：未抽中，-1：今日翻牌次数已达上限，-2：元宝不足
		 * @param type 类型，同上
		 * @param rewardTipList 获得奖励
		**/
		public static void sendCmd_10342(long hid  ,  int  state  ,  int  type  ,   Object[]  rewardTipList ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,type,rewardTipList};
			if(!hero.isCanSend(10342, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10342);
		}
		/**
		 * 打开目标奖励界面返回
		 * @param awardList 奖励状态列表
		**/
		public static void sendCmd_10344(long hid  ,   Object[]  awardList ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{awardList};
			if(!hero.isCanSend(10344, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10344);
		}
		/**
		 * 领取目标奖励返回
		 * @param state 领取状态，0:没有该奖励，1:成功，2:未达到条件，3:已领取
		 * @param awardId 领取的奖励id
		**/
		public static void sendCmd_10346(long hid  ,  int  state  ,   int  awardId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,awardId};
			if(!hero.isCanSend(10346, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10346);
		}
}