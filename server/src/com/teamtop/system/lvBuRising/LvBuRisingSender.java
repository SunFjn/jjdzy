package com.teamtop.system.lvBuRising;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * LvBuRisingSender.java
 * 吕布降临
 */
public class LvBuRisingSender{
		/**
		 * 返回界面信息
		 * @param rankData 前3排行数据
		 * @param targetData 已领目标奖励
		 * @param myRanking 我的排名
		 * @param score 积分
		**/
		public static void sendCmd_2712(long hid  ,   Object[]  rankData  ,   Object[]  targetData  ,  int  myRanking  ,   int  score ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rankData,targetData,myRanking,score};
			if(!hero.isCanSend(2712, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2712);
		}
		/**
		 * 返回排行数据
		 * @param rankData 排行数据
		**/
		public static void sendCmd_2714(long hid  ,   Object[]  rankData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rankData};
			if(!hero.isCanSend(2714, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2714);
		}
		/**
		 * 领取奖励成功
		 * @param rtnCode 0：失败，1：成功
		 * @param index 失败：错误码，成功：索引ID
		**/
		public static void sendCmd_2716(long hid  ,  int  rtnCode  ,  int  index ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,index};
			if(!hero.isCanSend(2716, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2716);
		}
}