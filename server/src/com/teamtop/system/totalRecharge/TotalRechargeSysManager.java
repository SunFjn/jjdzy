package com.teamtop.system.totalRecharge;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.totalRecharge.model.TotalRechargeSys;
import com.teamtop.util.log.LogTool;

import excel.config.Config_leichong_725;

public class TotalRechargeSysManager {
	public static TotalRechargeSysManager ins;

	public static TotalRechargeSysManager getIns() {
		if (ins == null) {
			ins = new TotalRechargeSysManager();
		}
		return ins;
	}

	public TotalRechargeSysManager() {
		// TODO Auto-generated constructor stub
	}

	public void openUI(Hero hero) {
		// TODO Auto-generated method stub
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, TotalRechargeSysConst.SYS_ID)) {
				return;
			}
			TotalRechargeSys totalRechargeSys = hero.getTotalRechargeSys();

			Map<Integer, Integer> rewardMap = totalRechargeSys.getRewardMap();
			List<Object[]> rewardData = new ArrayList<>();
			for (int index : rewardMap.keySet()) {
				rewardData.add(new Object[] { index, rewardMap.get(index) });
			}
			TotalRechargeSysSender.sendCmd_4352(hero.getId(), totalRechargeSys.getRewardNum(), rewardData.toArray());
		} catch (Exception e) {
			LogTool.error(e, TotalRechargeSysManager.class, hero.getId(), hero.getName(),
					"TotalRechargeSysManager openUI");
		}
	}

	public void getreward(Hero hero, int index) {
		// TODO Auto-generated method stub
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, TotalRechargeSysConst.SYS_ID)) {
				return;
			}
			TotalRechargeSys totalRechargeSys = hero.getTotalRechargeSys();
			if (!totalRechargeSys.getRewardMap().containsKey(index)) {
				return;
			}
			int state = totalRechargeSys.getRewardMap().get(index);
			if (state == GameConst.REWARD_1) {
				int[][] reward = Config_leichong_725.getIns().get(index).getReward();
				if (UseAddUtil.canAdd(hero, reward, false)) {
					totalRechargeSys.getRewardMap().put(index, GameConst.REWARD_2);
					UseAddUtil.add(hero, reward, SourceGoodConst.TOTALRECHARGESYS, null, true);
					TotalRechargeSysSender.sendCmd_4354(hero.getId(), index, GameConst.REWARD_2);
				}
			}
			return;
		} catch (Exception e) {
			LogTool.error(e, TotalRechargeSysManager.class, "TotalRechargeSysManager getreward has wrong");
		}
	}

}
