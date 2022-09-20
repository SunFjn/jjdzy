package com.teamtop.gameCommon;

import java.util.HashMap;
import java.util.Map;

/**
 * 间隔时间属性名称常量类
 * @author yxh
 *
 */
public class GameConst {
	/**
	 * 服务器id：内测服
	 */
	public static final int SERVER_ID_TEST = 0;
	/**
	 * 服务器id：本地
	 */
	public static final int SERVER_ID_LOCAL = 1;
	/**
	 * 服务器id：后台中央服
	 */
	public static final int SERVER_ID_HOUTAI = 2;
	/**
	 * 服务器id：中央服
	 */
	public static final int SERVER_ID_CENTRAL = 3;
	
	/**职业  战士 赵云 */
	public static final int ZHANSHI = 1;
	/**职业  谋士 诸葛亮*/
	public static final int MOUSHI = 2;
	/**职业  舞女 貂蝉*/
	public static final int WUNV = 3;
	
	
	
	/**道具**/
	public static final int TOOL = 1;
	/**装备**/
	public static final int EQUIP = 2;
	/**铜币**/
	public static final int COIN = 3;
	/**元宝**/
	public static final int YUANBAO = 4;
	/**等级**/
	public static final int LEVEL = 5;
	/**经验**/
	public static final int EXP = 6;
	/**战功/功勋**/
	public static final int ZHANGONG = 7;
	/**熔炼值**/
	public static final int RONGLIAN = 8;
	/** 星魂 */
	public static final int STARSOUL = 9;
	/** 魂火 */
	public static final int SOULFIRE = 10;
	/** 声望 */
	public static final int PRESTIGE = 11;
	/** 符文经验*/
	public static final int DESTINYEXP=14;
	/** BOSS积分*/
	public static final int ZCBOSSJF=12;
	
	/** 积分道具ID    前端显示用 */
	public static final int SCORE = 13;
	/** 分享币*/
	public static final int SHARE_COIN=16;
	/** 三国战令经验 */
	public static final int WarOrderExp = 17;
	/** 群雄逐鹿体力*/
	public static final int ZHU_LU_TI_LI=18;
	/** 成就币 */
	public static final int ACHIEVEMENT_COIN = 19;
	/** 荣耀币 */
	public static final int HONOR_COIN = 20;
	/** 繁荣度 */
	public static final int HOUSE_PROSPERITY = 21;
	/** 府邸币 */
	public static final int HOUSE_COIN = 22;
	/** 天工炉积分 */
	public static final int HOUSE_JI_FEN = 23;
	/** 弹珠积分*/
	public static final int HOODLE_POINT = 27;
	/** 金元宝 */
	public static final int GOLDYUANBAO_COIN = 28;
	/** 六道印记碎片*/
	public static final int SIXWAYYINJI=29;
	/** 武庙积分*/
	public static final int WUMIAOSHIZHE_SCORE=30;
	/**vip经验*/
	public static final int VIP_EXP = 35;
	
	
	/**军团贡献**/
	public static final int CONTRIBUTE = 11;
	/**军团资金**/
	public static final int WEALTH = 12;
	/**宝物点**/
	public static final int BAO_WU = 13;
	/**商城积分**/
	public static final int MALLJF = 14;
	/** 通用掉落类型*/
	public static final int GENDROP = 16;
	/** 决斗无双积分*/
	public static final int JDWSJF = 17;
	/** 三国秘辛抽中元宝比例*/
	public static final int SGMX_PRO = 18;
	/**转生等级**/
	public static final int REBORN_LV = 99;
	
	
	/**当前气血 附加属性**/
	public static final int HP_EXT = 102;
	/**攻击 附加属性**/
	public static final int ATT_EXT = 103;
	/**防御 附加属性**/
	public static final int DEF_EXT = 104;
	/**暴击 附加属性**/
	public static final int CRIT_EXT = 105;
	/**抗暴 附加属性**/
	public static final int RESCRIT_EXT = 106;
	/**命中 附加属性**/
	public static final int HIT_EXT = 107;
	/**闪避 附加属性**/
	public static final int EVADE_EXT = 108;
	/**真实伤害 附加属性**/
	public static final int DAMAGE_EXT = 109;
	/**暴击率 附加属性**/
	public static final int CRITRATE_EXT = 110;
	/**抗暴率 附加属性**/
	public static final int RESCRITRATE_EXT = 111;
	/**命中率 附加属性**/
	public static final int HITRATE_EXT = 112;
	/**闪避率 附加属性**/
	public static final int EVADERATE_EXT = 113;
	/**暴伤加成 附加属性**/
	public static final int CRITDMGADD_EXT = 114;
	/**暴伤减免 附加属性**/
	public static final int CRITDMGDET_EXT = 115;
	/**伤害加成 附加属性**/
	public static final int DAMAGEADD_EXT = 116;
	/**伤害减免 附加属性**/
	public static final int DAMAGEDET_EXT = 117;
	/**火焰伤害 附加属性**/
	public static final int FIREDMG_EXT = 118;
	/**冰冻伤害 附加属性**/
	public static final int FROZENDMG_EXT = 119;
	/**毒液伤害 附加属性**/
	public static final int POISONDMG_EXT = 120;
	/**电击伤害 附加属性**/
	public static final int ELECTRICDMG_EXT = 121;
	/**爆炸伤害 附加属性**/
	public static final int BOOMDMG_EXT = 122;
	/**火焰抗性 附加属性**/
	public static final int FIRERES_EXT = 123;
	/**冰冻抗性 附加属性**/
	public static final int FROZENRES_EXT = 124;
	/**毒液抗性 附加属性**/
	public static final int POISERES_EXT = 125;
	/**电击抗性 附加属性**/
	public static final int ELECTRICRES_EXT = 126;
	/**爆炸抗性附加属性**/
	public static final int BOOMRES_EXT = 127;
	
