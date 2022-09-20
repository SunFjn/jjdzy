package com.teamtop.system.exclusiveActivity.exOverCallbackYBSe;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import com.alibaba.fastjson.JSON;
import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.event.backstage.events.flowHero.FlowHeroEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.exclusiveActivity.AbsExclusiveActivityManager;
import com.teamtop.system.exclusiveActivity.ExclusiveActivityFunction;
import com.teamtop.system.exclusiveActivity.exOverCallbackYBSe.model.ExActOverCallbackYBSe;
import com.teamtop.system.exclusiveActivity.model.ExclusiveActivityData;
import com.teamtop.system.exclusiveActivity.model.ExclusiveActivityModel;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.util.log.LogTool;

import excel.config.Config_zshdybfl_315;
import excel.struct.Struct_zshdybfl_315;

public class ExActOverCallbackYBSeManager extends AbsExclusiveActivityManager {

	private static ExActOverCallbackYBSeManager ins;

	private ExActOverCallbackYBSeManager() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized ExActOverCallbackYBSeManager getIns() {
		if (ins == null) {
			ins = new ExActOverCallbackYBSeManager();
		}
		return ins;
	}

	@Override
	public void openUI(Hero hero, int id) {
		if (hero == null) {
			return;
		}
		try {
//			if (!ExclusiveActivityFunction.getIns().checkHeroExActOpen(hero, id)) {
//				return;
//			}
			ExclusiveActivityData activityData = hero.getExclusiveActivityData();
			ExActOverCallbackYBSe overCallbackYBSe = (ExActOverCallbackYBSe) activityData.getExActivityMap().get(id);
			Map<Integer, Integer> awardStateMap = overCallbackYBSe.getAwardStateMap();
			ArrayList<Object> arrayList = new ArrayList<Object>();
			int qs = overCallbackYBSe.getQs();
			Map<Integer, Struct_zshdybfl_315> map = ExActOverCallbackYBSeCache.getYbConfigMap().get(qs);
			Iterator<Integer> iterator = map.keySet().iterator();
			for (; iterator.hasNext();) {
				int index = iterator.next();
				int state = ExActOverCallbackYBSeConst.NOT_REACH;
				if (awardStateMap.containsKey(index)) {
					state = awardStateMap.get(index);
				}
				arrayList.add(new Object[] { index, state });
			}
			ExActOverCallbackYBSeSender.sendCmd_8330(hero.getId(), id, overCallbackYBSe.getConsumeYBNum(),
					arrayList.toArray());
		} catch (Exception e) {
			LogTool.error(e, ExActOverCallbackYBSeManager.class, hero.getId(), hero.getName(), "OverCallbackYBSeManager openUI");
		}
	}
	
	/**
	 * 领取奖励
	 * @param hero
	 * @param index 索引id
	 */
	public void getRward(Hero hero, int id, int index) {
		if (hero == null) {
			return;
		}
		try {
//			if (!ExclusiveActivityFunction.getIns().checkHeroExActOpen(hero, id)) {
//				return;
//			}
			if(!ExclusiveActivityFunction.getIns().checkHasData(hero, id)) {
				return;
			}
			ExclusiveActivityData activityData = hero.getExclusiveActivityData();
			ExActOverCallbackYBSe overCallbackYBSe = (ExActOverCallbackYBSe) activityData.getExActivityMap().get(id);
			Map<Integer, Integer> awardStateMap = overCallbackYBSe.getAwardStateMap();
			Integer state = awardStateMap.get(index);
			if (state == null) {// 没有奖励
				ExActOverCallbackYBSeSender.sendCmd_8332(hero.getId(), id, 0, ExActOverCallbackYBSeConst.FAILURE_NOT_AWARD);
				return;
			}
			if (state == ExActOverCallbackYBSeConst.NOT_REACH) {// 不可领取
				ExActOverCallbackYBSeSender.sendCmd_8332(hero.getId(), id, 0, ExActOverCallbackYBSeConst.FAILURE_NOT_REACH);
				return;
			}
			if (state == ExActOverCallbackYBSeConst.GETTED) {// 不可重复领取
				ExActOverCallbackYBSeSender.sendCmd_8332(hero.getId(),  id, 0, ExActOverCallbackYBSeConst.FAILURE_NOT_REP);
				return;
			}
			int qs = overCallbackYBSe.getQs();
			Map<Integer, Struct_zshdybfl_315> map = ExActOverCallbackYBSeCache.getYbConfigMap().get(qs);
			awardStateMap.put(index, ExActOverCallbackYBSeConst.GETTED);
			Struct_zshdybfl_315 struct_zshdybfl_315 = map.get(index);
			int[][] award = struct_zshdybfl_315.getReward();
			UseAddUtil.add(hero, award, SourceGoodConst.OVERCALLBACKCONST_YB_AWARD, UseAddUtil.getDefaultMail(), true); // 发放奖励
			ExActOverCallbackYBSeSender.sendCmd_8332(hero.getId(), id, index, ExActOverCallbackYBSeConst.SUCCESS);
			ExActOverCallbackYBSeFunction.getIns().updateRedPoint(hero, id);
			int actId = overCallbackYBSe.getActId();
			String usesys = hero.getTempData().getAccount().getUsesys();
			String rewardStr = JSON.toJSONString(award);
			FlowHeroEvent.addHeroExActFlow(hero.getId(), hero.getZoneid(), hero.getName(), hero.getLevel(),
					hero.getVipLv(), id, actId, hero.getOpenid(), hero.getLoginIp(), 1, hero.getPf(), usesys,
					rewardStr, struct_zshdybfl_315.getXh()[0][2], 0, hero.getReincarnationLevel());
		} catch (Exception e) {
			LogTool.error(e, ExActOverCallbackYBSeManager.class, hero.getId(), hero.getName(), "OverCallbackYBSeManager ");
		}
	}

