package com.teamtop.system.openDaysSystem.otherOverCallbackYBSe;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * OtherOverCallbackYBSeSender.java
 * 超值元宝返利
 */
public class OtherOverCallbackYBSeSender{
		/**
		 * 打开界面数据返回
		 * @param awardStateList 奖励状态列表
		 * @param consumeYBNum 消耗元宝数量
		**/
		public static void sendCmd_4790(long hid  ,   Object[]  awardStateList  ,   int  consumeYBNum ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{awardStateList,consumeYBNum};
			if(!hero.isCanSend(4790, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4790);
		}
		/**
		 * 领取奖励返回
		 * @param state 奖励状态，0：奖励不存在，1：成功，2：不可领取，3：重复领取
		 * @param index 索引id
		**/
		public static void sendCmd_4792(long hid  ,  int  state  ,   int  index ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,index};
			if(!hero.isCanSend(4792, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4792);
		}
}