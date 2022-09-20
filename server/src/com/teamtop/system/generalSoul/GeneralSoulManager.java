package com.teamtop.system.generalSoul;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.generalSoul.model.GeneralSoul;
import com.teamtop.system.generalSoul.model.GeneralSoulModel;
import com.teamtop.system.hero.FightCalcConst;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.util.log.LogTool;

import excel.config.Config_general_006;
import excel.config.Config_genlv_006;
import excel.config.Config_genteam_006;
import excel.struct.Struct_general_006;
import excel.struct.Struct_genlv_006;
import excel.struct.Struct_genteam_006;

/**
 * 将魂
 * 
 * @author hzp
 *
 */
public class GeneralSoulManager {

	private static GeneralSoulManager generalSoulManager;

	private GeneralSoulManager() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized GeneralSoulManager getIns() {
		if (generalSoulManager == null) {
			generalSoulManager = new GeneralSoulManager();
		}
		return generalSoulManager;
	}

	/**
	 * 打开将魂界面
	 * 
	 * @param hero
	 */
	public void openGeneralSoul(Hero hero) {
		if (hero == null) {
			return;
		}
		try {
			GeneralSoul generalSoul = hero.getGeneralSoul();
			if (generalSoul == null) {
				// 系统未开启
//				GeneralSoulFunction.getIns().openGeneralSoul(hero, 0);
//				for(int i=1;i<5;i++) {
//					for(int j=10;j<=170;j+=20) {
//						GeneralSoulFunction.getIns().activateGeneralSoul(hero, i, j);
//					}
//				}
				return;
			}
			Map<Integer, GeneralSoulModel> generalSoulMap = generalSoul.getGeneralSoulMap();
			List<Object[]> generalSoulList = new ArrayList<>();
			Iterator<GeneralSoulModel> iterator = generalSoulMap.values().iterator();
			GeneralSoulModel generalSoulModel = null;
			for (; iterator.hasNext();) {
				generalSoulModel = iterator.next();
				generalSoulList.add(new Object[] { generalSoulModel.getId(), generalSoulModel.getLevelIndex(),
						generalSoulModel.getExp() });
			}
			Set<Integer> setList = generalSoul.getSetList();
			List<Object[]> generalSoulSetList = new ArrayList<>();
			for (Integer id : setList) {
				generalSoulSetList.add(new Object[] { id });
			}
			GeneralSoulSender.sendCmd_1152(hero.getId(), generalSoulList.toArray(), generalSoulSetList.toArray());
		} catch (Exception e) {
			LogTool.error(e, GeneralSoulManager.class, hero.getId(), hero.getName(), "openGeneralSoul fail");
		}
	}

	/**
	 * 升级将魂
	 * 
	 * @param hero
	 * @param generalSoulId 将魂id
	 */
	public void upgradeLevel(Hero hero, int generalSoulId) {
		if (hero == null) {
			return;
		}
		try {
			long hid = hero.getId();
			GeneralSoul generalSoul = hero.getGeneralSoul();
			if (generalSoul == null) {
				// 系统未开启
				return;
			}
			Map<Integer, GeneralSoulModel> generalSoulMap = generalSoul.getGeneralSoulMap();
			if (!generalSoulMap.containsKey(generalSoulId)) {
				// 未激活
				return;
			}
			GeneralSoulModel generalSoulModel = generalSoulMap.get(generalSoulId);
			int levelIndex = generalSoulModel.getLevelIndex();
			int newLevelIndex = levelIndex;
			Struct_genlv_006 struct_genlv_006 = Config_genlv_006.getIns().get(levelIndex);
			int nexLevelIndex = struct_genlv_006.getNext();
			if (nexLevelIndex == 0) {
				// 到达最高级别
				return;
			}
			int exp = generalSoulModel.getExp();
			long soulFire = hero.getSoulFire();
			if (soulFire == 0) {
				// 材料不足
				return;
			}
			long totalExp = exp + soulFire;
			int[][] consume = struct_genlv_006.getConsume();
			int toolType = consume[0][0];
			int needExp = consume[0][2];
			int useNum = 0;
			if (totalExp >= needExp) {// 升级处理
				useNum = needExp - exp;
				generalSoulModel.setLevelIndex(nexLevelIndex);
				generalSoulModel.setExp(0);
				newLevelIndex = nexLevelIndex;
			} else {
				useNum = (int) soulFire;
				generalSoulModel.setExp((int) totalExp);
			}
			UseAddUtil.use(hero, toolType, useNum, SourceGoodConst.GENERAL_SOUL, true);
			int nowExp = generalSoulModel.getExp();
			GeneralSoulSender.sendCmd_1154(hid, 1, generalSoulId, newLevelIndex, nowExp);
			// 重新计算战力
			FightCalcFunction.setRecalcAll(hero, FightCalcConst.GENERALSOUL_UPGRADE,SystemIdConst.GeneralSoul_SYSID);
			GeneralSoulFunction.getIns().updateRedPoint(hero);
			LogTool.info(hid, hero.getName(), "GeneralSoulManager upgradeLevel generalSoulId=" + generalSoulId
					+ ", newLevelIndex=" + newLevelIndex + ", nowExp=" + nowExp, GeneralSoulManager.class);
		} catch (Exception e) {
			LogTool.error(e, GeneralSoulManager.class, hero.getId(), hero.getName(), "");
		}
	}

