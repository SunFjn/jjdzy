package com.teamtop.system.country;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.ativitys.eightDoorAppraiseRankAct.cross.CrossEightDoorAppraiseRankActLC;
import com.teamtop.system.activity.ativitys.shaoZhuQiYuanRankAct.cross.CrossShaoZhuQiYuanRankActLC;
import com.teamtop.system.activity.ativitys.warOrder.WarOrderEnum;
import com.teamtop.system.activity.ativitys.warOrder.WarOrderFunction;
import com.teamtop.system.boss.countryBoss.CountryBossConst;
import com.teamtop.system.country.fightNorthAndSouth.FightNSFunction;
import com.teamtop.system.country.model.CountryData;
import com.teamtop.system.country.newkingship.NewKingShip;
import com.teamtop.system.country.newkingship.NewKingShipCache;
import com.teamtop.system.country.newkingship.NewKingShipConst;
import com.teamtop.system.countrySkill.CountrySkillFunction;
import com.teamtop.system.daytask.DayTaskConst;
import com.teamtop.system.daytask.DayTaskFunction;
import com.teamtop.system.eightDoorAppraiseRank.cross.CrossEightDoorAppraiseRankLC;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroConst;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.openDaysSystem.warOrder.WarOrderNewEnum;
import com.teamtop.system.openDaysSystem.warOrder.WarOrderNewFunction;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.system.shaozhuEscort.ShaoZhuEscortFunction;
import com.teamtop.system.shaozhuQiYuanRank.cross.CrossShaoZhuQiYuanRankLC;
import com.teamtop.system.task.TaskUserConst;
import com.teamtop.system.task.TaskUserFunction;
import com.teamtop.util.log.LogTool;

import excel.config.Config_juanxian_712;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_juanxian_712;

public class CountryManager {
	public static CountryManager ins;

	public static CountryManager getIns() {
		if (ins == null) {
			ins = new CountryManager();
		}
		return ins;
	}

	private CountryManager() {
	}

