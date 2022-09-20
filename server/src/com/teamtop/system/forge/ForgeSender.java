package com.teamtop.system.forge;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * ForgeSender.java
 * 锻造
 */
public class ForgeSender{
		/**
		 * GC 后端返回
		 * @param forge 角色锻造数据
		 * @param shihunNum 
		 * @param suitNum 强化套装阶数
		 * @param stoneNum 宝石套装阶数
		 * @param starnum 升星套装阶数
		**/
		public static void sendCmd_552(long hid  ,   Object[]  forge  ,   Object[]  shihunNum  ,  int  suitNum  ,  int  stoneNum  ,  int  starnum ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{forge,shihunNum,suitNum,stoneNum,starnum};
			if(!hero.isCanSend(552, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 552);
		}
		/**
		 * GC 1成功，2 位置不对，3、已经满级，4，消耗物品不够强化返回
		 * @param flag 成功失败标志
		 * @param index 位置
		 * @param level 当前级别
		**/
		public static void sendCmd_554(long hid  ,  int  flag  ,  int  index  ,   int  level ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{flag,index,level};
			if(!hero.isCanSend(554, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 554);
		}
		/**
		 * GC 宝石镶嵌返回
		 * @param flag 成功失败标志 1成功、0失败
		 * @param part 装备位置
		 * @param index 宝石位置
		 * @param baoshi 宝石id
		**/
		public static void sendCmd_556(long hid  ,  int  flag  ,  int  part  ,  int  index  ,   int  baoshi ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{flag,part,index,baoshi};
			if(!hero.isCanSend(556, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 556);
		}
		/**
		 * GC 拆宝石返回
		 * @param rest 1成功 0失败
		 * @param part 部位
		 * @param index 宝石部位
		 * @param baoshi 宝石id
		**/
		public static void sendCmd_558(long hid  ,  int  rest  ,  int  part  ,  int  index  ,   int  baoshi ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,part,index,baoshi};
			if(!hero.isCanSend(558, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 558);
		}
		/**
		 * GC 背包内合成返回
		 * @param rest 合成返回1成功 0失败
		 * @param baoshiid 宝石id
		**/
		public static void sendCmd_560(long hid  ,  int  rest  ,   int  baoshiid ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,baoshiid};
			if(!hero.isCanSend(560, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 560);
		}
		/**
		 * GC 合成宝石到装备
		 * @param flag 1成功 0失败
		 * @param part 装备位置
		 * @param index 宝石位置
		 * @param baoshi 宝石id
		**/
		public static void sendCmd_562(long hid  ,  int  flag  ,  int  part  ,  int  index  ,   int  baoshi ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{flag,part,index,baoshi};
			if(!hero.isCanSend(562, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 562);
		}
		/**
		 * GC 一键装备宝石
		 * @param baoshiinfos 
		**/
		public static void sendCmd_564(long hid  ,   Object[]  baoshiinfos ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{baoshiinfos};
			if(!hero.isCanSend(564, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 564);
		}
		/**
		 * GC 升星返回
		 * @param rest 升星 1成功 0失败 2满级 3材料不足
		 * @param part 部位
		 * @param star 星级
		**/
		public static void sendCmd_566(long hid  ,  int  rest  ,  int  part  ,   int  star ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,part,star};
			if(!hero.isCanSend(566, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 566);
		}
		/**
		 * GC 铸魂返回
		 * @param rest 铸魂结果1成功 0失败
		 * @param part 部位
		 * @param level 铸魂等级
		 * @param exp 铸魂经验
		**/
		public static void sendCmd_568(long hid  ,  int  rest  ,  int  part  ,   int  level  ,   int  exp ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,part,level,exp};
			if(!hero.isCanSend(568, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 568);
		}
		/**
		 * GC 噬魂结果
		 * @param rest 噬魂结果1成功 0失败
		 * @param type 位置
		 * @param num 数量
		**/
		public static void sendCmd_570(long hid  ,  int  rest  ,  int  type  ,   int  num ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,type,num};
			if(!hero.isCanSend(570, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 570);
		}
		/**
		 * GC 一键强化结果影响部位
		 * @param part 
		**/
		public static void sendCmd_572(long hid  ,   Object[]  part ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{part};
			if(!hero.isCanSend(572, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 572);
		}
		/**
		 * GC 一键铸魂返回
		 * @param rest 1成功 0失败
		 * @param part 部位
		 * @param level 铸魂等级
		 * @param exp 铸魂经验
		**/
		public static void sendCmd_574(long hid  ,  int  rest  ,  int  part  ,   int  level  ,   int  exp ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,part,level,exp};
			if(!hero.isCanSend(574, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 574);
		}
		/**
		 * GC 一键合成宝石返回
		 * @param rest 0成功 1失败
		 * @param sysid 宝石id
		**/
		public static void sendCmd_576(long hid  ,  int  rest  ,   int  sysid ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,sysid};
			if(!hero.isCanSend(576, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 576);
		}
		/**
		 * 套装升阶成功返回
		 * @param result 1成功0失败
		 * @param type 类型
		 * @param lv 阶数
		**/
		public static void sendCmd_578(long hid  ,  int  result  ,  int  type  ,  int  lv ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{result,type,lv};
			if(!hero.isCanSend(578, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 578);
		}
		/**
		 * 完美升星返回
		 * @param result 1成功0失败
		 * @param part 装备部位
		 * @param star 星级
		**/
		public static void sendCmd_580(long hid  ,  int  result  ,  int  part  ,  int  star ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{result,part,star};
			if(!hero.isCanSend(580, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 580);
		}
		/**
		 * GC 玩家装备升星战力
		 * @param starSter 装备升星总战力
		**/
		public static void sendCmd_582(long hid  ,   int  starSter ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{starSter};
			if(!hero.isCanSend(582, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 582);
		}
		/**
		 * GC 炼魂大师等级
		 * @param lv 等级
		 * @param arr 转生装备炼魂经验等级
		**/
		public static void sendCmd_584(long hid  ,  int  lv  ,   Object[]  arr ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{lv,arr};
			if(!hero.isCanSend(584, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 584);
		}
		/**
		 * GC 提升炼魂大师等级返回
		 * @param rest 0成功 1失败
		 * @param lv 等级大师等级
		**/
		public static void sendCmd_586(long hid  ,  int  rest  ,  int  lv ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,lv};
			if(!hero.isCanSend(586, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 586);
		}
		/**
		 * GC 炼魂返回
		 * @param rest 0成功1失败
		 * @param part 位置
		 * @param lv 等级
		 * @param exp 经验
		**/
		public static void sendCmd_588(long hid  ,  int  rest  ,  int  part  ,   int  lv  ,   int  exp ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,part,lv,exp};
			if(!hero.isCanSend(588, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 588);
		}
}