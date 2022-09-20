package com.teamtop.system.crossSoloRun;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * SoloRunSender.java
 * 单刀赴会
 */
public class SoloRunSender{
		/**
		 * 返回界面信息
		 * @param grede 段位（为0时活动未开启）
		 * @param score 积分
		 * @param chaNum 挑战次数
		 * @param buyNum 购买次数
		 * @param winNum 胜利次数
		 * @param myRanking 个人排名
		 * @param endTime 活动结束时间
		 * @param dailyAward 已领取的每日奖励
		**/
		public static void sendCmd_1612(long hid  ,   int  grede  ,   int  score  ,   int  chaNum  ,   int  buyNum  ,   int  winNum  ,   int  myRanking  ,   int  endTime  ,   Object[]  dailyAward ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{grede,score,chaNum,buyNum,winNum,myRanking,endTime,dailyAward};
			if(!hero.isCanSend(1612, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1612);
		}
		/**
		 * 领取每日奖励结果
		 * @param rtnCode 0：失败，1：胜利
		 * @param winAwardId 失败：错误码（1:已领取，2：奖励数据不存在），成功：胜利场次奖励项
		**/
		public static void sendCmd_1614(long hid  ,  int  rtnCode  ,  int  winAwardId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,winAwardId};
			if(!hero.isCanSend(1614, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1614);
		}
		/**
		 * 返回排行榜数据
		 * @param type 排行榜类型：1：本服，2：跨服
		 * @param rankData 排行榜数据
		 * @param myRanking 个人排名
		 * @param grade 个人段位
		**/
		public static void sendCmd_1618(long hid  ,  int  type  ,   Object[]  rankData  ,   int  myRanking  ,  int  grade ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{type,rankData,myRanking,grade};
			if(!hero.isCanSend(1618, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1618);
		}
		/**
		 * 购买挑战次数结果
		 * @param rtnCode 0：失败，1：成功
		 * @param chaNum 失败：错误码（1：已达今日最大购买次数，2：元宝不足），成功：挑战次数
		 * @param buyNum 剩余购买次数
		**/
		public static void sendCmd_1620(long hid  ,  int  rtnCode  ,   int  chaNum  ,   int  buyNum ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,chaNum,buyNum};
			if(!hero.isCanSend(1620, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1620);
		}
		/**
		 * 匹配结果
		 * @param rtnCode 0：失败，1：成功
		 * @param enemyId 对手玩家id
		 * @param name 对手名称
		 * @param icon 头像
		 * @param frame 头像框
		 * @param result 战斗结果：0：失败，1：成功，2：前端判断
		**/
		public static void sendCmd_1624(long hid  ,  int  rtnCode  ,   long  enemyId  ,   String  name  ,   int  icon  ,   int  frame  ,  int  result ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,enemyId,name,icon,frame,result};
			if(!hero.isCanSend(1624, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1624);
		}
		/**
		 * 结算结果返回
		 * @param result 0：失败，1：胜利
		 * @param awardData 奖励数据
		 * @param score 当前积分
		 * @param grade 段位
		 * @param ranking 排名
		**/
		public static void sendCmd_1626(long hid  ,  int  result  ,   Object[]  awardData  ,   int  score  ,   int  grade  ,   int  ranking ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{result,awardData,score,grade,ranking};
			if(!hero.isCanSend(1626, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1626);
		}
		/**
		 * 战报返回
		 * @param reportData 战报数据
		**/
		public static void sendCmd_1628(long hid  ,   Object[]  reportData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{reportData};
			if(!hero.isCanSend(1628, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1628);
		}
		/**
		 * 请求匹配结果
		 * @param result 0：成功进入匹配，1：已经在匹配中，2：已无挑战次数
		**/
		public static void sendCmd_1622(long hid  ,  int  result ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{result};
			if(!hero.isCanSend(1622, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1622);
		}
}