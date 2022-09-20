package com.teamtop.system.taoyuanSworn;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * TaoyuanSwornSender.java
 * 桃园结义
 */
public class TaoyuanSwornSender{
		/**
		 * GC 打开结义列表
		 * @param infos 
		 * @param page 当前页数
		 * @param sumPage 总页数
		**/
		public static void sendCmd_3102(long hid  ,   Object[]  infos  ,   int  page  ,   int  sumPage ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{infos,page,sumPage};
			if(!hero.isCanSend(3102, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3102);
		}
		/**
		 * GC 我的义盟信息
		 * @param memberInfo 成员信息
		 * @param taskInfo 任务信息
		 * @param name 义盟名字
		**/
		public static void sendCmd_3104(long hid  ,   Object[]  memberInfo  ,   Object[]  taskInfo  ,   String  name ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{memberInfo,taskInfo,name};
			if(!hero.isCanSend(3104, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3104);
		}
		/**
		 * GC 通知
		 * @param type 1批准加入义盟 2被踢 3.通知大哥有人申请加入 4.通知大哥有人取消申请 5义盟申请被拒绝
		 * @param thid 玩家id
		 * @param hName 玩家名称
		 * @param name 义盟名称
		 * @param id 义盟id
		**/
		public static void sendCmd_3130(long hid  ,  int  type  ,   long  thid  ,   String  hName  ,   String  name  ,   long  id ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{type,thid,hName,name,id};
			if(!hero.isCanSend(3130, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3130);
		}
		/**
		 * GC 申请义盟列表
		 * @param applyList 
		**/
		public static void sendCmd_3108(long hid  ,   Object[]  applyList ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{applyList};
			if(!hero.isCanSend(3108, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3108);
		}
		/**
		 * 批准申请返回
		 * @param state 1成功 2拒绝 3申请已过期 4对方已加入义盟 5本已盟人数已满 6没有权限 7.全部拒绝 8对方已取消申请
		 * @param thid 玩家id
		**/
		public static void sendCmd_3110(long hid  ,  int  state  ,   long  thid ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,thid};
			if(!hero.isCanSend(3110, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3110);
		}
		/**
		 * GC 取消申请返回
		 * @param state 1成功 2不存在
		 * @param id 义盟id
		**/
		public static void sendCmd_3112(long hid  ,  int  state  ,   long  id ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,id};
			if(!hero.isCanSend(3112, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3112);
		}
		/**
		 * GC 退出义盟返回
		 * @param state 1成功 2失败
		**/
		public static void sendCmd_3114(long hid  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state};
			if(!hero.isCanSend(3114, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3114);
		}
		/**
		 * GC 踢人返回
		 * @param state 1成功 2没有权限
		 * @param thid 兄弟id
		**/
		public static void sendCmd_3116(long hid  ,  int  state  ,   long  thid ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,thid};
			if(!hero.isCanSend(3116, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3116);
		}
		/**
		 * 申请加入返回
		 * @param state 状态：1.成功 2.您已有结义兄弟 3.该义盟可接收申请人数已满 4该义盟可接收申请人数已满 5.已达到申请上限 6.该义盟已解散
		 * @param id 义盟id
		**/
		public static void sendCmd_3106(long hid  ,  int  state  ,   long  id ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,id};
			if(!hero.isCanSend(3106, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3106);
		}
		/**
		 * 领取奖励返回
		 * @param state 状态：1.成功 2.背包已满 3.参数错误 4.领取条件不足 5已领取
		 * @param taskId 任务id
		 * @param type 领取类型(1-3)
		**/
		public static void sendCmd_3118(long hid  ,  int  state  ,   int  taskId  ,  int  type ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,taskId,type};
			if(!hero.isCanSend(3118, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3118);
		}
		/**
		 * 转让大哥返回
		 * @param state 1.成功 2.没有权限 3.该玩家已离开义盟
		**/
		public static void sendCmd_3120(long hid  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state};
			if(!hero.isCanSend(3120, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3120);
		}
		/**
		 * 申请大哥返回
		 * @param state 1.成功 2.大哥离线3天以上才可申请
		**/
		public static void sendCmd_3122(long hid  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state};
			if(!hero.isCanSend(3122, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3122);
		}
		/**
		 * 招募兄弟返回
		 * @param state 1.成功 2.人数已满
		**/
		public static void sendCmd_3124(long hid  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state};
			if(!hero.isCanSend(3124, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3124);
		}
		/**
		 * 修改义盟名字返回
		 * @param state  B:1.成功 2.非法字符 3.名字没有改变 4.名字已经存在 5.改名卡不足 6没有权限 7.名字过长
		**/
		public static void sendCmd_3126(long hid  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state};
			if(!hero.isCanSend(3126, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3126);
		}
		/**
		 * 打开桃园BOSS界面返回
		 * @param bossId BOSS id 0.未开启
		 * @param name 开启玩家名称
		 * @param awardState 领取状态：0.条件不符 1.可领取 2.已领取
		 * @param num 完成义盟任务数量
		 * @param time 剩余时间（秒）
		**/
		public static void sendCmd_3132(long hid  ,   int  bossId  ,   String  name  ,  int  awardState  ,   int  num  ,   int  time ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{bossId,name,awardState,num,time};
			if(!hero.isCanSend(3132, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3132);
		}
		/**
		 * 开启桃园BOSS返回
		 * @param state 1.成功 2.BOSS已被开启 3.开启条件不足 4.元宝不足 5.参数错误
		 * @param bossId BOSS id  
		 * @param name 开启玩家名称
		**/
		public static void sendCmd_3134(long hid  ,  int  state  ,   int  bossId  ,   String  name ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,bossId,name};
			if(!hero.isCanSend(3134, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3134);
		}
		/**
		 * 领取桃园BOSS奖励
		 * @param state 1.成功 2.背包已满 3.领取条件不足 4.已领取
		**/
		public static void sendCmd_3136(long hid  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state};
			if(!hero.isCanSend(3136, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3136);
		}
		/**
		 * 挑战BOSS返回
		 * @param state 1.成功 2.boss已经死亡3你已经在副本内 4.桃园BOSS未开启
		 * @param bossId BOSS id
		**/
		public static void sendCmd_3138(long hid  ,  int  state  ,   int  bossId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,bossId};
			if(!hero.isCanSend(3138, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3138);
		}
		/**
		 * 创建义盟返回
		 * @param state 1.成功 2.非法字符 3.名字过长 4.名字已经存在 5.元宝不足 6.已有义盟
		 * @param id 义盟id
		**/
		public static void sendCmd_3128(long hid  ,  int  state  ,   long  id ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,id};
			if(!hero.isCanSend(3128, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3128);
		}
		/**
		 * GC 场景中伤害数据同步
		 * @param myHp 我的气血
		 * @param bossHpMax boss最大气血
		 * @param bossCurHp boss当前血量
		 * @param myHurt 我的伤害值
		 * @param hurtList 
		**/
		public static void sendCmd_3140(long hid  ,   long  myHp  ,   long  bossHpMax  ,   long  bossCurHp  ,   long  myHurt  ,   Object[]  hurtList ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{myHp,bossHpMax,bossCurHp,myHurt,hurtList};
			if(!hero.isCanSend(3140, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3140);
		}
		/**
		 * 退出桃园BOSS返回
		 * @param state 1成功 2元宝不足
		 * @param type 类型：0.退出 1复活 2通知后端本人死亡
		**/
		public static void sendCmd_3142(long hid  ,  int  state  ,  int  type ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,type};
			if(!hero.isCanSend(3142, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3142);
		}
		/**
		 * GC 被击杀的玩家id
		 * @param hids 
		**/
		public static void sendCmd_3144(long hid  ,   Object[]  hids ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{hids};
			if(!hero.isCanSend(3144, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3144);
		}
		/**
		 * GC 广播副本内玩家boss死亡
		**/
		public static void sendCmd_3146(long hid ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = null;
			if(!hero.isCanSend(3146, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3146);
		}
		/**
		 * GC 通知玩家复活
		 * @param hids 
		**/
		public static void sendCmd_3148(long hid  ,   Object[]  hids ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{hids};
			if(!hero.isCanSend(3148, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3148);
		}
}