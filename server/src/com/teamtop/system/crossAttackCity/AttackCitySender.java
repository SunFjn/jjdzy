package com.teamtop.system.crossAttackCity;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * AttackCitySender.java
 * 攻城拔寨
 */
public class AttackCitySender{
		/**
		 * 打开界面返回
		 * @param cityId 当前所在城池id
		 * @param id 驻守的城池id
		 * @param reTime 剩余可领取奖励时间
		 * @param award 累积奖励
		 * @param canState 当前城池是否通关 0没有 1通关
		 * @param cityInfos 城池信息
		 * @param nd 难度(可选择<=该值)
		 * @param choose 今天是否已选择难度 0没有 1已选
		 * @param times 剩余重置次数
		 * @param buyTimes 已购买次数
		**/
		public static void sendCmd_12052(long hid  ,   int  cityId  ,   int  id  ,   int  reTime  ,   int  award  ,  int  canState  ,   Object[]  cityInfos  ,   int  nd  ,  int  choose  ,   int  times  ,   int  buyTimes ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{cityId,id,reTime,award,canState,cityInfos,nd,choose,times,buyTimes};
			if(!hero.isCanSend(12052, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 12052);
		}
		/**
		 * 驻守返回
		 * @param state 状态 0成功 1没到驻守时间 2先通关本关卡 3其他玩家正在城池驻守 4城池不存在 5今日驻守时间已达上限 6物资已达到最大值 请领取
		**/
		public static void sendCmd_12054(long hid  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state};
			if(!hero.isCanSend(12054, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 12054);
		}
		/**
		 * 领取奖励返回
		 * @param state 状态 0成功 1数据不存在 2驻守时间不足领取奖励 3未驻守
		**/
		public static void sendCmd_12056(long hid  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state};
			if(!hero.isCanSend(12056, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 12056);
		}
		/**
		 * 挑战城池(玩家)返回
		 * @param state 状态 0成功 1数据不存在 2先通关本关卡 3城池没有人驻守
		 * @param playerId 挑战的玩家id
		 * @param cityId 城池id
		**/
		public static void sendCmd_12058(long hid  ,  int  state  ,   long  playerId  ,   int  cityId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,playerId,cityId};
			if(!hero.isCanSend(12058, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 12058);
		}
		/**
		 * 挑战玩家结果返回
		 * @param state 战斗结果 0失败 1成功 2退出 3该城池已被其他玩家抢先入驻
		 * @param cityId 城池id
		**/
		public static void sendCmd_12060(long hid  ,  int  state  ,   int  cityId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,cityId};
			if(!hero.isCanSend(12060, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 12060);
		}
		/**
		 * 挑战NPC返回
		 * @param state 状态 0可以挑战 1不可以挑战
		 * @param cityId 城池id
		 * @param result 战力验证状态 0失败 1成功 2由前端结果决定
		**/
		public static void sendCmd_12062(long hid  ,  int  state  ,   int  cityId  ,  int  result ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,cityId,result};
			if(!hero.isCanSend(12062, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 12062);
		}
		/**
		 * 打开商店返回
		 * @param shopInfo 商店信息
		 * @param material 本人物资个数
		**/
		public static void sendCmd_12066(long hid  ,   Object[]  shopInfo  ,   int  material ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{shopInfo,material};
			if(!hero.isCanSend(12066, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 12066);
		}
		/**
		 * 购买商品返回
		 * @param state 状态 0成功 1商品配置不存在 2超过限购 3货币不足
		 * @param id 商品id
		 * @param material 物资个数
		**/
		public static void sendCmd_12068(long hid  ,  int  state  ,   int  id  ,   int  material ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,id,material};
			if(!hero.isCanSend(12068, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 12068);
		}
		/**
		 * 打开战报返回
		 * @param reportInfo 战报信息
		**/
		public static void sendCmd_12070(long hid  ,   Object[]  reportInfo ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{reportInfo};
			if(!hero.isCanSend(12070, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 12070);
		}
		/**
		 * 重置挑战关卡返回
		 * @param state 状态 0成功 1攻城令不足
		 * @param cityId 城池id
		**/
		public static void sendCmd_12072(long hid  ,  int  state  ,   int  cityId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,cityId};
			if(!hero.isCanSend(12072, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 12072);
		}
		/**
		 * 购买次数返回
		 * @param state 状态 0成功 1已达到最大购买次数 2元宝不足
		 * @param num 已购买次数
		 * @param times 可重置次数
		**/
		public static void sendCmd_12074(long hid  ,  int  state  ,   int  num  ,   int  times ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,num,times};
			if(!hero.isCanSend(12074, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 12074);
		}
		/**
		 * 移动到下一关返回
		 * @param state 状态 0成功 1没有通关之前的关卡 2第二天才可以移动
		 * @param cityId 城池id
		**/
		public static void sendCmd_12076(long hid  ,  int  state  ,   int  cityId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,cityId};
			if(!hero.isCanSend(12076, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 12076);
		}
		/**
		 * 选择难度返回
		 * @param state 状态 0成功 1未开启该难度
		 * @param nd 难度
		 * @param cityId 城池id
		**/
		public static void sendCmd_12078(long hid  ,  int  state  ,   int  nd  ,   int  cityId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,nd,cityId};
			if(!hero.isCanSend(12078, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 12078);
		}
		/**
		 * 推送状态
		 * @param index 状态 1物资已满 2被打提示
		 * @param state 提示 0没有 1有提示
		**/
		public static void sendCmd_12080(long hid  ,  int  index  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{index,state};
			if(!hero.isCanSend(12080, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 12080);
		}
		/**
		 * 查看宝箱奖励返回
		 * @param award 宝箱累计奖励
		**/
		public static void sendCmd_12082(long hid  ,   int  award ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{award};
			if(!hero.isCanSend(12082, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 12082);
		}
}