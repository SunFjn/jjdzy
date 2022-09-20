package com.teamtop.system.activity.ativitys.dailyFirstRecharge;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.HeroCache;
/**
 * DailyFirstRechargeSender.java
 * 每日首充
 */
public class DailyFirstRechargeSender{
		/**
		 * 每日首冲打开界面返回
		 * @param gettedBaoXiangList 宝箱状态列表
		 * @param canGetBaoXiang 累计天数
		 * @param state 每日首充奖励领取状态，0：未充值，1：可领取，2：已领取
		**/
		public static void sendCmd_1930(long hid  ,   Object[]  gettedBaoXiangList  ,  int  canGetBaoXiang  ,  int  state ){
			NettyWrite.writeData(HeroCache.getHero(hid).getChannel() , new Object[]{gettedBaoXiangList,canGetBaoXiang,state},1930);
		}
		/**
		 * 领取宝箱奖励返回
		 * @param state 状态，1：成功，2：宝箱不存在，3：累计天数不满足，4：不能重复领取
		 * @param baoxiangId 领取的宝箱id，成功时才返回
		**/
		public static void sendCmd_1932(long hid  ,  int  state  ,  int  baoxiangId ){
			NettyWrite.writeData(HeroCache.getHero(hid).getChannel() , new Object[]{state,baoxiangId},1932);
		}
		/**
		 * 领取每日首充奖励返回
		 * @param state 状态，0：首充没达成，不能领取，1：成功，4：不能重复领取
		**/
		public static void sendCmd_1934(long hid  ,  int  state ){
			NettyWrite.writeData(HeroCache.getHero(hid).getChannel() , new Object[]{state},1934);
		}
}