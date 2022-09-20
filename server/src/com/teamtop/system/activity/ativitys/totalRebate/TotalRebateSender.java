package com.teamtop.system.activity.ativitys.totalRebate;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * TotalRebateSender.java
 * 新活动-累计返利
 */
public class TotalRebateSender{
		/**
		 * 打开累计返利界面返回
		 * @param qs 期数
		 * @param rebateInfo 
		**/
		public static void sendCmd_10750(long hid  ,   int  qs  ,   Object[]  rebateInfo ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{qs,rebateInfo};
			if(!hero.isCanSend(10750, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10750);
		}
		/**
		 * 领取累计返利奖励返回
		 * @param state 1.成功 2参数错误 3.领取条件不足 4.已领取
		 * @param id 充值商品ID
		**/
		public static void sendCmd_10752(long hid  ,  int  state  ,   int  id ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,id};
			if(!hero.isCanSend(10752, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10752);
		}
}