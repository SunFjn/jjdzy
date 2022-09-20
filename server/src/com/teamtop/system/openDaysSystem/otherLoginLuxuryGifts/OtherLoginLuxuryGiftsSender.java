package com.teamtop.system.openDaysSystem.otherLoginLuxuryGifts;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * OtherLoginLuxuryGiftsSender.java
 * 登录豪礼(8~28)
 */
public class OtherLoginLuxuryGiftsSender{
		/**
		 * 打开界面数据返回
		 * @param days 开服第几天
		 * @param awards 奖励数据
		**/
		public static void sendCmd_4630(long hid  ,  int  days  ,   Object[]  awards ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{days,awards};
			if(!hero.isCanSend(4630, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4630);
		}
		/**
		 * 领取奖励结果
		 * @param rtnCode 0：失败，1：成功
		 * @param type 失败：错误码（1:未满足条件,2:已领取），成功：领取类型
		**/
		public static void sendCmd_4632(long hid  ,  int  rtnCode  ,  int  type ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,type};
			if(!hero.isCanSend(4632, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4632);
		}
}