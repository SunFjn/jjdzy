package com.teamtop.system.battleGoods;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * BattleGoodsSender.java
 * 粮草抢夺
 */
public class BattleGoodsSender{
		/**
		 * GC 粮草抢夺活动状态
		 * @param state 0关闭 2开启中
		**/
		public static void sendCmd_10100(long hid  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state};
			if(!hero.isCanSend(10100, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10100);
		}
		/**
		 * GC进入返回
		 * @param rest 0成功1失败 2活动结束 3进入cd中
		 * @param cdtime cd时间
		**/
		public static void sendCmd_10102(long hid  ,  int  rest  ,   int  cdtime ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,cdtime};
			if(!hero.isCanSend(10102, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10102);
		}
		/**
		 * 
		 * @param sourceinfos 
		 * @param mysource 我的积分
		 * @param bossinfos 
		 * @param freshTime 下一波强盗刷新时间
		 * @param overTime 活动结束时间
		 * @param index 阵营1-3
		**/
		public static void sendCmd_10104(long hid  ,   Object[]  sourceinfos  ,   int  mysource  ,   Object[]  bossinfos  ,   int  freshTime  ,   int  overTime  ,  int  index ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{sourceinfos,mysource,bossinfos,freshTime,overTime,index};
			if(!hero.isCanSend(10104, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10104);
		}
		/**
		 * GC 请求挑战怪物返回
		 * @param rest 0成功1你的状态不对 2怪物正在战斗3怪不存在
		 * @param monsterid 怪物唯一的id
		**/
		public static void sendCmd_10106(long hid  ,  int  rest  ,   long  monsterid ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,monsterid};
			if(!hero.isCanSend(10106, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10106);
		}
		/**
		 * GC pve返回战斗结束界面
		 * @param monsterid 怪物唯一id
		 * @param rest 0输了 1赢了
		 * @param source 我的积分
		 * @param reward 
		**/
		public static void sendCmd_10108(long hid  ,   long  monsterid  ,  int  rest  ,   int  source  ,   Object[]  reward ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{monsterid,rest,source,reward};
			if(!hero.isCanSend(10108, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10108);
		}
		/**
		 * GC 采集宝箱返回
		 * @param state 0可以采集  >0状态不对（1采集中2pvp中 3pve中 4 为一宝箱发生pvp 5复活cd中 6已被采集了7真正被抢夺中）
		 * @param npcID 采集NPCID
		**/
		public static void sendCmd_10110(long hid  ,  int  state  ,   long  npcID ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,npcID};
			if(!hero.isCanSend(10110, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10110);
		}
		/**
		 * GC 终止采集返回
		 * @param rest 0终止成功 1终止失败
		 * @param boxid 宝箱唯一id
		**/
		public static void sendCmd_10112(long hid  ,  int  rest  ,   long  boxid ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,boxid};
			if(!hero.isCanSend(10112, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10112);
		}
		/**
		 * GC 获取宝箱奖励
		 * @param rest 0成功1失败 2采集时间未到
		 * @param boxid 箱子唯一id
		**/
		public static void sendCmd_10114(long hid  ,  int  rest  ,   long  boxid ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,boxid};
			if(!hero.isCanSend(10114, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10114);
		}
		/**
		 * GC 怼某个玩家返回
		 * @param state 0开打 1对方正在战斗 2复活cd中3同一阵营4你的状态不可开战
		**/
		public static void sendCmd_10116(long hid  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state};
			if(!hero.isCanSend(10116, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10116);
		}
		/**
		 * GC pvp通知玩家战斗结果
		 * @param rest 0胜利 1失败
		 * @param source 我的积分
		**/
		public static void sendCmd_10118(long hid  ,  int  rest  ,   int  source ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,source};
			if(!hero.isCanSend(10118, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10118);
		}
		/**
		 * GC 地图上参与者/宝箱/怪物状态变化
		 * @param stateinfos 
		**/
		public static void sendCmd_10120(long hid  ,   Object[]  stateinfos ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{stateinfos};
			if(!hero.isCanSend(10120, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10120);
		}
		/**
		 * GC 我的积分变化
		 * @param mysource 我的积分
		**/
		public static void sendCmd_10122(long hid  ,   int  mysource ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{mysource};
			if(!hero.isCanSend(10122, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10122);
		}
		/**
		 * GC 打奖励目标ui
		 * @param rewardinfos 
		**/
		public static void sendCmd_10124(long hid  ,   Object[]  rewardinfos ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rewardinfos};
			if(!hero.isCanSend(10124, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10124);
		}
		/**
		 * GC 奖励发生变化
		 * @param index 奖励序号
		 * @param state 奖励状态
		**/
		public static void sendCmd_10126(long hid  ,  int  index  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{index,state};
			if(!hero.isCanSend(10126, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10126);
		}
		/**
		 * GC 退出场景返回
		 * @param rest 0成功 1失败
		**/
		public static void sendCmd_10128(long hid  ,  int  rest ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest};
			if(!hero.isCanSend(10128, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10128);
		}
		/**
		 * GC 个人积分排行榜
		 * @param sourceRanks 
		 * @param mySource 我的积分
		 * @param myRank 我的排名
		**/
		public static void sendCmd_10130(long hid  ,   Object[]  sourceRanks  ,   int  mySource  ,  int  myRank ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{sourceRanks,mySource,myRank};
			if(!hero.isCanSend(10130, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10130);
		}
		/**
		 * GC 区服积分排名
		 * @param zoneidRank 
		 * @param mvpname mvp名字
		 * @param icon 头像
		 * @param farm 头像框
		 * @param mvpjf mvp积分
		**/
		public static void sendCmd_10132(long hid  ,   Object[]  zoneidRank  ,   String  mvpname  ,   int  icon  ,   int  farm  ,   int  mvpjf ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{zoneidRank,mvpname,icon,farm,mvpjf};
			if(!hero.isCanSend(10132, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10132);
		}
		/**
		 * GC 买活返回
		 * @param rest 0成功 1失败 2钱不够
		**/
		public static void sendCmd_10134(long hid  ,  int  rest ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest};
			if(!hero.isCanSend(10134, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10134);
		}
		/**
		 * GC 某个区服阵营积分变化
		 * @param index 阵营1-3
		 * @param zoneid 区服
		 * @param source 积分
		**/
		public static void sendCmd_10136(long hid  ,   int  index  ,   int  zoneid  ,   int  source ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{index,zoneid,source};
			if(!hero.isCanSend(10136, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10136);
		}
		/**
		 * 结束结算面板
		 * @param zoneidJf 
		 * @param mvpname mvp玩家名字
		 * @param icon 头像
		 * @param frame 头像框
		**/
		public static void sendCmd_10138(long hid  ,   Object[]  zoneidJf  ,   String  mvpname  ,   int  icon  ,   int  frame ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{zoneidJf,mvpname,icon,frame};
			if(!hero.isCanSend(10138, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10138);
		}
		/**
		 * GC 某只boss被击杀
		 * @param sysid boss系统id
		 * @param index 被某个势力击杀
		 * @param time 剩余倒计时
		**/
		public static void sendCmd_10140(long hid  ,   int  sysid  ,  int  index  ,   int  time ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{sysid,index,time};
			if(!hero.isCanSend(10140, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10140);
		}
}