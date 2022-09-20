package com.teamtop.system.firstRechargeNew;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * FirstRechargeNewSender.java
 * 新首充
 */
public class FirstRechargeNewSender{
		/**
		 * 打开界面信息返回
		 * @param awardData 首充奖励领取状态数据
		**/
		public static void sendCmd_2752(long hid  ,   Object[]  awardData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{awardData};
			if(!hero.isCanSend(2752, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2752);
		}
		/**
		 * 领取结果返回
		 * @param retCode 0：失败，1：成功
		 * @param index 失败：错误码（1：未充值该档次，2：已领取），成功：首充档次id
		**/
		public static void sendCmd_2754(long hid  ,  int  retCode  ,  int  index ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{retCode,index};
			if(!hero.isCanSend(2754, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2754);
		}
		/**
		 * 每天首次登录，显示主页面
		**/
		public static void sendCmd_2756(long hid ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = null;
			if(!hero.isCanSend(2756, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2756);
		}
}