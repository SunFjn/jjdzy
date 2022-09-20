package com.teamtop.system.openDaysSystem.shaozhuTotalRecharge;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * ShaoZhuTotalRechargeSender.java
 * 少主活动-累计充值
 */
public class ShaoZhuTotalRechargeSender{
		/**
		 * 打开界面返回
		 * @param awardList 奖励状态列表
		 * @param consumeYb 充值金额
		**/
		public static void sendCmd_5592(long hid  ,   Object[]  awardList  ,   int  consumeYb ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{awardList,consumeYb};
			if(!hero.isCanSend(5592, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 5592);
		}
		/**
		 * 领取奖励返回
		 * @param state 领取状态，0:没有该奖励，1:成功，2:未达到条件，3:已领取
		 * @param awardId 领取的奖励id
		**/
		public static void sendCmd_5594(long hid  ,  int  state  ,   int  awardId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,awardId};
			if(!hero.isCanSend(5594, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 5594);
		}
}