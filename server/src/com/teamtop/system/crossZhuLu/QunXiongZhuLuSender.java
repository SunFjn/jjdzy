package com.teamtop.system.crossZhuLu;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * QunXiongZhuLuSender.java
 * 群雄逐鹿
 */
public class QunXiongZhuLuSender{
		/**
		 * 打开宝库返回
		 * @param goodsList 商品列表
		**/
		public static void sendCmd_8958(long hid  ,   Object[]  goodsList ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{goodsList};
			if(!hero.isCanSend(8958, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8958);
		}
		/**
		 * 宝库兑换返回
		 * @param state 状态，0-成功，1-道具不足,2-购买次数不足,3-配置不存在
		 * @param goodsId 商品id
		 * @param buyCount 已购买数量
		**/
		public static void sendCmd_8962(long hid  ,  int  state  ,   int  goodsId  ,   int  buyCount ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,goodsId,buyCount};
			if(!hero.isCanSend(8962, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8962);
		}
		/**
		 * 打开任务界面返回
		 * @param taskInfos 任务列表
		**/
		public static void sendCmd_8956(long hid  ,   Object[]  taskInfos ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{taskInfos};
			if(!hero.isCanSend(8956, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8956);
		}
		/**
		 * 领取任务奖励返回
		 * @param state 状态:0-成功,1-失败
		 * @param taskId 任务id
		**/
		public static void sendCmd_8964(long hid  ,  int  state  ,   int  taskId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,taskId};
			if(!hero.isCanSend(8964, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8964);
		}
		/**
		 * 打开排名界面返回
		 * @param rankData 国家排名
		 * @param mvpName MVP玩家名
		 * @param score 当前MVP玩家积分
		 * @param head MVP头像
		 * @param headGrid MVP头像框
		**/
		public static void sendCmd_8954(long hid  ,   Object[]  rankData  ,   String  mvpName  ,   long  score  ,   int  head  ,   int  headGrid ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rankData,mvpName,score,head,headGrid};
			if(!hero.isCanSend(8954, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8954);
		}
		/**
		 * 打开国家排名界面返回
		 * @param myRanking 自己的排名
		 * @param score 自己的积分
		 * @param countryId 国家id
		 * @param roleInfo 玩家排名信息
		**/
		public static void sendCmd_8966(long hid  ,   int  myRanking  ,   long  score  ,   int  countryId  ,   Object[]  roleInfo ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{myRanking,score,countryId,roleInfo};
			if(!hero.isCanSend(8966, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8966);
		}
		/**
		 * 打开战况界面返回
		 * @param recordDate 全服战况
		 * @param myRecordDate 个人战况
		**/
		public static void sendCmd_8960(long hid  ,   Object[]  recordDate  ,   Object[]  myRecordDate ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{recordDate,myRecordDate};
			if(!hero.isCanSend(8960, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8960);
		}
		/**
		 * 移动到某城池返回
		 * @param cityId 城池id
		 * @param result 结果0成功1-体力不足,2-正在被挑战
		**/
		public static void sendCmd_8968(long hid  ,   int  cityId  ,  int  result ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{cityId,result};
			if(!hero.isCanSend(8968, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8968);
		}
		/**
		 * 查看城池信息返回
		 * @param cityId 城池id
		 * @param country 国家归属
		 * @param maxPage 最大页码
		 * @param curPage 当前页码
		 * @param roleInfo 玩家信息
		**/
		public static void sendCmd_8970(long hid  ,   int  cityId  ,   int  country  ,   int  maxPage  ,   int  curPage  ,   Object[]  roleInfo ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{cityId,country,maxPage,curPage,roleInfo};
			if(!hero.isCanSend(8970, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8970);
		}
		/**
		 * 攻击/驻守城池返回
		 * @param index 攻击位置
		 * @param result 能否挑战结果0成功1-正在驻守中,2-体力不足,3-还有敌方驻守,4-正在挑战中,5-敌方都城不能驻守和攻击,6-体力不足以驻守,7-只可占领本国属地的相邻城池,8-只能攻击本国属地的相邻领地,9-不能攻击本国驻守目标,10-体力≥X 才可挑战
		 * @param id 玩家id/npcid
		 * @param type 类型0玩家1NPC,2-驻守成功
		**/
		public static void sendCmd_8972(long hid  ,   int  index  ,  int  result  ,   long  id  ,   int  type ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{index,result,id,type};
			if(!hero.isCanSend(8972, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8972);
		}
		/**
		 * 进入地图返回
		 * @param state 状态:0成功,1未开启
		 * @param isEnd 是否结束:0-开始中,1-已结束
		 * @param buyTiLiTimes 已购买体力次数
		 * @param countryInfo 国家信息
		 * @param maxTL 最大值体力
		 * @param nowTL 当前值体力
		 * @param lastAddTLTime 上次恢复时间戳
		 * @param myJiFen 个人积分
		 * @param nowCity 当前城池id
		 * @param isInCity 是否驻守状态
		 * @param cityInfo 城池信息
		 * @param buffTime 单枪匹马持续分钟,0为未激活
		**/
		public static void sendCmd_8952(long hid  ,  int  state  ,  int  isEnd  ,   int  buyTiLiTimes  ,   Object[]  countryInfo  ,   int  maxTL  ,   int  nowTL  ,   int  lastAddTLTime  ,   long  myJiFen  ,   int  nowCity  ,  int  isInCity  ,   Object[]  cityInfo  ,   int  buffTime ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,isEnd,buyTiLiTimes,countryInfo,maxTL,nowTL,lastAddTLTime,myJiFen,nowCity,isInCity,cityInfo,buffTime};
			if(!hero.isCanSend(8952, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8952);
		}
		/**
		 * GC 战斗结果返回
		 * @param result 战斗结果1胜利2失败
		**/
		public static void sendCmd_8974(long hid  ,  int  result ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{result};
			if(!hero.isCanSend(8974, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8974);
		}
		/**
		 * GC 购买体力返回
		 * @param result 结果0成功1-购买次数不足,2-元宝不足
		 * @param curValue 当前体力
		 * @param maxValue 体力上限
		 * @param buyTiLiTimes 已购买体力次数
		**/
		public static void sendCmd_8976(long hid  ,  int  result  ,   int  curValue  ,   int  maxValue  ,   int  buyTiLiTimes ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{result,curValue,maxValue,buyTiLiTimes};
			if(!hero.isCanSend(8976, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8976);
		}
		/**
		 * 查看驻守奖励信息返回
		 * @param awardInfo 奖励信息
		**/
		public static void sendCmd_8978(long hid  ,   Object[]  awardInfo ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{awardInfo};
			if(!hero.isCanSend(8978, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8978);
		}
		/**
		 * 获取驻守奖励返回
		 * @param state 状态:0-成功,1-失败
		**/
		public static void sendCmd_8980(long hid  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state};
			if(!hero.isCanSend(8980, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8980);
		}
		/**
		 * 更新信息
		 * @param type 类型:1-体力,2-城池归属,3-积分,4-踢出城池
		 * @param param1 参数1:1-当前体力,2-城池id,3-当前积分
		 * @param param2 参数2:1-最大体力,2-城池归属
		 * @param param3 参数3:1-上次更新体力时间,2-是否庆典
		 * @param param4 参数4:2-城池驻守人数
		**/
		public static void sendCmd_8982(long hid  ,   int  type  ,   int  param1  ,   int  param2  ,   int  param3  ,   int  param4 ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{type,param1,param2,param3,param4};
			if(!hero.isCanSend(8982, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8982);
		}
		/**
		 * 打开个人排行返回
		 * @param rankList 排行榜数据
		 * @param myRank 我的排名 0未进排行榜
		 * @param myScore 我的积分
		**/
		public static void sendCmd_8984(long hid  ,   Object[]  rankList  ,  int  myRank  ,   int  myScore ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rankList,myRank,myScore};
			if(!hero.isCanSend(8984, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8984);
		}
		/**
		 * 单枪匹马buff购买返回
		 * @param state 状态：1：成功，2：不够钱，3：已有不能再购买
		**/
		public static void sendCmd_8986(long hid  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state};
			if(!hero.isCanSend(8986, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8986);
		}
}