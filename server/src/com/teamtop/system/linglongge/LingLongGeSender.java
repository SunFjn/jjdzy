package com.teamtop.system.linglongge;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * LingLongGeSender.java
 * 玲珑阁linglongge
 */
public class LingLongGeSender{
		/**
		 * 打开界面返回
		 * @param id 玲珑阁表配置id
		 * @param restTimes 必得高级道具剩余次数
		 * @param awardNoticeList 获奖公告列表
		 * @param llbNum 玲珑币数量
		 * @param scoreAwardList 每日目标积分奖励可领取个数
		 * @param score 个人积分
		**/
		public static void sendCmd_2222(long hid  ,   int  id  ,  int  restTimes  ,   Object[]  awardNoticeList  ,   int  llbNum  ,   Object[]  scoreAwardList  ,   int  score ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{id,restTimes,awardNoticeList,llbNum,scoreAwardList,score};
			if(!hero.isCanSend(2222, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2222);
		}
		/**
		 * 购买返回
		 * @param state 状态，1：成功，2：玲珑币不足，3：元宝不足
		 * @param awardList 抽取的奖品列表
		 * @param restTimes 必得高级道具剩余次数
		 * @param llbNum 玲珑币数量
		 * @param score 个人积分
		**/
		public static void sendCmd_2224(long hid  ,  int  state  ,   Object[]  awardList  ,  int  restTimes  ,   int  llbNum  ,   int  score ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,awardList,restTimes,llbNum,score};
			if(!hero.isCanSend(2224, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2224);
		}
		/**
		 * 排行榜界面返回
		 * @param rankList 排行榜列表
		 * @param configId 玲珑阁排名表配置id
		**/
		public static void sendCmd_2226(long hid  ,   Object[]  rankList  ,   int  configId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rankList,configId};
			if(!hero.isCanSend(2226, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2226);
		}
		/**
		 * 领取每日积分宝箱奖励
		 * @param rest 0领取成功 1失败 -1更新状态
		 * @param awardId 玲珑阁积分表id
		 * @param nums 剩余领取个数 -1领取完了
		**/
		public static void sendCmd_2228(long hid  ,  int  rest  ,   int  awardId  ,   int  nums ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,awardId,nums};
			if(!hero.isCanSend(2228, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2228);
		}
		/**
		 * 在线推送获奖公告
		 * @param awardNoticeList 获奖公告列表
		 * @param id 获取奖励的玩家
		**/
		public static void sendCmd_2230(long hid  ,   Object[]  awardNoticeList  ,   long  id ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{awardNoticeList,id};
			if(!hero.isCanSend(2230, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2230);
		}
		/**
		 * GC 区服积分排名
		 * @param ranks 
		 * @param rank 区排名
		 * @param score 区积分
		**/
		public static void sendCmd_2232(long hid  ,   Object[]  ranks  ,   int  rank  ,   int  score ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{ranks,rank,score};
			if(!hero.isCanSend(2232, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2232);
		}
		/**
		 * 打开上期排名界面返回
		 * @param lastRankList 上期排行列表
		 * @param myLastRank 我的上期排名
		 * @param myLastScore 我的上期积分
		 * @param configId 玲珑阁排名表配置id
		**/
		public static void sendCmd_2234(long hid  ,   Object[]  lastRankList  ,   int  myLastRank  ,   int  myLastScore  ,   int  configId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{lastRankList,myLastRank,myLastScore,configId};
			if(!hero.isCanSend(2234, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2234);
		}
		/**
		 * 打开上期区服积分排名界面返回
		 * @param lastZoneidRankList 上期区服积分排名列表
		 * @param lastZoneidRank 区排名
		 * @param lastZoneidScore 区积分
		 * @param configId 玲珑阁表配置id
		**/
		public static void sendCmd_2236(long hid  ,   Object[]  lastZoneidRankList  ,   int  lastZoneidRank  ,   int  lastZoneidScore  ,   int  configId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{lastZoneidRankList,lastZoneidRank,lastZoneidScore,configId};
			if(!hero.isCanSend(2236, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 2236);
		}
}