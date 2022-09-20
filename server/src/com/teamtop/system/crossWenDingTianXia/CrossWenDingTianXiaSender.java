package com.teamtop.system.crossWenDingTianXia;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * CrossWenDingTianXiaSender.java
 * 问鼎天下
 */
public class CrossWenDingTianXiaSender{
		/**
		 * 刷新时间与玩家积分
		 * @param time 活动剩余时间
		 * @param timeAwards 收益倒计时
		 * @param rank 我的排名
		 * @param score 我的积分
		 * @param killNum 我的连斩数
		 * @param numBuff 死亡buff层数
		 * @param killNumLayer 我本层击杀人数
		**/
		public static void sendCmd_4202(long hid  ,   int  time  ,  int  timeAwards  ,  int  rank  ,  int  score  ,  int  killNum  ,  int  numBuff  ,  int  killNumLayer ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{time,timeAwards,rank,score,killNum,numBuff,killNumLayer};
			if(!hero.isCanSend(4202, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4202);
		}
		/**
		 * 刷新房间数据
		 * @param hidOth 玉玺持有者ID
		 * @param nameOth 玉玺持有者名字
		 * @param headID 头像ID
		 * @param headF 头像框
		**/
		public static void sendCmd_4204(long hid  ,   long  hidOth  ,   String  nameOth  ,  int  headID  ,  int  headF ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{hidOth,nameOth,headID,headF};
			if(!hero.isCanSend(4204, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4204);
		}
		/**
		 * 刷新玩家层数，玩家跳层或掉层 刷新
		 * @param result 结果  1成功  2已经是最高层  3积分不足  4战败掉到上一层
		 * @param layer 当前层数
		**/
		public static void sendCmd_4206(long hid  ,  int  result  ,  int  layer ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{result,layer};
			if(!hero.isCanSend(4206, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4206);
		}
		/**
		 * 挑战玩家
		 * @param result 结果  1成功  2该玩家不存在  3本玩家问鼎天下数据不存在  4该玩家问鼎天下数据不存在  5该玩家不在房间  6你不在房间中  7该玩家已经不在本层  8请退出当前场景  9对方正在战斗中  10你未复活  11该玩家未复活  12活动未开启  13活动已结束
		**/
		public static void sendCmd_4208(long hid  ,  int  result ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{result};
			if(!hero.isCanSend(4208, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4208);
		}
		/**
		 * 积分变动，飘起来的效果
		 * @param num 增减或减少积分
		**/
		public static void sendCmd_4210(long hid  ,  int  num ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{num};
			if(!hero.isCanSend(4210, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4210);
		}
		/**
		 * 活动结算界面
		 * @param name 玩家名字
		 * @param headID 头像ID
		 * @param headF 头像框
		**/
		public static void sendCmd_4212(long hid  ,   String  name  ,  int  headID  ,  int  headF ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{name,headID,headF};
			if(!hero.isCanSend(4212, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4212);
		}
		/**
		 * 打开排名排行榜
		 * @param rankData 排行榜数据
		 * @param layer 最高层
		 * @param num 斩敌
		**/
		public static void sendCmd_4214(long hid  ,   Object[]  rankData  ,  int  layer  ,  int  num ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rankData,layer,num};
			if(!hero.isCanSend(4214, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4214);
		}
		/**
		 * 打开连斩奖励
		 * @param dataList 所有数据
		 * @param num 我的连斩数
		**/
		public static void sendCmd_4216(long hid  ,   Object[]  dataList  ,  int  num ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{dataList,num};
			if(!hero.isCanSend(4216, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4216);
		}
		/**
		 * 打开楼层奖励
		 * @param dataList 所有数据
		 * @param layer 最高楼层
		**/
		public static void sendCmd_4218(long hid  ,   Object[]  dataList  ,  int  layer ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{dataList,layer};
			if(!hero.isCanSend(4218, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4218);
		}
		/**
		 * 领取连斩奖励
		 * @param result 结果  1成功  2排行榜没有玩家数据  3该奖励不存在  4目标未达成  5奖励已领取  6背包已满
		**/
		public static void sendCmd_4220(long hid  ,  int  result ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{result};
			if(!hero.isCanSend(4220, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4220);
		}
		/**
		 * 领取楼层奖励
		 * @param result 结果  1成功  2奖励不存在  3排行榜没有玩家数据  4目标未达成  5奖励已领取  6背包已满
		**/
		public static void sendCmd_4222(long hid  ,  int  result ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{result};
			if(!hero.isCanSend(4222, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4222);
		}
		/**
		 * 请求进入跨服
		 * @param result 结果  1可以登录中央服了   2系统未开启  3活动未开启  4退出副本冷却中   5活动已结束
		 * @param time 剩余时间
		**/
		public static void sendCmd_4224(long hid  ,  int  result  ,  int  time ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{result,time};
			if(!hero.isCanSend(4224, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4224);
		}
		/**
		 * 刷新场景上的玩家状态
		 * @param hidID 玩家ID
		 * @param data 状态数据    （jf）头顶的积分   （num）连杀数，前端计算主宰、超神     （yx）玉玺0不显示1显示    （wjzt）玩家状态0默认1死亡2战斗中    （wjqx）玩家气血百分比,100以内的整数
		**/
		public static void sendCmd_4226(long hid  ,   long  hidID  ,   String  data ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{hidID,data};
			if(!hero.isCanSend(4226, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4226);
		}
		/**
		 * 打怪物
		 * @param result 结果  1成功  2你不在活动房间内  3玩家数据异常  4该层怪物未初始化  5怪物已被击败  6怪物战斗中  7你未复活  8请退出当前场景  
		**/
		public static void sendCmd_4228(long hid  ,  int  result ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{result};
			if(!hero.isCanSend(4228, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4228);
		}
		/**
		 * 死亡提示
		 * @param name 击败你的玩家名
		 * @param layer 掉落到xx层  0是不掉  其他是掉落后的层数
		**/
		public static void sendCmd_4230(long hid  ,   String  name  ,  int  layer ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{name,layer};
			if(!hero.isCanSend(4230, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4230);
		}
		/**
		 * 复活
		 * @param result 结果  1成功  2数据异常  3你已经复活，无需再复活  4元宝不足
		**/
		public static void sendCmd_4232(long hid  ,  int  result ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{result};
			if(!hero.isCanSend(4232, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4232);
		}
		/**
		 * 挑战人物/怪物结束
		 * @param result 结果  1成功   2不在活动房间内  3玩家数据异常  4该层怪物未初始化  5你没有与怪物战斗  6怪物不存在
		 * @param battleRet 战斗结果 1胜利  2失败
		 * @param awards 奖励
		**/
		public static void sendCmd_4234(long hid  ,  int  result  ,  int  battleRet  ,   Object[]  awards ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{result,battleRet,awards};
			if(!hero.isCanSend(4234, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4234);
		}
		/**
		 * 积分奖励
		 * @param scoreDta 奖励排行数据
		**/
		public static void sendCmd_4236(long hid  ,   Object[]  scoreDta ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{scoreDta};
			if(!hero.isCanSend(4236, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4236);
		}
		/**
		 * 领取积分奖励返回
		 * @param ret 结果  1成功  2奖励不存在   3排行榜没有玩家数据  4目标未达成  5奖励已领取  6背包已满
		 * @param id id
		**/
		public static void sendCmd_4238(long hid  ,  int  ret  ,  int  id ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{ret,id};
			if(!hero.isCanSend(4238, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4238);
		}
}