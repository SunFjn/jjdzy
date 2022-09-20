package com.teamtop.system.global;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * GlobalSender.java
 * 全局公用
 */
public class GlobalSender{
		/**
		 * GC发送服务器当前时间
		 * @param time 当前服务器时间戳
		 * @param gmt 当前服务器时区
		**/
		public static void sendCmd_252(long hid  ,   long  time  ,   String  gmt ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{time,gmt};
			if(!hero.isCanSend(252, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 252);
		}
		/**
		 * GC个人事件提示
		 * @param type 0 使用 1 获得
		 * @param id 属性类型
		 * @param sysId 物品系统ID
		 * @param num 提示数量
		**/
		public static void sendCmd_254(long hid  ,  int  type  ,   int  id  ,   int  sysId  ,   int  num ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{type,id,sysId,num};
			if(!hero.isCanSend(254, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 254);
		}
		/**
		 * GC全局消息和提示
		 * @param type 消息类型 1等级不够进行此操作2系统已屏蔽3关卡条件不满足
		 * @param fid 标识 消息标识(功能id)
		**/
		public static void sendCmd_256(long hid  ,  int  type  ,   int  fid ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{type,fid};
			if(!hero.isCanSend(256, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 256);
		}
		/**
		 * 开服时间
		 * @param time 开服时间
		**/
		public static void sendCmd_258(long hid  ,   long  time ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{time};
			if(!hero.isCanSend(258, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 258);
		}
		/**
		 * GC后端返回提示字符串
		 * @param type 类型 1系统提示  2GM热更  3当前版本号  4显示Tips界面
		 * @param content 内容
		**/
		public static void sendCmd_260(long hid  ,  int  type  ,   String  content ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{type,content};
			if(!hero.isCanSend(260, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 260);
		}
		/**
		 * 弹出奖励界面
		 * @param result 状态  1胜率  2失败 
		 * @param awards 奖励
		**/
		public static void sendCmd_262(long hid  ,  int  result  ,   Object[]  awards ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{result,awards};
			if(!hero.isCanSend(262, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 262);
		}
		/**
		 * boss提示
		 * @param sysid 系统id
		 * @param boss boss序号
		 * @param status 状态 1开启2关闭
		**/
		public static void sendCmd_264(long hid  ,   int  sysid  ,   int  boss  ,  int  status ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{sysid,boss,status};
			if(!hero.isCanSend(264, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 264);
		}
		/**
		 * 开关状态列表返回
		 * @param onOffStateList 开关状态列表
		**/
		public static void sendCmd_268(long hid  ,   Object[]  onOffStateList ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{onOffStateList};
			if(!hero.isCanSend(268, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 268);
		}
		/**
		 * 返回排行数据
		 * @param actId 活动系统id
		 * @param uid 唯一id
		 * @param job 第一名职业
		 * @param rankData 排名数据
		 * @param iconData 第二，第三名头像id，头像框，国家，vip等级
		 * @param myNum 自身统计值
		 * @param myRank 自身排名
		 * @param endTime 结束时间
		**/
		public static void sendCmd_270(long hid  ,   int  actId  ,   int  uid  ,   int  job  ,   Object[]  rankData  ,   Object[]  iconData  ,   int  myNum  ,   int  myRank  ,   int  endTime ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{actId,uid,job,rankData,iconData,myNum,myRank,endTime};
			if(!hero.isCanSend(270, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 270);
		}
}