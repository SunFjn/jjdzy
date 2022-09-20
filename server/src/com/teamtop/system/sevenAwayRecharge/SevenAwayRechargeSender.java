package com.teamtop.system.sevenAwayRecharge;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * SevenAwayRechargeSender.java
 * 七日连续累充
 */
public class SevenAwayRechargeSender{
		/**
		 * GC 打开ui
		 * @param todayRecharge 今日充值元
		 * @param goalNum 累计充值达标次数
		 * @param todaystate 今日奖励领取情况
		 * @param rewardstate 
		**/
		public static void sendCmd_2772(long hid  ,   int  todayRecharge  ,  int  goalNum  ,  int  todaystate  ,   Object[]  rewardstate ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{todayRecharge,goalNum,todaystate,rewardstate};
			if(!hero.isCanSend(2772, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2772);
		}
		/**
		 * GC 大奖奖励发生变化
		 * @param index 奖励序号
		 * @param state 奖励状态
		**/
		public static void sendCmd_2774(long hid  ,  int  index  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{index,state};
			if(!hero.isCanSend(2774, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2774);
		}
		/**
		 * GC 发生变化
		 * @param num 累计次数变化
		 * @param index 奖励序号
		 * @param state 奖励状态
		**/
		public static void sendCmd_2776(long hid  ,  int  num  ,  int  index  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{num,index,state};
			if(!hero.isCanSend(2776, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2776);
		}
		/**
		 * GC 今日奖励状态变化
		 * @param state 奖励状态
		 * @param rnum 充值数量
		**/
		public static void sendCmd_2778(long hid  ,  int  state  ,   int  rnum ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,rnum};
			if(!hero.isCanSend(2778, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2778);
		}
}