class Enum_MsgType {
	public static ONRESIZE: string = "stageresize";
	/**角色创建完成 */
	public static ROLE_CREATE_COMPLETE: string = "role_create_complete";
	/**场景地图 */
	public static ENTER_SCENE: string = "enter_scene";
	/**场景地图改变 */
	public static SCENE_CHANGE: string = "SCENE_CHANGE";
	/**进入游戏准备完成 */
	public static ENTER_GAME_READY: string = "enter_game_ready";
	/**预加载完成*/
	public static PRELOAD_COMPLETE: string = "PRELOAD_COMPLETE";
	/** 帧帧听*/
	public static MSG_ENTERFRAME: string = "msg_enterframe";
	/** 主角更新*/
	public static HERO_UPDATE: string = "hero_update";
	/**邮件内容更新 */
	public static MAIL_CONTENT_SHOW: string = "mail_content_show";
	/**邮件列表更新 */
	public static MAIL_LIST_UPDATE: string = "mail_list_update";
	/**技能等级更新 */
	public static SKILL_UPDATE: string = "1101";
	/**神技技能等级更新 */
	public static GODSKILL_UPDATE: string = "1102";
	/**锻造数据更新 */
	public static DUANZAO_DATA_UPDATE: string = "1201";
	/**锻造特效更新 */
	public static DUANZAO_EFF_UPDATE: string = "120101";
	/**锻造宝石背包更新 */
	public static DUANZAO_STONEBAG_UPDATE: string = "duanzao_stonebag_update";
	/**神装升阶 */
	public static GOD_EQUIP_SUIT_JIE: string = "god_equip_suit_jie";
	/**神装分解 */
	public static GOD_EQUIP_DECOMPOSE: string = "GOD_EQUIP_DECOMPOSE";
	/**人物装备更新 */
	public static MSG_ROLE_EQUIP_UPDATE: string = "msg_role_equip_update";
	/**主动离开 后端的战斗*/
	public static LEAVESERBATTLE_BYSELF: string = "LEAVESERBATTLE_BYSELF";
	/**背包 */
	public static MSG_BAG_VO_UPDATE: string = "130101";
	public static MSG_BAG_ITME_UPDATE: string = "130102";
	public static MSG_BAG_EQUIP_UPDATE: string = "130103";
	public static MSG_BAG_SIZE_UPDATE: string = "130104";
	public static MSG_BAG_FULL_NOTICE: string = "130105";
	public static MSG_BAG_DECOMPOSE: string = "130106";
	public static MSG_BAG_ITEM_USE: string = "130107";
	public static MSG_BAG_DECOMPOSE_ONEKEY: string = "268101";
	/**分解 红点 */
	public static MSG_BAG_DECOMPOSE_RED: string = "130401";
	/**图鉴数据更新 */
	public static TUJIAN_DATA_UPDATE: string = "2901";
	/**战甲升阶 */
	public static ZHANJIA_UPJIE_UPDATE: string = "80001";
	/**战甲ui */
	public static ZHANJIA_OPENUI_UPDATE: string = "80002";
	/**战甲技能升级 */
	public static ZHANJIA_UP_SKILL: string = "80003";
	/**战甲升星 */
	public static ZHANJIA_UP_STAR: string = "80004";
	/**战甲套装升级 */
	public static ZHANJIA_UP_SUIT: string = "80005";
	/**战甲更改 */
	public static ZHANJIA_CHANGE: string = "80006";
	/**战甲红点 */
	public static ZHANJIA_CHECK_NOTICE: string = "80007";
	/**兽灵数据更新 */
	public static SHOULING_DATA_UPDATE: string = "2001";
	/**宝物数据更新 */
	public static BAOWU_DATA_UPDATE: string = "2501";
	/**宝物技能更新 */
	public static BAOWU_SKILL_UPDATE: string = "250101";
	/**星图数据更新 */
	public static XINGTU_DATA_UPDATE: string = "2301";
	/**轮回数据更新 */
	public static LUNHUI_DATA_UPDATE: string = "6901";
	/**神剑数据更新 */
	public static SHENJIAN_DATA_UPDATE: string = "2701";
	/**将魂数据更新 */
	public static JIANGHUN_DATA_UPDATE: string = "2401";
	/**武将升阶 */
	public static WUJIANG_UPJIE_UPDATE: string = "65100";
	/**武将ui */
	public static WUJIANG_OPENUI_UPDATE: string = "65101";
	/**武将技能升级 */
	public static WUJIANG_UP_SKILL: string = "65102";
	/**武将升星 */
	public static WUJIANG_UP_STAR: string = "65103";
	/**武将吞噬丹药 */
	public static WUJIANG_USE_DAN: string = "65104";
	/**武将改变job */
	public static WUJIANG_CHANGE_JOB: string = "65105";
	/**武将 将印分解 */
	public static WUJIANG_DECOMPOSE: string = "65106";
	/**武将 红点 */
	public static WUJIANG_CHECK_NOTICE: string = "65107";
	/**武将 神将之力 */
	public static WUJIANG_SHENGJIANGZHILI: string = "65108";
	/**武将 神将之力 - 技能进阶 */
	public static WUJIANG_SHENGJIANGZHILI_SKILLUP: string = "65109";
	/**更新神将之力的显示 */
	public static WUJIANG_SHENGJIANGZHILIUPDATE: string = "65109";
	/**熔炼*/
	public static MSG_RL_SELECT: string = "msg_rl_select";
	public static MSG_RL_INOF: string = "msg_rl_inof";
	public static MSG_RL_REFLASH1: string = "msg_rl_reflash1";
	public static HE_CHENG_SUCCESS: string = "265201";
	/**转生提升*/
	public static REBIRTH_UPDATE: string = "rebirth_update";
	/**商城数据更新*/
	public static SHOP_UPDATE: string = UIConst.SHOP + "";
	/**异宝数据更新*/
	public static YIBAO_UPDATE: string = UIConst.YIBAO + "";
	/**称号*/
	public static TITLE_UPDATE: string = '2201';
	public static TITLE_OPENUI: string = '22011';
	/**官衔*/
	public static MSG_GXUPDATE: string = '21010';
	public static MSG_GXINIT: string = '21011';
	/**关卡 BOSS面板数据 (排行榜前三)*/
	public static MSG_BOSSINFO: string = '10520';
	/**关卡  第几波怪物更新*/
	public static MSG_WAVEUPDATE: string = "105201";
	/**关卡  BOSS击杀服务器验证结果*/
	public static MSG_BOSS_RET: string = "105202";
	/**关卡  自动挑战BOSS更变*/
	public static MSG_AUTO_C: string = "105203";
	/**关卡  关卡数据变更*/
	public static MSG_GQ_UPDATE: string = "105204";
	/**关卡  排行榜数据更新*/
	public static MSG_GQ_RNK: string = "105205";
	public static MSG_GQ_SWEEP: string = "105206";
	public static MSG_QIANRENZHAN: string = '105207';
	/**关卡  剧情更新*/
	public static MSG_JUQING_STATUS: string = '105208';
	public static MSG_GQ_SWEEP_01: string = "105209";
	/**战斗胜利结算 奖励发生变化*/public static BATTLEWIN_AWARDSCHANGE = 105213;

