package com.teamtop.gameCommon;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.lang.reflect.Field;

/**
 * 物品流水，记录物品获得、消耗、其他操作的长两类
 * @author kyle
 *
 */
public class SourceGoodConst {
	/**
	 * 流水操作，没有变化
	 */
	public static final int FLOW_OPER_NO_CHANGE= 3;
	/**
	 * 流水操作，增加
	 */
	public static final int FLOW_OPER_ADD = 1;
	/**
	 * 流水操作，减少
	 */
	public static final int FLOW_OPER_REDUCE = 2;
	/**
	 * 流水操作，内部元宝增加
	 */
	public static final int FLOW_OPER_INDOOR_ADD = 3;
	/**
	 * 流水操作，内部元宝消耗
	 */
	public static final int FLOW_OPER_INDOOR_REDUCE = 4;
	
	
	//-------------操作原因100开始----------------
	/**GM工具使用*/
	@FieldNotes(notes="GM工具使用", value=100)
	public static final int USE_GM = 100;
	/** 装备新增 */
	@FieldNotes(notes="装备新增", value=101)
	public static final int EQUIP_ADD = 101;
	/** 装备销毁 */
	@FieldNotes(notes="装备销毁", value=102)
	public static final int EQUIP_DELETE = 102;
	/** 穿装备 */
	@FieldNotes(notes="穿装备", value=103)
	public static final int EQUIP_WEAR = 103;
	/** 脱装备 */
	@FieldNotes(notes="脱装备", value=104)
	public static final int EQUIP_UNWEAR = 104;
	/** 装备熔炼**/
	@FieldNotes(notes="装备熔炼", value=105)
	public static final int SMELT = 105;
	/** 神装升级 */
	@FieldNotes(notes="神装升级", value=106)
	public static final int EQUIP_ORANGE_LV = 106;
	/** 神装合成 */
	@FieldNotes(notes="神装合成", value=107)
	public static final int EQUIP_ORANGE_COMPOSE = 107;
	/**神装分解 */
	@FieldNotes(notes="神装分解", value=108)
	public static final int EQUIP_ORANGE_DECOMPOSE = 108;
	/**一键锻造强化 */
	@FieldNotes(notes="一键锻造强化", value=109)
	public static final int FORGE_ONEKEY_STRENGTHEN = 109;	
	/** 锻造 */
	@FieldNotes(notes="锻造强化", value=110)
	public static final int FORGE_STRENGTHEN = 110;	
	/** 镶嵌宝石 */
	@FieldNotes(notes="镶嵌宝石", value=111)
	public static final int FORGE_GEM = 111;
	/** 拆除宝石 */
	@FieldNotes(notes="拆除宝石", value=112)
	public static final int FORGE_GEM_CHAI = 112;
	/** 宝石合成 */
	@FieldNotes(notes="宝石合成", value=113)
	public static final int FORGE_GEM_HECHEN = 113;
	/** 锻造装备升星 */
	@FieldNotes(notes="锻造装备升星", value=114)
	public static final int FORGE_SATR = 114;
	/** 锻造装备铸魂 */
	@FieldNotes(notes="锻造装备铸魂", value=115)
	public static final int FORGE_ZHU_HUN= 115;
	/** 锻造装备噬魂 */
	@FieldNotes(notes="锻造装备噬魂", value=116)
	public static final int FORGE_SHI_HUN= 116;
	/** 阵眼升级*/
	@FieldNotes(notes="技能升级", value=117)
	public static final int PHOTOCENTER_UPGRADE = 117;
	/** 技能升级*/
	@FieldNotes(notes="技能升级", value=118)
	public static final int SKILL_UPGRADE = 118;
	/**关卡怪物掉落 */
	@FieldNotes(notes="关卡怪物掉落", value=119)
	public static final int GUANQIA_ZHANG_REWARD = 119;
	/** 道具使用*/
	@FieldNotes(notes="道具使用", value=120)
	public static final int USE_MATERIAL = 120;
	/** 邮件附件*/
	@FieldNotes(notes="邮件附件", value=121)
	public static final int MAIL_FUJIAN = 121;
	/** 后台使用*/
	@FieldNotes(notes="后台使用", value=123)
	public static final int USE_HOUTAI = 123;
	/** 背包开启格子*/
	@FieldNotes(notes="背包开启格子", value=124)
	public static final int BAG_OPEN_GRID = 124;
	/** 改名 */
	@FieldNotes(notes="改名消耗物品", value=125)
	public static final int CHANGE_NAME = 125;
	/** 充值接口 */
	@FieldNotes(notes="充值接口", value=126)
	public static final int RECHARGE = 126;
	/**军团战复活*/
	@FieldNotes(notes = "军团战复活", value = 127)
	public static final int GANGWAR_REVIVE = 127;
	/** 军团创建 */
	@FieldNotes(notes = "军团创建", value = 128)
	public static final int GANG_CREATE = 128;
	/** 军团改名 */
	@FieldNotes(notes = "军团改名", value = 129)
	public static final int GANG_CHANGENAME = 129;
	/** 军团捐献 */
	@FieldNotes(notes = "军团捐献", value = 130)
	public static final int GANG_DONATE = 130;
	/** 军团弹劾 */
	@FieldNotes(notes = "军团弹劾", value = 131)
	public static final int GANG_IMPEACH = 131;
	/**军团改名*/
	@FieldNotes(notes = "军团改名", value = 132)
	public static final int GANG_RENAME = 132;
	/**招财活动消耗元宝抽奖*/
	@FieldNotes(notes = "招财活动消耗元宝抽奖", value = 133)
	public static final int USE_ZHAO_CAI_SPEND = 133;
	/** 关卡boss掉落 */
	@FieldNotes(notes = "关卡boss掉落", value = 134)
	public static final int GUANQIA_BOSS_DROP = 134;
	/** 关卡离线收益 */
	@FieldNotes(notes = "关卡离线收益", value = 135)
	public static final int GUANQIA_OFFLINE = 135;
	/** 关卡扫荡消耗 */
	@FieldNotes(notes = "关卡扫荡消耗", value = 136)
	public static final int GUANQIA_MOPUP_COST = 136;
	/** 关卡扫荡收益 */
	@FieldNotes(notes = "关卡扫荡收益", value = 137)
	public static final int GUANQIA_MOPUP_GET = 137;
	/** 关卡斩杀奖励 */
	@FieldNotes(notes = "关卡斩杀奖励", value = 138)
	public static final int GUANQIA_KILL_AWARD = 138;
	/** 武将升阶*/
	@FieldNotes(notes="武将升阶", value=139)
	public static final int WUJIANG_UP_JIE = 139;
	/** 武将升级技能*/
	@FieldNotes(notes="武将升级技能", value=140)
	public static final int WUJIANG_UP_SKILL = 140;
	/** 激活武将*/
	@FieldNotes(notes="激活武将", value=141)
	public static final int WUJIANG_JIHUO = 141;
	/** 升星武将*/
	@FieldNotes(notes="升星武将", value=142)
	public static final int WUJIANG_UP_STAR = 142;
	/**武将培养丹*/
	@FieldNotes(notes="武将属性丹", value=143)
	public static final int WUJIANG_DAN1 = 143;
	/**武将资质丹*/
	@FieldNotes(notes="武将资质丹", value=144)
	public static final int WUJIANG_DAN2 = 144;
	/** 将印合成 */
	@FieldNotes(notes="将印合成 ", value=145)
	public static final int EQUIP_WUJIANG_COMPOSE = 145;
	/** 将印升级 */
	@FieldNotes(notes="将印升级", value=146)
	public static final int EQUIP_WUJIANG_LV = 146;
	/**将印分解 */
	@FieldNotes(notes="将印分解", value=147)
	public static final int EQUIP_WUJING_DECOMPOSE = 147;
	/** 战甲升阶*/
	@FieldNotes(notes="战甲升阶", value=148)
	public static final int ZHANJIA_UP_JIE = 148;
	/** 战甲激活*/
	@FieldNotes(notes="战甲武将", value=149)
	public static final int ZHANJIA_JIHUO = 149;
	/** 战甲升星*/
	@FieldNotes(notes="战甲升星", value=150)
	public static final int ZHANJIA_UP_STAR = 150;
	/** 战甲升级技能*/
	@FieldNotes(notes="战甲升级技能", value=151)
	public static final int ZHANJIA_UP_SKILL = 151;
	/** 战甲套装升级*/
	@FieldNotes(notes="战甲套装升级", value=152)
	public static final int ZHANJIA_UP_TAOZHUANG = 152;
	/**战甲培养丹*/
	@FieldNotes(notes="战甲属性丹", value=153)
	public static final int WUJIANG_DAN3 = 153;
	/**战甲资质丹*/
	@FieldNotes(notes="战甲资质丹", value=154)
	public static final int WUJIANG_DAN4 = 154;
	/** 兽灵升级 */
	@FieldNotes(notes = "兽灵升级", value = 155)
	public static final int MONSTERSPIRIT_UPGRADE = 155;
	/** 升级官衔 */
	@FieldNotes(notes = "升级官衔", value = 156)
	public static final int GUANZHI_UP = 156;
	/** 图鉴升级 */
	@FieldNotes(notes = "图鉴升级", value = 157)
	public static final int ARCHIVE_UPGRADE_LEVEL = 157;
	/** 图鉴升星 */
	@FieldNotes(notes = "图鉴升星", value = 158)
	public static final int ARCHIVE_UPGRADE_STAR = 158;
	/** 激活兵法 */
	@FieldNotes(notes = "激活兵法", value = 159)
	public static final int BINGFA_JIHUO = 159;
	/** 升星兵法 */
	@FieldNotes(notes = "升星兵法", value = 160)
	public static final int BINGFA_UPSTAR = 160;
	/** 兵法套装升级*/
	@FieldNotes(notes="兵法套装升级", value=161)
	public static final int BINGFA_UP_TAOZHUANG = 161;
	/**兵法属性丹*/
	@FieldNotes(notes="兵法属性丹", value=162)
	public static final int BINGFA_DAN6 = 162;
	/** 星图升级 */
	@FieldNotes(notes = "星图升级", value = 163)
	public static final int STARPICTURE_UPGRADE = 163;
	/** 天书升星 */
	@FieldNotes(notes = "天书升星", value = 164)
	public static final int STAR_BOOK = 164;
	/** 激活升级 */
	@FieldNotes(notes = "激活升级", value = 165)
	public static final int JIHUO_BOOK = 165;
	/**天书属性丹*/
	@FieldNotes(notes="天书属性丹", value=166)
	public static final int BINGFA_DAN8 = 166;
	/** 宝物升级 */
	@FieldNotes(notes = "宝物升级", value = 167)
	public static final int TREASURE_UPGRADE = 167;
	/** 宝物升星 */
	@FieldNotes(notes = "宝物升星", value = 168)
	public static final int TREASURE_UPGRADESTAR = 168;
	/** 宝物属性丹吞噬 */
	@FieldNotes(notes = "宝物属性丹吞噬", value = 169)
	public static final int TREASURE_DAN5 = 169;
	/** 转生奖励 */
	@FieldNotes(notes = "转生奖励", value = 170)
	public static final int REBRON_REWARD= 170;
	/** 神剑升星 */
	@FieldNotes(notes = "神剑升星", value = 171)
	public static final int EXCALIBUR_UPGRADESTAR = 171;
	/** 神剑属性丹吞噬 */
	@FieldNotes(notes = "神剑属性丹吞噬", value = 172)
	public static final int EXCALIBUR_DAN7 = 172;
	/**异宝激活升星*/
	@FieldNotes(notes = "异宝激活升星", value = 173)
	public static final int SPETREASURE_STAR = 173;
	/**异宝属性丹*/
	@FieldNotes(notes="异宝属性丹", value=174)
	public static final int SPETREASURE_DAN9 = 174;
	/**每日任务奖励*/
	@FieldNotes(notes="每日任务奖励", value=175)
	public static final int DAYTASK_REWARD = 175;
	/**每日任务宝箱奖励*/
	@FieldNotes(notes="每日任务宝箱奖励", value=176)
	public static final int DAYBOX_REWARD = 176;	
	/** 将魂 */
	@FieldNotes(notes = "将魂", value = 178)
	public static final int GENERAL_SOUL = 178;
	/** 商店刷新 */
	@FieldNotes(notes = "商店刷新", value = 179)
	public static final int SHOP_REFRESH = 179;
	/** 商店购买 */
	@FieldNotes(notes = "商店购买", value = 180)
	public static final int SHOP_BUY = 180;
	/** 称号进阶 */
	@FieldNotes(notes = "称号进阶", value = 181)
	public static final int TITLE_UPGRADE = 181;
	/** 背包穿装备 */
	@FieldNotes(notes = "背包穿装备", value = 182)
	public static final int WEAREQUIP_BYID = 182;	
	/** 个人boss掉落 */
	@FieldNotes(notes = "个人boss掉落", value = 183)
	public static final int PERSONAL_BOSS_DROP = 183;
	/** 铜雀台双倍奖励 */
	@FieldNotes(notes = "铜雀台双倍奖励", value = 184)
	public static final int  TOWER_DOUBLE= 184;
	/** 铜雀台掉落 */
	@FieldNotes(notes = "铜雀台掉落", value = 185)
	public static final int TOWER_DROP = 185;
	/** 一骑当千购买挑战次数 */
	@FieldNotes(notes = "一骑当千购买挑战次数", value = 186)
	public static final int BATTLE_VIXENS_BUY = 186;
	/** 一骑当千通关 */
	@FieldNotes(notes = "一骑当千通关", value = 187)
	public static final int BATTLE_VIXENS_PASS = 187;
	/** 一骑当千首冲 */
	@FieldNotes(notes = "一骑当千首冲", value = 188)
	public static final int BATTLE_VIXENS_FIRST = 188;
	/** 一骑当千系统开启 */
	@FieldNotes(notes = "一骑当千系统开启", value = 189)
	public static final int BATTLE_VIXENS_OPEN = 189;
	/** 图鉴系统开启 */
	@FieldNotes(notes = "图鉴系统开启", value = 190)
	public static final int ARCHIVE_OPEN = 190;
	/** 个人boss系统开启 */
	@FieldNotes(notes = "个人boss系统开启", value = 191)
	public static final int PERSONAL_BOSS_OPEN = 191;
	/** 神剑系统开启 */
	@FieldNotes(notes = "神剑系统开启", value = 192)
	public static final int EXCALIBUR_OPEN = 192;
	/** 将魂系统开启 */
	@FieldNotes(notes = "将魂系统开启", value = 193)
	public static final int GENERALSOUL_OPEN = 193;
	/** 兽灵系统开启 */
	@FieldNotes(notes = "兽灵系统开启", value = 194)
	public static final int MONSTER_SPIRIT_OPEN = 194;
	/** 技能系统开启 */
	@FieldNotes(notes = "技能系统开启", value = 195)
	public static final int SKILL_OPEN = 195;
	/** 星图系统开启 */
	@FieldNotes(notes = "星图系统开启", value = 196)
	public static final int STAR_PICTURE_OPEN = 196;
	/** 称号系统开启 */
	@FieldNotes(notes = "称号系统开启", value = 197)
	public static final int TITLE_OPEN = 197;
	/** 宝物系统开启 */
	@FieldNotes(notes = "宝物系统开启", value = 198)
	public static final int TREASURE_OPEN = 198;
	/** 全名boss掉落 */
	@FieldNotes(notes = "全名boss掉落", value = 199)
	public static final int QM_BOSS_DROP = 199;
	/** 全名bossMVP */
	@FieldNotes(notes = "全名bossMVP", value = 201)
	public static final int QM_BOSS_MVP = 201;
	/**系统开启_奖励*/
	@FieldNotes(notes = "系统开启_奖励", value = 202)
	public static final int SYS_OPEN = 202;
	/**材料副本奖励*/
	@FieldNotes(notes = "材料副本奖励", value = 203)
	public static final int MATERIAL_FUBEN = 203;
	/**扫荡材料副本奖励*/
	@FieldNotes(notes = "扫荡材料副本奖励", value = 204)
	public static final int MATERIALSAO_FUBEN = 204;
	/**材料副本购买次数*/
	@FieldNotes(notes = "材料副本购买次数", value = 205)
	public static final int BUY_MATERIAL_FUBEN = 205;
	/** 三国战神系统开启 */
	@FieldNotes(notes = "三国战神系统开启", value = 206)
	public static final int GOD_OF_WAR_OPEN = 206;
	/** 三国战神购买挑战次数 */
	@FieldNotes(notes = "三国战神购买挑战次数", value = 207)
	public static final int GOD_OF_WAR_BUY = 207;
	/** 三国战神挑战结果 */
	@FieldNotes(notes = "三国战神挑战结果", value = 208)
	public static final int GOD_OF_WAR_CHA_RESULT = 208;
	/** 三国战神挑战晋升奖励 */
	@FieldNotes(notes = "三国战神挑战晋升奖励", value = 209)
	public static final int GOD_OF_WAR_CHA_UPGRADE = 209;
	/**随机国家_奖励*/
	@FieldNotes(notes = "随机国家_奖励", value = 210)
	public static final int RANDOM_COUNTRY = 210;
	/**铜钱捐献_奖励*/
	@FieldNotes(notes = "铜钱捐献", value = 211)
	public static final int COIN_DONATION = 211;
	/**元宝捐献_奖励*/
	@FieldNotes(notes = "元宝捐献", value = 212)
	public static final int YUANBAO_DONATION = 212;
	/** 魔神参与奖励 */
	@FieldNotes(notes = "魔神参与奖励", value = 213)
	public static final int MONSTER_GOD_REWARD = 213;
	/** 魔神买活 */
	@FieldNotes(notes = "魔神买活", value = 214)
	public static final int MONSTER_GOD_BUYLIVE = 214;
	/** 南征北战挑战次数购买 */
	@FieldNotes(notes = "南征北战挑战次数购买", value = 215)
	public static final int FNS_BUY_CHA = 215;
	/** 南征北战积分奖励 */
	@FieldNotes(notes = "南征北战积分奖励", value = 216)
	public static final int FNS_SCORE_AWARD = 216;
	/** 南征北战战斗失败 */
	@FieldNotes(notes = "南征北战战斗失败", value = 217)
	public static final int FNS_LOSE = 217;
	/** 南征北战战斗胜利 */
	@FieldNotes(notes = "南征北战战斗胜利", value = 218)
	public static final int FNS_WIN = 218;
	/** 过关斩将首次通过 */
	@FieldNotes(notes = "过关斩将首次通过", value = 219)
	public static final int RUNNINGMAN_DOUBLE = 219;
	/** 过关斩将通关 */
	@FieldNotes(notes = "过关斩将通关", value = 220)
	public static final int RUNNINGMAN_REWARD = 220;
	/** 称号激活 */
	@FieldNotes(notes = "称号激活", value = 221)
	public static final int TITLE_ACTIVE = 221;
	/**跨服boss-七擒孟获买活 */
	@FieldNotes(notes = "跨服boss-七擒孟获买活 ", value = 222)
	public static final int CROSS_BUY_LIVE = 222;
	/**跨服boss-七擒孟获购买进入次数 */
	@FieldNotes(notes = "跨服boss-七擒孟获购买进入次数", value = 223)
	public static final int CROSS_BUY_NUM = 223;
	/**跨服boss-七擒孟获购目标伤害奖励 */
	@FieldNotes(notes = "跨服boss-七擒孟获购目标伤害奖励", value = 224)
	public static final int CROSS_GOAL_HURT = 224;
	/**跨服boss-七擒孟获购买攻击加成 */
	@FieldNotes(notes = "跨服boss-七擒孟获购买攻击加成", value = 225)
	public static final int CROSS_BUY_ATT = 225;
	/** 单刀赴会每日奖励 */
	@FieldNotes(notes = "单刀赴会每日奖励", value = 226)
	public static final int SOLORUN_DAILY_AWARD = 226;
	/** 单刀赴会晋升奖励 */
	@FieldNotes(notes = "单刀赴会晋升奖励", value = 227)
	public static final int SOLORUN_GRADE_AWARD = 227;
	/** 单刀赴会购买挑战次数 */
	@FieldNotes(notes = "单刀赴会购买挑战次数", value = 228)
	public static final int SOLORUN_BUY_CHA = 228;
	/** 单刀赴会战斗胜利 */
	@FieldNotes(notes = "单刀赴会战斗胜利", value = 229)
	public static final int SOLORUN_FIGHT_WIN = 229;
	/** 单刀赴会战斗失败 */
	@FieldNotes(notes = "单刀赴会战斗失败", value = 230)
	public static final int SOLORUN_FIGHT_LOSE = 230;
	/**王者之争挑战次数购买*/
	@FieldNotes(notes = "王者之争挑战次数购买", value = 231)
	public static final int KS_BUY_CHA = 231;
	/**王者之争挑战失败奖励*/
	@FieldNotes(notes = "王者之争挑战失败奖励", value = 232)
	public static final int KS_CHA_FAIL = 232;
	/**王者之争挑战胜利奖励*/
	@FieldNotes(notes = "王者之争挑战胜利奖励", value = 233)
	public static final int KS_CHA_SUCCESS = 233;
	/**王者之争膜拜奖励*/
	@FieldNotes(notes = "王者之争挑战胜利奖励", value = 234)
	public static final int KS_MOBAI_AWARDS = 234;
	/**功能开启关卡奖励*/
	@FieldNotes(notes = "功能开启关卡奖励", value = 235)
	public static final int FS_GUANQIA_AWARDS = 235;
	/**七日登录领取奖励*/
	@FieldNotes(notes = "七日登录领取奖励", value = 236)
	public static final int SD_LOGIN_AWARDS = 236;
	/**每日首充宝箱领取*/
	@FieldNotes(notes = "每日首充宝箱领取", value = 237)
	public static final int DFR_BAOXIANG_AWARDS = 237;
	/**每日首充奖励*/
	@FieldNotes(notes = "每日首充奖励", value = 238)
	public static final int DFR_AWARDS = 238;
	/**首充奖励*/
	@FieldNotes(notes = "首充奖励", value = 239)
	public static final int FIRSTRECHARGE_AWARDS = 239;
	/** 三国无双下注消耗 */
	@FieldNotes(notes = "三国无双下注消耗", value = 240)
	public static final int DYNASTY_WARRIORS_BET_COST = 240;
	/** 三国无双奖池奖励 */
	@FieldNotes(notes = "三国无双奖池奖励", value = 241)
	public static final int DYNASTY_WARRIORS_POND_AWARD = 241;
	/**购买乱世枭雄次数花费**/
	@FieldNotes(notes = "购买乱世枭雄次数花费", value = 242)
	public static final int BUY_CROSSKING_NUM = 242;
	/**乱世枭雄挑战奖励**/
	@FieldNotes(notes = "乱世枭雄挑战奖励", value = 243)
	public static final int CROSSKING_BATTLE_REWARD = 243;
	/**乱世枭雄换一批消耗**/
	@FieldNotes(notes = "乱世枭雄换一批消耗", value = 244)
	public static final int CROSSKING_CHANGE_COST = 244;
	/**乱世枭积分宝箱奖励**/
	@FieldNotes(notes = "乱世枭积分宝箱奖励", value = 245)
	public static final int CROSSKING_JF_REWARD = 245;
	/**隆中对结束发放奖励**/
	@FieldNotes(notes = "隆中对发放奖励", value = 246)
	public static final int LONGZHONGDUI_REWARD = 246;
	/**隆中对答对发放奖励**/
	@FieldNotes(notes = "隆中对答对发放奖励", value = 247)
	public static final int LONGZHONGDUI_AWARD = 247;
	/**宝库道具兑换**/
	@FieldNotes(notes = "宝库道具兑换", value = 248)
	public static final int TREASURY_EXCHANGE  = 248;
	/**宝库兑换奖励**/
	@FieldNotes(notes = "宝库兑换奖励", value = 249)
	public static final int TREASURY_AWARD  = 249;
	/** 晋升等级奖励 */
	@FieldNotes(notes = "晋升等级奖励", value = 250)
	public static final int PROMOTION_LVL_REWARD = 250;
	/** 晋升等级奖励 额外限时奖励 */
	@FieldNotes(notes = "晋升等级奖励 额外限时奖励", value = 251)
	public static final int PROMOTION_LVL_EXT_REWARD = 251;
	/** VIP奖励 */
	@FieldNotes(notes = "VIP奖励", value = 252)
	public static final int VIP_AWARD = 252;
	/** 充值5倍返利 */
	@FieldNotes(notes = "充值5倍返利", value = 253)
	public static final int RECHARGE_FIVETIMES = 253;
	/** 聚宝盆购买礼包 */
	@FieldNotes(notes = "聚宝盆购买礼包", value = 254)
	public static final int COLLECTTREASURY_BUYGIFTBAG = 254;
	/** 聚宝盆领取奖励 */
	@FieldNotes(notes = "聚宝盆领取奖励", value = 255)
	public static final int COLLECTTREASURY_AWARD = 255;
	/** 特权卡激活奖励 */
	@FieldNotes(notes = "特权卡激活奖励", value = 256)
	public static final int PRIVILEGECARD_GET_REWARD = 256;
	/** 特权卡每日奖励 */
	@FieldNotes(notes = "特权卡每日奖励", value = 257)
	public static final int PRIVILEGECARD_DAILY_REWARD = 257;
	/** 签到奖励 */
	@FieldNotes(notes = "签到奖励", value = 258)
	public static final int SIGNIN_AWARD = 258;
	/** 补签消耗元宝 */
	@FieldNotes(notes = "补签消耗元宝", value = 259)
	public static final int SIGNIN_CONSUME = 259;
	/** 累签宝箱奖励奖励 */
	@FieldNotes(notes = "累签宝箱奖励", value = 260)
	public static final int SIGNIN_BAOXIANGAWARD = 260;
	/** 枭雄争霸押注消耗 */
	@FieldNotes(notes = "枭雄争霸押注消耗", value = 261)
	public static final int BUYWIN_COST = 261;
	/** 枭雄争霸膜拜奖励*/
	@FieldNotes(notes = "枭雄争霸膜拜奖励", value = 262)
	public static final int CROSS_MOBAI_REWARD=262;
	/** 枭雄争霸冠军服奖励*/
	@FieldNotes(notes = "枭雄争霸冠军服奖励", value = 263)
	public static final int CROSS_CHAMPOIN_REWARD=263;
	/** 群英榜积分奖励 */
	@FieldNotes(notes = "群英榜积分奖励", value = 264)
	public static final int HEROESLIST_SCORE_REWARD = 264;
	/** 激活码兑换奖励*/
	@FieldNotes(notes = "激活码兑换奖励", value = 265)
	public static final int CDKEY_REWARD=265;
	/** 玲珑阁玲珑币购买消耗*/
	@FieldNotes(notes = "玲珑阁玲珑币购买消耗", value = 266)
	public static final int LINGLONGGE_LLBBUY_CONSUME=266;
	/** 玲珑阁元宝购买消耗*/
	@FieldNotes(notes = "玲珑阁元宝购买消耗", value = 267)
	public static final int LINGLONGGE_YBBUY_CONSUME=267;
	/** 玲珑阁购买获得的固定奖励*/
	@FieldNotes(notes = "玲珑阁购买获得的固定奖励", value = 268)
	public static final int LINGLONGGE_BUY_FIXAWARD=268;
	/** 玲珑阁购买获得的抽奖奖励*/
	@FieldNotes(notes = "玲珑阁购买获得的抽奖奖励", value = 269)
	public static final int LINGLONGGE_BUY_AWARD=269;
	/** 玲珑阁每日积分宝箱奖励*/
	@FieldNotes(notes = "玲珑阁每日积分宝箱奖励", value = 270)
	public static final int LINGLONGGE_SCOREBX_AWARD=270;
	/** 玲珑阁每日积分排行奖励*/
	@FieldNotes(notes = "玲珑阁每日积分排行奖励", value = 271)
	public static final int LINGLONGGE_SCORERANK_AWARD=271;
	/** 7日武圣榜*/
	@FieldNotes(notes = "7日武圣榜", value = 272)
	public static final int WUSHENGOAL=272;
	/** 开服狂欢*/
	@FieldNotes(notes = "开服狂欢", value = 273)
	public static final int SEVENHAPP=273;	
	/** 单笔充值*/
	@FieldNotes(notes = "单笔充值", value = 274)
	public static final int ONERECHARGE_AWARD=274;	
	/** 登录豪礼 */
	@FieldNotes(notes = "登录豪礼", value = 275)
	public static final int LOGIN_LUXURY_GIFTS = 275;
	/** 超值材料返利 */
	@FieldNotes(notes = "超值材料返利", value = 276)
	public static final int OVERCALLBACKCONST_CL_AWARD = 276;
	/** 超值元宝返利 */
	@FieldNotes(notes = "超值元宝返利", value = 277)
	public static final int OVERCALLBACKCONST_YB_AWARD = 277;
	/** 累计充值(活动) */
	@FieldNotes(notes = "累计充值(活动)", value = 278)
	public static final int ACT_TORALRECHARGE = 278;
	/**单日充值 */
	@FieldNotes(notes = "单日充值 ", value = 279)
	public static final int ACT_DAYRECHARGE = 279;
	/**全民狂欢 */
	@FieldNotes(notes = "全民狂欢", value = 280)
	public static final int ACT_QIANMINGHAPPY = 280;
	/** 超值转盘抽奖奖励 */
	@FieldNotes(notes = "超值转盘抽奖奖励", value = 281)
	public static final int OVERTURNTABLE_RANDAWARD = 281;
	/** 超值转盘领取宝箱奖励 */
	@FieldNotes(notes = "超值转盘领取宝箱奖励", value = 282)
	public static final int OVERTURNTABLE_BXAWARD = 282;
	/**任务获得 */
	@FieldNotes(notes = "任务获得", value = 283)
	public static final int TASK_REWARD = 283;
	/**全民狂欢-全民boss */
	@FieldNotes(notes = "全民狂欢-全民boss", value = 284)
	public static final int HAPPYQMBOSS_REWARD = 284;
	/**超级点将(活动)抽取奖励 */
	@FieldNotes(notes = "超级点将(活动)抽取奖励", value = 285)
	public static final int HYPERPOINTGENERAL_ACT_AWARD = 285;
	/**折扣商店购买消耗元宝 */
	@FieldNotes(notes = "折扣商店购买消耗元宝", value = 286)
	public static final int DISCOUNTSTORE_BUYCONYB = 286;
	/**折扣商店购买物品 */
	@FieldNotes(notes = "折扣商店购买物品", value = 287)
	public static final int DISCOUNTSTORE_BUYITEM = 287;
	/**合成消耗 */
	@FieldNotes(notes = "合成消耗", value = 288)
	public static final int COST_HECHENG = 288;
	/**合成获得 */
	@FieldNotes(notes = "合成获得", value = 289)
	public static final int INCOME_HECHENG = 289;
	/**分解消耗 */
	@FieldNotes(notes = "分解消耗", value = 290)
	public static final int COST_FENJIE= 290;
	/**分解获得 */
	@FieldNotes(notes = "分解获得", value = 291)
	public static final int INCOME_FENJIE= 291;
	/** 晋升激活奖励 */
	@FieldNotes(notes = "晋升激活奖励", value = 292)
	public static final int PROMOTION_ACTIVATE = 292;
	/** 晋升任务奖励 */
	@FieldNotes(notes = "晋升任务奖励", value = 293)
	public static final int PROMOTION_TASK_REWARD = 293;
	/** 分享奖励 */
	@FieldNotes(notes = "分享奖励", value = 294)
	public static final int SHOW_REWARD = 294;	
	/** 超值材料返利消耗 */
	@FieldNotes(notes = "超值材料返利消耗", value = 295)
	public static final int OVERCALLBACKCONST_CL_CONSUME = 295;
	/** 超值元宝返利消耗 */
	@FieldNotes(notes = "超值元宝返利消耗", value = 296)
	public static final int OVERCALLBACKCONST_YB_CONSUME = 296;
	/** 改名卡 */
	@FieldNotes(notes = "改名卡", value = 297)
	public static final int CHARGENAMECARD_CONSUME = 297;
	/** 7日连续充值*/
	@FieldNotes(notes = "7日连续充值", value = 298)
	public static final int SEVENAWAYRECHARGE_REWARD = 298;
	/**连续充值活动*/
	@FieldNotes(notes = "连续充值活动", value = 299)
	public static final int AYRECHARGE_REWARD = 299;
	/** 吕布降临 */
	@FieldNotes(notes = "吕布降临", value = 300)
	public static final int LVBURISING_TARGET = 300;
	/**7日血战到底掉落 */
	@FieldNotes(notes = "7日血战到底掉落", value = 301)
	public static final int SEVENFIGHTTOLAST_DROP = 301;
	/**活动血战到底掉落 */
	@FieldNotes(notes = "活动血战到底掉落", value = 302)
	public static final int ACTFIGHTTOLAST_DROP = 302;
	/** 藏宝阁 单抽消耗 */
	@FieldNotes(notes = "藏宝阁 单抽消耗", value = 303)
	public static final int HT_ONE_LOTTERY = 303;
	/** 藏宝阁 10抽消耗 */
	@FieldNotes(notes = "藏宝阁 10抽消耗", value = 304)
	public static final int HT_TEM_LOTTERY = 304;
	/** 藏宝阁 抽奖获得 */
	@FieldNotes(notes = "藏宝阁 抽奖获得", value = 305)
	public static final int HT_LOTTERY_GET = 305;
	/**使用经验丹 */
	@FieldNotes(notes = "使用经验丹", value = 306)
	public static final int USE_EXP_DAN=306;
	/**7日首冲团购 */
	@FieldNotes(notes = "7日首冲团购", value = 307)
	public static final int REWARD_SEVENFRIST=307;
	/**7日单日累充 */
	@FieldNotes(notes = "7日单日累充", value = 308)
	public static final int REWARD_SEDAYRECHARGE=308;	
	/**活动单日累充 */
	@FieldNotes(notes = "活动单日累充", value = 309)
	public static final int REWARD_ACTDAYRECHARGE=309;
	/**7日单笔累充 */
	@FieldNotes(notes = "7日单笔累充 ", value = 310)
	public static final int REWARD_SEONERECHARGE=310;	
	/**活动单笔累充 */
	@FieldNotes(notes = "活动单笔累充", value = 311)
	public static final int REWARD_ACTONERECHARGE=311;
	/**7天连续累充领日奖励 */
	@FieldNotes(notes = "7天连续累充领日奖励", value = 312)
	public static final int REWARD_SEVEN_CONTINUE_RECHARGE_ONE_DAY=312;
	/**7天连续累充领最终奖励 */
	@FieldNotes(notes = "7天连续累充领最终奖励", value = 313)
	public static final int REWARD_SEVEN_CONTINUE_RECHARGE_BIG=313;
	/**连续累充领日奖励 */
	@FieldNotes(notes = "连续累充领日奖励", value = 314)
	public static final int REWARD_CONTINUE_RECHARGE_ONE_DAY=314;
	/**连续累充领最终奖励 */
	@FieldNotes(notes = "连续累充领最终奖励", value = 315)
	public static final int REWARD_CONTINUE_RECHARGE_BIG=315;
	/**7天连续累充消耗元宝补 */
	@FieldNotes(notes = "7天连续累充消耗元宝补", value = 316)
	public static final int REWARD_SEVEN_CONTINUE_RECHARGE_SPEND=316;
	/**连续累充消耗元宝补 */
	@FieldNotes(notes = "连续累充消耗元宝补", value = 317)
	public static final int REWARD_CONTINUE_RECHARGE_SPEND=317;
	/**登录送vip3 */
	@FieldNotes(notes = "登录送vip3", value = 318)
	public static final int REWARD_LOGIN_SEND_VIP3 = 318;
	/** 战神宝藏购买 */
	@FieldNotes(notes = "战神宝藏购买", value = 319)
	public static final int GODOFWAR_STORE = 319;
	/**乱世商城使用消耗 */
	@FieldNotes(notes = "乱世商城使用消耗 ", value = 320)
	public static final int CROSSKING_SHOP_USE=320;
	/**乱世商城获得 */
	@FieldNotes(notes = "乱世商城获得", value = 321)
	public static final int CROSSKING_SHOP_GET=321;
	/**国家boss参与奖励*/
	@FieldNotes(notes = "国家boss参与奖励 ", value = 322)
	public static final int BOSS_JOINREWARD = 322;
	/**国家boss购买次数*/
	@FieldNotes(notes = "国家boss购买次数 ", value = 323)
	public static final int BOSS_BUYCOST = 323;
	/**国家boss通关奖励*/
	@FieldNotes(notes = "国家boss通关奖励", value = 324)
	public static final int BOSS_PASS = 324;
	/** 转生装备炼魂升级 */
	@FieldNotes(notes="转生装备炼魂升级", value=325)
	public static final int REBORN_UP_LV = 325;
	/** 同时拥有3张特权卡奖励 */
	@FieldNotes(notes = "同时拥有3张特权卡奖励", value = 326)
	public static final int PRIVILEGE_THREE_AWARD = 326;
	/**武将时装*/
	@FieldNotes(notes = "武将时装", value = 327)
	public static final int FASHIONCLOTH = 327;
	/** 领取每日直购奖励*/
	@FieldNotes(notes = "领取每日直购奖励", value = 328)
	public static final int DAILYDIRECTBUY_AWARD=328;
	/** 领取每日直购(活动)奖励*/
	@FieldNotes(notes = "领取每日直购(活动)奖励", value = 329)
	public static final int DAILYDIRECTBUY_ACT_AWARD=329;
	/**神剑升阶*/
	@FieldNotes(notes="神剑升阶", value=330)
	public static final int SHENJIAN_UP_JIE = 330;	
	/**异宝升阶*/
	@FieldNotes(notes="异宝升阶", value=331)
	public static final int SPETRESURE_UP_JIE = 331;
	/**兵法升阶*/
	@FieldNotes(notes="兵法升阶", value=332)
	public static final int BINGFA_UP_JIE = 332;
	/**宝物升阶*/
	@FieldNotes(notes="宝物升阶", value=333)
	public static final int TREASURE_UP_JIE = 333;
	/**天书升阶*/
	@FieldNotes(notes="天书升阶", value=334)
	public static final int GODBOOK_UP_JIE = 334;
	/** 神剑升级技能*/
	@FieldNotes(notes="神剑升级技能", value=335)
	public static final int SHENJIAN_UP_SKILL = 335;
	@FieldNotes(notes="异宝技能升级", value=336)
	public static final int SPETREASURE_UP_SKILL= 336;
	@FieldNotes(notes="兵法技能升级", value=337)
	public static final int BINGFA_UP_SKILL= 337;
	@FieldNotes(notes="宝物技能升级", value=338)
	public static final int TREASURE_UP_SKILL= 338;
	@FieldNotes(notes="天书技能升级", value=339)
	public static final int GODBOOK_UP_SKILL= 339;
	/** 跨服组队副本结算奖励 */
	@FieldNotes(notes = "跨服组队副本结算奖励", value = 340)
	public static final int CROSS_TEAM_FUBEN_AWARDS = 340;
	/** 直升丹消耗 */
	@FieldNotes(notes = "直升丹消耗", value = 341)
	public static final int DirectUPTOOL_CONSUME = 341;
	/** 升阶秘境扫荡副本 */
	@FieldNotes(notes = "升阶秘境扫荡副本", value = 342)
	public static final int CROSS_S_J_MI_JING_SAO_DANG = 342;
	/** 升阶秘境购买宝箱 */
	@FieldNotes(notes = "升阶秘境购买宝箱", value = 343)
	public static final int CROSS_S_J_MI_JING_BOX = 343;
	/** 升阶秘境挑战奖励 */
	@FieldNotes(notes = "升阶秘境挑战奖励", value = 344)
	public static final int CROSS_S_J_MI_JING_TIAO_ZHAN = 344;
	/** 宝物现世 */
	@FieldNotes(notes = "宝物现世", value = 345)
	public static final int BAO_WU_XIAN_SHI = 345;
	/** 王位之争宝箱奖励 */
	@FieldNotes(notes = "王位之争宝箱奖励", value = 346)
	public static final int KINGSHIP_BXAWARD = 346;
	/** 烽火狼烟 */
	@FieldNotes(notes = "烽火狼烟", value = 347)
	public static final int FIREBEACON_SCORE_AWARD = 347;
	/** 烽火狼烟征收 */
	@FieldNotes(notes = "烽火狼烟征收", value = 348)
	public static final int FIREBEACON_LEVY = 348;
	/** 烽火狼烟占领 */
	@FieldNotes(notes = "烽火狼烟占领", value = 349)
	public static final int FIREBEACON_OCCUPY = 349;
	/** 烽火狼烟复活 */
	@FieldNotes(notes = "烽火狼烟复活", value = 350)
	public static final int FIREBEACON_REVIVE = 350;
	/** 三国庆典-基金 */
	@FieldNotes(notes = "三国庆典-基金", value = 351)
	public static final int CELEBRATION_JI_JIN = 351;
	/** 三国庆典-豪礼兑换 */
	@FieldNotes(notes = "三国庆典-豪礼兑换", value = 352)
	public static final int CELEBRATION_HAO_LI_DUI_HUAN = 352;
	/** 三国庆典-豪礼转盘抽奖 */
	@FieldNotes(notes = "三国庆典-豪礼转盘抽奖", value = 353)
	public static final int CELEBRATION_HAO_LI_ZHUAN_PAN = 353;
	/** 三国庆典-豪礼转盘邮件 */
	@FieldNotes(notes = "三国庆典-豪礼转盘邮件", value = 354)
	public static final int CELEBRATION_HAO_LI_ZHUAN_PAN_MAIL = 354;
	/** 宝物套装升级*/
	@FieldNotes(notes="宝物套装升级", value=355)
	public static final int TREASURE_UP_TAOZHUANG = 355;
	/**武将套装升级*/
	@FieldNotes(notes="武将套装升级", value=356)
	public static final int WUJIANG_UP_TAOZHUANG = 356;
	/**三国庆典-活跃有礼 全民boss掉落*/
	@FieldNotes(notes="三国庆典-活跃有礼 全民boss掉落", value=357)
	public static final int CELEBRATION_ACTIVEGETGIFT_QMBOSS = 357;
	/** 三国庆典-活跃有礼吕布*/
	@FieldNotes(notes = "三国庆典-活跃有礼吕布", value = 358)
	public static final int ACT_HUOYUEYOULI_LVBU = 358;
	/** 三国庆典-活跃有礼孟获*/
	@FieldNotes(notes = "三国庆典-活跃有礼孟获", value = 359)
	public static final int ACT_HUOYUEYOULI_MENGHUO=359;
	/** 闯关有礼-任务奖励*/
	@FieldNotes(notes = "闯关有礼-任务奖励", value = 360)
	public static final int CHUANG_GUAN_YOU_LI_TASK=360;
	/** 闯关有礼-目标奖励*/
	@FieldNotes(notes = "闯关有礼-目标奖励", value = 361)
	public static final int CHUANG_GUAN_YOU_LI_TARGET=361;
	/**神剑套装升级*/
	@FieldNotes(notes="神剑套装升级", value=362)
	public static final int EXCALIBUR_UP_TAOZHUANG = 362;
	/**异宝套装升级*/
	@FieldNotes(notes="异宝套装升级", value=363)
	public static final int SPECIALTRESURE_UP_TAOZHUANG = 363;
	/** 累计充值(系统) */
	@FieldNotes(notes = "累计充值(系统)", value = 364)
	public static final int TOTALRECHARGESYS = 364;
	/**超级点将(系统)抽取奖励 */
	@FieldNotes(notes = "超级点将(系统)抽取奖励", value = 365)
	public static final int HYPERPOINTGENERAL_SYS_AWARD = 365;
	/**问鼎天下-连斩奖励*/
	@FieldNotes(notes="问鼎天下-连斩奖励", value=366)
	public static final int WDTD_KILL_AWARDS = 366;
	/**问鼎天下-层级奖励*/
	@FieldNotes(notes="问鼎天下-层级奖励", value=367)
	public static final int WDTD_LAYER_AWARDS = 367;
	/**问鼎天下-排名奖励*/
	@FieldNotes(notes="问鼎天下-排名奖励", value=368)
	public static final int WDTD_RANK_AWARDS = 368;
	/**问鼎天下-定时奖励*/
	@FieldNotes(notes="问鼎天下-定时奖励", value=369)
	public static final int WDTD_EVERY_TIME_AWARDS = 369;
	/** 大关卡通关奖励 */
	@FieldNotes(notes = "大关卡通关奖励 ", value = 370)
	public static final int BIG_GUANQIA_PASS_REWARD = 370;
	/**天书套装升级*/
	@FieldNotes(notes="天书套装升级", value=371)
	public static final int GODBOOK_UP_TAOZHUANG = 371;
	/**符文升级*/
	@FieldNotes(notes="符文升级", value=372)
	public static final int DESTINY_UP_LEVEL = 372;	
	/**符文分解*/
	@FieldNotes(notes="符文分解", value=373)
	public static final int DESTINY_REMOVE_LEVEL = 373;	
	/**符文普通鉴定*/
	@FieldNotes(notes="符文普通鉴定", value=374)
	public static final int DESTINY_COST = 374;	
	/**符文高级鉴定*/
	@FieldNotes(notes="符文高级鉴定", value=375)
	public static final int DESTINY_COST_H = 375;	
	/** 累冲回馈奖励 */
	@FieldNotes(notes = "累冲回馈奖励", value = 376)
	public static final int RECHARGEFEEDBACK_REWARD = 376;
	/**问鼎天下-复活消耗元宝*/
	@FieldNotes(notes="问鼎天下-复活消耗元宝", value=377)
	public static final int WDTD_FU_HUO_SPEND = 377;
	/**折扣商店购买消耗元宝 */
	@FieldNotes(notes = "升阶商店购买消耗元宝", value = 378)
	public static final int UPLVSHOP_BUYCONYB = 378;
	/**折扣商店购买物品 */
	@FieldNotes(notes = "升阶商店购买物品", value = 379)
	public static final int UPLVSHOP_BUYITEM = 379;
	/** 尊享周卡 */
	@FieldNotes(notes = "尊享周卡", value = 380)
	public static final int WEEKCARD_DAILY_REWARD = 380;
	/** 符文收集 */
	@FieldNotes(notes = "符文收集", value = 381)
	public static final int RUNE_CELLECT = 381;
	/** 符文有礼 全民Boss */
	@FieldNotes(notes = "符文有礼  全民Boss", value = 382)
	public static final int RUNE_GIFT_QM = 382;
	/** 符文有礼 孟获 */
	@FieldNotes(notes = "符文有礼 孟获", value = 383)
	public static final int RUNE_GIFT_MH = 383;
	/** 符文有礼 吕布 */
	@FieldNotes(notes = "符文有礼  吕布", value = 384)
	public static final int RUNE_GIFT_LB = 384;
	/** 符文鉴定 */
	@FieldNotes(notes = "符文鉴定", value = 385)
	public static final int RUNE_APPRAISE = 385;
	/**八门金锁-领取任务奖励**/
	@FieldNotes(notes="八门金锁-领取任务奖励", value=386)
	public static final int EIGHTDOOR_TASK = 386;
	/**八门金锁-大目标任务奖励**/
	@FieldNotes(notes="八门金锁-领取任务奖励", value=387)
	public static final int EIGHTDOOR_BIG = 387;
	/** 三国庆典-豪礼转盘目标奖励 */
	@FieldNotes(notes = "三国庆典-豪礼转盘目标奖励", value = 388)
	public static final int CELEBRATION_HAO_LI_ZHUAN_PAN_TARGETREWARD = 388;
	/**问鼎天下-积分奖励*/
	@FieldNotes(notes="问鼎天下-积分奖励", value=389)
	public static final int WDTD_SCORE_AWARDS = 389;
	/**问鼎天下-抢夺玉玺奖励*/
	@FieldNotes(notes="问鼎天下-抢夺玉玺奖励", value=390)
	public static final int WDTD_YU_XI_AWARDS = 390;
	/**诸将演武 消耗令*/
	@FieldNotes(notes="诸将演武 消耗令", value=391)
	public static final int ZJYW_SPEND = 391;
	/**诸将演武 获得道具*/
	@FieldNotes(notes="诸将演武 获得道具", value=392)
	public static final int ZJYW_ADD = 392;
	/** vip购买礼包 */
	@FieldNotes(notes = "vip购买礼包", value = 393)
	public static final int VIP_BUY_GIFT = 393;
	/**连续累充活动-每日奖励领取*/
	@FieldNotes(notes="连续累充活动-每日奖励领取", value=394)
	public static final int AWAYRECHARGE = 394;
	/**神将送礼 目标奖励*/
	@FieldNotes(notes="神将送礼 目标奖励", value=395)
	public static final int GODGENSENDAWARD_TARGETAWARD = 395;
	/**BOSS战场战斗胜利积分*/
	@FieldNotes(notes="BOSS战场战斗胜利积分", value=396)
	public static final int ZCBOSS_WIN = 396;
	/**BOSS战场战斗失败积分*/
	@FieldNotes(notes="BOSS战场战斗失败积分", value=397)
	public static final int ZCBOSS_FAIL = 397;
	/**神装洗练*/
	@FieldNotes(notes="神装洗练", value=398)
	public static final int SHENEQUIPCLEAR = 398;
	/** 兽灵觉醒 洗练 */
	@FieldNotes(notes = "兽灵觉醒 洗练", value = 399)
	public static final int MONSTERSPIRIT_WASH = 399;
	/** 兽灵觉醒 升级星宿 */
	@FieldNotes(notes = "兽灵觉醒 升级星宿", value = 400)
	public static final int MONSTERSPIRIT_UPGRADESTAR = 400;
	/** 兽灵觉醒 锁定印记 */
	@FieldNotes(notes = "兽灵觉醒  锁定印记", value = 401)
	public static final int MONSTERSPIRIT_LOCESTAMP = 401;
	/** 三国庆典-登录有奖 */
	@FieldNotes(notes = "三国庆典-登录有奖", value = 402)
	public static final int CELEBRATION_LIGINGIFT = 402;
	/** 三国庆典-单笔返利 */
	@FieldNotes(notes = "三国庆典-单笔返利", value = 403)
	public static final int CELEBRATION_ONERECARGE_BACK = 403;
	/** 三国庆典-累充返利 */
	@FieldNotes(notes = "三国庆典-累充返利", value = 404)
	public static final int CELEBRATION_TOTALRECHARGE_BACK = 404;
	/** 圣兽降临-圣兽洗练（15~21） */
	@FieldNotes(notes = "圣兽降临-圣兽洗练（15~21）", value = 405)
	public static final int SAINT_MONSTER_WASH = 405;
	/** 圣兽降临-圣兽目标（15~21） */
	@FieldNotes(notes = "圣兽降临-圣兽目标（15~21））", value = 406)
	public static final int SAINT_MONSTER_GOAL = 406;
	/** 圣兽降临-每日活跃（15~21） */
	@FieldNotes(notes = "圣兽降临-每日活跃（15~21）", value = 407)
	public static final int SAINT_MONSTER_ACTIVE = 407;
	/** 圣兽降临-圣兽寻宝（15~21） */
	@FieldNotes(notes = "圣兽降临-圣兽寻宝（15~21）", value = 408)
	public static final int SAINT_MONSTER_TREASURE = 408;
	/** 圣兽降临-充值转盘（15~21） */
	@FieldNotes(notes = "圣兽降临-充值转盘（15~21）", value = 409)
	public static final int SAINT_MONSTER_DIAL = 409;
	/** 快速购买 */
	@FieldNotes(notes = "快速购买", value = 410)
	public static final int QUICK_BUY = 410;
	/** 快速购买-骰子 */
	@FieldNotes(notes = "快速购买-骰子", value = 411)
	public static final int QUICK_BUY_DICE = 411;
	/** 快速购买-洗练石 */
	@FieldNotes(notes = "快速购买-洗练石", value = 412)
	public static final int QUICK_BUY_STONE = 412;
	/** 快速购买-洗练锁 */
	@FieldNotes(notes = "快速购买-洗练锁", value = 413)
	public static final int QUICK_BUY_LOCK = 413;
	/**激活/升星小主*/
	@FieldNotes(notes="激活/升星小主", value=414)
	public static final int UPSTARLEADER = 414;
	/**激活/升星小主时装*/
	@FieldNotes(notes="激活/升星小主时装", value=415)
	public static final int UP_FASHION_LEADER = 415;
	/**新王位之争俸禄*/
	@FieldNotes(notes="新王位之争俸禄", value=416)
	public static final int NEW_KING_WAR = 416;
	/**BOSS战场战斗胜利掉落*/
	@FieldNotes(notes="BOSS战场战斗胜利掉落", value=417)
	public static final int ZCBOSS_WIN_DROP = 417;
	/**奖励找回消耗元宝 */
	@FieldNotes(notes = "奖励找回消耗元宝", value = 418)
	public static final int REWARDBACK_CONSUMEYB = 418;
	/**奖励找回领取奖励 */
	@FieldNotes(notes = "奖励找回领取奖励", value = 419)
	public static final int REWARDBACK_GETREWARD = 419;
	/**少主提高亲密度*/
	@FieldNotes(notes="少主提高亲密度", value=420)
	public static final int LITTLE_LEADER_LV = 420;
	/**手动解锁天命消耗*/
	@FieldNotes(notes="手动解锁天命消耗", value=421)
	public static final int JIESUO_DESTINY = 421;
	/**少主主动技能升级消耗*/
	@FieldNotes(notes="少主主动技能升级消耗", value=422)
	public static final int LITTLE_LEADER_SKILLUP = 422;
	/**少主洗练被动技能消耗*/
	@FieldNotes(notes="少主洗练被动技能消耗", value=423)
	public static final int LITTLE_LEADER_XISKILL = 423;
	/**亲密度等级增加奖励*/
	@FieldNotes(notes="亲密度等级增加奖励", value=424)
	public static final int LITTLE_LEADER_QIMILV = 424;
	/** 实名验证奖励 */
	@FieldNotes(notes = "实名验证奖励", value = 425)
	public static final int TRUE_NAME_REWARD = 425;
	/**觉醒技能消耗 */
	@FieldNotes(notes = "觉醒技能消耗", value = 426)
	public static final int JUEXING = 426;
	/** 圣兽寻宝 */
	@FieldNotes(notes = "圣兽寻宝", value = 427)
	public static final int SAINT_MONSTER_TREASURE_SYS = 427;
	/**BOSS战场战斗失败奖励*/
	@FieldNotes(notes="BOSS战场战斗失败奖励", value=428)
	public static final int ZCBOSS_BATTLE_FAIL= 428;
	/** 关卡金甲兵掉落*/
	@FieldNotes(notes = "关卡金甲兵掉落", value = 429)
	public static final int JINGJIABING_DROP = 429;
	/** 少主祈愿积分宝箱奖励*/
	@FieldNotes(notes = "少主祈愿积分宝箱奖励", value = 430)
	public static final int SHAOZHUQIYUAN_SCOREBX_AWARD=430;
	/** 少主祈愿购买消耗*/
	@FieldNotes(notes = "少主祈愿祈愿符祈愿消耗", value = 431)
	public static final int SHAOZHUQIYUAN_QYFBUY_CONSUME=431;
	/** 少主祈愿元宝祈愿消耗*/
	@FieldNotes(notes = "少主祈愿元宝祈愿消耗", value = 432)
	public static final int SHAOZHUQIYUAN_YBBUY_CONSUME=432;
	/** 少主祈愿祈愿获得的抽奖奖励*/
	@FieldNotes(notes = "少主祈愿祈愿获得的抽奖奖励", value = 433)
	public static final int SHAOZHUQIYUAN_BUY_AWARD=433;
	/** 少主活动-金猪送财领取头像奖励*/
	@FieldNotes(notes = "少主活动-金猪送财领取头像奖励", value = 434)
	public static final int SHAO_ZHU_GOLD_PIG_HEAD_AWARD=434;
	/** 少主活动-金猪送财领取任务奖励*/
	@FieldNotes(notes = "少主活动-金猪送财领取任务奖励", value = 435)
	public static final int SHAO_ZHU_GOLD_PIG_TASK_AWARD=435;
	/** 少主活动-金猪送财立返奖励*/
	@FieldNotes(notes = "少主活动-金猪送财立返奖励", value = 436)
	public static final int SHAO_ZHU_GOLD_PIG_BUY_AWARD=436;
	/**少主升星额外奖励*/
	@FieldNotes(notes = "少主升星额外奖励", value = 437)
	public static final int LITTLELEAD_STARREWARD = 437;
	/**一统三国_宝箱奖励*/
	@FieldNotes(notes = "一统三国_宝箱奖励", value = 438)
	public static final int UNIFYCOUNTRY_BOX = 438;
	/** 少主活动-七日目标奖励 */
	@FieldNotes(notes = "少主活动-七日目标奖励", value = 439)
	public static final int SHAOZHU_SEVENDAYTARGET_REWARD = 439;
	/** 少主活动-累计充值 */
	@FieldNotes(notes = "少主活动-累计充值", value = 440)
	public static final int SHAOZHU_TOTALRECHARGE__REWARD = 440;
	/** 少主活动-单笔返利钥匙取得 */
	@FieldNotes(notes = "少主活动-单笔返利钥匙取得", value = 441)
	public static final int SHAOZHU_ONERECHARGEBACK_KEYGET = 441;
	/** 少主活动-单笔返利抽奖获得奖励*/
	@FieldNotes(notes = "少主活动-单笔返利抽奖获得奖励", value = 442)
	public static final int SHAOZHU_ONERECHARGEBACK_TURNREWARD = 442;
	/** 少主活动-单笔返利钥匙消耗*/
	@FieldNotes(notes = "少主活动-单笔返利钥匙消耗", value = 443)
	public static final int SHAOZHU_ONERECHARGEBACK_KEYUSE=443;
	/** 宴会 */
	@FieldNotes(notes = "宴会", value = 444)
	public static final int BANQUET = 444;
	/** 七日红包 */
	@FieldNotes(notes = "少主活动-七日红包", value = 445)
	public static final int SEVENDAYLOGIN = 445;
	/** 国家技能离线收益 */
	@FieldNotes(notes = "国家技能离线收益", value = 446)
	public static final int COUNTRYSKILL_OFFLINE = 446;
	/**一键分解装备*/
	@FieldNotes(notes = "一键分解装备", value = 447)
	public static final int ONEKEY_FENJIE_EQUIP = 447;
	/**一键分解*/
	@FieldNotes(notes = "一键分解", value = 448)
	public static final int ONEKEY_FENJIE = 448;
	/**协助关卡正常奖励*/
	@FieldNotes(notes = "协助关卡正常奖励", value = 449)
	public static final int HELP_GUA_QIA_AWARD = 449;
	/**协助关卡金甲兵奖励*/
	@FieldNotes(notes = "协助关卡金甲兵奖励", value = 450)
	public static final int HELP_GOLD_MONSTER = 450;
	/**协助关卡协助奖励*/
	@FieldNotes(notes = "协助关卡协助奖励", value = 451)
	public static final int HELP_HELP_AWARD = 451;
	/**六道轮回奖励*/
	@FieldNotes(notes = "六道轮回奖励", value = 452)
	public static final int REINCARNATION_AWARD = 452;
	/**搜索别人矿藏消耗*/
	@FieldNotes(notes = "搜索别人矿藏消耗", value = 453)
	public static final int CROSS_MINE_SEARCH = 453;
	/**挖矿奖励*/
	@FieldNotes(notes = "挖矿奖励", value = 454)
	public static final int CROSS_MINE_REWARD = 454;
	/**挖矿奖励*/
	@FieldNotes(notes = "战斗掠夺奖励", value = 455)
	public static final int CROSS_MINE_FIGHT = 455;
	/**挖矿奖励*/
	@FieldNotes(notes = "顺手牵羊奖励", value = 456)
	public static final int CROSS_MINE_STEAL = 456;
	/**首冲团购 (8-28)*/
	@FieldNotes(notes = "首冲团购(8-28)", value = 457)
	public static final int REWARD_FRISTGUY=457;
	/** 推送设置每日奖励*/
	@FieldNotes(notes = "推送设置每日奖励", value = 458)
	public static final int APP_TUISONG_AWARD=458;
	/** 每日直购前七天系统目标奖励 */
	@FieldNotes(notes = "每日直购前七天系统目标奖励", value = 459)
	public static final int DAILYDIRECTBUY_SYS_TARGET_AWARD = 459;
	/** 每日直购活动目标奖励 */
	@FieldNotes(notes = "每日直购活动目标奖励", value = 460)
	public static final int DAILYDIRECTBUY_ACT_TARGET_AWARD = 460;
	/** 每日直购(8~28)目标奖励 */
	@FieldNotes(notes = "每日直购(8~28)目标奖励", value = 461)
	public static final int DAILYDIRECTBUY_OTHER_TARGET_AWARD = 461;
	/** 刷新矿藏*/
	@FieldNotes(notes = "刷新矿藏", value = 462)
	public static final int CROSS_MINE_REFRESH = 462;
	/**霸服礼包领取 */
	@FieldNotes(notes = "霸服礼包领取", value = 463)
	public static final int GET_GIFTS = 463;
	/**激活升星专属神兵*/
	@FieldNotes(notes = "激活升星专属神兵", value = 464)
	public static final int UP_GODWEAPONSTAR = 464;
	/**专属神兵神铸消耗*/
	@FieldNotes(notes = "专属神兵神铸消耗", value = 465)
	public static final int GODWEAPON_WEAPON = 465;
	/**打造专属神兵消耗 */
	@FieldNotes(notes = "打造专属神兵消耗", value = 466)
	public static final int MAKE_GODWEAPON = 466;
	/**打造专属神兵获得 */
	@FieldNotes(notes = "打造专属神兵获得", value = 467)
	public static final int MAKE_GODWEAPON_GET = 467;
	/** 兽魂幻形 */
	@FieldNotes(notes = "兽魂幻形", value = 468)
	public static final int MS_CHANGE = 468;
	/**专属神兵升级淬炼等级消耗 */
	@FieldNotes(notes = "专属神兵升级淬炼等级消耗", value = 469)
	public static final int GODWEAPON_UP_CUILIAN_LV = 469;
	/** 三国庆典-庆典商城 */
	@FieldNotes(notes = "三国庆典-庆典商城", value = 470)
	public static final int CELEBRATION_SHOP = 470;
	/** 火烧赤壁 */
	@FieldNotes(notes = "火烧赤壁掉落", value = 471)
	public static final int HUOSHAOCHIBI = 471;
	/** 专属活动-专属商店 */
	@FieldNotes(notes = "专属活动-专属商店", value = 472)
	public static final int EXCLUSIVE_SHOP = 472;
	/**微信分享领取累计分享奖励 */
	@FieldNotes(notes = "微信分享领取累计分享奖励", value = 473)
	public static final int WEI_XIN_SHARE_GET_CUMULATIVE_AWARD = 473;
	/**微信分享抽奖奖励 */
	@FieldNotes(notes = "微信分享抽奖奖励", value = 474)
	public static final int WEI_XIN_SHARE_DRAW_AWARD = 474;
	/**微信分享领取好友数量奖励 */
	@FieldNotes(notes = "微信分享领取好友数量奖励", value = 475)
	public static final int WEI_XIN_SHARE_GET_NUMBER_AWARD = 475;
	/**微信分享领取好友等级奖励 */
	@FieldNotes(notes = "微信分享领取好友等级奖励", value = 476)
	public static final int WEI_XIN_SHARE_GET_LEVEL_AWARD = 476;
	/** 少主护送完成发奖励 */
	@FieldNotes(notes = "少主护送完成发奖励", value = 477)
	public static final int SHAOZHU_ESCORT_REWARD = 477;
	/** 少主护送拦截奖励 */
	@FieldNotes(notes = "少主护送拦截奖励", value = 478)
	public static final int SHAOZHU_ESCORT_INTERCEPT_REWARD = 478;
	/** 少主护送消耗 */
	@FieldNotes(notes = "少主护送消耗", value = 479)
	public static final int SHAOZHU_ESCORT_CONSUME = 479;
	/** 六出祁山扫荡副本 */
	@FieldNotes(notes = "六出祁山扫荡副本", value = 480)
	public static final int LIUCHUQISHAN_SAODANG = 480;
	/** 六出祁山挑战奖励 */
	@FieldNotes(notes = "六出祁山挑战奖励", value = 481)
	public static final int LIUCHUQISHAN_AWARD = 481;
	/** 异兽录激活消耗 */
	@FieldNotes(notes = "异兽录激活消耗", value = 482)
	public static final int SPECIALANIMALDIR_ACTIVE_CONSUME = 482;
	/** 异兽录升级消耗 */
	@FieldNotes(notes = "异兽录升级消耗", value = 483)
	public static final int SPECIALANIMALDIR_UP_CONSUME = 483;
	/** 异兽录进阶消耗 */
	@FieldNotes(notes = "异兽录进阶消耗", value = 484)
	public static final int SPECIALANIMALDIR_UPSTEP_CONSUME = 484;
	/** 领取每日直购(8~28)奖励 */
	@FieldNotes(notes = "领取每日直购(8~28)奖励", value = 485)
	public static final int DAILYDIRECTBUY_OTHER_AWARD = 485;
	/** 充值转盘(活动)奖励 */
	@FieldNotes(notes = "充值转盘(活动)奖励", value = 486)
	public static final int DIAL = 486;
	/** 单笔返利(活动)钥匙取得 */
	@FieldNotes(notes = "单笔返利(活动)钥匙取得", value = 487)
	public static final int ONERECHARGEBACK_KEYGET = 487;
	/** 单笔返利(活动)抽奖获得奖励 */
	@FieldNotes(notes = "单笔返利(活动)抽奖获得奖励", value = 488)
	public static final int ONERECHARGEBACK_TURNREWARD = 488;
	/** 单笔返利(活动)钥匙消耗 */
	@FieldNotes(notes = "单笔返利(活动)钥匙消耗", value = 489)
	public static final int ONERECHARGEBACK_KEYUSE = 489;
	/** vip折扣 活动*/
	@FieldNotes(notes = "vip折扣活动购买获得", value = 490)
	public static final int VIP_DISCOUNT = 490;
	/** 消费转盘(活动)抽奖 */
	@FieldNotes(notes = "消费转盘(活动)抽奖", value = 491)
	public static final int ACT_CONSUME_TURNTABLE_AWARD = 491;	
	/** 消费翻牌(活动)翻牌 */
	@FieldNotes(notes = "消费翻牌(活动)翻牌", value = 492)
	public static final int ACT_CONSUME_TURNCARD_AWARD = 492;
	/**曹操来袭参与奖励 */
	@FieldNotes(notes = "曹操来袭参与奖励 ", value = 493)
	public static final int CAOCAOCOME_REWARD = 493;
	/** 限时抢购(活动)*/
	@FieldNotes(notes = "限时抢购活动消耗", value = 494)
	public static final int FLASHSALE_USE = 494;
	/** 限时抢购(活动)*/
	@FieldNotes(notes = "限时抢购活动获得", value = 495)
	public static final int FLASHSALE_ADD = 495;
	/** vip折扣活动*/
	@FieldNotes(notes = "vip折扣活动购买消耗", value = 496)
	public static final int VIP_DISCOUNT_USE = 496;
	/** 三国宝藏 消耗*/
	@FieldNotes(notes = "三国宝藏 消耗", value = 497)
	public static final int COUNTRYTREASURE_COST=497;
	/** 三国宝藏奖励*/
	@FieldNotes(notes = "三国宝藏奖励", value = 498)
	public static final int COUNTRYTREASURE_REWARD=498;
	/** 三国宝藏 额外奖励*/
	@FieldNotes(notes = "三国宝藏 额外奖励", value = 499)
	public static final int COUNTRYTREASURE_EXT_REWARD=499;
	/** 仙山寻兽消耗元宝*/
	@FieldNotes(notes = "仙山寻兽消耗元宝", value = 500)
	public static final int SEARCHANIMALS_USE=500;
	/** 仙山寻兽消耗道具*/
	@FieldNotes(notes = "仙山寻兽消耗道具", value = 501)
	public static final int SEARCHANIMALS_USE2=501;
	/** 仙山寻兽获得*/
	@FieldNotes(notes = "仙山寻兽获得", value = 502)
	public static final int SEARCHANIMALS_ADD=502;
	/** 限定武将(活动) */
	@FieldNotes(notes = "限定武将(活动)任务奖励", value = 503)
	public static final int ACT_WUJIANGGOAL = 503;
	/** 限定武将(活动)宝箱奖励 */
	@FieldNotes(notes = "限定武将(活动)宝箱奖励", value = 504)
	public static final int ACT_BOXREWARD = 504;
	/** 轮回消耗 */
	@FieldNotes(notes = "轮回消耗", value = 505)
	public static final int REINCARNATION_COST = 505;
	/** 万兽之王-每日活跃*/
	@FieldNotes(notes = "万兽之王-每日活跃", value = 506)
	public static final int MONSTER_KING_DAILY_ACTIVE = 506;
	/** 万兽之王-累计充值*/
	@FieldNotes(notes = "万兽之王-累计充值", value = 507)
	public static final int MONSTER_KING_TOTAL_RECHARGE = 507;
	/** 万兽之王-登录有奖*/
	@FieldNotes(notes = "万兽之王-登录有奖", value = 508)
	public static final int MONSTER_KING_LOGIN_GIFT = 508;
	/**虎牢关刷新雇佣列表*/
	@FieldNotes(notes = "虎牢关刷新雇佣列表", value = 509)
	public static final int RESH_TIGER = 509;
	/**虎牢关首通奖励*/
	@FieldNotes(notes = "虎牢关首通奖励", value = 510)
	public static final int TIGER_FRIST_REWARD = 510;
	/**虎牢关保底奖励*/
	@FieldNotes(notes = "虎牢关保底奖励", value = 511)
	public static final int TIGER_LOW_REWARD = 511;
	/**虎牢关雇佣花费*/
	@FieldNotes(notes = "虎牢关雇佣花费", value = 512)
	public static final int TIGER_CHOOSE_COST = 512;
	/**虎牢关使用挑战令*/
	@FieldNotes(notes = "虎牢关使用挑战令", value = 513)
	public static final int TIGER_USE_ITEMID = 513;	
	/** 万兽之王-连充豪礼 */
	@FieldNotes(notes = "万兽之王-连充豪礼", value = 514)
	public static final int KING_OF_MONSTERS_SERIESRECHARGE_REWARD = 514;
	/** 万兽之王-异兽送礼 */
	@FieldNotes(notes = "万兽之王-异兽送礼", value = 515)
	public static final int SPECIALANIMALDIR_SENDGIFT_REWARD = 515;
	/** 三国战令等级奖励 */
	@FieldNotes(notes = "三国战令等级奖励", value = 516)
	public static final int WARORDER_REWARD = 516;
	/** 三国战令任务奖励 */
	@FieldNotes(notes = "三国战令任务奖励", value = 517)
	public static final int WARORDER_TASKREWARD = 517;
	/** 三国战令商店购买消耗 */
	@FieldNotes(notes = "三国战令商店购买消耗", value = 518)
	public static final int WARORDERSHOP_BUY = 518;
	/** 三国战令商店购买物品 */
	@FieldNotes(notes = "三国战令商店购买物品", value = 519)
	public static final int WARORDERSHOP_BUYITEM = 519;
	/** 三国战令进阶 */
	@FieldNotes(notes = "三国战令进阶 ", value = 520)
	public static final int WARORDER = 520;
	/** 修炼天赋消耗 */
	@FieldNotes(notes = "修炼天赋消耗 ", value = 521)
	public static final int TALENT = 521;
	/** 修炼天赋获得 */
	@FieldNotes(notes = "修炼天赋获得 ", value = 522)
	public static final int TALENT_ADD = 522;
	/** 异兽天赋装备升级 */
	@FieldNotes(notes = "异兽天赋装备升级", value = 523)
	public static final int ANIMAL_TELENT_EQUIP_UPGRADE = 523;
	/** 异兽天赋装备升品 */
	@FieldNotes(notes = "异兽天赋装备升品", value = 524)
	public static final int ANIMAL_TELENT_QUALITY_UPGRADE = 524;
	/** 龙飞凤舞-天赋送礼 */
	@FieldNotes(notes = "龙飞凤舞-修炼天赋 ", value = 525)
	public static final int TALENTSENDGIFT_REWARD = 525;
	/** 龙飞凤舞-天赋目标 */
	@FieldNotes(notes = "龙飞凤舞-天赋目标 ", value = 526)
	public static final int TALENT_GOAL = 526;
	/** 异兽BOSS挑战 */
	@FieldNotes(notes = "异兽BOSS挑战", value = 527)
	public static final int SPECIAL_ANIMAL_BOSS = 527;
	/** 挑战异兽BOSS复活 */
	@FieldNotes(notes = "挑战异兽BOSS复活消耗", value = 528)
	public static final int CHALLEGE_SA_BOSS_RELIVE = 528;
	/** 异兽BOSS通关奖励 */
	@FieldNotes(notes = "异兽BOSS通关奖励", value = 529)
	public static final int SPECIAL_ANIMAL_BOSS_PASS = 529;
	/** 消费砸蛋获得 */
	@FieldNotes(notes = "消费砸蛋获得", value = 530)
	public static final int CONSUMESMASHEGG_ADD = 530;
	/** 群雄逐鹿-宝库兑换消耗 */
	@FieldNotes(notes = "群雄逐鹿-宝库兑换消耗", value = 531)
	public static final int QUNXIONGZHULU_BAOKU_COST = 531;
	/** 群雄逐鹿-完成任务获得 */
	@FieldNotes(notes = "群雄逐鹿-完成任务获得", value = 532)
	public static final int QUNXIONGZHULU_TASK_ADD = 532;
	/** 群雄逐鹿-购买体力消耗 */
	@FieldNotes(notes = "群雄逐鹿-购买体力消耗", value = 533)
	public static final int QUNXIONGZHULU_TILI_COST = 533;
	/**群雄逐鹿-驻守奖励 */
	@FieldNotes(notes = "群雄逐鹿-驻守奖励", value = 534)
	public static final int QUNXIONGZHULU_DEFEND_AWARD_ADD = 534;
	/**群雄逐鹿-挑战奖励 */
	@FieldNotes(notes = "群雄逐鹿-挑战奖励", value = 535)
	public static final int QUNXIONGZHULU_ATTACK_AWARD_ADD = 535;
	/** 群雄逐鹿-宝库兑换获得 */
	@FieldNotes(notes = "群雄逐鹿-宝库兑换获得", value = 536)
	public static final int QUNXIONGZHULU_BAOKU_ADD = 536;
	/**挖矿协助奖励*/
	@FieldNotes(notes = "挖矿协助奖励", value = 537)
	public static final int CROSS_MINE_HELP_REWARD = 537;
	/** 合服登录有奖 */
	@FieldNotes(notes = "合服登录有奖", value = 538)
	public static final int HEFU_LOGIN_GIFT = 538;
	/** 合服充值返利 */
	@FieldNotes(notes = "合服充值返利", value = 539)
	public static final int HEFU_RECHARGE_GIFT = 539;
	/** 合服-大神送礼*/
	@FieldNotes(notes = "合服-大神送礼", value = 540)
	public static final int HEFU_GOD_GIFT = 540;
	/** 合服-首冲*/
	@FieldNotes(notes = "合服-首冲", value = 541)
	public static final int HEFU_FRIST_RECHARGE = 541;
	/**合服-张飞买活 */
	@FieldNotes(notes = "合服-张飞买活", value = 542)
	public static final int HEFU_ZHANGFEI_BUYLIVE = 542;
	/**合服-张飞参与奖励 */
	@FieldNotes(notes = "合服-张飞参与奖励  ", value = 543)
	public static final int HEFU_ZHANGFEI_REWARD = 543;
	/**合服-张飞敬酒*/
	@FieldNotes(notes = "合服-张飞敬酒  ", value = 544)
	public static final int HEFU_ZHANGFEI_ADDJIU=544;
	/** 异兽BOSS购买挑战次数 */
	@FieldNotes(notes = "异兽BOSS购买挑战次数", value = 545)
	public static final int SPECIAL_ANIMAL_BUY_CHA = 545;
	/** 激活神将*/
	@FieldNotes(notes="激活神将", value=546)
	public static final int SHENJIANG_JIHUO = 546;
	/** 神将修炼*/
	@FieldNotes(notes="神将修炼消耗", value=547)
	public static final int UPSHENJIANGLV = 547;
	/** 神将天赋*/
	@FieldNotes(notes="神将天赋消耗", value=548)
	public static final int UPSHENJIANGTF = 548;
	/** 神将现世(活动)目标奖励 */
	@FieldNotes(notes = "神将现世(活动)目标奖励", value = 549)
	public static final int GODGENTHISLIFE_TARGET_REWARD = 549;
	/** 神将现世(活动)抽奖消耗 */
	@FieldNotes(notes = "神将现世(活动)抽奖消耗", value = 550)
	public static final int GODGENTHISLIFE_TURN_CONSUME = 550;
	/** 神将现世(活动)抽奖奖励 */
	@FieldNotes(notes = "神将现世(活动)抽奖奖励", value = 551)
	public static final int GODGENTHISLIFE_TURN_AWARD = 551;
	/** 激活奇策 */
	@FieldNotes(notes = "激活奇策", value = 552)
	public static final int QICE_JIHUO = 552;
	/** 升星奇策 */
	@FieldNotes(notes = "升星奇策", value = 553)
	public static final int QICE_UPSTAR = 553;
	/** 奇策套装升级 */
	@FieldNotes(notes = "奇策套装升级", value = 554)
	public static final int QICE_UP_TAOZHUANG = 554;
	/** 奇策兵魂属性丹 */
	@FieldNotes(notes = "奇策属性丹(兵魂/将魂)", value = 555)
	public static final int QICE_DAN = 555;
	/** 奇策升阶 */
	@FieldNotes(notes = "奇策升阶", value = 556)
	public static final int QICE_UP_JIE = 556;
	/** 出谋策划消耗 */
	@FieldNotes(notes = "出谋策划消耗 ", value = 557)
	public static final int QICE_DRAW = 557;
	/** 出谋策划获得 */
	@FieldNotes(notes = "出谋策划获得 ", value = 558)
	public static final int QICE_DRAW_ADD = 558;
	/** 运筹帷幄-锦囊妙计奖励 */
	@FieldNotes(notes = "运筹帷幄-锦囊妙计奖励", value = 559)
	public static final int BAGGOODIDEA_REWARD = 559;
	/** 运筹帷幄-奇策有礼奖励 */
	@FieldNotes(notes = "运筹帷幄-奇策有礼奖励", value = 560)
	public static final int GOODPOLICYHASGIFT_REWARD = 560;
	/** 三英战吕布通关奖励*/
	@FieldNotes(notes = "三英战吕布通关奖励", value = 561)
	public static final int SH_LVBU_PASS_REWARD = 561;
	/** 三英战吕布复活消耗*/
	@FieldNotes(notes = "三英战吕布复活消耗", value = 562)
	public static final int SH_LVBU_COST = 562;
	/** 许愿树消耗 */
	@FieldNotes(notes = "许愿树消耗 ", value = 563)
	public static final int WISHING_TREE = 563;
	/** 许愿树获得 */
	@FieldNotes(notes = "许愿树获得 ", value = 564)
	public static final int WISHING_TREE_ADD = 564;
	/** 许愿树(活动)消耗 */
	@FieldNotes(notes = "许愿树(活动)消耗 ", value = 565)
	public static final int WISHING_TREE_ACT = 565;
	/** 许愿树(活动)获得 */
	@FieldNotes(notes = "许愿树(活动)获得 ", value = 566)
	public static final int WISHING_TREE_ADD_ACT = 566;
	/** 许愿树目标获得 */
	@FieldNotes(notes = "许愿树目标获得 ", value = 567)
	public static final int WISHING_TREE_TARGET_REWARD = 567;
	/** 许愿树送礼获得 */
	@FieldNotes(notes = "许愿树送礼获得 ", value = 568)
	public static final int WISHING_TREE_SENDGIFT = 568;
	/** 新活动-连续充值 */
	@FieldNotes(notes = "新活动-连续充值", value = 569)
	public static final int SERIESRECHARGE_ACT_REWARD = 569;
	/** 打气球获得 */
	@FieldNotes(notes = "打气球获得 ", value = 570)
	public static final int PLAYBALLOON_ADD = 570;
	/** 消费摇骰子获得 */
	@FieldNotes(notes = "消费摇骰子获得 ", value = 571)
	public static final int ROLLDICE_ADD = 571;
	/** 三英战吕布购买挑战次数*/
	@FieldNotes(notes = "三英战吕布购买挑战次数", value = 572)
	public static final int SH_LVBU_BUY_CHANUM = 572;
	/** 三英战吕布挑战*/
	@FieldNotes(notes = "三英战吕布挑战", value = 573)
	public static final int SH_LVBU_CHALLENGE = 573;
	/**粮草宝箱奖励*/
	@FieldNotes(notes = "粮草宝箱奖励", value = 575)
	public static final int BATTLEGOODS_BOX = 575;
	/**粮草抢夺积分目标奖励*/
	@FieldNotes(notes = "粮草抢夺积分目标奖励", value = 576)
	public static final int BATTLEGOODS_GOAL_REWARD = 576;
	/**粮草抢夺 pve掉落*/
	@FieldNotes(notes="粮草抢夺 pve掉落", value=577)
	public static final int BATTLEGOODS_PVE_DROP = 577;
	/**粮草抢夺 买活*/
	@FieldNotes(notes="粮草抢夺 买活", value=578)
	public static final int BATTLEGOODS_BUY_LIVE = 578;
	/**新活动-主题消费 获得*/
	@FieldNotes(notes="新活动-主题消费获得", value=579)
	public static final int THEMECONSUME_ADD = 579;
	/**阵眼 升级阵眼*/
	@FieldNotes(notes="阵眼 升级阵眼", value=580)
	public static final int ZHEN_YAN_UP_COST = 580;
	/**阵眼 升级阵心*/
	@FieldNotes(notes="阵眼 升级阵心", value=581)
	public static final int ZHEN_XIN_UP_COST = 581;
	/**桃园结义改名 */
	@FieldNotes(notes="桃园结义改名消耗物品", value=582)
	public static final int TAOYUANSWORN_CHANGE_NAME = 582;
	/**桃园结义创建义盟消耗 */
	@FieldNotes(notes="桃园结义创建义盟消耗", value=583)
	public static final int TAOYUANSWORN_CREATE = 583;
	/**桃园结义开启BOSS消耗 */
	@FieldNotes(notes="桃园结义开启BOSS消耗", value=584)
	public static final int TAOYUANSWORN_CHOOSEBOSS = 584;
	/**桃园结义任务礼包 */
	@FieldNotes(notes="桃园结任务礼包获得 ", value=585)
	public static final int TAOYUANSWORN_GETREWARD = 585;
	/**桃园结义BOSS奖励 */
	@FieldNotes(notes="桃园结BOSS奖励获得 ", value=586)
	public static final int TAOYUANSWORN_BOSSREWARD = 586;
	/** 领取限时礼包(活动)奖励 */
	@FieldNotes(notes = "领取限时礼包(活动)奖励", value = 587)
	public static final int GIFT_ACT_AWARD = 587;
	/** 成就任务奖励 */
	@FieldNotes(notes = "成就任务奖励", value = 588)
	public static final int ACHIEVEMENT_TASK_AWARD = 588;
	/** 成就阶数奖励 */
	@FieldNotes(notes = "成就阶数奖励", value = 589)
	public static final int ACHIEVEMENT_AWARD = 589;
	/** 新活动-幸运翻牌消耗 */
	@FieldNotes(notes = "新活动-幸运翻牌消耗", value = 590)
	public static final int LUCKTURNCARD_NEWACT_CONSUME = 590;
	/** 新活动-幸运翻牌抽奖 */
	@FieldNotes(notes = "新活动-幸运翻牌抽奖", value = 591)
	public static final int LUCKTURNCARD_NEWACT_TURN_REWARD = 591;
	/** 新活动-幸运翻牌目标奖励 */
	@FieldNotes(notes = "新活动-幸运翻牌目标奖励", value = 592)
	public static final int LUCKTURNCARD_NEWACT_TARGET_REWARD = 592;
	/**桃园BOSS复活消耗*/
	@FieldNotes(notes = "桃园BOSS复活消耗", value = 593)
	public static final int TAOYUAN_BOSS_FUHUO = 593;
	/** 新活动-全服消费目标奖励 */
	@FieldNotes(notes = "新活动-全服消费目标奖励", value = 594)
	public static final int SERVERCONSUME_NEWACT_TARGET_REWARD = 594;
	/** 成就树奖励 */
	@FieldNotes(notes = "成就树奖励", value = 595)
	public static final int ACHIEVEMENT_TREE_AWARD = 595;
	/** 轮回-天命升级，升品消耗 */
	@FieldNotes(notes = "轮回-天命升级，升品消耗", value = 596)
	public static final int GODFATE_UP_CONSUME = 596;
	/**跨服试炼 战斗层通关奖励*/
	@FieldNotes(notes = "跨服试炼 战斗层通关奖励", value = 597)
	public static final int CROSS_TRIAL_FIGHT_REWARD = 597;
	/**跨服试炼 开宝箱*/
	@FieldNotes(notes = "跨服试炼 开宝箱", value = 598)
	public static final int CROSS_TRIAL_CHEST = 598;
	/**新活动-宝藏拼图-领取宝箱奖励*/
	@FieldNotes(notes = "新活动-宝藏拼图-领取宝箱奖励", value = 599)
	public static final int BAO_ZANG_PIN_TU_BOX_AWARD = 599;
	/**累计返利获得*/
	@FieldNotes(notes = "累计返利获得 ", value = 600)
	public static final int TOTALREBATE_ADD = 600;
	/**累计返利道具去除*/
	@FieldNotes(notes = "累计返利道具去除 ", value = 601)
	public static final int TOTALREBATE_DEL = 601;
	/** 兑换神符 */
	@FieldNotes(notes = "兑换神符", value = 602)
	public static final int DESTINYSHOP_BUY = 602;
	/**新活动-双12商城-购买物品*/
	@FieldNotes(notes = "新活动-双12商城-购买物品", value = 603)
	public static final int DOUBLE_TWELVE_SHOP_BUY = 603;
	/**新活动-双12商城-购买物品消耗*/
	@FieldNotes(notes = "新活动-双12商城-购买物品消耗", value = 604)
	public static final int DOUBLE_TWELVE_SHOP_BUY_COST = 604;
	/** 神将之力技能进阶消耗 */
	@FieldNotes(notes = "神将之力技能进阶消耗", value = 605)
	public static final int GENERALSKILLUP_CONSUME = 605;
	/** 新活动-节日商店购买消耗 */
	@FieldNotes(notes = "新活动-节日商店购买消耗", value = 606)
	public static final int HOLIDAY_MALL_BUY = 606;
	/** 新活动-节日商店购买获得 */
	@FieldNotes(notes = "新活动-节日商店购买获得", value = 607)
	public static final int HOLIDAY_MALL_BUYITEM = 607;
	/** 新活动-节日商店刷新商店消耗 */
	@FieldNotes(notes = "新活动-节日商店刷新商店消耗 ", value = 608)
	public static final int HOLIDAY_MALL_REFRESH_SHOP = 608;
	/** 新活动-节日商店刷新折扣消耗 */
	@FieldNotes(notes = "新活动-节日商店刷新折扣消耗 ", value = 609)
	public static final int HOLIDAY_MALL_REFRESH_DATA = 609;
	/** 少主六艺升级消耗 */
	@FieldNotes(notes = "少主六艺升级消耗", value = 610)
	public static final int UP_SIXARTS_LV = 610;
	/** 少主六艺考试消耗 */
	@FieldNotes(notes = "少主六艺考试消耗", value = 611)
	public static final int KAOSHI = 611;
	/** 新活动-财神送礼(抽奖) */
	@FieldNotes(notes = "新活动-财神送礼(抽奖)", value = 612)
	public static final int GOD_OF_WEALTH_SEND_GIFT_ACT_TURN_AWARD = 612;
	/** 少主潜能升级消耗 */
	@FieldNotes(notes = "少主潜能升级消耗", value = 613)
	public static final int UP_QIANNENG = 613;
	/** 少主潜能服消耗 */
	@FieldNotes(notes = "少主潜能服食消耗", value = 614)
	public static final int SWALLOW = 614;
	/** 镇守四方购买商品消耗 */
	@FieldNotes(notes = "镇守四方购买商品消耗", value = 615)
	public static final int GUARD_AREA_BUY_COST = 615;
	/** 镇守四方购买商品获得 */
	@FieldNotes(notes = "镇守四方购买商品获得", value = 616)
	public static final int GUARD_AREA_BUY_ADD = 616;
	/** 镇守四方领取镇守奖励 */
	@FieldNotes(notes = "镇守四方领取镇守奖励", value = 617)
	public static final int GUARD_AREA_GET_AWARD = 617;
	/** 镇守四方召回消耗 */
	@FieldNotes(notes = "镇守四方召回消耗", value = 618)
	public static final int GUARD_AREA_RECALL_COST = 618;
	/** 镇守四方召回获得 */
	@FieldNotes(notes = "镇守四方召回获得", value = 619)
	public static final int GUARD_AREA_RECALL_ADD = 619;
	/**坐骑激活或升星消耗*/
	@FieldNotes(notes = "坐骑激活或升星消耗", value = 620)
	public static final int MOUNT_STAR_COST = 620;
	/**坐骑升级消耗*/
	@FieldNotes(notes = "坐骑升级消耗", value = 621)
	public static final int MOUNT_LEVEL_COST = 621;
	/** 群雄逐鹿中的单枪匹马激活消耗 */
	@FieldNotes(notes = "群雄逐鹿中的单枪匹马激活消耗", value = 622)
	public static final int QUNXIONGZHULU_BUFF_CONSUME = 622;
	/** 新活动-幸运扭蛋抽奖消耗 */
	@FieldNotes(notes = "新活动-幸运扭蛋抽奖消耗", value = 623)
	public static final int LUCKY_TWIST_COST = 623;
	/** 新活动-幸运扭蛋注入消耗 */
	@FieldNotes(notes = "新活动-幸运扭蛋注入消耗", value = 624)
	public static final int LUCKY_TWIST_PUT = 624;
	/** 新活动-幸运扭蛋抽奖获得 */
	@FieldNotes(notes = "新活动-幸运扭蛋抽奖获得 ", value = 625)
	public static final int LUCKY_TWIST_ADD = 625;
	/** 全民BOSS消耗 */
	@FieldNotes(notes = "全民BOSS消耗", value = 626)
	public static final int QMBOSS_REDUCE = 626;
	/** 乱世枭雄消耗 */
	@FieldNotes(notes = "乱世枭雄消耗", value = 627)
	public static final int CROSSKING_REDUCE = 627;
	/** 三国战神消耗 */
	@FieldNotes(notes = "三国战神消耗", value = 628)
	public static final int GODOFWAR_REDUCE = 628;
	/** 符文分解获得 */
	@FieldNotes(notes = "符文分解获得", value = 629)
	public static final int DESTINY_ADD = 629;
	/**跨服王者战斗胜利奖励*/
	@FieldNotes(notes="跨服王者战斗胜利奖励", value=630)
	public static final int CROSS_TEAMKING_WIN= 630;
	/**跨服王者战斗失败奖励*/
	@FieldNotes(notes="跨服王者战斗失败奖励", value=631)
	public static final int CROSS_TEAMKING_FAIL= 631;
	/**跨服王者每日宝箱奖励*/
	@FieldNotes(notes="跨服王者每日宝箱奖励", value=632)
	public static final int CROSS_TEAMKING_BOX= 632;
	/**购买王者次数*/
	@FieldNotes(notes="购买王者次数", value=633)
	public static final int CROSS_TEAMKING_BUYNUM= 633;
	/**举办宴会消耗*/
	@FieldNotes(notes="举办宴会消耗", value=634)
	public static final int YANHUI_JUBAN_COST= 634;
	/**赴宴消耗*/
	@FieldNotes(notes="赴宴消耗", value=635)
	public static final int YANHUI_FUYAN_COST= 635;
	/**赴宴获得*/
	@FieldNotes(notes="赴宴获得", value=636)
	public static final int YANHUI_FUYAN_ADD= 636;
	/**宴会敬酒消耗*/
	@FieldNotes(notes="宴会敬酒消耗", value=637)
	public static final int YANHUI_JINGJIU_COST= 637;
	/**宴会敬酒获得*/
	@FieldNotes(notes="宴会敬酒获得", value=638)
	public static final int YANHUI_JINGJIU_ADD= 638;
	/**宴会开启boss消耗*/
	@FieldNotes(notes="宴会开启boss消耗", value=639)
	public static final int YANHUI_BOSS_COST= 639;
	/** 对对联(活动)目标奖励 */
	@FieldNotes(notes = "对对联(活动)目标奖励", value = 640)
	public static final int COUPLET_ACT_TARGET_REWARD = 640;
	/** 对对联(活动)对联消耗 */
	@FieldNotes(notes = "对对联(活动)对联消耗", value = 641)
	public static final int COUPLET_ACT_COUPLET_CONSUME = 641;
	/** 天降红包(活动)红包奖励 */
	@FieldNotes(notes = "天降红包(活动)红包奖励", value = 642)
	public static final int DROPREDPACKET_NEWACT_GET = 642;
	/**宴会开启boss获得*/
	@FieldNotes(notes="宴会开启boss获得", value=643)
	public static final int YANHUI_BOSS_ADD= 643;
	/** 金鼠送财消耗 */
	@FieldNotes(notes = "金鼠送财消耗", value = 644)
	public static final int GOLEN_MOUSE_COST = 644;
	/** 金鼠送财获得 */
	@FieldNotes(notes = "金鼠送财获得", value = 645)
	public static final int GOLEN_MOUSE_FANLI = 645;
	/** 领取年兽积分目标奖励 */
	@FieldNotes(notes = "领取年兽积分目标奖励", value = 646)
	public static final int NIAM_MONSTER_GOAL_REWARD = 646;
	/** 领取年兽击退奖励 */
	@FieldNotes(notes = "领取年兽积分击退奖励", value = 647)
	public static final int NIAM_MONSTER_WIN_REWARD = 647;
	/** 对对联(活动)答对奖励 */
	@FieldNotes(notes = "对对联(活动)答对奖励", value = 648)
	public static final int COUPLET_ACT_CORRECT_AWARD = 648;
	/** 战胜宴会boss获得 */
	@FieldNotes(notes = "战胜宴会boss获得", value = 649)
	public static final int YANHUI_WIN_BOSS_ADD = 649;
	/** 升级府邸等级消耗 */
	@FieldNotes(notes = "升级府邸等级消耗", value = 650)
	public static final int UP_HOUSE_LV_COST = 650;
	/** 升级府邸档次消耗 */
	@FieldNotes(notes = "升级府邸档次消耗", value = 651)
	public static final int UP_HOUSE_DC_COST = 651;
	/** 升级府邸装饰消耗 */
	@FieldNotes(notes = "升级府邸装饰消耗", value = 652)
	public static final int UP_DECORATE_LV_COST = 652;
	/** 摇钱树行为获得 */
	@FieldNotes(notes = "摇钱树行为获得", value = 653)
	public static final int SHAKE_TREE_ADD = 653;
	/** 天工炉抽奖获得 */
	@FieldNotes(notes = "天工炉抽奖获得", value = 654)
	public static final int DRAW_AWARD_ADD = 654;
	/** 金库收获府邸币获得 */
	@FieldNotes(notes = "金库收获府邸币获得", value = 655)
	public static final int HARVEST_MONEY_ADD = 655;
	/** 天工炉抽奖消耗 */
	@FieldNotes(notes = "天工炉抽奖消耗", value = 656)
	public static final int DRAW_AWARD_COST = 656;
	/** 天工炉献祭消耗 */
	@FieldNotes(notes = "天工炉献祭消耗", value = 657)
	public static final int SACRIFICE_COST = 657;
	/** 天工炉献祭获得 */
	@FieldNotes(notes = "天工炉献祭获得", value = 658)
	public static final int SACRIFICE_ADD = 658;
	/** 升级府邸档次获得 */
	@FieldNotes(notes = "升级府邸档次获得", value = 659)
	public static final int UP_HOUSE_DC_ADD = 659;
	/** 事件处理获得 */
	@FieldNotes(notes = "事件处理获得", value = 660)
	public static final int EVENT_AWARD_ADD = 660;
	/** 打赢强盗获得 */
	@FieldNotes(notes = "打赢强盗获得", value = 661)
	public static final int NPC_AWARD_ADD = 661;
	/** 擂台比武NPC奖励 */
	@FieldNotes(notes = "领取年兽积分击退奖励", value = 662)
	public static final int ARENA_FIGHT_NPC_REWARD = 662;
	/** 天降豪礼奖励*/
	@FieldNotes(notes = "天降豪礼奖励", value = 663)
	public static final int ACT_SKY_RICHGIGT_REWARD = 663;
	/** 至尊秘宝抽奖消耗*/
	@FieldNotes(notes = "至尊秘宝抽奖消耗", value = 664)
	public static final int ACT_KING_SECRECT_CRYSTAL_COST = 664;
	/** 至尊秘宝抽奖获得*/
	@FieldNotes(notes = "至尊秘宝抽奖获得", value = 665)
	public static final int ACT_KING_SECRECT_CRYSTAL_REWARD = 665;
	/** 至尊秘宝重置消耗*/
	@FieldNotes(notes = "至尊秘宝重置消耗", value = 666)
	public static final int ACT_KING_SECRECT_CRYSTAL_RESET = 666;
	/** 超级弹珠重置消耗*/
	@FieldNotes(notes = "超级弹珠重置消耗", value = 667)
	public static final int ACT_SUPER_HOODLE_RESET = 667;
	/** 超级弹珠抽奖消耗*/
	@FieldNotes(notes = "超级弹珠重置消耗", value = 668)
	public static final int ACT_SUPER_HOODLE_SHOOT_COST = 668;
	/** 超级弹珠抽奖获得*/
	@FieldNotes(notes = "超级弹珠重置消耗", value = 669)
	public static final int ACT_SUPER_HOODLE_SHOOT = 669;
	/** 弹珠积分商店购买消耗*/
	@FieldNotes(notes = "弹珠积分商店购买消耗", value = 670)
	public static final int ACT_HOODLE_STORE_COST = 670;
	/** 弹珠积分商店购买获得*/
	@FieldNotes(notes = "弹珠积分商店购买获得", value = 671)
	public static final int ACT_HOODLE_STORE_EXCHANGE = 671;
	/** 刮刮乐消耗*/
	@FieldNotes(notes = "刮刮乐消耗", value = 672)
	public static final int ACT_SCRATCH_TICKET_COST = 672;
	/** 刮刮乐奖励*/
	@FieldNotes(notes = "刮刮乐奖励", value = 673)
	public static final int ACT_SCRATCH_TICKET_REWARD = 673;
	/** 刮刮乐额外铜钱奖励*/
	@FieldNotes(notes = "刮刮乐额外铜钱奖励", value = 674)
	public static final int ACT_SCRATCH_TICKET_COIN = 674;
	
