package com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationShop;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * CelebrationShopSender.java
 * 三国庆典-庆典商城
 */
public class CelebrationShopSender{
		/**
		 * 购买结果返回
		 * @param rtnCode 结果：0：失败，1：成功
		 * @param index 失败：(1:已达限购次数，2：元宝不足)，成功：商品编号
		 * @param buyNum 已购数量
		**/
		public static void sendCmd_8132(long hid  ,  int  rtnCode  ,   int  index  ,   int  buyNum ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,index,buyNum};
			if(!hero.isCanSend(8132, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8132);
		}
		/**
		 * 返回界面信息
		 * @param goodsData 已购商品数据
		**/
		public static void sendCmd_8130(long hid  ,   Object[]  goodsData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{goodsData};
			if(!hero.isCanSend(8130, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8130);
		}
}