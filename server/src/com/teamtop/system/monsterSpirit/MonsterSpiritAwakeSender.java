package com.teamtop.system.monsterSpirit;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * MonsterSpiritAwakeSender.java
 * 兽魂觉醒
 */
public class MonsterSpiritAwakeSender{
		/**
		 * 印记替换结果
		 * @param rtnCode 结果：0：失败，1：成功
		 * @param type 失败（0：无可替换印记），成功：兽灵类型
		 * @param site 装备位置
		**/
		public static void sendCmd_5692(long hid  ,  int  rtnCode  ,  int  type  ,  int  site ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtnCode,type,site};
			if(!hero.isCanSend(5692, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 5692);
		}
		/**
		 * 一键升星
		 * @param state 0没有此兽灵 1道具不足 2成功
		 * @param washTimes 一键升星增加的洗练次数
		**/
		public static void sendCmd_5694(long hid  ,  int  state  ,   int  washTimes ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,washTimes};
			if(!hero.isCanSend(5694, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 5694);
		}
		/**
		 * 打开兽魂化形界面
		 * @param state 0没拥有此兽灵 1没激活兽魂 2成功
		 * @param type 兽魂类型
		 * @param model 兽魂化形数据
		**/
		public static void sendCmd_5696(long hid  ,  int  state  ,  int  type  ,   Object[]  model ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,type,model};
			if(!hero.isCanSend(5696, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 5696);
		}
		/**
		 * 兽魂化形激活
		 * @param state 0没拥有此兽灵 1未激活 2表没有此id 3元宝不足 4成功
		 * @param type 类型 1青龙2白虎3朱雀4玄武
		 * @param id 兽魂化形表的id
		**/
		public static void sendCmd_5698(long hid  ,  int  state  ,  int  type  ,   int  id ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,type,id};
			if(!hero.isCanSend(5698, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 5698);
		}
		/**
		 * 兽魂化形
		 * @param state 0没有此兽灵 1未激活 2需要激活后才能幻形 3成功
		 * @param type 兽魂类型
		 * @param id 兽魂化形表的id
		**/
		public static void sendCmd_5700(long hid  ,  int  state  ,  int  type  ,   int  id ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,type,id};
			if(!hero.isCanSend(5700, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 5700);
		}
}