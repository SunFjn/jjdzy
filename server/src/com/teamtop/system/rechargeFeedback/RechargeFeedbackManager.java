package com.teamtop.system.rechargeFeedback;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.rechargeFeedback.moel.RechargeFeedback;
import com.teamtop.util.log.LogTool;

import excel.config.Config_lchk_744;
import excel.struct.Struct_lchk_744;

public class RechargeFeedbackManager {
	private static RechargeFeedbackManager ins = null;

	public static RechargeFeedbackManager getIns() {
		if (ins == null) {
			ins = new RechargeFeedbackManager();
		}
		return ins;
	}

	private RechargeFeedbackManager() {
	}

	public void openUI(Hero hero) {
		// TODO Auto-generated method stub
		if (!HeroFunction.getIns().checkSystemOpen(hero, RechargeFeedbackConst.SYS)) {
			return;
		}
		RechargeFeedback rechargeFeedback = hero.getRechargeFeedback();
		Map<Integer, Integer> awardStateMap = rechargeFeedback.getAwardStateMap();
		List<Struct_lchk_744> sortList = Config_lchk_744.getIns().getSortList();
		int size = sortList.size();
		ArrayList<Object> awardList = new ArrayList<>();
		for (int i = 0; i < size; i++) {
			int id = sortList.get(i).getId();
			Integer state = awardStateMap.get(id);
			if (state == null) {
				awardList.add(new Object[] { id, RechargeFeedbackConst.NOT_REACH });
			} else {
				awardList.add(new Object[] { id, state });
			}
		}
		RechargeFeedbackSender.sendCmd_4392(hero.getId(), awardList.toArray(), rechargeFeedback.getConsumeYb());
	}

	public void getAward(Hero hero, int awardId) {
		// TODO Auto-generated method stub
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, RechargeFeedbackConst.SYS)) {
				return;
			}
			Struct_lchk_744 struct_lchk_744 = Config_lchk_744.getIns().get(awardId);
			if (struct_lchk_744 == null) {
				RechargeFeedbackSender.sendCmd_4394(hero.getId(), RechargeFeedbackConst.FAILURE_NOT_AWARD, awardId);
				return;
			}
			RechargeFeedback rechargeFeedback = hero.getRechargeFeedback();
			Map<Integer, Integer> awardStateMap = rechargeFeedback.getAwardStateMap();
			Integer state = awardStateMap.get(awardId);
			if (state == null) {
				RechargeFeedbackSender.sendCmd_4394(hero.getId(), RechargeFeedbackConst.FAILURE_NOT_REACH, awardId);
				return;
			}
			if (state == RechargeFeedbackConst.GETTED) {
				RechargeFeedbackSender.sendCmd_4394(hero.getId(), RechargeFeedbackConst.FAILURE_NOT_REP, awardId);
				return;
			}
			awardStateMap.put(awardId, RechargeFeedbackConst.GETTED);
			int[][] reward = struct_lchk_744.getReward();
			UseAddUtil.add(hero, reward, SourceGoodConst.RECHARGEFEEDBACK_REWARD, UseAddUtil.getDefaultMail(), true); // 发放奖励
			RechargeFeedbackSender.sendCmd_4394(hero.getId(), RechargeFeedbackConst.SUCCESS, awardId);
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(), "getAward awardId:" + awardId);
		}
	}

}
