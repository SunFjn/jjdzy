package com.teamtop.system.eightDoorAppraiseRank;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * EightDoorAppraiseRankSender.java
 * 八门金锁-鉴定排名
 */
public class EightDoorAppraiseRankSender{
		/**
		 * 打开界面返回
		 * @param rank 排行
		 * @param model 第一名职业时装（job*1000+时装id），没有则为0
		 * @param iconList 第二，第三名头像id，头像框，国家，vip等级
		 * @param myTimes 我的鉴定次数
		 * @param myRank 我的排名
		 * @param endTime 结束时间
		**/
		public static void sendCmd_7302(long hid  ,   Object[]  rank  ,   int  model  ,   Object[]  iconList  ,   int  myTimes  ,   int  myRank  ,   int  endTime ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rank,model,iconList,myTimes,myRank,endTime};
			if(!hero.isCanSend(7302, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 7302);
		}
}