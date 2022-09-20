package com.teamtop.system.activity.ativitys.onedayRecharge;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * OnedayRechargeSender.java
 * 单日累值
 */
public class OnedayRechargeSender{
		/**
		 * GC 打开ui信息
		 * @param num 充值数量
		 * @param rewardSate 
		**/
		public static void sendCmd_2522(long hid  ,   int  num  ,   Object[]  rewardSate ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{num,rewardSate};
			if(!hero.isCanSend(2522, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2522);
		}
		/**
		 * GC 获取奖励
		 * @param index 序号
		 * @param state 奖励状态
		**/
		public static void sendCmd_2524(long hid  ,   int  index  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{index,state};
			if(!hero.isCanSend(2524, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2524);
		}
		/**
		 * GC 充值金额变化
		 * @param num 金额变化
		**/
		public static void sendCmd_2526(long hid  ,   int  num ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{num};
			if(!hero.isCanSend(2526, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2526);
		}
}