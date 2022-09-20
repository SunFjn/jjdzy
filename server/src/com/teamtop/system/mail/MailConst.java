package com.teamtop.system.mail;

/**
 * 
 * @author Administrator
 *
 */
public class MailConst {
//	/**
//	 * 邮资：100两
//	 */
//	public static final int SEND_FEE = 100;
//	/**
//	 * 可附带的最大货币
//	 */
//	public static final int MONEY_LIMIT = 999999999;
//	/**
//	 * 保存收到的邮件的最大的天数
//	 */
//	public static final int RECEIVE_TIME_MAX = 15 * TimeDateUtil.ONE_DAY_INT;
//	/**
//	 * 保存发送的邮件的最大的天数
//	 */
//	public static final int SEND_TIME_MAX = 30 * TimeDateUtil.ONE_DAY_INT;
	/**
	 * 邮件状态 0 未读
	 */
	public static final int MAIL_NOT_READ = 0;
	/**
	 * 邮件状态 1 已读
	 */
	public static final int MAIL_READ = 1;
	/**
	 * 没有附件
	 */
	public static final int ADJ_STATE_0 = 0;
	/**
	 * 有附件
	 */
	public static final int ADJ_STATE_1 = 1;
	/**
	 * 附件已领
	 */
	public static final int ADJ_STATE_2 = 2;
	
	/********邮件id统一放下面*******/
	
	/**
	 * 后台物品申请的邮件id
	 */
	public static final int MAIL_HOUTAI_ID = 2025;
	/**
	 * 后台全服邮件的邮件id
	 */
	public static final int MAIL_ID_MAIL = 2026;
	
