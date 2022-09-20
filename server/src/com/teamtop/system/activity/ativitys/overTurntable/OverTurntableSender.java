package com.teamtop.system.activity.ativitys.overTurntable;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * OverTurntableSender.java
 * 超值转盘
 */
public class OverTurntableSender{
		/**
		 * 打开界面返回
		 * @param restTimes 剩余抽奖次数
		 * @param consumeYb 消费值
		 * @param stateList 宝箱状态列表
		 * @param awardNoticeList 获奖公告列表
		**/
		public static void sendCmd_2500(long hid  ,   int  restTimes  ,   int  consumeYb  ,   Object[]  stateList  ,   Object[]  awardNoticeList ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{restTimes,consumeYb,stateList,awardNoticeList};
			if(!hero.isCanSend(2500, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2500);
		}
		/**
		 * 抽奖返回
		 * @param state 状态：1：成功，2：抽奖次数不足
		 * @param awardList 抽取的奖品列表
		 * @param type 抽奖类型返回
		**/
		public static void sendCmd_2502(long hid  ,  int  state  ,   Object[]  awardList  ,  int  type ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,awardList,type};
			if(!hero.isCanSend(2502, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2502);
		}
		/**
		 * 领取宝箱奖励返回
		 * @param state 状态，0：奖励不存在，1：成功，2：未达到条件，3：不可重复领取
		 * @param bxAwardId 宝箱id返回
		**/
		public static void sendCmd_2504(long hid  ,  int  state  ,   int  bxAwardId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,bxAwardId};
			if(!hero.isCanSend(2504, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2504);
		}
		/**
		 * 在线推送获奖公告
		 * @param awardNoticeList 获奖公告列表
		**/
		public static void sendCmd_2508(long hid  ,   Object[]  awardNoticeList ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{awardNoticeList};
			if(!hero.isCanSend(2508, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2508);
		}
}