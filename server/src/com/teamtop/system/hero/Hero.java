package com.teamtop.system.hero;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.teamtop.cross.CrossZone;
import com.teamtop.gameCommon.GameFunction;
import com.teamtop.netty.util.nettyCache.NettyCache;
import com.teamtop.system.equip.model.Equip;
import com.teamtop.system.hero.platform.Platform;
import com.teamtop.system.scene.Scene;
import com.teamtop.system.setting.model.SettingData;
import com.teamtop.system.smelt.model.Smelt;
import com.teamtop.system.starPicture.model.StarPictureModel;
import com.teamtop.system.title.TitleModel;
import com.teamtop.util.log.LogTool;

import excel.config.Config_lunhui_274;
import excel.struct.Struct_lunhui_274;
import io.netty.channel.Channel;

/**
 * 角色实体类
 * @author Administrator
 *
 */
public class Hero extends HeroExt implements Comparable<Hero>{
	/**
	 * 临时数据，包括channel
	 */
	private TempData tempData;
	/**
	 * 登陆平台信息
	 */
	private Platform loginPlatform;
	/**
	 * 用于登陆时重算战力不需要发送属性与战力的标志，设置为true则不需要发送
	 * 设置为false则在重算战力时发送属性与战力
	 */
	private boolean loginRecalc;
	/**
	 * 最近登陆的pf
	 */
	private String loginPf;
	/**
	 * 最近登陆的pd
	 */
	private String loginPd;
	/**
	 * 唯一id
	 */
	private long id;
	/**
	 * 账号ID
	 */
	private long aid;
	/**
	 * openid
	 */
	private String openid;
	/**
	 * 带有区号的名字.Sxxx
	 */
	private String nameZoneid;
	/**
	 * 名字
	 */
	private String name;
	/**
	 * 战力改变标志,玩家进行一个操作需要改变战力，即设置此标志位true。
	 * 系统会在操作执行完后检测此标志并进行战力计算，计算后恢复为false
	 */
	private boolean recalcStrength;
	/**
	 * 战力变化原因
	 */
	private LinkedList<Integer> recalcReason = new LinkedList<Integer>();
	/**
	 * 等级
	 */
	private int level;
	/**
	 * 职业
	 */
	private int job;
	/**
	 * 创号时选的职业
	 */
	private int createJob;
	/**
	 * 性别
	 */
	private int sex;
	/**
	 * 区id
	 */
	private int zoneid;
	/**
	 * （跨服用）归属区
	 */
	private int belongZoneid;
	/**
	 * 创建角色时间
	 */
	private int createTime;
	/**
	 * 注册ip
	 */
	private String createIp;
	/**
	 * 登陆ip
	 */
	private String loginIp;
	/**
	 * 禁言状态 0:正常 ，其他为禁言状态
	 */
	private int illegalState;
	/**
	 * 异常状态的失效时间
	 */
	private int illegalTimeout;
	/**
	 * 账号非法原因,通过后台传入赋值
	 */
	private String illegalReason;
	/**
	 * 封号状态 0：正常，其他为封号状态
	 */
	private int forbidState;
	/**
	 * 封号失效时间
	 */
	private int forbidTimeout;
	/**
	 * 封号原因
	 */
	private String forbidReason;
	/**
	 * pf平台信息
	 */
	private String pf;
	/**
	 * pd平台信息
	 */
	private String pd;
	/**
	 * 是否第一次玩游戏 1为已完成 0为未完成
	 */
	private int guideGameFinish=1;
	/**
	 * 游戏声音 1为开启 0为关闭
	 */
	private int gameSound=1;
	/**
	 * 个人战力
	 */
	private long selfStrength;
	/**
	 * 总战力
	 */
	private long totalStrength;
	/**
	 * 国家ID
	 */
	private int countryType;
	/**
	 * 帮会ID
	 */
	private long gangId;
	
	/**
	 * 帮会名称
	 */
	private String gangName;

	/**
	 * 结婚对象id,0表示未婚
	 */
	private long marryHid;
	/**
	 * 登陆时间
	 */
	private int loginTime;
	/**
	 * 登出时间
	 */
	private int logoutTime;
	/**
	 * 经验
	 */
	private long exp;
	/** 
	 * 元宝
	 */
	private long yuanbao;
	/**
	 * 铜币
	 */
	private long coin;
	/**
	 * 星魂
	 */
	private long starSoul;
	/**
	 * 魂火
	 */
	private long soulFire;
	/**
	 * 声望
	 */
	private long prestige;
	/**
	 * 符文经验
	 */
	private long destinyExp;
	/**
	 * zcboss积分
	 */
	private long zcBossJf;
	/**
	 * 分享币
	 */
	private long shareCoin;
	/**
	 * 转生等级
	 */
	private int rebornlv;
	/**
	 * 战斗属性详细
	 */
	private  FightAttr fightAttr;
	/**
	 * 最终的战斗属性详细
	 */
	private  FinalFightAttr finalFightAttr;
	/**
	 * 用于GM调整战斗属性的临时属性
	 */
	private FinalFightAttr[] tempFightAttr;
	/**
	 * 手动操作伤害
	 */
	private long operateDamage;
	/**
	 * 手动操作增加临时战力
	 */
	private long operateTempStrength;
	/**
	 * 外观模型
	 */
	private ShowModel showModel;
	/**
	 * 总充值(元)
	 */
	private long chongZhiYuan;
	/**
	 * 不用存进数据库的临时变量
	 * @param o
	 * @return
	 */
	private TempVariables tempVariables;
	/**
	 * 在身上的装备缓存，key1为职业，key2为位置索引 参考GameConst.INDEX_WEAPON等，value为装备对象。
	 */
	private Map<Integer, Equip> onbodyEquip;
	/**
	 * 不在身上的装备缓存，key为装备id，value为装备对象。
	 */
	private Map<Long, Equip> notOnBodyEquip;
	/**
	 * 主角穿戴的时装id
	 */
	private int fashionId;
	/**
	 * 0点处理时间
	 */
	private int zeroTime;
	/**
	 * vip等级，冗余数据
	 */
	private int vipLv;
	/**
	 * 刚刚建号为1，其余情况为0（建号后进入场景则设为0）
	 */  
	private int nowCreate;
	/**
	 * 婚姻id
	 */
	private long marriageId;
	/**
	 * 状态 0：正常，1：战斗，2：冻结
	 */
	private int sceneState;
	/**
	 * 移动添加数据更新时间
	 */
	private long sceneBoardDataUpdate;
	
