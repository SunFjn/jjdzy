package com.teamtop.system.generalSoul;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.teamtop.system.achievement.AchievementEnum;
import com.teamtop.system.achievement.AchievementFunction;
import com.teamtop.system.generalSoul.model.GeneralSoul;
import com.teamtop.system.generalSoul.model.GeneralSoulModel;
import com.teamtop.system.hero.FightAttr;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_general_006;
import excel.config.Config_genlv_006;
import excel.config.Config_genteam_006;
import excel.struct.Struct_general_006;
import excel.struct.Struct_genlv_006;
import excel.struct.Struct_genteam_006;

public class GeneralSoulFunction {

	private static GeneralSoulFunction generalSoulFunction;

	private GeneralSoulFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized GeneralSoulFunction getIns() {
		if (generalSoulFunction == null) {
			generalSoulFunction = new GeneralSoulFunction();
		}
		return generalSoulFunction;
	}

	/**
	 * 开启将魂系统
	 */
	public void openGeneralSoul(Hero hero, int rebornLevel) {
		try {
			GeneralSoul generalSoul = hero.getGeneralSoul();
			if (generalSoul != null) {
				return;
			}
			if (!HeroFunction.getIns().checkSystemOpen(hero, GeneralSoulConst.SysId)) {
				return;
			}
			generalSoul = new GeneralSoul();
			hero.setGeneralSoul(generalSoul);
			Map<Integer, GeneralSoulModel> generalSoulMap = new HashMap<>();// 将魂信息
			Set<Integer> setList = new HashSet<>();// 套装信息
			generalSoul.setGeneralSoulMap(generalSoulMap);
			generalSoul.setSetList(setList);
		} catch (Exception e) {
			LogTool.error(e, GeneralSoulFunction.class, hero.getId(), hero.getName(), "openGeneralSoul fail");
		}
	}

	/**
	 * 激活将魂（过关斩将）
	 * @param type 通关难度
	 * @param passNum 通关数
	 */
	public void activateGeneralSoul(Hero hero, int type, int passNum) {
		try {
			Map<Integer, Map<Integer, List<Integer>>> activateMap = GeneralSoulCache.getActivateMap();
			if (!activateMap.containsKey(type)) {
				return;
			}
			Map<Integer, List<Integer>> map = activateMap.get(type);
			if(map==null) {
				return;
			}
			if (!map.containsKey(passNum)) {
				return;
			}
			List<Integer> list = map.get(passNum);
			if (list == null) {
				return;
			}
			GeneralSoul generalSoul = hero.getGeneralSoul();
			Map<Integer, GeneralSoulModel> generalSoulMap = generalSoul.getGeneralSoulMap();
			for (int id : list) {
				if (generalSoulMap.containsKey(id)) {
					// 已激活过
					continue;
				}
				GeneralSoulModel model = new GeneralSoulModel();
				model.setId(id);
				Struct_general_006 struct_general_006 = Config_general_006.getIns().get(id);
				model.setLevelIndex(struct_general_006.getType() * 10000 + struct_general_006.getQuality() * 1000 + 1);
				generalSoulMap.put(id, model);
				GeneralSoulSender.sendCmd_1158(hero.getId(), id);
				// 成就
				AchievementFunction.getIns().checkTask(hero, AchievementEnum.GOAL_25, 0);
			}
		} catch (Exception e) {
			LogTool.error(e, GeneralSoulFunction.class, hero.getId(), hero.getName(), "activateGeneralSoul fail");
		}
	}

