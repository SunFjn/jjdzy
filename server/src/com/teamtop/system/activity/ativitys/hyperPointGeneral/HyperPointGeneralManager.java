package com.teamtop.system.activity.ativitys.hyperPointGeneral;

import java.util.ArrayList;
import java.util.List;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.AbstractActivityManager;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.hyperPointGeneral.model.AwardModel;
import com.teamtop.system.activity.ativitys.hyperPointGeneral.model.HyperPointGeneral;
import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.log.LogTool;

import excel.struct.Struct_cjdj1_010;

public class HyperPointGeneralManager extends AbstractActivityManager {
	private static HyperPointGeneralManager ins = null;

	public static HyperPointGeneralManager getIns() {
		if (ins == null) {
			ins = new HyperPointGeneralManager();
		}
		return ins;
	}

	private HyperPointGeneralManager() {
	}

	@Override
	public void openUI(Hero hero) {
		// TODO Auto-generated method stub
		if (hero == null) {
			return;
		}
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.Act_HYPERPOINTGENERAL)) {
			return;
		}
		HyperPointGeneral hyperPointGeneral = (HyperPointGeneral) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.Act_HYPERPOINTGENERAL);
		int rechargeYBNum = hyperPointGeneral.getRechargeYBNum();
		int nextTimes = hyperPointGeneral.getNextTimes();
		int restTimes = hyperPointGeneral.getRestTimes();
		List<AwardModel> awardList = hyperPointGeneral.getAwardList();
		ArrayList<Object> arrayList = new ArrayList<Object>();
		for (AwardModel awardModel : awardList) {
			if (awardModel.getState() == HyperPointGeneralConst.GETTED) {
				int[] award = awardModel.getAwardItemList().get(0);
				arrayList.add(new Object[] { awardModel.getState(), award[0], award[1], award[2] });
			} else {
				arrayList.add(new Object[] { awardModel.getState(), 0, 0, 0 });
			}
		}
		int size = HyperPointGeneralCache.getConfigMap().get(hyperPointGeneral.getPeriods()).getConfigList().size();
		if (nextTimes > size) {
			nextTimes = size;
		}
		HyperPointGeneralSender.sendCmd_2610(hero.getId(), rechargeYBNum, nextTimes, restTimes, arrayList.toArray(),hyperPointGeneral.getPeriods());
	}

	public void getAward(Hero hero, int awardId) {
		int[][] award=null;
		try {
		if (hero == null) {
			return;
		}
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.Act_HYPERPOINTGENERAL)) {
			return;
		}
		HyperPointGeneral hyperPointGeneral = (HyperPointGeneral) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.Act_HYPERPOINTGENERAL);
		List<AwardModel> awardList = hyperPointGeneral.getAwardList();
		int size = awardList.size();
		if (awardId < 1 || awardId > size) {// 奖励不存在
			HyperPointGeneralSender.sendCmd_2612(hero.getId(), HyperPointGeneralConst.FAILURE_NOT_AWARD, 0, 0, 0, 0);
			return;
		}
		int restTimes = hyperPointGeneral.getRestTimes();
		if (restTimes <= 0) {// 无抽奖次数
			HyperPointGeneralSender.sendCmd_2612(hero.getId(), HyperPointGeneralConst.FAILURE_NOT_RESTTIMES, 0, 0, 0,
					0);
			return;
		}
		AwardModel awardModel = awardList.get(awardId - 1);
		if (awardModel.getState() == HyperPointGeneralConst.GETTED) {// 不能重复领取
			HyperPointGeneralSender.sendCmd_2612(hero.getId(), HyperPointGeneralConst.FAILURE_NOT_REP_GET, 0, 0, 0, 0);
			return;
		}
		int nextTimes = hyperPointGeneral.getNextTimes();
		int localTimes = nextTimes - restTimes;
//		List<ProbabilityEventModel> pmList = HyperPointGeneralCache.getConfigMap().get(hyperPointGeneral.getPeriods())
//				.getPmList();
//		ProbabilityEventModel pm = pmList.get(localTimes - 1);
//		int[][] award = (int[][]) ProbabilityEventUtil.getEventByProbability(pm);// 随机奖励
		List<Struct_cjdj1_010> configList = HyperPointGeneralCache.getConfigMap().get(hyperPointGeneral.getPeriods()).getConfigList();
		award = configList.get(localTimes - 1).getReward();
		UseAddUtil.add(hero, award, SourceGoodConst.HYPERPOINTGENERAL_ACT_AWARD, UseAddUtil.getDefaultMail(), true); // 发放抽取的奖励
		hyperPointGeneral.setRestTimes(restTimes - 1);
		ArrayList<int[]> awardItemList = new ArrayList<int[]>();
		for (int[] awardItem : award) {
			awardItemList.add(awardItem);
		}
		awardModel.setAwardItemList(awardItemList);
		awardModel.setState(HyperPointGeneralConst.GETTED);// 修改奖励状态
		HyperPointGeneralSender.sendCmd_2612(hero.getId(), HyperPointGeneralConst.SUCCESS, awardId, award[0][0],
				award[0][1], award[0][2]);
		}catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(), "awardId:" + awardId+" award"+"["+award[0][0]+","+award[0][1]+","+award[0][2]+"]");
		}
	}

	@Override
	public void actOpen() {
		// TODO Auto-generated method stub

	}

	@Override
	public void heroActOpen(Hero hero) {
		// TODO Auto-generated method stub
		if (ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.Act_HYPERPOINTGENERAL)) {
			HyperPointGeneralFunction.getIns().fastSendRedPoint(hero);
		}

	}

	@Override
	public void actEnd() {
		// TODO Auto-generated method stub

	}

	@Override
	public void heroActEnd(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public boolean checkActOpen(Hero hero) {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public ActivityData getActivityData(Hero hero, ActivityInfo activityInfo) {
		// TODO Auto-generated method stub
		HyperPointGeneral hyperPointGeneral = new HyperPointGeneral(hero.getId(), activityInfo.getIndex(),
				activityInfo.getActId(), activityInfo.getPeriods());
		List<AwardModel> awardList = new ArrayList<AwardModel>();
		int size = HyperPointGeneralCache.getConfigMap().get(activityInfo.getPeriods()).getConfigList().size();
		for (int i = 0; i < size; i++) {
			AwardModel awardModel = new AwardModel();
			awardModel.setState(HyperPointGeneralConst.NOT_GET);
			awardList.add(awardModel);
		}
		hyperPointGeneral.setAwardList(awardList);
		hyperPointGeneral.setNextTimes(1);
		return hyperPointGeneral;
	}

	@Override
	public Class<?> getActivityData() {
		// TODO Auto-generated method stub
		return HyperPointGeneral.class;
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		// TODO Auto-generated method stub
		HyperPointGeneralFunction.getIns().rechargeYB(hero, money);
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		// TODO Auto-generated method stub
		return HyperPointGeneralEvent.getIns();
	}

}
