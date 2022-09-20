package com.teamtop.system.openDaysSystem.otherDiscountStore;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.discountStore.DiscountStoreFunction;
import com.teamtop.system.discountStore.model.ConfigModel;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.openDaysSystem.AbsOpenDaysManager;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;
import com.teamtop.system.openDaysSystem.model.AbsOpenDaysSystemModel;
import com.teamtop.system.openDaysSystem.model.HeroOpenDaysSysData;
import com.teamtop.system.openDaysSystem.otherDiscountStore.model.OtherDiscountStore;
import com.teamtop.util.time.TimeDateUtil;

public class OtherDiscountStoreManager extends AbsOpenDaysManager {
	private static OtherDiscountStoreManager ins = null;

	public static OtherDiscountStoreManager getIns() {
		if (ins == null) {
			ins = new OtherDiscountStoreManager();
		}
		return ins;
	}

	private OtherDiscountStoreManager() {
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
		if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.OTHER_DISCOUNT_SHOP)) {
			return;
		}
		if (!DiscountStoreFunction.getIns().checkCanOpen(hero)) {
			// 老系统开，则新系统不开
			return;
		}
		ArrayList<Object> goodsList = new ArrayList<Object>();
		Map<Integer, Integer> goodsMap = hero.getDiscountStore().getGoodsMap();
		int openDays = TimeDateUtil.betweenOpen();
		Map<Integer, ConfigModel> configGoodsMap = OtherDiscountStoreCache.getConfigGoodsMap().get(openDays);
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
		OtherDiscountStoreSender.sendCmd_4770(hero.getId(), goodsList.toArray());
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
		if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.OTHER_DISCOUNT_SHOP)) {
			return;
		}
		if (!DiscountStoreFunction.getIns().checkCanOpen(hero)) {
			// 老系统开，则新系统不开
			return;
		}
		int openDays = TimeDateUtil.betweenOpen();
		Map<Integer, ConfigModel> configGoodsMap = OtherDiscountStoreCache.getConfigGoodsMap().get(openDays);
		ConfigModel configModel = configGoodsMap.get(goodsId);
		if (configModel == null) {// 商品不存在
			OtherDiscountStoreSender.sendCmd_4772(hero.getId(), OtherDiscountStoreConst.FAILURE_NOT_GOODS, 0);
			return;
		}
		int vip = configModel.getVip();
		if (hero.getVipLv() < vip) {// vip等级不足
			OtherDiscountStoreSender.sendCmd_4772(hero.getId(), OtherDiscountStoreConst.FAILURE_NOT_VIPLV, 0);
			return;
		}
		int limitNum = configModel.getTime();
		Map<Integer, Integer> goodsMap = hero.getDiscountStore().getGoodsMap();
		Integer buyNum = goodsMap.get(goodsId);
		if (buyNum == null) {
			buyNum = 0;
		}
		if (limitNum != 0 && buyNum >= limitNum) {// 商品已售罄
			OtherDiscountStoreSender.sendCmd_4772(hero.getId(), OtherDiscountStoreConst.FAILURE_NOT_GOODSNUM, 0);
			return;
		}
		int[][] money = configModel.getMoney();
		if (!UseAddUtil.canUse(hero, money)) {// 元宝不足
			OtherDiscountStoreSender.sendCmd_4772(hero.getId(), OtherDiscountStoreConst.FAILURE_NOT_TREASURYNUM, 0);
			return;
		}
		int[][] item = configModel.getItem();
		UseAddUtil.add(hero, item, SourceGoodConst.DISCOUNTSTORE_BUYITEM, UseAddUtil.getDefaultMail(), true);
		UseAddUtil.use(hero, money, SourceGoodConst.DISCOUNTSTORE_BUYCONYB, true);// 消耗元宝
		goodsMap.put(goodsId, buyNum + 1);
		OtherDiscountStoreSender.sendCmd_4772(hero.getId(), OtherDiscountStoreConst.SUCCESS, goodsId);

	}

	@Override
	public void handleOpenPub() {
		// TODO Auto-generated method stub

	}

	@Override
	public void handleOpen(Hero hero, int uid) {
		// TODO Auto-generated method stub

	}

	@Override
	public void handleEndPub() {
		// TODO Auto-generated method stub

	}

	@Override
	public void handleEnd(Hero hero, int uid) {
		// TODO Auto-generated method stub

	}

	@Override
	public AbsOpenDaysSystemModel getSystemModel(Hero hero, int uid) {
		HeroOpenDaysSysData heroOpenDaysSysData = hero.getHeroOpenDaysSysData();
		OtherDiscountStore otherDiscountStore = (OtherDiscountStore) heroOpenDaysSysData.getOpSysDataMap().get(uid);
		if (otherDiscountStore == null) {
			otherDiscountStore = new OtherDiscountStore();
			otherDiscountStore.setGoodsMap(new HashMap<>());
		}
		return otherDiscountStore;
	}

	@Override
	public Class<?> getSystemModel() {
		// TODO Auto-generated method stub
		return OtherDiscountStore.class;
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		// TODO Auto-generated method stub
		return OtherDiscountStoreEvent.getIns();
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		// TODO Auto-generated method stub

	}

	@Override
	public void consumeHandle(Hero hero, int consumeNum, int reason) {
		// TODO Auto-generated method stub

	}
}
