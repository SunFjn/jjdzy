package com.teamtop.system.peacockFloor;

import java.util.HashMap;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;

import excel.config.Config_tower_219;
import excel.struct.Struct_tower_219;

public class PeacockFloorEvent extends AbsSystemEvent {
	
    public static PeacockFloorEvent ins;
	public static  PeacockFloorEvent getIns() {
		if(ins == null){
			ins = new PeacockFloorEvent();
		}
		return ins;
	}
	@Override
	public void init(Hero hero) {
		if (hero.getPeacockFloor()==null) {
			PeacockFloor peacockFloor=new PeacockFloor();
			peacockFloor.setHid(hero.getId());
			peacockFloor.setFloorNum(0);
			peacockFloor.setRewardState(new HashMap<Integer, Integer>());
			hero.setPeacockFloor(peacockFloor);
		}
		
	}

	@Override
	public void login(Hero hero) {
		if (!HeroFunction.getIns().checkSystemOpen(hero, 1702)) {
			return;
		}
		for (Struct_tower_219 struct_tower_219 :Config_tower_219.getIns().getSortList()) {
			if (struct_tower_219.getReward1()!=null) {
				if(hero.getPeacockFloor().getRewardState().containsKey(struct_tower_219.getId())) {
					if (hero.getPeacockFloor().getRewardState().get(struct_tower_219.getId())==GameConst.REWARD_1) {
						RedPointFunction.getIns().addLoginRedPoint(hero,1702, 0, RedPointConst.HAS_RED);
						return;
					}
				}
			}
		}
		
		
		
	}

}
