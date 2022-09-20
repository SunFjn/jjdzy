package com.teamtop.system.extraValueGiftBag;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.teamtop.system.extraValueGiftBag.model.ExtraValueGiftBag;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;

import excel.struct.Struct_czlb_781;

public class ExtraValueGiftBagManager {
	private static ExtraValueGiftBagManager ins = null;

	public static ExtraValueGiftBagManager getIns() {
		if (ins == null) {
			ins = new ExtraValueGiftBagManager();
		}
		return ins;
	}

	private ExtraValueGiftBagManager() {
		
	}
	
	public void openUI(Hero hero,int type) {
		if (hero == null) {
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, ExtraValueGiftBagConst.SYSTEMID)) {
			return;
		}
		//期数、类型 [B(id),S(剩余购买次数)]
		ExtraValueGiftBag extraValueGiftBag = hero.getExtraValueGiftBag();
		List<Object[]> remainList = new ArrayList<>();
		int qs = 1;
		if(type == ExtraValueGiftBagConst.type_WeekGift) {
			qs = extraValueGiftBag.getQsWeek();
			Map<Integer, Integer> wmap = extraValueGiftBag.getWeekGiftMap();
			for (Integer wid : wmap.keySet()) {
				remainList.add(new Object[] {wid,wmap.get(wid)});
			}
		} else if(type == ExtraValueGiftBagConst.type_MonthGift) {
			qs = extraValueGiftBag.getQsMonth();
			Map<Integer, Integer> mmap = extraValueGiftBag.getMonthGiftMap();
			for (Integer mid : mmap.keySet()) {
				remainList.add(new Object[] {mid,mmap.get(mid)});
			}
		}
		ExtraValueGiftBagSender.sendCmd_20002(hero.getId(), qs, type, remainList.toArray());
	}
}
