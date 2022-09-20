package com.teamtop.system.exclusiveActivity.exTotalRecharge;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSON;
import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.event.backstage.events.flowHero.FlowHeroEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.exclusiveActivity.AbsExActSystemEvent;
import com.teamtop.system.exclusiveActivity.AbsExclusiveActivityManager;
import com.teamtop.system.exclusiveActivity.ExclusiveActivityFunction;
import com.teamtop.system.exclusiveActivity.exTotalRecharge.model.ExActTotalRechargeSys;
import com.teamtop.system.exclusiveActivity.model.ExclusiveActivityData;
import com.teamtop.system.exclusiveActivity.model.ExclusiveActivityModel;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.util.log.LogTool;

import excel.config.Config_zshdb_315;
import excel.config.Config_zshdljcz_315;
import excel.struct.Struct_zshdb_315;
import excel.struct.Struct_zshdljcz_315;


public class ExActTotalRechargeSysManager extends AbsExclusiveActivityManager {
	public static ExActTotalRechargeSysManager ins;

	public static ExActTotalRechargeSysManager getIns() {
		if (ins == null) {
			ins = new ExActTotalRechargeSysManager();
		}
		return ins;
	}

	public ExActTotalRechargeSysManager() {
		// TODO Auto-generated constructor stub
	}

	@Override
	public void openUI(Hero hero, int id) {
		// TODO Auto-generated method stub
		try {
//			if (!ExclusiveActivityFunction.getIns().checkHeroExActOpen(hero, id)) {
//				return;
//			}
			ExclusiveActivityData activityData = hero.getExclusiveActivityData();
			ExActTotalRechargeSys totalRechargeSys = (ExActTotalRechargeSys) activityData.getExActivityMap().get(id);
			Map<Integer, Integer> rewardMap = totalRechargeSys.getRewardMap();
			List<Object[]> rewardData = new ArrayList<>();
			int qs = totalRechargeSys.getQs();
			List<Struct_zshdljcz_315> list = ExActTotalRechargeCache.getQsListMap().get(qs);
			for (Struct_zshdljcz_315 Struct_zshdljcz_315 : list) {
				int index = Struct_zshdljcz_315.getId();
				Integer state = rewardMap.get(index);
				if (state == null) {
					state = GameConst.REWARD_0;
				}
				rewardData.add(new Object[] { index, state });
			}
			ExActTotalRechargeSysSender.sendCmd_8300(hero.getId(), id, totalRechargeSys.getRewardNum(), rewardData.toArray());
		} catch (Exception e) {
			LogTool.error(e, ExActTotalRechargeSysManager.class, hero.getId(), hero.getName(),
					"TotalRechargeSysManager openUI");
		}
	}

