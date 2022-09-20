package com.teamtop.system.threeHeroFightLvBu;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * ThreeHeroFightLvBuSender.java
 * 三英战吕布
 */
public class ThreeHeroFightLvBuSender{
		/**
		 * 返回界面信息
		 * @param chaNum 挑战次数
		 * @param buyNum 已购买次数
		 * @param hardType 已开通难度
		 * @param teams 队伍信息
		**/
		public static void sendCmd_9772(long hid  ,   int  chaNum  ,   int  buyNum  ,  int  hardType  ,   Object[]  teams ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{chaNum,buyNum,hardType,teams};
			if(!hero.isCanSend(9772, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 9772);
		}
		/**
		 * 创建队伍结果
		 * @param rtnCode 结果：0：失败，1：成功，2：刷新队伍数据
		 * @param teamId 失败：（1：已经有队伍，2：已无挑战次数，3：未开启该难度），(成功,刷新)：队伍id
		 * @param hardType 难度
		 * @param teamData 队伍数据
		**/
		public static void sendCmd_9774(long hid  ,  int  rtnCode  ,   int  teamId  ,  int  hardType  ,   Object[]  teamData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,teamId,hardType,teamData};
			if(!hero.isCanSend(9774, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 9774);
		}
		/**
		 * 踢出结果
		 * @param rtnCode 0：失败，1：成功
		 * @param type 失败：（1：没在队伍中, 2：队伍缓存异常，3：你不是队长，4：该队员不存在），成功（1：踢出成功，2：你被踢出队伍）
		**/
		public static void sendCmd_9776(long hid  ,  int  rtnCode  ,  int  type ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,type};
			if(!hero.isCanSend(9776, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 9776);
		}
		/**
		 * 邀请组队结果
		 * @param rtnCode 结果：0：失败，1：成功
		 * @param type 失败（1:你没在队伍中,2:队伍数据异常,3:你不是队长,4:队员已满）
		**/
		public static void sendCmd_9778(long hid  ,  int  rtnCode  ,  int  type ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,type};
			if(!hero.isCanSend(9778, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 9778);
		}
		/**
		 * 离开结果返回
		 * @param rtnCode 结果：0：失败，1：成功
		 * @param type 失败：（1：你没在队伍中，2：队伍数据异常，3：你在其他队伍）
		**/
		public static void sendCmd_9780(long hid  ,  int  rtnCode  ,  int  type ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,type};
			if(!hero.isCanSend(9780, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 9780);
		}
		/**
		 * 加入队伍结果
		 * @param rtnCode 结果：0：失败，1：成功
		 * @param type 失败（1：今日已无挑战次数，2：你已经有队伍，不能重复加入，3：队伍不存在，4：队伍已满，5：队伍已进入战斗，无法加入，6：未解锁该难度）
		**/
		public static void sendCmd_9782(long hid  ,  int  rtnCode  ,  int  type ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,type};
			if(!hero.isCanSend(9782, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 9782);
		}
		/**
		 * 请求挑战结果
		 * @param rtnCode 结果：0：失败，1：成功
		 * @param guanqia 失败（1：没有队伍，2：不是队长），成功：关卡id
		**/
		public static void sendCmd_9784(long hid  ,  int  rtnCode  ,   int  guanqia ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,guanqia};
			if(!hero.isCanSend(9784, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 9784);
		}
		/**
		 * 进入下一关结果
		 * @param rtnCode 结果：0：失败，1：成功
		 * @param guanqia 失败（1：没有队伍，2：不是队长），成功：关卡id
		**/
		public static void sendCmd_9786(long hid  ,  int  rtnCode  ,   int  guanqia ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,guanqia};
			if(!hero.isCanSend(9786, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 9786);
		}
		/**
		 * 复活结果返回
		 * @param rtnCode 结果：0：失败，1：成功
		 * @param type 失败（1：已经复活，2：元宝不足，3：没有队伍）
		 * @param name 玩家名
		**/
		public static void sendCmd_9788(long hid  ,  int  rtnCode  ,  int  type  ,   String  name ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,type,name};
			if(!hero.isCanSend(9788, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 9788);
		}
		/**
		 * 退出结果返回
		 * @param rtnCode 结果：0：失败，1：成功
		 * @param type 失败（1：没有队伍）
		**/
		public static void sendCmd_9790(long hid  ,  int  rtnCode  ,  int  type ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,type};
			if(!hero.isCanSend(9790, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 9790);
		}
		/**
		 * 请求挑战boss结果
		 * @param rtnCode 结果：0：失败，1：成功
		 * @param type 失败（1：队伍不存在，2：不是队长）
		**/
		public static void sendCmd_9792(long hid  ,  int  rtnCode  ,  int  type ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,type};
			if(!hero.isCanSend(9792, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 9792);
		}
		/**
		 * 玩家死亡通知
		 * @param id 玩家id
		**/
		public static void sendCmd_9796(long hid  ,   long  id ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{id};
			if(!hero.isCanSend(9796, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 9796);
		}
		/**
		 * 战斗结果
		 * @param result 结果：0：失败，1：成功
		 * @param reward 通关奖励
		**/
		public static void sendCmd_9794(long hid  ,  int  result  ,   Object[]  reward ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{result,reward};
			if(!hero.isCanSend(9794, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 9794);
		}
		/**
		 * 通知提示复活
		 * @param num 剩余复活次数
		**/
		public static void sendCmd_9798(long hid  ,  int  num ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{num};
			if(!hero.isCanSend(9798, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 9798);
		}
		/**
		 * 刷新玩家血气
		 * @param hpData 玩家血气数据
		**/
		public static void sendCmd_9800(long hid  ,   Object[]  hpData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{hpData};
			if(!hero.isCanSend(9800, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 9800);
		}
		/**
		 * 更新boss血气
		 * @param bossHp 当前血量
		**/
		public static void sendCmd_9802(long hid  ,   long  bossHp ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{bossHp};
			if(!hero.isCanSend(9802, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 9802);
		}
		/**
		 * 转让队长结果
		 * @param rtnCode 结果：0：失败，1：成功
		 * @param type 失败（1：没有队伍，2：队伍异常，3：不能转让给自己，4：不是队长，5：不是队员）
		**/
		public static void sendCmd_9804(long hid  ,  int  rtnCode  ,  int  type ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,type};
			if(!hero.isCanSend(9804, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 9804);
		}
		/**
		 * 购买结果返回
		 * @param rtnCode 结果：0：失败，1：成功
		 * @param buyNum 失败：（1：超过购买上限，2：元宝不足），成功：已购买次数
		 * @param chaNum 可挑战次数
		**/
		public static void sendCmd_9806(long hid  ,  int  rtnCode  ,   int  buyNum  ,   int  chaNum ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,buyNum,chaNum};
			if(!hero.isCanSend(9806, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 9806);
		}
}