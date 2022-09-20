package com.teamtop.system.activity.ativitys.continuousConsume;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * ContinuousConsumeSender.java
 * 连续消费
 */
public class ContinuousConsumeSender{
		/**
		 * 打开界面 
		 * @param qishu 期数
		 * @param datalist 所有数据
		 * @param bigAwardGet 第七天大礼物领取 0默认值 1已领取
		 * @param littleAwardGet 第3天大礼物领取 0默认值 1已领取
		**/
		public static void sendCmd_3072(long hid  ,   int  qishu  ,   Object[]  datalist  ,  int  bigAwardGet  ,  int  littleAwardGet ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{qishu,datalist,bigAwardGet,littleAwardGet};
			if(!hero.isCanSend(3072, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3072);
		}
		/**
		 * 领取奖励
		 * @param result 结果 1成功 3系统未开启 4配置表不存在 5该奖励已领取 6元宝不足 7背包已满 8元宝消耗不足  9传入ID非本期ID  10活动未开启
		 * @param id 配置表ID
		**/
		public static void sendCmd_3074(long hid  ,  int  result  ,  int  id ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{result,id};
			if(!hero.isCanSend(3074, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3074);
		}
		/**
		 * 领取最大奖励
		 * @param result 结果 1成功 2系统未开启 3在7天后不能领取 4未满足7天连续充值条件 5背包已满  6没配这期奖励  7活动未开启  8未满足3天连续充值条件  9奖励已领完
		**/
		public static void sendCmd_3076(long hid  ,  int  result ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{result};
			if(!hero.isCanSend(3076, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3076);
		}
}