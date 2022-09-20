package com.teamtop.system.sevenOneRecharge;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * SevenOneRechargeSender.java
 * 7日单笔累充
 */
public class SevenOneRechargeSender{
		/**
		 * GC 打开ui信息
		 * @param rewards 
		**/
		public static void sendCmd_2972(long hid  ,   Object[]  rewards ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rewards};
			if(!hero.isCanSend(2972, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2972);
		}
		/**
		 * GC 奖励发生变化
		 * @param index 奖励序号
		 * @param canCt 可领取次数
		 * @param hasCt 已领取次数
		**/
		public static void sendCmd_2974(long hid  ,   int  index  ,  int  canCt  ,  int  hasCt ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{index,canCt,hasCt};
			if(!hero.isCanSend(2974, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2974);
		}
}