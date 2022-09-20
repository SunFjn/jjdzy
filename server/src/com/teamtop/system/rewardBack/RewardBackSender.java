package com.teamtop.system.rewardBack;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * RewardBackSender.java
 * 奖励找回
 */
public class RewardBackSender{
		/**
		 * 打开界面返回
		 * @param rewardBackList 奖励找回列表
		 * @param allRewardBackYb 全部找回元宝消耗
		**/
		public static void sendCmd_5272(long hid  ,   Object[]  rewardBackList  ,   int  allRewardBackYb ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rewardBackList,allRewardBackYb};
			if(!hero.isCanSend(5272, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 5272);
		}
		/**
		 * 领取奖励返回
		 * @param state 领取状态，0:没有该奖励，1:成功，2:未达到条件，3:已领取，4:元宝不足
		 * @param type 找回类型
		 * @param sysId 系统id
		**/
		public static void sendCmd_5274(long hid  ,  int  state  ,  int  type  ,   int  sysId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,type,sysId};
			if(!hero.isCanSend(5274, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 5274);
		}
}