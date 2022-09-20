package com.teamtop.system.hero;

import java.util.HashMap;
import java.util.Map;

import com.teamtop.system.LoginLuxuryGifts.model.LoginLuxuryGifts;
import com.teamtop.system.achievement.model.Achievement;
import com.teamtop.system.actGift.model.ActGift;
import com.teamtop.system.activity.model.HeroActivityData;
import com.teamtop.system.antiAddictionSystem.model.AntiAddictionModel;
import com.teamtop.system.archive.model.ArchiveData;
import com.teamtop.system.bag.Bag;
import com.teamtop.system.baoWuXianShi.BaoWuXianShi;
import com.teamtop.system.battleVixens.model.BattleVixens;
import com.teamtop.system.bingfa.BingFa;
import com.teamtop.system.boss.Boss;
import com.teamtop.system.boss.countryBoss.CountryBoss;
import com.teamtop.system.boss.qmboss.QMBossHero;
import com.teamtop.system.boss.specialAnimalBoss.model.SpecialAnimalBossData;
import com.teamtop.system.cdkey.model.CDkey;
import com.teamtop.system.chat.Chat;
import com.teamtop.system.chuangGuanYouLi.model.ChuangGuanYouLi;
import com.teamtop.system.collectTreasury.model.CollectTreasury;
import com.teamtop.system.commonData.CommonData;
import com.teamtop.system.country.model.CountryData;
import com.teamtop.system.country.newkingship.NewKingWar;
import com.teamtop.system.crossAttackCity.model.AttackCityLocal;
import com.teamtop.system.crossBoss.model.CrossBoss;
import com.teamtop.system.crossDynastyWarriors.model.DynastyWarriorsModel;
import com.teamtop.system.crossFireBeacon.model.FireBeacon;
import com.teamtop.system.crossHeroesList.model.HeroesListData;
import com.teamtop.system.crossKing.local.CrossKing;
import com.teamtop.system.crossMine.model.CrossMineLocal;
import com.teamtop.system.crossRebornFB.model.RebornFBLocal;
import com.teamtop.system.crossSJMiJing.model.CrossSJMiJing;
import com.teamtop.system.crossSelectKing.local.CrossSelectKingLocal;
import com.teamtop.system.crossSoloRun.model.SoloRunModel;
import com.teamtop.system.crossTeamFuBen.model.CrossTeamFuBen;
import com.teamtop.system.crossTeamKing.local.CrossTeamKingLocal;
import com.teamtop.system.crossTrial.model.TrialModel;
import com.teamtop.system.crossWenDingTianXia.model.CrossWenDingTianXia;
import com.teamtop.system.crossZhuLu.model.QunXiongZhuLu;
import com.teamtop.system.dailyDirectBuy.model.DailyDirectBuy;
import com.teamtop.system.daytask.DayTask;
import com.teamtop.system.dengFengZaoJi.model.DengFengZaoJi;
import com.teamtop.system.destiny.model.PersonalDestiny;
import com.teamtop.system.discountStore.model.DiscountStore;
import com.teamtop.system.eightDoor.EightDoor;
import com.teamtop.system.eightDoorAppraiseRank.model.EightDoorAppraiseRank;
import com.teamtop.system.equip.model.EquipData;
import com.teamtop.system.equip.model.ShengEquipClear;
import com.teamtop.system.excalibur.model.Excalibur;
import com.teamtop.system.exclusiveActivity.model.ExclusiveActivityData;
import com.teamtop.system.extraValueGiftBag.model.ExtraValueGiftBag;
import com.teamtop.system.fashionClothes.FashionClothes;
import com.teamtop.system.forge.model.Forge;
import com.teamtop.system.friends.model.Friend;
import com.teamtop.system.generalSoul.model.GeneralSoul;
import com.teamtop.system.godGenSendGift.model.GodGenSendGift;
import com.teamtop.system.godOfWar.model.GodOfWar;
import com.teamtop.system.godWeapon.GodWeapon;
import com.teamtop.system.godbook.GodBook;
import com.teamtop.system.guanQiaHelp.GuanQiaHelp;
import com.teamtop.system.guanqia.Guanqia;
import com.teamtop.system.guardArea.model.GuardAreaLocal;
import com.teamtop.system.hiddentreasure.model.HiddenTreasureModel;
import com.teamtop.system.house.houseKeeper.model.HouseKeeper;
import com.teamtop.system.house.maid.model.Maid;
import com.teamtop.system.house.yard.model.LocalHouse;
import com.teamtop.system.houseShopTask.HouseShopTask;
import com.teamtop.system.huoShaoChiBi.HuoShaoChiBi;
import com.teamtop.system.hyperPointGeneralSys.model.HyperPointGeneralSys;
import com.teamtop.system.linglongge.model.LingLongGe;
import com.teamtop.system.littleLeader.LittleLeader;
import com.teamtop.system.liuChuQiShan.model.LiuChuQiShan;
import com.teamtop.system.longZhongDui.model.LongZhongDui;
import com.teamtop.system.lvBuRising.model.LvBuRisingModel;
import com.teamtop.system.material.baodi.GiftBaodiData;
import com.teamtop.system.materialFuben.MaterialFuben;
import com.teamtop.system.monsterSpirit.model.MonsterSpiritModel;
import com.teamtop.system.mount.Mount;
import com.teamtop.system.openDaysSystem.model.HeroOpenDaysSysData;
import com.teamtop.system.overCallbackCLSe.model.OverCallbackCLSe;
import com.teamtop.system.overCallbackYBSe.model.OverCallbackYBSe;
import com.teamtop.system.peacockFloor.PeacockFloor;
import com.teamtop.system.promotion.model.PromotionModel;
import com.teamtop.system.push.Push;
import com.teamtop.system.qice.model.QiCe;
import com.teamtop.system.qiceDraw.model.QiCeDraw;
import com.teamtop.system.quickBuy.model.QuickBuyModel;
import com.teamtop.system.rechargeFeedback.moel.RechargeFeedback;
import com.teamtop.system.redBox.RedBox;
import com.teamtop.system.redPoint.model.RedPointData;
import com.teamtop.system.reincarnationGodfate.model.ReincarnationGodFate;
import com.teamtop.system.restrictedAccess.RestrictedAccess;
import com.teamtop.system.rewardBack.model.RewardBack;
import com.teamtop.system.runningMan.RunningMan;
import com.teamtop.system.saintMonsterTreasureSystem.model.SaintMonsterTreasureModel;
import com.teamtop.system.searchAnimals.model.SearchAnimals;
import com.teamtop.system.sevenAwayRecharge.SevenAwayRecharge;
import com.teamtop.system.sevenContinuousConsume.SevenContinuousConsume;
import com.teamtop.system.sevenDayLogin.model.SevenDayLogin;
import com.teamtop.system.sevenDayRecharge.SevenDayRecharge;
import com.teamtop.system.sevenFightToLast.SevenFightToLast;
import com.teamtop.system.sevenGroupBuy.SevenGroupBuy;
import com.teamtop.system.sevenHappy.SevenHappy;
import com.teamtop.system.sevenOneRecharge.SevenOneRecharge;
import com.teamtop.system.sevenWuShenRank.SevenWuShenRank;
import com.teamtop.system.shaozhuEscort.model.ShaoZhuEscort;
import com.teamtop.system.shaozhuQiYuanRank.model.ShaoZhuQiYuanRank;
import com.teamtop.system.shaozhuqiyuan.ShaoZhuQiYuan;
import com.teamtop.system.shop.model.ShopData;
import com.teamtop.system.showReward.ShowReward;
import com.teamtop.system.signIn.model.SignIn;
import com.teamtop.system.sixWay.SixWay;
import com.teamtop.system.skill.model.Skill;
import com.teamtop.system.specialAnimalDir.model.SpecialAnimalDir;
import com.teamtop.system.specialTreasure.SpecialTreasure;
import com.teamtop.system.talent.model.Talent;
import com.teamtop.system.taoyuanSworn.model.Sworn;
import com.teamtop.system.task.TaskUser;
import com.teamtop.system.threeHeroFightLvBu.model.ThreeHeroFightLvBu;
import com.teamtop.system.tigerPass.model.TigerPass;
import com.teamtop.system.title.TitleModel;
import com.teamtop.system.totalRecharge.model.TotalRechargeSys;
import com.teamtop.system.treasure.model.TreasureData;
import com.teamtop.system.treasury.model.Treasury;
import com.teamtop.system.trueName.model.TrueNameModel;
import com.teamtop.system.upLvShop.model.UpLvShop;
import com.teamtop.system.vip.model.VipData;
import com.teamtop.system.wanyuanhongbao.model.WanyuanHongbao;
import com.teamtop.system.weekCard.model.WeekCardModel;
import com.teamtop.system.weiXinShare.model.WeiXinShare;
import com.teamtop.system.wujiang.WuJiang;
import com.teamtop.system.xuTianHunt.model.XuTianHuntModel;
import com.teamtop.system.zcBoss.ZcBossHero;
import com.teamtop.system.zhanjia.ZhanJia;
import com.teamtop.system.zhenYan.ZhenYan;
import com.teamtop.system.zhuJiangYanWu.ZhuJiangYanWu;
import com.teamtop.util.cache.CacheModel;

