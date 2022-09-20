package com.teamtop.system.activity.ativitys.wuJiangGoal;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * WuJiangGoalSender.java
 * 限定武将(活动)
 */
public class WuJiangGoalSender{
		/**
		 * 打开界面返回
		 * @param rwzTaskData 任务分组数据
		 * @param activityNum 活跃度
		 * @param rewardboxs 宝箱数据
		**/
		public static void sendCmd_8720(long hid  ,   Object[]  rwzTaskData  ,   int  activityNum  ,   Object[]  rewardboxs ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rwzTaskData,activityNum,rewardboxs};
			if(!hero.isCanSend(8720, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8720);
		}
		/**
		 * 领取奖励返回
		 * @param state 结果0成功 1失败
		 * @param type 失败(1没完成任务 2已领取) 成功：任务类型
		 * @param taskId 任务id
		 * @param activityNum 活跃度
		**/
		public static void sendCmd_8722(long hid  ,  int  state  ,  int  type  ,   int  taskId  ,   int  activityNum ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,type,taskId,activityNum};
			if(!hero.isCanSend(8722, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8722);
		}
		/**
		 * 领取活跃宝箱奖励返回
		 * @param state 状态0成功 1失败
		 * @param boxid 宝箱id
		 * @param boxState 状态0未领取 1可领取 2已领取
		**/
		public static void sendCmd_8724(long hid  ,  int  state  ,  int  boxid  ,  int  boxState ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,boxid,boxState};
			if(!hero.isCanSend(8724, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8724);
		}
}