package com.teamtop.system.crossTeamFuBen;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * CrossTeamFubenSender.java
 * 跨服组队
 */
public class CrossTeamFubenSender{
		/**
		 * 登录
		 * @param num 剩余收益次数
		**/
		public static void sendCmd_3400(long hid  ,  int  num ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{num};
			if(!hero.isCanSend(3400, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3400);
		}
		/**
		 * 查看副本组队信息
		 * @param result 结果  1成功  2没有该副本  3转数等级不够，不能查看  4请连跨服
		 * @param teamData 队伍数据
		**/
		public static void sendCmd_3402(long hid  ,  int  result  ,   Object[]  teamData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{result,teamData};
			if(!hero.isCanSend(3402, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3402);
		}
		/**
		 * 快速加入（同步所有队员130属性）
		 * @param result 结果  1打开界面成功  2后端主动刷新前端数据 3配置表没配该等级副本  4转数等级不够，不能加入  5你已经有队伍，不能重复加入  6请连中央服  7操作太频繁
		 * @param teamID 队伍ID
		 * @param id 副本ID
		 * @param teamData 队伍数据
		**/
		public static void sendCmd_3404(long hid  ,  int  result  ,   int  teamID  ,  int  id  ,   Object[]  teamData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{result,teamID,id,teamData};
			if(!hero.isCanSend(3404, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3404);
		}
		/**
		 * 踢人
		 * @param result 结果  1成功会刷新队伍数据  2你没在队伍中  3队伍缓存异常  4你不是队长  5该队员不存在
		**/
		public static void sendCmd_3406(long hid  ,  int  result ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{result};
			if(!hero.isCanSend(3406, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3406);
		}
		/**
		 * 开始挑战
		 * @param result 结果 1开打  2没有队伍  3两个缓存不同步，没有队伍缓存  4队长才能开始战斗
		**/
		public static void sendCmd_3408(long hid  ,  int  result ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{result};
			if(!hero.isCanSend(3408, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3408);
		}
		/**
		 * 离开队伍
		 * @param result 结果  1离开成功  2你没在队伍中  3队伍缓存异常  4被人T出队伍
		**/
		public static void sendCmd_3410(long hid  ,  int  result ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{result};
			if(!hero.isCanSend(3410, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3410);
		}
		/**
		 * 加入指定队伍（同步所有队员130属性）
		 * @param result 结果 1成功  2你已经有队伍，不能重复加入  3队伍不存在  4队伍已满   5你等级不足，不能加入
		**/
		public static void sendCmd_3412(long hid  ,  int  result ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{result};
			if(!hero.isCanSend(3412, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3412);
		}
		/**
		 * 场景刷新数据
		 * @param bossHpMax boss气血上限
		 * @param bossHp boss当前气血
		 * @param myHurt 我的伤害
		 * @param hurtList 伤害排行数据
		**/
		public static void sendCmd_3416(long hid  ,   long  bossHpMax  ,   long  bossHp  ,   long  myHurt  ,   Object[]  hurtList ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{bossHpMax,bossHp,myHurt,hurtList};
			if(!hero.isCanSend(3416, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3416);
		}
		/**
		 * 死亡通知广播给其他人
		 * @param id 角色ID或机器人ID
		**/
		public static void sendCmd_3418(long hid  ,   long  id ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{id};
			if(!hero.isCanSend(3418, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3418);
		}
		/**
		 * 战斗结束，退出副本
		**/
		public static void sendCmd_3420(long hid ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = null;
			if(!hero.isCanSend(3420, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3420);
		}
		/**
		 * 刷新队员气血
		 * @param hpList 队伍气血数据
		**/
		public static void sendCmd_3424(long hid  ,   Object[]  hpList ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{hpList};
			if(!hero.isCanSend(3424, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3424);
		}
}