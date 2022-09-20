package com.teamtop.system.openDaysSystem.talentSendGiftActive;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * TalentSendGiftActiveSender.java
 * 龙飞凤舞-天赋送礼
 */
public class TalentSendGiftActiveSender{
		/**
		 * 打开界面返回
		 * @param activeNum 抽奖次数
		 * @param taskData 目标列表
		**/
		public static void sendCmd_9350(long hid  ,   int  activeNum  ,   Object[]  taskData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{activeNum,taskData};
			if(!hero.isCanSend(9350, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 9350);
		}
		/**
		 * 领取奖励返回
		 * @param state 状态1未完成任务 2已领取 3成功
		 * @param taskId 失败返回0，成功返回表的序号
		**/
		public static void sendCmd_9352(long hid  ,  int  state  ,   int  taskId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,taskId};
			if(!hero.isCanSend(9352, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 9352);
		}
}