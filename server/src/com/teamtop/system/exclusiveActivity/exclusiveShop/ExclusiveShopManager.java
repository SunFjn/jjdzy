package com.teamtop.system.exclusiveActivity.exclusiveShop;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSON;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.event.backstage.events.flowHero.FlowHeroEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.exclusiveActivity.AbsExActSystemEvent;
import com.teamtop.system.exclusiveActivity.AbsExclusiveActivityManager;
import com.teamtop.system.exclusiveActivity.ExclusiveActivityFunction;
import com.teamtop.system.exclusiveActivity.exclusiveShop.model.ExclusiveShop;
import com.teamtop.system.exclusiveActivity.model.ExclusiveActivityData;
import com.teamtop.system.exclusiveActivity.model.ExclusiveActivityModel;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.log.LogTool;

import excel.config.Config_zshdzssd_315;
import excel.struct.Struct_zshdzssd_315;

public class ExclusiveShopManager extends AbsExclusiveActivityManager {

	private static ExclusiveShopManager ins;

	public ExclusiveShopManager() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized ExclusiveShopManager getIns() {
		if (ins == null) {
			ins = new ExclusiveShopManager();
		}
		return ins;
	}

	@Override
	public void handleOpenPub() {
		// TODO Auto-generated method stub

	}

	@Override
	public void heroActOpen(Hero hero, int id) {
		// TODO Auto-generated method stub

	}

	@Override
	public void handleEndPub() {
		// TODO Auto-generated method stub

	}

	@Override
	public void heroActEnd(Hero hero, int id) {
		// TODO Auto-generated method stub

	}

	@Override
	public ExclusiveActivityModel createExclusiveActivityModel(Hero hero, int id) {
		ExclusiveActivityData exActData = hero.getExclusiveActivityData();
		ExclusiveShop shop = (ExclusiveShop) exActData.getExActivityMap().get(id);
		if (shop == null) {
			shop = new ExclusiveShop();
			Map<Integer, Integer> alreadyByMap = new HashMap<Integer, Integer>();
			shop.setAlreadyByMap(alreadyByMap);
		}
		return shop;
	}

	@Override
	public Class<?> getExclusiveActivityModel() {
		return ExclusiveShop.class;
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id, int id) {
		// TODO Auto-generated method stub

	}

	@Override
	public void consumeHandle(Hero hero, int consumeNum, int reason, int id) {
		// TODO Auto-generated method stub

	}

	@Override
	public AbsExActSystemEvent getSystemEvent() {
		return ExclusiveShopSysEvent.getIns();
	}

	@Override
	public void openUI(Hero hero, int id) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
//			if (!ExclusiveActivityFunction.getIns().checkHeroExActOpen(hero, id)) {
//				return;
//			}
			ExclusiveShop exclusiveShop = (ExclusiveShop) ExclusiveActivityFunction.getIns().getExActData(hero, id);
			Map<Integer, Integer> alreadyByMap = exclusiveShop.getAlreadyByMap();
			Map<Integer, Map<Integer, Struct_zshdzssd_315>> qsMap = ExclusiveShopSysCache.getQsMap();
			int gid = 0;
			int qs = exclusiveShop.getQs();
			Map<Integer, Struct_zshdzssd_315> map = qsMap.get(qs);
			Iterator<Integer> iterator = map.keySet().iterator();
			int alreadyBuy = 0;
			List<Object[]> list = new ArrayList<>();
			for (; iterator.hasNext();) {
				gid = iterator.next();
				Integer num = alreadyByMap.get(gid);
				if (num == null) {
					num = 0;
				}
				alreadyBuy = num;
				list.add(new Object[] { gid, alreadyBuy });
			}
			ExclusiveShopSender.sendCmd_8160(hid, id, list.toArray());
		} catch (Exception e) {
			LogTool.error(e, ExclusiveShopManager.class, hid, hero.getName(), "ExclusiveShopManager openUI");
		}
	}

	/**
	 * 购买商品
	 * @param index 商品编号
	 */
	public void buy(Hero hero, int id, int index) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
