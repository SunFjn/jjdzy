package com.teamtop.system.openDaysSystem.monsterKingLoginGift;

import java.util.Iterator;
import java.util.Map;
import java.util.Set;

import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;
import com.teamtop.system.openDaysSystem.monsterKingLoginGift.model.MonsterKingLoginGift;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.struct.Struct_wszwdlyj_324;

public class MonsterKingLoginGiftFunction {

	private static MonsterKingLoginGiftFunction ins;

	private MonsterKingLoginGiftFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized MonsterKingLoginGiftFunction getIns() {
		if (ins == null) {
			ins = new MonsterKingLoginGiftFunction();
		}
		return ins;
	}

	/**
	 * 检测登录天数
	 * 
	 * @param hero
	 */
	public void checkLoginDays(Hero hero) {
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.MONSTER_KING_LOGIN_GIFT)) {
				return;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.MONSTER_KING_LOGIN_GIFT);
			MonsterKingLoginGift actData = (MonsterKingLoginGift) MonsterKingLoginGiftManager.getIns().getSystemModel(hero, uid);
			int firstTime = actData.getFirstTime();
			int loginTimes = actData.getLoginTimes();
			int zeroTime = TimeDateUtil.getTodayZeroTimeReturnInt();
			if (firstTime != 0 && firstTime == zeroTime) {
				return;
			}
			if (firstTime == 0) {
				firstTime = zeroTime;
				actData.setFirstTime(firstTime);
				loginTimes++;
			} else if (firstTime < zeroTime) {
				actData.setFirstTime(zeroTime);
				loginTimes++;
			}
			actData.setLoginTimes(loginTimes);
			updateRedPoint(hero);
		} catch (Exception e) {
			LogTool.error(e, MonsterKingLoginGiftFunction.class, hero.getId(), hero.getName(),
					"MonsterKingLoginGiftFunction checkLoginDays");
		}
	}

	/**
	 * 检测红点
	 * 
	 * @param hero
	 * @return
	 */
	public boolean checkRedPoint(Hero hero) {
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.MONSTER_KING_LOGIN_GIFT)) {
				return false;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.MONSTER_KING_LOGIN_GIFT);
			MonsterKingLoginGift actData = (MonsterKingLoginGift) MonsterKingLoginGiftManager.getIns().getSystemModel(hero, uid);
			int qs = actData.getQs();
			Map<Integer, Struct_wszwdlyj_324> map = MonsterKingLoginGiftCache.getQsMap().get(qs);
			Iterator<Integer> iterator = map.keySet().iterator();
			int loginTimes = actData.getLoginTimes();
			Set<Integer> reward = actData.getReward();
			for (; iterator.hasNext();) {
				Integer day = iterator.next();
				if (day <= loginTimes && (!reward.contains(day))) {
					return true;
				}
			}
		} catch (Exception e) {
			LogTool.error(e, MonsterKingLoginGiftFunction.class, hero.getId(), hero.getName(),
					"MonsterKingLoginGiftFunction checkRedPiont");
		}
		return false;
	}

	/**
	 * 更新红点
	 * 
	 * @param hero
	 */
	public void updateRedPoint(Hero hero) {
		try {
			boolean redPoint = checkRedPoint(hero);
			if (redPoint) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.MONSTER_KING_LOGIN_GIFT,
						RedPointConst.RED_1, RedPointConst.HAS_RED);
			} else {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.MONSTER_KING_LOGIN_GIFT,
						RedPointConst.RED_1, RedPointConst.NO_RED);
			}
		} catch (Exception e) {
			LogTool.error(e, MonsterKingLoginGiftFunction.class, hero.getId(), hero.getName(),
					"MonsterKingLoginGiftFunction updateRedPoint");
		}
	}

}
