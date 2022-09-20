package com.teamtop.system.activity.ativitys.themeConsume;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * ThemeConsumeSender.java
 * 主题消费
 */
public class ThemeConsumeSender{
		/**
		 * 打开主题消费返回
		 * @param recharge 充值元宝
		 * @param type 主题类型
		 * @param consume 消费元宝
		 * @param stateList 
		**/
		public static void sendCmd_10300(long hid  ,   int  recharge  ,  int  type  ,   int  consume  ,   Object[]  stateList ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{recharge,type,consume,stateList};
			if(!hero.isCanSend(10300, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10300);
		}
		/**
		 * 激活返回
		 * @param state 状态：1.成功 2.参数错误 3.激活条件不足 4.已激活
		 * @param type 主题类型
		**/
		public static void sendCmd_10302(long hid  ,  int  state  ,  int  type ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,type};
			if(!hero.isCanSend(10302, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10302);
		}
		/**
		 * 领取主题奖励返回
		 * @param state 状态：1.成功 2.背包已满 3.参数错误 4.该奖励已领 5.领取条件不足
		 * @param id 编号ID
		**/
		public static void sendCmd_10304(long hid  ,  int  state  ,   int  id ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,id};
			if(!hero.isCanSend(10304, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10304);
		}
}