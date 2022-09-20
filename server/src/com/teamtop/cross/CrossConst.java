package com.teamtop.cross;
/**
 * 跨服数据CMD
 * @author Administrator
 *
 */
public class CrossConst {
	//--------------公共CMD-----------------
	public static final int CMD_CALLBACK = 30000;//callback的cmd
	public static final int CMD_BIND_ZONE_CHANNEL = 30001;//绑定区号和channel
	public static final int CMD_SEND_TO_AS_PORT = 30002;//发送跨服对外端口
	public static final int CMD_BLOCK_CALLBACK = 30003;//等待的数据
	//--------------公共CMD-----------------
	
	//江湖试炼1-100
	public static final int JIANGHU_TELL_LOCAL_SAVE = 1;//让子服保存数据
	public static final int JIANGHU_CROSS_GM = 2;//玩法中央服GM
	public static final int TELL_UPLOAD_JIANGHU = 3;//让子服上传:江湖试炼
	public static final int JIANGHU_MATCH_RIVALS = 4;//获取匹配的对手
	
	//部署bin 101-200
	public static final int UPLOAD_BIN_CS= 101;//部署bin
	public static final int TELL_INFO_SC= 102;//发送文字信息
	public static final int ASK_CROSS = 103;//请求跨服
	public static final int UPDATE_HERO_SCENE = 104;//上传玩家场景数据
	public static final int REBOOTSERVER= 105;//重启服务器
	public static final int HOTSWAP_STEP1= 106;//内测服上传热更文件到中央服
	public static final int HOTSWAP_STEP2= 107;//中央服上传热更文件到其他正式服
	public static final int HOTSWAP_MSG= 109;//热更文字提醒
	public static final int SYNC_BOARDCAST_TO_CROSS= 110;//玩家在子服操作同步到中央服
	public static final int HOTSWAP_BY_ZID_CS= 111;//热更指定区ClientToServer
	public static final int HOTSWAP_BY_ZID_CHECK_CS= 113;//热更指定区检查
	
	
//	public static final int SYNC_CHANGE_TO_LOCAL= 111;//玩家在中央服获得收入（道具，经验，邮件等）同步到子服
//	public static final int SYNC_WEAR_TO_CROSS= 112;//玩家在子服穿戴坐骑神兵翅膀等系统同步到中央服
//	public static final int SYNC_FIGHT_TO_CROSS= 112;//同步战斗属性和战力变化
//	public static final int TEST_CROSS= 113;//测试
	public static final int ASK_LOCAL_CANUSE = 114;//询问子服能否使用
	public static final int ASK_LOCAL_USE = 115;//让子服使用
	public static final int ASK_LOCAL_CANADD = 116;//询问子服能否添加
	public static final int ASK_LOCAL_ADD = 117;//让子服添加
	public static final int CROSS_QUIT = 118;//中央服退出
	public static final int LOOK_OTHER_HERO = 119;//查看其他玩家信息
	public static final int LOOK_OTHER_PET = 120;//查看其他玩家宠物
	public static final int CROSS_SG_CHAT = 121;//获取chat 跨服聊天
	public static final int CROSS_GS_CHAT = 122;//更新本地chat 跨服聊天
	public static final int CROSS_SEND_MAIL = 123;//中央服发送邮件
//	public static final int SYNC_SCENE_TO_LOCAL = 124;//同步场景到本地
	public static final int GET_CROSS_HEARTBEAT = 125;//中央服同步子服心跳
	public static final int TELL_CROSS_SERVER_CLOSE_CLIENT = 126;//子服让中央服关闭连接
//	public static final int SYNC_DEPLOY_TO_CROSS = 127;//同步阵法到中央服
//	public static final int ASK_GENERAL_FROM_LOCAL = 128;//中央服询问子服某个将领（原来中央服没有这位将领）
//	public static final int TEAM_LIST = 129;//组队列表
//	public static final int JOIN_QUICK = 131;//快速加入
//	public static final int GET_HERO_LIST = 132;//获取邀请列表
//	public static final int ASK_IN_TEAM = 133;//邀请入队
//	public static final int RECRUIT = 134;//招募队员
//	public static final int RECHECK_JOIN = 135;//加入队伍检查
//	public static final int QUIT_TEAM_SUCC = 136;//退出队伍成功
//	public static final int GET_GANG = 137;//获取帮会
	public static final int NPC_DROP = 138;//跨服npc掉落
//	public static final int CROSS_SEND_TITLE = 139;//中央服发送称号
//	public static final int GET_FRIEND_DATA = 140;//中央服获取好友数据
//	public static final int GET_REWARD_BIND_OR_NOT = 141;//中央服获取奖励是否需要绑定，根据世界等级
//	public static final int GM_UPDATE_CROSS_ROOM_MATCH = 142;//gm或者后台上传房间匹配规则
//	public static final int GM_FIND_CROSS_ROOM_MATCH = 143;//gm或者后台查找房间匹配规则
//	public static final int SKILL_CHANGE = 144;//技能变化上传
//	public static final int END_BATTLE = 145;//战斗结束
//	public static final int LOOK_CROSS_HERO = 146;//查看跨服角色
//	public static final int LOOK_CROSS_PET = 147;//查看跨服宠物
//	public static final int CHECK_LIMIT = 148;//检查收入上限
	/**跨服boss*/
	public static final int CROSSBOSS_TELL_LOCAL_STATE = 149;//跨服boss通知状态
	public static final int CROSSBOSS_GET_LOCAL_DATA = 150;//中央服请求子服跨服boss信息
	public static final int CROSSBOSS_UPLOAD_LOCAL_DATA = 151;//子服向中央服上传跨服boss信息
	public static final int CROSSBOSS_UPLOAD_CROSS_DATA = 152;//中央服同步跨服boss信息到子服
	public static final int CROSSBOSS_BOSS_KILL = 153;//中央服广播boss被击杀
	public static final int CROSSBOSS_GM = 154;//字符上传GM参数
	public static final int CROSSBOSS_MINUE_NUM = 155;//子服收到中央服 减玩家进入次数
	public static final int CROSSBOSS_LOGIN_SUCCESS = 158;//子服收到中央服 进入成功
	
