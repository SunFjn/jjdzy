package com.teamtop.system.treasure;

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
import com.teamtop.system.daytask.DayTaskConst;
import com.teamtop.system.daytask.DayTaskFunction;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.FightCalcConst;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.promotion.PromotionFunction;
import com.teamtop.system.promotion.PromotionTaskType;
import com.teamtop.system.rankNew.RankingFunction;
import com.teamtop.system.sevenHappy.SevenHappyConst;
import com.teamtop.system.sevenHappy.SevenHappyFunction;
import com.teamtop.system.sevenWuShenRank.SevenWuShenRankConst;
import com.teamtop.system.sevenWuShenRank.SevenWuShenRankFunction;
import com.teamtop.system.skill.SkillConst;
import com.teamtop.system.skill.SkillFunction;
import com.teamtop.system.task.TaskUserConst;
import com.teamtop.system.task.TaskUserFunction;
import com.teamtop.system.treasure.model.TreasureData;
import com.teamtop.system.treasure.model.TreasureModel;
import com.teamtop.system.zhanjia.ZhanJiaFunction;
import com.teamtop.util.log.LogTool;

import excel.config.Config_bao_214;
import excel.config.Config_baolv_214;
import excel.config.Config_drug_200;
import excel.struct.Struct_bao_214;
import excel.struct.Struct_baolv_214;

/**
 * 宝物
 * 
 * @author hzp
 *
 */
public class TreasureManager {

	private static TreasureManager treasureManager;

	private TreasureManager() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized TreasureManager getIns() {
		if (treasureManager == null) {
			treasureManager = new TreasureManager();
		}
		return treasureManager;
	}

	/**
	 * 打开宝物界面
	 * 
	 * @param hero
	 */
	public void openTreasure(Hero hero) {
		if (hero == null) {
			return;
		}
		try {
			TreasureData treasureData = hero.getTreasureData();
			if (treasureData == null) {
				// 系统未开启
				return;
			}
			List<Object[]> treasureList = new ArrayList<>();
			Map<Integer, TreasureModel> treasureMap = treasureData.getTreasureMap();
			Iterator<TreasureModel> iterator = treasureMap.values().iterator();
			TreasureModel treasureModel = null;
			int id = 0;
			int starLevel = 0;
			for (; iterator.hasNext();) {
				treasureModel = iterator.next();
				id = treasureModel.getId();
				starLevel = treasureModel.getStarLevel();
				treasureList.add(new Object[] { id, starLevel });
			}
			List<Integer> wearTreasureList = treasureData.getWearTreasureList();
			int wearTreasure1 = wearTreasureList.get(0);
			int wearTreasure2 = wearTreasureList.get(1);
			int level = treasureData.getLevel();
			int exp = treasureData.getExp();
			Integer usedAttrElixir = hero.getDanyao().get(TreasureConst.Dan5);
			if (usedAttrElixir == null) {
				usedAttrElixir = 0;
			}
			TreasureSender.sendCmd_942(hero.getId(), wearTreasure1, wearTreasure2, level, exp, usedAttrElixir,
					treasureList.toArray());
		} catch (Exception e) {
			LogTool.error(e, TreasureManager.class, hero.getId(), hero.getName(), "openTreasure fail");
		}
	}

	/**
	 * 宝物切换
	 * 
	 * @param hero
	 * @param point
	 * @param treasureId
	 */
	public void switchTreasure(Hero hero, int point, int treasureId) {
		if (hero == null) {
			return;
		}
		try {
			if (point < 1 || point > 2) {
				// 参数错误
				return;
			}
			long hid = hero.getId();
			TreasureData treasureData = hero.getTreasureData();
			if (treasureData == null) {
				// 系统未开启
				return;
			}
			Map<Integer, TreasureModel> treasureMap = treasureData.getTreasureMap();
			if (!treasureMap.containsKey(treasureId)) {
				// 未激活宝物
				TreasureSender.sendCmd_944(hid, 0, 1, 0);
				return;
			}
			List<Integer> wearTreasureList = treasureData.getWearTreasureList();
			int size = wearTreasureList.size();
			for (int i = 0; i < size; i++) {
				if (wearTreasureList.get(i) == treasureId) {
					wearTreasureList.set(i, 0);
					int skillkey=SkillConst.skiil_site_5;
					if (i==1) {
						skillkey=SkillConst.skiil_site_6;
					}
					SkillFunction.getIns().changeSkill(hero, skillkey, 0, 0);
				}
			}
			wearTreasureList.set(point - 1, treasureId);
			int skillPoint=SkillConst.skiil_site_5;
			if (point==2) {
				 skillPoint=SkillConst.skiil_site_6;
			}
			//宝物技能x 
			if (treasureId!=0) {
				int skill=Config_bao_214.getIns().get(treasureId).getSkill();
				int skillLv=treasureMap.get(treasureId).getStarLevel();
				SkillFunction.getIns().changeSkill(hero, skillPoint, skill, skillLv);
			}
			TreasureSender.sendCmd_944(hid, 1, point, treasureId);
			//任务
			TaskUserFunction.getIns().reshTaskUser(hero, TaskUserConst.TASK_TYPE_18, 0);
		} catch (Exception e) {
			LogTool.error(e, TreasureManager.class, hero.getId(), hero.getName(),
					"switchTreasure fail, point=" + point + ", treasureId=" + treasureId);
		}
	}

