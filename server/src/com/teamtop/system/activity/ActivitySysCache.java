package com.teamtop.system.activity;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.teamtop.cross.CrossZone;
import com.teamtop.main.RunServerException;
import com.teamtop.system.activity.ativitys.achievementTree.AchievementTreeManager;
import com.teamtop.system.activity.ativitys.actSevenFightToLast.ActSevenFightToLastManager;
import com.teamtop.system.activity.ativitys.arenaFight.ArenaFightManager;
import com.teamtop.system.activity.ativitys.awayRecharge.AwayRechargeManager;
import com.teamtop.system.activity.ativitys.baoZangPinTu.BaoZangPinTuManager;
import com.teamtop.system.activity.ativitys.caoCaoCome.CaoCaoComeManager;
import com.teamtop.system.activity.ativitys.consumeSmashEgg.ConsumeSmashEggManager;
import com.teamtop.system.activity.ativitys.consumeTurnCardAct.ConsumeTurnCardActManager;
import com.teamtop.system.activity.ativitys.consumeTurnTableAct.ConsumeTurnTableActManager;
import com.teamtop.system.activity.ativitys.continuousConsume.ContinuousConsumeManager;
import com.teamtop.system.activity.ativitys.countryTreasure.CountryTreasureManager;
import com.teamtop.system.activity.ativitys.coupletAct.CoupletActManager;
import com.teamtop.system.activity.ativitys.dailyDirectBuy.DailyDirectBuyActManager;
import com.teamtop.system.activity.ativitys.dailyFirstRecharge.DailyFirstRechargeManager;
import com.teamtop.system.activity.ativitys.dial.DialManager;
import com.teamtop.system.activity.ativitys.doubleProduce.DoubleProduceManager;
import com.teamtop.system.activity.ativitys.doubleTwelveShop.DoubleTwelveShopManager;
import com.teamtop.system.activity.ativitys.dropRedPacket.DropRedPacketManager;
import com.teamtop.system.activity.ativitys.eightDoorAppraiseRankAct.EightDoorAppraiseRankActManager;
import com.teamtop.system.activity.ativitys.firstRechargeTriple.FirstRechargeTripleManager;
import com.teamtop.system.activity.ativitys.flashSale.FlashSaleManager;
import com.teamtop.system.activity.ativitys.godGenDiscount.GodGenDiscountManager;
import com.teamtop.system.activity.ativitys.godGenSendGiftAct.GodGenSendGiftActManager;
import com.teamtop.system.activity.ativitys.godGenThisLifeAct.GodGenThisLifeActManager;
import com.teamtop.system.activity.ativitys.godOfWealthSendGiftAct.GodOfWealthSendGiftActManager;
import com.teamtop.system.activity.ativitys.goldenMouse.GoldenMouseManager;
import com.teamtop.system.activity.ativitys.happyCrossKing.HappyCrossKingManager;
import com.teamtop.system.activity.ativitys.happyMonsterGod.HappyMonsterGodManager;
import com.teamtop.system.activity.ativitys.happyQMboss.HappyQMbossManager;
import com.teamtop.system.activity.ativitys.happySoloRun.HappySoloRunManager;
import com.teamtop.system.activity.ativitys.hefuFristRecharge.HeFuFristRechargeManager;
import com.teamtop.system.activity.ativitys.hefuGodGift.HeFuGodGiftManager;
import com.teamtop.system.activity.ativitys.hefuLoginGift.HeFuLoginGiftManager;
import com.teamtop.system.activity.ativitys.hefuRechargeBack.HeFuRechargeBackManager;
import com.teamtop.system.activity.ativitys.hefuZhangFeiBoss.HeFuZhangFeiBossManager;
import com.teamtop.system.activity.ativitys.holidayMall.HolidayMallManager;
import com.teamtop.system.activity.ativitys.hyperPointGeneral.HyperPointGeneralManager;
import com.teamtop.system.activity.ativitys.kingSecretCrystal.KingSecretCrystalManager;
import com.teamtop.system.activity.ativitys.loginLuxuryGiftsNew.LoginLuxuryGiftsNewManager;
import com.teamtop.system.activity.ativitys.luckSign.LuckSignManager;
import com.teamtop.system.activity.ativitys.luckTurnCardAct.LuckTurnCardActManager;
import com.teamtop.system.activity.ativitys.luckyTwist.LuckyTwistManager;
import com.teamtop.system.activity.ativitys.magicDiscount.MagicDiscountManager;
import com.teamtop.system.activity.ativitys.newDayRecharge.NewDayRechargeManager;
import com.teamtop.system.activity.ativitys.newOneRecharge.NewOneReChargeManager;
import com.teamtop.system.activity.ativitys.nianMonsterMakeSpring.NianMonsterMakeSpringManager;
import com.teamtop.system.activity.ativitys.oneRecharge.OneRechargeManager;
import com.teamtop.system.activity.ativitys.oneRechargeBack.OneRechargeBackManager;
import com.teamtop.system.activity.ativitys.onedayRecharge.OnedayRechargeManager;
import com.teamtop.system.activity.ativitys.overCallbackCL.OverCallbackCLManager;
import com.teamtop.system.activity.ativitys.overCallbackYB.OverCallbackYBManager;
import com.teamtop.system.activity.ativitys.overTurntable.OverTurntableManager;
import com.teamtop.system.activity.ativitys.pixiutreasure.PiXiuTreasureManager;
import com.teamtop.system.activity.ativitys.playBalloon.PlayBalloonManager;
import com.teamtop.system.activity.ativitys.rechargeRankAct.RechargeRankActManager;
import com.teamtop.system.activity.ativitys.rollDice.RollDiceManager;
import com.teamtop.system.activity.ativitys.scratchTicket.ScratchTicketManager;
import com.teamtop.system.activity.ativitys.seriesRechargeAct.SeriesRechargeActManager;
import com.teamtop.system.activity.ativitys.serverConsumeAct.ServerConsumeActManager;
import com.teamtop.system.activity.ativitys.shaoZhuQiYuanRankAct.ShaoZhuQiYuanRankActManager;
import com.teamtop.system.activity.ativitys.skyRichGift.SkyRichGiftManager;
import com.teamtop.system.activity.ativitys.superHoodle.SuperHoodleManager;
import com.teamtop.system.activity.ativitys.themeConsume.ThemeConsumeManager;
import com.teamtop.system.activity.ativitys.threeKingdomsCelebration.activeGetGift.ActiveGetGiftManager;
import com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationHaoLiDuiHuan.CelebrationHaoLiDuiHuanManager;
import com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationHaoLiZhuanPan.CelebrationHaoLiZhuanPanManager;
import com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationJiJin.CelebrationJiJinManager;
import com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationLoginGift.CelebrationLoginGiftManager;
import com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationOneRechargeBack.CelebrationOneRechargeBackManager;
import com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationShop.CelebrationShopManager;
import com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationTotalRechargeBack.CelebrationTotalRechargeBackManager;
import com.teamtop.system.activity.ativitys.threeKingdomsCelebration.consumeRank.ConsumeRankManager;
import com.teamtop.system.activity.ativitys.totalRebate.TotalRebateManager;
import com.teamtop.system.activity.ativitys.totalRecharge.TotalRechargeManager;
import com.teamtop.system.activity.ativitys.vipDiscount.VipDiscountManager;
import com.teamtop.system.activity.ativitys.warOrder.WarOrderManager;
import com.teamtop.system.activity.ativitys.warOrder.WarOrderManagerNew;
import com.teamtop.system.activity.ativitys.warOrderAct.WarOrderActManager;
import com.teamtop.system.activity.ativitys.wishingTree.WishingTreeActManager;
import com.teamtop.system.activity.ativitys.wuJiangGoal.WuJiangGoalManager;
import com.teamtop.system.activity.ativitys.wuMiaoShiZheAct.WuMiaoShiZheActManager;
import com.teamtop.system.activity.ativitys.yuanXiao.YuanXiaoLocalManager;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.activity.model.ActivitySetting;
import com.teamtop.system.crossDynastyWarriors.DynastyWarriorsSysCache;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.util.cache.union.UC;
import com.teamtop.util.db.trans.ObjStrTransUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_huodong_009;
import excel.struct.Struct_huodong_009;

