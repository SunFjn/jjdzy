package com.teamtop.system.monsterSpirit;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.teamtop.system.equip.EquipConst;
import com.teamtop.system.equip.EquipFunction;
import com.teamtop.system.equip.EquipScoreComparator;
import com.teamtop.system.equip.model.Equip;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.FightAttr;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.monsterSpirit.model.MonsterSpiritEquip;
import com.teamtop.system.monsterSpirit.model.MonsterSpiritInfo;
import com.teamtop.system.monsterSpirit.model.MonsterSpiritModel;
import com.teamtop.system.monsterSpirit.model.StampData;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_shhx_266;
import excel.config.Config_shjxstar_266;
import excel.config.Config_shoulin_704;
import excel.config.Config_xj_266;
import excel.config.Config_xjtz_266;
import excel.config.Config_xtcs_004;
import excel.config.Config_zhuangbei_204;
import excel.struct.Struct_shhx_266;
import excel.struct.Struct_shjx_266;
import excel.struct.Struct_shjxstar_266;
import excel.struct.Struct_shjxstartz_266;
import excel.struct.Struct_shoulin_704;
import excel.struct.Struct_xj_266;
import excel.struct.Struct_xjtz_266;

public class MonsterSpiritFunction {

	private static MonsterSpiritFunction monsterSpiritFunction;

	private MonsterSpiritFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized MonsterSpiritFunction getIns() {
		if (monsterSpiritFunction == null) {
			monsterSpiritFunction = new MonsterSpiritFunction();
		}
		return monsterSpiritFunction;
	}

