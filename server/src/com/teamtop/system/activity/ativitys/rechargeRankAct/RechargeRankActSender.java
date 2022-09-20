package com.teamtop.system.activity.ativitys.rechargeRankAct;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * RechargeRankActSender.java
 * 充值排行(活动)
 */
public class RechargeRankActSender{
		/**
		 * 打开界面返回
		 * @param rechargeRank 充值排行榜
		 * @param firstModel 第一名职业时装（job*1000+时装id），没有则为0
		 * @param firstGodWeapon 第一名神兵
		 * @param myRank 我的排名
		 * @param myRecharge 我的充值数
		 * @param qs 期数
		 * @param mountId 坐骑
		**/
		public static void sendCmd_8690(long hid  ,   Object[]  rechargeRank  ,   int  firstModel  ,   int  firstGodWeapon  ,   int  myRank  ,   int  myRecharge  ,   int  qs  ,   int  mountId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rechargeRank,firstModel,firstGodWeapon,myRank,myRecharge,qs,mountId};
			if(!hero.isCanSend(8690, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8690);
		}
}