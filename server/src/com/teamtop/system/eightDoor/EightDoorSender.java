package com.teamtop.system.eightDoor;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * EightDoorSender.java
 * 八门金锁
 */
public class EightDoorSender{
		/**
		 * GC 打开八门金锁活动信息
		 * @param tasksinfo 
		 * @param biggoal 
		 * @param num 充值金额
		**/
		public static void sendCmd_4522(long hid  ,   Object[]  tasksinfo  ,   Object[]  biggoal  ,   int  num ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{tasksinfo,biggoal,num};
			if(!hero.isCanSend(4522, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4522);
		}
		/**
		 * GC 领取任务奖励
		 * @param tid 任务id
		 * @param rest 领取结果0成功 1失败
		**/
		public static void sendCmd_4524(long hid  ,   int  tid  ,  int  rest ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{tid,rest};
			if(!hero.isCanSend(4524, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4524);
		}
		/**
		 * GC 获取大奖结果
		 * @param bigid 目标id
		 * @param rest 领取结果0成功 1失败
		**/
		public static void sendCmd_4526(long hid  ,   int  bigid  ,  int  rest ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{bigid,rest};
			if(!hero.isCanSend(4526, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4526);
		}
		/**
		 * GC 小活动发生变化
		 * @param charge 
		**/
		public static void sendCmd_4528(long hid  ,   Object[]  charge ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{charge};
			if(!hero.isCanSend(4528, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4528);
		}
		/**
		 * GC 大奖状态变化
		 * @param biginfo 
		**/
		public static void sendCmd_4530(long hid  ,   Object[]  biginfo ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{biginfo};
			if(!hero.isCanSend(4530, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4530);
		}
		/**
		 * GC 充值变化
		 * @param num 当前充值额度
		**/
		public static void sendCmd_4532(long hid  ,   int  num ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{num};
			if(!hero.isCanSend(4532, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4532);
		}
		/**
		 * GC 活动情况
		 * @param sysid 系统id
		 * @param time 状态0开启中1结束
		 * @param qs 期数
		 * @param beginTime 开始时间
		 * @param overTime 结束时间
		**/
		public static void sendCmd_4520(long hid  ,   int  sysid  ,  int  time  ,   int  qs  ,   int  beginTime  ,   int  overTime ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{sysid,time,qs,beginTime,overTime};
			if(!hero.isCanSend(4520, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4520);
		}
}