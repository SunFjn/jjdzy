package com.teamtop.system.shaozhuqiyuan;

import java.util.HashMap;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;

import excel.config.Config_sonpoint_267;
import excel.struct.Struct_sonpoint_267;

public class ShaoZhuQiYuanEvent extends AbsSystemEvent {

	public static ShaoZhuQiYuanEvent ins;

	public static ShaoZhuQiYuanEvent getIns() {
		if (ins == null) {
			ins = new ShaoZhuQiYuanEvent();
		}
		return ins;
	}

	private ShaoZhuQiYuanEvent() {
	}

	@Override
	public void init(Hero hero) {
		ShaoZhuQiYuan shaoZhuQiYuan = hero.getShaozhuqiyuan();
		if (shaoZhuQiYuan == null) {
			shaoZhuQiYuan = new ShaoZhuQiYuan();
			shaoZhuQiYuan.setHid(hero.getId());
			shaoZhuQiYuan.setScore(0);
			shaoZhuQiYuan.setTimes(0);
			shaoZhuQiYuan.setScoreAwardStateMap(new HashMap<>());
			for (Struct_sonpoint_267 sonpoint : Config_sonpoint_267.getIns().getSortList()) {
				shaoZhuQiYuan.getScoreAwardStateMap().put(sonpoint.getId(), 0);
			}
			hero.setShaozhuqiyuan(shaoZhuQiYuan);
		}
	}

	@Override
	public void login(Hero hero) {
		if (hero == null) {
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SHAO_ZHU_QI_YUAN)) {
			return;
		}
		boolean redPoint = ShaoZhuQiYuanFunction.getIns().checkRedPoint(hero);
		if (redPoint) {
			RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.SHAO_ZHU_QI_YUAN, RedPointConst.RED_1,
					RedPointConst.HAS_RED);
		}
	}

}
