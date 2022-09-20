package com.teamtop.system.activity.ativitys.superHoodle;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * SuperHoodleSender.java
 * 超级弹珠
 */
public class SuperHoodleSender{
		/**
		 * 返回界面信息
		 * @param shootNum 当前已发射次数
		 * @param poolData 奖池数据
		 * @param point 弹珠积分
		**/
		public static void sendCmd_11730(long hid  ,   int  shootNum  ,   Object[]  poolData  ,   long  point ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{shootNum,poolData,point};
			if(!hero.isCanSend(11730, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11730);
		}
		/**
		 * 屏蔽操作结果
		 * @param rtnCode 结果：（0：失败，1：成功）
		 * @param type 失败：（1：位置已屏蔽，2：位置未被屏蔽不用解除屏蔽），成功：操作类型
		 * @param index 操作位置
		**/
		public static void sendCmd_11732(long hid  ,  int  rtnCode  ,  int  type  ,  int  index ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,type,index};
			if(!hero.isCanSend(11732, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11732);
		}
		/**
		 * 
		 * @param rtnCode 抽奖结果：0：失败，1：成功
		 * @param shootNum 失败：（1：不能发射5次，2：元宝不足），成功：已发射次数
		 * @param point 弹珠积分
		 * @param rewardData 奖励数据
		**/
		public static void sendCmd_11734(long hid  ,  int  rtnCode  ,   int  shootNum  ,   long  point  ,   Object[]  rewardData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,shootNum,point,rewardData};
			if(!hero.isCanSend(11734, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11734);
		}
		/**
		 * 重置结果
		 * @param rtnCode 结果：0：失败（元宝不足），1：成功
		**/
		public static void sendCmd_11736(long hid  ,  int  rtnCode ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode};
			if(!hero.isCanSend(11736, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11736);
		}
		/**
		 * 弹珠积分商店数据返回
		 * @param hoodlePoint 弹珠积分
		 * @param storeData 商品数据
		**/
		public static void sendCmd_11738(long hid  ,   long  hoodlePoint  ,   Object[]  storeData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{hoodlePoint,storeData};
			if(!hero.isCanSend(11738, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11738);
		}
		/**
		 * 兑换结果
		 * @param rtnCode 结果：0：失败，1：成功
		 * @param id 失败：（1：积分不足），成功：兑换id
		 * @param num 已兑换数量
		**/
		public static void sendCmd_11740(long hid  ,  int  rtnCode  ,   int  id  ,   int  num ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,id,num};
			if(!hero.isCanSend(11740, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11740);
		}
}