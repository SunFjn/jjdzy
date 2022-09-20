package com.teamtop.system.openDaysSystem.shaozhuOneRechargeBack;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.houtaiHttp.events.recharge.RechargeConst;
import com.teamtop.system.bag.BagFunction;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.openDaysSystem.AbsOpenDaysManager;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;
import com.teamtop.system.openDaysSystem.model.AbsOpenDaysSystemModel;
import com.teamtop.system.openDaysSystem.model.HeroOpenDaysSysData;
import com.teamtop.system.openDaysSystem.shaozhuOneRechargeBack.model.ShaoZhuOneRechargeBack;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventUtil;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_scdnfl_272;
import excel.config.Config_shop_011;
import excel.struct.Struct_scdnfl_272;
import excel.struct.Struct_shop_011;

public class ShaoZhuOneRechargeBackManager extends AbsOpenDaysManager {
	private static volatile ShaoZhuOneRechargeBackManager ins = null;

	public static ShaoZhuOneRechargeBackManager getIns() {
		if (ins == null) {
			synchronized (ShaoZhuOneRechargeBackManager.class) {
				if (ins == null) {
					ins = new ShaoZhuOneRechargeBackManager();
				}
			}
		}
		return ins;
	}

	private ShaoZhuOneRechargeBackManager() {
	}

	@Override
	public void openUI(Hero hero) {
		// TODO Auto-generated method stub
		if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.SHAOZHU_ONERECHARGEBACK)) {
			return;
		}
		ShaoZhuOneRechargeBack shaoZhuOneRechargeBack = ShaoZhuOneRechargeBackFunction.getIns().getModel(hero);
		Map<Integer, Integer[]> awardMap = shaoZhuOneRechargeBack.getAwardMap();
		List<Struct_scdnfl_272> sortList = Config_scdnfl_272.getIns().getSortList();
		int size = sortList.size();
		List<Object> awardList = new ArrayList<>();
		// 背包中钥匙总数
		int totalKeyNum = 0;
		for (int i = 0; i < size; i++) {
			Struct_scdnfl_272 struct_scdnfl_272 = sortList.get(i);
			int id = struct_scdnfl_272.getId();
			Integer[] array = Optional.ofNullable(awardMap).map(map -> map.get(id)).orElse(new Integer[] { 0, 0 });
			int keyId = struct_scdnfl_272.getReward()[0][1];
			int keyNum = BagFunction.getIns().getGoodsNumBySysId(hero.getId(), keyId);
			int canNum = array[0];
			int gettedNum = array[1];
			if (canNum == 0) {
				// 不可领取
				awardList.add(new Object[] { struct_scdnfl_272.getId(), ShaoZhuOneRechargeBackConst.NOT_REACH, keyNum,
						array[1] });
			} else if (gettedNum >= canNum) {
				// 已领完
				awardList.add(new Object[] { struct_scdnfl_272.getId(), ShaoZhuOneRechargeBackConst.GETTED, keyNum,
						array[1] });
			} else {
				// 可领取
				awardList.add(new Object[] { struct_scdnfl_272.getId(), ShaoZhuOneRechargeBackConst.CAN_GET, keyNum,
						array[1] });
			}
			totalKeyNum += keyNum;
		}
		ShaoZhuOneRechargeBackSender.sendCmd_5642(hero.getId(), awardList.toArray(), totalKeyNum);
	}

	/**
	 * 领取奖励 5643
	 * 
	 * @param hero
	 * @param awardId 索引id
	 */
	public void getAward(Hero hero, int awardId) {
		// TODO Auto-generated method stub
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.SHAOZHU_ONERECHARGEBACK)) {
				return;
			}
			Struct_scdnfl_272 struct_scdnfl_272 = Config_scdnfl_272.getIns().get(awardId);
			if (struct_scdnfl_272 == null) {
				// 没有该奖励
				ShaoZhuOneRechargeBackSender.sendCmd_5644(hero.getId(), ShaoZhuOneRechargeBackConst.FAILURE_NOT_AWARD,
						awardId, 0, 0);
				return;
			}
			ShaoZhuOneRechargeBack shaoZhuOneRechargeBack = ShaoZhuOneRechargeBackFunction.getIns().getModel(hero);
			Map<Integer, Integer[]> awardMap = shaoZhuOneRechargeBack.getAwardMap();
			Integer[] array = Optional.ofNullable(awardMap).map(map -> map.get(awardId)).orElse(new Integer[] { 0, 0 });
			int canNum = array[0];
			int gettedNum = array[1];
			if (canNum == 0) {
				// 不可领取
				ShaoZhuOneRechargeBackSender.sendCmd_5644(hero.getId(), ShaoZhuOneRechargeBackConst.FAILURE_NOT_REACH,
						awardId, 0, 0);
				return;
			}
			if (gettedNum >= canNum) {
				// 奖励已领完
				ShaoZhuOneRechargeBackSender.sendCmd_5644(hero.getId(), ShaoZhuOneRechargeBackConst.FAILURE_GETTED,
						awardId, 0, 0);
				return;
			}
			// 已领数量+1
			array[1] = gettedNum + 1;
			int[][] reward = struct_scdnfl_272.getReward();
			// 发放奖励
			UseAddUtil.add(hero, reward, SourceGoodConst.SHAOZHU_ONERECHARGEBACK_KEYGET, UseAddUtil.getDefaultMail(),
					true);
			// 背包中该钥匙数量
			int keyNum = BagFunction.getIns().getGoodsNumBySysId(hero.getId(), reward[0][1]);
			int isGetted = 1;
			if (array[1] >= canNum) {
				isGetted = 2;
			}
			ShaoZhuOneRechargeBackSender.sendCmd_5644(hero.getId(), ShaoZhuOneRechargeBackConst.SUCCESS, awardId,
					keyNum, isGetted);
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
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.SHAOZHU_ONERECHARGEBACK)) {
				return;
			}
			Integer[] minIdAndTotalArray = getMinIdAndTotalArray(hero);
			minId = minIdAndTotalArray[0];
			int totalKeyNum = minIdAndTotalArray[1];
			if (minId == 0) {
				return;
			}
