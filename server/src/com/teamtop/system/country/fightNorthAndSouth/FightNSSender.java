package com.teamtop.system.country.fightNorthAndSouth;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * FightNSSender.java
 * 南征北战
 */
public class FightNSSender{
		/**
		 * 南征北战界面信息
		 * @param official 官衔
		 * @param myRanking 个人排名
		 * @param countryRanking 国家排名
		 * @param score 个人积分
		 * @param leftCha 剩余挑战次数
		 * @param leftBuy 剩余购买次数
		 * @param cdTime 冷却时间
		 * @param enemyData 挑战对手数据
		 * @param awardData 已领取积分奖励数据
		**/
		public static void sendCmd_1572(long hid  ,   int  official  ,   int  myRanking  ,  int  countryRanking  ,   int  score  ,   int  leftCha  ,   int  leftBuy  ,   int  cdTime  ,   Object[]  enemyData  ,   Object[]  awardData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{official,myRanking,countryRanking,score,leftCha,leftBuy,cdTime,enemyData,awardData};
			if(!hero.isCanSend(1572, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1572);
		}
		/**
		 * 返回个人排行
		 * @param myRanking 自身排名
		 * @param score 积分
		 * @param rankData 排行数据
		**/
		public static void sendCmd_1574(long hid  ,   int  myRanking  ,   int  score  ,   Object[]  rankData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{myRanking,score,rankData};
			if(!hero.isCanSend(1574, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1574);
		}
		/**
		 * 返回国家排行
		 * @param countryRank 国家排行
		 * @param king 君主名称
		**/
		public static void sendCmd_1576(long hid  ,   Object[]  countryRank  ,   String  king ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{countryRank,king};
			if(!hero.isCanSend(1576, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1576);
		}
		/**
		 * 购买结果返回
		 * @param rtnCode 0：失败，1：成功
		 * @param leftCha 失败：错误码，成功：剩余挑战次数
		 * @param leftBuy 剩余购买次数
		 * @param cdTime 冷却时间
		**/
		public static void sendCmd_1578(long hid  ,  int  rtnCode  ,   int  leftCha  ,   int  leftBuy  ,   int  cdTime ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,leftCha,leftBuy,cdTime};
			if(!hero.isCanSend(1578, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1578);
		}
		/**
		 * 请求挑战结果
		 * @param rtnCode 0：失败，1：成功
		 * @param beChaId 被挑战者Id
		 * @param result 战斗结果：0：失败，1：成功，2：前端判断
		 * @param leftCha 剩余挑战次数
		 * @param cdTime 冷却时间
		 * @param robot 是否机器人 0：否，1：是
		**/
		public static void sendCmd_1580(long hid  ,  int  rtnCode  ,   long  beChaId  ,  int  result  ,   int  leftCha  ,   int  cdTime  ,  int  robot ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,beChaId,result,leftCha,cdTime,robot};
			if(!hero.isCanSend(1580, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1580);
		}
		/**
		 * 领取结果
		 * @param rtnCode 0：失败，1：成功
		 * @param score 失败：错误码，成功：积分奖励项
		**/
		public static void sendCmd_1584(long hid  ,  int  rtnCode  ,   int  score ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,score};
			if(!hero.isCanSend(1584, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1584);
		}
		/**
		 * 刷新对手
		 * @param rivaleData 对手数据
		**/
		public static void sendCmd_1586(long hid  ,   Object[]  rivaleData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rivaleData};
			if(!hero.isCanSend(1586, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1586);
		}
		/**
		 * 更新剩余挑战次数
		 * @param leftCha 剩余挑战次数
		 * @param cdTime 冷却时间
		**/
		public static void sendCmd_1590(long hid  ,   int  leftCha  ,   int  cdTime ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{leftCha,cdTime};
			if(!hero.isCanSend(1590, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1590);
		}
		/**
		 * 扫荡结果
		 * @param rtnCode 0：失败，1：成功
		 * @param leftCha 失败：错误码， 成功：剩余挑战次数
		 * @param cdTime 冷却时间
		 * @param score 积分
		 * @param myRank 个人排行
		 * @param awardData 奖励数据
		**/
		public static void sendCmd_1588(long hid  ,  int  rtnCode  ,   int  leftCha  ,   int  cdTime  ,   int  score  ,  int  myRank  ,   Object[]  awardData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,leftCha,cdTime,score,myRank,awardData};
			if(!hero.isCanSend(1588, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1588);
		}
		/**
		 * 战斗结果
		 * @param result 结果：0：失败，1：胜利
		 * @param score 积分
		 * @param myRank 个人排行
		 * @param awardData 奖励数据
		**/
		public static void sendCmd_1582(long hid  ,  int  result  ,   int  score  ,   int  myRank  ,   Object[]  awardData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{result,score,myRank,awardData};
			if(!hero.isCanSend(1582, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1582);
		}
		/**
		 * 提示
		 * @param tipsId 提示类型（1：周结算中不可操作）
		**/
		public static void sendCmd_1570(long hid  ,  int  tipsId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{tipsId};
			if(!hero.isCanSend(1570, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1570);
		}
}