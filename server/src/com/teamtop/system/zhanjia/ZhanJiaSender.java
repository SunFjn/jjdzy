package com.teamtop.system.zhanjia;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * ZhanJiaSender.java
 * 战甲
 */
public class ZhanJiaSender{
		/**
		 * GC 打开战甲ui返回
		 * @param jie 战甲阶数
		 * @param exp 战甲经验
		 * @param zhanjias 
		 * @param taozhuangid 
		 * @param skills 
		 * @param num1 战甲属性丹数量
		 * @param num2 战甲资质丹数量
		 * @param showType 展示中的战甲类型
		**/
		public static void sendCmd_802(long hid  ,   int  jie  ,   int  exp  ,   Object[]  zhanjias  ,   Object[]  taozhuangid  ,   Object[]  skills  ,   int  num1  ,   int  num2  ,   int  showType ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{jie,exp,zhanjias,taozhuangid,skills,num1,num2,showType};
			if(!hero.isCanSend(802, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 802);
		}
		/**
		 * GC 升阶返回
		 * @param rest 0成功 1失败
		 * @param jie 战甲等阶
		 * @param exp 战甲经验
		**/
		public static void sendCmd_804(long hid  ,  int  rest  ,   int  jie  ,   int  exp ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,jie,exp};
			if(!hero.isCanSend(804, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 804);
		}
		/**
		 * GC 战甲神行返回
		 * @param rest 0成功 1失败 
		 * @param type 战甲类型
		**/
		public static void sendCmd_806(long hid  ,  int  rest  ,  int  type ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,type};
			if(!hero.isCanSend(806, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 806);
		}
		/**
		 * GC 激活/升阶套装id
		 * @param rest 0成功 1失败
		 * @param index 套装索引1/2/3
		 * @param taozhuangid 套装id
		**/
		public static void sendCmd_808(long hid  ,  int  rest  ,  int  index  ,   int  taozhuangid ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,index,taozhuangid};
			if(!hero.isCanSend(808, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 808);
		}
		/**
		 * GC 激活/升级技能返回 
		 * @param rest 0成功 1失败
		 * @param index 位置
		 * @param skillid 技能id
		**/
		public static void sendCmd_810(long hid  ,  int  rest  ,  int  index  ,   int  skillid ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,index,skillid};
			if(!hero.isCanSend(810, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 810);
		}
		/**
		 * GC 使用丹药返回
		 * @param rest 0成功 1失败
		 * @param num1 战甲属性丹数量
		 * @param num2 战甲资质丹数量
		**/
		public static void sendCmd_812(long hid  ,  int  rest  ,   int  num1  ,   int  num2 ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,num1,num2};
			if(!hero.isCanSend(812, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 812);
		}
		/**
		 * 更换战甲
		 * @param result 更换成功0  失败1
		 * @param type 战甲类型
		**/
		public static void sendCmd_814(long hid  ,  int  result  ,   int  type ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{result,type};
			if(!hero.isCanSend(814, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 814);
		}
		/**
		 * GC套装激活情况
		 * @param type （1武将2宝物）
		 * @param arr 
		**/
		public static void sendCmd_816(long hid  ,  int  type  ,   Object[]  arr ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{type,arr};
			if(!hero.isCanSend(816, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 816);
		}
		/**
		 * 5系统激活升级套装
		 * @param res 成功失败
		 * @param sys 系统id
		 * @param type 套装序号
		 * @param sid 套装id
		**/
		public static void sendCmd_818(long hid  ,  int  res  ,  int  sys  ,  int  type  ,   int  sid ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{res,sys,type,sid};
			if(!hero.isCanSend(818, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 818);
		}
		/**
		 * GC
		 * @param type 1武将2宝物3神剑4异宝5天书6兵法7战甲
		 * @param skillinfos arr
		**/
		public static void sendCmd_820(long hid  ,  int  type  ,   Object[]  skillinfos ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{type,skillinfos};
			if(!hero.isCanSend(820, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 820);
		}
		/**
		 * GC 升级觉醒返回
		 * @param rest 升级结果
		 * @param type 分类
		 * @param index 宝物/武将/战甲id
		 * @param skillindex 技能id/ 觉醒之力（1-4）
		 * @param level 等级
		**/
		public static void sendCmd_822(long hid  ,  int  rest  ,  int  type  ,   int  index  ,   int  skillindex  ,   int  level ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,type,index,skillindex,level};
			if(!hero.isCanSend(822, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 822);
		}
}