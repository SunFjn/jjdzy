package com.teamtop.system.house.yanhui;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * YanhuiSender.java
 * 宴会
 */
public class YanhuiSender{
		/**
		 * 打开宴会列表界面返回
		 * @param id 正在参与宴会唯一id(0.未参与)
		 * @param houseList 宴会列表信息
		**/
		public static void sendCmd_11452(long hid  ,   int  id  ,   Object[]  houseList ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{id,houseList};
			if(!hero.isCanSend(11452, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11452);
		}
		/**
		 * 前往进入宴会场景返回
		 * @param state 1.成功 2.宴会已结束 3.请先加入宴会或举办宴会
		 * @param name 玩家名称
		 * @param id 宴会类型
		 * @param num 参与人数
		 * @param fenweiVal 氛围值
		 * @param time 宴会结束时间
		 * @param thid 举办者玩家id
		 * @param jingjiu 敬酒
		 * @param lingJiang 领奖
		 * @param biwu 比武
		 * @param binkeList 宾客列表
		 * @param shenqingList 申请列表
		 * @param sqType 申请勾选状态:0.无需申请 1.需申请（默认是0）
		**/
		public static void sendCmd_11454(long hid  ,  int  state  ,   String  name  ,  int  id  ,  int  num  ,   int  fenweiVal  ,   int  time  ,   long  thid  ,   Object[]  jingjiu  ,   Object[]  lingJiang  ,   Object[]  biwu  ,   Object[]  binkeList  ,   Object[]  shenqingList  ,  int  sqType ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,name,id,num,fenweiVal,time,thid,jingjiu,lingJiang,biwu,binkeList,shenqingList,sqType};
			if(!hero.isCanSend(11454, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11454);
		}
		/**
		 * 赴宴
		 * @param state 1.成功 2.元宝不足 3.人数已满 4.宴会已结束 5.同一时间只能参加一场宴会 6.不接受普通赴宴礼物 7.举办人尚未同意你赴宴
		 * @param id 宴会id
		**/
		public static void sendCmd_11456(long hid  ,  int  state  ,   int  id ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,id};
			if(!hero.isCanSend(11456, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11456);
		}
		/**
		 * 举办宴会返回
		 * @param state 1.成功 2.vip等级不足 3.元宝不足 4.同一时间只能参加一场宴会 5.不在举办时间内
		 * @param uid 宴会唯一id
		**/
		public static void sendCmd_11458(long hid  ,  int  state  ,   int  uid ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,uid};
			if(!hero.isCanSend(11458, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11458);
		}
		/**
		 * 敬酒返回
		 * @param state 1.成功 2.剩余次数不足 3.元宝不足
		 * @param id 敬酒类型
		 * @param num 剩余次数
		**/
		public static void sendCmd_11460(long hid  ,  int  state  ,  int  id  ,   int  num ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,id,num};
			if(!hero.isCanSend(11460, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11460);
		}
		/**
		 * 敬酒领奖返回
		 * @param state 1.成功 2.已领取 3.条件不符
		 * @param id 敬酒标识id
		**/
		public static void sendCmd_11462(long hid  ,  int  state  ,   int  id ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,id};
			if(!hero.isCanSend(11462, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11462);
		}
		/**
		 * 开启比武返回
		 * @param state 1成功 2.比武只有主人才可开启 3.元宝不足
		 * @param bossId boss ID
		**/
		public static void sendCmd_11464(long hid  ,  int  state  ,   int  bossId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,bossId};
			if(!hero.isCanSend(11464, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11464);
		}
		/**
		 * 邀请返回
		 * @param state 1.成功 2.主人才可发出邀请
		**/
		public static void sendCmd_11466(long hid  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state};
			if(!hero.isCanSend(11466, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11466);
		}
		/**
		 * 离开宴会场景返回
		 * @param state 1.成功离开宴会场景
		**/
		public static void sendCmd_11468(long hid  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state};
			if(!hero.isCanSend(11468, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11468);
		}
		/**
		 * 挑战boss返回
		 * @param state 1.成功 2.该BOSS已挑战 3.BOSS未开启
		 * @param bossId boss ID
		**/
		public static void sendCmd_11470(long hid  ,  int  state  ,   int  bossId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,bossId};
			if(!hero.isCanSend(11470, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11470);
		}
		/**
		 * 显示系统图标
		 * @param sysId 系统id
		 * @param show 1.显示 0.取消显示 2.宴会举办结束
		**/
		public static void sendCmd_11472(long hid  ,   int  sysId  ,  int  show ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{sysId,show};
			if(!hero.isCanSend(11472, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11472);
		}
		/**
		 * 返回战斗结果
		 * @param state 0输了 1赢了
		 * @param bossId Boss ID
		**/
		public static void sendCmd_11474(long hid  ,  int  state  ,   int  bossId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,bossId};
			if(!hero.isCanSend(11474, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11474);
		}
		/**
		 * 战斗结束后前端请求重新进入返回场景
		 * @param state 1.成功 
		**/
		public static void sendCmd_11476(long hid  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state};
			if(!hero.isCanSend(11476, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11476);
		}
		/**
		 * 返回宴会id
		 * @param id 宴会ID(0.没有宴会)
		**/
		public static void sendCmd_11478(long hid  ,   int  id ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{id};
			if(!hero.isCanSend(11478, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11478);
		}
		/**
		 * 申请加入宴会返回
		 * @param state 1.成功 2.正在参与宴会不可申请 3.宴会已结束
		 * @param id 宴会唯一id
		 * @param type 1.申请 0.取消申请
		**/
		public static void sendCmd_11480(long hid  ,  int  state  ,   int  id  ,  int  type ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,id,type};
			if(!hero.isCanSend(11480, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11480);
		}
		/**
		 * 勾选申请返回
		 * @param state 1.成功 2.无此权限
		 * @param type 0.无需申请 1.需申请
		**/
		public static void sendCmd_11482(long hid  ,  int  state  ,  int  type ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,type};
			if(!hero.isCanSend(11482, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11482);
		}
		/**
		 * 批准申请进宴会返回
		 * @param state 1.成功 2.无此权限 3.对方已参与宴会
		 * @param type -1.全部拒绝 0.拒绝 1.同意 2.全部同意
		 * @param thid 玩家id
		**/
		public static void sendCmd_11484(long hid  ,  int  state  ,  int  type  ,   long  thid ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,type,thid};
			if(!hero.isCanSend(11484, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11484);
		}
		/**
		 * 主推申请玩家
		 * @param thid 玩家id
		 * @param name 玩家名称
		**/
		public static void sendCmd_11486(long hid  ,   long  thid  ,   String  name ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{thid,name};
			if(!hero.isCanSend(11486, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11486);
		}
}