package com.teamtop.system.shaozhuEscort;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * ShaoZhuEscortSender.java
 * 少主护送
 */
public class ShaoZhuEscortSender{
		/**
		 * 打开界面返回
		 * @param shaozhuEscortList 少主护送列表
		 * @param myEscortTimes 护送次数
		 * @param myInterceptTimes 拦截次数
		 * @param myWuJiangId 护送少主武将
		 * @param myRestTime 剩余时间
		 * @param mystate 护送状态：0：没护送，1：护送中，2：护送完毕
		**/
		public static void sendCmd_8002(long hid  ,   Object[]  shaozhuEscortList  ,   int  myEscortTimes  ,   int  myInterceptTimes  ,   int  myWuJiangId  ,   int  myRestTime  ,  int  mystate ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{shaozhuEscortList,myEscortTimes,myInterceptTimes,myWuJiangId,myRestTime,mystate};
			if(!hero.isCanSend(8002, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8002);
		}
		/**
		 * 开始护送返回
		 * @param state 状态：0失败，1成功，2护送次数满了
		**/
		public static void sendCmd_8004(long hid  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state};
			if(!hero.isCanSend(8004, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8004);
		}
		/**
		 * 刷新返回
		 * @param state 状态：0：元宝不够，1：成功，2：护送次数满了，3：已刷到最高层
		 * @param id 少主护送配置表id
		**/
		public static void sendCmd_8006(long hid  ,  int  state  ,   int  id ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,id};
			if(!hero.isCanSend(8006, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8006);
		}
		/**
		 * 护送完毕，奖励结算返回
		 * @param name 玩家名字
		 * @param totalStrength 战力
		 * @param icon 头像id，没有则为0
		 * @param frame 头像框
		 * @param countryType 国家
		 * @param id 护送武将
		 * @param awardList 奖励列表
		**/
		public static void sendCmd_8008(long hid  ,   String  name  ,   long  totalStrength  ,   int  icon  ,   int  frame  ,   int  countryType  ,   int  id  ,   Object[]  awardList ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{name,totalStrength,icon,frame,countryType,id,awardList};
			if(!hero.isCanSend(8008, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8008);
		}
		/**
		 * 领取奖励返回
		 * @param state 状态：0：失败，1：成功
		**/
		public static void sendCmd_8010(long hid  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state};
			if(!hero.isCanSend(8010, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8010);
		}
		/**
		 * 拦截返回
		 * @param battleResult 战斗结果：0：失败，1：成功，2拦截次数满了，3被拦截的玩家不存在，数据过期了，4已经达到单次护送中可被拦截次数上限，5不能再次拦截同一个玩家同一次护送的东西
		 * @param interceptAwardList 拦截奖励列表
		 * @param winerID 胜利玩家ID
		 * @param icon 头像ID
		 * @param jiangXianID 将衔ID
		 * @param winerPower 胜利者战力
		 * @param winerName 胜利者名字
		 * @param leftPlayerID 左边玩家ID
		 * @param rightPlayerID 右边玩家ID
		**/
		public static void sendCmd_8012(long hid  ,  int  battleResult  ,   Object[]  interceptAwardList  ,   long  winerID  ,   int  icon  ,   int  jiangXianID  ,   long  winerPower  ,   String  winerName  ,   long  leftPlayerID  ,   long  rightPlayerID ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{battleResult,interceptAwardList,winerID,icon,jiangXianID,winerPower,winerName,leftPlayerID,rightPlayerID};
			if(!hero.isCanSend(8012, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8012);
		}
		/**
		 * 查看录像返回
		 * @param awardList 损失列表
		 * @param winerID 胜利玩家ID
		 * @param icon 头像ID
		 * @param jiangXianID 将衔ID
		 * @param winerPower 胜利者战力
		 * @param winerName 胜利者名字
		 * @param leftPlayerID 左边玩家ID
		 * @param rightPlayerID 右边玩家ID
		**/
		public static void sendCmd_8014(long hid  ,   Object[]  awardList  ,   long  winerID  ,   int  icon  ,   int  jiangXianID  ,   long  winerPower  ,   String  winerName  ,   long  leftPlayerID  ,   long  rightPlayerID ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{awardList,winerID,icon,jiangXianID,winerPower,winerName,leftPlayerID,rightPlayerID};
			if(!hero.isCanSend(8014, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8014);
		}
		/**
		 * 打开战报界面返回
		 * @param recordList 战报列表
		**/
		public static void sendCmd_8016(long hid  ,   Object[]  recordList ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{recordList};
			if(!hero.isCanSend(8016, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8016);
		}
}