package com.teamtop.system.openDaysSystem.monsterKingTotalRecharge;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * MonsterKingTotalRechargeSender.java
 * 万兽之王-累计充值
 */
public class MonsterKingTotalRechargeSender{
		/**
		 * 打开界面返回
		 * @param awardList 奖励状态列表
		 * @param rechargeYb 充值金额
		**/
		public static void sendCmd_9100(long hid  ,   Object[]  awardList  ,   int  rechargeYb ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{awardList,rechargeYb};
			if(!hero.isCanSend(9100, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 9100);
		}
		/**
		 * 领取奖励结果
		 * @param state 领取状态，0:没有该奖励，1:成功，2:未达到条件
		 * @param rewardId 领取的奖励id
		**/
		public static void sendCmd_9102(long hid  ,  int  state  ,   int  rewardId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,rewardId};
			if(!hero.isCanSend(9102, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 9102);
		}
}