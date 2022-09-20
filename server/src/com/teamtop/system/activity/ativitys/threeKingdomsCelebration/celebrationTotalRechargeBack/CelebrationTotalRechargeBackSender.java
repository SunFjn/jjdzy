package com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationTotalRechargeBack;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * CelebrationTotalRechargeBackSender.java
 * 三国庆典-累充返利
 */
public class CelebrationTotalRechargeBackSender{
		/**
		 * 返回界面信息
		 * @param totalRecharge 累计充值额度
		 * @param rewardData 奖励领取状态数据
		**/
		public static void sendCmd_4930(long hid  ,   int  totalRecharge  ,   Object[]  rewardData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{totalRecharge,rewardData};
			if(!hero.isCanSend(4930, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4930);
		}
		/**
		 * 领取奖励结果
		 * @param rtnCode 结果：0：失败，1：成功
		 * @param id 失败：（1：），成功：奖励项id
		**/
		public static void sendCmd_4932(long hid  ,  int  rtnCode  ,   int  id ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,id};
			if(!hero.isCanSend(4932, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4932);
		}
}