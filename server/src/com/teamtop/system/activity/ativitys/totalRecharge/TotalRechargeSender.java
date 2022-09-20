package com.teamtop.system.activity.ativitys.totalRecharge;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * TotalRechargeSender.java
 * 累计充值(活动)
 */
public class TotalRechargeSender{
		/**
		 * GC
		 * @param num 充值金额
		 * @param state 
		**/
		public static void sendCmd_2472(long hid  ,   int  num  ,   Object[]  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{num,state};
			if(!hero.isCanSend(2472, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2472);
		}
		/**
		 * GC 奖励变化
		 * @param index 序号
		 * @param state 奖励状态
		**/
		public static void sendCmd_2474(long hid  ,   int  index  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{index,state};
			if(!hero.isCanSend(2474, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2474);
		}
		/**
		 * GC 充值金额变化
		 * @param num 金额数量
		**/
		public static void sendCmd_2476(long hid  ,   int  num ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{num};
			if(!hero.isCanSend(2476, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2476);
		}
}