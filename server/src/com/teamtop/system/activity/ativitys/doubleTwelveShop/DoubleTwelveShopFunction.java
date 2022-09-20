package com.teamtop.system.activity.ativitys.doubleTwelveShop;

import java.util.List;

import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.hero.Hero;

import excel.struct.Struct_s12sc_771;
import excel.struct.Struct_s12yh_771;

public class DoubleTwelveShopFunction {
	private static volatile DoubleTwelveShopFunction ins = null;

	public static DoubleTwelveShopFunction getIns() {
		if (ins == null) {
			synchronized (DoubleTwelveShopFunction.class) {
				if (ins == null) {
					ins = new DoubleTwelveShopFunction();
				}
			}
		}
		return ins;
	}

	private DoubleTwelveShopFunction() {
	}

	public DoubleTwelveShop getModel(Hero hero) {
		DoubleTwelveShop model = (DoubleTwelveShop) hero.getHeroActivityData().getActivityDataMap()
				.get(ActivitySysId.DOUBLE_TWELVE_SHOP_ACT);
		return model;
	}

	public int getJianMian(int qs, int value) {
		List<Struct_s12yh_771> list = DoubleTwelveShopCache.getQsJianMianList(qs);
		if (list == null) {
			// 配置不存在
			return 0;
		}
		int size = list.size();
		for (int i = size; i > 0; i--) {
			Struct_s12yh_771 config = list.get(i - 1);
			if (value >= config.getEd()) {
				return config.getJm();
			}
		}
		return 0;
	}

	public Struct_s12sc_771 getItemConfig(int qs, int id) {
		return DoubleTwelveShopCache.getQsItemMap(qs).get(id);
	}

}