//			if (!ExclusiveActivityFunction.getIns().checkHeroExActOpen(hero, id)) {
//				return;
//			}
			if(!ExclusiveActivityFunction.getIns().checkHasData(hero, id)) {
				return;
			}
			ExclusiveShop exclusiveShop = (ExclusiveShop) ExclusiveActivityFunction.getIns().getExActData(hero, id);
			Map<Integer, Integer> alreadyByMap = exclusiveShop.getAlreadyByMap();
			Map<Integer, Map<Integer, Struct_zshdzssd_315>> qsMap = ExclusiveShopSysCache.getQsMap();
			int qs = exclusiveShop.getQs();
			Map<Integer, Struct_zshdzssd_315> map = qsMap.get(qs);
			if (!map.containsKey(index)) {
				return;
			}
			Struct_zshdzssd_315 zshdzssd_315 = map.get(index);
			int time = zshdzssd_315.getTime();
			Integer buyNum = alreadyByMap.get(index);
			if (buyNum == null) {
				buyNum = 0;
			}
			if (time > 0) {
				if (buyNum >= time) {
					// 已达购买上限、
					ExclusiveShopSender.sendCmd_8162(hid, id, 0, 1, 0);
					return;
				}
			}
			int[][] money = zshdzssd_315.getMoney();
			if (!UseAddUtil.canUse(hero, money)) {
				// 元宝不足
				ExclusiveShopSender.sendCmd_8162(hid, id, 0, 2, 0);
				return;
			}
			UseAddUtil.use(hero, money, SourceGoodConst.EXCLUSIVE_SHOP, true);
			if (time > 0) {
				buyNum += 1;
				alreadyByMap.put(index, buyNum);
			}
			int[][] item = zshdzssd_315.getItem();
			UseAddUtil.add(hero, item, SourceGoodConst.EXCLUSIVE_SHOP, UseAddUtil.getDefaultMail(), true);
			ExclusiveShopSender.sendCmd_8162(hid, id, 1, index, buyNum);
			int actId = exclusiveShop.getActId();
			String usesys = hero.getTempData().getAccount().getUsesys();
			String rewardStr = JSON.toJSONString(item);
			FlowHeroEvent.addHeroExActFlow(hero.getId(), hero.getZoneid(), hero.getName(), hero.getLevel(),
					hero.getVipLv(), id, actId, hero.getOpenid(), hero.getLoginIp(), 1, hero.getPf(), usesys,
					rewardStr, money[0][2], buyNum, hero.getReincarnationLevel());
		} catch (Exception e) {
			LogTool.error(e, ExclusiveShopManager.class, hid, hero.getName(),
					"ExclusiveShopManager buy index=" + index);
		}
	}

	@Override
	public void updateTable(Hero hero) {
		try {
			List<Struct_zshdzssd_315> sortList = Config_zshdzssd_315.getIns().getSortList();
			List<Object[]> actDataList = new ArrayList<>();
			int size = sortList.size();
			for (int i = 0; i < size; i++) {
				Struct_zshdzssd_315 struct = sortList.get(i);
				List<Object[]> itemList = new ArrayList<>();
				int[][] items = struct.getItem();
				for (int[] item : items) {
					itemList.add(new Object[] { item[0], item[1], item[2] });
				}
				List<Object[]> costList = new ArrayList<>();
				int[][] costs = struct.getMoney();
				for (int[] cost : costs) {
					costList.add(new Object[] { cost[0], cost[1], cost[2] });
				}
				actDataList.add(new Object[] { struct.getId(), struct.getQs(), struct.getWz(), itemList.toArray(),
						costList.toArray(), struct.getTime() });
			}
			ExclusiveShopSender.sendCmd_8164(hero.getId(), actDataList.toArray());
		} catch (Exception e) {
			LogTool.error(e, this, "ExclusiveShopManager updateTable");
		}
	}

	@Override
	public void houtaiInitExcel() {
		ExclusiveShopSysCache.houtaiInitExcel();
	}

	@Override
	public boolean checkExcel() {
		List<Struct_zshdzssd_315> sortList = Config_zshdzssd_315.getIns().getSortList();
		int mapSize = Config_zshdzssd_315.getIns().getMap().size();
		int size = sortList.size();
		if (size > 0 && size == mapSize) {
			return true;
		}
		return false;
	}

}
