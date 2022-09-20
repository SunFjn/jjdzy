package com.teamtop.system.activity.ativitys.consumeTurnCardAct;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * ConsumeTurnCardActSender.java
 * 消费翻牌(活动)
 */
public class ConsumeTurnCardActSender{
		/**
		 * 打开界面返回
		 * @param num 消费元宝数量
		 * @param qs 期数
		 * @param times 已翻牌次数
		 * @param turncardList 翻牌列表
		**/
		public static void sendCmd_8600(long hid  ,   int  num  ,   int  qs  ,   int  times  ,   Object[]  turncardList ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{num,qs,times,turncardList};
			if(!hero.isCanSend(8600, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8600);
		}
		/**
		 * 翻牌返回
		 * @param state 状态：1：成功，2：抽奖次数不足
		 * @param id 抽取的档次，为消费翻牌消费表id
		 * @param index 位置，从0开始
		**/
		public static void sendCmd_8602(long hid  ,  int  state  ,   int  id  ,   int  index ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,id,index};
			if(!hero.isCanSend(8602, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8602);
		}
}