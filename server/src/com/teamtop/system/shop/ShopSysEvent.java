package com.teamtop.system.shop;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.shop.model.ShopData;

import excel.config.Config_stroe_218;
import excel.struct.Struct_stroe_218;

public class ShopSysEvent extends AbsSystemEvent {

	private static ShopSysEvent shopSysEvent;

	private ShopSysEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized ShopSysEvent getIns() {
		if (shopSysEvent == null) {
			shopSysEvent = new ShopSysEvent();
		}
		return shopSysEvent;
	}

	@Override
	public void init(Hero hero) {
		ShopData shopData = hero.getShopData();
		if (shopData == null) {
			shopData = new ShopData();
			hero.setShopData(shopData);
			shopData.setHid(hero.getId());
			Map<Integer, Map<Integer, Integer>> shoppingMap = new HashMap<>();
			Map<Integer, Map<Integer, Integer>> goodsMap = new HashMap<>();
			shopData.setShoppingMap(shoppingMap);
			shopData.setGoodsMap(goodsMap);
			List<Struct_stroe_218> sortList = Config_stroe_218.getIns().getSortList();
			// 刷新初始化商店商品
			for (Struct_stroe_218 stroe : sortList) {
				ShopFunction.getIns().refreshShopData(hero, stroe.getStore());
			}
		}else {
			if (!shopData.getGoodsMap().containsKey(ShopConst.FIRE_SHOP)||shopData.getGoodsMap().get(ShopConst.FIRE_SHOP).size()==0) {
				ShopFunction.getIns().refreshShopData(hero,ShopConst.FIRE_SHOP);
			}
			if (!shopData.getGoodsMap().containsKey(ShopConst.ZCBOSS_SHOP)||shopData.getGoodsMap().get(ShopConst.ZCBOSS_SHOP).size()==0) {
				ShopFunction.getIns().refreshShopData(hero,ShopConst.ZCBOSS_SHOP);
			}
			if (!shopData.getGoodsMap().containsKey(ShopConst.YB_SHOP)||shopData.getGoodsMap().get(ShopConst.YB_SHOP).size()==0) {
				ShopFunction.getIns().refreshShopData(hero,ShopConst.YB_SHOP);
			}
			if (!shopData.getGoodsMap().containsKey(ShopConst.TRIAL_SHOP)||shopData.getGoodsMap().get(ShopConst.TRIAL_SHOP).size()==0) {
				ShopFunction.getIns().refreshShopData(hero,ShopConst.TRIAL_SHOP);
			}
		}
	}

	@Override
	public void login(Hero hero) {
		ShopFunction.getIns().checkRedPoint(hero, true);
	}

	@Override
	public void passGuanqia(Hero hero, int passGuanqia) {
		
	}

	@Override
	public void loginReset(Hero hero, int now) {
		dailyReset(hero, now);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		dailyReset(hero, now);
	}
	
	public void dailyReset(Hero hero, int now) {
		ShopData shopData = hero.getShopData();
		if (shopData != null) {
			// 每日重置刷新
			List<Struct_stroe_218> sortList = Config_stroe_218.getIns().getSortList();
			// 刷新初始化商店商品
			for (Struct_stroe_218 stroe : sortList) {
				ShopFunction.getIns().refreshShopData(hero, stroe.getStore());
			}
			shopData.getShoppingMap().clear();
		}
	}

}
