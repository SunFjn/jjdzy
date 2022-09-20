package com.teamtop.system.godOfWar;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * GodOfWarSender.java
 * 三国战神
 */
public class GodOfWarSender{
		/**
		 * 界面数据返回
		 * @param rivalData 对手数据
		 * @param myRanking 我的排名
		 * @param topRanking 最高排名
		 * @param chaNum 剩余挑战次数
		 * @param cdTime 剩余冷却时间
		 * @param leftBuyNum 剩余购买挑战次数
		**/
		public static void sendCmd_1402(long hid  ,   Object[]  rivalData  ,   int  myRanking  ,   int  topRanking  ,   int  chaNum  ,   int  cdTime  ,   int  leftBuyNum ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rivalData,myRanking,topRanking,chaNum,cdTime,leftBuyNum};
			if(!hero.isCanSend(1402, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1402);
		}
		/**
		 * 购买结果返回
		 * @param rtnCode 0：失败，1：成功
		 * @param chaNum 失败：错误码（1：积累挑战次数满，2：达今日购买上限，3：元宝不足），成功：剩余挑战次数
		 * @param cdTime 剩余冷却时间
		 * @param leftBuyNum 剩余购买次数
		**/
		public static void sendCmd_1404(long hid  ,  int  rtnCode  ,   int  chaNum  ,   int  cdTime  ,   int  leftBuyNum ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,chaNum,cdTime,leftBuyNum};
			if(!hero.isCanSend(1404, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1404);
		}
		/**
		 * 刷新对手
		 * @param rivalData 对手数据
		**/
		public static void sendCmd_1406(long hid  ,   Object[]  rivalData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rivalData};
			if(!hero.isCanSend(1406, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1406);
		}
		/**
		 * 请求挑战结果
		 * @param rtnCode 0：失败， 1：成功
		 * @param beChaId 失败：错误码（1：前10才能挑战前3，2：没有挑战次数，3：对方在战斗中暂时不可挑战，4：自身被挑战中不可挑战，5：排行变化刷新），成功：被挑战玩家ID
		 * @param robotId 机器人id
		 * @param chaNum 剩余挑战次数
		 * @param cdTime 冷却时间
		 * @param result 战斗结果0：失败，1：成功，2：前端判定
		**/
		public static void sendCmd_1408(long hid  ,  int  rtnCode  ,   long  beChaId  ,   int  robotId  ,   int  chaNum  ,   int  cdTime  ,  int  result ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,beChaId,robotId,chaNum,cdTime,result};
			if(!hero.isCanSend(1408, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1408);
		}
		/**
		 * 扫荡结果
		 * @param rtnCode 0：失败，1：成功
		 * @param chaNum 失败：错误码（1:不能扫荡自己，2：没有挑战次数，3：只能扫荡排行低于自己的），成功：剩余挑战次数
		 * @param cdTime 冷却时间
		**/
		public static void sendCmd_1412(long hid  ,  int  rtnCode  ,   int  chaNum  ,   int  cdTime ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,chaNum,cdTime};
			if(!hero.isCanSend(1412, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1412);
		}
		/**
		 * 挑战结算结果
		 * @param rtnCode 0：失败，1：成功
		 * @param ranking 当前排名
		 * @param reward 排名晋级奖励
		**/
		public static void sendCmd_1410(long hid  ,  int  rtnCode  ,   int  ranking  ,   Object[]  reward ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,ranking,reward};
			if(!hero.isCanSend(1410, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1410);
		}
		/**
		 * 宝藏数据返回
		 * @param buyData 已购买商品数据
		**/
		public static void sendCmd_1414(long hid  ,   Object[]  buyData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{buyData};
			if(!hero.isCanSend(1414, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1414);
		}
		/**
		 * 购买结果
		 * @param rtnCode 结果：0：失败，1：成功
		 * @param gid 失败：错误码，成功：商品id
		**/
		public static void sendCmd_1416(long hid  ,  int  rtnCode  ,   int  gid ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,gid};
			if(!hero.isCanSend(1416, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1416);
		}
}