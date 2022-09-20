package com.teamtop.system.openDaysSystem.bagGoodIdea;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * BagGoodIdeaSender.java
 * 运筹帷幄-锦囊妙计
 */
public class BagGoodIdeaSender{
		/**
		 * 打开界面返回
		 * @param awardStateList 奖励状态列表
		 * @param times 次数
		**/
		public static void sendCmd_9900(long hid  ,   Object[]  awardStateList  ,   int  times ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{awardStateList,times};
			if(!hero.isCanSend(9900, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 9900);
		}
		/**
		 * 领取奖励返回
		 * @param state 领取状态，0:没有该奖励，1:成功，2:未达到条件，3:已领取
		 * @param id 配置表id
		**/
		public static void sendCmd_9902(long hid  ,  int  state  ,   int  id ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,id};
			if(!hero.isCanSend(9902, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 9902);
		}
}