	/**
	 * 领取帮会体力
	 * 0-未领取；1-已经领取
	 */
	private int receiveGangVigor;
	
	/**
	 * 体力奖励刷新时间
	 */
	private int receiveGangVigorRefreshDay;
	/**
	 * 内部发放获得的绑定元宝总值
	 */
	private long indoorGlod;
	/**
	 * 内部发放获得的绑定元宝消耗
	 */
	private long indoorGlodUse;
	/**
	 * 内部发放的绑定元宝在使用时，临时保存使用的数量
	 */
	private long indoorGlodTemp;
	/**
	 * 内部号标识，0否，1是
	 */
	private int isIndoorAccount;
	/**
	 * 内部发放获得的非绑定元宝总值
	 */
	private long indoorGlodNotBind;
	/**
	 * 内部发放获得的非绑定元宝消耗
	 */
	private long indoorGlodNotBindUse;
	/**
	 * 内部发放的非绑定元宝在使用时，临时保存使用的数量
	 */
	private long indoorGlodNotBindTemp;
	/**
	 * 是否滚服玩家，0待查，1是，2否
	 */
	private int isOldPlayer;
	/**
	 * 首次充值时间
	 */
	private int firstRechargeTime;
	/**
	 * 首充奖励状态 1可领取 0未达到 2已领取
	 */
	private int frAwardsState;
	/**
	 * 最近一次充值时间
	 */
	private int recentlyRechargeTime;
	/**
	 * 总消耗元宝
	 */
	private long totalConsumeGlod;
	/**
	 * 总消耗银两
	 */
	private long totalConsumeSilver;
	/**
	 * 未领取的后台全服邮件邮件id
	 */
	private List<Long> houtaiMail = new ArrayList<Long>();
	/**
	 * 未领取的后台物品申请邮件id
	 */
	private List<Long> houtaiApplyMail = new ArrayList<Long>();
	/**
	 * 特殊身份类型，0不是，1新手指导员，2GM
	 */
	private int specialType;
	/**
	 * 玩家每日消费数实时的 每天都重置(开服狂欢用)
	 */
	private int oneDayConsmeNum;
	/**
	 * 玩家每日消费数实时的 每天都重置
	 */
	private int oneDayConsume;
	/**
	 * 玩家每日充值数量实时的  每天都重置
	 */
	private int oneDayRecharge;
	/**
	 * 玩家每日充值档次实时的  每天都重置(元宝,首充,特权卡,每日直购,基金都有),value:index
	 */
	private List<Integer> oneDayEveryIndexRechargeList;
	/**
	 * 邀请进游戏者id
	 */
	private long inviteHid;
	/**
	 * 广告号状态，0不是，1广告关键字可疑，2私聊多可疑，3广告号
	 */
	private int adState;
	/**
	 * 广告号监控类型，0不是，1广告关键字，2私聊多
	 */
	private int adMonitorType;
	/**
	 * 广告号添加时间
	 */
	private int adTime;
	/**
	 * 中央服的channel
	 */
	private Channel crossChannel;
	/**
	 * 子服的channel
	 */
	private Channel localChannel;
	/**
	 * 中央服的同步时间（用于检查）
	 */
	private int crossChannelSyncTime;
	/**
	 * 部分副本系统收益上限（野外boss，挂机副本等）
	 */
	private Map<Integer, Map<Integer,Integer>> limitRec;
	/**
	 * 累计在线时长
	 */
	private long totalOnlineTime;
	/**
	 * 当天在线时长
	 */
	private int dayOnlineTime;
	/**
	 * 熔炼
	 */
	private Smelt smelt;
	/**
	 * 排行榜膜拜记录 key：排行帮类型，value：是否已膜拜1表示已膜拜
	 */
	private Map<Integer, Integer> rankMobaiMap;
	/**
	 * 兽灵（废弃）
	 */
	private Map<Integer, Integer> monsterSpiritMap;
	/**
	 * 星图
	 */
	private Map<Integer, StarPictureModel> starPictureMap;
	/**
	 * 设置
	 */
	private SettingData settingData;
	/**
	 * 冲级奖励
	 */
	private List<Integer> chongJiAwards;
	/**
	 * 商城积分
	 */
	private int mallJf;
	