	/**
	 * 宝物升级
	 * 
	 * @param hero
	 */
	public void upgradeLevel(Hero hero) {
		if (hero == null) {
			return;
		}
		try {
			long hid = hero.getId();
			TreasureData treasureData = hero.getTreasureData();
			if (treasureData == null) {
				// 系统未开启
				return;
			}
			int num = 1;//使用数量
			if(!UseAddUtil.canUse(hero, GameConst.TOOL, num, TreasureConst.RaiseToolId)) {
				//材料不足
				TreasureSender.sendCmd_946(hid, 0, 1, 0);
				return;
			}
			int level = treasureData.getLevel();
			int nextLevel = level + 1;
			Struct_baolv_214 nextLv = Config_baolv_214.getIns().get(nextLevel);
			if (nextLv == null) {
				return;
			}
			UseAddUtil.use(hero, GameConst.TOOL, num, TreasureConst.RaiseToolId, SourceGoodConst.TREASURE_UPGRADE, true);
			int addExp = TreasureConst.One_Exp * num;
			int exp = treasureData.getExp() + addExp;
			Struct_baolv_214 struct_baolv_214 = Config_baolv_214.getIns().get(level);
			int needExp = struct_baolv_214.getExp();// 升级需要的经验
			int newExp = exp;
			// 升级处理
			int newLevel = level;
			if (exp >= needExp) {
				newExp = exp - needExp;
				treasureData.setLevel(nextLevel);
				newLevel = nextLevel;
			}
			treasureData.setExp(newExp);
			TreasureSender.sendCmd_946(hid, 1, newLevel, newExp);
			// 重新计算战力
			FightCalcFunction.setRecalcAll(hero, FightCalcConst.TREASURE_UPGRADE,SystemIdConst.Treasure_SYSID);
			PromotionFunction.getIns().updatePromotionTask(hid, PromotionTaskType.TREASURE_LEVEL, null);
			//任务
			TaskUserFunction.getIns().reshTaskUser(hero, TaskUserConst.TASK_TYPE_12, 0);
			//每日任务
			DayTaskFunction.getIns().successDayTaskType(hero, DayTaskConst.DATTASK_TYPE17);
			LogTool.info(hid, hero.getName(), "TreasureManager level="+newLevel+", newExp="+newExp, TreasureManager.class);
		} catch (Exception e) {
			LogTool.error(e, TreasureManager.class, hero.getId(), hero.getName(), "upgradeLevel fail");
		}
	}

