package com.teamtop.system.cdkey;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * CDkeySender.java
 * 激活码
 */
public class CDkeySender{
		/**
		 * 领取激活码奖励返回
		 * @param state 状态，0：激活码有误，1：成功，2：激活码为空，3：激活码已被使用，4：激活码已过期，5：同类型激活码领取达到上限
		 * @param cdkey 领取的激活码
		**/
		public static void sendCmd_2212(long hid  ,  int  state  ,   String  cdkey ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,cdkey};
			if(!hero.isCanSend(2212, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2212);
		}
}