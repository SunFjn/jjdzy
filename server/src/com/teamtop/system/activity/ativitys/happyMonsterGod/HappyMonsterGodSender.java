package com.teamtop.system.activity.ativitys.happyMonsterGod;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * HappyMonsterGodSender.java
 * 全民狂欢-魔神吕布
 */
public class HappyMonsterGodSender{
		/**
		 * GC 打开ui信息
		 * @param rewards 
		 * @param num 完成度
		**/
		public static void sendCmd_2592(long hid  ,   Object[]  rewards  ,   int  num ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rewards,num};
			if(!hero.isCanSend(2592, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2592);
		}
		/**
		 * GC 奖励发生变化
		 * @param index 序号
		 * @param state 奖励状态
		 * @param num 完成度
		**/
		public static void sendCmd_2594(long hid  ,  int  index  ,  int  state  ,   int  num ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{index,state,num};
			if(!hero.isCanSend(2594, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2594);
		}
}