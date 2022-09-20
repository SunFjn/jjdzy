package com.teamtop.system.house.maid;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * MaidSender.java
 * 侍女
 */
public class MaidSender{
		/**
		 * 打开界面返回
		 * @param sendList 侍女数据
		 * @param maidId 正在使用的侍女形象id
		**/
		public static void sendCmd_11302(long hid  ,   Object[]  sendList  ,   int  maidId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{sendList,maidId};
			if(!hero.isCanSend(11302, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11302);
		}
		/**
		 * 激活/升星侍女返回
		 * @param state 状态 0成功 1达到上限 2激活升星需要的道具不足
		 * @param index 侍女id
		 * @param star 侍女星级
		**/
		public static void sendCmd_11304(long hid  ,  int  state  ,   int  index  ,   int  star ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,index,star};
			if(!hero.isCanSend(11304, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11304);
		}
		/**
		 * 升级侍女返回
		 * @param state 状态 0成功 1先激活该侍女 2级数已满级 3材料不足 4府邸等级不满足要求
		 * @param id 侍女id
		 * @param level 侍女等级
		 * @param curExp 侍女当前经验
		**/
		public static void sendCmd_11306(long hid  ,  int  state  ,   int  id  ,   int  level  ,   int  curExp ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,id,level,curExp};
			if(!hero.isCanSend(11306, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11306);
		}
		/**
		 * 使用形象返回
		 * @param state 状态 0成功 1先激活该侍女 2该侍女10星解锁动态效果
		 * @param id 侍女id
		**/
		public static void sendCmd_11308(long hid  ,  int  state  ,   int  id ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,id};
			if(!hero.isCanSend(11308, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11308);
		}
}