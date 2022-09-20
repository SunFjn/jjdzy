package com.teamtop.system.bag;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * BagSender.java
 * 背包
 */
public class BagSender{
		/**
		 * GC上线发送背包数据
		 * @param equipData 装备数据
		 * @param itemData 道具数量
		 * @param gridNum 已购买的格子
		**/
		public static void sendCmd_200(long hid  ,   Object[]  equipData  ,   Object[]  itemData  ,  int  gridNum ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{equipData,itemData,gridNum};
			if(!hero.isCanSend(200, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 200);
		}
		/**
		 * GC开启格子返回
		 * @param state 0失败1成功开启2更新格子数3已达最大格子4元宝不足
		 * @param num 已购买的格子数
		**/
		public static void sendCmd_202(long hid  ,  int  state  ,  int  num ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,num};
			if(!hero.isCanSend(202, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 202);
		}
		/**
		 * GC背包装备更新
		 * @param data 装备数组
		**/
		public static void sendCmd_204(long hid  ,   Object[]  data ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{data};
			if(!hero.isCanSend(204, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 204);
		}
		/**
		 * GC背包道具更新
		 * @param data 道具数量
		**/
		public static void sendCmd_206(long hid  ,   Object[]  data ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{data};
			if(!hero.isCanSend(206, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 206);
		}
		/**
		 * GC使用道具返回
		 * @param state 0失败1成功2 物品使用数量已达日限制 3 使用后大于了体力上限4等级不符5 物品不可直接使用6 职业不符 7:物品数量不足8背包已满
		**/
		public static void sendCmd_208(long hid  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state};
			if(!hero.isCanSend(208, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 208);
		}
		/**
		 * GC提示物品流水
		 * @param data 物品信息
		**/
		public static void sendCmd_210(long hid  ,   Object[]  data ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{data};
			if(!hero.isCanSend(210, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 210);
		}
		/**
		 * 通用掉落数据
		 * @param data 掉落数据
		 * @param npcId 掉落的怪物ID
		**/
		public static void sendCmd_234(long hid  ,   Object[]  data  ,   int  npcId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{data,npcId};
			if(!hero.isCanSend(234, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 234);
		}
}