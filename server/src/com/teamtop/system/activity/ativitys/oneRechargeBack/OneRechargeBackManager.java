package com.teamtop.system.activity.ativitys.oneRechargeBack;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.houtaiHttp.events.recharge.RechargeConst;
import com.teamtop.system.activity.AbstractActivityManager;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.oneRechargeBack.model.OneRechargeBack;
import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.bag.BagFunction;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventUtil;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_dbfl_281;
import excel.config.Config_shop_011;
import excel.struct.Struct_dbfl_281;
import excel.struct.Struct_shop_011;

public class OneRechargeBackManager extends AbstractActivityManager {
	private static volatile OneRechargeBackManager ins = null;

	public static OneRechargeBackManager getIns() {
		if (ins == null) {
			synchronized (OneRechargeBackManager.class) {
				if (ins == null) {
					ins = new OneRechargeBackManager();
				}
			}
		}
		return ins;
	}

	private OneRechargeBackManager() {
	}

	@Override
	public void openUI(Hero hero) {
		// TODO Auto-generated method stub
		boolean checkHeroActOpen = ActivityFunction.getIns().checkHeroActOpen(hero,
				ActivitySysId.ACT_ONERECHARGEBACK);
		if (!checkHeroActOpen) {
			return;
		}
//		OneRechargeBack OneRechargeBack = (OneRechargeBack) ActivityFunction.getIns().getActivityData(hero,
//				ActivitySysId.ACT_ONERECHARGEBACK);
		OneRechargeBack OneRechargeBack = (OneRechargeBack) hero.getHeroActivityData().getActivityDataMap()
				.get(ActivitySysId.ACT_ONERECHARGEBACK);
		Map<Integer, Integer[]> awardMap = OneRechargeBack.getAwardMap();
		List<Struct_dbfl_281> sortList = Config_dbfl_281.getIns().getSortList();
		int size = sortList.size();
		List<Object> awardList = new ArrayList<>();
		// 背包中钥匙总数
		int totalKeyNum = 0;
		for (int i = 0; i < size; i++) {
			Struct_dbfl_281 struct_dbfl_281 = sortList.get(i);
			int id = struct_dbfl_281.getId();
			Integer[] array = Optional.ofNullable(awardMap).map(map -> map.get(id)).orElse(new Integer[] { 0, 0 });
			int keyId = struct_dbfl_281.getReward()[0][1];
			int keyNum = BagFunction.getIns().getGoodsNumBySysId(hero.getId(), keyId);
			int canNum = array[0];
			int gettedNum = array[1];
			if (canNum == 0) {
				// 不可领取
				awardList.add(new Object[] { struct_dbfl_281.getId(), OneRechargeBackConst.NOT_REACH, keyNum,
						array[1] });
			} else if (gettedNum >= canNum) {
				// 已领完
				awardList.add(new Object[] { struct_dbfl_281.getId(), OneRechargeBackConst.GETTED, keyNum,
						array[1] });
			} else {
				// 可领取
				awardList.add(new Object[] { struct_dbfl_281.getId(), OneRechargeBackConst.CAN_GET, keyNum,
						array[1] });
			}
			totalKeyNum += keyNum;
		}
		OneRechargeBackSender.sendCmd_8472(hero.getId(), awardList.toArray(), totalKeyNum);
	}

