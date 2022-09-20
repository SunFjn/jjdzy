package com.teamtop.system.exclusiveActivity.exOneRecharge;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

import com.alibaba.fastjson.JSON;
import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.houtaiHttp.events.recharge.RechargeConst;
import com.teamtop.system.event.backstage.events.flowHero.FlowHeroEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.exclusiveActivity.AbsExActSystemEvent;
import com.teamtop.system.exclusiveActivity.AbsExclusiveActivityManager;
import com.teamtop.system.exclusiveActivity.ExclusiveActivityFunction;
import com.teamtop.system.exclusiveActivity.model.ExclusiveActivityData;
import com.teamtop.system.exclusiveActivity.model.ExclusiveActivityModel;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.util.log.LogTool;

import excel.config.Config_shop_011;
import excel.config.Config_zshdb_315;
import excel.config.Config_zshddbcz_315;
import excel.struct.Struct_shop_011;
import excel.struct.Struct_zshdb_315;
import excel.struct.Struct_zshddbcz_315;


public class ExActOneRechargeManager extends AbsExclusiveActivityManager {
	
	public static ExActOneRechargeManager ins;
	public static synchronized ExActOneRechargeManager getIns() {
		if(ins == null){
			ins = new ExActOneRechargeManager();
		}
		return ins;
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id, int id) {
		try {
//			if (!ExclusiveActivityFunction.getIns().checkHeroExActOpen(hero, id)) {
//				return;
//			}
			if(!ExclusiveActivityFunction.getIns().checkHasData(hero, id)) {
				return;
			}
			ExclusiveActivityData activityData = hero.getExclusiveActivityData();
			ExActOneRecharge newOneRecharge = (ExActOneRecharge) activityData.getExActivityMap().get(id);

			if (newOneRecharge.getHasRewardNum() == null) {
				// 新版本 重新初始化活动数据 把老数据放入新活动数据中
				// 改版
				HashMap<Integer, List<Integer>> hasRewardNum = new HashMap<>();
				HashMap<Integer, HashMap<Integer, Integer>> reward = new HashMap<>();
				newOneRecharge.setReward(reward);
				newOneRecharge.setHasRewardNum(hasRewardNum);

				for (Struct_zshddbcz_315 zshddbcz_315 : Config_zshddbcz_315.getIns().getSortList()) {
					int cishu = zshddbcz_315.getCs();
					int xh = zshddbcz_315.getXh();
					if (!newOneRecharge.getReward().containsKey(xh)) {
						HashMap<Integer, Integer> hashMap = new HashMap<Integer, Integer>();
						newOneRecharge.getReward().put(xh, hashMap);
					}
					HashMap<Integer, Integer> hashMap = newOneRecharge.getReward().get(xh);
					for (int i = 0; i < cishu; i++) {
						if (!hashMap.containsKey(i)) {
							hashMap.put(i, GameConst.REWARD_0);
						}
					}
					if (newOneRecharge.getHasRewardNum().get(xh) == null) {
						// Integer[] getRewardNum = new Integer[] { 0, 0 };
						List<Integer> getRewardNum = new ArrayList<Integer>();
						getRewardNum.add(0);
						getRewardNum.add(0);
						newOneRecharge.getHasRewardNum().put(xh, getRewardNum);
					}
				}

			}
			int qs = newOneRecharge.getQs();
			ConcurrentHashMap<Integer, Struct_zshddbcz_315> concurrentHashMap = ExActOneRechargeCache.NewOneReChargeHashMap
					.get(qs);
			for (Struct_zshddbcz_315 zshddbcz_315 : concurrentHashMap.values()) {
				int cishu = zshddbcz_315.getCs();
				int xh = zshddbcz_315.getXh();
				List<Integer> integers = newOneRecharge.getHasRewardNum().get(xh);
				Integer canNum = integers.get(0);
				Integer hasCt = integers.get(1);
				HashMap<Integer, Integer> rewardhashmap = newOneRecharge.getReward().get(xh);
				for (int i = 0; i < cishu; i++) {
					if (!rewardhashmap.containsKey(i)) {
						rewardhashmap.put(i, GameConst.REWARD_0);
					}
					if (rewardhashmap.get(i) == GameConst.REWARD_0 && money == zshddbcz_315.getJe()) {
						rewardhashmap.put(i, GameConst.REWARD_1);
						canNum = canNum + 1;
						integers.set(0, canNum);
						ExActOneRechargeSender.sendCmd_8102(hero.getId(), id, zshddbcz_315.getXh(), canNum, hasCt);
						return;
					}
				}
			}
			ExActOneRechargeFunction.getIns().updateRedPoint(hero, id);
		} catch (Exception e) {
			LogTool.error(e, ExActOneRechargeManager.class, hero.getId(), hero.getName(), "rechargeHandle has wrong");
		}
	}

