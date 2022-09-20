package com.teamtop.system.country;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * CountrySender.java
 * 国家
 */
public class CountrySender{
		/**
		 * 随机国家
		 * @param cid 随机到的国家Id
		 * @param name 玩家姓名
		**/
		public static void sendCmd_1472(long hid  ,  int  cid  ,   String  name ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{cid,name};
			if(!hero.isCanSend(1472, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1472);
		}
		/**
		 * 
		 * @param coinRestTimes 铜钱剩余捐献次数
		 * @param ybRestTimes 元宝剩余捐献次数
		**/
		public static void sendCmd_1474(long hid  ,  int  coinRestTimes  ,  int  ybRestTimes ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{coinRestTimes,ybRestTimes};
			if(!hero.isCanSend(1474, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1474);
		}
		/**
		 * 捐献返回
		 * @param state 捐献状态 1：成功2：次数不足3：铜钱不足4：元宝不足
		 * @param coinRestTimes 铜钱剩余捐献次数
		 * @param ybRestTimes 元宝剩余捐献次数
		**/
		public static void sendCmd_1476(long hid  ,  int  state  ,  int  coinRestTimes  ,  int  ybRestTimes ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,coinRestTimes,ybRestTimes};
			if(!hero.isCanSend(1476, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1476);
		}
		/**
		 * 返回国家
		 * @param countryType 国家类型
		 * @param countryName 国家姓名
		**/
		public static void sendCmd_1478(long hid  ,  int  countryType  ,   String  countryName ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{countryType,countryName};
			if(!hero.isCanSend(1478, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1478);
		}
		/**
		 * 打开界面返回
		 * @param lv 君主等级
		 * @param icon 君主头像
		 * @param frame 君主头像框
		 * @param junzhuName 君主姓名
		 * @param chengxiangName 丞相姓名
		 * @param dajiangjunName 大将军姓名
		**/
		public static void sendCmd_1480(long hid  ,   int  lv  ,   int  icon  ,   int  frame  ,   String  junzhuName  ,   String  chengxiangName  ,   String  dajiangjunName ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{lv,icon,frame,junzhuName,chengxiangName,dajiangjunName};
			if(!hero.isCanSend(1480, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1480);
		}
}