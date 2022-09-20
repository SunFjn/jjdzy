package com.teamtop.system.sevenDayLogin;

import java.util.ArrayList;
import java.util.List;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import excel.config.Config_qrdl_717;

public class SevenDayLoginManager {
	private static SevenDayLoginManager ins;

	public static SevenDayLoginManager getIns() {
		if (ins == null) {
			ins = new SevenDayLoginManager();
		}
		return ins;
	}

	private SevenDayLoginManager() {
	}

	/**
	 * 打开界面
	 * @param hero
	 */
	public void openUI(Hero hero) {
		if (hero == null) {
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, SevenDayLoginConst.SEVENDAYLOGIN)) {
			return;
		}
		List<Integer> getteList = hero.getSevenDayLogin().getGetteList();
		ArrayList<Object> arrayList = new ArrayList<Object>();
		for (Integer gettedDay : getteList) {
			arrayList.add(new Object[] { gettedDay });
		}
		int loginDay = hero.getSevenDayLogin().getLoginDay();
		SevenDayLoginSender.sendCmd_1902(hero.getId(), arrayList.toArray(), loginDay);
	}

	/**
	 * 领取奖励
	 * @param hero
	 * @param getDay
	 */
	public void getAwards(Hero hero, int getDay) {
		if (hero == null) {
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, SevenDayLoginConst.SEVENDAYLOGIN)) {
			return;
		}
		if (getDay < 1 || getDay > 7) {// 天数是否合法
			SevenDayLoginSender.sendCmd_1904(hero.getId(), SevenDayLoginConst.FAILURE_FAILURE_GETDAY, 0);
			return;
		}
		List<Integer> getteList = hero.getSevenDayLogin().getGetteList();
		int loginDay = hero.getSevenDayLogin().getLoginDay();
		if (getteList.size() == 7) {
			return;
		}
		if (getDay > loginDay) { // 判断是否超过登录天数
			SevenDayLoginSender.sendCmd_1904(hero.getId(), SevenDayLoginConst.FAILURE_NOT_LOGINDAY, 0);
			return;
		}
		if (getteList.contains(getDay)) { // 检查是否重复领取
			SevenDayLoginSender.sendCmd_1904(hero.getId(), SevenDayLoginConst.FAILURE_NOT_REP, 0);
			return;
		}
		getteList.add(getDay);
		int[][] award = Config_qrdl_717.getIns().get(getDay).getAWARD();
		UseAddUtil.add(hero, award, SourceGoodConst.SD_LOGIN_AWARDS, null, true); // 发放奖励
		SevenDayLoginSender.sendCmd_1904(hero.getId(), SevenDayLoginConst.SUCCESS, getDay);
	}

}
