package com.teamtop.system.activity.ativitys.baoZangPinTu;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * BaoZangPinTuSender.java
 * 宝藏拼图
 */
public class BaoZangPinTuSender{
		/**
		 * 打开界面返回
		 * @param taskInfos 任务信息
		 * @param boxInfos 宝箱信息
		**/
		public static void sendCmd_10650(long hid  ,   Object[]  taskInfos  ,   Object[]  boxInfos ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{taskInfos,boxInfos};
			if(!hero.isCanSend(10650, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10650);
		}
		/**
		 * 激活拼图返回
		 * @param state 状态:0-成功,1-失败
		 * @param cfgId 任务id
		 * @param taskState 任务状态
		**/
		public static void sendCmd_10652(long hid  ,  int  state  ,   int  cfgId  ,  int  taskState ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,cfgId,taskState};
			if(!hero.isCanSend(10652, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10652);
		}
		/**
		 * 领取宝箱奖励返回
		 * @param state 状态:0-成功,1-失败
		 * @param cfgId 宝箱id
		**/
		public static void sendCmd_10654(long hid  ,  int  state  ,   int  cfgId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,cfgId};
			if(!hero.isCanSend(10654, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10654);
		}
}