package com.teamtop.system.shop;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.ativitys.warOrder.WarOrderEnum;
import com.teamtop.system.activity.ativitys.warOrder.WarOrderFunction;
import com.teamtop.system.daytask.DayTaskConst;
import com.teamtop.system.daytask.DayTaskFunction;
import com.teamtop.system.event.backstage.events.flowHero.FlowHeroEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.openDaysSystem.warOrder.WarOrderNewEnum;
import com.teamtop.system.openDaysSystem.warOrder.WarOrderNewFunction;
import com.teamtop.system.shop.model.ShopData;
import com.teamtop.util.log.LogTool;

import excel.config.Config_list_218;
import excel.config.Config_stroe_218;
import excel.struct.Struct_list_218;
import excel.struct.Struct_stroe_218;

/**
 * 商城
 * @author hzp
 *
 */
public class ShopManager {

	private static ShopManager shopManager;

	private ShopManager() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized ShopManager getIns() {
		if (shopManager == null) {
			shopManager = new ShopManager();
		}
		return shopManager;
	}

	/**
	 * 打开商店
	 * 
	 * @param hero
	 * @param type
	 */
	public void openShop(Hero hero, int type) {
		if (hero == null) {
			return;
		}
		try {
			ShopData shopData = hero.getShopData();
			if (shopData == null) {
				return;
			}
			List<Object[]> typeGoodsList = new ArrayList<>();
			// List<Object[]> typeRefreshList = new ArrayList<>();
			Map<Integer, Map<Integer, Integer>> shoppingMap = shopData.getShoppingMap();
			Map<Integer, Map<Integer, Integer>> goodsMap = shopData.getGoodsMap();
			if (type > 0) {
				if (goodsMap != null && goodsMap.size() > 0) {
					Map<Integer, Integer> typeGoodsMap = goodsMap.get(type);
					Map<Integer, Integer> buyMap = shoppingMap.get(type);
					if (typeGoodsMap != null && typeGoodsMap.size() > 0) {
						List<Object[]> goodsList = new ArrayList<>();
						Iterator<Entry<Integer, Integer>> iterator = typeGoodsMap.entrySet().iterator();
						for (; iterator.hasNext();) {
							Entry<Integer, Integer> entry = iterator.next();
							int buyNum = 0;
							if (buyMap != null) {
								Integer num = buyMap.get(entry.getKey());
								if (num == null) {
									num = 0;
								}
								buyNum = num;
							}
							goodsList.add(new Object[] { entry.getKey(), entry.getValue(), buyNum });
						}
						typeGoodsList.add(new Object[] { type, goodsList.toArray() });
					}
				}
			} else {
				//检测一遍商城里刷到道具id
				boolean isExitWrongId=false;
				Iterator<Integer> iterator = goodsMap.keySet().iterator();
				for (; iterator.hasNext();) {
					int shopType = iterator.next();
					Map<Integer, Integer> typeGoodsMap = goodsMap.get(shopType);
					if (typeGoodsMap != null && typeGoodsMap.size() > 0) {
						Iterator<Entry<Integer, Integer>> goodsIterator = typeGoodsMap.entrySet().iterator();
						for (; goodsIterator.hasNext();) {
							Entry<Integer, Integer> entry = goodsIterator.next();
							Integer itemid = entry.getKey();
							Struct_list_218 struct_list_218 = Config_list_218.getIns().get(itemid);
							if (struct_list_218==null) {
								//不存在的物品
								isExitWrongId=true;
							}else {
								if (struct_list_218.getStore()!=shopType) {
									//商品类型不对
									isExitWrongId=true;
									break;
								}
							}
							
						}
					}
				}
				if (isExitWrongId) {
					ShopSysEvent.getIns().dailyReset(hero, 0);
				}
				iterator = hero.getShopData().getGoodsMap().keySet().iterator();
				for (; iterator.hasNext();) {
					int shopType = iterator.next();
					Map<Integer, Integer> typeGoodsMap = goodsMap.get(shopType);
					Map<Integer, Integer> buyMap = shoppingMap.get(shopType);
					if (typeGoodsMap != null && typeGoodsMap.size() > 0) {
						List<Object[]> goodsList = new ArrayList<>();
						Iterator<Entry<Integer, Integer>> goodsIterator = typeGoodsMap.entrySet().iterator();
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
							// I:商品索引idB:商品格子位置I:已购买次数
							goodsList.add(new Object[] { entry.getKey(), entry.getValue(), buyNum });
						}
						typeGoodsList.add(new Object[] { shopType, goodsList.toArray() });
					}
				}
			}
			// Map<Integer, Integer> shopRefreshMap = shopData.getShopRefreshMap();
			// if (type > 0) {
			// Integer refreshNum = shopRefreshMap.get(type);// 已刷新次数
			// if (refreshNum != null) {
			// typeRefreshList.add(new Object[] { type, refreshNum });
			// }
			// } else {
			// Iterator<Entry<Integer, Integer>> iterator =
			// shopRefreshMap.entrySet().iterator();
			// for (; iterator.hasNext();) {
			// Entry<Integer, Integer> entry = iterator.next();
			// typeRefreshList.add(new Object[] { entry.getKey(), entry.getValue() });
			// }
			// }
			ShopSender.sendCmd_1182(hero.getId(), typeGoodsList.toArray());
		} catch (Exception e) {
			LogTool.error(e, ShopManager.class, hero.getId(), hero.getName(), "openShop fail");
		}
	}

	/**
	 * 刷新商店
	 * 
	 * @param hero
	 * @param type
	 *            商店类型
	 */
	public void refreshShop(Hero hero, int type) {
		if (hero == null) {
			return;
		}
		try {
			if (hero.getShopData() == null) {
				return;
			}
			Struct_stroe_218 struct_stroe_218 = Config_stroe_218.getIns().get(type);
			if (struct_stroe_218 == null) {
				return;
			}
			int hand = struct_stroe_218.getHand();
			if (hand == 0) {
				// 不可手动刷新
				return;
			}
			int[][] consume = struct_stroe_218.getConsume();
			if (!UseAddUtil.canUse(hero, consume)) {
				// 消耗不足
				return;
			}
			UseAddUtil.use(hero, consume, SourceGoodConst.SHOP_REFRESH, true);
			// 刷新处理
			ShopFunction.getIns().refreshShopData(hero, type);
			openShop(hero, type);
		} catch (Exception e) {
			LogTool.error(e, ShopManager.class, hero.getId(), hero.getName(), "refreshShop fail");
		}
	}

	/**
	 * 购买商品
	 * @param hero
	 * @param type 商店类型
	 * @param goodsId 商品索引id
	 * @param num (预留字段)
	 */
	public void shopping(Hero hero, int type, int goodsId, int num) {
		if (hero == null) {
			return;
		}
		try {
			long hid = hero.getId();
			ShopData shopData = hero.getShopData();
			if (shopData == null) {
				return;
			}
			Map<Integer, Map<Integer, Integer>> goodsMap = shopData.getGoodsMap();
			Map<Integer, Integer> map = goodsMap.get(type);
			if (!map.containsKey(goodsId)) {
				// 商店中不存在该商品
				ShopSender.sendCmd_1186(hid, 0, type, 1, 0);
				return;
			}
			Struct_list_218 goodsInfo = Config_list_218.getIns().get(goodsId);
			int[][] condition = goodsInfo.getCondition();
			if(condition!=null) {				
				for (int[] cd : condition) {
					if (cd[0] == 1 && hero.getVipLv() < cd[1]) {// vip
						// vip等级不足
						ShopSender.sendCmd_1186(hid, 0, type, 2, 0);
						return;
					}
				}
			}
			Map<Integer, Integer> alreadyBuy = shopData.getShoppingMap().get(type);
			if(alreadyBuy==null) {
				alreadyBuy = new HashMap<>();
				shopData.getShoppingMap().put(type, alreadyBuy);
			}
			Integer buyNum = alreadyBuy.get(goodsId);
			if (buyNum == null) {
				buyNum = 0;
			}
			int time = goodsInfo.getTime();
			if (time>0 && buyNum >= time) {
				// 购买次数上限
				ShopSender.sendCmd_1186(hid, 0, type, 3, 0);
				return;
			}
			int[][] item = goodsInfo.getItem();
			if (!UseAddUtil.canAdd(hero, item, false)) {
				// 背包满
				ShopSender.sendCmd_1186(hid, 0, type, 4, 0);
				return;
			}
			int[][] money = goodsInfo.getMoney();
			if (!UseAddUtil.canUse(hero, money)) {
				// 货币不足
				ShopSender.sendCmd_1186(hid, 0, type, 5, 0);
				return;
			}
			UseAddUtil.use(hero, money, SourceGoodConst.SHOP_BUY, true);
			UseAddUtil.add(hero, item, SourceGoodConst.SHOP_BUY, null, true);
			//后台商城购买表
			int itemid=item[0][1];
			if(itemid==0) {
				itemid = item[0][0];
			}
			int itemcost=money[0][2];
			int buynum=1;
			int costtype=money[0][0];
			String usesys=hero.getTempData().getAccount().getUsesys();
			//
			if (type==ShopConst.FIRE_SHOP) {
				FlowHeroEvent.addShopFlow(hid, hero.getLevel(), ShopEnum.FIRE_SHOP.getType(), itemid, itemcost, buynum,
						costtype, hero.getZoneid(), hero.getLoginPf(), usesys, hero.getReincarnationLevel());
			}else if(type==ShopConst.ZCBOSS_SHOP){
				FlowHeroEvent.addShopFlow(hid, hero.getLevel(), ShopEnum.ZCBOSS_SHOP.getType(), itemid, itemcost,
						buynum, costtype, hero.getZoneid(), hero.getLoginPf(), usesys, hero.getReincarnationLevel());
			}else if(type==ShopConst.YB_SHOP){
				FlowHeroEvent.addShopFlow(hid, hero.getLevel(), ShopEnum.YB_SHOP.getType(), itemid, itemcost, buynum,
						costtype, hero.getZoneid(), hero.getLoginPf(), usesys, hero.getReincarnationLevel());
			} else if (type == ShopConst.TRIAL_SHOP) {
				FlowHeroEvent.addShopFlow(hid, hero.getLevel(), ShopEnum.TRIAL_SHOP.getType(), itemid, itemcost, buynum,
						costtype, hero.getZoneid(), hero.getLoginPf(), usesys, hero.getReincarnationLevel());
			}else {
				FlowHeroEvent.addShopFlow(hid, hero.getLevel(), type, itemid, itemcost, buynum, costtype,
						hero.getZoneid(), hero.getLoginPf(), usesys, hero.getReincarnationLevel());
			}
			int nowNum = buyNum + 1;
			alreadyBuy.put(goodsId, nowNum);
			ShopSender.sendCmd_1186(hid, 1, type, goodsId, nowNum);
			if (type==ShopConst.MYSTERY_SHOP) {
				DayTaskFunction.getIns().successDayTaskType(hero, DayTaskConst.DATTASK_TYPE9);
				// 犒赏三军(活动)
				WarOrderFunction.getIns().updateTaskNum(hero, WarOrderEnum.GOAL_8, 1);
				// 犒赏三军(开服)
				WarOrderNewFunction.getIns().updateTaskNum(hero, WarOrderNewEnum.GOAL_8, 1);
			}else if(type==ShopConst.PRESTIGE_SHOP) {
				DayTaskFunction.getIns().successDayTaskType(hero, DayTaskConst.DATTASK_TYPE10);
			}
			
		} catch (Exception e) {
			LogTool.error(e, ShopManager.class, hero.getId(), hero.getName(), "shopping fail");
		}
	}

}
