package com.teamtop.system.materialFuben;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * MaterialFubenSender.java
 * 材料副本
 */
public class MaterialFubenSender{
		/**
		 * GC 剩余材料副本次数
		 * @param challengeMap 
		**/
		public static void sendCmd_1432(long hid  ,   Object[]  challengeMap ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{challengeMap};
			if(!hero.isCanSend(1432, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1432);
		}
		/**
		 * GC 请求进入某个材料副本
		 * @param rest 0成功 1失败 2背包不足 3没有次数
		 * @param battleinfo 战斗结果0:失败，1：成功，2：以前端结果为准
		 * @param id 副本id
		**/
		public static void sendCmd_1434(long hid  ,  int  rest  ,  int  battleinfo  ,   int  id ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,battleinfo,id};
			if(!hero.isCanSend(1434, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1434);
		}
		/**
		 * GC 请求材料副本奖励
		 * @param rest 0成功 1失败 2背包不足
		 * @param id 副本id
		 * @param awards 
		**/
		public static void sendCmd_1436(long hid  ,  int  rest  ,   int  id  ,   Object[]  awards ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,id,awards};
			if(!hero.isCanSend(1436, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1436);
		}
		/**
		 * GC 扫荡返回
		 * @param rest 0成功 1失败
		**/
		public static void sendCmd_1438(long hid  ,  int  rest ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest};
			if(!hero.isCanSend(1438, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1438);
		}
		/**
		 * GC 购买次数
		 * @param rest 0成功 1失败 
		 * @param id 副本id
		 * @param num 已经购买次数
		**/
		public static void sendCmd_1440(long hid  ,  int  rest  ,   int  id  ,   int  num ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,id,num};
			if(!hero.isCanSend(1440, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1440);
		}
		/**
		 * GC 购买材料副本返回
		 * @param rest 0成功 1失败
		**/
		public static void sendCmd_1442(long hid  ,  int  rest ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest};
			if(!hero.isCanSend(1442, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1442);
		}
}