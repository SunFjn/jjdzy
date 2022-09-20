package com.teamtop.system.sevenDayRecharge;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * SevenDayRechargeSender.java
 * 新7日单日累充
 */
public class SevenDayRechargeSender{
		/**
		 * GC 打开ui信息
		 * @param num 今日累计充值
		 * @param rewardstate 
		**/
		public static void sendCmd_2912(long hid  ,   int  num  ,   Object[]  rewardstate ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{num,rewardstate};
			if(!hero.isCanSend(2912, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2912);
		}
		/**
		 * GC 奖励充值发生变化
		 * @param num 充值数据
		 * @param index 序号
		 * @param state 奖励状态
		**/
		public static void sendCmd_2914(long hid  ,   int  num  ,   int  index  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{num,index,state};
			if(!hero.isCanSend(2914, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2914);
		}
}