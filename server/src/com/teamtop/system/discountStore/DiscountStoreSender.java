package com.teamtop.system.discountStore;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * DiscountStoreSender.java
 * 折扣商店
 */
public class DiscountStoreSender{
		/**
		 * 打开界面返回
		 * @param goodsList 商品列表
		**/
		public static void sendCmd_2632(long hid  ,   Object[]  goodsList ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{goodsList};
			if(!hero.isCanSend(2632, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2632);
		}
		/**
		 * 购买返回
		 * @param state 状态，0：商品不存在，1：成功，2：元宝不足，3：商品已售罄，4：vip等级不足
		 * @param goodsId 商品id
		**/
		public static void sendCmd_2634(long hid  ,  int  state  ,   int  goodsId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,goodsId};
			if(!hero.isCanSend(2634, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2634);
		}
}