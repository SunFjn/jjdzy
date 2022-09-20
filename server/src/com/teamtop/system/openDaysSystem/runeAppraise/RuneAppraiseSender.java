package com.teamtop.system.openDaysSystem.runeAppraise;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * RuneAppraiseSender.java
 * 符文鉴定
 */
public class RuneAppraiseSender{
		/**
		 * 返回界面数据
		 * @param appNum 完美鉴定次数
		 * @param getData id
		**/
		public static void sendCmd_4610(long hid  ,   int  appNum  ,   Object[]  getData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{appNum,getData};
			if(!hero.isCanSend(4610, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4610);
		}
		/**
		 * 领取结果返回
		 * @param rtnCode 0：失败，1：成功
		 * @param id 失败：（1：未满足条件，2：已领取），成功：奖励id
		**/
		public static void sendCmd_4612(long hid  ,  int  rtnCode  ,   int  id ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,id};
			if(!hero.isCanSend(4612, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4612);
		}
}