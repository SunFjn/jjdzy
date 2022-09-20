package com.teamtop.system.activity.ativitys.warOrder;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * WarOrderSender.java
 * 犒劳三国
 */
public class WarOrderSender{
		/**
		 * 打开界面返回
		 * @param sendData 数据
		 * @param buyState 进阶战令状态 0普通(未购买) 1进阶(已购买)
		 * @param level 等级
		 * @param exp 经验
		 * @param buyNum 已购买等级次数
		 * @param sid 活动id
		**/
		public static void sendCmd_12250(long hid  ,   Object[]  sendData  ,  int  buyState  ,   int  level  ,   int  exp  ,   int  buyNum  ,   int  sid ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{sendData,buyState,level,exp,buyNum,sid};
			if(!hero.isCanSend(12250, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 12250);
		}
		/**
		 * 领取奖励返回
		 * @param state 状态 0没有购买进阶战令不能领取 1该等级奖励不可领取 2没有可领取的奖励 3成功
		 * @param getState 领取方式 0普通 1一键
		 * @param type 类型
		 * @param level 等级
		 * @param sid 活动id
		**/
		public static void sendCmd_12252(long hid  ,  int  state  ,   int  getState  ,   int  type  ,   int  level  ,   int  sid ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,getState,type,level,sid};
			if(!hero.isCanSend(12252, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 12252);
		}
		/**
		 * 打开周任务UI返回
		 * @param taskData 任务数据
		 * @param sid 活动id
		**/
		public static void sendCmd_12254(long hid  ,   Object[]  taskData  ,   int  sid ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{taskData,sid};
			if(!hero.isCanSend(12254, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 12254);
		}
		/**
		 * 领取周任务奖励返回
		 * @param state 结果 0失败 1成功
		 * @param type 失败(1未完成任务 2已领取)，成功返回任务类型
		 * @param taskId 任务id
		 * @param level 战令等级
		 * @param exp 战令经验
		 * @param getState 领取类型
		 * @param sid 活动id
		**/
		public static void sendCmd_12256(long hid  ,  int  state  ,   int  type  ,   int  taskId  ,   int  level  ,   int  exp  ,   int  getState  ,   int  sid ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,type,taskId,level,exp,getState,sid};
			if(!hero.isCanSend(12256, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 12256);
		}
		/**
		 * 打开每日任务UI返回
		 * @param taskData 任务数据
		 * @param sid 活动id
		**/
		public static void sendCmd_12258(long hid  ,   Object[]  taskData  ,   int  sid ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{taskData,sid};
			if(!hero.isCanSend(12258, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 12258);
		}
		/**
		 * 领取每日任务奖励返回
		 * @param state 结果 0失败 1成功
		 * @param type 失败(1未完成任务 2已领取)，成功返回任务类型
		 * @param taskId 任务id
		 * @param level 战令等级
		 * @param exp 战令经验
		 * @param getState 领取方式 
		 * @param sid 活动id
		**/
		public static void sendCmd_12260(long hid  ,  int  state  ,   int  type  ,   int  taskId  ,   int  level  ,   int  exp  ,   int  getState  ,   int  sid ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,type,taskId,level,exp,getState,sid};
			if(!hero.isCanSend(12260, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 12260);
		}
		/**
		 * 购买等级返回
		 * @param state 状态 0成功 1已达到最大购买次数 2砖石不足
		 * @param buyNum 已购买次数
		 * @param level 战令等级
		 * @param sid 活动id
		**/
		public static void sendCmd_12262(long hid  ,  int  state  ,   int  buyNum  ,   int  level  ,   int  sid ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,buyNum,level,sid};
			if(!hero.isCanSend(12262, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 12262);
		}
}