package com.teamtop.system.openDaysSystem.specialAnimalSendGift;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * SpecialAnimalSendGiftSender.java
 * 万兽之王-异兽送礼
 */
public class SpecialAnimalSendGiftSender{
		/**
		 * 打开界面返回
		 * @param awardList 奖励列表
		 * @param totalRecharge 累计充值数
		 * @param qishu 期数
		**/
		public static void sendCmd_9220(long hid  ,   Object[]  awardList  ,   int  totalRecharge  ,  int  qishu ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{awardList,totalRecharge,qishu};
			if(!hero.isCanSend(9220, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 9220);
		}
		/**
		 * 激活返回
		 * @param state 领取状态，1:成功，2:未达到条件，3:已激活
		 * @param type 任务类型
		**/
		public static void sendCmd_9222(long hid  ,  int  state  ,  int  type ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,type};
			if(!hero.isCanSend(9222, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 9222);
		}
		/**
		 * 领取奖励返回
		 * @param state 领取状态，0:没有该奖励，1:成功，2:未达到条件，3:已领取
		 * @param id 配置表id
		**/
		public static void sendCmd_9224(long hid  ,  int  state  ,   int  id ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,id};
			if(!hero.isCanSend(9224, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 9224);
		}
}