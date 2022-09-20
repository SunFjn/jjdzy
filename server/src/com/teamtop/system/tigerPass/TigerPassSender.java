package com.teamtop.system.tigerPass;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * TigerPassSender.java
 * 虎牢关
 */
public class TigerPassSender{
		/**
		 * GC 打开ui返回
		 * @param bossindex 当前boss序号
		 * @param curhp boss当前血量
		 * @param maxhp boss最大血量
		 * @param num 剩余进入次数
		 * @param time 距离下次增加次数时间
		 * @param isemploy 自己是否加入雇佣兵0没有1有
		 * @param chooseNum 雇佣别人的次数
		 * @param rewards 
		 * @param employhid 雇佣兵id 0没有 >0有
		 * @param iconid 头像
		 * @param frim 头像框
		 * @param employname 玩家名字
		 * @param vip 玩家vip
		 * @param strength 玩家战力
		**/
		public static void sendCmd_8902(long hid  ,  int  bossindex  ,   long  curhp  ,   long  maxhp  ,  int  num  ,   int  time  ,  int  isemploy  ,  int  chooseNum  ,   Object[]  rewards  ,   long  employhid  ,   int  iconid  ,   int  frim  ,   String  employname  ,   int  vip  ,   long  strength ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{bossindex,curhp,maxhp,num,time,isemploy,chooseNum,rewards,employhid,iconid,frim,employname,vip,strength};
			if(!hero.isCanSend(8902, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8902);
		}
		/**
		 * GC 进入返回
		 * @param rest 0成功 1失败 2次数不足 3已经在副本内 4当前最大层数
		**/
		public static void sendCmd_8904(long hid  ,  int  rest ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest};
			if(!hero.isCanSend(8904, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8904);
		}
		/**
		 * GC 场景刷新个人以及boss数据
		 * @param myHurt 我的伤害
		 * @param bossHpMax boss气血上限
		 * @param bossCurHp boss当前气血
		 * @param hurtList 伤害排行数据
		**/
		public static void sendCmd_8906(long hid  ,   long  myHurt  ,   long  bossHpMax  ,   long  bossCurHp  ,   Object[]  hurtList ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{myHurt,bossHpMax,bossCurHp,hurtList};
			if(!hero.isCanSend(8906, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8906);
		}
		/**
		 * 战斗结果
		 * @param rest 0成功 1失败
		 * @param bossindex 当前boss序号
		 * @param curhp boss当前血量
		 * @param maxhp boss总血量
		 * @param rewards 
		**/
		public static void sendCmd_8908(long hid  ,  int  rest  ,  int  bossindex  ,   long  curhp  ,   long  maxhp  ,   Object[]  rewards ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,bossindex,curhp,maxhp,rewards};
			if(!hero.isCanSend(8908, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8908);
		}
		/**
		 * GC 打开虎牢关招募列表
		 * @param employs 
		**/
		public static void sendCmd_8910(long hid  ,   Object[]  employs ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{employs};
			if(!hero.isCanSend(8910, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8910);
		}
		/**
		 * GC 雇佣返回
		 * @param rest 0成功 1你正在战斗中 2已被别人雇佣满次数 3本人次数不够 4失败
		 * @param choosehid 雇佣兵玩家id
		 * @param coin 雇佣兵头像
		 * @param firm 雇佣兵头像框
		 * @param viplv vip等级
		 * @param strength 玩家战力
		 * @param name 玩家名字
		**/
		public static void sendCmd_8912(long hid  ,  int  rest  ,   long  choosehid  ,   int  coin  ,   int  firm  ,   int  viplv  ,   long  strength  ,   String  name ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,choosehid,coin,firm,viplv,strength,name};
			if(!hero.isCanSend(8912, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8912);
		}
		/**
		 * GC报名加入雇佣行列
		 * @param rest 0成功 1失败 2已经在行列中
		**/
		public static void sendCmd_8914(long hid  ,  int  rest ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest};
			if(!hero.isCanSend(8914, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8914);
		}
		/**
		 * GC 刷新雇佣兵列表
		 * @param rest 0成功 1钱不够 2暂无佣兵 3失败
		**/
		public static void sendCmd_8916(long hid  ,  int  rest ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest};
			if(!hero.isCanSend(8916, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8916);
		}
		/**
		 * GC 层数首通奖励变化
		 * @param lay 层数
		 * @param reward 奖励领取情况 0 1 2
		**/
		public static void sendCmd_8918(long hid  ,  int  lay  ,  int  reward ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{lay,reward};
			if(!hero.isCanSend(8918, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8918);
		}
}