package com.teamtop.system.signIn;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * SignInSender.java
 * 签到
 */
public class SignInSender{
		/**
		 * 打开界面返回
		 * @param signStateList 签到状态列表
		 * @param accSignBXStateList 累签宝箱状态列表
		 * @param signDay 签到天数
		 * @param restDay 重置剩余天数
		 * @param qs 期数
		**/
		public static void sendCmd_2152(long hid  ,   Object[]  signStateList  ,   Object[]  accSignBXStateList  ,   int  signDay  ,   int  restDay  ,   int  qs ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{signStateList,accSignBXStateList,signDay,restDay,qs};
			if(!hero.isCanSend(2152, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2152);
		}
		/**
		 * 补签返回
		 * @param state 补签状态，0：补签不合法，1：成功，2：元宝不足
		 * @param repairSignDay 成功补签的天数
		**/
		public static void sendCmd_2156(long hid  ,  int  state  ,   int  repairSignDay ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,repairSignDay};
			if(!hero.isCanSend(2156, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2156);
		}
		/**
		 * 签到返回
		 * @param state 签到状态，0：签到失败，1：成功
		 * @param signDay 成功签到天数
		**/
		public static void sendCmd_2154(long hid  ,  int  state  ,   int  signDay ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,signDay};
			if(!hero.isCanSend(2154, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2154);
		}
		/**
		 * 领取累签宝箱奖励返回
		 * @param state 状态，0：奖励不存在，1：成功，2：未达到条件，3：不可重复领取
		 * @param baoxiangId 领取的宝箱id
		**/
		public static void sendCmd_2158(long hid  ,  int  state  ,   int  baoxiangId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,baoxiangId};
			if(!hero.isCanSend(2158, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2158);
		}
}