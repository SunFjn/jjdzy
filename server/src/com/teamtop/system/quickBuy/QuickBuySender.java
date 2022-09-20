package com.teamtop.system.quickBuy;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * QuickBuySender.java
 * 快速购买
 */
public class QuickBuySender{
		/**
		 * 购买结果返回
		 * @param rtnCode 结果：0：失败，1：成功
		 * @param id 失败：（1：达到今天限购数量），成功：商品id
		 * @param num 今日已购数量
		**/
		public static void sendCmd_5252(long hid  ,  int  rtnCode  ,   int  id  ,   int  num ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,id,num};
			if(!hero.isCanSend(5252, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 5252);
		}
		/**
		 * 返回界面信息
		 * @param goodsData 已购买信息
		**/
		public static void sendCmd_5254(long hid  ,   Object[]  goodsData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{goodsData};
			if(!hero.isCanSend(5254, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 5254);
		}
}