/**
 * 角色相关联的系统实体类
 * 
 * @author Administrator
 *
 */
public class HeroExt extends CacheModel {
	/** 角色背包数据 */
	private Bag bag;
	/** 聊天 */
	private Chat chat;
	/** 好友 */
	private Friend friend;
	/** 锻造 */
	private Forge forge;
	/** 关卡 */
	private Guanqia guanqia;
	/** 技能 */
	private Skill skill;
	/** 称号 */
	private TitleModel titleModel;
	/** 武将 **/
	private WuJiang wujiang;
	/** 战甲 **/
	private ZhanJia zhanJia;
	/** 图鉴 */
	private ArchiveData archiveData;
	/** 神剑 */
	private Excalibur excalibur;
	/** 兵法 **/
	private BingFa bingfa;
	/** 天书 **/
	private GodBook godbook;
	/** 宝物 */
	private TreasureData treasureData;
	/** 异宝 **/
	private SpecialTreasure specialTreasure;
	/** 将魂 */
	private GeneralSoul generalSoul;
	/** 每日任务 **/
	private DayTask dayTask;
	/** 商城（商店） */
	private ShopData shopData;
	/** boss系统（包含：个人boss） */
	private Boss boss;
	/** 铜雀台 **/
	private PeacockFloor peacockFloor;
	/** 一骑当千 */
	private BattleVixens battleVixens;
	/** 三国战神 */
	private GodOfWar godOfWar;
	/** 全民boss **/
	private QMBossHero qmBossHero;
	/** 材料副本 **/
	private MaterialFuben materialFuben;
	/** 过关斩将 **/
	private RunningMan runningMan;
	/** 国家数据 **/
	private CountryData countryData;
	/** * 跨服boss七擒孟获次数 */
	private CrossBoss crossBoss;
	/** (跨服)单刀赴会 */
	private SoloRunModel soloRunModel;
	/** (跨服)三国无双 */
	private DynastyWarriorsModel dynastyWarriorsModel;
	/** 晋升 */
	private PromotionModel promotionModel;
	/** vip数据 */
	private VipData vipData;
	/** 群英榜数据 */
	private HeroesListData heroesListData;
	/** 个人活动数据 */
	private HeroActivityData heroActivityData;
	/** 专属活动数据*/
	private ExclusiveActivityData exclusiveActivityData;

