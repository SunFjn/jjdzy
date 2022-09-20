package com.teamtop.system.exclusiveActivity.exOverCallbackYBSe;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * ExActOverCallbackYBSeSender.java
 * 专属活动-元宝返利
 */
public class ExActOverCallbackYBSeSender{
		/**
		 * 返回界面信息
		 * @param id 活动唯一id
		 * @param consumeYBNum 消耗元宝数量
		 * @param awardStateList 奖励状态列表
		**/
		public static void sendCmd_8330(long hid  ,   int  id  ,   int  consumeYBNum  ,   Object[]  awardStateList ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{id,consumeYBNum,awardStateList};
			if(!hero.isCanSend(8330, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8330);
		}
		/**
		 * 领取奖励结果
		 * @param id 活动唯一id
		 * @param index 索引id
		 * @param state 奖励状态，0：奖励不存在，1：成功，2：不可领取，3：重复领取
		**/
		public static void sendCmd_8332(long hid  ,   int  id  ,   int  index  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{id,index,state};
			if(!hero.isCanSend(8332, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8332);
		}
		/**
		 * 更新元宝返利配置表
		 * @param actData 元宝返利数据
		**/
		public static void sendCmd_8334(long hid  ,   Object[]  actData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{actData};
			if(!hero.isCanSend(8334, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 8334);
		}
}