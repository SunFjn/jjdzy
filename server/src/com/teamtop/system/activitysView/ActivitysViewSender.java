package com.teamtop.system.activitysView;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * ActivitysViewSender.java
 * 活动预览
 */
public class ActivitysViewSender{
		/**
		 * 登录发送奖励领取状态
		 * @param state 奖励状态，0：未领取，1：已领取
		**/
		public static void sendCmd_4050(long hid  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state};
			if(!hero.isCanSend(4050, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4050);
		}
		/**
		 * 领取每日奖励返回
		 * @param status 领取状态，1：领取成功，2：已经领取(失败)
		**/
		public static void sendCmd_4052(long hid  ,  int  status ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{status};
			if(!hero.isCanSend(4052, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4052);
		}
		/**
		 * GC app推送每日奖励
		 * @param state app每日奖励状态0没有领取1领取了
		**/
		public static void sendCmd_4054(long hid  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state};
			if(!hero.isCanSend(4054, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4054);
		}
		/**
		 * GC 领取app奖励返回
		 * @param state B:领取状态1：领取成功，2：已经领取(失败)
		**/
		public static void sendCmd_4056(long hid  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state};
			if(!hero.isCanSend(4056, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4056);
		}
}