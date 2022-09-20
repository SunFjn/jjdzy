package com.teamtop.system.openDaysSystem;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.TypeReference;
import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.openDaysSystem.bagGoodIdea.BagGoodIdeaManager;
import com.teamtop.system.openDaysSystem.goodPolicyHasGift.GoodPolicyHasGiftManager;
import com.teamtop.system.openDaysSystem.model.OpenSystemInfo;
import com.teamtop.system.openDaysSystem.monsterKingDailyActive.MonsterKingDailyActiveManager;
import com.teamtop.system.openDaysSystem.monsterKingLoginGift.MonsterKingLoginGiftManager;
import com.teamtop.system.openDaysSystem.monsterKingSearchMonster.MonsterKingSearchMonsterManager;
import com.teamtop.system.openDaysSystem.monsterKingTotalRecharge.MonsterKingTotalRechargeManager;
import com.teamtop.system.openDaysSystem.otherAwayRecharge.OtherAwayRechargeManager;
import com.teamtop.system.openDaysSystem.otherContinuousConsume.OtherContinuousConsumeManager;
import com.teamtop.system.openDaysSystem.otherDailyDirectBuy.OtherDailyDirectBuyManager;
import com.teamtop.system.openDaysSystem.otherDiscountStore.OtherDiscountStoreManager;
import com.teamtop.system.openDaysSystem.otherFightToLast.OtherFightToLastManager;
import com.teamtop.system.openDaysSystem.otherHyperPointGeneralSys.OtherHyperPointGeneralSysManager;
import com.teamtop.system.openDaysSystem.otherLoginLuxuryGifts.OtherLoginLuxuryGiftsManager;
import com.teamtop.system.openDaysSystem.otherNewDayRecharge.OtherNewDayRechargeManager;
import com.teamtop.system.openDaysSystem.otherNewOneRecharge.OtherNewOneRechargeManager;
import com.teamtop.system.openDaysSystem.otherOverCallbackYBSe.OtherOverCallbackYBSeManager;
import com.teamtop.system.openDaysSystem.otherSevenDayLogin.OtherSevenDayLoginManager;
import com.teamtop.system.openDaysSystem.otherSevenGroupBuy.OtherSevenGroupBuyManager;
import com.teamtop.system.openDaysSystem.otherTotalRecharge.OtherTotalRechargeSysManager;
import com.teamtop.system.openDaysSystem.runeAppraise.RuneAppraiseManager;
import com.teamtop.system.openDaysSystem.runeCellect.RuneCellectManager;
import com.teamtop.system.openDaysSystem.runeGift.RuneGiftManager;
import com.teamtop.system.openDaysSystem.saintMonsterDailyActive.SaintMonsterDailyActiveManager;
import com.teamtop.system.openDaysSystem.saintMonsterDial.SaintMonsterDialManager;
import com.teamtop.system.openDaysSystem.saintMonsterGoal.SaintMonsterGoalManager;
import com.teamtop.system.openDaysSystem.saintMonsterTreasure.SaintMonsterTreasureManager;
import com.teamtop.system.openDaysSystem.saintMonsterWash.SaintMonsterWashManager;
import com.teamtop.system.openDaysSystem.saintMonsterWashRank.SaintMonsterWashRankManager;
import com.teamtop.system.openDaysSystem.seriesRecharge.SeriesRechargeManager;
import com.teamtop.system.openDaysSystem.shaozhuOneRechargeBack.ShaoZhuOneRechargeBackManager;
import com.teamtop.system.openDaysSystem.shaozhuSevenDayTarget.ShaoZhuSevenDayTargetManager;
import com.teamtop.system.openDaysSystem.shaozhuTotalRecharge.ShaoZhuTotalRechargeManager;
import com.teamtop.system.openDaysSystem.shaozhugoldpig.ShaoZhuGoldPigManager;
import com.teamtop.system.openDaysSystem.specialAnimalSendGift.SpecialAnimalSendGiftManager;
import com.teamtop.system.openDaysSystem.talentGoal.TalentGoalManager;
import com.teamtop.system.openDaysSystem.talentSendGiftActive.TalentSendGiftActiveManager;
import com.teamtop.system.openDaysSystem.warOrder.WarOrderManager;
import com.teamtop.system.openDaysSystem.warOrder.WarOrderManagerNew;
import com.teamtop.system.openDaysSystem.warOrderActive.WarOrderActiveManager;
import com.teamtop.system.openDaysSystem.wishingTree.WishingTreeManager;
import com.teamtop.util.log.LogTool;

