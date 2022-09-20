package com.teamtop.system.activitysView;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.commonData.CommonData;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.util.log.LogTool;

import excel.config.Config_xtcs_004;

public class ActivitysViewManager {
	private static ActivitysViewManager ins;

	public static ActivitysViewManager getIns() {
		// TODO Auto-generated method stub
		if (ins == null) {
			ins = new ActivitysViewManager();
		}
		return ins;
	}

	private ActivitysViewManager() {
		// TODO Auto-generated constructor stub
	}

	public void getAward(Hero hero) {
		// TODO Auto-generated method stub
		if (hero == null) {
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, ActivitysViewConst.SYSTEM_ID)) {
			return;
		}
		CommonData commonData = hero.getCommonData();
		int actViewAwardState = commonData.getActViewAwardState();
		if (actViewAwardState == ActivitysViewConst.GETTED) {
			ActivitysViewSender.sendCmd_4052(hero.getId(), ActivitysViewConst.FAILURE_GETTED);
			return;
		}
		int[][] reward = Config_xtcs_004.getIns().get(4301).getOther();
		UseAddUtil.add(hero, reward, SourceGoodConst.LINGLONGGE_SCOREBX_AWARD, null, true); // 发放奖励
		commonData.setActViewAwardState(ActivitysViewConst.GETTED);
		ActivitysViewSender.sendCmd_4052(hero.getId(), ActivitysViewConst.SUCCESS);
	}
	/**
	 * 
	 * @param hero
	 */
	public void getappreward(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.App_ActTuiSong)) {
				return;
			}
			CommonData commonData = hero.getCommonData();
			int appAwardState = commonData.getAppAwardState();
			if (appAwardState == ActivitysViewConst.GETTED) {
				ActivitysViewSender.sendCmd_4056(hero.getId(), ActivitysViewConst.FAILURE_GETTED);
				return;
			}
			int[][] reward = Config_xtcs_004.getIns().get(4302).getOther();
			UseAddUtil.add(hero, reward, SourceGoodConst.APP_TUISONG_AWARD, null, true); // 发放奖励
			commonData.setAppAwardState(ActivitysViewConst.GETTED);
			ActivitysViewSender.sendCmd_4056(hero.getId(), ActivitysViewConst.SUCCESS);
			
			
		} catch (Exception e) {
			LogTool.error(e, ActivitysViewManager.class, "getappreward has wrong");
		}
		
	}

}
