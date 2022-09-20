package com.teamtop.system.mount;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * MountSender.java
 * 坐骑
 */
public class MountSender{
		/**
		 * 打开坐骑界面返回
		 * @param mountId 骑乘坐骑id
		 * @param mountList 所有已激活的坐骑
		**/
		public static void sendCmd_11022(long hid  ,   int  mountId  ,   Object[]  mountList ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{mountId,mountList};
			if(!hero.isCanSend(11022, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11022);
		}
		/**
		 * 骑乘返回
		 * @param state 1.成功 2.坐骑未激活 3.未达到星级
		 * @param mountId 坐骑id
		**/
		public static void sendCmd_11024(long hid  ,  int  state  ,   int  mountId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,mountId};
			if(!hero.isCanSend(11024, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11024);
		}
		/**
		 * 激活或升星返回
		 * @param state 1.成功 2.道具不足 3.已满星 4.参数错误 5.已达升星上限
		 * @param mountId 坐骑id
		 * @param starId 升星id
		**/
		public static void sendCmd_11026(long hid  ,  int  state  ,   int  mountId  ,   int  starId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,mountId,starId};
			if(!hero.isCanSend(11026, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11026);
		}
		/**
		 * 坐骑升级返回
		 * @param state 1.成功 2.坐骑未激活 3.道具不足 4.已满级
		 * @param mountId 坐骑id
		 * @param level 升级id
		**/
		public static void sendCmd_11028(long hid  ,  int  state  ,   int  mountId  ,   int  level ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,mountId,level};
			if(!hero.isCanSend(11028, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11028);
		}
		/**
		 * 打开坐骑幻化界面
		 * @param mountId 骑乘坐骑id
		 * @param mountList 所有已激活的幻化坐骑
		**/
		public static void sendCmd_11030(long hid  ,   int  mountId  ,   Object[]  mountList ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{mountId,mountList};
			if(!hero.isCanSend(11030, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11030);
		}
		/**
		 * 骑乘返回(幻化)
		 * @param state 1.成功 2.坐骑未激活 3.未达到阶级
		 * @param mountId 坐骑id
		**/
		public static void sendCmd_11032(long hid  ,  int  state  ,   int  mountId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,mountId};
			if(!hero.isCanSend(11032, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11032);
		}
		/**
		 * 激活坐骑(幻化)返回
		 * @param state 1.成功 2.激活条件不足  3.参数错误
		 * @param mountId 坐骑id
		 * @param levId 阶级id
		**/
		public static void sendCmd_11034(long hid  ,  int  state  ,   int  mountId  ,   int  levId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,mountId,levId};
			if(!hero.isCanSend(11034, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11034);
		}
		/**
		 * 坐骑幻化升阶返回
		 * @param state 1.成功 2.坐骑未激活 3.道具不足 4.已满级 5.条件不足
		 * @param mountId 坐骑id
		 * @param levId 阶级id
		**/
		public static void sendCmd_11036(long hid  ,  int  state  ,   int  mountId  ,   int  levId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,mountId,levId};
			if(!hero.isCanSend(11036, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11036);
		}
}