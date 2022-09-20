package com.teamtop.system.archive;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.achievement.AchievementEnum;
import com.teamtop.system.achievement.AchievementFunction;
import com.teamtop.system.archive.model.ArchiveData;
import com.teamtop.system.archive.model.ArchiveModel;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.FightCalcConst;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.util.log.LogTool;

import excel.config.Config_piclv_005;
import excel.config.Config_picstar_005;
import excel.config.Config_picteam_005;
import excel.config.Config_picture_005;
import excel.struct.Struct_piclv_005;
import excel.struct.Struct_picstar_005;
import excel.struct.Struct_picteam_005;
import excel.struct.Struct_picture_005;

/**
 * 图鉴系统
 * 
 * @author hzp
 *
 */
public class ArchiveManager {

	private static ArchiveManager archiveManager;

	private ArchiveManager() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized ArchiveManager getIns() {
		if (archiveManager == null) {
			archiveManager = new ArchiveManager();
		}
		return archiveManager;
	}

	/**
	 * 打开图鉴
	 * 
	 * @param hero
	 */
	public void openArchive(Hero hero) {
		if (hero == null) {
			return;
		}
		try {
			ArchiveData archiveData = hero.getArchiveData();
			if (archiveData == null) {
				return;
			}
			if (!HeroFunction.getIns().checkSystemOpen(hero, ArchiveConst.SysId)) {
				return;
			}
			Map<Integer, ArchiveModel> archiveMap = archiveData.getArchiveMap();
			List<Object[]> archiveList = new ArrayList<>();
			Iterator<Integer> iterator = archiveMap.keySet().iterator();
			for(;iterator.hasNext();) {
				int id = iterator.next();
				ArchiveModel archiveModel = archiveMap.get(id);
				archiveList.add(new Object[] { id, archiveModel.getLevelIndex(), archiveModel.getStarLevelIndex() });
			}
			Set<Integer> archiveSetList = archiveData.getArchiveSetList();
			List<Object[]> archiveSetObjList = new ArrayList<>();
			for (Integer id : archiveSetList) {
				archiveSetObjList.add(new Object[] { id });
			}
			ArchiveSender.sendCmd_872(hero.getId(), archiveList.toArray(), archiveSetObjList.toArray());
		} catch (Exception e) {
			LogTool.error(e, ArchiveManager.class, hero.getId(), hero.getName(), "openArchive");
		}
	}

	/**
	 * 激活图鉴
	 * @param hero
	 * @param archiveId 图鉴id
	 */
	public void activateArchive(Hero hero, int archiveId) {
		if (hero == null) {
			return;
		}
		try {
			long hid = hero.getId();
			ArchiveData archiveData = hero.getArchiveData();
			if (archiveData == null) {
				return;
			}
			if (!HeroFunction.getIns().checkSystemOpen(hero, ArchiveConst.SysId)) {
				return;
			}
			Map<Integer, ArchiveModel> archiveMap = archiveData.getArchiveMap();
			if (archiveMap.containsKey(archiveId)) {
				// 不能重复激活
				ArchiveSender.sendCmd_874(hid, 0, 1, 0, 0);
				return;
			}
			Struct_picture_005 struct_picture_005 = Config_picture_005.getIns().get(archiveId);
			int[][] activation = struct_picture_005.getActivation();// 消耗
			if (!UseAddUtil.canUse(hero, activation)) {
				// 材料不足
				ArchiveSender.sendCmd_874(hid, 0, 2, 0, 0);
				return;
			}
			UseAddUtil.use(hero, activation, SourceGoodConst.ARCHIVE_UPGRADE_STAR, true);
			int levelIndex = struct_picture_005.getQuality() * 1000 + 1;// 图鉴等级索引

			List<Struct_picstar_005> list = ArchiveCache.getArchiveStarMap().get(archiveId);
			int starLevelIndex = list.get(0).getIndex();// 图鉴星级索引

			ArchiveModel model = new ArchiveModel(archiveId, levelIndex, starLevelIndex);
			archiveMap.put(archiveId, model);

			ArchiveSender.sendCmd_874(hid, 1, archiveId, levelIndex, starLevelIndex);
			// 激活图鉴属性变化 重新计算战力
			FightCalcFunction.setRecalcAll(hero, FightCalcConst.ARCHIVE_ACTIVATE,SystemIdConst.Archive_SYSID);
			ArchiveFunction.getIns().updateRedPoint(hero);
			// 成就
			AchievementFunction.getIns().checkTask(hero, AchievementEnum.GOAL_21, 0);
		} catch (Exception e) {
			LogTool.error(e, ArchiveManager.class, hero.getId(), hero.getName(),
					"activateArchive fail, archiveId=" + archiveId);
		}
	}

