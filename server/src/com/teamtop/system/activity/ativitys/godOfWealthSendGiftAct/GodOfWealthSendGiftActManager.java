package com.teamtop.system.activity.ativitys.godOfWealthSendGiftAct;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import com.alibaba.fastjson.JSON;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.AbstractActivityManager;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.godOfWealthSendGiftAct.model.GodOfWealthSendGiftAct;
import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventUtil;
import com.teamtop.util.log.LogTool;

public class GodOfWealthSendGiftActManager extends AbstractActivityManager {
	private volatile static GodOfWealthSendGiftActManager ins;

	private GodOfWealthSendGiftActManager() {
		// TODO Auto-generated constructor stub
	}

	public static GodOfWealthSendGiftActManager getIns() {
		if (ins == null) {
			synchronized (GodOfWealthSendGiftActManager.class) {
				if (ins == null) {
					ins = new GodOfWealthSendGiftActManager();
				}
			}
		}
		return ins;
	}

	@Override
	public void openUI(Hero hero) {
		// TODO Auto-generated method stub
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.GOD_OF_WEALTH_SEND_GIFT_ACT)) {
			return;
		}
		GodOfWealthSendGiftAct model = (GodOfWealthSendGiftAct) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.GOD_OF_WEALTH_SEND_GIFT_ACT);
		int turnedTimes = model.getTurnedTimes();
		int totalRecharge = model.getTotalRecharge();
		int totalTurnTimes = GodOfWealthSendGiftActFunction.getIns().getTotalTurnTimes(totalRecharge);
		int restTurnTimes = totalTurnTimes - turnedTimes;
		int needRecharge = GodOfWealthSendGiftActFunction.getIns().getNeedRecharge(totalRecharge);
		GodOfWealthSendGiftActSender.sendCmd_10770(hero.getId(), restTurnTimes, needRecharge);
	}

	/**
	 * 抽奖
	 * 
	 * @param hero
	 */
	public void turn(Hero hero) {
		// TODO Auto-generated method stub
		GodOfWealthSendGiftAct model = null;
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.GOD_OF_WEALTH_SEND_GIFT_ACT)) {
				return;
			}
			model = (GodOfWealthSendGiftAct) ActivityFunction.getIns().getActivityData(hero,
					ActivitySysId.GOD_OF_WEALTH_SEND_GIFT_ACT);
			int turnedTimes = model.getTurnedTimes();
			int totalRecharge = model.getTotalRecharge();
			int totalTurnTimes = GodOfWealthSendGiftActFunction.getIns().getTotalTurnTimes(totalRecharge);
			if (turnedTimes >= totalTurnTimes) {
				GodOfWealthSendGiftActSender.sendCmd_10772(hero.getId(), 2, null);
				return;
			}
			turnedTimes++;
			model.setTurnedTimes(turnedTimes);
			Map<Integer, TreeMap<Integer, List<ProbabilityEventModel>>> awardProEventConfigMap = GodOfWealthSendGiftActCache
					.getAwardProEventConfigMap();
			TreeMap<Integer, List<ProbabilityEventModel>> awardProEventMap = awardProEventConfigMap
					.get(model.getPeriods());
			Integer lastTimes = awardProEventMap.lastKey();
			turnedTimes = turnedTimes % lastTimes;
			if (turnedTimes == 0) {
				turnedTimes = lastTimes;
			}
			List<ProbabilityEventModel> awardProList = awardProEventMap.get(turnedTimes);
			if (awardProList == null) {
				// 异常情况
				awardProList = awardProEventMap.firstEntry().getValue();
				LogTool.error(new Exception(), this, hero.getId(), hero.getNameZoneid(),
						"GodOfWealthSendGiftActManager turn awardProList == null" + " modelStr:" + model == null ? ""
								: JSON.toJSONString(model) + " awardProEventMapStr:" + awardProEventMap == null ? ""
										: JSON.toJSONString(awardProEventMap));
			}
			ArrayList<int[]> rewardList = new ArrayList<int[]>(awardProList.size());
			List<Object[]> rewardTipList = new ArrayList<>(awardProList.size());
			for (ProbabilityEventModel proModel : awardProList) {
				int[] award = (int[]) ProbabilityEventUtil.getEventByProbability(proModel);// 抽奖
				if (award != null) {
					rewardList.add(award);
					rewardTipList.add(new Object[] { award[0], award[1], award[2], award[4] });
				}
			}
			int[][] reward = rewardList.toArray(new int[0][]);
			UseAddUtil.add(hero, reward, SourceGoodConst.GOD_OF_WEALTH_SEND_GIFT_ACT_TURN_AWARD,
					UseAddUtil.getDefaultMail(), false); // 发放抽取的奖励
			GodOfWealthSendGiftActSender.sendCmd_10772(hero.getId(), 1, rewardTipList.toArray());
			for (int[] award : reward) {
				if (award[4] == 1) {
					// 广播
					ChatManager.getIns().broadCast(ChatConst.GOD_OF_WEALTH_SEND_GIFT_ACT_BIG_AWARD,
							new Object[] { hero.getName(), award[1], award[2] }); // 全服广播
				}
			}
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getNameZoneid(),
					"GodOfWealthSendGiftActManager turn" + " modelStr:" + model == null ? ""
							: JSON.toJSONString(model));
		}
	}

	@Override
	public void actOpen() {
		// TODO Auto-generated method stub

	}

	@Override
	public void heroActOpen(Hero hero) {
		// TODO Auto-generated method stub
		// 玩家未开启活动,但只要是在活动期间充值就要计算.注意外网当天更新前的充值也要记录
		int oneDayRecharge = hero.getOneDayRecharge();
		if (oneDayRecharge > 0) {
			GodOfWealthSendGiftActFunction.getIns().rechargeHandler(hero, oneDayRecharge, 0);
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
	public ActivityData getActivityData(Hero hero, ActivityInfo activityInfo) {
		// TODO Auto-generated method stub
		GodOfWealthSendGiftAct model = new GodOfWealthSendGiftAct(hero.getId(), activityInfo.getIndex(),
				activityInfo.getActId(), activityInfo.getPeriods());
		return model;
	}

	@Override
	public Class<?> getActivityData() {
		// TODO Auto-generated method stub
		return GodOfWealthSendGiftAct.class;
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		// TODO Auto-generated method stub
		GodOfWealthSendGiftActFunction.getIns().rechargeHandler(hero, money, product_id);
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		// TODO Auto-generated method stub
		return GodOfWealthSendGiftActEvent.getIns();
	}

}