	/**	 * 后台全服邮件的邮件id	 */
	public static final int MAIL_ADJ_MAX_NUM = 2027;
	/**
	 * 后台客服邮件反馈
	 */
	public static final int MAIL_KEFU_MAIL = 2044;
	
	
	/**********************Config_youjianbiao_203表邮件ID********************************/
	/**系统邮件，背包满*/
	public static final int MAIL_ID_SYSTEM = 1;
	/**异宝**/
	public static final int MAIL_ID_YIBAO = 2;
	/** 活跃宝箱 **/
	public static final int MAIL_ID_ACTIVECHEST = 3;
	/** 获得称号 **/
	public static final int MAIL_ID_TITLE_ADD = 4;
	/** 失去称号 */
	public static final int MAIL_ID_TITLE_REMOVE = 5;
	/** 单刀赴会晋级奖励 */
	public static final int MAIL_ID_SOLORUN_GRADE_AWARD = 7;
	/** 单刀赴会本服排名奖励 */
	public static final int MAIL_ID_SOLORUN_LOCAL_RANK = 8;
	/** 单刀赴会跨服排名奖励 */
	public static final int MAIL_ID_SOLORUN_CROSS_RANK = 9;
	/** 单刀赴会每日奖励补发 */
	public static final int MAIL_ID_SOLORUN_DAILY_AWARD = 10;
	/** 南征北战个人排行奖励邮件id */
	public static final int MAIL_ID_FNS_PERSONAL = 11;
	/** 南征北战国家排行奖励邮件id */
	public static final int MAIL_ID_FNS_COUNTRY = 12;
	/**魔神最后一击奖励*/
	public static final int MAIL_ID_MONSTER=13;
	/**魔神吕布排名奖励*/
	public static final int MAIL_ID_MONSTER_RANK=14;
	/**被膜拜奖励*/
	public static final int MAIL_ID_BEMOBAI_AWARD=15;
	/** 三国无双竞猜成功奖励 */
	public static final int MAIL_ID_DW_BET_WIN = 16;
	/** 三国无双竞猜失败奖励 */
	public static final int MAIL_ID_DW_BET_LOSE = 17;
	/**七擒孟获得参与奖励**/
	public static final int MAIL_ID_CROSSBOSS_JOIN=18;
	/**七擒孟获个人排名奖励**/
	public static final int MAIL_ID_CROSSBOSS_HERO=19;
	/**七擒孟获国家排名奖励**/
	public static final int MAIL_ID_CROSSBOSS_COUNTRY=20;
	/**七擒孟获最后一击奖励**/
	public static final int MAIL_ID_CROSSBOSS_KILL=21;
	/**七擒孟获伤害达标奖励**/
	public static final int MAIL_ID_CROSSBOSS_HURTNUM=22;
	/** 三国无双排行奖励 */
	public static final int MAIL_ID_DW_RANKING_REWARD = 23;
	/**乱世枭雄段位奖励**/
	public static final int MAIL_ID_CROSSKING_DW=24;
	/**乱世枭雄晋级奖励**/
	public static final int MAIL_ID_CROSSKING_JINGJI=25;
	/**每日首充奖励**/
	public static final int MAIL_ID_DAILYFIRSTRECHARGE_AWARD=26;
	/**枭雄争霸排名奖励**/
	public static final int CROSSK_RANK=27;
	/**买赢了**/
	public static final int CROSSSK_BUY_WIN=28;
	/**买输了**/
	public static final int CROSSSK_BUY_FINAL=29;
	/** 群英榜排名奖励 */
	public static final int MAIL_ID_HEROESLIST_RANK = 30;
	/** 补发群英榜积分奖励 */
	public static final int MAIL_ID_HEROESLIST_SCORE = 31;
	/**七日武圣榜**/
	public static final int SEVENWUSHENRANK=32;
	/**开服狂欢**/
	public static final int SEVENHAPPY=33;
	/** 登录豪礼 **/
	public static final int LOGINLUXURYGIFTS = 34;
	/**隆中对排名奖励**/
	public static final int LONGZHONGDUI_RANKAWARD=35;
	/**玲珑阁排名奖励**/
	public static final int LINGLONGGE_RANKAWARD=36;
	/**全民狂欢**/
	public static final int QUANMINGHAPPY=37;
	/** 补发材料返利奖励 **/
	public static final int OVERCALLBACKCL = 38;
	/** 补发元宝返利奖励 **/
	public static final int OVERCALLBACKYB = 39;
	/**累计充值**/
	public static final int TOTALRECAHARE=40;
	/**单日充值**/
	public static final int ONEDAYRECAHARE=41;
	/** 三国战神排行奖励 */
	public static final int MAIL_ID_GODOFWARD = 42;
	/**官衔俸禄**/
	public static final int MAIL_ID_OFFICE=43;
	/**首充奖励**/
	public static final int MAIL_ID_FIRSTRECHARGE_AWARD=44;
	/**签到宝箱奖励**/
	public static final int SIGNIN_BXAWARD=45;
	/** 吕布降临排名奖励 */
	public static final int MAIL_ID_LVBURISING = 46;
	/**玲珑阁积分宝箱奖励补发**/
	public static final int LINGLONGGE_BXAWARD=47;
	/**连续累充奖励**/
	public static final int AWAYRECHARGE_REWARD=48;
	/** 吕布降临目标奖励 */
	public static final int LVBURISING_TARGET_AWARD = 49;
	/** 单笔充值奖励 */
	public static final int ONERECHARGE_AWARD = 50;
	/** 超值返利奖励 */
	public static final int OVERCALLBACK_AWARD = 51;
	/**合服补发更名卡,更名卡道具ID**/
	public static final int MAIL_HEFU_HERO_NAME_TOOLID = 410024;
	/**合服补发更名卡邮件ID**/
	public static final int MAIL_HEFU_HERO_NAME = 52;
	/**合服补偿邮件ID**/
	public static final int MAIL_HEFU_AWARDS = 53;
	/**7日首冲团购**/
	public static final int MAIL_FRISTGROUP_AWARDS = 54;
	/**补发连续消费奖励**/
	public static final int MAIL_SEVEN_CONTINUCOUS_CONSUME_AWARDS = 55;
	/**补发每日直购奖励**/
	public static final int MAIL_DAILYDIRECTBUY_AWARD = 60;
	/**玲珑阁区服排名奖励**/
	public static final int LINGLONGGE_RANKAWARD_ZONEID=61;
	/**王位争夺俸禄补发**/
	public static final int MAIL_KINGSHIP_BXAWARD = 62;
	/**国家boss个人排名奖励**/
	public static final int COUNTRY_PERSON_AWARD = 63;
	/**国家boss国家排名奖励**/
	public static final int COUNTRY_AWARD = 64;
	/**国家boss击杀奖励**/
	public static final int COUNTRYBOSSKILL_AWARD = 65;
	/**三国庆典-基金**/
	public static final int MAIL_CELEBRATION_JI_JIN = 66;
	/**消费排行发放奖励**/
	public static final int MAIL_CONSUMERANK_AWARD = 67;
	/**返还元宝**/
	public static final int MAIL_FHYB_AWARD = 68;
	/**三国庆典-豪礼转盘**/
	public static final int MAIL_CELEBRATION_HAO_LI_ZHUAN_PAN = 69;
	/**七擒孟获活跃有礼额外奖励**/
	public static final int MAIL_ID_CROSSBOSS_EXT=70;
	/**问鼎天下-排名奖励	您在本期的问鼎天下中获得了第{0}名，奖励以邮件发送，请查收附件！**/
	public static final int MAIL_WDTX_RANK_AWARDS=71;
	/**问鼎天下-真龙天子	您在本期的问鼎天下中勇夺真龙天子桂冠，奖励以邮件发送，请查收附件！**/
	public static final int MAIL_WDTX_SUPER_AWARDS=72;
	/**问鼎天下-奖励补发	由于您未领取奖励，您获得的奖励以邮件发送，请查收附件！**/
	public static final int MAIL_WDTX_BU_FA_AWARDS=73;
	/** 三国庆典-豪礼转盘目标奖励邮件发放 **/
	public static final int MAIL_ID_CELEBRATION_HAO_LI_ZHUAN_PAN_TARGETAWARD = 74;
	/** 新服加群邮件 **/
	public static final int MAIL_ID_JOIN_QQ_QUN = 75;
	/** 周卡奖励补发 **/
	public static final int MAIL_ID_WEEKCARD_REWARD = 76;
	/**八门金锁**/
	public static final int MIAL_EIGHTDOOR=80;
	/** 符文有礼 **/
	public static final int MAIL_ID_RUNE_GIFT = 77;
	/** 符文收集 **/
	public static final int MAIL_ID_RUNE_CELLECT = 78;
	/** 符文鉴定 **/
	public static final int MAIL_ID_RUNE_APPRAISE = 79;
	/** 问鼎天下  积分奖励 **/
	public static final int MAIL_ID_WDTX_SCORE_AWARDS= 81;
	/**连续累冲-奖励补发**/
	public static final int NEW_AWAYRECHARGE_DAY=82;
	/**连续累冲-大奖补发**/
	public static final int NEW_AWAYRECHARGE_BIG=83;
	/** vip补偿礼包 **/
	public static final int MAIL_ID_VIP_PAYBACK = 84;
	/** 武圣榜大奖**/
	public static final int WUSHENG_BIGWARD=85;
	/** 神将送礼排名奖励**/
	public static final int GODGENSENDGIFT_RANKAWARD=86;
	/** 神将送礼目标奖励补发**/
	public static final int GODGENSENDGIFT_TARGETAWARD=87;
	/** 神将送礼特殊排名奖励**/
	public static final int GODGENSENDGIFT_SPECIALAWARD=88;
	/** 三国庆典-登录送礼奖励补发 **/
	public static final int CELEBRATION_LOGIN_GITE = 89;
	/** 三国庆典-单笔返利奖励补发 **/
	public static final int CELEBRATION_ONE_RECHARGE = 90;
	/** 三国庆典-累充返利奖励补发 **/
	public static final int CELEBRATION_TOTAL_RECHARGE = 91;
	/** 圣兽降临-兽魂洗练奖励补发 **/
	public static final int SAINT_MONSTER_WASH = 92;
	/** 圣兽降临-兽魂目标奖励补发 **/
	public static final int SAINT_MONSTER_GOAL = 93;
	/** 圣兽降临-每日活跃奖励补发 **/
	public static final int SAINT_MONSTER_DAILY_ACTIVATE = 94;
	/** 圣兽降临-圣兽寻宝奖励补发 **/
	public static final int SAINT_MONSTER_TREASURE_REWARD = 95;
	/** 圣兽降临-圣兽寻宝排名奖励 **/
	public static final int SAINT_MONSTER_TREASURE_RANK = 96;
	/** 圣兽降临-圣兽寻宝排名大奖 **/
	public static final int SAINT_MONSTER_TREASURE_BIG = 97;
	/** 圣兽寻宝(常驻系统)奖励补发 **/
	public static final int SAINT_MONSTER_TREASURE_SYS_REWARD = 98;
	/** 圣兽寻宝(常驻系统)排名奖励 **/
	public static final int SAINT_MONSTER_TREASURE_SYS_RANK = 99;
	/** 圣兽寻宝(常驻系统)排名大奖 **/
	public static final int SAINT_MONSTER_TREASURE_SYS_BIG = 100;
	/** 少年英主-金猪送财奖励补发 **/
	public static final int SHAO_ZHU_GOLD_PIG_GOLD_REWARD = 101;
	/** 少主活动-累计充值奖励补发 **/
	public static final int SHAOZHU_TOTALRECHARGE__REWARD = 102;
	/** 少年英主-七日目标奖励补发 **/
	public static final int SHAOZHU_SEVENDAYTARGET_AWARD = 103;
	/** 少年英主-银猪送财奖励补发 **/
	public static final int SHAO_ZHU_GOLD_PIG_SILVER_REWARD = 104;
	/** 少年英主-银猪送财元宝返利 **/
	public static final int SHAO_ZHU_GOLD_PIG_SILVER_YB_REWARD = 105;
	/** 少年英主-金猪送财元宝返利 **/
	public static final int SHAO_ZHU_GOLD_PIG_GOLD_YB_REWARD = 106;
	/** 少主活动-单笔返利钥匙奖励补发 **/
	public static final int SHAOZHU_ONERECHARGEBACK_KEYAWARD = 107;
	/**武圣榜补发奖励**/
	public static final int BUFA_WUSHENG_REWARD=116;
	/**血战到底补偿邮件**/
	public static final int BUFA_BOOL_LAST=117;
	/**跨服矿藏协助邮件**/
	public static final int CROSS_MINE_REWARD=118;
	/**补发每日直购目标奖励**/
	public static final int DAILYDIRECTBUY_TARGET_AWARD=119;
	/**八门金锁-完美鉴定排名奖励**/
	public static final int EIGHTDOOR_APPRAISERANK_RANDAWARD=120;
	/**八门金锁-完美鉴定排名大奖**/
	public static final int EIGHTDOOR_APPRAISERANK_BIGAWARD=121;
	/** 兽魂洗练普通奖励 **/
	public static final int SAINT_MONSTER_WASH_RANK = 122;
	/** 兽魂洗练大奖 **/
	public static final int SAINT_MONSTER_WASH_RANK_BIG = 123;
	/**少年英主-少主祈愿排名奖励**/
	public static final int SHAOZHU_QIYUANRANK_RANDAWARD=124;
	/**少年英主-少主祈愿排名大奖**/
	public static final int SHAOZHU_QIYUANRANK_BIGAWARD=125;
	/** 专属活动-单笔充值奖励 */
	public static final int EXACT_ONERECHARGE_AWARD = 127;
	/** 专属活动-单笔返利奖励 */
	public static final int EXACT_ONERECHARGE_BACK_AWARD = 128;
	/** 专属活动-累计充值奖励 */
	public static final int EXACT_TOTAL_RECHARGE_AWARD = 129;
	/** 专属活动-元宝返利奖励 */
	public static final int EXACT_YB_RECHARGE_AWARD = 130;
	/** 单笔转盘奖励补发 **/
	public static final int ONERECHARGEBACK_KEYAWARD = 131;
	/**曹操来袭最后一击奖励*/
	public static final int CAOCAOCOME_SKILL_AWARD=132;
	/**曹操来袭排名奖励*/
	public static final int CAOCAOCOME_RANK_AWARD=133;
	/** 八门金锁-完美鉴定(活动)排名奖励 **/
	public static final int EIGHTDOOR_APPRAISERANK_ACT_RANDAWARD = 134;
	/** 八门金锁-完美鉴定(活动)排名大奖 **/
	public static final int EIGHTDOOR_APPRAISERANK_ACT_BIGAWARD = 135;
	/** 少年英主-祈愿排名(活动)排名奖励 **/
	public static final int SHAOZHU_QIYUANRANK_ACT_RANDAWARD = 136;
	/** 少年英主-祈愿排名(活动)排名大奖 **/
	public static final int SHAOZHU_QIYUANRANK_ACT_BIGAWARD = 137;
	/** 充值排行(活动)排名奖励 **/
	public static final int CROSS_RECHARGE_RANK_ACT_RANKAWARD = 138;
	/** 限定武将奖励补发 **/
	public static final int WUJIANGGOAL_AWARD = 142;
	/** 万兽之王-连充豪礼奖励补发 **/
	public static final int KING_OF_MONSTERS_SERIESRECHARGE_REWARD = 143;
	/** 喜迎国庆-三国宝藏**/
	public static final int COUNTRY_TREASURE=144;
	/** 虎牢关被雇佣邮件奖励**/
	public static final int TIGER_BECHOOSE_REWARD=139;
	
