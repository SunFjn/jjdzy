package com.teamtop.system.activity;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * ActivitySender.java
 * 活动
 */
public class ActivitySender{
		/**
		 * 活动界面信息返回
		 * @param actType 活动类型
		 * @param actData 活动数据
		**/
		public static void sendCmd_2252(long hid  ,   int  actType  ,   Object[]  actData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{actType,actData};
			if(!hero.isCanSend(2252, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2252);
		}
		/**
		 * 登录发送类型活动数据
		 * @param typeActData 活动数据
		**/
		public static void sendCmd_2250(long hid  ,   Object[]  typeActData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{typeActData};
			if(!hero.isCanSend(2250, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2250);
		}
		/**
		 * 活动开启
		 * @param actType 活动类型
		 * @param indexId 活动序号
		 * @param actId 活动id
		 * @param periods 期数
		 * @param startTime 开始时间
		 * @param endTime 结束时间
		 * @param state 开启状态：0：关闭，1：开启
		**/
		public static void sendCmd_2256(long hid  ,   int  actType  ,   int  indexId  ,   int  actId  ,   int  periods  ,   int  startTime  ,   int  endTime  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{actType,indexId,actId,periods,startTime,endTime,state};
			if(!hero.isCanSend(2256, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2256);
		}
}