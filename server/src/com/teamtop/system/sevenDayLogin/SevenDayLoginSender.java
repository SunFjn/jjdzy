package com.teamtop.system.sevenDayLogin;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * SevenDayLoginSender.java
 * 七日登录
 */
public class SevenDayLoginSender{
		/**
		 * 打开界面
		 * @param object 领取天数列表
		 * @param loginDay 登录天数
		**/
		public static void sendCmd_1902(long hid  ,   Object[]  object  ,  int  loginDay ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{object,loginDay};
			if(!hero.isCanSend(1902, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1902);
		}
		/**
		 * 领取奖励
		 * @param state 领取状态，1：成功，2：领取天数不合法，3：重复领取
		 * @param day 当领取状态为成功时返回领取的天数
		**/
		public static void sendCmd_1904(long hid  ,  int  state  ,  int  day ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,day};
			if(!hero.isCanSend(1904, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1904);
		}
}