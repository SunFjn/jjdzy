package com.teamtop.system.monsterSpirit;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * MonsterSpiritSender.java
 * 兽灵
 */
public class MonsterSpiritSender{
		/**
		 * 升级兽灵结果
		 * @param rtnCode 0：失败，1：成功
		 * @param monsterSpiritId 失败：错误码；成功：兽灵id
		**/
		public static void sendCmd_854(long hid  ,  int  rtnCode  ,   int  monsterSpiritId ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,monsterSpiritId};
			if(!hero.isCanSend(854, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 854);
		}
		/**
		 * 穿戴结果返回
		 * @param rtnCode 结果：0：失败，1：成功
		 * @param type 失败：（0：无可穿戴装备）；成功：兽灵类型
		 * @param index 穿戴位置
		 * @param equipId 装备id
		 * @param stampData 印记数据
		**/
		public static void sendCmd_856(long hid  ,  int  rtnCode  ,  int  type  ,  int  index  ,   int  equipId  ,   Object[]  stampData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,type,index,equipId,stampData};
			if(!hero.isCanSend(856, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 856);
		}
		/**
		 * 洗练结果返回
		 * @param rtnCode 结果：0：失败，1：成功
		 * @param type 失败：（1：没穿装备不能洗练，2：不是对应类型的印记，3：印记道具不足，4：洗练石不足，5：洗练锁不足）；成功：兽灵类型
		 * @param site 装备位置
		 * @param washTimes 洗练次数
		 * @param stampData 印记数据
		**/
		public static void sendCmd_858(long hid  ,  int  rtnCode  ,  int  type  ,  int  site  ,   int  washTimes  ,   Object[]  stampData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,type,site,washTimes,stampData};
			if(!hero.isCanSend(858, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 858);
		}
		/**
		 * 升级星宿结果
		 * @param rtnCode 结果：0：失败（1：已达最高等级，2：道具不足，3：未激活），1：成功
		 * @param type 兽灵类型
		 * @param lv 星宿等级
		**/
		public static void sendCmd_860(long hid  ,  int  rtnCode  ,  int  type  ,   int  lv ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,type,lv};
			if(!hero.isCanSend(860, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 860);
		}
		/**
		 * 激活兽灵结果返回
		 * @param rtnCode 结果：0：失败（1：对应类型印记数量不足），1：成功
		 * @param type 失败：（1：印记数量不足），成功：兽灵类型
		**/
		public static void sendCmd_862(long hid  ,  int  rtnCode  ,  int  type ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,type};
			if(!hero.isCanSend(862, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 862);
		}
		/**
		 * 返回界面信息
		 * @param msData 兽灵数据
		**/
		public static void sendCmd_852(long hid  ,   Object[]  msData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{msData};
			if(!hero.isCanSend(852, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 852);
		}
		/**
		 * 锁定结果返回
		 * @param rtnCode 结果：0：失败，1：胜利
		 * @param type 失败（1：未洗练到印记不用锁定，2：已锁定，3：消耗道具不足），胜利：兽灵类型
		 * @param site 装备位置
		 * @param index 印记位置
		 * @param lock 锁定状态（1锁定，0未锁定）
		**/
		public static void sendCmd_864(long hid  ,  int  rtnCode  ,  int  type  ,  int  site  ,  int  index  ,  int  lock ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,type,site,index,lock};
			if(!hero.isCanSend(864, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 864);
		}
		/**
		 * 出战结果
		 * @param rtnCode 结果：0：失败，1：成功
		 * @param type 失败：（1：未激活），成功：兽灵类型
		**/
		public static void sendCmd_866(long hid  ,  int  rtnCode  ,  int  type ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,type};
			if(!hero.isCanSend(866, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 866);
		}
		/**
		 * 星宿进阶结果
		 * @param rtnCode 结果：0：失败，1：成功
		 * @param type 失败：（1:已经最高，2：未满足条件），成功：兽灵类型
		 * @param grade 当前阶数
		**/
		public static void sendCmd_868(long hid  ,  int  rtnCode  ,  int  type  ,   int  grade ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,type,grade};
			if(!hero.isCanSend(868, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 868);
		}
}