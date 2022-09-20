package com.teamtop.system.openDaysSystem.saintMonsterDial;

import java.util.List;

import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;
import com.teamtop.system.openDaysSystem.saintMonsterDial.model.SaintMonsterDial;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;

import excel.config.Config_ssshzpcz_268;
import excel.struct.Struct_ssshzpcz_268;

public class SaintMonsterDialFunction {

	private static SaintMonsterDialFunction ins;

	private SaintMonsterDialFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized SaintMonsterDialFunction getIns() {
		if (ins == null) {
			ins = new SaintMonsterDialFunction();
		}
		return ins;
	}

	public void rechargeHandle(Hero hero, int money) {
		long hid = hero.getId();
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.SAINT_MONSTER_DIAL)) {
				return;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.SAINT_MONSTER_DIAL);
			SaintMonsterDial saintMonsterDial = (SaintMonsterDial) SaintMonsterDialManager.getIns().getSystemModel(hero,
					uid);
			int totalRecharge = saintMonsterDial.getTotalRecharge();
			saintMonsterDial.setTotalRecharge(totalRecharge + money);
			updateRedPoint(hero);
		} catch (Exception e) {
			LogTool.error(e, SaintMonsterDialFunction.class, hid, hero.getName(),
					"SaintMonsterDialFunction rechargeHandle");
		}
	}

	/**
	 * 更新红点
	 * 
	 * @param hero
	 */
	public void updateRedPoint(Hero hero) {
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.SAINT_MONSTER_DIAL)) {
				return;
			}
			boolean redPoint = checkRedPoint(hero);
			if (redPoint) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.SAINT_MONSTER_DIAL,
						RedPointConst.RED_1, RedPointConst.HAS_RED);
			} else {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.SAINT_MONSTER_DIAL,
						RedPointConst.RED_1, RedPointConst.NO_RED);
			}
		} catch (Exception e) {
			LogTool.error(e, SaintMonsterDialFunction.class, hero.getId(), hero.getName(),
					"SaintMonsterDialFunction updateRedPoint");
		}
	}

	/**
	 * 检测红点
	 * 
	 * @param hero
	 * @return
	 */
	public boolean checkRedPoint(Hero hero) {
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.SAINT_MONSTER_DIAL)) {
				return false;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.SAINT_MONSTER_DIAL);
			SaintMonsterDial saintMonsterDial = (SaintMonsterDial) SaintMonsterDialManager.getIns().getSystemModel(hero,
					uid);
			int totalRecharge = saintMonsterDial.getTotalRecharge();
			int turnNum = saintMonsterDial.getTurnNum();
			List<Struct_ssshzpcz_268> sortList = Config_ssshzpcz_268.getIns().getSortList();
			int size = sortList.size();
			if (turnNum >= size) {
				// 已全部抽完
				return false;
			}
			int canTurn = 0;
			for (int i = 0; i < size; i++) {
				Struct_ssshzpcz_268 ssshzpcz_268 = sortList.get(i);
				int cz = ssshzpcz_268.getCz();
				if (totalRecharge >= cz) {
					canTurn++;
				}
			}
			if (turnNum < canTurn) {
				return true;
			}
		} catch (Exception e) {
			LogTool.error(e, SaintMonsterDialFunction.class, hero.getId(), hero.getName(),
					"SaintMonsterDialFunction checkRedPoint");
		}
		return false;
	}

}
