package com.teamtop.system.discountStore;

import java.util.HashMap;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.discountStore.model.ConfigModel;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.cache.union.UC;

public class DiscountStoreCache extends AbsServerEvent {

	/** 对应期数标记天数indexday->商品id-> value为配置表数据 **/
	private static Map<Integer, Map<Integer, ConfigModel>> configGoodsMap = UC.reg("configGoodsMap", new HashMap<>());

	public static Map<Integer, Map<Integer, ConfigModel>> getConfigGoodsMap() {
		return configGoodsMap;
	}

	public static void setConfigGoodsMap(Map<Integer, Map<Integer, ConfigModel>> configGoodsMap) {
		DiscountStoreCache.configGoodsMap = configGoodsMap;
	}

	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub

	}

	@Override
	public void initExcel() throws RunServerException {
		DiscountStoreFunction.getIns().initConfig();
	}

}
