package com.teamtop.system.sevenHappy;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * SevenHappySender.java
 * 开服狂欢
 */
public class SevenHappySender{
		/**
		 * GC 打开ui信息
		 * @param rewards 
		**/
		public static void sendCmd_2332(long hid  ,   Object[]  rewards ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rewards};
			if(!hero.isCanSend(2332, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2332);
		}
		/**
		 * GC 奖励发生变化
		 * @param index 奖励序号
		 * @param state 奖励状态
		**/
		public static void sendCmd_2334(long hid  ,   int  index  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{index,state};
			if(!hero.isCanSend(2334, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2334);
		}
		/**
		 * 打开界面返回
		 * @param awardStateList 奖励状态列表
		 * @param endTime 结束时间戳
		**/
		public static void sendCmd_2336(long hid  ,   Object[]  awardStateList  ,   int  endTime ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{awardStateList,endTime};
			if(!hero.isCanSend(2336, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2336);
		}
		/**
		 * 领取奖励返回
		 * @param state 领取状态，0:没有该奖励，1:成功，2:未达到条件，3:已领取，4:已领完
		 * @param awardId 领取的奖励id
		 * @param awardType 奖励类型
		 * @param restNum 剩余数量
		**/
		public static void sendCmd_2338(long hid  ,  int  state  ,   int  awardId  ,  int  awardType  ,   int  restNum ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,awardId,awardType,restNum};
			if(!hero.isCanSend(2338, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2338);
		}
}