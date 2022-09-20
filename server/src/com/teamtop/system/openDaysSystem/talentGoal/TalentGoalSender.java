package com.teamtop.system.openDaysSystem.talentGoal;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * TalentGoalSender.java
 * 龙飞凤舞-天赋目标
 */
public class TalentGoalSender{
		/**
		 * 打开界面返回
		 * @param sendData 任务数据
		**/
		public static void sendCmd_9400(long hid  ,   Object[]  sendData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{sendData};
			if(!hero.isCanSend(9400, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 9400);
		}
		/**
		 * 领取奖励返回
		 * @param state 状态0失败 1成功
		 * @param type 失败（1未完成 2已领取），成功返回任务类型
		 * @param taskId 任务id
		**/
		public static void sendCmd_9402(long hid  ,  int  state  ,  int  type  ,   int  taskId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,type,taskId};
			if(!hero.isCanSend(9402, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 9402);
		}
}