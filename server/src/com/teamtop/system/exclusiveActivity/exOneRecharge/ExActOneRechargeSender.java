package com.teamtop.system.exclusiveActivity.exOneRecharge;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * ExActOneRechargeSender.java
 * 专属活动-单笔充值
 */
public class ExActOneRechargeSender{
		/**
		 * 返回界面信息
		 * @param id 活动唯一id
		 * @param rewardData 领取数据
		**/
		public static void sendCmd_8100(long hid  ,   int  id  ,   Object[]  rewardData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{id,rewardData};
			if(!hero.isCanSend(8100, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8100);
		}
		/**
		 * 领取奖励结果
		 * @param id 活动唯一id
		 * @param index 奖励序号
		 * @param canCt 可领取次数
		 * @param hasCt 已领取次数
		**/
		public static void sendCmd_8102(long hid  ,   int  id  ,   int  index  ,  int  canCt  ,  int  hasCt ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{id,index,canCt,hasCt};
			if(!hero.isCanSend(8102, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8102);
		}
		/**
		 * 更新单笔充值配置表
		 * @param actData 单笔充值配置数据
		**/
		public static void sendCmd_8104(long hid  ,   Object[]  actData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{actData};
			if(!hero.isCanSend(8104, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8104);
		}
}