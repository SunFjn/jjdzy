package com.teamtop.system.activity.ativitys.happyCrossKing;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * HappyCrossKingSender.java
 * 全民狂欢—乱世枭雄
 */
public class HappyCrossKingSender{
		/**
		 * GC 打开ui信息
		 * @param rewards 
		 * @param num 完成度
		**/
		public static void sendCmd_2582(long hid  ,   Object[]  rewards  ,   int  num ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rewards,num};
			if(!hero.isCanSend(2582, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2582);
		}
		/**
		 * GC 奖励变化返回
		 * @param index 奖励序号
		 * @param state 奖励状态
		 * @param num 完成度
		**/
		public static void sendCmd_2584(long hid  ,  int  index  ,  int  state  ,   int  num ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{index,state,num};
			if(!hero.isCanSend(2584, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2584);
		}
}