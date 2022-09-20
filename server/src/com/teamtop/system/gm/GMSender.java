package com.teamtop.system.gm;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.util.time.TimeDateUtil;
/**
 * GMSender.java
 * GM命令
 */
public class GMSender{
		/**
		 * 后端输出错误
		 * @param text 文本
		 * @param type 类型 1：警告，2：错误·
		**/
		public static void sendCmd_96(long hid  ,   String  text  ,  int  type ){
			NettyWrite.writeData(HeroCache.getHero(hid).getChannel() , new Object[]{text,type},96);
		}
		/**
		 * Gm协议返回
		 * @param cmd GM类型ID
		 * @param dataStr 如果有多数据用“_”分割
		 * @param type 操作类型
		**/
		public static void sendCmd_98(long hid  ,  int  cmd  ,   String  dataStr  ,  int  type ){
			NettyWrite.writeData(HeroCache.getHero(hid).getChannel() , new Object[]{cmd,dataStr,type},98);
			System.err.println("服务器时间:"+dataStr+" 秒 "+TimeDateUtil.getCurrentTime()+"string:"+TimeDateUtil.printTime(TimeDateUtil.getCurrentTime()));
		}
}