	@Override
	public AbsExActSystemEvent getSystemEvent() {
		return ExActOneRechargeEvent.getIns();
	}

	@Override
	public void openUI(Hero hero, int id) {
		try {
//			if (!ExclusiveActivityFunction.getIns().checkHeroExActOpen(hero, id)) {
//				return;
//			}
			ExclusiveActivityData activityData = hero.getExclusiveActivityData();
			ExActOneRecharge newOneRecharge = (ExActOneRecharge) activityData.getExActivityMap().get(id);
			
			if (newOneRecharge.getHasRewardNum()==null) {
				//新版本 重新初始化活动数据 把老数据放入新活动数据中
				//改版
				HashMap<Integer, List<Integer>> hasRewardNum = new HashMap<>();
				HashMap<Integer,HashMap<Integer,Integer>> reward=new HashMap<>();
				newOneRecharge.setReward(reward);
				newOneRecharge.setHasRewardNum(hasRewardNum);
				
				for (Struct_zshddbcz_315 zshddbcz_315 : Config_zshddbcz_315.getIns().getSortList()) {
					int cishu = zshddbcz_315.getCs();
					int xh = zshddbcz_315.getXh();
					if (!newOneRecharge.getReward().containsKey(xh)) {
						HashMap<Integer, Integer> hashMap = new HashMap<Integer,Integer>();
						newOneRecharge.getReward().put(xh, hashMap);
					}
					HashMap<Integer, Integer> hashMap = newOneRecharge.getReward().get(xh);
					for (int i = 0; i <cishu; i++) {
						if(!hashMap.containsKey(i)) {
							hashMap.put(i,GameConst.REWARD_0);
						}
					}
					if (newOneRecharge.getHasRewardNum().get(xh)==null) {
						// Integer[] getRewardNum=new Integer[] {0,0};
						List<Integer> getRewardNum = new ArrayList<Integer>();
						getRewardNum.add(0);
						getRewardNum.add(0);
						newOneRecharge.getHasRewardNum().put(xh, getRewardNum);
					}
				}
				
			}
			int qs = newOneRecharge.getQs();
			ConcurrentHashMap<Integer, Struct_zshddbcz_315> concurrentHashMap = ExActOneRechargeCache.NewOneReChargeHashMap
					.get(qs);
			List<Object[]> states = new ArrayList<>();
			for (Struct_zshddbcz_315 zshddbcz_315 : concurrentHashMap.values()) {
				int index = zshddbcz_315.getXh();
				List<Integer> integers = newOneRecharge.getHasRewardNum().get(index);
				Integer canNum = integers.get(0);
				Integer hasCt = integers.get(1);
				states.add(new Object[] { index, canNum, hasCt });
				HashMap<Integer, Integer> hashMap2 = newOneRecharge.getReward().get(index);
				//修正已领次数  190417bug
				int hasCtNum=0;
				int canNum1=0;
				for (int key:hashMap2.keySet()) {
					if(hashMap2.get(key)==GameConst.REWARD_2) {
						hasCtNum=hasCtNum+1;
					}
					if (hashMap2.get(key)!=GameConst.REWARD_0) {
						canNum1=canNum1+1;
					}
				}
				if (canNum!=canNum1) {
					canNum=canNum1;
					integers.set(0, canNum1);
				}
				if (hasCt!=hasCtNum) {
					hasCt=hasCtNum;
					integers.set(1, hasCtNum);
				}
			}
			ExActOneRechargeSender.sendCmd_8100(hero.getId(), id, states.toArray());
		    return;
			
		} catch (Exception e) {
			LogTool.error(e, ExActOneRechargeManager.class, hero.getId(), hero.getName(), "openUI has wrong");
		}
		
	}

