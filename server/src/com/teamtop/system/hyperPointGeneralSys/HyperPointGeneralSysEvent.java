package com.teamtop.system.hyperPointGeneralSys;

import java.util.ArrayList;
import java.util.List;

import com.teamtop.system.activity.ativitys.hyperPointGeneral.HyperPointGeneralConst;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hyperPointGeneralSys.model.AwardModel;
import com.teamtop.system.hyperPointGeneralSys.model.HyperPointGeneralSys;

import excel.config.Config_cjdj_010;

public class HyperPointGeneralSysEvent extends AbsSystemEvent {
	private static HyperPointGeneralSysEvent ins = null;

	public static HyperPointGeneralSysEvent getIns() {
		if (ins == null) {
			ins = new HyperPointGeneralSysEvent();
		}
		return ins;
	}

	private HyperPointGeneralSysEvent() {
	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub
		HyperPointGeneralSys hyperPointGeneralSys = hero.getHyperPointGeneralSys();
		if (hyperPointGeneralSys == null) {
			hyperPointGeneralSys = new HyperPointGeneralSys();
			hyperPointGeneralSys.setHid(hero.getId());
			List<AwardModel> awardList = new ArrayList<AwardModel>();
			int size = Config_cjdj_010.getIns().getSortList().size();
			for (int i = 0; i < size; i++) {
				AwardModel awardModel = new AwardModel();
				awardModel.setState(HyperPointGeneralConst.NOT_GET);
				awardList.add(awardModel);
			}
			hyperPointGeneralSys.setAwardList(awardList);
			hyperPointGeneralSys.setNextTimes(1);
			hero.setHyperPointGeneralSys(hyperPointGeneralSys);
		}

	}

	@Override
	public void login(Hero hero) {
		// TODO Auto-generated method stub
		if (HeroFunction.getIns().checkSystemOpen(hero, HyperPointGeneralSysConst.SYS_ID)) {
			HyperPointGeneralSysFunction.getIns().loginSendRedPoint(hero);
		}
	}

	@Override
	public void passGuanqia(Hero hero, int passGuanqia) {
		// TODO Auto-generated method stub
		if (HeroFunction.getIns().checkSystemOpen(hero, HyperPointGeneralSysConst.SYS_ID)) {
			HyperPointGeneralSysFunction.getIns().fastSendRedPoint(hero);
		}
	}

}
