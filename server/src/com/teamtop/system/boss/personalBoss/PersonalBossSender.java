package com.teamtop.system.boss.personalBoss;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * PersonalBossSender.java
 * 个人BOSS
 */
public class PersonalBossSender{
		/**
		 * 请求挑战Boss结果
		 * @param rtnCode 0：失败，1：成功，2：前端控制
		 * @param bossId 失败：错误码（1：装备背包格子不足，2：boss未开启，3：已无挑战次数，4：boss未复活），成功：bossId
		 * @param result 战斗结果：0：失败，1：成功
		**/
		public static void sendCmd_1254(long hid  ,  int  rtnCode  ,   int  bossId  ,  int  result ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,bossId,result};
			if(!hero.isCanSend(1254, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1254);
		}
		/**
		 * 掉落结算
		 * @param bossId bossId
		 * @param leftCha 剩余挑战次数
		 * @param dropData 掉落数据
		**/
		public static void sendCmd_1256(long hid  ,   int  bossId  ,   int  leftCha  ,   Object[]  dropData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{bossId,leftCha,dropData};
			if(!hero.isCanSend(1256, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1256);
		}
		/**
		 * 一键扫荡结果
		 * @param bossId 扫荡了的boss集合
		 * @param dropData 掉落奖励
		**/
		public static void sendCmd_1258(long hid  ,   Object[]  bossId  ,   Object[]  dropData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{bossId,dropData};
			if(!hero.isCanSend(1258, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1258);
		}
		/**
		 * 个人boss信息返回
		 * @param bossInfo boss信息
		**/
		public static void sendCmd_1252(long hid  ,   Object[]  bossInfo ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{bossInfo};
			if(!hero.isCanSend(1252, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1252);
		}
}