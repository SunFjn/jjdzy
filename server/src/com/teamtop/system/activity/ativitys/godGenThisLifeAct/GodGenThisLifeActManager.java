package com.teamtop.system.activity.ativitys.godGenThisLifeAct;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.AbstractActivityManager;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.achievementTree.AchievementTreeEnum;
import com.teamtop.system.activity.ativitys.achievementTree.AchievementTreeFunction;
import com.teamtop.system.activity.ativitys.godGenThisLifeAct.model.GodGenThisLifeAct;
import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.crossCommonRank.CommonRankFunction;
import com.teamtop.system.crossCommonRank.CommonRankSysCache;
import com.teamtop.system.crossCommonRank.cross.CrossCommonRankLC;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_godmb_288;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_godmb_288;

public class GodGenThisLifeActManager extends AbstractActivityManager {
	private static volatile GodGenThisLifeActManager ins = null;

	public static GodGenThisLifeActManager getIns() {
		if (ins == null) {
			synchronized (GodGenThisLifeActManager.class) {
				if (ins == null) {
					ins = new GodGenThisLifeActManager();
				}
			}
		}
		return ins;
	}

	private GodGenThisLifeActManager() {
	}

	@Override
	public void openUI(Hero hero) {
		// TODO Auto-generated method stub
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.GODGENTHISLIFE)) {
			return;
		}
		GodGenThisLifeAct model = (GodGenThisLifeAct) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.GODGENTHISLIFE);
		int times = model.getParameter();
		int endTime = CommonRankSysCache.getIndexConfigMap().get(model.getIndexId())[0];
		GodGenThisLifeActSender.sendCmd_9550(hero.getId(), endTime, times);
	}

	public void turn(Hero hero, int type) {
		// TODO Auto-generated method stub
		if (type != 1 && type != 2) {
			return;
		}
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.GODGENTHISLIFE)) {
			return;
		}
		GodGenThisLifeAct model = (GodGenThisLifeAct) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.GODGENTHISLIFE);
		int turnTimes = 1;
		int[][] consume = null;
		if (type == 1) {
			consume = Config_xtcs_004.getIns().get(GodGenThisLifeActConst.ONE_TURN_CONSUME).getOther();

		} else {
			turnTimes = 10;
			consume = Config_xtcs_004.getIns().get(GodGenThisLifeActConst.TEN_TURN_CONSUME).getOther();
		}

		if (!UseAddUtil.canUse(hero, consume)) { // 元宝不足
			GodGenThisLifeActSender.sendCmd_9552(hero.getId(), 2, null, 0);
			return;
		}
		UseAddUtil.use(hero, consume, SourceGoodConst.GODGENTHISLIFE_TURN_CONSUME, true);

		// 成就树
		AchievementTreeFunction.getIns().checkTask(hero, AchievementTreeEnum.TASK_18, turnTimes, 0);

		List<Integer[]> bigAwardListTips = new ArrayList<Integer[]>();// 抽取的要广播的奖品列表
		List<Object[]> awardListTips = new ArrayList<Object[]>();
		List<int[]> awardList = new ArrayList<int[]>();
		List<ProbabilityEventModel> genProList = GodGenThisLifeActSysCache.getGenAwardProMap().get(model.getPeriods());
		int times = model.getParameter();
		for (int i = 0; i < turnTimes; i++) {
			times++;
			if (times % 10 == 0) {
				List<ProbabilityEventModel> bigProList = GodGenThisLifeActSysCache.getBigAwardProMap()
						.get(model.getPeriods());
				for (ProbabilityEventModel pe : bigProList) {
					int[] bigAward = (int[]) ProbabilityEventUtil.getEventByProbability(pe);
					if (bigAward != null) {
						awardListTips.add(new Object[] { bigAward[0], bigAward[1], bigAward[2], bigAward[4] });
						awardList.add(bigAward);
						if (bigAward[4] == 1) {
							bigAwardListTips.add(new Integer[] { bigAward[1], bigAward[2] });
						}
					}
				}
			} else {
				for (ProbabilityEventModel pe : genProList) {
					int[] genAward = (int[]) ProbabilityEventUtil.getEventByProbability(pe);
					if (genAward != null) {
						awardListTips.add(new Object[] { genAward[0], genAward[1], genAward[2], genAward[4] });
						awardList.add(genAward);
					}
				}
			}
		}
		int[][] drops = new int[awardList.size()][];
		awardList.toArray(drops);
		CrossCommonRankLC.getIns().addUpdateActivityRankModelToCen(hero, ActivitySysId.GODGENTHISLIFE, turnTimes, 0);
		if (!UseAddUtil.canAdd(hero, drops, false)) {
			// 背包满了
			GodGenThisLifeActSender.sendCmd_9552(hero.getId(), 3, null, 0);
			return;
		}
		UseAddUtil.add(hero, drops, SourceGoodConst.GODGENTHISLIFE_TURN_AWARD, UseAddUtil.getDefaultMail(), false);
		int newTimes = model.getParameter();
		GodGenThisLifeActSender.sendCmd_9552(hero.getId(), 1, awardListTips.toArray(), newTimes);
		// 广播
		for (Integer[] bigAwardTips : bigAwardListTips) {
			ChatManager.getIns().broadCast(ChatConst.GODGENTHISLIFE_BIG_AWARD,
					new Object[] { hero.getNameZoneid(), bigAwardTips[0], bigAwardTips[1] });
		}
	}

	public void openRankUI(Hero hero) {
		// TODO Auto-generated method stub
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.GODGENTHISLIFE)) {
			return;
		}
		GodGenThisLifeAct model = (GodGenThisLifeAct) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.GODGENTHISLIFE);
		int myTimes = model.getParameter();
		int myRank = 0;
		Object[] openUIObjArray = CommonRankSysCache.getOpenUIObjArray(ActivitySysId.GODGENTHISLIFE);
		if (openUIObjArray != null) {
			for (Object obj : openUIObjArray) {
				Object[] objArray = (Object[]) obj;
				String name = (String) objArray[1];
				if (hero.getNameZoneid().equals(name)) {
					myRank = (Integer) objArray[0];
					if (myTimes > 0) {
						objArray[2] = myTimes;
					}
				}
			}
		}
		GodGenThisLifeActSender.sendCmd_9554(hero.getId(), openUIObjArray, myRank, myTimes);
	}

	public void openTargetAwardUI(Hero hero) {
		// TODO Auto-generated method stub
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.GODGENTHISLIFE)) {
			return;
		}
		GodGenThisLifeAct model = (GodGenThisLifeAct) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.GODGENTHISLIFE);
		int periods = model.getPeriods();
		Map<Integer, Integer> awardStateMap = model.getAwardStateMap();
		List<Struct_godmb_288> list = GodGenThisLifeActSysCache.getTargetConfigMap().get(periods);
		ArrayList<Object> awardList = new ArrayList<>();
		int size = list.size();
		for (int i = 0; i < size; i++) {
			Struct_godmb_288 struct_godmb_288 = list.get(i);
			int id = struct_godmb_288.getId();
			Integer state = awardStateMap.get(id);
			if (state == null) {
				awardList.add(new Object[] { id, GodGenThisLifeActConst.NOT_REACH });
			} else {
				awardList.add(new Object[] { id, state });
			}
		}
		GodGenThisLifeActSender.sendCmd_9556(hero.getId(), awardList.toArray());
	}

	public void getTargetAward(Hero hero, int awardId) {
		// TODO Auto-generated method stub
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.GODGENTHISLIFE)) {
				return;
			}
			GodGenThisLifeAct model = (GodGenThisLifeAct) ActivityFunction.getIns().getActivityData(hero,
					ActivitySysId.GODGENTHISLIFE);
			int periods = model.getPeriods();
			Struct_godmb_288 struct_godmb_288 = Config_godmb_288.getIns().get(awardId);
			if (struct_godmb_288 == null) {
				GodGenThisLifeActSender.sendCmd_9558(hero.getId(), GodGenThisLifeActConst.FAILURE_NOT_AWARD, awardId);
				return;
			}
			int qs = struct_godmb_288.getQs();
			if (qs != periods) {
				GodGenThisLifeActSender.sendCmd_9558(hero.getId(), GodGenThisLifeActConst.FAILURE_NOT_AWARD, awardId);
				return;
			}
			Map<Integer, Integer> awardStateMap = model.getAwardStateMap();
			Integer state = awardStateMap.get(awardId);
			if (state == null) {
				GodGenThisLifeActSender.sendCmd_9558(hero.getId(), GodGenThisLifeActConst.FAILURE_NOT_REACH, awardId);
				return;
			}
			if (state == GodGenThisLifeActConst.GETTED) {
				GodGenThisLifeActSender.sendCmd_9558(hero.getId(), GodGenThisLifeActConst.FAILURE_NOT_REP, awardId);
				return;
			}
			awardStateMap.put(awardId, GodGenThisLifeActConst.GETTED);
			int[][] reward = struct_godmb_288.getReward();
			UseAddUtil.add(hero, reward, SourceGoodConst.GODGENTHISLIFE_TARGET_REWARD, UseAddUtil.getDefaultMail(),
					true); // 发放奖励
			GodGenThisLifeActSender.sendCmd_9558(hero.getId(), GodGenThisLifeActConst.SUCCESS, awardId);
		} catch (Exception e) {
			// TODO: ha ndle exception
			LogTool.error(e, this, hero.getId(), hero.getName(),
					"GodGenThisLifeManager getTargetAward awardId:" + awardId);
		}
	}

	@Override
	public void actOpen() {
		// TODO Auto-generated method stub
		CommonRankFunction.getIns().clearLocalCache(ActivitySysId.GODGENTHISLIFE);
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
		// 补发邮件奖励
		Integer awardId = 0;
		try {
			GodGenThisLifeAct model = (GodGenThisLifeAct) ActivityFunction.getIns().getActivityData(hero,
					ActivitySysId.GODGENTHISLIFE);
			Map<Integer, Integer> awardStateMap = model.getAwardStateMap();
			for (Entry<Integer, Integer> entry : awardStateMap.entrySet()) {
				Integer state = entry.getValue();
				if (state == GodGenThisLifeActConst.CAN_GET) {
					awardId = entry.getKey();
					Struct_godmb_288 struct_godmb_288 = Config_godmb_288.getIns().get(awardId);
					int[][] reward = struct_godmb_288.getReward();
					MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.GODGENTHISLIFE_TARGET_REWARD,
							new Object[] { MailConst.GODGENTHISLIFE_TARGET_REWARD }, reward);
					entry.setValue(GodGenThisLifeActConst.GETTED);
				}
			}

		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(), "GodGenThisLifeManager heroActEnd awardId:" + awardId);
		}
	}

	@Override
	public ActivityData getActivityData(Hero hero, ActivityInfo activityInfo) {
		// TODO Auto-generated method stub
		GodGenThisLifeAct model = new GodGenThisLifeAct(hero.getId(), activityInfo.getIndex(), activityInfo.getActId(),
				activityInfo.getPeriods());
		model.setAwardStateMap(new HashMap<>());
		return model;
	}

	@Override
	public Class<?> getActivityData() {
		// TODO Auto-generated method stub
		return GodGenThisLifeAct.class;
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		// TODO Auto-generated method stub
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		// TODO Auto-generated method stub
		return GodGenThisLifeActEvent.getIns();
	}

}