	public static final int GM_UPDATETIME_LTC = 156;//GM修改时间让跨服生效
	public static final int GM_UPDATETIME_CTL = 157;//GM修改时间让其他子服生效
	public static final int GM_TONGBUTIME_CTL = 159;//中央服发送中央服时间到本地服
	public static final int GM_TONGBUTIME_LTC=160;//本地服获取中央服时间
	
	
	//后台功能 201-300
	public static final int CHECK_OLD_PLAYER = 201;//滚服玩家判断
	public static final int SET_RED_LIST = 202;//中央服通知子服红名单操作
	public static final int SET_BLACK_LIST = 203;//中央服通知子服黑名单操作
	public static final int CHECK_RED_LIST = 204;//子服通知中央服验证红名单
	public static final int CHECK_BLACK_LIST = 205;//子服通知中央服验证黑名单
	public static final int SET_AD_ACCOUNT = 206;//子服通知中央服设置广告号账号
	public static final int SET_AD_MONITOR_DATA = 207;//中央服通知子服设置广告号数据
	public static final int CHECK_AD_ACCOUNT = 208;//子服通知中央服验证是否是广告号账号
	public static final int CHECK_YUENAN_VIP = 209;//子服向中央服查询该玩家是否是超级会员
	public static final int TELL_CROSS_UPDATE_YUENANVIP = 210;//子服通知中央服更新越南超级会员状态
	
	/* 后台邮件 */
	public static final int SEND_PERSONAL_MAIL = 215;// 中央服通知子服发个人邮件
	public static final int SEND_ZONE_MAIL = 216;// 中央服通知子服发区服邮件
	/* 后台白名单 */
	public static final int SET_WHITE_LIST = 217;// 中央服通知子服白名单操作
	public static final int CHECK_WHITE_LIST = 218;// 中央服通知子服发区服白名单操作
	/* 后台封号禁言 */
	public static final int FORBIDDEN = 219;// 中央服通知子服封号禁言
	/* 后台踢玩家下线 */
	public static final int KICKOUTHERO = 220;// 中央服通知子服踢玩家下线
	/* 后台获取玩家信息 */
	public static final int GET_HERO_INFO = 221;// 中央服通知子服获取玩家数据
	/* 服务器维护设置 */
	public static final int SERVER_MAINTAIN = 222;// 中央服通知子服,服务器维护设置
	/* 手动开服 */
	public static final int MANUAL_OPEN_SERVER = 223;// 中央服通知子服,开启服务器
	/* 自动开服开服 */
	public static final int AUTO_OPEN_SERVER = 224;// 中央服通知子服, 获取服务器玩家数量
	/* 激活码 */
	public static final int GETCDKEYAWARD = 225;// 子服通知中央服验证激活码
	/**请求充值*/
	public static final int RECHARGE=226;//中央服通知子服充值
	/* 加载礼包激活码 */
	public static final int LOAD_CDKEY = 227;// 加载礼包激活码
	/* 后台充值白名单 */
	public static final int SET_RECHARGE_WHITE_LIST = 228;// 充值白名单
	/* bsh指令(测试服到后台中央服) */
	public static final int SYNC_BSH = 229;// bsh指令(测试服到后台中央服)
	/* bsh指令 (后台中央服通过到子服) */
	public static final int HANDLE_BSH = 230;// bsh指令(后台中央服通过到子服)
	/* 获取玩家背包道具 */
	public static final int GETBAG = 231;// 中央服通知子服获取玩家背包道具
	/* 删除背包道具 */
	public static final int DELBAG = 232;// 中央服通知子服删除背包道具
	/* 充值入口开关 */
	public static final int RECHARGESWITCH = 233;// 中央服通知子服充值入口开关操作
	/* 广告号标记 */
	public static final int ADMARK = 234;// 中央服通知子服广告号标记
	/* 系统循环公告 */
	public static final int SYSLOOPNOTICE = 235;// 中央服通知子服系统循环公告
	/* 福利大厅公告 */
	public static final int WELFARE_NOTICE = 236;// 中央服通知子服
	/** 屏蔽词（屏蔽字）*/
	public static final int BLOCK_WORD = 237;
	/** 检测广告号状态*/
	public static final int CHECK_ADMARK = 238;// 子服请求中央服
	/** 同步最新配置到后台 */
	public static final int REFLASH_IP_PORT_GET = 250;
	/** 同步最新配置到后台 */
	public static final int REFLASH_IP_PORT = 251;
	/**后台中央服通知:ios充值开启关卡数**/
	public static final int CTL_IOS_RECHARGE=252;
	/** 后台修改玩家关卡数 */
	public static final int SET_HERO_GUANKA= 253;
	/* 游戏排行榜数据 */
	public static final int RANKING_INFO = 254;
	/* 充值白名单一键开关 */
	public static final int RECHARGE_WHITE_LIST_SWITCH = 255;
	/* 跨服活动开关 */
	public static final int CROSS_ACT_SWITCH = 256;
	/* 活动开关 */
	public static final int ACT_SWITCH = 257;
	/* 跨服活动开关(玩法中央服) */
	public static final int CROSS_ACT_SWITCH_CENTRAL = 258;
	/* 获取跨服分组中央服信息 */
	public static final int GET_KUAFUFENZU_CENTRAL_INFO = 259;
	/* 更新游戏服跨服分组中央服信息 */
	public static final int UPDATE_KUAFUFENZU_CENTRAL_INFO = 260;// (后台中央->子服)
	
