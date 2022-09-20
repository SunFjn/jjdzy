package com.teamtop.system.crossKing.local;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * CrossKingSender.java
 * 乱世枭雄(跨服王者)
 */
public class CrossKingSender{
		/**
		 * GC 跨服王者状态
		 * @param state 0未开启1开启2结束
		**/
		public static void sendCmd_1860(long hid  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state};
			if(!hero.isCanSend(1860, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1860);
		}
		/**
		 * GC 打开ui信息
		 * @param rest 0成功 1失败
		 * @param info rankers
		**/
		public static void sendCmd_1862(long hid  ,  int  rest  ,   Object[]  info ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,info};
			if(!hero.isCanSend(1862, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1862);
		}
		/**
		 * GC 购买次数返回
		 * @param rest 0成功1货币不足2无购买次数
		 * @param leaveTime 剩余挑战次数
		 * @param buyTimes 已购买次数
		**/
		public static void sendCmd_1864(long hid  ,  int  rest  ,  int  leaveTime  ,  int  buyTimes ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,leaveTime,buyTimes};
			if(!hero.isCanSend(1864, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1864);
		}
		/**
		 * GC 通知前段
		 * @param notice 0可以申请面板1赛季未开启2赛季已结束3未到可晋级排名4不在段位5对手不存在6对手已经改变7对方正在战斗8你正被人挑战9不能挑战自己10没挑战次数11晋级对手改变
		**/
		public static void sendCmd_1866(long hid  ,  int  notice ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{notice};
			if(!hero.isCanSend(1866, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1866);
		}
		/**
		 * GC 挑战返回
		 * @param rtn 0开始挑战
		 * @param bttlertn 战斗后端结果0:失败1成功2以前端结果为准
		 * @param eid 对手id
		 * @param monsterSpirit 出战兽灵
		 * @param attr 
		 * @param skillinfo 
		**/
		public static void sendCmd_1868(long hid  ,  int  rtn  ,  int  bttlertn  ,   long  eid  ,   int  monsterSpirit  ,   Object[]  attr  ,   Object[]  skillinfo ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtn,bttlertn,eid,monsterSpirit,attr,skillinfo};
			if(!hero.isCanSend(1868, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1868);
		}
		/**
		 * GC 个人信息
		 * @param bronType 我的转生区间
		 * @param dw 我的段位
		 * @param maxdw 本届最高段位
		 * @param rankid 我的排名
		 * @param leaveTime 剩余挑战次数
		 * @param buyTime 已经购买次数
		 * @param score 积分
		 * @param strength 战力
		 * @param rewards 积分奖励情况
		**/
		public static void sendCmd_1870(long hid  ,  int  bronType  ,  int  dw  ,  int  maxdw  ,   int  rankid  ,  int  leaveTime  ,  int  buyTime  ,   int  score  ,   long  strength  ,   Object[]  rewards ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{bronType,dw,maxdw,rankid,leaveTime,buyTime,score,strength,rewards};
			if(!hero.isCanSend(1870, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1870);
		}
		/**
		 * GC 获取晋级对手信息返回
		 * @param rest 0获取成功1失败
		 * @param rankers 晋级对手信息
		**/
		public static void sendCmd_1872(long hid  ,  int  rest  ,   Object[]  rankers ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,rankers};
			if(!hero.isCanSend(1872, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1872);
		}
		/**
		 * GC 换一批返回
		 * @param rest 0成功1失败
		**/
		public static void sendCmd_1874(long hid  ,  int  rest ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest};
			if(!hero.isCanSend(1874, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1874);
		}
		/**
		 * GC 排行榜
		 * @param dw 段位
		 * @param ranks 玩家信息
		**/
		public static void sendCmd_1876(long hid  ,  int  dw  ,   Object[]  ranks ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{dw,ranks};
			if(!hero.isCanSend(1876, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1876);
		}
		/**
		 * GC 历史记录
		 * @param his 
		**/
		public static void sendCmd_1878(long hid  ,   Object[]  his ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{his};
			if(!hero.isCanSend(1878, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1878);
		}
		/**
		 * GC 奖励领取情况
		 * @param rewards 
		**/
		public static void sendCmd_1880(long hid  ,   Object[]  rewards ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rewards};
			if(!hero.isCanSend(1880, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1880);
		}
		/**
		 * GC 宝箱状态变化
		 * @param index 宝箱序号
		 * @param state 宝箱状态
		**/
		public static void sendCmd_1882(long hid  ,  int  index  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{index,state};
			if(!hero.isCanSend(1882, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1882);
		}
		/**
		 * GC 打开乱世商城
		 * @param num 挑战次数
		 * @param iteminfo 
		**/
		public static void sendCmd_1884(long hid  ,   int  num  ,   Object[]  iteminfo ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{num,iteminfo};
			if(!hero.isCanSend(1884, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1884);
		}
		/**
		 * GC 购买返回
		 * @param item 商品id
		 * @param rest 购买成功与否0成功 1失败
		**/
		public static void sendCmd_1886(long hid  ,  int  item  ,  int  rest ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{item,rest};
			if(!hero.isCanSend(1886, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1886);
		}
		/**
		 * GC 挑战乱世枭雄总次数变化
		 * @param sumNum 总次数
		**/
		public static void sendCmd_1888(long hid  ,   int  sumNum ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{sumNum};
			if(!hero.isCanSend(1888, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1888);
		}
		/**
		 * GC打开战报
		 * @param name 谁击败了你
		**/
		public static void sendCmd_1890(long hid  ,   String  name ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{name};
			if(!hero.isCanSend(1890, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1890);
		}
		/**
		 * GC 有战报
		**/
		public static void sendCmd_1892(long hid ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = null;
			if(!hero.isCanSend(1892, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1892);
		}
		/**
		 * 扫荡
		 * @param state 0未达乱世枭雄段位 1不能扫荡自己 2没有挑战次数 3只能扫荡排行低于自己的 4成功
		 * @param leftCha 成功发送剩余次数 失败则为0
		 * @param jifen 成功发送胜利积分 失败则为0
		**/
		public static void sendCmd_1894(long hid  ,  int  state  ,   int  leftCha  ,   int  jifen ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,leftCha,jifen};
			if(!hero.isCanSend(1894, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 1894);
		}
}