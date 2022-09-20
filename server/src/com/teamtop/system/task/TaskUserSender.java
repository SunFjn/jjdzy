package com.teamtop.system.task;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * TaskUserSender.java
 * 任务
 */
public class TaskUserSender{
		/**
		 * GC 当前任务状态
		 * @param taskId 任务id
		 * @param state 任务状态0未完成1完成可领2完成已领
		 * @param canNum 参数2
		**/
		public static void sendCmd_2550(long hid  ,   int  taskId  ,  int  state  ,   int  canNum ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{taskId,state,canNum};
			if(!hero.isCanSend(2550, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2550);
		}
		/**
		 * GC 任务领取奖励
		 * @param rest 0成功 1失败
		 * @param index 当前任务编号
		 * @param sate 任务状态012
		 * @param canNum 任务参数
		**/
		public static void sendCmd_2552(long hid  ,  int  rest  ,   int  index  ,  int  sate  ,   int  canNum ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,index,sate,canNum};
			if(!hero.isCanSend(2552, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2552);
		}
}