	/**天数 所有数据*/
	public static MSG_TS_UPDATE: string = "2601";
	/**天数 身上数据*/
	public static MSG_TS_WAEAR: string = "2602";
	/**天数 天书升级*/
	public static MSG_TS_LEVELUP: string = "2603";
	/**天数 天书升星*/
	public static MSG_TS_STAR: string = "2604";
	/**天数 天书属性丹*/
	public static MSG_TS_DRUG: string = "2605";
	/**每日任务， item更新*/
	public static MSG_TASK_UP: string = "4102";

	/**设置 修改名字*/
	public static SETTING_CHANGE_NAME: string = "102001";
	/**设置 修改头像头像框*/
	public static SETTING_CHANGE_HEAD: string = "102002";
	/**设置 隐藏势力*/
	public static SETTING_HIDE_COUNTRY: string = "102003";
	/**一骑当千更新*/
	public static YJDQ_UPDATE: string = "1704";
	/**一骑当千排行榜更新*/
	public static YJDQ_RANK_UPDATE: string = "170404";
	/**一骑当千初始化*/
	public static YJDQ_INIT_UPDATE: string = "170405";

	/**boss的气血更新 */
	public static MSG_BOSS_HP_UPDATE: string = "bshp";
	/**个人BOSS UI*/
	public static MSG_PBOSS_UI_UPDATE: string = "1801";

	/**铜雀台 打开ui*/
	public static PEACOCK_OPENUI: string = "122001";
	/**铜雀台 关闭战斗*/
	// public static PEACOCK_CLOSE_BATTLE: string = "122002";
	/**铜雀台 掉落*/
	public static PEACOCK_BATTLE_DROP: string = "122003";
	/**铜雀台 获取已通过某关卡人数*/
	public static PEACOCK_PASSLAYER_NUM: string = "122004";
	/**玩家国家信息更新 */
	public static COUNTRY_UPDATE: string = "147001";


	/**玩家国家捐赠更新 */
	public static COUNTRY_DONATE_UPDATE: string = "147002";
	/**宴会红点刷新 */
	public static COUNTRY_YANHU_REDPOINT: string = "147009";
	/**玩家国家 打开ui */
	public static COUNTRY_OPEN_UI: string = "147003";
	/**打开宴会列表 */
	public static COUNTRY_YANHULIST: string = "147004";
	/**打开宴会主界面 */
	public static COUNTRY_YANHUMAINUI: string = "147005";
	/**敬酒记录 */
	public static COUNTRY_JINJIUJILU: string = "147006";
	/**玩家敬酒 */
	public static COUNTRY_PLAYERJINJIU: string = "147007";
	/**退出宴会 */
	public static COUNTRY_EXITYANHU: string = "147008";

