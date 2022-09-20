package com.teamtop.system.baoWuXianShi;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.XTCS004Const;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_xtcs_004;
import excel.struct.Struct_xtcs_004;

public class BaoWuXianShiEvent extends AbsSystemEvent {
	private static BaoWuXianShiEvent ins;

	public static BaoWuXianShiEvent getIns() {
		if (ins == null) {
			ins = new BaoWuXianShiEvent();
		}
		return ins;
	}

	private BaoWuXianShiEvent() {
	}

	@Override
	public void zeroHero(final Hero hero, final int now) {
		loginReset(hero, now);
		BaoWuXianShiManager.getIns().loginData(hero);
	}

	@Override
	public void loginReset(Hero hero, int now) {
		BaoWuXianShi baoWuXianShi = hero.getBaoWuXianShi();
		baoWuXianShi.setNumGetToday(0);
	}

	@Override
	public void init(Hero hero) {
		BaoWuXianShi baoWuXianShi = hero.getBaoWuXianShi();
		if(baoWuXianShi==null) {
			baoWuXianShi = new BaoWuXianShi();
			hero.setBaoWuXianShi(baoWuXianShi);
		}
		baoWuXianShi.setHid(hero.getId());
		int timeGeted = baoWuXianShi.getTimeGeted();
		if( timeGeted==0) {
			Struct_xtcs_004 excelTime = Config_xtcs_004.getIns().get(XTCS004Const.BAO_WU_XIAN_SHI_NEXT_TIME);
			int oneTime = excelTime.getNum();
			baoWuXianShi.setTimeGeted(TimeDateUtil.getCurrentTime()-oneTime);
		}
	}

	@Override
	public void login(Hero hero) {
		BaoWuXianShiManager.getIns().loginData(hero);
	}

	@Override
	public void levelUp(Hero hero, int newLv, int oldLv) {
		init(hero);
		BaoWuXianShiManager.getIns().loginData(hero);
	}


}
