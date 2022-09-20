package com.teamtop.system.activity.ativitys.awayRecharge;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * AwayRechargeSender.java
 * 活动七日连续累充
 */
public class AwayRechargeSender{
		/**
		 * GC 打开ui
		 * @param recharge 今日充值x元
		 * @param qi 期数
		 * @param num 达标次数
		 * @param state 今日奖励领取情况
		 * @param rewards 
		**/ 
		public static void sendCmd_2782(long hid  ,   int  recharge  ,  int  qi  ,  int  num  ,  int  state  ,   Object[]  rewards ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{recharge,qi,num,state,rewards};
			if(!hero.isCanSend(2782, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2782);
		}
		/**
		 * GC 奖励发生变化
		 * @param index 大奖励序号
		 * @param state 大奖励状态
		**/
		public static void sendCmd_2784(long hid  ,  int  index  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{index,state};
			if(!hero.isCanSend(2784, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2784);
		}
		/**
		 * GC 奖励发生变化（红点更新）
		 * @param num 累计次数变化
		 * @param index 奖励序号
		 * @param state 奖励状态
		**/
		public static void sendCmd_2786(long hid  ,  int  num  ,  int  index  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{num,index,state};
			if(!hero.isCanSend(2786, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2786);
		}
		/**
		 * GC 今日奖励状态变化返回
		 * @param state 0 1 2
		 * @param rnum 充值数量
		**/
		public static void sendCmd_2788(long hid  ,  int  state  ,   int  rnum ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,rnum};
			if(!hero.isCanSend(2788, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2788);
		}
}