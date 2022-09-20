package com.teamtop.system.activity.ativitys.hefuRechargeBack;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * HeFuRechargeBackSender.java
 * 合服充值返利
 */
public class HeFuRechargeBackSender{
		/**
		 * GC 打开ui返回
		 * @param actid 活动id
		 * @param rechargeNum 充值总金额
		 * @param taskInfos 
		**/
		public static void sendCmd_9520(long hid  ,   int  actid  ,   int  rechargeNum  ,   Object[]  taskInfos ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{actid,rechargeNum,taskInfos};
			if(!hero.isCanSend(9520, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 9520);
		}
		/**
		 * GC 奖励状态发生变化
		 * @param taskid 任务id
		 * @param state 任务状态
		**/
		public static void sendCmd_9522(long hid  ,   int  taskid  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{taskid,state};
			if(!hero.isCanSend(9522, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 9522);
		}
		/**
		 * GC 任务完成数量变化
		 * @param taskid 任务id
		 * @param num 任务数量
		 * @param state 对应奖励变化0 1 2
		**/
		public static void sendCmd_9524(long hid  ,   int  taskid  ,   int  num  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{taskid,num,state};
			if(!hero.isCanSend(9524, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 9524);
		}
}