	/**
	 * 图鉴升级
	 * 
	 * @param hero
	 * @param archiveId
	 */
	public void upgradeLevel(Hero hero, int archiveId) {
		if (hero == null) {
			return;
		}
		try {
			long hid = hero.getId();
			ArchiveData archiveData = hero.getArchiveData();
			if (archiveData == null) {
				return;
			}
			if (!HeroFunction.getIns().checkSystemOpen(hero, ArchiveConst.SysId)) {
				return;
			}
			Map<Integer, ArchiveModel> archiveMap = archiveData.getArchiveMap();
			if (!archiveMap.containsKey(archiveId)) {
				// 未激活该图鉴
				ArchiveSender.sendCmd_876(hid, 0, 1, 0);
				return;
			}
			ArchiveModel archiveModel = archiveMap.get(archiveId);
			int levelIndex = archiveModel.getLevelIndex();
			Struct_piclv_005 struct_piclv_005 = Config_piclv_005.getIns().get(levelIndex);
			int nextIndex = struct_piclv_005.getNext();
			if (nextIndex == 0) {
				// 到达最高等级
				ArchiveSender.sendCmd_876(hid, 0, 2, 0);
				return;
			}
			int starLevelIndex = archiveModel.getStarLevelIndex();
			Struct_picstar_005 struct_picstar_005 = Config_picstar_005.getIns().get(starLevelIndex);
			int lvmax = struct_picstar_005.getLvmax();
			if(struct_piclv_005.getLv() >= lvmax) {
				return;
			}
			int[][] consume = struct_piclv_005.getConsume();// 消耗
			if (!UseAddUtil.canUse(hero, consume)) {
				// 材料不足
				ArchiveSender.sendCmd_876(hid, 0, 3, 0);
				return;
			}
			UseAddUtil.use(hero, consume, SourceGoodConst.ARCHIVE_UPGRADE_LEVEL, true);
			archiveModel.setLevelIndex(nextIndex);
			ArchiveSender.sendCmd_876(hid, 1, archiveId, nextIndex);
			// 重新计算战力
			FightCalcFunction.setRecalcAll(hero, FightCalcConst.ARCHIVE_UPGRADELEVEL,SystemIdConst.Archive_SYSID);
			ArchiveFunction.getIns().updateRedPoint(hero);
			LogTool.info(hid, hero.getName(), "ArchiveManager levelIndex=" + nextIndex, ArchiveManager.class);
		} catch (Exception e) {
			LogTool.error(e, ArchiveManager.class, hero.getId(), hero.getName(),
					"upgradeLevel fail, archiveId=" + archiveId);
		}
	}

