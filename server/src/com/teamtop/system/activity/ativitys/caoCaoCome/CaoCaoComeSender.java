package com.teamtop.system.activity.ativitys.caoCaoCome;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * CaoCaoComeSender.java
 * 曹操来袭
 */
public class CaoCaoComeSender{
		/**
		 * GC 打开活动ui返回
		 * @param state boss入口 0关闭1开启
		 * @param nowBool 当前血量
		 * @param maxBool 最大血量
		 * @param addHpNum 下一个boss的血量加成
		 * @param time 惩罚时间
		**/
		public static void sendCmd_8510(long hid  ,  int  state  ,   long  nowBool  ,   long  maxBool  ,   int  addHpNum  ,   int  time ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,nowBool,maxBool,addHpNum,time};
			if(!hero.isCanSend(8510, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8510);
		}
		/**
		 * GC 打开排行榜返回
		 * @param rankers 
		**/
		public static void sendCmd_8512(long hid  ,   Object[]  rankers ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rankers};
			if(!hero.isCanSend(8512, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8512);
		}
		/**
		 * GC 进入返回
		 * @param rest 成功 1失败 2活动还没开始 3活动已经结束 4惩罚30s时间内5在副本内
		 * @param state 自动复活状态 1开启自动复活 0关闭自动
		**/
		public static void sendCmd_8514(long hid  ,  int  rest  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,state};
			if(!hero.isCanSend(8514, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8514);
		}
		/**
		 * GC 退出返回
		 * @param rest GC 离开 B:0离开成功 1失败
		**/
		public static void sendCmd_8516(long hid  ,  int  rest ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest};
			if(!hero.isCanSend(8516, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8516);
		}
		/**
		 * GC 人物死亡或者复活
		 * @param heroids 
		 * @param dieLive 0活着 1死亡
		**/
		public static void sendCmd_8518(long hid  ,   Object[]  heroids  ,  int  dieLive ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{heroids,dieLive};
			if(!hero.isCanSend(8518, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8518);
		}
		/**
		 * GC 场景刷新个人以及boss数据
		 * @param myHp 我的剩余血量
		 * @param myHurt 我的伤害
		 * @param bossHpMax boss气血上限
		 * @param bossCurHp boss当前气血
		 * @param hurtList 伤害排行数据
		**/
		public static void sendCmd_8520(long hid  ,   long  myHp  ,   long  myHurt  ,   long  bossHpMax  ,   long  bossCurHp  ,   Object[]  hurtList ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{myHp,myHurt,bossHpMax,bossCurHp,hurtList};
			if(!hero.isCanSend(8520, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8520);
		}
		/**
		 * GC 买活返回
		 * @param rest 0成功 1失败 
		**/
		public static void sendCmd_8524(long hid  ,  int  rest ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest};
			if(!hero.isCanSend(8524, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8524);
		}
		/**
		 * GC 自动复活状态
		 * @param state 1开启自动复活 0关闭自动
		**/
		public static void sendCmd_8526(long hid  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state};
			if(!hero.isCanSend(8526, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8526);
		}
		/**
		 * GC 自动复活结果
		 * @param rest 0成功 1失败
		**/
		public static void sendCmd_8528(long hid  ,  int  rest ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest};
			if(!hero.isCanSend(8528, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8528);
		}
		/**
		 * GC boss入口状态
		 * @param state 0关闭了 1开启了
		**/
		public static void sendCmd_8530(long hid  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state};
			if(!hero.isCanSend(8530, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8530);
		}
		/**
		 * GC boss死亡
		**/
		public static void sendCmd_8532(long hid ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = null;
			if(!hero.isCanSend(8532, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8532);
		}
}