	/** 府邸商店购买 */
	@FieldNotes(notes = "府邸商店购买 ", value = 675)
	public static final int HOUSE_BUY = 675;
	/** 府邸任务奖励*/
	@FieldNotes(notes = "府邸任务奖励 ", value = 676)
	public static final int HOUSE_TASK_REWARD = 676;
	/** 府邸宝箱奖励*/
	@FieldNotes(notes = "府邸宝箱奖励", value = 677)
	public static final int HOUSE_BOX_REWARD = 677;
	
	
	/**做元宵刷新列表*/
	@FieldNotes(notes = "做元宵刷新列表", value = 678)
	public static final int YUANXIAO_RESH = 678;
	
	/**做元宵奖励活动*/
	@FieldNotes(notes = "做元宵奖励活动", value = 679)
	public static final int YUANXIAO_REWARD = 679;
	
	/**做元宵获取免费材料*/
	@FieldNotes(notes = "做元宵获取免费材料", value = 680)
	public static final int YUANXIAO_ADDFEEL = 680;
	
	/**充值获得金元宝*/
	@FieldNotes(notes = "充值获得金元宝", value = 681)
	public static final int GOLDYUANBAO_ADD = 681;
	
	/**发红包消耗金元宝*/
	@FieldNotes(notes = "发红包消耗金元宝", value = 682)
	public static final int GOLDYUANBAO_USE=682;
	/**拆红包获得元宝*/
	@FieldNotes(notes = "拆红包获得元宝", value = 683)
	public static final int REDBOX_ADD=683;