	/**
	 * 图鉴升星
	 * 
	 * @param hero
	 * @param archiveId
	 */
	public void upgradeStar(Hero hero, int archiveId) {
		if (hero == null) {
			return;
		}
		try {
			long hid = hero.getId();
			ArchiveData archiveData = hero.getArchiveData();
			if (archiveData == null) {
				return;
			}
			if (!HeroFunction.getIns().checkSystemOpen(hero, ArchiveConst.SysId)) {
				return;
			}
			Map<Integer, ArchiveModel> archiveMap = archiveData.getArchiveMap();
			if (!archiveMap.containsKey(archiveId)) {
				// 未激活该图鉴
				ArchiveSender.sendCmd_878(hid, 0, 1, 0);
				return;
			}
			ArchiveModel archiveModel = archiveMap.get(archiveId);
			int starLevelIndex = archiveModel.getStarLevelIndex();
			Struct_picstar_005 struct_picstar_005 = Config_picstar_005.getIns().get(starLevelIndex);
			int nextId = struct_picstar_005.getNext();
			if (nextId == 0) {
				// 达到最高星级
				ArchiveSender.sendCmd_878(hid, 0, 2, 0);
				return;
			}
			int[][] consume = struct_picstar_005.getConsume();
			if (!UseAddUtil.canUse(hero, consume)) {
				// 材料不足
				ArchiveSender.sendCmd_878(hid, 0, 3, 0);
				return;
			}
			UseAddUtil.use(hero, consume, SourceGoodConst.ARCHIVE_UPGRADE_STAR, true);
			archiveModel.setStarLevelIndex(nextId);
			ArchiveSender.sendCmd_878(hid, 1, archiveId, nextId);
			// 重新计算战力
			FightCalcFunction.setRecalcAll(hero, FightCalcConst.ARCHIVE_UPGRADESTAR,SystemIdConst.Archive_SYSID);
			ArchiveFunction.getIns().updateRedPoint(hero);
			// 成就
			AchievementFunction.getIns().checkTask(hero, AchievementEnum.GOAL_22, 0);
			LogTool.info(hid, hero.getName(), "ArchiveManager StarLevelIndex=" + nextId, ArchiveManager.class);
		} catch (Exception e) {
			LogTool.error(e, ArchiveManager.class, hero.getId(), hero.getName(),
					"upgradeStar fail, archiveId=" + archiveId);
		}
	}

	/**
	 * 获取套装等级
	 */
	public int getTypeLevel(Map<Integer, ArchiveModel> archiveMap, int type) {
		int totalLevel = 0;
		Iterator<Integer> iterator = archiveMap.keySet().iterator();
		for (; iterator.hasNext();) {
			Integer id = iterator.next();
			Struct_picture_005 struct_picture_005 = Config_picture_005.getIns().get(id);
			if (struct_picture_005.getType() != type) {
				continue;
			}
			ArchiveModel archiveModel = archiveMap.get(id);
			Struct_piclv_005 struct_piclv_005 = Config_piclv_005.getIns().get(archiveModel.getLevelIndex());
			if (struct_piclv_005 != null) {
				totalLevel += struct_piclv_005.getLv();
			}
		}
		return totalLevel;
	}

	/**
	 * 升级套装
	 * 
	 * @param hero
	 * @param setId
	 */
	public void upgradeSet(Hero hero, int setId) {
		if (hero == null) {
			return;
		}
		try {
			long hid = hero.getId();
			ArchiveData archiveData = hero.getArchiveData();
			if (archiveData == null) {
				return;
			}
			if (!HeroFunction.getIns().checkSystemOpen(hero, ArchiveConst.SysId)) {
				return;
			}
			Set<Integer> archiveSetList = archiveData.getArchiveSetList();
			Struct_picteam_005 struct_picteam_005 = Config_picteam_005.getIns().get(setId);
			if (struct_picteam_005.getLv() > 1 && !archiveSetList.contains(setId)) {
				//非法操作
				return;
			}
			int type = struct_picteam_005.getType();
			Map<Integer, ArchiveModel> archiveMap = archiveData.getArchiveMap();
			int typeLevel = getTypeLevel(archiveMap, type);
			int nextId = struct_picteam_005.getNext();
			Struct_picteam_005 picteam_next = Config_picteam_005.getIns().get(nextId);
			if(typeLevel<picteam_next.getNeed()) {
				//未达升级条件
				ArchiveSender.sendCmd_880(hid, 0, 1);
				return;
			}
			archiveSetList.remove(setId);
			archiveSetList.add(nextId);
			ArchiveSender.sendCmd_880(hid, 1, nextId);
			// 重新计算战力
			FightCalcFunction.setRecalcAll(hero, FightCalcConst.ARCHIVE_SET,SystemIdConst.Archive_SYSID);
			ArchiveFunction.getIns().updateRedPoint(hero);
			LogTool.info(hid, hero.getName(), "ArchiveManager nexSetId=" + nextId, ArchiveManager.class);
		} catch (Exception e) {
			LogTool.error(e, ArchiveManager.class, hero.getId(), hero.getName(), "upgradeStar fail, setId=" + setId);
		}
	}

}
