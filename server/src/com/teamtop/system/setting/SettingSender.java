package com.teamtop.system.setting;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * SettingSender.java
 * 设置
 */
public class SettingSender{
		/**
		 * 更换头像和头像框的结果
		 * @param rtnCode 0：失败，1：成功
		 * @param icon 头像id
		 * @param frame 头像框id
		**/
		public static void sendCmd_1022(long hid  ,  int  rtnCode  ,   int  icon  ,   int  frame ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,icon,frame};
			if(!hero.isCanSend(1022, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1022);
		}
		/**
		 * 
		 * @param rtnCode 0:成功，1：名字不能超过12个字符，2：非法字符，3：名字没有改变，4：名字已存在，5：元宝不足
		 * @param name 名字
		**/
		public static void sendCmd_1024(long hid  ,  int  rtnCode  ,   String  name ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,name};
			if(!hero.isCanSend(1024, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1024);
		}
		/**
		 * 登录发送数据
		 * @param icon 头像id
		 * @param frame 头像框id
		 * @param country 是否显示势力（0：显示，1：不显示）
		 * @param sound 是否开启声音（0：开启，1：不开启）
		 * @param wjSound 武将音效0开启,1不开启
		 * @param iconData 拥有的头像
		 * @param frameData 拥有的头像框
		**/
		public static void sendCmd_1020(long hid  ,   int  icon  ,   int  frame  ,  int  country  ,  int  sound  ,  int  wjSound  ,   Object[]  iconData  ,   Object[]  frameData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{icon,frame,country,sound,wjSound,iconData,frameData};
			if(!hero.isCanSend(1020, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1020);
		}
		/**
		 * 使用头像、头像框激活道具错误提示
		 * @param errCode 1:系统未开启，2：已激活过
		**/
		public static void sendCmd_1030(long hid  ,  int  errCode ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{errCode};
			if(!hero.isCanSend(1030, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1030);
		}
		/**
		 * 更新头像、头像框
		 * @param iconData 拥有的头像
		 * @param frameData 拥有的头像框
		**/
		public static void sendCmd_1032(long hid  ,   Object[]  iconData  ,   Object[]  frameData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{iconData,frameData};
			if(!hero.isCanSend(1032, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1032);
		}
}