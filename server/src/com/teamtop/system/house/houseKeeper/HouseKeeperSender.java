package com.teamtop.system.house.houseKeeper;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * HouseKeeperSender.java
 * 家丁
 */
public class HouseKeeperSender{
		/**
		 * 打开界面返回
		 * @param id 家丁id
		 * @param level 家丁等级
		 * @param curExp 家丁当前经验
		**/
		public static void sendCmd_11352(long hid  ,   int  id  ,   int  level  ,   int  curExp ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{id,level,curExp};
			if(!hero.isCanSend(11352, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11352);
		}
		/**
		 * 晋升家丁返回
		 * @param state 状态 0成功 1达到上限 2条件不足 3需要的道具不足
		 * @param index 家丁id
		**/
		public static void sendCmd_11354(long hid  ,  int  state  ,   int  index ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,index};
			if(!hero.isCanSend(11354, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11354);
		}
		/**
		 * 升级家丁返回
		 * @param state 0成功 1级数已满级 2材料不足
		 * @param level 家丁等级
		 * @param curLevel 家丁当前经验
		**/
		public static void sendCmd_11356(long hid  ,  int  state  ,   int  level  ,   int  curLevel ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,level,curLevel};
			if(!hero.isCanSend(11356, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11356);
		}
}