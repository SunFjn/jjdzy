package com.teamtop.system.exclusiveActivity;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * ExclusiveActivitySender.java
 * 专属活动
 */
public class ExclusiveActivitySender{
		/**
		 * 返回专属活动数据
		 * @param exActData 专属活动数据
		 * @param switchState 专属开关（1开启，2：关闭）
		**/
		public static void sendCmd_7900(long hid  ,   Object[]  exActData  ,  int  switchState ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{exActData,switchState};
			if(!hero.isCanSend(7900, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 7900);
		}
		/**
		 * 活动状态同步
		 * @param id 唯一id
		 * @param startTime 开始时间
		 * @param endTime 结束时间
		 * @param state 状态：（1：开启，0：关闭）
		**/
		public static void sendCmd_7902(long hid  ,   int  id  ,   int  startTime  ,   int  endTime  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{id,startTime,endTime,state};
			if(!hero.isCanSend(7902, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 7902);
		}
		/**
		 * 专属活动开关状态
		 * @param switchState 开关状态：1开启，2：关闭
		**/
		public static void sendCmd_7904(long hid  ,  int  switchState ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{switchState};
			if(!hero.isCanSend(7904, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 7904);
		}
		/**
		 * 更新专属活动配置数据
		 * @param exActDatat 专属活动配置数据
		**/
		public static void sendCmd_7906(long hid  ,   Object[]  exActDatat ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{exActDatat};
			if(!hero.isCanSend(7906, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 7906);
		}
}