	/** 许田围猎购买狩猎次数*/
	@FieldNotes(notes = "许田围猎购买狩猎次数", value = 684)
	public static final int XUTIAN_HUNT_BUY_NUM = 684;
	/** 许田围猎奖励*/
	@FieldNotes(notes = "许田围猎奖励", value = 685)
	public static final int XUTIAN_HUNT_REWARD = 685;
	/** 许田围猎开始狩猎*/
	@FieldNotes(notes = "许田围猎开始狩猎", value = 686)
	public static final int XUTIAN_HUNT_START = 686;


	
	/** 激活侍女 */
	@FieldNotes(notes = "激活侍女", value = 687)
	public static final int MAID_JIHUO = 687;
	/** 升星侍女 */
	@FieldNotes(notes = "升星侍女", value = 688)
	public static final int MAID_UPSTAR = 688;
	/** 升级侍女 */
	@FieldNotes(notes = "升级侍女", value = 689)
	public static final int MAID_UPLEVEL = 689;
	/** 晋升家丁 */
	@FieldNotes(notes = "晋升家丁", value = 690)
	public static final int HOUSEKEEPER_UP = 690;
	/** 升级家丁 */
	@FieldNotes(notes = "升级家丁", value = 691)
	public static final int HOUSEKEEPER_UPLEVEL = 691;

