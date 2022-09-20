package com.teamtop.system.qice;

import java.util.HashMap;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.qice.model.QiCe;
import com.teamtop.system.qice.model.QiCeModel;

public class QiCeEvent extends AbsSystemEvent {

	private static QiCeEvent ins;

	public static QiCeEvent getIns() {
		if(ins == null) {
			ins = new QiCeEvent();
		}
		return ins;
	}
	
	@Override
	public void init(Hero hero) {
		if (hero.getQiCe() == null) {
			QiCe qiCe = new QiCe();
			qiCe.setHid(hero.getId());
			// 奇策激活
			HashMap<Integer, QiCeModel> qiCeMap = new HashMap<Integer, QiCeModel>();
			qiCe.setQiCeMap(qiCeMap);
			hero.setQiCe(qiCe);
		}

	}

	@Override
	public void login(Hero hero) {

	}

}
