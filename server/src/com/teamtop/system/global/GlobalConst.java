package com.teamtop.system.global;

public class GlobalConst {


	/**	 * 262协议，类型0：默认	 */
	public static int YTPE_0_WAI = 0;
	/**	 * 262协议，类型1：额外	 */
	public static int YTPE_1_WAI = 1;
	/**	 * 262协议，类型2：首通	 */
	public static int YTPE_2_WAI = 2;
	/**	 * 262协议，类型3：协助	 */
	public static int YTPE_3_WAI = 3;
	/**	 * 262协议，类型6：满员	 */
	public static int YTPE_6_WAI = 6;


	/**	 * 隐藏协议暗号参数，查看已开启的活动	 */
	public static final String AN_HAO_ACTIVITY_ALL_活动 = "AN_HAO_ACTIVITY_ALL_活动";
	/**	 * 隐藏协议暗号参数，查看本号所有限制监控领取数据	 */
	public static final String AN_HAO_RESTRICTED_个人所有监控 = "AN_HAO_RESTRICTED_个人所有监控";
	/**	 * 隐藏协议暗号参数，查看本号1个限制监控领取数据  参数:配置表ID	 */
	public static final String AN_HAO_RESTRICTED_个人单个监控 = "AN_HAO_RESTRICTED_个人单个监控";
	/**	 * 隐藏协议暗号参数，查看别人所有限制监控领取数据	 */
	public static final String AN_HAO_RESTRICTED_别人所有监控 = "AN_HAO_RESTRICTED_别人所有监控";
	/**	 * 隐藏协议暗号参数，查看别人1个限制监控领取数据  参数:玩家ID_配置表ID	 */
	public static final String AN_HAO_RESTRICTED_别人单个监控 = "AN_HAO_RESTRICTED_别人单个监控";


