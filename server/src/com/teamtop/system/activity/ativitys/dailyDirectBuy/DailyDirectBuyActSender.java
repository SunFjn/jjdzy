package com.teamtop.system.activity.ativitys.dailyDirectBuy;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * DailyDirectBuyActSender.java
 * 每日直购(活动)
 */
public class DailyDirectBuyActSender{
		/**
		 * 打开界面返回
		 * @param buyList 奖励列表
		 * @param openDay 活动第几天，从1开始
		 * @param targetAwardList 目标奖励列表
		 * @param targetTimes 目标次数
		 * @param endTime 结束时间
		**/
		public static void sendCmd_3720(long hid  ,   Object[]  buyList  ,   int  openDay  ,   Object[]  targetAwardList  ,   int  targetTimes  ,   int  endTime ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{buyList,openDay,targetAwardList,targetTimes,endTime};
			if(!hero.isCanSend(3720, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3720);
		}
		/**
		 * 领取奖励返回
		 * @param status 领取状态，1:领取成功，2:未购买无法领取，3，重复领取，4:参数错误
		 * @param level 领取的档次，为每日直购表id
		**/
		public static void sendCmd_3722(long hid  ,  int  status  ,  int  level ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{status,level};
			if(!hero.isCanSend(3722, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3722);
		}
		/**
		 * 通知前端奖励可领取
		 * @param id 每日直购表id
		**/
		public static void sendCmd_3724(long hid  ,  int  id ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{id};
			if(!hero.isCanSend(3724, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3724);
		}
		/**
		 * 领取目标奖励返回
		 * @param state 领取状态，0:没有该奖励，1:成功，2:未达到条件，3:已领取
		 * @param targetId 目标表id
		**/
		public static void sendCmd_3726(long hid  ,  int  state  ,   int  targetId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,targetId};
			if(!hero.isCanSend(3726, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3726);
		}
}