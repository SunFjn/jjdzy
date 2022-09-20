package com.teamtop.system.littleLeader;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * LittleLeaderSender.java
 * 少主
 */
public class LittleLeaderSender{
		/**
		 * GC 激活少主返回
		 * @param rest 0成功 1失败
		 * @param index 少主索引
		**/
		public static void sendCmd_5104(long hid  ,  int  rest  ,   int  index ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,index};
			if(!hero.isCanSend(5104, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 5104);
		}
		/**
		 * GC 升星返回
		 * @param rest 0成功1失败
		 * @param index 少主索引
		 * @param starnum 少主星级
		**/
		public static void sendCmd_5106(long hid  ,  int  rest  ,   int  index  ,   int  starnum ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,index,starnum};
			if(!hero.isCanSend(5106, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 5106);
		}
		/**
		 * GC 激活时装返回
		 * @param rest 0成功 1失败
		 * @param fashid 小主时装id
		 * @param fashlv 小主时装等级
		**/
		public static void sendCmd_5108(long hid  ,  int  rest  ,   int  fashid  ,   int  fashlv ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,fashid,fashlv};
			if(!hero.isCanSend(5108, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 5108);
		}
		/**
		 * GC 设置出站返回
		 * @param rest 0成功 1失败
		 * @param leadid 战场小主id
		**/
		public static void sendCmd_5110(long hid  ,  int  rest  ,   int  leadid ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,leadid};
			if(!hero.isCanSend(5110, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 5110);
		}
		/**
		 * GC 穿脱时装
		 * @param rest 0成功 1失败
		 * @param type 小主序号
		 * @param fashid 小主时装id
		**/
		public static void sendCmd_5112(long hid  ,  int  rest  ,   int  type  ,   int  fashid ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,type,fashid};
			if(!hero.isCanSend(5112, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 5112);
		}
		/**
		 * GC 提升亲密度返回
		 * @param rest 0成功 1失败
		 * @param leaderid 小主序号
		 * @param lv 小主亲密度等级
		 * @param exp 小主亲密度经验
		**/
		public static void sendCmd_5114(long hid  ,  int  rest  ,   int  leaderid  ,   int  lv  ,   int  exp ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,leaderid,lv,exp};
			if(!hero.isCanSend(5114, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 5114);
		}
		/**
		 * GC 升级某个小主的主动技能
		 * @param rest 0成功 1失败
		 * @param leadid 小主序号
		 * @param leadlv 小主主动技能等级
		**/
		public static void sendCmd_5116(long hid  ,  int  rest  ,   int  leadid  ,   int  leadlv ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,leadid,leadlv};
			if(!hero.isCanSend(5116, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 5116);
		}
		/**
		 * GC 洗练技能返回
		 * @param rest 0成功1失败
		 * @param sonid 少主序号
		 * @param index 技能位置
		 * @param skills 
		**/
		public static void sendCmd_5118(long hid  ,  int  rest  ,   int  sonid  ,  int  index  ,   Object[]  skills ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,sonid,index,skills};
			if(!hero.isCanSend(5118, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 5118);
		}
		/**
		 * GC 打开ui返回
		 * @param leaderid 当前出站少主
		 * @param infos 
		**/
		public static void sendCmd_5102(long hid  ,   int  leaderid  ,   Object[]  infos ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{leaderid,infos};
			if(!hero.isCanSend(5102, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 5102);
		}
		/**
		 * GC 替换技能
		 * @param rest 0成功 1失败
		 * @param leaderid 小主序号
		 * @param index1 小主被动技能位置
		 * @param skillid1 被动位置上技能id
		**/
		public static void sendCmd_5120(long hid  ,  int  rest  ,   int  leaderid  ,  int  index1  ,   int  skillid1 ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,leaderid,index1,skillid1};
			if(!hero.isCanSend(5120, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 5120);
		}
		/**
		 * GC 少主升星奖励领取情况
		 * @param index 已经领取的少主升星奖励
		**/
		public static void sendCmd_5122(long hid  ,   Object[]  index ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{index};
			if(!hero.isCanSend(5122, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 5122);
		}
		/**
		 * GC 领取升星奖励返回
		 * @param rest 0领取成功 1领取失败
		 * @param index 升星序号
		 * @param state 奖励状态
		**/
		public static void sendCmd_5124(long hid  ,  int  rest  ,   int  index  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,index,state};
			if(!hero.isCanSend(5124, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 5124);
		}
		/**
		 * 六艺信息返回(已激活少主)
		 * @param sixArtsInfo 
		**/
		public static void sendCmd_5126(long hid  ,   Object[]  sixArtsInfo ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{sixArtsInfo};
			if(!hero.isCanSend(5126, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 5126);
		}
		/**
		 * 升级六艺返回
		 * @param state 1.成功 2参数错误 3.升级条件不足 4.已达上限
		 * @param index 少主index  
		 * @param id 六艺id  
		 * @param level 等级
		**/
		public static void sendCmd_5128(long hid  ,  int  state  ,   int  index  ,  int  id  ,   int  level ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,index,id,level};
			if(!hero.isCanSend(5128, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 5128);
		}
		/**
		 * 进修返回
		 * @param state 1.成功 2.参数错误 3.进修条件不足  4.已达顶级学堂
		 * @param index 少主index  
		 * @param schoolId 学堂id
		**/
		public static void sendCmd_5130(long hid  ,  int  state  ,   int  index  ,  int  schoolId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,index,schoolId};
			if(!hero.isCanSend(5130, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 5130);
		}
		/**
		 * 考试返回
		 * @param state 1.成功 2.参数错误 3.考试条件不足
		 * @param flag 1.合格  0.不合格
		 * @param index 少主index  
		 * @param id 六艺id
		**/
		public static void sendCmd_5132(long hid  ,  int  state  ,  int  flag  ,   int  index  ,  int  id ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,flag,index,id};
			if(!hero.isCanSend(5132, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 5132);
		}
		/**
		 * 打开潜能界面返回
		 * @param qnInfo 
		**/
		public static void sendCmd_5134(long hid  ,   Object[]  qnInfo ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{qnInfo};
			if(!hero.isCanSend(5134, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 5134);
		}
		/**
		 * 冲穴返回
		 * @param state 1.成功 2.少主未激活 3.冲穴条件不足 4.已满级
		 * @param index 少主index
		 * @param id 潜能id
		**/
		public static void sendCmd_5136(long hid  ,  int  state  ,   int  index  ,   int  id ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,index,id};
			if(!hero.isCanSend(5136, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 5136);
		}
		/**
		 * 服食返回
		 * @param state 1.成功 2.少主未激活 3.参数错误 4.道具不足 5.已达服食上限
		 * @param index 少主index
		 * @param danyaoId 吞噬丹id
		 * @param num 已服食数量
		**/
		public static void sendCmd_5138(long hid  ,  int  state  ,   int  index  ,   int  danyaoId  ,   int  num ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,index,danyaoId,num};
			if(!hero.isCanSend(5138, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 5138);
		}
}