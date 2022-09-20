package com.teamtop.system.event.useAddEvent;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.activity.ativitys.totalRebate.TotalRebateAddEvent;
import com.teamtop.system.activity.ativitys.yuanXiao.YuanXiaoConst;
import com.teamtop.system.event.useAddEvent.addHandleEvents.AchievementTreeAddEvent;
import com.teamtop.system.event.useAddEvent.addHandleEvents.ReincarnationGodFateAddEvent;
import com.teamtop.system.event.useAddEvent.addHandleEvents.SaintMonsterDailyActiveAddEvent;
import com.teamtop.system.event.useAddEvent.addHandleEvents.SpecialAnimalDirAddEvent;
import com.teamtop.system.event.useAddEvent.events.AchievementUseAddEvent;
import com.teamtop.system.event.useAddEvent.events.BagUseAddEvent;
import com.teamtop.system.event.useAddEvent.events.CoinUseAddEvent;
import com.teamtop.system.event.useAddEvent.events.DestinyUseAddEvent;
import com.teamtop.system.event.useAddEvent.events.ExpUseAddEvent;
import com.teamtop.system.event.useAddEvent.events.GoldYuanBaoEvent;
import com.teamtop.system.event.useAddEvent.events.HonorCoinUseAddEvent;
import com.teamtop.system.event.useAddEvent.events.HoodlePointUseAddEvent;
import com.teamtop.system.event.useAddEvent.events.HouseCoinUseAddEvent;
import com.teamtop.system.event.useAddEvent.events.HouseJiFenUseAddEvent;
import com.teamtop.system.event.useAddEvent.events.HouseProsperityUseAddEvent;
import com.teamtop.system.event.useAddEvent.events.PrestigeUseAddEvent;
import com.teamtop.system.event.useAddEvent.events.RongLuUseAddEvent;
import com.teamtop.system.event.useAddEvent.events.ShareCoinUseAddEvent;
import com.teamtop.system.event.useAddEvent.events.SixWayYinJiUseAddEvent;
import com.teamtop.system.event.useAddEvent.events.SoulFireUseAddEvent;
import com.teamtop.system.event.useAddEvent.events.StarSoulUseAddEvent;
import com.teamtop.system.event.useAddEvent.events.VipExpUseAddEvent;
import com.teamtop.system.event.useAddEvent.events.WarOrderUseAddEvent;
import com.teamtop.system.event.useAddEvent.events.WuMiaoShiZheScoreUseAddEvent;
import com.teamtop.system.event.useAddEvent.events.YuanXiaoCaiLiaoAEvent;
import com.teamtop.system.event.useAddEvent.events.YuanXiaoCaiLiaoBEvent;
import com.teamtop.system.event.useAddEvent.events.YuanXiaoCaiLiaoCEvent;
import com.teamtop.system.event.useAddEvent.events.YuanbaoUseAddEvent;
import com.teamtop.system.event.useAddEvent.events.ZCBossJFUseAddEvent;
import com.teamtop.system.event.useAddEvent.events.ZhanGongUseAddEvent;
import com.teamtop.system.event.useAddEvent.events.ZhuLuTiLiUseAddEvent;
import com.teamtop.system.event.useAddEvent.useHandleEvents.AchievementTreeUseEvent;
import com.teamtop.system.event.useAddEvent.useHandleEvents.ConsumeRankYBUseEvent;
import com.teamtop.system.event.useAddEvent.useHandleEvents.HeroesListUseEvent;
import com.teamtop.system.event.useAddEvent.useHandleEvents.OverCallbackCLUseEvent;
import com.teamtop.system.event.useAddEvent.useHandleEvents.OverCallbackYBUseEvent;
import com.teamtop.system.event.useAddEvent.useHandleEvents.OverTurntableYBUseEvent;
import com.teamtop.system.event.useAddEvent.useHandleEvents.WarOrderActUseEvent;
import com.teamtop.system.event.useAddEvent.useHandleEvents.WarOrderUseEvent;
import com.teamtop.system.event.useAddEvent.useHandleEvents.WuJiangGoalUseEvent;
import com.teamtop.system.event.useAddEvent.useHandleEvents.WuMiaoShiZheActUseEvent;
import com.teamtop.util.log.LogTool;

/**
 * 投入产出缓存
 * 
 * @author Administrator
 *
 */
