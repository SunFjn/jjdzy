package com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationTotalRechargeBack;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.AbstractActivityManager;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationTotalRechargeBack.model.CelebrationTotalRechargeBack;
import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.util.log.LogTool;

import excel.config.Config_sglcfl_261;
import excel.struct.Struct_sglcfl_261;

public class CelebrationTotalRechargeBackManager extends AbstractActivityManager {

	private static CelebrationTotalRechargeBackManager ins;

	private CelebrationTotalRechargeBackManager() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized CelebrationTotalRechargeBackManager getIns() {
		if (ins == null) {
			ins = new CelebrationTotalRechargeBackManager();
		}
		return ins;
	}

	@Override
	public void actOpen() {
		// TODO Auto-generated method stub

	}

	@Override
	public void heroActOpen(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public void actEnd() {
		// TODO Auto-generated method stub

	}

	@Override
	public void heroActEnd(Hero hero) {
		CelebrationTotalRechargeBack actData = (CelebrationTotalRechargeBack) ActivityFunction.getIns()
				.getActivityData(hero, ActivitySysId.CELEBRATION_TOTALRECHARGE_BACK);
		long hid = hero.getId();
		int mailId = MailConst.CELEBRATION_TOTAL_RECHARGE;
		int totalRecharge = actData.getTotalRecharge();
		Set<Integer> rewardSet = actData.getRewardSet();
		int qs = actData.getPeriods();
		Map<Integer, Struct_sglcfl_261> map = CelebrationTotalRechargeBackSysCache.getQsMap().get(qs);
		Iterator<Struct_sglcfl_261> iterator = map.values().iterator();
		Struct_sglcfl_261 sglcfl_261 = null;
		int[][] reward = null;
		for (; iterator.hasNext();) {
			sglcfl_261 = iterator.next();
			if (totalRecharge < sglcfl_261.getLj()) {
				continue;
			}
			if (rewardSet.contains(sglcfl_261.getId())) {
				continue;
			}
			rewardSet.add(sglcfl_261.getId());
			reward = sglcfl_261.getReward();
			if (reward != null) {
				MailFunction.getIns().sendMailWithFujianData2(hid, mailId, new Object[] { mailId }, reward);
			}
		}
	}

	@Override
	public ActivityData getActivityData(Hero hero, ActivityInfo activityInfo) {
		CelebrationTotalRechargeBack actData = new CelebrationTotalRechargeBack(hero.getId(), activityInfo.getIndex(),
				activityInfo.getActId(), activityInfo.getPeriods());
		Set<Integer> rewardSet = new HashSet<>();
		actData.setRewardSet(rewardSet);
		actData.setTotalRecharge(hero.getOneDayRecharge());
		return actData;
	}

	@Override
	public Class<?> getActivityData() {
		// TODO Auto-generated method stub
		return CelebrationTotalRechargeBack.class;
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.CELEBRATION_TOTALRECHARGE_BACK)) {
				return;
			}
			CelebrationTotalRechargeBack actData = (CelebrationTotalRechargeBack) ActivityFunction.getIns()
					.getActivityData(hero, ActivitySysId.CELEBRATION_TOTALRECHARGE_BACK);
			int totalRecharge = actData.getTotalRecharge();
			actData.setTotalRecharge(totalRecharge + money);
			CelebrationTotalRechargeBackFunction.getIns().updateRedPoint(hero);
		} catch (Exception e) {
			LogTool.error(e, CelebrationTotalRechargeBackManager.class, hero.getId(), hero.getName(),
					"CelebrationTotalRechargeBackManger rechargeHandle");
		}
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		// TODO Auto-generated method stub
		return CelebrationTotalRechargeBackSysEvent.getIns();
	}

	@Override
	public void openUI(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.CELEBRATION_TOTALRECHARGE_BACK)) {
				return;
			}
			CelebrationTotalRechargeBack actData = (CelebrationTotalRechargeBack) ActivityFunction.getIns()
					.getActivityData(hero, ActivitySysId.CELEBRATION_TOTALRECHARGE_BACK);
			int totalRecharge = actData.getTotalRecharge();
			Set<Integer> rewardSet = actData.getRewardSet();
			int qs = actData.getPeriods();
			Map<Integer, Struct_sglcfl_261> map = CelebrationTotalRechargeBackSysCache.getQsMap().get(qs);
			Iterator<Struct_sglcfl_261> iterator = map.values().iterator();
			List<Object[]> sendData = new ArrayList<>();
			for (; iterator.hasNext();) {
				Struct_sglcfl_261 sglcfl_261 = iterator.next();
				int id = sglcfl_261.getId();
				int lj = sglcfl_261.getLj();
				int state = 0;
				if(totalRecharge>=lj) {
					state = 1;
				}
				if (rewardSet.contains(id)) {
					state = 2;
				}
				sendData.add(new Object[] {id, state});
			}
			CelebrationTotalRechargeBackSender.sendCmd_4930(hid, totalRecharge, sendData.toArray());
		} catch (Exception e) {
			LogTool.error(e, CelebrationTotalRechargeBackManager.class, hid, hero.getName(),
					"CelebrationTotalRechargeBackManger openUI");
		}

	}

	/**
	 * 领取奖励
	 * 
	 * @param hero
	 * @param id
	 */
	public void getReward(Hero hero, int id) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.CELEBRATION_TOTALRECHARGE_BACK)) {
				return;
			}
			CelebrationTotalRechargeBack actData = (CelebrationTotalRechargeBack) ActivityFunction.getIns()
					.getActivityData(hero, ActivitySysId.CELEBRATION_TOTALRECHARGE_BACK);
			int totalRecharge = actData.getTotalRecharge();
			Set<Integer> rewardSet = actData.getRewardSet();
			Struct_sglcfl_261 sglcfl_261 = Config_sglcfl_261.getIns().get(id);
			if (sglcfl_261 == null) {
				return;
			}
			if (totalRecharge < sglcfl_261.getLj()) {
				// 充值不达标
				CelebrationTotalRechargeBackSender.sendCmd_4932(hid, 0, 1);
				return;
			}
			if (rewardSet.contains(id)) {
				// 已领取
				CelebrationTotalRechargeBackSender.sendCmd_4932(hid, 0, 2);
				return;
			}
			rewardSet.add(id);
			int[][] reward = sglcfl_261.getReward();
			UseAddUtil.add(hero, reward, SourceGoodConst.CELEBRATION_TOTALRECHARGE_BACK, UseAddUtil.getDefaultMail(),
					true);
			CelebrationTotalRechargeBackSender.sendCmd_4932(hid, 1, id);
			CelebrationTotalRechargeBackFunction.getIns().updateRedPoint(hero);
		} catch (Exception e) {
			LogTool.error(e, CelebrationTotalRechargeBackManager.class, hid, hero.getName(),
					"CelebrationTotalRechargeBackManger getReward, id=" + id);
		}
	}

}
