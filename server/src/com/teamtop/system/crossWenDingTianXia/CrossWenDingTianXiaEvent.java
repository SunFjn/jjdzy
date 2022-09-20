package com.teamtop.system.crossWenDingTianXia;

import com.teamtop.system.crossWenDingTianXia.model.CrossWenDingTianXia;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
public class CrossWenDingTianXiaEvent extends AbsSystemEvent{
	private static CrossWenDingTianXiaEvent ins = null;

	public static CrossWenDingTianXiaEvent getIns() {
		if (ins == null) {
			ins = new CrossWenDingTianXiaEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		CrossWenDingTianXia wdtxData = hero.getCrossWenDingTianXia();
		if(wdtxData==null) {
			wdtxData = new CrossWenDingTianXia();
			hero.setCrossWenDingTianXia(wdtxData);
		}
		wdtxData.setHid(hero.getId());
	}

	@Override
	public void login(Hero hero) {
		CrossWenDingTianXiaFunction.getIns().checkRed(hero);
	}

	@Override
	public void loginReset(Hero hero, int now) {
//		CrossTeamFuBen crossTeamFuBen = hero.getCrossTeamFuBen();
//		crossTeamFuBen.setTimesBattled(0);
//		LogTool.info("CrossTeamFubenEvent.loginReset.hid:"+hero.getId(), this);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
//		loginReset(hero, now);
//		CrossWenDingTianXiaManager.getIns().sendData(hero);
//		//刷新跨服
//		CrossTeamFuBen crossTeamFuBen = hero.getCrossTeamFuBen();
//		CrossTeamFuBenLocalToCross.getIns().reflashNumLC(hero.getId(), crossTeamFuBen.getTimesBattled());
	}

	
}
