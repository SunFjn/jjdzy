package com.teamtop.system.openDaysSystem.otherSevenGroupBuy;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * OtherSevenGroupBuySender.java
 * 首冲团购（8-28）
 */
public class OtherSevenGroupBuySender{
		/**
		 * GC 打开ui返回
		 * @param todayReNum 今日充值
		 * @param todayReAllNum 今日全服首冲数
		 * @param rewardstates 
		**/
		public static void sendCmd_7450(long hid  ,   int  todayReNum  ,   int  todayReAllNum  ,   Object[]  rewardstates ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{todayReNum,todayReAllNum,rewardstates};
			if(!hero.isCanSend(7450, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 7450);
		}
		/**
		 * GC 奖励发生变化
		 * @param index 奖励序号
		 * @param state 奖励状态
		 * @param num 今日充值金额
		**/
		public static void sendCmd_7452(long hid  ,   int  index  ,  int  state  ,   int  num ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{index,state,num};
			if(!hero.isCanSend(7452, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 7452);
		}
		/**
		 * GC 今日首冲人数
		 * @param num 今日首冲人数变化
		**/
		public static void sendCmd_7454(long hid  ,   int  num ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{num};
			if(!hero.isCanSend(7454, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 7454);
		}
}