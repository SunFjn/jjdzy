package com.teamtop.system.equip;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * EquipSender.java
 * 装备
 */
public class EquipSender{
		/**
		 * GC 身上装备数据
		 * @param data 装备数据
		**/
		public static void sendCmd_350(long hid  ,   Object[]  data ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{data};
			if(!hero.isCanSend(350, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 350);
		}
		/**
		 * GC 不在身上装备数据
		 * @param data 装备数据
		**/
		public static void sendCmd_352(long hid  ,   Object[]  data ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{data};
			if(!hero.isCanSend(352, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 352);
		}
		/**
		 * GC 一键穿戴装备返回
		 * @param rtnCode 返回值，0成功，1不成功
		 * @param pos 更换的装备信息
		**/
		public static void sendCmd_354(long hid  ,  int  rtnCode  ,   Object[]  pos ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,pos};
			if(!hero.isCanSend(354, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 354);
		}
		/**
		 * GC 神装升级返回
		 * @param rtnCode 0成功，1等级不足，2材料不足，3已到最高级
		 * @param bodyIndex 身上位置
		 * @param equipId 装备唯一id
		 * @param sysId 装备系统id
		**/
		public static void sendCmd_362(long hid  ,  int  rtnCode  ,  int  bodyIndex  ,   long  equipId  ,   int  sysId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,bodyIndex,equipId,sysId};
			if(!hero.isCanSend(362, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 362);
		}
		/**
		 * GC 神装合成返回
		 * @param rtnCode 0成功，1等级不足，2材料不足，3合成评分低，4装备不能脱下
		 * @param bodyIndex 身上位置
		 * @param equipId 装备唯一id
		 * @param sysId 装备系统id
		**/
		public static void sendCmd_364(long hid  ,  int  rtnCode  ,  int  bodyIndex  ,   long  equipId  ,   int  sysId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,bodyIndex,equipId,sysId};
			if(!hero.isCanSend(364, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 364);
		}
		/**
		 * GC 神装/转生装备 分解返回
		 * @param rtnCode 0成功，1不成功
		 * @param equipId 装备唯一id
		**/
		public static void sendCmd_366(long hid  ,  int  rtnCode  ,   long  equipId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,equipId};
			if(!hero.isCanSend(366, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 366);
		}
		/**
		 * GC 穿戴神装返回
		 * @param rtnCode 返回值，0成功，1不成功
		 * @param pos 更换的装备信息
		**/
		public static void sendCmd_356(long hid  ,  int  rtnCode  ,   Object[]  pos ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,pos};
			if(!hero.isCanSend(356, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 356);
		}
		/**
		 * 获取神装套装阶数
		 * @param jie 阶数
		**/
		public static void sendCmd_368(long hid  ,  int  jie ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{jie};
			if(!hero.isCanSend(368, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 368);
		}
		/**
		 * GC 升阶神装套装返回
		 * @param rest 0成功 1失败 2材料不够 3最高阶了
		 * @param jie 当前阶数
		**/
		public static void sendCmd_370(long hid  ,  int  rest  ,  int  jie ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,jie};
			if(!hero.isCanSend(370, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 370);
		}
		/**
		 * GC 装备唯一id装备
		 * @param rest 0成功 1失败
		 * @param uid 装备唯一id
		**/
		public static void sendCmd_372(long hid  ,  int  rest  ,   long  uid ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,uid};
			if(!hero.isCanSend(372, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 372);
		}
		/**
		 * 一键穿戴转生装备返回
		 * @param rest 返回值，0成功，1不成功
		 * @param arr 更换的装备信息
		**/
		public static void sendCmd_374(long hid  ,  int  rest  ,   Object[]  arr ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,arr};
			if(!hero.isCanSend(374, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 374);
		}
		/**
		 * GC一键穿戴装备通过系统
		 * @param rest 0成功1失败
		 * @param type 系统
		 * @param eids 更换的装备信息
		**/
		public static void sendCmd_376(long hid  ,  int  rest  ,  int  type  ,   Object[]  eids ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,type,eids};
			if(!hero.isCanSend(376, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 376);
		}
		/**
		 * GC 洗练返回
		 * @param rest 0成功 1失败
		 * @param index 装备位置索引
		 * @param type 属性类型
		 * @param num 属性值
		**/
		public static void sendCmd_378(long hid  ,  int  rest  ,   int  index  ,   int  type  ,   int  num ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,index,type,num};
			if(!hero.isCanSend(378, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 378);
		}
		/**
		 * GC某件神装洗练返回
		 * @param arrs 
		**/
		public static void sendCmd_380(long hid  ,   Object[]  arrs ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{arrs};
			if(!hero.isCanSend(380, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 380);
		}
}