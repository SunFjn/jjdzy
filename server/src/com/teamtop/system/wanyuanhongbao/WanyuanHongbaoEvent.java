package com.teamtop.system.wanyuanhongbao;

import java.util.ArrayList;
import java.util.List;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.wanyuanhongbao.model.WanyuanHongbao;

import excel.config.Config_wyhb_780;
import excel.struct.Struct_wyhb_780;

public class WanyuanHongbaoEvent extends AbsSystemEvent {
	private static WanyuanHongbaoEvent ins = null;
	
	public static WanyuanHongbaoEvent getIns() {
		if(ins == null) {
			ins = new WanyuanHongbaoEvent();
		}
		return ins;
	}
	
	@Override
	public void init(Hero hero) {
		WanyuanHongbao wanyuanHongbao = hero.getWanyuanHongbao();
		if (wanyuanHongbao == null) {
			wanyuanHongbao = new WanyuanHongbao();
			wanyuanHongbao.setHid(hero.getId());
			List<Integer> lvlAwardsStateList = new ArrayList<Integer>();// 等级奖励列表
			List<Integer> rcAwardsStateList = new ArrayList<Integer>();// 累计奖励列表
			List<Struct_wyhb_780> sortList = Config_wyhb_780.getIns().getSortList();
			for (Struct_wyhb_780 wyhbAward : sortList) {
				int type = wyhbAward.getType();
				if(type == WanyuanHongbaoConst.TYPE_LEVEL) {
					lvlAwardsStateList.add(WanyuanHongbaoConst.NOT_REACH);
				} else if(type == WanyuanHongbaoConst.TYPE_RECHARGE_TOTAL) {
					rcAwardsStateList.add(WanyuanHongbaoConst.NOT_REACH);
				}
			}
			wanyuanHongbao.setLvlAwardsStateList(lvlAwardsStateList);
			wanyuanHongbao.setRcAwardsStateList(rcAwardsStateList);
			hero.setWanyuanHongbao(wanyuanHongbao);
		}
	}

	@Override
	public void login(Hero hero) {
		WanyuanHongbaoFunction.getIns().loginNoticeFront(hero);
	}

/*	@Override
	public void loginReset(Hero hero, int now) {
		zeroHero(hero, now);
	}*/

/*	@Override
	public void zeroHero(Hero hero, int now) {
		int loginDay = hero.getWanyuanHongbao().getLoginDay();
		hero.getWanyuanHongbao().setLoginDay(loginDay + 1);// 设置累计登录天数
		WanyuanHongbaoFunction.getIns().refreshCTAwardState(hero, WanyuanHongbaoConst.LOGIN_WanyuanHongbao);
	}*/

	@Override
	public void levelUp(Hero hero, int newLv, int oldLv) {
		WanyuanHongbaoFunction.getIns().refreshAwardState(hero,WanyuanHongbaoConst.TYPE_LEVEL);
	}
	
	public void totalRechare(Hero hero) {
		WanyuanHongbaoFunction.getIns().refreshAwardState(hero,WanyuanHongbaoConst.TYPE_RECHARGE_TOTAL);
	}
	
}
