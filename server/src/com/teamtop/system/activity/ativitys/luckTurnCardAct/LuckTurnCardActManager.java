package com.teamtop.system.activity.ativitys.luckTurnCardAct;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;

import com.alibaba.fastjson.JSON;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.AbstractActivityManager;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.luckTurnCardAct.model.LuckTurnCardAct;
import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventUtil;
import com.teamtop.util.ProbabilityEvent.RandomUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_slfplsb_330;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_slfplsb_330;

public class LuckTurnCardActManager extends AbstractActivityManager {
	private static volatile LuckTurnCardActManager ins = null;

	public static LuckTurnCardActManager getIns() {
		if (ins == null) {
			synchronized (LuckTurnCardActManager.class) {
				if (ins == null) {
					ins = new LuckTurnCardActManager();
				}
			}
		}
		return ins;
	}

	private LuckTurnCardActManager() {
	}

	@Override
	public void openUI(Hero hero) {
		// TODO Auto-generated method stub
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.LUCKTURNCARD_NEWACT)) {
			return;
		}
		LuckTurnCardAct model = (LuckTurnCardAct) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.LUCKTURNCARD_NEWACT);
		Map<Byte, Byte> turnCardMap = model.getTurnCardMap();
		int size = turnCardMap.size();
		Byte cardNum = LuckTurnCardActConst.CARD_NUM;
		if (turnCardMap.containsValue((byte) 1) || size >= cardNum) {
			turnCardMap.clear();
			return;
		}
		ArrayList<Object[]> turnCardList = new ArrayList<>(cardNum);
		for (Byte i = 0; i < cardNum; i++) {
			byte byteValue = i.byteValue();
			Byte state = Optional.ofNullable(turnCardMap).map(map -> map.get(byteValue)).orElse((byte) -1);
			turnCardList.add(new Object[] { i, state });
		}
		int turnCardTimes = model.getTurnCardTimes();
		int victoryTimes = model.getVictoryTimes();
		LuckTurnCardActSender.sendCmd_10340(hero.getId(), turnCardList.toArray(), turnCardTimes, victoryTimes);
	}

	public void turn(Hero hero, int type) {
		// TODO Auto-generated method stub
		LuckTurnCardAct model = null;
		int oriType = type;
		try {
			byte index = (byte) (type % 10);
			type = type / 10;
			if (!(type == 1 && index <= LuckTurnCardActConst.CARD_NUM - 1) && type != 2 && type != 3) {
				return;
			}
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.LUCKTURNCARD_NEWACT)) {
				return;
			}
			model = (LuckTurnCardAct) ActivityFunction.getIns().getActivityData(hero,
					ActivitySysId.LUCKTURNCARD_NEWACT);
			Map<Byte, Byte> turnCardMap = model.getTurnCardMap();
			int size = turnCardMap.size();
			if (turnCardMap.containsValue((byte) 1) || size >= LuckTurnCardActConst.CARD_NUM) {
				turnCardMap.clear();
				return;
			}
			if (type == 1 && turnCardMap.containsKey(index)) {
				return;
			}
			int turnCardTimes = model.getTurnCardTimes();
			int turnCardMaxTimes = Config_xtcs_004.getIns().get(LuckTurnCardActConst.EVERT_DAY_TURN_MAXTIMES).getNum();
			byte addTurnCardTimes = 0;
			if (type == 1 || type == 2) {
				addTurnCardTimes = LuckTurnCardActConst.ONE_TIMES;
			} else if (type == 3) {
				addTurnCardTimes = LuckTurnCardActConst.TEN_TIMES;
			} else {
				return;
			}
			int newTimes = turnCardTimes + addTurnCardTimes;
			if (turnCardTimes >= turnCardMaxTimes || newTimes > turnCardMaxTimes) {
				LuckTurnCardActSender.sendCmd_10342(hero.getId(), -1, type, null);
				return;
			}
			int[][] consumeYb = LuckTurnCardActSysCache.getConfigMap().get(model.getPeriods()).get(type);
			if (!UseAddUtil.canUse(hero, consumeYb)) { // 元宝不足
				LuckTurnCardActSender.sendCmd_10342(hero.getId(), -2, type, null);
				return;
			}
			UseAddUtil.use(hero, consumeYb, SourceGoodConst.LUCKTURNCARD_NEWACT_CONSUME, true);
			byte addVictoryTimes = 0;
			int[][] reward = null;
			List<List<ProbabilityEventModel>> proList = LuckTurnCardActSysCache.getAwardProEventConfigMap()
					.get(model.getPeriods());
			int state = 0;
			List<Object[]> rewardTipList = new ArrayList<>();
			if (type == 1) {
				byte arrLen = (byte) (LuckTurnCardActConst.CARD_NUM - size);
				int randomNum = 1;
				if (arrLen > 1) {
					int[] restRandom = new int[arrLen];
					int j = 0;
					for (byte i = 0; i < LuckTurnCardActConst.CARD_NUM; i++) {
						Collection<Byte> values = turnCardMap.values();
						boolean isHas = values.contains((byte) (i + 1));
						if (isHas) {
							continue;
						}
						restRandom[j++] = i + 1;
					}
					int randomIndex = RandomUtil.getRandomNumInAreas(0, arrLen - 1);
					randomNum = restRandom[randomIndex];
				}
				if (randomNum == 1) {
					addVictoryTimes = 1;
					turnCardMap.clear();
					List<ProbabilityEventModel> victoryList = proList.get(1);
					reward = getAwardArr(victoryList, addTurnCardTimes, rewardTipList);
				} else {
					List<ProbabilityEventModel> defeatList = proList.get(0);
					reward = getAwardArr(defeatList, addTurnCardTimes, rewardTipList);
					state = randomNum;
					turnCardMap.put(index, (byte) randomNum);
				}
			} else if (type == 2 || type == 3) {
				if (type == 2) {
					addVictoryTimes = 1;
					List<ProbabilityEventModel> victoryList = proList.get(1);
					reward = getAwardArr(victoryList, addTurnCardTimes, rewardTipList);
				} else {
					addVictoryTimes = 10;
					List<ProbabilityEventModel> victoryList = proList.get(1);
					reward = getAwardArr(victoryList, addTurnCardTimes, rewardTipList);
				}
				if (size > 0) {
					turnCardMap.clear();
				}
			} else {
				return;
			}
			if (addTurnCardTimes > 0) {
				model.setTurnCardTimes(turnCardTimes + addTurnCardTimes);
			}
			if (addVictoryTimes > 0) {
				LuckTurnCardActFunction.getIns().awardStateHandler(hero, addVictoryTimes);
				state = 1;
			}
			// 发放奖励
			UseAddUtil.add(hero, reward, SourceGoodConst.LUCKTURNCARD_NEWACT_TURN_REWARD, UseAddUtil.getDefaultMail(),
					false);
			LuckTurnCardActSender.sendCmd_10342(hero.getId(), state, oriType, rewardTipList.toArray());
			for (Object[] rewardTip : rewardTipList) {
				if ((Integer) rewardTip[3] == 1) {
					ChatManager.getIns().broadCast(ChatConst.LUCKTURNCARD_NEWACT_BIG_AWARD,
							new Object[] { hero.getNameZoneid(), rewardTip[1], rewardTip[2] });
				}
			}
		} catch (Exception e) {
			// TODO: handle exception
			if (model == null) {
				LogTool.error(e, this, hero.getId(), hero.getName(), "LuckTurnCardActManager turn type:" + oriType);
			} else {
				LogTool.error(e, this, hero.getId(), hero.getName(),
						"LuckTurnCardActManager turn type:" + oriType + " modelStr:" + JSON.toJSONString(model));
				Map<Byte, Byte> turnCardMap = model.getTurnCardMap();
				turnCardMap.clear();
			}
		}
	}

	/**
	 * 抽奖
	 * 
	 * @param list
	 * @param times
	 * @param rewardTipList
	 * @return
	 */
	public int[][] getAwardArr(List<ProbabilityEventModel> list, int times, List<Object[]> rewardTipList) {
		int size = list.size();
		List<int[]> awardList = new ArrayList<>(times * size);
		for (int count = 0; count < times; count++) {
			for (int i = 0; i < size; i++) {
				ProbabilityEventModel pe = list.get(i);
				int[] turnAward = (int[]) ProbabilityEventUtil.getEventByProbability(pe);// 抽奖
				if (turnAward != null) {
					awardList.add(turnAward);
					rewardTipList.add(new Object[] { turnAward[0], turnAward[1], turnAward[2], turnAward[4] });
				}
			}
		}
		return awardList.toArray(new int[0][]);
	}

	public void openTargetAwardUI(Hero hero) {
		// TODO Auto-generated method stub
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.LUCKTURNCARD_NEWACT)) {
			return;
		}
		LuckTurnCardAct model = (LuckTurnCardAct) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.LUCKTURNCARD_NEWACT);
		Map<Integer, Byte> awardStateMap = model.getAwardStateMap();
		List<Struct_slfplsb_330> configList = LuckTurnCardActSysCache.getConfigListMap().get(model.getPeriods());
		int size = configList.size();
		ArrayList<Object[]> awardStateList = new ArrayList<>(size);
		for (Struct_slfplsb_330 struct_slfplsb_330 : configList) {
			int id = struct_slfplsb_330.getId();
			Byte state = Optional.ofNullable(awardStateMap).map(map -> map.get(id))
					.orElse(LuckTurnCardActConst.NOT_REACH);
			awardStateList.add(new Object[] { id, state });
		}
		LuckTurnCardActSender.sendCmd_10344(hero.getId(), awardStateList.toArray());
	}

	public void getTargetAward(Hero hero, int awardId) {
		// TODO Auto-generated method stub
		LuckTurnCardAct model = null;
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.LUCKTURNCARD_NEWACT)) {
				return;
			}
			model = (LuckTurnCardAct) ActivityFunction.getIns().getActivityData(hero,
					ActivitySysId.LUCKTURNCARD_NEWACT);
			Struct_slfplsb_330 struct_slfplsb_330 = Config_slfplsb_330.getIns().get(awardId);
			if (struct_slfplsb_330 == null || struct_slfplsb_330.getQs() != model.getPeriods()) {
				LuckTurnCardActSender.sendCmd_10346(hero.getId(), LuckTurnCardActConst.FAILURE_NOT_AWARD, awardId);
				return;
			}
			Map<Integer, Byte> awardStateMap = model.getAwardStateMap();
			Byte state = awardStateMap.get(awardId);
			if (state == null) {
				LuckTurnCardActSender.sendCmd_10346(hero.getId(), LuckTurnCardActConst.FAILURE_NOT_REACH, awardId);
				return;
			}
			if (state == LuckTurnCardActConst.GETTED) {
				LuckTurnCardActSender.sendCmd_10346(hero.getId(), LuckTurnCardActConst.FAILURE_NOT_REP, awardId);
				return;
			}
			awardStateMap.put(awardId, LuckTurnCardActConst.GETTED);
			int[][] reward = struct_slfplsb_330.getShow();
			// 发放奖励
			UseAddUtil.add(hero, reward, SourceGoodConst.LUCKTURNCARD_NEWACT_TARGET_REWARD, UseAddUtil.getDefaultMail(),
					true);
			LuckTurnCardActSender.sendCmd_10346(hero.getId(), LuckTurnCardActConst.SUCCESS, awardId);
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(),
					"LuckTurnCardActManager getTargetAward awardId:" + awardId + " modelStr:" + model == null ? ""
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

	}

	@Override
	public void actEnd() {
		// TODO Auto-generated method stub

	}

	@Override
	public void heroActEnd(Hero hero) {
		// TODO Auto-generated method stub
		// 补发邮件奖励
		Integer configId = 0;
		try {
			LuckTurnCardAct model = (LuckTurnCardAct) ActivityFunction.getIns().getActivityData(hero,
					ActivitySysId.LUCKTURNCARD_NEWACT);
			Map<Integer, Byte> awardStateMap = model.getAwardStateMap();
			for (Entry<Integer, Byte> entry : awardStateMap.entrySet()) {
				Byte state = entry.getValue();
				if (state == LuckTurnCardActConst.CAN_GET) {
					configId = entry.getKey();
					Struct_slfplsb_330 struct_slfplsb_330 = Config_slfplsb_330.getIns().get(configId);
					int[][] reward = struct_slfplsb_330.getShow();
					MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.LUCKTURNCARD_NEWACT,
							new Object[] { MailConst.LUCKTURNCARD_NEWACT }, reward);
					entry.setValue(LuckTurnCardActConst.GETTED);
				}
			}
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(),
					"LuckTurnCardActManager handleEnd configId:" + configId);
		}
	}

	@Override
	public ActivityData getActivityData(Hero hero, ActivityInfo activityInfo) {
		// TODO Auto-generated method stub
		LuckTurnCardAct model = new LuckTurnCardAct(hero.getId(), activityInfo.getIndex(), activityInfo.getActId(),
				activityInfo.getPeriods());
		model.setTurnCardMap(new HashMap<>());
		model.setAwardStateMap(new HashMap<>());
		return model;
	}

	@Override
	public Class<?> getActivityData() {
		// TODO Auto-generated method stub
		return LuckTurnCardAct.class;
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		// TODO Auto-generated method stub

	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		// TODO Auto-generated method stub
		return LuckTurnCardActEvent.getIns();
	}

}
