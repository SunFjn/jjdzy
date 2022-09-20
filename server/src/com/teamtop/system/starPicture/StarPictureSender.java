package com.teamtop.system.starPicture;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * StarPictureSender.java
 * 星图
 */
public class StarPictureSender{
		/**
		 * 星图信息返回
		 * @param starPictureInfo 星图信息
		**/
		public static void sendCmd_922(long hid  ,   Object[]  starPictureInfo ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{starPictureInfo};
			if(!hero.isCanSend(922, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 922);
		}
		/**
		 * 星图升级结果
		 * @param rtnCode 0:失败，1：成功
		 * @param id 失败：错误码（1:达到最高级，2：未达开启条件，3：材料不足），成功：星图id
		**/
		public static void sendCmd_924(long hid  ,  int  rtnCode  ,   int  id ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,id};
			if(!hero.isCanSend(924, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 924);
		}
}