	/**王位之争 打开ui */
	public static KINGSHIP_UPDATEDATA: string = "176001";
	/**乱世枭雄 状态改变 */
	// public static CROSSKING_STATE_UPDATE: string = "186000";
	/**乱世枭雄 open ui */
	public static CROSSKING_OPEN_UI: string = "186001";
	/**乱世枭雄 购买挑战次数 */
	public static CROSSKING_BUY_NUM: string = "186002";
	/**乱世枭雄 排行榜 */
	public static CROSSKING_RANK_ARR: string = "186003";
	/**乱世枭雄 战报 */
	public static CROSSKING_REPORT_ARR: string = "186004";
	/**乱世枭雄 积分奖励领取情况 */
	public static CROSSKING_POINT_REWARD: string = "186005";
	/**乱世枭雄 晋级对手列表 */
	public static CROSSKING_UP_PLY: string = "186006";
	/**乱世枭雄 红点提示 */
	public static CROSSKING_CHECK_NOTICE: string = "186007";
	/**乱世枭雄 宝藏 */
	public static CROSSKING_OPEN_STORE: string = "186008";
	/**升阶秘境  */
	public static CROSSKING_SJMJ: string = "186009";
	// public static CROSSKING_BUY_ITEM: string = "186009";
	/**枭雄争霸 open ui */
	public static CROSSWARS_OPEN_UI: string = "210001";
	/**枭雄争霸  押注*/
	public static CROSSWARS_BUY_WIN: string = "210002";
	/**枭雄争霸  打开名人堂*/
	public static CROSSWARS_OPEN_WINERS: string = "210003";
	/**枭雄争霸  膜拜*/
	public static CROSSWARS_MOBAI: string = "210004";
	/**枭雄争霸  获取冠军奖励*/
	public static CROSSWARS_GET_FRIST: string = "210005";
	/**枭雄争霸 红点提示 */
	public static CROSSWARS_CHECK_NOTICE: string = "210006";
	/**枭雄争霸 状态改变 */
	public static CROSSWARS_STATUS_CHANGE: string = "210007";
	/**跨服矿藏 open ui*/
	public static CROSSMINERAL_OPEN_UI: string = "360701";

	/** 跨服王者活动状态改变 */
	public static KFWZ_ACT_STATE_CHANGE = "kfwz_act_state_change";
	/** 跨服王者数据更新 */
	public static KFWZ_UPDATE = "kfwz_update";
	/** 跨服王者组队数据更新 */
	public static KFWZ_TEAM_DATA_UPDATE = "kfwz_team_data_update";
	/** 跨服王者日志项尺寸改变 */
	public static KFWZ_LOG_CHANGE_SIZE = "kfwz_log_change_size";
	/** 跨服王者日志更新 */
	public static KFWZ_LOG_UPDATE = "kfwz_log_update";
	/** 跨服王者排行更新 */
	public static KFWZ_RANK_UPDATE = "kfwz_rank_update";
	/** 跨服王者队伍列表更新 */
	public static KFWZ_TEAM_LIST_UPDATE = "kfwz_team_list_update";
	/** 跨服王者战斗玩家死亡 */
	public static KFWZ_BATTLE_PLAYER_DEAD = "kfwz_battle_player_dead";
	/** 跨服王者PVE战斗结束通知 */
	public static KFWZ_BATTLE_PVE_OVER = "kfwz_battle_PVE_over";
	/** 跨服王者重置拖曳事件 */
	public static KFWZ_DRAG_RESET_POS = "kfwz_drag_reset_pos";
	/** 跨服王者自动开始倒计时事件 */
	public static KFWZ_AUTO_START_TIMER_CHANGE = "kfwz_auto_start_timer_change";

	/** 坐骑 坐骑幻化数据更新通知 */
	public static HORSE_HH_UPDATE = "horse_hh_update";
	/** 坐骑 坐骑幻化进阶通知 {id:坐骑id} */
	public static HORSE_HH_UPGRADE_CHANGE = "horse_hh_upgrade_change";

	/** 幸运扭蛋更新 */
	public static LUCKY_EGG_UPDATE = "lucky_egg_update";
	/** 幸运扭蛋奖池更新 */
	public static LUCKY_EGG_POOL_UPDATE = "lucky_egg_pool_update";
	/** 幸运扭蛋抽奖成功 */
	public static LUCKY_EGG_LOTTERY = "lucky_egg_lottery";

	/** 刮刮乐数据更新 */
	public static GGL_UPDATE = "ggl_update";

	/** 幸运福签数据更新 */
	public static XYFQ_UPDATE = "xyfq_update";
	/** 幸运福签抽签成功 */
	public static XYFQ_DRAW_SUCCESS = "xyfq_draw_success";
	/** 幸运福签任务状态更新 {type:number} */
	public static XYFQ_TASK_UPDATE = "xyfq_task_update";
	/** 幸运福签排行数据更新 */
	public static XYFQ_RANK_UPDATE = "xyfq_rank_update";

	/** 轮回副本数据更新 */
	public static LHFB_UPDATE = "lhfb_update";
	/** 当前进度的轮回id改变通知 */
	public static LHFB_CUR_ID_CHANGE = "lhfb_cur_id_change";
	/** 轮回副本队伍数据更新 */
	public static LHFB_TEAM_DATA_UPDATE = "lhfb_team_data_update";
	/** 轮回副本队伍id改变通知 */
	public static LHFB_TEAM_ID_CHANGE = "lhfb_team_id_change";
	/** 轮回副本战斗血量更新 */
	public static LHFB_BATTLE_HP_UPDATE = "lhfb_battle_hp_update";
	/** 轮回副本死亡通知 */
	public static LHFB_BATTLE_DEAD = "lhfb_battle_dead";