	/** 系统特殊状态（登录发送用） */
	private Map<Integer, Integer> systemStateMap = new HashMap<>();
	/** (跨服王者)乱世枭雄 **/
	private CrossKing crossKing;
	/** 七日登录 **/
	private SevenDayLogin sevenDayLogin;
	/** 隆中对 **/
	private LongZhongDui longZhongDui;
	/** 宝库 **/
	private Treasury treasury;
	/** 聚宝盆 **/
	private CollectTreasury collectTreasury;
	/** 枭雄争霸本地 **/
	private CrossSelectKingLocal crossSelectKingLocal;
	/** 签到 **/
	private SignIn signIn;
	/** 激活码 **/
	private CDkey cdkey;
	/** 玲珑阁 **/
	private LingLongGe linglongge;
	/** 七日武圣榜 **/
	private SevenWuShenRank sevenWuShenRank;
	/** 开服狂欢 **/
	private SevenHappy sevenHappy;
	/** 红点数据（不保存入库） */
	private RedPointData redPointData;
	/** 任务 **/
	private TaskUser taskUser;
	/** 折扣商店 **/
	private DiscountStore discountStore;
	/** 分享奖励状态 **/
	private ShowReward showReward;
	/** 装备 **/
	private EquipData equipData;
	/** 吕布降临 */
	private LvBuRisingModel lvBuRisingModel;
	/** 开服7日累计充值 **/
	private SevenAwayRecharge sevenAwayRecharge;
	/** 血战到底 **/
	private SevenFightToLast sevenFightToLast;
	/** 藏宝阁 */
	private HiddenTreasureModel hiddenTreasureModel;
	/** 七日团购 **/
	private SevenGroupBuy sevenGroupBuy;
	/** 登录豪礼（开服7天） */
	private LoginLuxuryGifts loginLuxuryGifts;
	/** 超值材料返利（开服7天） */
	private OverCallbackCLSe overCallbackCLSe;
	/** 超值元宝返利（开服7天） */
	private OverCallbackYBSe overCallbackYBSe;
	/** 七日每日累充 **/
	private SevenDayRecharge sevenDayRecharge;
	/** 七日单笔累充 **/
	private SevenOneRecharge sevenOneRecharge;
	/** 七日连续累充 **/
	private SevenContinuousConsume sevenContinuousConsume;
	/** 国家boss **/
	private CountryBoss countryBoss;
	/** 跨服组队 **/
	private CrossTeamFuBen crossTeamFuBen;
	/** 时装 **/
	private FashionClothes fashionClothes;
	/** 烽火狼烟 */
	private FireBeacon fireBeacon;
	/** 周卡 */
	private WeekCardModel weekCardModel;
	/** 个人开启天数控制系统数据 */
	private HeroOpenDaysSysData heroOpenDaysSysData;
	/** 新兽灵 */
	private MonsterSpiritModel monsterSpiritModel;
	/** 实名验证 */
	private TrueNameModel trueNameModel;
	/** 防沉迷系统 */
	private AntiAddictionModel antiAddictionModel;
	/** 每日直购 **/
	private DailyDirectBuy dailyDirectBuy;
	/** 升阶秘境 **/
	private CrossSJMiJing crossSJMiJing;
	/** 宝物现世 **/
	private BaoWuXianShi baoWuXianShi;
	/** 闯关有礼 **/
	private ChuangGuanYouLi chuangGuanYouLi;
	/** 问鼎天下 **/
	private CrossWenDingTianXia crossWenDingTianXia;
	/** 累计充值(系统) **/
	private TotalRechargeSys totalRechargeSys;
	/** 超级点将(系统) **/
	private HyperPointGeneralSys hyperPointGeneralSys;
	/** 累冲回馈 **/
	private RechargeFeedback rechargeFeedback;
	/** 小系统只有一两个字段的存储类 **/
	private CommonData commonData;
	/** 八阵图 **/
	private PersonalDestiny personalDestiny;
	/** 八门金锁 **/
	private EightDoor eightDoor;
	/** 升阶商店 **/
	private UpLvShop upLvShop;
	/** 限制获取监控 **/
	private RestrictedAccess restrictedAccess;
	/** 诸将演武 **/
	private ZhuJiangYanWu zhuJiangYanWu;
	/** 战场boss商店积分 **/
	private ZcBossHero zcBossHero;
	/** 神装洗练 **/
	private ShengEquipClear shengEquipClear;
	/** 神将送礼 **/
	private GodGenSendGift godGenSendGift;
	/** 快速购买 */
	private QuickBuyModel quickBuyModel;
	/** 礼包保底*/
	private GiftBaodiData giftBaodiData;
	/** 圣兽寻宝系统 */
	private SaintMonsterTreasureModel saintMonsterTreasureModel;
	/** 奖励找回 */
	private RewardBack rewardBack;
	/** 新王位之争（个人） **/
	private NewKingWar newKingWar;
	/** 小主 **/
	private LittleLeader littleLeader;
	/** 少主祈愿 **/
	private ShaoZhuQiYuan shaozhuqiyuan;
	/** 关卡求助 **/
	private GuanQiaHelp guanqiahelp;
	/** 跨服矿藏 **/
	private CrossMineLocal crossMineLocal;
	/** 八门金锁-鉴定排名 **/
	private EightDoorAppraiseRank eightDoorAppraiseRank;
	/** 少年英主-祈愿排名 **/
	private ShaoZhuQiYuanRank shaoZhuQiYuanRank;
	/** 推送活动 **/
	private Push push;
	/** 微信分享 **/
	private WeiXinShare weixinshare;
	/**专属神兵系统id**/
	private GodWeapon godWeapon;
	/** 少主护送 **/
	private ShaoZhuEscort shaozhuEscort;
	/** 火烧赤壁 **/
	private HuoShaoChiBi huoShaoChiBi;
	/** 六出祁山 **/
	private LiuChuQiShan liuChuQiShan;
	/** 异兽录 **/
	private SpecialAnimalDir specialAnimalDir;
	/** 虎牢关**/
	private TigerPass tigerPass;
	/** 仙山寻兽 **/
	private SearchAnimals searchAnimals;
	/** 异兽boss*/
	private SpecialAnimalBossData specialAnimalBossData;
	/** 修炼天赋 **/
	private Talent talent;
	/** 群雄逐鹿 **/
	private QunXiongZhuLu qunXiongZhuLu;
	/** 三英战吕布**/
	private ThreeHeroFightLvBu threeHeroFightLvBu;
	/** 奇策 **/
	private QiCe qiCe;
	/** 出谋策划 **/
	private QiCeDraw qiCeDraw;
	/** 阵眼 **/
	private ZhenYan zhenYan;
	/** 桃园结义 **/
	private Sworn sworn;
	/** 成就 **/
	private Achievement achievement;
	/** 跨服试炼*/
	private TrialModel trialModel;
	/** 限时礼包 **/
	private ActGift actGift;
	/** 轮回-天命 **/
	private ReincarnationGodFate godFate;
	/** 坐骑*/
	private Mount mount;
	/**跨服王者**/
	private CrossTeamKingLocal crossTeamKingLocal;
	/** 镇守四方 **/
	private GuardAreaLocal guardAreaLocal;
	/** 府邸系统 **/
	private LocalHouse localHouse;
	/**房屋商店任务**/
	private HouseShopTask houseShopTask;
	/** 许田围猎*/
	private XuTianHuntModel xuTianHuntModel;
	/** 额外货币记录*/
	private HeroCurrencies heroCurrencies;
	/**
	 * 红包系统
	 */
	private RedBox redBox;
	/** 登峰造极*/
	private DengFengZaoJi dengFengZaoJi;
	/** 轮回副本*/
	private RebornFBLocal rebornFBLocal;
	/** 侍女系统 **/
	private Maid maid;
	/** 家丁系统 **/
	private HouseKeeper houseKeeper;
	/**
	 * 六道
	 */
	private SixWay sixWay;
	/** 攻城拔寨 **/
	private AttackCityLocal attackCityLocal;
	
