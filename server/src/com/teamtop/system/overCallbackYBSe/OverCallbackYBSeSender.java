package com.teamtop.system.overCallbackYBSe;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * OverCallbackYBSeSender.java
 * 新元宝返利系统
 */
public class OverCallbackYBSeSender{
		/**
		 * 打开界面数据返回
		 * @param awardStateList 奖励状态列表
		 * @param consumeYBNum 消耗元宝数量
		**/
		public static void sendCmd_3032(long hid  ,   Object[]  awardStateList  ,   int  consumeYBNum ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{awardStateList,consumeYBNum};
			if(!hero.isCanSend(3032, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3032);
		}
		/**
		 * 领取奖励领取奖励返回
		 * @param state 奖励状态，0：奖励不存在，1：成功，2：不可领取，3：重复领取
		 * @param index 索引id
		**/
		public static void sendCmd_3034(long hid  ,  int  state  ,   int  index ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,index};
			if(!hero.isCanSend(3034, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3034);
		}
}