package com.teamtop.system.country.kingship;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * KingShipSender.java
 * 王位之争
 */
public class KingShipSender{
		/**
		 * 本国挑战匹配信息返回
		 * @param id 玩家id
		 * @param name 玩家姓名
		 * @param icon 头像id
		 * @param frame 头像框id
		 * @param state 匹配结果1:成功，2：没有挑战次数，3：匹配到机器人
		 * @param result 战斗结果只有匹配成功才使用到，0：失败 1：成功 2：前端判断
		**/
		public static void sendCmd_1764(long hid  ,   long  id  ,   String  name  ,   int  icon  ,   int  frame  ,  int  state  ,  int  result ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{id,name,icon,frame,state,result};
			if(!hero.isCanSend(1764, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1764);
		}
		/**
		 * 膜拜返回
		 * @param state 是否膜拜成功0：失败1：成功
		**/
		public static void sendCmd_1766(long hid  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state};
			if(!hero.isCanSend(1766, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1766);
		}
		/**
		 * 打开皇城侍卫界面返回
		 * @param object 皇城侍卫列表
		 * @param restNum 任命剩余名额
		**/
		public static void sendCmd_1768(long hid  ,   Object[]  object  ,  int  restNum ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{object,restNum};
			if(!hero.isCanSend(1768, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1768);
		}
		/**
		 * 任命皇城侍卫返回
		 * @param state 任命是否成功0：成员不存在1：成功2:不能重复任命侍卫3：任命成员过量
		 * @param plyId 玩家id
		**/
		public static void sendCmd_1770(long hid  ,  int  state  ,   long  plyId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,plyId};
			if(!hero.isCanSend(1770, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1770);
		}
		/**
		 * 购买挑战次数返回
		 * @param state 状态码，1：成功，2：元宝不足
		 * @param restChaTimes 剩余挑战次数
		 * @param restBuyTimes 剩余购买次数
		 * @param refreshTime 刷新时间
		**/
		public static void sendCmd_1772(long hid  ,  int  state  ,   int  restChaTimes  ,   int  restBuyTimes  ,   int  refreshTime ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,restChaTimes,restBuyTimes,refreshTime};
			if(!hero.isCanSend(1772, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1772);
		}
		/**
		 * 战斗结果返回
		 * @param result 结果，0：失败，1：胜利
		 * @param object 奖励列表
		**/
		public static void sendCmd_1774(long hid  ,  int  result  ,   Object[]  object ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{result,object};
			if(!hero.isCanSend(1774, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1774);
		}
		/**
		 * 王位之争挑战UI返回
		 * @param objectList 君主、丞相、大将军
		 * @param chaTimes 剩余挑战次数
		 * @param buyCount 剩余购买次数
		 * @param recoverTime 挑战次数恢复时间
		 * @param myOnlyWinTimes 我的净胜场
		 * @param gameEndTime 状态结束时间
		 * @param nameList 只有结束UI才会使用，皇城侍卫
		 * @param state 状态，1：开始UI，2：结束UI
		 * @param bXAwardMap 宝箱状态列表
		 * @param mobaiStatus 膜拜状态，只有结束UI才会使用，是否膜拜，0：没膜拜，1：已膜拜
		 * @param totalNum 打的总场数，用于宝箱展示
		**/
		public static void sendCmd_1762(long hid  ,   Object[]  objectList  ,   int  chaTimes  ,   int  buyCount  ,   int  recoverTime  ,   int  myOnlyWinTimes  ,   int  gameEndTime  ,   Object[]  nameList  ,  int  state  ,   Object[]  bXAwardMap  ,  int  mobaiStatus  ,  int  totalNum ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{objectList,chaTimes,buyCount,recoverTime,myOnlyWinTimes,gameEndTime,nameList,state,bXAwardMap,mobaiStatus,totalNum};
			if(!hero.isCanSend(1762, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1762);
		}
		/**
		 * 领取宝箱奖励返回
		 * @param status 状态，0：奖励不存在，1：成功，2：未达到条件，3：不可重复领取
		 * @param id 宝箱id
		**/
		public static void sendCmd_1776(long hid  ,  int  status  ,  int  id ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{status,id};
			if(!hero.isCanSend(1776, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1776);
		}
}