package com.teamtop.system.discountStore;

import java.util.ArrayList;
import java.util.Map;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.discountStore.model.ConfigModel;
import com.teamtop.system.event.backstage.events.flowHero.FlowHeroEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.shop.ShopEnum;

public class DiscountStoreManager {
	private static DiscountStoreManager ins = null;

	public static DiscountStoreManager getIns() {
		if (ins == null) {
			ins = new DiscountStoreManager();
		}
		return ins;
	}

	private DiscountStoreManager() {
	}

	/**
	 * 打开界面
	 * 
	 * @param hero
	 */
	public void openUI(Hero hero) {
		// TODO Auto-generated method stub
		if (hero == null) {
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, DiscountStoreConst.DISCOUNTSTORE_SYSID)) {
			return;
		}
		if (DiscountStoreFunction.getIns().checkCanOpen(hero)) {
			return;
		}
		ArrayList<Object> goodsList = new ArrayList<Object>();
		Map<Integer, Integer> goodsMap = hero.getDiscountStore().getGoodsMap();
		Map<Integer, ConfigModel> configGoodsMap = DiscountStoreCache.getConfigGoodsMap()
				.get(DiscountStoreFunction.getIns().getIndexDay());
		for (Map.Entry<Integer, ConfigModel> entry : configGoodsMap.entrySet()) {
			Integer buyNum = goodsMap.get(entry.getKey());
			if (buyNum == null) {
				buyNum = 0;
			}
			int restTimes = -1;
			ConfigModel value = entry.getValue();
			if (value.getTime() != 0) {
				restTimes = value.getTime() - buyNum;
			}
			goodsList.add(new Object[] { entry.getKey(), restTimes });
		}
		DiscountStoreSender.sendCmd_2632(hero.getId(), goodsList.toArray());
	}

	/**
	 * 购买
	 * 
	 * @param hero
	 * @param goodsId 商品id
	 */
	public void buy(Hero hero, int goodsId) {
		// TODO Auto-generated method stub
		if (hero == null) {
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, DiscountStoreConst.DISCOUNTSTORE_SYSID)) {
			return;
		}
		if (DiscountStoreFunction.getIns().checkCanOpen(hero)) {
			return;
		}
		Map<Integer, ConfigModel> configGoodsMap = DiscountStoreCache.getConfigGoodsMap()
				.get(DiscountStoreFunction.getIns().getIndexDay());
		ConfigModel configModel = configGoodsMap.get(goodsId);
		if (configModel == null) {// 商品不存在
			DiscountStoreSender.sendCmd_2634(hero.getId(), DiscountStoreConst.FAILURE_NOT_GOODS, 0);
			return;
		}
		int vip = configModel.getVip();
		if (hero.getVipLv() < vip) {// vip等级不足
			DiscountStoreSender.sendCmd_2634(hero.getId(), DiscountStoreConst.FAILURE_NOT_VIPLV, 0);
			return;
		}
		int limitNum = configModel.getTime();
		Map<Integer, Integer> goodsMap = hero.getDiscountStore().getGoodsMap();
		Integer buyNum = goodsMap.get(goodsId);
		if (buyNum == null) {
			buyNum = 0;
		}
		if (limitNum != 0 && buyNum >= limitNum) {// 商品已售罄
			DiscountStoreSender.sendCmd_2634(hero.getId(), DiscountStoreConst.FAILURE_NOT_GOODSNUM, 0);
			return;
		}
		int[][] money = configModel.getMoney();
		if (!UseAddUtil.canUse(hero, money)) {// 元宝不足
			DiscountStoreSender.sendCmd_2634(hero.getId(), DiscountStoreConst.FAILURE_NOT_TREASURYNUM, 0);
			return;
		}
		int[][] item = configModel.getItem();
		UseAddUtil.add(hero, item, SourceGoodConst.DISCOUNTSTORE_BUYITEM, UseAddUtil.getDefaultMail(), true);
		UseAddUtil.use(hero, money, SourceGoodConst.DISCOUNTSTORE_BUYCONYB, true);// 消耗元宝
		goodsMap.put(goodsId, buyNum + 1);
		DiscountStoreSender.sendCmd_2634(hero.getId(), DiscountStoreConst.SUCCESS, goodsId);
		String usesys = hero.getTempData().getAccount().getUsesys();
		int itemid = item[0][1];
		if(itemid==0) {
			itemid = item[0][0];
		}
		int itemcost = money[0][2];
		int buynum = 1;
		int costtype = money[0][0];
		int type = ShopEnum.DISCOUNT_SHOP.getType();
		FlowHeroEvent.addShopFlow(hero.getId(), hero.getLevel(), type, itemid, itemcost, buynum, costtype,
				hero.getZoneid(), hero.getLoginPf(), usesys, hero.getReincarnationLevel());
	}
}
