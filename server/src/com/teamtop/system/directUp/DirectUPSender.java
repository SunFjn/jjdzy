package com.teamtop.system.directUp;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * DirectUPSender.java
 * 直升一阶丹
 */
public class DirectUPSender{
		/**
		 * 升阶返回
		 * @param status 升级状态，0:系统未开启，1:成功，2:直升丹数量不足，3:参数错误，4:超过最大等级错误
		 * @param type 系统类型
		**/
		public static void sendCmd_3742(long hid  ,  int  status  ,  int  type ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{status,type};
			if(!hero.isCanSend(3742, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3742);
		}
}