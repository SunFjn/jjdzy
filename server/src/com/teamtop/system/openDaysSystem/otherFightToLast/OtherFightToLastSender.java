package com.teamtop.system.openDaysSystem.otherFightToLast;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * OtherFightToLastSender.java
 * 血战到底（8~28）
 */
public class OtherFightToLastSender{
		/**
		 * 返回界面信息
		 * @param num 已通过最高层数
		 * @param chaId 已挑战id
		 * @param qs 期数
		**/
		public static void sendCmd_4750(long hid  ,   int  num  ,   int  chaId  ,   int  qs ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{num,chaId,qs};
			if(!hero.isCanSend(4750, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4750);
		}
		/**
		 * 战斗后端结果
		 * @param rest 0成功 1失败 2背包已满
		 * @param nowFloor 当前层数
		 * @param chaId 当前挑战id
		 * @param battlerest 战斗结果 0:失败，1：成功，2：由前端结果决定
		**/
		public static void sendCmd_4752(long hid  ,  int  rest  ,   int  nowFloor  ,   int  chaId  ,  int  battlerest ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,nowFloor,chaId,battlerest};
			if(!hero.isCanSend(4752, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4752);
		}
		/**
		 * boss掉落
		 * @param floor 层数
		 * @param chaId 挑战id
		 * @param items 掉落奖励数据
		**/
		public static void sendCmd_4754(long hid  ,   int  floor  ,   int  chaId  ,   Object[]  items ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{floor,chaId,items};
			if(!hero.isCanSend(4754, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4754);
		}
}