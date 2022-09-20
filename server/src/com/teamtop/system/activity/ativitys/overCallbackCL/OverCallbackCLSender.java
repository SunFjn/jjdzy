package com.teamtop.system.activity.ativitys.overCallbackCL;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * OverCallbackCLSender.java
 * 超值材料返利
 */
public class OverCallbackCLSender{
		/**
		 * 打开界面返回
		 * @param awardStateList 奖励状态列表
		 * @param consumeNum 消耗材料个数
		**/
		public static void sendCmd_2430(long hid  ,   Object[]  awardStateList  ,   int  consumeNum ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{awardStateList,consumeNum};
			if(!hero.isCanSend(2430, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2430);
		}
		/**
		 * 领取奖励返回
		 * @param state 奖励状态，0：奖励不存在，1：成功，2：不可领取，3：重复领取
		 * @param index 索引id
		**/
		public static void sendCmd_2432(long hid  ,  int  state  ,   int  index ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,index};
			if(!hero.isCanSend(2432, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2432);
		}
}