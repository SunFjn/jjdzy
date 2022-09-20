package com.teamtop.system.chat;


public class ChatConst {
	/**	 * 跨服	 */
	public static final int CROSS = 1; 
	/**	 * 本服	 */
	public static final int LOCAL = 2; 
	/**	 * 国家	 */
	public static final int COUNTRY = 3; 	
	/**	 * 系统	 */
	public static final int SYSTEM = 4;
	
	/**
	 * 异常状态:禁言
	 */
	public static final int STATE_ILLEGAL_JIN_YAN = 1;
	/**
	 * 异常状态：自己能看到自己发言但是别人看不到
	 */
	public static final int STATE_ILLEGAL_JIN_OTHER = 2;
	/**
	 * 异常状态:正常
	 */
	public static final int STATE_ILLEGAL_NONE = 0;
/*	*//**
	 * 广播类型，1 系统广播（广播不要类型了）
	 *//*
	public static final int BROCAST_TYPE_1 = 1;
	*//**
	 * 广播类型，2 全服公告（广播不要类型了）
	 *//*
	public static final int BROCAST_TYPE_2 = 2;
	*//**
	 * 广播类型，3信息提醒（广播不要类型了）
	 *//*
	public static final int BROCAST_TYPE_3 = 3;*/
	/**
	 * 跨服聊天时间间隔
	 */
	public static final int CROSS_TIME=10;
	/**
	 * 本服聊天时间间隔
	 */
	public static final int LOCAL_TIME=10;
	/**
	 * 国家聊天时间间隔
	 */
	public static final int COUNTTRY_TIME=10;
	
	/**
	 * 世界聊天长度(因为有表情)
	 */
	public  static final int WROLD_SIZE=30;
	/**
	 * 聊天历史缓存最大条数
	 */
	public  static final int WROLD_MAX_NUM=20;
	/**
	 * 客服反馈每天最大次数
	 */
	public static final int KEFU_REQUEST_MAX = 20;
	/**每日聊天基础次数**/
	public static final int DAY_NUM=2501;
	/**黑名单上限**/
	public static final int BLACKMAX_NUM=2503;
	/**发言等级**/
	public static final int CHAT_LEVEL=2504;
	
	
	/*******各系统广播类型********/

