package com.teamtop.system.longZhongDui;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * LongZhongDuiSender.java
 * 隆中对
 */
public class LongZhongDuiSender{
		/**
		 * 打开答题界面返回
		 * @param state 状态，0：活动未开始，1：答题准备，2：答题中，3：下一题等待，4：答题结束，5：可答题，6：已答完题
		 * @param downTime 答题倒计时
		 * @param topicNum 答题进度
		 * @param tid 题目id
		 * @param answer1 选项1
		 * @param answer2 选项2
		 * @param answer3 选项3
		 * @param answer4 选项4
		 * @param myScore 我的得分
		 * @param myRank 我的排名，0：未上榜
		**/
		public static void sendCmd_1982(long hid  ,  int  state  ,   int  downTime  ,   int  topicNum  ,   int  tid  ,   int  answer1  ,   int  answer2  ,   int  answer3  ,   int  answer4  ,   int  myScore  ,   int  myRank ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,downTime,topicNum,tid,answer1,answer2,answer3,answer4,myScore,myRank};
			if(!hero.isCanSend(1982, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1982);
		}
		/**
		 * 答题返回
		 * @param state 题目判断，0：错误，1：正确
		 * @param addScore 增加积分
		**/
		public static void sendCmd_1984(long hid  ,  int  state  ,   int  addScore ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,addScore};
			if(!hero.isCanSend(1984, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1984);
		}
		/**
		 * 答题排行返回
		 * @param answerRank 排行
		**/
		public static void sendCmd_1986(long hid  ,   Object[]  answerRank ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{answerRank};
			if(!hero.isCanSend(1986, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1986);
		}
		/**
		 * 广播状态，通知答题结束
		**/
		public static void sendCmd_1980(long hid ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = null;
			if(!hero.isCanSend(1980, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1980);
		}
}