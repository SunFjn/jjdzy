package com.teamtop.system.crossFireBeacon;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * CrossFireBeaconSender.java
 * 烽火狼烟
 */
public class CrossFireBeaconSender{
		/**
		 * 打开界面信息返回
		 * @param mvpName 上届MVP玩家名
		**/
		public static void sendCmd_3552(long hid  ,   String  mvpName ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{mvpName};
			if(!hero.isCanSend(3552, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3552);
		}
		/**
		 * 个人排行数据
		 * @param rankData 个人排行数据
		 * @param myRanking 自己的排名
		 * @param score 自己的积分
		**/
		public static void sendCmd_3554(long hid  ,   Object[]  rankData  ,   int  myRanking  ,   long  score ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rankData,myRanking,score};
			if(!hero.isCanSend(3554, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3554);
		}
		/**
		 * 区排行数据返回
		 * @param rankData 区排行数据
		 * @param mvpName MVP玩家名
		 * @param score 当前MVP玩家积分
		 * @param head MVP头像
		 * @param headGrid MVP头像框
		**/
		public static void sendCmd_3556(long hid  ,   Object[]  rankData  ,   String  mvpName  ,   long  score  ,   int  head  ,   int  headGrid ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rankData,mvpName,score,head,headGrid};
			if(!hero.isCanSend(3556, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3556);
		}
		/**
		 * 请求进入结果返回
		 * @param rtnCode 结果：0：失败，1：成功
		 * @param type 失败类型：（1：已满人，2：冷却中，3：活动未开启）
		 * @param cdTime 剩余冷却时间
		**/
		public static void sendCmd_3558(long hid  ,  int  rtnCode  ,  int  type  ,  int  cdTime ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,type,cdTime};
			if(!hero.isCanSend(3558, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3558);
		}
		/**
		 * 返回都城信息
		 * @param pid 玩家id
		 * @param name 玩家名
		 * @param strength 战力
		 * @param icon 头像
		 * @param frame 头像框
		 * @param hp 当前血量百分比
		 * @param num 征收人数
		**/
		public static void sendCmd_3560(long hid  ,   long  pid  ,   String  name  ,   long  strength  ,   int  icon  ,   int  frame  ,   int  hp  ,   int  num ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{pid,name,strength,icon,frame,hp,num};
			if(!hero.isCanSend(3560, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3560);
		}
		/**
		 * 移动结果
		 * @param rtnCode 移动结果：0：失败，1：成功
		 * @param type 失败：1:战斗中不可移动
		**/
		public static void sendCmd_3562(long hid  ,  int  rtnCode  ,  int  type ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,type};
			if(!hero.isCanSend(3562, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3562);
		}
		/**
		 * 同步玩家移动
		 * @param id 玩家id
		 * @param type 移动类型：1:普通移动，2：闪现
		 * @param posX 目的地坐标X
		 * @param posY 目的地坐标Y
		**/
		public static void sendCmd_3564(long hid  ,   long  id  ,  int  type  ,   int  posX  ,   int  posY ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{id,type,posX,posY};
			if(!hero.isCanSend(3564, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3564);
		}
		/**
		 * 请求占领返回
		 * @param rtnCode 结果：0：失败，1：成功
		 * @param result 成功：战斗结果0失败，1胜利；失败：（1：自己在战斗中，2：卫城不能打，3：同阵营不能打，4：对方在战斗中）
		 * @param cId 挑战者Id
		 * @param cHp 挑战者当前血量
		 * @param cLeftHp 挑战者剩余血量
		 * @param cDamage 挑战者秒伤
		 * @param gId 守卫者Id
		 * @param gHp 守卫者当前血量
		 * @param gLeftHp 守卫者剩余血量
		 * @param gDamage 守卫者秒伤
		 * @param battleUid 战斗唯一id
		**/
		public static void sendCmd_3566(long hid  ,  int  rtnCode  ,  int  result  ,   long  cId  ,   long  cHp  ,   long  cLeftHp  ,   long  cDamage  ,   long  gId  ,   long  gHp  ,   long  gLeftHp  ,   long  gDamage  ,   int  battleUid ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,result,cId,cHp,cLeftHp,cDamage,gId,gHp,gLeftHp,gDamage,battleUid};
			if(!hero.isCanSend(3566, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3566);
		}
		/**
		 * 战斗结束刷新都城信息
		 * @param cityId 都城id
		 * @param belongType 归属
		 * @param pid 守城玩家id
		 * @param name 玩家名
		 * @param icon 头像
		 * @param frame 头像框
		 * @param num 征收玩家数量
		 * @param hp 剩余血量百分比
		**/
		public static void sendCmd_3568(long hid  ,   int  cityId  ,  int  belongType  ,   long  pid  ,   String  name  ,   int  icon  ,   int  frame  ,  int  num  ,   int  hp ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{cityId,belongType,pid,name,icon,frame,num,hp};
			if(!hero.isCanSend(3568, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3568);
		}
		/**
		 * 领取积分奖励结果
		 * @param rtnCode 结果：0：失败，1：成功
		 * @param id 成功：积分奖励id，失败：（1：已领取，2：不存在，3：积分不足）
		**/
		public static void sendCmd_3570(long hid  ,  int  rtnCode  ,  int  id ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,id};
			if(!hero.isCanSend(3570, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3570);
		}
		/**
		 * 刷新所有都城信息
		 * @param citysData 都城信息
		**/
		public static void sendCmd_3578(long hid  ,   Object[]  citysData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{citysData};
			if(!hero.isCanSend(3578, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3578);
		}
		/**
		 * 发送显示的玩家数据
		 * @param playersData 显示的玩家数据
		**/
		public static void sendCmd_3580(long hid  ,   Object[]  playersData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{playersData};
			if(!hero.isCanSend(3580, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3580);
		}
		/**
		 * 进入活动场景返回信息
		 * @param roomId 房间id
		 * @param zoneidA A区号
		 * @param belongTypeA A归属
		 * @param aScore A积分
		 * @param zoneidB B区号
		 * @param belongTypeB B归属
		 * @param bScore B积分
		 * @param zoneidC C区号
		 * @param belongTypeC C归属
		 * @param cScore C积分
		 * @param score 当前积分
		 * @param belongType 自己的归属
		 * @param leftTime 剩余时间
		**/
		public static void sendCmd_3582(long hid  ,   int  roomId  ,   int  zoneidA  ,  int  belongTypeA  ,   long  aScore  ,   int  zoneidB  ,  int  belongTypeB  ,   long  bScore  ,   int  zoneidC  ,  int  belongTypeC  ,   long  cScore  ,   long  score  ,  int  belongType  ,   int  leftTime ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{roomId,zoneidA,belongTypeA,aScore,zoneidB,belongTypeB,bScore,zoneidC,belongTypeC,cScore,score,belongType,leftTime};
			if(!hero.isCanSend(3582, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3582);
		}
		/**
		 * 返回已领取奖励id
		 * @param stateDatat 已领取奖励id
		**/
		public static void sendCmd_3572(long hid  ,   Object[]  stateDatat ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{stateDatat};
			if(!hero.isCanSend(3572, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3572);
		}
		/**
		 * 请求征收返回
		 * @param rtnCode 请求征收结果：0：失败，1：成功
		 * @param type 失败：1：敌方卫城不可征收，2：未占领此城，3：人数已满，4：城被抢
		**/
		public static void sendCmd_3574(long hid  ,  int  rtnCode  ,  int  type ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,type};
			if(!hero.isCanSend(3574, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3574);
		}
		/**
		 * 退出结果返回
		 * @param rtnCode 结果：0：失败，1：成功
		**/
		public static void sendCmd_3576(long hid  ,  int  rtnCode ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode};
			if(!hero.isCanSend(3576, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3576);
		}
		/**
		 * 更新积分
		 * @param type 更新类型1：个人，2：区
		 * @param blueScore 个人积分；区：蓝方积分
		 * @param redScore 区：红方积分
		 * @param greenScore 区：绿方积分
		**/
		public static void sendCmd_3584(long hid  ,  int  type  ,   long  blueScore  ,   long  redScore  ,   long  greenScore ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{type,blueScore,redScore,greenScore};
			if(!hero.isCanSend(3584, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3584);
		}
		/**
		 * 更新战斗状态
		 * @param cityId 都城id
		 * @param state 状态：（0：正常，1：战斗中）
		**/
		public static void sendCmd_3586(long hid  ,   int  cityId  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{cityId,state};
			if(!hero.isCanSend(3586, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3586);
		}
		/**
		 * 更新玩家状态
		 * @param pid 玩家id
		 * @param state 1：征收,2:离开
		**/
		public static void sendCmd_3588(long hid  ,   long  pid  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{pid,state};
			if(!hero.isCanSend(3588, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3588);
		}
		/**
		 * 征收玩家数据
		 * @param membersData 玩家数据
		**/
		public static void sendCmd_3590(long hid  ,   Object[]  membersData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{membersData};
			if(!hero.isCanSend(3590, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3590);
		}
		/**
		 * 元宝复活结果
		 * @param rtnCode 结果：0：失败，1：成功
		 * @param result 失败类型：1：已复活，2：元宝不足
		**/
		public static void sendCmd_3592(long hid  ,  int  rtnCode  ,  int  result ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,result};
			if(!hero.isCanSend(3592, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3592);
		}
		/**
		 * 更新MVP
		 * @param mvp mvp玩家
		 * @param icon 头像
		 * @param frame 头像框
		 * @param scoreData 区服积分数据
		**/
		public static void sendCmd_3594(long hid  ,   String  mvp  ,   int  icon  ,   int  frame  ,   Object[]  scoreData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{mvp,icon,frame,scoreData};
			if(!hero.isCanSend(3594, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3594);
		}
		/**
		 * 结算成功
		**/
		public static void sendCmd_3596(long hid ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = null;
			if(!hero.isCanSend(3596, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3596);
		}
		/**
		 * 使用（新战斗模式），战斗结果返回
		 * @param result 战斗结果：0：胜利，1：失败
		 * @param type 1:进攻，2：防守
		 * @param cityId 城池id
		**/
		public static void sendCmd_3598(long hid  ,  int  result  ,  int  type  ,   int  cityId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{result,type,cityId};
			if(!hero.isCanSend(3598, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3598);
		}
}