	/**登峰造极购买挑战消耗*/
	@FieldNotes(notes="登峰造极购买挑战消耗", value=692)
	public static final int DENGFENGZAOJI_BUYTIME_COST= 692;
	/**登峰造极下注消耗*/
	@FieldNotes(notes="登峰造极下注消耗", value=693)
	public static final int DENGFENGZAOJI_XIAZHU_COST= 693;
	/**登峰造极猜对奖励*/
	@FieldNotes(notes="登峰造极猜对奖励", value=694)
	public static final int DENGFENGZAOJI_CAIDUI_ADD= 694;
	/**登峰造极猜错奖励*/
	@FieldNotes(notes="登峰造极猜错奖励", value=695)
	public static final int DENGFENGZAOJI_CAICUO_ADD= 695;
	/**登峰造极海选刷新消耗*/
	@FieldNotes(notes="登峰造极海选刷新消耗", value=696)
	public static final int DENGFENGZAOJI_HAIXUAN_SHUAXIN_COST= 696;
	/**登峰造极决赛刷新消耗*/
	@FieldNotes(notes="登峰造极决赛刷新消耗", value=697)
	public static final int DENGFENGZAOJI_JUESAI_SHUAXIN_COST= 697;
	/**登峰造极积分奖励*/
	@FieldNotes(notes="登峰造极积分奖励", value=698)
	public static final int DENGFENGZAOJI_SCORE_REWARD_ADD= 698;
	/**登峰造极挑战成功奖励*/
	@FieldNotes(notes="登峰造极挑战成功奖励", value=699)
	public static final int DENGFENGZAOJI_BATTLE_ADD= 699;
	/** 六道印记升级*/
	@FieldNotes(notes = "六道印记升级 ", value = 700)
	public static final int SIXWAY_UPLEVEL = 700;
	/** 六道印记分解获得 */
	@FieldNotes(notes = "六道印记分解获得 ", value = 701)
	public static final int SIXYINJI_ADD = 701;
	/** 轮回副本挑战奖励 */
	@FieldNotes(notes = "轮回副本挑战奖励", value = 702)
	public static final int REBORN_FB_TIAO_ZHAN = 702;
	/** 轮回副本刷新星数消耗 */
	@FieldNotes(notes = "轮回副本刷新星数消耗", value = 703)
	public static final int REBORN_FB_REFRESH =703;
	
