package com.teamtop.system.starPicture;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.FightCalcConst;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.starPicture.model.StarPictureModel;
import com.teamtop.system.task.TaskUserConst;
import com.teamtop.system.task.TaskUserFunction;
import com.teamtop.util.log.LogTool;

import excel.config.Config_xingtu_706;
import excel.config.Config_xingtujh_706;
import excel.struct.Struct_xingtu_706;
import excel.struct.Struct_xingtujh_706;

public class StarPictureManager {

	private static StarPictureManager starPictureManager;

	private StarPictureManager() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized StarPictureManager getIns() {
		if (starPictureManager == null) {
			starPictureManager = new StarPictureManager();
		}
		return starPictureManager;
	}

	/**
	 * 打开星图
	 * 
	 * @param hero
	 */
	public void openStarPicture(Hero hero) {
		if (hero == null) {
			return;
		}
		try {
			Map<Integer, StarPictureModel> starPictureMap = hero.getStarPictureMap();
			if (starPictureMap == null) {
				// 系统未开启
				return;
			}
			List<Object[]> sendData = new ArrayList<>();
			Iterator<Integer> iterator = starPictureMap.keySet().iterator();
			for (; iterator.hasNext();) {
				int type = iterator.next();
				StarPictureModel starPictureModel = starPictureMap.get(type);
				sendData.add(new Object[] { starPictureModel.getId() });
			}
			StarPictureSender.sendCmd_922(hero.getId(), sendData.toArray());
		} catch (Exception e) {
			LogTool.error(e, StarPictureManager.class, hero.getId(), hero.getName(), "openStarPicture fail");
		}
	}

	/**
	 * 星图升级
	 * 
	 * @param hero
	 * @param type
	 */
	public void upgradeLevel(Hero hero, int type) {
		if (hero == null) {
			return;
		}
		try {
			long hid = hero.getId();
			Map<Integer, StarPictureModel> starPictureMap = hero.getStarPictureMap();
			if (starPictureMap == null) {
				// 系统未开启
				return;
			}
			StarPictureModel starPictureModel = starPictureMap.get(type);
			if (starPictureModel == null) {
				// 非法参数
				return;
			}

			Struct_xingtujh_706 activate = Config_xingtujh_706.getIns().get(type);
			int zsId = activate.getCondition();
			// 检测开启条件
			if (hero.getRebornlv() < zsId) {
				StarPictureSender.sendCmd_924(hid, 0, 2);
				return;
			}
			int id = starPictureModel.getId();
			int nextId = 0;
			if (id == 0) {
				List<Struct_xingtu_706> list = StarPictureCache.getStarPictureTypeMap().get(type);
				id = list.get(0).getId();
			}
			nextId = Config_xingtu_706.getIns().get(id).getNext();
			if (nextId == 0) {
				// 达到最高级
				StarPictureSender.sendCmd_924(hid, 0, 1);
				return;
			}
			Struct_xingtu_706 oldXingtu = Config_xingtu_706.getIns().get(id);

			int[][] need = oldXingtu.getNeed();
			if (!UseAddUtil.canUse(hero, need)) {
				// 材料不足
				StarPictureSender.sendCmd_924(hid, 0, 3);
				return;
			}
			UseAddUtil.use(hero, need, SourceGoodConst.STARPICTURE_UPGRADE, true);
			starPictureModel.setId(nextId);
			int level = starPictureModel.getLevel();
			int nextLevel = nextId % 100;
			if (level < nextLevel) {
				starPictureModel.setLevel(nextLevel);
			}
			StarPictureSender.sendCmd_924(hid, 1, nextId);
			// 重新计算战力
			FightCalcFunction.setRecalcAll(hero, FightCalcConst.ARCHIVE_UPGRADESTAR,SystemIdConst.StarPicture_SYSID);
			//任务
			TaskUserFunction.getIns().reshTaskUser(hero, TaskUserConst.TASK_TYPE_41, 1);
			LogTool.info(hid, hero.getName(), "StarPictureManager type="+type+", nextId=" + nextId, StarPictureManager.class);
		} catch (Exception e) {
			LogTool.error(e, StarPictureManager.class, hero.getId(), hero.getName(), "upgradeLevel fail");
		}
	}

}
