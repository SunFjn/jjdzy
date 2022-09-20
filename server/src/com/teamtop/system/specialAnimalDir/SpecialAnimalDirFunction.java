package com.teamtop.system.specialAnimalDir;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.teamtop.system.bag.BagFunction;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.FightAttr;
import com.teamtop.system.hero.FightCalcConst;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.openDaysSystem.specialAnimalSendGift.SpecialAnimalSendGiftFunction;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.system.specialAnimalDir.model.SpecialAnimalDirInfo;
import com.teamtop.system.specialAnimalDir.model.TalentEquipInfo;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_ysl_752;
import excel.config.Config_yssj_752;
import excel.config.Config_ystf_752;
import excel.config.Config_ystfsj_752;
import excel.config.Config_ystfsp_752;
import excel.config.Config_ystz_752;
import excel.struct.Struct_ysl_752;
import excel.struct.Struct_yssj_752;
import excel.struct.Struct_ystf_752;
import excel.struct.Struct_ystfsj_752;
import excel.struct.Struct_ystfsp_752;
import excel.struct.Struct_ystfzb_752;
import excel.struct.Struct_ystz_752;

public class SpecialAnimalDirFunction {
	private static volatile SpecialAnimalDirFunction ins = null;

	public static SpecialAnimalDirFunction getIns() {
		if (ins == null) {
			synchronized (SpecialAnimalDirFunction.class) {
				if (ins == null) {
					ins = new SpecialAnimalDirFunction();
				}
			}
		}
		return ins;
	}

	private SpecialAnimalDirFunction() {
	}

