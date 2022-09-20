package com.teamtop.system.openDaysSystem.monsterKingLoginGift;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * MonsterKingLoginGiftSender.java
 * 万兽之王-登录有奖
 */
public class MonsterKingLoginGiftSender{
		/**
		 * 返回界面信息
		 * @param loginTimes 已登录天数
		 * @param rewardData 奖励领取状态
		**/
		public static void sendCmd_9160(long hid  ,  int  loginTimes  ,   Object[]  rewardData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{loginTimes,rewardData};
			if(!hero.isCanSend(9160, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 9160);
		}
		/**
		 * 领取奖励结果
		 * @param rtnCode 结果：0：失败，1：成功
		 * @param id 失败：（1：未满足条件，2：已领取），成功：奖励项id
		**/
		public static void sendCmd_9162(long hid  ,  int  rtnCode  ,   int  id ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,id};
			if(!hero.isCanSend(9162, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 9162);
		}
}