	/**当前气血   额外加成百分比**/
	public static final int HP_ADD = 202;
	/**攻击   额外加成百分比**/
	public static final int ATT_ADD = 203;
	/**防御   额外加成百分比**/
	public static final int DEF_ADD = 204;
	/**暴击   额外加成百分比**/
	public static final int CRIT_ADD = 205;
	/**抗暴   额外加成百分比**/
	public static final int RESCRIT_ADD = 206;
	/**命中   额外加成百分比**/
	public static final int HIT_ADD = 207;
	/**闪避   额外加成百分比**/
	public static final int EVADE_ADD = 208;
	/**真实伤害   额外加成百分比**/
	public static final int DAMAGE_ADD = 209;
	/**暴击率   额外加成百分比**/
	public static final int CRITRATE_ADD = 210;
	/**抗暴率   额外加成百分比**/
	public static final int RESCRITRATE_ADD = 211;
	/**命中率   额外加成百分比**/
	public static final int HITRATE_ADD = 212;
	/**闪避率   额外加成百分比**/
	public static final int EVADERATE_ADD = 213;
	/**暴伤加成   额外加成百分比**/
	public static final int CRITDMGADD_ADD = 214;
	/**暴伤减免   额外加成百分比**/
	public static final int CRITDMGDET_ADD = 215;
	/**伤害加成   额外加成百分比**/
	public static final int DAMAGEADD_ADD = 216;
	/**伤害减免   额外加成百分比**/
	public static final int DAMAGEDET_ADD = 217;
	/**火焰伤害   额外加成百分比**/
	public static final int FIREDMG_ADD = 218;
	/**冰冻伤害   额外加成百分比**/
	public static final int FROZENDMG_ADD = 219;
	/**毒液伤害   额外加成百分比**/
	public static final int POISONDMG_ADD = 220;
	/**电击伤害   额外加成百分比**/
	public static final int ELECTRICDMG_ADD = 221;
	/**爆炸伤害   额外加成百分比**/
	public static final int BOOMDMG_ADD = 222;
	/**火焰抗性   额外加成百分比**/
	public static final int FIRERES_ADD = 223;
	/**冰冻抗性   额外加成百分比**/
	public static final int FROZENRES_ADD = 224;
	/**毒液抗性   额外加成百分比**/
	public static final int POISERES_ADD = 225;
	/**电击抗性   额外加成百分比**/
	public static final int ELECTRICRES_ADD = 226;
	/**爆炸抗性   额外加成百分比**/
	public static final int BOOMRES_ADD = 227;
	/**PVP伤害加成**/
	public static final int PVPHURT_ADD = 301;
	/**PVP伤害减免**/
	public static final int PVP_MINUE = 302;
	/**PVE伤害加成**/
	public static final int PVE_ADD = 303;
	
