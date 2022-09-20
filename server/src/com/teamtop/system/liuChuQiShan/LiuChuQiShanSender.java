package com.teamtop.system.liuChuQiShan;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * LiuChuQiShanSender.java
 * 六出祁山
 */
public class LiuChuQiShanSender{
		/**
		 * 打开界面
		 * @param needHelpNum 今日可求助次数
		 * @param numHelpAwards 今日可帮助次数
		 * @param gqId 当前关卡（未通关），该id之前的全部关卡则为通关
		 * @param saoDangNum 扫荡次数 
		 * @param size 当天首通关卡数 
		**/
		public static void sendCmd_8202(long hid  ,   int  needHelpNum  ,   int  numHelpAwards  ,   int  gqId  ,   int  saoDangNum  ,   int  size ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{needHelpNum,numHelpAwards,gqId,saoDangNum,size};
			if(!hero.isCanSend(8202, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8202);
		}
		/**
		 * 查看队伍信息
		 * @param state 结果 1成功 2副本不存在
		 * @param id 关卡id
		 * @param sendData 队伍信息
		**/
		public static void sendCmd_8204(long hid  ,  int  state  ,   int  id  ,   Object[]  sendData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,id,sendData};
			if(!hero.isCanSend(8204, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8204);
		}
		/**
		 * 创建队伍
		 * @param state 结果 1成功 2刷新数据 3副本不存在 4需要通关前面的副本才能打这个副本 5已通关关卡不可创建队伍
		 * @param teamID 队伍id
		 * @param id 关卡id
		 * @param sendData 队伍数据
		**/
		public static void sendCmd_8206(long hid  ,  int  state  ,   int  teamID  ,   int  id  ,   Object[]  sendData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,teamID,id,sendData};
			if(!hero.isCanSend(8206, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8206);
		}
		/**
		 * 踢人
		 * @param state 结果 1成功（刷新队伍数据） 2没在队伍中 3队伍缓存异常 4你不是队长 5该队员不存在 6你被踢出队伍
		**/
		public static void sendCmd_8208(long hid  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state};
			if(!hero.isCanSend(8208, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8208);
		}
		/**
		 * 广播邀请协助
		 * @param state 结果 1成功 2你没在队伍中 3队伍缓存异常 4你不是队长 5队员已满 6操作太频繁 7求助次数已用完
		**/
		public static void sendCmd_8210(long hid  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state};
			if(!hero.isCanSend(8210, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8210);
		}
		/**
		 * 离开队伍
		 * @param state 结果 1成功 2队伍已解散
		**/
		public static void sendCmd_8212(long hid  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state};
			if(!hero.isCanSend(8212, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8212);
		}
		/**
		 * 加入队伍
		 * @param state 结果 1成功 2已有队伍 3队伍不存在 4队伍已满 5队伍已进入战斗，无法加入 6需要通关前面的副本才能打这个副本 7今日帮助次数已用尽 8该玩家已经没有求助次数，不能加入
		**/
		public static void sendCmd_8214(long hid  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state};
			if(!hero.isCanSend(8214, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8214);
		}
		/**
		 * 开始战斗
		 * @param state 结果 1成功 2没有队伍 3两个缓存不同步，没有队伍缓存 4队长才能开始战斗 5队伍还在战斗中
		**/
		public static void sendCmd_8216(long hid  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state};
			if(!hero.isCanSend(8216, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8216);
		}
		/**
		 * 场景刷新数据
		 * @param bossHpMax boss气血上限
		 * @param bossHp boss当前气血
		 * @param myHurt 我的伤害
		 * @param hurtList 伤害排行
		**/
		public static void sendCmd_8218(long hid  ,   long  bossHpMax  ,   long  bossHp  ,   long  myHurt  ,   Object[]  hurtList ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{bossHpMax,bossHp,myHurt,hurtList};
			if(!hero.isCanSend(8218, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8218);
		}
		/**
		 * 死亡通知广播其他人
		 * @param id 玩家id
		**/
		public static void sendCmd_8220(long hid  ,   long  id ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{id};
			if(!hero.isCanSend(8220, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8220);
		}
		/**
		 * 刷新队员气血
		 * @param hurtList 队伍气血数据
		**/
		public static void sendCmd_8222(long hid  ,   Object[]  hurtList ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{hurtList};
			if(!hero.isCanSend(8222, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8222);
		}
		/**
		 * 扫荡
		 * @param state 结果 1成功 2没扫荡次数 3首关都未通关，不能扫荡 4今天才首通不能获得扫荡奖励
		 * @param dropTips 所有数据
		**/
		public static void sendCmd_8226(long hid  ,  int  state  ,   Object[]  dropTips ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,dropTips};
			if(!hero.isCanSend(8226, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8226);
		}
		/**
		 * 刷新协助次数
		 * @param numHelpAwards 已协助次数
		 * @param totalHelp 协助总次数
		**/
		public static void sendCmd_8228(long hid  ,  int  numHelpAwards  ,  int  totalHelp ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{numHelpAwards,totalHelp};
			if(!hero.isCanSend(8228, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8228);
		}
}