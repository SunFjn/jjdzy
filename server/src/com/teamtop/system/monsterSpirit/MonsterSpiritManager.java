package com.teamtop.system.monsterSpirit;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.equip.EquipConst;
import com.teamtop.system.equip.EquipFunction;
import com.teamtop.system.equip.EquipScoreComparator;
import com.teamtop.system.equip.model.Equip;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.FightCalcConst;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.monsterSpirit.model.MonsterSpiritEquip;
import com.teamtop.system.monsterSpirit.model.MonsterSpiritInfo;
import com.teamtop.system.monsterSpirit.model.MonsterSpiritModel;
import com.teamtop.system.monsterSpirit.model.StampData;
import com.teamtop.system.openDaysSystem.saintMonsterGoal.SaintMonsterGoalEnum;
import com.teamtop.system.openDaysSystem.saintMonsterGoal.SaintMonsterGoalFunction;
import com.teamtop.system.openDaysSystem.saintMonsterWash.SaintMonsterWashFunction;
import com.teamtop.system.openDaysSystem.saintMonsterWashRank.SaintMonsterWashRankFunction;
import com.teamtop.system.openDaysSystem.warOrderActive.WarOrderActiveEnum;
import com.teamtop.system.openDaysSystem.warOrderActive.WarOrderActiveFunction;
import com.teamtop.system.promotion.PromotionFunction;
import com.teamtop.system.promotion.PromotionTaskType;
import com.teamtop.system.task.TaskUserConst;
import com.teamtop.system.task.TaskUserFunction;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.ProbabilityEvent.RandomUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_shhx_266;
import excel.config.Config_shjxxl_266;
import excel.config.Config_shoulin_704;
import excel.config.Config_xj_266;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_shhx_266;
import excel.struct.Struct_shjxxl_266;
import excel.struct.Struct_shoulin_704;
import excel.struct.Struct_xj_266;
import excel.struct.Struct_xjtz_266;

public class MonsterSpiritManager {

	private static MonsterSpiritManager monsterSpiritManager;

	private MonsterSpiritManager() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized MonsterSpiritManager getIns() {
		if (monsterSpiritManager == null) {
			monsterSpiritManager = new MonsterSpiritManager();
		}
		return monsterSpiritManager;
	}

