package com.teamtop.system.activity.ativitys.magicDiscount;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * MagicDiscountSender.java
 * 神兵折扣(活动)
 */
public class MagicDiscountSender{
		/**
		 * 打开神兵折扣界面返回
		 * @param num 活动期间打造次数
		**/
		public static void sendCmd_8742(long hid  ,   int  num ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{num};
			if(!hero.isCanSend(8742, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8742);
		}
}