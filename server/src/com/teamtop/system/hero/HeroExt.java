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
 * ?????????????????????????????????
 * 
 * @author Administrator
 *
 */
public class HeroExt extends CacheModel {
	/** ?????????????????? */
	private Bag bag;
	/** ?????? */
	private Chat chat;
	/** ?????? */
	private Friend friend;
	/** ?????? */
	private Forge forge;
	/** ?????? */
	private Guanqia guanqia;
	/** ?????? */
	private Skill skill;
	/** ?????? */
	private TitleModel titleModel;
	/** ?????? **/
	private WuJiang wujiang;
	/** ?????? **/
	private ZhanJia zhanJia;
	/** ?????? */
	private ArchiveData archiveData;
	/** ?????? */
	private Excalibur excalibur;
	/** ?????? **/
	private BingFa bingfa;
	/** ?????? **/
	private GodBook godbook;
	/** ?????? */
	private TreasureData treasureData;
	/** ?????? **/
	private SpecialTreasure specialTreasure;
	/** ?????? */
	private GeneralSoul generalSoul;
	/** ???????????? **/
	private DayTask dayTask;
	/** ?????????????????? */
	private ShopData shopData;
	/** boss????????????????????????boss??? */
	private Boss boss;
	/** ????????? **/
	private PeacockFloor peacockFloor;
	/** ???????????? */
	private BattleVixens battleVixens;
	/** ???????????? */
	private GodOfWar godOfWar;
	/** ??????boss **/
	private QMBossHero qmBossHero;
	/** ???????????? **/
	private MaterialFuben materialFuben;
	/** ???????????? **/
	private RunningMan runningMan;
	/** ???????????? **/
	private CountryData countryData;
	/** * ??????boss?????????????????? */
	private CrossBoss crossBoss;
	/** (??????)???????????? */
	private SoloRunModel soloRunModel;
	/** (??????)???????????? */
	private DynastyWarriorsModel dynastyWarriorsModel;
	/** ?????? */
	private PromotionModel promotionModel;
	/** vip?????? */
	private VipData vipData;
	/** ??????????????? */
	private HeroesListData heroesListData;
	/** ?????????????????? */
	private HeroActivityData heroActivityData;
	/** ??????????????????*/
	private ExclusiveActivityData exclusiveActivityData;

