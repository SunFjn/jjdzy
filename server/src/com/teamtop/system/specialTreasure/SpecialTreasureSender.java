package com.teamtop.system.specialTreasure;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * SpecialTreasureSender.java
 * 异宝
 */
public class SpecialTreasureSender{
		/**
		 * GC 打开异宝
		 * @param treasure 
		 * @param num 属性丹
		**/
		public static void sendCmd_1042(long hid  ,   Object[]  treasure  ,   int  num ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{treasure,num};
			if(!hero.isCanSend(1042, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1042);
		}
		/**
		 * GC 升星返回
		 * @param rest 0成功 1失败
		 * @param treasureid 异宝id
		 * @param num 星级
		**/
		public static void sendCmd_1044(long hid  ,  int  rest  ,   int  treasureid  ,   int  num ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,treasureid,num};
			if(!hero.isCanSend(1044, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1044);
		}
		/**
		 * GC 使用属性丹返回
		 * @param rest 0成功 1失败
		 * @param type 使用方式
		 * @param num 使用丹药数量
		**/
		public static void sendCmd_1046(long hid  ,  int  rest  ,  int  type  ,   int  num ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,type,num};
			if(!hero.isCanSend(1046, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1046);
		}
}