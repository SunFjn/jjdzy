package com.teamtop.system.boss.monsterGod;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * MonsterGodSender.java
 * 魔神吕布
 */
public class MonsterGodSender{
		/**
		 * GC 魔神吕布活动信息
		 * @param state 0未开启 1 :魔神1 2:魔神2 3:魔神3 4:boss已被击杀
		**/
		public static void sendCmd_1500(long hid  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state};
			if(!hero.isCanSend(1500, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1500);
		}
		/**
		 * GC 打开上一届魔神排行榜
		 * @param ranks 
		**/
		public static void sendCmd_1502(long hid  ,   Object[]  ranks ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{ranks};
			if(!hero.isCanSend(1502, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1502);
		}
		/**
		 * 打开魔神吕布界面返回
		 * @param bossid 当前bossid
		 * @param num 副本内人数
		 * @param hp 剩余血量
		 * @param maxhp 血量最大值
		 * @param time 惩罚剩余时间
		**/
		public static void sendCmd_1504(long hid  ,   int  bossid  ,   int  num  ,   long  hp  ,   long  maxhp  ,  int  time ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{bossid,num,hp,maxhp,time};
			if(!hero.isCanSend(1504, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1504);
		}
		/**
		 * GC 场景刷新个人以及boss数据
		 * @param myHp 我的剩余血量
		 * @param bossid bossid
		 * @param bossHpMax boss气血上限
		 * @param bossCurHp boss当前气血
		 * @param myHurt 我的伤害
		 * @param hurtList 伤害排行数据
		**/
		public static void sendCmd_1506(long hid  ,   long  myHp  ,   int  bossid  ,   long  bossHpMax  ,   long  bossCurHp  ,   long  myHurt  ,   Object[]  hurtList ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{myHp,bossid,bossHpMax,bossCurHp,myHurt,hurtList};
			if(!hero.isCanSend(1506, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1506);
		}
		/**
		 * GC 离开魔神吕布房间
		 * @param rest 0离开成功 1失败
		**/
		public static void sendCmd_1508(long hid  ,  int  rest ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest};
			if(!hero.isCanSend(1508, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1508);
		}
		/**
		 * GC 人物死亡或者复活
		 * @param heroids 
		 * @param dieLive 0活着 1死亡
		**/
		public static void sendCmd_1510(long hid  ,   Object[]  heroids  ,  int  dieLive ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{heroids,dieLive};
			if(!hero.isCanSend(1510, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1510);
		}
		/**
		 * GC 其他被击杀的玩家
		 * @param ids 
		**/
		public static void sendCmd_1512(long hid  ,   Object[]  ids ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{ids};
			if(!hero.isCanSend(1512, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1512);
		}
		/**
		 * GC boss被击杀
		 * @param state 活动状态变化 0未开启 1 :魔神1 2:魔神2 3:魔神3 4:boss已被击杀
		 * @param bossid2 新bossid
		 * @param maxhp 新boss血量上限
		**/
		public static void sendCmd_1514(long hid  ,  int  state  ,   int  bossid2  ,   long  maxhp ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,bossid2,maxhp};
			if(!hero.isCanSend(1514, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1514);
		}
		/**
		 * GC 买活返回
		 * @param rest 0成功 1失败 
		**/
		public static void sendCmd_1516(long hid  ,  int  rest ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest};
			if(!hero.isCanSend(1516, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1516);
		}
		/**
		 * GC 进入返回
		 * @param rest 0成功 1失败 2活动还没开始 3活动已经结束 4惩罚30s时间内  
		**/
		public static void sendCmd_1518(long hid  ,  int  rest ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest};
			if(!hero.isCanSend(1518, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1518);
		}
		/**
		 * GC 额外活动掉落
		 * @param actid 活动id
		 * @param itemids 掉落道具
		**/
		public static void sendCmd_1520(long hid  ,   int  actid  ,   Object[]  itemids ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{actid,itemids};
			if(!hero.isCanSend(1520, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1520);
		}
		/**
		 * GC 吕布血量翻倍次数
		 * @param num 血量翻倍
		**/
		public static void sendCmd_1522(long hid  ,   int  num ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{num};
			if(!hero.isCanSend(1522, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1522);
		}
		/**
		 * GC 自动复活状态
		 * @param state 1开启自动复活 0关闭自动
		**/
		public static void sendCmd_1524(long hid  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state};
			if(!hero.isCanSend(1524, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1524);
		}
		/**
		 * GC 自动复活结果
		 * @param rest 0成功 1失败
		**/
		public static void sendCmd_1526(long hid  ,  int  rest ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest};
			if(!hero.isCanSend(1526, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1526);
		}
}