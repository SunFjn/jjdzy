package com.teamtop.system.firstRecharge;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * FirstRechargeSender.java
 * 首充
 */
public class FirstRechargeSender{
		/**
		 * 首充奖励返回
		 * @param state 状态，0：首充没达成，不能领取，1：成功，2：不能重复领取
		**/
		public static void sendCmd_1962(long hid  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state};
			if(!hero.isCanSend(1962, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1962);
		}
		/**
		 * 登录发数据
		 * @param job 初始职业
		**/
		public static void sendCmd_1964(long hid  ,  int  job ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{job};
			if(!hero.isCanSend(1964, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1964);
		}
}