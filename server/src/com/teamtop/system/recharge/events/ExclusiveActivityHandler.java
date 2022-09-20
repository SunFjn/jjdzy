package com.teamtop.system.recharge.events;

import java.util.HashSet;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

import com.teamtop.system.exclusiveActivity.AbsExclusiveActivityManager;
import com.teamtop.system.exclusiveActivity.ExclusiveActivityFunction;
import com.teamtop.system.exclusiveActivity.ExclusiveActivitySysCache;
import com.teamtop.system.exclusiveActivity.model.ExclusiveActivityInfo;
import com.teamtop.system.exclusiveActivity.model.ExclusiveActivityModel;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.recharge.AbsRechargeEvent;
import com.teamtop.util.log.LogTool;

import excel.config.Config_zshdb_315;
import excel.struct.Struct_zshdb_315;

public class ExclusiveActivityHandler extends AbsRechargeEvent {

	@Override
	public void recharge(Hero hero, int money, int product_id) {
		try {
			if (!ExclusiveActivitySysCache.isOpenState()) {
				return;
			}
			Map<Integer, ExclusiveActivityModel> exActivityMap = hero.getExclusiveActivityData().getExActivityMap();
			Map<Integer, ExclusiveActivityInfo> openExActMap = ExclusiveActivitySysCache.getOpenExActMap();
			Map<Integer, Struct_zshdb_315> map = Config_zshdb_315.getIns().getMap();
			Set<Integer> idSet = new HashSet<>(exActivityMap.keySet());
			Iterator<Integer> iterator = idSet.iterator();
			int id = 0;
			for (; iterator.hasNext();) {
				id = iterator.next();
				try {
					if (!map.containsKey(id)) {
						continue;
					}
					if (!openExActMap.containsKey(id)) {
						continue;
					}
					if (!ExclusiveActivityFunction.getIns().checkHasData(hero, id)) {
						continue;
					}
					if (exActivityMap.containsKey(id)) {
						int actId = exActivityMap.get(id).getActId();
						AbsExclusiveActivityManager manager = ExclusiveActivitySysCache.getExActMgr(actId);
						manager.rechargeHandle(hero, money, product_id, id);
					}
				} catch (Exception e) {
					LogTool.error(e, this, "ExclusiveActivityHandler recharge, id=" + id);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, this, "ExclusiveActivityHandler recharge");
		}
	}

}
