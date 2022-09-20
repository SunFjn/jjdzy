package com.teamtop.system.battleNew;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

import com.teamtop.system.battleGoods.event.BattleGoodsBattleEvent;
import com.teamtop.system.battleNew.event.BattleNewEvent;
import com.teamtop.system.battleNew.event.CrossFireBeaconBattleNewEvent;
import com.teamtop.system.battleNew.event.CrossWenDingTianXiaBattleNewEvent;
import com.teamtop.system.battleNew.event.SoloRunBattleNewEvent;
import com.teamtop.system.battleNew.event.ZCBossBattleNewEvent;
import com.teamtop.system.battleNew.event.ZCBossCrossBattleNewEvent;
import com.teamtop.system.battleNew.model.BattleNewInfo;
import com.teamtop.system.crossTeamKing.cross.CrossTeamKingBattleEvent;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.util.cache.union.UC;

public class BattleNewSysCache {

	public static AtomicLong battleUidCreator = new AtomicLong(1);

	private static ConcurrentHashMap<Long, BattleNewInfo> battleMap = UC.reg("battleNewSysCacheBattleMap", new ConcurrentHashMap<>());

	/**
	 * key:角色id，value:战斗唯一id
	 */
	private static ConcurrentHashMap<Long, Long> heroBattleMap = UC.reg("battleNewSysCacheHeroBattleMap", new ConcurrentHashMap<>());
	
	/** 有buff的玩家集合 
	 * key:战斗唯一id， value:玩家集合
	 * */
	private static ConcurrentHashMap<Long, Set<Long>> heroBuffMap = UC.reg("battleNewSysCacheHeroBuffMap", new ConcurrentHashMap<>());
	
	public static Map<Integer, BattleNewEvent> battleNewEventMap = new HashMap<>();

	// 注册战斗事件
	static {
		battleNewEventMap.put(SystemIdConst.SOLO_RUN, SoloRunBattleNewEvent.getIns());
		battleNewEventMap.put(SystemIdConst.CROSS_FIRE_BEACON, CrossFireBeaconBattleNewEvent.getIns());
		battleNewEventMap.put(SystemIdConst.CROSS_WEN_DING_TIAN_XIA, CrossWenDingTianXiaBattleNewEvent.getIns());
		battleNewEventMap.put(SystemIdConst.ZCBOSS, ZCBossBattleNewEvent.getIns());
		battleNewEventMap.put(SystemIdConst.CROSS_ZCBOSS, ZCBossCrossBattleNewEvent.getIns());
		battleNewEventMap.put(SystemIdConst.CROSS_BTTLE_GOOD, BattleGoodsBattleEvent.getIns());
		battleNewEventMap.put(SystemIdConst.CROSS_TEAMKING, CrossTeamKingBattleEvent.getIns());
	}

	public static long getBattleUid() {
		return battleUidCreator.getAndIncrement();
	}

	public static ConcurrentHashMap<Long, BattleNewInfo> getBattleMap() {
		return battleMap;
	}

	public static void setBattleMap(ConcurrentHashMap<Long, BattleNewInfo> battleMap) {
		BattleNewSysCache.battleMap = battleMap;
	}

	public static ConcurrentHashMap<Long, Long> getHeroBattleMap() {
		return heroBattleMap;
	}

	public static void setHeroBattleMap(ConcurrentHashMap<Long, Long> heroBattleMap) {
		BattleNewSysCache.heroBattleMap = heroBattleMap;
	}

	public static ConcurrentHashMap<Long, Set<Long>> getHeroBuffMap() {
		return heroBuffMap;
	}

	public static void setHeroBuffMap(ConcurrentHashMap<Long, Set<Long>> heroBuffMap) {
		BattleNewSysCache.heroBuffMap = heroBuffMap;
	}


}
