package com.teamtop.system.sixWay;

import java.util.HashMap;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.log.LogTool;

public class SixWayEvent extends AbsSystemEvent{
	
	private static SixWayEvent ins = null;

	public static SixWayEvent getIns() {
		if (ins == null) {
			ins = new SixWayEvent();
		}
		return ins;
	}

	private SixWayEvent() {
		
	}
	
	

	@Override
	public void init(Hero hero) {
		try {
			SixWay sixWay = hero.getSixWay();
			if (sixWay==null) {
				sixWay=new SixWay();
				sixWay.setHid(hero.getId());
				ConcurrentHashMap<Integer, SixWayEquip> bagData = new ConcurrentHashMap<Integer, SixWayEquip>();
				sixWay.setBagData(bagData);
				ConcurrentHashMap<Integer, SixWayEquip> bodyData = new ConcurrentHashMap<Integer, SixWayEquip>();
				sixWay.setBodyData(bodyData);
				HashMap<Integer, Integer> zuhenum=new HashMap<>();
				for (int i = 1; i <=6; i++) {
					zuhenum.put(i, 0);
				}
				sixWay.setZuhenum(zuhenum);
				hero.setSixWay(sixWay);
				SixWayFunction.getIns().jieSuo(hero);
			}	
		} catch (Exception e) {
			LogTool.error(e, SixWayEvent.class, "SixWayEvent has wrong");
		}
		
	}

	@Override
	public void login(Hero hero) {
		SixWayFunction.getIns().readPoint(hero,false);
	}

}
