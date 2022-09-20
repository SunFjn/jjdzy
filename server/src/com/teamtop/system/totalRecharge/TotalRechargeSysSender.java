package com.teamtop.system.totalRecharge;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * TotalRechargeSysSender.java
 * 累计充值(系统)
 */
public class TotalRechargeSysSender{
		/**
		 * GC
		 * @param num 充值金额
		 * @param state 
		**/
		public static void sendCmd_4352(long hid  ,   int  num  ,   Object[]  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{num,state};
			if(!hero.isCanSend(4352, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4352);
		}
		/**
		 * GC 奖励变化
		 * @param index 序号
		 * @param state 奖励状态
		**/
		public static void sendCmd_4354(long hid  ,   int  index  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{index,state};
			if(!hero.isCanSend(4354, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4354);
		}
		/**
		 * GC 充值金额变化
		 * @param num 金额数量
		**/
		public static void sendCmd_4356(long hid  ,   int  num ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{num};
			if(!hero.isCanSend(4356, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4356);
		}
}