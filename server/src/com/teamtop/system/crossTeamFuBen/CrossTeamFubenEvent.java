package com.teamtop.system.crossTeamFuBen;

import com.teamtop.houtaiHttp.events.crossActivitySwitch.CrossActivitySwitchCache;
import com.teamtop.system.crossTeamFuBen.cross.CrossTeamFuBenLocalToCross;
import com.teamtop.system.crossTeamFuBen.model.CrossTeamFuBen;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.rewardBack.RewardBackFunction;
import com.teamtop.util.log.LogTool;
public class CrossTeamFubenEvent extends AbsSystemEvent{
	private static CrossTeamFubenEvent ins = null;

	public static CrossTeamFubenEvent getIns() {
		if (ins == null) {
			ins = new CrossTeamFubenEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		CrossTeamFuBen crossTeamFuBen = hero.getCrossTeamFuBen();
		if(crossTeamFuBen==null){
			crossTeamFuBen = new CrossTeamFuBen();
			hero.setCrossTeamFuBen(crossTeamFuBen);
		}
		crossTeamFuBen.setHid(hero.getId());
	}

	@Override
	public void login(Hero hero) {
		if (!CrossActivitySwitchCache.checkCrossOpen(SystemIdConst.FUN_CROSS_TEAM_FU_BEN)) {
			return;
		}
		CrossTeamFubenManager.getIns().sendData(hero);
	}

	@Override
	public void loginReset(Hero hero, int now) {
		//奖励找回处理(重置前)
		RewardBackFunction.getIns().handle(hero,SystemIdConst.FUN_CROSS_TEAM_FU_BEN,0);
		CrossTeamFuBen crossTeamFuBen = hero.getCrossTeamFuBen();
		crossTeamFuBen.setTimesBattled(0);
		crossTeamFuBen.setAddTimes(0);
		//奖励找回处理(重置后)
		RewardBackFunction.getIns().handle(hero,SystemIdConst.FUN_CROSS_TEAM_FU_BEN,1);
		LogTool.info("CrossTeamFubenEvent.loginReset.hid:"+hero.getId(), this);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		loginReset(hero, now);
		CrossTeamFubenManager.getIns().sendData(hero);
		//刷新跨服
		CrossTeamFuBen crossTeamFuBen = hero.getCrossTeamFuBen();
		CrossTeamFuBenLocalToCross.getIns().reflashNumLC(hero.getId(), crossTeamFuBen.getTimesBattled(),
				crossTeamFuBen.getAddTimes());
	}

	
}
