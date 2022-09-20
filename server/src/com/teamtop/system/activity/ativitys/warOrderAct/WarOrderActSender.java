package com.teamtop.system.activity.ativitys.warOrderAct;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * WarOrderActSender.java
 * 三国战令(活动)
 */
public class WarOrderActSender{
		/**
		 * 打开战令界面返回
		 * @param sendData 战令数据
		 * @param buyState 进阶战令状态 0普通(未购买) 1进阶(已购买)
		 * @param level 战令等级
		 * @param exp 战令经验
		**/
		public static void sendCmd_10400(long hid  ,   Object[]  sendData  ,  int  buyState  ,   int  level  ,   int  exp ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{sendData,buyState,level,exp};
			if(!hero.isCanSend(10400, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10400);
		}
		/**
		 * 领取战令奖励返回
		 * @param state 状态 0没有购买进阶战令不能领取 1该等级奖励不可领取 2没有可领取的奖励 3成功
		 * @param getState 领取方式 0普通 1一键
		 * @param type 战令类型
		 * @param level 战令等级
		**/
		public static void sendCmd_10402(long hid  ,  int  state  ,   int  getState  ,   int  type  ,   int  level ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,getState,type,level};
			if(!hero.isCanSend(10402, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10402);
		}
		/**
		 * 打开任务UI返回
		 * @param taskData 任务数据
		**/
		public static void sendCmd_10404(long hid  ,   Object[]  taskData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{taskData};
			if(!hero.isCanSend(10404, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10404);
		}
		/**
		 * 领取任务奖励返回
		 * @param state 结果 0失败 1成功
		 * @param type 失败(1未完成任务 2已领取)，成功返回任务类型
		 * @param taskId 任务id
		 * @param level 战令等级
		 * @param exp 战令经验
		**/
		public static void sendCmd_10406(long hid  ,  int  state  ,   int  type  ,   int  taskId  ,   int  level  ,   int  exp ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,type,taskId,level,exp};
			if(!hero.isCanSend(10406, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10406);
		}
		/**
		 * 打开商店页面
		 * @param shopList 商店列表
		 * @param prop1 背包中的白银令
		 * @param prop2 背包中的黄金令
		**/
		public static void sendCmd_10408(long hid  ,   Object[]  shopList  ,   int  prop1  ,   int  prop2 ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{shopList,prop1,prop2};
			if(!hero.isCanSend(10408, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10408);
		}
		/**
		 * 购买商品
		 * @param state 状态 0商品不存在 1成功 2道具不足 3商品已卖完
		 * @param id 购买的配置表id
		**/
		public static void sendCmd_10410(long hid  ,  int  state  ,   int  id ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,id};
			if(!hero.isCanSend(10410, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10410);
		}
}