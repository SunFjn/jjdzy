package com.teamtop.system.activity.ativitys.rollDice;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * RollDiceSender.java
 * 消费摇骰
 */
public class RollDiceSender{
		/**
		 * 打开消费摇骰界面返回
		 * @param id 格子Id
		 * @param num 剩余摇骰次数
		 * @param yuanbao 当前消费元宝
		 * @param qs 期数 
		 * @param diceNum 显示骰子点数 
		 * @param totalNum 总步数
		**/
		public static void sendCmd_10020(long hid  ,   int  id  ,   int  num  ,   int  yuanbao  ,   int  qs  ,  int  diceNum  ,   int  totalNum ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{id,num,yuanbao,qs,diceNum,totalNum};
			if(!hero.isCanSend(10020, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10020);
		}
		/**
		 * 摇骰返回
		 * @param state 状态：1.成功 2.背包已满 3.剩余次数不足
		 * @param id 格子id 
		 * @param diceNum 骰子点数
		 * @param num 剩余次数
		 * @param useNum 已摇次数 
		 * @param totalNum 总步数
		**/
		public static void sendCmd_10022(long hid  ,  int  state  ,   int  id  ,  int  diceNum  ,   int  num  ,   int  useNum  ,   int  totalNum ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,id,diceNum,num,useNum,totalNum};
			if(!hero.isCanSend(10022, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10022);
		}
}