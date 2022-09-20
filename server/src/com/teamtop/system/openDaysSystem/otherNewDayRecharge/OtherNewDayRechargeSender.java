package com.teamtop.system.openDaysSystem.otherNewDayRecharge;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * OtherNewDayRechargeSender.java
 * 新单日累充（8~28）
 */
public class OtherNewDayRechargeSender{
		/**
		 * 返回界面信息
		 * @param num 今日累计充值
		 * @param rewardData 奖励数据
		**/
		public static void sendCmd_4690(long hid  ,   int  num  ,   Object[]  rewardData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{num,rewardData};
			if(!hero.isCanSend(4690, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4690);
		}
		/**
		 * 奖励充值发生变化
		 * @param num 充值数据
		 * @param index 序号
		 * @param state 奖励状态
		**/
		public static void sendCmd_4692(long hid  ,   int  num  ,   int  index  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{num,index,state};
			if(!hero.isCanSend(4692, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4692);
		}
}