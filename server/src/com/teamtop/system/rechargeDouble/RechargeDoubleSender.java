package com.teamtop.system.rechargeDouble;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.HeroCache;
/**
 * RechargeDoubleSender.java
 * 充值双倍
 */
public class RechargeDoubleSender{
		/**
		 * 显示充值双倍的图标
		 * @param finish 1:完成，0：未完成
		**/
		public static void sendCmd_1440(long hid  ,  int  finish ){
			NettyWrite.writeData(HeroCache.getHero(hid).getChannel() , new Object[]{finish},1440);
		}
		/**
		 * 充值双倍数据
		 * @param data 数据
		**/
		public static void sendCmd_1442(long hid  ,   Object[]  data ){
			NettyWrite.writeData(HeroCache.getHero(hid).getChannel() , new Object[]{data},1442);
		}
}