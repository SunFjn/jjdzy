package com.teamtop.system.shop;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.system.shop.model.ShopData;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventFactory;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_list_218;
import excel.struct.Struct_list_218;

public class ShopFunction {

	private static ShopFunction shopFunction;

	private ShopFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized ShopFunction getIns() {
		if (shopFunction == null) {
			shopFunction = new ShopFunction();
		}
		return shopFunction;
	}

	/**
	 * 刷新某商店数据
	 * 
	 * @param hero
	 * @param type 商店类型
	 */
	public void refreshShopData(Hero hero, int type) {
		try {
			ShopData shopData = hero.getShopData();
			Map<Integer, Integer> typeGoodsMap = new HashMap<>();
			Map<Integer, Map<Integer, List<Struct_list_218>>> shopGoods = ShopCache.getShopGoods();
			Map<Integer, List<Struct_list_218>> shopSelectMap = shopGoods.get(type);
			int rebornlv = hero.getRebornlv();
			List<Struct_list_218> selectList = null;
			if (type == ShopConst.MYSTERY_SHOP) {
				selectList = shopSelectMap.get(1);
				ProbabilityEventModel eventModel = selectGoods(rebornlv, selectList);
				List<Object> eventList = ProbabilityEventUtil.getEventByProbabilityNotRemove(eventModel,ShopConst.MYSTERY_WZ_1);
				for (int i = 0; i < ShopConst.MYSTERY_WZ_1; i++) {
					Struct_list_218 goodsInfo = (Struct_list_218) eventList.get(i);
							typeGoodsMap.put(goodsInfo.getId(), 1);
				}
				selectList = shopSelectMap.get(2);
				eventModel = selectGoods(rebornlv, selectList);
				eventList = ProbabilityEventUtil.getEventByProbabilityNotRemove(eventModel,ShopConst.MYSTERY_WZ_2);
				for (int i = 0; i < ShopConst.MYSTERY_WZ_2; i++) {
					Struct_list_218 goodsInfo = (Struct_list_218) eventList.get(i);
					typeGoodsMap.put(goodsInfo.getId(), 2);
				}
			} else if (type == ShopConst.PRESTIGE_SHOP || type == ShopConst.VIP_SHOP || type == ShopConst.FIRE_SHOP
					|| type == ShopConst.ZCBOSS_SHOP || type == ShopConst.YB_SHOP || type == ShopConst.TRIAL_SHOP) {
				Map<Integer, ProbabilityEventModel> proMap = ShopCache.getShopGoodsProMap().get(type);
				int size = proMap.size();
				for (int i = 1; i <= size; i++) {
					ProbabilityEventModel eventModel = proMap.get(i);
					Struct_list_218 goodsInfo = (Struct_list_218) ProbabilityEventUtil
							.getEventByProbability(eventModel);
					typeGoodsMap.put(goodsInfo.getId(), i);
				}
			}
			shopData.getGoodsMap().put(type, typeGoodsMap);
			Map<Integer, Integer> map = shopData.getShoppingMap().get(type);
			if(map!=null) {				
				map.clear();
			}
		} catch (Exception e) {
			LogTool.error(e, ShopFunction.class, hero.getId(), hero.getName(), "refreshShopData fail");
		}
	}

	private ProbabilityEventModel selectGoods(int rebornLvl, List<Struct_list_218> selectList) {
		ProbabilityEventModel probabilityEventModel = ProbabilityEventFactory.getProbabilityEvent();
		int[][] sz = null;
		for (Struct_list_218 goods : selectList) {
			sz = goods.getSz();
			if (rebornLvl >= sz[0][0] && rebornLvl <= sz[0][1]) {
				probabilityEventModel.addProbabilityEvent(goods.getPro(), goods);
			}
		}
		return probabilityEventModel;
	}

	/**
	 * 检测红点
	 * @param hero
	 * @return
	 */
	public void checkRedPoint(Hero hero, boolean isLogin) {
		try {
			ShopData shopData = hero.getShopData();
			if (!HeroFunction.getIns().checkSystemOpen(hero, ShopConst.SysId)) {
				return;
			}
			if (shopData == null) {
				return;
			}
//			Map<Integer, Integer> typeGoodsMap = shopData.getGoodsMap().get(ShopConst.VIP_SHOP);
//			Map<Integer, Integer> buyMap = shopData.getShoppingMap().get(ShopConst.VIP_SHOP);
//			if (typeGoodsMap != null) {
//				Iterator<Entry<Integer, Integer>> goodsIterator = typeGoodsMap.entrySet().iterator();
//				Struct_list_218 list_218 = null;
//				for (; goodsIterator.hasNext();) {
//					Entry<Integer, Integer> entry = goodsIterator.next();
//					int buyNum = 0;
//					if (buyMap != null) {
//						Integer num = buyMap.get(entry.getKey());
//						if (num == null) {
//							num = 0;
//						}
//						buyNum = num;
//					}
//					list_218 = Config_list_218.getIns().get(entry.getKey());
//					int time = list_218.getTime();
//					if (time == 0 || time > buyNum) {
//						return true;
//					}
//				}
//			}
			long zcBossJf = hero.getZcBossJf();
			if (zcBossJf == 0) {
				return;
			}
			Map<Integer, Integer> typeGoodsMap = shopData.getGoodsMap().get(ShopConst.ZCBOSS_SHOP);
			Map<Integer, Integer> buyMap = shopData.getShoppingMap().get(ShopConst.ZCBOSS_SHOP);
			if (typeGoodsMap != null) {
				Iterator<Entry<Integer, Integer>> goodsIterator = typeGoodsMap.entrySet().iterator();
				Struct_list_218 list_218 = null;
				for (; goodsIterator.hasNext();) {
					Entry<Integer, Integer> entry = goodsIterator.next();
					int buyNum = 0;
					if (buyMap != null) {
						Integer num = buyMap.get(entry.getKey());
						if (num == null) {
							num = 0;
						}
						buyNum = num;
					}
					list_218 = Config_list_218.getIns().get(entry.getKey());
					int time = list_218.getTime();
					if (time == 0 || time > buyNum) {
						int[][] money = list_218.getMoney();
						if (zcBossJf >= money[0][2]) {
							if (isLogin) {
								RedPointFunction.getIns().addLoginRedPoint(hero, ShopConst.SysId, ShopConst.ZC_RedPoint,
										RedPointConst.HAS_RED);
							} else {
								RedPointFunction.getIns().fastUpdateRedPoint(hero, ShopConst.SysId,
										ShopConst.ZC_RedPoint, RedPointConst.HAS_RED);
							}
							return;
						}
					}
				}
			}
		} catch (Exception e) {
			LogTool.error(e, ShopFunction.class, hero.getId(), hero.getName(), "ShopFunction checkRedPoint");
		}
	}

}