	/** 万兽之王-仙山寻兽排名奖励 **/
	public static final int MONSTER_KING_RANKING = 145;
	/** 万兽之王-登录有奖补偿 **/
	public static final int MONSTER_KING_LOGIN_AWARD = 146;
	/** 万兽之王-累计充值奖励补发 **/
	public static final int MONSTER_KING_TOTAL_RECHARGE = 147;
	/** 万兽之王-每日活跃奖励补发 **/
	public static final int MONSTER_KING_DAILY_ACTIVE = 148;
	/** 万兽之王-仙山寻兽排名大奖 **/
	public static final int MONSTER_KING_RANKING_BIG = 152;
	/** 万兽之王-异兽送礼 **/
	public static final int SPECIALANIMALDIR_SENDGIFT_REWARD = 153;
	/** 三国战令 **/
	public static final int WARORDER_AWARD = 154;
	/** 异兽boss首通 **/
	public static final int SPECIALANIMAL_BOSS_REWARD = 155;
	/** 龙飞凤舞-修炼天赋 **/
	public static final int TALENTSENDGIFT_REWARD = 156;
	/** 龙飞凤舞-天赋目标 **/
	public static final int TALENT_GOAL = 157;	
	/**充值返利奖励补发**/
	public static final int HEFU_RECHARGE_BACK=162;
	/**合服-大神送礼奖励补发**/
	public static final int HEFU_GODGIFT=163;
	/**合服首充奖励补发**/
	public static final int HEFU_FRISTRECHARGE=164;
	/**合服-张飞醉酒奖励补发**/
	public static final int HEFU_ZHANGFEI=165;
	/**合服-张飞醉酒最后一击奖励**/
	public static final int HEFU_ZHANGFEI_SKILL=166;
	/**合服-张飞醉酒排行奖励**/
	public static final int HEFU_ZHANGFEI_JIURANK=168;
	/** 神将现世(活动)目标奖励补发 **/
	public static final int GODGENTHISLIFE_TARGET_REWARD = 161;
	/** 神将现世(活动)排名奖励 **/
	public static final int CROSS_GODGENTHISLIFE_RANKAWARD = 167;
	/** 运筹帷幄-锦囊妙计奖励补发 **/
	public static final int BAGGOODIDEA_REWARD = 170;
	/** 运筹帷幄_奇策有礼奖励补发 **/
	public static final int GOODPOLICYHASGIFT_REWARD = 171;
	/** 许愿树(活动)排名奖励 **/
	public static final int WISHING_TREE_RANKAWARD = 174;
	/** 许愿树目标奖励补发 **/
	public static final int WISHING_TREE_REWARD = 175;
	/** 许愿树(活动)特殊奖励 **/
	public static final int WISHING_TREE_RANK_BIGAWARD = 176;
	/** 新活动-连续充值奖励补发 **/
	public static final int SERIESRECHARGE_ACT_REWARD = 177;
	/** 许愿树送礼奖励补发 **/
	public static final int WISHING_TREE_SENDGIFT = 178;
	/** 新活动-幸运翻牌奖励补发 **/
	public static final int LUCKTURNCARD_NEWACT = 188;
	/** 新活动-全服消费奖励补发 **/
	public static final int SERVERCONSUME_NEWACT = 189;
	/** 新活动-限时礼包 **/
	public static final int GIFT_ACT_REWARD = 190;
	/** 新活动-宝藏拼图 **/
	public static final int BAO_ZANG_PIN_TU_REWARD = 191;
	/** 新活动-成就树 **/
	public static final int ACHIEVEMENG_TREE_REWARD = 192;