	/** 攻城拔寨购买商品消耗 */
	@FieldNotes(notes = "攻城拔寨购买商品消耗", value = 704)
	public static final int ATTACK_CITY_BUY_COST = 704;
	/** 攻城拔寨购买商品获得 */
	@FieldNotes(notes = "攻城拔寨购买商品获得", value = 705)
	public static final int ATTACK_CITY_BUY_ADD = 705;
	/** 攻城拔寨领取镇守奖励 */
	@FieldNotes(notes = "攻城拔寨领取镇守奖励", value = 706)
	public static final int ATTACK_CITY_GET_AWARD = 706;
	/** 攻城拔寨挑战奖励 */
	@FieldNotes(notes = "攻城拔寨挑战奖励", value = 707)
	public static final int ATTACK_CITY_AWARD_ADD = 707;
	/** 攻城拔寨挑战令消耗 */
	@FieldNotes(notes = "攻城拔寨挑战令消耗", value = 708)
	public static final int ATTACK_CITY_REDUCE = 708;
	/** 府邸目标奖励*/
	@FieldNotes(notes = "府邸目标奖励", value = 709)
	public static final int HOUSE_GOAL_REWARD = 709;
	/** 登峰造极挑战令消耗 */
	@FieldNotes(notes = "登峰造极挑战令消耗", value = 710)
	public static final int DENGFENGZAOJI_BATTLE_COST = 710;
	/** 武庙十哲(活动)目标奖励 */
	@FieldNotes(notes = "武庙十哲(活动)目标奖励", value = 711)
	public static final int WUMIAOSHIZHE_ACT_TARGET_REWARD = 711;