	/** 万元红包 **/
	private WanyuanHongbao wanyuanHongbao;
	
	private ExtraValueGiftBag extraValueGiftBag;

	public AttackCityLocal getAttackCityLocal() {
		return attackCityLocal;
	}

	public void setAttackCityLocal(AttackCityLocal attackCityLocal) {
		this.attackCityLocal = attackCityLocal;
	}

	public DengFengZaoJi getDengFengZaoJi() {
		return dengFengZaoJi;
	}

	public void setDengFengZaoJi(DengFengZaoJi dengFengZaoJi) {
		this.dengFengZaoJi = dengFengZaoJi;
	}

	public Maid getMaid() {
		return maid;
	}

	public void setMaid(Maid maid) {
		this.maid = maid;
	}

	public HouseKeeper getHouseKeeper() {
		return houseKeeper;
	}

	public void setHouseKeeper(HouseKeeper houseKeeper) {
		this.houseKeeper = houseKeeper;
	}

	public Mount getMount() {
		return mount;
	}

	public void setMount(Mount mount) {
		this.mount = mount;
	}

	public Sworn getSworn() {
		return sworn;
	}

	public void setSworn(Sworn sworn) {
		this.sworn = sworn;
	}

	public ActGift getActGift() {
		return actGift;
	}

	public void setActGift(ActGift actGift) {
		this.actGift = actGift;
	}

	public Achievement getAchievement() {
		return achievement;
	}

	public void setAchievement(Achievement achievement) {
		this.achievement = achievement;
	}

	public QiCe getQiCe() {
		return qiCe;
	}

	public void setQiCe(QiCe qiCe) {
		this.qiCe = qiCe;
	}

	public QiCeDraw getQiCeDraw() {
		return qiCeDraw;
	}

	public void setQiCeDraw(QiCeDraw qiCeDraw) {
		this.qiCeDraw = qiCeDraw;
	}

	public Talent getTalent() {
		return talent;
	}

	public void setTalent(Talent talent) {
		this.talent = talent;
	}

	public LiuChuQiShan getLiuChuQiShan() {
		return liuChuQiShan;
	}

	public void setLiuChuQiShan(LiuChuQiShan liuChuQiShan) {
		this.liuChuQiShan = liuChuQiShan;
	}

	public HuoShaoChiBi getHuoShaoChiBi() {
		return huoShaoChiBi;
	}

	public void setHuoShaoChiBi(HuoShaoChiBi huoShaoChiBi) {
		this.huoShaoChiBi = huoShaoChiBi;
	}

	public Push getPush() {
		return push;
	}

	public void setPush(Push push) {
		this.push = push;
	}

	public Chat getChat() {
		return chat;
	}

	public void setChat(Chat chat) {
		this.chat = chat;
	}

	public EquipData getEquipData() {
		return equipData;
	}

	public void setEquipData(EquipData equipData) {
		this.equipData = equipData;
	}

	public Bag getBag() {
		return bag;
	}

	public void setBag(Bag bag) {
		this.bag = bag;
	}

	public Friend getFriend() {
		return friend;
	}

	public void setFriend(Friend friend) {
		this.friend = friend;
	}

	public Forge getForge() {
		return forge;
	}

	public void setForge(Forge forge) {
		this.forge = forge;
	}

	public Guanqia getGuanqia() {
		return guanqia;
	}

	public void setGuanqia(Guanqia guanqia) {
		this.guanqia = guanqia;
	}

	public int getCurGuanqia() {
		if (this.guanqia != null) {
			return this.guanqia.getCurGuanqia();
		}
		return 0;
	}

	public Skill getSkill() {
		return skill;
	}

	public void setSkill(Skill skill) {
		this.skill = skill;
	}

	public TitleModel getTitleModel() {
		return titleModel;
	}

	public void setTitleModel(TitleModel titleModel) {
		this.titleModel = titleModel;
	}

	public WuJiang getWujiang() {
		return wujiang;
	}

	public void setWujiang(WuJiang wujiang) {
		this.wujiang = wujiang;
	}

	public ZhanJia getZhanJia() {
		return zhanJia;
	}

	public void setZhanJia(ZhanJia zhanJia) {
		this.zhanJia = zhanJia;
	}

	public ArchiveData getArchiveData() {
		return archiveData;
	}

	public void setArchiveData(ArchiveData archiveData) {
		this.archiveData = archiveData;
	}

	public Excalibur getExcalibur() {
		return excalibur;
	}

	public void setExcalibur(Excalibur excalibur) {
		this.excalibur = excalibur;
	}

