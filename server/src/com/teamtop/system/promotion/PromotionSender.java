package com.teamtop.system.promotion;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * PromotionSender.java
 * 晋升
 */
public class PromotionSender{
		/**
		 * 晋升界面数据
		 * @param level 等级
		 * @param exp 积累经验
		 * @param createJob 初始职业
		 * @param levelRewardData 已领取的晋升奖励数据
		 * @param taskData 任务数据
		**/
		public static void sendCmd_2022(long hid  ,  int  level  ,   int  exp  ,  int  createJob  ,   Object[]  levelRewardData  ,   Object[]  taskData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{level,exp,createJob,levelRewardData,taskData};
			if(!hero.isCanSend(2022, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2022);
		}
		/**
		 * 领取晋升奖励结果
		 * @param rtnCode 0：失败，1：成功
		 * @param level 失败：错误码，成功：成功的等级
		**/
		public static void sendCmd_2024(long hid  ,  int  rtnCode  ,  int  level ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,level};
			if(!hero.isCanSend(2024, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2024);
		}
		/**
		 * 领取结果
		 * @param rtnCode 0：失败，1：成功
		 * @param taskId 失败：错误码（1：非进行中任务，2:未达完成条件，3:已领取），成功：领取的任务id
		 * @param nextId 新任务id
		 * @param progress 任务进度
		 * @param level 等级
		 * @param exp 经验
		**/
		public static void sendCmd_2026(long hid  ,  int  rtnCode  ,   int  taskId  ,   int  nextId  ,   int  progress  ,  int  level  ,   int  exp ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,taskId,nextId,progress,level,exp};
			if(!hero.isCanSend(2026, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2026);
		}
		/**
		 * 激活结果
		 * @param rtnCode 0：失败，1：成功
		 * @param level 失败：（1：已达最大等级，2：经验不足），成功：等级
		**/
		public static void sendCmd_2028(long hid  ,  int  rtnCode  ,  int  level ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,level};
			if(!hero.isCanSend(2028, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2028);
		}
}