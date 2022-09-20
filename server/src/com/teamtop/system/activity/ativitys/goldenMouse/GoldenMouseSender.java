package com.teamtop.system.activity.ativitys.goldenMouse;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * GoldenMouseSender.java
 * 金鼠送财
 */
public class GoldenMouseSender{
		/**
		 * GC 金鼠送财ui
		 * @param rechargeNum 充值数量
		 * @param hasBuyNum 已经购买次数
		 * @param buyNumMax 当前总购买次数
		 * @param getnum 以获取总元宝数
		**/
		public static void sendCmd_11580(long hid  ,   int  rechargeNum  ,   int  hasBuyNum  ,   int  buyNumMax  ,   int  getnum ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rechargeNum,hasBuyNum,buyNumMax,getnum};
			if(!hero.isCanSend(11580, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11580);
		}
		/**
		 * GC 购买投资返回
		 * @param rest 0成功 1元宝不足 2次数不够
		 * @param hasBuyNum 已经购买次数
		 * @param sumNum 获取总元宝数
		**/
		public static void sendCmd_11582(long hid  ,  int  rest  ,   int  hasBuyNum  ,   int  sumNum ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,hasBuyNum,sumNum};
			if(!hero.isCanSend(11582, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11582);
		}
}