package com.teamtop.system.directUp;

import java.util.Map;

import com.teamtop.system.hero.Hero;

public class DirectUPManager {
	private static DirectUPManager ins = null;

	public static DirectUPManager getIns() {
		if (ins == null) {
			ins = new DirectUPManager();
		}
		return ins;
	}

	private DirectUPManager() {
	}

	/**
	 * 升阶
	 * 
	 * @param hero
	 * @param type 系统类型，1:武将，2:战甲，3:宝物，4:天书，5:神剑，6:兵法，7:异宝
	 */
	public void directUp(Hero hero, int type) {
		// TODO Auto-generated method stub
		if (hero == null) {
			return;
		}
		Map<Integer, DirectUPAbs> directUPAbsMap = DirectUPCache.getDirectUPAbsMap();
		DirectUPAbs directUPAbs = directUPAbsMap.get(type);
		if (directUPAbs == null) {
			DirectUPSender.sendCmd_3742(hero.getId(), DirectUPConst.PARA_FAILURE, type);
			return;
		}
		int status = directUPAbs.directUP(hero);
		if (status == DirectUPConst.SUCCESS) {
			DirectUPSender.sendCmd_3742(hero.getId(), DirectUPConst.SUCCESS, type);
			return;
		} else if (status == DirectUPConst.NOTNUM_FAILURE) {
			DirectUPSender.sendCmd_3742(hero.getId(), DirectUPConst.NOTNUM_FAILURE, type);
			return;
		} else if (status == DirectUPConst.NOTSTART_FAILURE) {
			DirectUPSender.sendCmd_3742(hero.getId(), DirectUPConst.NOTSTART_FAILURE, type);
			return;
		}
	}

}
