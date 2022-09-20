package com.teamtop.system.push;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * PushSender.java
 * 推送
 */
public class PushSender{
		/**
		 * 打开界面
		 * @param data 推送界面信息
		**/
		public static void sendCmd_7502(long hid  ,   Object[]  data ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{data};
			if(!hero.isCanSend(7502, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 7502);
		}
}