	/**
	 * 领取奖励
	 * 
	 * @param hero
	 * @param awardId
	 *            索引id
	 */
	public void getAward(Hero hero, int awardId) {
		// TODO Auto-generated method stub
		try {
			boolean checkHeroActOpen = ActivityFunction.getIns().checkHeroActOpen(hero,
					ActivitySysId.ACT_ONERECHARGEBACK);
			if (!checkHeroActOpen) {
				return;
			}
			Struct_dbfl_281 struct_dbfl_281 = Config_dbfl_281.getIns().get(awardId);
			if (struct_dbfl_281 == null) {
				// 没有该奖励
				OneRechargeBackSender.sendCmd_8474(hero.getId(), OneRechargeBackConst.FAILURE_NOT_AWARD, awardId, 0, 0);
				return;
			}
			OneRechargeBack OneRechargeBack = (OneRechargeBack) hero.getHeroActivityData().getActivityDataMap()
					.get(ActivitySysId.ACT_ONERECHARGEBACK);
			Map<Integer, Integer[]> awardMap = OneRechargeBack.getAwardMap();
			Integer[] array = Optional.ofNullable(awardMap).map(map -> map.get(awardId)).orElse(new Integer[] { 0, 0 });
			int canNum = array[0];
			int gettedNum = array[1];
			if (canNum == 0) {
				// 不可领取
				OneRechargeBackSender.sendCmd_8474(hero.getId(), OneRechargeBackConst.FAILURE_NOT_REACH, awardId, 0, 0);
				return;
			}
			if (gettedNum >= canNum) {
				// 奖励已领完
				OneRechargeBackSender.sendCmd_8474(hero.getId(), OneRechargeBackConst.FAILURE_GETTED, awardId, 0, 0);
				return;
			}
			// 已领数量+1
			array[1] = gettedNum + 1;
			int[][] reward = struct_dbfl_281.getReward();
			// 发放奖励
			UseAddUtil.add(hero, reward, SourceGoodConst.ONERECHARGEBACK_KEYGET, UseAddUtil.getDefaultMail(),
					true);
			// 背包中该钥匙数量
			int keyNum = BagFunction.getIns().getGoodsNumBySysId(hero.getId(), reward[0][1]);
			int isGetted = 1;
			if (array[1] >= canNum) {
				isGetted = 2;
			}
			OneRechargeBackSender.sendCmd_8474(hero.getId(), OneRechargeBackConst.SUCCESS, awardId, keyNum, isGetted);
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(), "getAward awardId:" + awardId);
		}
	}

	/**
	 * 转盘
	 * 
	 * @param hero
	 */
	public void turnAward(Hero hero) {
		// TODO Auto-generated method stub
		int minId = 0;
		int bei = 0;
		int beiId = 0;
		try {
			boolean checkHeroActOpen = ActivityFunction.getIns().checkHeroActOpen(hero,
					ActivitySysId.ACT_ONERECHARGEBACK);
			if (!checkHeroActOpen) {
				return;
			}
			Integer[] minIdAndTotalArray = getMinIdAndTotalArray(hero);
			minId = minIdAndTotalArray[0];
			int totalKeyNum = minIdAndTotalArray[1];
			if (minId == 0) {
				return;
			}
			// Integer minIndex = OneRechargeBackCache.getKeyIdToIndexMap().get(minId);
			ProbabilityEventModel probabilityEventModel = OneRechargeBackCache.getIndexToProbabilityMap()
					.get(minId);
			Struct_dbfl_281 struct_dbfl_281 = Config_dbfl_281.getIns().get(minId);
			int[][] reward = struct_dbfl_281.getReward();
			if (!UseAddUtil.canUse(hero, reward)) {
				// 钥匙数量不足
				 OneRechargeBackSender.sendCmd_8476(hero.getId(),
				 OneRechargeBackConst.FAILURE_NOT_KEY, 0,
				 0, 0, 0);
				return;
			}
			// 消耗钥匙
			UseAddUtil.use(hero, reward, SourceGoodConst.ONERECHARGEBACK_KEYUSE, true);
			int[][] yb = struct_dbfl_281.getYb();
			OneRechargeBack OneRechargeBack = (OneRechargeBack) hero.getHeroActivityData().getActivityDataMap()
					.get(ActivitySysId.ACT_ONERECHARGEBACK);
			List<Integer[]> recordList = OneRechargeBack.getRecordList();
			Integer[] array = (Integer[]) ProbabilityEventUtil.getEventByProbability(probabilityEventModel);
			beiId = array[0];
			bei = array[1];
			recordList.add(new Integer[] { minId, bei });
			double beiDou = bei / 100.0;
			int[][] copyYb = CommonUtil.copyArrayAndNumFloor(yb, beiDou);
			// 发放奖励
			UseAddUtil.add(hero, copyYb, SourceGoodConst.ONERECHARGEBACK_TURNREWARD,
					UseAddUtil.getDefaultMail(), true);
			// 背包中该钥匙数量
			int keyNum = BagFunction.getIns().getGoodsNumBySysId(hero.getId(), reward[0][1]);
			OneRechargeBackSender.sendCmd_8476(hero.getId(), OneRechargeBackConst.SUCCESS, beiId, totalKeyNum - 1,
					minId, keyNum);
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(),
					"getAward minId:" + minId + " beiId:" + beiId + " bei:" + bei);
		}
	}

	public Integer[] getMinIdAndTotalArray(Hero hero) {
		int minId = 0;
		int totalKeyNum = 0;
		List<Struct_dbfl_281> sortList = Config_dbfl_281.getIns().getSortList();
		int size = sortList.size();
		for (int i = 0; i < size; i++) {
			Struct_dbfl_281 struct_dbfl_281 = sortList.get(i);
			int[][] reward = struct_dbfl_281.getReward();
			int keyNum = BagFunction.getIns().getGoodsNumBySysId(hero.getId(), reward[0][1]);
			int id = struct_dbfl_281.getId();
			if (keyNum > 0 && (minId == 0 || id < minId)) {
				minId = id;
			}
			totalKeyNum += keyNum;
		}
		return new Integer[] { minId, totalKeyNum };
	}

	/**
	 * 打开记录界面
	 * 
	 * @param hero
	 */
	public void openRecordUI(Hero hero) {
		// TODO Auto-generated method stub
		boolean checkHeroActOpen = ActivityFunction.getIns().checkHeroActOpen(hero,
				ActivitySysId.ACT_ONERECHARGEBACK);
		if (!checkHeroActOpen) {
			return;
		}
		OneRechargeBack OneRechargeBack = (OneRechargeBack) hero.getHeroActivityData().getActivityDataMap()
				.get(ActivitySysId.ACT_ONERECHARGEBACK);
		List<Integer[]> recordList = OneRechargeBack.getRecordList();
		int size = recordList.size();
		List<Object> recordArrayList = new ArrayList<>();
		for (int i = 0; i < size; i++) {
			Integer[] array = recordList.get(i);
			// 消耗奖励索引id
			int index = array[0];
			// 奖励倍数
			int bei = array[1];
			recordArrayList.add(new Integer[] { index, bei });
		}
		OneRechargeBackSender.sendCmd_8478(hero.getId(), recordArrayList.toArray());
	}



	@Override
	public AbsSystemEvent getSystemEvent() {
		// TODO Auto-generated method stub
		return OneRechargeBackEvent.getIns();
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		// TODO Auto-generated method stub
		OneRechargeBackFunction.getIns().rechargeYB(hero, money, product_id);
	}


	@Override
	public void actOpen() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void heroActOpen(Hero hero) {
		// TODO Auto-generated method stub
		// 外网当天更新前的充值也要记录
		List<Integer> list = hero.getOneDayEveryIndexRechargeList();
		int size = list.size();
		for (int i = 0; i < size; i++) {
			Integer product_id = list.get(i);
			Struct_shop_011 struct_shop_011 = Config_shop_011.getIns().get(product_id);
			if (struct_shop_011.getType() == RechargeConst.YB) {
				int money = struct_shop_011.getRmb();
				OneRechargeBackFunction.getIns().rechargeYB(hero, money, product_id);
			}
		}
	}

	@Override
	public void actEnd() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void heroActEnd(Hero hero) {
		// TODO Auto-generated method stub
		int configId = 0;
		int canNum = 0;
		int gettedNum = 0;
		try {
			OneRechargeBack model = (OneRechargeBack) hero.getHeroActivityData().getActivityDataMap()
					.get(ActivitySysId.ACT_ONERECHARGEBACK);
			Map<Integer, Integer[]> awardMap = model.getAwardMap();
			for (Entry<Integer, Integer[]> entry : awardMap.entrySet()) {
				Integer[] array = entry.getValue();
				configId = entry.getKey();
				Struct_dbfl_281 struct_dbfl_281 = Config_dbfl_281.getIns().get(configId);
				canNum = array[0];
				gettedNum = array[1];
				int restNum = canNum - gettedNum;
				if (restNum > 0) {
					// 有可领取数量发邮件奖励
					for (int i = 0; i < restNum; i++) {
						int[][] reward = struct_dbfl_281.getReward();
						MailFunction.getIns().sendMailWithFujianData2(hero.getId(),
								MailConst.ONERECHARGEBACK_KEYAWARD, new Object[] { MailConst.ONERECHARGEBACK_KEYAWARD },
								reward);
						array[1] = array[1] + 1;
					}
				}
			}
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(),
					"handleEnd configId:" + configId + " canNum:" + canNum + " gettedNum:" + gettedNum);
		}
	}

	@Override
	public ActivityData getActivityData(Hero hero, ActivityInfo activityInfo) {
		// TODO Auto-generated method stub
		OneRechargeBack OneRechargeBack = new OneRechargeBack(hero.getId(), activityInfo.getIndex(),
				activityInfo.getActId(), activityInfo.getPeriods());
		OneRechargeBack.setAwardMap(new HashMap<>());
		OneRechargeBack.setRecordList(new ArrayList<>());
		return OneRechargeBack;
	}


	@Override
	public Class<?> getActivityData() {
		// TODO Auto-generated method stub
		return OneRechargeBack.class;
	}

}
