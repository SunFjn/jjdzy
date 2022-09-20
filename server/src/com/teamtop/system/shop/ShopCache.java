package com.teamtop.system.shop;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventFactory;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.cache.union.UC;

import excel.config.Config_list_218;
import excel.struct.Struct_list_218;

public class ShopCache extends AbsServerEvent {

	private static Map<Integer, Map<Integer, List<Struct_list_218>>> shopGoods = UC.reg("shopCacheShopGoods",
			new HashMap<Integer, Map<Integer, List<Struct_list_218>>>());

	private static Map<Integer, Map<Integer, ProbabilityEventModel>> shopGoodsProMap = UC
			.reg("shopCacheShopGoodsProMap", new HashMap<Integer, Map<Integer, ProbabilityEventModel>>());;

	public static Map<Integer, Map<Integer, List<Struct_list_218>>> getShopGoods() {
		return shopGoods;
	}

	public static void setShopGoods(Map<Integer, Map<Integer, List<Struct_list_218>>> shopGoods) {
		ShopCache.shopGoods = shopGoods;
	}

	public static Map<Integer, Map<Integer, ProbabilityEventModel>> getShopGoodsProMap() {
		return shopGoodsProMap;
	}

	public static void setShopGoodsProMap(Map<Integer, Map<Integer, ProbabilityEventModel>> shopGoodsProMap) {
		ShopCache.shopGoodsProMap = shopGoodsProMap;
	}

	@Override
	public void initExcel() throws RunServerException {
		shopGoods.clear();
		shopGoodsProMap.clear();
		List<Struct_list_218> sortList = Config_list_218.getIns().getSortList();
		for (Struct_list_218 goods : sortList) {
			int store = goods.getStore();
			int wz = goods.getWz();
			Map<Integer, List<Struct_list_218>> map = shopGoods.get(store);
			if (map == null) {
				map = new HashMap<>();
				shopGoods.put(store, map);
			}
			List<Struct_list_218> list = map.get(wz);
			if (list == null) {
				list = new ArrayList<>();
				map.put(wz, list);
			}
			list.add(goods);
			// 概率事件
			Map<Integer, ProbabilityEventModel> proMap = shopGoodsProMap.get(store);
			if (proMap == null) {
				proMap = new HashMap<>();
				shopGoodsProMap.put(store, proMap);
			}
			ProbabilityEventModel probabilityEventModel = proMap.get(wz);
			if (probabilityEventModel == null) {
				probabilityEventModel = ProbabilityEventFactory.getProbabilityEvent();
				proMap.put(wz, probabilityEventModel);
			}
			probabilityEventModel.addProbabilityEvent(goods.getPro(), goods);
		}
	}

	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub

	}

}
