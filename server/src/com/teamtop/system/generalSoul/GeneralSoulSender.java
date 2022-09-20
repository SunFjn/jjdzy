package com.teamtop.system.generalSoul;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * GeneralSoulSender.java
 * 将魂
 */
public class GeneralSoulSender{
		/**
		 * 返回将魂界面数据
		 * @param generalSoulInfo 将魂数据
		 * @param setData 套装数据
		**/
		public static void sendCmd_1152(long hid  ,   Object[]  generalSoulInfo  ,   Object[]  setData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{generalSoulInfo,setData};
			if(!hero.isCanSend(1152, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1152);
		}
		/**
		 * 将魂升级结果
		 * @param rtnCode 0：失败，1：成功
		 * @param generalSoulId 将魂id
		 * @param levelIndex 等级索引id
		 * @param exp 经验
		**/
		public static void sendCmd_1154(long hid  ,  int  rtnCode  ,   int  generalSoulId  ,   int  levelIndex  ,   int  exp ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,generalSoulId,levelIndex,exp};
			if(!hero.isCanSend(1154, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1154);
		}
		/**
		 * 套装升阶结果
		 * @param rtnCode 0：失败，1：成功
		 * @param setId 套装id
		**/
		public static void sendCmd_1156(long hid  ,  int  rtnCode  ,   int  setId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,setId};
			if(!hero.isCanSend(1156, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1156);
		}
		/**
		 * 激活新将魂
		 * @param soulId 将魂id
		**/
		public static void sendCmd_1158(long hid  ,   int  soulId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{soulId};
			if(!hero.isCanSend(1158, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1158);
		}
}