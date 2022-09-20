package com.teamtop.system.littleLeader;

import java.util.HashMap;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;

import excel.config.Config_sonstar_267;
import excel.struct.Struct_sonstar_267;

public class LittleLeaderEvent extends AbsSystemEvent{
	
	private static LittleLeaderEvent ins;
	
	private LittleLeaderEvent() {
		
	}
	
	public static synchronized LittleLeaderEvent getIns() {
		if (ins == null) {
			ins = new LittleLeaderEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		LittleLeader littleLeader = hero.getLittleLeader();
		if (littleLeader==null) {
			littleLeader=new LittleLeader();
			littleLeader.setHid(hero.getId());
			littleLeader.setWearType(0);
			littleLeader.setHasLittleLeaderModels(new HashMap<>());
			littleLeader.setStarRewardState(new HashMap<>());
			hero.setLittleLeader(littleLeader);
			
		}
		//少主升星可以领取的
		if (littleLeader.getStarRewardState()==null) {
			littleLeader.setStarRewardState(new HashMap<>());
		}
		for (Struct_sonstar_267 sonstar_267:Config_sonstar_267.getIns().getSortList()) {
			if(sonstar_267.getReward()!=null&&!littleLeader.getStarRewardState().containsKey(sonstar_267.getId())) {
				littleLeader.getStarRewardState().put(sonstar_267.getId(), GameConst.REWARD_0);
			}
			if (littleLeader.getStarRewardState().containsKey(sonstar_267.getId())) {
				if (sonstar_267.getReward() == null) {
					littleLeader.getStarRewardState().remove(sonstar_267.getId());
				}
			}
		}
		
		
	}

	@Override
	public void login(Hero hero) {
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.LITTLE_LEADER)) {
			return;
		}
		LittleLeaderFunction.getIns().readPoint(hero);
		LittleLeaderFunction.getIns().sixArtRedPoint(hero);
		LittleLeaderFunction.getIns().qiannengRedPoint(hero);
	}
	
	
	
	

}
