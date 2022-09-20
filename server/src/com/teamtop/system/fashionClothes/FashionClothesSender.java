package com.teamtop.system.fashionClothes;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * FashionClothesSender.java
 * 时装
 */
public class FashionClothesSender{
		/**
		 * GC  查看武将时装
		 * @param wid 武将id
		 * @param wearid 当前佩戴皮肤0没有
		 * @param hasfid 已经拥有时装id
		**/
		public static void sendCmd_3502(long hid  ,   int  wid  ,   int  wearid  ,   Object[]  hasfid ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{wid,wearid,hasfid};
			if(!hero.isCanSend(3502, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3502);
		}
		/**
		 * GC 激活/升阶时装
		 * @param rest 0成功1失败
		 * @param fid 时装id
		 * @param star 时装星级
		**/
		public static void sendCmd_3504(long hid  ,  int  rest  ,   int  fid  ,   int  star ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,fid,star};
			if(!hero.isCanSend(3504, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3504);
		}
		/**
		 * GC 穿戴时装返回
		 * @param rest 0成功1失败
		 * @param fid 时装id
		**/
		public static void sendCmd_3506(long hid  ,  int  rest  ,   int  fid ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,fid};
			if(!hero.isCanSend(3506, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3506);
		}
		/**
		 * GC 已经激活的时装
		 * @param arr 
		**/
		public static void sendCmd_3508(long hid  ,   Object[]  arr ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{arr};
			if(!hero.isCanSend(3508, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3508);
		}
		/**
		 * GC 获取所有武将时装
		 * @param fashs 已经拥有时装id
		**/
		public static void sendCmd_3510(long hid  ,   Object[]  fashs ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{fashs};
			if(!hero.isCanSend(3510, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3510);
		}
}