	/**合服补发军团更名卡,更名卡道具ID**/
	public static final int MAIL_HEFU_GANG_NAME_TOOLID = 4269;
	/**合服补发军团更名卡**/
	public static final int MAIL_HEFU_GANG_NAME = 2034;

	/** 每日任务补发邮件id */
	public static final int QUN_XIONG_TASK_MAIL_149 = 149;
	/** 驻守奖励补发邮件id */
	public static final int QUN_XIONG_TASK_MAIL_151 = 151;
	/** 群雄逐鹿城池奖励邮件id */
	public static final int QUN_XIONG_TASK_MAIL_158 = 158;
	/** 群雄逐鹿本国排名奖励邮件id */
	public static final int QUN_XIONG_TASK_MAIL_159 = 159;
	/** 群雄逐鹿国家排名奖励邮件id */
	public static final int QUN_XIONG_TASK_MAIL_160 = 160;
	/** 群雄逐鹿MVP奖励邮件id */
	public static final int QUN_XIONG_TASK_MAIL_169 = 169;
	/** 群雄逐鹿战斗胜利奖励邮件id */
	public static final int QUN_XIONG_TASK_MAIL_172 = 172;
	/** 群雄逐鹿战斗失败奖励邮件id */
	public static final int QUN_XIONG_TASK_MAIL_173 = 173;
	/**粮草争夺-个人排名奖励*/
	public static final int BATTLEGOODS_RANK_PERSON=179;
	/**粮草争夺-区邮排名排名奖励*/
	public static final int BATTLEGOODS_RANK_ZONIE=180;
	/**粮草争夺-MVP奖励*/
	public static final int BATTLEGOODS_RANK_MVP=181;
	/**粮草争夺-积分奖励补发*/
	public static final int BATTLEGOODS_SOURCE=182;
	/**新活动-主题消费奖励补发*/
	public static final int THEMECONSUME=183;
	/**请离义盟*/
	public static final int TAOYUANSWORN_EXPEL = 185;
	/**桃园结义任务奖励补发*/
	public static final int TAOYUANSWORN_TASKAWARD = 186;
	/**桃园结义BOSS奖励补发*/
	public static final int TAOYUANSWORN_BOSSAWARD = 187;
	/**累计返利奖励补发*/
	public static final int TOTALREBATE_AWARD = 193;
	/**群雄逐鹿国家个人奖励*/
	public static final int QUN_XIONG_TASK_MAIL_194 = 194;
	/**跨服王者晋级奖励*/
	public static final int CROSSTEAMKING_DUANWEI=195;
	/**跨服王者排名奖励*/
	public static final int CROSSTEAMKING_RANK=196;
	/**跨服王者每日奖励补发*/
	public static final int CROSSTEAMKING_DAYREWARD=197;
	/** 对对联(活动)排名奖励 **/
	public static final int COUPLET_ACT_RANKAWARD = 198;
	/** 对对联(活动)目标奖励补发 **/
	public static final int COUPLET_ACT_TARGET_REWARD = 199;
	/** 府邸排名奖励 */
	public static final int HOUSE_RANK_MAIL_200 = 200;
	/** 赴宴奖励 **/
	public static final int YANHUI_FUYAN = 201;
	/** 氛围奖励 **/
	public static final int YANHUI_FENWEI = 202;
	/** 敬酒奖励补发 **/
	public static final int YANHUI_JINGJIU = 203;
	/** 年兽闹春奖励补发 */
	public static final int NIAN_MONSTER_ACT_POOL_REWARD = 204;
	/** 年兽闹春目标奖励补发 */
	public static final int NIAN_MONSTER_ACT_GOAL_REWARD = 205;
	/** 擂台比武擂主奖励*/
	public static final int CROSS_ARENA_FIGHT_MASTER_REWARD = 206;
	/** 擂台比武协助奖励*/
	public static final int CROSS_ARENA_FIGHT_HELPER_REWARD = 207;
	/** 天降豪礼奖励*/
	public static final int ACT_SKY_RICHGIFT_REWARD = 209;
	/**剩余红包*/
	public static final int REDBOX_LEFTREWARD=210;
	/**许田围猎*/
	public static final int XUTIAN_HUNT = 211;
	/**许田围猎没奖励*/
	public static final int XUTIAN_HUNT_NO_REWARD = 212;
	/**登峰造极海选排名奖励*/
	public static final int DENGFENGZAOJI_HAIXUAN_RANK = 213;
	/**登峰造极决赛排名奖励*/
	public static final int DENGFENGZAOJI_JUESAI_RANK = 214;
	/**登峰造极海选积分奖励补发*/
	public static final int DENGFENGZAOJI_SCORE_REWARD = 215;
	/**登峰造极冠军猜对奖励*/
	public static final int DENGFENGZAOJI_CHAMPIONSHIP_RIGHT = 216;
	/**登峰造极冠军猜错奖励*/
	public static final int DENGFENGZAOJI_CHAMPIONSHIP_WRONG = 217;
	/**貔貅散宝奖励补发*/
	public static final int PIXIUTREASURE_AWARD = 218;
	/** 武庙十哲(活动)排名奖励 **/
	public static final int WUMIAOSHIZHE_ACT_RANKAWARD = 219;
	/** 武庙十哲(活动)目标奖励补发 **/
	public static final int WUMIAOSHIZHE_ACT_TARGET_REWARD = 220;
	/** 幸运福签(活动)奖励补发 **/
	public static final int LUCK_SIGN_REWARD = 221;
	/** 幸运福签(活动)排名奖励 **/
	public static final int LUCK_SIGN_RANKAWARD = 222;
	/** {0}借用了您的天工炉，获得{1}点繁荣度，奖励以邮件发送，请查收附件！**/
	public static final int HOUSE_TIAN_GONG_LU = 223;
	/** 犒赏三军每日补发 **/
	public static final int WARORDER_DAYAWARD = 224;
	/** 犒赏三军周补发 **/
	public static final int WARORDER_WEEKAWARD = 225;
	/** 犒赏三军等级奖励补发 **/
	public static final int KLSG_WEEKAWARD = 226;
	/** 荣誉勋章每日补发 **/
	public static final int RYXZ_DAYAWARD = 227;
	/** 荣誉勋章周补发 **/
	public static final int RYXZ_WEEKAWARD = 228;
	/** 荣誉勋章等级奖励补发 **/
	public static final int RYXZ_LEVELAWARD = 229;
	/** 线下返利-累计充值 **/
	public static final int OFFLINE_TOTALRECHARGE = 230;
	/** 线下返利-每日累充 **/
	public static final int OFFLINE_DAILY_TATALRECHARGE = 231;
	/** 线下返利-每日元宝返利 **/
	public static final int OFFLINE_DAILY_TATAL_YB = 232;
}
