package com.teamtop.system.crossSelectKing.local;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * CrossSelectKingSender.java
 * 枭雄争霸
 */
public class CrossSelectKingSender{
		/**
		 * GC 活动状态通知
		 * @param state 0未开始1开始中
		 * @param proFlag 进场进度 1十六强2八强3四强4决赛
		 * @param proState 1：准备阶段 2：战斗阶段
		**/
		public static void sendCmd_2100(long hid  ,  int  state  ,  int  proFlag  ,  int  proState ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,proFlag,proState};
			if(!hero.isCanSend(2100, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2100);
		}
		/**
		 * GC 比赛战况
		 * @param infos 对战信息
		**/
		public static void sendCmd_2102(long hid  ,   Object[]  infos ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{infos};
			if(!hero.isCanSend(2102, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2102);
		}
		/**
		 * GC 购买输赢返回
		 * @param rest 0成功 1失败 2已结购买了 3不能购买
		 * @param round 第几轮
		 * @param count 第几场
		 * @param win 1为ID1赢, 2为ID2赢
		**/
		public static void sendCmd_2104(long hid  ,  int  rest  ,  int  round  ,  int  count  ,  int  win ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,round,count,win};
			if(!hero.isCanSend(2104, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2104);
		}
		/**
		 * GC 战斗情况
		 * @param battleInfos 
		**/
		public static void sendCmd_2106(long hid  ,   Object[]  battleInfos ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{battleInfos};
			if(!hero.isCanSend(2106, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2106);
		}
		/**
		 * GC 打开名人堂返回
		 * @param winers 
		 * @param mnum 0没有膜拜1膜拜过了
		 * @param fristNum 可以领取冠军数量
		**/
		public static void sendCmd_2110(long hid  ,   Object[]  winers  ,  int  mnum  ,  int  fristNum ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{winers,mnum,fristNum};
			if(!hero.isCanSend(2110, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2110);
		}
		/**
		 * GC 膜拜返回
		 * @param rest 0成功 1失败
		 * @param num 膜拜状态
		**/
		public static void sendCmd_2112(long hid  ,  int  rest  ,  int  num ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,num};
			if(!hero.isCanSend(2112, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2112);
		}
		/**
		 * GC 获取冠军奖励
		 * @param rest 0成功 1失败
		 * @param num 剩余次数
		**/
		public static void sendCmd_2114(long hid  ,  int  rest  ,  int  num ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,num};
			if(!hero.isCanSend(2114, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2114);
		}
}