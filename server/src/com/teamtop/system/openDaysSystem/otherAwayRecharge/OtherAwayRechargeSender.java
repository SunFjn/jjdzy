package com.teamtop.system.openDaysSystem.otherAwayRecharge;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * OtherAwayRechargeSender.java
 * 连续累充（8-28天）
 */
public class OtherAwayRechargeSender{
		/**
		 * GC 打开ui返回
		 * @param recharge 今日充值x元
		 * @param qs 期数
		 * @param num 达标次数
		 * @param state 今日奖励领取情况
		 * @param rewards 
		**/
		public static void sendCmd_7050(long hid  ,   int  recharge  ,  int  qs  ,  int  num  ,  int  state  ,   Object[]  rewards ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{recharge,qs,num,state,rewards};
			if(!hero.isCanSend(7050, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 7050);
		}
		/**
		 * GC 奖励发生变化
		 * @param index 大奖励序号
		 * @param state 大奖励状态
		**/
		public static void sendCmd_7052(long hid  ,   int  index  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{index,state};
			if(!hero.isCanSend(7052, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 7052);
		}
		/**
		 * GC 奖励发生变化（红点更新）
		 * @param num 累计次数变化
		 * @param index 奖励序号
		 * @param state 奖励状态
		**/
		public static void sendCmd_7054(long hid  ,  int  num  ,   int  index  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{num,index,state};
			if(!hero.isCanSend(7054, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 7054);
		}
		/**
		 * GC 今日奖励状态变化返回
		 * @param state 0 1 2
		 * @param rnum 充值数量
		**/
		public static void sendCmd_7056(long hid  ,  int  state  ,   int  rnum ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,rnum};
			if(!hero.isCanSend(7056, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 7056);
		}
}