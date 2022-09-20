package com.teamtop.system.bingfa;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * BingFaSender.java
 * 兵法
 */
public class BingFaSender{
		/**
		 * GC 获取兵法返回
		 * @param bingfas 已经激活兵法
		 * @param taozhuang 
		 * @param num 兵法属性丹数量
		**/
		public static void sendCmd_900(long hid  ,   Object[]  bingfas  ,   Object[]  taozhuang  ,   int  num ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{bingfas,taozhuang,num};
			if(!hero.isCanSend(900, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 900);
		}
		/**
		 * GC 激活/升级兵法返回
		 * @param rest 0成功 1失败
		 * @param index 兵法id
		 * @param star 兵法星级
		**/
		public static void sendCmd_904(long hid  ,  int  rest  ,   int  index  ,   int  star ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,index,star};
			if(!hero.isCanSend(904, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 904);
		}
		/**
		 * GC  激活/升阶某个兵法套装返回
		 * @param rest 0成功 1失败
		 * @param index 兵法套装 1/2/3
		 * @param id 兵法套装id
		**/
		public static void sendCmd_906(long hid  ,  int  rest  ,  int  index  ,   int  id ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,index,id};
			if(!hero.isCanSend(906, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 906);
		}
		/**
		 * GC 使用丹药返回
		 * @param rest 0使用成功 1失败
		 * @param num 兵法属性丹数量
		**/
		public static void sendCmd_908(long hid  ,  int  rest  ,   int  num ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,num};
			if(!hero.isCanSend(908, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 908);
		}
		/**
		 * GC
		 * @param type 系统type 1神剑2异宝3兵法4宝物5天书
		 * @param jie 等阶
		 * @param exp 经验
		 * @param skills 
		**/
		public static void sendCmd_910(long hid  ,  int  type  ,   int  jie  ,   int  exp  ,   Object[]  skills ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{type,jie,exp,skills};
			if(!hero.isCanSend(910, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 910);
		}
		/**
		 * GC 升阶返回
		 * @param type 1-5
		 * @param rest 0成功1失败
		 * @param jie 阶数
		 * @param exp 经验
		**/
		public static void sendCmd_912(long hid  ,  int  type  ,  int  rest  ,   int  jie  ,   int  exp ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{type,rest,jie,exp};
			if(!hero.isCanSend(912, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 912);
		}
		/**
		 * GC 升级技能返回
		 * @param type 1-5
		 * @param rest 0成功1失败
		 * @param index 位置1-5
		 * @param id 技能id
		**/
		public static void sendCmd_914(long hid  ,  int  type  ,  int  rest  ,  int  index  ,   int  id ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{type,rest,index,id};
			if(!hero.isCanSend(914, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 914);
		}
}