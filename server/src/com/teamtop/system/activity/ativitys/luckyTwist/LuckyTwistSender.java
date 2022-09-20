package com.teamtop.system.activity.ativitys.luckyTwist;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * LuckyTwistSender.java
 * 新活动-幸运扭蛋
 */
public class LuckyTwistSender{
		/**
		 * 打开界面返回
		 * @param uiList 注入奖励数据
		 * @param num 免费次数
		 * @param times 还剩几次后获得免费注入
		 * @param canTimes 还可以抽多少次
		**/
		public static void sendCmd_11000(long hid  ,   Object[]  uiList  ,   int  num  ,   int  times  ,   int  canTimes ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{uiList,num,times,canTimes};
			if(!hero.isCanSend(11000, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11000);
		}
		/**
		 * 抽奖返回
		 * @param state 状态 1成功 2已达到最大抽奖次数 3元宝不足 4奖池没有注入道具
		 * @param awardList 抽奖道具数据
		 * @param times 还可以抽多少次
		**/
		public static void sendCmd_11002(long hid  ,  int  state  ,   Object[]  awardList  ,   int  times ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,awardList,times};
			if(!hero.isCanSend(11002, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11002);
		}
		/**
		 * 奖池注入道具返回
		 * @param state 状态 1成功 2元宝不足
		**/
		public static void sendCmd_11004(long hid  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state};
			if(!hero.isCanSend(11004, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11004);
		}
}