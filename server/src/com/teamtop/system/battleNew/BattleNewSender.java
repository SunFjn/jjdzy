package com.teamtop.system.battleNew;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * BattleNewSender.java
 * 新战斗模式
 */
public class BattleNewSender{
		/**
		 * 通知前端战斗信息战斗开始
		 * @param battleUid 战斗唯一id
		 * @param camp1 阵营1玩家集合
		 * @param camp2 阵营2玩家集合
		 * @param sysId 功能系统id
		**/
		public static void sendCmd_3860(long hid  ,   long  battleUid  ,   Object[]  camp1  ,   Object[]  camp2  ,   int  sysId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{battleUid,camp1,camp2,sysId};
			if(!hero.isCanSend(3860, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3860);
		}
		/**
		 * 同步技能释放
		 * @param useHid 放技能的玩家
		 * @param skillId 技能id
		 * @param playerData 玩家信息
		**/
		public static void sendCmd_3864(long hid  ,   long  useHid  ,   int  skillId  ,   Object[]  playerData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{useHid,skillId,playerData};
			if(!hero.isCanSend(3864, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3864);
		}
		/**
		 * 刷新buff状态
		 * @param buffData 玩家buff数据
		**/
		public static void sendCmd_3866(long hid  ,   Object[]  buffData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{buffData};
			if(!hero.isCanSend(3866, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3866);
		}
		/**
		 * 战斗结束
		 * @param battleUid 战斗唯一id
		 * @param result 战斗结果：0：失败，1：胜利
		 * @param sysid 系统ID
		 * @param rewardData 奖励数据
		**/
		public static void sendCmd_3868(long hid  ,   long  battleUid  ,  int  result  ,   int  sysid  ,   Object[]  rewardData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{battleUid,result,sysid,rewardData};
			if(!hero.isCanSend(3868, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3868);
		}
		/**
		 * 同步技能释放
		 * @param pid 玩家id
		 * @param skillId 技能id
		**/
		public static void sendCmd_3862(long hid  ,   long  pid  ,   int  skillId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{pid,skillId};
			if(!hero.isCanSend(3862, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3862);
		}
		/**
		 * 更新玩家血量
		 * @param hpData 玩家血量
		**/
		public static void sendCmd_3870(long hid  ,   Object[]  hpData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{hpData};
			if(!hero.isCanSend(3870, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3870);
		}
		/**
		 * 玩家离开战斗
		 * @param pid 离开的玩家id
		**/
		public static void sendCmd_3872(long hid  ,   long  pid ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{pid};
			if(!hero.isCanSend(3872, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3872);
		}
		/**
		 * 开始下一轮战斗
		 * @param battleUid 战斗唯一id
		 * @param camp1 阵营1玩家集合
		 * @param camp2 阵营2玩家集合
		 * @param sysId 功能系统id
		**/
		public static void sendCmd_3874(long hid  ,   long  battleUid  ,   Object[]  camp1  ,   Object[]  camp2  ,   int  sysId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{battleUid,camp1,camp2,sysId};
			if(!hero.isCanSend(3874, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3874);
		}
}