	/**后台中央服通知:微端分享开关**/
	public static final int CTL_WX_SHOW=261;
	/**应用宝申请礼包*/
	public static final int GIFTGET=262;
	/**应用宝来取玩家数据*/
	public static final int GIFT_GETHERO=263;
	/** 后台中央服通知:自定义修改名字开关 **/
	public static final int MODIFYNAME_SWITCH = 264;
	/** 开关 **/
	public static final int SWITCH_CONN = 265;
	/** 专属活动 开关*/
	public static final int EXCLUSIVE_ACT_SWITCH = 266;
	/**按时间获取总充值额度**/ 
	public static final int GET_RECHARGENUM=267;
	/** 更新专属活动数据 */
	public static final int EXCLUSIVE_ACT_SET = 268;
	/** IP注册数量开关 */
	public static final int IPWHITELIST_SET = 269;
	/** IP注册数量检测 */
	public static final int IPWHITELIST_CHECK = 270;
	/** 功能玩法开关 */
	public static final int GAME_SYSTEM_SWITCH = 271;
	/** 功能玩法开关 同步 */
	public static final int GAME_SYSTEM_SWITCH_CONN = 272;
	
	//防沉迷
	public static final int ANTI_GS_SYNC = 301;//连接中央服同步状态
	public static final int ANTI_SG_GMOPERATE = 302;//GM子服操作
	public static final int ANTI_GS_NOTICE = 303;//中央服通知子服状态
	public static final int TRUENAME_ANTI_SWITCH = 306;// (后台中央->子服)
	public static final int TRUENAME_ANTI_SYN = 307;// (后台中央->子服)
	public static final int ANTI_GET_ONLINE_TIME = 308;// (子服->子后台中央)
	public static final int ANTI_LOGOUT = 309;// (子服->子后台中央)
	
	//枭雄争霸 401-500
	public static final int CROSSSK_GS_SYNCALLDATA = 401;// 连接成功中央服同步信息(中央服->子服)
	public static final int CROSSSK_GS_NOTICE = 402;// 中央服广播子服状态(中央服->子服)
	public static final int CROSSSK_GS_CHANGENODE=403;// 中央服通知子服变化的战斗节点(中央服->子服)
	public static final int CROSSSK_GS_SYNSTRENGTH = 404;// 中央服通知子服上传本地玩家数据(中央服->子服)
	public static final int CROSSSK_SG_SYNSTRENGTH = 405;// 子服上传本地玩家数据(子服->中央服)
	public static final int CROSSSK_GS_UPDATEALLJOINER=406;//中央服通知子服(中央服通知子服玩家信息修改)
	public static final int CROSSSK_SG_GM = 407;// 子服GM控制中央服
	//阵营战
	public static final int CROSS_FACTIONBATTLE_STATE = 501;//通知子服活动状态
	public static final int CROSS_FACTIONBATTLE_GM = 502;//GM开关
	public static final int CROSS_FACTIONBATTLE_BROADCAST = 503;//广播

	// 单刀赴会
	public static final int SOLORUN_SG_MATCH = 601;// 子服上传匹配数据到中央服触发匹配
	public static final int SOLORUN_SG_UPDATE_GRADE = 602;// 更新段位数据 (子服->中央服)
	public static final int SOLORUN_SG_GET_RANKLIST = 603;// 获取跨服排行数据 (子服->中央服)
	public static final int SOLORUN_GS_SEND_RANKLIST = 604;// 中央服推送跨服排行数据 (中央服->子服)
	// 三国无双
	public static final int DYNASTYWARRIORS_SG_GETPONDAWARD = 611;// 请求抽取奖池奖励(子服->中央服)
	public static final int DYNASTYWARRIORS_GS_UPDATEPOND = 612;// 同步奖池数据(中央服->子服)
	public static final int DYNASTYWARRIORS_GS_UPDATEMATCH = 613;// 同步新一轮比赛数据(中央服->子服)
	public static final int DYNASTYWARRIORS_GS_UPDATESTATE = 614;// 活动状态更新(中央服->子服)
	public static final int DYNASTYWARRIORS_SG_UPDATEHERO = 615;// 参赛玩家数据更新(子服->中央服)
	public static final int DYNASTYWARRIORS_SG_GM = 616;// 三国无双GM(子服->中央服)
	public static final int DYNASTYWARRIORS_GS_UPDATEHERODATA = 617;// 三国无双同步参数玩家属性数据(中央服->子服)
	//最强王者（乱世枭雄）
	public static final int KING_GS_SYNCINFO=650;//中央服推送跨服最强王者活动信息（中央服->子服）
	public static final int KING_SG_GETINFO = 651;//子服向中央服获取数据(子服->中央服)
	public static final int KING_GS_NOTICE=652;//中央服推送跨服最强王者活动状态（中央服->子服）
	public static final int KING_SG_CHECKCHALLENGE=653;//子服向中央服检测挑战(子服->中央服)
	public static final int KING_GS_LOADRANKDATA = 654;//向子服申请对手战斗数据(中央服->子服)
	public static final int KING_SG_BATTLEREST=655;//子服向中央服发挑战结果(子服->中央服)
	public static final int KING_GS_UPDATEBEBATTLE=656;//通知子服被挑战这日志情况(中央服->子服)
	public static final int KING_SG_GETJINJIDATA=567;//子服向中央服获取竞技对手信息(子服->中央服)
	public static final int KING_SG_GETRANKLIST=568;//子服向中央服获取排行数据(子服->中央服)
	public static final int KING_GS_SENDDWAWARD=569;//中央服向子服发送最高段位奖励(中央服->子服)
	public static final int KING_SG_GM=570;//子服向中央服GM（子服->中央服）
	public static final int KING_SG_GMCHARGE=572;//子服向中央服GM换位置（子服->中央服）
	public static final int CROSSSK_SG_ADDNPC=571;//子服GM 批量增加npc
	// 群英榜
	public static final int HEROESLIST_SG_UPDATESCORE = 620;// 更新积分数据(子服->中央服)
	public static final int HEROESLIST_SG_UPDATERANK = 621;// 请求更新排行榜(子服->中央服)
	public static final int HEROESLIST_GS_UPDATERANK = 622;// 更新排行榜(中央服->子服)
	//工具相关
	public static final int GET_ALL_VERSION_CS = 701;//通知拉全服版本号
	public static final int GET_ALL_VERSION_LC = 705;//通知后台拉全服版本号
	public static final int GET_ONE_VERSION_CL = 706;//后台拉1个服的版本号
	public static final int SEND_ONE_VERSION_CL = 708;//后台发1个服的版本号给9999
	public static final int GET_CROSS_VERSION_LC = 709;//拉中央服版本号
	public static final int GROOVY_BY_ZID_CS= 711;//脚本指定区ClientToServer
	public static final int GROOVY_BY_ZID_CHECK_CS= 713;//脚本指定区检查
	public static final int GROOVY_CONVENEINT_BY_ZID_CS= 715;//脚本便捷式指定区ClientToServer
	public static final int GROOVY_CONVENEINT_BY_ZID_CHECK_CS= 717;//脚本便捷式指定区检查
	public static final int LOG_EXCEPTION_LC= 721;//通知中央服，准备广播，拉统计日志中exception的数据
	public static final int LOG_EXCEPTION_TO_LOCAL_CL= 722;//请求子服拉数据
	public static final int LOG_EXCEPTION_RESULT_TO_9999_CL= 724;//返回结果给内测服
	public static final int LOG_EXCEPTION_CS= 725;//通知server,统计数量
	public static final int LOG_EXCEPTION_RESULT_CS= 727;//通知server，拉统计日志中exception的数据
	
