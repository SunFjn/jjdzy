package com.teamtop.cross.connEvent;

import java.util.HashMap;
import java.util.Map;

import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.arenaFight.ArenaFightCrossLoginEvent;
import com.teamtop.system.battleGoods.event.BattleGoodsCrossLoginEvent;
import com.teamtop.system.crossBoss.CrossBossCrossLoginEvent;
import com.teamtop.system.crossFireBeacon.FireBeaconCrossLoginEvent;
import com.teamtop.system.crossRebornFB.RebornFBLoginEvent;
import com.teamtop.system.crossSJMiJing.CrossSJMiJingLoginEvent;
import com.teamtop.system.crossTeamFuBen.CrossTeamFubenLoginEvent;
import com.teamtop.system.crossTeamKing.cross.CrossTeamKingCrossLoginEvent;
import com.teamtop.system.crossWenDingTianXia.cross.CrossWenDingTianXiaLoginEvent;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.house.yanhui.event.YanhuiCrossLoginEvent;
import com.teamtop.system.house.yard.event.HouseCrossLoginEvent;
import com.teamtop.system.zcBoss.cross.CrossZcBossLoginEvent;

/**
 * 跨服登陆缓存
 * @author Administrator
 *
 */
public class CrossLoginCache {
	private static Map<Integer, AbsCrossLoginEvent> crossLoginEvents = new HashMap<Integer, AbsCrossLoginEvent>();
	static{
		crossLoginEvents.put(SystemIdConst.FUN_CROSS_BOSS_MH, CrossBossCrossLoginEvent.getIns());
		crossLoginEvents.put(SystemIdConst.CROSS_FIRE_BEACON, FireBeaconCrossLoginEvent.getIns());
		crossLoginEvents.put(SystemIdConst.FUN_CROSS_TEAM_FU_BEN, CrossTeamFubenLoginEvent.getIns());
		crossLoginEvents.put(SystemIdConst.CROSS_S_J_MI_JING, CrossSJMiJingLoginEvent.getIns());
		crossLoginEvents.put(SystemIdConst.CROSS_WEN_DING_TIAN_XIA, CrossWenDingTianXiaLoginEvent.getIns());
		crossLoginEvents.put(SystemIdConst.CROSS_ZCBOSS, CrossZcBossLoginEvent.getIns());
		crossLoginEvents.put(SystemIdConst.CROSS_BTTLE_GOOD,BattleGoodsCrossLoginEvent.getIns());
		crossLoginEvents.put(SystemIdConst.CROSS_TEAMKING, CrossTeamKingCrossLoginEvent.getIns());
		crossLoginEvents.put(SystemIdConst.YARD, HouseCrossLoginEvent.getIns());
		crossLoginEvents.put(SystemIdConst.YANHUI, YanhuiCrossLoginEvent.getIns());
		crossLoginEvents.put(ActivitySysId.ACT_ARENA_FIGHT, ArenaFightCrossLoginEvent.getIns());
		crossLoginEvents.put(SystemIdConst.REBORN_FB, RebornFBLoginEvent.getIns());
	}
	/**
	 * 获取跨服登陆事件
	 * @param type
	 * @return
	 */
	public static AbsCrossLoginEvent getEvent(int type){
		return crossLoginEvents.get(type);
	}
}