public class UseAddCache {
	public static int BAG_TYPE = -1;// 道具和装备交由背包投入产出事件处理
	public static int STORE_TYPE = -2;// 仓库投入产出事件处理
	private static ConcurrentHashMap<Integer, AbsUseAddEvent> map = new ConcurrentHashMap<>();
	/** 功能玩法系统对道具使用后的特殊处理事件（如：加积分） */
	public static List<AbsUseHandleEvent> funcUseHandleEventList = new ArrayList<>();
	/** 功能玩法系统对获取物品后的特殊处理事件（如：加积分） */
	public static List<AbsAddHandleEvent> funcAddHandleEventList = new ArrayList<>();

	/**
	 * 根据类型获取投入产出的事件
	 * 
	 * @param type 类型，详细查看GameConst
	 * @return event
	 */
	public static AbsUseAddEvent getEvent(int type) {
		// if (map == null)
		// init();
		AbsUseAddEvent event = map.get(type);
		if (event == null) {
			initType(type);
			LogTool.info("UseAddCache initType type=" + type, UseAddCache.class);
			event = map.get(type);
		}
		return event;
	}

	private static void init() {
		LogTool.info("UseAddCache init", UseAddCache.class);
//		map = new HashMap<Integer, AbsUseAddEvent>();
		map.put(GameConst.YUANBAO, new YuanbaoUseAddEvent());
		map.put(BAG_TYPE, new BagUseAddEvent());
		map.put(GameConst.COIN, new CoinUseAddEvent());
		map.put(GameConst.EXP, new ExpUseAddEvent());
		map.put(GameConst.RONGLIAN, new RongLuUseAddEvent());
//		map.put(GameConst.CONTRIBUTE, new ContributeUseAddEvent());
//		map.put(GameConst.WEALTH, new GangWealthUseAddEvent());
//		map.put(GameConst.MALLJF, new MallJfUseAddEvent());
		map.put(GameConst.ZHANGONG, new ZhanGongUseAddEvent());
		map.put(GameConst.STARSOUL, new StarSoulUseAddEvent());
		map.put(GameConst.SOULFIRE, new SoulFireUseAddEvent());
		map.put(GameConst.PRESTIGE, new PrestigeUseAddEvent());
		map.put(GameConst.DESTINYEXP, new DestinyUseAddEvent());
		map.put(GameConst.ZCBOSSJF, new ZCBossJFUseAddEvent());
		map.put(GameConst.SHARE_COIN, new ShareCoinUseAddEvent());
		map.put(GameConst.WarOrderExp, new WarOrderUseAddEvent());
		map.put(GameConst.ZHU_LU_TI_LI, new ZhuLuTiLiUseAddEvent());
		map.put(GameConst.ACHIEVEMENT_COIN, new AchievementUseAddEvent());
		map.put(GameConst.HONOR_COIN, new HonorCoinUseAddEvent());
		map.put(GameConst.HOUSE_PROSPERITY, new HouseProsperityUseAddEvent());
		map.put(GameConst.HOUSE_COIN, new HouseCoinUseAddEvent());
		map.put(GameConst.HOUSE_JI_FEN, new HouseJiFenUseAddEvent());
		map.put(YuanXiaoConst.CAILIAO_1, new YuanXiaoCaiLiaoAEvent());
		map.put(YuanXiaoConst.CAILIAO_2, new YuanXiaoCaiLiaoBEvent());
		map.put(YuanXiaoConst.CAILIAO_3, new YuanXiaoCaiLiaoCEvent());
		map.put(GameConst.GOLDYUANBAO_COIN, new GoldYuanBaoEvent());
		map.put(GameConst.HOODLE_POINT, new HoodlePointUseAddEvent());
		map.put(GameConst.SIXWAYYINJI, new SixWayYinJiUseAddEvent());
		map.put(GameConst.WUMIAOSHIZHE_SCORE, new WuMiaoShiZheScoreUseAddEvent());
		map.put(GameConst.VIP_EXP, new VipExpUseAddEvent() );

	}

