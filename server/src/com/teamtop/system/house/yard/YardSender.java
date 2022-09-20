package com.teamtop.system.house.yard;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * YardSender.java
 * 府邸
 */
public class YardSender{
		/**
		 * 进入院子返回
		 * @param state 状态:0-成功,1-失败
		 * @param heroId 角色id
		 * @param name 角色名字
		 * @param herdId 角色头像
		 * @param iconId 角色头像框
		 * @param level 角色等级
		 * @param prosperity 繁荣度
		 * @param houseLv 府邸等级
		 * @param houseDc 府邸档次
		 * @param decorateInfos 装饰信息
		 * @param nextShakeTreeTime 下次可摇树时间
		 * @param drawAwardTimes 天工炉剩余抽奖次数
		 * @param jiFen 天工炉积分
		 * @param goldHouseMoney 金库储存府邸币
		 * @param eventInfo 事件信息
		 * @param nextAddMoneyTime 下次可领府邸币时间
		 * @param completeEvent 剩余可完成的随机事件次数
		 * @param completeEventHelp 剩余可帮助的随机事件次数
		 * @param houseCoin 府邸币
		 * @param houseKeeperId 家丁职位
		 * @param maidId 侍女配置id
		**/
		public static void sendCmd_11102(long hid  ,  int  state  ,   long  heroId  ,   String  name  ,   int  herdId  ,   int  iconId  ,   int  level  ,   long  prosperity  ,   int  houseLv  ,   int  houseDc  ,   Object[]  decorateInfos  ,   int  nextShakeTreeTime  ,   int  drawAwardTimes  ,   long  jiFen  ,   long  goldHouseMoney  ,   Object[]  eventInfo  ,   int  nextAddMoneyTime  ,   int  completeEvent  ,   int  completeEventHelp  ,   long  houseCoin  ,   int  houseKeeperId  ,   int  maidId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,heroId,name,herdId,iconId,level,prosperity,houseLv,houseDc,decorateInfos,nextShakeTreeTime,drawAwardTimes,jiFen,goldHouseMoney,eventInfo,nextAddMoneyTime,completeEvent,completeEventHelp,houseCoin,houseKeeperId,maidId};
			if(!hero.isCanSend(11102, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11102);
		}
		/**
		 * 退出府邸返回
		 * @param state 状态:0-成功,1-失败
		**/
		public static void sendCmd_11104(long hid  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state};
			if(!hero.isCanSend(11104, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11104);
		}
		/**
		 * 升级府邸等级返回
		 * @param state 状态:0-成功,1-配置不存在,2-已达最高等级,3-繁荣度不足,4-货币不足,5-府邸档次不足
		 * @param level 府邸等级
		**/
		public static void sendCmd_11106(long hid  ,  int  state  ,   int  level ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,level};
			if(!hero.isCanSend(11106, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11106);
		}
		/**
		 * 升级府邸档次返回
		 * @param state 状态:0-成功,1-配置不存在,2-已达最高档次,3-府邸等级不足,4-货币不足
		 * @param level 府邸档次
		**/
		public static void sendCmd_11108(long hid  ,  int  state  ,   int  level ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,level};
			if(!hero.isCanSend(11108, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11108);
		}
		/**
		 * 升级装饰等级返回
		 * @param state 状态:0-成功,1-参数错误,2-配置不存在,3-已达最高等级,4-府邸配置不存在,5-府邸等级不足,6-货币不足
		 * @param type 装饰种类
		 * @param level 装饰等级
		**/
		public static void sendCmd_11110(long hid  ,  int  state  ,   int  type  ,   int  level ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,type,level};
			if(!hero.isCanSend(11110, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11110);
		}
		/**
		 * 摇钱行为返回
		 * @param state 状态:0-成功,1-冷却中,2-数据异常,3-配置不存在,4-府邸配置不存在,5-府邸等级不足
		 * @param time 下次摇钱树时间
		**/
		public static void sendCmd_11112(long hid  ,  int  state  ,   int  time ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,time};
			if(!hero.isCanSend(11112, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11112);
		}
		/**
		 * 收获府邸币返回
		 * @param state 状态:0-成功,1-金库为空,2-金库刚被偷完,3-府邸币太少了，下不了手
		 * @param nextAddMoneyTime 下次可领府邸币时间
		 * @param count 顺走数量
		 * @param number 减免数量
		**/
		public static void sendCmd_11114(long hid  ,  int  state  ,   int  nextAddMoneyTime  ,   int  count  ,   int  number ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,nextAddMoneyTime,count,number};
			if(!hero.isCanSend(11114, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11114);
		}
		/**
		 * 天工炉抽奖返回
		 * @param state 状态:0-成功,1-配置不存在,2-积分不足,3-数据异常,4-天工炉配置不存在,5-抽奖次数不足
		 * @param iType 物品类型
		 * @param iId 物品id
		 * @param iCount 物品数量
		 * @param jiFen 积分
		 * @param times 抽奖次数
		**/
		public static void sendCmd_11116(long hid  ,  int  state  ,  int  iType  ,   int  iId  ,   int  iCount  ,   long  jiFen  ,   int  times ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,iType,iId,iCount,jiFen,times};
			if(!hero.isCanSend(11116, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11116);
		}
		/**
		 * 天工炉献祭返回
		 * @param state 状态:0-成功,1-配置不存在,2-物品不能献祭,3-物品不足
		 * @param jiFen 积分
		**/
		public static void sendCmd_11118(long hid  ,  int  state  ,   long  jiFen ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,jiFen};
			if(!hero.isCanSend(11118, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11118);
		}
		/**
		 * 前往别人府邸返回
		 * @param state 状态:0-成功,1-失败
		**/
		public static void sendCmd_11120(long hid  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state};
			if(!hero.isCanSend(11120, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11120);
		}
		/**
		 * 打开排名榜返回
		 * @param state 状态:0-成功,1-失败
		 * @param myRank 我的排名
		 * @param rankInfo 府邸排名
		**/
		public static void sendCmd_11122(long hid  ,  int  state  ,   int  myRank  ,   Object[]  rankInfo ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,myRank,rankInfo};
			if(!hero.isCanSend(11122, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11122);
		}
		/**
		 * 获取事件奖励返回
		 * @param state 状态:0-成功,1-事件不存在,2-配置不存在,3-事件已处理,4-已无处理次数
		 * @param eventId 事件id
		**/
		public static void sendCmd_11124(long hid  ,  int  state  ,   int  eventId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,eventId};
			if(!hero.isCanSend(11124, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11124);
		}
		/**
		 * 推送事件变化
		 * @param heroId 角色id
		 * @param eventInfo 事件信息
		**/
		public static void sendCmd_11126(long hid  ,   long  heroId  ,   Object[]  eventInfo ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{heroId,eventInfo};
			if(!hero.isCanSend(11126, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11126);
		}
		/**
		 * 请求挑战强盗返回
		 * @param state 状态:0-成功,1-强盗不存在,2-强盗正在战斗中,3-已无挑战次数
		 * @param mid 怪物唯一的id
		**/
		public static void sendCmd_11128(long hid  ,  int  state  ,   long  mid ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,mid};
			if(!hero.isCanSend(11128, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11128);
		}
		/**
		 * 通知后端挑战强盗结果返回
		 * @param monsterid 怪物唯一id
		 * @param rest 0输了 1赢了
		 * @param awardInfo 奖励信息
		**/
		public static void sendCmd_11130(long hid  ,   long  monsterid  ,  int  rest  ,   Object[]  awardInfo ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{monsterid,rest,awardInfo};
			if(!hero.isCanSend(11130, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11130);
		}
		/**
		 * 获取金库信息返回
		 * @param goldHouseMoney 金库储存府邸币
		 * @param nextAddMoneyTime 下次可领府邸币时间
		**/
		public static void sendCmd_11132(long hid  ,   long  goldHouseMoney  ,   int  nextAddMoneyTime ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{goldHouseMoney,nextAddMoneyTime};
			if(!hero.isCanSend(11132, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11132);
		}
		/**
		 * 打开记录界面
		 * @param logdata 记录
		**/
		public static void sendCmd_11134(long hid  ,   Object[]  logdata ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{logdata};
			if(!hero.isCanSend(11134, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11134);
		}
		/**
		 * 推送次数变化
		 * @param type 类型:1-抽奖次数,2-事件次数,3-帮助次数
		 * @param times 次数
		**/
		public static void sendCmd_11136(long hid  ,   int  type  ,   int  times ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{type,times};
			if(!hero.isCanSend(11136, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11136);
		}
}