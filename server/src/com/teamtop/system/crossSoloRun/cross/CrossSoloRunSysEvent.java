package com.teamtop.system.crossSoloRun.cross;

import com.teamtop.cross.CrossZone;
import com.teamtop.system.crossDynastyWarriors.DynastyWarriorsFunction;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;

public class CrossSoloRunSysEvent extends AbsSystemEvent {

	private static CrossSoloRunSysEvent crossSoloRunSysEvent;

	private CrossSoloRunSysEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized CrossSoloRunSysEvent getIns() {
		if (crossSoloRunSysEvent == null) {
			crossSoloRunSysEvent = new CrossSoloRunSysEvent();
		}
		return crossSoloRunSysEvent;
	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public void login(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public void fixTime(int cmdId, int now) {
		if (CrossZone.isCrossServer()) {
			if (cmdId == 1) {
				// 跨服 周日0点处理
				// 三国无双对战成员初始化
				DynastyWarriorsFunction.getIns().initDynastyWarriors();
			} else if (cmdId == 2) {
				CrossSoloRunSysCache.getModelMap().clear();
				CrossSoloRunSysCache.getpMatchMap().clear();
				CrossSoloRunSysCache.getHeroGradeMap().clear();
				CrossSoloRunSysCache.getpCrossRankSet().clear();
			}
		}
	}

}
