package com.teamtop.system.crossHeroesList;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * HeroesListSender.java
 * 群英榜
 */
public class HeroesListSender{
		/**
		 * 群英榜界面数据
		 * @param week 周几
		 * @param myRanking 自己排名
		 * @param score 积分
		 * @param rankData 排行数据
		 * @param scoreId 已领取的积分奖励项id
		**/
		public static void sendCmd_2192(long hid  ,  int  week  ,   int  myRanking  ,   int  score  ,   Object[]  rankData  ,   int  scoreId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{week,myRanking,score,rankData,scoreId};
			if(!hero.isCanSend(2192, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2192);
		}
		/**
		 * 领取积分奖励结果
		 * @param rtnCode 0：失败，1：成功
		 * @param rewardId 失败：错误码，成功：奖励项id
		**/
		public static void sendCmd_2194(long hid  ,  int  rtnCode  ,   int  rewardId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,rewardId};
			if(!hero.isCanSend(2194, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2194);
		}
		/**
		 * 排行榜数据返回
		 * @param myRanking 自己的排名
		 * @param rankData 排行数据
		**/
		public static void sendCmd_2196(long hid  ,   int  myRanking  ,   Object[]  rankData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{myRanking,rankData};
			if(!hero.isCanSend(2196, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2196);
		}
		/**
		 * 打开上期排名界面返回
		 * @param lastRankList 上期排行数据
		 * @param lastMyRank 自己排名,不在榜上为0
		 * @param lastMyScore 积分
		 * @param lastWeek 上一星期几
		**/
		public static void sendCmd_2198(long hid  ,   Object[]  lastRankList  ,   int  lastMyRank  ,   int  lastMyScore  ,  int  lastWeek ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{lastRankList,lastMyRank,lastMyScore,lastWeek};
			if(!hero.isCanSend(2198, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2198);
		}
}