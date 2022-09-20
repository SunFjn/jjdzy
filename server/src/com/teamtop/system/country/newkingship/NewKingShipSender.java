package com.teamtop.system.country.newkingship;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * NewKingShipSender.java
 * 新王位之争
 */
public class NewKingShipSender{
		/**
		 * 新王位争夺数据返回
		 * @param objectList 列表数据
		 * @param state 活动状态1：开始，2：结束
		 * @param draw 是否已领取俸禄
		 * @param chaTimes 剩余挑战次数
		 * @param gameEndTime 挑战结束剩余时间
		 * @param mobai 膜拜状态，只有结束UI才会使用，是否膜拜，0：没膜拜，1：已膜拜
		 * @param buyNum 已购买次数
		 * @param time 恢复次数时间
		**/
		public static void sendCmd_5202(long hid  ,   Object[]  objectList  ,  int  state  ,  int  draw  ,  int  chaTimes  ,   int  gameEndTime  ,  int  mobai  ,  int  buyNum  ,   int  time ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{objectList,state,draw,chaTimes,gameEndTime,mobai,buyNum,time};
			if(!hero.isCanSend(5202, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 5202);
		}
		/**
		 * GC 挑战返回
		 * @param rest 0成功1失败2此位置正在被挑战3自身正在战斗4不能挑战自己5战斗cd中6次数不够
		 * @param sitid 挑战位置
		**/
		public static void sendCmd_5204(long hid  ,  int  rest  ,   int  sitid ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,sitid};
			if(!hero.isCanSend(5204, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 5204);
		}
		/**
		 * GC 发生变化的位置
		 * @param arrs 
		**/
		public static void sendCmd_5208(long hid  ,   Object[]  arrs ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{arrs};
			if(!hero.isCanSend(5208, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 5208);
		}
		/**
		 * GC 获取奖励返回
		 * @param rest 0成功 1失败 2活动期间不得领取俸禄
		**/
		public static void sendCmd_5210(long hid  ,  int  rest ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest};
			if(!hero.isCanSend(5210, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 5210);
		}
		/**
		 * GC 战斗结果
		 * @param rest 0胜利 1失败 2活动结束
		 * @param sit 挑战位置
		**/
		public static void sendCmd_5206(long hid  ,  int  rest  ,   int  sit ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,sit};
			if(!hero.isCanSend(5206, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 5206);
		}
		/**
		 * GC 膜拜返回
		 * @param rest 0成功 1失败 2王位之争期间不能膜拜
		**/
		public static void sendCmd_5212(long hid  ,  int  rest ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest};
			if(!hero.isCanSend(5212, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 5212);
		}
		/**
		 * GC  购买返回
		 * @param rest 0成功 1失败 2活动已经结束 3次数大于最大值4剩余购买次数不够
		 * @param leftNum 当前剩余次数
		 * @param hasBuy 已经购买次数
		 * @param lefttime 回复时间
		**/
		public static void sendCmd_5214(long hid  ,  int  rest  ,  int  leftNum  ,  int  hasBuy  ,   int  lefttime ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,leftNum,hasBuy,lefttime};
			if(!hero.isCanSend(5214, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 5214);
		}
		/**
		 * GC 战报
		 * @param name 玩家姓名
		 * @param index 当前官职
		**/
		public static void sendCmd_5216(long hid  ,   String  name  ,   int  index ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{name,index};
			if(!hero.isCanSend(5216, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 5216);
		}
}