package com.teamtop.system.crossRebornFB;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * RebornFBSender.java
 * 轮回副本
 */
public class RebornFBSender{
		/**
		 * 打开轮回副本界面返回
		 * @param helpNum 已经协助次数
		 * @param battleInfo 副本信息
		**/
		public static void sendCmd_11862(long hid  ,   int  helpNum  ,   Object[]  battleInfo ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{helpNum,battleInfo};
			if(!hero.isCanSend(11862, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11862);
		}
		/**
		 * 创建队伍返回
		 * @param state 状态:0-成功,1-数据不存在,2-配置不存在,3-轮回等级不足,4-你已经有队伍,5-操作太频繁
		**/
		public static void sendCmd_11864(long hid  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state};
			if(!hero.isCanSend(11864, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11864);
		}
		/**
		 * 队伍信息变化
		 * @param state 状态:0-创建队伍,1-有人加入,2-有人离开,3-队伍解散,4-刷新星数
		 * @param capHid 队长id
		 * @param teamId 队伍id
		 * @param level 轮回等级
		 * @param star 副本星数
		 * @param teamInfo 队伍信息
		**/
		public static void sendCmd_11866(long hid  ,  int  state  ,   long  capHid  ,   int  teamId  ,   int  level  ,   int  star  ,   Object[]  teamInfo ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,capHid,teamId,level,star,teamInfo};
			if(!hero.isCanSend(11866, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11866);
		}
		/**
		 * 申请加入队伍返回
		 * @param state 状态:0-成功,1-协助次数不足,2-你已经有队伍,3-队伍不存在,4-队伍已满,5-队伍已进入战斗,6-轮回等级不足
		**/
		public static void sendCmd_11868(long hid  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state};
			if(!hero.isCanSend(11868, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11868);
		}
		/**
		 * 发出邀请返回
		 * @param state 状态:0-成功,1-不在队伍中,2-不是队长,3-队伍已满人,4-队伍不存在
		**/
		public static void sendCmd_11870(long hid  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state};
			if(!hero.isCanSend(11870, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11870);
		}
		/**
		 * 邀请广播
		 * @param teamId 队伍id
		 * @param name 队长名字
		 * @param level 轮回等级
		**/
		public static void sendCmd_11872(long hid  ,   int  teamId  ,   String  name  ,   int  level ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{teamId,name,level};
			if(!hero.isCanSend(11872, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11872);
		}
		/**
		 * 退出队伍返回
		 * @param state 状态:0-成功,1-失败
		**/
		public static void sendCmd_11874(long hid  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state};
			if(!hero.isCanSend(11874, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11874);
		}
		/**
		 * 移除队友返回
		 * @param state 状态:0-成功,1-你没在队伍中,2-队伍不存在,3-你不是队长,4-该队员不存在
		**/
		public static void sendCmd_11876(long hid  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state};
			if(!hero.isCanSend(11876, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11876);
		}
		/**
		 * 刷新星级返回
		 * @param state 状态:0-成功,1-你没在队伍中,2-队伍不存在
		 * @param star 当前星级
		**/
		public static void sendCmd_11878(long hid  ,  int  state  ,   int  star ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,star};
			if(!hero.isCanSend(11878, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11878);
		}
		/**
		 * 通知星级变化
		 * @param star 当前星级
		**/
		public static void sendCmd_11880(long hid  ,   int  star ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{star};
			if(!hero.isCanSend(11880, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11880);
		}
		/**
		 * 开始挑战返回
		 * @param state 状态:0-成功,1-失败
		**/
		public static void sendCmd_11882(long hid  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state};
			if(!hero.isCanSend(11882, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11882);
		}
		/**
		 * 场景刷新数据
		 * @param bossHpMax boss气血上限
		 * @param bossHp boss当前气血
		 * @param myHurt 我的伤害
		 * @param hurtList 伤害排行数据
		**/
		public static void sendCmd_11884(long hid  ,   long  bossHpMax  ,   long  bossHp  ,   long  myHurt  ,   Object[]  hurtList ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{bossHpMax,bossHp,myHurt,hurtList};
			if(!hero.isCanSend(11884, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11884);
		}
		/**
		 * 死亡广播
		 * @param id 角色ID
		**/
		public static void sendCmd_11886(long hid  ,   long  id ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{id};
			if(!hero.isCanSend(11886, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11886);
		}
		/**
		 * 战斗结束
		**/
		public static void sendCmd_11888(long hid ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = null;
			if(!hero.isCanSend(11888, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11888);
		}
		/**
		 * 刷新队友血量
		 * @param hpList 队伍气血数据
		**/
		public static void sendCmd_11890(long hid  ,   Object[]  hpList ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{hpList};
			if(!hero.isCanSend(11890, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11890);
		}
		/**
		 * 登录中央服返回
		 * @param state 状态:0-成功,1-失败
		**/
		public static void sendCmd_11892(long hid  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state};
			if(!hero.isCanSend(11892, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11892);
		}
}