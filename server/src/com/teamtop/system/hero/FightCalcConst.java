package com.teamtop.system.hero;

import com.teamtop.gameCommon.FieldNotes;

/**
 * 计算战力来源常量
 * @author Administrator
 *
 */
public class FightCalcConst {
	/** 登陆重算战力 */
	@FieldNotes(notes="登陆重算战力", value=1)
	public static final int LOGIN = 1;
	/** 升级重算战力 */
	@FieldNotes(notes="升级重算战力", value=2)
	public static final int LEVELUP = 2;
	@FieldNotes(notes="一键穿戴装备", value=3)
	public static final int WEAREQUIP = 3;
	@FieldNotes(notes="穿戴神装备", value=4)
	public static final int WEARSHENGEQUIP = 4;
	@FieldNotes(notes="装备熔炼", value=5)
	public static final int SMELT = 5;
	@FieldNotes(notes="神装升级", value=6)
	public static final int EQUIP_ORANGE_LV = 6;
	@FieldNotes(notes="神装合成", value=7)
	public static final int EQUIP_ORANGE_COMPOSE = 7;
	@FieldNotes(notes="技能激活", value=8)
	public static final int SKILL_ACTIVE = 8;
	@FieldNotes(notes="技能升级", value=9)
	public static final int SKILL_LVUP= 9;
	@FieldNotes(notes="锻造强化", value=10)
	public static final int FORGE_STRENGTHEN= 10;
	@FieldNotes(notes="锻造宝石", value=11)
	public static final int FORGE_GME= 11;
	@FieldNotes(notes="锻造升星", value=12)
	public static final int FORGE_STARLU= 12;
	@FieldNotes(notes="锻造铸魂", value=13)
	public static final int FORGE_ZHUHUN= 13;
	@FieldNotes(notes="锻造噬魂", value=14)
	public static final int FORGE_SHIHUN= 14;
	@FieldNotes(notes="武将升阶", value=15)
	public static final int WUJIANG_UP_JIE= 15;
	@FieldNotes(notes="武将技能升级", value=16)
	public static final int WUJIANG_UP_SKILL= 16;
	@FieldNotes(notes="武将激活", value=17)
	public static final int WUJIANG_JIHUO= 17;
	@FieldNotes(notes="武将升星", value=18)
	public static final int WUJIANG_UP_STAR= 18;
	@FieldNotes(notes="武将培养丹", value=19)
	public static final int WUJIANG_DAN1= 19;
	@FieldNotes(notes="武将资质丹", value=20)
	public static final int WUJIANG_DAN2= 20;
	@FieldNotes(notes="穿戴将印", value=21)
	public static final int WEARWUJINGEQUIP = 21;
	@FieldNotes(notes="将印合成", value=22)
	public static final int EQUIP_WUJING_COMPOSE = 22;
	@FieldNotes(notes="将印升级", value=23)
	public static final int EQUIP_WUJIANG_LV = 23;
	@FieldNotes(notes="神装套装升阶", value=24)
	public static final int EQUIP_SHENG_UPJIE = 24;
	@FieldNotes(notes="战甲升阶", value=25)
	public static final int ZHANJIA_UP_JIE= 25;
	@FieldNotes(notes="战甲激活", value=26)
	public static final int ZHANJIA_JIHUO= 26;
	@FieldNotes(notes="战甲升星", value=27)
	public static final int ZHANJIA_UP_STAR= 27;
	@FieldNotes(notes="战甲技能升级", value=28)
	public static final int ZHANJIA_UP_SKILL= 28;
	@FieldNotes(notes="战甲套装", value=29)
	public static final int ZHANJIA_UP_TAOZHUANG= 29;
	@FieldNotes(notes="战甲培养丹", value=30)
	public static final int WUJIANG_DAN3= 30;
	@FieldNotes(notes="战甲资质丹", value=31)
	public static final int WUJIANG_DAN4= 31;
	@FieldNotes(notes = "穿脱称号", value = 32)
	public static final int TITLE_WEAR = 32;
	@FieldNotes(notes = "兽灵升级", value = 33)
	public static final int MONSTERSPIRIT_UPGRADE = 33;
	@FieldNotes(notes = "图鉴激活", value = 34)
	public static final int ARCHIVE_ACTIVATE = 34;
	@FieldNotes(notes = "图鉴升级", value = 35)
	public static final int ARCHIVE_UPGRADELEVEL = 35;
	@FieldNotes(notes = "图鉴升星", value = 36)
	public static final int ARCHIVE_UPGRADESTAR = 36;
	@FieldNotes(notes = "图鉴套装", value = 37)
	public static final int ARCHIVE_SET = 37;
	@FieldNotes(notes = "激活兵法", value = 38)
	public static final int BINGFA_JIHUO = 38;
	@FieldNotes(notes = "升阶兵法", value = 39)
	public static final int BINGFA_UPSTAR = 39;
	@FieldNotes(notes = "升阶兵法套装", value = 40)
	public static final int BINGFA_UP_TAOZHUANG = 40;
	@FieldNotes(notes = "星图升级", value = 41)
	public static final int STARPICTURE_UPGRADE = 41;
	@FieldNotes(notes = "激活天书", value = 42)
	public static final int JIHUO_BOOK = 42;
	@FieldNotes(notes = "升级天书星级", value = 43)
	public static final int STAR_BOOK = 43;
	@FieldNotes(notes = "升级天书等级", value = 44)
	public static final int BOOK_UP_LEVL = 44;
	@FieldNotes(notes = "兵法属性丹", value = 45)
	public static final int BINGFA_DAN6 = 45;
	@FieldNotes(notes = "天书属性丹", value = 46)
	public static final int BINGFA_DAN8 = 46;
	@FieldNotes(notes = "宝物升级", value = 47)
	public static final int TREASURE_UPGRADE = 47;
	@FieldNotes(notes = "宝物升星", value = 48)
	public static final int TREASURE_UPGRADESTAR = 48;
	@FieldNotes(notes = "吞噬宝物属性丹", value = 49)
	public static final int TREASURE_EEVOURELIXIR = 49;
	@FieldNotes(notes = "神剑升星", value = 50)
	public static final int EXCALIBUR_UPGRADESTAR = 50;
	@FieldNotes(notes = "吞噬神剑属性丹", value = 51)
	public static final int EXCALIBUR_EEVOURELIXIR = 51;
	@FieldNotes(notes = "吞噬异宝属性丹", value = 52)
	public static final int SPETREASURE_DAN9 = 52;
	@FieldNotes(notes = "将魂升级", value = 53)
	public static final int GENERALSOUL_UPGRADE = 53;
	@FieldNotes(notes = "将魂套装", value = 54)
	public static final int GENERALSOUL_SET = 54;
	@FieldNotes(notes = "提高官职", value = 55)
	public static final int UPLEVEL_GUAN = 55;
	@FieldNotes(notes = "称号进价", value = 56)
	public static final int TITLE_UPGRADE = 56;
	@FieldNotes(notes="背包穿装备", value=57)
	public static final int WEAREQUIP_BYID = 57;
	@FieldNotes(notes="普通技能开启", value=58)
	public static final int SKILL_OPEN = 58;
	@FieldNotes(notes="锻造大师升阶", value=59)
	public static final int FORGE_UP_DASHI= 59;
	@FieldNotes(notes="异宝", value=60)
	public static final int SPECIALTREASURE= 60;
	@FieldNotes(notes="转生", value=61)
	public static final int REBORNLV= 61;
	@FieldNotes(notes = "神技", value = 62)
	public static final int GOD_SKILL = 62;
	@FieldNotes(notes="炼魂大师升级", value=63)
	public static final int EQUIP_BORN_LV = 63;
	@FieldNotes(notes="武将时装升星激活", value=64)
	public static final int FASHIONCLOTHES = 64;
	@FieldNotes(notes="转生装备炼魂升级", value=65)
	public static final int EQUIP_BORN_LIANHUN = 65;
	@FieldNotes(notes="武将附加装备穿戴", value=66)
	public static final int EQUIP_WUJIANG = 66;
	@FieldNotes(notes="战甲附加装备穿戴", value=67)
	public static final int EQUIP_ZHANJIA = 67;
	@FieldNotes(notes="神剑附加装备穿戴", value=68)
	public static final int EQUIP_EXCALIBUR = 68;
	@FieldNotes(notes="异宝附加装备穿戴", value=68)
	public static final int EQUIP_SPECAILTREASUR = 68;	
	@FieldNotes(notes="兵法附加装备穿戴", value=69)
	public static final int EQUIP_BINGFA = 69;	
	@FieldNotes(notes="宝物附加装备穿戴", value=70)
	public static final int EQUIP_TAREASURE= 70;
	@FieldNotes(notes="天书附加装备穿戴", value=71)
	public static final int EQUIP_GODBOOK= 71;
	@FieldNotes(notes="神剑升阶", value=72)
	public static final int UPJIE_SHENGJIE= 72;
	@FieldNotes(notes="异宝升阶", value=73)
	public static final int UPJIE_SPETREASURE= 73;
	@FieldNotes(notes="兵法升阶", value=74)
	public static final int UPJIE_BINGFA= 74;
	@FieldNotes(notes="宝物升阶", value=75)
	public static final int UPJIE_TREASURE= 75;
	@FieldNotes(notes="天书升阶", value=76)
	public static final int UPJIE_GODBOOK= 76;
	@FieldNotes(notes="神剑技能升级", value=77)
	public static final int SHENJIAN_UP_SKILL= 77;
	@FieldNotes(notes="异宝技能升级", value=78)
	public static final int SPETREASURE_UP_SKILL= 78;
	@FieldNotes(notes="兵法技能升级", value=79)
	public static final int BINGFA_UP_SKILL= 79;
	@FieldNotes(notes="宝物技能升级", value=80)
	public static final int TREASURE_UP_SKILL= 80;
	@FieldNotes(notes="天书技能升级", value=81)
	public static final int GODBOOK_UP_SKILL= 81;
	@FieldNotes(notes="武将套装", value=82)
	public static final int WUJIANG_UP_TAOZHUANG= 82;
	@FieldNotes(notes="宝物套装", value=83)
	public static final int TREASURE_UP_TAOZHUANG= 83;
	@FieldNotes(notes="神剑套装", value=84)
	public static final int EXCALIBUR_UP_TAOZHUANG=84;
	@FieldNotes(notes="异宝套装", value=85)
	public static final int SPECIALTRESURE_UP_TAOZHUANG=85;
	@FieldNotes(notes="天书套装", value=86)
	public static final int GODBOOK_UP_TAOZHUANG=86;
	@FieldNotes(notes="符文装备", value=87)
	public static final int DESTINY_EQUIP=87;
	@FieldNotes(notes="符文脱下", value=88)
	public static final int DESTINY_OFF=88;
	@FieldNotes(notes="符文升星", value=89)
	public static final int DESTINY_STAR=89;
	@FieldNotes(notes="符文升级", value=90)
	public static final int DESTINY_LEVEL=90;
	@FieldNotes(notes="神装洗练", value=91)
	public static final int SHENEQUIPCLEAR=91;
	@FieldNotes(notes = "兽灵觉醒星宿升级", value = 92)
	public static final int MONSTER_SPIRIT_STAR_UPGRADE = 92;
	@FieldNotes(notes = "兽灵觉醒洗练", value = 93)
	public static final int MONSTER_SPIRIT_WASHEQUIP = 93;
	@FieldNotes(notes = "兽灵觉醒穿装备", value = 94)
	public static final int MONSTER_SPIRIT_WEAR_EQUIP = 94;
	@FieldNotes(notes = "兽灵觉醒星宿进阶", value = 95)
	public static final int MONSTER_SPIRIT_STARGRADE_UP = 95;
	@FieldNotes(notes = "激活少主", value = 96)
	public static final int JIHUO_LITTLE_LEADER = 96;
	@FieldNotes(notes = "升星少主", value = 97)
	public static final int UPSTAR_LITTLE_LEADER = 97;
	@FieldNotes(notes = "激活/升星少主时装", value = 98)
	public static final int UP_LITTLE_LEADER_CLOTH = 98;
	@FieldNotes(notes = "增加少主亲密度等级", value = 99)
	public static final int UPQIMI_LITTLE_LEADER = 99;
	@FieldNotes(notes = "增加少主主动技能等级", value = 100)
	public static final int UPACTKILL_LITTLE_LEADER = 100;
	@FieldNotes(notes = "少主被动技能变化", value = 101)
	public static final int UPBEIKILL_LITTLE_LEADER = 101;
	@FieldNotes(notes="武将神将之力", value=102)
	public static final int WUJIANG_UP_GODLV= 102;
	//1武将2宝物3神剑4异宝5天书6兵法7战甲 
	@FieldNotes(notes="觉醒技能升级_武将", value=103)
	public static final int JUEXING_UPLV1= 103;
	@FieldNotes(notes="觉醒技能升级_宝物", value=104)
	public static final int JUEXING_UPLV2= 104;
	@FieldNotes(notes="觉醒技能升级_神剑", value=105)
	public static final int JUEXING_UPLV3= 105;
	@FieldNotes(notes="觉醒技能升级_异宝", value=106)
	public static final int JUEXING_UPLV4= 106;
	@FieldNotes(notes="觉醒技能升级_天书", value=107)
	public static final int JUEXING_UPLV5= 107;
	@FieldNotes(notes="觉醒技能升级_兵法", value=108)
	public static final int JUEXING_UPLV6= 108;
	@FieldNotes(notes="觉醒技能升级_战甲", value=109)
	public static final int JUEXING_UPLV7= 109;
	