	public int getStrenght(Hero hero, int index) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SPECIALANIMALDIR)) {
				return 0;
			}
			Map<Integer, SpecialAnimalDirInfo> infoMap = hero.getSpecialAnimalDir().getInfoMap();
			SpecialAnimalDirInfo specialAnimalDirInfo = infoMap.get(index);
			int upId = specialAnimalDirInfo.getUpId();
			int power = 0;
			if (upId != 0) {
				Struct_yssj_752 struct_yssj_752 = Config_yssj_752.getIns().get(upId);
				power = struct_yssj_752.getPower();
				int suitId = specialAnimalDirInfo.getSuitId();
				if (suitId != 0) {
					Struct_ystz_752 struct_ystz_752 = Config_ystz_752.getIns().get(suitId);
					power += struct_ystz_752.getPower();
				}
			}
			return power;
		} catch (Exception e) {
			LogTool.error(e, this, hero.getId(), hero.getName(), "SpecialAnimalDirFunction getStrenght index:" + index);
		}
		return 0;
	}

	public StringBuilder attrToString(int[][] attr) {
		StringBuilder stringBuilder = new StringBuilder();
		if (attr != null) {
			for (int[] attr1 : attr) {
				String attrStr = Arrays.toString(attr1);
				stringBuilder.append(attrStr);
			}
		}
		return stringBuilder;
	}

	public StringBuilder attrToString(long[][] attr) {
		StringBuilder stringBuilder = new StringBuilder();
		if (attr != null) {
			for (long[] attr1 : attr) {
				String attrStr = Arrays.toString(attr1);
				stringBuilder.append(attrStr);
			}
		}
		return stringBuilder;
	}

	public int idToLvId(int id) {
		return id * 100000;
	}

	public void addToolRedPointHandle(Hero hero, int itemId) {
		try {
			if (SpecialAnimalDirSysCache.getToolSet().contains(itemId)) {
				redPoint(hero, false);
			}
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(), "itemId:" + itemId);
		}
	}

	/**
	 * 红点发送
	 * 
	 * @param isLogin 是否登录状态
	 */
	public void redPoint(Hero hero, boolean isLogin) {
		int id = 0;
		List<Integer> hasRedPointIdList = new ArrayList<Integer>();
		List<Integer> notRedPointIdList = new ArrayList<Integer>();
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SPECIALANIMALDIR)) {
				return;
			}
			Map<Integer, SpecialAnimalDirInfo> infoMap = hero.getSpecialAnimalDir().getInfoMap();
			List<Struct_ysl_752> sortList = Config_ysl_752.getIns().getSortList();
			int size = sortList.size();
			for (int i = 0; i < size; i++) {
				Struct_ysl_752 struct_ysl_752 = sortList.get(i);
				id = struct_ysl_752.getId();
				SpecialAnimalDirInfo specialAnimalDirInfo = infoMap.get(id);
				if (specialAnimalDirInfo == null) {
					// 激活
					int upId = idToLvId(id);
					Struct_yssj_752 struct_yssj_752 = Config_yssj_752.getIns().get(upId);
					int[][] jj = struct_yssj_752.getJj();
					int bagNum = BagFunction.getIns().getGoodsNumBySysId(hero.getId(), jj[0][1]);
					if (bagNum >= jj[0][2]) {
						hasRedPointIdList.add(id);
						// 应前端要求有一个满足就跳出
						break;
					}
					continue;
				}
				int upId = specialAnimalDirInfo.getUpId();
				int curExp = specialAnimalDirInfo.getCurExp();
				Struct_yssj_752 struct_yssj_752 = Config_yssj_752.getIns().get(upId);
				int nextId = struct_yssj_752.getNext();
				if (nextId == 0) {
					// 已达最高级
					notRedPointIdList.add(id);
					continue;
				}
				int[][] cost = null;
				int costNum = 0;
				// 升级，进阶
				int expConfig = struct_yssj_752.getExp();
				if (curExp < expConfig) {
					// 升级
					cost = SpecialAnimalDirConst.LINGYUANDAN_ONECONSUME;
					int expBei = expConfig / SpecialAnimalDirConst.LVBEI;
					costNum = expBei - curExp / SpecialAnimalDirConst.LVBEI;
				} else {
					// 进阶
					cost = struct_yssj_752.getJj();
					costNum = cost[0][2];
				}
				int bagNum = BagFunction.getIns().getGoodsNumBySysId(hero.getId(), cost[0][1]);
				if (bagNum >= costNum) {
					hasRedPointIdList.add(id);
					// 应前端要求有一个满足就跳出
					break;
				} else {
					notRedPointIdList.add(id);
				}

			}
			for (Integer id1 : hasRedPointIdList) {
				if (isLogin) {
					RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.ZHUCHENG_SYSID, 1,
							RedPointConst.HAS_RED);
					RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.SPECIALANIMALDIR, 1,
							RedPointConst.HAS_RED);
				} else {
					RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.ZHUCHENG_SYSID, 1,
							RedPointConst.HAS_RED);
					RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.SPECIALANIMALDIR, 1,
							RedPointConst.HAS_RED);
				}
			}
			// if (!isLogin) {
			// for (Integer id1 : notRedPointIdList) {
			// RedPointFunction.getIns().fastUpdateRedPoint(hero,
			// SystemIdConst.ZHUCHENG_SYSID, id1,
			// RedPointConst.NO_RED);
			// RedPointFunction.getIns().fastUpdateRedPoint(hero,
			// SystemIdConst.SPECIALANIMALDIR, id1,
			// RedPointConst.NO_RED);
			// }
			// }
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(), "id:" + id);
		}

	}

	/**
	 * 天赋红点发送
	 * 
	 * @param isLogin 是否登录状态
	 */
	public void redPointTalent(Hero hero, boolean isLogin) {
		int id = 0;
		List<Integer> hasRedPointIdList = new ArrayList<Integer>();
		List<Integer> notRedPointIdList = new ArrayList<Integer>();
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SPECIALANIMAL_TALENTS)) {
				return;
			}
			Map<Integer, SpecialAnimalDirInfo> infoMap = hero.getSpecialAnimalDir().getInfoMap();
			List<Struct_ysl_752> sortList = Config_ysl_752.getIns().getSortList();
			int size = sortList.size();
			for (int i = 0; i < size; i++) {
				Struct_ysl_752 struct_ysl_752 = sortList.get(i);
				id = struct_ysl_752.getId();
				SpecialAnimalDirInfo specialAnimalDirInfo = infoMap.get(id);
				if (specialAnimalDirInfo == null) {
					continue;
				}

				// 天赋技能
				int talentSkill = specialAnimalDirInfo.getTalentSkill();
				Integer tSkill = SpecialAnimalDirSysCache.getTalentsFirstMap().get(id);
				Map<Integer, TalentEquipInfo> talentEquip = specialAnimalDirInfo.getTalentEquip();
				if(tSkill!=null) {
					int nextSkill = 0;
					if (talentSkill == 0) {
						talentSkill = tSkill;
					}
					Struct_ystf_752 ystf_752 = Config_ystf_752.getIns().get(talentSkill);
					nextSkill = ystf_752.getXj();

					int[][] tj = ystf_752.getTj();
					if (tj != null) {
//						if (talentEquip.size() < tj.length) {
//							// 未满足升级条件
//							continue;
//						}
						boolean talentState = true;
						for (int[] arr : tj) {
							int equipId = arr[0];
							int level = arr[1];
							TalentEquipInfo talentEquipInfo = talentEquip.get(equipId);
							if (talentEquipInfo == null) {
								// 未激活，未满足升级条件
								talentState = false;
								break;
							}
							int equipLevel = talentEquipInfo.getLevel();
							if (equipLevel < level) {
								// 为满足升级条件
								talentState = false;
								break;
							}
						}
						if (talentState) {
							hasRedPointIdList.add(id);
							break;
						}
					}
				}

				// 天赋装备升级、升品
				// Map<Integer, TalentEquipInfo> talentEquip =
				// specialAnimalDirInfo.getTalentEquip();
				Iterator<Integer> iterator = SpecialAnimalDirSysCache.getAnimalEquipMap().get(id).keySet().iterator();
				TalentEquipInfo equipInfo = null;
				for (; iterator.hasNext();) {
					int equipId = iterator.next();
					int level = -1;
					if (talentEquip.containsKey(equipId)) {
						// 升级
						equipInfo = talentEquip.get(equipId);
						level = equipInfo.getLevel();
						// 检测升品
						int quality = equipInfo.getQuality();
						Struct_ystfsp_752 struct_ystfsp_752 = Config_ystfsp_752.getIns().get(quality);
						int xyp = struct_ystfsp_752.getXyp();
						if (xyp == 0) {
							// 达到最高品
							continue;
						}
						int[][] xh = struct_ystfsp_752.getXh();
						if (UseAddUtil.canUse(hero, xh)) {
							hasRedPointIdList.add(id);
							break;
						}
					} else {
						// 激活
						Struct_ystfsj_752 struct_ystfsj_752 = Config_ystfsj_752.getIns().getSortList().get(0);
						level = struct_ystfsj_752.getLv();
					}
					Struct_ystfsj_752 struct_ystfsj_752 = Config_ystfsj_752.getIns().get(level);
					int nextLevel = struct_ystfsj_752.getXj();
					if (nextLevel == 0) {
						// 达到最大等级
						continue;
					}
					int[][] xiaohao = struct_ystfsj_752.getXiaohao();
					int[][] tempCost = CommonUtil.copyDyadicArray(xiaohao);
					int jinjie = struct_ystfsj_752.getJinjie();
					if (jinjie == 1) {
						Map<Integer, Struct_ystfzb_752> map = SpecialAnimalDirSysCache.getAnimalEquipMap().get(id);
						Struct_ystfzb_752 struct_ystfzb_752 = map.get(equipId);
						int daoju = struct_ystfzb_752.getDaoju();
						for (int[] toolInfo : tempCost) {
							toolInfo[1] = daoju;
						}
					}
					if (UseAddUtil.canUse(hero, tempCost)) {
						hasRedPointIdList.add(id);
						break;
					}
				}
			}
			for (Integer id1 : hasRedPointIdList) {
				if (isLogin) {
					RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.ZHUCHENG_SYSID, 1,
							RedPointConst.HAS_RED);
					RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.SPECIALANIMAL_TALENTS, 1,
							RedPointConst.HAS_RED);
				} else {
					RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.ZHUCHENG_SYSID, 1,
							RedPointConst.HAS_RED);
					RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.SPECIALANIMAL_TALENTS, 1,
							RedPointConst.HAS_RED);
				}
			}
