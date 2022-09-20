package com.teamtop.system.activity.ativitys.scratchTicket;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * ScratchTicketSender.java
 * 刮刮乐
 */
public class ScratchTicketSender{
		/**
		 * 返回界面信息
		 * @param freeNum 免费次数
		 * @param rewardData 刮卡奖励内容
		 * @param type 获得奖励的道具类型
		 * @param toolId 获得奖励的道具id
		 * @param num 获得奖励的道具数量
		**/
		public static void sendCmd_11790(long hid  ,  int  freeNum  ,   Object[]  rewardData  ,  int  type  ,   int  toolId  ,   int  num ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{freeNum,rewardData,type,toolId,num};
			if(!hero.isCanSend(11790, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11790);
		}
		/**
		 * 抽奖操作结果
		 * @param rtnCode 结果：0：失败，1：成功
		 * @param type 失败：（1:道具不足）
		**/
		public static void sendCmd_11792(long hid  ,  int  rtnCode  ,  int  type ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,type};
			if(!hero.isCanSend(11792, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11792);
		}
		/**
		 * 领取奖励结果
		 * @param rtnCode 结果：0：失败，1：成功
		**/
		public static void sendCmd_11794(long hid  ,  int  rtnCode ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode};
			if(!hero.isCanSend(11794, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11794);
		}
}