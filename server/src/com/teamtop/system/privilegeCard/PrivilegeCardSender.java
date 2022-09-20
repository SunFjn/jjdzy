package com.teamtop.system.privilegeCard;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * PrivilegeCardSender.java
 * 特权卡
 */
public class PrivilegeCardSender{
		/**
		 * 特权卡信息返回
		 * @param cardData 特权卡每日奖励状态数据
		 * @param tAward 同时三张特权卡奖励领取状态（0：未领取，1：可领取，2：已领取）
		**/
		public static void sendCmd_2172(long hid  ,   Object[]  cardData  ,  int  tAward ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{cardData,tAward};
			if(!hero.isCanSend(2172, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2172);
		}
		/**
		 * 领取每日奖励结果
		 * @param rtnCode 0：失败，1：成功
		 * @param cardId 特权卡id
		**/
		public static void sendCmd_2174(long hid  ,  int  rtnCode  ,  int  cardId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,cardId};
			if(!hero.isCanSend(2174, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2174);
		}
		/**
		 * 领取同时拥有3张特权卡奖励结果
		 * @param rtnCode 领取结果：0：失败，1：成功
		**/
		public static void sendCmd_2176(long hid  ,  int  rtnCode ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode};
			if(!hero.isCanSend(2176, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2176);
		}
}