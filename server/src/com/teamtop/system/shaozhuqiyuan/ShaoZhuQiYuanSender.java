package com.teamtop.system.shaozhuqiyuan;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * ShaoZhuQiYuanSender.java
 * 少主-祈愿
 */
public class ShaoZhuQiYuanSender{
		/**
		 * 打开界面返回
		 * @param qyfNum 祈愿符数量
		 * @param scoreAwardList 积分奖励可领取个数
		 * @param score 个人积分
		**/
		public static void sendCmd_5392(long hid  ,   int  qyfNum  ,   Object[]  scoreAwardList  ,   int  score ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{qyfNum,scoreAwardList,score};
			if(!hero.isCanSend(5392, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 5392);
		}
		/**
		 * 祈祷返回
		 * @param state 状态，1：成功，2：祈愿符不足，3：元宝不足
		 * @param qyfNum 祈愿符数量
		 * @param score 个人积分
		 * @param awardList 抽取的奖品列表
		**/
		public static void sendCmd_5394(long hid  ,  int  state  ,   int  qyfNum  ,   int  score  ,   Object[]  awardList ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,qyfNum,score,awardList};
			if(!hero.isCanSend(5394, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 5394);
		}
		/**
		 *  领取积分宝箱返回
		 * @param state 状态,0:领取成功,1:失败,-1:更新状态
		 * @param awardId 少主祈愿积分表id
		 * @param nums 剩余领取个数 -1领取完了
		**/
		public static void sendCmd_5396(long hid  ,  int  state  ,   int  awardId  ,   int  nums ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,awardId,nums};
			if(!hero.isCanSend(5396, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 5396);
		}
}