import excel.config.Config_hdfl_012;
import excel.struct.Struct_hdfl_012;

public class OpenDaysSystemSysCache extends AbsServerEvent {

	/* 配置数据 */
	/** 冲突,key:系统id，value:活动id */
	public static Map<Integer, Integer> sConflictMap = new HashMap<>();
	/** 冲突,key:活动id，value:系统id */
	public static Map<Integer, Integer> actConflictMap = new HashMap<>();
	/** 系统集合key:系统id, value:<key:期数, 唯一id> */
	public static Map<Integer, Map<Integer, Integer>> sysQsMap = new HashMap<>();
	/** 系统集合key:系统id, value:Set<唯一id> */
	public static Map<Integer, Set<Integer>> sysMap = new HashMap<>();
	
	/* 缓存数据*/
	/** 在开系统 key:uid, value:系统开启数据 */
	private static ConcurrentHashMap<Integer, OpenSystemInfo> openMap = new ConcurrentHashMap<>();
	/** 在开系统 系统id */
	private static Set<Integer> openedSet = new HashSet<>();
	/** 已开启过的系统活动 uid */
	private static Set<Integer> passOpenedSet = new HashSet<>();
	
	/**
	 * 需特殊处理的系统id集合 (个人满足条件之前就生成个人系统活动数据)
	 */
	public static Set<Integer> specialSys = new HashSet<>();

	private static Map<Integer, AbsOpenDaysManager> mgrMap = new HashMap<>();
	
	public static boolean isSpecialSys(int sysId) {
		return specialSys.contains(sysId);
	}

	public static ConcurrentHashMap<Integer, OpenSystemInfo> getOpenMap() {
		return openMap;
	}

	public static void setOpenMap(ConcurrentHashMap<Integer, OpenSystemInfo> openMap) {
		OpenDaysSystemSysCache.openMap = openMap;
	}

	public static Set<Integer> getOpenedSet() {
		return openedSet;
	}

	public static void setOpenedSet(Set<Integer> openedSet) {
		OpenDaysSystemSysCache.openedSet = openedSet;
	}

	public static Set<Integer> getPassOpenedSet() {
		return passOpenedSet;
	}

	public static void setPassOpenedSet(Set<Integer> passOpenedSet) {
		OpenDaysSystemSysCache.passOpenedSet = passOpenedSet;
	}

	public static Map<Integer, Integer> getsConflictMap() {
		return sConflictMap;
	}

	public static void setsConflictMap(Map<Integer, Integer> sConflictMap) {
		OpenDaysSystemSysCache.sConflictMap = sConflictMap;
	}

	public static Map<Integer, Integer> getActConflictMap() {
		return actConflictMap;
	}

	public static void setActConflictMap(Map<Integer, Integer> actConflictMap) {
		OpenDaysSystemSysCache.actConflictMap = actConflictMap;
	}

