package com.teamtop.system.decompound;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * DecompoundSender.java
 * 分解系统
 */
public class DecompoundSender{
		/**
		 * GC 分解返回
		 * @param rest 0成功 1失败
		 * @param goalid 分解id
		 * @param num 分解数量
		**/
		public static void sendCmd_2682(long hid  ,  int  rest  ,   int  goalid  ,   int  num ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,goalid,num};
			if(!hero.isCanSend(2682, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2682);
		}
		/**
		 * GC 一键分解返回
		 * @param rest 0成功 1失败
		 * @param fenjieNum 
		 * @param arr1 
		 * @param arr2 
		**/
		public static void sendCmd_2684(long hid  ,  int  rest  ,   Object[]  fenjieNum  ,   Object[]  arr1  ,   Object[]  arr2 ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,fenjieNum,arr1,arr2};
			if(!hero.isCanSend(2684, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2684);
		}
}