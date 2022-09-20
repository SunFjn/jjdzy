package com.teamtop.system.openDaysSystem.otherTotalRecharge;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * OtherTotalRechargeSysSender.java
 * 累计充值（8~28）
 */
public class OtherTotalRechargeSysSender{
		/**
		 * 返回界面信息
		 * @param num 充值金额
		 * @param stateData 奖励状态数据
		**/
		public static void sendCmd_4670(long hid  ,   int  num  ,   Object[]  stateData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{num,stateData};
			if(!hero.isCanSend(4670, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4670);
		}
		/**
		 * 奖励变化
		 * @param index 序号
		 * @param state 奖励状态
		**/
		public static void sendCmd_4672(long hid  ,   int  index  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{index,state};
			if(!hero.isCanSend(4672, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4672);
		}
		/**
		 * 充值金额变化
		 * @param num 金额数量
		**/
		public static void sendCmd_4674(long hid  ,   int  num ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{num};
			if(!hero.isCanSend(4674, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4674);
		}
}