	// 烽火狼烟
	public static final int FIREBEACON_SG_ENTER = 800;// 请求进入活动(子服->中央服)
	public static final int FIREBEACON_GS_LEAVE = 801;// 退出活动(中央服->子服)
	public static final int FIREBEACON_SG_GET_SCORE = 802;// 获取积分(子服->中央服)
	public static final int FIREBEACON_SG_APPLY = 803;// 报名参赛(子服->中央服)
	public static final int FIREBEACON_GS_SENDAWARD = 804;// (中央服->子服)
	public static final int FIREBEACON_GS_BOARD = 805;// (中央服->子服)
	public static final int FIREBEACON_SG_SCOREAWARD_UPDATE = 806;// (子服->中央服)
	public static final int FIREBEACON_GS_LEVY_AWARD = 807;// (中央服->子服)
	public static final int FIREBEACON_GS_OCCUPY_AWARD = 808;// (中央服->子服)
	// 圣兽降临-圣兽寻宝
	public static final int SAINT_MONSTER_TREASURE_RANK_UPDATE = 900;// (子服->中央服)
	public static final int SAINT_MONSTER_TREASURE_RANK_ASKUPDATE = 901;// (子服->中央服)
	public static final int SAINT_MONSTER_TREASURE_RANK_SENDREWARD = 902;// (中央服->子服)
	//跨服组队副本
	public static final int CROSS_TEAM_FUBEN_VOICE_CL= 1000;//广播所有玩家组队副本有人建队伍了
	public static final int CROSS_TEAM_FUBEN_SAVE_BATTLE_TIMES_CL= 1002;//同步奖励次数
	public static final int CROSS_TEAM_FUBEN_CHACK_TEAM_LC= 1003;//检查队伍是否存在
	public static final int CROSS_TEAM_FUBEN_REFLASH_NUM_LC= 1005;//刷新调整次数
	public static final int CROSS_TEAM_FUBEN_REFLASH_BATTLE_LC= 1006;//获取数据
	public static final int CROSS_TEAM_FUBEN_REFLASH_ADDTIMES_LC = 1007;// 刷新奖励获取次数
	//升阶秘境
	public static final int CROSS_S_J_MI_JING_VOICE_CL= 1050;//广播所有玩家，邀请玩家进秘境队伍
	public static final int CROSS_S_J_MI_JING_CHACK_TEAM_LC= 1053;//检查队伍是否存在
	public static final int CROSS_S_J_MI_JING_SAVE_DATA_CL= 1054;//同步玩家数据
	public static final int CROSS_S_J_MI_JING_REFLASH_BATTLE_LC= 1055;//获取数据
	public static final int CROSS_S_J_MI_JING_VOICE_RED_EQUIP_LC= 1056;//红色装备广播
	public static final int CROSS_S_J_MI_JING_SAVE_DATA_LC= 1058;//0点 子服 同步玩家数据到 中央服
	//玲珑阁跨服
	public static final int CROSSS_GS_BUY=1200;//玲珑阁子服抽奖上传
	public static final int CROSSS_SG_BUY=1201;//玲珑阁广播抽奖
	public static final int CROSSS_GS_GETALLBUYINFO=1202;//子服获取中央服获取玲珑阁日志以及排行

	
	//三国庆典-豪礼转盘跨服
	public static final int CROSS_CELEBRATION_HAO_LI_ZHUAN_PAN_RECORD_LC=1401;//上传广播内容
	public static final int CROSS_CELEBRATION_HAO_LI_ZHUAN_PAN_RECORD_CL=1402;//广播全服
	//问鼎天下
	public static final int CROSS_WEN_DING_TIAN_XIA_GET_TOP10_STR_CL=1502;//请求上传战力
	public static final int CROSS_WEN_DING_TIAN_XIA_BEGIN_CL=1504;//活动开始
	public static final int CROSS_WEN_DING_TIAN_XIA_SEND_RANK_AWARDS_CL=1506;//发放排行榜奖励
	public static final int CROSS_WEN_DING_TIAN_XIA_GM_GM_GM_LC=1507;//活动开关上传gm
	public static final int CROSS_WEN_DING_TIAN_XIA_SAVE_MVP_CL=1508;//保存MPV名字
	
	//神将送礼(活动)跨服
	public static final int CROSS_GODGENSENDGIFT_CONN_CL=1601;//子服联接中央服成功 中央服向子服发送排行
	public static final int CROSS_GODGENSENDGIFT_ADDUPDATERANK_LC=1602;//子服向中央服增加更新排行榜数据
	public static final int CROSS_GODGENSENDGIFT_ADDUPDATERANK_CL=1603;//中央服向子服增加更新排行榜数据
	public static final int CROSS_GODGENSENDGIFT_SENDMAILAWARD_CL=1605;//中央服向子服发送邮件奖励结算
	public static final int CROSS_GODGENSENDGIFT_SENDLASTRANKLIST_CL=1606;//中央服向子服发送上期排行数据
	public static final int CROSS_GODGENSENDGIFT_SENDRANKLIST_CL=1607;//中央服向子服发送排行数据
	public static final int CROSS_GODGENSENDGIFT_SYNC_NEWQSDATA_CL = 1608;// 中央服向玩家所在子服同步新一期玩家数据
	