	@FieldNotes(notes="觉醒之力升阶_武将", value=110)
	public static final int JUEXING_UPJIE1= 110;
	@FieldNotes(notes="觉醒之力升阶_宝物", value=111)
	public static final int JUEXING_UPJIE2= 111;
	@FieldNotes(notes="觉醒之力升阶_神剑", value=112)
	public static final int JUEXING_UPJIE3= 112;
	@FieldNotes(notes="觉醒之力升阶_异宝", value=113)
	public static final int JUEXING_UPJIE4= 113;
	@FieldNotes(notes="觉醒之力升阶_天书", value=114)
	public static final int JUEXING_UPJIE5= 114;
	@FieldNotes(notes="觉醒之力升阶_兵法", value=115)
	public static final int JUEXING_UPJIE6= 115;
	@FieldNotes(notes="觉醒之力升阶_战甲", value=116)
	public static final int JUEXING_UPJIE7= 116;
	@FieldNotes(notes="国家技能升级", value=117)
	public static final int COUNTRYSKILL= 117;
	@FieldNotes(notes="符文大师激活或升级", value=118)
	public static final int DESTINY_MASTER_JIHUOUP=118;
	@FieldNotes(notes="专属神兵神铸", value=119)
	public static final int GODWEAPON_GODFORGE=119;
	@FieldNotes(notes="专属神兵-升星", value=120)
	public static final int GODWEAPON_UPSTAR=120;
	@FieldNotes(notes="专属神兵-专属神兵等级", value=121)
	public static final int GODWEAPON_ZHUANSHULV=121;
	@FieldNotes(notes="专属神兵-淬炼", value=122)
	public static final int GODWEAPON_CUILIANLV=122;
	@FieldNotes(notes = "异兽录", value = 123)
	public static final int SPECIALANIMALDIR = 123;
	@FieldNotes(notes="轮回等级升级", value=124)
	public static final int REINCARNATION= 124;
	@FieldNotes(notes = "异兽录天赋技能", value = 125)
	public static final int SPECIALANIMALDIR_TALENT_SKILL = 125;
	@FieldNotes(notes = "异兽录天赋装备等级", value = 126)
	public static final int SPECIALANIMALDIR_TALENT_EQUIP_LEVEL = 126;
	@FieldNotes(notes = "异兽录天赋全部升品", value = 127)
	public static final int SPECIALANIMALDIR_TALENT_EQUIP_QUALITY = 127;
	@FieldNotes(notes = "神将天赋", value = 128)
	public static final int SHENJIANG_TF = 128;
	@FieldNotes(notes = "激活奇策", value = 129)
	public static final int QICE_JIHUO = 129;
	@FieldNotes(notes = "升星奇策", value = 130)
	public static final int QICE_UPSTAR = 130;
	@FieldNotes(notes = "升级奇策套装", value = 131)
	public static final int QICE_UP_TAOZHUANG = 131;
	@FieldNotes(notes = "奇策属性丹(兵魂/将魂)", value = 132)
	public static final int QICE_DAN = 132;
	@FieldNotes(notes = "奇策升阶", value = 133)
	public static final int UPJIE_QICE = 133;
	@FieldNotes(notes = "阵眼", value = 134)
	public static final int ZHEN_YAN = 134;
	@FieldNotes(notes = "成就大师激活/升级", value = 135)
	public static final int UP_ACHIEVEMENT = 135;
	@FieldNotes(notes = "轮回-天命升级，升品", value = 136)
	public static final int REINCARNATION_GODFATE = 136;
	@FieldNotes(notes = "武将神将之力技能进阶", value = 137)
	public static final int WUJIANG_GOD_SKILL_UP = 137;
	@FieldNotes(notes = "少主进修学堂", value = 138)
	public static final int UP_FURTHEREDUCATION = 138;
	@FieldNotes(notes = "少主六艺升级", value = 139)
	public static final int UP_SIXARTSLV = 139;
	@FieldNotes(notes = "少主潜能升级", value = 140)
	public static final int UP_QIANNENG = 140;
	@FieldNotes(notes = "少主潜能服食丹药", value = 141)
	public static final int SWALLOW = 141;
	@FieldNotes(notes = "坐骑升星", value = 142)
	public static final int MOUNT_STAR = 142;
	@FieldNotes(notes = "坐骑升级", value = 143)
	public static final int MOUNT_UP_LEVEL = 143;
	@FieldNotes(notes = "觉醒技能升级_神将", value = 144)
	public static final int JUEXING_UPLV8 = 144;
	@FieldNotes(notes = "觉醒之力升阶_神将", value = 145)
	public static final int JUEXING_UPJIE8 = 145;

