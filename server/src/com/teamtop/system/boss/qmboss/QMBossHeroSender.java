package com.teamtop.system.boss.qmboss;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * QMBossHeroSender.java
 * 全民boss
 */
public class QMBossHeroSender{
		/**
		 * GC 打开全名bossUi
		 * @param num 剩余进入全民boss次数
		 * @param resec 次数恢复剩余秒
		 * @param bossList 
		**/
		public static void sendCmd_1352(long hid  ,   int  num  ,   int  resec  ,   Object[]  bossList ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{num,resec,bossList};
			if(!hero.isCanSend(1352, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1352);
		}
		/**
		 * GC 进入全名boss
		 * @param rest 0成功 1失败 2等级/转生不够 3次数不够 4你要退出当前场景
		 * @param fbid 副本id
		**/
		public static void sendCmd_1354(long hid  ,  int  rest  ,   int  fbid ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,fbid};
			if(!hero.isCanSend(1354, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1354);
		}
		/**
		 * GC 全民BOSS场景刷新数据
		 * @param myHp 我的剩余血量
		 * @param bossHpMax boss气血上限
		 * @param bossCurHp boss当前气血
		 * @param myHurt 我的伤害
		 * @param hurtList 伤害排行数据
		**/
		public static void sendCmd_1356(long hid  ,   long  myHp  ,   long  bossHpMax  ,   long  bossCurHp  ,   long  myHurt  ,   Object[]  hurtList ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{myHp,bossHpMax,bossCurHp,myHurt,hurtList};
			if(!hero.isCanSend(1356, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1356);
		}
		/**
		 * GC 被杀死的玩家
		 * @param hids 
		**/
		public static void sendCmd_1358(long hid  ,   Object[]  hids ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{hids};
			if(!hero.isCanSend(1358, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1358);
		}
		/**
		 * GC 离开全民boss关卡
		 * @param rest 0成功 1失败
		 * @param fbid 当前关卡id
		**/
		public static void sendCmd_1360(long hid  ,  int  rest  ,   int  fbid ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,fbid};
			if(!hero.isCanSend(1360, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1360);
		}
		/**
		 * GC 打开排行榜
		 * @param rest 0成功 1失败 2不在副本内
		 * @param info 
		**/
		public static void sendCmd_1362(long hid  ,  int  rest  ,   Object[]  info ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,info};
			if(!hero.isCanSend(1362, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1362);
		}
		/**
		 * GC 登录推送全民BOSS的数据 
		 * @param num 剩余挑战次数
		 * @param time I:次数恢复时间戳
		 * @param data 
		**/
		public static void sendCmd_1364(long hid  ,   int  num  ,   int  time  ,   Object[]  data ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{num,time,data};
			if(!hero.isCanSend(1364, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1364);
		}
		/**
		 * GC boss死亡奖励发放
		 * @param index boss索引
		 * @param itemid 
		**/
		public static void sendCmd_1366(long hid  ,  int  index  ,   Object[]  itemid ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{index,itemid};
			if(!hero.isCanSend(1366, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1366);
		}
		/**
		 * 获取单机奖励
		 * @param res 1胜利0失败
		 * @param fubId 副本id
		 * @param rewArr 奖励
		**/
		public static void sendCmd_1368(long hid  ,  int  res  ,   int  fubId  ,   Object[]  rewArr ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{res,fubId,rewArr};
			if(!hero.isCanSend(1368, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1368);
		}
		/**
		 * GC扫荡结果
		 * @param rest 0成功1等级或者vip未达标2没有通关过3有人在副本内不能扫荡
		 * @param fbid 副本id
		 * @param rewArr 奖励
		**/
		public static void sendCmd_1370(long hid  ,  int  rest  ,   int  fbid  ,   Object[]  rewArr ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,fbid,rewArr};
			if(!hero.isCanSend(1370, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1370);
		}
}