public class ActivitySysCache extends AbsServerEvent {

	/* 数据表缓存 */
	/**
	 * key:活动id， value:List 多期活动列表
	 */
	public static Map<Integer, List<Struct_huodong_009>> actIdMap = UC.reg("activityCacheActIdMap",
			new HashMap<Integer, List<Struct_huodong_009>>());

	/** 大活动类型 */
	public static Set<Integer> actTypeSet = UC.reg("activityCacheActTypeSet", new HashSet<Integer>());

	/* 系统缓存 */
	private static ActivityCache activityCache;

	/**
	 * key:活动id value:活动逻辑处理类
	 */
	public static Map<Integer, AbstractActivityManager> actMgrMap = UC.reg("activityCacheActMgrMap",
			new HashMap<Integer, AbstractActivityManager>());

	/**
	 * 需特殊处理的活动id集合 (个人满足条件之前就生成个人活动数据)
	 */
	public static Set<Integer> specialAct = new HashSet<>();


	public static ActivityCache getActivityCache() {
		return activityCache;
	}

	public static void setActivityCache(ActivityCache activityCache) {
		ActivitySysCache.activityCache = activityCache;
	}

	public static Map<Integer, List<Struct_huodong_009>> getActIdMap() {
		return actIdMap;
	}

	public static Map<Integer, Map<Integer, ActivitySetting>> getActSettingMap() {
		return activityCache.getActSettingMap();
	}

