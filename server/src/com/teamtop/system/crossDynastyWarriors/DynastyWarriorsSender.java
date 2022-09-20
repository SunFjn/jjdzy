package com.teamtop.system.crossDynastyWarriors;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * DynastyWarriorsSender.java
 * 三国无双
 */
public class DynastyWarriorsSender{
		/**
		 * 返回三国无双界面数据
		 * @param round 当前第几轮
		 * @param state 状态(1：准备中，2：战斗中)
		 * @param leftTime 剩余时间
		 * @param matchData 比赛对阵数据
		 * @param playerData 参赛玩家数据
		 * @param topId 第一名玩家id
		 * @param name 玩家名称
		 * @param icon 头像
		 * @param frame 头像框
		**/
		public static void sendCmd_1832(long hid  ,  int  round  ,  int  state  ,   int  leftTime  ,   Object[]  matchData  ,   Object[]  playerData  ,   long  topId  ,   String  name  ,   int  icon  ,   int  frame ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{round,state,leftTime,matchData,playerData,topId,name,icon,frame};
			if(!hero.isCanSend(1832, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1832);
		}
		/**
		 * 下注结果
		 * @param rtnCode 0：失败，1：成功
		 * @param beBetId 失败：错误码（1：本轮已经下注过，2：准备期才能下注，3：元宝不足），成功：被下注的玩家id
		**/
		public static void sendCmd_1834(long hid  ,  int  rtnCode  ,   long  beBetId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,beBetId};
			if(!hero.isCanSend(1834, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1834);
		}
		/**
		 * 领取奖池奖励结果
		 * @param rtnCode 0：失败，1：成功
		 * @param pondId 失败：错误码（1:未到对应阶段不能领取,2:已经领取过,3:已被全部领取），成功：奖池id
		 * @param getNum 已领数量
		**/
		public static void sendCmd_1838(long hid  ,  int  rtnCode  ,  int  pondId  ,   int  getNum ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,pondId,getNum};
			if(!hero.isCanSend(1838, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1838);
		}
		/**
		 * 奖池界面信息
		 * @param pondData 奖池数据
		**/
		public static void sendCmd_1836(long hid  ,   Object[]  pondData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{pondData};
			if(!hero.isCanSend(1836, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1836);
		}
		/**
		 * 更新抢到最高奖励的玩家
		 * @param pondId 奖池id
		 * @param heroId 玩家id
		 * @param name 玩家名称
		 * @param award 领取数据
		**/
		public static void sendCmd_1840(long hid  ,  int  pondId  ,   long  heroId  ,   String  name  ,   int  award ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{pondId,heroId,name,award};
			if(!hero.isCanSend(1840, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1840);
		}
		/**
		 * 返回录像对战双方战斗数据
		 * @param heroFightDatas 玩家数据
		**/
		public static void sendCmd_1842(long hid  ,   Object[]  heroFightDatas ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{heroFightDatas};
			if(!hero.isCanSend(1842, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1842);
		}
}