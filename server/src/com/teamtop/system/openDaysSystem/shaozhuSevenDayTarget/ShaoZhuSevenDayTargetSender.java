package com.teamtop.system.openDaysSystem.shaozhuSevenDayTarget;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * ShaoZhuSevenDayTargetSender.java
 * 少主活动-七日目标
 */
public class ShaoZhuSevenDayTargetSender{
		/**
		 * 打开界面返回
		 * @param awardList 奖励状态列表
		**/
		public static void sendCmd_5412(long hid  ,   Object[]  awardList ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{awardList};
			if(!hero.isCanSend(5412, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 5412);
		}
		/**
		 * 领取奖励返回
		 * @param state 领取状态，0:没有该奖励，1:成功，2:未达到条件，3:已领取
		 * @param awardId 领取的奖励id
		**/
		public static void sendCmd_5414(long hid  ,  int  state  ,   int  awardId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,awardId};
			if(!hero.isCanSend(5414, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 5414);
		}
}