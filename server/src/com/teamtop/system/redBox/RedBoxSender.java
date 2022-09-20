package com.teamtop.system.redBox;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * RedBoxSender.java
 * 红包系统
 */
public class RedBoxSender{
		/**
		 * GC打开红包ui返回
		 * @param maxNum 金元宝数量
		 * @param leftNum 剩余发送红包机会
		 * @param redBoxs 
		**/
		public static void sendCmd_11760(long hid  ,   long  maxNum  ,   int  leftNum  ,   Object[]  redBoxs ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{maxNum,leftNum,redBoxs};
			if(!hero.isCanSend(11760, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11760);
		}
		/**
		 * GC查看红包领取情况
		 * @param infos 
		**/
		public static void sendCmd_11762(long hid  ,   Object[]  infos ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{infos};
			if(!hero.isCanSend(11762, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11762);
		}
		/**
		 * GC 发红包返回
		 * @param rest 0成功1次数不够2金元宝不足
		**/
		public static void sendCmd_11764(long hid  ,  int  rest ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest};
			if(!hero.isCanSend(11764, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11764);
		}
		/**
		 * GC 领取红包返回
		 * @param rest 0成功1被抢光了
		 * @param num 领取数量
		**/
		public static void sendCmd_11766(long hid  ,  int  rest  ,   long  num ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,num};
			if(!hero.isCanSend(11766, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11766);
		}
		/**
		 * GC提示有人发了红包
		 * @param name 玩家名字
		**/
		public static void sendCmd_11768(long hid  ,   String  name ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{name};
			if(!hero.isCanSend(11768, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11768);
		}
}