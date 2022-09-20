package com.teamtop.system.activity.ativitys.godGenDiscount;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * GodGenDiscountSender.java
 * 神将折扣
 */
public class GodGenDiscountSender{
		/**
		 * 打开界面返回
		 * @param times 寻宝次数
		**/
		public static void sendCmd_9460(long hid  ,   int  times ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{times};
			if(!hero.isCanSend(9460, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 9460);
		}
}