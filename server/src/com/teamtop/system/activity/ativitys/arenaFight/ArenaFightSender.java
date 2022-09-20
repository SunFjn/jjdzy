package com.teamtop.system.activity.ativitys.arenaFight;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * ArenaFightSender.java
 * 擂台比武
 */
public class ArenaFightSender{
		/**
		 * 返回界面信息
		 * @param arenaData 擂台数据
		 * @param chacd 挑战CD
		**/
		public static void sendCmd_11600(long hid  ,   Object[]  arenaData  ,   int  chacd ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{arenaData,chacd};
			if(!hero.isCanSend(11600, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11600);
		}
		/**
		 * 请求挑战结果
		 * @param rtnCode 结果：0：失败，1：成功，2：直接占领
		 * @param arenaId 失败：（1：不能挑战自己，2：刷新界面信息，3：擂主被挑战中，4：你在被挑战），成功：擂台id
		 * @param masterId 擂主id
		**/
		public static void sendCmd_11602(long hid  ,  int  rtnCode  ,   int  arenaId  ,   long  masterId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,arenaId,masterId};
			if(!hero.isCanSend(11602, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11602);
		}
		/**
		 * 战斗结果返回
		 * @param result 0：失败，1：胜利
		 * @param rewardData 奖励数据
		**/
		public static void sendCmd_11604(long hid  ,  int  result  ,   Object[]  rewardData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{result,rewardData};
			if(!hero.isCanSend(11604, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11604);
		}
		/**
		 * 协助结果
		 * @param rtnCode 结果：0：失败，1：成功
		 * @param arenaId 失败：（1：是擂主不能协助，2：已在协助，3：不是同服不能协助，4:协助位满人，5：位置已有人），成功：擂台id
		 * @param index 擂台位置
		**/
		public static void sendCmd_11606(long hid  ,  int  rtnCode  ,   int  arenaId  ,   int  index ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,arenaId,index};
			if(!hero.isCanSend(11606, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11606);
		}
		/**
		 * 踢出结果
		 * @param rtnCode 结果：0：失败，1：成功
		 * @param arenaId 失败：（1：不是擂主不能操作，2：已关闭），成功：擂台id
		 * @param index 协助位置
		**/
		public static void sendCmd_11608(long hid  ,  int  rtnCode  ,   int  arenaId  ,   int  index ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,arenaId,index};
			if(!hero.isCanSend(11608, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11608);
		}
		/**
		 * 战报数据返回
		 * @param noticeData 战报数据
		**/
		public static void sendCmd_11610(long hid  ,   Object[]  noticeData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{noticeData};
			if(!hero.isCanSend(11610, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11610);
		}
		/**
		 * 通知阶段战斗状态
		 * @param state 状态：0：结束，1：开始
		**/
		public static void sendCmd_11612(long hid  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state};
			if(!hero.isCanSend(11612, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11612);
		}
		/**
		 * 失去擂主位置
		**/
		public static void sendCmd_11614(long hid ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = null;
			if(!hero.isCanSend(11614, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11614);
		}
}