	public int getExcaliburId() {
		if (this.excalibur != null) {
			return excalibur.getWearExcaliburId();
		}
		return 0;
	}

	public BingFa getBingfa() {
		return bingfa;
	}

	public void setBingfa(BingFa bingfa) {
		this.bingfa = bingfa;
	}

	public SevenDayLogin getSevenDayLogin() {
		return sevenDayLogin;
	}

	public void setSevenDayLogin(SevenDayLogin sevenDayLogin) {
		this.sevenDayLogin = sevenDayLogin;
	}

	public GodBook getGodbook() {
		return godbook;
	}

	public void setGodbook(GodBook godbook) {
		this.godbook = godbook;
	}

	public TreasureData getTreasureData() {
		return treasureData;
	}

	public void setTreasureData(TreasureData treasureData) {
		this.treasureData = treasureData;
	}

	public SpecialTreasure getSpecialTreasure() {
		return specialTreasure;
	}

	public void setSpecialTreasure(SpecialTreasure specialTreasure) {
		this.specialTreasure = specialTreasure;
	}

	public GeneralSoul getGeneralSoul() {
		return generalSoul;
	}

	public void setGeneralSoul(GeneralSoul generalSoul) {
		this.generalSoul = generalSoul;
	}

	public DayTask getDayTask() {
		return dayTask;
	}

	public void setDayTask(DayTask dayTask) {
		this.dayTask = dayTask;
	}

	public ShopData getShopData() {
		return shopData;
	}

	public void setShopData(ShopData shopData) {
		this.shopData = shopData;
	}

	public Boss getBoss() {
		return boss;
	}

	public void setBoss(Boss boss) {
		this.boss = boss;
	}

	public PeacockFloor getPeacockFloor() {
		return peacockFloor;
	}

	public void setPeacockFloor(PeacockFloor peacockFloor) {
		this.peacockFloor = peacockFloor;
	}

	public QMBossHero getQmBossHero() {
		return qmBossHero;
	}

	public void setQmBossHero(QMBossHero qmBossHero) {
		this.qmBossHero = qmBossHero;
	}

	public BattleVixens getBattleVixens() {
		return battleVixens;
	}

	public void setBattleVixens(BattleVixens battleVixens) {
		this.battleVixens = battleVixens;
	}

	public CountryData getCountryData() {
		return countryData;
	}

	public void setCountryData(CountryData countryData) {
		this.countryData = countryData;
	}

	public GodOfWar getGodOfWar() {
		return godOfWar;
	}

	public void setGodOfWar(GodOfWar godOfWar) {
		this.godOfWar = godOfWar;
	}

	public MaterialFuben getMaterialFuben() {
		return materialFuben;
	}

	public void setMaterialFuben(MaterialFuben materialFuben) {
		this.materialFuben = materialFuben;
	}

	public RunningMan getRunningMan() {
		return runningMan;
	}

	public void setRunningMan(RunningMan runningMan) {
		this.runningMan = runningMan;
	}

	public CrossBoss getCrossBoss() {
		return crossBoss;
	}

	public void setCrossBoss(CrossBoss crossBoss) {
		this.crossBoss = crossBoss;
	}

	public SoloRunModel getSoloRunModel() {
		return soloRunModel;
	}

	public void setSoloRunModel(SoloRunModel soloRunModel) {
		this.soloRunModel = soloRunModel;
	}

	public CrossKing getCrossKing() {
		return crossKing;
	}

	public void setCrossKing(CrossKing crossKing) {
		this.crossKing = crossKing;
	}

	public DynastyWarriorsModel getDynastyWarriorsModel() {
		return dynastyWarriorsModel;
	}

	public void setDynastyWarriorsModel(DynastyWarriorsModel dynastyWarriorsModel) {
		this.dynastyWarriorsModel = dynastyWarriorsModel;
	}

	public PromotionModel getPromotionModel() {
		return promotionModel;
	}

	public void setPromotionModel(PromotionModel promotionModel) {
		this.promotionModel = promotionModel;
	}

	public Map<Integer, Integer> getSystemStateMap() {
		return systemStateMap;
	}

	public void setSystemStateMap(Map<Integer, Integer> systemStateMap) {
		this.systemStateMap = systemStateMap;
	}

	public LongZhongDui getLongZhongDui() {
		return longZhongDui;
	}

	public void setLongZhongDui(LongZhongDui longZhongDui) {
		this.longZhongDui = longZhongDui;
	}

	public Treasury getTreasury() {
		return treasury;
	}

	public void setTreasury(Treasury treasury) {
		this.treasury = treasury;
	}

	public CollectTreasury getCollectTreasury() {
		return collectTreasury;
	}

	public void setCollectTreasury(CollectTreasury collectTreasury) {
		this.collectTreasury = collectTreasury;
	}

	public VipData getVipData() {
		return vipData;
	}

	public void setVipData(VipData vipData) {
		this.vipData = vipData;
	}

	public CrossSelectKingLocal getCrossSelectKingLocal() {
		return crossSelectKingLocal;
	}

	public void setCrossSelectKingLocal(CrossSelectKingLocal crossSelectKingLocal) {
		this.crossSelectKingLocal = crossSelectKingLocal;
	}

	public SignIn getSignIn() {
		return signIn;
	}

	public void setSignIn(SignIn signIn) {
		this.signIn = signIn;
	}

	public CDkey getCdkey() {
		return cdkey;
	}

	public void setCdkey(CDkey cdkey) {
		this.cdkey = cdkey;
	}

	public HeroesListData getHeroesListData() {
		return heroesListData;
	}

	public void setHeroesListData(HeroesListData heroesListData) {
		this.heroesListData = heroesListData;
	}

	public HeroActivityData getHeroActivityData() {
		return heroActivityData;
	}

	public void setHeroActivityData(HeroActivityData heroActivityData) {
		this.heroActivityData = heroActivityData;
	}

	public ExclusiveActivityData getExclusiveActivityData() {
		return exclusiveActivityData;
	}

