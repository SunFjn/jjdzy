package com.teamtop.system.excalibur;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.achievement.AchievementEnum;
import com.teamtop.system.achievement.AchievementFunction;
import com.teamtop.system.bag.BagFunction;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.excalibur.model.Excalibur;
import com.teamtop.system.excalibur.model.ExcaliburModel;
import com.teamtop.system.hero.FightCalcConst;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.promotion.PromotionFunction;
import com.teamtop.system.promotion.PromotionTaskType;
import com.teamtop.system.task.TaskUserConst;
import com.teamtop.system.task.TaskUserFunction;
import com.teamtop.system.zhanjia.ZhanJiaFunction;
import com.teamtop.util.log.LogTool;

import excel.config.Config_drug_200;
import excel.config.Config_sword_216;
import excel.struct.Struct_sword_216;

/**
 * 神剑
 * 
 * @author hzp
 *
 */
public class ExcaliburManager {

	private static ExcaliburManager excaliburManager;

	private ExcaliburManager() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized ExcaliburManager getIns() {
		if (excaliburManager == null) {
			excaliburManager = new ExcaliburManager();
		}
		return excaliburManager;
	}

	/**
	 * 打开神剑界面
	 * 
	 * @param hero
	 */
	public void openExcalibur(Hero hero) {
		if (hero == null) {
			return;
		}
		try {
			Excalibur excalibur = hero.getExcalibur();
			if (excalibur == null) {
				// 系统未开启
				return;
			}
			int wearExcaliburId = excalibur.getWearExcaliburId();
			List<Object[]> sendList = new ArrayList<>();
			Map<Integer, ExcaliburModel> excaliburMap = excalibur.getExcaliburMap();
			Iterator<ExcaliburModel> iterator = excaliburMap.values().iterator();
			ExcaliburModel excaliburModel = null;
			for (; iterator.hasNext();) {
				excaliburModel = iterator.next();
				sendList.add(new Object[] { excaliburModel.getId(), excaliburModel.getStarLevel() });
			}
			Integer usedAttrElixir = hero.getDanyao().get(ExcaliburConst.Dan7);
			if (usedAttrElixir == null) {
				usedAttrElixir = 0;
			}
			ExcaliburSender.sendCmd_1002(hero.getId(), wearExcaliburId, usedAttrElixir, sendList.toArray());
		} catch (Exception e) {
			LogTool.error(e, ExcaliburManager.class, hero.getId(), hero.getName(), "");
		}
	}

	/**
	 * 激活神剑
	 * 
	 * @param hero
	 * @param excaliburId
	 */
	public void activateExcalibur(Hero hero, int excaliburId) {
		if (hero == null) {
			return;
		}
		try {
			long hid = hero.getId();
			Excalibur excalibur = hero.getExcalibur();
			if (excalibur == null) {
				// 系统未开启
				return;
			}
			Map<Integer, ExcaliburModel> excaliburMap = excalibur.getExcaliburMap();
			if (excaliburMap.containsKey(excaliburId)) {
				// 已激活该神剑
				return;
			}
			Struct_sword_216 struct_sword_216 = Config_sword_216.getIns().get(excaliburId);
			if (struct_sword_216 == null) {
				// 神剑不存在
				ExcaliburSender.sendCmd_1004(hid, 0, 1, 0);
				return;
			}
			int[][] item = struct_sword_216.getItem();
			if (!UseAddUtil.canUse(hero, item)) {
				// 材料不足
				ExcaliburSender.sendCmd_1004(hid, 0, 2, 0);
				return;
			}
			UseAddUtil.use(hero, item, SourceGoodConst.EXCALIBUR_UPGRADESTAR, true);
			ExcaliburModel model = new ExcaliburModel();
			model.setId(excaliburId);
			model.setStarLevel(1);
			//觉醒之力
			HashMap<Integer, Integer> jueXingSkills=new HashMap<>();
			jueXingSkills.put(GameConst.JUEXING_SKILL1, 0);
			jueXingSkills.put(GameConst.JUEXING_SKILL2, 0);
			jueXingSkills.put(GameConst.JUEXING_SKILL3, 0);
			jueXingSkills.put(GameConst.JUEXING_SKILL4, 0);
			model.setJueXingSkills(jueXingSkills);
			
			excaliburMap.put(excaliburId, model);
			ExcaliburSender.sendCmd_1004(hid, 1, excaliburId, 1);
			// 重新计算战力
			FightCalcFunction.setRecalcAll(hero, FightCalcConst.EXCALIBUR_UPGRADESTAR,SystemIdConst.Excalibur_SYSID);
			PromotionFunction.getIns().updatePromotionTask(hero.getId(), PromotionTaskType.ACTIVATE_EXCARIBUR, null);
			TaskUserFunction.getIns().reshTaskUser(hero, TaskUserConst.TASK_TYPE_45, 1);
			// 广播
			if (struct_sword_216.getPin() >= GameConst.Orange) {
				ChatManager.getIns().broadCast(ChatConst.EXCALIBUR,
						new Object[] { hero.getNameZoneid(), struct_sword_216.getId() });
			}
			// 成就
			AchievementFunction.getIns().checkTask(hero, AchievementEnum.GOAL_13, 0);
		} catch (Exception e) {
			LogTool.error(e, ExcaliburManager.class, hero.getId(), hero.getName(),
					"activateExcalibur fail, excaliburId=" + excaliburId);
		}
	}

