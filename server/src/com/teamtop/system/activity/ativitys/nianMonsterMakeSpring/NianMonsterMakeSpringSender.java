package com.teamtop.system.activity.ativitys.nianMonsterMakeSpring;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * NianMonsterMakeSpringSender.java
 * 年兽闹春
 */
public class NianMonsterMakeSpringSender{
		/**
		 * 返回界面信息
		 * @param monsterId 当前年兽id
		 * @param leftHp 剩余血量
		 * @param state 年兽王状态（0：未召唤，1：召唤，2：已击退）
		 * @param boomNum 鞭炮数
		 * @param leftTime 剩余恢复时间
		 * @param score 积分
		 * @param poolData 奖池数据
		 * @param goalData 已领目标奖励数据
		**/
		public static void sendCmd_11550(long hid  ,   int  monsterId  ,   int  leftHp  ,  int  state  ,   int  boomNum  ,   int  leftTime  ,   int  score  ,   Object[]  poolData  ,   Object[]  goalData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{monsterId,leftHp,state,boomNum,leftTime,score,poolData,goalData};
			if(!hero.isCanSend(11550, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11550);
		}
		/**
		 * 刷新结果返回
		 * @param rtnCode 结果：0：失败，1：成功
		 * @param monsterId 失败：（1：年兽还没击退不能刷新，2：奖池满不能刷新），成功：年兽id
		 * @param hp 剩余血量
		**/
		public static void sendCmd_11552(long hid  ,  int  rtnCode  ,   int  monsterId  ,   int  hp ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,monsterId,hp};
			if(!hero.isCanSend(11552, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11552);
		}
		/**
		 * 召唤年兽王
		 * @param rtnCode 结果：0：失败，1：成功
		 * @param monsterId 失败：（1：年兽王还没击退不能刷新，2：奖池满不能召唤，3：今天已召唤过，4：不在可召唤时段内），成功：年兽王id
		 * @param leftHp 剩余血量
		**/
		public static void sendCmd_11554(long hid  ,  int  rtnCode  ,   int  monsterId  ,   int  leftHp ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,monsterId,leftHp};
			if(!hero.isCanSend(11554, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11554);
		}
		/**
		 * 攻击结果
		 * @param rtnCode 结果：0：失败，1：成功
		 * @param monsterId 失败：（1：未刷出年兽，2：已经击退，3：鞭炮不足），成功：年兽id
		 * @param leftHp 剩余血量
		 * @param boomNum 鞭炮数
		 * @param leftTime 剩余恢复时间
		 * @param score 积分
		 * @param kingState 年兽王状态
		 * @param poolData 奖励池数据
		**/
		public static void sendCmd_11556(long hid  ,  int  rtnCode  ,   int  monsterId  ,   int  leftHp  ,   int  boomNum  ,   int  leftTime  ,   int  score  ,  int  kingState  ,   Object[]  poolData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,monsterId,leftHp,boomNum,leftTime,score,kingState,poolData};
			if(!hero.isCanSend(11556, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11556);
		}
		/**
		 * 领取目标奖励结果
		 * @param rtnCode 结果：0：失败，1：成功
		 * @param id 失败：（1：已领取，2：积分未达目标），成功：目标奖励id
		**/
		public static void sendCmd_11558(long hid  ,  int  rtnCode  ,   int  id ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,id};
			if(!hero.isCanSend(11558, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11558);
		}
		/**
		 * 领取奖励结果
		 * @param rtnCode 结果：（1：成功，2：奖励不存在，3：元宝不足，4：倒计时未结束）
		 * @param poolData 奖池数据
		**/
		public static void sendCmd_11560(long hid  ,  int  rtnCode  ,   Object[]  poolData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,poolData};
			if(!hero.isCanSend(11560, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11560);
		}
		/**
		 * 鞭炮增加提示
		 * @param addNum 增加数量
		**/
		public static void sendCmd_11562(long hid  ,   int  addNum ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{addNum};
			if(!hero.isCanSend(11562, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11562);
		}
}