package com.teamtop.system.peacockFloor;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * PeacockFloorSender.java
 * 铜雀台
 */
public class PeacockFloorSender{
		/**
		 * GC 打开铜雀台ui
		 * @param floor 当前层数（已通过）
		 * @param maxNum 最高层
		 * @param maxname 最高层姓名
		 * @param maxHead 最高层头像
		 * @param maxFrame 最高层头像框
		 * @param rewardfloor 
		**/
		public static void sendCmd_1222(long hid  ,   int  floor  ,   int  maxNum  ,   String  maxname  ,   int  maxHead  ,   int  maxFrame  ,   Object[]  rewardfloor ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{floor,maxNum,maxname,maxHead,maxFrame,rewardfloor};
			if(!hero.isCanSend(1222, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1222);
		}
		/**
		 * GC 通过人数
		 * @param floorid 关卡id
		 * @param num 通过人数
		**/
		public static void sendCmd_1224(long hid  ,   int  floorid  ,  int  num ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{floorid,num};
			if(!hero.isCanSend(1224, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1224);
		}
		/**
		 * GC 获取某关卡双倍奖励
		 * @param rest 0成功 1失败
		 * @param floornum 关卡数
		**/
		public static void sendCmd_1226(long hid  ,  int  rest  ,   int  floornum ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,floornum};
			if(!hero.isCanSend(1226, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1226);
		}
		/**
		 * GC 爬塔返回
		 * @param rest 0成功 1失败 2背包已满
		 * @param gid 当前击败关卡id
		 * @param battlerest 战斗结果 0:失败，1：成功，2：由前端结果决定
		**/
		public static void sendCmd_1228(long hid  ,  int  rest  ,   int  gid  ,  int  battlerest ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,gid,battlerest};
			if(!hero.isCanSend(1228, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1228);
		}
		/**
		 * GC boss掉落
		 * @param id 铜雀台关卡id
		 * @param items 
		**/
		public static void sendCmd_1230(long hid  ,   int  id  ,   Object[]  items ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{id,items};
			if(!hero.isCanSend(1230, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1230);
		}
}