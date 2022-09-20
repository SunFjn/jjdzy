package com.teamtop.system.openDaysSystem.otherNewOneRecharge;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * OtherNewOneRechargeSender.java
 * 新单笔充值（8~28）
 */
public class OtherNewOneRechargeSender{
		/**
		 * GC 打开ui信息
		 * @param week 周几
		 * @param rewards 领取数据
		**/
		public static void sendCmd_4650(long hid  ,  int  week  ,   Object[]  rewards ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{week,rewards};
			if(!hero.isCanSend(4650, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4650);
		}
		/**
		 * 奖励发生变化
		 * @param index 序号
		 * @param canCt 可领取次数
		 * @param hasCt 已领取次数
		**/
		public static void sendCmd_4652(long hid  ,   int  index  ,  int  canCt  ,  int  hasCt ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{index,canCt,hasCt};
			if(!hero.isCanSend(4652, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4652);
		}
}