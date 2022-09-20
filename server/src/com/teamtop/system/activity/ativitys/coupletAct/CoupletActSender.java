package com.teamtop.system.activity.ativitys.coupletAct;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * CoupletActSender.java
 * 对对联
 */
public class CoupletActSender{
		/**
		 * 打开界面返回
		 * @param coupletId 对联id
		 * @param list 下联列表
		 * @param coupletTimes 剩余对联次数
		 * @param time 恢复时间
		 * @param trueTimes 正确次数
		 * @param awardList 目标奖励状态列表
		**/
		public static void sendCmd_11320(long hid  ,   int  coupletId  ,   Object[]  list  ,   int  coupletTimes  ,   int  time  ,   int  trueTimes  ,   Object[]  awardList ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{coupletId,list,coupletTimes,time,trueTimes,awardList};
			if(!hero.isCanSend(11320, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11320);
		}
		/**
		 * 下联提交返回
		 * @param state 状态:1：对，2：错，3：提交对联字数错误，4：没次数
		**/
		public static void sendCmd_11322(long hid  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state};
			if(!hero.isCanSend(11322, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11322);
		}
		/**
		 * 打开排行榜返回
		 * @param rankList 排行榜数据
		 * @param myRank 我的排名  0未进排行榜 
		 * @param myTrueTimes 我的正确次数
		**/
		public static void sendCmd_11324(long hid  ,   Object[]  rankList  ,  int  myRank  ,   int  myTrueTimes ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rankList,myRank,myTrueTimes};
			if(!hero.isCanSend(11324, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11324);
		}
		/**
		 * 领取目标奖励返回
		 * @param state 领取状态，0:没有该奖励，1:成功，2:未达到条件，3:已领取
		 * @param awardId 领取的奖励id
		**/
		public static void sendCmd_11326(long hid  ,  int  state  ,   int  awardId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,awardId};
			if(!hero.isCanSend(11326, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11326);
		}
		/**
		 * 推送次数
		 * @param times 次数
		 * @param time 恢复时间
		**/
		public static void sendCmd_11328(long hid  ,   int  times  ,   int  time ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{times,time};
			if(!hero.isCanSend(11328, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11328);
		}
}