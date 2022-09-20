package com.teamtop.system.vip;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * VipSender.java
 * VIP
 */
public class VipSender{
		/**
		 * vip界面数据
		 * @param vipLevel vip等级
		 * @param vipExp vip经验
		 * @param getAwardData 已领取vip奖励的数据
		 * @param giftData 礼包数据
		**/
		public static void sendCmd_2062(long hid  ,  int  vipLevel  ,   int  vipExp  ,   Object[]  getAwardData  ,   Object[]  giftData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{vipLevel,vipExp,getAwardData,giftData};
			if(!hero.isCanSend(2062, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2062);
		}
		/**
		 * 领取vip奖励结果
		 * @param rtnCode 0：失败，1：成功
		 * @param vipLevel 失败：错误码（1:已领取），成功：对应奖励的vipLevel
		**/
		public static void sendCmd_2064(long hid  ,  int  rtnCode  ,  int  vipLevel ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,vipLevel};
			if(!hero.isCanSend(2064, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2064);
		}
		/**
		 * 购买结果返回
		 * @param rtnCodn 0：失败，1：成功
		 * @param index 失败：（1：vip不足，2：元宝不足），成功：购买id
		**/
		public static void sendCmd_2066(long hid  ,  int  rtnCodn  ,   int  index ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCodn,index};
			if(!hero.isCanSend(2066, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2066);
		}
}