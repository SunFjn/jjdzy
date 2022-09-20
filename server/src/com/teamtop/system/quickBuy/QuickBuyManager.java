package com.teamtop.system.quickBuy;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.quickBuy.model.QuickBuyModel;
import com.teamtop.util.log.LogTool;

import excel.config.Config_buy_269;
import excel.struct.Struct_buy_269;

/**
 * 快速购买
 * 
 * @author hzp
 *
 */
public class QuickBuyManager {

	private static QuickBuyManager ins;

	private QuickBuyManager() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized QuickBuyManager getIns() {
		if (ins == null) {
			ins = new QuickBuyManager();
		}
		return ins;
	}

	/**
	 * 
	 * @param hero
	 */
	public void openUI(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.QUICK_BUY)) {
				return;
			}
			QuickBuyModel quickBuyModel = hero.getQuickBuyModel();
			Map<Integer, Integer> dailyLimit = quickBuyModel.getDailyLimit();
			List<Object[]> sendData = new ArrayList<>();
			Iterator<Entry<Integer, Integer>> iterator = dailyLimit.entrySet().iterator();
			Entry<Integer, Integer> entry = null;
			int id = 0;
			int num = 0;
			for (; iterator.hasNext();) {
				entry = iterator.next();
				id = entry.getKey();
				num = entry.getValue();
				sendData.add(new Object[] { id, num });
			}
			QuickBuySender.sendCmd_5254(hid, sendData.toArray());
		} catch (Exception e) {
			LogTool.error(e, QuickBuyManager.class, hid, hero.getName(), "QuickBuyManager openUI");
		}
	}

	/**
	 * 购买
	 * 
	 * @param hero
	 * @param id
	 * @param num
	 */
	public void buy(Hero hero, int id, int num) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.QUICK_BUY)) {
				return;
			}
			if(num < 1){
				return;
			}
			QuickBuyModel quickBuyModel = hero.getQuickBuyModel();
			Map<Integer, Integer> dailyLimit = quickBuyModel.getDailyLimit();
			Integer buyNum = dailyLimit.get(id);
			if (buyNum == null) {
				buyNum = 0;
			}
			buyNum += num;
			Struct_buy_269 struct_buy_269 = Config_buy_269.getIns().get(id);
			int max = struct_buy_269.getMax();
			if (max > 0 && buyNum > max) {
				//到达购买上限
				QuickBuySender.sendCmd_5252(hero.getId(), 0, 1, 0);
				return;
			}
			int[][] conmuse = struct_buy_269.getConmuse();
			if (!UseAddUtil.canUse(hero, conmuse, num)) {
				//消耗不足
				QuickBuySender.sendCmd_5252(hero.getId(), 0, 2, 0);
				return;
			}
			int sourceGoodType = SourceGoodConst.QUICK_BUY;
			if (struct_buy_269.getId() == 1) {
				sourceGoodType = SourceGoodConst.QUICK_BUY_DICE;
			} else if (struct_buy_269.getId() == 2) {
				sourceGoodType = SourceGoodConst.QUICK_BUY_STONE;
			} else {
				sourceGoodType = SourceGoodConst.QUICK_BUY_LOCK;
			}
			UseAddUtil.use(hero, conmuse, num, sourceGoodType, true);
			int[][] store = struct_buy_269.getStore();
			UseAddUtil.add(hero, store, num, sourceGoodType, UseAddUtil.getDefaultMail(), true);
			if (max > 0) {
				dailyLimit.put(id, buyNum);
			}
			if (max == 0) {
				buyNum = 0;
			}
			QuickBuySender.sendCmd_5252(hero.getId(), 1, id, buyNum);
		} catch (Exception e) {
			LogTool.error(e, QuickBuyManager.class, hero.getId(), hero.getName(), "QuickBuyManager buy");
		}
	}

}
