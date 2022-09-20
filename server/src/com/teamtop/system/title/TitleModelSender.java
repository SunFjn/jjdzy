package com.teamtop.system.title;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * TitleModelSender.java
 * 称号系统
 */
public class TitleModelSender{
		/**
		 * GC返回称号界面信息
		 * @param wearId 当前穿戴的称号id
		 * @param titleMap 已拥有的称号id集合
		**/
		public static void sendCmd_502(long hid  ,   int  wearId  ,   Object[]  titleMap ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{wearId,titleMap};
			if(!hero.isCanSend(502, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 502);
		}
		/**
		 * GC返回操作称号结果
		 * @param titleId 称号id
		 * @param type 操作：1.穿  2.脱
		**/
		public static void sendCmd_504(long hid  ,   int  titleId  ,  int  type ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{titleId,type};
			if(!hero.isCanSend(504, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 504);
		}
		/**
		 * 登录时后端推送角色当前佩戴的称号id
		 * @param curTitleId 当前称号id
		**/
		public static void sendCmd_506(long hid  ,   int  curTitleId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{curTitleId};
			if(!hero.isCanSend(506, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 506);
		}
		/**
		 * GC通知前端称号过期
		 * @param titleId 称号id
		**/
		public static void sendCmd_508(long hid  ,   int  titleId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{titleId};
			if(!hero.isCanSend(508, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 508);
		}
		/**
		 * 激活称号结果
		 * @param rtnCode 0:失败，1：成
		 * @param titleId 失败：错误码(1:非永久称号无法激活；2：已获得称号，3：道具不足)，成功：称号id
		**/
		public static void sendCmd_510(long hid  ,  int  rtnCode  ,   int  titleId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,titleId};
			if(!hero.isCanSend(510, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 510);
		}
		/**
		 * 称号升级
		 * @param rtnCode 0:失败，1：成功
		 * @param titleId 失败：错误码（1：未获得该称号，2：已达最高等级，3：非可进价类型称号，4：材料不足），成功：称号id
		 * @param level 称号等级
		**/
		public static void sendCmd_514(long hid  ,  int  rtnCode  ,   int  titleId  ,  int  level ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,titleId,level};
			if(!hero.isCanSend(514, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 514);
		}
		/**
		 * 获得称号
		 * @param titleId 称号id
		 * @param level 等级
		**/
		public static void sendCmd_512(long hid  ,   int  titleId  ,  int  level ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{titleId,level};
			if(!hero.isCanSend(512, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 512);
		}
}