//			if (!isLogin) {
//				for (Integer id1 : notRedPointIdList) {
//					RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.ZHUCHENG_SYSID, id1,
//							RedPointConst.NO_RED);
//					RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.SPECIALANIMALDIR, id1,
//							RedPointConst.NO_RED);
//				}
//			}
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(), "id:" + id);
		}

	}

	/**
	 * 异兽送礼任务初始化
	 * 
	 * @param hero
	 */
	public void specialAnimalSendGiftTaskInit(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SPECIALANIMALDIR)) {
				return;
			}
			Map<Integer, SpecialAnimalDirInfo> infoMap = hero.getSpecialAnimalDir().getInfoMap();
			int specialAnimalNum = infoMap.size();
			if (specialAnimalNum <= 0) {
				return;
			}
			SpecialAnimalSendGiftFunction.getIns().taskHandler(hero, 1, 0, specialAnimalNum);
			int totalStep = 0;
			for (SpecialAnimalDirInfo info : infoMap.values()) {
				totalStep += info.getStep();
			}
			if (totalStep > 0) {
				SpecialAnimalSendGiftFunction.getIns().taskHandler(hero, 2, 0, totalStep);
			}
			// 重算异兽录战力
			FightCalcFunction.setRecalcAll(hero, FightCalcConst.SPECIALANIMALDIR, SystemIdConst.SPECIALANIMALDIR);
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(), "specialAnimalSendGiftTaskInit");
		}
	}

	/**
	 * 异兽天赋总战力（只算天赋，不计算异兽录，用于活动天赋目标）
	 * 
	 * @param hero
	 */
	public long getTalentTotalStrength(Hero hero) {
		long totalStrength = 0;
		try {
			HashMap<Integer, Long> attrMap = new HashMap<Integer, Long>();
			Map<Integer, SpecialAnimalDirInfo> infoMap = hero.getSpecialAnimalDir().getInfoMap();
			for (SpecialAnimalDirInfo specialAnimalDirInfo : infoMap.values()) {
				// 天赋
				int talentSkill = specialAnimalDirInfo.getTalentSkill();
				if (talentSkill > 0) {
					Struct_ystf_752 ystf_752 = Config_ystf_752.getIns().get(talentSkill);
					int[][] tsAttr = ystf_752.getSx();
					CommonUtil.arrChargeMap(tsAttr, attrMap);
				}
				Map<Integer, TalentEquipInfo> talentEquip = specialAnimalDirInfo.getTalentEquip();
				Iterator<TalentEquipInfo> iterator = talentEquip.values().iterator();
				for (; iterator.hasNext();) {
					TalentEquipInfo equipInfo = iterator.next();
					int quality = equipInfo.getQuality();
					if (quality > 0) {
						Struct_ystfsp_752 ystfsp_752 = Config_ystfsp_752.getIns().get(quality);
						int[][] qualityAttr = ystfsp_752.getSx();
						CommonUtil.arrChargeMap(qualityAttr, attrMap);
					}
					int level = equipInfo.getLevel();
					if (level > 0) {
						Struct_ystfsj_752 ystfsj_752 = Config_ystfsj_752.getIns().get(level);
						int[][] levelAttr = ystfsj_752.getAttr();
						CommonUtil.arrChargeMap(levelAttr, attrMap);
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
			LogTool.error(e, SpecialAnimalDirFunction.class, hero.getId(), hero.getName(),
					"SpecialAnimalDirFunction getTalentTotalStrength");
		}
		return totalStrength;
	}
}
