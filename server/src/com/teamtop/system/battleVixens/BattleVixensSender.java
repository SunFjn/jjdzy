package com.teamtop.system.battleVixens;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * BattleVixensSender.java
 * 一骑当千
 */
public class BattleVixensSender{
		/**
		 * 打开界面数据返回
		 * @param hardType 开通的难度
		 * @param maxPassId 最高通关编号
		 * @param passData 通关信息
		 * @param leftCha 剩余挑战次数
		 * @param buyNum 已购买挑战次数
		**/
		public static void sendCmd_1282(long hid  ,  int  hardType  ,   int  maxPassId  ,   Object[]  passData  ,   int  leftCha  ,   int  buyNum ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{hardType,maxPassId,passData,leftCha,buyNum};
			if(!hero.isCanSend(1282, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1282);
		}
		/**
		 * 挑战数据返回
		 * @param nextId 下一关编号
		 * @param result 战斗结果（0：失败，1：胜利；2：以前端为准; 3：完成本难度最高波数，4：当前波失败）
		**/
		public static void sendCmd_1286(long hid  ,   int  nextId  ,  int  result ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{nextId,result};
			if(!hero.isCanSend(1286, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1286);
		}
		/**
		 * 购买挑战次数结果
		 * @param rtnCode 0：失败，1：成功
		 * @param leftCha 失败：错误码(1：已达当天购买上限，2：元宝不足)，成功：剩余挑战次数
		 * @param buyNum 已购买挑战次数
		**/
		public static void sendCmd_1288(long hid  ,  int  rtnCode  ,   int  leftCha  ,   int  buyNum ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,leftCha,buyNum};
			if(!hero.isCanSend(1288, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1288);
		}
		/**
		 * 领取奖励结果
		 * @param rtnCode 0：失败，1：成功
		 * @param insId 失败：错误码（1：未通关不能领取），成功：领取关编号
		**/
		public static void sendCmd_1290(long hid  ,  int  rtnCode  ,   int  insId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,insId};
			if(!hero.isCanSend(1290, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1290);
		}
		/**
		 * 请求挑战结果
		 * @param errCode 0：成功，1：难度未开启，2：无挑战次数）
		**/
		public static void sendCmd_1284(long hid  ,  int  errCode ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{errCode};
			if(!hero.isCanSend(1284, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1284);
		}
		/**
		 * 排行榜数据返回
		 * @param rankingList 排行榜
		**/
		public static void sendCmd_1292(long hid  ,   Object[]  rankingList ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rankingList};
			if(!hero.isCanSend(1292, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1292);
		}
}