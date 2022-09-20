package com.teamtop.system.activity.ativitys.playBalloon;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * PlayBalloonSender.java
 * 打气球
 */
public class PlayBalloonSender{
		/**
		 * 打开打气球返回
		 * @param itemList 气球信息 
		 * @param num 剩余子弹数量
		 * @param yuanbao 当前消费元宝
		 * @param qs 期数
		**/
		public static void sendCmd_10000(long hid  ,   Object[]  itemList  ,   int  num  ,   int  yuanbao  ,   int  qs ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{itemList,num,yuanbao,qs};
			if(!hero.isCanSend(10000, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10000);
		}
		/**
		 * 射击返回
		 * @param state 状态：1.成功 2.参数错误 3.背包已满 4.该位置已被射击 5.剩余次数不足
		 * @param index 射击编号
		 * @param type 道具类型
		 * @param id 道具ID
		 * @param num 数量
		 * @param surplusNum 剩余子弹次数
		**/
		public static void sendCmd_10002(long hid  ,  int  state  ,  int  index  ,  int  type  ,   int  id  ,   int  num  ,   int  surplusNum ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,index,type,id,num,surplusNum};
			if(!hero.isCanSend(10002, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10002);
		}
}