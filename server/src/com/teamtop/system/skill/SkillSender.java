package com.teamtop.system.skill;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * SkillSender.java
 * 技能
 */
public class SkillSender{
		/**
		 * 升级技能结果
		 * @param rtnCode 0失败，1成功
		 * @param skillId 成功：技能id，失败：错误码
		**/
		public static void sendCmd_622(long hid  ,  int  rtnCode  ,   int  skillId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,skillId};
			if(!hero.isCanSend(622, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 622);
		}
		/**
		 * 阵眼升级结果
		 * @param rtnCode 0失败，1成功
		 * @param newId 成功：新阵眼id，失败：错误码
		 * @param oldId 旧阵眼id
		**/
		public static void sendCmd_624(long hid  ,  int  rtnCode  ,   int  newId  ,   int  oldId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,newId,oldId};
			if(!hero.isCanSend(624, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 624);
		}
		/**
		 * 一键升级技能
		 * @param rtnCode 升级结果 0失败，1成功
		 * @param skillInfo 技能数据
		**/
		public static void sendCmd_626(long hid  ,  int  rtnCode  ,   Object[]  skillInfo ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,skillInfo};
			if(!hero.isCanSend(626, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 626);
		}
		/**
		 * 触发开启技能
		 * @param site 技能位置
		 * @param id 技能id
		 * @param level 技能等级
		**/
		public static void sendCmd_630(long hid  ,  int  site  ,   int  id  ,  int  level ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{site,id,level};
			if(!hero.isCanSend(630, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 630);
		}
}