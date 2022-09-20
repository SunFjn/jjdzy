package com.teamtop.system.exclusiveActivity.exOneRechargeBack;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import com.alibaba.fastjson.JSON;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.houtaiHttp.events.recharge.RechargeConst;
import com.teamtop.system.event.backstage.events.flowHero.FlowHeroEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.exclusiveActivity.AbsExActSystemEvent;
import com.teamtop.system.exclusiveActivity.AbsExclusiveActivityManager;
import com.teamtop.system.exclusiveActivity.ExclusiveActivityFunction;
import com.teamtop.system.exclusiveActivity.exOneRechargeBack.model.ExActOneRechargeBack;
import com.teamtop.system.exclusiveActivity.exOneRechargeBack.model.RewardInfo;
import com.teamtop.system.exclusiveActivity.model.ExclusiveActivityData;
import com.teamtop.system.exclusiveActivity.model.ExclusiveActivityModel;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.util.log.LogTool;

import excel.config.Config_shop_011;
import excel.config.Config_zshddbfl_315;
import excel.struct.Struct_shop_011;
import excel.struct.Struct_zshddbfl_315;

public class ExActOneRechargeBackManager extends AbsExclusiveActivityManager {

	private static ExActOneRechargeBackManager ins;

	private ExActOneRechargeBackManager() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized ExActOneRechargeBackManager getIns() {
		if (ins == null) {
			ins = new ExActOneRechargeBackManager();
		}
		return ins;
	}

	@Override
	public void openUI(Hero hero, int id) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
//			if (!ExclusiveActivityFunction.getIns().checkHeroExActOpen(hero, id)) {
//				return;
//			}
			ExclusiveActivityData exActData = hero.getExclusiveActivityData();
			ExActOneRechargeBack newOneReCharge = (ExActOneRechargeBack) exActData.getExActivityMap().get(id);
			int qs = newOneReCharge.getQs();
			Map<Integer, RewardInfo> rewardMap = newOneReCharge.getRewardMap();
			Map<Integer, Struct_zshddbfl_315> map = ExActOneRechargeBackSysCache.getQsMap().get(qs);
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
				Struct_zshddbfl_315 zshddbfl_315 = map.get(cz);
				int time = zshddbfl_315.getCs();
				int leftTime = time - canGet - alreadyGet;
				sendList.add(new Object[] { zshddbfl_315.getXh(), canGet, leftTime });
			}
			ExActOneRechargeBackSender.sendCmd_8360(hid, id, sendList.toArray());
		} catch (Exception e) {
			LogTool.error(e, ExActOneRechargeBackManager.class, hero.getId(), hero.getName(),
					"ExActOneRechargeBackManager openUI");
		}
	}

	/** 领取奖励 */
	public void getReward(Hero hero, int id, int index) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
