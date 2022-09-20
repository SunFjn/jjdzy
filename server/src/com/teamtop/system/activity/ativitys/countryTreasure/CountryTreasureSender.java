package com.teamtop.system.activity.ativitys.countryTreasure;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * CountryTreasureSender.java
 * 三国宝藏
 */
public class CountryTreasureSender{
		/**
		 * GC 打开ui返回
		 * @param state 状态state 0 选择物品界面 1 抽奖界面
		 * @param qs 期数
		 * @param lun 轮数
		 * @param cinum 当前第几次抽奖次数
		 * @param maxLun 最大轮数
		 * @param uiinfos 界面抽取显示
		 * @param extraRewad 额外奖励领取情况
		**/
		public static void sendCmd_8650(long hid  ,  int  state  ,  int  qs  ,  int  lun  ,  int  cinum  ,  int  maxLun  ,   Object[]  uiinfos  ,   Object[]  extraRewad ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,qs,lun,cinum,maxLun,uiinfos,extraRewad};
			if(!hero.isCanSend(8650, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8650);
		}
		/**
		 * GC 选择奖品返回
		 * @param rest 0成功 1有不存在道具
		**/
		public static void sendCmd_8652(long hid  ,  int  rest ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest};
			if(!hero.isCanSend(8652, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8652);
		}
		/**
		 * GC 抽奖返回
		 * @param rest 0成功 1位置已经抽了 2钱不够
		 * @param type 道具类型
		 * @param itemid 道具id
		 * @param num 道具数量
		 * @param index 道具被抽位置
		**/
		public static void sendCmd_8654(long hid  ,  int  rest  ,  int  type  ,   int  itemid  ,   int  num  ,  int  index ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,type,itemid,num,index};
			if(!hero.isCanSend(8654, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8654);
		}
		/**
		 * GC 额外奖励状态编号
		 * @param index 序号
		 * @param state 奖励状态 0 1 2
		**/
		public static void sendCmd_8656(long hid  ,   int  index  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{index,state};
			if(!hero.isCanSend(8656, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8656);
		}
		/**
		 * GC 获得剩余奖励
		 * @param leftRewards 剩余奖励
		**/
		public static void sendCmd_8658(long hid  ,   Object[]  leftRewards ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{leftRewards};
			if(!hero.isCanSend(8658, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8658);
		}
}