package com.teamtop.system.baoWuXianShi;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * BaoWuXianShiSender.java
 * 宝物现世
 */
public class BaoWuXianShiSender{
		/**
		 * 登录发需要用的数据
		 * @param time 下次显示宝物的时间
		 * @param num 今天可挑战次数
		**/
		public static void sendCmd_4000(long hid  ,   int  time  ,  int  num ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{time,num};
			if(!hero.isCanSend(4000, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4000);
		}
		/**
		 * 战斗结束通知
		 * @param result 结果  1成功  2系统未开启  3今日领奖励次数已搭上限  4还在冷却中
		 * @param data 奖励
		**/
		public static void sendCmd_4002(long hid  ,  int  result  ,   Object[]  data ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{result,data};
			if(!hero.isCanSend(4002, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4002);
		}
}