	public static final int CROSS_ZCBOSS_CL=1651;//子服联接中央服成功 中央服向子服发送boss情况
	public static final int CROSS_ZCBOSS_SATE_CL=1653;//中央服向子服发送boss状态改变
	public static final int CROSS_ZCBOSS_QUIT=1655; ///中央服向子服发送玩家离开
	public static final int CROSS_ZCBOSS_NOTICE_KILLER=1657;//中央服告诉子服某人首杀
	public static final int CROSS_ZCBOSS_KILLER = 1658;// 中央服告诉子服BOSS被杀
	
	//奖励找回
	public static final int CROSS_REWARDBACK_CROSSUPDATE_CL=1700;//中央服发送更新奖励找回通知给子服
	// 万兽之王-仙山寻兽排行
	public static final int CROSS_MK_SEARCH_MONSTER_UPDATE_LC = 1701;// 子服通知中央服(个人)更新排行
	public static final int CROSS_MK_SEARCH_MONSTER_UPDATE_CL = 1702;// 中央服发送(个人)数据到子服
	public static final int CROSS_MK_SEARCH_MONSTER_NOTICE_LC = 1703;// 子服通知中央服活动开启
	public static final int CROSS_MK_SEARCH_MONSTER_NOTICE_CL = 1704;// 中央服通知子服活动开启
	public static final int CROSS_MK_SEARCH_MONSTER_CONN_CL = 1705;// 中央服连接通知子服活动信息
	public static final int CROSS_MK_SEARCH_MONSTER_ASK_LC = 1706;// 子服请求中央服获取最新排行数据
	public static final int CROSS_MK_SEARCH_MONSTER_SENDREWARD = 1707;// 中央服通知子服活动结束发放奖励
	public static final int CROSS_MK_SEARCH_MONSTER_GET_STATE = 1708;// 子服请求中央服获取活动状态
	
	//跨服矿藏
	public static final int CROSS_MINE_OPENUI_LC=1800; //子服打开ui
	public static final int CROSS_MINE_INVITATION_LC=1801; //子服广播邀请
	public static final int CROSS_MINE_INVITATION_CL= 1802;//广播所有玩家，邀请玩家进秘境队伍
	public static final int CROSS_MINE_JOIN_MINE_LC=1803; //加入挖矿
	public static final int CROSS_MINE_REFRESH_MINE_LC=1804; //刷新自己的矿藏
	public static final int CROSS_MINE_START_MINE_LC=1805; //开始开采矿藏
	public static final int CROSS_MINE_KICK_MINER_LC=1806; //踢出矿工
	public static final int CROSS_MINE_LEAVE_MINE_LC=1807; //离开挖矿
	public static final int CROSS_MINE_GOTO_MINE_LC=1808; //前往跨服矿区
	public static final int CROSS_MINE_SEARCH_MINE_LC=1809; //搜索矿藏
	public static final int CROSS_MINE_PUSH_MINE_CL=1810; //推送矿藏信息
	public static final int CROSS_MINE_GET_AWARD_LC=1811; //获取奖励
	public static final int CROSS_MINE_FightMine=1812;//抢夺
	public static final int CROSS_MINE_NoticeFightMine=1813;//通知战报
	public static final int CROSS_MINE_stealMine=1814;//顺手
	public static final int CROSS_MINE_NoticeStealMine=1815;//顺手战报
	public static final int CROSS_MINE_ChangeName=1816;//修改名字
	
	//八门金锁-鉴定排名
	public static final int CROSS_EIGHTDOOR_APPRAISERANK_CONNSENDRANK_CL=1900;//中央服链接事件触发,向子服发送排行数据,并发送首服的开服时间和结束时间
	public static final int CROSS_EIGHTDOOR_APPRAISERANK_ADDUPDATERANK_LC=1901;//子服向中央服增加更新排行榜数据
	public static final int CROSS_EIGHTDOOR_APPRAISERANK_ADDUPDATERANK_CL = 1902;// 中央服向各个子服同步排行
	public static final int CROSS_EIGHTDOOR_APPRAISERANK_SYNCTIME_CL=1903;//中央服同步开始结束时间给子服
	public static final int CROSS_EIGHTDOOR_APPRAISERANK_SENDMAILAWARD_CL=1904;//中央服向子服发送邮件奖励
	public static final int CROSS_EIGHTDOOR_APPRAISERANK_GM = 1905;// 子服GM控制中央服
	
	//少年英主-祈愿排名
	public static final int CROSS_SHAOZHU_QIYUANRANK_CONNSENDRANK_CL=2000;//中央服链接事件触发,向子服发送排行数据,并发送首服的开服时间和结束时间
	public static final int CROSS_SHAOZHU_QIYUANRANK_ADDUPDATERANK_LC=2001;//子服向中央服增加更新排行榜数据
	public static final int CROSS_SHAOZHU_QIYUANRANK_ADDUPDATERANK_CL = 2002;// 中央服向各个子服同步排行
	public static final int CROSS_SHAOZHU_QIYUANRANK_SYNCTIME_CL=2003;//中央服同步开始结束时间给子服
	public static final int CROSS_SHAOZHU_QIYUANRANK_SENDMAILAWARD_CL=2004;//中央服向子服发送邮件奖励
	public static final int CROSS_SHAOZHU_QIYUANRANK_ADDUPDATERANK_GM = 2005;// 子服GM控制中央服
	
	// 圣兽洗练
	public static final int SAINT_MONSTER_WASH_RANK_UPDATE = 2100;// (子服->中央服)
	public static final int SAINT_MONSTER_WASH_RANK_ASKUPDATE = 2101;// (子服->中央服)
	public static final int SAINT_MONSTER_WASH_RANK_SENDREWARD = 2102;// (中央服->子服)
	public static final int SAINT_MONSTER_WASH_RANK_UPDATE_CL = 2103;// (中央服->子服)
	public static final int SAINT_MONSTER_WASH_RANK_GM = 2104;// 子服GM控制中央服
	public static final int SAINT_MONSTER_WASH_RANK_SENDREWARD_CL = 2105;// (中央服->子服)
	
