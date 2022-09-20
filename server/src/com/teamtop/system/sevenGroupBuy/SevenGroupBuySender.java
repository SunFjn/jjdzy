package com.teamtop.system.sevenGroupBuy;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * SevenGroupBuySender.java
 * 7日首冲团购
 */
public class SevenGroupBuySender{
		/**
		 * GC 初始化系统数据
		 * @param rechargenum 今日充值
		 * @param fristReNum 今日全服首冲数
		 * @param rewards 
		**/
		public static void sendCmd_2850(long hid  ,   int  rechargenum  ,   int  fristReNum  ,   Object[]  rewards ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rechargenum,fristReNum,rewards};
			if(!hero.isCanSend(2850, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2850);
		}
		/**
		 * GC 奖励发生变化
		 * @param index 奖励序号
		 * @param state 奖励状态
		 * @param num 今日充值金额
		**/
		public static void sendCmd_2852(long hid  ,   int  index  ,  int  state  ,   int  num ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{index,state,num};
			if(!hero.isCanSend(2852, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2852);
		}
		/**
		 * GC 今日首冲人数
		 * @param num 今日首冲人数变化
		**/
		public static void sendCmd_2854(long hid  ,   int  num ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{num};
			if(!hero.isCanSend(2854, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2854);
		}
}