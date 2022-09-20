package com.teamtop.system.extraValueGiftBag;

import java.util.HashMap;
import java.util.Map;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.extraValueGiftBag.model.ExtraValueGiftBag;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_xtcs_004;
import excel.struct.Struct_czlb_781;
import excel.struct.Struct_xtcs_004;

public class ExtraValueGiftBagEvent extends AbsSystemEvent {

	public static ExtraValueGiftBagEvent ins;

	public static ExtraValueGiftBagEvent getIns() {
		if (ins == null) {
			ins = new ExtraValueGiftBagEvent();
		}
		return ins;
	}

	private ExtraValueGiftBagEvent() {
	}

	@Override
	public void init(Hero hero) {
		
		// 设置期数和可购买次数
		ExtraValueGiftBag extraValueGiftBag = hero.getExtraValueGiftBag();
		if(extraValueGiftBag == null) {
			extraValueGiftBag = new ExtraValueGiftBag();
			extraValueGiftBag.setHid(hero.getId());
		}
		
		Struct_xtcs_004  struct_xtcs_004 = Config_xtcs_004.getIns().get(9911);
		int wday = struct_xtcs_004.getNum();
		int qs = (int)Math.ceil((double)TimeDateUtil.betweenOpen()/wday);
		int ws = ExtraValueGiftBagCache.getWeekGiftMap().size();//总共有多少期
		int qsweek = qs%(ws)==0?ws:qs%(ws);//总共有多少期，循环
		//LogTool.info("开服天数："+TimeDateUtil.betweenOpen()+", 周礼包总期数：ws="+ws+", 当前期数 qsweek="+qsweek, ExtraValueGiftBag.class);
		if(extraValueGiftBag.getQsWeek()!=qsweek) {// 不是同一期
			extraValueGiftBag.setQsWeek(qsweek);
			Map<Integer, Struct_czlb_781> weekMap = ExtraValueGiftBagCache.getWeekGiftMap().get(qsweek);
			Map<Integer, Integer> weekRemainTimesMap = new HashMap<>();
			for (int sid : weekMap.keySet()) {
				weekRemainTimesMap.put(sid, weekMap.get(sid).getLimit_buy());
			}
			extraValueGiftBag.setQsWeek(qsweek);
			extraValueGiftBag.setWeekGiftMap(weekRemainTimesMap);
		}
		
		struct_xtcs_004 = Config_xtcs_004.getIns().get(9912);
		int mday = struct_xtcs_004.getNum();
		int qsm = (int)Math.ceil((double)TimeDateUtil.betweenOpen()/mday);
		int ms = ExtraValueGiftBagCache.getMonthGiftMap().size();//月总期数
		int qsmonth = qsm%(ms)==0?ms:qsm%(ms);//总共有多少期，循环
		//LogTool.info("22222开服天数："+TimeDateUtil.betweenOpen()+", 月礼包总期数：ms="+ms+", 当前期数qsmonth="+qsmonth, ExtraValueGiftBag.class);
		if(extraValueGiftBag.getQsMonth()!=qsmonth) {// 不是同一期
			extraValueGiftBag.setQsMonth(qsmonth);
			extraValueGiftBag.setMonthGiftMap(new HashMap<>());
			Map<Integer, Integer> monthRemainTimesMap = new HashMap<>();
			Map<Integer, Struct_czlb_781> monthMap = ExtraValueGiftBagCache.getMonthGiftMap().get(qsmonth);
			for (int mid : monthMap.keySet()) {
				monthRemainTimesMap.put(mid, monthMap.get(mid).getLimit_buy());
			}
			extraValueGiftBag.setQsMonth(qsmonth);
			extraValueGiftBag.setMonthGiftMap(monthRemainTimesMap);
		}
		hero.setExtraValueGiftBag(extraValueGiftBag);
	}

	@Override
	public void login(Hero hero) {
		ExtraValueGiftBagFunction.getIns().loginNoticeFront(hero);
	}

	@Override
	public void loginReset(Hero hero, int now) {
		// TODO Auto-generated method stub
		init(hero);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		init(hero);
	}

}
