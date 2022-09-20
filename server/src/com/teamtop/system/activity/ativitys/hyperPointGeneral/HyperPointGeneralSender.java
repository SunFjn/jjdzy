package com.teamtop.system.activity.ativitys.hyperPointGeneral;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * HyperPointGeneralSender.java
 * 超级点将(活动)
 */
public class HyperPointGeneralSender{
		/**
		 * 打开界面返回
		 * @param yuanbao 已经充值的元宝数
		 * @param nextTimes 下次抽奖次数,对应配置表下标，从1开始
		 * @param restTimes 剩余点将次数
		 * @param awardList 奖品列表
		 * @param qs 期数
		**/
		public static void sendCmd_2610(long hid  ,   int  yuanbao  ,  int  nextTimes  ,  int  restTimes  ,   Object[]  awardList  ,   int  qs ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{yuanbao,nextTimes,restTimes,awardList,qs};
			if(!hero.isCanSend(2610, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2610);
		}
		/**
		 * 领取奖励返回
		 * @param state 状态，0：奖励不存在，1：成功，2：无抽奖次数，3：不可重复领取
		 * @param awardId 返回的奖励id
		 * @param type 奖励类型
		 * @param id 奖励id
		 * @param num 奖励数量
		**/
		public static void sendCmd_2612(long hid  ,  int  state  ,  int  awardId  ,  int  type  ,   int  id  ,   int  num ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,awardId,type,id,num};
			if(!hero.isCanSend(2612, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2612);
		}
}