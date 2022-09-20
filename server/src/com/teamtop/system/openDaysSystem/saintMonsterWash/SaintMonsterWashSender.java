package com.teamtop.system.openDaysSystem.saintMonsterWash;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * SaintMonsterWashSender.java
 * 圣兽降临-圣兽洗练
 */
public class SaintMonsterWashSender{
		/**
		 * 返回界面信息
		 * @param washTimes 已洗练次数
		 * @param rewardData 奖励领取状态数据
		**/
		public static void sendCmd_4950(long hid  ,   int  washTimes  ,   Object[]  rewardData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{washTimes,rewardData};
			if(!hero.isCanSend(4950, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4950);
		}
		/**
		 * 领取奖励结果
		 * @param rtnCode 结果：0：失败，1：成功
		 * @param id 失败（1：未达条件，2：已领取），成功：奖励id
		**/
		public static void sendCmd_4952(long hid  ,  int  rtnCode  ,   int  id ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,id};
			if(!hero.isCanSend(4952, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4952);
		}
}