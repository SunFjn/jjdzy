package com.teamtop.system.crossTrial;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * CrossTrialSender.java
 * 跨服试炼
 */
public class CrossTrialSender{
		/**
		 * 返回界面信息
		 * @param floor 当前层
		 * @param passFloor 已通关层
		 * @param historyFloor 历史最高层
		 * @param trialPoint 试炼点
		 * @param chestNum 已领宝箱数量
		 * @param enemyData 对手数据
		 * @param buffData buff数据
		 * @param myBuff 自身buff数据
		**/
		public static void sendCmd_10472(long hid  ,   int  floor  ,   int  passFloor  ,   int  historyFloor  ,   int  trialPoint  ,  int  chestNum  ,   Object[]  enemyData  ,   Object[]  buffData  ,   Object[]  myBuff ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{floor,passFloor,historyFloor,trialPoint,chestNum,enemyData,buffData,myBuff};
			if(!hero.isCanSend(10472, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10472);
		}
		/**
		 * 挑战结果返回
		 * @param rtnCode 结果：0：失败，1：成功
		 * @param id 失败：（1:不是战斗层，2:已达最高层，3:已通关，4:数据重置中），成功：挑战玩家id
		**/
		public static void sendCmd_10474(long hid  ,  int  rtnCode  ,   long  id ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,id};
			if(!hero.isCanSend(10474, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10474);
		}
		/**
		 * 战斗结束返回
		 * @param result 战斗结果：0：失败，1：胜利
		 * @param rewardData 通关奖励
		**/
		public static void sendCmd_10476(long hid  ,  int  result  ,   Object[]  rewardData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{result,rewardData};
			if(!hero.isCanSend(10476, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10476);
		}
		/**
		 * 选择buff操作结果
		 * @param rtnCode 操作结果：0：失败，1：成功
		 * @param buffTypes buff数据
		**/
		public static void sendCmd_10478(long hid  ,  int  rtnCode  ,   Object[]  buffTypes ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,buffTypes};
			if(!hero.isCanSend(10478, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10478);
		}
		/**
		 * 领取宝箱奖励结果
		 * @param rtnCode 结果：0：失败，1：成功
		 * @param chestNum 失败：（），成功：已领取宝箱数据量
		 * @param rewardData 宝箱物品
		**/
		public static void sendCmd_10480(long hid  ,  int  rtnCode  ,  int  chestNum  ,   Object[]  rewardData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,chestNum,rewardData};
			if(!hero.isCanSend(10480, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10480);
		}
		/**
		 * 下一关结果
		 * @param rtnCode 结果：0：失败，1：成功
		 * @param type 失败（1：已达最高层）
		**/
		public static void sendCmd_10482(long hid  ,  int  rtnCode  ,  int  type ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,type};
			if(!hero.isCanSend(10482, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10482);
		}
		/**
		 * 扫荡结果返回
		 * @param rewardData 通关奖励
		**/
		public static void sendCmd_10484(long hid  ,   Object[]  rewardData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rewardData};
			if(!hero.isCanSend(10484, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10484);
		}
}