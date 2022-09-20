package com.teamtop.system.activity.ativitys.vipDiscount;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * VipDiscountSender.java
 * vip折扣
 */
public class VipDiscountSender{
		/**
		 * 打开vip折扣界面返回
		 * @param vipDiscountArr 获得现价的vip折扣数组信息
		 * @param vipLevel 当前vip等级
		**/
		public static void sendCmd_8452(long hid  ,   Object[]  vipDiscountArr  ,  int  vipLevel ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{vipDiscountArr,vipLevel};
			if(!hero.isCanSend(8452, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8452);
		}
		/**
		 * 返回抽取折扣信息
		 * @param state 状态：0.vip等级不足  1.成功
		 * @param vipLevel vip等级
		 * @param presentPrice 现价
		 * @param num 已购买次数
		**/
		public static void sendCmd_8454(long hid  ,  int  state  ,  int  vipLevel  ,   int  presentPrice  ,  int  num ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,vipLevel,presentPrice,num};
			if(!hero.isCanSend(8454, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8454);
		}
		/**
		 * 购买返回
		 * @param state 0.vip等级不足 1.成功 2.未获得现价 3.钱不够 4.超过购买次数 5.不在活动时间内 6背包已满
		 * @param vipLevel vip ID(等级)
		**/
		public static void sendCmd_8456(long hid  ,  int  state  ,  int  vipLevel ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,vipLevel};
			if(!hero.isCanSend(8456, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8456);
		}
}