	public void setExclusiveActivityData(ExclusiveActivityData exclusiveActivityData) {
		this.exclusiveActivityData = exclusiveActivityData;
	}

	public LingLongGe getLinglongge() {
		return linglongge;
	}

	public void setLinglongge(LingLongGe linglongge) {
		this.linglongge = linglongge;
	}

	public SevenWuShenRank getSevenWuShenRank() {
		return sevenWuShenRank;
	}

	public void setSevenWuShenRank(SevenWuShenRank sevenWuShenRank) {
		this.sevenWuShenRank = sevenWuShenRank;
	}

	public SevenHappy getSevenHappy() {
		return sevenHappy;
	}

	public void setSevenHappy(SevenHappy sevenHappy) {
		this.sevenHappy = sevenHappy;
	}

	public RedPointData getRedPointData() {
		return redPointData;
	}

	public void setRedPointData(RedPointData redPointData) {
		this.redPointData = redPointData;
	}

	public TaskUser getTaskUser() {
		return taskUser;
	}

	public void setTaskUser(TaskUser taskUser) {
		this.taskUser = taskUser;
	}

	public DiscountStore getDiscountStore() {
		return discountStore;
	}

	public void setDiscountStore(DiscountStore discountStore) {
		this.discountStore = discountStore;
	}

	public ShowReward getShowReward() {
		return showReward;
	}

	public void setShowReward(ShowReward showReward) {
		this.showReward = showReward;
	}

	public LvBuRisingModel getLvBuRisingModel() {
		return lvBuRisingModel;
	}

	public void setLvBuRisingModel(LvBuRisingModel lvBuRisingModel) {
		this.lvBuRisingModel = lvBuRisingModel;
	}

	public SevenAwayRecharge getSevenAwayRecharge() {
		return sevenAwayRecharge;
	}

	public void setSevenAwayRecharge(SevenAwayRecharge sevenAwayRecharge) {
		this.sevenAwayRecharge = sevenAwayRecharge;
	}

	public SevenFightToLast getSevenFightToLast() {
		return sevenFightToLast;
	}

	public void setSevenFightToLast(SevenFightToLast sevenFightToLast) {
		this.sevenFightToLast = sevenFightToLast;
	}

	public HiddenTreasureModel getHiddenTreasureModel() {
		return hiddenTreasureModel;
	}

	public void setHiddenTreasureModel(HiddenTreasureModel hiddenTreasureModel) {
		this.hiddenTreasureModel = hiddenTreasureModel;
	}

	public SevenGroupBuy getSevenGroupBuy() {
		return sevenGroupBuy;
	}

	public void setSevenGroupBuy(SevenGroupBuy sevenGroupBuy) {
		this.sevenGroupBuy = sevenGroupBuy;
	}

	public LoginLuxuryGifts getLoginLuxuryGifts() {
		return loginLuxuryGifts;
	}

	public void setLoginLuxuryGifts(LoginLuxuryGifts loginLuxuryGifts) {
		this.loginLuxuryGifts = loginLuxuryGifts;
	}

	public OverCallbackCLSe getOverCallbackCLSe() {
		return overCallbackCLSe;
	}

	public void setOverCallbackCLSe(OverCallbackCLSe overCallbackCLSe) {
		this.overCallbackCLSe = overCallbackCLSe;
	}

	public OverCallbackYBSe getOverCallbackYBSe() {
		return overCallbackYBSe;
	}

	public void setOverCallbackYBSe(OverCallbackYBSe overCallbackYBSe) {
		this.overCallbackYBSe = overCallbackYBSe;
	}

	public SevenDayRecharge getSevenDayRecharge() {
		return sevenDayRecharge;
	}

	public void setSevenDayRecharge(SevenDayRecharge sevenDayRecharge) {
		this.sevenDayRecharge = sevenDayRecharge;
	}

	public SevenOneRecharge getSevenOneRecharge() {
		return sevenOneRecharge;
	}

	public void setSevenOneRecharge(SevenOneRecharge sevenOneRecharge) {
		this.sevenOneRecharge = sevenOneRecharge;
	}

	public SevenContinuousConsume getSevenContinuousConsume() {
		return sevenContinuousConsume;
	}

	public void setSevenContinuousConsume(SevenContinuousConsume sevenContinuousConsume) {
		this.sevenContinuousConsume = sevenContinuousConsume;
	}

	public CountryBoss getCountryBoss() {
		return countryBoss;
	}

	public void setCountryBoss(CountryBoss countryBoss) {
		this.countryBoss = countryBoss;
	}

	public CrossTeamFuBen getCrossTeamFuBen() {
		return crossTeamFuBen;
	}

	public void setCrossTeamFuBen(CrossTeamFuBen crossTeamFuBen) {
		this.crossTeamFuBen = crossTeamFuBen;
	}

	public FashionClothes getFashionClothes() {
		return fashionClothes;
	}

	public void setFashionClothes(FashionClothes fashionClothes) {
		this.fashionClothes = fashionClothes;
	}

	public FireBeacon getFireBeacon() {
		return fireBeacon;
	}

	public void setFireBeacon(FireBeacon fireBeacon) {
		this.fireBeacon = fireBeacon;
	}

	public WeekCardModel getWeekCardModel() {
		return weekCardModel;
	}

	public void setWeekCardModel(WeekCardModel weekCardModel) {
		this.weekCardModel = weekCardModel;
	}

	public HeroOpenDaysSysData getHeroOpenDaysSysData() {
		return heroOpenDaysSysData;
	}

	public void setHeroOpenDaysSysData(HeroOpenDaysSysData heroOpenDaysSysData) {
		this.heroOpenDaysSysData = heroOpenDaysSysData;
	}

	public MonsterSpiritModel getMonsterSpiritModel() {
		return monsterSpiritModel;
	}

	public void setMonsterSpiritModel(MonsterSpiritModel monsterSpiritModel) {
		this.monsterSpiritModel = monsterSpiritModel;
	}

	public TrueNameModel getTrueNameModel() {
		return trueNameModel;
	}

	public void setTrueNameModel(TrueNameModel trueNameModel) {
		this.trueNameModel = trueNameModel;
	}

