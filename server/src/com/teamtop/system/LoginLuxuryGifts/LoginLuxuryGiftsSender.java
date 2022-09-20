package com.teamtop.system.LoginLuxuryGifts;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * LoginLuxuryGiftsSender.java
 * 新登录豪礼系统
 */
public class LoginLuxuryGiftsSender{
		/**
		 * 打开界面数据返回
		 * @param rewardData 奖励数据
		 * @param days 开服第几天
		**/
		public static void sendCmd_2892(long hid  ,   Object[]  rewardData  ,  int  days ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rewardData,days};
			if(!hero.isCanSend(2892, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2892);
		}
		/**
		 * 领取奖励结果
		 * @param rtnCode 0：失败，1：成功
		 * @param type 失败：错误码（1:未满足条件,2:已领取），成功：领取类型
		**/
		public static void sendCmd_2894(long hid  ,  int  rtnCode  ,  int  type ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,type};
			if(!hero.isCanSend(2894, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2894);
		}
}