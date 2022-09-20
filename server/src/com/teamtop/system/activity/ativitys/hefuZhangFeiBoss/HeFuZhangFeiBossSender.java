package com.teamtop.system.activity.ativitys.hefuZhangFeiBoss;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * HeFuZhangFeiBossSender.java
 * 合服张飞醉酒
 */
public class HeFuZhangFeiBossSender{
		/**
		 * GC 打开ui返回
		 * @param state boss状态0未开启 1开启 2已经击杀
		 * @param bossindex boss序号
		 * @param curHp 当前血量
		 * @param maxHp 最大血量
		 * @param cd 惩罚时间
		 * @param zuiyi 醉意
		 * @param bossreward 
		 * @param addjiuNums 各种酒元宝敬酒次数
		**/
		public static void sendCmd_9640(long hid  ,  int  state  ,  int  bossindex  ,   long  curHp  ,   long  maxHp  ,   int  cd  ,   int  zuiyi  ,   Object[]  bossreward  ,   Object[]  addjiuNums ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,bossindex,curHp,maxHp,cd,zuiyi,bossreward,addjiuNums};
			if(!hero.isCanSend(9640, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 9640);
		}
		/**
		 * GC 敬酒返回
		 * @param rest 敬酒结果0成功 1失败
		 * @param type 敬酒类型
		 * @param zuiyi 张飞醉意
		 * @param state boss状态
		 * @param num I:元宝敬酒次数
		**/
		public static void sendCmd_9642(long hid  ,  int  rest  ,  int  type  ,   int  zuiyi  ,  int  state  ,   int  num ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,type,zuiyi,state,num};
			if(!hero.isCanSend(9642, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 9642);
		}
		/**
		 * GC boss状态变化
		 * @param bossid 当前boss序号
		 * @param state boss状态1开启 2被杀
		 * @param zuiyi 醉意
		 * @param curHp 当前血量
		 * @param maxHp 最大血量
		**/
		public static void sendCmd_9644(long hid  ,   int  bossid  ,  int  state  ,   int  zuiyi  ,   long  curHp  ,   long  maxHp ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{bossid,state,zuiyi,curHp,maxHp};
			if(!hero.isCanSend(9644, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 9644);
		}
		/**
		 * GC 进入返回
		 * @param rest 成功 1失败 2活动还没开始 3活动已经结束 4惩罚30s时间内5在副本内
		 * @param state 自动复活状态 1开启自动复活 0关闭自动
		**/
		public static void sendCmd_9646(long hid  ,  int  rest  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,state};
			if(!hero.isCanSend(9646, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 9646);
		}
		/**
		 * GC 退出返回
		 * @param rest 离开 B:0离开成功 1失败
		**/
		public static void sendCmd_9648(long hid  ,  int  rest ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest};
			if(!hero.isCanSend(9648, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 9648);
		}
		/**
		 * GC 人物死亡或者复活
		 * @param heroids 
		 * @param dieLive 0活着 1死亡
		**/
		public static void sendCmd_9650(long hid  ,   Object[]  heroids  ,  int  dieLive ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{heroids,dieLive};
			if(!hero.isCanSend(9650, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 9650);
		}
		/**
		 * GC 场景刷新个人以及boss数据
		 * @param myHp 我的剩余血量
		 * @param myHurt 我的伤害
		 * @param bossHpMax boss气血上限
		 * @param bossCurHp boss当前气血
		 * @param hurtList 伤害排行数据
		**/
		public static void sendCmd_9652(long hid  ,   long  myHp  ,   long  myHurt  ,   long  bossHpMax  ,   long  bossCurHp  ,   Object[]  hurtList ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{myHp,myHurt,bossHpMax,bossCurHp,hurtList};
			if(!hero.isCanSend(9652, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 9652);
		}
		/**
		 * GC 买活返回
		 * @param rest 0成功 1失败 
		**/
		public static void sendCmd_9656(long hid  ,  int  rest ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest};
			if(!hero.isCanSend(9656, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 9656);
		}
		/**
		 * GC 自动复活状态
		 * @param state 1开启自动复活 0关闭自动
		**/
		public static void sendCmd_9658(long hid  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state};
			if(!hero.isCanSend(9658, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 9658);
		}
		/**
		 * GC 自动复活结果
		 * @param rest 0成功 1失败
		**/
		public static void sendCmd_9660(long hid  ,  int  rest ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest};
			if(!hero.isCanSend(9660, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 9660);
		}
		/**
		 * GC 通知场景内玩家boss死亡
		**/
		public static void sendCmd_9662(long hid ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = null;
			if(!hero.isCanSend(9662, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 9662);
		}
		/**
		 * GC 醉意排行榜
		 * @param rankinfos 
		 * @param myRank 我的排名
		 * @param myWine 我的敬酒
		**/
		public static void sendCmd_9664(long hid  ,   Object[]  rankinfos  ,  int  myRank  ,   int  myWine ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rankinfos,myRank,myWine};
			if(!hero.isCanSend(9664, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 9664);
		}
		/**
		 * GC boss被击杀奖励情况
		 * @param index boss序号
		 * @param state 奖励情况0 1 2
		**/
		public static void sendCmd_9666(long hid  ,   int  index  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{index,state};
			if(!hero.isCanSend(9666, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 9666);
		}
}