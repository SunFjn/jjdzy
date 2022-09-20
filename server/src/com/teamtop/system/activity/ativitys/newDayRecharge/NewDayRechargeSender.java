package com.teamtop.system.activity.ativitys.newDayRecharge;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * NewDayRechargeSender.java
 * 新单日累充活动
 */
public class NewDayRechargeSender{
		/**
		 * GC 打开ui信息
		 * @param xq 周几
		 * @param num 今日充值数
		 * @param states 
		**/
		public static void sendCmd_2932(long hid  ,  int  xq  ,   int  num  ,   Object[]  states ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{xq,num,states};
			if(!hero.isCanSend(2932, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2932);
		}
		/**
		 * GC 奖励发生变化
		 * @param num 充值数
		 * @param index 奖励序号
		 * @param state 状态
		**/
		public static void sendCmd_2934(long hid  ,   int  num  ,   int  index  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{num,index,state};
			if(!hero.isCanSend(2934, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2934);
		}
}