package com.teamtop.system.treasury;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.treasury.model.Treasury;
import com.teamtop.util.time.TimeDateUtil;

import excel.struct.Struct_bkitem_236;

public class TreasuryEvent extends AbsSystemEvent {
	public static TreasuryEvent ins;

	public static TreasuryEvent getIns() {
		if (ins == null) {
			ins = new TreasuryEvent();
		}
		return ins;
	}

	private TreasuryEvent() {
	}

	@Override
	public void init(Hero hero) {
		Treasury treasury = hero.getTreasury();
		if (treasury == null) {
			treasury = new Treasury();
			treasury.setHid(hero.getId());
			Map<Integer, Map<Integer, Integer>> treasuryMap = new HashMap<>();
			for (Integer tid : TreasuryCache.getConfigMap().keySet()) {
				treasuryMap.put(tid, new HashMap<>());
			}
			treasury.setTreasuryMap(treasuryMap);
			hero.setTreasury(treasury);
		}
	}

	@Override
	public void login(Hero hero) {
	}

	@Override
	public void loginReset(Hero hero, int now) {
		zeroHero(hero, now);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		int weekZeroTime = hero.getTreasury().getWeekZeroTime();
		int currentTime = TimeDateUtil.getCurrentTime();
		Map<Integer, Map<Integer, Integer>> treasuryMap = hero.getTreasury().getTreasuryMap();
		Map<Integer, List<Struct_bkitem_236>> configMap = TreasuryCache.getConfigMap();
		if (currentTime >= weekZeroTime) { // 判断是否周一重置
			treasuryMap.clear(); // 清除所有数据
			for (Integer id : configMap.keySet()) {
				treasuryMap.put(id, new HashMap<>());
				TreasuryManager.getIns().openUI(hero, id);
			}
			int nextMonDayZeroTime = TimeDateUtil.getNextMonDayZeroTime();// 设置下周一零点时间
			hero.getTreasury().setWeekZeroTime(nextMonDayZeroTime);
		}

	}

}
