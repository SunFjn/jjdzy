package com.teamtop.system.openDaysSystem.saintMonsterDailyActive;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * SaintMonsterDailyActiveSender.java
 * 圣兽降临-每日活跃
 */
public class SaintMonsterDailyActiveSender{
		/**
		 * 返回界面信息
		 * @param taskData 任务数据
		**/
		public static void sendCmd_4990(long hid  ,   Object[]  taskData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{taskData};
			if(!hero.isCanSend(4990, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4990);
		}
		/**
		 * 领取奖励结果
		 * @param rtnCode 结果：0：失败，1：成功
		 * @param type 失败：（1：未完成任务，2：已领取），成功：任务类型
		 * @param taskId 任务id
		**/
		public static void sendCmd_4992(long hid  ,  int  rtnCode  ,  int  type  ,   int  taskId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,type,taskId};
			if(!hero.isCanSend(4992, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4992);
		}
}