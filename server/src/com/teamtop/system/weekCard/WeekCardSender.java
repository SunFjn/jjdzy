package com.teamtop.system.weekCard;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * WeekCardSender.java
 * 尊享周卡
 */
public class WeekCardSender{
		/**
		 * 界面数据返回
		 * @param leftTime 剩余时间
		 * @param awardState 每日奖励领取状态
		**/
		public static void sendCmd_4552(long hid  ,   int  leftTime  ,  int  awardState ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{leftTime,awardState};
			if(!hero.isCanSend(4552, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4552);
		}
		/**
		 * 领取每日奖励结果返回
		 * @param rtnCode 0：失败，1：成功，
		**/
		public static void sendCmd_4554(long hid  ,  int  rtnCode ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode};
			if(!hero.isCanSend(4554, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4554);
		}
}