	/**	 * 魔神吕布来袭，请各位英雄前往讨伐！	 */
	public static final int START_MONSTER=1;
	/***	 * {0}手起刀落，将{1}斩于马下！	 */
	public static final int KILL_MONSTER=2;
	/**	 * 本次魔神吕布已被击退！	 */
	public static final int END_MONSTER=3;
	/**玲珑阁玩家抽中奖励广播*/
	public static final int BROCAST_LINGLONGGE_AWARD = 6;
	/**隆中对开始广播*/
	public static final int BROCAST_LONGZHONGDUI_START = 7;
	/**血战到底**/
	public static final int BROCAST_FIGHTBOOl = 8;
	/** 藏宝阁广播 */
	public static final int HIDDENTREASURE = 9;
	/**获得武将广播**/
	public static final int BROCAST_WUJIANG=10;
	/**获得战甲广播**/
	public static final int BROCAST_ZHANJIA=11;
	/** 激活宝物广播 */
	public static final int TREASURE = 12;
	/**获得天书广播**/
	public static final int BROCAST_GODBOOK=13;
	/** 激活神剑广播 */
	public static final int EXCALIBUR = 14;
	/**获得异宝广播**/
	public static final int BROCAST_SPECIALTREASURE=15;
	/** 晋升广播 */
	public static final int PROMOTION = 17;
	/**获得兵法广播**/
	public static final int BROCAST_BINGFA=16;
	/**获得转生广播**/
	public static final int BROCAST_ZHUANBORN=18;
	/**获得铜雀台广播**/
	public static final int BROCAST_TONGQUETAI=19;
	/** 一骑当千首通奖励广播 */
	public static final int BATTLEVIXENS_AWARD = 20;
	/** 一骑当千通关广播 */
	public static final int BATTLEVIXENS_PASS = 21;
	/**获得过关斩将广播**/
	public static final int BROCAST_RUNNINGMAN=22;
	/** 三国战神广播 */
	public static final int GOD_OF_WAR = 23;
	/**获得乱世枭雄广播**/
	public static final int BROCAST_CROSSKING=24;
	/** 聚宝盆广播 */
	public static final int COLLECTTREASURY = 25;
	/** 组队副本广播 */
	public static final int CROSS_TEAM_FUBEN = 26;
	/** 烽火狼烟开启广播 */
	public static final int FIREBEACON_START = 27;
	/** 烽火狼烟占皇城广播 */
	public static final int FIREBEACON_KING = 28;
	/** 烽火狼烟结束广播 */
	public static final int FIREBEACON_END = 29;
	/** 升阶秘境广播 */
	public static final int CROSS_S_J_MI_JING = 30;
	/** 宝物现世*/
	public static final int CROSS_BAO_WU_XIAN_SHI = 31;
	/** 豪礼转盘*/
	public static final int CELEBRATION_HAO_LI_ZHUAN_PAN = 32;
	/** 闯关有礼*/
	public static final int CHUANG_GUAN_YOU_LI = 33;
	/** 恭喜[color=#66ccff]{0}[/color]在升阶秘境中意外获得了{1}，真是鸿运当头！*/
	public static final int CROSS_S_J_MI_JING_GET_RED_EQUIP = 44;
	/**恭喜[color=#66ccff]{0}[/color]在八阵图中鉴定出了{1}，真是鸿运当头！**/
	public static final int DESTINY = 45;
	/** 问鼎天下[/color]已经开启了,各路英雄快快进入争夺[color=#ED1414]传国玉玺*/
	public static final int CROSS_WDTX_BIGEN = 34;
	/** 问鼎天下 连斩5人*/
	public static final int CROSS_WDTX_KILL_5 = 35;
	/** 问鼎天下 连斩10人,已经[color=#ED1414]超神[/color]了，拜托谁去终结他吧！*/
	public static final int CROSS_WDTX_KILL_10 = 36;
	/** 问鼎天下 已经连斩[color=#ED1414]{1}[/color]人了,在超神的道路上停不下来*/
	public static final int CROSS_WDTX_KILL_CHAO_SHEN = 37;
	/** 问鼎天下 手起刀落,将[color=#ED1414]{1}[/color]斩于马下，终结了一个主宰*/
	public static final int CROSS_WDTX_KILL_ZHU_ZAI = 38;
	/** 问鼎天下 神威无敌,终结了[color=#ED1414]{1}[/color]的超神神话*/
	public static final int CROSS_WDTX_KILL_OTH_ZHU_ZAI = 39;
	/** 问鼎天下 经过一番大战[color=#66ccff]{0}[/color]从[color=#ED1414]{1}[/color]中抢得了传国玉玺*/
	public static final int CROSS_WDTX_GET_YU_XI = 41;
	/** 问鼎天下 本次问鼎天下活动已结束, [color=#66ccff]{0}[/color]最终夺得了传国玉玺，成为[color=#ED1414]真龙天子*/
	public static final int CROSS_WDTX_END_YU_XI_HERO = 42;
	/** 问鼎天下 本次问鼎天下活动已结束.很遗憾,无人获得传国玉玺*/
	public static final int CROSS_WDTX_END_NOT_YU_XI_HERO = 43;
	/** 加群领取礼包啦~玩家交流群：678829160，欢迎您的加入~PS：加群申请烦请备注【区服+角色名】 */
	public static final int NEW_SERVER_NOTICE = 46;
	/** 问鼎天下  据可靠消息称，[color=#66ccff]{0}[/color]携带传国玉玺出现在第7层！*/
	public static final int CROSS_WDTX_YU_XI_NPC = 47;
	/**八门金锁广播**/
	public static final int EIGHTDOOR_BROAD = 40;
	/**诸将演武活动刷新了,本次专场活动武将是[color=#66ccff]{0}[/color],欢迎诸位将士前来挑战！**/
	public static final int ZHU_JIANG_YAN_WU = 48;
	/**诸将演武活动刷新了,欢迎诸位将士前来挑战！**/
	public static final int ZHU_JIANG_YAN_WU_NO_BOSS = 49;
	/**即将降临BOSS战场,请各位将军做好准备!**/
	public static final int ZCBOSS_BROAD1=50;
	/**在BOSS战场中竟然获得了{1}!**/
	public static final int ZCBOSS_BROAD2=51;
	/** [color=#66ccff]{0}[/color]在圣兽降临-充值转盘中竟然获得了{1}! **/
	public static final int SAINT_MONSTER_DAIL = 52;
	/** [color=#ED1414]请勿相信任何出售元宝、送充值、进群送VIP或线下交易等欺诈行为 ,这将导致您的账号被盗或钱财信息被盗。[/color] **/
	public static final int WARN_NITICE = 53;
	/** [color=#66ccff]{0}[/color]购买了[color=#66ccff]{1}[/color]，财源广进，元宝多多！ **/
	public static final int SHAO_ZHU_GOLD_PIG_BUY_NOTIC = 56;
	/**宝箱里开出稀有物品广播*/
	public static final int BOX_BROAD = 59;
	/** 心诚则灵！[color=#66ccff]{0}[/color]在少主祈愿中喜获{1}*{2}！ **/
	public static final int SHAO_ZHU_QI_YUAN_BIG_NOTIC = 60;
	/** 天降洪福！[color=#66ccff]{0}[/color]在少主祈愿中连中3份{1}*{2}，获得双倍奖励！ **/
	public static final int SHAO_ZHU_QI_YUAN_DOUBLE_NOTIC = 61;
	/** 万众一心！祝贺[color=#ED1414]{1}国[/color]，国家技能·{2}达到[color=#ED1414]{3}[/color]级！ **/
	public static final int COUNTRYSKILL_NOTIC = 62;
	/** [color=#66ccff]{0}[/color] 历经磨难，成功轮回第[color=#FFC344]{1}[/color]世！ **/
	public static final int REINCARNATION_NOTIC = 63;
	
