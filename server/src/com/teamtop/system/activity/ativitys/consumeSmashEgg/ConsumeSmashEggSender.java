package com.teamtop.system.activity.ativitys.consumeSmashEgg;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * ConsumeSmashEggSender.java
 * 消费砸蛋
 */
public class ConsumeSmashEggSender{
		/**
		 * 打开消费砸蛋返回
		 * @param receivedIdList 
		 * @param stateList 
		 * @param num 剩余次数
		 * @param hitNum 已砸次数
		 * @param yuanbao 当前消费元宝
		**/
		public static void sendCmd_9502(long hid  ,   Object[]  receivedIdList  ,   Object[]  stateList  ,  int  num  ,  int  hitNum  ,   int  yuanbao ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{receivedIdList,stateList,num,hitNum,yuanbao};
			if(!hero.isCanSend(9502, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 9502);
		}
		/**
		 * 砸蛋返回
		 * @param state 状态：1.成功 2.该蛋已砸 3.没有剩余次数 4.参数错误 5.背包已满
		 * @param receivedIdList 
		 * @param stateList 
		 * @param num 剩余次数
		 * @param hitNum 已砸次数
		 * @param yuanbao 当前消费元宝
		**/
		public static void sendCmd_9504(long hid  ,  int  state  ,   Object[]  receivedIdList  ,   Object[]  stateList  ,  int  num  ,  int  hitNum  ,   int  yuanbao ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,receivedIdList,stateList,num,hitNum,yuanbao};
			if(!hero.isCanSend(9504, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 9504);
		}
}