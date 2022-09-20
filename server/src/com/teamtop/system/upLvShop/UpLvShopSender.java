package com.teamtop.system.upLvShop;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * UpLvShopSender.java
 * 升阶商店
 */
public class UpLvShopSender{
		/**
		 * 打开界面返回
		 * @param shopList 商店列表
		**/
		public static void sendCmd_4502(long hid  ,   Object[]  shopList ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{shopList};
			if(!hero.isCanSend(4502, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4502);
		}
		/**
		 * 购买返回
		 * @param state 状态，0：商品不存在，1：成功，2：元宝不足，3：商品已售罄，4：条件未达到
		 * @param id 购买的配置表id
		**/
		public static void sendCmd_4504(long hid  ,  int  state  ,   int  id ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,id};
			if(!hero.isCanSend(4504, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4504);
		}
}