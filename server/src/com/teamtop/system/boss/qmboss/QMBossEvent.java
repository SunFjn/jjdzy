package com.teamtop.system.boss.qmboss;

import java.util.HashMap;
import java.util.Map;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;

/**
 * 全民boss
 * @author Administrator
 *
 */
public class QMBossEvent extends AbsSystemEvent{
	private static QMBossEvent ins = null;

	public static QMBossEvent getIns() {
		if (ins == null) {
			ins = new QMBossEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		QMBossHero qmBossHero = hero.getQmBossHero();
		if(qmBossHero==null){
			qmBossHero=new QMBossHero();
			qmBossHero.setHid(hero.getId());
			qmBossHero.setRewardnum(QMBossConst.CHALLENGE_TIMES_EVERYDAY);
			qmBossHero.setIsKiller(new HashMap<>());
		    hero.setQmBossHero(qmBossHero);
		}
		if (qmBossHero.getIsKiller()==null) {
			qmBossHero.setIsKiller(new HashMap<>());
		}
	}

	@Override
	public void login(Hero hero) {
		heroOutQMBoss(hero);
		QMBossFunction.getIns().sendBossData(hero);
		Map<Integer, QMBoss> qmbossMap = QMBossCache.getQmbossMap();
		for (QMBoss  qmBoss:qmbossMap.values()) {
			if (qmBoss.getState()==1) {
				QMBossFunction.getIns().noticeBoss(hero, qmBoss.getBossId(), 1);
			}
		}
	}

	@Override
	public void loginReset(Hero hero, int now) {
	}

	@Override
	public void logout(Hero hero) {
		heroOutQMBoss(hero);
		QMBossFunction.getIns().sendBossData(hero);
	}
	public void heroOutQMBoss(Hero hero){
		QMBossHero qmBossHero = hero.getQmBossHero();
		int qmbossId = qmBossHero.getQmbossId();
		QMBoss qmboss = QMBossCache.getQmbossMap().get(qmbossId);
		if(qmboss!=null){
			qmboss.getInheroMap().remove(hero.getId());
		}
		qmBossHero.setQmbossId(0);
	}
	
	@Override
	public void passGuanqia(Hero hero, int passGuanqia) {
		QMBossFunction.getIns().sendBossData(hero);
	}
	@Override
	public void zeroHero(Hero hero, int now) {
		
	}
	@Override
	public void fixTime(int cmdId,int now) {
		
	}
}