	public void upgradeAll(Hero hero) {
		if (hero == null) {
			return;
		}
		try {
			long hid = hero.getId();
			TreasureData treasureData = hero.getTreasureData();
			if (treasureData == null) {
				// 系统未开启
				return;
			}
			//拥有培养丹数量
			int goodsNum = BagFunction.getIns().getGoodsNumBySysId(hid, TreasureConst.RaiseToolId);
			if (goodsNum == 0) {
				// 材料不足
				TreasureSender.sendCmd_946(hid, 0, 1, 0);
				return;
			}
			int level = treasureData.getLevel();
			int nextLevel = level + 1;
			int exp = treasureData.getExp();
			Struct_baolv_214 struct_baolv_214 = Config_baolv_214.getIns().get(level);
			Struct_baolv_214 nextLv = Config_baolv_214.getIns().get(nextLevel);
			if (nextLv == null) {
				return;
			}
			int upgradeExp = struct_baolv_214.getExp();
			int needExp = upgradeExp - exp;
			//升到下一级需要培养丹的数量
			int needNum = needExp/TreasureConst.One_Exp;
			int useNum = goodsNum;
			if(goodsNum>needNum) {
				useNum = needNum;
			}
			UseAddUtil.use(hero, GameConst.TOOL, useNum, TreasureConst.RaiseToolId, SourceGoodConst.TREASURE_UPGRADE, true);
			int totalExp = exp + TreasureConst.One_Exp*useNum;
			int newExp = totalExp;
			//升级处理
			if(totalExp>=upgradeExp) {
				newExp = totalExp - upgradeExp;
				level += 1;
				treasureData.setLevel(level);
			}
			treasureData.setExp(newExp);
			TreasureSender.sendCmd_946(hid, 1, level, newExp);
			// 重新计算战力
			FightCalcFunction.setRecalcAll(hero, FightCalcConst.TREASURE_UPGRADE,SystemIdConst.Treasure_SYSID);
			PromotionFunction.getIns().updatePromotionTask(hid, PromotionTaskType.TREASURE_LEVEL, null);
			//任务
			TaskUserFunction.getIns().reshTaskUser(hero, TaskUserConst.TASK_TYPE_12, 0);
			//每日任务
			DayTaskFunction.getIns().successDayTaskType(hero, DayTaskConst.DATTASK_TYPE17);
			LogTool.info(hid, hero.getName(), "TreasureManager level="+level+", newExp="+newExp, TreasureManager.class);
		} catch (Exception e) {
			LogTool.error(e, TreasureManager.class, hero.getId(), hero.getName(), "");
		}
	}

	/**
	 * 宝物激活
	 * 
	 * @param hero
	 * @param treasureId
	 */
	public void activateTreasure(Hero hero, int treasureId) {
		if (hero == null) {
			return;
		}
		try {
			long hid = hero.getId();
			TreasureData treasureData = hero.getTreasureData();
			if (treasureData == null) {
				// 系统未开启
				return;
			}
			Map<Integer, TreasureModel> treasureMap = treasureData.getTreasureMap();
			if (treasureMap.containsKey(treasureId)) {
				// 不能重复激活
				return;
			}
			Struct_bao_214 struct_bao_214 = Config_bao_214.getIns().get(treasureId);
			if (struct_bao_214 == null) {
				// 宝物不存在
				TreasureSender.sendCmd_950(hid, 0, 1, 0);
				return;
			}
			int[][] item = struct_bao_214.getItem();
			if (!UseAddUtil.canUse(hero, item)) {
				// 材料不足
				TreasureSender.sendCmd_950(hid, 0, 2, 0);
				return;
			}
			UseAddUtil.use(hero, item, SourceGoodConst.TREASURE_UPGRADESTAR, true);
			TreasureModel model = new TreasureModel();
			model.setId(treasureId);
			model.setStarLevel(1);// 激活即为1星级
			//觉醒之力
			HashMap<Integer, Integer> jueXingSkills=new HashMap<>();
			jueXingSkills.put(GameConst.JUEXING_SKILL1, 0);
			jueXingSkills.put(GameConst.JUEXING_SKILL2, 0);
			jueXingSkills.put(GameConst.JUEXING_SKILL3, 0);
			jueXingSkills.put(GameConst.JUEXING_SKILL4, 0);
			model.setJueXingSkills(jueXingSkills);
			
			treasureMap.put(treasureId, model);
			TreasureSender.sendCmd_950(hid, 1, treasureId, 1);
			// 重新计算战力
			FightCalcFunction.setRecalcAll(hero, FightCalcConst.TREASURE_UPGRADESTAR,SystemIdConst.Treasure_SYSID);
			PromotionFunction.getIns().updatePromotionTask(hid, PromotionTaskType.ACTIVATE_TREASURE, null);
			// 广播
			if (struct_bao_214.getPin() >= GameConst.Orange) {
				ChatManager.getIns().broadCast(ChatConst.TREASURE,
						new Object[] { hero.getNameZoneid(), struct_bao_214.getId() });
			}
			// 成就
			AchievementFunction.getIns().checkTask(hero, AchievementEnum.GOAL_11, 0);
		} catch (Exception e) {
			LogTool.error(e, TreasureManager.class, hero.getId(), hero.getName(),
					"activateTreasure fail, treasureId=" + treasureId);
		}
	}

