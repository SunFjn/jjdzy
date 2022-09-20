package com.teamtop.system.activity.ativitys.dial;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.AbstractActivityManager;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.dial.model.Dial;
import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventFactory;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_czzpreward_281;
import excel.struct.Struct_czzpreward_281;

public class DialManager extends AbstractActivityManager {

	private static DialManager ins;

	private DialManager() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized DialManager getIns() {
		if (ins == null) {
			ins = new DialManager();
		}
		return ins;
	}

	@Override
	public void openUI(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			boolean checkHeroActOpen = ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_DIAL);
			if (!checkHeroActOpen) {
				return;
			}
			// Dial dial = (Dial) ActivityFunction.getIns().getActivityData(hero,
			// ActivitySysId.ACT_DIAL);
			Dial dial = (Dial) hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.ACT_DIAL);
			int totalRecharge = dial.getTotalRecharge();
			int periods = dial.getPeriods();
			int turnNum = dial.getTurnNum();
			int canTurn = 0;
			Set<Integer> rewardSet = dial.getRewardSet();
			List<Struct_czzpreward_281> sortList = Config_czzpreward_281.getIns().getSortList();
			int size = sortList.size();
			List<Object[]> rewardList = new ArrayList<>();
			for (int i = 0; i < size; i++) {
				int state = 0;
				Struct_czzpreward_281 czzpreward_281 = sortList.get(i);
				int cz = czzpreward_281.getCz();
				int id = czzpreward_281.getId();
				int qs = czzpreward_281.getQs();
				if (periods != qs) {
					continue;
				}
				if (rewardSet.contains(id)) {
					state = 1;
				}
				if (totalRecharge >= cz) {
						canTurn++;
				}
				rewardList.add(new Object[] { id, state });
			}
			DialSender.sendCmd_8492(hid, totalRecharge, turnNum, canTurn - turnNum, rewardList.toArray());
		} catch (Exception e) {
			LogTool.error(e, DialManager.class, hid, hero.getName(), "DialManager openUI");
		}
	}

	/**
	 * 转动转盘
	 */
	public void turnDial(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			boolean checkHeroActOpen = ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_DIAL);
			if (!checkHeroActOpen) {
				return;
			}
			Dial dial = (Dial) hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.ACT_DIAL);
			Set<Integer> rewardSet = dial.getRewardSet();
			int totalRecharge = dial.getTotalRecharge();
			int periods = dial.getPeriods();
			int turnNum = dial.getTurnNum();
			List<Struct_czzpreward_281> sortList = Config_czzpreward_281.getIns().getSortList();
			int size = sortList.size();
			if (turnNum >= 8) {
				// 已全部抽完
				DialSender.sendCmd_8494(hid, 0, 2);
				return;
			}
			int canTurn = 0;
			for (int i = 0; i < size; i++) {
				Struct_czzpreward_281 czzpreward_281 = sortList.get(i);
				int cz = czzpreward_281.getCz();
				int qs = czzpreward_281.getQs();
				if (periods != qs) {
					continue;
				}
				if (totalRecharge >= cz) {
					canTurn++;
				}
			}
			if (turnNum >= canTurn) {
				// 已无转盘抽奖次数
				DialSender.sendCmd_8494(hid, 0, 1);
				return;
			}
			int newTurnNum = turnNum + 1;
			List<int[]> randomList = DialSysCache.getRandomList(newTurnNum, periods);
			ProbabilityEventModel probabilityEvent = ProbabilityEventFactory.getProbabilityEvent();
			int randomSize = randomList.size();
			for (int i = 0; i < randomSize; i++) {
				int[] data = randomList.get(i);
				if (rewardSet.contains(data[0])) {
					continue;
				}
				probabilityEvent.addProbabilityEvent(data[1], data[0]);
			}
			int id = (Integer) ProbabilityEventUtil.getEventByProbability(probabilityEvent);
			rewardSet.add(id);
			dial.setTurnNum(newTurnNum);
			Struct_czzpreward_281 czzpreward_281 = Config_czzpreward_281.getIns().get(id);
			int[][] reward = czzpreward_281.getShow();
			UseAddUtil.add(hero, reward, SourceGoodConst.DIAL, UseAddUtil.getDefaultMail(), false);
			DialSender.sendCmd_8494(hid, 1, id);
			if (czzpreward_281.getBig() == 1) {
				// 大奖公告
				ChatManager.getIns().broadCast(ChatConst.DAIL,
						new Object[] { hero.getNameZoneid(), reward[0][1], reward[0][2] });
			}
			DialFunction.getIns().updateRedPoint(hero);
		} catch (Exception e) {
			LogTool.error(e, DialManager.class, hid, hero.getName(), "DialManager turnDial");
		}
	}



	@Override
	public AbsSystemEvent getSystemEvent() {
		// TODO Auto-generated method stub
		return DialSysEvent.getIns();
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		DialFunction.getIns().rechargeHandle(hero, money);
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
		// TODO Auto-generated method stub
		
	}

	@Override
	public ActivityData getActivityData(Hero hero, ActivityInfo activityInfo) {
		// TODO Auto-generated method stub
		Dial dial = new Dial(hero.getId(), activityInfo.getIndex(), activityInfo.getActId(), activityInfo.getPeriods());
		Set<Integer> rewardSet = new HashSet<>();
		dial.setRewardSet(rewardSet);
		int oneDayRecharge = hero.getOneDayRecharge();
		dial.setTotalRecharge(oneDayRecharge);// 兼容单日充值
		dial.setTurnNum(0);
		return dial;
	}

	@Override
	public Class<?> getActivityData() {
		// TODO Auto-generated method stub
		return Dial.class;
	}

}
