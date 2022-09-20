package com.teamtop.system.hyperPointGeneralSys;

import java.util.ArrayList;
import java.util.List;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.ativitys.hyperPointGeneral.HyperPointGeneralConst;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hyperPointGeneralSys.model.AwardModel;
import com.teamtop.system.hyperPointGeneralSys.model.HyperPointGeneralSys;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_cjdj_010;

public class HyperPointGeneralSysManager {
	private static HyperPointGeneralSysManager ins = null;

	public static HyperPointGeneralSysManager getIns() {
		if (ins == null) {
			ins = new HyperPointGeneralSysManager();
		}
		return ins;
	}

	private HyperPointGeneralSysManager() {
	}

	public void openUI(Hero hero) {
		// TODO Auto-generated method stub
		if (hero == null) {
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, HyperPointGeneralSysConst.SYS_ID)) {
			return;
		}
		HyperPointGeneralSys hyperPointGeneralSys = hero.getHyperPointGeneralSys();
		int rechargeYBNum = hyperPointGeneralSys.getRechargeYBNum();
		int nextTimes = hyperPointGeneralSys.getNextTimes();
		int restTimes = hyperPointGeneralSys.getRestTimes();
		List<AwardModel> awardList = hyperPointGeneralSys.getAwardList();
		ArrayList<Object> arrayList = new ArrayList<Object>();
		for (AwardModel awardModel : awardList) {
			if (awardModel.getState() == HyperPointGeneralConst.GETTED) {
				int[] award = awardModel.getAwardItemList().get(0);
				arrayList.add(new Object[] { awardModel.getState(), award[0], award[1], award[2] });
			} else {
				arrayList.add(new Object[] { awardModel.getState(), 0, 0, 0 });
			}
		}
		int size = Config_cjdj_010.getIns().getSortList().size();
		if (nextTimes > size) {
			nextTimes = size;
		}
		HyperPointGeneralSysSender.sendCmd_4372(hero.getId(), rechargeYBNum, nextTimes, restTimes, arrayList.toArray());
	}

	public void getAward(Hero hero, int awardId) {
		// TODO Auto-generated method stub
		int[][] award=null;
		try {
		if (hero == null) {
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, HyperPointGeneralSysConst.SYS_ID)) {
			return;
		}
		HyperPointGeneralSys hyperPointGeneralSys = hero.getHyperPointGeneralSys();
		List<AwardModel> awardList = hyperPointGeneralSys.getAwardList();
		int size = awardList.size();
		if (awardId < 1 || awardId > size) {// 奖励不存在
			HyperPointGeneralSysSender.sendCmd_4374(hero.getId(), HyperPointGeneralConst.FAILURE_NOT_AWARD, 0, 0, 0, 0);
			return;
		}
		int restTimes = hyperPointGeneralSys.getRestTimes();
		if (restTimes <= 0) {// 无抽奖次数
			HyperPointGeneralSysSender.sendCmd_4374(hero.getId(), HyperPointGeneralConst.FAILURE_NOT_RESTTIMES, 0, 0, 0,
					0);
			return;
		}
		AwardModel awardModel = awardList.get(awardId - 1);
		if (awardModel.getState() == HyperPointGeneralConst.GETTED) {// 不能重复领取
			HyperPointGeneralSysSender.sendCmd_4374(hero.getId(), HyperPointGeneralConst.FAILURE_NOT_REP_GET, 0, 0, 0,
					0);
			return;
		}
		int nextTimes = hyperPointGeneralSys.getNextTimes();
		int localTimes = nextTimes - restTimes;
//		List<ProbabilityEventModel> pmList = HyperPointGeneralSysCache.getPmList();
//		ProbabilityEventModel pm = pmList.get(localTimes - 1);
//		int[][] award = (int[][]) ProbabilityEventUtil.getEventByProbability(pm);// 随机奖励
		award = Config_cjdj_010.getIns().getSortList().get(localTimes - 1).getReward();
		UseAddUtil.add(hero, award, SourceGoodConst.HYPERPOINTGENERAL_SYS_AWARD, UseAddUtil.getDefaultMail(), true); // 发放抽取的奖励
		hyperPointGeneralSys.setRestTimes(restTimes - 1);
		ArrayList<int[]> awardItemList = new ArrayList<int[]>();
		for (int[] awardItem : award) {
			awardItemList.add(awardItem);
		}
		awardModel.setAwardItemList(awardItemList);
		awardModel.setState(HyperPointGeneralConst.GETTED);// 修改奖励状态
		HyperPointGeneralSysSender.sendCmd_4374(hero.getId(), HyperPointGeneralConst.SUCCESS, awardId, award[0][0],
				award[0][1], award[0][2]);
		}catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(), "awardId:" + awardId+" award"+"["+award[0][0]+","+award[0][1]+","+award[0][2]+"]");
		}
	}

}