	/**玲珑阁 open ui */
	public static LINGLONG_OPEN_UI: string = "222001";
	public static LINGLONG_OPEN_RANK: string = "222002";
	public static LINGLONG_BUY_FLASH: string = "222003";
	public static LINGLONG_GET_AWARD: string = "222004";
	public static LINGLONG_LOGS: string = "222005";
	/**全民 BOSS*/
	public static MSG_PLAYER_BEKILLED: string = "1803";
	public static MSG_PLAYER_RELIFE: string = "18034";
	/**玩家气血改变*/
	public static MSG_MINEHPCHANGE: string = "1";
	/**新增玩家角色信息 */
	public static MSG_ADDROLEDETAIL = "2";
	/**材料副本更新 */
	public static FUBEN_CAILIAO_UPDATE = "1703";
	/**材料副本次数更新 */
	public static FUBEN_CAILIAO_BATTLENUM_UPDATE = 170301;
	/**全民BOSS UI打开*/
	public static MSG_QMBOSS_UPDATE: string = "18031";
	/**全民BOSS 排行榜更新*/
	public static MSG_QMBOSS_RANKUPDATE: string = "18032";
	public static MSG_QMBOSS_LOGIN: string = "18033";
	public static MSG_QMBOSS_DEAD: string = "18034";
	public static MSG_QMBOSS_DANJI_RES: string = "18035";
	public static MSG_QMBOSS_DANJI_BOSSXUE: string = "18036";
	public static MSG_QMBOSS_SAODAN: string = "18037";
	/** BOSS 排行榜更新*/
	public static RANK_UPDATE: string = "145001";
	/** 南征北战更新*/
	public static NZBZ_UPDATE: string = "1503";
	/** 南征北战排行更新*/
	public static NZBZ_RANK_UPDATE: string = "150301";
	/** 南征北战积分奖励更新*/
	public static NZBZ_JIFENREWARD_UPDATE: string = "150302";
	public static LBRANK: string = "1805";
	public static LB_ENTER: string = "18051";
	public static LB_ROLE_LIFE: string = "18052";
	public static LB_BOSS_STATE: string = "18053";
	public static SANGUO_ZHANSHEN_UPDATE: string = "1602";
	public static SANGUO_ZHANSHEN_TIME: string = "160201";
	public static SANGUO_ZHANSHEN_SHOP: string = "160203";
	public static LB_OPENUI: string = "18054";
	public static LB_NOTICE: string = "18055";
	public static LB_SCENE_PLAYER_STATE = 18056;

	/**过关斩将 打开ui*/
	public static RUNMAN_OPENUI: string = "155001";
	/**过关斩将 关闭战斗*/
	public static RUNMAN_CLOSE_BATTLE: string = "155002";
	/**过关斩将 掉落*/
	public static RUNMAN_BATTLE_DROP: string = "155003";
	/**过关斩将 更新战斗结果*/
	public static RUNMAN_UPDATE_BATTLE: string = "155004";

	/**孟获状态更新*/
	public static MH_STATE: string = "1804";
	/**孟获打开界面*/
	public static MH_OPEN: string = "18041";
	/**孟获打开上期排行榜*/
	public static MH_RANK: string = "18042";
	public static MH_ROLELIFE: string = "18043";//复活状态变更
	public static MH_SCENE: string = "18044";//场景数据更新
	public static MH_TAGERT: string = "18045";//目标奖励更新0打开界面 1领取奖励
	public static MH_SCENE_PLAYER_STATE = 18046;
	public static MH_STATECHANGE = 18047;
	public static MH_ENTER_FAIL = 18048;
	/**单刀赴会 */
	public static DANDAO_FUHUI: string = "1603";
	/**单刀赴会 排行榜更新*/
	public static DANDAO_FUHUI_RANK: string = "160301";
	/**单刀赴会 匹配显示更新*/
	public static DANDAO_FUHUI_MATH: string = "160302";
	/**单刀赴会 战报显示更新*/
	public static DANDAO_FUHUI_BATTLEGROUP: string = "160303";

	/**通用战斗结束框 关闭界面*/
	public static COMMON_WINFAIL_CLOSE: string = "common_winfail_close";

	public static REDDOT_NOTICE: string = "red";/**服务器红点提示*/
	public static SHOUCHONG: string = "4601";
	public static SHOUCHONGUP: string = "46010";
	public static MEIRISHOUCHONG: string = "4501";
	public static MEIRISHOUCHONGUP: string = "45010";

	public static VIP_CHANGE: string = "vip";
	public static CHONGZHIOPEN: string = "5003";
	public static VIP_OPEN: string = "5001";
	public static VIP_LQ: string = "50011";
	/**角色怒气值更新 */
	public static ROLE_RAGE_UPDATE: string = "rage";
	/**角色怒气值更新 */
	public static WELFARE_SIGN_UPDATE: string = "4202";
	public static WELFARE_WEEKVIP_OPEN = 4205;
	public static WELFARE_WEEKVIP_LQ = 420501;
	/**登录豪礼 */
	public static HUODONG_DAILYGIFT_OPENUI: string = "238001";
	public static HUODONG_DAIGIFTACT_UI: string = "238011";
	public static HUODONG_DAIGIFTKF_UI: string = "238012";
	/**单笔充值 */
	public static HUODONG_DAILYONE_OPENUI: string = "238003";
	public static HUODONG_DAIONEACT_UI: string = "238013";
	public static HUODONG_DAIONEKF_UI: string = "238014";
	/**单日累充 */
	public static HUODONG_DAILYADDUP_OPENUI: string = "238005";
	public static HUODONG_DAIADDACT_UI: string = "238015";
	public static HUODONG_DAIADDKF_UI: string = "238016";
	/**累计充值 */
	public static HUODONG_ADDRECHARGE_OPENUI: string = "238007";
	/**登录豪礼 8-14 */
	public static HUODONG_DAILYGIFT_814: string = "463001";
	public static HUODONG_DAILYONE_814: string = "463002";
	public static HUODONG_DAILYADDUP_814: string = "463003";
	public static HUODONG_ADDRECHARGE_814: string = "463004";
	// public static HUODONG_ADDRECHARGE_GET: string = "238008";
	/**开服7天连续充值 */
	public static HUODONG_SEVEN_KF_OPENUI: string = "238009";
	/**7天连续充值 8-14*/
	public static HUODONG_SEVEN_814: string = "705001";
	/**活动7天连续充值 */
	// public static HUODONG_SEVEN_ACT_OPENUI: string = "2380010";
	/**专属活动 单笔充值 */
	public static HUOD_ONLY_DAIONEA_UI: string = "810001";
	public static HUOD_ONLY_Shop_UI: string = "810002";
	/**专属活动 累计充值 */
	public static HUOD_ONLY_ADDRECHARGE_OPENUI: string = "830001";
	/**专属活动 元宝返利*/public static HUOD_ONLY_YBFL = "833001";
	/**专属活动 单笔返利 */public static HUOD_ONLY_DBFANLI = "836001";

