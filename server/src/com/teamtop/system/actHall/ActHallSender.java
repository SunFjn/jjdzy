package com.teamtop.system.actHall;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * ActHallSender.java
 * 活动大厅
 */
public class ActHallSender{
		/**
		 * 返回活动大厅数据
		 * @param actHallData 活动大厅数据
		**/
		public static void sendCmd_3752(long hid  ,   Object[]  actHallData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{actHallData};
			if(!hero.isCanSend(3752, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3752);
		}
}