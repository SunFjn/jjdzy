package com.teamtop.system.openDaysSystem.runeCellect;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * RuneCellectSender.java
 * 符文收集
 */
public class RuneCellectSender{
		/**
		 * 返回界面信息
		 * @param rewardData 奖励状态数据
		 * @param typeNumData 镶嵌各品质符文最高记录
		**/
		public static void sendCmd_4590(long hid  ,   Object[]  rewardData  ,   Object[]  typeNumData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rewardData,typeNumData};
			if(!hero.isCanSend(4590, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4590);
		}
		/**
		 * 领取结果返回
		 * @param rtnCode 0：失败，1：成功
		 * @param id 失败：（1：未达条件，2：已领取），成功：奖励id
		**/
		public static void sendCmd_4592(long hid  ,  int  rtnCode  ,   int  id ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,id};
			if(!hero.isCanSend(4592, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4592);
		}
}