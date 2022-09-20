package com.teamtop.system.searchAnimals;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * SearchAnimalsSender.java
 * 仙山寻兽
 */
public class SearchAnimalsSender{
		/**
		 * 打开仙山寻兽界面信息返回
		 * @param searchInfo 
		 * @param rewardInfo 
		 * @param score 积分
		**/
		public static void sendCmd_8762(long hid  ,   Object[]  searchInfo  ,   Object[]  rewardInfo  ,   int  score ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{searchInfo,rewardInfo,score};
			if(!hero.isCanSend(8762, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8762);
		}
		/**
		 * 寻兽返回
		 * @param state 状态：1.成功 2.元宝不足 3.参数错误  4.该位置已寻过  5.背包已满   
		 * @param searchInfo 
		 * @param rewardInfo 
		 * @param score 积分
		**/
		public static void sendCmd_8764(long hid  ,  int  state  ,   Object[]  searchInfo  ,   Object[]  rewardInfo  ,   int  score ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,searchInfo,rewardInfo,score};
			if(!hero.isCanSend(8764, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8764);
		}
		/**
		 * 领取积分奖励返回
		 * @param state 状态：1.成功 2.积分未达成 3.参数错误  4.已领取  5.背包已满
		 * @param id 领取积分ID    
		 * @param num 奖励倍数(数量红点)
		**/
		public static void sendCmd_8766(long hid  ,  int  state  ,   int  id  ,  int  num ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,id,num};
			if(!hero.isCanSend(8766, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8766);
		}
		/**
		 * 重置返回
		 * @param state 状态：1.成功 2.未全部寻完不能重置
		**/
		public static void sendCmd_8768(long hid  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state};
			if(!hero.isCanSend(8768, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8768);
		}
}