package com.teamtop.system.activity.ativitys.happyQMboss;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * HappyQMbossSender.java
 * 全民狂欢—全民boss
 */
public class HappyQMbossSender{
		/**
		 * GC 打开ui信息
		 * @param rewards 
		 * @param num 完成度
		**/
		public static void sendCmd_2572(long hid  ,   Object[]  rewards  ,   int  num ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rewards,num};
			if(!hero.isCanSend(2572, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2572);
		}
		/**
		 * GC 奖励变化返回
		 * @param index 奖励编号
		 * @param state 奖励状态
		 * @param num 完成度
		**/
		public static void sendCmd_2574(long hid  ,  int  index  ,  int  state  ,   int  num ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{index,state,num};
			if(!hero.isCanSend(2574, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2574);
		}
}