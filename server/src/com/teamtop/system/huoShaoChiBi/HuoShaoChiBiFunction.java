package com.teamtop.system.huoShaoChiBi;

import com.teamtop.system.hero.Hero;
import com.teamtop.system.rankNew.RankingFunction;
import com.teamtop.util.time.TimeDateUtil;

public class HuoShaoChiBiFunction {

	private static HuoShaoChiBiFunction ins = null;

	public static HuoShaoChiBiFunction getIns() {
		if (ins == null) {
			ins = new HuoShaoChiBiFunction();
		}
		return ins;
	}

	/**
	 * Gm调关卡方便测试
	 * @param hero
	 * @param param
	 */
	public void GM(Hero hero, String[] param) {
		int num = Integer.parseInt(param[0]);
		if (num < hero.getHuoShaoChiBi().getFloorNum()) {
			return;
		}
		hero.getHuoShaoChiBi().setFloorNum(num);
		hero.getHuoShaoChiBi().setAttTime(TimeDateUtil.getCurrentTime());
		RankingFunction.getIns().refreshHuoShaoChiBiRankList(hero);
		HuoShaoChiBiManager.getIns().openUi(hero);
		return;
	}
	
	
}
