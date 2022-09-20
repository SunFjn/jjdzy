package com.teamtop.system.openDaysSystem.otherSevenDayLogin;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * OtherSevenDayLoginSender.java
 * 少主活动-登录红包(22~28)
 */
public class OtherSevenDayLoginSender{
		/**
		 * 打开页面
		 * @param sendData 所有数据
		 * @param awardNoticeList 公告列表
		 * @param day 当前活动天数
		**/
		public static void sendCmd_5472(long hid  ,   Object[]  sendData  ,   Object[]  awardNoticeList  ,  int  day ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{sendData,awardNoticeList,day};
			if(!hero.isCanSend(5472, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 5472);
		}
		/**
		 * 领取奖励
		 * @param state 1成功 2异常 3开服天数不足 4配置表不存在 5奖励已领取 6背包已满
		 * @param propTips 领取物品
		 * @param day 天数
		**/
		public static void sendCmd_5474(long hid  ,  int  state  ,   Object[]  propTips  ,  int  day ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,propTips,day};
			if(!hero.isCanSend(5474, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 5474);
		}
}