	public void getReward(Hero hero, int id, int index) {
		try {
			// if (!ExclusiveActivityFunction.getIns().checkHeroExActOpen(hero, id)) {
			// return;
			// }
			if (!ExclusiveActivityFunction.getIns().checkHasData(hero, id)) {
				return;
			}
			ExclusiveActivityData activityData = hero.getExclusiveActivityData();
			ExActOneRecharge newOneRecharge = (ExActOneRecharge) activityData.getExActivityMap().get(id);
			int qs = newOneRecharge.getQs();
			ConcurrentHashMap<Integer, Struct_zshddbcz_315> concurrentHashMap = ExActOneRechargeCache.NewOneReChargeHashMap
					.get(qs);
			if (!concurrentHashMap.containsKey(index)) {
				LogTool.warn("HashMap.containsKey(index) :"+hero.getId()+" name:"+hero.getName(), ExActOneRechargeManager.class);
				return;
			}
			Struct_zshddbcz_315 struct_zshddbcz_315 = concurrentHashMap.get(index);
			
			HashMap<Integer, Integer> hashMap2 = newOneRecharge.getReward().get(index);
			List<Integer> integers = newOneRecharge.getHasRewardNum().get(index);
			Integer canNum = integers.get(0);
			Integer hasCt = integers.get(1);
			if (canNum<=0) {
				return;
			}
			//修正已领次数  190417bug
			/*if (hasCt==0) {
				int hasCtNum=0;
				int canNum1=0;
				for (int key:hashMap2.keySet()) {
					if(hashMap2.get(key)==GameConst.REWARD_2) {
						hasCtNum=hasCtNum+1;
					}
					if (hashMap2.get(key)!=GameConst.REWARD_0) {
						canNum1=canNum1+1;
					}
					
				}
				if (canNum!=canNum1) {
					canNum=canNum1;
					integers.set(0, canNum1);
				}
				if (hasCt!=hasCtNum) {
					hasCt=hasCtNum;
					integers.set(1, hasCtNum);
				}
			}*/
			
			if (hashMap2.containsKey(hasCt)&&hashMap2.get(hasCt)==GameConst.REWARD_1) {
				hashMap2.put(hasCt, GameConst.REWARD_2);
				int[][] jl = struct_zshddbcz_315.getJl();
				UseAddUtil.add(hero, jl, SourceGoodConst.REWARD_ACTONERECHARGE, UseAddUtil.getDefaultMail(), true);
				// 已领次数+1
				hasCt = hasCt + 1;
				List<Integer> rewardList = new ArrayList<>();
				rewardList.add(canNum);
				rewardList.add(hasCt);
				newOneRecharge.getHasRewardNum().put(index, rewardList);
				ExActOneRechargeSender.sendCmd_8102(hero.getId(), id, index, canNum, hasCt);
				int actId = newOneRecharge.getActId();
				String usesys = hero.getTempData().getAccount().getUsesys();
				String rewardStr = JSON.toJSONString(jl);
				FlowHeroEvent.addHeroExActFlow(hero.getId(), hero.getZoneid(), hero.getName(), hero.getLevel(),
						hero.getVipLv(), id, actId, hero.getOpenid(), hero.getLoginIp(), 1, hero.getPf(), usesys,
						rewardStr, struct_zshddbcz_315.getJe(), hasCt, hero.getReincarnationLevel());
				return;
			}
			ExActOneRechargeSender.sendCmd_8102(hero.getId(), id, index, canNum, hasCt);
			ExActOneRechargeFunction.getIns().updateRedPoint(hero, id);
			return;
		} catch (Exception e) {
			LogTool.error(e, ExActOneRechargeManager.class, hero.getId(), hero.getName(), "getreward has wrong");
		}
		
	}

	@Override
	public void handleOpenPub() {
		// TODO Auto-generated method stub

	}