	/** 隐身(无敌INVINCIBLE) */
	public static final int BUFF_CLOAKING = 301;
	/** 回血 */
	public static final int BUFF_HEALTH_REGENERATION = 302;
	/** 回怒 */
	public static final int BUFF_ANGER_REGENERATION = 303;
	/** 定身 */
	public static final int BUFF_HOLD_PERSON = 304;
	/** 吸血 */
	public static final int BUFF_VAMP = 305;
	/** 连击 */
	public static final int BUFF_DOUBLE_HIT = 306;

//	/**固定伤害**/
//	public static final int FIX_DAMG_EXT = 127;
//	/**固定伤免**/
//	public static final int FIX_DAMG_MIAN_EXT = 128;
//	/**固定治疗**/
//	public static final int FIX_CURE_EXT = 129;
//	
//	/**攻击时触发麻痹效果的几率**/
//	public static final int DIZZ_EXT = 120;
//	/**触发麻痹效果时对目标造成的控制时间**/
//	public static final int DIZZ_TIME_EXT = 121;
//	/**攻击时抵挡麻痹效果的几率**/
//	public static final int ANTIDIZZ_EXT = 122;
//	/**125关卡铜币额外加成百分比*/
//	public static final int COIN_ADD = 125;
//	/**126关卡经验额外加成百分比*/
//	public static final int EXP_ADD = 126;
	
	/** 品质 橙 */
	public static final int Orange = 5;
	/** 品质 红 */
	public static final int RED = 6;
	
	/** 玩家等级上限*/
	public static final int MAXLV = 80;
	
	/**120协议用到的key*/
	public static final char d = ',';
	public static final char y = '"';
	public static final char m = ':';
	public static final char s = '{';
	public static final char e = '}';
	/**
	 * 货币使用变化后通过120发送给前端的对应字符串
	 */
	public static Map<Integer, String> huobiMap = new HashMap<Integer, String>();
	public static Map<Integer, String> houtaiHuobiMap = new HashMap<Integer, String>();
	public static Map<Integer, String> costMap = new HashMap<Integer, String>();
	static{
		huobiMap.put(YUANBAO, "yuanbao");//元宝
		huobiMap.put(COIN, "tongbi");//铜币
		huobiMap.put(EXP, "exp");//经验
		huobiMap.put(ZHANGONG, "zhangong");//功勋
		huobiMap.put(STARSOUL, "starsoul");// 星魂
		huobiMap.put(SOULFIRE, "soulfire");// 魂火
		huobiMap.put(PRESTIGE, "prestige");// 声望
		huobiMap.put(DESTINYEXP, "fuwen");//符文经验
		huobiMap.put(ZCBOSSJF, "bossjf");//boss战场积分
		huobiMap.put(SHARE_COIN, "sharecoin");//分享币
		huobiMap.put(HOUSE_PROSPERITY, "prosperity");// 繁荣度
		huobiMap.put(HOUSE_COIN, "housecoin");// 府邸币
		huobiMap.put(HOUSE_JI_FEN, "housejifen");// 天工炉积分
		huobiMap.put(HOODLE_POINT, "hoodlepoint");// 弹珠积分
		huobiMap.put(SIXWAYYINJI,"sixwayyinji");//六道印记碎片
		huobiMap.put(WUMIAOSHIZHE_SCORE,"wumiaoshizhe_score");//武庙积分
		huobiMap.put(VIP_EXP,"vip_exp");//武庙积分
		//huobiMap.put(ZHENHUN, "zhenhun");
		//huobiMap.put(BAO_WU, "baowu");
		//huobiMap.put(MALLJF, "malljf");
		//huobiMap.put(JDWSJF, "jdwsjf");
		

		houtaiHuobiMap.put(YUANBAO, "元宝");// 元宝
		houtaiHuobiMap.put(COIN, "铜币");// 铜币
		houtaiHuobiMap.put(EXP, "经验");// 经验
		houtaiHuobiMap.put(ZHANGONG, "功勋");// 功勋
		houtaiHuobiMap.put(STARSOUL, "星魂");// 星魂
		houtaiHuobiMap.put(SOULFIRE, "魂火");// 魂火
		houtaiHuobiMap.put(PRESTIGE, "声望");// 声望
		houtaiHuobiMap.put(DESTINYEXP, "符文经验");//符文经验
		houtaiHuobiMap.put(ZCBOSSJF, "boss战场积分");//boss战场积分
		houtaiHuobiMap.put(SHARE_COIN, "分享币");// 分享币
		houtaiHuobiMap.put(HOUSE_PROSPERITY, "繁荣度");// 繁荣度
		houtaiHuobiMap.put(HOUSE_COIN, "府邸币");// 府邸币
		houtaiHuobiMap.put(HOUSE_JI_FEN, "天工炉积分");// 天工炉积分
		houtaiHuobiMap.put(GOLDYUANBAO_COIN, "金元宝");//金元宝
		houtaiHuobiMap.put(HOODLE_POINT, "弹珠积分");// 弹珠积分
		houtaiHuobiMap.put(SIXWAYYINJI, "六道印记碎片");//六道印记碎片
		houtaiHuobiMap.put(WUMIAOSHIZHE_SCORE, "武庙积分");//武庙积分

		costMap.put(TOOL, "道具");// 道具
		costMap.put(EQUIP, "装备");// 装备
		costMap.put(YUANBAO, "元宝");// 元宝
		costMap.put(COIN, "铜币");// 铜币
		costMap.put(EXP, "经验");// 经验
		costMap.put(ZHANGONG, "功勋");// 功勋
		costMap.put(STARSOUL, "星魂");// 星魂
		costMap.put(SOULFIRE, "魂火");// 魂火
		costMap.put(PRESTIGE, "声望");// 声望
		costMap.put(DESTINYEXP, "符文经验");//符文经验
		costMap.put(ZCBOSSJF, "boss战场积分");//boss战场积分
		costMap.put(SHARE_COIN, "分享币");// 分享币
		costMap.put(HOUSE_PROSPERITY, "繁荣度");// 繁荣度
		costMap.put(HOUSE_COIN, "府邸币");// 府邸币
		costMap.put(HOUSE_JI_FEN, "天工炉积分");// 天工炉积分
		costMap.put(GOLDYUANBAO_COIN, "金元宝");//金元宝
		costMap.put(HOODLE_POINT, "弹珠积分");// 弹珠积分
		costMap.put(SIXWAYYINJI, "六道印记碎片");//六道印记碎片
		costMap.put(WUMIAOSHIZHE_SCORE, "武庙积分");//武庙积分
	}
	
