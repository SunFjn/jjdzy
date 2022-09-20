package com.teamtop.system.chuangGuanYouLi;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * ChuangGuanYouLiSender.java
 * 闯关有礼
 */
public class ChuangGuanYouLiSender{
		/**
		 * 打开界面
		 * @param idExcel 目标ID
		 * @param state 目标领取姿态
		 * @param idList 所有目前档ID
		**/
		public static void sendCmd_4152(long hid  ,  int  idExcel  ,  int  state  ,   Object[]  idList ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{idExcel,state,idList};
			if(!hero.isCanSend(4152, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4152);
		}
		/**
		 * 领取任务奖励
		 * @param result 结果  1成功  2奖励不存在  3该任务不属于本目标  4任务初始化失败  5奖励已领取  6任务未达标  7背包已满
		**/
		public static void sendCmd_4154(long hid  ,  int  result ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{result};
			if(!hero.isCanSend(4154, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4154);
		}
		/**
		 * 领取目标奖励
		 * @param result 结果  1成功  2已领取  3目标未初始化，请重新登录  4目标未达成  5背包已满
		**/
		public static void sendCmd_4156(long hid  ,  int  result ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{result};
			if(!hero.isCanSend(4156, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4156);
		}
		/**
		 * 入口开关
		 * @param state 状态  0关  1开
		 * @param now 已领取进度
		 * @param all 总进度
		 * @param id 当前目标ID
		**/
		public static void sendCmd_4150(long hid  ,  int  state  ,  int  now  ,  int  all  ,  int  id ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,now,all,id};
			if(!hero.isCanSend(4150, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4150);
		}
}