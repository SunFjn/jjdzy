package com.teamtop.system.upLvShop;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.upLvShop.model.UpLvShop;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_shengjiestore_301;
import excel.struct.Struct_shengjiestore_301;

public class UpLvShopManager {
	private static volatile UpLvShopManager ins = null;

	public static UpLvShopManager getIns() {
		if (ins == null) {
			synchronized (UpLvShopManager.class) {
				if (ins == null) {
					ins = new UpLvShopManager();
				}
			}
		}
		return ins;
	}

	private UpLvShopManager() {
	}

	/**
	 * 打开界面
	 * 
	 * @param hero
	 */
	public void openUI(Hero hero) {
		// TODO Auto-generated method stub
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.UPLVSHOP_SYSID)) {
			return;
		}
		UpLvShop upLvShop = hero.getUpLvShop();
		Map<Integer, Integer> buyMap = upLvShop.getBuyMap();
		int betweenOpen = TimeDateUtil.betweenOpen();
		List<Struct_shengjiestore_301> list = UpLvShopCache.getConfigMap().get(betweenOpen);
		List<Object> shopList = new ArrayList<>();
		for (Struct_shengjiestore_301 struct_shengjiestore_301 : list) {
			Integer num = buyMap.get(struct_shengjiestore_301.getId());
			if (num == null) {
				int time = struct_shengjiestore_301.getTime();
				if (time == 0) {
					num = -1;
				} else {
					num = time;
				}
			}
			shopList.add(new Object[] { struct_shengjiestore_301.getId(), num });
		}
		UpLvShopSender.sendCmd_4502(hero.getId(), shopList.toArray());
	}

	/**
	 * 购买
	 * 
	 * @param hero
	 * @param id   购买的配置表id
	 */
	public void buy(Hero hero, int id) {
		// TODO Auto-generated method stub
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.UPLVSHOP_SYSID)) {
				return;
			}
			Struct_shengjiestore_301 struct_shengjiestore_301 = Config_shengjiestore_301.getIns().get(id);
			int betweenOpen = TimeDateUtil.betweenOpen();
			if (struct_shengjiestore_301 == null || struct_shengjiestore_301.getDay() != betweenOpen) {
				UpLvShopSender.sendCmd_4504(hero.getId(), UpLvShopConst.FAILURE_NOT_GOODS, id);
				return;
			}
			Map<Integer, Integer> buyMap = hero.getUpLvShop().getBuyMap();
			Integer num = buyMap.get(id);
			if (num == null) {
				int time = struct_shengjiestore_301.getTime();
				if (time == 0) {
					num = -1;
				} else {
					num = time;
				}
			}
			if (num != -1 && num < 1) {
				UpLvShopSender.sendCmd_4504(hero.getId(), UpLvShopConst.FAILURE_NOT_NUM, id);
				return;
			}
			if (getLv(hero, struct_shengjiestore_301.getId()) < struct_shengjiestore_301.getLv()) {
				UpLvShopSender.sendCmd_4504(hero.getId(), UpLvShopConst.FAILURE_NOT_LV, id);
				return;
			}
			int[][] money = struct_shengjiestore_301.getMoney();
			if (!UseAddUtil.canUse(hero, money)) {
				UpLvShopSender.sendCmd_4504(hero.getId(), UpLvShopConst.FAILURE_NOT_YB, id);
				return;
			}
			if (num == -1) {
				buyMap.put(id, -1);
			} else {
				buyMap.put(id, num - 1);
			}
			int[][] item = struct_shengjiestore_301.getItem();
			// 消耗元宝
			UseAddUtil.use(hero, money, SourceGoodConst.UPLVSHOP_BUYCONYB, true);
			// 添加道具
			UseAddUtil.add(hero, item, SourceGoodConst.UPLVSHOP_BUYITEM, UseAddUtil.getDefaultMail(), true);
			UpLvShopSender.sendCmd_4504(hero.getId(), UpLvShopConst.SUCCESS, id);
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(), "buy id:" + id);
		}
	}

	/**
	 * 获取对应阶数
	 * 
	 * @param hero
	 * @param id   购买的配置表id
	 * @return
	 */
	public int getLv(Hero hero, int id) {
		int lv = 0;
		switch (id / 1000) {
		// 武将
		case 1:
			lv = hero.getWujiang().getJieLv();
			break;
		// 宝物
		case 2:
			lv = hero.getTreasureData().getLevel();
			break;
		// 天书
		case 3:
			lv = hero.getGodbook().getLevel();
			break;
		// 神剑
		case 4:
			lv = hero.getExcalibur().getJieLv();
			break;
		// 异宝
		case 5:
			lv = hero.getSpecialTreasure().getJieLv();
			break;
		// 战甲
		case 6:
			lv = hero.getZhanJia().getJieLv();
			break;
		// 兵法
		case 7:
			lv = hero.getBingfa().getJieLv();
			break;
		default:
			break;
		}
		return lv;
	}

}
