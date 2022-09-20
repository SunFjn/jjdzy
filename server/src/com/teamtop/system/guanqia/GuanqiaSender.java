package com.teamtop.system.guanqia;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * GuanqiaSender.java
 * 关卡
 */
public class GuanqiaSender{
		/**
		 * 登陆发送关卡和离线数据
		 * @param curGuanqiaCount 关数
		 * @param monsterCount 小怪第几波
		 * @param coin 铜币
		 * @param exp 经验
		 * @param starSoul 星魂
		 * @param equipNum 装备数量
		 * @param toolData 道具数据
		 * @param offlineTime 离线时间
		 * @param bigId 当前大关卡id
		 * @param bigRewardData 已领取通关奖励的大关卡
		**/
		public static void sendCmd_1100(long hid  ,  int  curGuanqiaCount  ,  int  monsterCount  ,   int  coin  ,   int  exp  ,   int  starSoul  ,   int  equipNum  ,   Object[]  toolData  ,   int  offlineTime  ,   int  bigId  ,   Object[]  bigRewardData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{curGuanqiaCount,monsterCount,coin,exp,starSoul,equipNum,toolData,offlineTime,bigId,bigRewardData};
			if(!hero.isCanSend(1100, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1100);
		}
		/**
		 * 前3名排行榜
		 * @param data 前3名排行榜
		 * @param killMonsterNum 当前击杀小怪数量
		 * @param killNumIndex 已领取击杀奖励编号
		 * @param mopUpNum 已扫荡次数
		 * @param totalMopUp 总扫荡次数
		 * @param seekHelpTimes 求助次数
		 * @param helpTimes 帮助次数
		**/
		public static void sendCmd_1104(long hid  ,   Object[]  data  ,   int  killMonsterNum  ,  int  killNumIndex  ,   int  mopUpNum  ,   int  totalMopUp  ,  int  seekHelpTimes  ,  int  helpTimes ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{data,killMonsterNum,killNumIndex,mopUpNum,totalMopUp,seekHelpTimes,helpTimes};
			if(!hero.isCanSend(1104, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1104);
		}
		/**
		 * 掉落和最新关卡数据
		 * @param guanqiaCount 关卡数
		 * @param data 掉落数据
		 * @param golddata 金甲BOSS掉落数据
		**/
		public static void sendCmd_1106(long hid  ,  int  guanqiaCount  ,   Object[]  data  ,   Object[]  golddata ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{guanqiaCount,data,golddata};
			if(!hero.isCanSend(1106, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1106);
		}
		/**
		 * 排行榜
		 * @param myRank 我的排名0为未上榜
		 * @param data 排行数据
		**/
		public static void sendCmd_1108(long hid  ,  int  myRank  ,   Object[]  data ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{myRank,data};
			if(!hero.isCanSend(1108, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1108);
		}
		/**
		 * 小怪掉落
		 * @param data 掉落数据
		 * @param newBo 波数
		**/
		public static void sendCmd_1102(long hid  ,   Object[]  data  ,  int  newBo ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{data,newBo};
			if(!hero.isCanSend(1102, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1102);
		}
		/**
		 * 扫荡结果
		 * @param rtnCode 扫荡结果0：失败；1成功
		 * @param guanqiaId 失败：错误码；成功：关卡id
		 * @param rewardData 奖励
		**/
		public static void sendCmd_1110(long hid  ,  int  rtnCode  ,   int  guanqiaId  ,   Object[]  rewardData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,guanqiaId,rewardData};
			if(!hero.isCanSend(1110, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1110);
		}
		/**
		 * 领取斩杀奖励结果
		 * @param rtnCode 结果：0：失败；1：成功
		 * @param killNumIndex 失败：错误码(1:数量未达标无法领取，2：通关数不满足领取条件)；成功：领取的奖励编号
		 * @param leftKillNum 剩余斩杀数
		**/
		public static void sendCmd_1112(long hid  ,  int  rtnCode  ,   int  killNumIndex  ,   int  leftKillNum ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,killNumIndex,leftKillNum};
			if(!hero.isCanSend(1112, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1112);
		}
		/**
		 * 请求挑战关卡Boss
		 * @param rtnCode 0:请求失败；1：请求成功
		 * @param curGuanka 失败：错误码(1:波数未达标，2:背包格子不足，3：请先前往下一关)；成功：关卡id
		 * @param result 服务端战斗结果：0：失败；1：胜利
		 * @param hasGoldMonster 是否有金甲怪物:0无 1有
		**/
		public static void sendCmd_1114(long hid  ,  int  rtnCode  ,   int  curGuanka  ,  int  result  ,  int  hasGoldMonster ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,curGuanka,result,hasGoldMonster};
			if(!hero.isCanSend(1114, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1114);
		}
		/**
		 * 领取大关卡通关奖励结果
		 * @param rtnCode 结果：0：失败，1：成功
		 * @param bigId 失败：（1:未通关，2：已领取，3:背包满）；成功：领取的大关卡id
		**/
		public static void sendCmd_1116(long hid  ,  int  rtnCode  ,   int  bigId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,bigId};
			if(!hero.isCanSend(1116, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1116);
		}
		/**
		 * 前往下一个大关卡
		 * @param rtnCode 结果：0：失败，1：成功
		 * @param bigId 失败：1：未通关，2：已达最高关卡；成功：大关卡id
		**/
		public static void sendCmd_1118(long hid  ,  int  rtnCode  ,   int  bigId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,bigId};
			if(!hero.isCanSend(1118, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1118);
		}
}