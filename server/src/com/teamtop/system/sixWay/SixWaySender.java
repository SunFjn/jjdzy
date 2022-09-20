package com.teamtop.system.sixWay;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * SixWaySender.java
 * 六道
 */
public class SixWaySender{
		/**
		 * GC 打开ui返回
		 * @param str 总战力
		 * @param yinnum 印记碎片数量
		 * @param infos 
		 * @param bagEquips 
		**/
		public static void sendCmd_11902(long hid  ,   long  str  ,   int  yinnum  ,   Object[]  infos  ,   Object[]  bagEquips ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{str,yinnum,infos,bagEquips};
			if(!hero.isCanSend(11902, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11902);
		}
		/**
		 * GC 打开x道返回
		 * @param index 索引
		 * @param equips 
		**/
		public static void sendCmd_11904(long hid  ,  int  index  ,   Object[]  equips ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{index,equips};
			if(!hero.isCanSend(11904, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11904);
		}
		/**
		 * GC 使用印记
		 * @param rest 装备/卸下结果0成功1不允许装备类型2失败
		 * @param type 类型
		 * @param place 背包索引
		 * @param index 身上索引
		**/
		public static void sendCmd_11906(long hid  ,  int  rest  ,  int  type  ,   int  place  ,   int  index ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,type,place,index};
			if(!hero.isCanSend(11906, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11906);
		}
		/**
		 * GC 升级装备位置上印记
		 * @param rest 0成功1失败
		 * @param eplace 位置索引
		 * @param indexid 印记id
		 * @param level 等级
		**/
		public static void sendCmd_11908(long hid  ,  int  rest  ,   int  eplace  ,   int  indexid  ,   int  level ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,eplace,indexid,level};
			if(!hero.isCanSend(11908, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11908);
		}
		/**
		 * GC升星返回
		 * @param rest 升星结果0成功1失败
		 * @param place 印记位置
		 * @param eid 印记id
		 * @param star 印记星级
		 * @param bagindex 被消耗的的印记背包位置
		**/
		public static void sendCmd_11910(long hid  ,  int  rest  ,   int  place  ,   int  eid  ,   int  star  ,   int  bagindex ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,place,eid,star,bagindex};
			if(!hero.isCanSend(11910, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11910);
		}
		/**
		 * GC分解返回
		 * @param rest 结果0成功1失败
		 * @param index 
		**/
		public static void sendCmd_11912(long hid  ,  int  rest  ,   Object[]  index ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,index};
			if(!hero.isCanSend(11912, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11912);
		}
		/**
		 * GC 添加印记 
		 * @param yinji 
		 * @param leftnum 背包剩余位置
		**/
		public static void sendCmd_11914(long hid  ,   Object[]  yinji  ,   int  leftnum ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{yinji,leftnum};
			if(!hero.isCanSend(11914, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11914);
		}
		/**
		 * GC 分解结果
		 * @param rest 0成功 1失败
		 * @param types 
		**/
		public static void sendCmd_11916(long hid  ,  int  rest  ,   Object[]  types ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,types};
			if(!hero.isCanSend(11916, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11916);
		}
		/**
		 * GC 印记组合战力发生变化
		 * @param str 总战力
		 * @param yinjis 
		**/
		public static void sendCmd_11918(long hid  ,   int  str  ,   Object[]  yinjis ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{str,yinjis};
			if(!hero.isCanSend(11918, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11918);
		}
}