package com.teamtop.system.runningMan;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * RunningManSender.java
 * 过关斩将
 */
public class RunningManSender{
		/**
		 * GC 过关斩将通关信息
		 * @param infos 
		**/
		public static void sendCmd_1552(long hid  ,   Object[]  infos ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{infos};
			if(!hero.isCanSend(1552, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1552);
		}
		/**
		 * GC 关卡挑战难度
		 * @param rest 0成功 1失败
		 * @param type 难度
		 * @param battlerest 战斗结果0:失败，1：成功，2：以前端结果为准
		 * @param fbid 关卡id
		**/
		public static void sendCmd_1554(long hid  ,  int  rest  ,  int  type  ,  int  battlerest  ,   int  fbid ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,type,battlerest,fbid};
			if(!hero.isCanSend(1554, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1554);
		}
		/**
		 * GC 获取关卡奖励结果
		 * @param rest 0成功 1失败
		 * @param type 难度类型
		 * @param isfrist 是否是第一次通过0不是1是
		 * @param funid 关卡id
		 * @param itemNum 
		**/
		public static void sendCmd_1556(long hid  ,  int  rest  ,  int  type  ,  int  isfrist  ,   int  funid  ,   Object[]  itemNum ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,type,isfrist,funid,itemNum};
			if(!hero.isCanSend(1556, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1556);
		}
		/**
		 * GC 扫荡结果
		 * @param rest 扫荡结果0成功 1失败
		 * @param type 难度
		 * @param datas 
		**/
		public static void sendCmd_1558(long hid  ,  int  rest  ,  int  type  ,   Object[]  datas ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,type,datas};
			if(!hero.isCanSend(1558, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1558);
		}
}