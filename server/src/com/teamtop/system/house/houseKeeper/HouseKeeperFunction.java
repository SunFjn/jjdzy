package com.teamtop.system.house.houseKeeper;

import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.CrossEnum;
import com.teamtop.system.bag.BagFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.house.houseKeeper.model.HouseKeeper;
import com.teamtop.system.house.yard.cross.CrossHouseFunction;
import com.teamtop.system.house.yard.model.CrossHouse;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;

import excel.config.Config_fdsj_019;
import excel.config.Config_jdjins_021;
import excel.config.Config_jdsj_021;
import excel.struct.Struct_jdsj_021;
import io.netty.channel.Channel;

public class HouseKeeperFunction {
	
	private static HouseKeeperFunction ins;

	public static HouseKeeperFunction getIns() {
		if(ins == null) {
			ins = new HouseKeeperFunction();
		}
		return ins;
	}
		
	public void replace(Channel channel, CrossData crossData) {
		try {
			int cmd = CrossConst.CROSS_REPLACE_HOUSEKEEPER;
			int id = crossData.getObject(CrossEnum.data1, Integer.class);
			long hid = crossData.getObject(CrossEnum.data2, Long.class);
			crossData.finishGet();
			CrossHouse cHouse = CrossHouseFunction.getIns().getHouseByHid(hid);
			if (cHouse != null) {
				cHouse.setHouseKeepId(id);
			}
		} catch (Exception e) {
			LogTool.error(e, HouseKeeperFunction.class, "replace has wrong");
		}
	}
	
	/**
	 * 检测红点
	 * 
	 * @param hero
	 * @return
	 */
	public boolean checkRedPoint(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.HOUSEKEEPER)) {
				return false;
			}
			HouseKeeper model = hero.getHouseKeeper();
			if (model == null) {
				return false;
			}
			int curExp = model.getCurExp();
			int canUseNum = BagFunction.getIns().getGoodsNumBySysId(hero.getId(), HouseKeeperConst.PROP_ID);
			int Level = model.getLevel();
			int index = model.getId();
			int houseLv = hero.getLocalHouse().getHouseLv();
			int jiading = Config_fdsj_019.getIns().get(houseLv).getJiading();
			if ((Level + 1) / 10 > jiading) {
				// 府邸等级不满足要求
				return false;
			}
			int tj = Config_jdjins_021.getIns().get(index).getTiaojian();
			if (Level < tj) {
				return false;
			}
			Struct_jdsj_021 struct_jdsj_021 = Config_jdsj_021.getIns().get(Level);
			int needExp = struct_jdsj_021.getExp();
			int needNum = (needExp - curExp) / 10;
			if (canUseNum >= needNum) {
				return true;
			}

		} catch (Exception e) {
			LogTool.error(e, HouseKeeperFunction.class, hero.getId(), hero.getName(),
					"HouseKeeperFunction checkRedPoint");
		}
		return false;
	}

	/**
	 * 更新红点
	 * 
	 * @param hero
	 */
	public void updateRedPoint(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.HOUSEKEEPER)) {
				return;
			}
			boolean redPoint = checkRedPoint(hero);
			if (redPoint) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.HOUSEKEEPER, RedPointConst.RED_1,
						RedPointConst.HAS_RED);
			} else {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.HOUSEKEEPER, RedPointConst.RED_1,
						RedPointConst.NO_RED);
			}
		} catch (Exception e) {
			LogTool.error(e, HouseKeeperFunction.class, hero.getId(), hero.getName(),
					"HouseKeeperFunction updateRedPoint");
		}
	}
}
