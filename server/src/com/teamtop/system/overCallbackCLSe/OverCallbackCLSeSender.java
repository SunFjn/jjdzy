package com.teamtop.system.overCallbackCLSe;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * OverCallbackCLSeSender.java
 * 新材料返利系统
 */
public class OverCallbackCLSeSender{
		/**
		 * 打开界面返回
		 * @param awardStateList 奖励状态列表
		 * @param consumeNum 消耗材料个数
		**/
		public static void sendCmd_2952(long hid  ,   Object[]  awardStateList  ,   int  consumeNum ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{awardStateList,consumeNum};
			if(!hero.isCanSend(2952, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2952);
		}
		/**
		 * 领取奖励返回
		 * @param state 奖励状态，0：奖励不存在，1：成功，2：不可领取，3：重复领取
		 * @param index 索引id
		**/
		public static void sendCmd_2954(long hid  ,  int  state  ,   int  index ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,index};
			if(!hero.isCanSend(2954, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2954);
		}
}