	public static TQ_INFO: string = "5004";//特权
	public static TQ_LQ: string = "50041";//特权
	/**七天登录 */
	public static SEVENDAY_LOGIN: string = "5005";//
	/**晋升更新 */
	public static JINSHENG: string = "4103";//
	/**功能预览 */
	public static FUNCTIONPREVIEW: string = "3901";//
	/**武圣榜 */
	public static WUSHENG_LIST: string = "4901";//
	/**武圣榜 领取奖励*/
	public static WUSHENG_LIST_DRAW: string = "490101";//
	//三国无双
	public static SGWS_OPENUI = 1604;
	public static SGWS_POOL = 16041;
	public static SGWS_YZ = 16042;
	public static BAOKU = 3801;
	public static JUBAOPENG = 5002;
	//隆中对
	public static LZD_OPEN = 3702;
	public static LZD_RET = 37021;
	public static LZD_OPENRANK = 37022;
	public static CHAT = 3001;
	public static CHAT_BLACKLIST = 300101;
	public static KAIFUDAY_UPDATE = "kaifu";
	public static QUNYINGBANG = 4401;
	public static QUNYINGBANG_LAST = 440101;
	public static ADD_ACTIVITYICON = "ADD_ACTIVITYICON";//创建活动图标

	public static CHAT_LONG_CLICK = "chat_long_click";

	public static KAIFUKUANGHUAN = 5101;
	/**神将狂欢 */
	public static SHENJIANGKUANGHUAN = 5102;
	/**神将狂欢 item 刷新 */
	public static SJKHITEMREFRESH = 5103;
	/**刷新神将狂欢列表 */
	public static SJKHREFRESHLIST = 5104;
	//活动
	public static ACTIVITY_LOGIN_SEND = "225001";
	// public static ACTIVITY_OPENUI = "225002";
	public static ACTIVITY_ACTOPENSTATE = "225003";

	/**超值转盘*/public static CHAOZHI_ZHUANPAN = 4604;
	/**超值转盘显示特效*/public static CHAOZHI_ZHUANPAN_SHOWEFF = 460401;
	/**场景任务*/public static SCENE_TASK = 5301;
	/**显示任务*/public static SHOW_TASK = 5302;
	/**关闭任务*/public static HIDE_TASK = 5303;
	/**全名狂欢*/public static QUANMIN_KUANGHUAN = 5201;
	/**折扣商店*/public static DISCOUNT_SHOP = 4605;
	/**升阶商店*/public static SHENGJIE_SHOP = 4615;
	/**首冲团购*/public static GROUP_BUY_UI = 285001;
	/**首冲团购*/public static GROUP_BUY_NUM = 285002;
	/**首冲团购*/public static GROUP_BUY_CHARGE = 285003;
	public static HD_CJDJ = 4506;
	public static HD_CJDJLQ = 45061;

	/**动画播放完 */
	public static CARTONGEND = "CARTONGEND";
	/**游戏激活 */
	public static GAMEACTIVE = "GAMEACTIVE";
	public static GAMEACTIVE_EVT = "GAMEACTIVE_EVT";

	/**元宝返利 7天*/public static YUANBAOFL_KF = 4611;
	/**元宝返利*/public static YUANBAOFANLI = 4612;
	/**材料返利 7天*/public static CAILIAOFL_KF = 4609;
	/**材料返利*/public static CAILIAOFANLI = 4610;
	/**ios开启关卡改变 */
	public static IOS_OPEN_CHANGE = "iosopen";
	/**公告更新 */
	public static WELFARE_NOTICE_UPDATE = 4204;
	/**国家boss更新 */
	public static COUTRY_BOSS_UPDATE = 1505;
	/**被击杀玩家更新 */
	public static COUTRY_BOSS_SCENE_PLAYER_STATE = 150501;
	/**转生装备更新 */
	public static REBIRTH_EQUIP_UPDATA = 58801;
	/**跨服组队副本 */
	public static CROSS_TEAM_UPDATE = 3604;
	/**跨服组队战斗排行榜更新*/
	public static CROSS_TEAM_RANK_UPDATE = 360401;
	/**组队死亡通知*/
	public static CROSS_TEAM_PLAYER_DEAD = 360402;
	/**组队副本进入场景通知*/
	public static CROSS_TEAM_ENTER_SCENE = 360403;
	/**升级秘境副本进入场景通知*/
	public static CROSS_MJ_ENTER_SCENE = 360404;
	/**直购更新*/
	public static ZHIGOU_UPDATE = 5009;
	/**各个系统升阶*/
	public static BY_SYS_UP_JIE_SKILL = 90901;
	public static BY_SYS_UP_SKILL = 90902;
	public static BY_SYS_JI_BAN = 90903;
	public static BY_SYS_JI_BAN_UP = 90904;

