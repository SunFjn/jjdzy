package com.teamtop.system.compound;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * CompoundSender.java
 * 合成系统
 */
public class CompoundSender{
		/**
		 * GC 合成道具返回
		 * @param rest 0成功 1失败
		 * @param goalid 目标id
		 * @param num 合成数量
		**/
		public static void sendCmd_2652(long hid  ,  int  rest  ,   int  goalid  ,   int  num ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,goalid,num};
			if(!hero.isCanSend(2652, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2652);
		}
}