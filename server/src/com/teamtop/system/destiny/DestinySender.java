package com.teamtop.system.destiny;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * DestinySender.java
 * 八阵图
 */
public class DestinySender{
		/**
		 * GC打开ui返回
		 * @param destinyequips 装备在阵上符文
		 * @param destinybags 背包符文
		 * @param feelNum 免费元宝鉴定次数
		 * @param coinNum 今日铜钱次数
		 * @param yuanNum 元宝鉴定次数
		 * @param sumNum 完美鉴定总次数
		**/
		public static void sendCmd_4402(long hid  ,   Object[]  destinyequips  ,   Object[]  destinybags  ,  int  feelNum  ,   int  coinNum  ,   int  yuanNum  ,   int  sumNum ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{destinyequips,destinybags,feelNum,coinNum,yuanNum,sumNum};
			if(!hero.isCanSend(4402, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4402);
		}
		/**
		 * GC 装备/卸下天命返回
		 * @param rest 装备/卸下结果0成功1不允许装备同类型天命2失败
		 * @param type 类型
		 * @param place 背包索引
		 * @param index 身上索引
		**/
		public static void sendCmd_4404(long hid  ,  int  rest  ,  int  type  ,   int  place  ,   int  index ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,type,place,index};
			if(!hero.isCanSend(4404, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4404);
		}
		/**
		 * GC 升级结果
		 * @param rest 0成功1失败
		 * @param place 位置索引
		 * @param indexid 符文id
		 * @param level 等级
		**/
		public static void sendCmd_4406(long hid  ,  int  rest  ,  int  place  ,   int  indexid  ,   int  level ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,place,indexid,level};
			if(!hero.isCanSend(4406, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4406);
		}
		/**
		 * GC 升星返回
		 * @param rest 升星结果0成功1失败
		 * @param place 位置索引
		 * @param indexid 符文id
		 * @param star 星级
		 * @param bagplace 背包被使用的符文位置
		**/
		public static void sendCmd_4408(long hid  ,  int  rest  ,  int  place  ,   int  indexid  ,   int  star  ,   int  bagplace ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,place,indexid,star,bagplace};
			if(!hero.isCanSend(4408, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4408);
		}
		/**
		 * GC 分解结果
		 * @param rest 结果0成功1失败
		 * @param index 
		**/
		public static void sendCmd_4410(long hid  ,  int  rest  ,   Object[]  index ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,index};
			if(!hero.isCanSend(4410, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4410);
		}
		/**
		 * GC 鉴定结果
		 * @param addfuwen 
		 * @param feelnum 免费次数
		 * @param coinnum 铜钱次数
		 * @param yuannum 元宝次数
		 * @param type 类型
		 * @param sumnum 完美鉴定总次数
		**/
		public static void sendCmd_4412(long hid  ,   Object[]  addfuwen  ,  int  feelnum  ,   int  coinnum  ,   int  yuannum  ,  int  type  ,   int  sumnum ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{addfuwen,feelnum,coinnum,yuannum,type,sumnum};
			if(!hero.isCanSend(4412, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4412);
		}
		/**
		 * 锁
		 * @param pos 位置
		 * @param locked 锁
		**/
		public static void sendCmd_4414(long hid  ,   int  pos  ,  int  locked ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{pos,locked};
			if(!hero.isCanSend(4414, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4414);
		}
		/**
		 * GC 解说返回
		 * @param rest 0成功 1失败
		 * @param index 孔id
		**/
		public static void sendCmd_4416(long hid  ,  int  rest  ,  int  index ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,index};
			if(!hero.isCanSend(4416, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4416);
		}
		/**
		 * 打开符文大师界面返回
		 * @param id 符文大师id
		 * @param state 状态:0：不可激活，未达到条件，1：可激活，2：不可升级，3：可升级，4：已满级
		 * @param redTotalStar 红色符文总星级
		**/
		public static void sendCmd_4418(long hid  ,   int  id  ,  int  state  ,   int  redTotalStar ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{id,state,redTotalStar};
			if(!hero.isCanSend(4418, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4418);
		}
		/**
		 * 激活或升级返回
		 * @param state 状态：0：失败，1：成功，2：未满足条件，3：已满级
		 * @param id 符文大师id
		 * @param nextId 下一级符文大师id,已达满级则为0
		 * @param nextState 下一级状态:0：不可升级，1：可升级
		**/
		public static void sendCmd_4420(long hid  ,  int  state  ,   int  id  ,   int  nextId  ,  int  nextState ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,id,nextId,nextState};
			if(!hero.isCanSend(4420, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4420);
		}
		/**
		 * GC 分解结果
		 * @param rest 0成功 1失败
		 * @param types 
		**/
		public static void sendCmd_4422(long hid  ,  int  rest  ,   Object[]  types ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,types};
			if(!hero.isCanSend(4422, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4422);
		}
		/**
		 * GC 添加符文
		 * @param arrs 
		 * @param isman 背包是否已满0没有 1有
		**/
		public static void sendCmd_4424(long hid  ,   Object[]  arrs  ,  int  isman ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{arrs,isman};
			if(!hero.isCanSend(4424, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4424);
		}
		/**
		 * 兑换神符返回
		 * @param state 状态 1成功 2神符碎片不足 3神符不存在 4背包已满 
		 * @param id 表的id
		**/
		public static void sendCmd_4426(long hid  ,  int  state  ,   int  id ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,id};
			if(!hero.isCanSend(4426, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4426);
		}
		/**
		 * GC 神符文已经兑换数量
		 * @param changeNum 
		**/
		public static void sendCmd_4428(long hid  ,   Object[]  changeNum ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{changeNum};
			if(!hero.isCanSend(4428, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 4428);
		}
}