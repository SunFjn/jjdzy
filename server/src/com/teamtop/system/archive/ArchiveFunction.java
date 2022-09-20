package com.teamtop.system.archive;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.teamtop.system.archive.model.ArchiveData;
import com.teamtop.system.archive.model.ArchiveModel;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.FightAttr;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_piclv_005;
import excel.config.Config_picstar_005;
import excel.config.Config_picteam_005;
import excel.config.Config_picture_005;
import excel.struct.Struct_piclv_005;
import excel.struct.Struct_picstar_005;
import excel.struct.Struct_picteam_005;
import excel.struct.Struct_picture_005;

public class ArchiveFunction {

	private static ArchiveFunction archiveFunction;

	public ArchiveFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized ArchiveFunction getIns() {
		if (archiveFunction == null) {
			archiveFunction = new ArchiveFunction();
		}
		return archiveFunction;
	}

	/**
	 * 获取图鉴战力
	 * @param hero
	 * @return
	 */
	public long getArchiveTotalStrength(Hero hero) {
		ArchiveData archiveData = hero.getArchiveData();
		if (archiveData != null) {
			Map<Integer, ArchiveModel> archiveMap = archiveData.getArchiveMap();
			if (archiveMap.size() == 0) {
				return 0;
			}
			Map<Integer, Long> attrMap = new HashMap<>();
			Iterator<ArchiveModel> iterator = archiveMap.values().iterator();
			ArchiveModel archiveModel = null;
			Struct_picture_005 struct_picture_005 = null;
			Struct_piclv_005 struct_piclv_005 = null;
			int[][] attr = null;

			for (; iterator.hasNext();) {
				archiveModel = iterator.next();
				// 图鉴基础
				struct_picture_005 = Config_picture_005.getIns().get(archiveModel.getId());
				if (struct_picture_005 != null) {
					attr = struct_picture_005.getAttr();
					CommonUtil.arrChargeMap(attr, attrMap);
				}
				// 图鉴等级
				struct_piclv_005 = Config_piclv_005.getIns().get(archiveModel.getLevelIndex());
				if (struct_piclv_005 != null) {
					attr = struct_piclv_005.getAttr();
					CommonUtil.arrChargeMap(attr, attrMap);
				}
				// 图鉴星级
				Struct_picstar_005 struct_picstar_005 = Config_picstar_005.getIns()
						.get(archiveModel.getStarLevelIndex());
				if (struct_picstar_005 != null) {
					attr = struct_picstar_005.getAttr();
					CommonUtil.arrChargeMap(attr, attrMap);
				}
			}
			// 图鉴套装
			Set<Integer> archiveSetList = new HashSet<>(archiveData.getArchiveSetList());
			Struct_picteam_005 struct_picteam_005 = null;
			for (int setId : archiveSetList) {
				struct_picteam_005 = Config_picteam_005.getIns().get(setId);
				if (struct_picteam_005 != null) {
					attr = struct_picteam_005.getAttr();
					CommonUtil.arrChargeMap(attr, attrMap);
				}
			}
			long[][] totalAttr = CommonUtil.mapToArr(attrMap);
			FinalFightAttr finalAttr = new FinalFightAttr();
			FightAttr fAttr = new FightAttr();
			FightCalcFunction.setFightValue(totalAttr, fAttr);
			FightCalcFunction.calcEquipAttr(finalAttr, fAttr, 0);
			return finalAttr.getStrength();
		}
		return 0;
	}
	
	
	/**
	 * 获取图鉴战力
	 * @param hero
	 * @return
	 */
	public long getArchiveStrengthByIndex(Hero hero,int index) {
		ArchiveData archiveData = hero.getArchiveData();
		if (archiveData != null) {
			Map<Integer, ArchiveModel> archiveMap = archiveData.getArchiveMap();
			if (archiveMap.size() == 0) {
				return 0;
			}
			Map<Integer, Long> attrMap = new HashMap<>();
			ArchiveModel archiveModel = archiveMap.get(index);
			Struct_picture_005 struct_picture_005 = null;
			int[][] attr = null;
			// 图鉴基础
			struct_picture_005 = Config_picture_005.getIns().get(archiveModel.getId());
			if (struct_picture_005 != null) {
				attr = struct_picture_005.getAttr();
				CommonUtil.arrChargeMap(attr, attrMap);
			}
			// 图鉴等级
			Struct_piclv_005 struct_piclv_005 = Config_piclv_005.getIns().get(archiveModel.getLevelIndex());
			if (struct_piclv_005 != null) {
				attr = struct_piclv_005.getAttr();
				CommonUtil.arrChargeMap(attr, attrMap);
			}
			// 图鉴星级
			Struct_picstar_005 struct_picstar_005 = Config_picstar_005.getIns()
					.get(archiveModel.getStarLevelIndex());
			if (struct_picstar_005 != null) {
				attr = struct_picstar_005.getAttr();
				CommonUtil.arrChargeMap(attr, attrMap);
			}

			long[][] totalAttr = CommonUtil.mapToArr(attrMap);
			FinalFightAttr finalAttr = new FinalFightAttr();
			FightAttr fAttr = new FightAttr();
			FightCalcFunction.setFightValue(totalAttr, fAttr);
			FightCalcFunction.calcEquipAttr(finalAttr, fAttr, 0);
			return finalAttr.getStrength();
		}
		return 0;
	}
	
