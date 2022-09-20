package com.teamtop.system.activity.ativitys.godOfWealthSendGiftAct;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * GodOfWealthSendGiftActSender.java
 * 财神送礼(活动)
 */
public class GodOfWealthSendGiftActSender{
		/**
		 * 打开界面返回
		 * @param restTurnTimes 抽奖次数
		 * @param recharge 再充值元宝数(可再获得抽奖次数)
		**/
		public static void sendCmd_10770(long hid  ,   int  restTurnTimes  ,   int  recharge ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{restTurnTimes,recharge};
			if(!hero.isCanSend(10770, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10770);
		}
		/**
		 * 抽奖返回
		 * @param state 状态：1：成功，2：抽奖次数不足
		 * @param rewardTipList 获得奖励
		**/
		public static void sendCmd_10772(long hid  ,  int  state  ,   Object[]  rewardTipList ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,rewardTipList};
			if(!hero.isCanSend(10772, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10772);
		}
}