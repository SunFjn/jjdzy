package com.teamtop.system.activity.ativitys.serverConsumeAct;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * ServerConsumeActSender.java
 * 新活动-全服消费
 */
public class ServerConsumeActSender{
		/**
		 * 打开界面返回
		 * @param awardList 奖励状态列表
		 * @param serverConsume 全服消费
		 * @param myConsume 个人消费
		**/
		public static void sendCmd_10420(long hid  ,   Object[]  awardList  ,   long  serverConsume  ,   int  myConsume ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{awardList,serverConsume,myConsume};
			if(!hero.isCanSend(10420, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10420);
		}
		/**
		 * 领取奖励结果
		 * @param state 领取状态，0:没有该奖励，1:成功，2:未达到条件
		 * @param rewardId 领取的奖励id
		**/
		public static void sendCmd_10422(long hid  ,  int  state  ,   int  rewardId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,rewardId};
			if(!hero.isCanSend(10422, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10422);
		}
}