	/** 幸运福签抽奖消耗 */
	@FieldNotes(notes = "幸运福签抽奖消耗", value = 712)
	public static final int LUCK_SIGN_COST = 712;
	/** 幸运福签开启获得 */
	@FieldNotes(notes = "幸运福签开启获得", value = 713)
	public static final int LUCK_SIGN_ADD = 713;
	/** 幸运福签目标获得 */
	@FieldNotes(notes = "幸运福签目标获得 ", value = 714)
	public static final int LUCK_SIGN_GET = 714;
	/** 幸运福签抽奖获得 */
	@FieldNotes(notes = "幸运福签抽奖获得 ", value = 715)
	public static final int LUCK_SIGN_DRAW_GET = 715;
	/** 幸运福签开启消耗 */
	@FieldNotes(notes = "幸运福签开启消耗", value = 716)
	public static final int LUCK_SIGN_OPEN_COST = 716;
	/** 幸运福签合成消耗 */
	@FieldNotes(notes = "幸运福签合成消耗", value = 717)
	public static final int LUCK_SIGN_SYNTHESIS_COST = 717;
	/** 幸运福签合成获得 */
	@FieldNotes(notes = "幸运福签合成获得", value = 718)
	public static final int LUCK_SIGN_SYNTHESIS_ADD = 718;

