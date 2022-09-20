package com.teamtop.system.house.yard.cross;

import java.util.Map;

import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.CrossEnum;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.hero.FightCalcConst;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.house.yard.HouseConst;
import com.teamtop.system.house.yard.model.LocalHouse;
import com.teamtop.util.log.LogTool;

import excel.config.Config_fdtgl_019;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_fdtgl_019;
import io.netty.channel.Channel;

public class HouseIO {
	private static HouseIO ins;

	public static synchronized HouseIO getIns() {
		if (ins == null) {
			ins = new HouseIO();
		}
		return ins;
	}

	/**
	 * 通知变更属性
	 * 
	 * @param channel
	 * @param crossData
	 */
	public void updateHouseFight(Channel channel, CrossData crossData) {
		try {
			int cmd = CrossConst.CROSS_HOUSE_UPDATE_FIGHT;
			LocalHouse local = crossData.getObject(CrossEnum.data1, LocalHouse.class);
			long hid = local.getHid();
			Hero hero = HeroCache.getHero(hid);
			if (hero != null) {
				// 通知更新属性
				hero.getLocalHouse().setDecorateLvMap(local.getDecorateLvMap());
				hero.getLocalHouse().setHouseLv(local.getHouseLv());
				FightCalcFunction.setRecalcAll(hero, FightCalcConst.UP_HOUSE_LV, SystemIdConst.YARD);
			}
		} catch (Exception e) {
			LogTool.error(e, this, "HouseFunction updateHouseFight sysId:" + SystemIdConst.YARD);
		}
	}

	/**
	 * 广播升级档次
	 * 
	 * @param channel
	 * @param crossData
	 */
	public void upDc(Channel channel, CrossData crossData) {
		try {
			int cmd = CrossConst.CROSS_HOUSE_UP_DC;
			String name = crossData.getObject(CrossEnum.data1, String.class);
			int dc = crossData.getObject(CrossEnum.data2, Integer.class);
			// 根据 转生区间获取
			ChatManager.getIns().broadCast(ChatConst.HOUSE_UP_DC, new Object[] { name, dc }); // 全服广播
		} catch (Exception e) {
			LogTool.error(e, this, "HouseFunction upDc sysId:" + SystemIdConst.YARD);
		}
	}

	/**
	 * 通知每日刷新
	 * 
	 * @param channel
	 * @param crossData
	 */
	public void dailyNotic(Channel channel, CrossData crossData) {
		try {
			int cmd = CrossConst.CROSS_HOUSE_DAILY_NOTIC;
			long hid = crossData.getObject(CrossEnum.hid, Long.class);
			int d1 = crossData.getObject(CrossEnum.data1, Integer.class);
			int d2 = crossData.getObject(CrossEnum.data2, Integer.class);
			int d3 = crossData.getObject(CrossEnum.data3, Integer.class);
			int d4 = crossData.getObject(CrossEnum.DATA4, Integer.class);
			Hero hero = HeroCache.getHero(hid);
			if (hero != null) {
				LocalHouse local = hero.getLocalHouse();
				if(local == null) {
					return;
				}
				if (d1 == 1) {
					local.setCompleteEventTimes(0);
				} else if (d1 < 0) {
					local.setCompleteEventTimes(local.getCompleteEventTimes() + d1);
					int maxTimes = Config_xtcs_004.getIns().get(HouseConst.CONST_7112).getNum();
					CrossHouseFunction.getIns().pushUpdate(hero, HouseConst.PUSH_2,
							maxTimes - local.getCompleteEventTimes());
				}
				if (d2 == 1) {
					local.setCompleteEventHelpTimes(0);
				} else if (d2 < 0) {
					local.setCompleteEventHelpTimes(local.getCompleteEventHelpTimes() + d2);
					int maxTimes = Config_xtcs_004.getIns().get(HouseConst.CONST_7120).getNum();
					CrossHouseFunction.getIns().pushUpdate(hero, HouseConst.PUSH_3,
							maxTimes - local.getCompleteEventHelpTimes());
				}
				if (d3 == 1) {
					local.setCompleteRobberTimes(0);
				} else if (d3 < 0) {
					local.setCompleteRobberTimes(local.getCompleteRobberTimes() + d3);
				}
				if (d4 == 1) {
					local.setDrawAwardTimes(0);
				} else if (d4 < 0) {
					local.setDrawAwardTimes(local.getDrawAwardTimes() + d4);
					Map<Integer, Integer> decorateLvMap = local.getDecorateLvMap();
					Integer decorateLv = decorateLvMap.get(HouseConst.ID_101001);
					if (decorateLv == null) {
						// 数据异常
						decorateLv = HouseConst.ID_101001;
					}
					Struct_fdtgl_019 tglCfg = Config_fdtgl_019.getIns().get(decorateLv);
					CrossHouseFunction.getIns().pushUpdate(hero, HouseConst.PUSH_1,
							tglCfg.getCishu() - local.getDrawAwardTimes());
				}
			}
		} catch (Exception e) {
			LogTool.error(e, this, "HouseFunction dailyNotic sysId:" + SystemIdConst.YARD);
		}
	}
}
