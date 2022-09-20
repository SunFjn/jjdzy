package com.teamtop.system.smelt;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * SmeltSender.java
 * 熔炼
 */
public class SmeltSender{
		/**
		 * GC返回熔炼信息
		 * @param lv 熔炼等级
		 * @param exp 熔炼进度
		**/
		public static void sendCmd_602(long hid  ,  int  lv  ,   int  exp ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{lv,exp};
			if(!hero.isCanSend(602, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 602);
		}
		/**
		 * GC熔炼返回
		 * @param type 1普通2特殊
		 * @param state 0失败1成功2背包已满3已达最高级4操作频繁
		 * @param todayExp 1今天经验已满 0没有满
		**/
		public static void sendCmd_604(long hid  ,  int  type  ,  int  state  ,  int  todayExp ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{type,state,todayExp};
			if(!hero.isCanSend(604, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 604);
		}
		/**
		 * GC 背包已满 
		**/
		public static void sendCmd_606(long hid ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = null;
			if(!hero.isCanSend(606, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 606);
		}
}