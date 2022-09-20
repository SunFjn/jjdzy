package com.teamtop.system.openDaysSystem.otherContinuousConsume;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * OtherContinuousConsumeSender.java
 * 连续消费（8~28）
 */
public class OtherContinuousConsumeSender{
		/**
		 * 返回界面信息
		 * @param dataList 所有数据
		 * @param awardsType 第七天大礼物领取 0默认值 1已领取
		 * @param awardsLittle 第3天大礼物领取 0默认值 1已领取
		 * @param openDays 当前活动天数
		**/
		public static void sendCmd_4830(long hid  ,   Object[]  dataList  ,  int  awardsType  ,  int  awardsLittle  ,   int  openDays ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{dataList,awardsType,awardsLittle,openDays};
			if(!hero.isCanSend(4830, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4830);
		}
		/**
		 * 领取奖励
		 * @param result 结果  1成功  2异常  3开服天数不足  4配置表不存在  5该奖励已领取  6元宝不足  7背包已满  8元宝消耗不足
		 * @param day 天数
		**/
		public static void sendCmd_4832(long hid  ,  int  result  ,  int  day ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{result,day};
			if(!hero.isCanSend(4832, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4832);
		}
		/**
		 * 领取最大奖励
		 * @param result 结果  1成功  2异常  3在7天后不能领取  4未满足7未满足3天连续消费条件  7奖励已领天连续充值条件  5背包已满   6完
		**/
		public static void sendCmd_4834(long hid  ,  int  result ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{result};
			if(!hero.isCanSend(4834, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4834);
		}
}