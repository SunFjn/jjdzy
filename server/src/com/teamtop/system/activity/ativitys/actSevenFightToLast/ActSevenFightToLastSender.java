package com.teamtop.system.activity.ativitys.actSevenFightToLast;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * ActSevenFightToLastSender.java
 * 活动血战到底
 */
public class ActSevenFightToLastSender{
		/**
		 * GC 打开ui信息
		 * @param qishu 期数
		 * @param num 已经通关最高层
		**/
		public static void sendCmd_2832(long hid  ,   int  qishu  ,   int  num ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{qishu,num};
			if(!hero.isCanSend(2832, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2832);
		}
		/**
		 * GC 挑战返回
		 * @param rest 0成功 1失败 2背包已满
		 * @param gid 当前关卡id
		 * @param battleRest 战斗结果 0:失败，1：成功，2：由前端结果决定
		**/
		public static void sendCmd_2834(long hid  ,  int  rest  ,   int  gid  ,  int  battleRest ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,gid,battleRest};
			if(!hero.isCanSend(2834, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2834);
		}
		/**
		 * GC 获取奖励返回
		 * @param gid 关卡id
		 * @param items 
		**/
		public static void sendCmd_2836(long hid  ,   int  gid  ,   Object[]  items ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{gid,items};
			if(!hero.isCanSend(2836, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2836);
		}
}