package com.teamtop.system.boss.specialAnimalBoss;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * SpecialAnimalBossSender.java
 * 异兽BOSS
 */
public class SpecialAnimalBossSender{
		/**
		 * 返回界面信息
		 * @param nowGq 当前关卡
		 * @param passGq 已通关最高关卡
		 * @param rewardGq 已领取奖励关卡
		 * @param chaNum 剩余挑战次数
		 * @param leftTime 剩余恢复时间
		 * @param name 首通玩家名称
		 * @param icon 头像
		 * @param frame 头像框
		 * @param buyChaNum 已购买次数
		**/
		public static void sendCmd_9432(long hid  ,   int  nowGq  ,   int  passGq  ,   int  rewardGq  ,   int  chaNum  ,   int  leftTime  ,   String  name  ,   int  icon  ,   int  frame  ,   int  buyChaNum ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{nowGq,passGq,rewardGq,chaNum,leftTime,name,icon,frame,buyChaNum};
			if(!hero.isCanSend(9432, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 9432);
		}
		/**
		 * 挑战判定返回
		 * @param result 判断结果：0:判断失败，1判断成功
		 * @param nowGq 失败：（1：），成功：挑战关卡
		 * @param chaNum 剩余挑战次数
		 * @param leftTime 剩余挑战时间
		**/
		public static void sendCmd_9434(long hid  ,  int  result  ,   int  nowGq  ,   int  chaNum  ,   int  leftTime ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{result,nowGq,chaNum,leftTime};
			if(!hero.isCanSend(9434, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 9434);
		}
		/**
		 * 结算返回
		 * @param rtnCode 0：失败，1：成功
		 * @param reward 奖励
		**/
		public static void sendCmd_9436(long hid  ,  int  rtnCode  ,   Object[]  reward ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,reward};
			if(!hero.isCanSend(9436, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 9436);
		}
		/**
		 * 复活结果返回
		 * @param rtnCode 0：失败，1：成功
		 * @param type 失败：（1：元宝不足）
		**/
		public static void sendCmd_9438(long hid  ,  int  rtnCode  ,  int  type ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,type};
			if(!hero.isCanSend(9438, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 9438);
		}
		/**
		 * 领取奖励结果
		 * @param rtnCode 0：失败，1：成功
		 * @param nowGq 失败：（1：），成功：当前关卡
		**/
		public static void sendCmd_9440(long hid  ,  int  rtnCode  ,   int  nowGq ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,nowGq};
			if(!hero.isCanSend(9440, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 9440);
		}
		/**
		 * 排行榜数据
		 * @param rankData 排行数据
		**/
		public static void sendCmd_9442(long hid  ,   Object[]  rankData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rankData};
			if(!hero.isCanSend(9442, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 9442);
		}
		/**
		 * 更新首通玩家
		 * @param guanqia 关卡
		 * @param name 玩家名
		 * @param icon 头像
		 * @param frame 头像框
		**/
		public static void sendCmd_9444(long hid  ,   int  guanqia  ,   String  name  ,   int  icon  ,   int  frame ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{guanqia,name,icon,frame};
			if(!hero.isCanSend(9444, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 9444);
		}
		/**
		 * 购买结果返回
		 * @param rtnCode 购买结果：0：失败，1：成功
		 * @param chaNum 失败：（），成功：挑战次数
		 * @param buyChaNum 已购买次数
		**/
		public static void sendCmd_9446(long hid  ,  int  rtnCode  ,   int  chaNum  ,   int  buyChaNum ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,chaNum,buyChaNum};
			if(!hero.isCanSend(9446, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 9446);
		}
}