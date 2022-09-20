var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Enum_MsgType = (function () {
    function Enum_MsgType() {
    }
    Enum_MsgType.ONRESIZE = "stageresize";
    /**角色创建完成 */
    Enum_MsgType.ROLE_CREATE_COMPLETE = "role_create_complete";
    /**场景地图 */
    Enum_MsgType.ENTER_SCENE = "enter_scene";
    /**场景地图改变 */
    Enum_MsgType.SCENE_CHANGE = "SCENE_CHANGE";
    /**进入游戏准备完成 */
    Enum_MsgType.ENTER_GAME_READY = "enter_game_ready";
    /**预加载完成*/
    Enum_MsgType.PRELOAD_COMPLETE = "PRELOAD_COMPLETE";
    /** 帧帧听*/
    Enum_MsgType.MSG_ENTERFRAME = "msg_enterframe";
    /** 主角更新*/
    Enum_MsgType.HERO_UPDATE = "hero_update";
    /**邮件内容更新 */
    Enum_MsgType.MAIL_CONTENT_SHOW = "mail_content_show";
    /**邮件列表更新 */
    Enum_MsgType.MAIL_LIST_UPDATE = "mail_list_update";
    /**技能等级更新 */
    Enum_MsgType.SKILL_UPDATE = "1101";
    /**神技技能等级更新 */
    Enum_MsgType.GODSKILL_UPDATE = "1102";
    /**锻造数据更新 */
    Enum_MsgType.DUANZAO_DATA_UPDATE = "1201";
    /**锻造特效更新 */
    Enum_MsgType.DUANZAO_EFF_UPDATE = "120101";
    /**锻造宝石背包更新 */
    Enum_MsgType.DUANZAO_STONEBAG_UPDATE = "duanzao_stonebag_update";
    /**神装升阶 */
    Enum_MsgType.GOD_EQUIP_SUIT_JIE = "god_equip_suit_jie";
    /**神装分解 */
    Enum_MsgType.GOD_EQUIP_DECOMPOSE = "GOD_EQUIP_DECOMPOSE";
    /**人物装备更新 */
    Enum_MsgType.MSG_ROLE_EQUIP_UPDATE = "msg_role_equip_update";
    /**主动离开 后端的战斗*/
    Enum_MsgType.LEAVESERBATTLE_BYSELF = "LEAVESERBATTLE_BYSELF";
    /**背包 */
    Enum_MsgType.MSG_BAG_VO_UPDATE = "130101";
    Enum_MsgType.MSG_BAG_ITME_UPDATE = "130102";
    Enum_MsgType.MSG_BAG_EQUIP_UPDATE = "130103";
    Enum_MsgType.MSG_BAG_SIZE_UPDATE = "130104";
    Enum_MsgType.MSG_BAG_FULL_NOTICE = "130105";
    Enum_MsgType.MSG_BAG_DECOMPOSE = "130106";
    Enum_MsgType.MSG_BAG_ITEM_USE = "130107";
    Enum_MsgType.MSG_BAG_DECOMPOSE_ONEKEY = "268101";
    /**分解 红点 */
    Enum_MsgType.MSG_BAG_DECOMPOSE_RED = "130401";
    /**图鉴数据更新 */
    Enum_MsgType.TUJIAN_DATA_UPDATE = "2901";
    /**战甲升阶 */
    Enum_MsgType.ZHANJIA_UPJIE_UPDATE = "80001";
    /**战甲ui */
    Enum_MsgType.ZHANJIA_OPENUI_UPDATE = "80002";
    /**战甲技能升级 */
    Enum_MsgType.ZHANJIA_UP_SKILL = "80003";
    /**战甲升星 */
    Enum_MsgType.ZHANJIA_UP_STAR = "80004";
    /**战甲套装升级 */
    Enum_MsgType.ZHANJIA_UP_SUIT = "80005";
    /**战甲更改 */
    Enum_MsgType.ZHANJIA_CHANGE = "80006";
    /**战甲红点 */
    Enum_MsgType.ZHANJIA_CHECK_NOTICE = "80007";
    /**兽灵数据更新 */
    Enum_MsgType.SHOULING_DATA_UPDATE = "2001";
    /**宝物数据更新 */
    Enum_MsgType.BAOWU_DATA_UPDATE = "2501";
    /**宝物技能更新 */
    Enum_MsgType.BAOWU_SKILL_UPDATE = "250101";
    /**星图数据更新 */
    Enum_MsgType.XINGTU_DATA_UPDATE = "2301";
    /**轮回数据更新 */
    Enum_MsgType.LUNHUI_DATA_UPDATE = "6901";
    /**神剑数据更新 */
    Enum_MsgType.SHENJIAN_DATA_UPDATE = "2701";
    /**将魂数据更新 */
    Enum_MsgType.JIANGHUN_DATA_UPDATE = "2401";
    /**武将升阶 */
    Enum_MsgType.WUJIANG_UPJIE_UPDATE = "65100";
    /**武将ui */
    Enum_MsgType.WUJIANG_OPENUI_UPDATE = "65101";
    /**武将技能升级 */
    Enum_MsgType.WUJIANG_UP_SKILL = "65102";
    /**武将升星 */
    Enum_MsgType.WUJIANG_UP_STAR = "65103";
    /**武将吞噬丹药 */
    Enum_MsgType.WUJIANG_USE_DAN = "65104";
    /**武将改变job */
    Enum_MsgType.WUJIANG_CHANGE_JOB = "65105";
    /**武将 将印分解 */
    Enum_MsgType.WUJIANG_DECOMPOSE = "65106";
    /**武将 红点 */
    Enum_MsgType.WUJIANG_CHECK_NOTICE = "65107";
    /**武将 神将之力 */
    Enum_MsgType.WUJIANG_SHENGJIANGZHILI = "65108";
    /**武将 神将之力 - 技能进阶 */
    Enum_MsgType.WUJIANG_SHENGJIANGZHILI_SKILLUP = "65109";
    /**更新神将之力的显示 */
    Enum_MsgType.WUJIANG_SHENGJIANGZHILIUPDATE = "65109";
    /**熔炼*/
    Enum_MsgType.MSG_RL_SELECT = "msg_rl_select";
    Enum_MsgType.MSG_RL_INOF = "msg_rl_inof";
    Enum_MsgType.MSG_RL_REFLASH1 = "msg_rl_reflash1";
    Enum_MsgType.HE_CHENG_SUCCESS = "265201";
    /**转生提升*/
    Enum_MsgType.REBIRTH_UPDATE = "rebirth_update";
    /**商城数据更新*/
    Enum_MsgType.SHOP_UPDATE = UIConst.SHOP + "";
    /**异宝数据更新*/
    Enum_MsgType.YIBAO_UPDATE = UIConst.YIBAO + "";
    /**称号*/
    Enum_MsgType.TITLE_UPDATE = '2201';
    Enum_MsgType.TITLE_OPENUI = '22011';
    /**官衔*/
    Enum_MsgType.MSG_GXUPDATE = '21010';
    Enum_MsgType.MSG_GXINIT = '21011';
    /**关卡 BOSS面板数据 (排行榜前三)*/
    Enum_MsgType.MSG_BOSSINFO = '10520';
    /**关卡  第几波怪物更新*/
    Enum_MsgType.MSG_WAVEUPDATE = "105201";
    /**关卡  BOSS击杀服务器验证结果*/
    Enum_MsgType.MSG_BOSS_RET = "105202";
    /**关卡  自动挑战BOSS更变*/
    Enum_MsgType.MSG_AUTO_C = "105203";
    /**关卡  关卡数据变更*/
    Enum_MsgType.MSG_GQ_UPDATE = "105204";
    /**关卡  排行榜数据更新*/
    Enum_MsgType.MSG_GQ_RNK = "105205";
    Enum_MsgType.MSG_GQ_SWEEP = "105206";
    Enum_MsgType.MSG_QIANRENZHAN = '105207';
    /**关卡  剧情更新*/
    Enum_MsgType.MSG_JUQING_STATUS = '105208';
    Enum_MsgType.MSG_GQ_SWEEP_01 = "105209";
    /**战斗胜利结算 奖励发生变化*/ Enum_MsgType.BATTLEWIN_AWARDSCHANGE = 105213;
    /**天数 所有数据*/
    Enum_MsgType.MSG_TS_UPDATE = "2601";
    /**天数 身上数据*/
    Enum_MsgType.MSG_TS_WAEAR = "2602";
    /**天数 天书升级*/
    Enum_MsgType.MSG_TS_LEVELUP = "2603";
    /**天数 天书升星*/
    Enum_MsgType.MSG_TS_STAR = "2604";
    /**天数 天书属性丹*/
    Enum_MsgType.MSG_TS_DRUG = "2605";
    /**每日任务， item更新*/
    Enum_MsgType.MSG_TASK_UP = "4102";
    /**设置 修改名字*/
    Enum_MsgType.SETTING_CHANGE_NAME = "102001";
    /**设置 修改头像头像框*/
    Enum_MsgType.SETTING_CHANGE_HEAD = "102002";
    /**设置 隐藏势力*/
    Enum_MsgType.SETTING_HIDE_COUNTRY = "102003";
    /**一骑当千更新*/
    Enum_MsgType.YJDQ_UPDATE = "1704";
    /**一骑当千排行榜更新*/
    Enum_MsgType.YJDQ_RANK_UPDATE = "170404";
    /**一骑当千初始化*/
    Enum_MsgType.YJDQ_INIT_UPDATE = "170405";
    /**boss的气血更新 */
    Enum_MsgType.MSG_BOSS_HP_UPDATE = "bshp";
    /**个人BOSS UI*/
    Enum_MsgType.MSG_PBOSS_UI_UPDATE = "1801";
    /**铜雀台 打开ui*/
    Enum_MsgType.PEACOCK_OPENUI = "122001";
    /**铜雀台 关闭战斗*/
    // public static PEACOCK_CLOSE_BATTLE: string = "122002";
    /**铜雀台 掉落*/
    Enum_MsgType.PEACOCK_BATTLE_DROP = "122003";
    /**铜雀台 获取已通过某关卡人数*/
    Enum_MsgType.PEACOCK_PASSLAYER_NUM = "122004";
    /**玩家国家信息更新 */
    Enum_MsgType.COUNTRY_UPDATE = "147001";
    /**玩家国家捐赠更新 */
    Enum_MsgType.COUNTRY_DONATE_UPDATE = "147002";
    /**宴会红点刷新 */
    Enum_MsgType.COUNTRY_YANHU_REDPOINT = "147009";
    /**玩家国家 打开ui */
    Enum_MsgType.COUNTRY_OPEN_UI = "147003";
    /**打开宴会列表 */
    Enum_MsgType.COUNTRY_YANHULIST = "147004";
    /**打开宴会主界面 */
    Enum_MsgType.COUNTRY_YANHUMAINUI = "147005";
    /**敬酒记录 */
    Enum_MsgType.COUNTRY_JINJIUJILU = "147006";
    /**玩家敬酒 */
    Enum_MsgType.COUNTRY_PLAYERJINJIU = "147007";
    /**退出宴会 */
    Enum_MsgType.COUNTRY_EXITYANHU = "147008";
    /**王位之争 打开ui */
    Enum_MsgType.KINGSHIP_UPDATEDATA = "176001";
    /**乱世枭雄 状态改变 */
    // public static CROSSKING_STATE_UPDATE: string = "186000";
    /**乱世枭雄 open ui */
    Enum_MsgType.CROSSKING_OPEN_UI = "186001";
    /**乱世枭雄 购买挑战次数 */
    Enum_MsgType.CROSSKING_BUY_NUM = "186002";
    /**乱世枭雄 排行榜 */
    Enum_MsgType.CROSSKING_RANK_ARR = "186003";
    /**乱世枭雄 战报 */
    Enum_MsgType.CROSSKING_REPORT_ARR = "186004";
    /**乱世枭雄 积分奖励领取情况 */
    Enum_MsgType.CROSSKING_POINT_REWARD = "186005";
    /**乱世枭雄 晋级对手列表 */
    Enum_MsgType.CROSSKING_UP_PLY = "186006";
    /**乱世枭雄 红点提示 */
    Enum_MsgType.CROSSKING_CHECK_NOTICE = "186007";
    /**乱世枭雄 宝藏 */
    Enum_MsgType.CROSSKING_OPEN_STORE = "186008";
    /**升阶秘境  */
    Enum_MsgType.CROSSKING_SJMJ = "186009";
    // public static CROSSKING_BUY_ITEM: string = "186009";
    /**枭雄争霸 open ui */
    Enum_MsgType.CROSSWARS_OPEN_UI = "210001";
    /**枭雄争霸  押注*/
    Enum_MsgType.CROSSWARS_BUY_WIN = "210002";
    /**枭雄争霸  打开名人堂*/
    Enum_MsgType.CROSSWARS_OPEN_WINERS = "210003";
    /**枭雄争霸  膜拜*/
    Enum_MsgType.CROSSWARS_MOBAI = "210004";
    /**枭雄争霸  获取冠军奖励*/
    Enum_MsgType.CROSSWARS_GET_FRIST = "210005";
    /**枭雄争霸 红点提示 */
    Enum_MsgType.CROSSWARS_CHECK_NOTICE = "210006";
    /**枭雄争霸 状态改变 */
    Enum_MsgType.CROSSWARS_STATUS_CHANGE = "210007";
    /**跨服矿藏 open ui*/
    Enum_MsgType.CROSSMINERAL_OPEN_UI = "360701";
    /** 跨服王者活动状态改变 */
    Enum_MsgType.KFWZ_ACT_STATE_CHANGE = "kfwz_act_state_change";
    /** 跨服王者数据更新 */
    Enum_MsgType.KFWZ_UPDATE = "kfwz_update";
    /** 跨服王者组队数据更新 */
    Enum_MsgType.KFWZ_TEAM_DATA_UPDATE = "kfwz_team_data_update";
    /** 跨服王者日志项尺寸改变 */
    Enum_MsgType.KFWZ_LOG_CHANGE_SIZE = "kfwz_log_change_size";
    /** 跨服王者日志更新 */
    Enum_MsgType.KFWZ_LOG_UPDATE = "kfwz_log_update";
    /** 跨服王者排行更新 */
    Enum_MsgType.KFWZ_RANK_UPDATE = "kfwz_rank_update";
    /** 跨服王者队伍列表更新 */
    Enum_MsgType.KFWZ_TEAM_LIST_UPDATE = "kfwz_team_list_update";
    /** 跨服王者战斗玩家死亡 */
    Enum_MsgType.KFWZ_BATTLE_PLAYER_DEAD = "kfwz_battle_player_dead";
    /** 跨服王者PVE战斗结束通知 */
    Enum_MsgType.KFWZ_BATTLE_PVE_OVER = "kfwz_battle_PVE_over";
    /** 跨服王者重置拖曳事件 */
    Enum_MsgType.KFWZ_DRAG_RESET_POS = "kfwz_drag_reset_pos";
    /** 跨服王者自动开始倒计时事件 */
    Enum_MsgType.KFWZ_AUTO_START_TIMER_CHANGE = "kfwz_auto_start_timer_change";
    /** 坐骑 坐骑幻化数据更新通知 */
    Enum_MsgType.HORSE_HH_UPDATE = "horse_hh_update";
    /** 坐骑 坐骑幻化进阶通知 {id:坐骑id} */
    Enum_MsgType.HORSE_HH_UPGRADE_CHANGE = "horse_hh_upgrade_change";
    /** 幸运扭蛋更新 */
    Enum_MsgType.LUCKY_EGG_UPDATE = "lucky_egg_update";
    /** 幸运扭蛋奖池更新 */
    Enum_MsgType.LUCKY_EGG_POOL_UPDATE = "lucky_egg_pool_update";
    /** 幸运扭蛋抽奖成功 */
    Enum_MsgType.LUCKY_EGG_LOTTERY = "lucky_egg_lottery";
    /** 刮刮乐数据更新 */
    Enum_MsgType.GGL_UPDATE = "ggl_update";
    /** 幸运福签数据更新 */
    Enum_MsgType.XYFQ_UPDATE = "xyfq_update";
    /** 幸运福签抽签成功 */
    Enum_MsgType.XYFQ_DRAW_SUCCESS = "xyfq_draw_success";
    /** 幸运福签任务状态更新 {type:number} */
    Enum_MsgType.XYFQ_TASK_UPDATE = "xyfq_task_update";
    /** 幸运福签排行数据更新 */
    Enum_MsgType.XYFQ_RANK_UPDATE = "xyfq_rank_update";
    /** 轮回副本数据更新 */
    Enum_MsgType.LHFB_UPDATE = "lhfb_update";
    /** 当前进度的轮回id改变通知 */
    Enum_MsgType.LHFB_CUR_ID_CHANGE = "lhfb_cur_id_change";
    /** 轮回副本队伍数据更新 */
    Enum_MsgType.LHFB_TEAM_DATA_UPDATE = "lhfb_team_data_update";
    /** 轮回副本队伍id改变通知 */
    Enum_MsgType.LHFB_TEAM_ID_CHANGE = "lhfb_team_id_change";
    /** 轮回副本战斗血量更新 */
    Enum_MsgType.LHFB_BATTLE_HP_UPDATE = "lhfb_battle_hp_update";
    /** 轮回副本死亡通知 */
    Enum_MsgType.LHFB_BATTLE_DEAD = "lhfb_battle_dead";
    /**玲珑阁 open ui */
    Enum_MsgType.LINGLONG_OPEN_UI = "222001";
    Enum_MsgType.LINGLONG_OPEN_RANK = "222002";
    Enum_MsgType.LINGLONG_BUY_FLASH = "222003";
    Enum_MsgType.LINGLONG_GET_AWARD = "222004";
    Enum_MsgType.LINGLONG_LOGS = "222005";
    /**全民 BOSS*/
    Enum_MsgType.MSG_PLAYER_BEKILLED = "1803";
    Enum_MsgType.MSG_PLAYER_RELIFE = "18034";
    /**玩家气血改变*/
    Enum_MsgType.MSG_MINEHPCHANGE = "1";
    /**新增玩家角色信息 */
    Enum_MsgType.MSG_ADDROLEDETAIL = "2";
    /**材料副本更新 */
    Enum_MsgType.FUBEN_CAILIAO_UPDATE = "1703";
    /**材料副本次数更新 */
    Enum_MsgType.FUBEN_CAILIAO_BATTLENUM_UPDATE = 170301;
    /**全民BOSS UI打开*/
    Enum_MsgType.MSG_QMBOSS_UPDATE = "18031";
    /**全民BOSS 排行榜更新*/
    Enum_MsgType.MSG_QMBOSS_RANKUPDATE = "18032";
    Enum_MsgType.MSG_QMBOSS_LOGIN = "18033";
    Enum_MsgType.MSG_QMBOSS_DEAD = "18034";
    Enum_MsgType.MSG_QMBOSS_DANJI_RES = "18035";
    Enum_MsgType.MSG_QMBOSS_DANJI_BOSSXUE = "18036";
    Enum_MsgType.MSG_QMBOSS_SAODAN = "18037";
    /** BOSS 排行榜更新*/
    Enum_MsgType.RANK_UPDATE = "145001";
    /** 南征北战更新*/
    Enum_MsgType.NZBZ_UPDATE = "1503";
    /** 南征北战排行更新*/
    Enum_MsgType.NZBZ_RANK_UPDATE = "150301";
    /** 南征北战积分奖励更新*/
    Enum_MsgType.NZBZ_JIFENREWARD_UPDATE = "150302";
    Enum_MsgType.LBRANK = "1805";
    Enum_MsgType.LB_ENTER = "18051";
    Enum_MsgType.LB_ROLE_LIFE = "18052";
    Enum_MsgType.LB_BOSS_STATE = "18053";
    Enum_MsgType.SANGUO_ZHANSHEN_UPDATE = "1602";
    Enum_MsgType.SANGUO_ZHANSHEN_TIME = "160201";
    Enum_MsgType.SANGUO_ZHANSHEN_SHOP = "160203";
    Enum_MsgType.LB_OPENUI = "18054";
    Enum_MsgType.LB_NOTICE = "18055";
    Enum_MsgType.LB_SCENE_PLAYER_STATE = 18056;
    /**过关斩将 打开ui*/
    Enum_MsgType.RUNMAN_OPENUI = "155001";
    /**过关斩将 关闭战斗*/
    Enum_MsgType.RUNMAN_CLOSE_BATTLE = "155002";
    /**过关斩将 掉落*/
    Enum_MsgType.RUNMAN_BATTLE_DROP = "155003";
    /**过关斩将 更新战斗结果*/
    Enum_MsgType.RUNMAN_UPDATE_BATTLE = "155004";
    /**孟获状态更新*/
    Enum_MsgType.MH_STATE = "1804";
    /**孟获打开界面*/
    Enum_MsgType.MH_OPEN = "18041";
    /**孟获打开上期排行榜*/
    Enum_MsgType.MH_RANK = "18042";
    Enum_MsgType.MH_ROLELIFE = "18043"; //复活状态变更
    Enum_MsgType.MH_SCENE = "18044"; //场景数据更新
    Enum_MsgType.MH_TAGERT = "18045"; //目标奖励更新0打开界面 1领取奖励
    Enum_MsgType.MH_SCENE_PLAYER_STATE = 18046;
    Enum_MsgType.MH_STATECHANGE = 18047;
    Enum_MsgType.MH_ENTER_FAIL = 18048;
    /**单刀赴会 */
    Enum_MsgType.DANDAO_FUHUI = "1603";
    /**单刀赴会 排行榜更新*/
    Enum_MsgType.DANDAO_FUHUI_RANK = "160301";
    /**单刀赴会 匹配显示更新*/
    Enum_MsgType.DANDAO_FUHUI_MATH = "160302";
    /**单刀赴会 战报显示更新*/
    Enum_MsgType.DANDAO_FUHUI_BATTLEGROUP = "160303";
    /**通用战斗结束框 关闭界面*/
    Enum_MsgType.COMMON_WINFAIL_CLOSE = "common_winfail_close";
    Enum_MsgType.REDDOT_NOTICE = "red"; /**服务器红点提示*/
    Enum_MsgType.SHOUCHONG = "4601";
    Enum_MsgType.SHOUCHONGUP = "46010";
    Enum_MsgType.MEIRISHOUCHONG = "4501";
    Enum_MsgType.MEIRISHOUCHONGUP = "45010";
    Enum_MsgType.VIP_CHANGE = "vip";
    Enum_MsgType.CHONGZHIOPEN = "5003";
    Enum_MsgType.VIP_OPEN = "5001";
    Enum_MsgType.VIP_LQ = "50011";
    /**角色怒气值更新 */
    Enum_MsgType.ROLE_RAGE_UPDATE = "rage";
    /**角色怒气值更新 */
    Enum_MsgType.WELFARE_SIGN_UPDATE = "4202";
    Enum_MsgType.WELFARE_WEEKVIP_OPEN = 4205;
    Enum_MsgType.WELFARE_WEEKVIP_LQ = 420501;
    /**登录豪礼 */
    Enum_MsgType.HUODONG_DAILYGIFT_OPENUI = "238001";
    Enum_MsgType.HUODONG_DAIGIFTACT_UI = "238011";
    Enum_MsgType.HUODONG_DAIGIFTKF_UI = "238012";
    /**单笔充值 */
    Enum_MsgType.HUODONG_DAILYONE_OPENUI = "238003";
    Enum_MsgType.HUODONG_DAIONEACT_UI = "238013";
    Enum_MsgType.HUODONG_DAIONEKF_UI = "238014";
    /**单日累充 */
    Enum_MsgType.HUODONG_DAILYADDUP_OPENUI = "238005";
    Enum_MsgType.HUODONG_DAIADDACT_UI = "238015";
    Enum_MsgType.HUODONG_DAIADDKF_UI = "238016";
    /**累计充值 */
    Enum_MsgType.HUODONG_ADDRECHARGE_OPENUI = "238007";
    /**登录豪礼 8-14 */
    Enum_MsgType.HUODONG_DAILYGIFT_814 = "463001";
    Enum_MsgType.HUODONG_DAILYONE_814 = "463002";
    Enum_MsgType.HUODONG_DAILYADDUP_814 = "463003";
    Enum_MsgType.HUODONG_ADDRECHARGE_814 = "463004";
    // public static HUODONG_ADDRECHARGE_GET: string = "238008";
    /**开服7天连续充值 */
    Enum_MsgType.HUODONG_SEVEN_KF_OPENUI = "238009";
    /**7天连续充值 8-14*/
    Enum_MsgType.HUODONG_SEVEN_814 = "705001";
    /**活动7天连续充值 */
    // public static HUODONG_SEVEN_ACT_OPENUI: string = "2380010";
    /**专属活动 单笔充值 */
    Enum_MsgType.HUOD_ONLY_DAIONEA_UI = "810001";
    Enum_MsgType.HUOD_ONLY_Shop_UI = "810002";
    /**专属活动 累计充值 */
    Enum_MsgType.HUOD_ONLY_ADDRECHARGE_OPENUI = "830001";
    /**专属活动 元宝返利*/ Enum_MsgType.HUOD_ONLY_YBFL = "833001";
    /**专属活动 单笔返利 */ Enum_MsgType.HUOD_ONLY_DBFANLI = "836001";
    Enum_MsgType.TQ_INFO = "5004"; //特权
    Enum_MsgType.TQ_LQ = "50041"; //特权
    /**七天登录 */
    Enum_MsgType.SEVENDAY_LOGIN = "5005"; //
    /**晋升更新 */
    Enum_MsgType.JINSHENG = "4103"; //
    /**功能预览 */
    Enum_MsgType.FUNCTIONPREVIEW = "3901"; //
    /**武圣榜 */
    Enum_MsgType.WUSHENG_LIST = "4901"; //
    /**武圣榜 领取奖励*/
    Enum_MsgType.WUSHENG_LIST_DRAW = "490101"; //
    //三国无双
    Enum_MsgType.SGWS_OPENUI = 1604;
    Enum_MsgType.SGWS_POOL = 16041;
    Enum_MsgType.SGWS_YZ = 16042;
    Enum_MsgType.BAOKU = 3801;
    Enum_MsgType.JUBAOPENG = 5002;
    //隆中对
    Enum_MsgType.LZD_OPEN = 3702;
    Enum_MsgType.LZD_RET = 37021;
    Enum_MsgType.LZD_OPENRANK = 37022;
    Enum_MsgType.CHAT = 3001;
    Enum_MsgType.CHAT_BLACKLIST = 300101;
    Enum_MsgType.KAIFUDAY_UPDATE = "kaifu";
    Enum_MsgType.QUNYINGBANG = 4401;
    Enum_MsgType.QUNYINGBANG_LAST = 440101;
    Enum_MsgType.ADD_ACTIVITYICON = "ADD_ACTIVITYICON"; //创建活动图标
    Enum_MsgType.CHAT_LONG_CLICK = "chat_long_click";
    Enum_MsgType.KAIFUKUANGHUAN = 5101;
    /**神将狂欢 */
    Enum_MsgType.SHENJIANGKUANGHUAN = 5102;
    /**神将狂欢 item 刷新 */
    Enum_MsgType.SJKHITEMREFRESH = 5103;
    /**刷新神将狂欢列表 */
    Enum_MsgType.SJKHREFRESHLIST = 5104;
    //活动
    Enum_MsgType.ACTIVITY_LOGIN_SEND = "225001";
    // public static ACTIVITY_OPENUI = "225002";
    Enum_MsgType.ACTIVITY_ACTOPENSTATE = "225003";
    /**超值转盘*/ Enum_MsgType.CHAOZHI_ZHUANPAN = 4604;
    /**超值转盘显示特效*/ Enum_MsgType.CHAOZHI_ZHUANPAN_SHOWEFF = 460401;
    /**场景任务*/ Enum_MsgType.SCENE_TASK = 5301;
    /**显示任务*/ Enum_MsgType.SHOW_TASK = 5302;
    /**关闭任务*/ Enum_MsgType.HIDE_TASK = 5303;
    /**全名狂欢*/ Enum_MsgType.QUANMIN_KUANGHUAN = 5201;
    /**折扣商店*/ Enum_MsgType.DISCOUNT_SHOP = 4605;
    /**升阶商店*/ Enum_MsgType.SHENGJIE_SHOP = 4615;
    /**首冲团购*/ Enum_MsgType.GROUP_BUY_UI = 285001;
    /**首冲团购*/ Enum_MsgType.GROUP_BUY_NUM = 285002;
    /**首冲团购*/ Enum_MsgType.GROUP_BUY_CHARGE = 285003;
    Enum_MsgType.HD_CJDJ = 4506;
    Enum_MsgType.HD_CJDJLQ = 45061;
    /**动画播放完 */
    Enum_MsgType.CARTONGEND = "CARTONGEND";
    /**游戏激活 */
    Enum_MsgType.GAMEACTIVE = "GAMEACTIVE";
    Enum_MsgType.GAMEACTIVE_EVT = "GAMEACTIVE_EVT";
    /**元宝返利 7天*/ Enum_MsgType.YUANBAOFL_KF = 4611;
    /**元宝返利*/ Enum_MsgType.YUANBAOFANLI = 4612;
    /**材料返利 7天*/ Enum_MsgType.CAILIAOFL_KF = 4609;
    /**材料返利*/ Enum_MsgType.CAILIAOFANLI = 4610;
    /**ios开启关卡改变 */
    Enum_MsgType.IOS_OPEN_CHANGE = "iosopen";
    /**公告更新 */
    Enum_MsgType.WELFARE_NOTICE_UPDATE = 4204;
    /**国家boss更新 */
    Enum_MsgType.COUTRY_BOSS_UPDATE = 1505;
    /**被击杀玩家更新 */
    Enum_MsgType.COUTRY_BOSS_SCENE_PLAYER_STATE = 150501;
    /**转生装备更新 */
    Enum_MsgType.REBIRTH_EQUIP_UPDATA = 58801;
    /**跨服组队副本 */
    Enum_MsgType.CROSS_TEAM_UPDATE = 3604;
    /**跨服组队战斗排行榜更新*/
    Enum_MsgType.CROSS_TEAM_RANK_UPDATE = 360401;
    /**组队死亡通知*/
    Enum_MsgType.CROSS_TEAM_PLAYER_DEAD = 360402;
    /**组队副本进入场景通知*/
    Enum_MsgType.CROSS_TEAM_ENTER_SCENE = 360403;
    /**升级秘境副本进入场景通知*/
    Enum_MsgType.CROSS_MJ_ENTER_SCENE = 360404;
    /**直购更新*/
    Enum_MsgType.ZHIGOU_UPDATE = 5009;
    /**各个系统升阶*/
    Enum_MsgType.BY_SYS_UP_JIE_SKILL = 90901;
    Enum_MsgType.BY_SYS_UP_SKILL = 90902;
    Enum_MsgType.BY_SYS_JI_BAN = 90903;
    Enum_MsgType.BY_SYS_JI_BAN_UP = 90904;
    /**烽火狼烟*/
    Enum_MsgType.FHLY_SCORE_UPDATE = 370301;
    Enum_MsgType.FHLY_SCORE_INIT = 370302;
    /**更新个人排行榜*/ Enum_MsgType.FHLY_PLAYER_UPDATE = 370303;
    /**更新服务器排行榜*/ Enum_MsgType.FHLY_SERVER_UPDATE = 370304;
    /**查看城市*/ Enum_MsgType.FHLY_CHECKCITY = 370305;
    /**玩家移动*/ Enum_MsgType.FHLY_SYSCHRO = 370306;
    /**更新城池数据！*/ Enum_MsgType.FHLY_CITY_UPDATE = 370307;
    /**更新积分排行榜*/ Enum_MsgType.FHLY_SCORERANK_UPDATE = 370308;
    /**退出烽火狼烟*/ Enum_MsgType.FHLY_QUIT = 370309;
    /**场景玩家数据更新  添加 移除*/ Enum_MsgType.FHLY_SCENE_PLAYER = 370310;
    /**移动*/ Enum_MsgType.FHLY_HERO_MOVE = 370311;
    /**状态改变*/ Enum_MsgType.FHLY_STATE_CHANGE = 370312;
    /**城池战斗状态改变*/ Enum_MsgType.FHLY_CITYSTATE_CHANGE = 370313;
    /**获取城池 征收成员列表*/ Enum_MsgType.FHLY_CITY_PEOPLE = 370314;
    /**更新 征收成员显示*/ Enum_MsgType.FHLY_PLAYER_STATE = 370315;
    //宝物现世
    Enum_MsgType.BAOWU_XIANSHI_DROP = 400001;
    /**国家boss排行更新**/ Enum_MsgType.COUNTRY_BOSS_RANK_UPDATE = 150501;
    /**arpg map*/
    Enum_MsgType.ARPG_MAP_CLICK = "ARPG_MAP_CLICK";
    Enum_MsgType.ARPG_SCENE_ADD_PLAYER = "ARPG_SCENE_ADD_PLAYER";
    Enum_MsgType.ARPG_SCENE_REMOVE_PLAYER = "ARPG_SCENE_REMOVE_PLAYER";
    Enum_MsgType.ARPG_SCENE_REMOVE_NPC = "ARPG_SCENE_REMOVE_NPC";
    Enum_MsgType.ARPG_SCENE_ADD_NPC = "ARPG_SCENE_ADD_NPC";
    Enum_MsgType.ARPG_SCENE_READY = "ARPG_SCENE_READY";
    /**进入战斗发送 */
    Enum_MsgType.ENTER_SERVERBATTLE = "enter_serverbattle";
    /**退出战斗发送 */
    Enum_MsgType.EXIT_SERVERBATTLE = "exit_serverbattle";
    /**战斗更新buff */
    Enum_MsgType.SERVERBATTLE_BUFF = "serverbattle_buff";
    /**连击更新 */
    Enum_MsgType.LIANJI_UPDATE = 53;
    Enum_MsgType.CGYL_OPEN = 5801; //闯关有礼
    Enum_MsgType.CGYL_LQ1 = 580102; //闯关有礼
    Enum_MsgType.CGYL_LQ = 580101; //闯关有礼
    //问鼎天下
    Enum_MsgType.WDTX_SCENE_UPDATE = 370501;
    Enum_MsgType.WDTX_MINE_UPDATE = 370502;
    Enum_MsgType.WDTX_MVP = 370503;
    Enum_MsgType.WDTX_LAYER_UPDATE = 370504;
    Enum_MsgType.WDTX_BATTLE_END = 370505;
    Enum_MsgType.WDTX_RANK = 370506;
    Enum_MsgType.WDTX_PVE_END = 370507;
    //八阵图
    Enum_MsgType.BAZHENTU_NOTICE = 600101;
    //零点重置
    Enum_MsgType.ZERO_RESET = 600102;
    //登录发送开启系统数据 
    Enum_MsgType.SEND_OPEN_DAYS_SYSTEM = 600103;
    //专属活动 
    Enum_MsgType.SEND_HUOD_ONLY_SYSTEM = 600104;
    /**BOSS战场*/
    Enum_MsgType.BOSSZC_OPEN = 6211;
    Enum_MsgType.BOSSZC_ENTER = 621101;
    Enum_MsgType.BOSSZC_SCENE_ST = 621102;
    Enum_MsgType.BOSSZC_PVE_RET = 621103;
    Enum_MsgType.BOSSZC_READYTIME = 621104;
    //藏宝阁 
    Enum_MsgType.CANGBAOGE_RANK = 273001;
    //神装洗练 
    Enum_MsgType.GODEQUIP_XILIAN = 190101;
    //少主 
    Enum_MsgType.SHAOZHU = 6301;
    /**少主升星奖励 */
    Enum_MsgType.SHAOZHUSTAR = 6302;
    /**少主升星奖励刷新 */
    Enum_MsgType.SHAOZHUSTARUPDATE = 6303;
    //少主亲密度显示语言 
    Enum_MsgType.SHAOZHU_QINMI = 630102;
    /**单笔返利 */
    Enum_MsgType.DANBIFANLI = 5708;
    /**单笔返利领取奖励 */
    Enum_MsgType.DANBIFANLIREWARD = 5709;
    /**登陆有礼 */
    Enum_MsgType.DENGLUYOULI = 5710;
    /**登陆有礼领取奖励 */
    Enum_MsgType.DENGLUYOULIREWARD = 5711;
    /**累充返利 */
    Enum_MsgType.LEICHONGFANLI = 5712;
    /**累充返利领取奖励 */
    Enum_MsgType.LEICHONGFANLIReward = 5713;
    /**累充返利item点击 */
    Enum_MsgType.LEICHONGFANLITEM = 5714;
    /**圣兽降临-目标 */
    Enum_MsgType.ACT_HOLYB_MUBIAO = "497001";
    /**圣兽降临-活跃 */
    Enum_MsgType.ACT_HOLYB_HUOYUE = "499001";
    /**圣兽降临-转盘 */
    Enum_MsgType.ACT_HOLYB_ZHUANPAN = "503001";
    /**圣兽降临-转盘 抽奖*/
    Enum_MsgType.ACT_HOLYB_ZHUANPAN_TURN = "503002";
    /**圣兽降临-转盘 红点*/
    Enum_MsgType.ACT_HOLYB_ZHUANPAN_RED = "503003";
    /**圣兽降临-洗练 */
    Enum_MsgType.ACT_HOLYB_XILIAN = "495001";
    /**圣兽降临-寻宝 */
    Enum_MsgType.ACT_HOLYB_XUNBAO = "501001";
    /**圣兽降临-寻宝-排行 */
    Enum_MsgType.ACT_HOLYB_XUNBAO_RANK = "501002";
    /**圣兽降临-寻宝-目标 */
    Enum_MsgType.ACT_HOLYB_XUNBAO_MUBIAO = "501003";
    /**圣兽降临-寻宝-抽奖 */
    Enum_MsgType.ACT_HOLYB_XUNBAO_ROLL = "501004";
    /**圣兽降临-寻宝-红点 */
    Enum_MsgType.ACT_HOLYB_XUNBAO_RED = "501005";
    /**圣兽降临-洗练排名 */
    Enum_MsgType.ACT_HOLYB_XILIAN_RANK = "6407";
    /**奖励找回 */
    Enum_MsgType.REWARDBACK = 4026;
    /**奖励找回item */
    Enum_MsgType.REWARDBACKITEM = 40261;
    /**防沉迷 关闭界面 */
    Enum_MsgType.TRUE_NAME_CLOSE = "529001";
    /**觉醒之力套装更新 */
    Enum_MsgType.JUEXING_SUIT_UPDATE = "670101";
    /** 消费翻牌数据更新 */
    Enum_MsgType.XFFP_UPDATE = "xffp_update";
    /** 翻牌成功通知 {id:number}*/
    Enum_MsgType.XFFP_FLOP_SUCCESS = "xffp_flop_success";
    /** 消费摇骰数据更新 */
    Enum_MsgType.XFYT_UPDATE = "xfyt_update";
    /** 消费摇骰成功通知 */
    Enum_MsgType.XFYT_ROLL_SUCCESS = "xfyt_roll_success";
    /** 打气球信息更新 */
    Enum_MsgType.BALLOON_UPDATE = "balloon_update";
    /** 打气球成功 */
    Enum_MsgType.BALLOON_SUCCESS = "balloon_success";
    /** 成就更新 */
    Enum_MsgType.ACHIEVEMENT_UPDATE = "achievement_update";
    /** 成就奖励更新 */
    Enum_MsgType.ACHIEVEMENT_REWARD_UPDATE = "achievement_reward_update";
    /** 限定武将数据更新 */
    Enum_MsgType.XIANDING_UPDATE = "xianding_update";
    /** 限定武将奖励数据更新 */
    Enum_MsgType.XIANDING_REWARD_UPDATE = "xianding_reward_update";
    /** 三国战令奖励数据更新 */
    Enum_MsgType.SGZL_REWARD_UPDATE = "sgzl_reward_update";
    /** 三国战令任务数据更新 */
    Enum_MsgType.SGZL_TASK_UPDATE = "sgzl_task_update";
    /** 三国战令商店数据更新 */
    Enum_MsgType.SGZL_SHOP_UPDATE = "sgzl_shop_update";
    /** 三国战令（活动）奖励数据更新 */
    Enum_MsgType.SGZL2_REWARD_UPDATE = "sgzl2_reward_update";
    /** 三国战令（活动）任务数据更新 */
    Enum_MsgType.SGZL2_TASK_UPDATE = "sgzl2_task_update";
    /** 三国战令（活动）商店数据更新 */
    Enum_MsgType.SGZL2_SHOP_UPDATE = "sgzl2_shop_update";
    /** 宝藏拼图数据更新 */
    Enum_MsgType.BZPT_UPDATE = "bzpt_update";
    /** 宝藏拼图翻开 {id:number} */
    Enum_MsgType.BZPT_CARD_OPEN = "bzpt_card_open";
    /** 宝藏拼图开启宝箱 {id:number} */
    Enum_MsgType.BZPT_BOX_OPEN = "bzpt_box_open";
    /** 双12商城数据更新 */
    Enum_MsgType.SHOP12_UPDATE = "shop12_update";
    /** 双12商城购物车改变通知 */
    Enum_MsgType.SHOP12_CART_CHANGE = "shop12_cart_change";
    /** 双12商城购物车清空通知 */
    Enum_MsgType.SHOP12_CART_CLEAR = "shop12_cart_clear";
    /** 成就树数据更新 */
    Enum_MsgType.CJS_UPDATE = "cjs_update";
    /** 成就树层奖励数据更新 */
    Enum_MsgType.CJS_REWARD_UPDATE = "cjs_reward_update";
    /** 群雄逐鹿整体信息更新 */
    Enum_MsgType.QXZL_INFO_UPDATE = "qxzl_info_update";
    /** 群雄逐鹿移动成功通知 {source:源cityId target:目标cityId} */
    Enum_MsgType.QXZL_MOVE_SUCCESS = "qxzl_move_success";
    /** 群雄逐鹿城池信息更新 {cityId:城池id, curPage:需要刷新的当前页码} */
    Enum_MsgType.QXZL_CITY_INFO_UPDATE = "qxzl_city_info_update";
    /** 群雄逐鹿任务更新 */
    Enum_MsgType.QXZL_TASK_UPDATE = "qxzl_task_update";
    /** 群雄逐鹿商店更新 */
    Enum_MsgType.QXZL_SHOP_UPDATE = "qxzl_shop_update";
    /** 群雄逐鹿国家排行榜更新 */
    Enum_MsgType.QXZL_RANK_COUNTRY_UPDATE = "qxzl_rank_country_update";
    /** 群雄逐鹿玩家排行榜更新 */
    Enum_MsgType.QXZL_RANK_PLAYER_UPDATE = "qxzl_rank_player_update";
    /** 群雄逐鹿战况事件更新 */
    Enum_MsgType.QXZL_EVENT_UPDATE = "qxzl_event_update";
    /** 群雄逐鹿驻守奖励更新 */
    Enum_MsgType.QXZL_REWARD_UPDATE = "qxzl_reward_update";
    /** 群雄逐鹿实时推送，更新体力 */
    Enum_MsgType.QXZL_PUSH_STAMINA_UDPATE = "qxzl_push_stamina_udpate";
    /** 群雄逐鹿实时推送，更新城池归属 */
    Enum_MsgType.QXZL_PUSH_CITY_UPDATE = "qxzl_push_city_update";
    /** 群雄逐鹿实时推送，更新个人积分 */
    Enum_MsgType.QXZL_PUSH_SCORE_UPDATE = "qxzl_push_score_update";
    /** 群雄逐鹿实时推送，更新个人驻守状态 */
    Enum_MsgType.QXZL_PUSH_ISINCITY_UPDATE = "qxzl_push_isInCity_update";
    /** 群雄逐鹿个人排行榜更新 */
    Enum_MsgType.QXZL_RANK_PERSON_UPDATE = "qxzl_rank_person_update";
    /** 群雄逐鹿单枪匹马持续分钟更新 */
    Enum_MsgType.QXZL_BUFFTIME_UPDATE = "qxzl_bufftime_update";
    /** 奇策数据更新 */
    Enum_MsgType.QICE_INFO_UPDATE = "qice_info_update";
    /** 奇策升星成功 */
    Enum_MsgType.QICE_STAR_UP = "qice_star_up";
    /** 奇策升级成功 */
    Enum_MsgType.QICE_LEVEL_UP = "qice_level_up";
    /** 奇策魂更新 */
    Enum_MsgType.QICE_HUN_CHANGE = "qice_hun_change";
    /** 奇策套装更新 */
    Enum_MsgType.QICE_SUIT_UPDATE = "qice_suit_update";
    /** 奇策套装激活通知 */
    Enum_MsgType.QICE_SUIT_ACTIVE = "qice_suit_active";
    /** 出谋划策数据更新 */
    Enum_MsgType.QICE_LOTTERY_UPDATE = "qice_lottery_update";
    /** 出谋划策抽奖成功 */
    Enum_MsgType.QICE_LOTTERY_SUCCESS = "qice_lottery_success";
    /** 出谋划策目标奖励更新 */
    Enum_MsgType.QICE_TARGET_UPDATE = "qice_target_update";
    /**少主祈愿 open ui */
    Enum_MsgType.SZQIYUAN_OPEN_UI = "539001";
    Enum_MsgType.SZQIYUAN_PRAY = "539002";
    Enum_MsgType.SZQIYUAN_GET_POINT = "539003";
    Enum_MsgType.SZQIYUAN_RED = "539004";
    Enum_MsgType.SZQIYUAN_PRAY_MOVIE = "539005";
    Enum_MsgType.SZQIYUAN_PRAY_OVER = "539006";
    Enum_MsgType.SHAOZHU_SINGLE_TURN = 680404;
    Enum_MsgType.GUANQIA_HELP_DEAD = "guanqia_dead";
    Enum_MsgType.GUANQIA_HELP_PLAYER_HP = "guanqia_playerhp";
    Enum_MsgType.GUANQIA_HELP_BOSS_HP = "guanqia_bosshp";
    Enum_MsgType.GUANQIA_HELP_LEAVE = "gq_leave";
    /**国家技能 打开ui */
    Enum_MsgType.COUNTRY_SKILL_OPEN_UI = "151101";
    Enum_MsgType.COUNTRY_SKILL_UP = "151102";
    Enum_MsgType.COUNTRY_SKILL_RED = "151103";
    /**曹操来袭 */
    Enum_MsgType.CC_SCENE_PLAYER_STATE = 720399;
    Enum_MsgType.CC_ROLE_LIFE = 720398;
    Enum_MsgType.CC_CAOCAO_BOSS_DEAD = 720397;
    //新活动-单笔充值
    Enum_MsgType.ACTCOM_SINGLE_TURN = "847001";
    Enum_MsgType.ACTCOM_SINGLE_LOG = "847002";
    Enum_MsgType.ACTCOM_SINGLE = "847003";
    /**新活动-充值转盘 */
    Enum_MsgType.ACTCOM_CZZP = "849001";
    Enum_MsgType.ACTCOM_CZZP_TURN = "849002";
    /**新活动-消费转盘 */
    Enum_MsgType.ACTCOM_XFZP = "857001";
    Enum_MsgType.ACTCOM_XFZP_TURN = "857002";
    /**新活动-限时抢购 */
    Enum_MsgType.ACTCOM_LIMIT_BUY = "867001";
    Enum_MsgType.ACTCOM_LIMIT_BUY_BUY = "867002";
    Enum_MsgType.XIANSHAN_XUNSHOU_SHOWEFF = "712101";
    Enum_MsgType.XIANSHAN_XUNSHOU_REWARD = "712102";
    Enum_MsgType.XIULIAN_TF_SHOWEFF = "712402";
    Enum_MsgType.XIULIAN_TF_REWARD = "712403";
    Enum_MsgType.ACTCOM_XFZD_SHOWEFF = "721701";
    Enum_MsgType.YSBOSS_REVIVE = "YSBOSS_REVIVE";
    Enum_MsgType.YSBOSS_RESULT = "YSBOSS_RESULT";
    Enum_MsgType.ZFZJ_UPDATEHURT = "7603001";
    Enum_MsgType.ZFZJ_BOSS_DEAD = "7603002";
    Enum_MsgType.ZFZJ_ROLE_LIFE = "7603003";
    Enum_MsgType.SJXS_REWARD = "7218001";
    /**许愿树 奖励*/
    Enum_MsgType.WISHTREE_PRAY_MOVIE = "775102";
    Enum_MsgType.ROLE_QICE_RAGE = "role_qice_rage";
    Enum_MsgType.ZSSF_PLAYEFF = "zssf_playeff";
    //家园事件  数据更新
    Enum_MsgType.HOME_DATA_UPDATE = 8000;
    Enum_MsgType.HOME_TIANGONG_UPDATE = 800001;
    Enum_MsgType.GCBZ_MOVE = "gcbz_move";
    Enum_MsgType.GCBZ_MOVE_TWEEN = "gcbz_move_tween";
    Enum_MsgType.GCBZ_OPEN = "gcbz_open";
    Enum_MsgType.GCBZ_RESET = "gcbz_reset";
    Enum_MsgType.GCBZ_REWARD_SHOW = "gcbz_reward_show";
    Enum_MsgType.WARORDERL_OPENUI = "warorderl_openui";
    Enum_MsgType.WarOrder_REWARD_UPDATE = "warorder_reward_update";
    Enum_MsgType.WarOrder_TASK_UPDATE = "warorder_task_update";
    return Enum_MsgType;
}());
__reflect(Enum_MsgType.prototype, "Enum_MsgType");