	/**
	 * 神剑升星
	 * 
	 * @param hero
	 * @param excaliburId
	 */
	public void upgradeStar(Hero hero, int excaliburId) {
		if (hero == null) {
			return;
		}
		try {
			long hid = hero.getId();
			Excalibur excalibur = hero.getExcalibur();
			if (excalibur == null) {
				// 系统未开启
				return;
			}
			Map<Integer, ExcaliburModel> excaliburMap = excalibur.getExcaliburMap();
			if (!excaliburMap.containsKey(excaliburId)) {
				// 未激活该神剑
				ExcaliburSender.sendCmd_1004(hid, 0, 1, 0);
				return;
			}
			Struct_sword_216 struct_sword_216 = Config_sword_216.getIns().get(excaliburId);
			if (struct_sword_216 == null) {
				// 神剑不存在
				ExcaliburSender.sendCmd_1004(hid, 0, 2, 0);
				return;
			}
			int[][] item = struct_sword_216.getItem();
			if (!UseAddUtil.canUse(hero, item)) {
				// 材料不足
				ExcaliburSender.sendCmd_1004(hid, 0, 3, 0);
				return;
			}
			ExcaliburModel model = excaliburMap.get(excaliburId);
			int starLevelOld = model.getStarLevel();
			if(starLevelOld>=struct_sword_216.getStar()) {
				//星级已经是最高
				ExcaliburSender.sendCmd_1004(hid, 0, 4, 0);
				return;
			}
			
			UseAddUtil.use(hero, item, SourceGoodConst.EXCALIBUR_UPGRADESTAR, true);
			int starLevel = model.getStarLevel() + 1;
			model.setStarLevel(starLevel);
			excaliburMap.put(excaliburId, model);
			FightCalcFunction.setRecalcAll(hero, FightCalcConst.EXCALIBUR_UPGRADESTAR,SystemIdConst.Excalibur_SYSID);
			ExcaliburSender.sendCmd_1006(hid, 1, excaliburId, starLevel);
			LogTool.info(hid, hero.getName(), "ExcaliburManager starLevel=" + starLevel, ExcaliburManager.class);
			if(starLevelOld>=struct_sword_216.getStar()) {
				//星级已经是最高    觉醒红点
				ZhanJiaFunction.getIns().jueXingRedPonint(hero,false);
			}
			// 成就
			AchievementFunction.getIns().checkTask(hero, AchievementEnum.GOAL_14, 0);
		} catch (Exception e) {
			LogTool.error(e, ExcaliburManager.class, hero.getId(), hero.getName(),
					"upgradeStar fail, excaliburId=" + excaliburId);
		}
	}