	//虎牢关-
	public static final int TIGER_JOIN_EMPLOY=2151;//(子服->中央服 上传报名雇佣兵)
	public static final int TIGER_BECHOOSE_REWARD=2152;//(中央服->子服 被雇佣者的奖励)
	public static final int TIGER_RESH_EMPLOYLIST=2153;//(子服->中央服 刷新雇佣兵列表)
	public static final int TIGER_CHOOSE_EMPLOY=2155;//(子服->中央服 雇佣玩家)
	//微信分享
	public static final int WEI_XIN_SHARE_FRIEND_LH=2200;//通知更新好友信息
	public static final int WEI_XIN_SHARE_FRIEND_HL=2201;//通知更新好友信息
	public static final int WEI_XIN_SHARE_MONEY_LH=2202;//通知好友充值
	public static final int WEI_XIN_SHARE_MONEY_HL=2203;//通知好友充值
	
	// 充值排行
	public static final int CROSS_RECHARGE_RANK_ACT_CONNSENDRANK_CL = 2300;// 中央服链接事件触发
	public static final int CROSS_RECHARGE_RANK_ACT_ADDUPDATERANK_LC = 2301;// 子服向中央服增加更新排行榜数据
	public static final int CROSS_RECHARGE_RANK_ACT_ADDUPDATERANK_CL = 2302;// 中央服向各个子服同步排行
	public static final int CROSS_RECHARGE_RANK_ACT_SENDMAILAWARD_CL = 2303;// 中央服向子服发送邮件奖励结算
	public static final int CROSS_RECHARGE_RANK_ACT_SYNC_NEWQSDATA_CL = 2304;// 中央服向玩家所在子服同步新一期玩家数据
	public static final int CROSS_RECHARGE_RANK_ACT_GM_LC = 2305;// 子服GM控制中央服
	public static final int CROSS_RECHARGE_RANK_ACT_GM_CL = 2306;// 中央服GM控制子服

	// 鉴定排名(活动)
	public static final int EIGHTDOOR_APPRAISERANK_ACT_CONNSENDRANK_CL = 2400;// 中央服链接事件触发
	public static final int EIGHTDOOR_APPRAISERANK_ACT_ADDUPDATERANK_LC = 2401;// 子服向中央服增加更新排行榜数据
	public static final int EIGHTDOOR_APPRAISERANK_ACT_ADDUPDATERANK_CL = 2402;// 中央服向各个子服同步排行
	public static final int EIGHTDOOR_APPRAISERANK_ACT_SENDMAILAWARD_CL = 2403;// 中央服向子服发送邮件奖励结算
	public static final int EIGHTDOOR_APPRAISERANK_ACT_SYNC_NEWQSDATA_CL = 2404;// 中央服向玩家所在子服同步新一期玩家数据
	public static final int EIGHTDOOR_APPRAISERANK_ACT_GM_LC = 2405;// 子服GM控制中央服
	public static final int EIGHTDOOR_APPRAISERANK_ACT_GM_CL = 2406;// 中央服GM控制子服

	// 祈愿排名(活动)
	public static final int SHAOZHU_QIYUANRANK_ACT_CONNSENDRANK_CL = 2500;// 中央服链接事件触发
	public static final int SHAOZHU_QIYUANRANK_ACT_ADDUPDATERANK_LC = 2501;// 子服向中央服增加更新排行榜数据
	public static final int SHAOZHU_QIYUANRANK_ACT_ADDUPDATERANK_CL = 2502;// 中央服向各个子服同步排行
	public static final int SHAOZHU_QIYUANRANK_ACT_SENDMAILAWARD_CL = 2503;// 中央服向子服发送邮件奖励结算
	public static final int SHAOZHU_QIYUANRANK_ACT_SYNC_NEWQSDATA_CL = 2504;// 中央服向玩家所在子服同步新一期玩家数据
	public static final int SHAOZHU_QIYUANRANK_ACT_GM_LC = 2505;// 子服GM控制中央服
	public static final int SHAOZHU_QIYUANRANK_ACT_GM_CL = 2506;// 中央服GM控制子服
	
	// 群雄逐鹿
	public static final int CROSS_ZHU_LU_ENTER_MAP_LC = 2600;// 进入地图
	public static final int CROSS_ZHU_LU_MOVE_LC = 2601;// 移动
	public static final int CROSS_ZHU_LU_SHOW_CITY_INFO_LC = 2602;// 查看城池信息
	public static final int CROSS_ZHU_LU_ATTACK_LC = 2603;// 攻击
	public static final int CROSS_ZHU_LU_OPEN_RANK_UI_LC = 2604;// 打开排名
	public static final int CROSS_ZHU_LU_OPEN_RECORD_LC = 2605;// 查看战况
	public static final int CROSS_ZHU_LU_OPEN_COUNTRY_RANK_UI_LC = 2606;// 打开个人排名
	public static final int CROSS_ZHU_LU_BUY_STA_LC = 2607;// 购买体力
	public static final int CROSS_ZHU_LU_GET_DEFEND_AWARD_INFO_LC = 2608;// 查看驻守奖励
	public static final int CROSS_ZHU_LU_GOT_DEFEND_AWARD_LC = 2609;// 获取驻守奖励
	public static final int CROSS_ZHU_LU_BATTLE_RESULT_LC = 2610;// 攻击结果
	public static final int CROSS_ZHU_LU_HONG_DIAN_LC = 2611;// 红点状态
	public static final int CROSS_ZHU_LU_BROAD_CAST_CL = 2612;// 广播
	public static final int CROSS_ZHU_LU_ADD_TI_LI_LC = 2613;// 增加体力
	public static final int CROSS_ZHU_LU_NOTICE_LAST_MVP_NAME_LC = 2614;// 通知上期mvp名字
	public static final int CROSS_ZHU_LU_NOTICE_MOVE_LC = 2615;// 通知驻守方移动了
	public static final int CROSS_ZHU_LU_NOTICE_MAIL_LC = 2616;// 通知发放邮件

