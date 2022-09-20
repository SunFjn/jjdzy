package com.teamtop.system.consume.events;

import java.util.HashSet;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

import com.teamtop.system.consume.AbsConsumeEvent;
import com.teamtop.system.exclusiveActivity.AbsExclusiveActivityManager;
import com.teamtop.system.exclusiveActivity.ExclusiveActivityFunction;
import com.teamtop.system.exclusiveActivity.ExclusiveActivitySysCache;
import com.teamtop.system.exclusiveActivity.model.ExclusiveActivityInfo;
import com.teamtop.system.exclusiveActivity.model.ExclusiveActivityModel;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.log.LogTool;

import excel.config.Config_zshdb_315;
import excel.struct.Struct_zshdb_315;

public class ExclusiveActivityConsumEvent extends AbsConsumeEvent {

	@Override
	public void consumeHandle(Hero hero, int consumeNum, int reason) {
		try {
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
						manager.consumeHandle(hero, consumeNum, reason, id);
					}
				} catch (Exception e) {
					LogTool.error(e, this, "ExclusiveActivityConsumEvent recharge, id=" + id);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, this, "ExclusiveActivityConsumEvent recharge");
		}
	}

}