	private static void initType(int type) {
		switch (type) {
		case GameConst.YUANBAO:
			map.put(GameConst.YUANBAO, new YuanbaoUseAddEvent());
			break;
		case -1:// BAG_TYPE
			map.put(BAG_TYPE, new BagUseAddEvent());
			break;
		case GameConst.COIN:
			map.put(GameConst.COIN, new CoinUseAddEvent());
			break;
		case GameConst.EXP:
			map.put(GameConst.EXP, new ExpUseAddEvent());
			break;
		case GameConst.RONGLIAN:
			map.put(GameConst.RONGLIAN, new RongLuUseAddEvent());
			break;
		case GameConst.ZHANGONG:
			map.put(GameConst.ZHANGONG, new ZhanGongUseAddEvent());
			break;
		case GameConst.STARSOUL:
			map.put(GameConst.STARSOUL, new StarSoulUseAddEvent());
			break;
		case GameConst.SOULFIRE:
			map.put(GameConst.SOULFIRE, new SoulFireUseAddEvent());
			break;
		case GameConst.PRESTIGE:
			map.put(GameConst.PRESTIGE, new PrestigeUseAddEvent());
			break;
		case GameConst.DESTINYEXP:
			map.put(GameConst.DESTINYEXP, new DestinyUseAddEvent());
			break;
		case GameConst.ZCBOSSJF:
			map.put(GameConst.ZCBOSSJF, new ZCBossJFUseAddEvent());
			break;
		case GameConst.SHARE_COIN:
			map.put(GameConst.SHARE_COIN, new ShareCoinUseAddEvent());
			break;
		case GameConst.WarOrderExp:
			map.put(GameConst.WarOrderExp, new WarOrderUseAddEvent());
			break;
		case GameConst.ZHU_LU_TI_LI:
			map.put(GameConst.ZHU_LU_TI_LI, new ZhuLuTiLiUseAddEvent());
			break;
		case GameConst.ACHIEVEMENT_COIN:
			map.put(GameConst.ACHIEVEMENT_COIN, new AchievementUseAddEvent());
			break;
		case GameConst.HONOR_COIN:
			map.put(GameConst.HONOR_COIN, new HonorCoinUseAddEvent());
			break;
		case GameConst.HOUSE_PROSPERITY:
			map.put(GameConst.HOUSE_PROSPERITY, new HouseProsperityUseAddEvent());
			break;
		case GameConst.HOUSE_COIN:
			map.put(GameConst.HOUSE_COIN, new HouseCoinUseAddEvent());
			break;
		case GameConst.HOUSE_JI_FEN:
			map.put(GameConst.HOUSE_JI_FEN, new HouseJiFenUseAddEvent());
			break;
		case GameConst.HOODLE_POINT:
			map.put(GameConst.HOODLE_POINT, new HoodlePointUseAddEvent());
			break;
		case GameConst.GOLDYUANBAO_COIN:
			map.put(GameConst.GOLDYUANBAO_COIN, new GoldYuanBaoEvent());
			break;
		case GameConst.SIXWAYYINJI:
			map.put(GameConst.SIXWAYYINJI, new SixWayYinJiUseAddEvent());
			break;			
		case GameConst.WUMIAOSHIZHE_SCORE:
			map.put(GameConst.WUMIAOSHIZHE_SCORE, new WuMiaoShiZheScoreUseAddEvent());
			break;
		default:
			break;
		}
	}

	static {
		init();
		/** 功能玩法系统对道具使用后的特殊处理事件（如：加积分） */
		funcUseHandleEventList.add(new HeroesListUseEvent());
		funcUseHandleEventList.add(new OverCallbackCLUseEvent());
		funcUseHandleEventList.add(new OverCallbackYBUseEvent());
		funcUseHandleEventList.add(new OverTurntableYBUseEvent());
		funcUseHandleEventList.add(new ConsumeRankYBUseEvent());
		funcUseHandleEventList.add(new WuJiangGoalUseEvent());
		funcUseHandleEventList.add(new WarOrderActUseEvent());
		funcUseHandleEventList.add(new AchievementTreeUseEvent());
		funcUseHandleEventList.add(new WuMiaoShiZheActUseEvent());
		funcUseHandleEventList.add(new WarOrderUseEvent());
		
		/** 功能玩法系统对获取物品后的特殊处理事件（如：加积分） */
		funcAddHandleEventList.add(new SaintMonsterDailyActiveAddEvent());
		funcAddHandleEventList.add(new SpecialAnimalDirAddEvent());
		funcAddHandleEventList.add(new ReincarnationGodFateAddEvent());
		funcAddHandleEventList.add(new AchievementTreeAddEvent());
		funcAddHandleEventList.add(new TotalRebateAddEvent());
	}
}
