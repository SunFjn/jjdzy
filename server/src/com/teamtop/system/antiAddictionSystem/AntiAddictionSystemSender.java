package com.teamtop.system.antiAddictionSystem;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * AntiAddictionSystemSender.java
 * 防沉迷系统
 */
public class AntiAddictionSystemSender{
		/**
		 * 防沉迷通知
		 * @param time 防沉迷在线时间
		**/
		public static void sendCmd_5312(long hid  ,   int  time ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{time};
			if(!hero.isCanSend(5312, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 5312);
		}
}