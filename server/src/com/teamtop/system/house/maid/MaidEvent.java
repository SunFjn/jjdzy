package com.teamtop.system.house.maid;

import java.util.HashMap;
import java.util.Iterator;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.house.maid.model.Maid;
import com.teamtop.system.house.maid.model.MaidModel;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.system.setting.SettingFunction;

public class MaidEvent extends AbsSystemEvent {

	private static MaidEvent ins;

	public static MaidEvent getIns() {
		if(ins == null) {
			ins = new MaidEvent();
		}
		return ins;
	}
	
	@Override
	public void init(Hero hero) {
		if (hero.getMaid() == null) {
			Maid Maid = new Maid();
			Maid.setHid(hero.getId());
			HashMap<Integer, MaidModel> maidMap = new HashMap<Integer, MaidModel>();
			Maid.setMaidMap(maidMap);
			hero.setMaid(Maid);
		}

	}

	@Override
	public void login(Hero hero) {
		boolean checkRedPoint = MaidFunction.getIns().checkRedPoint(hero);
		if (checkRedPoint) {
			RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.MAID, RedPointConst.RED_1,
					RedPointConst.HAS_RED);
		}
		// 兼容之前激活的侍女
		// 激活侍女获得头像
		Maid maid = hero.getMaid();
		if (maid != null) {
			Iterator<Integer> iterator = maid.getMaidMap().keySet().iterator();
			while (iterator.hasNext()) {
				Integer maidId = iterator.next();
				SettingFunction.getIns().maidActivate(hero, maidId);
			}

		}
	}

}
