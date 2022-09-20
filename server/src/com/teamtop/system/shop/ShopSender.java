package com.teamtop.system.shop;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * ShopSender.java
 * 商城
 */
public class ShopSender{
		/**
		 * 商店数据返回
		 * @param shopInfo 商店数据
		**/
		public static void sendCmd_1182(long hid  ,   Object[]  shopInfo ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{shopInfo};
			if(!hero.isCanSend(1182, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1182);
		}
		/**
		 * 购买结果
		 * @param rtnCode 0：失败，1：成功
		 * @param type 商店类型
		 * @param goodsId 失败：错误码（1：商品不存在，2：vip等级不足，3：达购买上限，4：背包满，5：货币不足），成功：商品索引id
		 * @param buyNum 已购买数量
		**/
		public static void sendCmd_1186(long hid  ,  int  rtnCode  ,  int  type  ,   int  goodsId  ,   int  buyNum ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,type,goodsId,buyNum};
			if(!hero.isCanSend(1186, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1186);
		}
}