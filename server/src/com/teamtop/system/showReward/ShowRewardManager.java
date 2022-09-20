package com.teamtop.system.showReward;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.log.LogTool;

import excel.config.Config_fenxiang_013;
import excel.struct.Struct_fenxiang_013;

public class ShowRewardManager {
	private static ShowRewardManager ins;

	public static synchronized ShowRewardManager getIns() {
		if (ins == null) {
			ins = new ShowRewardManager();
		}
		return ins;
	}

	public void getreward(Hero hero, int index) {
		try {
			if (!hero.getShowReward().getRewardMap().containsKey(index)) {
				return;
			}
			if(hero.getShowReward().getRewardMap().get(index)==GameConst.REWARD_0) {
				Struct_fenxiang_013 struct_fenxiang_013 = Config_fenxiang_013.getIns().get(index);
				if (struct_fenxiang_013!=null) {
					if (UseAddUtil.canAdd(hero, struct_fenxiang_013.getReward(), false)) {
						hero.getShowReward().getRewardMap().put(index, GameConst.REWARD_2);
						UseAddUtil.add(hero, struct_fenxiang_013.getReward(), SourceGoodConst.SHOW_REWARD, null, true);
						ShowRewardSender.sendCmd_2702(hero.getId(),0, index);
						return;
					}
				}
			}
			ShowRewardSender.sendCmd_2702(hero.getId(),1, index);
			return;
		} catch (Exception e) {
			LogTool.error(e, ShowRewardManager.class, "getreward has wrong");
		}
		
	}
	
	
}
