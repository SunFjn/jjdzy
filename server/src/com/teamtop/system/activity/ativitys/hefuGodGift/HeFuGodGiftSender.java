package com.teamtop.system.activity.ativitys.hefuGodGift;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * HeFuGodGiftSender.java
 * 合服大神送礼
 */
public class HeFuGodGiftSender{
		/**
		 * GC 打开ui返回
		 * @param recharge 充值金额
		 * @param num1 vip礼包达标人数
		 * @param num2 大神礼包达标人数
		 * @param vipinfos 
		 * @param godsinfos 
		 * @param vipGoals 
		**/
		public static void sendCmd_9600(long hid  ,   int  recharge  ,   int  num1  ,   int  num2  ,   Object[]  vipinfos  ,   Object[]  godsinfos  ,   Object[]  vipGoals ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{recharge,num1,num2,vipinfos,godsinfos,vipGoals};
			if(!hero.isCanSend(9600, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 9600);
		}
		/**
		 * CG 获取奖励
		 * @param rest 成功失败 0成功1 失败
		 * @param index 奖励编号
		 * @param stateornum 奖励状态或者剩余数量
		**/
		public static void sendCmd_9602(long hid  ,  int  rest  ,   int  index  ,   int  stateornum ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,index,stateornum};
			if(!hero.isCanSend(9602, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 9602);
		}
}