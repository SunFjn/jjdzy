package com.teamtop.system.crossSJMiJing;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * CrossSJMiJingSender.java
 * 升阶秘境
 */
public class CrossSJMiJingSender{
		/**
		 * 打开UI
		 * @param dataList 所有秘籍数据
		 * @param mjIDList 所有被购买了宝箱的秘境ID
		**/
		public static void sendCmd_3762(long hid  ,   Object[]  dataList  ,   Object[]  mjIDList ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{dataList,mjIDList};
			if(!hero.isCanSend(3762, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3762);
		}
		/**
		 * 查看秘境队伍信息
		 * @param result 结果  1成功  2请连跨服  3副本不存在  4等级不足
		 * @param id 秘境ID
		 * @param teamDataList 队伍信息
		**/
		public static void sendCmd_3764(long hid  ,  int  result  ,  int  id  ,   Object[]  teamDataList ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{result,id,teamDataList};
			if(!hero.isCanSend(3764, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3764);
		}
		/**
		 * 创建队伍
		 * @param result 结果  1成功  2刷新数据  3副本不存在  4等级不足  5请连跨服   6操作太频繁  7需要通关前面的副本才能打这个副本  8阶数不足  9该副本已通关，不能创建队伍
		 * @param teamID 队伍ID
		 * @param id 秘境ID
		 * @param teamDataList 队伍数据
		**/
		public static void sendCmd_3766(long hid  ,  int  result  ,   int  teamID  ,  int  id  ,   Object[]  teamDataList ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{result,teamID,id,teamDataList};
			if(!hero.isCanSend(3766, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3766);
		}
		/**
		 * 踢人
		 * @param result 结果 1成功（会刷新队伍数据）  2你没在队伍中  3队伍缓存异常  4你不是队长  5该队员不存在  6请访问中央服  7你被踢出队伍
		**/
		public static void sendCmd_3768(long hid  ,  int  result ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{result};
			if(!hero.isCanSend(3768, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3768);
		}
		/**
		 * 离开队伍
		 * @param result 结果  1成功  2请访问中央服  3队伍已解散
		**/
		public static void sendCmd_3772(long hid  ,  int  result ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{result};
			if(!hero.isCanSend(3772, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3772);
		}
		/**
		 * 加入指定队伍
		 * @param result 结果  1成功  2你已经有队伍，不能重复加入 3队伍不存在 4队伍已满 5你等级不足，不能加入 6队伍已在战斗中，无法加入  7请访问中央服  8需要通关前面的副本才能打这个副本  9阶数不足
		**/
		public static void sendCmd_3774(long hid  ,  int  result ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{result};
			if(!hero.isCanSend(3774, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3774);
		}
		/**
		 * 开始战斗
		 * @param result 结果  1成功  2没有队伍 3两个缓存不同步，没有队伍缓存 4队长才能开始战斗  5请访问中央服  6队伍还在战斗中
		**/
		public static void sendCmd_3776(long hid  ,  int  result ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{result};
			if(!hero.isCanSend(3776, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3776);
		}
		/**
		 * 场景刷新数据
		 * @param hpMax boss气血上限
		 * @param hp boss当前气血
		 * @param hurt 我的伤害
		 * @param rankData 伤害排行数据
		**/
		public static void sendCmd_3780(long hid  ,   long  hpMax  ,   long  hp  ,   long  hurt  ,   Object[]  rankData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{hpMax,hp,hurt,rankData};
			if(!hero.isCanSend(3780, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3780);
		}
		/**
		 * 死亡通知广播给其他人
		 * @param hidDea 角色ID
		**/
		public static void sendCmd_3782(long hid  ,   long  hidDea ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{hidDea};
			if(!hero.isCanSend(3782, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3782);
		}
		/**
		 * 刷新队员气血
		 * @param hpList 队伍气血数据
		**/
		public static void sendCmd_3784(long hid  ,   Object[]  hpList ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{hpList};
			if(!hero.isCanSend(3784, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3784);
		}
		/**
		 * 扫荡
		 * @param result 结果  1完成  2没扫荡次数  3奖励已领取  4未通关，不能扫荡  5无可扫荡副本
		 * @param dataList 所有数据
		**/
		public static void sendCmd_3788(long hid  ,  int  result  ,   Object[]  dataList ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{result,dataList};
			if(!hero.isCanSend(3788, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3788);
		}
		/**
		 * 广播邀请协助
		 * @param result 结果  1成功  2你没在队伍中  3队伍缓存异常  4你不是队长  5队员已满  6操作太频繁
		**/
		public static void sendCmd_3770(long hid  ,  int  result ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{result};
			if(!hero.isCanSend(3770, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3770);
		}
		/**
		 * 购买宝箱
		 * @param result 结果  1成功  2请访问子服  3副本不存在  4宝箱已购买  5关卡未通关  6道具不足
		**/
		public static void sendCmd_3790(long hid  ,  int  result ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{result};
			if(!hero.isCanSend(3790, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3790);
		}
		/**
		 * 登录中央服
		 * @param result 结果  2副本不存在  3等级不足  4需要通关前面的副本才能打这个副本  5操作太频繁   6阶级不够
		**/
		public static void sendCmd_3778(long hid  ,  int  result ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{result};
			if(!hero.isCanSend(3778, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3778);
		}
		/**
		 * 刷新协助次数
		 * @param num 已协助次数
		 * @param totalNum 总次数
		**/
		public static void sendCmd_3792(long hid  ,  int  num  ,  int  totalNum ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{num,totalNum};
			if(!hero.isCanSend(3792, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 3792);
		}
}