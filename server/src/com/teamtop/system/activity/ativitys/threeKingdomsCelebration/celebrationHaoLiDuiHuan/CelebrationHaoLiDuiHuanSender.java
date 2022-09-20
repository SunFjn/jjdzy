package com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationHaoLiDuiHuan;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * CelebrationHaoLiDuiHuanSender.java
 * 三国庆典-豪礼兑换
 */
public class CelebrationHaoLiDuiHuanSender{
		/**
		 * 打开界面
		 * @param dataList 所有数据
		**/
		public static void sendCmd_4102(long hid  ,   Object[]  dataList ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{dataList};
			if(!hero.isCanSend(4102, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4102);
		}
		/**
		 * 兑换
		 * @param result 结果  1成功
		**/
		public static void sendCmd_4104(long hid  ,  int  result ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{result};
			if(!hero.isCanSend(4104, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4104);
		}
}