	/**
	 * 宝物升星
	 * 
	 * @param hero
	 * @param treasureId
	 */
	public void upgradeStar(Hero hero, int treasureId) {
		if (hero == null) {
			return;
		}
		try {
			long hid = hero.getId();
			TreasureData treasureData = hero.getTreasureData();
			if (treasureData == null) {
				// 系统未开启
				return;
			}
			Map<Integer, TreasureModel> treasureMap = treasureData.getTreasureMap();
			if (!treasureMap.containsKey(treasureId)) {
				// 未激活
				return;
			}
			Struct_bao_214 struct_bao_214 = Config_bao_214.getIns().get(treasureId);
			if (struct_bao_214 == null) {
				// 宝物不存在
				TreasureSender.sendCmd_952(hid, 0, 1, 0);
				return;
			}
			TreasureModel model = treasureMap.get(treasureId);
			int starLevel = model.getStarLevel();
			if (starLevel >= struct_bao_214.getStar()) {
				// 已到达最高星级
				TreasureSender.sendCmd_952(hid, 0, 2, 0);
				return;
			}
			int[][] item = struct_bao_214.getItem();
			if (!UseAddUtil.canUse(hero, item)) {
				// 材料不足
				TreasureSender.sendCmd_952(hid, 0, 3, 0);
				return;
			}
			UseAddUtil.use(hero, item, SourceGoodConst.TREASURE_UPGRADESTAR, true);
			starLevel += 1;
			model.setStarLevel(starLevel);
			treasureMap.put(treasureId, model);
			TreasureSender.sendCmd_952(hid, 1, treasureId, starLevel);
			// 重新计算战力
			FightCalcFunction.setRecalcAll(hero, FightCalcConst.TREASURE_UPGRADESTAR,SystemIdConst.Treasure_SYSID);
			LogTool.info(hid, hero.getName(), "TreasureManager starLevel=" + starLevel, TreasureManager.class);
			if (starLevel >= struct_bao_214.getStar()) {
				// 已到达最高星级->觉醒红点
				ZhanJiaFunction.getIns().jueXingRedPonint(hero,false);
				
			}
			// 成就
			AchievementFunction.getIns().checkTask(hero, AchievementEnum.GOAL_12, 0);
		} catch (Exception e) {
			LogTool.error(e, TreasureManager.class, hero.getId(), hero.getName(),
					"upgradeStar fail, treasureId=" + treasureId);
		}
	}

	/**
	 * 吞噬宝物属性丹
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
			TreasureData treasureData = hero.getTreasureData();
			if (treasureData == null) {
				// 系统未开启
				return;
			}
			int itemid = Config_drug_200.getIns().get(TreasureConst.Dan5).getId();
			int goodsNum = BagFunction.getIns().getGoodsNumBySysId(hid, itemid);
			if (goodsNum == 0) {
				// 材料不足
				TreasureSender.sendCmd_954(hid, 0, 1);
				return;
			}
			Map<Integer, Integer> danyao = hero.getDanyao();
			Integer danNum = danyao.get(TreasureConst.Dan5);
			if (danNum == null) {
				danNum = 0;
			}
			int devourLimit = getDevourLimit(treasureData);
			if (danNum >= devourLimit) {
				// 可使用上限
				TreasureSender.sendCmd_954(hid, 0, 2);
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
			UseAddUtil.use(hero, GameConst.TOOL, useNum, itemid, SourceGoodConst.TREASURE_DAN5, true);
			int totalUse = danNum + useNum;
			danyao.put(TreasureConst.Dan5, totalUse);
			TreasureSender.sendCmd_954(hid, 1, totalUse);
			// 重新计算战力
			FightCalcFunction.setRecalcAll(hero, FightCalcConst.TREASURE_EEVOURELIXIR,SystemIdConst.Treasure_SYSID);
			// 刷新排行
			RankingFunction.getIns().refreshTreasureRankList(hero);
			//七日武圣榜
			SevenWuShenRankFunction.getIns().refreshSevenWuShenRank(hero, SevenWuShenRankConst.TYPE_TREASURE);
			//开服狂欢
			SevenHappyFunction.getIns().refreshSevenWuShenRank(hero, SevenHappyConst.TYPE_3);
		} catch (Exception e) {
			LogTool.error(e, TreasureManager.class, hero.getId(), hero.getName(), "devourElixir fail, type=" + type);
		}
	}

	private int getDevourLimit(TreasureData treasureData) {
		if (treasureData == null) {
			return 0;
		}
		int totalNum = 0;
		Map<Integer, TreasureModel> treasureMap = treasureData.getTreasureMap();
		Iterator<TreasureModel> iterator = treasureMap.values().iterator();
		TreasureModel treasureModel = null;
		Struct_bao_214 struct_bao_214 = null;
		for (; iterator.hasNext();) {
			treasureModel = iterator.next();
			struct_bao_214 = Config_bao_214.getIns().get(treasureModel.getId());
			if (struct_bao_214 != null) {
				totalNum += struct_bao_214.getMax() * treasureModel.getStarLevel();
			}
		}
		return totalNum;
	}

}
