package com.teamtop.system.functionStart;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * FunctionStartSender.java
 * 功能开启
 */
public class FunctionStartSender{
		/**
		 * 打开功能预览界面
		 * @param gettedGQList 已领取的列表
		**/
		public static void sendCmd_1802(long hid  ,   Object[]  gettedGQList ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{gettedGQList};
			if(!hero.isCanSend(1802, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1802);
		}
		/**
		 * 领取目标奖励
		 * @param state 状态，1：成功，2：没有该奖励 3：当前关卡不满足 4：不可重复领取
		 * @param guanqiaAwardsId 状态为成功时返回关卡奖励id
		**/
		public static void sendCmd_1804(long hid  ,  int  state  ,   int  guanqiaAwardsId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,guanqiaAwardsId};
			if(!hero.isCanSend(1804, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1804);
		}
}