package com.teamtop.system.activity.ativitys.flashSale;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * FlashSaleSender.java
 * 限时抢购(活动)
 */
public class FlashSaleSender{
		/**
		 * 打开限时抢购界面返回抢购中和已结束数据
		 * @param buyInfo 抢购信息
		 * @param periods 期数
		**/
		public static void sendCmd_8672(long hid  ,   Object[]  buyInfo  ,   int  periods ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{buyInfo,periods};
			if(!hero.isCanSend(8672, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8672);
		}
		/**
		 * 返回立即抢购信息
		 * @param state 状态：0.已结束 1.成功 2.限购次数已满 3.没有剩余次数 4元宝不足  
		 * @param id 抢购ID  
		 * @param num 已购买次数  
		 * @param remainNum 剩余次数
		**/
		public static void sendCmd_8674(long hid  ,  int  state  ,   int  id  ,  int  num  ,   int  remainNum ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,id,num,remainNum};
			if(!hero.isCanSend(8674, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8674);
		}
}