	public static final String lv = "lv";
	public static final String rebornlv = "rebornlv";
	public static final String xiuwei = "xiuwei";
	public static final String expshow = "exp";
	public static final String ts = "str";
	public static final String expAdd = "expAdd";// 经验加成值
	public static final String strength = "str";// 战力
	/*public static final String hp = "hp";//血气
	public static final String att = "att";//攻击
	public static final String pdef = "pDef";//防御
	public static final String crit = "critical";//暴击
	public static final String resCrit = "resCrit";//抗暴
	public static final String hit = "hit";//命中
	public static final String evade = "evade";//闪避
	public static final String damage = "damage";//伤害
	public static final String critRate = "critRate";//暴击率
	public static final String resCritRate = "resCritRate";//抗暴率
	public static final String hitRate = "hitRate";//命中率
	public static final String evadeRate = "evadeRate";//闪避率
	public static final String critDmgAdd = "critDmgAdd";//暴伤加成
	public static final String critDmgDerate = "critDmgDerate";//暴伤减免
	public static final String dmgAdd = "dmgAdd";//伤害加成
	public static final String dmgDerate = "dmgDerate";//伤害减免
	public static final String fireDmg = "fireDmg";//火焰伤害
	public static final String frozenDmg = "frozenDmg";//冰冻伤害
	public static final String poisonDmg = "poisonDmg";//毒液伤害
	public static final String electricDmg = "electricDmg";//电击伤害
	public static final String boomDmg = "boomDmg";//爆炸伤害
	public static final String fireRes = "fireRes";//火焰抗性
	public static final String frozenRes = "frozenRes";//冰冻抗性
	public static final String poisonRes = "poisonRes";//毒液抗性
	public static final String electricRes = "electricRes";//电击抗性
	public static final String boomRes = "boomRes";//爆炸抗性
	public static final String level = "level";
	public static final String star = "star";//武将星级
	public static final String pvpAddHurt = "pvpAddHurt";// PVP伤害
	public static final String pvpMinuteHurt = "pvpMinuteHurt";//PVP伤害减免
	public static final String pveAddHurt = "pveAddHurt";// PVE伤害加成 */	
	/****************道具使用类常量*************/
	/*
	 * 1：材料 2：随机获得物品礼包 3：多选一礼包 4：青木宝石 5：碧水宝石 6：朱焰宝石 7：紫雷宝石 8：装备 9：神装 10：将印 11：图鉴卡
	 * 12：头像 13：头像框 14：称号
	 * 
	 * 94：开出技能宝物 95：开出宝物点 96: 获得称号 97：改名道具 99：军团改名卡
	 */
	/**操作方式：非背包使用*/
	public static final int OPERTYPE_FORBID = 0;
	/**操作方式：背包使用*/
	public static final int OPERTYPE_ENABLE = 1;
	/**类型：材料*/
	public static final int TYPE_MATERIAL = 1;
	/**类型：随机掉落礼包*/
	public static final int TYPE_RANDOM = 2;
	/**类型：多选一礼包*/
	public static final int TYPE_SELECT = 3;
	/** 类型：青木宝石 */
	public static final int TYPE_WOOD_GEM = 4;
	/** 类型：碧水宝石 */
	public static final int TYPE_WATER_GEM = 5;
	/** 类型：朱焰宝石 */
	public static final int TYPE_FIRE_GEM = 6;
	/** 类型：紫雷宝石 */
	public static final int TYPE_THUNDER_GEM = 7;
	/** 类型：装备 */
	public static final int TYPE_EQUIP = 8;
	/** 类型：神装 */
	public static final int TYPE_GOD_EQUIP = 9;
	/** 类型：将印 */
	public static final int TYPE_GENERAL_STEMP = 10;
	/** 类型：图鉴卡 */
	public static final int TYPE_ARCHIVE = 11;
	/** 类型：头像 */
	public static final int TYPE_ICON = 12;
	/** 类型：头像框 */
	public static final int TYPE_ICON_FRAME = 13;
	/** 类型：称号 */
	public static final int TYPE_TITLE = 14;
	/** 类型：全民挑战令 */
	public static final int TYPE_QMBOSSNUM = 16;
	/** 类型： 内部充值卡*/
	public static final int TYPE_RECHARGE= 17;
	/**类型：升级丹**/
	public static final int TYPE_UPLEVEL=19;
	/** 类型：一骑当千令 */
	public static final int TYPE_BATTLEVIXENS = 20;
	/** 类型：符文随机包 */
	public static final int TYPE_DESTINY= 22;
	/** 类型：虎牢关挑战令 */
	public static final int TYPE_TIGEPASS_NUM = 24;
	/** 类型：异兽boss挑战令 */
	public static final int TYPE_SPECIALANIMAL_BOSS_NUM = 25;
	/** 类型：三英战吕布挑战令 */
	public static final int TYPE_THREE_HERO_FLB_NUM = 26;
	/** 类型：乱世枭雄 */
	public static final int TYPE_CROSS_KING__NUM = 27;
	/** 类型：三国战神 */
	public static final int TYPE_GODOFWAR_NUM = 28;
	/** 类型：国家boss挑战令 */
	public static final int TYPE_COUNTRY_BOSS_NUM = 30;
	/** 类型：组队副本挑战令 */
	public static final int TYPE_TEAM_FUBEN_NUM = 31;
	/** 类型：七擒孟获挑战令 */
	public static final int TYPE_CROSS_BOSS_NUM = 32;
	/** 类型：单刀赴会挑战令 */
	public static final int TYPE_SOLORUN_NUM = 33;
	/** 类型：王者挑战令 */
	public static final int TYPE_KING_NUM = 34;
	/** 类型：鞭炮 */
	public static final int TYPE_BOOM = 35;
	/** 类型：狩猎令 */
	public static final int TYPE_HUNT_NUM = 36;
	/** 类型：攻城令 */
	public static final int TYPE_ATTACK_NUM = 37;
	/**随机印记宝箱*/
	public static final int TYPE_YINGJI=38;
	/** 类型：轮回副本挑战令 */
	public static final int TYPE_REBORN_FB_NUM = 39;
	/** 类型：轮回副本协助令 */
	public static final int TYPE_REBORN_FB_HELP_NUM = 40;
	/** 类型：登峰造极挑战令 */
	public static final int TYPE_DENGFENGZAOJINUM = 42;
	/** 类型：天工造物令  */
	public static final int TYPE_43 = 43;
	/** 类型：本府内务令 */
	public static final int TYPE_44 = 44;
	/** 类型：他府内务令 */
	public static final int TYPE_45 = 45;
	/** 类型：强盗击退令 */
	public static final int TYPE_46 = 46;
	/** 类型：犒赏三军道具 */
	public static final int TYPE_47 = 47;

