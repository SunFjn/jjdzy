package com.teamtop.system.reincarnationGodfate;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * ReincarnationGodFateSender.java
 * 轮回-天命
 */
public class ReincarnationGodFateSender{
		/**
		 * 打开界面返回
		 * @param godfateList 天命列表
		**/
		public static void sendCmd_10592(long hid  ,   Object[]  godfateList ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{godfateList};
			if(!hero.isCanSend(10592, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10592);
		}
		/**
		 * 升级，升品返回
		 * @param state 状态：1：成功，2：已达最高级，3：道具不足
		 * @param upLvId 天命升级表id
		 * @param upQualityId 天命升品表id
		 * @param id 天命id
		**/
		public static void sendCmd_10594(long hid  ,  int  state  ,   int  upLvId  ,   int  upQualityId  ,   int  id ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,upLvId,upQualityId,id};
			if(!hero.isCanSend(10594, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10594);
		}
}