package com.teamtop.cross;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * CrossSender.java
 * 连接中央服
 */
public class CrossSender{
		/**
		 * GC 请求跨服返回
		 * @param rtn 返回 1：正在请求中央服务器，2：正在准备数据，3：可以开始连接，4：中央服务器连接失败
		 * @param param 附加参数
		**/
		public static void sendCmd_1662(long hid  ,  int  rtn  ,   String  param ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtn,param};
			if(!hero.isCanSend(1662, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1662);
		}
		/**
		 * GC 登陆跨服结果
		 * @param rtn 0成功 1失败
		**/
		public static void sendCmd_1664(long hid  ,  int  rtn ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtn};
			if(!hero.isCanSend(1664, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1664);
		}
		/**
		 * 端口跨服连接退出玩法
		 * @param sysId 系统id
		**/
		public static void sendCmd_1666(long hid  ,   int  sysId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{sysId};
			if(!hero.isCanSend(1666, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1666);
		}
		/**
		 * 跨服心跳包返回
		**/
		public static void sendCmd_1668(long hid ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = null;
			if(!hero.isCanSend(1668, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1668);
		}
}