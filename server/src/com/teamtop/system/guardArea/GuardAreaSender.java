package com.teamtop.system.guardArea;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * GuardAreaSender.java
 * 镇守四方
 */
public class GuardAreaSender{
		/**
		 * 打开界面返回
		 * @param plunderTimes 今日掠夺次数
		 * @param cityInfo 城池信息
		**/
		public static void sendCmd_10902(long hid  ,   int  plunderTimes  ,   Object[]  cityInfo ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{plunderTimes,cityInfo};
			if(!hero.isCanSend(10902, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10902);
		}
		/**
		 * 派遣返回
		 * @param state 状态:0-成功,1-数据不存在,2-武将正在其他城池镇守,3-正在镇守,4-镇守完毕,5-参数错误,6-开启条件不足,7-配置不存在
		**/
		public static void sendCmd_10904(long hid  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state};
			if(!hero.isCanSend(10904, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10904);
		}
		/**
		 * 领取奖励返回
		 * @param state 状态:0-成功,1-失败
		**/
		public static void sendCmd_10906(long hid  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state};
			if(!hero.isCanSend(10906, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10906);
		}
		/**
		 * 提前召回返回
		 * @param state 状态:0-成功,1-失败
		**/
		public static void sendCmd_10908(long hid  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state};
			if(!hero.isCanSend(10908, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10908);
		}
		/**
		 * 打开掠夺界面返回
		 * @param plunderInfo 掠夺信息
		 * @param freeRefreshTime 免费刷新时间
		**/
		public static void sendCmd_10910(long hid  ,   Object[]  plunderInfo  ,   long  freeRefreshTime ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{plunderInfo,freeRefreshTime};
			if(!hero.isCanSend(10910, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10910);
		}
		/**
		 * 掠夺返回
		 * @param state 状态:0-成功,1-失败
		 * @param otherId 被掠夺的id
		**/
		public static void sendCmd_10912(long hid  ,  int  state  ,   long  otherId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,otherId};
			if(!hero.isCanSend(10912, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10912);
		}
		/**
		 * 刷新掠夺界面返回
		 * @param plunderInfo 掠夺信息
		 * @param freeRefreshTime 免费刷新时间
		 * @param state 状态:0-成功,1-时间未到,2-货币不足
		**/
		public static void sendCmd_10914(long hid  ,   Object[]  plunderInfo  ,   long  freeRefreshTime  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{plunderInfo,freeRefreshTime,state};
			if(!hero.isCanSend(10914, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10914);
		}
		/**
		 * 打开战报返回
		 * @param reportInfo 战报信息
		**/
		public static void sendCmd_10916(long hid  ,   Object[]  reportInfo ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{reportInfo};
			if(!hero.isCanSend(10916, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10916);
		}
		/**
		 * 打开商城界面返回
		 * @param shopInfo 商品信息
		 * @param honor 荣誉
		**/
		public static void sendCmd_10918(long hid  ,   Object[]  shopInfo  ,   long  honor ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{shopInfo,honor};
			if(!hero.isCanSend(10918, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10918);
		}
		/**
		 * 购买商品返回
		 * @param state 状态:0-成功,1-配置不存在,2-次数已满,3-货币不足
		 * @param shopId 商品id
		 * @param honor 荣耀
		**/
		public static void sendCmd_10920(long hid  ,  int  state  ,   int  shopId  ,   long  honor ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,shopId,honor};
			if(!hero.isCanSend(10920, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10920);
		}
		/**
		 * 战斗结果返回
		 * @param result 战斗结果1胜利2失败
		 * @param cityID 城池ID
		**/
		public static void sendCmd_10922(long hid  ,  int  result  ,   int  cityID ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{result,cityID};
			if(!hero.isCanSend(10922, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 10922);
		}
}