package com.teamtop.system.activity.ativitys.kingSecretCrystal;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * KingSecretCrystalSender.java
 * 至尊秘宝
 */
public class KingSecretCrystalSender{
		/**
		 * 返回界面信息
		 * @param drawData 抽奖物品数据
		 * @param drawNum 已抽次数
		**/
		public static void sendCmd_11700(long hid  ,   Object[]  drawData  ,   int  drawNum ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{drawData,drawNum};
			if(!hero.isCanSend(11700, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11700);
		}
		/**
		 * 抽奖结果
		 * @param rtnCode 结果：0：失败，1：成功
		 * @param index 失败：（1：道具不足，2：已无秘宝请重置），成功：序号
		 * @param type 道具类型
		 * @param toolId 道具id
		 * @param num 道具数量
		 * @param board 是否大奖（1是，0否）
		**/
		public static void sendCmd_11702(long hid  ,  int  rtnCode  ,  int  index  ,   int  type  ,   int  toolId  ,   int  num  ,  int  board ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,index,type,toolId,num,board};
			if(!hero.isCanSend(11702, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11702);
		}
		/**
		 * 重置结果
		 * @param rtnCode 结果：0：失败，1：成功
		 * @param type 失败（1：道具不足）
		**/
		public static void sendCmd_11704(long hid  ,  int  rtnCode  ,  int  type ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,type};
			if(!hero.isCanSend(11704, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11704);
		}
}