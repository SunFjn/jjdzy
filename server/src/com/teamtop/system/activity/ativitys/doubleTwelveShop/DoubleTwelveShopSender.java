package com.teamtop.system.activity.ativitys.doubleTwelveShop;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * DoubleTwelveShopSender.java
 * 新活动-双12商城
 */
public class DoubleTwelveShopSender{
		/**
		 * 打开界面返回
		 * @param itemInfos  商品列表
		**/
		public static void sendCmd_10700(long hid  ,   Object[]  itemInfos ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{itemInfos};
			if(!hero.isCanSend(10700, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10700);
		}
		/**
		 * 购买商品返回
		 * @param state 状态:0-成功,1-失败
		**/
		public static void sendCmd_10702(long hid  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state};
			if(!hero.isCanSend(10702, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10702);
		}
}