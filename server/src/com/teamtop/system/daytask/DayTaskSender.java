package com.teamtop.system.daytask;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * DayTaskSender.java
 * 每日任务
 */
public class DayTaskSender{
		/**
		 * GC 获取每日任务ui
		 * @param activityNum 活跃度
		 * @param tasks 
		 * @param boxs 
		**/
		public static void sendCmd_1052(long hid  ,   int  activityNum  ,   Object[]  tasks  ,   Object[]  boxs ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{activityNum,tasks,boxs};
			if(!hero.isCanSend(1052, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1052);
		}
		/**
		 * CG 
		 * @param activityNum 活跃度
		 * @param taskid 任务id
		 * @param num 完成数
		 * @param state 奖励状态
		**/
		public static void sendCmd_1050(long hid  ,   int  activityNum  ,   int  taskid  ,  int  num  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{activityNum,taskid,num,state};
			if(!hero.isCanSend(1050, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1050);
		}
		/**
		 * GC 获取每日任务奖励
		 * @param rest 0成功 1失败
		 * @param taskid 任务id
		 * @param state 任务奖励转态
		**/
		public static void sendCmd_1054(long hid  ,  int  rest  ,   int  taskid  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,taskid,state};
			if(!hero.isCanSend(1054, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1054);
		}
		/**
		 * GC 获取活跃宝箱返回
		 * @param rest 0成功 1失败
		 * @param boxindex 宝箱index
		 * @param state 转态
		**/
		public static void sendCmd_1056(long hid  ,  int  rest  ,  int  boxindex  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,boxindex,state};
			if(!hero.isCanSend(1056, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1056);
		}
}