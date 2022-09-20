package com.teamtop.system.hero;


/**
 * 角色系统常量类
 * @author hepl
 *
 */
public class HeroConst {
	/**
	 * 角色系统id
	 */
	public static final int SYS_ID=1001;
	/**
	 * 封号状态:正常
	 */
	public static final int STATE_FORBID_NORMAL = 0;
	/**
	 * 封号状态:封号
	 */
	public static final int STATE_FORBID_FENG_HAO = 1;
	/**
	 * 封号状态:封号处理问题
	 */
	public static final int STATE_FORBID_FENG_HAO_HANDLE = 2;
	/**
	 * 封号状态:特权号封号
	 */
	public static final int STATE_FORBID_PRIVILEGE=3;
	
	/**	 * 初始化角色:在创角的时候	 */
	public static final int INIT_ROLE_ON_CREATE = 1;
	/**	 * 初始化角色:在选择职业的时候	 */
	public static final int INIT_ROLE_ON_CHOOSE_JOB = 2;
	/**	 * 默认潜力值 100	 */
	public static final int DEFAULT_NATURE=100;
	/**	 * 查询hero数据，类型：全部数据	 */
	public static final int FIND_TYPE_ALL = 1;
	/**	 * 查询hero数据，类型：基本数据，id，名字，等级，性别	 */
	public static final int FIND_TYPE_BASIC = 2;
	/**	 * 查询hero数据，类型：战斗数据	 */
	public static final int FIND_TYPE_BATTLE = 4;
	/**	 * 查询hero数据，类型：好友数据 会修改	 */
	public static final int FIND_TYPE_FRIEND = 5;
	/**	 * 查询hero数据，类型：后台查询:人物基础属性+7系统+武将+时装+称号*/
	public static final int FIND_TYPE_HOUTAI = 6;
	/** * 查询hero数据，类型：少主护送 */
	public static final int FIND_TYPE_SHAOZHU_ESCORT = 7;
	
	

	/**	 * 查询hero数据，类型：国家数据	 */
	public static final int FIND_TYPE_COUNTRYDATA = 14;
	/**	 * 查询hero数据，类型：背包数据	 */
	public static final int FIND_TYPE_BAG = 15;
	/**	 * 查询hero数据，类型：称号	 */
	public static final int FIND_TYPE_TITLE = 16;
	/**	 * 查询hero数据，类型：聊天系统	 */
	public static final int FIND_TYPE_CHAT = 17;
	/**	 * 查询hero数据，类型：微信分享	 */
	public static final int FIND_TYPE_WEI_XIN_SHARE = 18;
	
	
	/**
	 * 角色自动升级的最大等级，99
	 */
	public static final int HERO_LEVEL_UP = 99;
	/**
	 * 角色最大等级，350
	 */
	// public static final int HERO_LEVEL_MAX = 1000;
	/**
	 * 角色每30分钟获得的体力值，15
	 */
	public static final int HERO_VIGOR_GET = 15;
	/**
	 * 货币上限
	 */
	public static final long MAX_MONEY = 999999999999l;
	/**
	 * 滚服玩家状态，待查，0
	 */
	public static final int OLD_PLAYER_STATE_0 = 0;
	/**
	 * 滚服玩家状态，是，1
	 */
	public static final int OLD_PLAYER_STATE_1 = 1;
	/**
	 * 滚服玩家状态，否，2
	 */
	public static final int OLD_PLAYER_STATE_2 = 2;
	/**
	 * 内部号标识，非内部号
	 */
	public static final int INDOOR_STATE_0 = 0;
	/**
	 * 内部号标识，是内部号
	 */
	public static final int INDOOR_STATE_1 = 1;
	/**
	 * VIP类型，正式vip，0
	 */
	public static final int VIP_TYPE_0 = 0;
	/**
	 * VIP类型，体验vip，1
	 */
	public static final int VIP_TYPE_1 = 1;
	/**
	 * 测试开始时间，3月30日早上10:00，1459303200
	 */
	public static final int TEST_START_TIME = 0;
	/**
	 * 测试结束时间，5月31日中午23:59:59，1464710399
	 */
	public static final int TEST_END_TIME = 1461945600;
	/**
	 * 测试阶段发送的元宝道具id
	 */
	public static final int TEST_GOLD = 40890007;
	/**
	 * 测试阶段发送的元宝道具数量
	 */
	public static final int TEST_GOLD_NUM = 26;
	/**
	 * 测试阶段发送的绑定元宝道具id
	 */
	public static final int TEST_BIND_GOLD = 40890004;
	/**
	 * 测试阶段发送的绑定元宝道具数量
	 */
	public static final int TEST_BIND_GOLD_NUM = 20;
	/**
	 * GM验证key
	 */
	public static final String GM_CODE_KEY = "xkx_jl!woljlsff*7zloeqdkg";
	