	/**
	 * 选择国家
	 * 
	 * @param hero
	 * @param countryType
	 */
	public void selectCountry(Hero hero, int countryType) {
		if (hero == null) {
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, CountryConst.SELECTCOUNTRY_SYSID)) {
			return;
		}
		if (hero.getCountryType() != 0) {
			return;
		}
		if (countryType == HeroConst.WEI || countryType == HeroConst.SHU || countryType == HeroConst.WU) {
			hero.setCountryType(countryType);
			List<Long> hidList = CountrySysCache.getCountryCache().getCountryMap().get(countryType).getHidList();
			hidList.add(hero.getId());// 加入国家成员列表
			// 刷新国家战力缓存
			CountryFunction.getIns().refreshCountryStrengthMap(hero, 1);
			CountrySender.sendCmd_1478(hero.getId(), hero.getCountryType(), hero.getName());
			// 南征北战加入国家处理
			FightNSFunction.getIns().joinCountryHanle(hero);
			// 任务
			TaskUserFunction.getIns().reshTaskUser(hero, TaskUserConst.TASK_TYPE_24, 0);
			//KingShipFunction.getIns().resetKingShipData(hero);
			//国家boss红点
			RedPointFunction.getIns().fastUpdateRedPoint(hero, CountryBossConst.SYS_ID, 1, RedPointConst.HAS_RED);
			// 重算国家技能战力
			CountrySkillFunction.getIns().countrySkillFightCalc(hero);
			CrossEightDoorAppraiseRankLC.getIns().updateAppraiseRankListToCen(hero, 0);
			CrossEightDoorAppraiseRankActLC.getIns().addUpdateAppraiseRankListToCen(hero, 0, 2);
			CrossShaoZhuQiYuanRankActLC.getIns().addUpdateAppraiseRankListToCen(hero, 0, 2);
			CrossShaoZhuQiYuanRankLC.getIns().updateAppraiseRankListToCen(hero, 0);
			ShaoZhuEscortFunction.getIns().escortAddCacheHandle(hero, 0, false);
		}
	}

	/**
	 * 随机国家
	 * 
	 * @param hero
	 */
	public void randomCountry(Hero hero) {
		if (hero == null) {
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, CountryConst.SELECTCOUNTRY_SYSID)) {
			return;
		}
		if (hero.getCountryType() != 0) {
			return;
		}
		int maxCid = CountrySysCache.calcMinCountryStrength();
		hero.setCountryType(maxCid);
		List<Long> hidList = CountrySysCache.getCountryCache().getCountryMap().get(maxCid).getHidList();
		hidList.add(hero.getId());// 加入国家成员列表
		// 刷新国家战力缓存
		CountryFunction.getIns().refreshCountryStrengthMap(hero, 1);
		// 添加1000元宝
		int yuanbao = Config_xtcs_004.getIns().get(CountryConst.AWARD_YUANBAO_SYSID).getNum();
		UseAddUtil.add(hero, GameConst.YUANBAO, yuanbao, SourceGoodConst.RANDOM_COUNTRY, true);
		// 南征北战加入国家处理
		FightNSFunction.getIns().joinCountryHanle(hero);
		CountrySender.sendCmd_1472(hero.getId(), maxCid, hero.getName());
		// 任务
		TaskUserFunction.getIns().reshTaskUser(hero, TaskUserConst.TASK_TYPE_24, 0);
		//KingShipFunction.getIns().resetKingShipData(hero);
		// 重算国家技能战力
		CountrySkillFunction.getIns().countrySkillFightCalc(hero);
		CrossEightDoorAppraiseRankLC.getIns().updateAppraiseRankListToCen(hero, 0);
		CrossEightDoorAppraiseRankActLC.getIns().addUpdateAppraiseRankListToCen(hero, 0, 2);
		CrossShaoZhuQiYuanRankActLC.getIns().addUpdateAppraiseRankListToCen(hero, 0, 2);
		CrossShaoZhuQiYuanRankLC.getIns().updateAppraiseRankListToCen(hero, 0);
		ShaoZhuEscortFunction.getIns().escortAddCacheHandle(hero, 0, false);
	}

	/**
	 * 国家捐献界面
	 * 
	 * @param hero
	 */
	public void countryDonation(Hero hero) {
		if (hero == null) {
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, CountryConst.JUANXIAN_SYSID)) {
			return;
		}
		if (hero.getCountryType() == 0) {
			return;
		}
		CountryData countryData = hero.getCountryData();
		CountrySender.sendCmd_1474(hero.getId(), countryData.getCoinDonationTimes(), countryData.getYbDonationTimes());
	}

	/**
	 * 捐献
	 * 
	 * @param hero
	 */
	public void donation(Hero hero, int type) {
		if (hero == null) {
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, CountryConst.JUANXIAN_SYSID)) {
			return;
		}
		if (hero.getCountryType() == 0) {
			return;
		}
		CountryData countryData = hero.getCountryData();
		int DonationTimes = 0;
		if (type == 1) {
			DonationTimes = countryData.getCoinDonationTimes();
		} else if (type == 2) {
			DonationTimes = countryData.getYbDonationTimes();
		} else {
			return;
		}
		if (DonationTimes <= 0) {
			// state 捐献状态 1：成功2：次数不足3：铜钱不足4：元宝不足
			CountrySender.sendCmd_1476(hero.getId(), 2, countryData.getCoinDonationTimes(),
					countryData.getYbDonationTimes());
			return;
		}

		Struct_juanxian_712 struct_juanxian_712 = Config_juanxian_712.getIns().get(type);
		if (struct_juanxian_712 == null) {
			return;
		}
		int[][] use = struct_juanxian_712.getUSE();
		int[] is = use[0];
		int everyUse = is[2];

		if (type == 1) {
			if (!UseAddUtil.canUse(hero, GameConst.COIN, everyUse)) {
				CountrySender.sendCmd_1476(hero.getId(), type + 2, countryData.getCoinDonationTimes(),
						countryData.getYbDonationTimes());
				return;
			} else {
				UseAddUtil.use(hero, GameConst.COIN, everyUse, SourceGoodConst.COIN_DONATION, true);
				hero.getCountryData().setCoinDonationTimes(hero.getCountryData().getCoinDonationTimes() - 1);
				hero.getCountryData().setDonationTimes(hero.getCountryData().getDonationTimes() + 1);
			}

		} else if (type == 2) {
			if (!UseAddUtil.canUse(hero, GameConst.YUANBAO, everyUse)) {
				CountrySender.sendCmd_1476(hero.getId(), type + 2, countryData.getCoinDonationTimes(),
						countryData.getYbDonationTimes());
				return;
			} else {
				UseAddUtil.use(hero, GameConst.YUANBAO, everyUse, SourceGoodConst.YUANBAO_DONATION, true);
				hero.getCountryData().setYbDonationTimes(hero.getCountryData().getYbDonationTimes() - 1);
				hero.getCountryData().setDonationTimes(hero.getCountryData().getDonationTimes() + 1);
			}
		}

		int[][] award = struct_juanxian_712.getAWARD();
		if (type == 1) {
			UseAddUtil.add(hero, award, SourceGoodConst.COIN_DONATION, null, true);
		} else {
			UseAddUtil.add(hero, award, SourceGoodConst.YUANBAO_DONATION, null, true);
		}
		// 每日任务
		DayTaskFunction.getIns().successDayTaskType(hero, DayTaskConst.DATTASK_TYPE1);
		// 任务
		TaskUserFunction.getIns().reshTaskUser(hero, TaskUserConst.TASK_TYPE_46,
				hero.getCountryData().getDonationTimes());
		CountrySender.sendCmd_1476(hero.getId(), 1, hero.getCountryData().getCoinDonationTimes(),
				hero.getCountryData().getYbDonationTimes());
		// 犒赏三军(活动)
		WarOrderFunction.getIns().updateTaskNum(hero, WarOrderEnum.GOAL_4, 1);
		// 犒赏三军(开服)
		WarOrderNewFunction.getIns().updateTaskNum(hero, WarOrderNewEnum.GOAL_4, 1);
		LogTool.info("donation id:" + hero.getId() + " type:" + type, this);
	}

	/**
	 * 打开界面
	 * 
	 * @param hero
	 */
	public void openUI(Hero hero) {
		try {
			if (hero == null) {
				return;
			}
			if (!HeroFunction.getIns().checkSystemOpen(hero, CountryConst.COUNTRY_SYSID)) {
				return;
			}
			if (hero.getCountryType() == 0) {
				return;
			}
			int level = 0;
			int icon = 0;
			int frame = 0;
			ArrayList<String> nameList = new ArrayList<String>();
			for (int i = 0; i < 3; i++) {
				nameList.add(null);
			}
			if (!NewKingShipCache.isWWStartTime) {// 活动结束
				int countryId = hero.getCountryType();
				ConcurrentHashMap<Integer, NewKingShip> concurrentHashMap =NewKingShipCache.getNewKingShipSysCache().getJoinerNewKingShiper().get(hero.getCountryType());
				if (concurrentHashMap!=null) {
					for (int i = 1; i <=3; i++) {
						int key=countryId*100+i;
						NewKingShip newKingShip = concurrentHashMap.get(key); 
						if (newKingShip==null) {
							LogTool.warn("newKingShip==null", CountryManager.class);
							return;
						}
						if (i==1) {
							if (newKingShip.getType()==NewKingShipConst.TYPE_1) {
								Hero hero2 = HeroCache.getHero(newKingShip.getId(), HeroConst.FIND_TYPE_BASIC);
								nameList.set(i-1, hero2.getName());
								level = hero2.getLevel();
								icon = hero2.getSettingData().getIcon();
								frame = hero2.getSettingData().getFrame();
							}
						}else {
							if (newKingShip.getType()==NewKingShipConst.TYPE_1) {
								Hero hero2 = HeroCache.getHero(newKingShip.getId(), HeroConst.FIND_TYPE_BASIC);
								nameList.set(i-1, hero2.getName());
							}
						}
					}
				}
			}
			CountrySender.sendCmd_1480(hero.getId(), level, icon, frame, nameList.get(0), nameList.get(1), nameList.get(2));
		} catch (Exception e) {
			LogTool.error(e, CountryManager.class, "openUI has wrong");
		}
		
	}
}
