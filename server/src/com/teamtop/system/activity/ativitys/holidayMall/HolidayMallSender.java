package com.teamtop.system.activity.ativitys.holidayMall;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * HolidayMallSender.java
 * 新活动-节日商店
 */
public class HolidayMallSender{
		/**
		 * 打开界面返回
		 * @param itemInfos 商品信息
		 * @param refreshTimes 剩余刷新次数
		 * @param times 剩余免费次数
		 * @param prop1 背包中该道具有多少个
		 * @param cutDown 当前折扣
		**/
	public static void sendCmd_10800(long hid, Object[] itemInfos, int refreshTimes, int times, int prop1, int cutDown,
			int countTimes) {
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{itemInfos,refreshTimes,times,prop1,cutDown,countTimes};
			if(!hero.isCanSend(10800, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10800);
		}
		/**
		 * 刷新商店数据返回
		 * @param state 状态 1成功 2元宝不足
		**/
		public static void sendCmd_10802(long hid  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state};
			if(!hero.isCanSend(10802, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10802);
		}
		/**
		 * 刷新商店折扣数据返回
		 * @param state 状态 1成功 2元宝不足 3道具不足 4刷新折扣次数不足
		**/
		public static void sendCmd_10804(long hid  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state};
			if(!hero.isCanSend(10804, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10804);
		}
		/**
		 * 购买商品返回
		 * @param state 状态 1成功 2元宝不足 3没有购买次数 4没有该商品
		 * @param id 商品id
		**/
		public static void sendCmd_10806(long hid  ,  int  state  ,   int  id ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,id};
			if(!hero.isCanSend(10806, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10806);
		}
}