	public int sumLevel(Hero hero) {
		int maxLevel=0;
		ArchiveData archiveData = hero.getArchiveData();
		if (archiveData != null) {
			Map<Integer, ArchiveModel> archiveMap = archiveData.getArchiveMap();
			if (archiveMap.size() == 0) {
				return 0;
			}
			Iterator<ArchiveModel> iterator = archiveMap.values().iterator();
			ArchiveModel archiveModel = null;
			Struct_piclv_005 struct_piclv_005 = null;
			for (; iterator.hasNext();) {
				archiveModel = iterator.next();
				// 图鉴等级
				struct_piclv_005 = Config_piclv_005.getIns().get(archiveModel.getLevelIndex());
				maxLevel=maxLevel+struct_piclv_005.getLv();
			}
			
		}
		return maxLevel;
		
	}

	/**
	 * 检测红点
	 * @param hero
	 * @return
	 */
	public boolean checkRedPoint(Hero hero) {
		try {
			ArchiveData archiveData = hero.getArchiveData();
			if (archiveData != null) {
				// 激活
				List<Struct_picture_005> sortList = Config_picture_005.getIns().getSortList();
				int size = sortList.size();
				Struct_picture_005 struct_picture_005 = null;
				int[][] activation = null;
				Map<Integer, ArchiveModel> archiveMap = archiveData.getArchiveMap();
				for (int i = 0; i < size; i++) {
					struct_picture_005 = sortList.get(i);
					if (archiveMap.containsKey(struct_picture_005.getID())) {
						continue;
					}
					activation = struct_picture_005.getActivation();// 消耗
					if (activation != null && UseAddUtil.canUse(hero, activation)) {
						return true;
					}
				}
				// 升级、升星
				Set<Integer> keySet = new HashSet<>(archiveMap.keySet());
				Struct_piclv_005 struct_piclv_005 = null;
				int[][] consume = null;
				ArchiveModel archiveModel = null;
				Struct_picstar_005 struct_picstar_005 = null;
				Iterator<Integer> iterator = keySet.iterator();
				for (; iterator.hasNext();) {
					int archiveId = iterator.next();
					// 升星
					archiveModel = archiveMap.get(archiveId);
					int starLevelIndex = archiveModel.getStarLevelIndex();
					struct_picstar_005 = Config_picstar_005.getIns().get(starLevelIndex);
					int lvmax = struct_picstar_005.getLvmax();
					int nextId = struct_picstar_005.getNext();
					if (nextId > 0) {
						consume = struct_picstar_005.getConsume();
						if (consume != null && UseAddUtil.canUse(hero, consume)) {
							return true;
						}
					}
					archiveModel = archiveMap.get(archiveId);
					int levelIndex = archiveModel.getLevelIndex();
					struct_piclv_005 = Config_piclv_005.getIns().get(levelIndex);
					if (struct_piclv_005.getLv() >= lvmax) {
						continue;
					}
					int nextIndex = struct_piclv_005.getNext();
					if (nextIndex > 0) {
						consume = struct_piclv_005.getConsume();// 消耗
						if (consume != null && UseAddUtil.canUse(hero, consume)) {
							return true;
						}
					}
				}
				// 套装
				Map<Integer, List<Struct_picteam_005>> typeSuitMap = ArchiveCache.getTypeSuitMap();
				Set<Integer> archiveSetList = new HashSet<>(archiveData.getArchiveSetList());
				Struct_picteam_005 struct_picteam_005 = null;
				Struct_picteam_005 picteam_next = null;
				for (int type : typeSuitMap.keySet()) {
					int setId = 0;
					for (int mySetId : archiveSetList) {
						struct_picteam_005 = Config_picteam_005.getIns().get(mySetId);
						int myType = struct_picteam_005.getType();
						if (type == myType) {
							setId = mySetId;
							break;
						}
					}
					if (setId == 0) {
						setId = typeSuitMap.get(type).get(0).getId();
					}
					struct_picteam_005 = Config_picteam_005.getIns().get(setId);
					int typeLevel = ArchiveManager.getIns().getTypeLevel(archiveMap, type);
					int nextId = struct_picteam_005.getNext();
					if (nextId > 0) {
						picteam_next = Config_picteam_005.getIns().get(nextId);
						if (typeLevel >= picteam_next.getNeed()) {
							return true;
						}
					}
				}
			}
		} catch (Exception e) {
			LogTool.error(e, ArchiveFunction.class, hero.getId(), hero.getName(), "ArchiveFunction checkRedPoint");
		}
		return false;
	}
	
	/**
	 * 更新红点
	 */
	public void updateRedPoint(Hero hero) {
		try {
			boolean redPoint = checkRedPoint(hero);
			if(!redPoint) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, ArchiveConst.SysId, ArchiveConst.RedPoint,
								RedPointConst.NO_RED);
			}
		} catch (Exception e) {
			LogTool.error(e, ArchiveFunction.class, hero.getId(), hero.getName(), "ArchiveFunction updateRedPoint");
		}
	}

}
