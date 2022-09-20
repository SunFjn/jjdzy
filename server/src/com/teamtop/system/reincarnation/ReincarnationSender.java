package com.teamtop.system.reincarnation;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * ReincarnationSender.java
 * 六道轮回
 */
public class ReincarnationSender{
		/**
		 * 进行轮回返回
		 * @param state 返回状态:0-成功,1-失败
		 * @param reincarnationLevel 当前轮回等级
		**/
		public static void sendCmd_7102(long hid  ,  int  state  ,   int  reincarnationLevel ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,reincarnationLevel};
			if(!hero.isCanSend(7102, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 7102);
		}
}