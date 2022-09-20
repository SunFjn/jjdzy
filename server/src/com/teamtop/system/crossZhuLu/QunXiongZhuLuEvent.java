package com.teamtop.system.crossZhuLu;

import java.util.HashMap;

import com.teamtop.system.crossCommonRank.CommonRankFunction;
import com.teamtop.system.crossZhuLu.model.QunXiongZhuLu;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.time.TimeDateUtil;

public class QunXiongZhuLuEvent extends AbsSystemEvent {

	public static QunXiongZhuLuEvent ins;

	public static QunXiongZhuLuEvent getIns() {
		if (ins == null) {
			ins = new QunXiongZhuLuEvent();
		}
		return ins;
	}

	private QunXiongZhuLuEvent() {

	}

	@Override
	public void init(Hero hero) {
		QunXiongZhuLu local = hero.getQunXiongZhuLu();
		if (local == null) {
			local = new QunXiongZhuLu();
			local.setHid(hero.getId());
			int nextMonDayZeroTime = TimeDateUtil.getNextMonDayZeroTime();// 设置下周一零点时间
			local.setWeekZeroTime(nextMonDayZeroTime);
			local.setTaskInfoMap(new HashMap<>());
			local.setBaoKuMap(new HashMap<>());
			hero.setQunXiongZhuLu(local);

			QunXiongZhuLuFunction.getIns().initTask(hero);
		}
	}

	@Override
	public void login(Hero hero) {
		boolean[] redPoint = QunXiongZhuLuFunction.getIns().checkRedPoint(hero);
		for (int i = 1; i < 5; i++) {
			boolean hadRed = redPoint[i];
			if (hadRed) {
				RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.QUN_XIONG_ZHU_LU, i,
						RedPointConst.HAS_RED);
			}
		}
	}

	@Override
	public void logout(Hero hero) {
		QunXiongZhuLu local = hero.getQunXiongZhuLu();
		if (local.getAttackCity() != 0) {
			// 离线算失败
			QunXiongZhuLuManager.getIns().battleResult(hero, 2, local.getAttackIndex());
		}
	}

	@Override
	public void loginReset(Hero hero, int now) {
		zeroHero(hero, now);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		QunXiongZhuLu local = hero.getQunXiongZhuLu();
		int weekZeroTime = local.getWeekZeroTime();
		int currentTime = TimeDateUtil.getCurrentTime();
		if (currentTime >= weekZeroTime) { // 判断是否周一重置
			// 重置宝库
			local.getBaoKuMap().clear();
			int nextMonDayZeroTime = TimeDateUtil.getNextMonDayZeroTime();// 设置下周一零点时间
			local.setWeekZeroTime(nextMonDayZeroTime);
		}
		// 重置每日任务
		QunXiongZhuLuFunction.getIns().resetTask(hero);

		hero.getQunXiongZhuLu().setBuyTiLiTimes(0);

		boolean[] redPoint = QunXiongZhuLuFunction.getIns().checkRedPoint(hero);
		for (int i = 1; i < 5; i++) {
			boolean hadRed = redPoint[i];
			if (hadRed) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.QUN_XIONG_ZHU_LU, i,
						RedPointConst.HAS_RED);
			}
		}
	}

	@Override
	public void fixTime(int cmdId, int now) {
		if (cmdId == 1) {
			//周一10点59分清子服排行
			CommonRankFunction.getIns().clearLocalCache(SystemIdConst.QUN_XIONG_ZHU_LU);
		}
	}
}
