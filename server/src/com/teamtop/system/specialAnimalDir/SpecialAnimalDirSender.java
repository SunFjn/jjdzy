package com.teamtop.system.specialAnimalDir;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * SpecialAnimalDirSender.java
 * 异兽录
 */
public class SpecialAnimalDirSender{
		/**
		 * 打开界面返回
		 * @param specialAnimalList 异兽录列表
		**/
		public static void sendCmd_8392(long hid  ,   Object[]  specialAnimalList ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{specialAnimalList};
			if(!hero.isCanSend(8392, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8392);
		}
		/**
		 * 激活或升级返回
		 * @param state 状态：1：成功，2：已达最高级，3：道具不足
		 * @param upId 异兽录升级表等级lv
		 * @param curExp 当前经验
		 * @param suitId 异兽录套装表等级lv
		 * @param step 阶数
		**/
		public static void sendCmd_8394(long hid  ,  int  state  ,   int  upId  ,   int  curExp  ,   int  suitId  ,   int  step ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,upId,curExp,suitId,step};
			if(!hero.isCanSend(8394, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8394);
		}
		/**
		 * 返回异兽天赋界面信息
		 * @param talentsData 异兽天赋数据
		**/
		public static void sendCmd_8396(long hid  ,   Object[]  talentsData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{talentsData};
			if(!hero.isCanSend(8396, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8396);
		}
		/**
		 * 升级结果返回
		 * @param rtnCode 结果：0：失败，1：成功
		 * @param animalId 失败：（1：未满足条件），成功：异兽id
		 * @param skillId 天赋技能id
		**/
		public static void sendCmd_8398(long hid  ,  int  rtnCode  ,   int  animalId  ,   int  skillId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,animalId,skillId};
			if(!hero.isCanSend(8398, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8398);
		}
		/**
		 * 升级天赋装备返回
		 * @param rtnCode 结果：0：失败，1：成功
		 * @param animalId 失败：（1：道具不足，2：已达最大等级），成功：异兽id
		 * @param equipId 装备id
		 * @param equipLevel 装备等级
		**/
		public static void sendCmd_8400(long hid  ,  int  rtnCode  ,   int  animalId  ,   int  equipId  ,   int  equipLevel ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,animalId,equipId,equipLevel};
			if(!hero.isCanSend(8400, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8400);
		}
		/**
		 * 升品结果返回
		 * @param rtnCode 结果：0：失败，1：成功
		 * @param animalId 失败：（），成功：异兽id
		 * @param equipId 装备id
		 * @param quality 品质id
		**/
		public static void sendCmd_8402(long hid  ,  int  rtnCode  ,   int  animalId  ,   int  equipId  ,   int  quality ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,animalId,equipId,quality};
			if(!hero.isCanSend(8402, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8402);
		}
}