package com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationJiJin;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * CelebrationJiJinSender.java
 * 三国庆典-基金
 */
public class CelebrationJiJinSender{
		/**
		 * 打开UI
		 * @param state 购买状态  0未卖  1已买
		 * @param day 已登录天数
		 * @param awardsState 所有数据
		**/
		public static void sendCmd_4082(long hid  ,  int  state  ,  int  day  ,   Object[]  awardsState ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,day,awardsState};
			if(!hero.isCanSend(4082, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4082);
		}
		/**
		 * 领取奖励
		 * @param result 结果  1成功
		**/
		public static void sendCmd_4084(long hid  ,  int  result ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{result};
			if(!hero.isCanSend(4084, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4084);
		}
}