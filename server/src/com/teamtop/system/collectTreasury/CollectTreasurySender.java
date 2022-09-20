package com.teamtop.system.collectTreasury;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * CollectTreasurySender.java
 * 聚宝盆
 */
public class CollectTreasurySender{
		/**
		 * 打开界面返回
		 * @param buyGBagList 购买礼包列表
		 * @param awardsStateList 奖励状态列表
		 * @param loginDay 累计登录天数
		**/
		public static void sendCmd_2082(long hid  ,   Object[]  buyGBagList  ,   Object[]  awardsStateList  ,   int  loginDay ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{buyGBagList,awardsStateList,loginDay};
			if(!hero.isCanSend(2082, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2082);
		}
		/**
		 * 购买礼包返回
		 * @param state 状态，0：礼包不存在，1：成功，2：vip等级不满足，3：元宝不足，4：不能重复购买
		 * @param giftBagType 购买的礼包类型
		**/
		public static void sendCmd_2084(long hid  ,  int  state  ,  int  giftBagType ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,giftBagType};
			if(!hero.isCanSend(2084, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2084);
		}
		/**
		 * 领取奖励返回
		 * @param state 状态，0：奖励不存在，1：成功，2：未达到条件，3：不可重复领取，4：礼包未购买，不能领取
		 * @param awardsId 领取的奖励id
		**/
		public static void sendCmd_2086(long hid  ,  int  state  ,   int  awardsId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,awardsId};
			if(!hero.isCanSend(2086, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2086);
		}
}