	public void initActManager() {
		mgrMap.put(SystemIdConst.RUNE_CELLECT, RuneCellectManager.getIns());
		mgrMap.put(SystemIdConst.RUNE_APPRAISE, RuneAppraiseManager.getIns());
		mgrMap.put(SystemIdConst.RUNE_GIFT, RuneGiftManager.getIns());
		mgrMap.put(SystemIdConst.OTHER_LOGIN_LUXURY, OtherLoginLuxuryGiftsManager.getIns());
		mgrMap.put(SystemIdConst.OTHER_ONE_RECHARGE, OtherNewOneRechargeManager.getIns());
		mgrMap.put(SystemIdConst.OTHER_TOTAL_RECHARGE, OtherTotalRechargeSysManager.getIns());
		mgrMap.put(SystemIdConst.OTHER_DAY_RECHARGE, OtherNewDayRechargeManager.getIns());
		mgrMap.put(SystemIdConst.OTHER_FIGHT_TO_LAST, OtherFightToLastManager.getIns());
		mgrMap.put(SystemIdConst.OTHER_DISCOUNT_SHOP, OtherDiscountStoreManager.getIns());
		mgrMap.put(SystemIdConst.OTHER_BACK_YB, OtherOverCallbackYBSeManager.getIns());
		mgrMap.put(SystemIdConst.OTHER_HYPERPOINT_GENERAL, OtherHyperPointGeneralSysManager.getIns());
		mgrMap.put(SystemIdConst.OTHER_CONTINUE_CONSUME, OtherContinuousConsumeManager.getIns());
		mgrMap.put(SystemIdConst.SAINT_MONSTER_DAILY_ACTIVE, SaintMonsterDailyActiveManager.getIns());
		mgrMap.put(SystemIdConst.SAINT_MONSTER_WASH, SaintMonsterWashManager.getIns());
		mgrMap.put(SystemIdConst.SAINT_MONSTER_DIAL, SaintMonsterDialManager.getIns());
		mgrMap.put(SystemIdConst.SAINT_MONSTER_GOAL, SaintMonsterGoalManager.getIns());
		mgrMap.put(SystemIdConst.SAINT_MONSTER_TREASURE, SaintMonsterTreasureManager.getIns());
		mgrMap.put(SystemIdConst.SHAOZHU_SEVENDAYTARGET, ShaoZhuSevenDayTargetManager.getIns());
		mgrMap.put(SystemIdConst.SHAOZHU_TOTALRECHARGE, ShaoZhuTotalRechargeManager.getIns());
		mgrMap.put(SystemIdConst.SHAOZHU_ONERECHARGEBACK, ShaoZhuOneRechargeBackManager.getIns());
		mgrMap.put(SystemIdConst.SHAO_ZHU_GOLD_PIG, ShaoZhuGoldPigManager.getIns());
		mgrMap.put(SystemIdConst.SEVENDAYLOGIN, OtherSevenDayLoginManager.getIns());
		mgrMap.put(SystemIdConst.OTHER_DAILYBUY, OtherDailyDirectBuyManager.getIns());
		mgrMap.put(SystemIdConst.OTHER_AWAYRECHARGE, OtherAwayRechargeManager.getIns());
		mgrMap.put(SystemIdConst.Other_SevenGroupBuy, OtherSevenGroupBuyManager.getIns());
		mgrMap.put(SystemIdConst.SAINT_MONSTER_WASH_RANK, SaintMonsterWashRankManager.getIns());
		mgrMap.put(SystemIdConst.KING_OF_MONSTERS_SERIESRECHARGE, SeriesRechargeManager.getIns());
		mgrMap.put(SystemIdConst.SPECIALANIMALDIR_SENDGIFT, SpecialAnimalSendGiftManager.getIns());
		mgrMap.put(SystemIdConst.MONSTER_KING_DAILY_ACTIVE, MonsterKingDailyActiveManager.getIns());
		mgrMap.put(SystemIdConst.MONSTER_KING_TOTAL_RECHARGE, MonsterKingTotalRechargeManager.getIns());
		mgrMap.put(SystemIdConst.MONSTER_KING_LOGIN_GIFT, MonsterKingLoginGiftManager.getIns());
		mgrMap.put(SystemIdConst.MONSTER_KING_SEARCH_MONSTER, MonsterKingSearchMonsterManager.getIns());
		mgrMap.put(SystemIdConst.WARORDER, WarOrderActiveManager.getIns());
		mgrMap.put(SystemIdConst.TALENT_SEND_GIFT, TalentSendGiftActiveManager.getIns());
		mgrMap.put(SystemIdConst.TALENT_GOAL, TalentGoalManager.getIns());
		mgrMap.put(SystemIdConst.BAGGOODIDEA, BagGoodIdeaManager.getIns());
		mgrMap.put(SystemIdConst.GOODPOLICYHASGIFT, GoodPolicyHasGiftManager.getIns());
		mgrMap.put(SystemIdConst.WISHING_TREE, WishingTreeManager.getIns());
		mgrMap.put(SystemIdConst.WARORDER1, WarOrderManager.getIns());
		mgrMap.put(SystemIdConst.WARORDER2, WarOrderManagerNew.getIns());
	}
	
	public void initSpecialSys() {
		specialSys.add(SystemIdConst.SAINT_MONSTER_DAILY_ACTIVE);
		specialSys.add(SystemIdConst.SHAOZHU_TOTALRECHARGE);
		specialSys.add(SystemIdConst.SHAOZHU_ONERECHARGEBACK);
		specialSys.add(SystemIdConst.KING_OF_MONSTERS_SERIESRECHARGE);
		specialSys.add(SystemIdConst.SPECIALANIMALDIR_SENDGIFT);
	}

