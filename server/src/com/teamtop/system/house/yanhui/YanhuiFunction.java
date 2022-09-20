package com.teamtop.system.house.yanhui;

import java.util.Map;

import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;

public class YanhuiFunction {
	
	private static YanhuiFunction yanhuiFunction;

	private YanhuiFunction() {
		
	}
	public static synchronized YanhuiFunction getIns() {
		if (yanhuiFunction == null) {
			yanhuiFunction = new YanhuiFunction();
		}
		return yanhuiFunction;
	}
	// 是否开启宴会
	private boolean isStart = false;
	
	public boolean isStart() {
		return isStart;
	}

	public void setStart(boolean isStartServer) {
		this.isStart = isStartServer;
	}
	
	/**
	 * 显示宴会图标
	 * @param houseModel
	 * @return
	 */
	public void show(Hero hero, int type) {
		if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.YANHUI)) return;
		YanhuiSender.sendCmd_11472(hero.getId(), SystemIdConst.YANHUI, type);
	}
	
	public void showAll(int type) {
		Map<Long, Hero> heroMap = HeroCache.getHeroMap();
		for (Hero hero : heroMap.values()) {
			if (hero.isOnline()) {
				show(hero, type);
			}
		}
	}
	
}
