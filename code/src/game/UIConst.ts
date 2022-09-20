class UIConst {
	public constructor() {
	}

	/** 创建角色 */
	public static CREATEROLE = 1;
	/** 掉线 */
	public static OFFLINE = 2;
	/** 掉线 */
	public static OFFLINE1 = 10;
	/** gm */
	public static GM = 3;
	/** gm协议 */
	public static GM_PROTOCOL = 9;
	/**维护*/public static MAINTAIN = 4;

	/**场景切换*/public static ARPG_SCENEVIEW = -1;

	/**战斗胜利结算 */public static COMMON_WIN = 5;
	/**战斗胜利失败 */public static COMMON_FAIL = 6;
	/**战斗胜利结算 continue*/public static COMMON_WIN1 = 7;
	/**战斗胜利结算 晋级*/public static COMMON_WIN2 = 8;
	/**功能预告*/public static FUNCTIONNOTICE = 11;
	/**地图*/public static MAP = 12;
	/** 创建角色 动画*/
	public static STORE_ANI = 13;
	/** 中间提示 */
	public static COMMONWARN = 20;
	public static COMMON_PROMPT = 21;
	/**道具提示 */
	public static BROADCASTITEMTEXT = 23;
	/** 跨服loding */
	public static CONNECT_WORLD = 22;
	/**弹窗提示*/public static ALERT = 25;
	/**奖励显示*/public static REWARD_SHOW = 30;
	/**宝箱奖励显示*/public static BOX_REWARD_SHOW = 31;
	/**材料获取*/public static CAILIAO_GET = 32;
	/**tips*/public static TIP_BAG_ITEM = 33;
	/**tips*/public static TIP_BAG_ITEM_USE = 34;
	/**tips*/public static TIP_EQUIP = 35;
	/**tips*/public static TIP_ROLE_EQUIP = 36;
	/**tips*/public static TIP_ZHANJIA_DAN = 37;
	/**tips*/public static TIP_WUJIANG_DAN = 38;
	/** 开场动画 */
	public static CARTOON = 40;
	/**玩法说明*/public static WFSM_PANEL = 41;
	/**tips*/public static TIP_STRING = 42;
	/**奖励显示 倒计时*/public static REWARD_SHOW1 = 43;
	/**获取新武将tips */public static WU_JIANG_GETTIPS = 44;
	/**tips*/public static TIP_WUJIANG_SKILLSHOW = 45;
	/**获取新神剑tips */public static SHENJIAN_GETTER = 46;
	/**购买次数弹窗提示*/public static ALERT_BUY = 47;
	/**奖励显示 倒计时*/public static REWARD_SHOW2 = 48;
	/**死亡复活界面*/public static REVIVE_PANEL = 49;

	/**boss提示 */public static BOSS_TISHI = 50;
	/**羁绊说明*/public static WFLAB_PANEL = 51;
	/**天书灭世*/public static TSMS_PANEL = 52;
	/**连击*/public static LIANJI = 53;
	/**概率展示*/public static GAILV = 54;
	/**tips*/public static TIP_BAG_ITEM_USE1 = 55;
	/**随机礼包*/public static GIFTBAG_USE = 56;
	/**快速购买*/public static QUICK_BUY = 57;
	/**新手剧情*/public static XIN_SHOU_JU_QING = 58;
	/**活动提示*/public static ACTIVITY_PROMPT = 59;
	/**tips-武将*/public static TIP_BAG_ITEM_USE_WUJ = 60;
	/**tips-7系统*/public static TIP_BAG_ITEM_USE_SYS = 61;
	/**奖励领取界面 可加领取次数*/public static REWARD_SHOW3 = 62;
	/**微信sdk帮助面板*/public static HELP_PANEL = 63;
	/**奖励领取界面 自定义文本*/public static REWARD_SHOW4 = 64;
	/**奖励领取界面 自定义文本2*/public static REWARD_SHOW5 = 65;
	/**购买弹窗2*/public static ALERT_BUY2 = 66;
	/**公共录像*/public static COMMON_VIDEOTAP = 67;

	/**防沉迷*/public static TRUE_NAME = 6601;
	/*防沉迷-提示*/public static TRUE_NAME_ALERT = 660101;
	/*防沉迷-奖励*/public static TRUE_NAME_REWARD = 660102;
	/** 国家 */
	public static COUNTRY = 1501;
	public static COUNTRY_SKILL = 1511;
	public static COUNTRY_SELECT = 1506;
	/**捐献 */
	public static COUNTRY_DONATE = 1502;
	public static COUNTRY_BOSS = 1505;
	public static COUNTRY_KINGSHIP = 1504;
	public static COUNTRY_KINGSHIP_REWARD = 150401;
	/**国家福利,作为红点判断的时候，0代表敬酒状态的判断， 1代表设宴道具的判断 */
	public static COUNTRY_WELFARE = 1507;
	/**宴会界面 */
	public static COUNTRY_YANHU = 15071
	/**设宴界面 */
	public static COUNTRY_SHEYAN = 15072;
	/**宴会敬酒记录 */
	public static YANHU_JINJIUJILU = 15073;
	/**国家公共编辑界面 */
	public static CONTRY_GONGGAO = 15074;

	/** 排行榜 */
	public static RANK = 5008;
	public static RANK_INFO = 5018;
	/** 背包 */
	public static BAG = 1301;
	/** 背包 熔炼*/
	public static RONGLIAN = 1302;
	public static RONGLIAN_SUCCESS = 1312;
	/** 背包 分解*/
	public static RONGLIAN_FENJIE = 1304;
	/** 背包 合成*/
	public static RONGLIAN_HC = 1303;
	/** 神装 */
	public static GOD_EQUIP = 1901;
	/** 神装 */
	public static GOD_EQUIP_SUIT = 1902;
	/** 转生属性查看 */
	public static TIP_REBIRTH_LOOK = 1903;
	/** 转生大师 */
	public static VIEW_REBIRTH_DS = 1904;
	/** 转生炼魂 */
	public static TIP_REBIRTH_EQUIP = 1905;
	/** 战甲 */
	public static ZHAN_JIA = 3102;
	public static ZHAN_JIA_SKILL = 3122;
	/** 7系统通用tip */
	public static BY_SYS_TIP_SKILL = 3123;
	/** 武将 */
	public static WU_JIANG = 3101;
	public static WU_JIANG_SKILL = 3121;
	/** 武将-升阶 */
	public static WU_JIANG_JIE = 3104;
	/** 武将-将印 */
	public static WU_JIANG_JYIN = 3105;
	/** 武将-时装 */
	public static WU_JIANG_SZ = 3108;
	/** 武将-羁绊 */
	public static WU_JIANG_JIB = 3109;
	/** 战甲-升阶 */
	public static ZHAN_JIA_JIE = 3106;
	/** 战甲-套装 */
	public static ZHAN_JIA_SUIT = 3107;
	/**武将之力 */
	public static WUJIANGZHILI = 310101;
	/**武将之力 - 技能进阶 */
	public static WUJIANGZHILI_SKILL = 310102;
	/** 转生 */
	public static REBIRTH = 4101;
	/** 设置 */
	public static SETTING = 1002;
	/** 设置 头像*/
	public static SETTING_HEAD = 1003;

	/**乱世枭雄*/public static CROSS_KING = 3602;
	/**乱世枭雄 排行榜*/public static CROSS_KING_RANK = 360201;
	/**乱世枭雄 奖励*/public static CROSS_KING_REWARD = 360202;
	/**乱世枭雄 战报*/public static CROSS_KING_REPORT = 360203;
	/**乱世枭雄 晋级挑战*/public static CROSS_KING_PROMOTE = 360204;
	/**乱世枭雄 晋级成功*/public static CROSS_KING_ProSuc = 360205;
	/**乱世枭雄 乱世宝藏*/public static CROSS_KING_STORE = 3606;

	/**枭雄争霸*/public static CROSS_WARS = 3603;
	/**枭雄争霸 竞猜*/public static CROSS_WARS_BET = 360301;
	/**枭雄争霸 奖励*/public static CROSS_WARS_REWARD = 360302;
	/**枭雄争霸 名人堂*/public static CROSS_WARS_WIN = 360303;
	/**枭雄争霸 观战*/public static CROSS_WARS_LOOK = 360304;

	/**跨服矿藏*/public static CROSS_MINERAL = 3607;
	/**跨服矿藏 刷新*/public static CROSS_MINERAL_REFRESH = 360701;
	/**跨服矿藏 战报*/public static CROSS_MINERAL_REPORT = 360702;
	/**结算界面*/public static COMMON_HEAD_WIN = 360703;
	/**跨服矿藏-录像*/public static CROSS_MINE_LOOK = 360704;
	/**跨服矿藏 提示*/public static CROSS_MINE_PROMPT = 360305;

	/** 轮回副本 */
	public static LHFB = 6903;

	/** 跨服王者 */
	public static KFWZ = 3610;
	/** 跨服王者目标奖励预览界面 */
	public static KFWZ_REWARD_VIEW = 361001;
	/** 跨服王者段位奖励界面 */
	public static KFWZ_GRADE_REWARD = 361002;
	/** 跨服王者排行榜界面 */
	public static KFWZ_RANK = 361003;
	/** 跨服王者匹配界面 */
	public static KFWZ_MATCH = 361004;
	/** 跨服王者日志界面 */
	public static KFWZ_LOG = 361005;
	/** 跨服王者开始界面 */
	public static KFWZ_START = 361006;
	/** 跨服王者战斗界面 */
	public static KFWZ_BATTLE = 361007;


	public static MAIL_PANEL: number = 3201;
	public static MAIL_CONTENT: number = 320101;
	public static MAIN_SKILL: number = 1101;
	/**神技 */
	public static MAIN_SKILL_GOD: number = 1102;
	/**神技阵眼tips */
	public static GODSKILL_ZHENYAN: number = 110201;
	/**锻造-强化 */
	public static DUANZAO_STRENG: number = 1201;
	/**锻造-强化-套装 */
	public static DUANZAO_STRENG_SUIT: number = 120101;
	/**锻造-宝石 */
	public static DUANZAO_STONE: number = 1202;
	/**锻造-宝石-背包 */
	public static DUANZAO_STONE_BAG: number = 120201;
	/**锻造-宝石-套装 */
	public static DUANZAO_STONE_SUIT: number = 120202;
	/**锻造-升星 */
	public static DUANZAO_STAR: number = 1203;
	/**锻造-升星-套装 */
	public static DUANZAO_STAR_SUIT: number = 120301;
	/**锻造-升星-完美升星 */
	public static DUANZAO_STAR_PERFECT: number = 120302;
	/**锻造-铸魂 */
	public static DUANZAO_ZHUHUN: number = 1204;
	/**锻造-铸魂-噬魂 */
	public static DUANZAO_ZHUHUN_SHIHUN: number = 120401;
	/**角色界面*/public static ROLE: number = 1001;
	/**角色属性界面*/public static ROLESHUXING: number = 100201;
	/**图鉴*/public static TUJIAN: number = 2901;
	/**图鉴升级*/public static TUJIAN_UPGRADE: number = 290101;
	/**图鉴升星*/public static TUJIAN_UPSTAR: number = 290102;
	/**图鉴套装*/public static TUJIAN_SUIT: number = 290103;

	/**关卡入口UI */public static GUANQIABOSSUI = 1052;
	/**离线奖励 */public static GUANQIAOFFLINEINCOM = 105201;
	/**关卡BOSS剩余时间 */public static GQBOSSTIME = 105202;
	/**BOSS出现!! */public static BOSSAPPEAR = 105203;
	/**战斗失败 FIGHT FAULT LOSE */public static BATTLEFAULT = 105204;
	/**战斗胜利结算 */public static BATTLEWIN = 105206;
	/**关卡BOSS入口SCENEUI */public static GUANQIABOSSENTRY = 105207;
	/**领取千人杀奖励 */public static QIANRENZHAN = 105208;
	/**关卡排行榜 */public static GUANQIARNK = 105209;
	/**关卡扫荡 */public static GUANQIASWEEPING = 1054;
	/**新技能开放*/public static NEWSKILL = 105211;
	/**BOSS入场*/public static BOSSANI = 105212;
	/**关卡收益提示面板*/public static GQBOSSTIPS = 105213;
	/**关卡地图 */public static GUANQIAMAP = 1053;

	/**官衔 */public static GUANXIAN = 2101;
	/**兽灵 */public static SHOULING = 2001;
	/**兽魂觉醒 */public static SHJX = 2002;
	/**兽魂-幻形 */public static SH_HUANX = 2005;
	/**兽魂觉醒洗练 */public static SHJXXILIAN = 2002001;
	/**兽魂觉醒材料 */public static SHJXXCAILIAO = 2002002;
	/**兽魂觉醒材料 */public static SHJXCHECKINFO = 2002003;
	/**兽魂升宿大师 */public static SHSHENGSUDS = 2002004;
	/**兽魂觉醒洗练 说明*/public static SHJXXILIAN_SHUOMING = 2002005;
	// /**兽魂 幻形 */public static SHJX_HUANXING = 2002006;
	/**二十八宿 */public static ERBASU = 2003;
	/**称号 */public static TITLE = 2201;
	/**宝物 */public static BAOWU = 2501;
	/**宝物 */public static BAOWU_SJ = 2502;
	/**宝物 */public static BAOWU_JIB = 2503;
	/**宝物 属性丹*/public static BAOWU_DRUG = 250101;
	/**宝物 升级*/public static BAOWU_LEVELUP = 250102;
	/**宝物 装备*/public static BAOWU_EQUIP = 250103;
	/**宝物 神剑等tips */public static BAOWU_GETTIPS = 250104;
	/**星图*/public static XING_TU = 2301;
	/**神剑*/public static SHEN_JIAN = 2701;
	/**神剑升阶*/public static SHEN_JIAN_SJ = 2702;
	/**神剑 属性丹*/public static SHEN_JIAN_DRUG = 270101;
	/**将魂*/public static JIANGHUN = 2401;
	/**将魂套装*/public static JIANGHUN_SUIT = 240101;
	/**将魂升级*/public static JIANGHUN_UP = 240102;
	/**天书 */public static TIANSHU = 2601;
	/**天书升级 */public static TIANSHULEVEL = 2602;
	/**天书属性丹 */public static TIANSHUDRAG = 2603;
	/**轮回*/public static LUNHUI = 6901;
	/**天命*/public static TIANMING = 6902;

	/**兵法 */public static BINGFA = 2801;
	/**兵法 升阶 */public static BINGFA_SJ = 2802;
	/**兵法 羁绊 */public static BINGFA_JIB = 2803;
	/**兵法 属性丹*/public static BINGFA_DRUG = 280102;
	/**商城*/public static SHOP = 3401;
	/**声望商城*/public static SHOP_SW = 340101;
	/**神秘商城*/public static SHOP_SM = 3402;
	/**异宝*/public static YIBAO = 3301;
	/**异宝升阶*/public static YIBAO_SJ = 3302;
	/**异宝属性丹*/public static YIBAO_DRUG = 330101;
	/** 每日任务 */
	public static DAILYTASK = 4102;
	public static DAILYTASKBOX = 410201;
	/**活动预览奖励 */
	public static VACTPREVIEWBOX = 410202;
	/** 推送消息设置 */
	public static TUISONG_SET = 410203;
	public static TUISONG_SET_BOX = 410205;
	/**副本*/public static FUBEN = 1701;
	/**主城*/public static MAINTOWN = 1401;
	/**副本-一骑当千*/public static FUBEN_YJDQ = 1704;
	/**副本-一骑当千提示*/public static FUBEN_YJDQ_PROMPT = 170401;
	/**副本-一骑当千奖励*/public static FUBEN_YJDQ_REWARD = 170402;
	/**副本-一骑当千胜利失败*/public static FUBEN_YJDQ_WIN = 170403;
	/**副本-一骑当千排行*/public static FUBEN_YJDQ_RANK = 170404;
	/**副本-一骑当千奖励展示*/public static FUBEN_YJDQ_REWARDSHOW = 170405;
	/**副本-一骑当千奖励波数显示*/public static FUBEN_YJDQ_WAVE = 170406;
	/**副本-过关斩将 战斗结算*/public static FUBEN_RUNMAN_RES = 170407;
	/**副本-过关斩将 扫荡*/public static FUBEN_RUNMAN_MOP = 170408;
	/**副本-材料副本*/public static FUBEN_CAILIAO = 1703;
	/**BOSS*/public static BOSS = 1801;
	/**BOSS*/public static DRBOSS = 1802;
	/**全名BOSS*/public static QMBOSS = 1803;
	/**孟获*/public static MHBOSS = 1804;
	/**吕布*/public static LBBOSS = 1805;
	/**全名BOSSRANK*/public static QMBOSSRANK = 18031;
	/**死亡倒计时*/public static RELIFEPANEL = 18032;
	/**南征北战*/public static NANZHENG_BEIZHAN = 1503;
	/**南征北战 排行榜*/public static NANZHENG_BEIZHAN_RANK = 150301;
	/**南征北战 扫荡*/public static NANZHENG_BEIZHAN_SAODANG = 150302;
	/**南征北战 积分奖励*/public static NANZHENG_BEIZHAN_JIFEN = 150303;
	/**吕布宝箱*/public static LVBUBOX = 18051;
	/**三国战神*/public static SANGUO_ZHANSHEN = 1602;
	/**三国战神奖励预览*/public static SANGUO_ZHANSHEN_REWARD = 160201;
	/**三国战神排名提升奖励*/public static SANGUO_ZHANSHEN_RANK_REWARD = 160202;
	/**三国战神 战神宝藏*/public static SANGUO_ZHANSHEN_BZ = 1605;
	/**吕布排行*/public static LVBURANK = 18052;
	/**吕布对话*/public static LVBUDAILOG = 18054;
	/**过关斩将 */public static RUNMAN = 1705;
	/**铜雀台 */public static PEACOCK = 1702;
	/**铜雀台 奖励*/public static PEACOCK_REWARD = 170201;
	// /**铜雀台 战斗结算框*/public static PEACOCK_BATTLE_RES = 1722;
	/**孟获排行榜*/public static MHRANK = 18040;
	/**孟获目标奖励*/public static MHAWARDS = 18041;
	/**场景加载界面*/public static SCENELOADING = 18042;
	/**单刀赴会*/public static DANDAO_FUHUI = 1603;
	/**单刀赴会排行榜*/public static DANDAO_FUHUI_RANK = 160301;
	/**单刀赴会匹配界面*/public static DANDAO_FUHUI_MATH = 160302;
	/**单刀赴会战斗记录*/public static DANDAO_FUHUI_BATTLENOTE = 160303;
	/**单刀赴会玩法说明*/public static DANDAO_FUHUI_EXPLAIN = 160304;
	/**单刀赴会奖励显示*/public static DANDAO_FUHUI_REWARDSHOW = 160305;
	/**首冲*/public static SHOUCHONG = 5602;
	/**每日首冲*/public static MEIRISHOUCHONG = 5006;
	/**每日首冲*/public static MRSCBOX = 50062;
	/**充值*/public static CHONGZHI = 5003;
	/**VIP*/public static VIP = 5001;
	/**VIP礼包*/public static VIPGIFT = 500101;
	public static LOGINVIP = 500112;
	/**VIP*/public static VIPDESC = 50011;
	/**三国无双*/public static SANGUO_WUSHUANG = 1604;
	/**三国无双*/public static SGWS_RANK = 16041;
	/**三国无双*/public static SGWS_DESC = 16042;
	/**三国无双*/public static SGWS_POOL = 16043;
	/**三国无双*/public static SGWS_WIN = 16044;
	/**三国无双*/public static SGWS_YZ = 16045;
	/**竞技*/public static ARENA = 1601;
	/**福利*/public static WELFARE = 4201;
	/**福利-签到*/public static WELFARE_SIGN = 4202;
	/**福利-激活码*/public static WELFARE_ACTCODE = 4203;
	/**福利-周卡*/public static WEEK_VIP = 4205;
	/**福利-奖励找回 */public static REWARD_BACK = 4206;
	/**圣兽降临*/public static ACT_HOLY_BEAST = 6401;
	/**圣兽降临-圣兽寻宝*/public static ACTHB_XUNBAO = 2004;
	/**圣兽降临-充值转盘*/public static ACTHB_ZHUANPAN = 6403;
	/**圣兽降临-圣兽洗练*/public static ACTHB_XILIAN = 6404;
	/**圣兽降临-圣兽目标*/public static ACTHB_MUBIAO = 6405;
	/**圣兽降临-每日活跃*/public static ACTHB_HUOYUE = 6406;
	/**圣兽降临-转盘奖励*/public static ACT_HOLYB_ZPSHOW = 640101;
	/**圣兽降临-寻宝排行*/public static ACT_HOLYB_XBRANK = 640102;
	/**圣兽降临-寻宝目标*/public static ACT_HOLYB_XBMUBIAO = 640103;
	/**圣兽降临-寻宝奖励展示*/public static ACT_HOLYB_XBSHOW = 640104;
	/**圣兽降临-寻宝排行奖励*/public static ACT_HOLYB_XBREWARD = 640105;
	/**圣兽降临-洗练排名*/public static ACTHB_XILIANRANK = 6407;
	/**圣兽降临-洗练排名界面*/public static ACTHB_XILIANRANK_VIEW = 640701;
	/**圣兽降临-三国战令界面*/public static ACTHB_SGZL = 6408;
	/**圣兽降临-三国战令进阶界面*/public static ACTHB_SGZL_UPGRADE = 640801;
	/**精彩活动*/public static HUODONG = 4501;
	/**精彩活动-登录豪礼*/public static HUODONG_DAILY_GIFT = 4502;
	/**精彩活动-登录豪礼-活动*/public static HUODONG_DAI_GIFT_ACT = 4510;
	/**精彩活动-登录豪礼-开服*/public static HUODONG_DAI_GIFT_KF = 4509;
	/**精彩活动-单笔充值*/public static HUODONG_DAILY_ONE = 4503;
	/**精彩活动-单笔充值-活动*/public static HUODONG_DAI_ONE_ACT = 4512;
	/**精彩活动-单笔充值-开服*/public static HUODONG_DAI_ONE_KF = 4511;
	/**精彩活动-累计充值2*/public static HUODONG_ADD_RECHARGE = 4504;
	/**精彩活动-累计充值1*/public static HUODONG_ADD_RECHARGESYS = 4515;
	/**精彩活动-单日累充*/public static HUODONG_DAILY_ADDUP = 4505;
	/**精彩活动-单日累充-活动*/public static HUODONG_DAI_ADD_ACT = 4514;
	/**精彩活动-单日累充-开服*/public static HUODONG_DAI_ADD_KF = 4513;
	/**精彩活动-超级点将*/public static HUODONG_DIANJIANG = 4506;
	/**精彩活动-超级点将*/public static HUODONG_DIANJIANG_SYS = 4516;
	/**精彩活动-超级点将814*/public static HUODONG_DIANJIAN814 = 4524;
	/**精彩活动-开服前-七天连续充值*/public static HUODONG_SEVEN_KAIFU = 4507;
	/**精彩活动-开服后-七天连续充值*/public static HUODONG_SEVEN_ACT = 4508;
	/**精彩活动-登录豪礼8-14*/public static HUODONG_DAILY_GIFT814 = 4520;
	/**精彩活动-单笔充值8-14*/public static HUODONG_DAILY_ONE814 = 4521;
	/**精彩活动-累计充值8-14*/public static HUODONG_ADD_RECHARGE814 = 4522;
	/**精彩活动-单日累充8-14*/public static HUODONG_DAILY_ADDUP814 = 4523;
	/**精彩活动-连续充值8-14*/public static HUODONG_SEVEN814 = 4525;

	/**专属活动*/public static HUOD_ONLY = 7101;
	/**专属活动-单笔充值*/public static HUOD_ONLY_DAILY_ONE = 7102;
	/**专属活动-商店*/public static HUOD_ONLY_SHOP = 7103;
	/**专属活动-单笔返利*/public static HUOD_ONLY_DBFanLi = 7104;
	/**专属活动-累计充值*/public static HUOD_ONLY_ADD_RECHARGE = 7105;
	/**专属活动-元宝返利*/public static HUOD_ONLY_YBFL = 7106;

	/**成就*/public static ACHIEVEMENT = 7801;
	/**成就*/public static ACHIEVEMENT_MASTER = 780101;
	/**成就*/public static ACHIEVEMENT_REWARD = 780102;

	/**特权*/public static TEQUAN = 5004;
	/**七天登录*/public static SEVENDAY_LOGIN = 5005;
	/**晋升*/public static JINSHENG = 4103;
	/**晋升奖励*/public static JINSHENG_REWARD = 410301;
	/**晋升提示*/public static JINSHENG_PROMPT = 410302;
	/**功能预览*/public static FUNCTIONPREVIEW = 3901;
	/**武圣榜*/public static WUSHENGLIST = 4901;
	/**武圣榜排行*/public static WUSHENGLIST_RANK = 490101;
	/**宝库 隆中宝库*/public static BAOKU_LZ = 3801;
	/**宝库 无双宝库*/public static BAOKU_WS = 3802;
	/**宝库 枭雄宝库*/public static BAOKU_XX = 3803;
	/**宝库 三国宝库*/public static BAOKU_SG = 3804;
	/**玲珑阁*/public static LING_LONG = 4801;
	/**玲珑阁 排行版*/public static LING_LONG_RANK = 480101;
	/**玲珑阁 奖励*/public static LING_LONG_REWARD = 480102;
	/**玲珑阁 展示*/public static LING_LONG_SHOW = 480103;
	/**聚宝盆*/public static JUBAOPENG = 5002;

	/**活动大厅*/public static ACTIVITYHALL = 3701;
	/**隆中对*/public static LONGZHONGDUI = 3702;
	/**隆中对*/public static LONGZHONGDUIRET = 37021;
	/**隆中对*/public static LZDBOX = 37022;
	/**隆中对*/public static LZDRANK = 37023;
	/**聊天*/public static CHAT = 3001;
	/**聊天 查看*/public static CHAT_LOOK = 300101;
	/**聊天 黑名单*/public static CHAT_BLACKLIST = 300102;
	/**广播*/public static BROADCAST = 300103;
	/**聊天图鉴展示*/public static CHAT_TUJIAN = 300104;
	/**聊天武将展示*/public static CHAT_WUJIANG = 300105;
	/**聊天宝物神剑展示*/public static CHAT_BAOWU = 300106;
	/**聊天少主展示*/public static CHAT_SHAOZHU = 300107;
	/**聊天异兽展示*/public static CHAT_YISHOU = 300108;
	/**聊天奇策展示*/public static CHAT_QICE = 300109;
	/**聊天z坐骑展示*/public static CHAT_HORSE = 300110;
	/**聊天z侍女展示*/public static CHAT_MAID = 300111;
	/**群英镑*/public static QUNYINGBANG = 4401;
	/**开服狂欢*/public static KAIFUKUANGHUAN = 5101;
	/**超值返利*/public static CHAOZHIFL = 4601;
	/**超值转盘*/public static CHAOZHI_ZHUANPAN = 4604;
	/**折扣商店*/public static DISCOUNT_SHOP = 4605;
	/**升阶商店*/public static SHENGJIE_SHOP = 4615;
	/**超值转盘奖励*/public static CHAOZHI_ZHUANPAN_REWARD = 460401;
	/**超值转盘个人记录*/public static CHAOZHI_ZHUANPAN_NOTE = 460402;
	/**全民狂欢*/public static QUANMIN_KUANGHUAN = 5201;
	/**全民BOSS*/public static QUANMIN_KUANGHUAN_BOSS = 5202;
	/**乱世枭雄*/public static QUANMIN_KUANGHUAN_XIAOXIONG = 5203;
	/**魔神吕布*/public static QUANMIN_KUANGHUAN_LVBU = 5204;
	/**单刀赴会*/public static QUANMIN_KUANGHUAN_FUHUI = 5205;
	/**更新公告*/public static WELFARE_NOTICE = 4204;
	/**分享*/public static SHARE = 5401;
	/**吕布降临*/public static VIEWLVBUCOMEUP = 5501;
	/**吕布降临排行 */public static VIEWLBPAIHANG = 550101;
	/**吕布降临领取奖励 */public static VIEWLBGETJL = 550102;
	/**血战到底-7天内 */public static WARTODEAD_7IN = 4606;
	/**血战到底-7天后 */public static WARTODEAD_7OUT = 4607;
	/**首冲团购 */public static GROUP_BUY = 4608;
	/**首冲团购 814*/public static GROUP_B814 = 4527;
	/**藏宝阁*/public static CANGBAOGE = 5601;
	/**藏宝阁 神将送礼 排行榜 新服 开服前2-28系统*/public static CANGBAOGE_RANK = 5604;
	/**藏宝阁 神将送礼 排行榜 新服 开服后29活动*/public static CANGBAOGE_RANK2 = 5605;

	/**藏宝阁 神将送礼 排行榜 老服 开服前30系统*/public static CANGBAOGE_RANK_OLDER = 5606;
	/**藏宝阁 神将送礼 排行榜 老服 开服后30活动*/public static CANGBAOGE_RANK2_OLDER = 5607;

	/**藏宝阁 神将送礼 目标奖励*/public static CANGBAOGE_REW = 560401;

	/**元宝返利 7天*/public static YUANBAOFL_KF = 4611;
	/**元宝返利*/public static YUANBAOFANLI = 4612;
	/**材料返利 7天*/public static CAILIAOFL_KF = 4609;
	/**材料返利*/public static CAILIAOFANLI = 4610;
	/**连续消费1 */public static LXXF1 = 4613;
	/**连续消费2 */public static LXXF2 = 4614;
	/**组队副本 */public static CROSS_TEAM = 3604;
	/**每日直购 */public static ZHI_GOU = 5010;
	/**每日直购 */public static SYSTEM_ZHI_GOU = 5009;
	/**每日直购（8-28） */public static ZHI_GOU828 = 4526;
	/**每日直购（8-28） 奖励*/public static ZHI_GOU_REWARD = 452601;

	/**烽火狼烟*/public static FHLY = 3703;
	/**烽火狼烟 排行榜*/public static FHLY_RANK = 370301;
	/**烽火狼烟 城池信息*/public static FHLY_INFO = 370302;
	/**烽火狼烟 战斗结算*/public static FHLY_BATTLE = 370303;
	/**烽火狼烟 活动结束*/public static FHLY_END = 370304;
	/**烽火狼烟 征收积分*/public static FHLY_SCORE = 370305;
	/**升阶秘境1 */public static SJMJ1 = 3605;
	/**升阶秘境2 */public static SJMJ2 = 360501;
	/**宝箱 */public static SJMJ_BX = 360502;
	/**扫荡 */public static SJMJ_SD = 360503;

	/** 群雄逐鹿 */public static QXZL = 3706;
	/** 群雄逐鹿 城池信息 */public static QXZL_CITY_INFO = 370601;
	/** 群雄逐鹿 任务 */public static QXZL_TASK = 370602;
	/** 群雄逐鹿 宝库商店 */public static QXZL_SHOP = 370603;
	/** 群雄逐鹿 排行界面 */public static QXZL_RANK = 370604;
	/** 群雄逐鹿 战况界面 */public static QXZL_EVENT = 370605;
	/** 群雄逐鹿 驻守奖励界面 */public static QXZL_REWARD = 370606;
	/** 群雄逐鹿 单枪匹马界面 */public static QXZL_DQPM = 370607;

	/** 奇策 升星*/public static QICE_STAR = 7700;
	/** 奇策 兵魂*/public static QICE_HUN = 770001;
	/** 奇策 套装*/public static QICE_SUIT = 770003;
	/** 奇策 升级*/public static QICE_LEVEL = 7701;
	/** 奇策 出谋划策*/public static QICE_LOTTERY = 7702;
	/** 奇策 出谋划策*/public static QICE_LOTTERY_TARGET = 770201;

	/**宝物现世*/public static BW_XIANSHI = 5603;
	/**国家boss排行*/public static COUNTRYBOSS_RANK = 150501;
	/**国家boss排行*/public static COUNTRYBOSS_RANK1 = 150502;
	/**三国庆典 */public static SANGUOQD = 5701;
	/**消费排行 */public static XIAOFEIPH = 5702;
	/**消费排行-排行榜 */public static XIAOFEIPHB = 5702001;
	/**豪礼兑换 */public static HaoLiDuiHuan = 5703;
	/**基金 */public static JiJin = 5704;
	/**三国庆典-转盘 */public static SG_ZHUANPAN = 5705;
	/**三国庆典-转盘-奖励*/public static SG_ZHUANPAN_SHOW = 57051;
	/**三国庆典-转盘-排行奖励*/public static SG_ZHUANPAN_REWARD = 57052;
	/**三国庆典-转盘-目标奖励*/public static SG_ZHUANPAN_TARGET_REWARD = 57053;
	/**三国庆典-商店*/public static SGQD_SHOP = 5710;
	/**活跃有礼 */public static HUOYUEYOULI = 5706;
	/**登录送礼 */public static DENGLUSONGLI = 5707;
	/**单笔返利 */public static DANBIFANLI = 5708;
	/**累充返利 */public static LEICHONGFANLI = 5709;

	/**闯关有礼*/public static CHUANGGUANYOULI = 5801;

	/**问鼎天下*/public static WENDINGTX = 3705;
	/**累冲回馈 */public static LCHK = 5901;
	/**问鼎天下 排行榜*/public static WENDINGTX_RANK = 370501;
	/**问鼎天下 结算*/public static WENDINGTX_RET = 370502;
	/**八门金锁 */public static EIGHTLOCK = 6101;
	/**八门金锁任务细节 */public static VIEWTASKINFO = 6101001;
	/**符文收集 */public static FUWENCOLLECT = 6102;
	/**符文鉴定 */public static FUWENJIANDING = 6103;
	/**符文有礼 */public static FUWENYOULI = 6104;
	/**直升丹 */public static ZHISHENGDAN = 6666;
	/**鉴定排名 */public static AUTHEN_RANK = 6105;
	/**鉴定排名 详细界面 */public static VIEW_AUTHEN_RANK = 610501;

	/**八阵图*/public static BAZHENTU = 6001;
	/**八阵图 分解*/public static BAZHENTU_FENJIE = 6002;
	/**八阵图 鉴定*/public static BAZHENTU_JIANDING = 6003;
	/**八阵图 神符兑换*/public static BAZHENTU_GOD = 6005;
	/**八阵图 展示*/public static BAZHENTU_SHOW = 600101;
	/**八阵图 背包*/public static BAZHENTU_BAG = 60010101;
	/**八阵图 模板*/public static BAZHENTU_TEMP = 60010102;
	/**八阵图 购买*/public static BAZHENTU_BUY = 60010103;
	/**八阵图 tips*/public static TIP_BAZHENTU_ITEM = 60010104;
	/**八阵图 大师*/public static BAZHENTU_DASHI = 60010105;

	/**阵眼*/public static ZHENYAN = 6004;

	/**血战到底(8-14)*/public static WARTODEAD1 = 4616;
	/**折扣商店(8-14)*/public static DISCOUNT_SHOP1 = 4617;
	/**元宝返利(8-14)*/public static YUANBAOFANLI1 = 4618;
	/**超值返利(8-28)*/public static CHAOZHIFL1 = 4619;
		/**连续消费(8-14) */public static LXXF3 = 4620;
	/**诸将演武主UI */public static ZJYW = 6200;
	/**诸将演武子UI */public static CHILDZJYW = 6201;
	/**火烧赤壁UI */public static CHILD_HSCB = 6202;
	/**火烧赤壁-排行榜*/public static HSCB_RANK = 620201;
	/**六出祁山 */public static CHILD_LCQS = 6203;
	/**六出祁山-界面 */public static CHILD_LCQS_PANEL = 620301;
	/**六出祁山-扫荡 */public static CHILD_LCQS_SAODANG = 620302;
	/**虎牢关 */public static CHILD_TIGER_PASS = 7400;
	/**虎牢关 雇佣*/public static TIGER_PASS_EMPLOY = 740001;
	/**虎牢关 报名*/public static TIGER_PASS_SIGNUP = 740002;

	/**本服 BOSS战场*/public static BOSS_BATTLEFIELD_LOCAL = 6211;
	/**BOSS战场*/public static BOSS_BATTLEFIELD_CROSS = 6212;
	/**BOSS战场 商店*/public static BOSSZC_SHOP = 621201;
	/**少主*/public static SHAOZHU = 6301;
	/**少主--亲密度*/public static SHAOZHU_QINMI = 6302;
	/**少主--技能*/public static SHAOZHU_SKILL = 6303;
	/**少主--祈愿*/public static SHAOZHU_QIYUAN = 6304;
	/**少主--时装*/public static SHAOZHU_FASHION = 6305;
	/**少主祈愿 抽奖展示*/public static SHAOZHU_QIYUAN_SHOW = 630401;
	/**少主祈愿 积分奖励*/public static SHAOZHU_QIYUAN_REWARD = 630402;

	/**少主--亲密度-奖励*/public static SHAOZHU_QINMI_REWARD = 630201;
	/**少主--被动技能展示*/public static SHAOZHU_ALLSKILL = 630301;
	/**少主--被动技能展示*/public static SHAOZHU_ONESKILL = 630302;
	/**觉醒*/public static JUEXING = 6701;
	/**觉醒-武将*/public static JUEXING_WUJIANG = 670102;
	/**觉醒-套装*/public static JUEXING_SUIT = 670101;
	/**觉醒-神将*/public static JUEXING_GODWUJIANG = 670103;

	/**少主-目标*/static SHAOZHU_TARGET = 6806;
	/**少主-充值*/static SHAOZHU_RECHARGE = 6805;
	/**少主-单笔*/static SHAOZHU_SINGLE = 6804;
	/**少主-单笔*/static SHAOZHU_SINGLE_LOG = 680401;
	/**少主-单笔*/static SHAOZHU_SINGLE_AWARDS = 680402;
	/**少主-居居*/static SHAOZHU_PIG = 6803;
	/**少主-红包*/static SHAOZHU_HONGBAO = 6802;
	/**少主-红包*/static SHAOZHU_HONGBAO_AWARDS = 680201;
	/**少主-祈愿排名*/static SHAOZHU_QY_RANK = 6807;
	/**少主-祈愿排名详细界面*/static SHAOZHU_QY_RANK_VIEW = 680701;


	/**少主-活动图标*/static SHAOZHU_ACT = 6801;
	/**三国一统*/public static SANGUO_YITONG = 1510;
	/**三国一统-战利品*/public static SANGUO_YITONG_ZLP = 151001;
	/**三国一统-场景显示*/public static SANGUO_YITONG_SCENE = 151002;
	/**三国一统-场景奖励*/public static SANGUO_YITONG_SCENE_REWARD = 151003;

	/**少主护送*/static SHAOZHU_ESCORT = 4301;
	/**少主护送 护卫武将*/public static SHAOZHU_ESCORT_GUARD = 430101;
	/**少主护送 奖励面板*/public static SHAOZHU_ESCORT_REWARD = 430102;
	/**少主护送 战报*/public static SHAOZHU_ESCORT_REPORT = 430103;
	/**少主护送 拦截面板*/public static SHAOZHU_ESCORT_INTER = 430104;
	/**少主护送 录像*/public static SHAOZHU_ESCORT_LOOK = 430105;

	/**异兽录*/static YISHOULU = 7120;
	/**异兽天赋升级*/static YISHOULU_TF = 7122;
	/**异兽天赋升级*/static YISHOULU_TFCOLOR = 7123;
	/**修炼天赋*/static XIULIAN_TF = 7124;


	/**异兽录-仙山寻兽*/static XIANSHAN_XUNSHOU = 7121;

	/**贵宾VIP*/public static GUI_BIN_VIP = 6910;
	/** 专属神兵 */
	public static ZS_GODWEAPON = 7001;
	/** 专属神兵 -升星*/
	public static ZS_GODWEAPON_UPSTAR = 7002;
	/** 专属神兵-淬炼*/
	public static ZS_GODWEAPON_CL = 7003;
	/** 专属神兵-打造神兵*/
	public static ZS_GODWEAPON_DUANZAO = 7004;
	/** 专属神兵-属性丹*/
	public static ZS_GODWEAPON_DAN = 700401;
	/** 专属神兵-属性丹*/
	public static ZS_GODWEAPON_SUIT = 700402;
	/** 专属神兵-打造奖励*/
	public static ZS_GODWEAPON_REWARD = 700403;
	/** 专属神兵-获得新皮肤显示*/
	public static ZS_GODWEAPON_BODY_SHOW = 700404;

	/** 通用活动 */
	public static ACTCOM = 7200;
	/** 曹操来袭 */
	public static CAOCAO_LAIXI = 7203;
	/** 曹操来袭-排行 */
	public static CAOCAO_LAIXI_RANK = 720301;
	/** 曹操来袭-复活倒计时 */
	public static CAOCAO_LAIXI_RELIFEPANEL = 720302;
	/** 曹操来袭-宝箱 */
	public static CAOCAO_LAIXI_BOX = 720303;
	/** 消费翻牌 */
	public static XFFP = 7206;
	/** 幸运福签 */
	public static XYFQ = 7246;
	/** 幸运福签排行界面 */
	public static XYFQ_RANK = 724601;
	/** 幸运福签任务界面 */
	public static XYFQ_TASK = 724602;
	/** 幸运福签开启界面 */
	public static XYFQ_QIAN_USE = 724603;
	/** 幸运福签奖励预览界面 */
	public static XYFQ_REWARD = 724604;
	/** 幸运福签合成界面 */
	public static XYFQ_COMPOUND = 724605;
	/** 首充重置 */
	public static SHOUCHONG_RESET = 7207;
	public static ACTCOM_DBZP = 7201;
	public static ACTCOM_DBZP_LOG = 720101;
	public static ACTCOM_DBZP_AWARDS = 720102;
	public static ACTCOM_CZZP = 7202;
	public static ACTCOM_CZZP_SHOW = 720201;
	public static ACTCOM_XFZP = 7205;
	public static ACTCOM_XFZP_SHOW = 720501;
	public static ACTCOM_VIPZK = 7208;

	/** 限定武将 */
	public static ACTCOM_XIANDING = 7210;
	/** 限定武将 查看奖励 */
	public static ACTCOM_XIANDING_REWARD = 721001;

	public static ACTCOM_SBZK = 7211;//神兵折扣
	/**三国宝藏 */
	public static ACTCOM_SGBZ = 7204;
	public static ACTCOM_SGBZ_PREVIEW = 720401;
	public static ACTCOM_SGBZ_LIST = 720402;
	/** 限时抢购 */
	public static ACTCOM_BUYLIMIT = 7212;
	/** 个人bos 组队副本等双倍奖励 */
	public static ACTCOM_DOUBLE = 7213;
	/** 充值排行 */
	public static ACTCOM_CZPH = 7209;
	/** 充值排行-排行榜 */
	public static ACTCOM_CZPH_RANK = 720901;
	/**万兽之王*/public static WSZW_ACT = 7300;
	/**万兽之王-连充豪礼*/public static WSZW_LIANCHONGHAOLI = 7301;
	/**万兽之王-累计充值*/public static WSZW_LEICHONG = 7302;
	/**万兽之王-每日活跃*/public static WSZW_HUOYUE = 7303;
	public static ACTCOM_LOGINREWARD = 7305;
	public static ACTCOM_RANK = 7306;
	public static ACTCOM_RANK_RANK = 730601;
	public static YSSL = 7304;
	/**新活动-鉴定排名*/public static ACTCOM_JDPM = 7214;
	/**新活动-祈愿排名*/public static ACTCOM_QYPM = 7215;
	public static ACTCOM_SJZK = 7216;//神将折扣
	/**新活动-消费砸蛋*/public static ACTCOM_XFZD = 7217;
	/** 消费摇骰 */
	public static ACTCOM_XFYT = 7220;
	/** 打气球 */
	public static ACTCOM_BALLOON = 7221;
	/** 三国战令（活动） */
	public static ACTCOM_SGZL2 = 7226;
	/** 三国战令（活动）升阶界面 */
	public static ACTCOM_SGZL2_UPGRADE = 722601;
	/** 宝藏拼图 */
	public static ACTCOM_BZPT = 7227;
	/** 宝藏拼图奖励界面 */
	public static ACTCOM_BZPT_REWARD = 722701;
	/** 成就树 */
	public static ACTCOM_CJS = 7228;
	/** 成就树任务列表界面 */
	public static ACTCOM_CJS_TASK = 722801;
	/** 成就树层级奖励界面 */
	public static ACTCOM_CJS_REWARD = 722802;
	/** 双12商城 */
	public static ACTCOM_SHOP12 = 7231;
	/** 双12商城购买确认界面 */
	public static ACTCOM_SHOP12_BUY = 723101

	/** 刮刮乐 */
	public static ACTCOM_GGL = 7243;

	/** 幸运扭蛋 */
	public static ACTCOM_LUCKY_EGG = 7233;
	/** 幸运扭蛋奖励预览界面 */
	public static ACTCOM_LUCKY_EGG_PREVIEW = 723301;
	/** 幸运扭蛋奖池奖励界面 */
	public static ACTCOM_LUCKY_EGG_REWARD = 723302;

	/** 龙飞凤舞-天赋修炼 */
	public static ACTCOM_TAL = 7500;
	/** 龙飞凤舞-天赋修炼 */
	public static ACTCOM_TALENT = 7501;
	/** 龙飞凤舞-天赋目标 */
	public static ACTCOM_TALENT_GOAL = 7502;
	//全服消费
	public static ACTCOM_QFXF = 7225;
	//累计返利
	public static ACTCOM_LJFL = 7230;
	/**异兽BOSS*/public static YSBOSS = 7410;
	/**异兽BOSS RANK*/public static YSBOSSRANK = 741001;
	/**异兽BOSS RANK*/public static YSBOSSREVIVE = 741002;
	/**异兽BOSS BUY*/public static YSBOSSBUY = 741003;
	/** 合服狂欢*/
	public static HFKH = 7600;
	/** 合服活动-登录有奖 */
	public static HFKH_DLYJ = 7601;
	/** 合服活动-大神送礼 */
	public static HFKH_DSSL = 7602;
	/** 合服活动-张飞醉酒 */
	public static HFKH_ZFZJ = 7603;
	public static HFKH_ZFZJ_REWARD = 760301;
	public static HFKH_ZFZJ_RANK = 760302;
	/** 合服活动-合服首充 */
	public static HFKH_HFSC = 7604;
	/** 合服活动-充值返利 */
	public static HFKH_CZFL = 7605;
	/** 神将现世 */
	public static SHENJIANG_XIANSHI = 7218;
	public static SHENJIANG_XIANSHI_REWARD = 721801;
	public static SHENJIANG_XIANSHI_RANK = 721802;
	/** 神将 */
	public static GOD_WUJIANG = 3110;
	/** 神将 修炼*/
	public static GOD_WUJIANG_XL = 3111;
	/** 神将 天赋*/
	public static GOD_WUJIANG_TF = 311001;
	public static TIANFU_SKILL_SHOW = 311002;
	/**粮草*/
	static LIANGCAO = 3707;
	static LIANGCAO_RANK = 370701;
	static LIANGCAO_RESULT = 370702;
	static LIANGCAO_BATTLEEND = 370703;
	/** 运筹帷幄 */
	public static YUNCHOUWEIWO = 7710;
	/** 运筹帷幄-锦囊妙计 */
	public static YUNCHOUWEIWO_JLMJ = 7712;
	/** 运筹帷幄-奇策有礼 */
	public static YUNCHOUWEIWO_QCYL = 7715;
	/**三英战吕布*/
	static SYZLB = 7703;
	static SYZLB_REW = 770301;
	static SYZLB_INFO = 770302;
	static SYZLB_RELIVE = 770303;
	static SYZLB_CTBUY = 770304;
	/**镇守四方 */
	static ZSSF = 7704;
	static ZSSF_GO = 770401;
	static ZSSF_BATTLEREPORT = 770402;
	static ZSSF_SHOP = 770403;
	/**登峰造极 */
	static DENG_FENG_SEA = 7720;
	static DENG_FENG_FINAL = 7721;

	static DENG_FENG_RANK = 772001;
	static DENG_FENG_POINT = 772002;
	static DENG_FENG_BET = 772003;
	static DENG_FENG_BUY = 772004;
	/**许田狩猎 */
	static XU_TIAN = 7705;
	static XU_TIAN_CANKU = 770501;
	static XU_TIAN_BUY = 770502;
	static XU_TIAN_TIP = 770503;
	//新活动-连续充值
	static XINHD_LXCZ = 7222
	/** 飞龙在天 */
	public static ACTCOM_FLZT = 7750;
	/** 飞龙在天-许愿树（活动） */
	public static WISHTREE_ACT = 7219;
	/** 飞龙在天-许愿树（系统） */
	public static WISHTREE_SYSTEM = 7751;
	/** 飞龙在天-许愿树排行榜 */
	public static WISHTREE_RANK = 775101;
	/**许愿树 排行奖励*/
	public static WISHTREE_REW = 775102;
	/**许愿树 许愿树目标排行榜*/
	public static WISHTREE_TARGET = 775103;

	/**无极而生*/
	static ACTCOM_WJES = 7760;

	/**主题消费*/
	public static ZTXF = 7223;
	/**跨服试炼*/
	public static CROSS_SHILIAN = 3609;
	/**跨服试炼查看buff*/
	public static CROSS_SHILIAN_BUFF = 360901;
	/**幸运转盘*/
	public static LUCK_TURN = 7224;
	/**幸运转盘 目标*/
	public static LUCK_TURN_TARGE = 722401;
	public static LUCK_TURN_PRIZE = 722402;
	/**限时礼包*/
	public static LIMIT_GIFT = 7770;
	/**桃园结义*/
	public static TAOYUANJIEYI = 7900;
	/**桃园结义 - 创建义盟*/
	public static TYJY_CREATE = 790101;
	/**桃园结义 - 申请列表*/
	public static TYJY_APPLY = 790102;
	/**桃园结义 - 人员调动*/
	public static TYJY_MEMBER = 790103;
	/**桃园结义 - 宝箱奖励*/
	public static TYJY_TASKBOX = 790104;
	/**桃园结义 - 开启BOSS提示界面*/
	public static TYJY_BOSSTIPS = 790105;
	/**桃园结义 - 加入义盟提示界面*/
	public static TYJY_JOINTIPS = 790106;
	/**桃园结义 - 义盟任务*/
	public static TYJY_YMRW = 7901;
	/**桃园结义 - 义盟副本*/
	public static TYJY_YMFB = 7902;
	/** 新活动-财神送礼 */
	public static ACTCOM_CSSL = 7232;
	/**节日商城*/
	static ACTCOM_JRSC = 7229;
	/**少主六艺*/
	static SHAOZHU_LIUYI = 6306;
	static SHAOZHU_LIUYI_KAOSHI = 630601;
	/**少主潜能*/
	static SHAOZHU_QIANNENG = 6307;
	static SHAOZHU_QIANNENG_DAN = 630701;
	/**坐骑*/
	static HORSE = 7811;
	/** 坐骑幻化 */
	static HORSE_HH = 7812;
	/**家园*/static HOME = 4702;
	/**家园 侍女*/static HOME_MAID = 4703;
	/**家园 侍女*/static HOME_MAID_ATTR = 470301;
	/**家园-家丁*/static HOME_JIADING = 4704;
	/**家园-家丁-技能tips*/static HOME_JIADING_SKILL = 470401;
	/**家园 金库*/static HOME_GOD_UI = 4706;
	/**家园 天工炉*/static HOME_TIANGONG_UI = 4707;
	/**家园 摇钱树*/static HOME_MONEYTREE_UI = 4708;
	/**家园 升级UI*/static HOME_LEVELUP_UI = 4709;
	/**家园 任务*/static HOME_TASK = 4710;
	/**家园 任务奖励*/static HOME_TASK_BOX = 471001;

	/**家园 奖池预览*/static HOME_PRE = 470201;
	/**家园 商店*/static HOME_SHOP_UI = 470204;
	/**家园 房间列表*/static HOME_LIST_UI = 470205;
	/**家园 天工炉 背包*/static HOME_TIANGONG_bag_UI = 470213;
	/**家园 家具*/static HOME_JIAJU_UI = 470207;

	/**家园 记录*/static HOME_LOG_UI = 470210;
	/**家园 随机*/static HOME_EVENT_UI = 470211;
	/**家园 家丁*/static HOME_JIADING_UI = 470212;
	/**家园 天工炉奖励UI*/static HOME_TGL_SHOW_UI = 470214;
	/**家园 天工炉添加*/static HOME_TGL_ADD = 470215;

	/**家园-商店*/static HOME_SHOP = 4711;
	/**宴会*/static YANHUI = 4705;
	/**宴会-赴宴*/static YANHUI_FUYAN = 470501;
	/**宴会-举办宴会*/static YANHUI_HOLD = 470502;
	/**宴会-宾客列表*/static YANHUI_BKLIST = 470503;
	/**宴会-比武*/static YANHUI_BATTLE = 470504;
	/**宴会-敬酒*/static YANHUI_TOAST = 470505;
	/**宴会-氛围奖励*/static YANHUI_FWREWARD = 470506;
	/**宴会-战斗结束*/static YANHUI_PVE_END = 470507;
	/**宴会-申请列表*/static YANHUI_APPLY = 470508;

	/**新活动-对对联*/
	static ACTCOM_DDL = 7234;
	/**对对联 排行榜*/
	public static DDL_RANK = 723401;
	/**对对联 奖励展示*/
	public static DDL_REWARD = 723402;

	/**新活动-天降红包*/
	static ACTCOM_TJHB = 7235;
	/**天降红包  发红包*/
	static TJHB_FHB = 723501;
	/**天降红包  查看记录*/
	static TJHB_RECORD = 723502;
	/**天降红包  飘落特效*/
	static TJHB_EFF = 723503;
	/**金鼠送财*/static ACTCOM_JSSC = 7237;
	/**金鼠送财特效*/static ACTCOM_JSSC_EFF = 723701;

	/**活动 年兽*/static ACTCOM_NIANSHOU = 7236;
	/**活动 年兽 奖励*/static ACTCOM_NIANSHOU_REWARD = 723601;
	/**活动 年兽 提示*/static ACTCOM_NIANSHOU_ALERT = 723602;
	/**活动-做元宵*/static ACTCOM_YUANXIAO = 7239;
	/**活动-做元宵特效*/static ACTCOM_YUANXIAO_EFF = 723901;
	/**活动-做元宵特效*/static ACTCOM_YUANXIAO_REPORT = 723902;

	/**新活动 天降豪礼*/
	static ACTCOM_TIANJIANGHL = 7240;
	/**神将觉醒*/
	static SHENJIANG_JUEXING = 7240;
	/**至尊秘宝*/
	static ACTCOMzzmb = 7242;
	/**红包*/
	static HONGBAO = 7821;
	/**红包-查看记录*/
	static HONGBAO_RECORD = 782101;
	/**红包-发红包*/
	static HONGBAO_SEND = 782102;
	/**超级弹珠*/
	static ACTCOMCJDZ = 7241;
	static ACTCOMCJDZ_POOL = 724101;
	static ACTCOMCJDZ_SHOP = 724102;
	static ACTCOMCJDZ_AWARDS = 724103;
	/**六道*/
	public static SIXWAY = 6904;
	/**六道 印记*/
	public static SIXWAY_YINJI = 690401;
	/**六道 分解*/
	public static SIXWAY_FENJIE = 690402;
	/**六道 背包*/
	public static SIXWAY_BAG = 690403;
	/**六道 套装查看*/
	public static SIXWAY_CHECK = 690404;
	/**活动 擂台*/static ACTCOM_LEITAI = 7238;
	/**活动 擂台 战报*/static ACTCOM_LEITAI_REPORT = 723801;
	/**活动 擂台 奖励*/static ACTCOM_LEITAI_REWARD = 723802;
	/**攻城拔寨*/static GCBZ = 7831;
	/**攻城拔寨=城池数据*/static GCBZ_CITYDATA = 783101;
	/**攻城拔寨=商城*/static GCBZ_SHOP = 783102;
	/**攻城拔寨=战报*/static GCBZ_BATTLEREPORT = 783103;
	/**新活动 貔貅散宝*/
	static ACTCOM_PXSB = 7244;

	/**武庙十哲*/
	public static WMSZ = 7245;
	/**武庙十哲 积分*/
	public static WMSZ_INTEGRAL = 724501;


	/**犒赏三军（开服系统）*/static WAR_ORDER = 8001;
    /**犒赏三军（活动）*/static WAR_ORDER_HD = 8003;
    /**犒赏三军 激活界面*/static WAR_ORDER_UPGRADE = 800101;
    /**犒赏三军 购买次数*/static WAR_ORDER_BUYCT = 800102;

	/**荣誉勋章（系统）*/static WAR_ORDER1 = 8002;
	/**荣誉勋章（活动）*/static WAR_ORDER_HD1 = 8004;
	/**犒赏三军 激活界面*/static WAR_ORDER_UPGRADE1 = 800201;
    /**犒赏三军 购买次数*/static WAR_ORDER_BUYCT1 = 800202;

    /**超值礼包-BT*/ static CZLB_BT = 8101;
    /**万元红包-BT*/static WYHB_BT = 8201;
}