	public static AbsOpenDaysManager getManager(int sysId) {
		return mgrMap.get(sysId);
	}

	/***
	 * 获取配置数据
	 * 
	 * @param uid
	 * @return
	 */
	public static Struct_hdfl_012 gethdflData(int uid) {
		Struct_hdfl_012 hdfl_012 = Config_hdfl_012.getIns().get(uid);
		return hdfl_012;
	}

	@Override
	public void startServer() throws RunServerException {
		initActManager();
		initSpecialSys();
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.OPEN_DAYS_SYSTEM_NOW);
			String content = globalData.getContent();
			if (content == null || content.equals("") || content.equals("{}")) {

			} else {
				Type type = new TypeReference<ConcurrentHashMap<Integer, OpenSystemInfo>>() {
				}.getType();
				openMap = JSONObject.parseObject(content, type);
			}
		} catch (Exception e) {
			LogTool.error(e, OpenDaysSystemSysCache.class, "OpenDaysSystemSysCache startServer openMap");
			throw new RunServerException(e, "");
		}
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.OPEN_DAYS_SYSTEM_SYSID);
			String content = globalData.getContent();
			if (content == null || content.equals("") || content.equals("{}")) {

			} else {
				Type type = new TypeReference<HashSet<Integer>>() {
				}.getType();
				openedSet = JSONObject.parseObject(content, type);
			}
		} catch (Exception e) {
			LogTool.error(e, OpenDaysSystemSysCache.class, "OpenDaysSystemSysCache startServer openedSet");
			throw new RunServerException(e, "");
		}
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.OPEN_DAYS_SYSTEM_OLD);
			String content = globalData.getContent();
			if (content == null || content.equals("") || content.equals("{}")) {

			} else {
				Type type = new TypeReference<HashSet<Integer>>() {
				}.getType();
				passOpenedSet = JSONObject.parseObject(content, type);
			}
		} catch (Exception e) {
			LogTool.error(e, OpenDaysSystemSysCache.class, "OpenDaysSystemSysCache startServer passOpenedSet");
			throw new RunServerException(e, "");
		}
	}

	@Override
	public void shutdownServer() {
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.OPEN_DAYS_SYSTEM_NOW);
			globalData.setContent(JSON.toJSONString(openMap));
			GlobalCache.doSync(globalData);
		} catch (Exception e) {
			LogTool.error(e, OpenDaysSystemSysCache.class, "OpenDaysSystemSysCache shutdownServer");
		}
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.OPEN_DAYS_SYSTEM_SYSID);
			globalData.setContent(JSON.toJSONString(openedSet));
			GlobalCache.doSync(globalData);
		} catch (Exception e) {
			LogTool.error(e, OpenDaysSystemSysCache.class, "OpenDaysSystemSysCache shutdownServer openedSet");
		}
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.OPEN_DAYS_SYSTEM_OLD);
			globalData.setContent(JSON.toJSONString(passOpenedSet));
			GlobalCache.doSync(globalData);
		} catch (Exception e) {
			LogTool.error(e, OpenDaysSystemSysCache.class, "OpenDaysSystemSysCache shutdownServer passOpenedSet");
		}
	}

	@Override
	public void initExcel() throws RunServerException {
		List<Struct_hdfl_012> sortList = Config_hdfl_012.getIns().getSortList();
		int size = sortList.size();
		for (int i = 0; i < size; i++) {
			Struct_hdfl_012 hdfl_012 = sortList.get(i);
			int sysId = hdfl_012.getId();
			int actId = hdfl_012.getSys();
			int qs = hdfl_012.getQs();
			int uid = hdfl_012.getBianhao();
			sConflictMap.put(sysId, actId);
			actConflictMap.put(actId, sysId);
			Set<Integer> set = sysMap.get(sysId);
			if (set == null) {
				set = new HashSet<>();
				sysMap.put(sysId, set);
			}
			set.add(uid);
			Map<Integer, Integer> map = sysQsMap.get(sysId);
			if (map == null) {
				map = new HashMap<>();
				sysQsMap.put(sysId, map);
			}
			map.put(qs, uid);
		}

		OpenDaysSystemFunction.getIns().checkSysEnd();
		OpenDaysSystemFunction.getIns().checkSystemOpenForinitExcel();
	}

}
