package com.teamtop.system.activity.ativitys.doubleTwelveShop;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map.Entry;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.AbstractActivityManager;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.bag.BagFunction;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.common.CommonUtil;

import excel.config.Config_s12sc_771;
import excel.struct.Struct_s12sc_771;

public class DoubleTwelveShopManager extends AbstractActivityManager {
	private static volatile DoubleTwelveShopManager ins = null;

	public static DoubleTwelveShopManager getIns() {
		if (ins == null) {
			synchronized (DoubleTwelveShopManager.class) {
				if (ins == null) {
					ins = new DoubleTwelveShopManager();
				}
			}
		}
		return ins;
	}

	private DoubleTwelveShopManager() {
	}

	public void buyItems(Hero hero, Object[] itemInfos) {
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.DOUBLE_TWELVE_SHOP_ACT)) {
			return;
		}

		DoubleTwelveShop model = DoubleTwelveShopFunction.getIns().getModel(hero);
		int nowCost[][] = { { 4, 0, 0 } };
		int qCost[][] = { { 1, DoubleTwelveShopConst.ITEM_ID, 0 } };
		int items[][] = {};
		for (Object obj : itemInfos) {
			Object[] objs = (Object[]) obj;
			int itemId = (int) objs[0];
			int count = (int) objs[1];
			if (count == 0) {
				// 参数错误
				return;
			}
			Struct_s12sc_771 config = DoubleTwelveShopFunction.getIns().getItemConfig(model.getPeriods(), itemId);
			if (config == null) {
				// 配置不存在
				DoubleTwelveShopSender.sendCmd_10702(hero.getId(), 1);
				return;
			}
			// 检查限购
			int maxBuyTimes = config.getCs();
			Integer nowBuyTimes = model.getItemInfoMap().get(itemId);
			if (nowBuyTimes == null) {
				nowBuyTimes = 0;
				model.getItemInfoMap().put(itemId, nowBuyTimes);
			}
			if (nowBuyTimes + count > maxBuyTimes) {
				// 超过限购次数
				DoubleTwelveShopSender.sendCmd_10702(hero.getId(), 2);
				return;
			}
			int[][] cost = config.getXj();
			// 统计总金额
			nowCost[0][2] += cost[0][2] * count;
			int item[][] = config.getDj();
			int nItem[][] = CommonUtil.copyArrayAndNum(item, count);
			items = CommonUtil.arrayPlusArraysItems(items, nItem);
		}

		// 计算减免
		int jM = DoubleTwelveShopFunction.getIns().getJianMian(model.getPeriods(), nowCost[0][2]);
		nowCost[0][2] -= jM;

		// 计算代金券减免
		int qNum = BagFunction.getIns().getGoodsNumBySysId(hero.getId(), DoubleTwelveShopConst.ITEM_ID);
		if (nowCost[0][2] <= qNum) {
			// 全抵金券支付
			qCost[0][2] = nowCost[0][2];
			nowCost[0][2] = 0;
		} else {
			if (qNum > 0) {
				qCost[0][2] = qNum;
				nowCost[0][2] -= qNum;
			}
		}

		if (qCost[0][2] > 0) {
			if (!UseAddUtil.canUse(hero, qCost)) {
				// 抵金券不足
				DoubleTwelveShopSender.sendCmd_10702(hero.getId(), 3);
				return;
			}
		}

		if (nowCost[0][2] > 0) {
			if (!UseAddUtil.canUse(hero, nowCost)) {
				// 元宝不足
				DoubleTwelveShopSender.sendCmd_10702(hero.getId(), 4);
				return;
			}
		}

		// 扣除资源
		if (qCost[0][2] > 0) {
			UseAddUtil.use(hero, qCost, SourceGoodConst.DOUBLE_TWELVE_SHOP_BUY_COST, true);
		}
		if (nowCost[0][2] > 0) {
			UseAddUtil.use(hero, nowCost, SourceGoodConst.DOUBLE_TWELVE_SHOP_BUY_COST, true);
		}

		for (Object obj : itemInfos) {
			Object[] objs = (Object[]) obj;
			int itemId = (int) objs[0];
			int count = (int) objs[1];
			int nowBuyTimes = model.getItemInfoMap().get(itemId);
			model.getItemInfoMap().put(itemId, nowBuyTimes + count);
		}

		// 添加货品
		UseAddUtil.add(hero, items, SourceGoodConst.DOUBLE_TWELVE_SHOP_BUY, UseAddUtil.getDefaultMail(), true);

		DoubleTwelveShopSender.sendCmd_10702(hero.getId(), 0);
	}

	@Override
	public void actOpen() {
	}

	@Override
	public void heroActOpen(Hero hero) {
		DoubleTwelveShop model = DoubleTwelveShopFunction.getIns().getModel(hero);
		// 初始化商品
		for (Struct_s12sc_771 config : Config_s12sc_771.getIns().getSortList()) {
			if (config.getQs() == model.getPeriods()) {
				model.getItemInfoMap().put(config.getId(), 0);
			}
		}
	}

	@Override
	public void actEnd() {
	}

	@Override
	public void heroActEnd(Hero hero) {
	}

	@Override
	public ActivityData getActivityData(Hero hero, ActivityInfo activityInfo) {
		DoubleTwelveShop model = new DoubleTwelveShop();
		model.setItemInfoMap(new HashMap<>());
		model.setPeriods(activityInfo.getPeriods());
		model.setHid(hero.getId());
		model.setActId(activityInfo.getActId());
		model.setIndexId(activityInfo.getIndex());
		return model;
	}

	@Override
	public Class<?> getActivityData() {
		return DoubleTwelveShop.class;
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		return DoubleTwelveShopEvent.getIns();
	}

	@Override
	public void openUI(Hero hero) {
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.DOUBLE_TWELVE_SHOP_ACT)) {
			return;
		}
		DoubleTwelveShop model = DoubleTwelveShopFunction.getIns().getModel(hero);
		List<Object[]> itemInfos = new ArrayList<>();
		for (Entry<Integer, Integer> entry : model.getItemInfoMap().entrySet()) {
			Integer cfgId = entry.getKey();
			Integer count = entry.getValue();
			itemInfos.add(new Object[] { cfgId, count });
		}
		DoubleTwelveShopSender.sendCmd_10700(hero.getId(), itemInfos.toArray());
	}

}
