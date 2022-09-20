package com.teamtop.system.openDaysSystem.saintMonsterDial;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * SaintMonsterDialSender.java
 * 圣兽降临-圣兽转盘
 */
public class SaintMonsterDialSender{
		/**
		 * 返回界面信息
		 * @param totalRecharge 当前充值数
		 * @param hasTurn 已转次数
		 * @param canTurn 可抽次数
		 * @param dailData 转盘数据
		**/
		public static void sendCmd_5030(long hid  ,   int  totalRecharge  ,   int  hasTurn  ,   int  canTurn  ,   Object[]  dailData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{totalRecharge,hasTurn,canTurn,dailData};
			if(!hero.isCanSend(5030, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 5030);
		}
		/**
		 * 抽奖结果
		 * @param rtnCode 结果：0：失败，1：成功
		 * @param id 失败：（1:没次数，2：全部抽完），成功：抽中位置id
		**/
		public static void sendCmd_5032(long hid  ,  int  rtnCode  ,   int  id ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,id};
			if(!hero.isCanSend(5032, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 5032);
		}
}