	/**
	 * 检测红点
	 * @param hero
	 * @return
	 */
	public boolean checkRedPoint(Hero hero) {
		try {
			GeneralSoul generalSoul = hero.getGeneralSoul();
			if (generalSoul != null) {
				// Map<Integer, GeneralSoulModel> generalSoulMap =
				// generalSoul.getGeneralSoulMap();
				// Set<Integer> idSet = new HashSet<>(generalSoulMap.keySet());
				// Iterator<Integer> iterator = idSet.iterator();
				// for(;iterator.hasNext();) {
				// int id = iterator.next();
				// GeneralSoulModel generalSoulModel = generalSoulMap.get(id);
				//
				// }
				long soulFire = hero.getSoulFire();
				Map<Integer, GeneralSoulModel> generalSoulMap = generalSoul.getGeneralSoulMap();
				if (hero.getSoulFire() > 0 && generalSoulMap.size()>0) {
					Set<Integer> keySet = new HashSet<>(generalSoulMap.keySet());
					for(int key : keySet) {
						GeneralSoulModel model = generalSoulMap.get(key);
						int levelIndex = model.getLevelIndex();
						Struct_genlv_006 struct_genlv_006 = Config_genlv_006.getIns().get(levelIndex);
						int nexLevelIndex = struct_genlv_006.getNext();
						if (nexLevelIndex != 0) {
							int exp = model.getExp();
							long totalExp = exp + soulFire;
							int[][] consume = struct_genlv_006.getConsume();
							int needExp = consume[0][2];
							if (totalExp > needExp) {
								return true;
							}
						}
					}
				}
				Set<Integer> setList = generalSoul.getSetList();
				Struct_genteam_006 genteam = null;
				Struct_genteam_006 genteamNext = null;
				for (int setId : setList) {
					genteam = Config_genteam_006.getIns().get(setId);
					int typeTotalLevel = GeneralSoulManager.getIns().getTypeTotalLevel(generalSoul, genteam.getType());
					int nextSetId = genteam.getNext();
					genteamNext = Config_genteam_006.getIns().get(nextSetId);
					if(genteamNext==null){
						continue;
					}
					if (typeTotalLevel >= genteamNext.getNeed()) {
						return true;
					}
				}
			}
		} catch (Exception e) {
			LogTool.error(e, GeneralSoulFunction.class, hero.getId(), hero.getName(),
					"GeneralSoulFunction checkRedPoint");
		}
		return false;
	}
	
	/**
	 * 更新红点
	 * @param hero
	 */
	public void updateRedPoint(Hero hero) {
		try {
			boolean redPoint = checkRedPoint(hero);
			if(!redPoint) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, GeneralSoulConst.SysId,
								GeneralSoulConst.RedPoint, RedPointConst.NO_RED);
			}
		} catch (Exception e) {
			LogTool.error(e, GeneralSoulFunction.class, hero.getId(), hero.getName(),
					"GeneralSoulFunction updateRedPoint");
		}
	}
	/**
	 * 获取将魂战力
	 */
	public int getGeneralSoulTotelStr(Hero hero) {
		int score=0;
		FinalFightAttr finalAttr = new FinalFightAttr();
		FightAttr attr = new FightAttr();
		GeneralSoul generalSoul = hero.getGeneralSoul();
		if(generalSoul==null) {
			return score;
		}
		Map<Integer, Long> attrMap = new HashMap<>();
		// 将魂级别
		Map<Integer, GeneralSoulModel> generalSoulMap = generalSoul.getGeneralSoulMap();
		Iterator<GeneralSoulModel> iterator = generalSoulMap.values().iterator();
		GeneralSoulModel generalSoulModel = null;
		int levelIndex = 0;
		Struct_genlv_006 struct_genlv_006 = null;
		int[][] attrs = null;
		for (; iterator.hasNext();) {
			generalSoulModel = iterator.next();
			levelIndex = generalSoulModel.getLevelIndex();
			struct_genlv_006 = Config_genlv_006.getIns().get(levelIndex);
			if (struct_genlv_006 != null) {
				attrs = struct_genlv_006.getAttr();
				CommonUtil.arrChargeMap(attrs, attrMap);
			}
		}
		// 将魂套装
		Set<Integer> setList = generalSoul.getSetList();
		Struct_genteam_006 struct_genteam_006 = null;
		for (int setId : setList) {
			struct_genteam_006 = Config_genteam_006.getIns().get(setId);
			if (struct_genteam_006 != null) {
				attrs = struct_genteam_006.getAttr();
				CommonUtil.arrChargeMap(attrs, attrMap);
			}
		}
		long[][] data=CommonUtil.mapToArr(attrMap);
		FightCalcFunction.setFightValue(data, attr);
		FightCalcFunction.calcEquipAttr(finalAttr, attr,0);
		score = (int)finalAttr.getStrength();
		return score;
	}
	/**
	 * 将魂总等级
	 * @param hero
	 * @return
	 */
	public int getGeneralSoulSumLevel(Hero hero) {
		int sumLevel=0;
		GeneralSoul generalSoul = hero.getGeneralSoul();
		if(generalSoul==null) {
			return sumLevel;
		}
		// 将魂级别
		Map<Integer, GeneralSoulModel> generalSoulMap = generalSoul.getGeneralSoulMap();
		Iterator<GeneralSoulModel> iterator = generalSoulMap.values().iterator();
		GeneralSoulModel generalSoulModel = null;
		Struct_genlv_006 struct_genlv_006 = null;
		for (; iterator.hasNext();) {
			generalSoulModel = iterator.next();
			struct_genlv_006 = Config_genlv_006.getIns().get(generalSoulModel.getLevelIndex());
			sumLevel=sumLevel+struct_genlv_006.getLv();
		}
		return sumLevel;
	}

}
