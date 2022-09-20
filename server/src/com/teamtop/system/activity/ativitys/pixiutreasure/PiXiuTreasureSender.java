package com.teamtop.system.activity.ativitys.pixiutreasure;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * PiXiuTreasureSender.java
 * 新活动-貔貅散宝
 */
public class PiXiuTreasureSender{
		/**
		 * 打开界面返回
		 * @param awardList 奖励列表
		 * @param todayConsume 今日消费数
		**/
		public static void sendCmd_12100(long hid  ,   Object[]  awardList  ,   int  todayConsume ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{awardList,todayConsume};
			if(!hero.isCanSend(12100, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 12100);
		}
		/**
		 * 领取奖励返回
		 * @param state 领取状态，0条件未达到，1成功，2已领取
		 * @param id 配置表id
		**/
		public static void sendCmd_12102(long hid  ,  int  state  ,   int  id ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,id};
			if(!hero.isCanSend(12102, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 12102);
		}
}