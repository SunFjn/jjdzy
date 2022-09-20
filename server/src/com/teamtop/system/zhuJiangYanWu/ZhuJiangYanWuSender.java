package com.teamtop.system.zhuJiangYanWu;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * ZhuJiangYanWuSender.java
 * 诸将演武
 */
public class ZhuJiangYanWuSender{
		/**
		 * 登录数据
		 * @param state 活动状态  0未开启  1开启
		**/
		public static void sendCmd_4712(long hid  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state};
			if(!hero.isCanSend(4712, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4712);
		}
		/**
		 * 打开界面
		 * @param result 结果
		 * @param allData 所有数据
		 * @param num 剩余挑战次数
		**/
		public static void sendCmd_4714(long hid  ,  int  result  ,   Object[]  allData  ,  int  num ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{result,allData,num};
			if(!hero.isCanSend(4714, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4714);
		}
		/**
		 * 挑战
		 * @param result 结果  1开打  2该位置不存在  3没有挑战次数  4该位置今天没有武将  5活动未开启  6未激活，演武令不足
		 * @param npcid 怪物id
		**/
		public static void sendCmd_4716(long hid  ,  int  result  ,   long  npcid ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{result,npcid};
			if(!hero.isCanSend(4716, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4716);
		}
		/**
		 * 战斗结果
		 * @param result 结果  1成功    2该位置不存在  3没有挑战次数  4该位置今天没有武将  5活动未开启  6未激活，演武令不足  7战斗失败
		**/
		public static void sendCmd_4718(long hid  ,  int  result ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{result};
			if(!hero.isCanSend(4718, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4718);
		}
}