	/**
	 * 吞噬神剑属性丹
	 * 
	 * @param hero
	 * @param type
	 */
	public void devourElixir(Hero hero, int type) {
		if (hero == null) {
			return;
		}
		try {
			long hid = hero.getId();
			Excalibur excalibur = hero.getExcalibur();
			if (excalibur == null) {
				// 系统未开启
				return;
			}
			int itemid = Config_drug_200.getIns().get(ExcaliburConst.Dan7).getId();
			int goodsNum = BagFunction.getIns().getGoodsNumBySysId(hid, itemid);
			if (goodsNum == 0) {
				// 材料不足
				ExcaliburSender.sendCmd_1008(hid, 0, 1);
				return;
			}
			Map<Integer, Integer> danyao = hero.getDanyao();
			Integer danNum = danyao.get(ExcaliburConst.Dan7);
			if (danNum == null) {
				danNum = 0;
			}
			int devourLimit = getDevourLimit(excalibur);
			if (danNum >= devourLimit) {
				// 可使用上限
				ExcaliburSender.sendCmd_1008(hid, 0, 2);
				return;
			}
			int useNum = 0;
			if (type == 0) {
				useNum = 1;
			} else {
				useNum = goodsNum;
				int canUseNum = devourLimit - danNum;
				if (goodsNum > canUseNum) {
					useNum = canUseNum;
				}
			}
			UseAddUtil.use(hero, GameConst.TOOL, useNum, itemid, SourceGoodConst.EXCALIBUR_DAN7, true);
			int totalUse = danNum + useNum;
			danyao.put(ExcaliburConst.Dan7, totalUse);
			ExcaliburSender.sendCmd_1008(hid, 1, totalUse);
			// 重新计算战力
			FightCalcFunction.setRecalcAll(hero, FightCalcConst.EXCALIBUR_EEVOURELIXIR,SystemIdConst.Excalibur_SYSID);
		} catch (Exception e) {
			LogTool.error(e, ExcaliburManager.class, hero.getId(), hero.getName(), "devourElixir fail, type=" + type);
		}
	}

	private int getDevourLimit(Excalibur excalibur) {
		if (excalibur == null) {
			return 0;
		}
		int totalNum = 0;
		Map<Integer, ExcaliburModel> excaliburMap = excalibur.getExcaliburMap();
		Iterator<ExcaliburModel> iterator = excaliburMap.values().iterator();
		ExcaliburModel excaliburModel = null;
		Struct_sword_216 struct_sword_216 = null;
		for (; iterator.hasNext();) {
			excaliburModel = iterator.next();
			struct_sword_216 = Config_sword_216.getIns().get(excaliburModel.getId());
			if (struct_sword_216 != null) {
				totalNum += struct_sword_216.getMax() * excaliburModel.getStarLevel();
			}
		}
		return totalNum;
	}

	/**
	 * 操作神剑（1：装备、2：卸下）
	 * 
	 * @param hero
	 * @param operateType
	 * @param excaliburId
	 */
	public void operateExcalibur(Hero hero, int operateType, int excaliburId) {
		if (hero == null) {
			return;
		}
		try {
			long hid = hero.getId();
			Excalibur excalibur = hero.getExcalibur();
			if (excalibur == null) {
				// 系统未开启
				return;
			}
			if(excaliburId<1) {
				//参数错误
				return;
			}
			Map<Integer, ExcaliburModel> excaliburMap = excalibur.getExcaliburMap();
			if(!excaliburMap.containsKey(excaliburId)) {
				//未激活
				ExcaliburSender.sendCmd_1010(hid, 0, 1, 0);
				return;
			}
			int wearExcaliburId = excalibur.getWearExcaliburId();
			if(operateType==1) {//装备
				if (wearExcaliburId == excaliburId) {
					// 已装备
					ExcaliburSender.sendCmd_1010(hid, 0, 2, 0);
					return;
				}
				excalibur.setWearExcaliburId(excaliburId);
			} else if (operateType == 2) {// 卸下
				if (wearExcaliburId != excaliburId) {
					// 未装备该神剑
					ExcaliburSender.sendCmd_1010(hid, 0, 3, 0);
					return;
				}
				excalibur.setWearExcaliburId(0);
			}
			TaskUserFunction.getIns().reshTaskUser(hero, TaskUserConst.TASK_TYPE_45, 1);
			ExcaliburSender.sendCmd_1010(hid, 1, operateType, excaliburId);
		} catch (Exception e) {
			LogTool.error(e, ExcaliburManager.class, hero.getId(), hero.getName(), "");
		}
	}

}
