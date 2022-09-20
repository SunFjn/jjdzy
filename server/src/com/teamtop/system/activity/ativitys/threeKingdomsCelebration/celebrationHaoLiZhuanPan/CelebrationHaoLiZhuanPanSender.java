package com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationHaoLiZhuanPan;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * CelebrationHaoLiZhuanPanSender.java
 * 三国庆典-豪礼转盘
 */
public class CelebrationHaoLiZhuanPanSender{
		/**
		 * 打开UI
		 * @param dataList 历史记录所有数据
		**/
		public static void sendCmd_4122(long hid  ,   Object[]  dataList ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{dataList};
			if(!hero.isCanSend(4122, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4122);
		}
		/**
		 * 抽奖
		 * @param result 结果  1成功  2系统未开启  3活动未开启  4传入类型不对  5本期奖励没配  6元宝不足  7活动结算中，请稍后再试
		 * @param dataList 抽奖结果
		**/
		public static void sendCmd_4124(long hid  ,  int  result  ,   Object[]  dataList ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{result,dataList};
			if(!hero.isCanSend(4124, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4124);
		}
		/**
		 * 打开排行榜
		 * @param result 结果  1成功
		 * @param dataList 排行榜数据
		 * @param rank 我的排名  0未进排行榜 
		 * @param num 我的抽奖次数
		**/
		public static void sendCmd_4126(long hid  ,  int  result  ,   Object[]  dataList  ,  int  rank  ,   int  num ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{result,dataList,rank,num};
			if(!hero.isCanSend(4126, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4126);
		}
		/**
		 * 打开目标奖励界面
		 * @param awardList 奖励状态列表
		 * @param num 我的抽奖次数
		**/
		public static void sendCmd_4128(long hid  ,   Object[]  awardList  ,   int  num ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{awardList,num};
			if(!hero.isCanSend(4128, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4128);
		}
		/**
		 * 领取目标奖励返回
		 * @param state 领取状态，0:没有该奖励，1:成功，2:未达到条件，3:已领取
		 * @param awardId 领取的奖励id
		**/
		public static void sendCmd_4130(long hid  ,  int  state  ,   int  awardId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,awardId};
			if(!hero.isCanSend(4130, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4130);
		}
}