	/**祝贺[color=#15F234]{0}[/color]激活{1}，真是宝刀配英雄，狭义掠长空！！*/
	public static final int JIHUO_GODWEAPON=66;
	
	/**喜从天降！恭喜[color=#15F234]{0}[/color]成功打造出{1}！*/
	public static final int MAKE_GODWEAPON=67;
	/**符文宝箱里开出稀有物品广播*/
	public static final int BOX_BROAD_2 = 68;
	/** [color=#15F234]{0}[/color]求助大神通关六出祁山-{1}，[color=#15F234]{2}[/color] */
	public static final int LIUCHUQISHAN_NOTIC = 69;
	/** 吕布护送少主 广播 */
	public static final int LB_ESCORT_BROADCAST = 70;
	/** 天降洪福！[color=#66ccff]{0}[/color]在充值转盘中竟然获得了{1}*{2}! **/
	public static final int DAIL = 71;
	/** 消费转盘(活动)大奖 广播 */
	public static final int ACT_CONSUME_TURNTABLE_BIG_AWARD = 72;
	/** 消费翻牌(活动)大奖 广播 */
	public static final int ACT_CONSUME_TURNCARD_BIG_AWARD = 73;
	/**请各位英雄前往讨伐 曹操来袭 开始*/
	public static final int CAOCAO_COME=74;
	/**请各位英雄前往讨伐 曹操来袭 最后一击*/
	public static final int CAOCAO_COME_SKILL=75;
	/**请各位英雄前往讨伐 曹操来袭 已被击退*/
	public static final int CAOCAO_COME_END=76;
	/**限时抢购活动每个刷新时间点开始前两分钟，广播全部玩家*/
	public static final int FLASHSALE_REFRESH=77;
	/**仙山寻兽*/
	public static final int SEARCHANIMALS=78;
	/**[color=#66ccff]{0}[/color]-[color=#ffc334]{1}[/color]，占领了[color=#ed1414]{2}[/color]！*/
	public static final int ZHULUWIN=79;
	/**修炼天赋*/
	public static final int TALENT=80;
	/**消费砸蛋*/
	public static final int CONSUMESMASHEGG=81;
	/**异兽boss首通*/
	public static final int SPECIALANIMAL_FIRST_PASS = 82;
	/** 神将现世(活动)大奖 */
	public static final int GODGENTHISLIFE_BIG_AWARD = 83;
	/**获得神将*/
	public static final int SHENJIANGJIHUO = 84;
	/** 激活奇策广播 **/
	public static final int BROCAST_QICE = 85;
	/** 出谋策划 */
	public static final int QICE_DRAW = 86;
	/**三英战吕布*/
	public static final int THREE_HERO_FIGHT_LVBU = 87;
	/** 许愿树 */
	public static final int WISHING_TREE = 88;
	/** 消费摇骰子 */
	public static final int ROLLDICE = 89;
	/** 打气球 */
	public static final int PLAYBALLOON = 90;
	/**粮草争夺 开启*/
	public static final int BATTLE_GOODS_OPEN=91;
	/**粮草争夺 击杀boss*/
	public static final int BATTLE_GOODS_SKILLBOSS=92;
	/**粮草争夺 区服刷新粮草*/
	public static final int BATTLE_GOODS_KILLALLBOSS=93;
	/**粮草争夺  胜利区*/
	public static final int BATTLE_GOODS_WINZONEID=94;
	/**桃园结义 招募兄弟*/
	public static final int TAOYUANSWORN_RECRUITING = 95;
	/** 新活动-幸运翻牌大奖 */
	public static final int LUCKTURNCARD_NEWACT_BIG_AWARD = 96;
	/**跨服试炼 开宝箱*/
	public static final int CROSS_TRIAL_CHEST = 97;
	/** 新活动-财神送礼大奖 广播 */
	public static final int GOD_OF_WEALTH_SEND_GIFT_ACT_BIG_AWARD = 98;
	/** 新活动-幸运扭蛋大奖 广播 */
	public static final int LUCKY_TWIST = 100;
	/**激活坐骑广播*/
	public static final int MOUNT = 101;
	/**宴会邀请广播(聊天)*/
	public static final int YANHUI_YAOQING_LT = 104;
	/**宴会邀请广播(滚动)*/
	public static final int YANHUI_YAOQING = 105;
	/**宴会赴宴*/
	public static final int YANHUI_FUYAN = 106;
	/**宴会敬酒*/
	public static final int YANHUI_JINGJIU = 107;
	/**宴会比武*/
	public static final int YANHUI_BIWU = 108;
	/**[color=#FFC344]{0}[/color]壕气冲天，发了一个大红包，大家快来抢啊！[color=#15F234]{1}[/color]*/
	public static final int DROPREDPACKET_NEWACT_CHAT = 102;
	/**[color=#FFC344]{0}[/color]壕气冲天，发了一个大红包，大家快来抢啊！*/
	public static final int DROPREDPACKET_NEWACT = 103;
	/**喜从天降，下起了红包雨，大家快来抢啊！[color=#15F234]{1}[/color]*/
	public static final int DROPREDPACKET_NEWACT_SYS_CHAT = 109;
	/**喜从天降，下起了红包雨，大家快来抢啊！*/
	public static final int DROPREDPACKET_NEWACT_SYS = 110;
	/**擂台比武挑战胜利*/
	public static final int ARENA_FHIGHT_WIN = 111;
	/**超级弹珠奖励*/
	public static final int SUPER_HOODLE_REWARD = 113;
	/**至尊秘宝抽奖奖励*/
	public static final int KING_SECRECT_CRYSTAL_DRAW = 114;
	/**刮刮乐奖励*/
	public static final int KING_SCRATCH_TICKET = 115;
	/**轮回副本[color=#15F234]{0}[/color]邀请大神共同挑战[color=#66ccff]{1}[/color]，[color=#15F234]{2}[/color]*/
	public static final int REBORN_FB_YAOQING = 117;
	/**幻化坐骑*/
	public static final int MOUNT_UNREAL = 118;
	/** 幸运福签 */
	public static final int LUCK_SIGN = 119;
	/** 府邸升级档次广播 */
	public static final int HOUSE_UP_DC = 120;
	/** 高级犒赏提示(系统) */
	public static final int GJKS_1 = 121;
	/** 荣誉勋章提示(系统) */
	public static final int RYXZ_1 = 122;
	/** 高级犒赏提示(活动) */
	public static final int GJKS_2 = 123;
	/** 荣誉勋章提示(活动) */
	public static final int RYXZ_2 = 124;
	/** 万元红包登记礼包 */
	public static final int WANYUANHONGBAO_LVL = 125;
	/** 万元红包充值礼包 */
	public static final int WANYUANHONGBAO_RECHARGE = 126;
	/** 超值礼包周礼包 */
	public static final int EXTRA_VALUE_WEEK = 127;
	/** 超值礼包月礼包 */
	public static final int EXTRA_VALUE_MONTH = 128;
	
