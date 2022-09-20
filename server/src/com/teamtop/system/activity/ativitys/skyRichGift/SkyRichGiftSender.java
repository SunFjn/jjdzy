package com.teamtop.system.activity.ativitys.skyRichGift;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * SkyRichGiftSender.java
 * 天降豪礼
 */
public class SkyRichGiftSender{
		/**
		 * 返回界面信息
		 * @param rechargeValue 已充值额度
		 * @param rewardData 已领取奖励
		**/
		public static void sendCmd_11670(long hid  ,   int  rechargeValue  ,   Object[]  rewardData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rechargeValue,rewardData};
			if(!hero.isCanSend(11670, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11670);
		}
		/**
		 * 领取奖励结果
		 * @param rtnCode 结果：0：失败，1：成功
		 * @param id 失败：（1：充值未达标，2：已领取），成功：奖励项id
		**/
		public static void sendCmd_11672(long hid  ,  int  rtnCode  ,   int  id ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,id};
			if(!hero.isCanSend(11672, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11672);
		}
}