	@Override
	public void handleOpenPub() {
		// TODO Auto-generated method stub

	}

	@Override
	public void handleEndPub() {
		// TODO Auto-generated method stub

	}

	@Override
	public ExActOverCallbackYBSeEvent getSystemEvent() {
		return ExActOverCallbackYBSeEvent.getIns();
	}

	@Override
	public void heroActOpen(Hero hero, int id) {
		ExclusiveActivityData activityData = hero.getExclusiveActivityData();
		ExActOverCallbackYBSe overCallbackYBSe = (ExActOverCallbackYBSe) activityData.getExActivityMap().get(id);
		if (overCallbackYBSe != null) {
			ExActOverCallbackYBSeFunction.getIns().updateAwardStateList(hero, overCallbackYBSe, id);
		}
	}

	@Override
	public void heroActEnd(Hero hero, int id) {
		ExclusiveActivityData activityData = hero.getExclusiveActivityData();
		ExActOverCallbackYBSe overCallbackYBSe = (ExActOverCallbackYBSe) activityData.getExActivityMap().get(id);
		Map<Integer, Integer> awardStateMap = overCallbackYBSe.getAwardStateMap();
		Iterator<Entry<Integer, Integer>> iterator = awardStateMap.entrySet().iterator();
		Entry<Integer, Integer> entry = null;
		for (; iterator.hasNext();) {
			entry = iterator.next();
			int index = entry.getKey();
			int state = entry.getValue();
			if (state == ExActOverCallbackYBSeConst.CAN_GET) {
				entry.setValue(ExActOverCallbackYBSeConst.GETTED);
				int[][] reward = Config_zshdybfl_315.getIns().get(index).getReward();
				MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.EXACT_YB_RECHARGE_AWARD,
						new Object[] { MailConst.EXACT_YB_RECHARGE_AWARD }, reward);
			}
		}
	}

	@Override
	public ExclusiveActivityModel createExclusiveActivityModel(Hero hero, int id) {
		ExclusiveActivityData activityData = hero.getExclusiveActivityData();
		ExActOverCallbackYBSe overCallbackYBSe = (ExActOverCallbackYBSe) activityData.getExActivityMap().get(id);
		if (overCallbackYBSe == null) {
			overCallbackYBSe = new ExActOverCallbackYBSe();
			Map<Integer, Integer> awardStateMap = new HashMap<>();
			overCallbackYBSe.setAwardStateMap(awardStateMap);
			int oneDayConsume = hero.getOneDayConsume();
			overCallbackYBSe.setConsumeYBNum(oneDayConsume);
		}
		return overCallbackYBSe;
	}

	@Override
	public Class<?> getExclusiveActivityModel() {
		return ExActOverCallbackYBSe.class;
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id, int id) {
		// TODO Auto-generated method stub

	}

	@Override
	public void consumeHandle(Hero hero, int consumeNum, int reason, int id) {
		ExActOverCallbackYBSeFunction.getIns().addconsumeYBNum(hero, GameConst.YUANBAO, 0, consumeNum, id);

	}

	@Override
	public void updateTable(Hero hero) {
		try {
			List<Struct_zshdybfl_315> sortList = Config_zshdybfl_315.getIns().getSortList();
			int size = sortList.size();
			List<Object[]> actDataList = new ArrayList<>();
			for (int i = 0; i < size; i++) {
				// I:索引idI:期数[B:道具类型I:道具idI:道具数量][B:道具类型I:道具idI:道具数量]]元宝返利数据
				Struct_zshdybfl_315 struct = sortList.get(i);
				List<Object[]> costList = new ArrayList<>();
				int[][] costs = struct.getXh();
				for (int[] cost : costs) {
					costList.add(new Object[] { cost[0], cost[1], cost[2] });
				}
				List<Object[]> itemList = new ArrayList<>();
				int[][] items = struct.getReward();
				for (int[] item : items) {
					itemList.add(new Object[] { item[0], item[1], item[2] });
				}
				actDataList.add(new Object[] { struct.getId(), struct.getQs(), costList.toArray(), itemList.toArray() });
			}
			ExActOverCallbackYBSeSender.sendCmd_8334(hero.getId(), actDataList.toArray());
		} catch (Exception e) {
			LogTool.error(e, this, hero.getId(), hero.getName(), "ExActOverCallbackYBSeManager updateTable");
		}
	}

	@Override
	public void houtaiInitExcel() {
		ExActOverCallbackYBSeCache.houtaiInitExcel();
	}

	@Override
	public boolean checkExcel() {
		List<Struct_zshdybfl_315> sortList = Config_zshdybfl_315.getIns().getSortList();
		int mapSize = Config_zshdybfl_315.getIns().getMap().size();
		int size = sortList.size();
		if (size > 0 && size == mapSize) {
			return true;
		}
		return false;
	}

}