	/** ??????????????????????????????????????? */
	private Map<Integer, Integer> systemStateMap = new HashMap<>();
	/** (????????????)???????????? **/
	private CrossKing crossKing;
	/** ???????????? **/
	private SevenDayLogin sevenDayLogin;
	/** ????????? **/
	private LongZhongDui longZhongDui;
	/** ?????? **/
	private Treasury treasury;
	/** ????????? **/
	private CollectTreasury collectTreasury;
	/** ?????????????????? **/
	private CrossSelectKingLocal crossSelectKingLocal;
	/** ?????? **/
	private SignIn signIn;
	/** ????????? **/
	private CDkey cdkey;
	/** ????????? **/
	private LingLongGe linglongge;
	/** ??????????????? **/
	private SevenWuShenRank sevenWuShenRank;
	/** ???????????? **/
	private SevenHappy sevenHappy;
	/** ????????????????????????????????? */
	private RedPointData redPointData;
	/** ?????? **/
	private TaskUser taskUser;
	/** ???????????? **/
	private DiscountStore discountStore;
	/** ?????????????????? **/
	private ShowReward showReward;
	/** ?????? **/
	private EquipData equipData;
	/** ???????????? */
	private LvBuRisingModel lvBuRisingModel;
	/** ??????7??????????????? **/
	private SevenAwayRecharge sevenAwayRecharge;
	/** ???????????? **/
	private SevenFightToLast sevenFightToLast;
	/** ????????? */
	private HiddenTreasureModel hiddenTreasureModel;
	/** ???????????? **/
	private SevenGroupBuy sevenGroupBuy;
	/** ?????????????????????7?????? */
	private LoginLuxuryGifts loginLuxuryGifts;
	/** ???????????????????????????7?????? */
	private OverCallbackCLSe overCallbackCLSe;
	/** ???????????????????????????7?????? */
	private OverCallbackYBSe overCallbackYBSe;
	/** ?????????????????? **/
	private SevenDayRecharge sevenDayRecharge;
	/** ?????????????????? **/
	private SevenOneRecharge sevenOneRecharge;
	/** ?????????????????? **/
	private SevenContinuousConsume sevenContinuousConsume;
	/** ??????boss **/
	private CountryBoss countryBoss;
	/** ???????????? **/
	private CrossTeamFuBen crossTeamFuBen;
	/** ?????? **/
	private FashionClothes fashionClothes;
	/** ???????????? */
	private FireBeacon fireBeacon;
	/** ?????? */
	private WeekCardModel weekCardModel;
	/** ???????????????????????????????????? */
	private HeroOpenDaysSysData heroOpenDaysSysData;
	/** ????????? */
	private MonsterSpiritModel monsterSpiritModel;
	/** ???????????? */
	private TrueNameModel trueNameModel;
	/** ??????????????? */
	private AntiAddictionModel antiAddictionModel;
	/** ???????????? **/
	private DailyDirectBuy dailyDirectBuy;
	/** ???????????? **/
	private CrossSJMiJing crossSJMiJing;
	/** ???????????? **/
	private BaoWuXianShi baoWuXianShi;
	/** ???????????? **/
	private ChuangGuanYouLi chuangGuanYouLi;
	/** ???????????? **/
	private CrossWenDingTianXia crossWenDingTianXia;
	/** ????????????(??????) **/
	private TotalRechargeSys totalRechargeSys;
	/** ????????????(??????) **/
	private HyperPointGeneralSys hyperPointGeneralSys;
	/** ???????????? **/
	private RechargeFeedback rechargeFeedback;
	/** ?????????????????????????????????????????? **/
	private CommonData commonData;
	/** ????????? **/
	private PersonalDestiny personalDestiny;
	/** ???????????? **/
	private EightDoor eightDoor;
	/** ???????????? **/
	private UpLvShop upLvShop;
	/** ?????????????????? **/
	private RestrictedAccess restrictedAccess;
	/** ???????????? **/
	private ZhuJiangYanWu zhuJiangYanWu;
	/** ??????boss???????????? **/
	private ZcBossHero zcBossHero;
	/** ???????????? **/
	private ShengEquipClear shengEquipClear;
	/** ???????????? **/
	private GodGenSendGift godGenSendGift;
	/** ???????????? */
	private QuickBuyModel quickBuyModel;
	/** ????????????*/
	private GiftBaodiData giftBaodiData;
	/** ?????????????????? */
	private SaintMonsterTreasureModel saintMonsterTreasureModel;
	/** ???????????? */
	private RewardBack rewardBack;
	/** ??????????????????????????? **/
	private NewKingWar newKingWar;
	/** ?????? **/
	private LittleLeader littleLeader;
	/** ???????????? **/
	private ShaoZhuQiYuan shaozhuqiyuan;
	/** ???????????? **/
	private GuanQiaHelp guanqiahelp;
	/** ???????????? **/
	private CrossMineLocal crossMineLocal;
	/** ????????????-???????????? **/
	private EightDoorAppraiseRank eightDoorAppraiseRank;
	/** ????????????-???????????? **/
	private ShaoZhuQiYuanRank shaoZhuQiYuanRank;
	/** ???????????? **/
	private Push push;
	/** ???????????? **/
	private WeiXinShare weixinshare;
	/**??????????????????id**/
	private GodWeapon godWeapon;
	/** ???????????? **/
	private ShaoZhuEscort shaozhuEscort;
	/** ???????????? **/
	private HuoShaoChiBi huoShaoChiBi;
	/** ???????????? **/
	private LiuChuQiShan liuChuQiShan;
	/** ????????? **/
	private SpecialAnimalDir specialAnimalDir;
	/** ?????????**/
	private TigerPass tigerPass;
	/** ???????????? **/
	private SearchAnimals searchAnimals;
	/** ??????boss*/
	private SpecialAnimalBossData specialAnimalBossData;
	/** ???????????? **/
	private Talent talent;
	/** ???????????? **/
	private QunXiongZhuLu qunXiongZhuLu;
	/** ???????????????**/
	private ThreeHeroFightLvBu threeHeroFightLvBu;
	/** ?????? **/
	private QiCe qiCe;
	/** ???????????? **/
	private QiCeDraw qiCeDraw;
	/** ?????? **/
	private ZhenYan zhenYan;
	/** ???????????? **/
	private Sworn sworn;
	/** ?????? **/
	private Achievement achievement;
	/** ????????????*/
	private TrialModel trialModel;
	/** ???????????? **/
	private ActGift actGift;
	/** ??????-?????? **/
	private ReincarnationGodFate godFate;
	/** ??????*/
	private Mount mount;
	/**????????????**/
	private CrossTeamKingLocal crossTeamKingLocal;
	/** ???????????? **/
	private GuardAreaLocal guardAreaLocal;
	/** ???????????? **/
	private LocalHouse localHouse;
	/**??????????????????**/
	private HouseShopTask houseShopTask;
	/** ????????????*/
	private XuTianHuntModel xuTianHuntModel;
	/** ??????????????????*/
	private HeroCurrencies heroCurrencies;
	/**
	 * ????????????
	 */
	private RedBox redBox;
	/** ????????????*/
	private DengFengZaoJi dengFengZaoJi;
	/** ????????????*/
	private RebornFBLocal rebornFBLocal;
	/** ???????????? **/
	private Maid maid;
	/** ???????????? **/
	private HouseKeeper houseKeeper;
	/**
	 * ??????
	 */
	private SixWay sixWay;
	/** ???????????? **/
	private AttackCityLocal attackCityLocal;
	
	/** ???????????? **/
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