	@FieldNotes(notes = "侍女升星", value = 146)
	public static final int MAID_UPSTAR = 146;
	@FieldNotes(notes = "侍女激活", value = 147)
	public static final int MAID_JIHUO = 147;
	@FieldNotes(notes = "侍女升级", value = 148)
	public static final int MAID_UPLEVEL = 148;
	@FieldNotes(notes = "家丁升级", value = 149)
	public static final int HOUSEKEEPER_UPLEVEL = 149;
	@FieldNotes(notes = "家丁晋升", value = 150)
	public static final int HOUSEKEEPER_UP = 150;
	
	@FieldNotes(notes="轮回印记装备", value=151)
	public static final int SIXWAY_EQUIP=151;
	@FieldNotes(notes="轮回印记替换", value=152)
	public static final int SIXWAY_CHANGE=152;
	@FieldNotes(notes="轮回印记脱下", value=153)
	public static final int SIXWAY_OFF=153;
	@FieldNotes(notes="轮回印记升级", value=154)
	public static final int SIXWAY_UPLEVEL=154;
	@FieldNotes(notes="轮回印记升星", value=155)
	public static final int SIXWAY_UPSTAR=155;
	
	@FieldNotes(notes = "坐骑幻化激活", value = 156)
	public static final int MOUNT_UNREAL = 156;
	@FieldNotes(notes = "坐骑幻化升级", value = 157)
	public static final int MOUNTUNREAL_UP_LEVEL = 157;
	
	@FieldNotes(notes = "升级府邸等级", value = 158)
	public static final int UP_HOUSE_LV = 158;
	@FieldNotes(notes = "升级装饰等级", value = 159)
	public static final int UP_DECORATE_LV = 159;
	
	


	
}
