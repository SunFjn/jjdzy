package com.teamtop.system.starPicture;

import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.starPicture.model.StarPictureModel;
import com.teamtop.util.log.LogTool;

import excel.config.Config_xingtu_706;
import excel.config.Config_xingtujh_706;
import excel.struct.Struct_xingtu_706;
import excel.struct.Struct_xingtujh_706;

public class StarPictureFunction {

	private static StarPictureFunction starPictureFunction;

	private StarPictureFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized StarPictureFunction getIns() {
		if (starPictureFunction == null) {
			starPictureFunction = new StarPictureFunction();
		}
		return starPictureFunction;
	}

	/**
	 * 红点检测
	 * @param hero
	 * @return
	 */
	public boolean checkRedPoint(Hero hero) {
		try {
			Map<Integer, StarPictureModel> starPictureMap = hero.getStarPictureMap();
			if (starPictureMap != null) {
				Set<Integer> typeSet = new HashSet<>(starPictureMap.keySet());
				Struct_xingtujh_706 activate = null;
				StarPictureModel starPictureModel = null;
				Struct_xingtu_706 oldXingtu = null;
				int[][] need = null;
				Iterator<Integer> iterator = typeSet.iterator();
				for (; iterator.hasNext();) {
					int type = iterator.next();
					starPictureModel = starPictureMap.get(type);
					activate = Config_xingtujh_706.getIns().get(type);
					int zsId = activate.getCondition();
					// 检测开启条件
					if (hero.getRebornlv() < zsId) {
						continue;
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
						continue;
					}
					oldXingtu = Config_xingtu_706.getIns().get(id);

					need = oldXingtu.getNeed();
					if (UseAddUtil.canUse(hero, need)) {
						return true;
					}
				}
			}
		} catch (Exception e) {
			LogTool.error(e, StarPictureFunction.class, hero.getId(), hero.getName(),
					"StarPictureFunction checkRedPoint");
		}
		return false;
	}
	
	
	public int getMaxLevel(Hero hero) {
		int maxLevel=0;
		Map<Integer, StarPictureModel> starPictureMap = hero.getStarPictureMap();
		for (StarPictureModel starPictureModel : starPictureMap.values()) {
			if (starPictureModel.getLevel()>maxLevel) {
				maxLevel=starPictureModel.getLevel();
			}
		}
		return maxLevel;
		
	}

}
