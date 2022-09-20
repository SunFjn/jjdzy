package com.teamtop.system.zhenYan;

import java.util.ArrayList;
import java.util.List;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.FightCalcConst;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;

import excel.config.Config_zx_766;
import excel.config.Config_zy_766;
import excel.config.Config_zysj_766;
import excel.struct.Struct_zx_766;
import excel.struct.Struct_zy_766;
import excel.struct.Struct_zysj_766;

public class ZhenYanManager {
	private static ZhenYanManager ins;

	public static ZhenYanManager getIns() {
		if (ins == null) {
			ins = new ZhenYanManager();
		}
		return ins;
	}

	public void openUI(Hero hero) {
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.ZHEN_YAN)) {
			return;
		}

		ZhenYan zhenYan = hero.getZhenYan();
		List<Object[]> list = new ArrayList<>();
		for (Struct_zy_766 config : Config_zy_766.getIns().getSortList()) {
			list.add(new Object[] { config.getId(), zhenYan.getZhenYanLevelMap().get(config.getId()) });
		}

		ZhenYanSender.sendCmd_10252(hero.getId(), zhenYan.getZhenXinLevel(), list.toArray());
	}

	public void upLevelZhenYan(Hero hero, int zhenYanId) {
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.ZHEN_YAN)) {
			return;
		}
		ZhenYan zhenYan = hero.getZhenYan();

		if (!zhenYan.getZhenYanLevelMap().containsKey(zhenYanId)) {
			// 阵眼不存在
			ZhenYanSender.sendCmd_10254(hero.getId(), 1, zhenYanId, 0);
			return;
		}

		int level = zhenYan.getZhenYanLevelMap().get(zhenYanId);
		Struct_zysj_766 config = Config_zysj_766.getIns().get(level);

		if (config == null) {
			// 配置不存在
			ZhenYanSender.sendCmd_10254(hero.getId(), 1, zhenYanId, level);
			return;
		}

		if (config.getXj() == 0) {
			// 已满级
			ZhenYanSender.sendCmd_10254(hero.getId(), 2, zhenYanId, level);
			return;
		}
		int[][] cost = config.getXiaohao();
		if (config.getShengxing() == 1) {
			// 替换消耗道具
			Struct_zy_766 zy = Config_zy_766.getIns().get(zhenYanId);
			if (zy == null) {
				ZhenYanSender.sendCmd_10254(hero.getId(), 1, zhenYanId, level);
				return;
			}
			cost[0][1] = zy.getDjid();
		}

		if (!UseAddUtil.canUse(hero, cost)) {
			// 升级道具不足
			ZhenYanSender.sendCmd_10254(hero.getId(), 3, zhenYanId, level);
			return;
		}

		UseAddUtil.use(hero, cost, SourceGoodConst.ZHEN_YAN_UP_COST, true);

		zhenYan.getZhenYanLevelMap().put(zhenYanId, config.getXj());

		ZhenYanSender.sendCmd_10254(hero.getId(), 0, zhenYanId, config.getXj());

		FightCalcFunction.setRecalcAll(hero, FightCalcConst.ZHEN_YAN, SystemIdConst.ZHEN_YAN);

		ZhenYanFunction.getIns().updateRedPoint(hero);
	}

	public void upLevelZhenXin(Hero hero) {
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.ZHEN_YAN)) {
			return;
		}
		ZhenYan zhenYan = hero.getZhenYan();

		int level = zhenYan.getZhenXinLevel();
		Struct_zx_766 config = Config_zx_766.getIns().get(level);
		if (config == null) {
			// 配置不存在
			ZhenYanSender.sendCmd_10256(hero.getId(), 1, level);
			return;
		}

		if (config.getXj() == 0) {
			// 已满级
			ZhenYanSender.sendCmd_10256(hero.getId(), 2, level);
			return;
		}

		int needLevel = config.getTj();

		boolean canUpLevel = true;
		for (Struct_zy_766 zy : Config_zy_766.getIns().getSortList()) {
			int nowLevel = zhenYan.getZhenYanLevelMap().get(zy.getId());
			if (nowLevel < needLevel) {
				canUpLevel = false;
				break;
			}
		}

		if (!canUpLevel) {
			// 阵眼等级不足
			ZhenYanSender.sendCmd_10256(hero.getId(), 3, level);
			return;
		}

		if (!UseAddUtil.canUse(hero, config.getSxxh())) {
			// 升星道具不足
			ZhenYanSender.sendCmd_10256(hero.getId(), 4, level);
			return;
		}

		UseAddUtil.use(hero, config.getSxxh(), SourceGoodConst.ZHEN_XIN_UP_COST, true);

		zhenYan.setZhenXinLevel(config.getXj());

		ZhenYanSender.sendCmd_10256(hero.getId(), 0, zhenYan.getZhenXinLevel());

		FightCalcFunction.setRecalcAll(hero, FightCalcConst.ZHEN_YAN, SystemIdConst.ZHEN_YAN);
		FightCalcFunction.setRecalcAll(hero, FightCalcConst.DESTINY_STAR, SystemIdConst.DESTINY_SYSID);

		ZhenYanFunction.getIns().updateRedPoint(hero);
	}
}
