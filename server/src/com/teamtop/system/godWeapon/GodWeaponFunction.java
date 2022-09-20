package com.teamtop.system.godWeapon;

import com.teamtop.cross.upload.CrossHeroBaseModel;
import com.teamtop.system.hero.Hero;

import excel.config.Config_sbzs_750;
import excel.struct.Struct_sbzs_750;

public class GodWeaponFunction {
	public static GodWeaponFunction ins;

	public static GodWeaponFunction getIns() {
		if (ins == null) {
			ins = new GodWeaponFunction();
		}
		return ins;
	}

	private GodWeaponFunction() {
	}

	/**
	 * 获取当前专属神兵
	 * 
	 * @param hero
	 * @return
	 */
	public int getNowGodWeapon(Hero hero) {
		int job = hero.getJob();
		if (job > 1000) {
			job /= 1000;
		}
		if (hero.getGodWeapon() == null) {
			return 0;
		}
		return getNowGodWeapon(hero, job);
	}

	/**
	 * 获取当前专属神兵专属配置
	 * 
	 * @param hero
	 * @return
	 */
	public int getNowGodWeaponZhuanShu(Hero hero) {
		int job = hero.getJob();
		if (job > 1000) {
			job /= 1000;
		}
		if (hero.getGodWeapon() == null) {
			return 0;
		}

		GodWeaponInfo info = hero.getGodWeapon().getWeaponIdByWuJiang().get(job);
		if (info == null) {
			return 0;
		}
		int type = info.getType();
		int taozhuangindex = type * 1000 + info.getZhuanshuLevel();
		Struct_sbzs_750 struct_sbzs_750 = Config_sbzs_750.getIns().get(taozhuangindex);
		if (struct_sbzs_750 != null) {
			return struct_sbzs_750.getJineng()[0][1];
		}
		return 0;
	}

	/**
	 * 获取当前专属神兵
	 * 
	 * @param hero
	 * @return
	 */
	public int getNowGodWeapon(Hero hero, int type) {
		GodWeaponInfo info = hero.getGodWeapon().getWeaponIdByWuJiang().get(type);
		if (info == null) {
			return 0;
		}
//		if (info.getWearWeapon() == 0) {
//			return info.getType() * 1000;
//		}
		return info.getWearWeapon();
	}

	public int getNowGodWeapon(CrossHeroBaseModel model) {
		int job = model.getJob();
		if (job > 1000) {
			job /= 1000;
		}
		GodWeapon godWeapon = model.getGodWeapon();
		if (godWeapon == null) {
			return 0;
		}
		GodWeaponInfo info = godWeapon.getWeaponIdByWuJiang().get(job);
		if (info == null) {
			return 0;
		}
		return info.getWearWeapon();
	}
}