	/**烽火狼烟*/
	public static FHLY_SCORE_UPDATE = 370301;
	public static FHLY_SCORE_INIT = 370302;
	/**更新个人排行榜*/public static FHLY_PLAYER_UPDATE = 370303;
	/**更新服务器排行榜*/public static FHLY_SERVER_UPDATE = 370304;
	/**查看城市*/public static FHLY_CHECKCITY = 370305;
	/**玩家移动*/public static FHLY_SYSCHRO = 370306;
	/**更新城池数据！*/public static FHLY_CITY_UPDATE = 370307;
	/**更新积分排行榜*/public static FHLY_SCORERANK_UPDATE = 370308;
	/**退出烽火狼烟*/public static FHLY_QUIT = 370309;
	/**场景玩家数据更新  添加 移除*/public static FHLY_SCENE_PLAYER = 370310;
	/**移动*/public static FHLY_HERO_MOVE = 370311;
	/**状态改变*/public static FHLY_STATE_CHANGE = 370312;
	/**城池战斗状态改变*/public static FHLY_CITYSTATE_CHANGE = 370313;
	/**获取城池 征收成员列表*/public static FHLY_CITY_PEOPLE = 370314;
	/**更新 征收成员显示*/public static FHLY_PLAYER_STATE = 370315;

	//宝物现世
	public static BAOWU_XIANSHI_DROP = 400001;

	/**国家boss排行更新**/public static COUNTRY_BOSS_RANK_UPDATE = 150501;


	/**arpg map*/
	public static ARPG_MAP_CLICK = "ARPG_MAP_CLICK";
	public static ARPG_SCENE_ADD_PLAYER = "ARPG_SCENE_ADD_PLAYER";
	public static ARPG_SCENE_REMOVE_PLAYER = "ARPG_SCENE_REMOVE_PLAYER";
	public static ARPG_SCENE_REMOVE_NPC = "ARPG_SCENE_REMOVE_NPC";
	public static ARPG_SCENE_ADD_NPC = "ARPG_SCENE_ADD_NPC";
	public static ARPG_SCENE_READY = "ARPG_SCENE_READY";
	/**进入战斗发送 */
	public static ENTER_SERVERBATTLE = "enter_serverbattle";
	/**退出战斗发送 */
	public static EXIT_SERVERBATTLE = "exit_serverbattle";
	/**战斗更新buff */
	public static SERVERBATTLE_BUFF = "serverbattle_buff";
	/**连击更新 */
	public static LIANJI_UPDATE = 53;


	public static CGYL_OPEN = 5801;//闯关有礼
	public static CGYL_LQ1 = 580102;//闯关有礼
	public static CGYL_LQ = 580101;//闯关有礼

	//问鼎天下
	public static WDTX_SCENE_UPDATE = 370501;
	public static WDTX_MINE_UPDATE = 370502;
	public static WDTX_MVP = 370503;
	public static WDTX_LAYER_UPDATE = 370504;
	public static WDTX_BATTLE_END = 370505;
	public static WDTX_RANK = 370506;
	public static WDTX_PVE_END = 370507;

	//八阵图
	public static BAZHENTU_NOTICE = 600101;
	//零点重置
	public static ZERO_RESET = 600102;
	//登录发送开启系统数据 
	public static SEND_OPEN_DAYS_SYSTEM = 600103;
	//专属活动 
	public static SEND_HUOD_ONLY_SYSTEM = 600104;

	/**BOSS战场*/
	public static BOSSZC_OPEN = 6211;
	public static BOSSZC_ENTER = 621101;
	public static BOSSZC_SCENE_ST = 621102;
	public static BOSSZC_PVE_RET = 621103;
	public static BOSSZC_READYTIME = 621104;
	//藏宝阁 
	public static CANGBAOGE_RANK = 273001;
	//神装洗练 
	public static GODEQUIP_XILIAN = 190101;
	//少主 
	public static SHAOZHU = 6301;
	/**少主升星奖励 */
	public static SHAOZHUSTAR = 6302;
	/**少主升星奖励刷新 */
	public static SHAOZHUSTARUPDATE = 6303;
	//少主亲密度显示语言 
	public static SHAOZHU_QINMI = 630102;
	/**单笔返利 */
	public static DANBIFANLI = 5708;
	/**单笔返利领取奖励 */
	public static DANBIFANLIREWARD = 5709;
	/**登陆有礼 */
	public static DENGLUYOULI = 5710;
	/**登陆有礼领取奖励 */
	public static DENGLUYOULIREWARD = 5711;
	/**累充返利 */
	public static LEICHONGFANLI = 5712;
	/**累充返利领取奖励 */
	public static LEICHONGFANLIReward = 5713;
	/**累充返利item点击 */
	public static LEICHONGFANLITEM = 5714;
	/**圣兽降临-目标 */
	public static ACT_HOLYB_MUBIAO: string = "497001";
	/**圣兽降临-活跃 */
	public static ACT_HOLYB_HUOYUE: string = "499001";
	/**圣兽降临-转盘 */
	public static ACT_HOLYB_ZHUANPAN: string = "503001";
	/**圣兽降临-转盘 抽奖*/
	public static ACT_HOLYB_ZHUANPAN_TURN: string = "503002";
	/**圣兽降临-转盘 红点*/
	public static ACT_HOLYB_ZHUANPAN_RED: string = "503003";
	/**圣兽降临-洗练 */
	public static ACT_HOLYB_XILIAN: string = "495001";
	/**圣兽降临-寻宝 */
	public static ACT_HOLYB_XUNBAO: string = "501001";
	/**圣兽降临-寻宝-排行 */
	public static ACT_HOLYB_XUNBAO_RANK: string = "501002";
	/**圣兽降临-寻宝-目标 */
	public static ACT_HOLYB_XUNBAO_MUBIAO: string = "501003";
	/**圣兽降临-寻宝-抽奖 */
	public static ACT_HOLYB_XUNBAO_ROLL: string = "501004";
	/**圣兽降临-寻宝-红点 */
	public static ACT_HOLYB_XUNBAO_RED: string = "501005";
	/**圣兽降临-洗练排名 */
	public static ACT_HOLYB_XILIAN_RANK: string = "6407";
	/**奖励找回 */
	public static REWARDBACK = 4026;
	/**奖励找回item */
	public static REWARDBACKITEM = 40261;
	/**防沉迷 关闭界面 */
	public static TRUE_NAME_CLOSE: string = "529001";
	/**觉醒之力套装更新 */
	public static JUEXING_SUIT_UPDATE: string = "670101";