	/**
	 * 开服比拼，已领取的奖励ID
	 */
	private int kaiFuBiPinAwardsID;
	/**
	 * 开服比拼，下线时的排名
	 */
	private int kaiFuBiPinRankNum;
	/**
	 * 丹药吞噬 <id,num>
	 */
	private Map<Integer, Integer> danyao;
	/**
	 * 充值5倍返利 ，key：表id，value：充值次数
	 */
	private Map<Integer, Integer> rechargeFiveTimes;
	/**
	 * 特权卡 key:特权卡id, value:领取状态 0不可领取 1可领取 2已领取
	 */
	private Map<Integer, int[]> privilegeCardMap;
	/**
	 * 同时拥有3张特权卡奖励领取状态
	 */
	private int privilegeAward;
	/**
	 * 英雄副本通关时间 （用于排行榜）
	 */
	private int heroFubenTime;
	/**
	 * 英雄副本通关关卡
	 */
	private int heroFubenGq;
	/**
	 * 战斗验证map，key：系统id，value：战斗开始时间
	 */
	private Map<Integer, Integer> battleCheckMap;
	/**
	 * 将衔等级
	 */
	private int official;
	/**
	 * 功勋
	 */
	private int zhanGong;
	/**
	 * 头像
	 */
	private int icon;
	/**
	 * 头像框,默认：  int frameId = Config_xtcs_004.getIns().get(SettingConst.BASE_FRAME).getNum();
	 */
	private int frame;
	/**
	 * 穿戴称号
	 */
	private int titleId;
	/**
	 * 是否可以发送协议（true：是，false：否。针对没收到104客户端接某些协议报错报错）
	 */
	private boolean isCanSend;
	/**
	 * 等待发送的协议数据
	 */
	private List<Object[]> waitSendList = new ArrayList<>();
	/**
	 * 显示国家
	 */
	private int showCountry;
	/**
	 * 微端奖励领取状态(1已领0未领)
	 */
	private int weiDuanFlag;
	/**
	 * 上报时间
	 */
	private int reportTime;
	
	/**
	 * 场景添加自己时需要发送的数据
	 */
	private HashMap<Object, Object> sceneShowData;
	/**
	 * 自动战斗设置，0不开启，1开启
	 */
	private int autoFight;
	/**
	 * 转生奖励领取状态
	 */
	private Map<Integer, Integer> brothRewards;
	/**
	 * 系统开启已经发过奖励的系统id
	 *
	 */
	private Set<Integer> openSysReward;
	/**
	 * 成功支付次数
	 */
	private int successPayNum;
	/**
	 * 各个系统战力属性加成
	 */
	private Map<Integer, long[][]> fightAttrBySysid;
	/** 档次充值记录 */
	private Set<Integer> rechargeGrade;
	/** 首充奖励 */
	private Map<Integer, Integer> firstRechargeAward;
	/** 新首充奖励，叉掉UI的时间 */
	private int firstRechargeCloseUITime;
	/**	 * 登录就送的奖励状态  0未领取 1已领取	 */
	private int awardsCreateHero;
	/**上一次任务完成时间*/
	private int beforeTime;
	/**上一次完成任务id**/
	private int beforeTaskId;
	/**场景**/
	private Scene scene;
	/**上次打开公告时的版本号*/
	private String noticestr;
	/**用于通知中央服服子服正在开的活动**/
	private HashMap<Integer,Integer> actIds;
	/** 已结束结算系统uid集合 */
	private Set<Integer> endUidSet;
	/**已经领取的霸服礼包id*/
	private Set<Integer> giftTaskIds;
	/**注册系统*/
	private String usesys;
	/** 特殊待处理充值*/
	private Map<Long, SpecialRechargeInfo> waitRechargeMap = new HashMap<>();
	/** 六道轮回等级 */
	private int reincarnationLevel;
	/** 真实等级 */
	private int realLevel;
	/**坐骑*/
	private int mountId;

	
	public int getMountId() {
		return mountId;
	}
	public void setMountId(int mountId) {
		this.mountId = mountId;
	}
	public int getReportTime() {
		return reportTime;
	}
	public void setReportTime(int reportTime) {
		this.reportTime = reportTime;
	}
	public int getWeiDuanFlag() {
		return weiDuanFlag;
	}
	public void setWeiDuanFlag(int weiDuanFlag) {
		this.weiDuanFlag = weiDuanFlag;
	}

