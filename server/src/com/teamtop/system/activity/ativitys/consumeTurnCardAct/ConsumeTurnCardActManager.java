package com.teamtop.system.activity.ativitys.consumeTurnCardAct;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.AbstractActivityManager;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.consumeTurnCardAct.model.CardInfo;
import com.teamtop.system.activity.ativitys.consumeTurnCardAct.model.ConsumeTurnCardAct;
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

import excel.config.Config_xhdxffp_318;
import excel.config.Config_xhdxffpxfb_318;
import excel.struct.Struct_xhdxffp_318;
import excel.struct.Struct_xhdxffpxfb_318;

public class ConsumeTurnCardActManager extends AbstractActivityManager {
	private static ConsumeTurnCardActManager ins;

	private ConsumeTurnCardActManager() {
		// TODO Auto-generated constructor stub
	}

	public static ConsumeTurnCardActManager getIns() {
		if (ins == null) {
			ins = new ConsumeTurnCardActManager();
		}
		return ins;
	}

	@Override
	public void openUI(Hero hero) {
		// TODO Auto-generated method stub
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_CONSUME_TURNCARD)) {
			return;
		}
		ConsumeTurnCardAct consumeTurnCardAct = (ConsumeTurnCardAct) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.ACT_CONSUME_TURNCARD);
		int periods = consumeTurnCardAct.getPeriods();
		List<Struct_xhdxffpxfb_318> list = ConsumeTurnCardActCache.getConsumeturnConfigMap().get(periods);
		int size = list.size();
		List<Object[]> turnCardList = new ArrayList<>();
		Map<Integer, CardInfo> turnedAwardMap = consumeTurnCardAct.getTurnedAwardMap();
		for (int i = 0; i < size; i++) {
			CardInfo cardInfo = turnedAwardMap.get(i);
			Byte flag = 0;
			int toolIndex = 0;
			if (cardInfo != null) {
				toolIndex = cardInfo.getToolIndex();
				flag = 1;
			}
			turnCardList.add(new Object[] { toolIndex, i, flag });
		}
		int totalRecharge = consumeTurnCardAct.getTotalRecharge();
		int turnedTimes = consumeTurnCardAct.getTurnedTimes();
		ConsumeTurnCardActSender.sendCmd_8600(hero.getId(), totalRecharge, consumeTurnCardAct.getPeriods(), turnedTimes,
				turnCardList.toArray());
	}

	/**
	 * 抽奖
	 * 
	 * @param hero
	 */
	public void turn(Hero hero, int index) {
		// TODO Auto-generated method stub
		int nowId = 0;
		int turnedTimes = 0;
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_CONSUME_TURNCARD)) {
				return;
			}
			ConsumeTurnCardAct consumeTurnCardAct = (ConsumeTurnCardAct) ActivityFunction.getIns().getActivityData(hero,
					ActivitySysId.ACT_CONSUME_TURNCARD);
			Map<Integer, CardInfo> turnedAwardMap = consumeTurnCardAct.getTurnedAwardMap();
			if (turnedAwardMap.containsKey(index)) {
				return;
			}
			nowId = consumeTurnCardAct.getNowId();
			int times = 0;
			if (nowId != 0) {
				Struct_xhdxffpxfb_318 struct_xhdxffpxfb_318 = Config_xhdxffpxfb_318.getIns().get(nowId);
				times = struct_xhdxffpxfb_318.getTimes();
			}
			turnedTimes = consumeTurnCardAct.getTurnedTimes();
			if (turnedTimes >= times) {
				ConsumeTurnCardActSender.sendCmd_8602(hero.getId(), 2, 0, 0);
				return;
			}
			turnedTimes++;
			int qs = consumeTurnCardAct.getPeriods();
			Map<Integer, Set<Integer>> alreadyGetToolMap = consumeTurnCardAct.getAlreadyGetToolMap();
			Map<Integer, Integer> map = ConsumeTurnCardActCache.getTimesCardMap().get(qs);
			Integer proId = map.get(turnedTimes);
			Struct_xhdxffp_318 struct_xhdxffp_318 = Config_xhdxffp_318.getIns().get(proId);
			Set<Integer> limitSet = alreadyGetToolMap.get(proId);
			if (limitSet == null) {
				limitSet = new HashSet<>();
				alreadyGetToolMap.put(proId, limitSet);
			}
			int[][] rewards = struct_xhdxffp_318.getReward();
			ProbabilityEventModel probabilityEventModel = ProbabilityEventFactory.getProbabilityEvent();
			for (int[] tool : rewards) {
				if (limitSet.contains(tool[5])) {
					continue;
				}
				probabilityEventModel.addProbabilityEvent(tool[3], tool);
			}
			int[] tool = (int[]) ProbabilityEventUtil.getEventByProbability(probabilityEventModel);
			int[] rewardTool = new int[] { tool[0], tool[1], tool[2] };
			int[][] reward = new int[][] { rewardTool };
			// 设置抽奖次数
			consumeTurnCardAct.setTurnedTimes(turnedTimes);
			limitSet.add(tool[5]);
			CardInfo info = new CardInfo();
			info.setProId(proId);
			info.setToolIndex(tool[5]);
			turnedAwardMap.put(index, info);
			UseAddUtil.add(hero, reward, SourceGoodConst.ACT_CONSUME_TURNCARD_AWARD, UseAddUtil.getDefaultMail(),
					false); // 发放抽取的奖励
			ConsumeTurnCardActSender.sendCmd_8602(hero.getId(), 1, tool[5], index);
			if (tool[4] == 1) {
				// 广播
				ChatManager.getIns().broadCast(ChatConst.ACT_CONSUME_TURNCARD_BIG_AWARD,
						new Object[] { hero.getName(), tool[1], tool[2] }); // 全服广播
			}
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getNameZoneid(), "ConsumeTurnCardActManager turn" + " nowId:"
					+ nowId + " turnedTimes" + turnedTimes + " index" + index);
		}
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
		ConsumeTurnCardAct consumeTurnCardAct = new ConsumeTurnCardAct(hero.getId(), activityInfo.getIndex(),
				activityInfo.getActId(), activityInfo.getPeriods());
		consumeTurnCardAct.setTurnedAwardMap(new HashMap<>());
		return consumeTurnCardAct;
	}

	@Override
	public Class<?> getActivityData() {
		// TODO Auto-generated method stub
		return ConsumeTurnCardAct.class;
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		// TODO Auto-generated method stub

	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		// TODO Auto-generated method stub
		return ConsumeTurnCardActEvent.getIns();
	}

}
