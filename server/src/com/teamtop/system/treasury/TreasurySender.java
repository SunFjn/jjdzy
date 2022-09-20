package com.teamtop.system.treasury;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * TreasurySender.java
 * 宝库
 */
public class TreasurySender{
		/**
		 * 打开宝库界面返回
		 * @param goodsList 商品列表
		**/
		public static void sendCmd_2042(long hid  ,   Object[]  goodsList ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{goodsList};
			if(!hero.isCanSend(2042, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2042);
		}
		/**
		 * 兑换返回
		 * @param state 状态，1：成功，2：宝库道具不足，3：商品已售罄，4：vip等级不足，5：商品不存在
		 * @param goodsId 商品id
		**/
		public static void sendCmd_2044(long hid  ,  int  state  ,   int  goodsId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,goodsId};
			if(!hero.isCanSend(2044, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2044);
		}
}