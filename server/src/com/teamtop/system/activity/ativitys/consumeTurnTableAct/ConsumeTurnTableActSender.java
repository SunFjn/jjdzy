package com.teamtop.system.activity.ativitys.consumeTurnTableAct;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * ConsumeTurnTableActSender.java
 * 消费转盘(活动)
 */
public class ConsumeTurnTableActSender{
		/**
		 * 打开界面返回
		 * @param num 消费元宝数量
		 * @param nowId 当前档次，为消费转盘消费表id，没有则为0
		 * @param times 已转盘次数
		 * @param turntableList 转盘列表
		**/
		public static void sendCmd_8570(long hid  ,   int  num  ,   int  nowId  ,   int  times  ,   Object[]  turntableList ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{num,nowId,times,turntableList};
			if(!hero.isCanSend(8570, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8570);
		}
		/**
		 * 抽奖返回
		 * @param state 状态：1：成功，2：抽奖次数不足
		 * @param id 抽取的档次，为消费转盘消费表id
		**/
		public static void sendCmd_8572(long hid  ,  int  state  ,   int  id ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,id};
			if(!hero.isCanSend(8572, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8572);
		}
}