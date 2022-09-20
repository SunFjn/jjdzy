package com.teamtop.system.activity.ativitys.achievementTree;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * AchievementTreeSender.java
 * 新活动-成就树
 */
public class AchievementTreeSender{
		/**
		 * 打开界面返回
		 * @param sendData 任务数据
		 * @param floor 当前成就树层数
		**/
		public static void sendCmd_10570(long hid  ,   Object[]  sendData  ,   int  floor ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{sendData,floor};
			if(!hero.isCanSend(10570, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10570);
		}
		/**
		 * 打开成就树楼层奖励返回
		 * @param sendList 成就树层数奖励
		**/
		public static void sendCmd_10572(long hid  ,   Object[]  sendList ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{sendList};
			if(!hero.isCanSend(10572, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10572);
		}
		/**
		 * 领取奖励返回
		 * @param state 状态 0失败 1成功
		 * @param index 失败(1未达到要求层数 2已领取 3非法参数) 成功的时候返回表的index
		**/
		public static void sendCmd_10574(long hid  ,  int  state  ,   int  index ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,index};
			if(!hero.isCanSend(10574, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10574);
		}
}