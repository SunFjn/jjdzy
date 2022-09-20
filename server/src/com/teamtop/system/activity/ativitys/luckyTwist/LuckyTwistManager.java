package com.teamtop.system.activity.ativitys.luckyTwist;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.AbstractActivityManager;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventUtil;
import com.teamtop.util.ProbabilityEvent.RandomUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_luckeggcj_295;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_luckeggcj_295;
import excel.struct.Struct_luckeggtime_295;

public class LuckyTwistManager extends AbstractActivityManager {

	private static LuckyTwistManager ins;
	
	private LuckyTwistManager() {
		
	}

	public static synchronized LuckyTwistManager getIns() {
		if (ins == null) {
			ins = new LuckyTwistManager();
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
			boolean checkHeroActOpen = ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.LUCKY_TWIST);
			if (!checkHeroActOpen) {
				return;
			}
			LuckyTwist model = (LuckyTwist) hero.getHeroActivityData().getActivityDataMap()
					.get(ActivitySysId.LUCKY_TWIST);
			Map<Integer, List<int[]>> uiInfo = model.getUiInfo();
			int periods = model.getPeriods();

			List<Object[]> uiList = new ArrayList<>();
			Iterator<Integer> iterator = LuckyTwistSysCache.getAwardMap(periods).keySet().iterator();
			while (iterator.hasNext()) {
				List<Object[]> uiList1 = new ArrayList<>();
				Integer ii = iterator.next(); 
				List<int[]> list = uiInfo.get(ii);
				if (list == null) {
					list = new ArrayList<>();
				}
				int size2 = list.size();
				for (int i = 0; i < size2; i++) {
					int[] js = list.get(i);
					uiList1.add(new Object[] { js[0], js[1], js[2], js[4] });
				}
				uiList.add(new Object[] { ii, uiList1.toArray() });
			}
			int num = model.getNum();
			int times = num == 0 ? 3 - (model.getHasTimes() % 3) : 0;// 每3次免费有1次
			LuckyTwistSender.sendCmd_11000(hid, uiList.toArray(), num, times, LuckyTwistConst.MAX - model.getTimes());
		} catch (Exception e) {
			LogTool.error(e, LuckyTwistManager.class, hid, hero.getName(), "LuckyTwistManager openUI");
		}
	}

	public void draw(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			boolean checkHeroActOpen = ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.LUCKY_TWIST);
			if (!checkHeroActOpen) {
				return;
			}
			LuckyTwist model = (LuckyTwist) hero.getHeroActivityData().getActivityDataMap()
					.get(ActivitySysId.LUCKY_TWIST);
			List<Object[]> awardList = new ArrayList<>();
			List<int[]> chooseReward = model.getChooseReward();
			int size = chooseReward.size();
			if (size == 0) {
				// 奖池先注入道具
				LuckyTwistSender.sendCmd_11002(hid, 4, awardList.toArray(), LuckyTwistConst.MAX - model.getTimes());
				return;
			}
			if (model.getTimes() >= LuckyTwistConst.MAX) {
				// 最多抽奖7次
				LuckyTwistSender.sendCmd_11002(hid, 2, awardList.toArray(), LuckyTwistConst.MAX - model.getTimes());
				return;
			}
			Struct_luckeggcj_295 struct_luckeggcj_295 = Config_luckeggcj_295.getIns().get(model.getTimes() + 1);
			int[][] cost = struct_luckeggcj_295.getConsume();
			if (!UseAddUtil.canUse(hero, cost)) {
				// 元宝不足
				LuckyTwistSender.sendCmd_11002(hid, 3, awardList.toArray(), LuckyTwistConst.MAX - model.getTimes());
				return;
			}
			UseAddUtil.use(hero, cost, SourceGoodConst.LUCKY_TWIST_COST, true);
			int[][] items = new int[1][];
			int[] gbAward = null;// 广播
			int index;
			List<Integer> multiRandomNumInArea = RandomUtil.getMultiRandomNumInArea(0, size - 1, 1);
			if (multiRandomNumInArea == null) {
				index = 0;
			} else {
				index = multiRandomNumInArea.get(0);
			}
			int[] getAward = chooseReward.get(index);
			items[0] = new int[] { getAward[0], getAward[1], getAward[2] };
			awardList.add(new Object[] { getAward[0], getAward[1], getAward[2], getAward[3] });// 抽奖推给前端
			if (getAward[3] == 1) {
				gbAward = getAward;
			}

			Map<Integer, List<int[]>> uiInfo = model.getUiInfo();
			Iterator<List<int[]>> iterator = uiInfo.values().iterator();

			int[] getAward1 = { getAward[0], getAward[1], getAward[2] };// 抽取的物品

			boolean isBreak = false;
			while (iterator.hasNext()) {
				List<int[]> next = iterator.next();
				Iterator<int[]> iterator2 = next.iterator();
					while (iterator2.hasNext()) {
					int[] next2 = iterator2.next();
					int[] next3 = { next2[0], next2[1], next2[2] };// 展示的物品
					if (next2[4] != 1 && Arrays.equals(next3, getAward1)) {
						// UI界面没抽中且展示物品是抽取物品的时候
						next2[4] = 1;// 推送前端已抽中
						isBreak = true;
						break;
					}
				}
				if (isBreak) {
					break;
				}
			}
			chooseReward.remove(getAward);
			model.setTimes(model.getTimes() + 1);
			int num = model.getNum();
			if (model.getHasTimes() < 3 && num == 0) {
				// 没有免费次数的时候累加抽取次数
				model.setHasTimes(model.getHasTimes() + 1);
			}
			if (model.getHasTimes() == 3 && num < 1) {
				// 每轮第3次获得一次免费次数(有免费次数不累加)
				model.setNum(num + 1);
				model.setHasTimes(0);
			}
			UseAddUtil.add(hero, items, SourceGoodConst.LUCKY_TWIST_ADD, UseAddUtil.getDefaultMail(), true);
			
			LuckyTwistSender.sendCmd_11002(hid, 1, awardList.toArray(), LuckyTwistConst.MAX - model.getTimes());
			if (gbAward != null) {
				ChatManager.getIns().broadCast(ChatConst.LUCKY_TWIST,
						new Object[] { hero.getName(), gbAward[1], gbAward[2] }); // 全服广播
			}
			openUI(hero);
		} catch (Exception e) {
			LogTool.error(e, LuckyTwistManager.class, hid, hero.getName(), "LuckyTwistManager draw");
		}
	}
	
	
	/**
	 * @param hero
	 *            随机物品
	 */
	public void chooseItem(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			boolean checkHeroActOpen = ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.LUCKY_TWIST);
			if (!checkHeroActOpen) {
				return;
			}
			LuckyTwist model = (LuckyTwist) hero.getHeroActivityData().getActivityDataMap()
					.get(ActivitySysId.LUCKY_TWIST);
			int cinum = model.getCinum();
			int num = model.getNum();
			int periods = model.getPeriods();
			int[][] cost = Config_xtcs_004.getIns().get(LuckyTwistConst.INDEX).getOther();
			if (num > 0) {
				model.setNum(model.getNum() - 1);
			} else {
				if (!UseAddUtil.canUse(hero, cost)) {
					// 元宝不足
					LuckyTwistSender.sendCmd_11004(hid, 2);
					return;
				}
				UseAddUtil.use(hero, cost, SourceGoodConst.LUCKY_TWIST_PUT, true);
			}

			model.setCinum(cinum + 1);
			int maxNum = LuckyTwistSysCache.getMaxNum();
			if (model.getCinum() > maxNum) {
				model.setCinum(1);// 超过最大次数后重置次数
			}

			int[] choose = null;
			if (model.getLuckyNum() > 0) {
				// 第一次福利固定奖池
				choose = LuckyTwistConst.LUCKY_NUM;
				model.setLuckyNum(model.getLuckyNum() - 1);
			} else {
				// 正常操作根据次数抽概率奖池
				Struct_luckeggtime_295 struct_luckeggtime_295 = LuckyTwistSysCache.getCountConfigMap()
						.get(model.getCinum());
				ProbabilityEventModel probabilityEventModel = new ProbabilityEventModel();
				for (int[] up : struct_luckeggtime_295.getReward()) {
					probabilityEventModel.addProbabilityEvent(up[3], new int[] { up[0], up[1], up[2] });
				}
				choose = (int[]) ProbabilityEventUtil.getEventByProbability(probabilityEventModel);// 随机
			}
			List<int[]> ChooseReward = model.getChooseReward();
			Map<Integer, List<int[]>> uiInfo = model.getUiInfo();

			// 清空上轮数据
			model.setTimes(0);
			model.getUiInfo().clear();
			model.getChooseReward().clear();

			Iterator<Integer> iterator = LuckyTwistSysCache.getAwardMap(periods).keySet().iterator();
			while (iterator.hasNext()) {
				Integer ii = iterator.next();
				int index = ii - periods * 10;
				int chooseNum = choose[index - 1];
				if (chooseNum == 0) {
					continue;
				}
				int[][] items = new int[chooseNum][];
				List<int[]> arrayList = new ArrayList<>();
				for (int i = 0; i < chooseNum; i++) {
					List<ProbabilityEventModel> bigList = LuckyTwistSysCache.getAwardMap(periods).get(ii);
					ProbabilityEventModel probabilityEventModel2 = bigList.get(0);
					int[] getAward = (int[]) ProbabilityEventUtil.getEventByProbability(probabilityEventModel2);// 随机奖励
					items[i] = new int[] { getAward[0], getAward[1], getAward[2], getAward[4], 0 };
					ChooseReward.add(items[i]);
					arrayList.add(items[i]);
				}
				uiInfo.put(ii, arrayList);
			}
			LuckyTwistSender.sendCmd_11004(hid, 1);
			openUI(hero);
		} catch (Exception e) {
			LogTool.error(e, LuckyTwistManager.class, hid, hero.getName(), "LuckyTwistManager chooseItem");
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
		LuckyTwist model = new LuckyTwist(hero.getId(), activityInfo.getIndex(), activityInfo.getActId(),
				activityInfo.getPeriods());
		model.setUiInfo(new HashMap<>());
		model.setChooseReward(new ArrayList<>());
		model.setNum(1);
		model.setLuckyNum(1);
		return model;
	}

	@Override
	public Class<?> getActivityData() {
		return LuckyTwist.class;
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		return LuckyTwistEvent.getIns();
	}

}