	/**修改服务器时间*/
	public  static final int BROCAST_SYSTIME=2008;
/*	*//**	 * 橙装合成广播id	 *//*
	public static final int BROADCAST_ORANGE_COMPOSE = 2018;
	*//**	 * 神装升级广播id	 *//*
	public static final int BROADCAST_ORANGE_LVUP = 2019;
	*//**跨服BOSS准备*//*
	public static final int BROCAST_KFBOSS_READY = 2023;
	*//**跨服BOSS开始*//*
	public static final int BROCAST_KFBOSS_START = 2024;
	*//**击杀跨服BOSS*//*
	public static final int BROCAST_KFBOSS_KILL = 2025;
	*//**排行第一广播*//*
	public static final int BROCAST_RANKKING = 2027;*/
	/**3801 XX品质（包含）以上激活道具需广播（品质id）**/
	public static final int BROCAST_GOODPING=3801;
	/**3802 乱世枭雄达到XX（包含）以上段位需广播（段位id）**/
	public static final int BROCAST_KINGDW=3802;
	/**3803 转生XX（包含）以上需广播（转生id）**/
	public static final int BROCAST_BRONNUM=3803;
//	/**隆中对开始广播*/
//	public static final int BROCAST_LONGZHONGDUI_START = 2035;
	
	/** 跨服王者 邀请——广播 */
	public static final int CROSS_TEAMKING = 99;
	
}

