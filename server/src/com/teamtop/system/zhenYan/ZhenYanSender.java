package com.teamtop.system.zhenYan;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * ZhenYanSender.java
 * 阵眼
 */
public class ZhenYanSender{
		/**
		 * 打开界面返回
		 * @param zhenXinLevel 阵心等级
		 * @param zhenYanInfos 阵眼信息
		**/
		public static void sendCmd_10252(long hid  ,   int  zhenXinLevel  ,   Object[]  zhenYanInfos ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{zhenXinLevel,zhenYanInfos};
			if(!hero.isCanSend(10252, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10252);
		}
		/**
		 * 升级/激活阵眼返回
		 * @param state 状态:0-成功,1-配置不存在,2-已满级,3-道具不足
		 * @param zhenYanId 阵眼id
		 * @param zhenYanLevel 阵眼等级
		**/
		public static void sendCmd_10254(long hid  ,  int  state  ,   int  zhenYanId  ,   int  zhenYanLevel ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,zhenYanId,zhenYanLevel};
			if(!hero.isCanSend(10254, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10254);
		}
		/**
		 * 升级/激活阵心返回
		 * @param state 状态:0-成功,1-配置不存在,2-已满级,3-阵眼等级不足,4-道具不足
		 * @param zhenXinLevel 阵心等级
		**/
		public static void sendCmd_10256(long hid  ,  int  state  ,   int  zhenXinLevel ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,zhenXinLevel};
			if(!hero.isCanSend(10256, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10256);
		}
}