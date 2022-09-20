package com.teamtop.system.starPicture;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.system.starPicture.model.StarPictureModel;

import excel.struct.Struct_xingtu_706;

public class StarPictureSysEvent extends AbsSystemEvent {

	private static StarPictureSysEvent starPictureSysEvent;

	private StarPictureSysEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized StarPictureSysEvent getIns() {
		if (starPictureSysEvent == null) {
			starPictureSysEvent = new StarPictureSysEvent();
		}
		return starPictureSysEvent;
	}

	@Override
	public void init(Hero hero) {
		// 系统开启
		Map<Integer, StarPictureModel> starPictureMap = hero.getStarPictureMap();
		if (starPictureMap != null && starPictureMap.size() > 0) {
			return;
		}
		starPictureMap = new HashMap<>();
		hero.setStarPictureMap(starPictureMap);
		Map<Integer, List<Struct_xingtu_706>> starPictureTypeMap = StarPictureCache.getStarPictureTypeMap();
		Iterator<Integer> iterator = starPictureTypeMap.keySet().iterator();
		for (; iterator.hasNext();) {
			starPictureMap.put(iterator.next(), new StarPictureModel());
		}
	}

	@Override
	public void login(Hero hero) {
		boolean redPoint = StarPictureFunction.getIns().checkRedPoint(hero);
		if (redPoint) {
			RedPointFunction.getIns().addLoginRedPoint(hero, StarPictureConst.SysId, StarPictureConst.RedPoint,
					RedPointConst.HAS_RED);
		}
	}

	@Override
	public void passGuanqia(Hero hero, int passGuanqia) {

	}

}