	public AntiAddictionModel getAntiAddictionModel() {
		return antiAddictionModel;
	}

	public void setAntiAddictionModel(AntiAddictionModel antiAddictionModel) {
		this.antiAddictionModel = antiAddictionModel;
	}

	public DailyDirectBuy getDailyDirectBuy() {
		return dailyDirectBuy;
	}

	public void setDailyDirectBuy(DailyDirectBuy dailyDirectBuy) {
		this.dailyDirectBuy = dailyDirectBuy;
	}

	public CrossSJMiJing getCrossSJMiJing() {
		return crossSJMiJing;
	}

	public void setCrossSJMiJing(CrossSJMiJing crossSJMiJing) {
		this.crossSJMiJing = crossSJMiJing;
	}

	public BaoWuXianShi getBaoWuXianShi() {
		return baoWuXianShi;
	}

	public void setBaoWuXianShi(BaoWuXianShi baoWuXianShi) {
		this.baoWuXianShi = baoWuXianShi;
	}

	public CommonData getCommonData() {
		return commonData;
	}

	public void setCommonData(CommonData commonData) {
		this.commonData = commonData;
	}

	public ChuangGuanYouLi getChuangGuanYouLi() {
		return chuangGuanYouLi;
	}

	public void setChuangGuanYouLi(ChuangGuanYouLi chuangGuanYouLi) {
		this.chuangGuanYouLi = chuangGuanYouLi;
	}

	public CrossWenDingTianXia getCrossWenDingTianXia() {
		return crossWenDingTianXia;
	}

	public void setCrossWenDingTianXia(CrossWenDingTianXia crossWenDingTianXia) {
		this.crossWenDingTianXia = crossWenDingTianXia;
	}

	public TotalRechargeSys getTotalRechargeSys() {
		return totalRechargeSys;
	}

	public void setTotalRechargeSys(TotalRechargeSys totalRechargeSys) {
		this.totalRechargeSys = totalRechargeSys;
	}

	public HyperPointGeneralSys getHyperPointGeneralSys() {
		return hyperPointGeneralSys;
	}

	public void setHyperPointGeneralSys(HyperPointGeneralSys hyperPointGeneralSys) {
		this.hyperPointGeneralSys = hyperPointGeneralSys;
	}

	public PersonalDestiny getPersonalDestiny() {
		return personalDestiny;
	}

	public void setPersonalDestiny(PersonalDestiny personalDestiny) {
		this.personalDestiny = personalDestiny;
	}

	public RechargeFeedback getRechargeFeedback() {
		return rechargeFeedback;
	}

	public void setRechargeFeedback(RechargeFeedback rechargeFeedback) {
		this.rechargeFeedback = rechargeFeedback;
	}

	public EightDoor getEightDoor() {
		return eightDoor;
	}

	public void setEightDoor(EightDoor eightDoor) {
		this.eightDoor = eightDoor;
	}

	public UpLvShop getUpLvShop() {
		return upLvShop;
	}

	public void setUpLvShop(UpLvShop upLvShop) {
		this.upLvShop = upLvShop;
	}

	public RestrictedAccess getRestrictedAccess() {
		return restrictedAccess;
	}

	public void setRestrictedAccess(RestrictedAccess restrictedAccess) {
		this.restrictedAccess = restrictedAccess;
	}

	public ZhuJiangYanWu getZhuJiangYanWu() {
		return zhuJiangYanWu;
	}

	public void setZhuJiangYanWu(ZhuJiangYanWu zhuJiangYanWu) {
		this.zhuJiangYanWu = zhuJiangYanWu;
	}

	public ZcBossHero getZcBossHero() {
		return zcBossHero;
	}

	public void setZcBossHero(ZcBossHero zcBossHero) {
		this.zcBossHero = zcBossHero;
	}

	public ShengEquipClear getShengEquipClear() {
		return shengEquipClear;
	}

	public void setShengEquipClear(ShengEquipClear shengEquipClear) {
		this.shengEquipClear = shengEquipClear;
	}

	public GodGenSendGift getGodGenSendGift() {
		return godGenSendGift;
	}

	public void setGodGenSendGift(GodGenSendGift godGenSendGift) {
		this.godGenSendGift = godGenSendGift;
	}

	public QuickBuyModel getQuickBuyModel() {
		return quickBuyModel;
	}

	public void setQuickBuyModel(QuickBuyModel quickBuyModel) {
		this.quickBuyModel = quickBuyModel;
	}

	public GiftBaodiData getGiftBaodiData() {
		return giftBaodiData;
	}

	public void setGiftBaodiData(GiftBaodiData giftBaodiData) {
		this.giftBaodiData = giftBaodiData;
	}

	public SaintMonsterTreasureModel getSaintMonsterTreasureModel() {
		return saintMonsterTreasureModel;
	}

	public void setSaintMonsterTreasureModel(SaintMonsterTreasureModel saintMonsterTreasureModel) {
		this.saintMonsterTreasureModel = saintMonsterTreasureModel;
	}

	public RewardBack getRewardBack() {
		return rewardBack;
	}

	public void setRewardBack(RewardBack rewardBack) {
		this.rewardBack = rewardBack;
	}

	public NewKingWar getNewKingWar() {
		return newKingWar;
	}

	public void setNewKingWar(NewKingWar newKingWar) {
		this.newKingWar = newKingWar;
	}

	public LittleLeader getLittleLeader() {
		return littleLeader;
	}

	public void setLittleLeader(LittleLeader littleLeader) {
		this.littleLeader = littleLeader;
	}

	public ShaoZhuQiYuan getShaozhuqiyuan() {
		return shaozhuqiyuan;
	}

	public void setShaozhuqiyuan(ShaoZhuQiYuan shaozhuqiyuan) {
		this.shaozhuqiyuan = shaozhuqiyuan;
	}

	public GuanQiaHelp getGuanqiahelp() {
		return guanqiahelp;
	}

	public void setGuanqiahelp(GuanQiaHelp guanqiahelp) {
		this.guanqiahelp = guanqiahelp;
	}