	/**
	 * 红点
	 * @param hero
	 * @return
	 */
	public boolean checkRedPoint(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, MonsterSpiritConst.SysId)) {
				return false;
			}
			MonsterSpiritModel monsterSpiritModel = hero.getMonsterSpiritModel();
			Map<Integer, MonsterSpiritInfo> monsterSpiritMap = monsterSpiritModel.getMonsterSpiritMap();
			Iterator<MonsterSpiritInfo> iterator = monsterSpiritMap.values().iterator();
			// Map<Integer, Integer> monsterSpiritMap = hero.getMonsterSpiritMap();
			// Set<Integer> idSet = new HashSet<>(monsterSpiritMap.keySet());
			// Iterator<Integer> iterator = idSet.iterator();
			// Struct_shoulin_704 shoulin = null;
			// int[][] consume = null;
			// for (; iterator.hasNext();) {
			// int id = iterator.next();
			// shoulin = Config_shoulin_704.getIns().get(id);
			// int nextId = shoulin.getNext();
			// if (nextId == 0) {
			// continue;
			// }
			// consume = shoulin.getConsume();
			// if (UseAddUtil.canUse(hero, consume)) {
			// return true;
			// }
			// }
			MonsterSpiritInfo spiritInfo = null;
			Struct_shoulin_704 shoulin = null;
			int[][] consume = null;
			int[][] washCost = Config_xtcs_004.getIns().get(MonsterSpiritConst.WASH_COST).getOther();
			for (; iterator.hasNext();) {
				spiritInfo = iterator.next();
				int id = spiritInfo.getId();
				int type = spiritInfo.getType();
				Map<Integer, Integer> changeMap = spiritInfo.getChangeMap();
				if (changeMap != null) {
					Iterator<Integer> iterator2 = changeMap.keySet().iterator();
					while (iterator2.hasNext()) {
						Integer next = iterator2.next();
						Integer changeState = changeMap.get(next);
						if (changeState == MonsterSpiritConst.FIGHTSTATE_0) {
							// 兽魂幻形特殊红点(1-4类型都要)
							RedPointFunction.getIns().addLoginRedPoint(hero, MonsterSpiritConst.SysId_1, type,
									RedPointConst.HAS_RED);
						}
					}
				}
				shoulin = Config_shoulin_704.getIns().get(id);
				int nextId = shoulin.getNext();
				if (nextId == 0) {
					continue;
				}
				consume = shoulin.getConsume();
				if (UseAddUtil.canUse(hero, consume)) {
					return true;
				}
				Map<Integer, MonsterSpiritEquip> msEquipMap = spiritInfo.getMsEquipMap();
				int stampNum = 0;
				Iterator<MonsterSpiritEquip> mseIter = msEquipMap.values().iterator();
				for (; mseIter.hasNext();) {
					MonsterSpiritEquip spiritEquip = mseIter.next();
					if (spiritEquip == null) {
						continue;
					}
					if (UseAddUtil.canUse(hero, washCost)) {
						return true;
					}
					Iterator<StampData> iterator2 = spiritEquip.getStampMap().values().iterator();
					for (; iterator2.hasNext();) {
						StampData stampData = iterator2.next();
						int stampType = stampData.getStampType();
						if (stampType == type) {
							stampNum++;
						}
					}
				}
				// 可激活
				int activate = spiritInfo.getActivate();
				if (stampNum >= MonsterSpiritConst.ACTIVATE_NUM && activate == 0) {
					return true;
				}
				// if (activate == 1) {
					// 星宿升级
					int starLevel = spiritInfo.getStarLevel();
					Struct_xj_266 struct_xj_266 = Config_xj_266.getIns().get(starLevel);
					if (struct_xj_266 == null) {
						continue;
					}
					int nextLevel = struct_xj_266.getNext();
					if (nextLevel == 0) {
						// 已达最高等级
						continue;
					}
					int[][] cost = struct_xj_266.getCost();
					if (UseAddUtil.canUse(hero, cost)) {
						return true;
					}
				// }
			}
			boolean equipSwitch = equipSwitch(hero);
			if (equipSwitch) {
				return true;
			}
		} catch (Exception e) {
			LogTool.error(e, MonsterSpiritFunction.class, hero.getId(), hero.getName(),
					"MonsterSpiritFunction checkRedPoint");
		}
		return false;
	}

	public boolean equipSwitch(Hero hero) {
		Map<Integer, Equip> bodyEquip = hero.getOnbodyEquip();
		if (bodyEquip == null) {
			return false;
		}
		Map<Long, Equip> notOnBodyEquip = hero.getNotOnBodyEquip();
		// 将未穿戴的装备分类
		int type = 0;
		ArrayList<Equip> typeList = null;
		HashMap<Integer, ArrayList<Equip>> typeMap = new HashMap<Integer, ArrayList<Equip>>();
		for (Equip e : notOnBodyEquip.values()) {
			// 判断在背包中
			if (e.getState() != EquipConst.IN_BAG) {
				continue;
			}
			type = EquipFunction.getIns().getEquipPart(e.getSysId());
			typeList = typeMap.get(type);
			if (typeList == null) {
				typeList = new ArrayList<Equip>();
				typeMap.put(type, typeList);
			}
			typeList.add(e);
		}
		// 从身上位置遍历
		ArrayList<Equip> list = null;
		Equip tempEquip = null;
		Equip equip = null;
		EquipScoreComparator comparator = new EquipScoreComparator();
		List<Integer> siteList = MonsterSpiritSysCache.getSiteList();
		for (int i = 0; i < siteList.size(); i++) {
			type = siteList.get(i);
			list = typeMap.get(type);
			if (list == null) {
				continue;
			}
			// 排序，找到评分最高的未穿戴装备
			Collections.sort(list, comparator);
			tempEquip = null;
			for (int j = 0; j < list.size(); j++) {
				Equip temp = list.get(j);
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
				continue;
			}
			// 穿戴装备
			equip = bodyEquip.get(type);
			if (equip != null) {
				// 身上有装备，替换
				int strength = EquipFunction.getIns().getEquipStrength(equip.getSysId());
				int strengthTemp = EquipFunction.getIns().getEquipStrength(tempEquip.getSysId());
				if (strength < strengthTemp) {
					return true;
				}
			}else {
				return true;
			}
		}
		return false;
	}

	/**
	 * 红点更新
	 * @param hero
	 */
	public void updateRedPoint(Hero hero) {
		try {
			boolean checkRedPoint = checkRedPoint(hero);
			if (!checkRedPoint) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, MonsterSpiritConst.SysId,
						MonsterSpiritConst.RedPoint, RedPointConst.NO_RED);
			}
		} catch (Exception e) {
			LogTool.error(e, MonsterSpiritFunction.class, hero.getId(), hero.getName(),
					"MonsterSpiritFunction updateRedPoint");
		}
	}
	
	public int getMaxLevel(Hero hero) {
		// Map<Integer, Integer> monsterSpiritMap = hero.getMonsterSpiritMap();
		Map<Integer, MonsterSpiritInfo> spiritMap = hero.getMonsterSpiritModel().getMonsterSpiritMap();
		int maxLevel=0;
		for (MonsterSpiritInfo info : spiritMap.values()) {
			int level = info.getLevel();
			if (level > maxLevel) {
				maxLevel=level;
			}
		}
		return maxLevel;
	}

	public long getMsEquipStrenght(Hero hero, int type, int site, MonsterSpiritEquip equip) {
		if (equip == null) {
			return 0;
		}
		if (equip.getEquipId() == 0) {
			return 0;
		}
		long[][] equipAttr = getMsEquipAttr(hero, type, site, equip);
		FinalFightAttr finalAttr = new FinalFightAttr();
		FightAttr fAttr = new FightAttr();
		FightCalcFunction.setFightValue(equipAttr, fAttr);
		FightCalcFunction.calcEquipAttr(finalAttr, fAttr, 0);
		return finalAttr.getStrength();
	}

	/** 获取兽灵装备属性加成 */
	public long[][] getMsEquipAttr(Hero hero, int type, int site, MonsterSpiritEquip equip) {
		int equipId = equip.getEquipId();
		int[][] baseAttr = Config_zhuangbei_204.getIns().get(equipId).getAttr();
		Map<Integer, StampData> stampMap = equip.getStampMap();
		Map<Integer, Integer> starSet = new HashMap<>();
		Map<Integer, Integer> typeSet = new HashMap<>();
		Map<Integer, Long> attrMap = new HashMap<>();
		MonsterSpiritInfo monsterSpiritInfo = hero.getMonsterSpiritModel().getMonsterSpiritMap().get(type);
		MonsterSpiritEquip monsterSpiritEquip = monsterSpiritInfo.getMsEquipMap().get(site);
		CommonUtil.arrChargeMap(baseAttr, attrMap);
		Iterator<StampData> iterator = stampMap.values().iterator();
		for (; iterator.hasNext();) {
			StampData stampData = iterator.next();
			int stampStarId = stampData.getStampStarId();
			int stampType = stampData.getStampType();
			if (stampStarId > 0) {
				Struct_shjxstar_266 shjxstar_266 = Config_shjxstar_266.getIns().get(stampStarId);
				if (shjxstar_266==null||stampStarId<=100000) {
					stampData.setStampStarId(100906);
					stampStarId=100906;
					shjxstar_266 = Config_shjxstar_266.getIns().get(stampStarId);
				}
				int[][] attr = shjxstar_266.getAttr();
				// 属性计算
				CommonUtil.arrChargeMap(attr, attrMap);
				if (stampType == type) {
					int star = shjxstar_266.getStar();
					for (int i = 1; i <= star; i++) {
						Integer num = starSet.get(i);
						if (num == null) {
							num = 0;
						}
						starSet.put(i, num + 1);
						if (starSet.get(i) == 4 && star > monsterSpiritEquip.getStart()) {
							// 记录满足4个印记的当前最高星级
							monsterSpiritEquip.setStart(i);
						}
					}
					Integer typeNum = typeSet.get(stampType);
					if (typeNum == null) {
						typeNum = 0;
					} else if (typeNum == 3) {
						// 记录满足套装激活
						monsterSpiritEquip.setState(4);
					}
						typeSet.put(stampType, typeNum + 1);
				}
			}
		}
		int start = monsterSpiritEquip.getStart();
		if (start != 0) {
			for (int a = 1; a <= start; a++) {
				// 达到最高星级的4个印记之前全部遍历为满足套装属性条件
				starSet.put(a, 4);
			}
		}
		int starSize = starSet.size();
		if (starSize >= 1) {
			for (int i = starSize;i>0;i--) {
				if (starSet.get(i) == MonsterSpiritConst.STAMP_NUM) {
					int index = site;
					Map<Integer, Struct_shjxstartz_266> map = MonsterSpiritSysCache.getStarSetMap().get(index);
					Struct_shjxstartz_266 shjxstartz_266 = map.get(i);
					if (shjxstartz_266 == null) {
						continue;
					}
					int[][] attr = shjxstartz_266.getAttr();
					// 属性计算
					CommonUtil.arrChargeMap(attr, attrMap);
					break;
				}
			}
		}
		if (monsterSpiritEquip.getState() == 4) {
			// 激活套装属性永久有效
			typeSet.put(type, monsterSpiritEquip.getState());
		}
		if (typeSet.size() == 1) {
			for (int sType : typeSet.keySet()) {
				if (type == sType&&typeSet.get(type)==MonsterSpiritConst.STAMP_NUM) {
					Map<Integer, Struct_shjx_266> map = MonsterSpiritSysCache.getTypeSetMap().get(type);
					if (map != null) {
						int index = site;
						Struct_shjx_266 shjx_266 = map.get(index);
						if (shjx_266 == null) {
							continue;
						}
						int[][] attr = shjx_266.getAttr();
						// 属性计算
						CommonUtil.arrChargeMap(attr, attrMap);
					}
				}
			}
		}
		long[][] equipAttr = CommonUtil.mapToArr(attrMap);
		return equipAttr;
	}

	public long getMonsterSpiritTotalStrength(Hero hero) {
		long totalStrength = 0;
		try {
			MonsterSpiritModel monsterSpiritModel = hero.getMonsterSpiritModel();
			if (monsterSpiritModel == null) {
				return 0;
			}
			Map<Integer, MonsterSpiritInfo> monsterSpiritMap = monsterSpiritModel.getMonsterSpiritMap();
			Map<Integer, Long> attrMap = new HashMap<>();
			Iterator<MonsterSpiritInfo> iterator = monsterSpiritMap.values().iterator();
			Struct_shoulin_704 struct_shoulin_704 = null;
			int[][] attr = null;
			MonsterSpiritFunction function = MonsterSpiritFunction.getIns();
			for (; iterator.hasNext();) {
				MonsterSpiritInfo spiritInfo = iterator.next();
				Map<Integer, Integer> changeMap = spiritInfo.getChangeMap();
				if (changeMap != null) {
					Iterator<Integer> iterator2 = changeMap.keySet().iterator();
					for (; iterator2.hasNext();) {
						Integer modelId = iterator2.next();
						Integer changeState = changeMap.get(modelId);
						if (changeState >= MonsterSpiritConst.FIGHTSTATE_1
								&& changeState <= MonsterSpiritConst.FIGHTSTATE_2) {
							// 只要购买过 无论是否显示模型都算战力
							Struct_shhx_266 struct_shhx_266 = Config_shhx_266.getIns().get(modelId);
							if (struct_shhx_266 != null) {
								int[][] attr2 = struct_shhx_266.getAttr();
								// 兽魂幻形
								CommonUtil.arrChargeMap(attr2, attrMap);
							}
						}
					}
				}
				int msId = spiritInfo.getId();
				struct_shoulin_704 = Config_shoulin_704.getIns().get(msId);
				if (struct_shoulin_704 != null) {
					attr = struct_shoulin_704.getAttr();
					CommonUtil.arrChargeMap(attr, attrMap);
				}
				int starLevel = spiritInfo.getStarLevel();
				Struct_xj_266 struct_xj_266 = Config_xj_266.getIns().get(starLevel);
				if (struct_xj_266 != null) {
					int[][] starAttr = struct_xj_266.getAttr();
					// 星宿等级
					CommonUtil.arrChargeMap(starAttr, attrMap);
				}
				int grade = spiritInfo.getGrade();
				// 星宿阶套装
				Struct_xjtz_266 xjtz_266 = Config_xjtz_266.getIns().get(grade);
				if (xjtz_266 != null) {
					CommonUtil.arrChargeMap(xjtz_266.getAttr(), attrMap);
				}
				// 装备战力属性
				int type = spiritInfo.getType();
				if (type == 0) {
					type = msId / 1000;
					spiritInfo.setType(type);
				}
				Map<Integer, MonsterSpiritEquip> msEquipMap = spiritInfo.getMsEquipMap();
				if (msEquipMap != null) {
					Iterator<Integer> siteIterator = msEquipMap.keySet().iterator();
					for (; siteIterator.hasNext();) {
						Integer site = siteIterator.next();
						MonsterSpiritEquip spiritEquip = msEquipMap.get(site);
						if (spiritEquip.getEquipId() == 0) {
							continue;
						}
						long[][] msEquipAttr = function.getMsEquipAttr(hero, type, site, spiritEquip);
						// System.err.println(JSON.toJSONString(msEquipAttr) + ", " + type + ", " +
						// site);
						CommonUtil.arrChargeMap(msEquipAttr, attrMap);
					}
				}
			}
			long[][] totalAttr = CommonUtil.mapToArr(attrMap);
			if (totalAttr != null) {
				FinalFightAttr finalAttr = new FinalFightAttr();
				FightAttr fAttr = new FightAttr();
				FightCalcFunction.setFightValue(totalAttr, fAttr);
				FightCalcFunction.calcEquipAttr(finalAttr, fAttr, 0);
				totalStrength = finalAttr.getStrength();
			}
		} catch (Exception e) {
			LogTool.error(e, MonsterSpiritFunction.class, hero.getId(), hero.getName(),
					"MonsterSpiritFunction getMonsterSpiritTotalStrength");
		}
		return totalStrength;
	}
	/**
	 * 获取兽魂装备的总洗练次数
	 * @param hero
	 * @return
	 */
	public int sumWashNum(Hero hero) {
		int sumWashNum=0;
		MonsterSpiritModel monsterSpiritModel = hero.getMonsterSpiritModel();
		Map<Integer, MonsterSpiritInfo> monsterSpiritMap = monsterSpiritModel.getMonsterSpiritMap();
		for (MonsterSpiritInfo monsterSpiritInfo: monsterSpiritMap.values()) {
			Map<Integer, MonsterSpiritEquip> msEquipMap = monsterSpiritInfo.getMsEquipMap();
			if (msEquipMap!=null) {
				for (MonsterSpiritEquip spiritEquip:msEquipMap.values()) {
					sumWashNum=sumWashNum+spiritEquip.getWashTimes();
				}
			}
		}
		return sumWashNum;
	}

}
