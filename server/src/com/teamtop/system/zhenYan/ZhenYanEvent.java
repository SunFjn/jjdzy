package com.teamtop.system.zhenYan;

import java.util.HashMap;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.system.shaozhuqiyuan.ShaoZhuQiYuanFunction;

import excel.config.Config_zy_766;
import excel.struct.Struct_zy_766;

public class ZhenYanEvent extends AbsSystemEvent {
	private static ZhenYanEvent ins;

	public static ZhenYanEvent getIns() {
		if (ins == null) {
			ins = new ZhenYanEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		if (hero.getZhenYan() == null) {
			ZhenYan zhenYan = new ZhenYan();
			zhenYan.setHid(hero.getId());
			zhenYan.setZhenXinLevel(1000);
			zhenYan.setZhenYanLevelMap(new HashMap<>());
			for (Struct_zy_766 config : Config_zy_766.getIns().getSortList()) {
				zhenYan.getZhenYanLevelMap().put(config.getId(), 10000);
			}
			hero.setZhenYan(zhenYan);
		}
	}

	@Override
	public void login(Hero hero) {
		if (hero == null) {
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.ZHEN_YAN)) {
			return;
		}
		boolean redPoint = ShaoZhuQiYuanFunction.getIns().checkRedPoint(hero);
		if (redPoint) {
			RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.ZHEN_YAN, RedPointConst.RED_1,
					RedPointConst.HAS_RED);
		}
	}
}
