package com.teamtop.system.battleNew.event;

import java.util.Set;

import com.teamtop.system.battleNew.model.BattleNewInfo;
import com.teamtop.system.battleNew.model.PeronalBattleData;
import com.teamtop.system.crossFireBeacon.CrossFireBeaconManager;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;

public class CrossFireBeaconBattleNewEvent extends BattleNewEvent {

	private static CrossFireBeaconBattleNewEvent ins;

	public CrossFireBeaconBattleNewEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized CrossFireBeaconBattleNewEvent getIns() {
		if (ins == null) {
			ins = new CrossFireBeaconBattleNewEvent();
		}
		return ins;
	}

	@Override
	public void battleEnd(BattleNewInfo battleNewInfo) {
		long hid = battleNewInfo.getAttHid();
		Hero hero = HeroCache.getHero(hid);
		int winCamp = battleNewInfo.getWinCamp();
		Set<Long> set = battleNewInfo.getCampMap().get((byte) winCamp);
		Long winner = set.iterator().next();
		PeronalBattleData data = battleNewInfo.getPlayerDataMap().get(winner);
		long winHp = data.getHp();
		long hudun = data.getHudun();
		CrossFireBeaconManager.getIns().fightEnd(hero, battleNewInfo, winner, winHp, hudun);
	}

	@Override
	public boolean isNomalSendBack() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public int[][] battleCountWin(long battleUid) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int[][] battleCountLose(long battleUid) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void afterBattleEnd(BattleNewInfo battleNewInfo) {
		// TODO Auto-generated method stub
		
	}

}
