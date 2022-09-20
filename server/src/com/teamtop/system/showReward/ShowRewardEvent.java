package com.teamtop.system.showReward;

import java.util.HashMap;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;

import excel.config.Config_fenxiang_013;
import excel.struct.Struct_fenxiang_013;

public class ShowRewardEvent extends AbsSystemEvent{

	private static ShowRewardEvent ins;

	public static synchronized ShowRewardEvent getIns() {
		if (ins == null) {
			ins = new ShowRewardEvent();
		}
		return ins;
	}
	
	
	@Override
	public void init(Hero hero) {
		if (hero.getShowReward()==null) {
			ShowReward showReward =new ShowReward();
			showReward.setHid(hero.getId());
			showReward.setRewardMap(new HashMap<Integer, Integer>());
			hero.setShowReward(showReward);
			for(Struct_fenxiang_013 fenxiang_013:Config_fenxiang_013.getIns().getSortList()) {
				showReward.getRewardMap().put(fenxiang_013.getId(), GameConst.REWARD_0);
			}
		}
		
	}

	@Override
	public void login(Hero hero) {
		if (hero.getShowReward()==null) {
			return;
		}
		Object[] rewards=new Object[Config_fenxiang_013.getIns().size()];
		int i=0;
		for(Struct_fenxiang_013 fenxiang_013:Config_fenxiang_013.getIns().getSortList()) {
			if (!hero.getShowReward().getRewardMap().containsKey(fenxiang_013.getId())) {
				hero.getShowReward().getRewardMap().put(fenxiang_013.getId(), GameConst.REWARD_0);
			}
			rewards[i]=new Object[] {fenxiang_013.getId(),hero.getShowReward().getRewardMap().get(fenxiang_013.getId())};
		}
		ShowRewardSender.sendCmd_2700(hero.getId(), rewards);
		return;
	}

}
