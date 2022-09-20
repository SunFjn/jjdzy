package com.teamtop.system.weiXinShare;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * WeiXinShareSender.java
 * 微信分享
 */
public class WeiXinShareSender{
		/**
		 * 打开界面返回
		 * @param firstShareState 第一次分享奖励状态:0-未完成,1-可领取,2-已领取
		 * @param lastShareTime 上一次分享时间戳:每5分钟可分享一次
		 * @param todayDrawTime 今天可抽奖次数
		 * @param drawAwardList 已抽到奖励配置id列表
		 * @param totalShareCount 累计分享次数
		 * @param cumulativeAwardList 累计分享已获得奖励配置id列表
		 * @param shareCoin 分享币数量
		**/
		public static void sendCmd_7752(long hid  ,  int  firstShareState  ,   long  lastShareTime  ,  int  todayDrawTime  ,   Object[]  drawAwardList  ,   int  totalShareCount  ,   Object[]  cumulativeAwardList  ,   long  shareCoin ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{firstShareState,lastShareTime,todayDrawTime,drawAwardList,totalShareCount,cumulativeAwardList,shareCoin};
			if(!hero.isCanSend(7752, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 7752);
		}
		/**
		 * 完成分享返回
		 * @param state 状态:0-成功,1-CD中
		**/
		public static void sendCmd_7754(long hid  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state};
			if(!hero.isCanSend(7754, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 7754);
		}
		/**
		 * 获取第一次分享奖励
		 * @param state 状态:0-成功,1-未分享不能领取,2-已领取,3-状态混乱,4-配置不存在
		**/
		public static void sendCmd_7756(long hid  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state};
			if(!hero.isCanSend(7756, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 7756);
		}
		/**
		 * 抽奖返回
		 * @param state 状态:0-成功,1-次数不足,2-已抽完
		 * @param cfgId 抽中配置id
		**/
		public static void sendCmd_7758(long hid  ,  int  state  ,   int  cfgId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,cfgId};
			if(!hero.isCanSend(7758, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 7758);
		}
		/**
		 * 获取累计分享奖励返回
		 * @param state 状态:0-成功,1-配置不存在,2-已领取,3-分享次数不足
		 * @param cfgId 领取配置id
		**/
		public static void sendCmd_7760(long hid  ,  int  state  ,   int  cfgId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,cfgId};
			if(!hero.isCanSend(7760, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 7760);
		}
		/**
		 * 打开分享豪礼界面返回
		 * @param numberCfgId 当前好友数量奖励配置id
		 * @param numberState 当前好友数量奖励状态:0-未完成,1-可领取,2-已全部领取
		 * @param friendList 好友列表
		 * @param hongBaoList 返利红包列表
		**/
		public static void sendCmd_7762(long hid  ,   int  numberCfgId  ,  int  numberState  ,   Object[]  friendList  ,   Object[]  hongBaoList ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{numberCfgId,numberState,friendList,hongBaoList};
			if(!hero.isCanSend(7762, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 7762);
		}
		/**
		 * 获取好友数量奖励返回
		 * @param state 状态:0-成功,1-已领取全部奖励,2-未完成,3-配置不存在
		**/
		public static void sendCmd_7764(long hid  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state};
			if(!hero.isCanSend(7764, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 7764);
		}
		/**
		 * 获取好友等级奖励返回
		 * @param state 状态:0-成功,1-已领取全部奖励,2-未完成,3-配置不存在,4-好友不存在
		 * @param friendHid 好友hid
		 * @param cfgId 当前好友等级配置id
		 * @param awardState 当前任务状态
		**/
		public static void sendCmd_7766(long hid  ,  int  state  ,   long  friendHid  ,   int  cfgId  ,  int  awardState ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,friendHid,cfgId,awardState};
			if(!hero.isCanSend(7766, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 7766);
		}
		/**
		 * 获取红包奖励返回
		 * @param state 状态:0-成功,1-红包不存在,2-已领取
		 * @param index index
		 * @param shareCoin 分享币
		**/
		public static void sendCmd_7768(long hid  ,  int  state  ,   int  index  ,   int  shareCoin ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,index,shareCoin};
			if(!hero.isCanSend(7768, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 7768);
		}
}