//			if (!ExclusiveActivityFunction.getIns().checkHeroExActOpen(hero, id)) {
//				return;
//			}
			if(!ExclusiveActivityFunction.getIns().checkHasData(hero, id)) {
				return;
			}
			ExclusiveActivityData exActData = hero.getExclusiveActivityData();
			ExActOneRechargeBack newOneReCharge = (ExActOneRechargeBack) exActData.getExActivityMap().get(id);
			Struct_zshddbfl_315 struct_zshddbfl_315 = Config_zshddbfl_315.getIns().get(index);
			if (struct_zshddbfl_315 == null) {
				return;
			}
			int cz = struct_zshddbfl_315.getJe();
			Map<Integer, RewardInfo> rewardMap = newOneReCharge.getRewardMap();
			RewardInfo rewardInfo = rewardMap.get(cz);
			int canGet = rewardInfo.getCanGet();
			if (canGet < 1) {
				//没有可领取次数
				ExActOneRechargeBackSender.sendCmd_8362(hid, id, 0, 1, 0, 0);
				return;
			}
			rewardInfo.setCanGet(canGet - 1);
			int alreadyGet = rewardInfo.getAlreadyGet();
			rewardInfo.setAlreadyGet(alreadyGet + 1);
			int[][] reward = struct_zshddbfl_315.getJl();
			UseAddUtil.add(hero, reward, SourceGoodConst.CELEBRATION_ONERECARGE_BACK, UseAddUtil.getDefaultMail(), true);
			int time = struct_zshddbfl_315.getCs();
			int leftCanGet = rewardInfo.getCanGet();
			int leftTime = time - leftCanGet - rewardInfo.getAlreadyGet();
			ExActOneRechargeBackSender.sendCmd_8362(hid, id, 1, index, leftCanGet,
					leftTime);
			ExActOneRechargeBackFunction.getIns().updateRedPoint(hero, id);
			int actId = newOneReCharge.getActId();
			String usesys = hero.getTempData().getAccount().getUsesys();
			String rewardStr = JSON.toJSONString(reward);
			FlowHeroEvent.addHeroExActFlow(hero.getId(), hero.getZoneid(), hero.getName(), hero.getLevel(),
					hero.getVipLv(), id, actId, hero.getOpenid(), hero.getLoginIp(), 1, hero.getPf(), usesys,
					rewardStr, cz, 0, hero.getReincarnationLevel());
		} catch (Exception e) {
			LogTool.error(e, ExActOneRechargeBackManager.class, hero.getId(), hero.getName(),
					"ExActOneRechargeBackManager getReward");
		}
	}

	@Override
	public void handleOpenPub() {
		// TODO Auto-generated method stub

	}

	@Override
	public void heroActOpen(Hero hero, int id) {
		List<Integer> list = hero.getOneDayEveryIndexRechargeList();
		int size = list.size();
		for (int i = 0; i < size; i++) {
			Integer product_id = list.get(i);
			Struct_shop_011 struct_shop_011 = Config_shop_011.getIns().get(product_id);
			if (struct_shop_011.getType() == RechargeConst.YB) {
				int money = struct_shop_011.getRMB();
				rechargeHandle(hero, money, product_id, id);
			}
		}
	}

	@Override
	public void handleEndPub() {
		// TODO Auto-generated method stub

	}

	@Override
	public void heroActEnd(Hero hero, int id) {
		ExclusiveActivityData exActData = hero.getExclusiveActivityData();
		ExActOneRechargeBack newOneReCharge = (ExActOneRechargeBack) exActData.getExActivityMap().get(id);
		if (newOneReCharge == null) {
			return;
		}
		long hid = hero.getId();
		int mailId = MailConst.EXACT_ONERECHARGE_BACK_AWARD;
		int qs = newOneReCharge.getQs();
		Map<Integer, Struct_zshddbfl_315> map = ExActOneRechargeBackSysCache.getQsMap().get(qs);
		Map<Integer, RewardInfo> rewardMap = newOneReCharge.getRewardMap();
		Iterator<Entry<Integer, RewardInfo>> iterator = rewardMap.entrySet().iterator();
		Entry<Integer, RewardInfo> entry = null;
		int cz = 0;
		RewardInfo rewardInfo = null;
		Struct_zshddbfl_315 zshddbfl_315 = null;
		int[][] reward = null;
		int canGet = 0;
		for (; iterator.hasNext();) {
			entry = iterator.next();
			cz = entry.getKey();
			rewardInfo = entry.getValue();
			canGet = rewardInfo.getCanGet();
			if (canGet > 0) {
				zshddbfl_315 = map.get(cz);
				reward = zshddbfl_315.getJl();
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
	public ExclusiveActivityModel createExclusiveActivityModel(Hero hero, int id) {
		ExclusiveActivityData exActData = hero.getExclusiveActivityData();
		ExActOneRechargeBack newOneReCharge = (ExActOneRechargeBack) exActData.getExActivityMap().get(id);
		if (newOneReCharge == null) {
			newOneReCharge = new ExActOneRechargeBack();
			Map<Integer, RewardInfo> rewardMap = new HashMap<>();
			newOneReCharge.setRewardMap(rewardMap);
		}
		return newOneReCharge;
	}

	@Override
	public Class<?> getExclusiveActivityModel() {
		// TODO Auto-generated method stub
		return ExActOneRechargeBack.class;
	}

	@Override
	public AbsExActSystemEvent getSystemEvent() {
		return ExActOneRechargeBackSysEvent.getIns();
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id, int id) {
		try {
			// if (!ActivityFunction.getIns().checkHeroActOpen(hero,
			// ActivitySysId.CELEBRATION_ONERECHARGE_BACK)) {
			// return;
			// }
			ExclusiveActivityData exActData = hero.getExclusiveActivityData();
			ExActOneRechargeBack newOneReCharge = (ExActOneRechargeBack) exActData.getExActivityMap().get(id);
			if (newOneReCharge == null) {
				return;
			}
			int qs = newOneReCharge.getQs();
			Map<Integer, Struct_zshddbfl_315> map = ExActOneRechargeBackSysCache.getQsMap().get(qs);
			if (!map.containsKey(money)) {
				return;
			}
			Struct_zshddbfl_315 zshddbfl_315 = map.get(money);
			int time = zshddbfl_315.getCs();
			Map<Integer, RewardInfo> rewardMap = newOneReCharge.getRewardMap();
			RewardInfo rewardInfo = rewardMap.get(money);
			if (rewardInfo == null) {
				rewardInfo = new RewardInfo();
				rewardMap.put(money, rewardInfo);
			}
			int alreadyGet = rewardInfo.getAlreadyGet();
			int canGet = rewardInfo.getCanGet();
			if ((canGet + alreadyGet) >= time) {
				return;
			}
			rewardInfo.setCanGet(canGet + 1);
			ExActOneRechargeBackFunction.getIns().updateRedPoint(hero, id);
		} catch (Exception e) {
			LogTool.error(e, ExActOneRechargeBackManager.class, hero.getId(), hero.getName(),
					"ExActOneRechargeBackManager rechargeHandle, money=" + money + ", product_id=" + product_id);
		}
	}

	@Override
	public void consumeHandle(Hero hero, int consumeNum, int reason, int id) {
		// TODO Auto-generated method stub

	}

	@Override
	public void updateTable(Hero hero) {
		try {
			List<Struct_zshddbfl_315> sortList = Config_zshddbfl_315.getIns().getSortList();
			int size = sortList.size();
			List<Object[]> actDataList = new ArrayList<>();
			for (int i = 0; i < size; i++) {
				// I:序号I:期数I:金额[B:道具类型I:道具idI:道具数量]I:领取次数]单笔返利数据
				Struct_zshddbfl_315 struct = sortList.get(i);
				List<Object[]> itemList = new ArrayList<>();
				int[][] items = struct.getJl();
				for (int[] item : items) {
					itemList.add(new Object[] { item[0], item[1], item[2] });
				}
				actDataList.add(new Object[] { struct.getXh(), struct.getQs(), struct.getJe(), itemList.toArray(),
						struct.getCs() });
			}
			ExActOneRechargeBackSender.sendCmd_8364(hero.getId(), actDataList.toArray());
		} catch (Exception e) {
			LogTool.error(e, this, hero.getId(), hero.getName(), "ExActOneRechargeBackManager updateTable");
		}
	}

	@Override
	public void houtaiInitExcel() {
		ExActOneRechargeBackSysCache.houtaiInitExcel();
	}

	@Override
	public boolean checkExcel() {
		List<Struct_zshddbfl_315> sortList = Config_zshddbfl_315.getIns().getSortList();
		int mapSize = Config_zshddbfl_315.getIns().getMap().size();
		int size = sortList.size();
		if (size > 0 && size == mapSize) {
			return true;
		}
		return false;
	}

}
