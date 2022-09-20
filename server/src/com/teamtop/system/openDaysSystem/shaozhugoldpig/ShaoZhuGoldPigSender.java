package com.teamtop.system.openDaysSystem.shaozhugoldpig;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * ShaoZhuGoldPigSender.java
 * 少主活动-金猪送财
 */
public class ShaoZhuGoldPigSender{
		/**
		 * 打开界面返回
		 * @param goldPigState 金猪状态-0:未购买,1:已购买
		 * @param silverPigState 银猪状态-0:未购买,1:已购买
		 * @param headState 头像奖励状态-0:未领取,1:可领取 2已领取
		 * @param goldValue 金猪元宝增幅数值
		 * @param silverValue 银猪元宝增幅数值
		 * @param taskData 任务数据
		**/
		public static void sendCmd_5492(long hid  ,  int  goldPigState  ,  int  silverPigState  ,  int  headState  ,   int  goldValue  ,   int  silverValue  ,   Object[]  taskData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{goldPigState,silverPigState,headState,goldValue,silverValue,taskData};
			if(!hero.isCanSend(5492, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 5492);
		}
		/**
		 * 领取头像奖励返回
		 * @param state 领取状态-0:成功,1:已领取,2:未达成
		**/
		public static void sendCmd_5494(long hid  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state};
			if(!hero.isCanSend(5494, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 5494);
		}
		/**
		 * 领取元宝增幅返回
		 * @param state 领取状态-0:成功,1:已领取,2:未达成
		 * @param type 任务类型：1金猪2银猪
		 * @param id 领取id
		 * @param taskSt 下一个任务的状态
		 * @param sumValue 元宝增幅数值
		**/
		public static void sendCmd_5496(long hid  ,  int  state  ,  int  type  ,   int  id  ,  int  taskSt  ,   int  sumValue ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,type,id,taskSt,sumValue};
			if(!hero.isCanSend(5496, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 5496);
		}
}