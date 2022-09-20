package com.teamtop.system.qice;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * QiCeSender.java
 * 奇策
 */
public class QiCeSender{
		/**
		 * 打开奇策返回
		 * @param sendList 奇策列表
		 * @param taozhuanLv 奇策套装等级
		**/
		public static void sendCmd_9702(long hid  ,   Object[]  sendList  ,   int  taozhuanLv ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{sendList,taozhuanLv};
			if(!hero.isCanSend(9702, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 9702);
		}
		/**
		 * 激活/升星奇策返回
		 * @param state 0成功 1星级达到上限 2道具不足
		 * @param index 奇策id
		 * @param star 奇策星级
		**/
		public static void sendCmd_9704(long hid  ,  int  state  ,   int  index  ,   int  star ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,index,star};
			if(!hero.isCanSend(9704, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 9704);
		}
		/**
		 * 升级奇策套装返回
		 * @param state 0成功 1失败
		 * @param taozhuangLv 套装等级
		**/
		public static void sendCmd_9706(long hid  ,  int  state  ,   int  taozhuangLv ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,taozhuangLv};
			if(!hero.isCanSend(9706, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 9706);
		}
		/**
		 * 吞噬返回
		 * @param state 0成功 1未激活奇策 2超过最大吞噬值 3
		 * @param index 奇策id
		 * @param dan 奇策吞噬表id
		 * @param num 兵魂/将魂的吞噬量
		**/
		public static void sendCmd_9708(long hid  ,  int  state  ,   int  index  ,   int  dan  ,   int  num ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,index,dan,num};
			if(!hero.isCanSend(9708, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 9708);
		}
		/**
		 * 奇策升阶返回
		 * @param state 0成功 1先激活该奇策 2不满足升阶条件 3阶数已满级 4材料不足
		 * @param index 奇策id
		 * @param jieLv 奇策阶数
		**/
		public static void sendCmd_9710(long hid  ,  int  state  ,   int  index  ,   int  jieLv ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,index,jieLv};
			if(!hero.isCanSend(9710, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 9710);
		}
}