	/**提示类型：1全局*/
	public static final int TYPE_GLOBAL = 1;
	/**提示类型：2热更*/
	public static final int TYPE_HOSTWAP = 2;
	/**区号记录*/
	public static final int ZONEID=3;
	/**孔雀台公共数据*/
	public static final int PEACOCK=4;
	/**魔神吕布公共数据*/
	public static final int MONSTER_LVBU=5;
	/**国家*/
	public static final int COUNTRY=6;
	/** 南征北战 */
	public static final int FIGHTNS = 7;
	/**	 * 七擒孟获转生boss历史信息	 */
	public static final int ZSBOSS_HIS=8;
	/** 单刀赴会 */
	public static final int SOLORUN = 9;
	/** 隆中对 */
	public static final int LONGZHONGDUI = 10;
	/** 三国无双 */
	public static final int DYNASTY_WARRIORS = 11;
	/**枭雄争霸比赛情况(跨服)**/
	public static final int SELECTKING=12;
	/**枭雄争霸本地服全服买输赢***/
	public static final int BUYWINFINAL=13;
	/** 群英榜 */
	public static final int HEROESLIST = 14;
	/**七日武圣榜**/
	public static final int WUSHENRANK=15;
	/**玲珑阁**/
	public static final int LINGLONGGE=16;
	/** 活动 */
	public static final int ACTIVITY = 17;
	/** 超值转盘*/
	public static final int OVERTURNTABLE = 18;
	/** 登录公告 */
	public static final int LOGIN_NOTICE = 19;
	/** 服务维护设置 */
	public static final int SERVER_MAINTAIN = 20;
	/**乱世枭雄 活动第一次需要手动开启 0 1 */
	public static final int GM_CROSSKING = 21;
	/** 自动开服条件（人数）*/
	public static final int SERVER_SELF_MONTION = 22;
	/** 充值ip白名单 */
	public static final int RECHARGE_WHITE_IP_LIST = 23;
	/** 单刀赴会跨服数据 */
	public static final int CROSS_SOLORUN = 24;
	/** 装备唯一ID*/
	public static final int EQUIP_UNITID = 25;
	/**开服时间**/
	public static final int OPENTIME_SERVER=26;
	/** 吕布降临 **/
	public static final int LVBURISING = 27;
	/** 合服时间 **/
	public static final int HE_FU_TIME = 28;
	/**开服七日团购信息**/
	public static final int SEVEN_GROUPBUY=29;
	/**IOS充值开启关卡(旧)**/
	public static final int IOS_RECHARGENUM=30;
	/** 福利大厅公告 */
	public static final int WELFARE_NOTICE = 31;
	/**国家boss**/
	public static final int COUNTRY_BOSS=32;
	/** 烽火狼烟 */
	public static final int CROSS_FIREBEACON = 33;
	/** 藏宝阁 */
	public static final int HIDDEN_TREASURE = 34;
	/**玲珑阁达标区服奖励积分**/
	public static final int LINGLONGGEHIDS = 35;
	/**设置服务器预警数**/
	public static final int SETSERVERWARN=36;
	/** 跨服活动开关 */
	public static final int CROSS_ACT_SWITCH = 37;
	/** 消费排行(弃用) */
	public static final int CROSS_CONSUMERANK = 38;
	/** 三国庆典-豪礼转盘 当前活动期数 中央服用，发奖励、不一样的时候重置排行榜(弃用) */
	public static final int CROSS_CELEBRATION_HAO_LI_ZHUAN_PAN = 39;
	/** 三国庆典-豪礼转盘 排行榜数据(弃用) */
	public static final int CROSS_CELEBRATION_HAO_LI_ZHUAN_PAN_RANK_DATA = 40;
	/**到量服设置*/
	public static final int BUYNUMZONEID=41;
	/**问鼎天下MVP名字*/
	public static final int WDTX_MVP=42;
	/** 神将送礼(活动)排名 活动结束时间 */
	public static final int GODGENSENDGIFT_ACT_ENDTIME = 43;
	/**八门金锁**/
	public static final int EIGHRDOOR=44;
	/** 玲珑阁跨服 **/
	public static final int CROSS_LINGLONGGE = 45;
	/** 开启天数控制系统 在开数据 **/
	public static final int OPEN_DAYS_SYSTEM_NOW = 46;
	/** 开启天数控制系统 在开数据系统id集合 **/
	public static final int OPEN_DAYS_SYSTEM_SYSID = 47;
	/** 开启天数控制系统 已开数据 **/
	public static final int OPEN_DAYS_SYSTEM_OLD = 48;
	/** 神将送礼(系统)排名 **/
	public static final int GODGENSENDGIFT_RANKLIST = 49;
	/** 神将送礼(活动)排名 **/
	public static final int GODGENSENDGIFT_ACT_RANKLIST = 50;
	/** 开服狂欢 限制数量map **/
	public static final int SEVENHAPPY_LIMITNUM = 51;
	/** 圣兽降临-圣兽寻宝排行 **/
	public static final int SAINT_MONSTER_TREASURE_RANK = 52;
	/** 神将送礼(系统)上期排名 **/
	public static final int GODGENSENDGIFT_LASTRANKLIST = 53;
	/** 神将送礼(活动)上期排名 **/
	public static final int GODGENSENDGIFT_ACT_LASTRANKLIST = 54;
	/** 玲珑阁上期排名 **/
	public static final int LINGLONGGE_LASTRANKLIST = 55;
	/** 玲珑阁上期区积分排名 **/
	public static final int LINGLONGGE_LASTZONEIDRANKLIST = 56;
	/** 群英榜上期排名 **/
	public static final int HEROESLIST_LASTRANK  = 57;
	/**新王位之争**/
	public static final int NEW_KINGSHIP=58;
	/** 实名验证与防沉迷开关数据 */
	public static final int TRUENAME_ANTI_SWITCH = 59;
	/** 兽魂寻宝 */
	public static final int SAINT_MONSTER_TREASURE = 60;
	/** 自动开服-状态*/
	public static final int SERVER_SELF_STATE = 61;
	/** 国家技能*/
	public static final int COUNTRYSKILL = 62;
	/** 国家声望*/
	public static final int COUNTRYPRESTIGE = 63;
	/** 缓存开关(旧)*/
	public static final int ON_OFF=64;
	/**首冲团购（8-28）信息**/
	public static final int GROUPBUY_ACT=65;
	/** 八门金锁-鉴定排名*/
	public static final int CROSS_EIGHTDOOR_APPRAISERANK = 66;
	/** 少年英主-祈愿排名*/
	public static final int CROSS_SHAOZHU_QIYUANRANK = 67;
	/** 圣兽洗练排名 */
	public static final int SAINT_MONSTER_WASH_RANK = 68;
	/** 圣兽洗练排名结束时间 */
	public static final int SAINT_MONSTER_WASH_RANK_ENDTIME = 69;
	/** 圣兽洗练奖励发送时间 */
	public static final int SAINT_MONSTER_WASH_RANK_SENDREWARD = 70;
	/** 专属活动数据 */
	public static final int EXT_ACTIVITY = 71;
	/** 专属活动开启状态 */
	public static final int EXT_ACTIVITY_STATE = 72;
	/** 火烧赤壁 */
	public static final int HUO_SHAO_CHI_BI = 73;
	/**IOS充值开启关卡(新_后台)**/
	public static final int IOS_RECHARGENUM_HOUTAI=74;
	/** 缓存开关(新_后台)*/
	public static final int ON_OFF_HOUTAI=75;
	/** 三国庆典-豪礼装盘 期数(弃用) */
	public static final int CROSS_CELEBRATION_HAO_LI_ZHUAN_PAN_QS = 76;
	/** 专属活动表数据 */
	public static final int EXT_ACTIVITY_TABLE = 78;
	/** 专属活动奖励表数据 */
	public static final int EXT_ACTIVITY_REWARD_TABLE = 79;
	/** 专属活动-单笔充值*/
	public static final int EXT_ACTIVITY_ONE_RECHAREG = 80;
	/** 专属活动-单笔返利*/
	public static final int EXT_ACTIVITY_ONE_RECHAREG_BACK = 81;
	/** 专属活动-元宝返利*/
	public static final int EXT_ACTIVITY_YB_BACK = 82;
	/** 专属活动-累计充值*/
	public static final int EXT_ACTIVITY_TOTAL_RECHARGE = 83;
	/** 专属活动-专属商城*/
	public static final int EXT_ACTIVITY_SHOP = 84;
	/** 神将送礼(活动)-跨期缓存 */
	public static final int GODGENSENDGIFT_ACT_CROSS_PERIOD_CACHE = 85;
	/**曹操来袭-历史记录*/
	public static final int CAOCAOCOME_HIS=86;
	/** 屏蔽字*/
	public static final int BLOCK_WORD = 87;
	/** 限时抢购 */
	public static final int FLASHSALE_ACT = 88;
	/** 充值排行(跨服、活动) */
	public static final int CROSS_RECHARGE_RANK_ACT_CEN = 89;
	/** 充值排行(活动)-跨期缓存 */
	public static final int CROSS_RECHARGE_RANK_ACT_CROSS_PERIOD_CACHE = 90;
	/** 万兽之王-仙山寻兽排名*/
	public static final int MONSTER_KING_SEARCH_MONSTER = 91;
	/** 鉴定排名(跨服、活动) */
	public static final int CROSS_EIGHTDOOR_APPRAISERANK_ACT_CEN = 92;
	/** 鉴定排名(活动)-跨期缓存 */
	public static final int EIGHTDOOR_APPRAISERANK_ACT_CROSS_PERIOD_CACHE = 93;
	/** 祈愿排名(跨服、活动) */
	public static final int CROSS_SHAOZHU_QIYUANRANK_ACT_CEN = 94;
	/** 祈愿排名(活动)-跨期缓存 */
	public static final int SHAOZHU_QIYUANRANK_ACT_CROSS_PERIOD_CACHE = 95;
	/** 异兽BOSS*/
	public static final int SPECIALANIMAL_BOSS = 96;
	/** IP注册限制*/
	public static final int IP_WHITE_LIST = 97;
	/** 跨期缓存 */
	public static final int COMMONRANK_CROSS_PERIOD_CACHE = 98;
	/** 神将现世排行(跨服、活动) */
	public static final int CROSS_GODGENTHISLIFE_RANK_ACT_CEN = 99;
	/**合服大神送礼*/
	public static final int HEFU_GODGIFT=100;
	/**合服-张飞醉酒*/
	public static final int HEFU_ZHANGFEIBOSS=101;
	/** 消费排行活动(现用这个) */
	public static final int CROSS_CONSUMERANK_ACT_CEN = 102;
	/** 许愿树现世排行(跨服、活动) */
	public static final int CROSS_WISHINGTREE_RANK_ACT_CEN = 103;
	/** 粮草抢夺-MVP*/
	public static final int CROSS_BATTLEGOODS_MVP = 104;
	/** 定时自动开服*/
	public static final int TIMING_SELF_MOTION = 105;
	/** 三国庆典-豪礼转盘排名(现用这个) */
	public static final int CELEBRATION_HAO_LI_ZHUAN_PAN_RANK = 106;
	/** 新活动-全服消费消费数 */
	public static final int SERVERCONSUME_NEWACT_CONSUMENUM = 107;
	/** 跨服试炼 */
	public static final int CROSS_TRIAL_MATCH = 108;
	/** 功能玩法后台开关柜 */
	public static final int CROSS_GAME_SYSTEM_SWITCH = 109;
	/** 跨服王者周重置时间*/
	public static final int CROSS_TEAMKING_WEEKREST=110;
	/** 跨服王者排行*/
	public static final int CROSS_TEAMKING_RANK=111;
	/** 对对联排行(跨服、活动) */
	public static final int CROSS_COUPLET_RANK_ACT_CEN = 112;
	/** 天降红包(跨服、活动) */
	public static final int CROSS_DROPREDPACKET_NEWACT_CEN = 113;
	/** 擂台比武(跨服分组活动) */
	public static final int CROSS_ARENA_FIGHT = 114;
	/** 宴会*/
	public static final int CROSS_YANHUI=115;
	/** 登峰造极(跨服)*/
	public static final int CROSS_DENGFENGZAOJI=116;
	/** 登峰造极：每周冠军(本服)*/
	public static final int DENGFENGZAOJI_THE_FIRST=117;
	/** 府邸系统排行 */
	public static final int CROSS_HOUSE_RANK = 118;
	/** 武庙十哲(跨服、活动) */
	public static final int WUMIAOSHIZHE_RANK_ACT_CEN = 119;
	/** 幸运福签排行(跨服、活动) */
	public static final int CROSS_LUCKSIGN_RANK_ACT_CEN = 120;
}
