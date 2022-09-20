package com.teamtop.system.scene;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * SceneSender.java
 * 场景
 */
public class SceneSender{
		/**
		 * GC进入场景返回
		 * @param rest 0成功 1失败
		 * @param sid 场景id
		 * @param x 坐标X
		 * @param y 坐标y
		**/
		public static void sendCmd_3902(long hid  ,  int  rest  ,   int  sid  ,  int  x  ,  int  y ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,sid,x,y};
			if(!hero.isCanSend(3902, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3902);
		}
		/**
		 * GC 添加玩家：X协议
		**/
		public static void sendCmd_3904(long hid ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = null;
			if(!hero.isCanSend(3904, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3904);
		}
		/**
		 * GC删除显示对象
		 * @param id 玩家id
		 * @param type 类型
		**/
		public static void sendCmd_3906(long hid  ,   long  id  ,  int  type ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{id,type};
			if(!hero.isCanSend(3906, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3906);
		}
		/**
		 * GC 移动
		 * @param id 玩家id
		 * @param type 类型
		 * @param posarr 坐标集合
		**/
		public static void sendCmd_3908(long hid  ,   long  id  ,  int  type  ,   Object[]  posarr ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{id,type,posarr};
			if(!hero.isCanSend(3908, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3908);
		}
		/**
		 * GC停止移动
		 * @param id ID
		 * @param pox x
		 * @param poy y
		 * @param type 类型1：人 2：非战斗NPC，3：战斗NPC
		**/
		public static void sendCmd_3910(long hid  ,   long  id  ,  int  pox  ,  int  poy  ,  int  type ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{id,pox,poy,type};
			if(!hero.isCanSend(3910, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3910);
		}
		/**
		 * GC设置新坐标
		 * @param x x
		 * @param y y
		**/
		public static void sendCmd_3914(long hid  ,   int  x  ,   int  y ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{x,y};
			if(!hero.isCanSend(3914, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3914);
		}
		/**
		 * GC 广播玩家最新信息
		 * @param map key为属性，value为属性值
		**/
		public static void sendCmd_3916(long hid  ,   String  map ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{map};
			if(!hero.isCanSend(3916, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3916);
		}
		/**
		 * GC 添加npc额外信息X协议    废弃U:npc信息
		**/
		public static void sendCmd_3918(long hid ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = null;
			if(!hero.isCanSend(3918, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3918);
		}
}