package com.teamtop.system.godbook;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * GodBookSender.java
 * 天书
 */
public class GodBookSender{
		/**
		 * GC 打开天书Ui返回
		 * @param wearid 当前携带天书id 0没有
		 * @param level 天书等级
		 * @param exp 天书经验
		 * @param godbooks 
		 * @param num 天书属性丹数量
		**/
		public static void sendCmd_972(long hid  ,   int  wearid  ,   int  level  ,   int  exp  ,   Object[]  godbooks  ,   int  num ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{wearid,level,exp,godbooks,num};
			if(!hero.isCanSend(972, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 972);
		}
		/**
		 * GC 切换携带天书
		 * @param wearid 当前携带天书id
		**/
		public static void sendCmd_974(long hid  ,   int  wearid ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{wearid};
			if(!hero.isCanSend(974, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 974);
		}
		/**
		 * GC 升级返回
		 * @param rest 0成功 1失败
		 * @param exp 经验
		 * @param level 等级
		**/
		public static void sendCmd_976(long hid  ,  int  rest  ,   int  exp  ,   int  level ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,exp,level};
			if(!hero.isCanSend(976, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 976);
		}
		/**
		 * GC 升星返回
		 * @param rest 0成功1失败
		 * @param bookid 天书id
		 * @param starnum 星级
		**/
		public static void sendCmd_978(long hid  ,  int  rest  ,   int  bookid  ,   int  starnum ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,bookid,starnum};
			if(!hero.isCanSend(978, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 978);
		}
		/**
		 * GC 使用天书属性丹返回
		 * @param rest 0成功 1失败
		 * @param num 属性丹数量
		**/
		public static void sendCmd_980(long hid  ,  int  rest  ,   int  num ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,num};
			if(!hero.isCanSend(980, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 980);
		}
}