	/** 消费翻牌数据更新 */
	public static XFFP_UPDATE = "xffp_update";
	/** 翻牌成功通知 {id:number}*/
	public static XFFP_FLOP_SUCCESS = "xffp_flop_success";

	/** 消费摇骰数据更新 */
	public static XFYT_UPDATE = "xfyt_update";
	/** 消费摇骰成功通知 */
	public static XFYT_ROLL_SUCCESS = "xfyt_roll_success";

	/** 打气球信息更新 */
	public static BALLOON_UPDATE = "balloon_update";
	/** 打气球成功 */
	public static BALLOON_SUCCESS = "balloon_success";

	/** 成就更新 */
	public static ACHIEVEMENT_UPDATE = "achievement_update";
	/** 成就奖励更新 */
	public static ACHIEVEMENT_REWARD_UPDATE = "achievement_reward_update";


	/** 限定武将数据更新 */
	public static XIANDING_UPDATE = "xianding_update";
	/** 限定武将奖励数据更新 */
	public static XIANDING_REWARD_UPDATE = "xianding_reward_update";

	/** 三国战令奖励数据更新 */
	public static SGZL_REWARD_UPDATE = "sgzl_reward_update";
	/** 三国战令任务数据更新 */
	public static SGZL_TASK_UPDATE = "sgzl_task_update";
	/** 三国战令商店数据更新 */
	public static SGZL_SHOP_UPDATE = "sgzl_shop_update";

	/** 三国战令（活动）奖励数据更新 */
	public static SGZL2_REWARD_UPDATE = "sgzl2_reward_update";
	/** 三国战令（活动）任务数据更新 */
	public static SGZL2_TASK_UPDATE = "sgzl2_task_update";
	/** 三国战令（活动）商店数据更新 */
	public static SGZL2_SHOP_UPDATE = "sgzl2_shop_update";

	/** 宝藏拼图数据更新 */
	public static BZPT_UPDATE = "bzpt_update";
	/** 宝藏拼图翻开 {id:number} */
	public static BZPT_CARD_OPEN = "bzpt_card_open";
	/** 宝藏拼图开启宝箱 {id:number} */
	public static BZPT_BOX_OPEN = "bzpt_box_open";

	/** 双12商城数据更新 */
	public static SHOP12_UPDATE = "shop12_update";
	/** 双12商城购物车改变通知 */
	public static SHOP12_CART_CHANGE = "shop12_cart_change";
	/** 双12商城购物车清空通知 */
	public static SHOP12_CART_CLEAR = "shop12_cart_clear";

	/** 成就树数据更新 */
	public static CJS_UPDATE = "cjs_update";
	/** 成就树层奖励数据更新 */
	public static CJS_REWARD_UPDATE = "cjs_reward_update";

	/** 群雄逐鹿整体信息更新 */
	public static QXZL_INFO_UPDATE = "qxzl_info_update";
	/** 群雄逐鹿移动成功通知 {source:源cityId target:目标cityId} */
	public static QXZL_MOVE_SUCCESS = "qxzl_move_success";
	/** 群雄逐鹿城池信息更新 {cityId:城池id, curPage:需要刷新的当前页码} */
	public static QXZL_CITY_INFO_UPDATE = "qxzl_city_info_update";
	/** 群雄逐鹿任务更新 */
	public static QXZL_TASK_UPDATE = "qxzl_task_update";
	/** 群雄逐鹿商店更新 */
	public static QXZL_SHOP_UPDATE = "qxzl_shop_update";
	/** 群雄逐鹿国家排行榜更新 */
	public static QXZL_RANK_COUNTRY_UPDATE = "qxzl_rank_country_update";
	/** 群雄逐鹿玩家排行榜更新 */
	public static QXZL_RANK_PLAYER_UPDATE = "qxzl_rank_player_update";
	/** 群雄逐鹿战况事件更新 */
	public static QXZL_EVENT_UPDATE = "qxzl_event_update";
	/** 群雄逐鹿驻守奖励更新 */
	public static QXZL_REWARD_UPDATE = "qxzl_reward_update";
	/** 群雄逐鹿实时推送，更新体力 */
	public static QXZL_PUSH_STAMINA_UDPATE = "qxzl_push_stamina_udpate";
	/** 群雄逐鹿实时推送，更新城池归属 */
	public static QXZL_PUSH_CITY_UPDATE = "qxzl_push_city_update";
	/** 群雄逐鹿实时推送，更新个人积分 */
	public static QXZL_PUSH_SCORE_UPDATE = "qxzl_push_score_update";
	/** 群雄逐鹿实时推送，更新个人驻守状态 */
	public static QXZL_PUSH_ISINCITY_UPDATE = "qxzl_push_isInCity_update";
	/** 群雄逐鹿个人排行榜更新 */
	public static QXZL_RANK_PERSON_UPDATE = "qxzl_rank_person_update";
	/** 群雄逐鹿单枪匹马持续分钟更新 */
	public static QXZL_BUFFTIME_UPDATE = "qxzl_bufftime_update";

