package com.teamtop.system.houseShopTask;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * HouseShopTaskSender.java
 * 府邸商店任务
 */
public class HouseShopTaskSender{
		/**
		 * GC 打开商店返回
		 * @param num 府邸货币
		 * @param iteminfo 
		**/
		public static void sendCmd_11402(long hid  ,   int  num  ,   Object[]  iteminfo ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{num,iteminfo};
			if(!hero.isCanSend(11402, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11402);
		}
		/**
		 * GC 购买返回
		 * @param rest 0成功 1货币不足 2次数不足
		 * @param index 商品序号
		 * @param moneyNum  府邸货币
		**/
		public static void sendCmd_11406(long hid  ,  int  rest  ,  int  index  ,   int  moneyNum ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,index,moneyNum};
			if(!hero.isCanSend(11406, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11406);
		}
		/**
		 * GC 打开府邸日常任务返回
		 * @param taskinfo 
		 * @param rewardinfo 
		**/
		public static void sendCmd_11408(long hid  ,   Object[]  taskinfo  ,   Object[]  rewardinfo ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{taskinfo,rewardinfo};
			if(!hero.isCanSend(11408, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11408);
		}
		/**
		 * GC日常任务奖励状态变化
		 * @param index 任务索引
		 * @param state 奖励状态
		**/
		public static void sendCmd_11410(long hid  ,   int  index  ,   int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{index,state};
			if(!hero.isCanSend(11410, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11410);
		}
		/**
		 * GC每日宝箱奖励变化
		 * @param index 宝箱索引
		 * @param state 奖励状态
		**/
		public static void sendCmd_11412(long hid  ,   int  index  ,   int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{index,state};
			if(!hero.isCanSend(11412, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11412);
		}
		/**
		 * GC府邸目标奖励状态返回
		 * @param goalinfos 
		 * @param goalplans 目标进度按类型
		**/
		public static void sendCmd_11414(long hid  ,   Object[]  goalinfos  ,   Object[]  goalplans ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{goalinfos,goalplans};
			if(!hero.isCanSend(11414, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11414);
		}
		/**
		 * CG 府邸目标奖励变化
		 * @param goalindex 目标id
		 * @param state 奖励状态
		**/
		public static void sendCmd_11416(long hid  ,   int  goalindex  ,   int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{goalindex,state};
			if(!hero.isCanSend(11416, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11416);
		}
		/**
		 * GC 按类别某些目标组变化
		 * @param goalType 目标分类序号
		 * @param goalTypeNum 目标分类参数变化
		**/
		public static void sendCmd_11418(long hid  ,   int  goalType  ,   int  goalTypeNum ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{goalType,goalTypeNum};
			if(!hero.isCanSend(11418, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11418);
		}
}