	/**掉落总概率*/
	public static final int MAX_GAILV = 10000;
	/**掉落参数key*/
	public static final String D_MONEY = "money";
	public static final String D_DIAOLUO = "diaoluo";
	public static final String D_TYPE = "type";
	public static final String D_ID = "id";
	public static final String D_NUM = "num";
	public static final String D_GAILV = "gailv";
	public static final String D_CHENGHAO = "chenghao";

	/****************JSON字段常用Key常量*************/
	public static final String D_MONSTER= "monster";
	public static final String D_NPC_ID= "npc";
	
	/*******角色身上位置常量******/
	/** 武器位置 */
	public static final int INDEX_EQUIP_0 = 0;
	/** 衣服位置 */
	public static final int INDEX_EQUIP_1 = 1;
	/** 护腕位置 */
	public static final int INDEX_EQUIP_2 = 2;
	/** 裤子位置 */
	public static final int INDEX_EQUIP_3 = 3;
	/** 鞋子位置 */
	public static final int INDEX_EQUIP_4 = 4;
	/** 帽子位置 */
	public static final int INDEX_EQUIP_5 = 5;
	/** 项链位置 */
	public static final int INDEX_EQUIP_6= 6;
	/** 手镯位置 */
	public static final int INDEX_EQUIP_7= 7;
	/** 戒指位置 */
	public static final int INDEX_EQUIP_8 = 8;
	/**饰品位置**/
	public static final int INDEX_EQUIP_9 = 9;
	
	
	/** 神兵装备0位置 */
	public static final int INDEX_SHEN_BING_0 = 10;
	/** 神兵装备1位置  */
	public static final int INDEX_SHEN_BING_1 = 11;
	/** 神兵装备2位置 */
	public static final int INDEX_SHEN_BING_2 = 12;
	/** 神兵装备3位置 */
	public static final int INDEX_SHEN_BING_3 = 13;
	/** 神兵装备4位置 */
	public static final int INDEX_SHEN_BING_4 = 14;
	/** 神兵装备5位置  */
	public static final int INDEX_SHEN_BING_5 = 15;
	/** 神兵装备6位置 */
	public static final int INDEX_SHEN_BING_6 = 16;
	/** 神兵装备7位置 */
	public static final int INDEX_SHEN_BING_7 = 17;
	/** 神兵装备8位置 */
	public static final int INDEX_SHEN_BING_8 = 18;
	/** 神兵装备9位置 */
	public static final int INDEX_SHEN_BING_9 = 19;
	