//		Integer minIndex = ShaoZhuOneRechargeBackCache.getKeyIdToIndexMap().get(minId);
			ProbabilityEventModel probabilityEventModel = ShaoZhuOneRechargeBackCache.getIndexToProbabilityMap()
					.get(minId);
			Struct_scdnfl_272 struct_scdnfl_272 = Config_scdnfl_272.getIns().get(minId);
			int[][] reward = struct_scdnfl_272.getReward();
			if (!UseAddUtil.canUse(hero, reward)) {
				// 钥匙数量不足
				ShaoZhuOneRechargeBackSender.sendCmd_5646(hero.getId(), ShaoZhuOneRechargeBackConst.FAILURE_NOT_KEY, 0,
						0, 0, 0);
				return;
			}
			// 消耗钥匙
			UseAddUtil.use(hero, reward, SourceGoodConst.SHAOZHU_ONERECHARGEBACK_KEYUSE, true);
			int[][] yb = struct_scdnfl_272.getYb();
			ShaoZhuOneRechargeBack shaoZhuOneRechargeBack = ShaoZhuOneRechargeBackFunction.getIns().getModel(hero);
			List<Integer[]> recordList = shaoZhuOneRechargeBack.getRecordList();
			Integer[] array = (Integer[]) ProbabilityEventUtil.getEventByProbability(probabilityEventModel);
			beiId = array[0];
			bei = array[1];
			recordList.add(new Integer[] { minId, bei });
			double beiDou = bei / 100.0;
			int[][] copyYb = CommonUtil.copyArrayAndNumFloor(yb, beiDou);
			// 发放奖励
			UseAddUtil.add(hero, copyYb, SourceGoodConst.SHAOZHU_ONERECHARGEBACK_TURNREWARD,
					UseAddUtil.getDefaultMail(), true);
			// 背包中该钥匙数量
			int keyNum = BagFunction.getIns().getGoodsNumBySysId(hero.getId(), reward[0][1]);
			ShaoZhuOneRechargeBackSender.sendCmd_5646(hero.getId(), ShaoZhuOneRechargeBackConst.SUCCESS, beiId,
					totalKeyNum - 1, minId, keyNum);
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(),
					"getAward minId:" + minId + " beiId:" + beiId + " bei:" + bei);
		}
	}

	public Integer[] getMinIdAndTotalArray(Hero hero) {
		int minId = 0;
		int totalKeyNum = 0;
		List<Struct_scdnfl_272> sortList = Config_scdnfl_272.getIns().getSortList();
		int size = sortList.size();
		for (int i = 0; i < size; i++) {
			Struct_scdnfl_272 struct_scdnfl_272 = sortList.get(i);
			int[][] reward = struct_scdnfl_272.getReward();
			int keyNum = BagFunction.getIns().getGoodsNumBySysId(hero.getId(), reward[0][1]);
			int id = struct_scdnfl_272.getId();
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
		if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.SHAOZHU_ONERECHARGEBACK)) {
			return;
		}
		ShaoZhuOneRechargeBack shaoZhuOneRechargeBack = ShaoZhuOneRechargeBackFunction.getIns().getModel(hero);
		List<Integer[]> recordList = shaoZhuOneRechargeBack.getRecordList();
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
		ShaoZhuOneRechargeBackSender.sendCmd_5648(hero.getId(), recordArrayList.toArray());
	}

	@Override
	public void handleOpenPub() {
		// TODO Auto-generated method stub

	}

	@Override
	public void handleOpen(Hero hero, int uid) {
		// TODO Auto-generated method stub
		// 玩家未开启活动,但只要是在活动期间充值就要计算.注意外网当天更新前的充值也要记录
		List<Integer> list = hero.getOneDayEveryIndexRechargeList();
		int size = list.size();
		for (int i = 0; i < size; i++) {
			Integer product_id = list.get(i);
			Struct_shop_011 struct_shop_011 = Config_shop_011.getIns().get(product_id);
			if (struct_shop_011.getType() == RechargeConst.YB) {
				int money = struct_shop_011.getRmb();
				ShaoZhuOneRechargeBackFunction.getIns().rechargeYB(hero, money, product_id);
			}
		}
	}

	@Override
	public void handleEndPub() {
		// TODO Auto-generated method stub

	}

	@Override
	public void handleEnd(Hero hero, int uid) {
		// TODO Auto-generated method stub
		int configId = 0;
		int canNum = 0;
		int gettedNum = 0;
		try {
			ShaoZhuOneRechargeBack model = (ShaoZhuOneRechargeBack) ShaoZhuOneRechargeBackManager.getIns()
					.getSystemModel(hero, uid);
			Map<Integer, Integer[]> awardMap = model.getAwardMap();
			for (Entry<Integer, Integer[]> entry : awardMap.entrySet()) {
				Integer[] array = entry.getValue();
				configId = entry.getKey();
				Struct_scdnfl_272 struct_scdnfl_272 = Config_scdnfl_272.getIns().get(configId);
				canNum = array[0];
				gettedNum = array[1];
				int restNum = canNum - gettedNum;
				if (restNum > 0) {
					// 有可领取数量发邮件奖励
					for (int i = 0; i < restNum; i++) {
						int[][] reward = struct_scdnfl_272.getReward();
						MailFunction.getIns().sendMailWithFujianData2(hero.getId(),
								MailConst.SHAOZHU_ONERECHARGEBACK_KEYAWARD,
								new Object[] { MailConst.SHAOZHU_ONERECHARGEBACK_KEYAWARD }, reward);
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
	public AbsOpenDaysSystemModel getSystemModel(Hero hero, int uid) {
		// TODO Auto-generated method stub
		HeroOpenDaysSysData heroOpenDaysSysData = hero.getHeroOpenDaysSysData();
		ShaoZhuOneRechargeBack shaoZhuOneRechargeBack = (ShaoZhuOneRechargeBack) heroOpenDaysSysData.getOpSysDataMap()
				.get(uid);
		if (shaoZhuOneRechargeBack == null) {
			shaoZhuOneRechargeBack = new ShaoZhuOneRechargeBack();
			shaoZhuOneRechargeBack.setAwardMap(new HashMap<>());
			shaoZhuOneRechargeBack.setRecordList(new ArrayList<>());
		}
		return shaoZhuOneRechargeBack;
	}

	@Override
	public Class<?> getSystemModel() {
		// TODO Auto-generated method stub
		return ShaoZhuOneRechargeBack.class;
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		// TODO Auto-generated method stub
		return ShaoZhuOneRechargeBackEvent.getIns();
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		// TODO Auto-generated method stub
		ShaoZhuOneRechargeBackFunction.getIns().rechargeYB(hero, money, product_id);
	}

	@Override
	public void consumeHandle(Hero hero, int consumeNum, int reason) {
		// TODO Auto-generated method stub

	}

}
