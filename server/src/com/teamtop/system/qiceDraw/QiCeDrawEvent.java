package com.teamtop.system.qiceDraw;

import java.util.HashMap;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.qiceDraw.model.QiCeDraw;

public class QiCeDrawEvent extends AbsSystemEvent {

	private static QiCeDrawEvent QiCeDrawEvent;

	private QiCeDrawEvent() {
	}

	public static synchronized QiCeDrawEvent getIns() {
		if (QiCeDrawEvent == null) {
			QiCeDrawEvent = new QiCeDrawEvent();
		}
		return QiCeDrawEvent;
	}

	@Override
	public void init(Hero hero) {
		QiCeDraw qiCeDraw = hero.getQiCeDraw();
		if (qiCeDraw == null) {
			qiCeDraw = new QiCeDraw();
			qiCeDraw.setHid(hero.getId());
			qiCeDraw.setAwards(new HashMap<Integer, Integer>());
			hero.setQiCeDraw(qiCeDraw);
		}
	}

	@Override
	public void login(Hero hero) {
		QiCeDrawFunction.getIns().loginRed(hero);
	}

}
