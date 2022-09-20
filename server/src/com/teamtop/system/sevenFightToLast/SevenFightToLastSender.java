package com.teamtop.system.sevenFightToLast;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * SevenFightToLastSender.java
 * 开服7日血战到底
 */
public class SevenFightToLastSender{
		/**
		 * GC 打开ui信息
		 * @param num 已通过最高层数
		**/
		public static void sendCmd_2802(long hid  ,   int  num ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{num};
			if(!hero.isCanSend(2802, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2802);
		}
		/**
		 * GC 战斗后端结果
		 * @param rest 0成功 1失败 2背包已满
		 * @param gid 当前关卡id
		 * @param battlerest 战斗结果 0:失败，1：成功，2：由前端结果决定
		**/
		public static void sendCmd_2804(long hid  ,  int  rest  ,   int  gid  ,  int  battlerest ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,gid,battlerest};
			if(!hero.isCanSend(2804, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2804);
		}
		/**
		 * GC boss掉落
		 * @param gid 关卡id
		 * @param items 
		**/
		public static void sendCmd_2806(long hid  ,   int  gid  ,   Object[]  items ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{gid,items};
			if(!hero.isCanSend(2806, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2806);
		}
}