package com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationLoginGift;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * CelebrationLoginGiftSender.java
 * 三国庆典-登录有奖
 */
public class CelebrationLoginGiftSender{
		/**
		 * 返回界面信息
		 * @param loginTimes 已登录天数
		 * @param rewardData 奖励领取状态
		**/
		public static void sendCmd_4890(long hid  ,  int  loginTimes  ,   Object[]  rewardData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{loginTimes,rewardData};
			if(!hero.isCanSend(4890, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4890);
		}
		/**
		 * 领取奖励结果
		 * @param rtnCode 结果：0：失败，1：成功
		 * @param id 失败：（1：未满足条件，2：已领取），成功：奖励项id
		**/
		public static void sendCmd_4892(long hid  ,  int  rtnCode  ,   int  id ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,id};
			if(!hero.isCanSend(4892, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4892);
		}
}