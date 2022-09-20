package com.teamtop.system.exclusiveActivity.exTotalRecharge;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * ExActTotalRechargeSysSender.java
 * 专属活动-累计充值
 */
public class ExActTotalRechargeSysSender{
		/**
		 * 返回界面信息
		 * @param id 活动唯一id
		 * @param num 充值金额
		 * @param stateData 奖励状态数据
		**/
		public static void sendCmd_8300(long hid  ,   int  id  ,   int  num  ,   Object[]  stateData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{id,num,stateData};
			if(!hero.isCanSend(8300, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8300);
		}
		/**
		 * 领取奖励结果
		 * @param id 活动唯一id
		 * @param index 序号
		 * @param state 奖励状态
		**/
		public static void sendCmd_8302(long hid  ,   int  id  ,   int  index  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{id,index,state};
			if(!hero.isCanSend(8302, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8302);
		}
		/**
		 * 充值金额变化
		 * @param id 活动唯一id
		 * @param num 充值金额数量
		**/
		public static void sendCmd_8304(long hid  ,   int  id  ,   int  num ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{id,num};
			if(!hero.isCanSend(8304, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8304);
		}
		/**
		 * 更新累计充值配置表
		 * @param actData 累计充值数据
		**/
		public static void sendCmd_8306(long hid  ,   Object[]  actData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{actData};
			if(!hero.isCanSend(8306, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8306);
		}
}