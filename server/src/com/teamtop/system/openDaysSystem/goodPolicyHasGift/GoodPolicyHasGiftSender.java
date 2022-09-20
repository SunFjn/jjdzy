package com.teamtop.system.openDaysSystem.goodPolicyHasGift;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * GoodPolicyHasGiftSender.java
 * 运筹帷幄_奇策有礼
 */
public class GoodPolicyHasGiftSender{
		/**
		 * 打开界面返回
		 * @param awardList 奖励列表
		 * @param totalRecharge 累计充值数
		**/
		public static void sendCmd_9950(long hid  ,   Object[]  awardList  ,   int  totalRecharge ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{awardList,totalRecharge};
			if(!hero.isCanSend(9950, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 9950);
		}
		/**
		 * 激活返回
		 * @param state 领取状态，1:成功，2:未达到条件，3:已激活
		 * @param type 任务类型
		**/
		public static void sendCmd_9952(long hid  ,  int  state  ,  int  type ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,type};
			if(!hero.isCanSend(9952, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 9952);
		}
		/**
		 * 领取奖励返回
		 * @param state 领取状态，0:没有该奖励，1:成功，2:未达到条件，3:已领取
		 * @param id 配置表id
		**/
		public static void sendCmd_9954(long hid  ,  int  state  ,   int  id ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,id};
			if(!hero.isCanSend(9954, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 9954);
		}
}