	public Map<Integer, Integer> getBattleCheckMap() {
		return battleCheckMap;
	}
	public void setBattleCheckMap(Map<Integer, Integer> battleCheckMap) {
		this.battleCheckMap = battleCheckMap;
	}
	public int getKaiFuBiPinRankNum() {
		return kaiFuBiPinRankNum;
	}
	public void setKaiFuBiPinRankNum(int kaiFuBiPinRankNum) {
		this.kaiFuBiPinRankNum = kaiFuBiPinRankNum;
	}
	public Map<Integer, Integer> getRankMobaiMap() {
		return rankMobaiMap;
	}
	public void setRankMobaiMap(Map<Integer, Integer> rankMobaiMap) {
		this.rankMobaiMap = rankMobaiMap;
	}
	public Map<Integer, Integer> getMonsterSpiritMap() {
		return monsterSpiritMap;
	}
	public void setMonsterSpiritMap(Map<Integer, Integer> monsterSpiritMap) {
		this.monsterSpiritMap = monsterSpiritMap;
	}
	public Map<Integer, StarPictureModel> getStarPictureMap() {
		return starPictureMap;
	}
	public void setStarPictureMap(Map<Integer, StarPictureModel> starPictureMap) {
		this.starPictureMap = starPictureMap;
	}
	public SettingData getSettingData() {
		return settingData;
	}
	public void setSettingData(SettingData settingData) {
		this.settingData = settingData;
	}
	public Map<Integer, Integer> getRechargeFiveTimes() {
		return rechargeFiveTimes;
	}
	public void setRechargeFiveTimes(Map<Integer, Integer> rechargeFiveTimes) {
		this.rechargeFiveTimes = rechargeFiveTimes;
	}
	public Map<Integer, int[]> getPrivilegeCardMap() {
		return privilegeCardMap;
	}
	public void setPrivilegeCardMap(Map<Integer, int[]> privilegeCardMap) {
		this.privilegeCardMap = privilegeCardMap;
	}
	public int getPrivilegeAward() {
		return privilegeAward;
	}
	public void setPrivilegeAward(int privilegeAward) {
		this.privilegeAward = privilegeAward;
	}
	public Map<Integer, Integer> getDanyao() {
		return danyao;
	}
	public void setDanyao(Map<Integer, Integer> danyao) {
		this.danyao = danyao;
	}
	public int getOfficial() {
		return official;
	}
	public void setOfficial(int official) {
		this.official = official;
	}
	public Smelt getSmelt() {
		return smelt;
	}
	public void setSmelt(Smelt smelt) {
		this.smelt = smelt;
	}
	public Channel getChannel() {
		if(tempData==null) return null;
		return tempData.getChannel();
	}
	public boolean isOnline(){
		if(tempData==null) return false;
		if(tempData.getChannel()==null) return false;
		return true;
	}
	public TempData getTempData() {
		return tempData;
	}

	public void setTempData(TempData tempData) {
		this.tempData = tempData;
	}

	public Platform getLoginPlatform() {
		return loginPlatform;
	}

	public void setLoginPlatform(Platform loginPlatform) {
		this.loginPlatform = loginPlatform;
	}

	public boolean isLoginRecalc() {
		return loginRecalc;
	}

	public void setLoginRecalc(boolean loginRecalc) {
		this.loginRecalc = loginRecalc;
	}

	public String getLoginPf() {
		return loginPf;
	}

	public void setLoginPf(String loginPf) {
		this.loginPf = loginPf;
	}

	public String getLoginPd() {
		return loginPd;
	}

	public void setLoginPd(String loginPd) {
		this.loginPd = loginPd;
	}

	public long getAid() {
		return aid;
	}

	public void setAid(long aid) {
		this.aid = aid;
	}

	public String getOpenid() {
		return openid;
	}

	public void setOpenid(String openid) {
		this.openid = openid;
	}

	public boolean isRecalcStrength() {
		return recalcStrength;
	}

	public void setRecalcStrength(boolean recalcStrength) {
		this.recalcStrength = recalcStrength;
	}

	public LinkedList<Integer> getRecalcReason() {
		return recalcReason;
	}

	public void setRecalcReason(LinkedList<Integer> recalcReason) {
		this.recalcReason = recalcReason;
	}

	public int getSex() {
		return sex;
	}

	public void setSex(int sex) {
		this.sex = sex;
	}

	public int getZoneid() {
		return zoneid;
	}

	public void setZoneid(int zoneid) {
		this.zoneid = zoneid;
	}

	public int getBelongZoneid() {
		return belongZoneid;
	}

	public void setBelongZoneid(int belongZoneid) {
		this.belongZoneid = belongZoneid;
	}
	public int getCreateTime() {
		return createTime;
	}

	public void setCreateTime(int createTime) {
		this.createTime = createTime;
	}

	public String getCreateIp() {
		return createIp;
	}

	public void setCreateIp(String createIp) {
		this.createIp = createIp;
	}

	public String getLoginIp() {
		return loginIp;
	}

	public void setLoginIp(String loginIp) {
		this.loginIp = loginIp;
	}

	public int getIllegalState() {
		return illegalState;
	}

	public void setIllegalState(int illegalState) {
		this.illegalState = illegalState;
	}

	public int getIllegalTimeout() {
		return illegalTimeout;
	}

	public void setIllegalTimeout(int illegalTimeout) {
		this.illegalTimeout = illegalTimeout;
	}

	public String getIllegalReason() {
		return illegalReason;
	}

	public void setIllegalReason(String illegalReason) {
		this.illegalReason = illegalReason;
	}

	public int getForbidState() {
		return forbidState;
	}

	public void setForbidState(int forbidState) {
		this.forbidState = forbidState;
	}

	public int getForbidTimeout() {
		return forbidTimeout;
	}

	public void setForbidTimeout(int forbidTimeout) {
		this.forbidTimeout = forbidTimeout;
	}

	public String getForbidReason() {
		return forbidReason;
	}

	public void setForbidReason(String forbidReason) {
		this.forbidReason = forbidReason;
	}

	public String getPf() {
		return pf;
	}

	public void setPf(String pf) {
		this.pf = pf;
	}

	public String getPd() {
		return pd;
	}

	public void setPd(String pd) {
		this.pd = pd;
	}

	public int getGuideGameFinish() {
		return guideGameFinish;
	}

	public void setGuideGameFinish(int guideGameFinish) {
		this.guideGameFinish = guideGameFinish;
	}

	public int getGameSound() {
		return gameSound;
	}

	public void setGameSound(int gameSound) {
		this.gameSound = gameSound;
	}

