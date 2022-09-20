package com.teamtop.system.sevenContinuousConsume;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * SevenContinuousConsumeSender.java
 * 连续消费（7天）
 */
public class SevenContinuousConsumeSender{
		/**
		 * 打开界面
		 * @param dataList 所有数据
		 * @param awardsType 第七天大礼物领取 0默认值 1已领取
		 * @param awardsLittle 第3天大礼物领取 0默认值 1已领取
		**/
		public static void sendCmd_3052(long hid  ,   Object[]  dataList  ,  int  awardsType  ,  int  awardsLittle ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{dataList,awardsType,awardsLittle};
			if(!hero.isCanSend(3052, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3052);
		}
		/**
		 * 领取奖励
		 * @param result 结果  1成功  2异常  3开服天数不足  4配置表不存在  5该奖励已领取  6元宝不足  7背包已满  8元宝消耗不足
		 * @param day 天数
		**/
		public static void sendCmd_3054(long hid  ,  int  result  ,  int  day ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{result,day};
			if(!hero.isCanSend(3054, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3054);
		}
		/**
		 * 领取最大奖励
		 * @param result 结果  1成功  2异常  3在7天后不能领取  4未满足7天连续充值条件  5背包已满  
		**/
		public static void sendCmd_3056(long hid  ,  int  result ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{result};
			if(!hero.isCanSend(3056, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3056);
		}
}