package com.teamtop.system.openDaysSystem.otherDiscountStore;

import java.util.HashMap;
import java.util.Map;

import com.teamtop.system.discountStore.model.ConfigModel;

import excel.config.Config_offstore3_244;
import excel.struct.Struct_offstore3_244;

public class OtherDiscountStoreFunction {
	private static OtherDiscountStoreFunction ins = null;

	public static OtherDiscountStoreFunction getIns() {
		if (ins == null) {
			ins = new OtherDiscountStoreFunction();
		}
		return ins;
	}

	private OtherDiscountStoreFunction() {
	}

	/**
	 * 初始化配置表
	 */
	public void initConfig() {
		Map<Integer, Map<Integer, ConfigModel>> configGoodsMap = OtherDiscountStoreCache.getConfigGoodsMap();
		for (Struct_offstore3_244 struct_offstore3_244 : Config_offstore3_244.getIns().getSortList()) {
			int indexday = struct_offstore3_244.getDay();
			if (!configGoodsMap.containsKey(indexday)) {
				configGoodsMap.put(indexday, new HashMap<>());
			}
			ConfigModel configModel = new ConfigModel(struct_offstore3_244.getId(), struct_offstore3_244.getItem(),
					struct_offstore3_244.getMoney(), struct_offstore3_244.getTime(), struct_offstore3_244.getVip());
			configGoodsMap.get(indexday).put(struct_offstore3_244.getId(), configModel);
		}
	}

}
