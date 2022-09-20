package com.teamtop.system.activity.ativitys.dial;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * DialSender.java
 * 充值转盘(活动)
 */
public class DialSender{
		/**
		 * 打开界面
		 * @param totalRecharge 当前充值数
		 * @param turnNum 已转次数
		 * @param canTurnNum 可抽次数
		 * @param rewardList 转盘数据
		**/
		public static void sendCmd_8492(long hid  ,   int  totalRecharge  ,   int  turnNum  ,   int  canTurnNum  ,   Object[]  rewardList ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{totalRecharge,turnNum,canTurnNum,rewardList};
			if(!hero.isCanSend(8492, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8492);
		}
		/**
		 * 转盘抽奖
		 * @param state1 结果 0失败 1成功
		 * @param state2 失败1没次数 2全部抽完
		**/
		public static void sendCmd_8494(long hid  ,  int  state1  ,   int  state2 ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state1,state2};
			if(!hero.isCanSend(8494, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8494);
		}
}