	public long getSelfStrength() {
		return selfStrength;
	}
	public void setSelfStrength(long selfStrength) {
		this.selfStrength = selfStrength;
	}
	public long getTotalStrength() {
		return totalStrength;
	}

	public void setTotalStrength(long totalStrength) {
		this.totalStrength = totalStrength;
	}

	public long getGangId() {
		return gangId;
	}

	public void setGangId(long gangId) {
		this.gangId = gangId;
	}

	public String getGangName() {
		return gangName;
	}

	public void setGangName(String gangName) {
		this.gangName = gangName;
	}

	public long getMarryHid() {
		return marryHid;
	}

	public void setMarryHid(long marryHid) {
		this.marryHid = marryHid;
	}

	public int getLoginTime() {
		return loginTime;
	}

	public void setLoginTime(int loginTime) {
		this.loginTime = loginTime;
	}

	public int getLogoutTime() {
		return logoutTime;
	}

	public void setLogoutTime(int logoutTime) {
		this.logoutTime = logoutTime;
	}

	public long getExp() {
		return exp;
	}

	public void setExp(long exp) {
		this.exp = exp;
	}

	public long getYuanbao() {
		return yuanbao;
	}

	public void setYuanbao(long yuanbao) {
		this.yuanbao = yuanbao;
	}

	public long getStarSoul() {
		return starSoul;
	}

	public void setStarSoul(long starSoul) {
		this.starSoul = starSoul;
	}

	public long getSoulFire() {
		return soulFire;
	}

	public void setSoulFire(long soulFire) {
		this.soulFire = soulFire;
	}
	public long getCoin() {
		return coin;
	}
	public void setCoin(long coin) {
		this.coin = coin;
	}
	public long getPrestige() {
		return prestige;
	}

	public void setPrestige(long prestige) {
		this.prestige = prestige;
	}
	public FightAttr getFightAttr() {
		return fightAttr;
	}
	public void setFightAttr(FightAttr fightAttr) {
		this.fightAttr = fightAttr;
	}
	public FinalFightAttr getFinalFightAttr() {
		return finalFightAttr;
	}
	public void setFinalFightAttr(FinalFightAttr finalFightAttr) {
		this.finalFightAttr = finalFightAttr;
	}
	public FinalFightAttr[] getTempFightAttr() {
		return tempFightAttr;
	}
	public void setTempFightAttr(FinalFightAttr[] tempFightAttr) {
		this.tempFightAttr = tempFightAttr;
	}
	public long getOperateDamage() {
		return operateDamage;
	}

	public void setOperateDamage(long operateDamage) {
		this.operateDamage = operateDamage;
	}

	public long getOperateTempStrength() {
		return operateTempStrength;
	}

	public void setOperateTempStrength(long operateTempStrength) {
		this.operateTempStrength = operateTempStrength;
	}
	public ShowModel getShowModel() {
		return showModel;
	}

	public void setShowModel(ShowModel showModel) {
		this.showModel = showModel;
	}

	public long getChongZhiYuan() {
		return chongZhiYuan;
	}

	public void setChongZhiYuan(long chongZhiYuan) {
		this.chongZhiYuan = chongZhiYuan;
	}

	public Map<Integer, Equip> getOnbodyEquip() {
		return onbodyEquip;
	}

	public void setOnbodyEquip(Map<Integer, Equip> onbodyEquip) {
		this.onbodyEquip = onbodyEquip;
	}

	public Map<Long, Equip> getNotOnBodyEquip() {
		return notOnBodyEquip;
	}
	public Equip getNotOnBodyEquip( long eid) {
		return notOnBodyEquip.get( eid);
	}
	public Equip removeNotOnBodyEquip( long eid) {
		return notOnBodyEquip.remove( eid);
	}
	public void clearNotOnBodyEquip( ) {
		notOnBodyEquip.clear();;
	}
	public void setNotOnBodyEquip(Map<Long, Equip> notOnBodyEquip) {
		this.notOnBodyEquip = notOnBodyEquip;
	}
	public void setNotOnBodyEquip( long eid, Equip equip) {
		this.notOnBodyEquip.put( eid, equip);
	}

	public int getFashionId() {
		return fashionId;
	}

	public void setFashionId(int fashionId) {
		this.fashionId = fashionId;
	}

	public int getZeroTime() {
		return zeroTime;
	}

	public void setZeroTime(int zeroTime) {
		this.zeroTime = zeroTime;
	}

	public int getVipLv() {
		return vipLv;
	}

	public void setVipLv(int vipLv) {
		this.vipLv = vipLv;
	}

	public int getNowCreate() {
		return nowCreate;
	}

	public void setNowCreate(int nowCreate) {
		this.nowCreate = nowCreate;
	}

	public long getMarriageId() {
		return marriageId;
	}

	public void setMarriageId(long marriageId) {
		this.marriageId = marriageId;
	}

	public int getSceneState() {
		return sceneState;
	}

	public void setSceneState(int sceneState) {
		this.sceneState = sceneState;
	}

	public long getSceneBoardDataUpdate() {
		return sceneBoardDataUpdate;
	}

	public void setSceneBoardDataUpdate(long sceneBoardDataUpdate) {
		this.sceneBoardDataUpdate = sceneBoardDataUpdate;
	}

	public int getReceiveGangVigor() {
		return receiveGangVigor;
	}

	public void setReceiveGangVigor(int receiveGangVigor) {
		this.receiveGangVigor = receiveGangVigor;
	}

	public int getReceiveGangVigorRefreshDay() {
		return receiveGangVigorRefreshDay;
	}

