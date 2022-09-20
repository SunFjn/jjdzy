package com.teamtop.system.openDaysSystem.shaozhuOneRechargeBack;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * ShaoZhuOneRechargeBackSender.java
 * 少主活动-单笔返利
 */
public class ShaoZhuOneRechargeBackSender{
		/**
		 * 打开界面返回
		 * @param awardList 钥匙列表
		 * @param totalKeyNum 背包中钥匙总数
		**/
		public static void sendCmd_5642(long hid  ,   Object[]  awardList  ,   int  totalKeyNum ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{awardList,totalKeyNum};
			if(!hero.isCanSend(5642, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 5642);
		}
		/**
		 * 领取奖励返回
		 * @param state 领取状态，0:没有该奖励，1:成功，2:未达到条件，3:已领完
		 * @param awardId 领取的奖励id
		 * @param keyNum 背包中该钥匙数量
		 * @param isGetted 对应的奖励是否可领取，2:不可领，0:可领
		**/
		public static void sendCmd_5644(long hid  ,  int  state  ,   int  awardId  ,   int  keyNum  ,  int  isGetted ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,awardId,keyNum,isGetted};
			if(!hero.isCanSend(5644, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 5644);
		}
		/**
		 * 转盘返回
		 * @param state 状态，1：成功，2：钥匙不足
		 * @param beiId 倍数表的索引id
		 * @param restTotalKeyNum 剩余钥匙总数量
		 * @param index 消耗的对应索引id
		 * @param keyNum 背包中该钥匙数量
		**/
		public static void sendCmd_5646(long hid  ,  int  state  ,   int  beiId  ,   int  restTotalKeyNum  ,   int  index  ,   int  keyNum ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,beiId,restTotalKeyNum,index,keyNum};
			if(!hero.isCanSend(5646, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 5646);
		}
		/**
		 * 打开记录界面返回
		 * @param recordList 记录列表
		**/
		public static void sendCmd_5648(long hid  ,   Object[]  recordList ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{recordList};
			if(!hero.isCanSend(5648, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 5648);
		}
}