	/** 活动大类型 */
	public static Set<Integer> getActTypeSet() {
		return actTypeSet;
	}

	/** 在开活动数据 */
	public static Map<Integer, ActivityInfo> getActivityMap() {
		return activityCache.getActivityMap();
	}

	public static Map<Integer, AbstractActivityManager> getActMgrMap() {
		return actMgrMap;
	}

	/** 获取活动逻辑处理类 */
	public static AbstractActivityManager getActMgrByActId(int actId) {
		return actMgrMap.get(actId);
	}

	public static boolean isSpecialAct(int actId) {
		return specialAct.contains(actId);
	}

	public void initActManager() {
		actMgrMap.put(ActivitySysId.Act_DailyRecharge, DailyFirstRechargeManager.getIns());
		actMgrMap.put(ActivitySysId.Act_LoginLuxuryGiftsNew, LoginLuxuryGiftsNewManager.getIns());
		actMgrMap.put(ActivitySysId.Act_ONERECHARGE, OneRechargeManager.getIns());
		actMgrMap.put(ActivitySysId.Act_OVERCALLBACK_CL, OverCallbackCLManager.getIns());
		actMgrMap.put(ActivitySysId.Act_OVERCALLBACK_YB, OverCallbackYBManager.getIns());
		actMgrMap.put(ActivitySysId.Act_TOTALRECHARGE, TotalRechargeManager.getIns());
		actMgrMap.put(ActivitySysId.Act_OVERTURNTABLE, OverTurntableManager.getIns());
		actMgrMap.put(ActivitySysId.Act_HYPERPOINTGENERAL, HyperPointGeneralManager.getIns());
		actMgrMap.put(ActivitySysId.Act_DayRecharge, OnedayRechargeManager.getIns());
		actMgrMap.put(ActivitySysId.Act_HappyQmboss, HappyQMbossManager.getIns());
		actMgrMap.put(ActivitySysId.Act_HappyCrossKing, HappyCrossKingManager.getIns());
		actMgrMap.put(ActivitySysId.Act_HappyMonsterGod, HappyMonsterGodManager.getIns());
		actMgrMap.put(ActivitySysId.Act_HappySoloRun, HappySoloRunManager.getIns());
		actMgrMap.put(ActivitySysId.Act_AWAYEWCHARGE, AwayRechargeManager.getIns());
		actMgrMap.put(ActivitySysId.Act_ACTSEVENFIGHTOLAST, ActSevenFightToLastManager.getIns());
		actMgrMap.put(ActivitySysId.Act_NEWDAYRECHARGE, NewDayRechargeManager.getIns());
		actMgrMap.put(ActivitySysId.Act_NEWONERECHARGE, NewOneReChargeManager.getIns());
		actMgrMap.put(ActivitySysId.ACT_CONTINUOUS_CONSUME, ContinuousConsumeManager.getIns());
		actMgrMap.put(ActivitySysId.ACT_DAILYDIRECTBUY, DailyDirectBuyActManager.getIns());
		actMgrMap.put(ActivitySysId.CELEBRATION_JI_JIN, CelebrationJiJinManager.getIns());
		actMgrMap.put(ActivitySysId.CELEBRATION_HAO_LI_DUI_HUAN, CelebrationHaoLiDuiHuanManager.getIns());
		actMgrMap.put(ActivitySysId.CELEBRATION_HAO_LI_ZHUAN_PAN, CelebrationHaoLiZhuanPanManager.getIns());
		actMgrMap.put(ActivitySysId.ACT_CONSUMERANK, ConsumeRankManager.getIns());
		actMgrMap.put(ActivitySysId.ACT_ACTIVEGETGIFT, ActiveGetGiftManager.getIns());
		actMgrMap.put(ActivitySysId.ACT_GODGENSENDGIFT, GodGenSendGiftActManager.getIns());
		actMgrMap.put(ActivitySysId.CELEBRATION_LOGINGIFT, CelebrationLoginGiftManager.getIns());
		actMgrMap.put(ActivitySysId.CELEBRATION_ONERECHARGE_BACK, CelebrationOneRechargeBackManager.getIns());
		actMgrMap.put(ActivitySysId.CELEBRATION_TOTALRECHARGE_BACK, CelebrationTotalRechargeBackManager.getIns());
		actMgrMap.put(ActivitySysId.CELEBRATION_SHOP, CelebrationShopManager.getIns());
		actMgrMap.put(ActivitySysId.ACT_VIPDISCOUNT, VipDiscountManager.getIns());
		actMgrMap.put(ActivitySysId.ACT_FIRST_TRIPLE, FirstRechargeTripleManager.getIns());
		actMgrMap.put(ActivitySysId.ACT_ONERECHARGEBACK, OneRechargeBackManager.getIns());
		actMgrMap.put(ActivitySysId.ACT_DIAL, DialManager.getIns());
		actMgrMap.put(ActivitySysId.ACT_CONSUME_TURNTABLE, ConsumeTurnTableActManager.getIns());
		actMgrMap.put(ActivitySysId.CAOCAOCOME_SYSID, CaoCaoComeManager.getIns());
		actMgrMap.put(ActivitySysId.ACT_CONSUME_TURNCARD, ConsumeTurnCardActManager.getIns());
		actMgrMap.put(ActivitySysId.ACT_FLASHSALE, FlashSaleManager.getIns());
		actMgrMap.put(ActivitySysId.ACT_MAGICDISCOUNT, MagicDiscountManager.getIns());
		actMgrMap.put(ActivitySysId.ACT_DOUBLE_PRODUCE, DoubleProduceManager.getIns());
        actMgrMap.put(ActivitySysId.ACT_COUNTRYTREASURE, CountryTreasureManager.getIns());
		actMgrMap.put(ActivitySysId.CROSS_RECHARGE_RANK_ACT, RechargeRankActManager.getIns());
		actMgrMap.put(ActivitySysId.ACT_XIANDINGWUJIANG, WuJiangGoalManager.getIns());
		actMgrMap.put(ActivitySysId.EIGHTDOOR_APPRAISERANK_ACT, EightDoorAppraiseRankActManager.getIns());
		actMgrMap.put(ActivitySysId.SHAOZHU_QIYUANRANK_ACT, ShaoZhuQiYuanRankActManager.getIns());
		actMgrMap.put(ActivitySysId.ACT_CONSUMESMASHEGG, ConsumeSmashEggManager.getIns());
		actMgrMap.put(ActivitySysId.GODGENDISCOUNT_ACT, GodGenDiscountManager.getIns());
		actMgrMap.put(ActivitySysId.HEFU_LOGINGIFT,HeFuLoginGiftManager.getIns());
		actMgrMap.put(ActivitySysId.HEFU_RECHARGEBACK,HeFuRechargeBackManager.getIns());
		actMgrMap.put(ActivitySysId.HEFU_GODGIFT,HeFuGodGiftManager.getIns());
		actMgrMap.put(ActivitySysId.HEFU_FRIESTRECHARGE,HeFuFristRechargeManager.getIns());
		actMgrMap.put(ActivitySysId.HEFU_ZHANGFEIBOSS,HeFuZhangFeiBossManager.getIns());
		actMgrMap.put(ActivitySysId.GODGENTHISLIFE, GodGenThisLifeActManager.getIns());
		actMgrMap.put(ActivitySysId.ACT_ROLLDICE, RollDiceManager.getIns());
		actMgrMap.put(ActivitySysId.ACT_PLAYBALLOON, PlayBalloonManager.getIns());
		actMgrMap.put(ActivitySysId.SERIESRECHARGE_ACT, SeriesRechargeActManager.getIns());
		actMgrMap.put(ActivitySysId.WISHING_TREE_ACT, WishingTreeActManager.getIns());
		actMgrMap.put(ActivitySysId.ACT_THEMECONSUME, ThemeConsumeManager.getIns());
		actMgrMap.put(ActivitySysId.WARORDER_ACT, WarOrderActManager.getIns());
		actMgrMap.put(ActivitySysId.LUCKTURNCARD_NEWACT, LuckTurnCardActManager.getIns());
		actMgrMap.put(ActivitySysId.SERVERCONSUME_NEWACT, ServerConsumeActManager.getIns());
		actMgrMap.put(ActivitySysId.ACHIEVEMENT_TREE_ACT, AchievementTreeManager.getIns());
		actMgrMap.put(ActivitySysId.ACT_TOTALREBATE, TotalRebateManager.getIns());
		actMgrMap.put(ActivitySysId.BAO_ZANG_PIN_TU_ACT, BaoZangPinTuManager.getIns());
		actMgrMap.put(ActivitySysId.DOUBLE_TWELVE_SHOP_ACT, DoubleTwelveShopManager.getIns());
		actMgrMap.put(ActivitySysId.HOLIDAY_MALL_ACT, HolidayMallManager.getIns());
		actMgrMap.put(ActivitySysId.GOD_OF_WEALTH_SEND_GIFT_ACT, GodOfWealthSendGiftActManager.getIns());
		actMgrMap.put(ActivitySysId.COUPLET_ACT, CoupletActManager.getIns());
		actMgrMap.put(ActivitySysId.ACT_NIAN_MONSTER_MAKE_SPRINGT, NianMonsterMakeSpringManager.getIns());
		actMgrMap.put(ActivitySysId.LUCKY_TWIST, LuckyTwistManager.getIns());
		actMgrMap.put(ActivitySysId.GOLDENMOUSE, GoldenMouseManager.getIns());
		actMgrMap.put(ActivitySysId.DROPREDPACKET_NEWACT, DropRedPacketManager.getIns());
		actMgrMap.put(ActivitySysId.ACT_ARENA_FIGHT, ArenaFightManager.getIns());
		actMgrMap.put(ActivitySysId.ACT_SKY_RICH_GIFT, SkyRichGiftManager.getIns());
		actMgrMap.put(ActivitySysId.ACT_KING_SECRET_CTRISTAL, KingSecretCrystalManager.getIns());
		actMgrMap.put(ActivitySysId.ACT_YUANXIAO, YuanXiaoLocalManager.getIns());
		actMgrMap.put(ActivitySysId.ACT_SUPER_HOODLE, SuperHoodleManager.getIns());
		actMgrMap.put(ActivitySysId.ACT_SCRATCH_TICKET, ScratchTicketManager.getIns());
		actMgrMap.put(ActivitySysId.NEW_ACT_PIXIUTREASURE, PiXiuTreasureManager.getIns());
		actMgrMap.put(ActivitySysId.WUMIAOSHIZHE_ACT, WuMiaoShiZheActManager.getIns());
		actMgrMap.put(ActivitySysId.LUCK_SIGN, LuckSignManager.getIns());
		actMgrMap.put(ActivitySysId.WARORDER1, WarOrderManager.getIns());
		actMgrMap.put(ActivitySysId.WARORDER2, WarOrderManagerNew.getIns());
	}