	/**
	 * GM验证key 3737客服gm
	 */
	public static final String GM_CODE_3737KEY = "xkx_jl!woljlsff*7zloeqdkg";
	/**
	 * 客服 3737cid
	 */
	public static final int CID_3737=2;
	/**
	 * 在线类型：0所有在线人数
	 */
	public static final int ONLINETYPE_ONLINE = 0;
	/**
	 * 在线类型：1钓鱼人数
	 */
	public static final int ONLINETYPE_FISH = 1;
	
	/**
	 * 临时属性:平台等级
	 */
	public static final String ATTR_PFLEVEL = "pfLevel";
	/**
	 * 临时属性:钻石特权
	 */
	public static final String ATTR_DIAMOND = "diamond";
	/**
	 * 临时属性:钻石特权豪华
	 */
	public static final String ATTR_DIAMOND_HIGH = "diamondHigh";
	/**
	 * 临时属性:钻石特权年费
	 */
	public static final String ATTR_DIAMOND_YEAR = "diamondYear";
	/**
	 * 临时属性:钻石特权等级
	 */
	public static final String ATTR_DIAMOND_Level = "diamondLevel";
	/**
	 * 蓝钻
	 */
	public static final String ATTR_BLUE = "blue";
	/**
	 * 蓝钻等级
	 */
	public static final String ATTR_BLUE_LEVEL = "blueLevel";
	/**
	 * 豪华蓝钻
	 */
	public static final String ATTR_HIGH_BLUE = "highBlue";
	/**
	 * 年费蓝钻
	 */
	public static final String ATTR_YEAR_BLUE = "yearBlue";
	/**
	 * 黄钻
	 */
	public static final String ATTR_YELLOW = "yellow";
	/**
	 * 黄钻等级
	 */
	public static final String ATTR_YELLOW_LEVEL = "yellowLevel";
	/**
	 * 豪华黄钻
	 */
	public static final String ATTR_HIGH_YELLOW = "highYellow";
	/**
	 * 年费黄钻
	 */
	public static final String ATTR_YEAR_YELLOW = "yearYellow";
	/**
	 * 红钻
	 */
	public static final String ATTR_RED = "red";
	/**
	 * 红钻等级
	 */
	public static final String ATTR_RED_LEVEL = "redLevel";
	/**
	 * 豪华红钻
	 */
	public static final String ATTR_HIGH_RED = "highRed";
	/**
	 * 年费红钻
	 */
	public static final String ATTR_YEAR_RED = "yearRed";
	/**
	 * 会员
	 */
	public static final String ATTR_VIP = "vip";
	/**
	 * 会员等级
	 */
	public static final String ATTR_VIP_LEVEL = "vipLevel";
	/**
	 * 豪华会员
	 */
	public static final String ATTR_HIGH_VIP = "highVip";
	/**
	 * 年费会员
	 */
	public static final String ATTR_YEAR_VIP = "yearVip";
	/**
	 *蓝钻
	 */
	public static final String blue="blue";
	/**
	 *高级蓝钻
	 */
	public static final String highBlue="highBlue";
	/**
	 *蓝钻年费
	 */
	public static final String yearBlue="yearBlue";
	/**
	 *黄钻
	 */
	public static final String yellow="yellow";
	/**
	 *豪华黄钻
	 */
	public static final String highYellow="highYellow";
	/**
	 *年费黄钻
	 */
	public static final String yearYellow="yearYellow";
	/**
	 *红钻
	 */
	public static final String red="red";
	/**
	 *豪华红钻
	 */
	public static final String highRed="highRed";
	/**
	 *年费红钻
	 */
	public static final String yearRed="yearRed";
	/**
	 *VIP特权
	 */
	public static final String vipDiamond="vipDiamond";
	/**
	 *高级vip
	 */
	public static final String highVip="highVip";
	/**
	 *年费vip
	 */
	public static final String yearVip="yearVip";
	/**
	 * 后台验证key
	 */
	public static final String BK_KEY = "www.shuihufy.com";
	/**
	 * 临时属性:openkey
	 */
	public static final String OPENKEY = "openkey";
	/**
	 * 临时属性:pfkey
	 */
	public static final String PFKEY = "pfkey";
	
	public static final String TXUSERTYPE = "txUserType";
	/**
	 * 临时属性：app（qq应用面板登录）
	 */
	public static final String APP = "app";
	/**
	 * 临时属性:待更新钻石会员信息
	 */
	public static final String ATTR_DINFO = "dInfo";
	/**
	 * 临时属性:平台ID
	 */
	public static final String ATTR_PFID = "pfid";

	
	public static final int CHANGE_NAME_ITEM_ID = 4211;
	/**
	 * 异宝属性丹
	 */
	public static final int DAN9=9;
	/**
	 * 国家 魏国
	 */
	public static final int WEI=1;
	/**
	 * 国家 蜀国
	 */
	public static final int SHU=2;
	/**
	 * 国家 吴国
	 */
	public static final int WU=3;
	/**
	 * 充值最低额度
	 */
	public static final int RECHARGE_LOWEST = 10;
	
	
}