	/** 将印0位置 */
	public static final int INDEX_WUJING_0 = 20;
	/** 将印1位置  */
	public static final int INDEX_WUJING_1 = 21;
	/** 将印2位置 */
	public static final int INDEX_WUJING_2 = 22;
	/** 将印3位置 */
	public static final int INDEX_WUJING_3 = 23;
	/** 将印4位置 */
	public static final int INDEX_WUJING_4 = 24;
	/** 将印5位置  */
	public static final int INDEX_WUJING_5 = 25;
	/** 将印6位置 */
	public static final int INDEX_WUJING_6 = 26;
	/** 将印7位置 */
	public static final int INDEX_WUJING_7 = 27;
	/** 将印8位置 */
	public static final int INDEX_WUJING_8 = 28;
	/** 将印9位置 */
	public static final int INDEX_WUJING_9 = 29;
	
	/** 转生0位置 */
	public static final int INDEX_REBORN_0 = 30;
	/** 转生1位置  */
	public static final int INDEX_REBORN_1 = 31;
	/** 转生2位置 */
	public static final int INDEX_REBORN_2 = 32;
	/** 转生3位置 */
	public static final int INDEX_REBORN_3 = 33;
	
	//1武将2战甲3神剑4异宝5兵法6宝物7天书
	/** 武将0位置 */
	public static final int INDEX_40 = 40;
	/** 武将1位置  */
	public static final int INDEX_41 = 41;
	/** 武将2位置 */
	public static final int INDEX_42 = 42;
	/** 武将3位置 */
	public static final int INDEX_43 = 43;
	
