package com.teamtop.system.boss.countryBoss;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * CountryBossSender.java
 * 国家boss
 */
public class CountryBossSender{
		/**
		 * GC 打开国家boss返回
		 * @param bossIndex 当前boss序号
		 * @param maxHp boss最大气血
		 * @param hp boss当前气血
		 * @param killBossinfo 
		 * @param battleNum 我的剩余boss挑战数
		 * @param buyNum 今日购买次数
		 * @param rewards 
		**/
		public static void sendCmd_3202(long hid  ,   int  bossIndex  ,   long  maxHp  ,   long  hp  ,   Object[]  killBossinfo  ,   int  battleNum  ,   int  buyNum  ,   Object[]  rewards ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{bossIndex,maxHp,hp,killBossinfo,battleNum,buyNum,rewards};
			if(!hero.isCanSend(3202, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3202);
		}
		/**
		 * GC 场景中伤害数据同步
		 * @param myHp 我的气血
		 * @param bossHpMax boss最大气血
		 * @param bossCurHp boss当前血量
		 * @param myHurt 我的伤害值
		 * @param hurtList 
		**/
		public static void sendCmd_3206(long hid  ,   long  myHp  ,   long  bossHpMax  ,   long  bossCurHp  ,   long  myHurt  ,   Object[]  hurtList ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{myHp,bossHpMax,bossCurHp,myHurt,hurtList};
			if(!hero.isCanSend(3206, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3206);
		}
		/**
		 * GC 退出返回
		 * @param rest 0成功发奖励 1失败
		**/
		public static void sendCmd_3208(long hid  ,  int  rest ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest};
			if(!hero.isCanSend(3208, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3208);
		}
		/**
		 * GC 被击杀的玩家id
		 * @param hids 
		**/
		public static void sendCmd_3210(long hid  ,   Object[]  hids ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{hids};
			if(!hero.isCanSend(3210, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3210);
		}
		/**
		 * GC 广播副本内玩家boss死亡
		**/
		public static void sendCmd_3212(long hid ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = null;
			if(!hero.isCanSend(3212, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3212);
		}
		/**
		 * GC 购买次数返回
		 * @param rest 0成功 1目前次数已满 2购买次数达到上限 3货币不足
		 * @param times 剩余次数
		**/
		public static void sendCmd_3214(long hid  ,  int  rest  ,  int  times ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,times};
			if(!hero.isCanSend(3214, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3214);
		}
		/**
		 * GC 进入国家返回
		 * @param rest 0成功 1次数不够 2boss已经死亡3你已经在副本内
		 * @param bossid bossid
		**/
		public static void sendCmd_3204(long hid  ,  int  rest  ,   int  bossid ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,bossid};
			if(!hero.isCanSend(3204, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3204);
		}
		/**
		 * GC 获取boss通过奖励
		 * @param rest 0成功 1失败 2背包已满
		 * @param bossid bossId
		**/
		public static void sendCmd_3216(long hid  ,  int  rest  ,   int  bossid ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,bossid};
			if(!hero.isCanSend(3216, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3216);
		}
		/**
		 * GC打开排行榜
		 * @param index boss序号
		 * @param hurtlist 伤害排行数组
		 * @param myhurt 我的伤害
		**/
		public static void sendCmd_3218(long hid  ,  int  index  ,   Object[]  hurtlist  ,   long  myhurt ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{index,hurtlist,myhurt};
			if(!hero.isCanSend(3218, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3218);
		}
		/**
		 * GC 国家排行
		 * @param countrylist 国家排行
		**/
		public static void sendCmd_3220(long hid  ,   Object[]  countrylist ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{countrylist};
			if(!hero.isCanSend(3220, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3220);
		}
}