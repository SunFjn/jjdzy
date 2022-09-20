package com.teamtop.system.activityNotice;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * ActivityNoticeSender.java
 * 活动预告
 */
public class ActivityNoticeSender{
		/**
		 * 活动预告返回
		 * @param activityIndex 活动索引id
		 * @param activityNoticeEndTime 活动预告结束时间
		**/
		public static void sendCmd_2350(long hid  ,   int  activityIndex  ,   int  activityNoticeEndTime ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{activityIndex,activityNoticeEndTime};
			if(!hero.isCanSend(2350, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2350);
		}
}