	// 跨服通用排行
	public static final int CROSS_COMMONRANK_CONNSENDRANK_CL = 2700;// 中央服链接事件触发
	public static final int CROSS_COMMONRANK_ADDUPDATERANK_LC = 2701;// 子服向中央服增加更新排行榜数据
	public static final int CROSS_COMMONRANK_ADDUPDATERANK_CL = 2702;// 中央服向各个子服同步排行
	public static final int CROSS_COMMONRANK_SENDMAILAWARD_CL = 2703;// 中央服向子服发送邮件奖励结算
	public static final int CROSS_COMMONRANK_SYNC_NEWQSDATA_CL = 2704;// 中央服向玩家所在子服同步新一期玩家数据
	public static final int CROSS_COMMONRANK_GM_LC = 2705;// 子服GM控制中央服
	public static final int CROSS_COMMONRANK_GM_CL = 2706;// 中央服GM控制子服

	// 跨服试炼
	public static final int CROSS_TRIAL_GET_ENEMY = 2801;// 获取对手数据(子服->中央服)
	public static final int CROSS_TRIAL_NEXT_ENEMY = 2802;// 获取下一场对手数据(子服->中央服)
	public static final int CROSS_TRIAL_UPLOAD_RANK = 2803;// 上传数据(子服->中央服)
	public static final int CROSS_TRIAL_ASK_UPLOAD = 2804;// 上传数据(中央服->子服)
	public static final int CROSS_TRIAL_CLEAR = 2805;// gm清除数据(子服->中央服)
	
	// 擂台比武
	public static final int CROSS_ARENA_FIGHT_START = 2851;// 活动战斗开始(中央服->子服)
	public static final int CROSS_ARENA_FIGHT_END = 2852;// 活动战斗结束(中央服->子服)
	public static final int CROSS_ARENA_FIGHT_NPC_REWARD = 2853;// npc奖励(中央服->子服)
	public static final int CROSS_ARENA_FIGHT_REWARD = 2854;// 活动战斗结束结算发奖(中央服->子服)
	public static final int CROSS_ARENA_ACT_OPEN = 2855;// 活动时间期数上传(子服->中央服)
	public static final int CROSS_ARENA_FIGHT_WIN_BOARD = 2856;// 比武胜利广播(中央服->子服)
	public static final int CROSS_ARENA_ASK_OPEN_STATE = 2857;// 请求活动状态(中央服->子服)
	public static final int CROSS_ARENA_LOSE_TIPS = 2858;// 水电费(中央服->子服)

	//粮草抢夺
	public static final int BATTLEGOOD_SG_APPLY = 2901;// 报名参赛(子服->中央服)
	public static final int BATTLEGOOD_GS_STATE = 2902;// 粮草抢夺通知状态(中央服->子服)
	public static final int BATTLEGOOD_SG_GM = 2903;// gm开关活动(子服->中央服)
	public static final int BATTLEGOOD_GS_OUT = 2904;// 中途离开粮草抢夺(中央服->子服)
	public static final int BATTLEGOOD_GS_MVP=2906;//通知子服MVP粮草抢夺(中央服->子服)
	public static final int BATTLEGOOD_GS_KillBossBroad=2908;//通知子服广播 boss被杀(中央服->子服)
	public static final int BATTLEGOOD_GS_BroadById=2910;//通知子服广播 93刷粮草 94胜利(中央服->子服)
	
	//跨服王者
	public static final int CROSS_TEAMKING_YAOQING=2950;// 队长邀请(中央服->子服)
	public static final int CROSS_TEAMKING_RequestTeam=2951;//请求加入队伍(子服->中央服)
	public static final int CROSS_TEAMKING_UpDateTeamHid=2952;//更新子服玩家队伍id(中央服->子服)
	public static final int CROSS_TEAMKING_UpDateLocalModel=2953;//更新子服 玩家的model(中央服->子服)
	public static final int CROSS_TEAMKING_RANK=2954;//同步排行榜（中央服-->子服）
	public static final int CROSS_TEAMKING_STATE=2956;//同步活动状态（中央服-->子服）
	public static final int CROSS_TEAMKING_UpdateleftNum=2957;//同步玩家剩余挑战次数（子服-->中央服）
	
	

	// 镇守四方
	public static final int CROSS_GUARD_AREA_OPEN_UI = 3001;// 获取城池数据(子服->中央服)
	public static final int CROSS_GUARD_AREA_DISPATCH = 3002;// 派遣武将(子服->中央服)
	public static final int CROSS_GUARD_AREA_GET_AWARD = 3003;// 领取奖励(子服->中央服)
	public static final int CROSS_GUARD_AREA_RECALL = 3004;// 召回(子服->中央服)
	public static final int CROSS_GUARD_AREA_OPEN_PLUNDER_UI = 3005;// 打开掠夺界面(子服->中央服)
	public static final int CROSS_GUARD_AREA_PLUNDER = 3006;// 掠夺(子服->中央服)
	public static final int CROSS_GUARD_AREA_REFRESH = 3007;// 刷新掠夺界面(子服->中央服)
	public static final int CROSS_GUARD_AREA_BATTLE_RESULT = 3008;// 战斗结果返回(子服->中央服)
	public static final int CROSS_GUARD_AREA_ZHAN_BAO = 3009;// 战报返回(中央服->子服)
	
	//宴会
	public static final int LOCAL2CROSS_CROSSOPENLISTUI = 3100;//获取宴会列表(子服->中央服)
	public static final int LOCAL2CROSS_CROSSREDPOINT = 3101;//宴会登录红点(子服->中央服)
	public static final int CROSS2LOCAL_LOCALYAOQING = 3102;//宴会邀请(中央服->子服)
	public static final int CROSS2LOCAL_LOCALMAILREWARD = 3103;//宴会结束补发奖励邮件(中央服->子服)
	public static final int LOCAL2CROSS_CROSSJUBAN = 3104;//举办宴会(子服->中央服)
	public static final int LOCAL2CROSS_CROSSFUYAN = 3105;//赴宴(子服->中央服)
	public static final int CROSS2LOCAL_LOCALJINGJIU = 3106;//敬酒、申请提示红点(中央服->子服)
	public static final int CROSS2LOCAL_LOCALFUYANREWARD = 3107;//赴宴主人获得奖励邮件(中央服->子服)
	public static final int LOCAL2CROSS_CROSSSHENQING = 3108;//申请加入宴会(子服->中央服)
	
