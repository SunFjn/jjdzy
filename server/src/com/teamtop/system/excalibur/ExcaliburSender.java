package com.teamtop.system.excalibur;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * ExcaliburSender.java
 * 神剑
 */
public class ExcaliburSender{
		/**
		 * 神剑信息返回
		 * @param excaliburId 装备的神剑id
		 * @param num 已使用的神剑属性丹数量
		 * @param excaliburInfo 拥有的神剑信息
		**/
		public static void sendCmd_1002(long hid  ,   int  excaliburId  ,   int  num  ,   Object[]  excaliburInfo ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{excaliburId,num,excaliburInfo};
			if(!hero.isCanSend(1002, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1002);
		}
		/**
		 * 激活神剑结果
		 * @param rtnCode 0：失败，1：成功
		 * @param excaliburId 失败：错误码（1：神剑不存在，2：材料不足），成功：神剑id
		 * @param starLevel 星级
		**/
		public static void sendCmd_1004(long hid  ,  int  rtnCode  ,   int  excaliburId  ,   int  starLevel ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,excaliburId,starLevel};
			if(!hero.isCanSend(1004, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1004);
		}
		/**
		 * 升星结果
		 * @param rtnCode 0：失败，1：成功
		 * @param excaliburId 失败：错误码（1：未激活，2：神剑不存在，3：材料不足），成功：神剑id
		 * @param starLevel 星级
		**/
		public static void sendCmd_1006(long hid  ,  int  rtnCode  ,   int  excaliburId  ,   int  starLevel ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,excaliburId,starLevel};
			if(!hero.isCanSend(1006, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1006);
		}
		/**
		 * 吞噬结果
		 * @param rtnCode 0：失败，1：成功
		 * @param num 失败：错误码（1：材料不足，2：达使用上限），成功：已使用剑神属性丹数量
		**/
		public static void sendCmd_1008(long hid  ,  int  rtnCode  ,   int  num ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,num};
			if(!hero.isCanSend(1008, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1008);
		}
		/**
		 * 神剑操作结果
		 * @param rtnCode 0：失败，1：成功
		 * @param operateType 失败：错误码（1：未激活，2：已装备，3：未装备），成功：操作类型
		 * @param excaliburId 神剑id
		**/
		public static void sendCmd_1010(long hid  ,  int  rtnCode  ,  int  operateType  ,   int  excaliburId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,operateType,excaliburId};
			if(!hero.isCanSend(1010, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1010);
		}
}