package com.teamtop.system.activity.ativitys.oneRecharge;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * OneRechargeSender.java
 * 单笔充值
 */
public class OneRechargeSender{
		/**
		 * 打开界面返回
		 * @param awardStateList 奖励状态列表
		 * @param periods 活动期数
		**/
		public static void sendCmd_2360(long hid  ,   Object[]  awardStateList  ,   int  periods ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{awardStateList,periods};
			if(!hero.isCanSend(2360, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2360);
		}
		/**
		 * 领取奖励
		 * @param state 状态：1：成功，2：未达到，3：重复领取
		 * @param awardId 领取奖励id
		**/
		public static void sendCmd_2362(long hid  ,  int  state  ,  int  awardId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,awardId};
			if(!hero.isCanSend(2362, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2362);
		}
}