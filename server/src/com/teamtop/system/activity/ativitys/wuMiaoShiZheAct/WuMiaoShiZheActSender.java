package com.teamtop.system.activity.ativitys.wuMiaoShiZheAct;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * WuMiaoShiZheActSender.java
 * 武庙十哲
 */
public class WuMiaoShiZheActSender{
		/**
		 * 打开界面
		 * @param rankList 排行榜数据
		 * @param myRank 我的排名  0未进排行榜 
		 * @param myScore 我的积分
		**/
		public static void sendCmd_12200(long hid  ,   Object[]  rankList  ,  int  myRank  ,   int  myScore ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rankList,myRank,myScore};
			if(!hero.isCanSend(12200, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 12200);
		}
		/**
		 * 打开目标奖励界面返回
		 * @param awardList 奖励状态列表
		**/
		public static void sendCmd_12202(long hid  ,   Object[]  awardList ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{awardList};
			if(!hero.isCanSend(12202, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 12202);
		}
		/**
		 * 领取目标奖励返回
		 * @param state 领取状态，0:没有该奖励，1:成功，2:未达到条件，3:已领取
		 * @param awardId 领取的奖励id
		**/
		public static void sendCmd_12204(long hid  ,  int  state  ,   int  awardId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,awardId};
			if(!hero.isCanSend(12204, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 12204);
		}
}