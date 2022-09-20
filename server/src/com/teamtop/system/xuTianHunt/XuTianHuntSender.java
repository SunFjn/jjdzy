package com.teamtop.system.xuTianHunt;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * XuTianHuntSender.java
 * 许田围猎
 */
public class XuTianHuntSender{
		/**
		 * 返回界面信息
		 * @param huntNum 剩余狩猎次数
		 * @param buyNum 已购买次数
		**/
		public static void sendCmd_11822(long hid  ,   int  huntNum  ,  int  buyNum ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{huntNum,buyNum};
			if(!hero.isCanSend(11822, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11822);
		}
		/**
		 * 购买结果返回
		 * @param rtnCode 结果：0：失败，1：成功
		 * @param huntNum 失败：（1：元宝不足，2：超过可购买次数），成功：剩余狩猎次数
		 * @param buyNum 已购买次数
		**/
		public static void sendCmd_11824(long hid  ,  int  rtnCode  ,   int  huntNum  ,  int  buyNum ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,huntNum,buyNum};
			if(!hero.isCanSend(11824, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11824);
		}
		/**
		 * 开始狩猎返回
		 * @param rtnCode 结果：:1：成功，2：没有次数
		 * @param rewardPreyData 奖励猎物数据
		 * @param buffPreyData buff猎物数据
		**/
		public static void sendCmd_11826(long hid  ,  int  rtnCode  ,   Object[]  rewardPreyData  ,   Object[]  buffPreyData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,rewardPreyData,buffPreyData};
			if(!hero.isCanSend(11826, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11826);
		}
		/**
		 * 射击结果
		 * @param rtnCode 0：失败，1：成功
		 * @param type 失败（1：没箭，2：没击中）
		 * @param preyType 猎物类型
		 * @param id 猎物唯一id
		 * @param arrowNum 剩余箭数量
		**/
		public static void sendCmd_11828(long hid  ,  int  rtnCode  ,  int  type  ,  int  preyType  ,   int  id  ,   int  arrowNum ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,type,preyType,id,arrowNum};
			if(!hero.isCanSend(11828, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11828);
		}
		/**
		 * 围猎结束
		**/
		public static void sendCmd_11830(long hid ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = null;
			if(!hero.isCanSend(11830, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11830);
		}
		/**
		 * 仓库信息返回
		 * @param data 仓库数据
		**/
		public static void sendCmd_11832(long hid  ,   Object[]  data ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{data};
			if(!hero.isCanSend(11832, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11832);
		}
}