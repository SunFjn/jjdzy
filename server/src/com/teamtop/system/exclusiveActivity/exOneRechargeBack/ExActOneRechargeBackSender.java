package com.teamtop.system.exclusiveActivity.exOneRechargeBack;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * ExActOneRechargeBackSender.java
 * 专属活动-单笔返利
 */
public class ExActOneRechargeBackSender{
		/**
		 * 返回界面信息
		 * @param id 获得唯一id
		 * @param rewardData 奖励状态数据
		**/
		public static void sendCmd_8360(long hid  ,   int  id  ,   Object[]  rewardData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{id,rewardData};
			if(!hero.isCanSend(8360, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8360);
		}
		/**
		 * 领取奖励结果
		 * @param id 活动唯一id
		 * @param rtnCode 结果：0：失败，1：成功
		 * @param index 失败：（1：没领取次数），成功：奖励项id
		 * @param canGet 可领取次数
		 * @param alreadyGet 剩余次数
		**/
		public static void sendCmd_8362(long hid  ,   int  id  ,  int  rtnCode  ,   int  index  ,  int  canGet  ,  int  alreadyGet ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{id,rtnCode,index,canGet,alreadyGet};
			if(!hero.isCanSend(8362, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8362);
		}
		/**
		 * 更新单笔返利配置表
		 * @param actData 单笔返利数据
		**/
		public static void sendCmd_8364(long hid  ,   Object[]  actData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{actData};
			if(!hero.isCanSend(8364, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8364);
		}
}