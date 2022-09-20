package com.teamtop.system.hero;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * HeroSender.java
 * Hero
 */
public class HeroSender{
		/**
		 * 登陆返回
		 * @param rtn 是否有角色 1：有，0：没有
		**/
		public static void sendCmd_102(long hid  ,  int  rtn ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtn};
			if(!hero.isCanSend(102, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 102);
		}
		/**
		 * 服务端初始数据已经发送完毕，客户端可以进入场景
		**/
		public static void sendCmd_104(long hid ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = null;
			if(!hero.isCanSend(104, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 104);
		}
		/**
		 * 玩家基础数据
		 * @param heroid hid
		 * @param name 名字
		 * @param level 等级
		 * @param exp 经验
		 * @param job 职业时装(>1000为(职业+时装) <1000原始职业时装)
		 * @param countryType 国家势力
		 * @param money 元宝
		 * @param coin 铜币
		 * @param starSoul 星魂
		 * @param soulFire 魂火
		 * @param yuliu2 vip等级
		 * @param yuliu3 功勋
		 * @param prestige 声望
		 * @param totalStrendth 总战力
		 * @param rebornLv 转生等级
		 * @param curGuanqia 当前关卡
		 * @param titleId 称号id
		 * @param sword 神剑id
		 * @param expAdd 经验加成
		 * @param promotion 晋升等级
		 * @param fid 专属神兵0无
		 * @param fuwenExp 符文经验
		 * @param bossjf 战场boss积分
		 * @param monsterSpirit 出战兽灵
		 * @param littleType 少主类型
		 * @param littlefashid 出站少主时装
		 * @param littlestar 少主星级
		 * @param litterSkilllv 少主主动技能等级
		 * @param reincarnationLevel 轮回等级
		 * @param historyMaxLevel 历史最高等级
		 * @param taoyuanSwornId 桃园结义id 
		 * @param mountId 坐骑id 
		 * @param speed 速度
		**/
		public static void sendCmd_108(long hid  ,   long  heroid  ,   String  name  ,  int  level  ,   long  exp  ,   int  job  ,  int  countryType  ,   long  money  ,   long  coin  ,   long  starSoul  ,   long  soulFire  ,   int  yuliu2  ,   int  yuliu3  ,   long  prestige  ,   long  totalStrendth  ,  int  rebornLv  ,   int  curGuanqia  ,   int  titleId  ,   int  sword  ,   int  expAdd  ,   int  promotion  ,   int  fid  ,   long  fuwenExp  ,   long  bossjf  ,   int  monsterSpirit  ,  int  littleType  ,   int  littlefashid  ,   int  littlestar  ,   int  litterSkilllv  ,   int  reincarnationLevel  ,   int  historyMaxLevel  ,   long  taoyuanSwornId  ,   int  mountId  ,   int  speed ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{heroid,name,level,exp,job,countryType,money,coin,starSoul,soulFire,yuliu2,yuliu3,prestige,totalStrendth,rebornLv,curGuanqia,titleId,sword,expAdd,promotion,fid,fuwenExp,bossjf,monsterSpirit,littleType,littlefashid,littlestar,litterSkilllv,reincarnationLevel,historyMaxLevel,taoyuanSwornId,mountId,speed};
			if(!hero.isCanSend(108, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 108);
		}
		/**
		 * 创建角色返回
		 * @param rtn 结果 1创建角色成功，2名字重复,3名字非法
		 * @param job 角色职业
		 * @param heroId 角色id
		 * @param betweenOpen 开服天数
		 * @param currentTime 登陆时候返回的当前时间
		**/
		public static void sendCmd_106(long hid  ,  int  rtn  ,  int  job  ,   long  heroId  ,   int  betweenOpen  ,   int  currentTime ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtn,job,heroId,betweenOpen,currentTime};
			if(!hero.isCanSend(106, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 106);
		}
		/**
		 * 玩家战斗属性
		 * @param attrs 属性数组，按照UI面板顺序发送
		 * @param totalStrength 总战力
		**/
		public static void sendCmd_110(long hid  ,   Object[]  attrs  ,   long  totalStrength ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{attrs,totalStrength};
			if(!hero.isCanSend(110, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 110);
		}
		/**
		 * 转生提升返回
		 * @param rtn 0成功 1失败
		 * @param rebornLv 转生等级
		**/
		public static void sendCmd_114(long hid  ,  int  rtn  ,  int  rebornLv ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtn,rebornLv};
			if(!hero.isCanSend(114, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 114);
		}
		/**
		 * 玩家操作后发送改变的战斗属性
		 * @param data json格式
		**/
		public static void sendCmd_120(long hid  ,   String  data ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{data};
			if(!hero.isCanSend(120, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 120);
		}
		/**
		 * GC 战斗玩家的属性数据
		 * @param id 玩家id
		 * @param name 玩家名称
		 * @param official 将衔
		 * @param country 国家
		 * @param title 称号
		 * @param monsterSpirit 出战兽灵
		 * @param attrData 属性
		 * @param strength 总战力
		 * @param ext 其他参数数组
		 * @param littleType 少主类型
		 * @param littlefashid 出站少主时装
		 * @param littlestar 少主星级
		 * @param litterSkilllv 少主主动技能等级
		**/
		public static void sendCmd_130(long hid  ,   long  id  ,   String  name  ,   int  official  ,   int  country  ,   int  title  ,   int  monsterSpirit  ,   Object[]  attrData  ,   long  strength  ,   Object[]  ext  ,  int  littleType  ,   int  littlefashid  ,   int  littlestar  ,   int  litterSkilllv ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{id,name,official,country,title,monsterSpirit,attrData,strength,ext,littleType,littlefashid,littlestar,litterSkilllv};
			if(!hero.isCanSend(130, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 130);
		}
		/**
		 * 请求场景附近玩家数据
		 * @param data 玩家数据
		**/
		public static void sendCmd_132(long hid  ,   Object[]  data ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{data};
			if(!hero.isCanSend(132, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 132);
		}
		/**
		 * 申请充值返回
		 * @param rtn 返回 1：成功，2：充值未开放
		 * @param order 订单信息
		 * @param isblock 0不是白名单 1是白名单
		 * @param id 充值项id
		**/
		public static void sendCmd_136(long hid  ,  int  rtn  ,   String  order  ,  int  isblock  ,   int  id ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rtn,order,isblock,id};
			if(!hero.isCanSend(136, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 136);
		}
		/**
		 * 返回充值界面数据
		 * @param vipLevel vip等级
		 * @param vipExp vip经验
		 * @param xDouble 倍数信息
		**/
		public static void sendCmd_138(long hid  ,  int  vipLevel  ,   int  vipExp  ,   Object[]  xDouble ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{vipLevel,vipExp,xDouble};
			if(!hero.isCanSend(138, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 138);
		}
		/**
		 * GC 被挤下线
		 * @param state 0被挤下线 1服务器关闭
		**/
		public static void sendCmd_140(long hid  ,  int  state ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state};
			if(!hero.isCanSend(140, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 140);
		}
		/**
		 * GC 是否被封号
		 * @param type 1:封号，2：处理问题 
		**/
		public static void sendCmd_142(long hid  ,  int  type ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{type};
			if(!hero.isCanSend(142, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 142);
		}
		/**
		 * 改名后端返回
		 * @param flag 失败成功标识，1成功，2非法字符，3名字没有改变，4名字已经存在，5没有改名道具
		 * @param name 改的新名字
		**/
		public static void sendCmd_144(long hid  ,  int  flag  ,   String  name ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{flag,name};
			if(!hero.isCanSend(144, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 144);
		}
		/**
		 * GC发送角色基础数据
		 * @param data 场景玩家数据
		**/
		public static void sendCmd_146(long hid  ,   Object[]  data ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{data};
			if(!hero.isCanSend(146, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 146);
		}
		/**
		 * 玩家游戏设置
		 * @param sound SOUND(0不开启，1开启)
		 * @param skill 自动战斗（0不开启，1开启）
		**/
		public static void sendCmd_148(long hid  ,  int  sound  ,  int  skill ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{sound,skill};
			if(!hero.isCanSend(148, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 148);
		}
		/**
		 * 服务端战斗结果更新
		 * @param rest 0：失败；1：胜利
		**/
		public static void sendCmd_152(long hid  ,  int  rest ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest};
			if(!hero.isCanSend(152, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 152);
		}
		/**
		 * GC 获取官衔返回
		 * @param index 官衔索引
		 * @param gong 功勋
		**/
		public static void sendCmd_154(long hid  ,  int  index  ,   int  gong ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{index,gong};
			if(!hero.isCanSend(154, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 154);
		}
		/**
		 * GC 升官衔返回
		 * @param rest 0成功 1失败
		 * @param index 当前官衔
		 * @param gongnum 功勋
		**/
		public static void sendCmd_156(long hid  ,  int  rest  ,  int  index  ,   int  gongnum ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rest,index,gongnum};
			if(!hero.isCanSend(156, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 156);
		}
		/**
		 * 发送玩法活动系统状态
		 * @param systemStateData 系统状态数据
		**/
		public static void sendCmd_158(long hid  ,   Object[]  systemStateData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{systemStateData};
			if(!hero.isCanSend(158, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 158);
		}
		/**
		 * 发送系统红点
		 * @param redPointData 系统红点数据
		**/
		public static void sendCmd_160(long hid  ,   Object[]  redPointData ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{redPointData};
			if(!hero.isCanSend(160, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 160);
		}
		/**
		 * 零点重置
		**/
		public static void sendCmd_162(long hid ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = null;
			if(!hero.isCanSend(162, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 162);
		}
		/**
		 * 服务端通知提示
		 * @param msg 通知提示内容
		 * @param type 通知类型：0：普通，1：服务器维护信息，2，黑名单，3：踢下线，4：加速踢下线提示
		**/
		public static void sendCmd_164(long hid  ,   String  msg  ,  int  type ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{msg,type};
			if(!hero.isCanSend(164, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 164);
		}
		/**
		 * GC 通知前段IOS充值开启关卡数
		 * @param guankaNum IOS充值开启关卡数
		**/
		public static void sendCmd_166(long hid  ,   int  guankaNum ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{guankaNum};
			if(!hero.isCanSend(166, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 166);
		}
		/**
		 * GC 版本号
		 * @param str 发送版本号
		**/
		public static void sendCmd_168(long hid  ,   String  str ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{str};
			if(!hero.isCanSend(168, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 168);
		}
		/**
		 * 返回福利大厅公告
		 * @param content 公告信息
		**/
		public static void sendCmd_170(long hid  ,   String  content ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{content};
			if(!hero.isCanSend(170, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 170);
		}
		/**
		 * GC 显示更新公告
		**/
		public static void sendCmd_172(long hid ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = null;
			if(!hero.isCanSend(172, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 172);
		}
		
		/**
		 * GC 系统开启
		**/
		public static void sendCmd_20100(long hid, int sysId, int state){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{sysId,state};
			if(!hero.isCanSend(HeroCmd.GC_SystemOpen_20100, cmdSendData)){
				return;
			}
			System.out.println("6666666666666666666666 "+sysId+", state="+state);
			NettyWrite.writeData(hero.getChannel() , cmdSendData, HeroCmd.GC_SystemOpen_20100);
		}
}