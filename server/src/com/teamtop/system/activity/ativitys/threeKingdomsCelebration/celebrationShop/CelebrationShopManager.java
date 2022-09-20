package com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationShop;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.AbstractActivityManager;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationShop.model.CelebrationShop;
import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.event.backstage.events.flowHero.FlowHeroEvent;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.shop.ShopEnum;
import com.teamtop.util.log.LogTool;

import excel.struct.Struct_sgqdsc_261;

public class CelebrationShopManager extends AbstractActivityManager {

	private static CelebrationShopManager ins;

	private CelebrationShopManager() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized CelebrationShopManager getIns() {
		if (ins == null) {
			ins = new CelebrationShopManager();
		}
		return ins;
	}

	@Override
	public void actOpen() {
		// TODO Auto-generated method stub

	}

	@Override
	public void heroActOpen(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public void actEnd() {
		// TODO Auto-generated method stub

	}

	@Override
	public void heroActEnd(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public ActivityData getActivityData(Hero hero, ActivityInfo activityInfo) {
		CelebrationShop shop = new CelebrationShop(hero.getId(), activityInfo.getIndex(), activityInfo.getActId(), activityInfo.getPeriods());
		Map<Integer, Integer> alreadyByMap = new HashMap<Integer, Integer>();
		shop.setAlreadyByMap(alreadyByMap);
		return shop;
	}

	@Override
	public Class<?> getActivityData() {
		// TODO Auto-generated method stub
		return CelebrationShop.class;
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		// TODO Auto-generated method stub

	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		// TODO Auto-generated method stub
		return CelebrationShopSysEvent.getIns();
	}

	@Override
	public void openUI(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.CELEBRATION_SHOP)) {
				return;
			}
			CelebrationShop celebrationShop = (CelebrationShop) ActivityFunction.getIns().getActivityData(hero, ActivitySysId.CELEBRATION_SHOP);
			Map<Integer, Integer> alreadyByMap = celebrationShop.getAlreadyByMap();
			Map<Integer, Map<Integer, Struct_sgqdsc_261>> qsMap = CelebrationShopSysCache.getQsMap();
			int id = 0;
			int qs = celebrationShop.getPeriods();
			Map<Integer, Struct_sgqdsc_261> map = qsMap.get(qs);
			Iterator<Integer> iterator = map.keySet().iterator();
			int alreadyBuy = 0;
			List<Object[]> list = new ArrayList<>();
			for (; iterator.hasNext();) {
				id = iterator.next();
				Integer num = alreadyByMap.get(id);
				if (num == null) {
					num = 0;
				}
				alreadyBuy = num;
				list.add(new Object[] { id, alreadyBuy });
			}
			CelebrationShopSender.sendCmd_8130(hid, list.toArray());
		} catch (Exception e) {
			LogTool.error(e, CelebrationShopManager.class, hid, hero.getName(),
					"CelebrationShopManager openUI");
		}
	}

	/**
	 * 购买商品
	 * @param index 商品编号
	 */
	public void buy(Hero hero, int index) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.CELEBRATION_SHOP)) {
				return;
			}
			CelebrationShop celebrationShop = (CelebrationShop) ActivityFunction.getIns().getActivityData(hero,
					ActivitySysId.CELEBRATION_SHOP);
			Map<Integer, Integer> alreadyByMap = celebrationShop.getAlreadyByMap();
			Map<Integer, Map<Integer, Struct_sgqdsc_261>> qsMap = CelebrationShopSysCache.getQsMap();
			int qs = celebrationShop.getPeriods();
			Map<Integer, Struct_sgqdsc_261> map = qsMap.get(qs);
			if (!map.containsKey(index)) {
				return;
			}
			Struct_sgqdsc_261 sgqdsc_261 = map.get(index);
			int time = sgqdsc_261.getTime();
			Integer buyNum = alreadyByMap.get(index);
			if (buyNum == null) {
				buyNum = 0;
			}
			if (time > 0) {
				if (buyNum >= time) {
					// 已达购买上限、
					CelebrationShopSender.sendCmd_8132(hid, 0, 1, 0);
					return;
				}
			}
			int[][] money = sgqdsc_261.getMoney();
			if (!UseAddUtil.canUse(hero, money)) {
				// 元宝不足
				CelebrationShopSender.sendCmd_8132(hid, 0, 2, 0);
				return;
			}
			UseAddUtil.use(hero, money, SourceGoodConst.CELEBRATION_SHOP, true);
			if (time > 0) {
				buyNum += 1;
				alreadyByMap.put(index, buyNum);
			}
			int[][] item = sgqdsc_261.getItem();
			UseAddUtil.add(hero, item, SourceGoodConst.CELEBRATION_SHOP, UseAddUtil.getDefaultMail(), true);
			CelebrationShopSender.sendCmd_8132(hid, 1, index, buyNum);
			// 后台商城购买表
			int itemid = item[0][1];
			if(itemid==0) {
				itemid = item[0][0];
			}
			int itemcost = money[0][2];
			int buynum = 1;
			int costtype = money[0][0];
			String usesys = hero.getTempData().getAccount().getUsesys();
			FlowHeroEvent.addShopFlow(hid, hero.getLevel(), ShopEnum.CELEBRATION_SHOP.getType(), itemid, itemcost,
					buynum, costtype, hero.getZoneid(), hero.getLoginPf(), usesys, hero.getReincarnationLevel());
		} catch (Exception e) {
			LogTool.error(e, CelebrationShopManager.class, hid, hero.getName(),
					"CelebrationShopManager buy index=" + index);
		}
	}

}