	/** 奇策数据更新 */
	public static QICE_INFO_UPDATE = "qice_info_update";
	/** 奇策升星成功 */
	public static QICE_STAR_UP = "qice_star_up";
	/** 奇策升级成功 */
	public static QICE_LEVEL_UP = "qice_level_up";
	/** 奇策魂更新 */
	public static QICE_HUN_CHANGE = "qice_hun_change";
	/** 奇策套装更新 */
	public static QICE_SUIT_UPDATE = "qice_suit_update";
	/** 奇策套装激活通知 */
	public static QICE_SUIT_ACTIVE = "qice_suit_active";

	/** 出谋划策数据更新 */
	public static QICE_LOTTERY_UPDATE = "qice_lottery_update";
	/** 出谋划策抽奖成功 */
	public static QICE_LOTTERY_SUCCESS = "qice_lottery_success";
	/** 出谋划策目标奖励更新 */
	public static QICE_TARGET_UPDATE = "qice_target_update";


	/**少主祈愿 open ui */
	public static SZQIYUAN_OPEN_UI: string = "539001";
	public static SZQIYUAN_PRAY: string = "539002";
	public static SZQIYUAN_GET_POINT: string = "539003";
	public static SZQIYUAN_RED: string = "539004";
	public static SZQIYUAN_PRAY_MOVIE: string = "539005";
	public static SZQIYUAN_PRAY_OVER: string = "539006";

	public static SHAOZHU_SINGLE_TURN = 680404;

	public static GUANQIA_HELP_DEAD = "guanqia_dead";
	public static GUANQIA_HELP_PLAYER_HP = "guanqia_playerhp";
	public static GUANQIA_HELP_BOSS_HP = "guanqia_bosshp";
	public static GUANQIA_HELP_LEAVE = "gq_leave";
	/**国家技能 打开ui */
	public static COUNTRY_SKILL_OPEN_UI: string = "151101";
	public static COUNTRY_SKILL_UP: string = "151102";
	public static COUNTRY_SKILL_RED: string = "151103";
	/**曹操来袭 */
	public static CC_SCENE_PLAYER_STATE = 720399;
	public static CC_ROLE_LIFE = 720398;
	public static CC_CAOCAO_BOSS_DEAD = 720397;
	//新活动-单笔充值
	public static ACTCOM_SINGLE_TURN = "847001";
	public static ACTCOM_SINGLE_LOG = "847002";
	public static ACTCOM_SINGLE = "847003";
	/**新活动-充值转盘 */
	public static ACTCOM_CZZP: string = "849001";
	public static ACTCOM_CZZP_TURN: string = "849002";
	/**新活动-消费转盘 */
	public static ACTCOM_XFZP: string = "857001";
	public static ACTCOM_XFZP_TURN: string = "857002";
	/**新活动-限时抢购 */
	public static ACTCOM_LIMIT_BUY: string = "867001";
	public static ACTCOM_LIMIT_BUY_BUY: string = "867002";
	public static XIANSHAN_XUNSHOU_SHOWEFF: string = "712101";
	public static XIANSHAN_XUNSHOU_REWARD: string = "712102";
	public static XIULIAN_TF_SHOWEFF: string = "712402";
	public static XIULIAN_TF_REWARD: string = "712403";
	public static ACTCOM_XFZD_SHOWEFF: string = "721701";
	public static YSBOSS_REVIVE = "YSBOSS_REVIVE";
	public static YSBOSS_RESULT = "YSBOSS_RESULT";
	public static ZFZJ_UPDATEHURT = "7603001";
	public static ZFZJ_BOSS_DEAD = "7603002";
	public static ZFZJ_ROLE_LIFE = "7603003";
	public static SJXS_REWARD: string = "7218001";
	/**许愿树 奖励*/
	public static WISHTREE_PRAY_MOVIE: string = "775102";

	public static ROLE_QICE_RAGE: string = "role_qice_rage";
	public static ZSSF_PLAYEFF: string = "zssf_playeff";

	//家园事件  数据更新
	public static HOME_DATA_UPDATE = 8000;
	public static HOME_TIANGONG_UPDATE = 800001;

	public static GCBZ_MOVE = "gcbz_move";
	public static GCBZ_MOVE_TWEEN = "gcbz_move_tween";
	public static GCBZ_OPEN = "gcbz_open";
	public static GCBZ_RESET = "gcbz_reset";
	public static GCBZ_REWARD_SHOW = "gcbz_reward_show";

	public static WARORDERL_OPENUI = "warorderl_openui";
	public static WarOrder_REWARD_UPDATE = "warorder_reward_update";
	public static WarOrder_TASK_UPDATE = "warorder_task_update";
	
	public constructor() {
	}
}