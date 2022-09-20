package com.teamtop.system.activity.ativitys.yuanXiao;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * YuanXiaoLocalSender.java
 * 做元宵
 */
public class YuanXiaoLocalSender{
		/**
		 * GC 打开ui返回
		 * @param freenum 可领取免费次数
		 * @param time 倒计时
		 * @param onenum 材料1数量
		 * @param tewnum 材料2数量
		 * @param threenum 材料3数量
		**/
		public static void sendCmd_11630(long hid  ,   int  freenum  ,   int  time  ,   int  onenum  ,   int  tewnum  ,   int  threenum ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{freenum,time,onenum,tewnum,threenum};
			if(!hero.isCanSend(11630, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11630);
		}
		/**
		 * GC 打开掠夺界面返回
		 * @param canBattleNum 剩余掠夺次数
		 * @param resTime 刷新时间
		 * @param type 材料分类（24 25 26）
		 * @param infos 
		**/
		public static void sendCmd_11632(long hid  ,   int  canBattleNum  ,   int  resTime  ,  int  type  ,   Object[]  infos ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{canBattleNum,resTime,type,infos};
			if(!hero.isCanSend(11632, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11632);
		}
		/**
		 * GC战斗返回
		 * @param rest 0开始战斗 1对方没有屯粮了
		 * @param battlerest 0胜利1失败
		 * @param oneNum 拥有材料1数量
		 * @param twoNum 拥有材料2数量
		 * @param threeNum 拥有材料3数量
		 * @param winID 胜利玩家ID
		 * @param head 胜利头像ID
		 * @param power 战力
		 * @param name 名字
		 * @param jxID 胜利者将衔ID
		 * @param leftID 我方玩家ID
		 * @param rightID 敌方玩家ID
		**/
		public static void sendCmd_11634(long hid  ,  int  rest  ,  int  battlerest  ,   int  oneNum  ,   int  twoNum  ,   int  threeNum  ,   long  winID  ,   int  head  ,   long  power  ,   String  name  ,   int  jxID  ,   long  leftID  ,   long  rightID ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,battlerest,oneNum,twoNum,threeNum,winID,head,power,name,jxID,leftID,rightID};
			if(!hero.isCanSend(11634, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11634);
		}
		/**
		 * GC刷新返回11632
		 * @param rest 0成功 1没有人有材料 2元宝不够
		**/
		public static void sendCmd_11636(long hid  ,  int  rest ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest};
			if(!hero.isCanSend(11636, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11636);
		}
		/**
		 * GC 制作结果
		 * @param rest 0成功 1材料不足 
		 * @param id 道具ID
		 * @param num 道具数量
		 * @param onenum 材料1数量
		 * @param twonum 材料2数量
		 * @param threenum 材料3数量
		**/
		public static void sendCmd_11638(long hid  ,  int  rest  ,   int  id  ,   int  num  ,   int  onenum  ,   int  twonum  ,   int  threenum ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,id,num,onenum,twonum,threenum};
			if(!hero.isCanSend(11638, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11638);
		}
		/**
		 * GC 材料数量变化
		 * @param num1 材料1
		 * @param num2 材料2
		 * @param num3 材料3
		**/
		public static void sendCmd_11640(long hid  ,   int  num1  ,   int  num2  ,   int  num3 ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{num1,num2,num3};
			if(!hero.isCanSend(11640, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11640);
		}
		/**
		 * 领取免费材料返回
		 * @param rest 0成功 1失败
		 * @param hasnum 已经领取次数
		 * @param num 可以领取次数
		**/
		public static void sendCmd_11642(long hid  ,  int  rest  ,   int  hasnum  ,   int  num ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,hasnum,num};
			if(!hero.isCanSend(11642, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 11642);
		}
}