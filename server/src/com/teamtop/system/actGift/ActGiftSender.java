package com.teamtop.system.actGift;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * ActGiftSender.java
 * 限时礼包
 */
public class ActGiftSender{
		/**
		 * 限时礼包返回
		 * @param sendList 礼包数据
		**/
		public static void sendCmd_10450(long hid  ,   Object[]  sendList ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{sendList};
			if(!hero.isCanSend(10450, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10450);
		}
		/**
		 * 领取奖励返回
		 * @param state 状态 0成功 1配置表没有该id 2未达到条件 3未充值 4已领取
		 * @param id 表的id
		**/
		public static void sendCmd_10452(long hid  ,  int  state  ,   int  id ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,id};
			if(!hero.isCanSend(10452, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10452);
		}
}