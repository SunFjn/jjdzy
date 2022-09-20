package com.teamtop.system.gm;

import java.util.HashMap;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.redeploy.GroovyGMEvent;
import com.teamtop.redeploy.RedeployDeployGMEvent;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.gm.event.ActivityGMEvent;
import com.teamtop.system.gm.event.ActivitySysGMEvent;
import com.teamtop.system.gm.event.BattleGMEvent;
import com.teamtop.system.gm.event.HeroGMEvent;
import com.teamtop.system.gm.event.OtherGMEvent;
import com.teamtop.system.gm.event.SystemGMEvent;

/**
 * GM缓存
 * @author Administrator
 *
 */
public class GMCache extends AbsServerEvent{
	/**
	 * gm事件缓存<br/>
	 * key:gm类型,value:对应事件
	 */
	public static Map<Integer, AbsGMEvent> gmEventMap = new HashMap<Integer, AbsGMEvent>();

	@Override
	public void startServer() throws RunServerException {
		gmEventMap.put(GMConst.GM_HERO, HeroGMEvent.getIns());
		gmEventMap.put(GMConst.GM_SYSTEM, SystemGMEvent.getIns());
		gmEventMap.put(GMConst.GM_ACTIVITY, ActivityGMEvent.getIns());
		gmEventMap.put(GMConst.GM_BATTLE, BattleGMEvent.getIns());
		gmEventMap.put(GMConst.GM_OTHER, OtherGMEvent.getIns());
		// 活动表活动
		gmEventMap.put(GMConst.GM_ACTIVITY_SYS, ActivitySysGMEvent.getIns());
		//热更
		gmEventMap.put(GMConst.GM_HOTSWAP, RedeployDeployGMEvent.getIns());
		//脚本
		gmEventMap.put(GMConst.GM_GROOVY, GroovyGMEvent.getIns());
	}

}