	//登峰造极
	public static final int LOCAL2CROSS_UPDATA = 3200;//上传登峰造极数据(子服->中央服)
	public static final int LOCAL2CROSS_OPENUI = 3201;//获取登峰造极数据(子服->中央服)
	public static final int LOCAL2CROSS_REPLACE = 3202;//获取换一批数据(子服->中央服)
	public static final int LOCAL2CROSS_RANKREWARD = 3203;//获取排行奖励数据(子服->中央服)
	public static final int LOCAL2CROSS_GETPREDICTDATA = 3204;//获取冠军下注数据(子服->中央服)
	public static final int LOCAL2CROSS_UPSCORE = 3205;//上传积分数据(子服->中央服)
	public static final int CROSS2LOCAL_ASKUPDATA = 3206;//通知子服上传数据(中央服->子服)
	public static final int LOCAL2CROSS_MYRANK = 3207;//获取我的排名(子服->中央服)
	public static final int LOCAL2CROSS_NOTICE = 3208;//通知(子服->中央服)
	public static final int CROSS2LOCAL_SEND_BET_AWARDS = 3209;//周日22点通知子服发下注奖励(中央服->子服)
	public static final int CROSS2LOCAL_SEND_RANK_AWARDS = 3210;//周日24点通知子服发排行奖励(中央服->子服)
	public static final int LOCAL2CROSS_FIRST_RANK = 3211;//决赛第一名玩家(子服->中央服)
		
	// 府邸系统
	public static final int CROSS_HOUSE_UPDATE_FIGHT = 4001;// 更新属性数据(中央服->子服)
	public static final int CROSS_HOUSE_UP_DC = 4002;// 府邸升级档次广播(中央服->子服)
	public static final int CROSS_HOUSE_DAILY_NOTIC = 4003;// 府邸通知每日刷新(子服->中央服)
	
	// 轮回副本
	public static final int CROSS_REBORN_FB_YAOQING = 4501;// 发送邀请信息(中央服->子服)
	public static final int CROSS_REBORN_FB_END = 4502;// 结束战斗同步(中央服->子服)
	public static final int CROSS_REBORN_FB_ZERO = 4503;// 0点上传刷新次数(子服->中央服)

	// 新活动-天降红包
	public static final int CROSS_DROPREDPACKET_CON_CL = 5001;// 中央服链接事件触发
	public static final int CROSS_DROPREDPACKET_SEND_LC = 5002;// 子服向中央服发送红包
	public static final int CROSS_DROPREDPACKET_SEND_CL = 5003;// 中央服向各个子服同步红包数据
	public static final int CROSS_DROPREDPACKET_GET_LC = 5004;// 子服向中央服领取红包
	public static final int CROSS_DROPREDPACKET_GET_CL = 5005;// 中央服向子服领取红包
//	public static final int CROSS_DROPREDPACKET_START_LC = 5006;// 活动开启子服向中央服发送期数
	public static final int CROSS_DROPREDPACKET_GM_LC = 5007;// 子服GM控制中央服
	public static final int CROSS_DROPREDPACKET_GM_CL = 5008;// 中央服GM控制子服
	
	public static final int YUANXIAO_INIT_LC=6001;//子服向中央服 初始化做元宵参与数据
	//public static final int YUANXIAO_INIT_CL=6002;//中央服接到子服 做元宵的参与数据
	public static final int YUANXIAO_GETLIST_LC=6002;//子服向中央服 获取做元宵掠取数据
	public static final int YUANXIAO_GETMYINFO_LC=6003;//子服向中央服获取 元宵材料数据
	public static final int YUANXIAO_BATTLE_LC=6004;//子服向中央服 抢夺元宵材料数据
	public static final int YUANXIAO_CAILIAO_CL=6005;//中央服向子服 更新材料数据
	public static final int YUANXIAO_RESH_LC=6006;//子服请求刷新 抢夺列表
	public static final int YUANXIAO_USECAILIAO_LC=6007;//子服请求使用材料
	public static final int YUANXIAO_ADD_LC=6008;//子服请求添加材料
	
	
	public static final int REDBOXACT_FA_LC=6051;//发送红包
	public static final int REDBOX_CHANGE=6052;//红包变化更新
	public static final int REDBOX_GETBOX=6053;//抢夺红包
	public static final int REDBOX_ALLMAP=6054;//红包集合	

	// 攻城拔塞
	public static final int CROSS_ATTACK_CITY_OPEN_UI = 6101;// 获取城池数据(子服->中央服)
	public static final int CROSS_ATTACK_CITY_DISPATCH = 6102;// 派遣(子服->中央服)
	public static final int CROSS_ATTACK_CITY_GET_AWARD = 6103;// 领取奖励(子服->中央服)
	public static final int CROSS_ATTACK_CITY_PLUNDER = 6104;// 掠夺(子服->中央服)
	public static final int CROSS_ATTACK_CITY_BATTLE_RESULT = 6105;// 战斗结果返回(子服->中央服)
	public static final int CROSS_ATTACK_CITY_ZHAN_BAO = 6106;// 战报返回(中央服->子服)
	public static final int CROSS_ATTACK_CITY_REMOVE = 6107;// 清空城池(中央服->子服)
	public static final int CROSS_ATTACK_CITY_REPLACE = 6108;// 更新物资(子服->中央服)
	public static final int CROSS_ATTACK_CITY_CHECK = 6109;// 查看物资(子服->中央服)
	//府邸任务目标
	public static final int CROSS_SUCCRSS_HOUSEGOAL=6200; //府邸任务/目标变化（中央服-》子服）
	// 刷新府邸家丁等级(用于家丁技能)
	public static final int CROSS_REPLACE_HOUSEKEEPER = 6201; // 更新中央服家丁等级（子服->中央服）
}
