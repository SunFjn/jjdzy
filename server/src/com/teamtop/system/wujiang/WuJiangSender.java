package com.teamtop.system.wujiang;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * WuJiangSender.java
 * 武将
 */
public class WuJiangSender{
		/**
		 * GC 武将状态
		 * @param wujiangs 
		 * @param jie 武将阶数
		 * @param exp 经验
		 * @param skillid 
		 * @param num1 培养丹数量
		 * @param num2 资质丹数量
		**/
		public static void sendCmd_652(long hid  ,   Object[]  wujiangs  ,   int  jie  ,   int  exp  ,   Object[]  skillid  ,   int  num1  ,   int  num2 ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{wujiangs,jie,exp,skillid,num1,num2};
			if(!hero.isCanSend(652, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 652);
		}
		/**
		 * GC 升阶返回
		 * @param rest 1成功 0失败
		 * @param jie 等阶
		 * @param exp 经验
		**/
		public static void sendCmd_654(long hid  ,  int  rest  ,   int  jie  ,   int  exp ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,jie,exp};
			if(!hero.isCanSend(654, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 654);
		}
		/**
		 * GC 激活/升级技能返回
		 * @param rest 1成功 0失败
		 * @param part 位置
		 * @param skillid 技能id
		**/
		public static void sendCmd_656(long hid  ,  int  rest  ,  int  part  ,   int  skillid ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,part,skillid};
			if(!hero.isCanSend(656, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 656);
		}
		/**
		 * GC 激活武将
		 * @param rest 1成功 0失败
		 * @param type 武将编号
		**/
		public static void sendCmd_660(long hid  ,  int  rest  ,  int  type ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,type};
			if(!hero.isCanSend(660, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 660);
		}
		/**
		 * GC 升星武将返回
		 * @param rest 升星结果1成功 0失败
		 * @param type 武将类型
		 * @param star 武将星级
		**/
		public static void sendCmd_662(long hid  ,  int  rest  ,  int  type  ,   int  star ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,type,star};
			if(!hero.isCanSend(662, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 662);
		}
		/**
		 * GC 使用武将丹药返回
		 * @param rest 1成功 0失败
		 * @param num1 武将培养丹
		 * @param num2 武将资质丹
		**/
		public static void sendCmd_664(long hid  ,  int  rest  ,   int  num1  ,   int  num2 ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,num1,num2};
			if(!hero.isCanSend(664, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 664);
		}
		/**
		 * GC 穿戴将印结果
		 * @param rest 0成功 1失败
		 * @param equips 
		**/
		public static void sendCmd_666(long hid  ,  int  rest  ,   Object[]  equips ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,equips};
			if(!hero.isCanSend(666, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 666);
		}
		/**
		 * GC 合成将印返回
		 * @param rest 0成功，1等级不足，2材料不足，3合成评分低，4装备不能脱下
		 * @param part 位置
		 * @param uid 装备唯一id
		 * @param sysId 系统id
		**/
		public static void sendCmd_668(long hid  ,  int  rest  ,  int  part  ,   long  uid  ,   int  sysId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,part,uid,sysId};
			if(!hero.isCanSend(668, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 668);
		}
		/**
		 * GC 升级将印返回
		 * @param rest 0成功，1等级不足，2材料不足，3合成评分低，4装备不能脱下 5最高阶
		 * @param part 部位
		 * @param uid 装备唯一id
		 * @param sysid 装备id
		**/
		public static void sendCmd_670(long hid  ,  int  rest  ,  int  part  ,   long  uid  ,   int  sysid ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,part,uid,sysid};
			if(!hero.isCanSend(670, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 670);
		}
		/**
		 * GC 分解将印
		 * @param rest 0成功 1失败
		 * @param uid 装备唯一id
		**/
		public static void sendCmd_672(long hid  ,  int  rest  ,   long  uid ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,uid};
			if(!hero.isCanSend(672, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 672);
		}
		/**
		 * GC 出战武将切换
		 * @param rest 0成功 1失败
		 * @param type 武将type
		 * @param fid 武将时装0无
		**/
		public static void sendCmd_674(long hid  ,  int  rest  ,  int  type  ,   int  fid ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,type,fid};
			if(!hero.isCanSend(674, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 674);
		}
		/**
		 * GC 神将之力升级
		 * @param rest 0成功1失败
		 * @param wujiangid 武将id
		 * @param level 当前阶
		**/
		public static void sendCmd_676(long hid  ,  int  rest  ,   int  wujiangid  ,   int  level ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,wujiangid,level};
			if(!hero.isCanSend(676, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 676);
		}
		/**
		 * 神将信息返回
		 * @param shenjiangs 
		**/
		public static void sendCmd_678(long hid  ,   Object[]  shenjiangs ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{shenjiangs};
			if(!hero.isCanSend(678, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 678);
		}
		/**
		 * 神将激活返回
		 * @param state 0.失败 1.成功
		 * @param type 神将编号
		**/
		public static void sendCmd_680(long hid  ,  int  state  ,  int  type ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,type};
			if(!hero.isCanSend(680, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 680);
		}
		/**
		 * 突破/升级神将等级返回
		 * @param state 1.成功 0.失败
		 * @param type 神将编号
		 * @param level 修炼等级
		**/
		public static void sendCmd_682(long hid  ,  int  state  ,  int  type  ,   int  level ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,type,level};
			if(!hero.isCanSend(682, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 682);
		}
		/**
		 * 升级神将天赋返回
		 * @param state 1.成功 0.失败
		 * @param type 神将编号
		 * @param tfLevel 天赋等级
		**/
		public static void sendCmd_684(long hid  ,  int  state  ,  int  type  ,   int  tfLevel ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,type,tfLevel};
			if(!hero.isCanSend(684, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 684);
		}
		/**
		 * 神将之力技能进阶返回
		 * @param state 状态 1：成功，2：未达到神将之力等级，3：已达最大阶，4：道具不足
		 * @param type 武将id
		 * @param level 当前阶
		**/
		public static void sendCmd_686(long hid  ,  int  state  ,   int  type  ,   int  level ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,type,level};
			if(!hero.isCanSend(686, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 686);
		}
}