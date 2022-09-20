package com.teamtop.system.crossTeamKing;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * CrossTeamKingSender.java
 * 跨服王者
 */
public class CrossTeamKingSender{
		/**
		 * 广播活动状态
		 * @param state 0未开启 1开启中
		**/
		public static void sendCmd_10820(long hid  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state};
			if(!hero.isCanSend(10820, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10820);
		}
		/**
		 * GC 打开ui返回
		 * @param state 活动状态0未开启 1开启中
		 * @param reborn 转生段位
		 * @param duanwei 段位
		 * @param jf 本赛季积分
		 * @param rank 本赛季排名
		 * @param winNum 胜利厂数
		 * @param battleNum 剩余挑战次数
		 * @param buynum 已经购买次数
		 * @param todayReward 
		 * @param continuitywin 当前连胜次数
		**/
		public static void sendCmd_10822(long hid  ,  int  state  ,  int  reborn  ,  int  duanwei  ,   int  jf  ,   int  rank  ,   int  winNum  ,   int  battleNum  ,   int  buynum  ,   Object[]  todayReward  ,   int  continuitywin ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,reborn,duanwei,jf,rank,winNum,battleNum,buynum,todayReward,continuitywin};
			if(!hero.isCanSend(10822, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10822);
		}
		/**
		 * GC 创建队伍返回
		 * @param rest 0成功 1已经存在 2活动未开启 3次数不够
		 * @param teamid 队伍id
		**/
		public static void sendCmd_10824(long hid  ,  int  rest  ,   int  teamid ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,teamid};
			if(!hero.isCanSend(10824, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10824);
		}
		/**
		 * 邀请返回
		 * @param rest B: 0成功 1失败 2你没在队伍中 3你不是队长 5队员已满 6操作太频繁
		**/
		public static void sendCmd_10826(long hid  ,  int  rest ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest};
			if(!hero.isCanSend(10826, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10826);
		}
		/**
		 * 邀请的广播
		 * @param teamid 队伍id
		 * @param name 队长名字
		**/
		public static void sendCmd_10828(long hid  ,   int  teamid  ,   String  name ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{teamid,name};
			if(!hero.isCanSend(10828, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10828);
		}
		/**
		 * GC 请求加入队伍返回
		 * @param rest 0请求成功 1队伍不存在 2队伍己满3次数不够4转生区间不符合6已在队伍中7队伍正在匹配8正在战斗中
		**/
		public static void sendCmd_10830(long hid  ,  int  rest ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest};
			if(!hero.isCanSend(10830, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10830);
		}
		/**
		 * GC 队伍信息变化
		 * @param type 0创建队伍1有加入2有人退出
		 * @param capHid 队长id
		 * @param teamid 队伍id
		 * @param teaminfo 
		**/
		public static void sendCmd_10832(long hid  ,  int  type  ,   long  capHid  ,   int  teamid  ,   Object[]  teaminfo ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{type,capHid,teamid,teaminfo};
			if(!hero.isCanSend(10832, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10832);
		}
		/**
		 * GC 广播队伍中玩家 位置交换
		 * @param index1 队伍位置1
		 * @param index2 队伍位置2
		**/
		public static void sendCmd_10834(long hid  ,  int  index1  ,  int  index2 ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{index1,index2};
			if(!hero.isCanSend(10834, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10834);
		}
		/**
		 * GC 退出队伍
		 * @param rest 0退出成功1 失败
		**/
		public static void sendCmd_10836(long hid  ,  int  rest ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest};
			if(!hero.isCanSend(10836, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10836);
		}
		/**
		 * GC移除队员返回
		 * @param rest 0移除成功1你不是队长2失败
		**/
		public static void sendCmd_10838(long hid  ,  int  rest ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest};
			if(!hero.isCanSend(10838, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10838);
		}
		/**
		 * GC 匹配战斗结果
		 * @param rest 0开始匹配1队长次数不够2时间未到3失败4队员次数不够
		**/
		public static void sendCmd_10840(long hid  ,  int  rest ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest};
			if(!hero.isCanSend(10840, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10840);
		}
		/**
		 * GC 匹配到对手
		 * @param myteam 己方
		 * @param enemyteam 敌方
		**/
		public static void sendCmd_10842(long hid  ,   Object[]  myteam  ,   Object[]  enemyteam ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{myteam,enemyteam};
			if(!hero.isCanSend(10842, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10842);
		}
		/**
		 * 战斗情况
		 * @param teamid 队伍id
		 * @param dieindex 死亡的index
		**/
		public static void sendCmd_10844(long hid  ,   int  teamid  ,   int  dieindex ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{teamid,dieindex};
			if(!hero.isCanSend(10844, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10844);
		}
		/**
		 * GC战斗后 界面更新
		 * @param duanwei 段位
		 * @param jf 本赛季积分
		 * @param rank 本赛季排名
		 * @param winnum 胜利场数
		 * @param leftNum 剩余挑战次数
		**/
		public static void sendCmd_10846(long hid  ,  int  duanwei  ,   int  jf  ,   int  rank  ,   int  winnum  ,   int  leftNum ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{duanwei,jf,rank,winnum,leftNum};
			if(!hero.isCanSend(10846, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10846);
		}
		/**
		 * GC 打开排行榜
		 * @param rebornType 转生段位
		 * @param myrank 排名
		 * @param myduanwei 段位
		 * @param rankinfo 
		**/
		public static void sendCmd_10848(long hid  ,  int  rebornType  ,   int  myrank  ,   int  myduanwei  ,   Object[]  rankinfo ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rebornType,myrank,myduanwei,rankinfo};
			if(!hero.isCanSend(10848, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10848);
		}
		/**
		 * GC 奖励变化
		 * @param index 奖励索引
		 * @param state 奖励状态0 1 2
		**/
		public static void sendCmd_10850(long hid  ,   int  index  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{index,state};
			if(!hero.isCanSend(10850, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10850);
		}
		/**
		 * GC 战报返回
		 * @param logInfo 日志信息
		**/
		public static void sendCmd_10852(long hid  ,   Object[]  logInfo ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{logInfo};
			if(!hero.isCanSend(10852, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10852);
		}
		/**
		 * GC 本区间队伍信息
		 * @param teams 
		**/
		public static void sendCmd_10854(long hid  ,   Object[]  teams ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{teams};
			if(!hero.isCanSend(10854, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10854);
		}
		/**
		 * GC取消匹配返回
		 * @param rest 0取消成功 1失败 
		**/
		public static void sendCmd_10856(long hid  ,  int  rest ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest};
			if(!hero.isCanSend(10856, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10856);
		}
		/**
		 * GC 通知其他队友战斗结束
		 * @param rest 0胜利 1失败
		**/
		public static void sendCmd_10858(long hid  ,  int  rest ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest};
			if(!hero.isCanSend(10858, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10858);
		}
		/**
		 * GC 进入活动成功
		**/
		public static void sendCmd_10860(long hid ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = null;
			if(!hero.isCanSend(10860, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10860);
		}
		/**
		 * 
		 * @param res 结果0成功，其他失败1已达到上线 2钱不够
		 * @param buyCount 已购买次数
		 * @param remain 剩余挑战次数
		**/
		public static void sendCmd_10862(long hid  ,  int  res  ,   int  buyCount  ,   int  remain ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{res,buyCount,remain};
			if(!hero.isCanSend(10862, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10862);
		}
		/**
		 * GC连胜数量变化
		 * @param continuitywin 当前连胜数
		**/
		public static void sendCmd_10864(long hid  ,   int  continuitywin ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{continuitywin};
			if(!hero.isCanSend(10864, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10864);
		}
}