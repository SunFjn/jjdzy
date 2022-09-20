package com.teamtop.system.showReward;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * ShowRewardSender.java
 * 分享
 */
public class ShowRewardSender{
		/**
		 * GC 分享奖励状态
		 * @param rewards 
		**/
		public static void sendCmd_2700(long hid  ,   Object[]  rewards ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rewards};
			if(!hero.isCanSend(2700, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2700);
		}
		/**
		 * GC 获取奖励返回
		 * @param rest 0成功 1失败
		 * @param index 分享id
		**/
		public static void sendCmd_2702(long hid  ,  int  rest  ,  int  index ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,index};
			if(!hero.isCanSend(2702, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2702);
		}
}