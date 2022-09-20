package com.teamtop.system.activity.ativitys.overCallbackYB;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * OverCallbackYBSender.java
 * 超值元宝返利
 */
public class OverCallbackYBSender{
		/**
		 * 打开界面返回
		 * @param awardStateList 奖励状态列表
		 * @param consumeYBNum 消耗元宝数量
		**/
		public static void sendCmd_2450(long hid  ,   Object[]  awardStateList  ,   int  consumeYBNum ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{awardStateList,consumeYBNum};
			if(!hero.isCanSend(2450, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2450);
		}
		/**
		 * 领取奖励返回
		 * @param state 奖励状态，0：奖励不存在，1：成功，2：不可领取，3：重复领取
		 * @param index 索引id
		**/
		public static void sendCmd_2452(long hid  ,  int  state  ,   int  index ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,index};
			if(!hero.isCanSend(2452, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2452);
		}
}