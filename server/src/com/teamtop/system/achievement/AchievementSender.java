package com.teamtop.system.achievement;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * AchievementSender.java
 * 成就
 */
public class AchievementSender{
		/**
		 * 打开界面返回
		 * @param sendData 任务数据
		 * @param goalPoint 成就点数
		 * @param goalJie 成就阶数
		**/
		public static void sendCmd_10322(long hid  ,   Object[]  sendData  ,   int  goalPoint  ,   int  goalJie ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{sendData,goalPoint,goalJie};
			if(!hero.isCanSend(10322, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10322);
		}
		/**
		 * 领取成就任务奖励返回
		 * @param state 状态0失败 1成功
		 * @param type 失败(1未完成任务 2已领取 3没有可领取奖励) 成功的时候返回任务类型
		 * @param taskId 任务id
		 * @param getType 领取方式
		 * @param goalPoint 成就点
		 * @param goalJie 成就阶数
		**/
		public static void sendCmd_10324(long hid  ,  int  state  ,  int  type  ,   int  taskId  ,   int  getType  ,   int  goalPoint  ,   int  goalJie ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,type,taskId,getType,goalPoint,goalJie};
			if(!hero.isCanSend(10324, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10324);
		}
		/**
		 * 打开成就奖励返回
		 * @param sendList 成就奖励列表
		**/
		public static void sendCmd_10326(long hid  ,   Object[]  sendList ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{sendList};
			if(!hero.isCanSend(10326, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10326);
		}
		/**
		 * 领取成就奖励返回
		 * @param state 状态0失败 1成功
		 * @param index 失败(1未达到阶数 2已领取 3非法参数)  成功的时候返回表的序号index
		**/
		public static void sendCmd_10328(long hid  ,  int  state  ,   int  index ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,index};
			if(!hero.isCanSend(10328, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10328);
		}
		/**
		 * 成就大师升阶返回
		 * @param state 状态0失败 1成功
		 * @param goalJie 失败(1成就大师已达到最高阶 2成就点不足够升阶) 成功的时候返回升阶后的阶数
		**/
		public static void sendCmd_10330(long hid  ,  int  state  ,   int  goalJie ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,goalJie};
			if(!hero.isCanSend(10330, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10330);
		}
}