	public CrossMineLocal getCrossMineLocal() {
		return crossMineLocal;
	}

	public void setCrossMineLocal(CrossMineLocal crossMineLocal) {
		this.crossMineLocal = crossMineLocal;
	}
	public GodWeapon getGodWeapon() {
		return godWeapon;
	}
	public void setGodWeapon(GodWeapon godWeapon) {
		this.godWeapon = godWeapon;
	}
	

	public WeiXinShare getWeixinshare() {
		return weixinshare;
	}

	public void setWeixinshare(WeiXinShare weiXinShare) {
		this.weixinshare = weiXinShare;
	}

	public EightDoorAppraiseRank getEightDoorAppraiseRank() {
		return eightDoorAppraiseRank;
	}

	public void setEightDoorAppraiseRank(EightDoorAppraiseRank eightDoorAppraiseRank) {
		this.eightDoorAppraiseRank = eightDoorAppraiseRank;
	}

	public ShaoZhuQiYuanRank getShaoZhuQiYuanRank() {
		return shaoZhuQiYuanRank;
	}

	public void setShaoZhuQiYuanRank(ShaoZhuQiYuanRank shaoZhuQiYuanRank) {
		this.shaoZhuQiYuanRank = shaoZhuQiYuanRank;
	}

	public ShaoZhuEscort getShaozhuEscort() {
		return shaozhuEscort;
	}

	public void setShaozhuEscort(ShaoZhuEscort shaozhuEscort) {
		this.shaozhuEscort = shaozhuEscort;
	}

	public SpecialAnimalDir getSpecialAnimalDir() {
		return specialAnimalDir;
	}

	public void setSpecialAnimalDir(SpecialAnimalDir specialAnimalDir) {
		this.specialAnimalDir = specialAnimalDir;
	}
	public TigerPass getTigerPass() {
		return tigerPass;
	}

	public void setTigerPass(TigerPass tigerPass) {
		this.tigerPass = tigerPass;
	}
	public SearchAnimals getSearchAnimals() {
		return searchAnimals;
	}

	public void setSearchAnimals(SearchAnimals searchAnimals) {
		this.searchAnimals = searchAnimals;
	}
	
	public QunXiongZhuLu getQunXiongZhuLu() {
		return qunXiongZhuLu;
	}

	public void setQunXiongZhuLu(QunXiongZhuLu qunXiongZhuLu) {
		this.qunXiongZhuLu = qunXiongZhuLu;
	}

	public SpecialAnimalBossData getSpecialAnimalBossData() {
		return specialAnimalBossData;
	}

	public void setSpecialAnimalBossData(SpecialAnimalBossData specialAnimalBossData) {
		this.specialAnimalBossData = specialAnimalBossData;
	}

	public ThreeHeroFightLvBu getThreeHeroFightLvBu() {
		return threeHeroFightLvBu;
	}

	public void setThreeHeroFightLvBu(ThreeHeroFightLvBu threeHeroFightLvBu) {
		this.threeHeroFightLvBu = threeHeroFightLvBu;
	}

	public ZhenYan getZhenYan() {
		return zhenYan;
	}

	public void setZhenYan(ZhenYan zhenYan) {
		this.zhenYan = zhenYan;
	}

	public TrialModel getTrialModel() {
		return trialModel;
	}

	public void setTrialModel(TrialModel trialModel) {
		this.trialModel = trialModel;
	}

	public ReincarnationGodFate getGodFate() {
		return godFate;
	}

	public void setGodFate(ReincarnationGodFate godFate) {
		this.godFate = godFate;
	}

	public CrossTeamKingLocal getCrossTeamKingLocal() {
		return crossTeamKingLocal;
	}

	public void setCrossTeamKingLocal(CrossTeamKingLocal crossTeamKingLocal) {
		this.crossTeamKingLocal = crossTeamKingLocal;
	}
	
	public GuardAreaLocal getGuardAreaLocal() {
		return guardAreaLocal;
	}

	public void setGuardAreaLocal(GuardAreaLocal guardAreaLocal) {
		this.guardAreaLocal = guardAreaLocal;
	}
	public LocalHouse getLocalHouse() {
		return localHouse;
	}

	public void setLocalHouse(LocalHouse localHouse) {
		this.localHouse = localHouse;
	}

	public HouseShopTask getHouseShopTask() {
		return houseShopTask;
	}

	public void setHouseShopTask(HouseShopTask houseShopTask) {
		this.houseShopTask = houseShopTask;
	}

	public RedBox getRedBox() {
		return redBox;
	}

	public void setRedBox(RedBox redBox) {
		this.redBox = redBox;
	}

	public XuTianHuntModel getXuTianHuntModel() {
		return xuTianHuntModel;
	}

	public void setXuTianHuntModel(XuTianHuntModel xuTianHuntModel) {
		this.xuTianHuntModel = xuTianHuntModel;
	}

	public HeroCurrencies getHeroCurrencies() {
		return heroCurrencies;
	}

	public void setHeroCurrencies(HeroCurrencies heroCurrencies) {
		this.heroCurrencies = heroCurrencies;
	}
	public RebornFBLocal getRebornFBLocal() {
		return rebornFBLocal;
	}

	public void setRebornFBLocal(RebornFBLocal rebornFBLocal) {
		this.rebornFBLocal = rebornFBLocal;
	}
	public SixWay getSixWay() {
		return sixWay;
	}

	public void setSixWay(SixWay sixWay) {
		this.sixWay = sixWay;
	}
	
	public WanyuanHongbao getWanyuanHongbao() {
		return wanyuanHongbao;
	}
	
	public void setWanyuanHongbao(WanyuanHongbao wanyuanHongbao) {
		this.wanyuanHongbao = wanyuanHongbao;
	}
	
	public ExtraValueGiftBag getExtraValueGiftBag() {
		return extraValueGiftBag;
	}
	
	public void setExtraValueGiftBag(ExtraValueGiftBag extraValueGiftBag) {
		this.extraValueGiftBag = extraValueGiftBag;
	}
}
