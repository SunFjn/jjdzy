package com.teamtop.system.activity.ativitys.hefuFristRecharge;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * HeFuFristRechargeSender.java
 * 合服首冲
 */
public class HeFuFristRechargeSender{
		/**
		 * GC 打开ui返回
		 * @param rewardstate 
		**/
		public static void sendCmd_9630(long hid  ,   Object[]  rewardstate ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rewardstate};
			if(!hero.isCanSend(9630, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 9630);
		}
		/**
		 * GC 奖励状态变化
		 * @param index 奖励序号
		 * @param state 奖励状态
		**/
		public static void sendCmd_9632(long hid  ,   int  index  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{index,state};
			if(!hero.isCanSend(9632, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 9632);
		}
}