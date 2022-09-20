package com.teamtop.system.openDaysSystem.saintMonsterWashRank;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * SaintMonsterWashRankSender.java
 * 圣兽降临-兽魂洗练
 */
public class SaintMonsterWashRankSender{
		/**
		 * 打开界面
		 * @param rank 排行
		 * @param model 第一名的职业时装
		 * @param list 第2、3名的信息
		 * @param myWashNum 我的洗练次数
		 * @param myRank 我的排行
		 * @param endTime 结束时间
		**/
		public static void sendCmd_7352(long hid  ,   Object[]  rank  ,   int  model  ,   Object[]  list  ,   int  myWashNum  ,   int  myRank  ,   int  endTime ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rank,model,list,myWashNum,myRank,endTime};
			if(!hero.isCanSend(7352, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 7352);
		}
}