package com.teamtop.system.openDaysSystem;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * OpenDaysSystemSender.java
 * 开启天数控制系统
 */
public class OpenDaysSystemSender{
		/**
		 * 登录发送开启系统数据
		 * @param opData 开启系统数据
		**/
		public static void sendCmd_4570(long hid  ,   Object[]  opData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{opData};
			if(!hero.isCanSend(4570, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4570);
		}
		/**
		 * 更新活动状态
		 * @param stateType 更新类型：0：结束，1：开启
		 * @param uid 分类表唯一id
		 * @param sysId 系统id
		 * @param qs 期数
		 * @param startTime 开始时间
		 * @param endTime 结束时间
		**/
		public static void sendCmd_4572(long hid  ,  int  stateType  ,   int  uid  ,   int  sysId  ,   int  qs  ,   int  startTime  ,   int  endTime ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{stateType,uid,sysId,qs,startTime,endTime};
			if(!hero.isCanSend(4572, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4572);
		}
}