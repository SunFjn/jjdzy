package com.teamtop.system.activity.ativitys.newOneRecharge;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * NewOneReChargeSender.java
 * 活动单笔累充
 */
public class NewOneReChargeSender{
		/**
		 * GC 打开ui信息
		 * @param xq 周几
		 * @param rewards 
		**/
		public static void sendCmd_3002(long hid  ,  int  xq  ,   Object[]  rewards ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{xq,rewards};
			if(!hero.isCanSend(3002, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3002);
		}
		/**
		 * GC 奖励发生变化
		 * @param index 序号
		 * @param canCt 可领取次数
		 * @param hasCt 已领取次数
		**/
		public static void sendCmd_3004(long hid  ,   int  index  ,  int  canCt  ,  int  hasCt ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{index,canCt,hasCt};
			if(!hero.isCanSend(3004, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3004);
		}
}