	/**
	 * 领取奖励
	 * @param hero
	 * @param index 编号
	 * @param id 活动唯一id
	 */
	public void getReward(Hero hero, int id, int index) {
		// TODO Auto-generated method stub
		try {
//			if (!ExclusiveActivityFunction.getIns().checkHeroExActOpen(hero, id)) {
//				return;
//			}
			if(!ExclusiveActivityFunction.getIns().checkHasData(hero, id)) {
				return;
			}
			ExclusiveActivityData activityData = hero.getExclusiveActivityData();
			ExActTotalRechargeSys totalRechargeSys = (ExActTotalRechargeSys) activityData.getExActivityMap().get(id);
			if (!totalRechargeSys.getRewardMap().containsKey(index)) {
				return;
			}
			int qs = totalRechargeSys.getQs();
			Map<Integer, Struct_zshdljcz_315> map = ExActTotalRechargeCache.getQsMap().get(qs);
			int state = totalRechargeSys.getRewardMap().get(index);
			if (state == GameConst.REWARD_1) {
				Struct_zshdljcz_315 struct_zshdljcz_315 = map.get(index);
				int[][] reward = struct_zshdljcz_315.getReward();
				totalRechargeSys.getRewardMap().put(index, GameConst.REWARD_2);
				UseAddUtil.add(hero, reward, SourceGoodConst.TOTALRECHARGESYS, UseAddUtil.getDefaultMail(), true);
				ExActTotalRechargeSysSender.sendCmd_8302(hero.getId(), id, index, GameConst.REWARD_2);
				int actId = totalRechargeSys.getActId();
				String usesys = hero.getTempData().getAccount().getUsesys();
				String rewardStr = JSON.toJSONString(reward);
				FlowHeroEvent.addHeroExActFlow(hero.getId(), hero.getZoneid(), hero.getName(), hero.getLevel(),
						hero.getVipLv(), id, actId, hero.getOpenid(), hero.getLoginIp(), 1, hero.getPf(), usesys,
						rewardStr, struct_zshdljcz_315.getCoin(), 0, hero.getReincarnationLevel());
			}
			ExActTotalRechargeSysFunction.getIns().updateRedPoint(hero, id);
		} catch (Exception e) {
			LogTool.error(e, ExActTotalRechargeSysManager.class, "TotalRechargeSysManager getreward has wrong");
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
	public AbsExActSystemEvent getSystemEvent() {
		return ExActTotalRechargeSysEvent.getIns();
	}

	@Override
	public void heroActOpen(Hero hero, int id) {
		int oneDayRecharge = hero.getOneDayRecharge();
		ExActTotalRechargeSysFunction.getIns().recharge(hero, oneDayRecharge, 0, id);
	}

	@Override
	public void heroActEnd(Hero hero, int id) {
		// 补发邮件奖励
//		int day = Config_xitong_001.getIns().get(SystemIdConst.OTHER_TOTAL_RECHARGE).getDay();
//		int betweenOpen = TimeDateUtil.betweenOpen();
//		if (betweenOpen >= day % 1000 + 1) {
			ExclusiveActivityData activityData = hero.getExclusiveActivityData();
			ExActTotalRechargeSys totalRechargeSys = (ExActTotalRechargeSys) activityData.getExActivityMap().get(id);
			HashMap<Integer, Integer> rewardMap = totalRechargeSys.getRewardMap();
			int qs = totalRechargeSys.getQs();
			Map<Integer, Struct_zshdljcz_315> map = ExActTotalRechargeCache.getQsMap().get(qs);
			for (int rewardKey : rewardMap.keySet()) {
				int rewardSate = rewardMap.get(rewardKey);
				int[][] reward = map.get(rewardKey).getReward();
				if (rewardSate == GameConst.REWARD_1) {
					rewardMap.put(rewardKey, GameConst.REWARD_2);
					MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.EXACT_TOTAL_RECHARGE_AWARD,
							new Object[] { MailConst.EXACT_TOTAL_RECHARGE_AWARD }, reward);
				}
			}
//		}
	}

	@Override
	public ExclusiveActivityModel createExclusiveActivityModel(Hero hero, int id) {
		ExclusiveActivityData activityData = hero.getExclusiveActivityData();
		ExActTotalRechargeSys totalRechargeSys = (ExActTotalRechargeSys) activityData.getExActivityMap().get(id);
		Struct_zshdb_315 struct_zshdb_315 = Config_zshdb_315.getIns().get(id);
		int qs = struct_zshdb_315.getQs();
		if (totalRechargeSys == null) {
			totalRechargeSys = new ExActTotalRechargeSys();
			totalRechargeSys.setHid(hero.getId());
			HashMap<Integer, Integer> rewardMap = new HashMap<Integer, Integer>();
			totalRechargeSys.setQs(qs);
			totalRechargeSys.setRewardMap(rewardMap);
		}
		return totalRechargeSys;
	}

	@Override
	public Class<?> getExclusiveActivityModel() {
		return ExActTotalRechargeSys.class;
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id, int id) {
		ExActTotalRechargeSysFunction.getIns().recharge(hero, money, product_id, id);
	}

	@Override
	public void consumeHandle(Hero hero, int consumeNum, int reason, int id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void updateTable(Hero hero) {
		try {
			List<Struct_zshdljcz_315> sortList = Config_zshdljcz_315.getIns().getSortList();
			int size = sortList.size();
			List<Object[]> actDataList = new ArrayList<>();
			for (int i = 0; i < size; i++) {
				// [I:序号I:期数I:额度[B:道具类型I:道具idI:道具数量]]累计充值数据
				Struct_zshdljcz_315 struct = sortList.get(i);
				List<Object[]> itemList = new ArrayList<>();
				int[][] items = struct.getReward();
				for (int[] item : items) {
					itemList.add(new Object[] { item[0], item[1], item[2] });
				}
				actDataList.add(new Object[] { struct.getId(), struct.getQs(), struct.getCoin(), itemList.toArray() });
			}
			ExActTotalRechargeSysSender.sendCmd_8306(hero.getId(), actDataList.toArray());
		} catch (Exception e) {
			LogTool.error(e, this, hero.getId(), hero.getName(), "ExActTotalRechargeSysManager updateTable");
		}
	}

	@Override
	public void houtaiInitExcel() {
		ExActTotalRechargeCache.houtaiInitExcel();
	}

	@Override
	public boolean checkExcel() {
		List<Struct_zshdljcz_315> sortList = Config_zshdljcz_315.getIns().getSortList();
		int mapSize = Config_zshdljcz_315.getIns().getMap().size();
		int size = sortList.size();
		if (size > 0 && size == mapSize) {
			if (ExActTotalRechargeCache.getQsListMap().size() > 0) {
				return true;
			}
		}
		return false;
	}

}
