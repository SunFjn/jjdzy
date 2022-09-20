package com.teamtop.system.hiddentreasure;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * HiddenTreasureSender.java
 * 藏宝阁
 */
public class HiddenTreasureSender{
		/**
		 * 返回界面信息
		 * @param lucky 幸运值
		 * @param freeTimes 免费抽奖次数
		 * @param first 首次十连抽（0：是，1：否）
		 * @param qs 期数
		 * @param noticeData 抽奖公告列表
		 * @param endTime 结束时间戳
		**/
		public static void sendCmd_2732(long hid  ,   int  lucky  ,  int  freeTimes  ,  int  first  ,  int  qs  ,   Object[]  noticeData  ,   int  endTime ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{lucky,freeTimes,first,qs,noticeData,endTime};
			if(!hero.isCanSend(2732, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2732);
		}
		/**
		 * 抽奖结果返回
		 * @param lucky 幸运值
		 * @param freeTimes 免费次数
		 * @param first 首次十连抽（0：是，1：否）
		 * @param qs 当前期数
		 * @param goods 获得物品
		**/
		public static void sendCmd_2734(long hid  ,   int  lucky  ,  int  freeTimes  ,  int  first  ,  int  qs  ,   Object[]  goods ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{lucky,freeTimes,first,qs,goods};
			if(!hero.isCanSend(2734, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2734);
		}
}