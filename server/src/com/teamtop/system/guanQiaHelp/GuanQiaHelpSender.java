package com.teamtop.system.guanQiaHelp;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * GuanQiaHelpSender.java
 * 关卡求助
 */
public class GuanQiaHelpSender{
		/**
		 * 广播邀请协助返回
		 * @param state 结果 1成功,2已无求助次数,3求助CD中,4击杀小怪波数不足,5请先前往下一关,6正在战斗中
		**/
		public static void sendCmd_5902(long hid  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state};
			if(!hero.isCanSend(5902, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 5902);
		}
		/**
		 * 广播其他玩家信息
		 * @param guanQiaNum 关卡数
		 * @param name 需要协助玩家名字
		 * @param seekHelpHeroId 玩家id
		**/
		public static void sendCmd_5904(long hid  ,   int  guanQiaNum  ,   String  name  ,   long  seekHelpHeroId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{guanQiaNum,name,seekHelpHeroId};
			if(!hero.isCanSend(5904, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 5904);
		}
		/**
		 * 开始战斗前返回
		 * @param seekHelpId 返回队伍id,-1求助者已通关该关卡,-2该求助已超时,-3求助者在副本中,-4需通关该关卡,-5帮助次数不足,-6求助者不在线
		**/
		public static void sendCmd_5906(long hid  ,   long  seekHelpId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{seekHelpId};
			if(!hero.isCanSend(5906, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 5906);
		}
		/**
		 * 返回是否开启战斗
		 * @param state 状态1成功
		 * @param hasSuprise 是否有金甲兵0无1有
		 * @param teamerid 参与的玩家ID，没有发0
		 * @param guanqiaID 开启的关卡ID
		**/
		public static void sendCmd_5908(long hid  ,  int  state  ,  int  hasSuprise  ,   long  teamerid  ,   int  guanqiaID ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,hasSuprise,teamerid,guanqiaID};
			if(!hero.isCanSend(5908, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 5908);
		}
		/**
		 * 死亡通知广播给其他人
		 * @param heroId 角色ID
		**/
		public static void sendCmd_5910(long hid  ,   long  heroId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{heroId};
			if(!hero.isCanSend(5910, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 5910);
		}
		/**
		 * 刷新队员气血
		 * @param hpInfo 队伍气血数据
		**/
		public static void sendCmd_5912(long hid  ,   Object[]  hpInfo ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{hpInfo};
			if(!hero.isCanSend(5912, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 5912);
		}
		/**
		 * 场景刷新数据
		 * @param maxHp boss气血上限
		 * @param nowHp boss当前气血
		**/
		public static void sendCmd_5914(long hid  ,   long  maxHp  ,   long  nowHp ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{maxHp,nowHp};
			if(!hero.isCanSend(5914, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 5914);
		}
		/**
		 * 离开战斗返回
		 * @param heroId 玩家id
		 * @param name 玩家名字
		**/
		public static void sendCmd_5916(long hid  ,   long  heroId  ,   String  name ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{heroId,name};
			if(!hero.isCanSend(5916, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 5916);
		}
		/**
		 * 返回新的关卡数据
		 * @param guanqiaCount 当前关卡数
		**/
		public static void sendCmd_5918(long hid  ,   int  guanqiaCount ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{guanqiaCount};
			if(!hero.isCanSend(5918, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 5918);
		}
}