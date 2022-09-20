package com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationOneRechargeBack;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.AbstractActivityManager;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationOneRechargeBack.model.CelebrationOneRechargeBack;
import com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationOneRechargeBack.model.RewardInfo;
import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.util.log.LogTool;

import excel.config.Config_sgdbfl_261;
import excel.struct.Struct_sgdbfl_261;

public class CelebrationOneRechargeBackManager extends AbstractActivityManager {

	private static CelebrationOneRechargeBackManager ins;

	private CelebrationOneRechargeBackManager() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized CelebrationOneRechargeBackManager getIns() {
		if (ins == null) {
			ins = new CelebrationOneRechargeBackManager();
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
		CelebrationOneRechargeBack actData = (CelebrationOneRechargeBack) ActivityFunction.getIns()
				.getActivityData(hero, ActivitySysId.CELEBRATION_ONERECHARGE_BACK);
		if (actData == null) {
			return;
		}
		long hid = hero.getId();
		int mailId = MailConst.CELEBRATION_ONE_RECHARGE;
		int qs = actData.getPeriods();
		Map<Integer, Struct_sgdbfl_261> map = CelebrationOneRechargeBackSysCache.getQsMap().get(qs);
		Map<Integer, RewardInfo> rewardMap = actData.getRewardMap();
		Iterator<Entry<Integer, RewardInfo>> iterator = rewardMap.entrySet().iterator();
		Entry<Integer, RewardInfo> entry = null;
		int cz = 0;
		RewardInfo rewardInfo = null;
		Struct_sgdbfl_261 sgdbfl_261 = null;
		int[][] reward = null;
		int canGet = 0;
		for (; iterator.hasNext();) {
			entry = iterator.next();
			cz = entry.getKey();
			rewardInfo = entry.getValue();
			canGet = rewardInfo.getCanGet();
			if (canGet > 0) {
				sgdbfl_261 = map.get(cz);
				reward = sgdbfl_261.getReward();
				if (reward == null) {
					continue;
				}
				rewardInfo.setCanGet(0);
				for (int i = 0; i < canGet; i++) {
					MailFunction.getIns().sendMailWithFujianData2(hid, mailId, new Object[] { mailId }, reward);
				}
			}
		}
	}

	@Override
	public ActivityData getActivityData(Hero hero, ActivityInfo activityInfo) {
		CelebrationOneRechargeBack actData = new CelebrationOneRechargeBack(hero.getId(), activityInfo.getIndex(),
				activityInfo.getActId(), activityInfo.getPeriods());
		Map<Integer, RewardInfo> rewardMap = new HashMap<>();
		actData.setRewardMap(rewardMap);
		return actData;
	}

	@Override
	public Class<?> getActivityData() {
		// TODO Auto-generated method stub
		return CelebrationOneRechargeBack.class;
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		try {
//			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.CELEBRATION_ONERECHARGE_BACK)) {
//				return;
//			}
			CelebrationOneRechargeBack actData = (CelebrationOneRechargeBack) ActivityFunction.getIns()
					.getActivityData(hero, ActivitySysId.CELEBRATION_ONERECHARGE_BACK);
			if(actData==null) {
				return;
			}
			int qs = actData.getPeriods();
			Map<Integer, Struct_sgdbfl_261> map = CelebrationOneRechargeBackSysCache.getQsMap().get(qs);
			if (!map.containsKey(product_id)) {
				return;
			}
			Struct_sgdbfl_261 sgdbfl_261 = map.get(product_id);
			int time = sgdbfl_261.getTime();
			Map<Integer, RewardInfo> rewardMap = actData.getRewardMap();
			RewardInfo rewardInfo = rewardMap.get(product_id);
			if (rewardInfo == null) {
				rewardInfo = new RewardInfo();
				rewardMap.put(product_id, rewardInfo);
			}
			int alreadyGet = rewardInfo.getAlreadyGet();
			int canGet = rewardInfo.getCanGet();
			if ((canGet + alreadyGet) >= time) {
				return;
			}
			rewardInfo.setCanGet(canGet + 1);
			CelebrationOneRechargeBackFunction.getIns().updateRedPoint(hero);
		} catch (Exception e) {
			LogTool.error(e, CelebrationOneRechargeBackManager.class, hero.getId(), hero.getName(),
					"CelebrationOneRechargeBackManager rechargeHandle, money=" + money + ", product_id=" + product_id);
		}
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		return CelebrationOneRechargeBackSysEvent.getIns();
	}

	@Override
	public void openUI(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.CELEBRATION_ONERECHARGE_BACK)) {
				return;
			}
			CelebrationOneRechargeBack actData = (CelebrationOneRechargeBack) ActivityFunction.getIns()
					.getActivityData(hero, ActivitySysId.CELEBRATION_ONERECHARGE_BACK);
			int qs = actData.getPeriods();
			Map<Integer, RewardInfo> rewardMap = actData.getRewardMap();
			Map<Integer, Struct_sgdbfl_261> map = CelebrationOneRechargeBackSysCache.getQsMap().get(qs);
			Iterator<Integer> iterator = map.keySet().iterator();
			List<Object[]> sendList = new ArrayList<>();
			for (; iterator.hasNext();) {
				Integer cz = iterator.next();
				RewardInfo rewardInfo = rewardMap.get(cz);
				int canGet = 0;
				int alreadyGet = 0;
				if (rewardInfo != null) {
					canGet = rewardInfo.getCanGet();
					alreadyGet = rewardInfo.getAlreadyGet();
				}
				Struct_sgdbfl_261 sgdbfl_261 = map.get(cz);
				int time = sgdbfl_261.getTime();
				int leftTime = time - canGet - alreadyGet;
				sendList.add(new Object[] { sgdbfl_261.getId(), canGet, leftTime });
			}
			CelebrationOneRechargeBackSender.sendCmd_4910(hid, sendList.toArray());
		} catch (Exception e) {
			LogTool.error(e, CelebrationOneRechargeBackManager.class, hero.getId(), hero.getName(),
					"CelebrationOneRechargeBackManager openUI");
		}
	}

	/** 领取奖励 */
	public void getReward(Hero hero, int id) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.CELEBRATION_ONERECHARGE_BACK)) {
				return;
			}
			CelebrationOneRechargeBack actData = (CelebrationOneRechargeBack) ActivityFunction.getIns()
					.getActivityData(hero, ActivitySysId.CELEBRATION_ONERECHARGE_BACK);
			Struct_sgdbfl_261 struct_sgdbfl_261 = Config_sgdbfl_261.getIns().get(id);
			if(struct_sgdbfl_261==null) {
				return;
			}
			int cz = struct_sgdbfl_261.getCz();
			Map<Integer, RewardInfo> rewardMap = actData.getRewardMap();
			RewardInfo rewardInfo = rewardMap.get(cz);
			int canGet = rewardInfo.getCanGet();
			if (canGet < 1) {
				//没有可领取次数
				CelebrationOneRechargeBackSender.sendCmd_4912(hid, 0, 1, 0, 0);
				return;
			}
			rewardInfo.setCanGet(canGet - 1);
			int alreadyGet = rewardInfo.getAlreadyGet();
			rewardInfo.setAlreadyGet(alreadyGet + 1);
			int[][] reward = struct_sgdbfl_261.getReward();
			UseAddUtil.add(hero, reward, SourceGoodConst.CELEBRATION_ONERECARGE_BACK, UseAddUtil.getDefaultMail(), true);
			int time = struct_sgdbfl_261.getTime();
			int leftCanGet = rewardInfo.getCanGet();
			int leftTime = time - leftCanGet - rewardInfo.getAlreadyGet();
			CelebrationOneRechargeBackSender.sendCmd_4912(hid, 1, id, leftCanGet,
					leftTime);
			CelebrationOneRechargeBackFunction.getIns().updateRedPoint(hero);
		} catch (Exception e) {
			LogTool.error(e, CelebrationOneRechargeBackManager.class, hero.getId(), hero.getName(),
					"CelebrationOneRechargeBackManager getReward");
		}
	}

}
