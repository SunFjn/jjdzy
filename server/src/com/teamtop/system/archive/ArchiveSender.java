package com.teamtop.system.archive;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * ArchiveSender.java
 * 图鉴
 */
public class ArchiveSender{
		/**
		 * 界面信息返回
		 * @param archiveInfo 图鉴数据
		 * @param setInfo 套装信息
		**/
		public static void sendCmd_872(long hid  ,   Object[]  archiveInfo  ,   Object[]  setInfo ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{archiveInfo,setInfo};
			if(!hero.isCanSend(872, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 872);
		}
		/**
		 * 激活结果
		 * @param rtnCode 0:失败 ；1:成功
		 * @param archiveId 失败：错误码（1：不可重复激活，2：材料不足），成功:图鉴id
		 * @param levelIndex 图鉴等级索引
		 * @param starIndex 图鉴星级索引
		**/
		public static void sendCmd_874(long hid  ,  int  rtnCode  ,   int  archiveId  ,   int  levelIndex  ,   int  starIndex ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,archiveId,levelIndex,starIndex};
			if(!hero.isCanSend(874, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 874);
		}
		/**
		 * 图鉴升级结果返回
		 * @param rtnCode 0：失败，1：成功
		 * @param archiveId 失败：错误码（1：未激活该图鉴，2：到达等级上限，3：材料不足），成功：图鉴id
		 * @param levelIndex 图鉴等级索引
		**/
		public static void sendCmd_876(long hid  ,  int  rtnCode  ,   int  archiveId  ,   int  levelIndex ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,archiveId,levelIndex};
			if(!hero.isCanSend(876, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 876);
		}
		/**
		 * 图鉴升星结果
		 * @param rtnCode 0：失败，1：成功
		 * @param archiveId 失败：错误码（1：未激活该图鉴，1：达到星级上限，2：材料不足），成功：图鉴id
		 * @param index 图鉴星级索引
		**/
		public static void sendCmd_878(long hid  ,  int  rtnCode  ,   int  archiveId  ,   int  index ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,archiveId,index};
			if(!hero.isCanSend(878, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 878);
		}
		/**
		 * 套装升级结果
		 * @param rtnCode 0：失败，1：成功
		 * @param setId 失败：错误码（1：未达升级条件），成功：套装id
		**/
		public static void sendCmd_880(long hid  ,  int  rtnCode  ,   int  setId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,setId};
			if(!hero.isCanSend(880, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 880);
		}
}