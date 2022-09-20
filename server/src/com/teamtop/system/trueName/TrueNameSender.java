package com.teamtop.system.trueName;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * TrueNameSender.java
 * 实名验证
 */
public class TrueNameSender{
		/**
		 * 同步实名验证开关状态
		 * @param state 开关状态：0：关闭，1：开启
		 * @param rewardState 奖励领取状态：0：未领取，1：可领取，2：已领取
		**/
		public static void sendCmd_5290(long hid  ,  int  state  ,  int  rewardState ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,rewardState};
			if(!hero.isCanSend(5290, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 5290);
		}
		/**
		 * 领取奖励结果
		 * @param rtnCode 结果：0：失败，1：成功
		 * @param type 失败（1：未实名验证，2：已领取过）
		**/
		public static void sendCmd_5296(long hid  ,  int  rtnCode  ,  int  type ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,type};
			if(!hero.isCanSend(5296, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 5296);
		}
}