	/**
	 * 初始化特殊活动集合
	 * 注册的活动会调用AbstractActivityManager.rechargeHandle()接口
	 */
	public void initSpecialAct() {
		// specialAct.add(actId);
		specialAct.add(ActivitySysId.Act_ONERECHARGE);
		specialAct.add(ActivitySysId.Act_OVERTURNTABLE);
		specialAct.add(ActivitySysId.Act_OVERCALLBACK_CL);
		specialAct.add(ActivitySysId.Act_OVERCALLBACK_YB);
		specialAct.add(ActivitySysId.Act_HYPERPOINTGENERAL);
		specialAct.add(ActivitySysId.Act_AWAYEWCHARGE);
		specialAct.add(ActivitySysId.Act_NEWDAYRECHARGE);
		specialAct.add(ActivitySysId.Act_NEWONERECHARGE);
		specialAct.add(ActivitySysId.ACT_CONSUMERANK);
		specialAct.add(ActivitySysId.CELEBRATION_ONERECHARGE_BACK);
		specialAct.add(ActivitySysId.HEFU_RECHARGEBACK);
		specialAct.add(ActivitySysId.HEFU_GODGIFT);
		specialAct.add(ActivitySysId.HEFU_FRIESTRECHARGE);
		specialAct.add(ActivitySysId.SERIESRECHARGE_ACT);
		specialAct.add(ActivitySysId.SERVERCONSUME_NEWACT);
		specialAct.add(ActivitySysId.GOLDENMOUSE);
	}

