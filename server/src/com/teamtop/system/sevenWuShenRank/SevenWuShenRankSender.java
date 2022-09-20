package com.teamtop.system.sevenWuShenRank;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * SevenWuShenRankSender.java
 * 7日武圣榜
 */
public class SevenWuShenRankSender{
		/**
		 * GC 登陆发送
		 * @param index 开服第几天
		**/
		public static void sendCmd_2300(long hid  ,   int  index ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{index};
			if(!hero.isCanSend(2300, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2300);
		}
		/**
		 * GC 打开ui信息
		 * @param str 我的x榜战力
		 * @param rankIndex 我的x榜排名
		 * @param rewards 
		 * @param ranks 
		**/
		public static void sendCmd_2302(long hid  ,   long  str  ,   int  rankIndex  ,   Object[]  rewards  ,   Object[]  ranks ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{str,rankIndex,rewards,ranks};
			if(!hero.isCanSend(2302, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2302);
		}
		/**
		 * GC 奖励发生变化
		 * @param index 奖励序号
		 * @param state 奖励状态0不能领1可以领2已经领完
		**/
		public static void sendCmd_2304(long hid  ,   int  index  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{index,state};
			if(!hero.isCanSend(2304, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2304);
		}
}