	/** 侍女增加繁荣度 */
	@FieldNotes(notes = "侍女增加繁荣度", value = 719)
	public static final int MAID_PROSPERITY_ADD = 719;
	
	/** 府邸商店刷新消耗 */
	@FieldNotes(notes = "府邸商店购买 ", value = 720)
	public static final int HOUSE_SHOP_REST = 720;

	/** 犒赏三军等级奖励 */
	@FieldNotes(notes = "犒赏三军等级奖励", value = 721)
	public static final int KLSG_REWARD = 721;
	/** 犒赏三军任务奖励 */
	@FieldNotes(notes = "犒赏三军任务奖励", value = 722)
	public static final int KLSG_TASKREWARD = 722;
	/** 犒赏三军进阶 */
	@FieldNotes(notes = "犒赏三军进阶 ", value = 723)
	public static final int KLSG = 723;
	/** 犒赏三军购买等级消耗 */
	@FieldNotes(notes = "犒赏三军购买等级消耗", value = 724)
	public static final int KLSG_BUYNUM = 724;
	
	/** 万元红包领取奖励 */
	@FieldNotes(notes = "万元红包领取奖励", value = 725)
	public static final int WANYUANHONGBAO_AWARD = 725;
	
	/** 超值礼包发放奖励 */
	@FieldNotes(notes = "超值礼包发放奖励", value = 726)
	public static final int EXTRA_VALUE_GIFT_BAG = 726;

	public static void main(String[] args) {
		//输出常量配置的注释与对应值的配置表，给后台php用
		Class<SourceGoodConst> clazz = SourceGoodConst.class;
		Field[] fields = clazz.getFields();
		try {
			//输出文件
			String fileName = GamePath.USER_DIR+GamePath.SEP+"constExcel"+GamePath.SEP+"constExcel.csv";
			File file = new File(fileName);
			if(!file.getParentFile().exists()){
				file.getParentFile().mkdirs();
			}
			if(file.exists()){
				file.delete();
			}
			file.createNewFile();
			Writer writer = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(file), "gbk"));
			String content = null;
			for(Field field : fields){
				FieldNotes notes = field.getAnnotation(FieldNotes.class);
				if(notes != null){
					String note = notes.notes();
					int value = notes.value();
					content = value + "," + note+"\n";
					writer.write(content);
				}
			}
			writer.flush();
			writer.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
