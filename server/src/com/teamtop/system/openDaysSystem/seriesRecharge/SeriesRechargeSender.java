package com.teamtop.system.openDaysSystem.seriesRecharge;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * SeriesRechargeSender.java
 * 万兽之王-连充豪礼
 */
public class SeriesRechargeSender{
		/**
		 * 打开界面返回
		 * @param awardList 奖励列表
		 * @param todayRecharge 今日充值金额
		**/
		public static void sendCmd_8800(long hid  ,   Object[]  awardList  ,   int  todayRecharge ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{awardList,todayRecharge};
			if(!hero.isCanSend(8800, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8800);
		}
		/**
		 * 领取奖励返回
		 * @param state 领取状态，0:没有该奖励，1:成功，2:未达到条件，3:已领取
		 * @param id 配置表id
		**/
		public static void sendCmd_8802(long hid  ,  int  state  ,   int  id ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,id};
			if(!hero.isCanSend(8802, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8802);
		}
}