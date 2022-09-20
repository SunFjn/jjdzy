package com.teamtop.system.huoShaoChiBi;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * HuoShaoChiBiSender.java
 * 火烧赤壁
 */
public class HuoShaoChiBiSender{
		/**
		 * 打开界面
		 * @param floorNum 当前关数（已通关）
		 * @param maxNum 最高关数（第一名）
		 * @param maxname 最高关数名字（第一名）
		 * @param heroIcon 最高关数头像（第一名）
		 * @param frame 最高关数头像框（第一名）
		**/
		public static void sendCmd_7932(long hid  ,   int  floorNum  ,   int  maxNum  ,   String  maxname  ,   int  heroIcon  ,   int  frame ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{floorNum,maxNum,maxname,heroIcon,frame};
			if(!hero.isCanSend(7932, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 7932);
		}
		/**
		 * 爬塔
		 * @param state 0成功 1失败 
		 * @param goalFloorNum 当前击败关卡
		 * @param result 战斗结果 0失败 1成功 2由前端决定结果
		**/
		public static void sendCmd_7934(long hid  ,  int  state  ,   int  goalFloorNum  ,  int  result ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,goalFloorNum,result};
			if(!hero.isCanSend(7934, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 7934);
		}
		/**
		 * 请求本人关卡奖励
		 * @param goalFloorNum 挑战关卡
		 * @param dropTips boss掉落
		**/
		public static void sendCmd_7936(long hid  ,   int  goalFloorNum  ,   Object[]  dropTips ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{goalFloorNum,dropTips};
			if(!hero.isCanSend(7936, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 7936);
		}
}