	public static List<Struct_huodong_009> getSortList() {
		return Config_huodong_009.getIns().getSortList();
	}

	@Override
	public void startServer() throws RunServerException {
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.ACTIVITY);
			String content = globalData.getContent();
			if (content == null || content.equals("") || content.equals("{}")) {
				setActivityCache(new ActivityCache());
			} else {
				setActivityCache(ObjStrTransUtil.toObj(content, ActivityCache.class));
			}
			// 初始化各活动逻辑处理类
			initActManager();
			// 初始化特殊活动集合
			initSpecialAct();
		} catch (Exception e) {
			LogTool.error(e, ActivityCache.class, "ActivityCache startServer");
			throw new RunServerException(e, "");
		}
	}

	@Override
	public void shutdownServer() {
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.ACTIVITY);
			globalData.setContent(ObjStrTransUtil.toStr(getActivityCache()));
			GlobalCache.doSync(globalData);
		} catch (Exception e) {
			LogTool.error(e, DynastyWarriorsSysCache.class, "ActivityCache shutdownServer");
		}
	}

	@Override
	public void initExcel() throws RunServerException {
		Map<Integer, List<Struct_huodong_009>> tempActIdMap = new HashMap<Integer, List<Struct_huodong_009>>();
		actTypeSet.clear();
		List<Struct_huodong_009> sortList = Config_huodong_009.getIns().getSortList();
		int size = sortList.size();
		Struct_huodong_009 huodong = null;
		int id = 0;
		for (int i = 0; i < size; i++) {
			huodong = sortList.get(i);
			id = huodong.getId();
			List<Struct_huodong_009> list = tempActIdMap.get(id);
			if (list == null) {
				list = new ArrayList<>();
				tempActIdMap.put(id, list);
			}
			list.add(huodong);
			if (!actTypeSet.contains(huodong.getType())) {
				actTypeSet.add(huodong.getType());
			}
		}
		actIdMap = tempActIdMap;
		if (CrossZone.isCrossServer()) {
			return;
		}
		// 检测活动开启
		ActivityFunction.getIns().checkActTime();
		ActivityFunction.getIns().checkActEnd();
		ActivityFunction.getIns().checkActOpenInitExcel();
	}

}