	/**
	 * 套装升阶
	 * 
	 * @param hero
	 * @param setId 套装id
	 */
	public void upgradeSet(Hero hero, int setId) {
		if (hero == null) {
			return;
		}
		try {
			long hid = hero.getId();
			GeneralSoul generalSoul = hero.getGeneralSoul();
			if (generalSoul == null) {
				// 系统未开启
				return;
			}
			Struct_genteam_006 genteam = Config_genteam_006.getIns().get(setId);
			Set<Integer> setList = generalSoul.getSetList();
			if (genteam.getLv() > 1 && (!setList.contains(setId))) {
				// 非法操作
				return;
			}
			int typeTotalLevel = getTypeTotalLevel(generalSoul, genteam.getType());
			int nextSetId = genteam.getNext();
			Struct_genteam_006 genteamNext = Config_genteam_006.getIns().get(nextSetId);
			if (typeTotalLevel < genteamNext.getNeed()) {
				// 未满足升级条件
				return;
			}
			setList.remove(setId);
			setList.add(nextSetId);
			GeneralSoulSender.sendCmd_1156(hid, 1, nextSetId);
			// 重新计算战力
			FightCalcFunction.setRecalcAll(hero, FightCalcConst.GENERALSOUL_SET,SystemIdConst.GeneralSoul_SYSID);
			GeneralSoulFunction.getIns().updateRedPoint(hero);
			LogTool.info(hid, hero.getName(), "GeneralSoulManager upgradeSet nextSetId="+nextSetId, GeneralSoulManager.class);
		} catch (Exception e) {
			LogTool.error(e, GeneralSoulManager.class, hero.getId(), hero.getName(), "upgradeSet Fail, setId=" + setId);
		}
	}

	/**
	 * 获取套装类型将魂总等级
	 * 
	 * @return
	 */
	public int getTypeTotalLevel(GeneralSoul generalSoul, int type) {
		int totalLevel = 0;
		Map<Integer, GeneralSoulModel> generalSoulMap = generalSoul.getGeneralSoulMap();
		Iterator<GeneralSoulModel> iterator = generalSoulMap.values().iterator();
		GeneralSoulModel generalSoulModel = null;
		for (; iterator.hasNext();) {
			generalSoulModel = iterator.next();
			int id = generalSoulModel.getId();
			Struct_general_006 struct_general_006 = Config_general_006.getIns().get(id);
			if (struct_general_006.getType() != type) {
				continue;
			}
			int index = generalSoulModel.getLevelIndex();
			Struct_genlv_006 struct_genlv_006 = Config_genlv_006.getIns().get(index);
			totalLevel += struct_genlv_006.getLv();
		}
		return totalLevel;
	}

}
