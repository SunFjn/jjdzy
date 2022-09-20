package com.teamtop.system.godWeapon;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * GodWeaponSender.java
 * 专属神兵
 */
public class GodWeaponSender{
		/**
		 * GC 初始化
		 * @param arrs 我的神兵
		 * @param leftHightNum 必得高级道具剩余次数
		 * @param sumNum 工匠锤次数
		 * @param qs 期数
		**/
		public static void sendCmd_7850(long hid  ,   Object[]  arrs  ,  int  leftHightNum  ,   int  sumNum  ,   int  qs ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{arrs,leftHightNum,sumNum,qs};
			if(!hero.isCanSend(7850, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 7850);
		}
		/**
		 * GC 激活/升星 返回
		 * @param rest 0成功 1失败 2材料不足 3对应武将没有激活
		 * @param type 武将类型
		 * @param star 当前专属神兵星级
		**/
		public static void sendCmd_7852(long hid  ,  int  rest  ,  int  type  ,   int  star ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,type,star};
			if(!hero.isCanSend(7852, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 7852);
		}
		/**
		 * GC 穿戴专属神兵返回
		 * @param rest 0成功 1失败
		 * @param type 武将类型
		 * @param weaponid 神兵id
		**/
		public static void sendCmd_7854(long hid  ,  int  rest  ,  int  type  ,   int  weaponid ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,type,weaponid};
			if(!hero.isCanSend(7854, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 7854);
		}
		/**
		 * GC 神铸返回
		 * @param rest 0成功 1失败 2吞噬上限了
		 * @param type 武将类型
		 * @param type1 神铸类型
		 * @param num 已经吞噬个数
		**/
		public static void sendCmd_7856(long hid  ,  int  rest  ,  int  type  ,  int  type1  ,   int  num ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,type,type1,num};
			if(!hero.isCanSend(7856, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 7856);
		}
		/**
		 * GC激活/升级专属神兵等级返回
		 * @param rest 0成功1失败 2不满足条件
		 * @param type 武将类型
		 * @param lv 专属神兵等级
		**/
		public static void sendCmd_7858(long hid  ,  int  rest  ,  int  type  ,   int  lv ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,type,lv};
			if(!hero.isCanSend(7858, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 7858);
		}
		/**
		 * GC 升级淬炼等级
		 * @param rest 0成功 1失败 2满级了
		 * @param type 武将类型
		 * @param type1 淬炼方式01次 1一键
		 * @param lv 淬炼等级
		 * @param exp 淬炼经验
		**/
		public static void sendCmd_7860(long hid  ,  int  rest  ,  int  type  ,  int  type1  ,   int  lv  ,   int  exp ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,type,type1,lv,exp};
			if(!hero.isCanSend(7860, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 7860);
		}
		/**
		 * GC 激活新的武器模型
		 * @param type 类型
		 * @param weaponid 武器索引
		**/
		public static void sendCmd_7862(long hid  ,  int  type  ,   int  weaponid ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{type,weaponid};
			if(!hero.isCanSend(7862, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 7862);
		}
		/**
		 * GC 锻造神兵结果
		 * @param rest 锻造返回0成功 1元宝不足 2
		 * @param type 0工匠锤 1神匠锤
		 * @param items 
		 * @param leftHighNum 必得高级道具剩余次数
		 * @param sumNum 工匠锤次数
		 * @param qs 期数
		**/
		public static void sendCmd_7864(long hid  ,  int  rest  ,  int  type  ,   Object[]  items  ,  int  leftHighNum  ,   int  sumNum  ,   int  qs ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,type,items,leftHighNum,sumNum,qs};
			if(!hero.isCanSend(7864, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 7864);
		}
}