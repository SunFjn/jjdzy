package com.teamtop.system.qiceDraw;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * QiCeDrawSender.java
 * 出谋策划
 */
public class QiCeDrawSender{
		/**
		 * 打开界面返回
		 * @param targetRewardList 目标列表
		 * @param num 抽奖次数
		**/
		public static void sendCmd_9752(long hid  ,   Object[]  targetRewardList  ,   int  num ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{targetRewardList,num};
			if(!hero.isCanSend(9752, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 9752);
		}
		/**
		 * 抽奖返回
		 * @param state 状态 1成功 2元宝不足
		 * @param awardList 道具列表
		 * @param targetRewardList 目标列表
		 * @param num 抽奖次数
		**/
		public static void sendCmd_9754(long hid  ,  int  state  ,   Object[]  awardList  ,   Object[]  targetRewardList  ,   int  num ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,awardList,targetRewardList,num};
			if(!hero.isCanSend(9754, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 9754);
		}
		/**
		 * 领取目标奖励返回
		 * @param state 状态 1成功 2条件不符 3背包已满 4参数错误 5已领取
		 * @param id 目标id
		 * @param flag 目标奖励状态 -1已领取 0条件不符 >0奖励次数
		**/
		public static void sendCmd_9756(long hid  ,  int  state  ,   int  id  ,   int  flag ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,id,flag};
			if(!hero.isCanSend(9756, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 9756);
		}
}