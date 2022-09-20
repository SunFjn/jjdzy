package com.teamtop.system.treasure;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * TreasureSender.java
 * 宝物
 */
public class TreasureSender{
		/**
		 * 宝物信息返回
		 * @param wearTreasure1 装备宝物id（位置1）
		 * @param wearTreasure2 装备宝物id（位置2）
		 * @param level 等级
		 * @param exp 经验
		 * @param num 已使用宝物属性丹个数
		 * @param treasureInfo 拥有的宝物信息
		**/
		public static void sendCmd_942(long hid  ,   int  wearTreasure1  ,   int  wearTreasure2  ,   int  level  ,   int  exp  ,   int  num  ,   Object[]  treasureInfo ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{wearTreasure1,wearTreasure2,level,exp,num,treasureInfo};
			if(!hero.isCanSend(942, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 942);
		}
		/**
		 * 切换宝物结果
		 * @param rtnCode 0：失败，1:成功
		 * @param point 失败：错误码（1：未激活宝物），成功：位置
		 * @param treasureId 宝物id
		**/
		public static void sendCmd_944(long hid  ,  int  rtnCode  ,  int  point  ,   int  treasureId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,point,treasureId};
			if(!hero.isCanSend(944, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 944);
		}
		/**
		 * 升级结果返回
		 * @param rtnCode 0：失败，1：成功
		 * @param level 失败：错误码（1：材料不足），成功：等级
		 * @param exp 经验
		**/
		public static void sendCmd_946(long hid  ,  int  rtnCode  ,   int  level  ,   int  exp ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,level,exp};
			if(!hero.isCanSend(946, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 946);
		}
		/**
		 * 激活宝物结果
		 * @param rtnCode 0：失败，1：成功
		 * @param treasureId 失败：错误码（1：宝物不存在，2：材料不足），成功：宝物id
		 * @param starLevel 星级
		**/
		public static void sendCmd_950(long hid  ,  int  rtnCode  ,   int  treasureId  ,   int  starLevel ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,treasureId,starLevel};
			if(!hero.isCanSend(950, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 950);
		}
		/**
		 * 升星结果
		 * @param rtnCode 0：失败，1：成功
		 * @param treasureId 失败：错误码（1：宝物不存在，2：已到达最高星级，3：材料不足），成功：宝物id
		 * @param starLevel 宝物星级
		**/
		public static void sendCmd_952(long hid  ,  int  rtnCode  ,   int  treasureId  ,   int  starLevel ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,treasureId,starLevel};
			if(!hero.isCanSend(952, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 952);
		}
		/**
		 * 吞噬结果
		 * @param rtnCode 吞噬结果：0：失败，1成功
		 * @param num 失败：错误码（1：材料不足，2：达可使用数量上限），成功：已使用宝物属性丹数量
		**/
		public static void sendCmd_954(long hid  ,  int  rtnCode  ,   int  num ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,num};
			if(!hero.isCanSend(954, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 954);
		}
}