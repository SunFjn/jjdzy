package com.teamtop.system.activity.ativitys.loginLuxuryGiftsNew;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * LoginLuxuryGiftsNewSender.java
 * 新登录豪礼活动
 */
public class LoginLuxuryGiftsNewSender{
		/**
		 * 界面信息返回
		 * @param rewardData 奖励数据
		 * @param actId 活动id
		 * @param weekday 星期几
		**/
		public static void sendCmd_2870(long hid  ,   Object[]  rewardData  ,   int  actId  ,  int  weekday ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rewardData,actId,weekday};
			if(!hero.isCanSend(2870, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2870);
		}
		/**
		 * 	 领取奖励结果
		 * @param rtnCode 0：失败，1：成功
		 * @param type 失败：错误码（1:未满足条件,2:已领取），成功：领取类型
		**/
		public static void sendCmd_2872(long hid  ,  int  rtnCode  ,  int  type ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,type};
			if(!hero.isCanSend(2872, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2872);
		}
}