	/**
	 * 请求界面信息
	 * 
	 * @param hero
	 */
	public void openUI(Hero hero) {
		if (hero == null) {
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, MonsterSpiritConst.SysId)) {
			return;
		}
		try {
//			Map<Integer, Integer> monsterSpiritMap = hero.getMonsterSpiritMap();
//			if (monsterSpiritMap == null) {
//				return;
//			}
//			List<Object[]> infoList = new ArrayList<>();
//			Iterator<Integer> iterator = monsterSpiritMap.keySet().iterator();
//			for (; iterator.hasNext();) {
//				int msid = iterator.next();
//				int level = monsterSpiritMap.get(msid);
//				infoList.add(new Object[] { msid });
//			}
//			MonsterSpiritSender.sendCmd_852(hero.getId(), infoList.toArray());
			MonsterSpiritModel spiritModel = hero.getMonsterSpiritModel();
			Map<Integer, MonsterSpiritInfo> monsterSpiritMap = spiritModel.getMonsterSpiritMap();
			int fightMonsterSpiri = spiritModel.getFightMonsterSpiri();
			Iterator<Integer> iterator = monsterSpiritMap.keySet().iterator();
			List<Object[]> infoList = new ArrayList<>();
			Integer type = null;
			MonsterSpiritInfo spiritInfo = null;
			Map<Integer, MonsterSpiritEquip> msEquipMap = null;
			Iterator<Entry<Integer, MonsterSpiritEquip>> equipIter = null;

			Integer index = null;
			MonsterSpiritEquip spiritEquip = null;
			Map<Integer, StampData> stampMap = null;
			Iterator<Entry<Integer, StampData>> stampIter = null;
			int equipId = 0;
			int state = 0;
			int start = 0;
			Entry<Integer, StampData> entry2 = null;
			Integer index1 = null;
			StampData stampData = null;
			int stampId = 0;
			for(;iterator.hasNext();) {
				type = iterator.next();
				spiritInfo = monsterSpiritMap.get(type);
				int modelId = 0;
				Map<Integer, Integer> changeMap = spiritInfo.getChangeMap();
				if (changeMap != null) {
					Iterator<Integer> changeIterator = changeMap.keySet().iterator();
					while (changeIterator.hasNext()) {
						Integer next = changeIterator.next();
						Integer changeState = changeMap.get(next);
						if (changeState == MonsterSpiritConst.FIGHTSTATE_1) {
							modelId = next;
						}
					}
				}
				msEquipMap = spiritInfo.getMsEquipMap();
				if (msEquipMap == null) {
					msEquipMap = new HashMap<>();
					spiritInfo.setMsEquipMap(msEquipMap);
				}
				List<Object[]> msEquipList = new ArrayList<>();
				equipIter = msEquipMap.entrySet().iterator();
				for(;equipIter.hasNext();) {
					Entry<Integer, MonsterSpiritEquip> entry = equipIter.next();
					index = entry.getKey();
					spiritEquip = entry.getValue();
					stampMap = spiritEquip.getStampMap();
					stampIter = stampMap.entrySet().iterator();
					equipId = spiritEquip.getEquipId();
					state = spiritEquip.getState();// 传给前端直接显示激活过的套装属性
					start = spiritEquip.getStart();// 传给前端直接显示激活过的星级套装属性
					List<Object[]> stampList = new ArrayList<>();
					for(;stampIter.hasNext();) {
						entry2 = stampIter.next();
						index1 = entry2.getKey();
						stampData = entry2.getValue();
						stampId = stampData.getStampStarId();
						stampList.add(
								new Object[] { index1, stampId, stampData.getStampType(), stampData.getLockState() });
					}
					Map<Integer, StampData> tempStampMap = spiritEquip.getTempStampMap();
					stampIter = tempStampMap.entrySet().iterator();
					List<Object[]> tempStampList = new ArrayList<>();
					for (; stampIter.hasNext();) {
						entry2 = stampIter.next();
						index1 = entry2.getKey();
						stampData = entry2.getValue();
						stampId = stampData.getStampStarId();
						tempStampList.add(
								new Object[] { index1, stampId, stampData.getStampType(), stampData.getLockState() });
					}
					msEquipList.add(new Object[] { index, equipId, spiritEquip.getWashTimes(), state, start,
							stampList.toArray(), tempStampList.toArray() });
				}
				int fightState = 0;
				if (fightMonsterSpiri > 0 && (fightMonsterSpiri == type || fightMonsterSpiri / 1000 == type)) {
					fightState = 1;
				}
				infoList.add(new Object[] { type, spiritInfo.getId(), spiritInfo.getStarLevel(), spiritInfo.getGrade(),
						spiritInfo.getActivate(), fightState, modelId, msEquipList.toArray() });
			}
			MonsterSpiritSender.sendCmd_852(hero.getId(), infoList.toArray());
		} catch (Exception e) {
			LogTool.error(e, MonsterSpiritManager.class, hero.getId(), hero.getName(), "openUI monsterSpirit fail");
		}
	}

	/**
	 * 兽灵升级
	 * 
	 * @param hero
	 * @param monsterSpiritId
	 */
	public void upgrade(Hero hero, int monsterSpiritId) {
		if (hero == null) {
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, MonsterSpiritConst.SysId)) {
			return;
		}
		try {
			long hid = hero.getId();
			MonsterSpiritModel monsterSpiritModel = hero.getMonsterSpiritModel();
			Map<Integer, MonsterSpiritInfo> monsterSpiritMap = monsterSpiritModel.getMonsterSpiritMap();
			int type = monsterSpiritId / 1000;
			if (!monsterSpiritMap.containsKey(type)) {
				// 没拥有此兽灵
				MonsterSpiritSender.sendCmd_854(hid, 0, 1);
				return;
			}
			MonsterSpiritInfo spiritInfo = monsterSpiritMap.get(type);
			// int level = spiritInfo.getLevel();
			int id = spiritInfo.getId();
			if (id != monsterSpiritId) {
				// 没拥有此兽灵
				MonsterSpiritSender.sendCmd_854(hid, 0, 1);
				return;
			}
			Struct_shoulin_704 shoulin = Config_shoulin_704.getIns().get(monsterSpiritId);
			int nextId = shoulin.getNext();
			if(nextId==0) {
				//达到最高级
				MonsterSpiritSender.sendCmd_854(hid, 0, 2);
				return;
			}
			int[][] consume = shoulin.getConsume();
			if (!UseAddUtil.canUse(hero, consume)) {
				// 材料不足
				MonsterSpiritSender.sendCmd_854(hid, 0, 3);
				return;
			}
			UseAddUtil.use(hero, consume, SourceGoodConst.MONSTERSPIRIT_UPGRADE, true);
			monsterSpiritMap.remove(monsterSpiritId);
			Struct_shoulin_704 shoulinNext = Config_shoulin_704.getIns().get(nextId);
			spiritInfo.setId(nextId);
			spiritInfo.setLevel(shoulinNext.getLv());
			// 重新计算战力
			FightCalcFunction.setRecalcAll(hero, FightCalcConst.MONSTERSPIRIT_UPGRADE,SystemIdConst.MonsterSpirit_SYSID);
			MonsterSpiritSender.sendCmd_854(hid, 1, nextId);
			MonsterSpiritFunction.getIns().updateRedPoint(hero);
			//任务
			TaskUserFunction.getIns().reshTaskUser(hero, TaskUserConst.TASK_TYPE_40, 1);

			
			LogTool.info(hid, hero.getName(), "MonsterSpiritManager nextId=" + nextId, MonsterSpiritManager.class);
		} catch (Exception e) {
			LogTool.error(e, MonsterSpiritManager.class, hero.getId(), hero.getName(), "upgrade monsterSpirit fail");
		}
	}

	/**
	 * 穿戴装备
	 */
	public void wearEquip(Hero hero, int type, int index) {
		if (hero == null) {
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, MonsterSpiritConst.SysId)) {
			return;
		}
		long hid = hero.getId();
		try {
			MonsterSpiritModel monsterSpiritModel = hero.getMonsterSpiritModel();
			MonsterSpiritInfo spiritInfo = monsterSpiritModel.getMonsterSpiritMap().get(type);
			if(spiritInfo==null) {
				return;
			}
			Map<Integer, MonsterSpiritEquip> msEquipMap = spiritInfo.getMsEquipMap();
			MonsterSpiritEquip spiritEquip = msEquipMap.get(index);
			if(spiritEquip==null) {
				spiritEquip = new MonsterSpiritEquip();
				msEquipMap.put(index, spiritEquip);
			}
			Map<Integer, Equip> bodyEquip = hero.getOnbodyEquip();
			if (bodyEquip == null) {
				return;
			}
			Map<Long, Equip> notOnBodyEquip = hero.getNotOnBodyEquip();
			//将未穿戴的装备分类
			int equipType = 0;
			ArrayList<Equip> typeList = new ArrayList<>();
			int msEquipType = index;
			for(Equip e : notOnBodyEquip.values()){
				//判断在背包中
				if(e.getState() != EquipConst.IN_BAG){
					continue;
				}
				equipType = EquipFunction.getIns().getEquipPart( e.getSysId());
				if(equipType!=msEquipType) {
					continue;
				}
				typeList.add(e);
			}
			List<Object[]> stampList = new ArrayList<>();
			EquipScoreComparator comparator = new EquipScoreComparator();
			// 排序，找到评分最高的未穿戴装备
			Collections.sort(typeList, comparator);
			Equip tempEquip = null;
			for (int j = 0; j < typeList.size(); j++) {
				Equip temp = typeList.get(j);
				// 判断穿戴转生 等级
				int[] equipZsLevel = EquipFunction.getEquipZsLevel(temp.getSysId());
				int rebornLv = equipZsLevel[0];
				int level = equipZsLevel[1];
				if (level > hero.getRealLevel() || rebornLv > hero.getRebornlv()) {
					continue;
				}
				tempEquip = temp;
				break;
			}
			if (tempEquip == null) {
				// if (typeList.size() > 0) {
				// MonsterSpiritSender.sendCmd_856(hid, 0, 1, index, 0, stampList.toArray());
				// } else {
					MonsterSpiritSender.sendCmd_856(hid, 0, 0, index, 0, stampList.toArray());
				// }
				return;
			}

			boolean replace = false;
			Equip equip = bodyEquip.get(msEquipType);
			if (equip != null) {
				// 身上有装备，替换
				int strength = EquipFunction.getIns().getEquipStrength(equip.getSysId());
				int strengthTemp = EquipFunction.getIns().getEquipStrength(tempEquip.getSysId());
				if (strength >= strengthTemp) {
					return;
				}
				// equip.setJob(0);
				equip.setState(EquipConst.IN_BAG);
				equip.setBodyIndex(0);
				notOnBodyEquip.put(equip.getId(), equip);
				replace = true;
			}
			// 背包处理
			UseAddUtil.useEquip(hero, tempEquip.getId(), false, SourceGoodConst.EQUIP_WEAR, false);
			// tempEquip.setJob(0);
			tempEquip.setState(EquipConst.ON_BODY);
			tempEquip.setBodyIndex(msEquipType);
			spiritEquip.setEquipId(tempEquip.getSysId());
			notOnBodyEquip.remove(tempEquip.getId());
			// 更新身上缓存
			bodyEquip.put(msEquipType, tempEquip);
			// 背包处理
			if (replace) {
				long[][] data = new long[1][];
				data[0] = new long[] { equip.getId(), equip.getSysId() };
				UseAddUtil.addEquip(hero, data, SourceGoodConst.EQUIP_UNWEAR, null, false);
			}
			// 穿戴在身上的装备信息
			List<Object[]> changeList = new ArrayList<>();
			changeList.add(new Object[] { tempEquip.getId(), tempEquip.getSysId(), msEquipType });
			// boolean isChange = true;
			// if (isChange) {
			// // 重新计算战力
			// FightCalcFunction.setRecalcAll(hero,
			// FightCalcConst.MONSTER_SPIRIT_WEAR_EQUIP,
			// SystemIdConst.EQUIP_SYSID);
			// EquipSender.sendCmd_354(hero.getId(), 0, changeList.toArray());
			// }
			Map<Integer, StampData> stampMap = spiritEquip.getStampMap();
			if (stampMap.size() == 0) {
				// 免费洗练
				freeWash(hero, spiritEquip);
			}
			Iterator<Entry<Integer, StampData>> stampIter = stampMap.entrySet().iterator();
			Entry<Integer, StampData> entry = null;
			StampData stampData = null;
			int index1 = 0;
			int stampId = 0;
			for (; stampIter.hasNext();) {
				entry = stampIter.next();
				index1 = entry.getKey();
				stampData = entry.getValue();
				stampId = stampData.getStampStarId();
				stampList.add(new Object[] { index1, stampId, stampData.getStampType(), stampData.getLockState() });
			}
			MonsterSpiritSender.sendCmd_856(hid, 1, type, index, tempEquip.getSysId(), stampList.toArray());
			FightCalcFunction.setRecalcAll(hero, FightCalcConst.MONSTER_SPIRIT_WEAR_EQUIP,
					SystemIdConst.MonsterSpirit_SYSID);
			MonsterSpiritFunction.getIns().updateRedPoint(hero);
		} catch (Exception e) {
			LogTool.error(e, MonsterSpiritManager.class, hero.getId(), hero.getName(),
					"wearEquip monsterSpirit fail, type=" + type + ", index=" + index);
		}
	}

	/** 第一次免费洗练 */
	public void freeWash(Hero hero, MonsterSpiritEquip spiritEquip) {
		try {
			int stampType = 0;
			Map<Integer, StampData> stampMap = spiritEquip.getStampMap();
			for (int i = 1; i <= MonsterSpiritConst.STAMP_NUM; i++) {
				StampData stampData = stampMap.get(i);
				if (stampData == null) {
					stampData = new StampData();
					stampMap.put(i, stampData);
				}
				int stampStarId = stampData.getStampStarId();
				stampType = RandomUtil.getRandomNumInAreas(1, 4);
				stampStarId = MonsterSpiritSysCache.getRandomStampStarId(1);

				if (stampStarId > 0) {
					stampData.setStampStarId(stampStarId);
					stampData.setStampType(stampType);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, MonsterSpiritManager.class, hero.getId(), hero.getName(), "MonsterSpiritManager freeWash");
		}
	}

	/**
	 * 锁定解锁印记
	 * 
	 * @param hero
	 * @param type 兽灵类型
	 * @param site 装备位置
	 * @param index 印记位置
	 * @param opType 操作类型
	 */
	public void lockStamp(Hero hero, int type, int site, int index, int opType) {
		if (hero == null) {
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, MonsterSpiritConst.SysId)) {
			return;
		}
		try {
			long hid = hero.getId();
			MonsterSpiritModel monsterSpiritModel = hero.getMonsterSpiritModel();
			Map<Integer, MonsterSpiritInfo> monsterSpiritMap = monsterSpiritModel.getMonsterSpiritMap();
			if (!monsterSpiritMap.containsKey(type)) {
				// 没拥有此兽灵
				MonsterSpiritSender.sendCmd_854(hid, 0, 1);
				return;
			}
			MonsterSpiritInfo monsterSpiritInfo = monsterSpiritMap.get(type);
			MonsterSpiritEquip spiritEquip = monsterSpiritInfo.getMsEquipMap().get(site);
			Map<Integer, StampData> stampMap = spiritEquip.getStampMap();
			StampData stampData = stampMap.get(index);
			if (stampData.getStampStarId() == 0) {
				// 未洗练到印记不用锁定
				MonsterSpiritSender.sendCmd_864(hid, 0, 1, 0, 0, 0);
				return;
			}
			Map<Integer, StampData> tempStampMap = spiritEquip.getTempStampMap();
			StampData tempStampData = tempStampMap.get(index);
			int lockState = stampData.getLockState();
			if(opType==1) {				
				if (lockState == MonsterSpiritConst.LOCK_STATE) {
					//已锁定
					MonsterSpiritSender.sendCmd_864(hid, 0, 2, 0, 0, 0);
					return;
				} 
				stampData.setLockState(MonsterSpiritConst.LOCK_STATE);
				if(tempStampData!=null) {					
					tempStampData.setLockState(MonsterSpiritConst.LOCK_STATE);
				}
			} else {
				stampData.setLockState(0);
				if(tempStampData!=null) {						
					tempStampData.setLockState(0);
				}
			}
			MonsterSpiritSender.sendCmd_864(hid, 1, type, site, index, stampData.getLockState());
		} catch (Exception e) {
			LogTool.error(e, MonsterSpiritManager.class, hero.getId(), hero.getName(), 
					"lockStamp monsterSpirit fail, type="+type+", site="+site+", index="+index+", opType="+opType);
		}
	}

	/**
	 * 洗练
	 * @param hero
	 * @param type 1青龙2白虎3朱雀4玄武
	 * @param site 1~3
	 * @param stamp 印记id
	 */
	public void washEquip(Hero hero, int type, int site, int stampId) {
		if (hero == null) {
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, MonsterSpiritConst.SysId)) {
			return;
		}
		try {
			long hid = hero.getId();
			MonsterSpiritModel monsterSpiritModel = hero.getMonsterSpiritModel();
			Map<Integer, MonsterSpiritInfo> monsterSpiritMap = monsterSpiritModel.getMonsterSpiritMap();
			if (!monsterSpiritMap.containsKey(type)) {
				// 没拥有此兽灵
				MonsterSpiritSender.sendCmd_854(hid, 0, 1);
				return;
			}
			MonsterSpiritInfo monsterSpiritInfo = monsterSpiritMap.get(type);
			MonsterSpiritEquip spiritEquip = monsterSpiritInfo.getMsEquipMap().get(site);
			List<Object[]> sendList = new ArrayList<>();
			int equipId = spiritEquip.getEquipId();
			if (equipId == 0) {
				// 没穿装备不能洗练
				MonsterSpiritSender.sendCmd_858(hid, 0, 1, 0, 0, null);
				return;
			}
			Map<Integer, StampData> stampMap = spiritEquip.getStampMap();
			// 锁定消耗
			int needLock = 0;
			Iterator<StampData> iterator = stampMap.values().iterator();
			for (; iterator.hasNext();) {
				StampData data = iterator.next();
				if (data.getLockState() == MonsterSpiritConst.LOCK_STATE) {
					needLock++;
				}
			}
			int[][] lockCost = null;
			int constId = -1;
			switch (needLock) {
			case 1:
				constId = MonsterSpiritConst.LOCK_COST_1;
				break;
			case 2:
				constId = MonsterSpiritConst.LOCK_COST_2;
				break;
			case 3:
				constId = MonsterSpiritConst.LOCK_COST_3;
				break;
			}
			if (constId > 0) {
				lockCost = Config_xtcs_004.getIns().get(constId).getOther();
				if (!UseAddUtil.canUse(hero, lockCost)) {
					// 道具不足
					MonsterSpiritSender.sendCmd_858(hid, 0, 5, 0, 0, null);
					return;
				}
			}

			Map<Integer, Map<Integer, ProbabilityEventModel>> stampWashMap = MonsterSpiritSysCache.getStampWashMap();
			Map<Integer, ProbabilityEventModel> spMap = stampWashMap.get(type);
			if (stampId > 0 && (!spMap.containsKey(stampId))) {
				// 不是对应类型的印记
				MonsterSpiritSender.sendCmd_858(hid, 0, 2, 0, 0, null);
				return;
			}
			if (stampId > 0 && !UseAddUtil.canUse(hero, GameConst.TOOL, 1, stampId)) {
				// 消耗道具不足
				MonsterSpiritSender.sendCmd_858(hid, 0, 3, 0, 0, null);
				return;
			}
			int[][] cost = Config_xtcs_004.getIns().get(MonsterSpiritConst.WASH_COST).getOther();
			if (!UseAddUtil.canUse(hero, cost)) {
				MonsterSpiritSender.sendCmd_858(hid, 0, 4, 0, 0, null);
				return;
			}
			boolean isUsed = false;
			boolean isWash = false;
			int washTimes = spiritEquip.getWashTimes() + 1;
			int stampType = 0;
			Map<Integer, StampData> tempStampMap = spiritEquip.getTempStampMap();
			for (int i = 1; i <= MonsterSpiritConst.STAMP_NUM; i++) {
				StampData stampData = stampMap.get(i);
				if (stampData == null) {
					stampData = new StampData();
					stampMap.put(i, stampData);
				}
				StampData tempStampData = tempStampMap.get(i);
				if (tempStampData == null) {
					tempStampData = new StampData();
					tempStampMap.put(i, tempStampData);
				}
				int lockState = stampData.getLockState();
				int stampStarId = stampData.getStampStarId();
				if (lockState == MonsterSpiritConst.LOCKED) {
					// 锁定不洗练
					int lockStampType = stampData.getStampType();
					sendList.add(new Object[] { stampStarId, i, lockStampType, lockState });
					tempStampData.setLockState(lockState);
					tempStampData.setStampStarId(stampStarId);
					tempStampData.setStampType(lockStampType);
					continue;
				}
				isWash = true;
				if (stampId > 0 && (!isUsed)) {
					isUsed = true;
					stampType = type;
					stampStarId = MonsterSpiritSysCache.getRandomStampStarIdByStamp(type, stampId);
				} else {
					stampType = RandomUtil.getRandomNumInAreas(1, 4);
					stampStarId = MonsterSpiritSysCache.getRandomStampStarId(washTimes);
				}
				if (stampStarId > 0) {
					tempStampData.setStampStarId(stampStarId);
					tempStampData.setStampType(stampType);
					sendList.add(new Object[] { stampStarId, i, stampType, lockState });
				}
			}
			if (isUsed) {
				UseAddUtil.use(hero, GameConst.TOOL, 1, stampId, SourceGoodConst.MONSTERSPIRIT_WASH, true);
			}
			if (isWash) {
				UseAddUtil.use(hero, cost, SourceGoodConst.MONSTERSPIRIT_WASH, true);
			}
			if (constId > 0) {
				UseAddUtil.use(hero, lockCost, SourceGoodConst.MONSTERSPIRIT_LOCESTAMP, true);
			}
			monsterSpiritModel.setWashNum(monsterSpiritModel.getWashNum()+1);
			spiritEquip.setWashTimes(washTimes);
			MonsterSpiritSender.sendCmd_858(hid, 1, type, site, washTimes, sendList.toArray());
			SaintMonsterWashFunction.getIns().addWashTimes(hero, 1);
			SaintMonsterWashRankFunction.getIns().addWashTimes(hero, 1);// 不需要兼容老数据 活动只持续6天或者更少
			SaintMonsterGoalFunction.getIns().checkTask(hero, SaintMonsterGoalEnum.STAMP);
			MonsterSpiritFunction.getIns().updateRedPoint(hero);
			//晋升任务
			PromotionFunction.getIns().updatePromotionTask(hero.getId(), PromotionTaskType.MONSTER_NUM, null);
			// 三国战令
			WarOrderActiveFunction.getIns().updateTaskNum(hero, WarOrderActiveEnum.GOAL_5, 1);
		} catch (Exception e) {
			LogTool.error(e, MonsterSpiritManager.class, hero.getId(), hero.getName(),
					"washEquip monsterSpirit fail, type=" + type + ", site=" + site + ", stampId=" + stampId);
		}
	}

	/**
	 * 替换
	 * 
	 * @param hero
	 * @param type
	 *            兽灵类型
	 * @param site
	 */
	public void replace(Hero hero, int type, int site) {
		if (hero == null) {
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, MonsterSpiritConst.SysId)) {
			return;
		}
		try {
			long hid = hero.getId();
			MonsterSpiritModel monsterSpiritModel = hero.getMonsterSpiritModel();
			Map<Integer, MonsterSpiritInfo> monsterSpiritMap = monsterSpiritModel.getMonsterSpiritMap();
			if (!monsterSpiritMap.containsKey(type)) {
				// 没拥有此兽灵
				MonsterSpiritSender.sendCmd_854(hid, 0, 1);
				return;
			}
			MonsterSpiritInfo monsterSpiritInfo = monsterSpiritMap.get(type);
			MonsterSpiritEquip spiritEquip = monsterSpiritInfo.getMsEquipMap().get(site);
			Map<Integer, StampData> tempStampMap = spiritEquip.getTempStampMap();
			if (tempStampMap == null) {
				MonsterSpiritAwakeSender.sendCmd_5692(hid, 0, 1, 0);
				return;
			}
			if (tempStampMap.size() == 0) {
				MonsterSpiritAwakeSender.sendCmd_5692(hid, 0, 1, 0);
				return;
			}
			Map<Integer, StampData> stampMap = spiritEquip.getStampMap();
			Iterator<Entry<Integer, StampData>> iterator = stampMap.entrySet().iterator();
			Entry<Integer, StampData> entry = null;
			StampData stampData = null;
			StampData tempStampData = null;
			for (; iterator.hasNext();) {
				entry = iterator.next();
				int index = entry.getKey();
				stampData = entry.getValue();
				tempStampData = tempStampMap.get(index);
				if (tempStampData == null) {
					continue;
				}
				stampData.setStampStarId(tempStampData.getStampStarId());
				stampData.setStampType(tempStampData.getStampType());
			}
			tempStampMap.clear();
			MonsterSpiritAwakeSender.sendCmd_5692(hid, 1, type, site);
			FightCalcFunction.setRecalcAll(hero, FightCalcConst.MONSTER_SPIRIT_WASHEQUIP,
					SystemIdConst.MonsterSpirit_SYSID);// 替换后重新计算战力
			// 三国战令
			WarOrderActiveFunction.getIns().updateTaskNum(hero, WarOrderActiveEnum.GOAL_8, 0);
		} catch (Exception e) {
			LogTool.error(e, MonsterSpiritManager.class, hero.getId(), hero.getName(), "upgrade monsterSpirit fail");
		}
	}

	/**
	 * 升级星宿
	 * 
	 * @param hero
	 */
	public void updateStar(Hero hero, int type) {
		if (hero == null) {
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, MonsterSpiritConst.SysId)) {
			return;
		}
		try {
			long hid = hero.getId();
			MonsterSpiritModel monsterSpiritModel = hero.getMonsterSpiritModel();
			Map<Integer, MonsterSpiritInfo> monsterSpiritMap = monsterSpiritModel.getMonsterSpiritMap();
			if (!monsterSpiritMap.containsKey(type)) {
				// 没拥有此兽灵
				MonsterSpiritSender.sendCmd_854(hid, 0, 1);
				return;
			}
			MonsterSpiritInfo spiritInfo = monsterSpiritMap.get(type);
			// if (spiritInfo.getActivate() == 0) {
			// MonsterSpiritSender.sendCmd_860(hid, 0, 3, 0);
			// return;
			// }
			int starLevel = spiritInfo.getStarLevel();
			Struct_xj_266 struct_xj_266 = Config_xj_266.getIns().get(starLevel);
			if (struct_xj_266 == null) {
				return;
			}
			int nextLevel = struct_xj_266.getNext();
			if (nextLevel == 0) {
				// 已达最高等级
				MonsterSpiritSender.sendCmd_860(hid, 0, 1, 0);
				return;
			}
			int[][] cost = struct_xj_266.getCost();
			if (!UseAddUtil.canUse(hero, cost)) {
				// 消耗道具不足
				MonsterSpiritSender.sendCmd_860(hid, 0, 2, 0);
				return;
			}
			UseAddUtil.use(hero, cost, SourceGoodConst.MONSTERSPIRIT_UPGRADESTAR, true);
			spiritInfo.setStarLevel(nextLevel);
			MonsterSpiritSender.sendCmd_860(hid, 1, type, nextLevel);
			FightCalcFunction.setRecalcAll(hero, FightCalcConst.MONSTER_SPIRIT_STAR_UPGRADE,
					SystemIdConst.MonsterSpirit_SYSID);
			SaintMonsterGoalFunction.getIns().checkTask(hero, SaintMonsterGoalEnum.STARUPGRADE);
			SaintMonsterGoalFunction.getIns().checkTask(hero, SaintMonsterGoalEnum.STRENGTH);
			MonsterSpiritFunction.getIns().updateRedPoint(hero);
			if (type==1) {
				PromotionFunction.getIns().updatePromotionTask(hero.getId(), PromotionTaskType.XINGXIU_DONG_LEVEL, null);
			}else if (type==2) {
				PromotionFunction.getIns().updatePromotionTask(hero.getId(), PromotionTaskType.XINGXIU_XI_LEVEL, null);
			}else if (type==3) {
				PromotionFunction.getIns().updatePromotionTask(hero.getId(), PromotionTaskType.XINGXIU_NAN_LEVEL, null);
			}else if (type==4) {
				PromotionFunction.getIns().updatePromotionTask(hero.getId(), PromotionTaskType.XINGXIU_BIE_LEVEL, null);
			}
		} catch (Exception e) {
			LogTool.error(e, MonsterSpiritManager.class, hero.getId(), hero.getName(),
					"updateStar monsterSpirit fail, type=" + type);
		}
	}

	/**
	 * 激活兽魂
	 * 
	 * @param hero
	 * @param type 兽灵类型
	 */
	public void activate(Hero hero, int type) {
		if (hero == null) {
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, MonsterSpiritConst.SysId)) {
			return;
		}
		try {
			long hid = hero.getId();
			MonsterSpiritModel monsterSpiritModel = hero.getMonsterSpiritModel();
			Map<Integer, MonsterSpiritInfo> monsterSpiritMap = monsterSpiritModel.getMonsterSpiritMap();
			if (!monsterSpiritMap.containsKey(type)) {
				// 没拥有此兽灵
				MonsterSpiritSender.sendCmd_854(hid, 0, 1);
				return;
			}
			MonsterSpiritInfo spiritInfo = monsterSpiritMap.get(type);
			if (spiritInfo.getActivate() == MonsterSpiritConst.ACTIVATE_STATE) {
				return;
			}
			Iterator<MonsterSpiritEquip> iterator = spiritInfo.getMsEquipMap().values().iterator();
			MonsterSpiritEquip spiritEquip = null;
			int stampNum = 0;
			StampData stampData = null;
			for (; iterator.hasNext();) {
				spiritEquip = iterator.next();
				Iterator<StampData> iterator2 = spiritEquip.getStampMap().values().iterator();
				for (; iterator2.hasNext();) {
					stampData = iterator2.next();
					int stampType = stampData.getStampType();
					if (stampType == type) {
						stampNum++;
					}
				}
			}
			if (stampNum < MonsterSpiritConst.ACTIVATE_NUM) {
				// 对应类型印记数量不足
				MonsterSpiritSender.sendCmd_862(hid, 0, 1);
				return;
			}
			// 激活成功
			spiritInfo.setActivate(MonsterSpiritConst.ACTIVATE_STATE);
			MonsterSpiritSender.sendCmd_862(hid, 1, type);
			SaintMonsterGoalFunction.getIns().checkTask(hero, SaintMonsterGoalEnum.ACTIVATE);
			MonsterSpiritFunction.getIns().updateRedPoint(hero);
		} catch (Exception e) {
			LogTool.error(e, MonsterSpiritManager.class, hero.getId(), hero.getName(),
					"activate monsterSpirit fail, type=" + type);
		}
	}

	/**
	 * 兽魂出战
	 * 
	 * @param hero
	 * @param type 兽灵类型
	 */
	public void goFight(Hero hero, int type) {
		if (hero == null) {
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, MonsterSpiritConst.SysId)) {
			return;
		}
		try {
			long hid = hero.getId();
			MonsterSpiritModel monsterSpiritModel = hero.getMonsterSpiritModel();
			Map<Integer, MonsterSpiritInfo> monsterSpiritMap = monsterSpiritModel.getMonsterSpiritMap();
			if (!monsterSpiritMap.containsKey(type)) {
				// 没拥有此兽灵
				MonsterSpiritSender.sendCmd_854(hid, 0, 1);
				return;
			}
			MonsterSpiritInfo spiritInfo = monsterSpiritMap.get(type);
			if (spiritInfo.getActivate() != MonsterSpiritConst.ACTIVATE_STATE) {
				// 未激活
				MonsterSpiritSender.sendCmd_866(hid, 0, 1);
				return;
			}
			Map<Integer, Integer> changeMap = spiritInfo.getChangeMap();
			if (changeMap == null) {
				monsterSpiritModel.setFightMonsterSpiri(type);
			} else {
				for (int modelId : changeMap.keySet()) {
					int state = changeMap.get(modelId);
					if (state == MonsterSpiritConst.FIGHTSTATE_1) {
						// 根据前端传的类型寻找该类型幻形的皮肤
						monsterSpiritModel.setFightMonsterSpiri(modelId);
					}
				}
			}
			MonsterSpiritSender.sendCmd_866(hid, 1, type);
		} catch (Exception e) {
			LogTool.error(e, MonsterSpiritManager.class, hero.getId(), hero.getName(), "goFight monsterSpirit fail, type="+type);
		}
	}

	/**
	 * 星宿进阶
	 * 
	 * @param hero
	 * @param type 兽灵类型
	 */
	public void starUpgrade(Hero hero, int type) {
		if (hero == null) {
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, MonsterSpiritConst.SysId)) {
			return;
		}
		try {
			long hid = hero.getId();
			MonsterSpiritModel monsterSpiritModel = hero.getMonsterSpiritModel();
			Map<Integer, MonsterSpiritInfo> monsterSpiritMap = monsterSpiritModel.getMonsterSpiritMap();
			if (!monsterSpiritMap.containsKey(type)) {
				// 没拥有此兽灵
				MonsterSpiritSender.sendCmd_854(hid, 0, 1);
				return;
			}
			MonsterSpiritInfo spiritInfo = monsterSpiritMap.get(type);
			Map<Integer, List<Struct_xjtz_266>> starGradeSetMap = MonsterSpiritSysCache.getStarGradeSetMap();
			List<Struct_xjtz_266> list = starGradeSetMap.get(type);
			int grade = spiritInfo.getGrade();
			int starLevel = spiritInfo.getStarLevel();
			int condition = 0;
			if (grade == 0) {
				Struct_xjtz_266 xjtz_266 = list.get(0);
				grade = xjtz_266.getLv();
				condition = xjtz_266.getNext();
			} else {
				int size = list.size();
				for (int i = 0; i < size; i++) {
					Struct_xjtz_266 xjtz_266 = list.get(i);
					if (xjtz_266.getLv() == grade) {
						int index = i + 1;
						if (index >= size) {
							break;
						}
						Struct_xjtz_266 next_xjtz_266 = list.get(index);
						grade = next_xjtz_266.getLv();
						condition = next_xjtz_266.getNext();
						break;
					}
				}
			}
			if (condition == 0) {
				// 达到当前最高等级
				MonsterSpiritSender.sendCmd_868(hid, 0, 1, 0);
				return;
			}
			if (starLevel < condition) {
				// 星宿等级不满足条件
				MonsterSpiritSender.sendCmd_868(hid, 0, 2, 0);
				return;
			}
			spiritInfo.setGrade(grade);
			MonsterSpiritSender.sendCmd_868(hid, 1, type, grade);
			FightCalcFunction.setRecalcAll(hero, FightCalcConst.MONSTER_SPIRIT_STARGRADE_UP,
					SystemIdConst.MonsterSpirit_SYSID);
			MonsterSpiritFunction.getIns().updateRedPoint(hero);
		} catch (Exception e) {
			LogTool.error(e, MonsterSpiritManager.class, hero.getId(), hero.getName(), "starUpgrade monsterSpirit fail, type="+type);
		}
	}
	

	/**
	 * 一键升星
	 * 
	 * @param hero
	 * @param type
	 *            1青龙2白虎3朱雀4玄武
	 * @param site
	 *            1~3
	 * @param star
	 *            当前装备的星级
	 */
	public void oneKeyWash(Hero hero, int type, int site, int star) {
		if (hero == null) {
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, MonsterSpiritConst.SysId)) {
			return;
		}
		try {
			MonsterSpiritModel monsterSpiritModel = hero.getMonsterSpiritModel();
			Map<Integer, MonsterSpiritInfo> monsterSpiritMap = monsterSpiritModel.getMonsterSpiritMap();
			if (!monsterSpiritMap.containsKey(type)) {
				// 没拥有此兽灵
				MonsterSpiritAwakeSender.sendCmd_5694(hero.getId(), 0, 0);
				return;
			}
			if (star >= MonsterSpiritConst.WASH_MAX) {
				// 洗练满星
				return;
			}
			MonsterSpiritInfo monsterSpiritInfo = monsterSpiritMap.get(type);
			MonsterSpiritEquip spiritEquip = monsterSpiritInfo.getMsEquipMap().get(site);
			int washNum = monsterSpiritModel.getWashNum();// 洗练总次数
			int washTimes = spiritEquip.getWashTimes();//某件装备的洗练次数
			List<Struct_shjxxl_266> sortList = Config_shjxxl_266.getIns().getSortList();
			int[][] time = sortList.get(star).getTime();
			int upWish = time[0][0];// 下一级所需要的洗练次数
			int needWishNum = upWish - washTimes;// 一键升级所需要的洗练次数
			if (!UseAddUtil.canUse(hero, GameConst.TOOL, needWishNum * MonsterSpiritConst.WASH_NUM,
					MonsterSpiritConst.WASH_PROPID)) {
				// 道具不足
				MonsterSpiritAwakeSender.sendCmd_5694(hero.getId(), 1, 0);
				return;
			}
			UseAddUtil.use(hero, GameConst.TOOL, needWishNum * MonsterSpiritConst.WASH_NUM,
					MonsterSpiritConst.WASH_PROPID,
					SourceGoodConst.MONSTERSPIRIT_WASH, true);
			monsterSpiritModel.setWashNum(washNum + needWishNum);// 总次数+洗练次数
			spiritEquip.setWashTimes(upWish);// 一键升星后的次数
			MonsterSpiritAwakeSender.sendCmd_5694(hero.getId(), 2, needWishNum);
			SaintMonsterWashFunction.getIns().addWashTimes(hero, needWishNum);// 一键升星也算活动次数
			SaintMonsterWashRankFunction.getIns().addWashTimes(hero, needWishNum);// 不需要兼容老数据 活动只持续6天或者更少
			// 三国战令
			WarOrderActiveFunction.getIns().updateTaskNum(hero, WarOrderActiveEnum.GOAL_5, needWishNum);
			PromotionFunction.getIns().updatePromotionTask(hero.getId(), PromotionTaskType.MONSTER_NUM, null);
		} 
			catch (Exception e) {
				LogTool.error(e, MonsterSpiritManager.class, hero.getId(), hero.getName(), "starUpgrade monsterSpirit fail, type="+type);
			}
	}

	/**
	 * 打开兽魂幻形
	 * 
	 * @param hero
	 * @param type
	 *            1青龙2白虎3朱雀4玄武
	 */
	public void openMsChange(Hero hero, int type) {
		if (hero == null) {
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, MonsterSpiritConst.SysId)) {
			return;
		}
		try {
			MonsterSpiritModel monsterSpiritModel = hero.getMonsterSpiritModel();
			Map<Integer, MonsterSpiritInfo> monsterSpiritMap = monsterSpiritModel.getMonsterSpiritMap();
			if (!monsterSpiritMap.containsKey(type)) {
				// 没拥有此兽灵
				MonsterSpiritAwakeSender.sendCmd_5696(hero.getId(), 0, type, null);
				return;
			}
			MonsterSpiritInfo monsterSpiritInfo = monsterSpiritMap.get(type);
			if (monsterSpiritInfo.getActivate() != MonsterSpiritConst.ACTIVATE_STATE) {
				// 未激活
				MonsterSpiritAwakeSender.sendCmd_5696(hero.getId(), 1, type, null);
				return;
			}
			List<Object[]> arrayList = new ArrayList<>();
			Map<Integer, Integer> changeMap = monsterSpiritInfo.getChangeMap();
			if (changeMap == null || changeMap.isEmpty()) {
				changeMap=new HashMap<>();
				Map<Integer, Struct_shhx_266> map = Config_shhx_266.getIns().getMap();
				Iterator<Integer> iterator = map.keySet().iterator();
				while (iterator.hasNext()) {
					Integer modelId = iterator.next();
					Struct_shhx_266 struct_shhx_266 = map.get(modelId);
					if (struct_shhx_266.getType() != type) {
						continue;
					}
					changeMap.put(modelId, 0);
				}
			}
			List<Struct_shhx_266> sortList = Config_shhx_266.getIns().getSortList();
			for (Struct_shhx_266 shhx_266 : sortList) {
				if (shhx_266.getType() == type && !changeMap.containsKey(shhx_266.getId())) {
					changeMap.put(shhx_266.getId(), 0);
				}
			}
			if (monsterSpiritInfo.getActivate() == MonsterSpiritConst.ACTIVATE_STATE
					&& changeMap.get(type) == MonsterSpiritConst.FIGHTSTATE_0) {
				// 初始化觉醒后的兽魂模型为已幻形
				changeMap.put(type, MonsterSpiritConst.FIGHTSTATE_1);
			}
			monsterSpiritInfo.setChangeMap(changeMap);
			Iterator<Integer> iterator2 = changeMap.keySet().iterator();	
			while (iterator2.hasNext()) {
				Integer ModelId = iterator2.next();
				Integer changeState = changeMap.get(ModelId);
				arrayList.add(new Object[] { ModelId, changeState });
			}
			MonsterSpiritAwakeSender.sendCmd_5696(hero.getId(), 2, type, arrayList.toArray());
		} catch (Exception e) {
			LogTool.error(e, MonsterSpiritManager.class, hero.getId(), hero.getName(),
					"openMsChange fail, type=" + type);
		}
	}

	/**
	 * 兽魂幻形激活
	 * 
	 * @param hero
	 * @param type
	 *            1青龙2白虎3朱雀4玄武
	 * @param modelId
	 *            模型id
	 */
	public void msChange(Hero hero, int type, int modelId) {
		if (hero == null) {
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, MonsterSpiritConst.SysId)) {
			return;
		}
		try {
			MonsterSpiritModel monsterSpiritModel = hero.getMonsterSpiritModel();
			Map<Integer, MonsterSpiritInfo> monsterSpiritMap = monsterSpiritModel.getMonsterSpiritMap();
			if (!monsterSpiritMap.containsKey(type)) {
				// 没拥有此兽灵
				MonsterSpiritAwakeSender.sendCmd_5698(hero.getId(), 0, type, modelId);
				return;
			}
			MonsterSpiritInfo monsterSpiritInfo = monsterSpiritMap.get(type);
			if (monsterSpiritInfo.getActivate() != MonsterSpiritConst.ACTIVATE_STATE) {
				// 未激活
				MonsterSpiritAwakeSender.sendCmd_5698(hero.getId(), 1, type, modelId);
				return;
			}
			Struct_shhx_266 struct_shhx_266 = Config_shhx_266.getIns().get(modelId);
			if (struct_shhx_266 == null) {
				// 传入modelId非法
				MonsterSpiritAwakeSender.sendCmd_5698(hero.getId(), 2, type, modelId);
				return;
			}
			int[][] conmuse = struct_shhx_266.getConmuse();
			if (!UseAddUtil.canUse(hero, conmuse)) { // 元宝不足
				MonsterSpiritAwakeSender.sendCmd_5698(hero.getId(), 3, type, modelId);
				return;
			}
			UseAddUtil.use(hero, conmuse, 1, SourceGoodConst.MS_CHANGE, true);
			Map<Integer, Integer> changeMap = monsterSpiritInfo.getChangeMap();
			Iterator<Integer> iterator = changeMap.keySet().iterator();
			while (iterator.hasNext()) {
				Integer next = iterator.next();
				Integer changeState = changeMap.get(next);
				if (changeState == MonsterSpiritConst.FIGHTSTATE_1) {
					changeMap.put(next, MonsterSpiritConst.FIGHTSTATE_2);// 先重置兽灵幻形状态
				}
			}
			changeMap.put(modelId, MonsterSpiritConst.FIGHTSTATE_1);// 购买后直接帮玩家幻形
			monsterSpiritModel.setFightMonsterSpiri(modelId);// 幻形等于切换皮肤 只用于展示
			FightCalcFunction.setRecalcAll(hero, FightCalcConst.MONSTER_SPIRIT_WASHEQUIP,
					SystemIdConst.MonsterSpirit_SYSID);// 重新计算战力
			// 三国战令
			WarOrderActiveFunction.getIns().updateTaskNum(hero, WarOrderActiveEnum.GOAL_7, 0);
			MonsterSpiritAwakeSender.sendCmd_5698(hero.getId(), 4, type, modelId);
		} catch (Exception e) {
			LogTool.error(e, MonsterSpiritManager.class, hero.getId(), hero.getName(), "msChange fail, type=" + type);
		}
	}

	/**
	 * 兽魂幻形
	 * 
	 * @param hero
	 * @param type
	 *            1青龙2白虎3朱雀4玄武
	 * @param modelId
	 *            模型id
	 */
	public void msChangeFight(Hero hero, int type, int modelId) {
		if (hero == null) {
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, MonsterSpiritConst.SysId)) {
			return;
		}
		try {
			MonsterSpiritModel monsterSpiritModel = hero.getMonsterSpiritModel();
			Map<Integer, MonsterSpiritInfo> monsterSpiritMap = monsterSpiritModel.getMonsterSpiritMap();
			if (!monsterSpiritMap.containsKey(type)) {
				// 没拥有此兽灵
				MonsterSpiritAwakeSender.sendCmd_5700(hero.getId(), 0, type, modelId);
				return;
			}
			MonsterSpiritInfo monsterSpiritInfo = monsterSpiritMap.get(type);
			if (monsterSpiritInfo.getActivate() != MonsterSpiritConst.ACTIVATE_STATE) {
				// 未激活
				MonsterSpiritAwakeSender.sendCmd_5700(hero.getId(), 1, type, modelId);
				return;
			}
			Map<Integer, Integer> changeMap = monsterSpiritInfo.getChangeMap();
			/*if (changeMap.get(modelId) != MonsterSpiritConst.FIGHTSTATE_2) {
				// 需要激活才能幻形
				MonsterSpiritAwakeSender.sendCmd_5700(hero.getId(), 2, type, modelId);
				return;
			}*/
			Iterator<Integer> iterator = changeMap.keySet().iterator();
			while (iterator.hasNext()) {
				Integer next = iterator.next();
				Integer changeState = changeMap.get(next);
				if (changeState == MonsterSpiritConst.FIGHTSTATE_1) {
					changeMap.put(next, MonsterSpiritConst.FIGHTSTATE_2);// 先重置兽灵幻形状态
				}
			}
			changeMap.put(modelId, MonsterSpiritConst.FIGHTSTATE_1);
			monsterSpiritModel.setFightMonsterSpiri(modelId);// 幻形等于切换皮肤 只用于展示
			MonsterSpiritAwakeSender.sendCmd_5700(hero.getId(), 3, type, modelId);
		} catch (Exception e) {
			LogTool.error(e, MonsterSpiritManager.class, hero.getId(), hero.getName(), "msChange fail, type=" + type);
		}
	}
}
