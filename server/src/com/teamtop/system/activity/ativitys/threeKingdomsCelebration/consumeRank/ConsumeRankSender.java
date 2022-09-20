package com.teamtop.system.activity.ativitys.threeKingdomsCelebration.consumeRank;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * ConsumeRankSender.java
 * 三国庆典-消费排行
 */
public class ConsumeRankSender{
		/**
		 * 打开界面
		 * @param rank 排行
		 * @param model 第一名职业时装（job*1000+时装id），没有则为0
		 * @param godWeapon 专属神兵
		 * @param myRank 我的排行，没有上榜则为0
		 * @param myConsume 我的消费
		 * @param mountId 坐骑
		**/
		public static void sendCmd_4060(long hid  ,   Object[]  rank  ,   int  model  ,   int  godWeapon  ,   int  myRank  ,   int  myConsume  ,   int  mountId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rank,model,godWeapon,myRank,myConsume,mountId};
			if(!hero.isCanSend(4060, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4060);
		}
}