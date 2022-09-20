package com.teamtop.system.zcBoss;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * ZcBossHeroSender.java
 * 战场boss
 */
public class ZcBossHeroSender{
		/**
		 * GC 打开ui返回
		 * @param type 类型 1本服 2跨服
		 * @param fbinfos 
		**/
		public static void sendCmd_4452(long hid  ,  int  type  ,   Object[]  fbinfos ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{type,fbinfos};
			if(!hero.isCanSend(4452, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4452);
		}
		/**
		 * GC 进入战场boss返回
		 * @param rest 0成功1失败2您已存在其他战场副本中3人数已满4时间cd中5BOSS已经被击杀
		 * @param index 副本序号
		 * @param time 剩余秒
		**/
		public static void sendCmd_4454(long hid  ,  int  rest  ,   int  index  ,   int  time ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,index,time};
			if(!hero.isCanSend(4454, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4454);
		}
		/**
		 * GC 向boss副本里面的玩家发送副本的状态及该状态倒计时
		 * @param index 副本序号
		 * @param state 副本状态
		 * @param lefttime 副本状态剩余时间
		**/
		public static void sendCmd_4456(long hid  ,   int  index  ,  int  state  ,   int  lefttime ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{index,state,lefttime};
			if(!hero.isCanSend(4456, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4456);
		}
		/**
		 * GC 挑战玩家战斗结果
		 * @param winid 赢者id
		 * @param lostid 败者id
		**/
		public static void sendCmd_4458(long hid  ,   long  winid  ,   long  lostid ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{winid,lostid};
			if(!hero.isCanSend(4458, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4458);
		}
		/**
		 * GC挑战boss返回
		 * @param rest 0可以挑战1不能挑战boss在战斗
		 * @param can 结果参数0:失败，1：成功，2：由前端结果决定
		**/
		public static void sendCmd_4460(long hid  ,  int  rest  ,  int  can ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,can};
			if(!hero.isCanSend(4460, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4460);
		}
		/**
		 * GC 离开副本
		 * @param rest 0成功离开boss战场
		**/
		public static void sendCmd_4464(long hid  ,  int  rest ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest};
			if(!hero.isCanSend(4464, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4464);
		}
		/**
		 * GC 挑战结果
		 * @param rest 0成功挑战 1对方正在战斗 2当前副本状态不能挑战
		**/
		public static void sendCmd_4466(long hid  ,  int  rest ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest};
			if(!hero.isCanSend(4466, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4466);
		}
		/**
		 * GC 结算ui
		 * @param rest 0成功 1失败
		 * @param rewards 
		**/
		public static void sendCmd_4468(long hid  ,  int  rest  ,   Object[]  rewards ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,rewards};
			if(!hero.isCanSend(4468, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4468);
		}
		/**
		 * GC 战斗状态
		 * @param states 
		**/
		public static void sendCmd_4470(long hid  ,   Object[]  states ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{states};
			if(!hero.isCanSend(4470, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4470);
		}
		/**
		 * GC boss已经死亡
		**/
		public static void sendCmd_4472(long hid ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = null;
			if(!hero.isCanSend(4472, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4472);
		}
}