	@Override
	public void heroActOpen(Hero hero, int id) {
		ExclusiveActivityData activityData = hero.getExclusiveActivityData();
		ExActOneRecharge newOneRecharge = (ExActOneRecharge) activityData.getExActivityMap().get(id);
		newOneRecharge.setHid(hero.getId());
		HashMap<Integer, List<Integer>> hasRewardNum = new HashMap<>();
		HashMap<Integer, HashMap<Integer, Integer>> reward = new HashMap<>();
		newOneRecharge.setReward(reward);
		newOneRecharge.setHasRewardNum(hasRewardNum);
		for (Struct_zshddbcz_315 zshddbcz_315 : Config_zshddbcz_315.getIns().getSortList()) {
			int cishu = zshddbcz_315.getCs();
			int xh = zshddbcz_315.getXh();
			if (!newOneRecharge.getReward().containsKey(xh)) {
				HashMap<Integer, Integer> hashMap = new HashMap<Integer, Integer>();
				newOneRecharge.getReward().put(xh, hashMap);
			}
			HashMap<Integer, Integer> hashMap = newOneRecharge.getReward().get(xh);
			for (int i = 0; i < cishu; i++) {
				if (!hashMap.containsKey(i)) {
					hashMap.put(i, GameConst.REWARD_0);
				}
			}
			if (newOneRecharge.getHasRewardNum().get(xh) == null) {
				// Integer[] getRewardNum = new Integer[] { 0, 0 };
				List<Integer> getRewardNum = new ArrayList<>();
				getRewardNum.add(0);
				getRewardNum.add(0);
				newOneRecharge.getHasRewardNum().put(xh, getRewardNum);
			}
		}
		// 当天充值项
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
		ExclusiveActivityData activityData = hero.getExclusiveActivityData();
		ExActOneRecharge newOneRecharge = (ExActOneRecharge) activityData.getExActivityMap().get(id);
		newOneRecharge.setHid(hero.getId());
		for (Struct_zshddbcz_315 zshddbcz_315 : Config_zshddbcz_315.getIns().getSortList()) {
			int xh = zshddbcz_315.getXh();
			int cishu = zshddbcz_315.getCs();
			List<Integer> integers = newOneRecharge.getHasRewardNum().get(xh);
			if(integers==null) {
				continue;
			}
			Integer canNum = integers.get(0);
			Integer hasCt = integers.get(1);
			HashMap<Integer, Integer> rewardhashmap = newOneRecharge.getReward().get(xh);
			for (int i = 0; i < cishu; i++) {
				if (rewardhashmap.get(i) == GameConst.REWARD_1) {
					rewardhashmap.put(i, GameConst.REWARD_2);
					hasCt = hasCt + 1;
					List<Integer> rewardList = new ArrayList<>();
					rewardList.add(canNum);
					rewardList.add(hasCt);
					newOneRecharge.getHasRewardNum().put(xh, rewardList);
					MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.EXACT_ONERECHARGE_AWARD,
							new Object[] { MailConst.EXACT_ONERECHARGE_AWARD }, zshddbcz_315.getJl());
				}
			}
		}
	}

	@Override
	public ExclusiveActivityModel createExclusiveActivityModel(Hero hero, int id) {
		ExclusiveActivityData exActData = hero.getExclusiveActivityData();
		ExActOneRecharge newOneReCharge = (ExActOneRecharge) exActData.getExActivityMap().get(id);
		if (newOneReCharge == null) {
			newOneReCharge = new ExActOneRecharge();
			HashMap<Integer, List<Integer>> hasRewardNum = new HashMap<>();
			HashMap<Integer, HashMap<Integer, Integer>> reward = new HashMap<>();
			newOneReCharge.setReward(reward);
			newOneReCharge.setHasRewardNum(hasRewardNum);
			Struct_zshdb_315 struct_zshdb_315 = Config_zshdb_315.getIns().get(id);
			int qs = struct_zshdb_315.getQs();
			for (Struct_zshddbcz_315 zshddbcz_315 : Config_zshddbcz_315.getIns().getSortList()) {
				int cishu = zshddbcz_315.getCs();
				int ts = zshddbcz_315.getQs();
				if (qs!=ts) {
					continue;
				}
				int xh = zshddbcz_315.getXh();
				if (!newOneReCharge.getReward().containsKey(xh)) {
					HashMap<Integer, Integer> hashMap = new HashMap<Integer, Integer>();
					newOneReCharge.getReward().put(xh, hashMap);
				}
				HashMap<Integer, Integer> hashMap = newOneReCharge.getReward().get(xh);
				for (int i = 0; i < cishu; i++) {
					if (!hashMap.containsKey(i)) {
						hashMap.put(i, GameConst.REWARD_0);
					}
				}
				if (newOneReCharge.getHasRewardNum().get(xh) == null) {
					// Integer[] getRewardNum = new Integer[] { 0, 0 };
					List<Integer> getRewardNum = new ArrayList<>();
					getRewardNum.add(0);
					getRewardNum.add(0);
					newOneReCharge.getHasRewardNum().put(xh, getRewardNum);
				}
			}
		}
		return newOneReCharge;
	}

	@Override
	public Class<?> getExclusiveActivityModel() {
		// TODO Auto-generated method stub
		return ExActOneRecharge.class;
	}

	@Override
	public void consumeHandle(Hero hero, int consumeNum, int reason, int id) {
		// TODO Auto-generated method stub

	}

	@Override
	public void updateTable(Hero hero) {
		try {
			List<Struct_zshddbcz_315> sortList = Config_zshddbcz_315.getIns().getSortList();
			int size = sortList.size();
			List<Object[]> actDataList = new ArrayList<>();
			for (int i = 0; i < size; i++) {
				// [I:序号I:期数I:je[B:道具类型I:道具idI:道具数量]I:领取次数]单笔充值配置数据
				Struct_zshddbcz_315 struct = sortList.get(i);
				List<Object[]> itemList = new ArrayList<>();
				int[][] items = struct.getJl();
				for (int[] item : items) {
					itemList.add(new Object[] { item[0], item[1], item[2] });
				}
				actDataList.add(new Object[] { struct.getXh(), struct.getQs(), struct.getJe(), itemList.toArray(),
						struct.getCs() });
			}
			ExActOneRechargeSender.sendCmd_8104(hero.getId(), actDataList.toArray());
		} catch (Exception e) {
			LogTool.error(e, this, "ExActOneRechargeManager updateTable");
		}
	}

	@Override
	public void houtaiInitExcel() {
		ExActOneRechargeCache.houtaiInitExcel();
	}

	@Override
	public boolean checkExcel() {
		List<Struct_zshddbcz_315> sortList = Config_zshddbcz_315.getIns().getSortList();
		int mapSize = Config_zshddbcz_315.getIns().getMap().size();
		int size = sortList.size();
		if (size > 0 && size == mapSize) {
			return true;
		}
		return false;
	}

}