	/** 战甲0位置 */
	public static final int INDEX_50 = 50;
	/** 战甲1位置  */
	public static final int INDEX_51 = 51;
	/** 战甲2位置 */
	public static final int INDEX_52 = 52;
	/** 战甲3位置 */
	public static final int INDEX_53 = 53;
	
	/** 神剑0位置 */
	public static final int INDEX_60 = 60;
	/** 神剑1位置  */
	public static final int INDEX_61 = 61;
	/** 神剑2位置 */
	public static final int INDEX_62 = 62;
	/** 神剑3位置 */
	public static final int INDEX_63 = 63;
	
	/** 异宝0位置 */
	public static final int INDEX_70 = 70;
	/** 异宝1位置  */
	public static final int INDEX_71 = 71;
	/** 异宝2位置 */
	public static final int INDEX_72 = 72;
	/** 异宝3位置 */
	public static final int INDEX_73 = 73;

	/** 兵法0位置 */
	public static final int INDEX_80 = 80;
	/** 兵法1位置  */
	public static final int INDEX_81 = 81;
	/** 兵法2位置 */
	public static final int INDEX_82 = 82;
	/** 兵法3位置 */
	public static final int INDEX_83 = 83;	
	
	/** 宝物0位置 */
	public static final int INDEX_90 = 90;
	/** 宝物1位置  */
	public static final int INDEX_91 = 91;
	/** 宝物2位置 */
	public static final int INDEX_92 = 92;
	/** 宝物3位置 */
	public static final int INDEX_93 = 93;	
	
	/** 天书0位置 */
	public static final int INDEX_100 = 100;
	/** 天书1位置  */
	public static final int INDEX_101 = 101;
	/** 天书2位置 */
	public static final int INDEX_102 = 102;
	/** 天书3位置 */
	public static final int INDEX_103 = 103;	

	/** 兽灵装备青龙0 */
	public static final int INDEX_110 = 110;
	/** 兽灵装备青龙1 */
	public static final int INDEX_111 = 111;
	/** 兽灵装备青龙 2 */
	public static final int INDEX_112 = 112;
	/** 兽灵装备白虎0 */
	public static final int INDEX_120 = 120;
	/** 兽灵装备白虎1 */
	public static final int INDEX_121 = 121;
	/** 兽灵装备白虎2 */
	public static final int INDEX_122 = 122;
	/** 兽灵装备朱雀0 */
	public static final int INDEX_130 = 130;
	/** 兽灵装备朱雀1 */
	public static final int INDEX_131 = 131;
	/** 兽灵装备朱雀 2 */
	public static final int INDEX_132 = 132;
	/** 兽灵装备玄武0 */
	public static final int INDEX_140 = 140;
	/** 兽灵装备玄武1 */
	public static final int INDEX_141 = 141;
	/** 兽灵装备玄武 2 */
	public static final int INDEX_142 = 142;

	/**
	 * 奖励领取情况 不可领取
	 */
	public static final int REWARD_0=0;
	
	/**
	 * 奖励领取情况 可以领取
	 */
	public static final int REWARD_1=1;
	
	/**
	 * 奖励领取情况 已经领取
	 */
	public static final int REWARD_2=2;
	/**
	 * 7系统觉醒之力—觉醒技能1
	 */
	public static final int JUEXING_SKILL1=1;
	/**
	 * 7系统觉醒之力—觉醒技能2
	 */
	public static final int JUEXING_SKILL2=2;
	/**
	 * 7系统觉醒之力—觉醒技能3
	 */
	public static final int JUEXING_SKILL3=3;
	/**
	 * 7系统觉醒之力—觉醒之力4
	 */
	public static final int JUEXING_SKILL4=4;
	
	
	
	
	/**
	 * 开服最大服数
	 */
	public static final int MAX_ZONEID=9999;
	/**
	 * 截取区号最大值——4
	 */
	public static final int CANNUM_MAX=4;
	
	/**
	 * 退出场景
	 */
	public static final String QUIT_SCENE = "quitScene";
	/**
	 * 退出场景前的场景类型
	 */
	public static final String QUIT_SCENE_TYPE = "QUIT_SCENE_TYPE";
	
	
}