	public void setReceiveGangVigorRefreshDay(int receiveGangVigorRefreshDay) {
		this.receiveGangVigorRefreshDay = receiveGangVigorRefreshDay;
	}

	public long getIndoorGlod() {
		return indoorGlod;
	}

	public void setIndoorGlod(long indoorGlod) {
		this.indoorGlod = indoorGlod;
	}

	public long getIndoorGlodUse() {
		return indoorGlodUse;
	}

	public void setIndoorGlodUse(long indoorGlodUse) {
		this.indoorGlodUse = indoorGlodUse;
	}

	public long getIndoorGlodTemp() {
		return indoorGlodTemp;
	}

	public void setIndoorGlodTemp(long indoorGlodTemp) {
		this.indoorGlodTemp = indoorGlodTemp;
	}

	public int getIsIndoorAccount() {
		return isIndoorAccount;
	}

	public void setIsIndoorAccount(int isIndoorAccount) {
		this.isIndoorAccount = isIndoorAccount;
	}

	public long getIndoorGlodNotBind() {
		return indoorGlodNotBind;
	}

	public void setIndoorGlodNotBind(long indoorGlodNotBind) {
		this.indoorGlodNotBind = indoorGlodNotBind;
	}

	public long getIndoorGlodNotBindUse() {
		return indoorGlodNotBindUse;
	}

	public void setIndoorGlodNotBindUse(long indoorGlodNotBindUse) {
		this.indoorGlodNotBindUse = indoorGlodNotBindUse;
	}

	public long getIndoorGlodNotBindTemp() {
		return indoorGlodNotBindTemp;
	}

	public void setIndoorGlodNotBindTemp(long indoorGlodNotBindTemp) {
		this.indoorGlodNotBindTemp = indoorGlodNotBindTemp;
	}

	public int getIsOldPlayer() {
		return isOldPlayer;
	}

	public void setIsOldPlayer(int isOldPlayer) {
		this.isOldPlayer = isOldPlayer;
	}

	public int getFirstRechargeTime() {
		return firstRechargeTime;
	}

	public void setFirstRechargeTime(int firstRechargeTime) {
		this.firstRechargeTime = firstRechargeTime;
	}

	public int getRecentlyRechargeTime() {
		return recentlyRechargeTime;
	}

	public void setRecentlyRechargeTime(int recentlyRechargeTime) {
		this.recentlyRechargeTime = recentlyRechargeTime;
	}

	public long getTotalConsumeGlod() {
		return totalConsumeGlod;
	}

	public void setTotalConsumeGlod(long totalConsumeGlod) {
		this.totalConsumeGlod = totalConsumeGlod;
	}

	public long getTotalConsumeSilver() {
		return totalConsumeSilver;
	}

	public void setTotalConsumeSilver(long totalConsumeSilver) {
		this.totalConsumeSilver = totalConsumeSilver;
	}

	public List<Long> getHoutaiMail() {
		return houtaiMail;
	}

	public void setHoutaiMail(List<Long> houtaiMail) {
		this.houtaiMail = houtaiMail;
	}

	public List<Long> getHoutaiApplyMail() {
		return houtaiApplyMail;
	}

	public void setHoutaiApplyMail(List<Long> houtaiApplyMail) {
		this.houtaiApplyMail = houtaiApplyMail;
	}

	public int getSpecialType() {
		return specialType;
	}

	public void setSpecialType(int specialType) {
		this.specialType = specialType;
	}

	public int getOneDayConsmeNum() {
		return oneDayConsmeNum;
	}

	public void setOneDayConsmeNum(int oneDayConsmeNum) {
		this.oneDayConsmeNum = oneDayConsmeNum;
	}

	public int getOneDayConsume() {
		return oneDayConsume;
	}

	public void setOneDayConsume(int oneDayConsume) {
		this.oneDayConsume = oneDayConsume;
	}
	public int getOneDayRecharge() {
		return oneDayRecharge;
	}

	public void setOneDayRecharge(int oneDayRecharge) {
		this.oneDayRecharge = oneDayRecharge;
	}

	public long getInviteHid() {
		return inviteHid;
	}

	public void setInviteHid(long inviteHid) {
		this.inviteHid = inviteHid;
	}

	public int getAdState() {
		return adState;
	}

	public void setAdState(int adState) {
		this.adState = adState;
	}

	public int getAdMonitorType() {
		return adMonitorType;
	}

	public void setAdMonitorType(int adMonitorType) {
		this.adMonitorType = adMonitorType;
	}

	public int getAdTime() {
		return adTime;
	}

	public void setAdTime(int adTime) {
		this.adTime = adTime;
	}

	public Channel getCrossChannel() {
		return crossChannel;
	}

	public void setCrossChannel(Channel crossChannel) {
		this.crossChannel = crossChannel;
	}

	public Channel getLocalChannel() {
		return localChannel;
	}

	public void setLocalChannel(Channel localChannel) {
		this.localChannel = localChannel;
	}

	public int getCrossChannelSyncTime() {
		return crossChannelSyncTime;
	}

	public void setCrossChannelSyncTime(int crossChannelSyncTime) {
		this.crossChannelSyncTime = crossChannelSyncTime;
	}

	public Map<Integer, Map<Integer, Integer>> getLimitRec() {
		return limitRec;
	}

	public void setLimitRec(Map<Integer, Map<Integer, Integer>> limitRec) {
		this.limitRec = limitRec;
	}

