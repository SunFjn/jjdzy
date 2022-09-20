package com.teamtop.system.activity.ativitys.oneRechargeBack;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * OneRechargeBackSender.java
 * 单笔返利(活动)
 */
public class OneRechargeBackSender{
		/**
		 * 打开界面
		 * @param awardList 钥匙列表
		 * @param totalKeyNum 背包中钥匙总数
		**/
		public static void sendCmd_8472(long hid  ,   Object[]  awardList  ,   int  totalKeyNum ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{awardList,totalKeyNum};
			if(!hero.isCanSend(8472, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8472);
		}
		/**
		 * 领取奖励
		 * @param state 领取状态 0没有该奖励 1成功 2未达到条件 3已领完
		 * @param awardId 领取的奖励id
		 * @param keyNum 背包中该钥匙的数量
		 * @param isGetted 对应的奖励是否领取 0可领取 2不可领
		**/
		public static void sendCmd_8474(long hid  ,  int  state  ,   int  awardId  ,   int  keyNum  ,  int  isGetted ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,awardId,keyNum,isGetted};
			if(!hero.isCanSend(8474, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8474);
		}
		/**
		 * 转盘
		 * @param state 状态 1成功 2钥匙不足
		 * @param beiId 倍数表的索引id
		 * @param totalKeyNum 剩余钥匙的总数量
		 * @param minId 消耗对应索引id
		 * @param keyNum 背包中该钥匙的数量
		**/
		public static void sendCmd_8476(long hid  ,  int  state  ,   int  beiId  ,   int  totalKeyNum  ,   int  minId  ,   int  keyNum ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,beiId,totalKeyNum,minId,keyNum};
			if(!hero.isCanSend(8476, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8476);
		}
		/**
		 * 打开记录界面
		 * @param recordArrayList 记录列表
		**/
		public static void sendCmd_8478(long hid  ,   Object[]  recordArrayList ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{recordArrayList};
			if(!hero.isCanSend(8478, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8478);
		}
}