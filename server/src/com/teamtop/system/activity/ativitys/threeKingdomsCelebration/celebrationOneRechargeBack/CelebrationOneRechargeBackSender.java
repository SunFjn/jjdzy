package com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationOneRechargeBack;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * CelebrationOneRechargeBackSender.java
 * 三国庆典-单笔返利
 */
public class CelebrationOneRechargeBackSender{
		/**
		 * 返回界面信息
		 * @param rewardData 奖励状态数据
		**/
		public static void sendCmd_4910(long hid  ,   Object[]  rewardData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rewardData};
			if(!hero.isCanSend(4910, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4910);
		}
		/**
		 * 领取奖励结果
		 * @param rtnCode 结果：0：失败，1：成功
		 * @param id 失败：（1：没领取次数），成功：奖励项id
		 * @param canGet 可领取次数
		 * @param alreadyGet 剩余次数
		**/
		public static void sendCmd_4912(long hid  ,  int  rtnCode  ,   int  id  ,  int  canGet  ,  int  alreadyGet ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,id,canGet,alreadyGet};
			if(!hero.isCanSend(4912, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4912);
		}
}