	public long getTotalOnlineTime() {
		return totalOnlineTime;
	}

	public void setTotalOnlineTime(long totalOnlineTime) {
		this.totalOnlineTime = totalOnlineTime;
	}

	public int getDayOnlineTime() {
		return dayOnlineTime;
	}

	public void setDayOnlineTime(int dayOnlineTime) {
		this.dayOnlineTime = dayOnlineTime;
	}

	public void setNameZoneid(String nameZoneid) {
		this.nameZoneid = nameZoneid;
	}

	public void setTempVariables(TempVariables tempVariables) {
		this.tempVariables = tempVariables;
	}

	@Override
	public int compareTo(Hero o) {
		final long x = this.id;
		final long y = o.getId();
		if(x==y) return 0;
		return (x < y) ? -1 : 1;
	}
	
	public TempVariables getTempVariables() {
		if(tempVariables == null){
			tempVariables = new TempVariables();
		}
		return tempVariables;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	
	public String getNameZoneid() {
		if(nameZoneid==null || "".equals(nameZoneid)){
			Integer realZoneid = GameFunction.getRealZoneid(zoneid);
			if(realZoneid==null){
				return name;
			}else{
				nameZoneid = name + ".S" + realZoneid;
			}
		}
		return nameZoneid;
	}
	public void setName(String name) {
		if(name.indexOf(".S")>=0){
			name = name.substring(0, name.indexOf(".S"));
		}
		this.nameZoneid=null;
		this.name = name;
	}
	public int getLevel() {
		return level;
	}
	public void setLevel(int level) {
		this.level = level;
	}
	/**
	 * 当前职业
	 * nowjob=nowjob/1000;
	 */
	public int getJob() {
		return job;
	}
	public void setJob(int job) {
		this.job = job;
	}
	public int getCreateJob() {
		return createJob;
	}
	public void setCreateJob(int createJob) {
		this.createJob = createJob;
	}
	public int getRebornlv() {
		return rebornlv;
	}
	public void setRebornlv(int rebornlv) {
		this.rebornlv = rebornlv;
	}
	public List<Integer> getChongJiAwards() {
		return chongJiAwards;
	}
	public void setChongJiAwards(List<Integer> chongJiAwards) {
		this.chongJiAwards = chongJiAwards;
	}
	public int getMallJf() {
		return mallJf;
	}
	public void setMallJf(int mallJf) {
		this.mallJf = mallJf;
	}
	public int getKaiFuBiPinAwardsID() {
		return kaiFuBiPinAwardsID;
	}
	public void setKaiFuBiPinAwardsID(int kaiFuBiPinAwardsID) {
		this.kaiFuBiPinAwardsID = kaiFuBiPinAwardsID;
	}
	public int getHeroFubenTime() {
		return heroFubenTime;
	}
	public void setHeroFubenTime(int heroFubenTime) {
		this.heroFubenTime = heroFubenTime;
	}
	public int getHeroFubenGq() {
		return heroFubenGq;
	}
	public void setHeroFubenGq(int heroFubenGq) {
		this.heroFubenGq = heroFubenGq;
	}
	public int getZhanGong() {
		return zhanGong;
	}
	public void setZhanGong(int zhanGong) {
		this.zhanGong = zhanGong;
	}
	
	public int getIcon() {
		return icon;
	}
	public void setIcon(int icon) {
		this.icon = icon;
	}
	public int getFrame() {
		return frame;
	}
	public void setFrame(int frame) {
		this.frame = frame;
	}
	public int getTitleId() {
		TitleModel tModel = this.getTitleModel();
		if (tModel != null) {
			titleId = tModel.getWearTitleId();
		}
		return titleId;
	}
	public void setTitleId(int titleId) {
		this.titleId = titleId;
	}
	
	public boolean isCanSend(int cmd, Object[] data) {
		if (CrossZone.isCrossServer()) {
			return true;
		}
		if (isCanSend) {
			HeroFunction.getIns().sendWaitList(this);
//			HeroCache.countSecondCmd(cmd, id);
			return isCanSend;
		}
		if (NettyCache.passCmdSet.contains(cmd)) {
			if (cmd == HeroCmd.GC_LoadAlready_104) {
				isCanSend = true;
			}
			return true;
		} else {
			if (waitSendList == null) {
				return true;
			}
			waitSendList.add(new Object[] { cmd, data });
			return false;
		}

	}
	public void setCanSend(boolean isCanSend) {
		this.isCanSend = isCanSend;
	}
	public List<Object[]> getWaitSendList() {
		return waitSendList;
	}
	public void setWaitSendList(List<Object[]> waitSendList) {
		this.waitSendList = waitSendList;
	}
	public int getShowCountry() {
		return showCountry;
	}
	public void setShowCountry(int showCountry) {
		this.showCountry = showCountry;
	}
	public HashMap<Object, Object> getSceneShowData() {
		return sceneShowData;
	}
	public void setSceneShowData(HashMap<Object, Object> sceneShowData) {
		this.sceneShowData = sceneShowData;
//		List a = new ArrayList<>();
	}
	@Override
	public String toString() {
		return "Hero [id=" + id + ", name=" + name + ", level=" + level + ", job=" + job + ", sex=" + sex + ", zoneid=" + zoneid + ", gangId=" + gangId + ", gangName=" + gangName + "]";
	}
	public int getAutoFight() {
		return autoFight;
	}
	public void setAutoFight(int autoFight) {
		this.autoFight = autoFight;
	}
	public Map<Integer, Integer> getBrothRewards() {
		return brothRewards;
	}
	public void setBrothRewards(Map<Integer, Integer> brothRewards) {
		this.brothRewards = brothRewards;
	}
	public Set<Integer> getOpenSysReward() {
		return openSysReward;
	}
	public void setOpenSysReward(Set<Integer> openSysReward) {
		this.openSysReward = openSysReward;
	}
	public int getCountryType() {
		return countryType;
	}
	public void setCountryType(int countryType) {
		this.countryType = countryType;
	}
	public int getFrAwardsState() {
		return frAwardsState;
	}
	public void setFrAwardsState(int frAwardsState) {
		this.frAwardsState = frAwardsState;
	}
	public int getSuccessPayNum() {
		return successPayNum;
	}
	public void setSuccessPayNum(int successPayNum) {
		this.successPayNum = successPayNum;
	}
	public Map<Integer, long[][]> getFightAttrBySysid() {
		return fightAttrBySysid;
	}
	public void setFightAttrBySysid(Map<Integer, long[][]> fightAttrBySysid) {
		this.fightAttrBySysid = fightAttrBySysid;
	}
	public Set<Integer> getRechargeGrade() {
		return rechargeGrade;
	}
	public void setRechargeGrade(Set<Integer> rechargeGrade) {
		this.rechargeGrade = rechargeGrade;
	}
	public Map<Integer, Integer> getFirstRechargeAward() {
		return firstRechargeAward;
	}
	public void setFirstRechargeAward(Map<Integer, Integer> firstRechargeAward) {
		this.firstRechargeAward = firstRechargeAward;
	}
	public int getAwardsCreateHero() {
		return awardsCreateHero;
	}
	public void setAwardsCreateHero(int awardsCreateHero) {
		this.awardsCreateHero = awardsCreateHero;
	}
	public int getBeforeTime() {
		return beforeTime;
	}
	public void setBeforeTime(int beforeTime) {
		this.beforeTime = beforeTime;
	}
	public Scene getScene() {
		return scene;
	}
	public void setScene(Scene scene) {
		this.scene = scene;
	}
	public String getNoticestr() {
		return noticestr;
	}
	public void setNoticestr(String noticestr) {
		this.noticestr = noticestr;
	}
	public int getFirstRechargeCloseUITime() {
		return firstRechargeCloseUITime;
	}
	public void setFirstRechargeCloseUITime(int firstRechargeCloseUITime) {
		this.firstRechargeCloseUITime = firstRechargeCloseUITime;
	}
	public int getBeforeTaskId() {
		return beforeTaskId;
	}
	public void setBeforeTaskId(int beforeTaskId) {
		this.beforeTaskId = beforeTaskId;
	}
	public HashMap<Integer,Integer> getActIds() {
		return actIds;
	}
	public void setActIds(HashMap<Integer,Integer> actIds) {
		this.actIds = actIds;
	}
	public long getDestinyExp() {
		return destinyExp;
	}
	public void setDestinyExp(long destinyExp) {
		this.destinyExp = destinyExp;
	}
	public long getZcBossJf() {
		return zcBossJf;
	}
	public void setZcBossJf(long zcBossJf) {
		this.zcBossJf = zcBossJf;
	}
	public List<Integer> getOneDayEveryIndexRechargeList() {
		return oneDayEveryIndexRechargeList;
	}
	public void setOneDayEveryIndexRechargeList(List<Integer> oneDayEveryIndexRechargeList) {
		this.oneDayEveryIndexRechargeList = oneDayEveryIndexRechargeList;
	}
	public Set<Integer> getEndUidSet() {
		return endUidSet;
	}
	public void setEndUidSet(Set<Integer> endUidSet) {
		this.endUidSet = endUidSet;
	}
	public Set<Integer> getGiftTaskIds() {
		return giftTaskIds;
	}
	public void setGiftTaskIds(Set<Integer> giftTaskIds) {
		this.giftTaskIds = giftTaskIds;
	}
	public String getUsesys() {
		return usesys;
	}
	public void setUsesys(String usesys) {
		this.usesys = usesys;
	}
	public long getShareCoin() {
		return shareCoin;
	}
	public void setShareCoin(long shareCoin) {
		this.shareCoin = shareCoin;
	}
	public Map<Long, SpecialRechargeInfo> getWaitRechargeMap() {
		return waitRechargeMap;
	}
	public void setWaitRechargeMap(Map<Long, SpecialRechargeInfo> waitRechargeMap) {
		this.waitRechargeMap = waitRechargeMap;
	}
	public int getReincarnationLevel() {
		return reincarnationLevel;
	}
	public void setReincarnationLevel(int reincarnationLevel) {
		this.reincarnationLevel = reincarnationLevel;
	}
	public int getRealLevel() {
		int totalAddLevel = 0;
		try {
			List<Struct_lunhui_274> sortList = Config_lunhui_274.getIns().getSortList();
			int nowReincarnationLevel = getReincarnationLevel();
			if(nowReincarnationLevel>0) {
				for(int i=nowReincarnationLevel;i>0;i--) {
					totalAddLevel += sortList.get(i-1).getLv();
				}
			}
		} catch (Exception e) {
			LogTool.info("Hero getRealLevel", this);
		}
		realLevel = getLevel() + totalAddLevel;
		return realLevel;
	}
	public void setRealLevel(int realLevel) {
		this.realLevel = realLevel;
	}

	
}
