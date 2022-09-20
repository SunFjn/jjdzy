package com.teamtop.system.crossBoss;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * CrossBossSender.java
 * 跨服boss-七擒孟获
 */
public class CrossBossSender{
		/**
		 * GC 登陆发生活动状态
		 * @param actinfo 0未开启 1准备 2开启中
		**/
		public static void sendCmd_1700(long hid  ,  int  actinfo ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{actinfo};
			if(!hero.isCanSend(1700, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1700);
		}
		/**
		 * GC 打开ui返回
		 * @param num 剩余进入次数
		 * @param buynum 已经购买次数
		 * @param floornum boss血量加成倍数
		 * @param cd 进入冷却倒计时
		 * @param killname 上次boss击杀者
		**/
		public static void sendCmd_1702(long hid  ,  int  num  ,  int  buynum  ,  int  floornum  ,  int  cd  ,   String  killname ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{num,buynum,floornum,cd,killname};
			if(!hero.isCanSend(1702, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1702);
		}
		/**
		 * GC 打开排行榜
		 * @param ranks 
		 * @param country 我的势力
		 * @param countrys 
		**/
		public static void sendCmd_1704(long hid  ,   Object[]  ranks  ,  int  country  ,   Object[]  countrys ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{ranks,country,countrys};
			if(!hero.isCanSend(1704, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1704);
		}
		/**
		 * GC 买活返回
		 * @param rest 0成功 1失败
		**/
		public static void sendCmd_1706(long hid  ,  int  rest ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest};
			if(!hero.isCanSend(1706, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1706);
		}
		/**
		 * GC 买次数返回
		 * @param rest 0成功 1失败
		 * @param num 剩余次数
		**/
		public static void sendCmd_1708(long hid  ,  int  rest  ,  int  num ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,num};
			if(!hero.isCanSend(1708, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1708);
		}
		/**
		 * GC 进入返回
		 * @param rest 0成功1失败 2活动未开启 3boss已经死亡 4次数不够 5正在冷却时间
		 * @param hurt 
		 * @param buyattnum 购买攻击加成次数
		 * @param liveTime 剩余复活时间
		 * @param myhp 自身血量
		 * @param myMaxHp 自身最大血量
		 * @param bossHp boss血量
		 * @param bossMaxHp boss最大血量
		**/
		public static void sendCmd_1710(long hid  ,  int  rest  ,   Object[]  hurt  ,  int  buyattnum  ,   int  liveTime  ,   long  myhp  ,   long  myMaxHp  ,   long  bossHp  ,   long  bossMaxHp ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,hurt,buyattnum,liveTime,myhp,myMaxHp,bossHp,bossMaxHp};
			if(!hero.isCanSend(1710, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1710);
		}
		/**
		 * GC 同步伤害
		 * @param bossid bossid
		 * @param bosshp boss当前血量
		 * @param bossMaxHp boss最大血量
		 * @param mhp 本人当前血量
		 * @param myhurt 我的伤害
		 * @param name 最高伤害玩家名字
		 * @param maxhurt 最高玩家的伤害
		 * @param countryRank 
		**/
		public static void sendCmd_1712(long hid  ,   int  bossid  ,   long  bosshp  ,   long  bossMaxHp  ,   long  mhp  ,   long  myhurt  ,   String  name  ,   long  maxhurt  ,   Object[]  countryRank ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{bossid,bosshp,bossMaxHp,mhp,myhurt,name,maxhurt,countryRank};
			if(!hero.isCanSend(1712, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1712);
		}
		/**
		 * GC 打开当前boss排行榜
		 * @param bossid bossid
		 * @param hurts 
		**/
		public static void sendCmd_1714(long hid  ,   int  bossid  ,   Object[]  hurts ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{bossid,hurts};
			if(!hero.isCanSend(1714, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1714);
		}
		/**
		 * CG 打开目标伤害奖励领取情况
		 * @param rewards 
		**/
		public static void sendCmd_1716(long hid  ,   Object[]  rewards ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rewards};
			if(!hero.isCanSend(1716, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1716);
		}
		/**
		 * GC 获取奖励返回
		 * @param rest 0成功 1失败
		 * @param index 奖励下标
		 * @param state 奖励状态
		**/
		public static void sendCmd_1718(long hid  ,  int  rest  ,  int  index  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,index,state};
			if(!hero.isCanSend(1718, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1718);
		}
		/**
		 * GC 购买攻击加成
		 * @param rest 0成功1失败
		 * @param attNum 当前攻击加成次数
		**/
		public static void sendCmd_1720(long hid  ,  int  rest  ,  int  attNum ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,attNum};
			if(!hero.isCanSend(1720, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1720);
		}
		/**
		 * GC 通知地图玩家 被boss击杀的玩家id
		 * @param hids 玩家id
		**/
		public static void sendCmd_1722(long hid  ,   Object[]  hids ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{hids};
			if(!hero.isCanSend(1722, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1722);
		}
		/**
		 * GC 通知玩家复活
		 * @param hids 
		**/
		public static void sendCmd_1724(long hid  ,   Object[]  hids ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{hids};
			if(!hero.isCanSend(1724, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1724);
		}
		/**
		 * GC 被击杀的boss
		 * @param diebossid 
		**/
		public static void sendCmd_1726(long hid  ,   Object[]  diebossid ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{diebossid};
			if(!hero.isCanSend(1726, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1726);
		}
		/**
		 * GC 额外活动奖励
		 * @param actid 活动id
		 * @param items 奖励
		**/
		public static void sendCmd_1728(long hid  ,   int  actid  ,   Object[]  items ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{actid,items};
			if(!hero.isCanSend(1728, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1728);
		}
		/**
		 * GC 设置自动复活状态返回
		 * @param state 1开启自动复活 0关闭自动
		**/
		public static void sendCmd_1730(long hid  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state};
			if(!hero.isCanSend(1730, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1730);
		}
		/**
		 * GC 自动复活结果
		 * @param rest 0成功1失败
		**/
		public static void sendCmd_1732(long hid  ,  int  rest ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest};
			if(!hero.isCanSend(1732, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1732);
		}
}