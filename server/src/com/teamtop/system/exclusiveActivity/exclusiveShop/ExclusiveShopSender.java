package com.teamtop.system.exclusiveActivity.exclusiveShop;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * ExclusiveShopSender.java
 * 专属活动-专属商店
 */
public class ExclusiveShopSender{
		/**
		 * 返回界面信息
		 * @param id 活动唯一id
		 * @param buyData 已购商品数据
		**/
		public static void sendCmd_8160(long hid  ,   int  id  ,   Object[]  buyData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{id,buyData};
			if(!hero.isCanSend(8160, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8160);
		}
		/**
		 * 购买结果返回
		 * @param id 活动唯一id
		 * @param rtnCode 购买结果：0：失败，1：成功
		 * @param index 失败：（1:已达限购次数，2：元宝不足），成功：商品编号
		 * @param buyNum 已购买数量
		**/
		public static void sendCmd_8162(long hid  ,   int  id  ,  int  rtnCode  ,   int  index  ,   int  buyNum ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{id,rtnCode,index,buyNum};
			if(!hero.isCanSend(8162, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8162);
		}
		/**
		 * 更新专属商店配置表
		 * @param actData 专属商店配置数据
		**/
		public static void sendCmd_8164(long hid  ,   Object[]  actData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{actData};
			if(!hero.isCanSend(8164, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8164);
		}
}