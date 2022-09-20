package com.teamtop.system.activity.ativitys.superHoodle;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.AbstractActivityManager;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.superHoodle.model.ProRewardInfo;
import com.teamtop.system.activity.ativitys.superHoodle.model.RewardInfo;
import com.teamtop.system.activity.ativitys.superHoodle.model.SuperHoodleModel;
import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCurrencies;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventFactory;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_cjdzstore_502;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_cjdzstore_502;

public class SuperHoodleManager extends AbstractActivityManager {

	private static SuperHoodleManager ins;

	private SuperHoodleManager() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized SuperHoodleManager getIns() {
		if (ins == null) {
			ins = new SuperHoodleManager();
		}
		return ins;
	}

	@Override
	public void actOpen() {
		// TODO Auto-generated method stub

	}

	@Override
	public void heroActOpen(Hero hero) {
		resetReward(hero);

	}

	public void resetReward(Hero hero) {
		SuperHoodleModel model = (SuperHoodleModel) hero.getHeroActivityData().getActivityDataMap()
				.get(ActivitySysId.ACT_SUPER_HOODLE);
		Map<Integer, RewardInfo> rewardMap = model.getRewardMap();
		rewardMap.clear();
		model.setDrawNum(0);
		Map<Integer, ProRewardInfo> map = SuperHoodleSysCache.getQsMap().get(model.getPeriods());
		Map<Integer, List<int[][]>> rMap = new HashMap<>();
		for (int i = 1; i <= 5; i++) {
			ProRewardInfo proRewardInfo = map.get(i);
			if (i == 5) {
				List<int[][]> randReward = proRewardInfo.getRandReward(3);
				rMap.put(i, randReward);
			} else {
				List<int[][]> randReward = proRewardInfo.getRandReward(1);
				rMap.put(i, randReward);
			}
		}
		int size = SuperHoodleSysCache.indexArr.length;
		int fNum = 0;
		int[][] reward = null;
		for (int i = 0; i < size; i++) {
			int pool = SuperHoodleSysCache.indexArr[i];
			List<int[][]> list = rMap.get(pool);
			if (pool == 5) {
				reward = list.get(fNum);
				fNum++;
			} else {
				reward = list.get(0);
			}
			ProRewardInfo proRewardInfo = map.get(pool);
			RewardInfo rInfo = new RewardInfo();
			rInfo.setId(proRewardInfo.getId());
			rInfo.setIndex(i + 1);
			rInfo.setPool(proRewardInfo.getPool());
			rInfo.setProb(proRewardInfo.getPro());
			rInfo.setReward(reward);
			rewardMap.put(rInfo.getIndex(), rInfo);
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
		SuperHoodleModel model = new SuperHoodleModel(hero.getId(), activityInfo.getIndex(), activityInfo.getActId(),
				activityInfo.getPeriods());
		return model;
	}

	@Override
	public Class<?> getActivityData() {
		// TODO Auto-generated method stub
		return SuperHoodleModel.class;
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		// TODO Auto-generated method stub

	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		// TODO Auto-generated method stub
		return SuperHoodleSysEvent.getIns();
	}

	@Override
	public void openUI(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_SUPER_HOODLE)) {
				return;
			}
			SuperHoodleModel model = (SuperHoodleModel) hero.getHeroActivityData().getActivityDataMap()
					.get(ActivitySysId.ACT_SUPER_HOODLE);
			Set<Integer> blockSet = model.getBlockSet();
			int drawNum = model.getDrawNum();
			List<Object> poolData = new ArrayList<>();
			Map<Integer, RewardInfo> rewardMap = model.getRewardMap();
			int size = rewardMap.size();
			for (int i = 1; i <= size; i++) {
				RewardInfo rewardInfo = rewardMap.get(i);
				int[][] reward = rewardInfo.getReward();
				int block = 0;
				if (blockSet.contains(i)) {
					block = 1;
				}
				poolData.add(new Object[] { i, reward[0][0], reward[0][1], reward[0][2], block });
			}
			long hoodlePoint = hero.getHeroCurrencies().getHoodlePoint();
			SuperHoodleSender.sendCmd_11730(hid, drawNum, poolData.toArray(), hoodlePoint);
		} catch (Exception e) {
			LogTool.error(e, SuperHoodleManager.class, hid, hero.getName(), "SuperHoodleManager openUI");
		}
	}

	/**
	 * 屏蔽操作
	 * @param hero
	 * @param type 1 屏蔽，2解除屏蔽
	 * @param index 位置
	 */
	public void block(Hero hero, int type, int index) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_SUPER_HOODLE)) {
				return;
			}
			SuperHoodleModel model = (SuperHoodleModel) hero.getHeroActivityData().getActivityDataMap()
					.get(ActivitySysId.ACT_SUPER_HOODLE);
			Set<Integer> blockSet = model.getBlockSet();
			if (type == 1) {
				if (blockSet.size() >= 3) {
					return;
				}
				if (blockSet.contains(index)) {
					// 已经屏蔽
					SuperHoodleSender.sendCmd_11732(hid, 0, 1, 0);
					return;
				}
				blockSet.add(index);
			} else if (type == 2) {
				if (!blockSet.contains(index)) {
					// 没屏蔽不用，解除
					SuperHoodleSender.sendCmd_11732(hid, 0, 2, 0);
					return;
				}
				blockSet.remove(index);
			} else {
				return;
			}
			SuperHoodleSender.sendCmd_11732(hid, 1, type, index);
		} catch (Exception e) {
			LogTool.error(e, SuperHoodleManager.class, hid, hero.getName(),
					"SuperHoodleManager block, type=" + type + ", index=" + index);
		}
	}

	/**
	 * 发射弹珠
	 * @param type 1：一次，2:5次
	 */
	public void shoot(Hero hero, int type) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_SUPER_HOODLE)) {
				return;
			}
			int num = 0;
			if (type == 1) {
				num = 1;
			} else {
				num = 5;
			}
			ProbabilityEventModel probabilityEvent = ProbabilityEventFactory.getProbabilityEvent();
			SuperHoodleModel model = (SuperHoodleModel) hero.getHeroActivityData().getActivityDataMap()
					.get(ActivitySysId.ACT_SUPER_HOODLE);
			int drawNum = model.getDrawNum();
			long hoodlePoint = hero.getHeroCurrencies().getHoodlePoint();
			List<Object[]> sendList = new ArrayList<Object[]>();
			if (drawNum > 0 && type != 1) {
				SuperHoodleSender.sendCmd_11734(hid, 0, 1, hoodlePoint, sendList.toArray());
				return;
			}
			Set<Integer> blockSet = model.getBlockSet();
			int blockSize = blockSet.size();
			int cost = 0;
			int[][] moneyArr = Config_xtcs_004.getIns().get(SuperHoodleConst.DRAW_COST).getOther();
			for (int[] arr : moneyArr) {
				if (arr[0] == blockSize) {
					cost = arr[1];
					break;
				}
			}
			if (cost == 0) {
				cost = moneyArr[0][1];
			}
			cost = cost * num;
			if (!UseAddUtil.canUse(hero, GameConst.YUANBAO, cost)) {
				SuperHoodleSender.sendCmd_11734(hid, 0, 2, hoodlePoint, sendList.toArray());
				return;
			}
			UseAddUtil.use(hero, GameConst.YUANBAO, cost, SourceGoodConst.ACT_SUPER_HOODLE_SHOOT_COST, true);
			model.setDrawNum(drawNum + num);
			HeroCurrencies heroCurrencies = hero.getHeroCurrencies();
			int point = Config_xtcs_004.getIns().get(SuperHoodleConst.DRAW_POINT).getNum();
			UseAddUtil.add(hero, GameConst.HOODLE_POINT, num * point, SourceGoodConst.ACT_SUPER_HOODLE_SHOOT, true);
			Map<Integer, RewardInfo> rewardMap = model.getRewardMap();
			Iterator<Entry<Integer, RewardInfo>> iterator = rewardMap.entrySet().iterator();
			for (; iterator.hasNext();) {
				Entry<Integer, RewardInfo> entry = iterator.next();
				int index = entry.getKey();
				if (blockSet.contains(index)) {
					continue;
				}
				RewardInfo rewardInfo = entry.getValue();
				probabilityEvent.addProbabilityEvent(rewardInfo.getProb(), rewardInfo);
			}
			List<int[][]> rewardList = new ArrayList<>();
			for (int i = 0; i < num; i++) {
				RewardInfo rewardInfo = (RewardInfo) ProbabilityEventUtil.getEventByProbability(probabilityEvent);
				int[][] reward = rewardInfo.getReward();
				rewardList.add(reward);
				int[][] addReward = new int[1][];
				addReward[0] = new int[] { reward[0][0], reward[0][1], reward[0][2] };
				UseAddUtil.add(hero, addReward, SourceGoodConst.ACT_SUPER_HOODLE_SHOOT,
						UseAddUtil.getDefaultMail(), false);
				sendList.add(new Object[] { rewardInfo.getIndex(), reward[0][0], reward[0][1], reward[0][2] });
			}
			long newHoodlePoint = heroCurrencies.getHoodlePoint();
			SuperHoodleSender.sendCmd_11734(hid, 1, model.getDrawNum(), newHoodlePoint, sendList.toArray());
			// 广播处理
			String nameZoneid = hero.getNameZoneid();
			for (int[][] reward : rewardList) {
				if (reward[0][3] == 1) {
					// 广播
					ChatManager.getIns().broadCast(hero, ChatConst.SUPER_HOODLE_REWARD,
							new Object[] { nameZoneid, reward[0][1], reward[0][2], });
				}
			}
			int limitNum = Config_xtcs_004.getIns().get(SuperHoodleConst.DRAW_LIMIT).getNum();
			if (type == 2) {
				resetReward(hero);
				openUI(hero);
			} else if (model.getDrawNum() >= limitNum) {
				resetReward(hero);
				openUI(hero);
			}
		} catch (Exception e) {
			LogTool.error(e, SuperHoodleManager.class, hid, hero.getName(), "SuperHoodleManager block, type=" + type);
		}
	}

	/**
	 * 重置弹珠奖励
	 * @param hero
	 */
	public void resetHoodle(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_SUPER_HOODLE)) {
				return;
			}
			int[][] cost = Config_xtcs_004.getIns().get(SuperHoodleConst.RESET_COST).getOther();
			if (!UseAddUtil.canUse(hero, cost)) {
				SuperHoodleSender.sendCmd_11736(hid, 0);
				return;
			}
			UseAddUtil.use(hero, cost, SourceGoodConst.ACT_SUPER_HOODLE_RESET, true);
			resetReward(hero);
			SuperHoodleSender.sendCmd_11736(hid, 1);
			openUI(hero);
		} catch (Exception e) {
			LogTool.error(e, SuperHoodleManager.class, hid, hero.getName(), "SuperHoodleManager resetHoodle");
		}
	}

	/**
	 * 打开弹珠积分商店
	 * @param hero
	 */
	public void openStore(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_SUPER_HOODLE)) {
				return;
			}
			SuperHoodleModel model = (SuperHoodleModel) hero.getHeroActivityData().getActivityDataMap()
					.get(ActivitySysId.ACT_SUPER_HOODLE);
			Map<Integer, Integer> buyMap = model.getBuyMap();
			List<Struct_cjdzstore_502> list = SuperHoodleSysCache.getQsStoreMap().get(model.getPeriods());
			int size = list.size();
			List<Object> sendList = new ArrayList<>();
			for (int i = 0; i < size; i++) {
				Struct_cjdzstore_502 cjdzstore_502 = list.get(i);
				int id = cjdzstore_502.getId();
				int xg = cjdzstore_502.getXg();
				Integer num = buyMap.get(id);
				if (num == null) {
					num = 0;
				}
				sendList.add(new Object[] { id, num });
			}
			long hoodlePoint = hero.getHeroCurrencies().getHoodlePoint();
			SuperHoodleSender.sendCmd_11738(hid, hoodlePoint, sendList.toArray());
		} catch (Exception e) {
			LogTool.error(e, SuperHoodleManager.class, hid, hero.getName(), "SuperHoodleManager openStore");
		}
	}

	/**
	 * 兑换
	 */
	public void exchange(Hero hero, int id, int exNum) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_SUPER_HOODLE)) {
				return;
			}
			SuperHoodleModel model = (SuperHoodleModel) hero.getHeroActivityData().getActivityDataMap()
					.get(ActivitySysId.ACT_SUPER_HOODLE);
			Map<Integer, Integer> buyMap = model.getBuyMap();
			Integer num = buyMap.get(id);
			if (num == null) {
				num = 0;
			}
			Struct_cjdzstore_502 cjdzstore_502 = Config_cjdzstore_502.getIns().get(id);
			int xg = cjdzstore_502.getXg();
			if (num >= xg) {
				SuperHoodleSender.sendCmd_11740(hid, 0, 2, 0);
				return;
			}
			int newNum = num + exNum;
			if (newNum > xg) {
				SuperHoodleSender.sendCmd_11740(hid, 0, 2, 0);
				return;
			}
			int[][] consume = cjdzstore_502.getConsume();
			if (!UseAddUtil.canUse(hero, consume, exNum)) {
				SuperHoodleSender.sendCmd_11740(hid, 0, 1, 0);
				return;
			}
			// UseAddUtil.use(hero, consume, SourceGoodConst.ACT_HOODLE_STORE_COST, true);
			UseAddUtil.use(hero, consume, exNum, SourceGoodConst.ACT_HOODLE_STORE_COST, true);
			int[][] item = cjdzstore_502.getItem();
			UseAddUtil.add(hero, item, SourceGoodConst.ACT_HOODLE_STORE_EXCHANGE, UseAddUtil.getDefaultMail(), true);
			buyMap.put(id, newNum);
			SuperHoodleSender.sendCmd_11740(hid, 1, id, newNum);
		} catch (Exception e) {
			LogTool.error(e, SuperHoodleManager.class, hid, hero.getName(), "SuperHoodleManager exchange");
		}
	}

}
