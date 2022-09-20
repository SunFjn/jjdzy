package com.teamtop.system.activity.ativitys.dropRedPacket;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * DropRedPacketSender.java
 * 新活动-天降红包
 */
public class DropRedPacketSender{
		/**
		 * 打开界面返回
		 * @param list 红包列表
		 * @param nextId 下一个系统红包id，配置表id
		 * @param restTimes 今日剩余可抢红包数
		**/
		public static void sendCmd_11370(long hid  ,   Object[]  list  ,   int  nextId  ,   int  restTimes ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{list,nextId,restTimes};
			if(!hero.isCanSend(11370, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11370);
		}
		/**
		 * 发红包界面返回
		 * @param stateList 红包状态列表
		**/
		public static void sendCmd_11372(long hid  ,   Object[]  stateList ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{stateList};
			if(!hero.isCanSend(11372, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11372);
		}
		/**
		 * 发红包返回
		 * @param state 状态：0没有该类型红包，1成功，2未达到条件，3不可重复发
		**/
		public static void sendCmd_11374(long hid  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state};
			if(!hero.isCanSend(11374, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11374);
		}
		/**
		 * 领红包返回
		 * @param state 状态：0领取失败，1成功，2已抢完，3不能重复抢，4今日抢红包次数已达上限
		 * @param redPacket 抢到的红包金额
		 * @param restTimes 今日剩余可抢红包数
		**/
		public static void sendCmd_11376(long hid  ,  int  state  ,   int  redPacket  ,   int  restTimes ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,redPacket,restTimes};
			if(!hero.isCanSend(11376, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11376);
		}
		/**
		 * 打开记录界面返回
		 * @param recordList 红包记录列表
		**/
		public static void sendCmd_11378(long hid  ,   Object[]  recordList ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{recordList};
			if(!hero.isCanSend(11378, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11378);
		}
		/**
		 * 有红包
		**/
		public static void sendCmd_11380(long hid ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = null;
			if(!hero.isCanSend(11380, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11380);
		}
}