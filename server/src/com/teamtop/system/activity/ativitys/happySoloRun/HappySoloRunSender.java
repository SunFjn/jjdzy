package com.teamtop.system.activity.ativitys.happySoloRun;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * HappySoloRunSender.java
 * 全民狂欢-单刀赴会
 */
public class HappySoloRunSender{
		/**
		 * GC 打开ui信息
		 * @param rewards 
		 * @param num 完成度
		**/
		public static void sendCmd_2602(long hid  ,   Object[]  rewards  ,   int  num ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rewards,num};
			if(!hero.isCanSend(2602, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2602);
		}
		/**
		 * GC 奖励发生变化
		 * @param index 序号
		 * @param state 状态
		 * @param num 完成度
		**/
		public static void sendCmd_2604(long hid  ,  int  index  ,  int  state  ,   int  num ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{index,state,num};
			if(!hero.isCanSend(2604, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2604);
		}
}