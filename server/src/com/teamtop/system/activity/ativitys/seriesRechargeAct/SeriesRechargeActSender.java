package com.teamtop.system.activity.ativitys.seriesRechargeAct;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * SeriesRechargeActSender.java
 * 新活动-连续充值
 */
public class SeriesRechargeActSender{
		/**
		 * 打开界面返回
		 * @param awardList 奖励列表
		 * @param todayRecharge 今日充值金额
		**/
		public static void sendCmd_10200(long hid  ,   Object[]  awardList  ,   int  todayRecharge ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{awardList,todayRecharge};
			if(!hero.isCanSend(10200, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10200);
		}
		/**
		 * 领取奖励返回
		 * @param state 领取状态，0:没有该奖励，1:成功，2:未达到条件，3:已领取
		 * @param id 配置表id
		**/
		public static void sendCmd_10202(long hid  ,  int  state  ,   int  id ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,id};
			if(!hero.isCanSend(10202, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10202);
		}
}