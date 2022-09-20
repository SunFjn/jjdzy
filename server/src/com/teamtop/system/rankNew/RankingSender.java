package com.teamtop.system.rankNew;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * RankingSender.java
 * 排行榜
 */
public class RankingSender{
		/**
		 * 排行榜数据返回
		 * @param rankType 排行榜类型
		 * @param rankList 排行数据
		**/
		public static void sendCmd_1452(long hid  ,  int  rankType  ,   Object[]  rankList ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rankType,rankList};
			if(!hero.isCanSend(1452, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1452);
		}
}