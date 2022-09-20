package com.teamtop.system.talent;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * TalentSender.java
 * 修炼天赋
 */
public class TalentSender{
		/**
		 * 打开修炼天赋界面返回
		 * @param showItemList 展示道具
		 * @param targetRewardList 
		 * @param num 修炼次数
		**/
		public static void sendCmd_9372(long hid  ,   Object[]  showItemList  ,   Object[]  targetRewardList  ,   int  num ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{showItemList,targetRewardList,num};
			if(!hero.isCanSend(9372, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 9372);
		}
		/**
		 * 修炼返回
		 * @param state 状态：1.成功 2.元宝不足  3.背包已满
		 * @param awardList 
		 * @param targetRewardList 
		 * @param num 修炼次数
		 * @param showItemList 展示道具：有重置时返回数据，否则无数据
		**/
		public static void sendCmd_9374(long hid  ,  int  state  ,   Object[]  awardList  ,   Object[]  targetRewardList  ,   int  num  ,   Object[]  showItemList ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,awardList,targetRewardList,num,showItemList};
			if(!hero.isCanSend(9374, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 9374);
		}
		/**
		 * 领取目标奖励返回
		 * @param state 状态：1.成功 2.条件不符 3.背包已满 4.参数错误 5.已领取
		 * @param id 目标奖励ID 
		 * @param flag 目标奖励状态：-1.已领取 0.条件不符 >0.奖励次数
		**/
		public static void sendCmd_9376(long hid  ,  int  state  ,   int  id  ,   int  flag ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,id,flag};
			if(!hero.isCanSend(9376, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 9376);
		}
}