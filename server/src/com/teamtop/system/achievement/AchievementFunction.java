package com.teamtop.system.achievement;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.achievement.model.Achievement;
import com.teamtop.system.achievement.model.GoalNumInfo;
import com.teamtop.system.archive.model.ArchiveData;
import com.teamtop.system.archive.model.ArchiveModel;
import com.teamtop.system.bingfa.BingFa;
import com.teamtop.system.bingfa.BingFaModel;
import com.teamtop.system.excalibur.model.Excalibur;
import com.teamtop.system.excalibur.model.ExcaliburModel;
import com.teamtop.system.fashionClothes.FashionClothes;
import com.teamtop.system.forge.model.Forge;
import com.teamtop.system.generalSoul.model.GeneralSoul;
import com.teamtop.system.godWeapon.GodWeapon;
import com.teamtop.system.godWeapon.GodWeaponInfo;
import com.teamtop.system.godbook.GodBook;
import com.teamtop.system.godbook.GodBookModel;
import com.teamtop.system.guanqia.Guanqia;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.huoShaoChiBi.HuoShaoChiBi;
import com.teamtop.system.littleLeader.LittleLeader;
import com.teamtop.system.littleLeader.LittleLeaderModel;
import com.teamtop.system.peacockFloor.PeacockFloor;
import com.teamtop.system.privilegeCard.PrivilegeCardFunction;
import com.teamtop.system.promotion.model.PromotionModel;
import com.teamtop.system.qice.model.QiCe;
import com.teamtop.system.qice.model.QiCeModel;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.system.skill.SkillFunction;
import com.teamtop.system.specialAnimalDir.model.SpecialAnimalDir;
import com.teamtop.system.specialAnimalDir.model.SpecialAnimalDirInfo;
import com.teamtop.system.specialTreasure.SpecialTreasure;
import com.teamtop.system.treasure.model.TreasureData;
import com.teamtop.system.treasure.model.TreasureModel;
import com.teamtop.system.weekCard.model.WeekCardModel;
import com.teamtop.system.wujiang.WuJiang;
import com.teamtop.system.wujiang.WuJiangModel;
import com.teamtop.system.zhanjia.ZhanJia;
import com.teamtop.system.zhanjia.ZhanJiaModel;
import com.teamtop.system.zhenYan.ZhenYan;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_bao_214;
import excel.config.Config_book_213;
import excel.config.Config_book_215;
import excel.config.Config_cjds_746;
import excel.config.Config_clothes_212;
import excel.config.Config_dzgem_209;
import excel.config.Config_hero_211;
import excel.config.Config_picstar_005;
import excel.config.Config_picture_005;
import excel.config.Config_qc_760;
import excel.config.Config_sb_750;
import excel.config.Config_sword_216;
import excel.config.Config_sz_739;
import excel.config.Config_yb_217;
import excel.struct.Struct_cj_746;
import excel.struct.Struct_cjds_746;
import excel.struct.Struct_picstar_005;

public class AchievementFunction {

	private static AchievementFunction ins;

	private AchievementFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized AchievementFunction getIns() {
		if (ins == null) {
			ins = new AchievementFunction();
		}
		return ins;
	}

	public void checkTask(Hero hero, AchievementEnum type, int addNum) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			Achievement model = hero.getAchievement();
			if (model == null) {
				return;
			}
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.ACHIEVEMENT)) {
				return;
			}
			Map<Integer, Struct_cj_746> map = AchievementSysCache.getTypeTaskMap().get(type.getType());
			if(map==null) {
				return;
			}
			long c1 = 0l;
			int c2 = 0;
			Map<Integer, Integer> bsMap = null;
			Map<Integer, Integer> wjMap = null;
			Map<Integer, Integer> zjMap = null;
			Map<Integer, Integer> bwMap = null;
			Map<Integer, Integer> sjMap = null;
			Map<Integer, Integer> ybMap = null;
			Map<Integer, Integer> bfMap = null;
			Map<Integer, Integer> szMap = null;
			Map<Integer, Integer> tjMap = null;
			Map<Integer, Integer> tsMap = null;
			Map<Integer, Integer> sbMap = null;
			Map<Integer, Integer> qcMap = null;
			Map<Integer, Integer> mhMap = null;
			Map<Integer, Integer> lbbossMap = null;
			Map<Integer, Integer> xxMap = null;
			Map<Integer, Integer> ddMap = null;
			Map<Integer, Integer> zhenyanHandleMap = null;
			Map<Integer, GoalNumInfo> goalNumMap = model.getGoalNumMap();
			int msType = type.getType();
			GoalNumInfo goalNumInfo = goalNumMap.get(msType);
			if (goalNumInfo == null) {
				goalNumInfo = new GoalNumInfo();
				goalNumMap.put(msType, goalNumInfo);
			}
			switch (type) {
			case GOAL_1:
				bsMap = sumINT(hero);
				Map<Integer, Integer> goalMap1 = goalNumInfo.getGoalMap();
				if (goalMap1 == null) {
					goalMap1 = new HashMap<>();
					goalNumInfo.setGoalMap(goalMap1);
				}
				break;
			case GOAL_2:
				Integer skillSum = SkillFunction.getIns().getMaxNum(hero);
				if(skillSum!=null) {
					goalNumInfo.setNum(skillSum);
				}			
				break;
			case GOAL_3:
				Forge forge = hero.getForge();
				if (forge != null) {
					goalNumInfo.setNum(hero.getForge().getShenLv());
				}
				break;
			/*case GOAL_4:
				Map<Integer, StarPictureModel> starPictureMap = hero.getStarPictureMap();
				if (starPictureMap != null) {
					xtMap = new HashMap<>();
					int xtNum = 0;
					for (StarPictureModel starPictureModel : starPictureMap.values()) {
						int level = starPictureModel.getLevel();
						if (xtMap.get(level) == null) {
							xtNum = 0;
						}
						xtMap.put(level, xtNum + 1);
					}
				}
				Map<Integer, Integer> goalMap2 = goalNumInfo.getGoalMap();
				if (goalMap2 == null) {
					goalMap2 = new HashMap<>();
					goalNumInfo.setGoalMap(goalMap2);
				}
				break;*/
			case GOAL_5:
				long totalStrength = hero.getTotalStrength();
				long oldStrength = goalNumInfo.getNum();
				if (oldStrength == 0) {
					goalNumInfo.setNum(totalStrength);
				} else if (totalStrength > oldStrength) {
					goalNumInfo.setNum(totalStrength);
				}
				break;
			case GOAL_6:
				PromotionModel promotionModel = hero.getPromotionModel();
				if (promotionModel != null) {
					goalNumInfo.setNum(promotionModel.getLevel());
				}
				break;
			case GOAL_7:
				WuJiang wujiang = hero.getWujiang();
				if (wujiang != null) {
					goalNumInfo.setNum(wujiang.getWujiangs().size());
				}
				break;
			case GOAL_8:
				WuJiang wujiang1 = hero.getWujiang();
				if (wujiang1 != null) {
					Map<Integer, WuJiangModel> wujiangMap = wujiang1.getWujiangs();
					wjMap = new HashMap<>();
					int num = 0;
					for (WuJiangModel wuJiangModel : wujiangMap.values()) {
						int type2 = wuJiangModel.getType();
						int pinzhi = Config_hero_211.getIns().get(type2).getPinzhi();
						int star = wuJiangModel.getStar();
						for (int i = 1; i <= pinzhi; i++) {
							if (wjMap.get(i) == null) {
								num = 0;
								wjMap.put(i, num);
							}
							num = star + wjMap.get(i);
							wjMap.put(i, num);
						}
					}
				}
				Map<Integer, Integer> goalMap3 = goalNumInfo.getGoalMap();
				if (goalMap3 == null) {
					goalMap3 = new HashMap<>();
					goalNumInfo.setGoalMap(goalMap3);
				}
				break;
			case GOAL_9:
				ZhanJia zhanJia = hero.getZhanJia();
				if (zhanJia != null) {
					goalNumInfo.setNum(zhanJia.getZhanjias().size());
				}
				break;
			case GOAL_10:
				ZhanJia zhanJia1 = hero.getZhanJia();
				if (zhanJia1 != null) {
					HashMap<Integer, ZhanJiaModel> zhanjias = zhanJia1.getZhanjias();
					zjMap = new HashMap<>();
					int num = 0;
					for (ZhanJiaModel zhanJiaModel : zhanjias.values()) {
						int type2 = zhanJiaModel.getType();
						int pinzhi = Config_clothes_212.getIns().get(type2).getPinzhi();
						int star = zhanJiaModel.getStar();
						for (int i = 1; i <= pinzhi; i++) {
							if (zjMap.get(i) == null) {
								num = 0;
								zjMap.put(i, num);
							}
							num = star + zjMap.get(i);
							zjMap.put(i, num);
						}
					}
				}
				Map<Integer, Integer> goalMap4 = goalNumInfo.getGoalMap();
				if (goalMap4 == null) {
					goalMap4 = new HashMap<>();
					goalNumInfo.setGoalMap(goalMap4);
				}
				break;
			case GOAL_11:
				TreasureData treasureData = hero.getTreasureData();
				if (treasureData != null) {
					goalNumInfo.setNum(treasureData.getTreasureMap().size());
				}
				break;
			case GOAL_12:
				TreasureData treasureData1 = hero.getTreasureData();
				if (treasureData1 != null) {
					Map<Integer, TreasureModel> treasureMap = treasureData1.getTreasureMap();
					bwMap = new HashMap<>();
					int num = 0;
					for (TreasureModel treasureModel : treasureMap.values()) {
						int id = treasureModel.getId();
						int pinzhi = Config_bao_214.getIns().get(id).getPin();
						int star = treasureModel.getStarLevel();
						for (int i = 1; i <= pinzhi; i++) {
							if (bwMap.get(i) == null) {
								num = 0;
								bwMap.put(i, num);
							}
							num = star + bwMap.get(i);
							bwMap.put(i, num);
						}
					}
				}
				Map<Integer, Integer> goalMap5 = goalNumInfo.getGoalMap();
				if (goalMap5 == null) {
					goalMap5 = new HashMap<>();
					goalNumInfo.setGoalMap(goalMap5);
				}
				break;
			case GOAL_13:
				Excalibur excalibur = hero.getExcalibur();
				if (excalibur != null) {
					goalNumInfo.setNum(excalibur.getExcaliburMap().size());
				}
				break;
			case GOAL_14:
				Excalibur excalibur1 = hero.getExcalibur();		
				if (excalibur1 != null) {
					Map<Integer, ExcaliburModel> excaliburMap = excalibur1.getExcaliburMap();
					sjMap = new HashMap<>();
					int num = 0;
					for (ExcaliburModel excaliburModel : excaliburMap.values()) {
						int id = excaliburModel.getId();
						int pinzhi = Config_sword_216.getIns().get(id).getPin();
						int star = excaliburModel.getStarLevel();
						for (int i = 1; i <= pinzhi; i++) {
							if (sjMap.get(i) == null) {
								num = 0;
								sjMap.put(i, num);
							}
							num = star + sjMap.get(i);
							sjMap.put(i, num);
						}
					}
				}
				Map<Integer, Integer> goalMap6 = goalNumInfo.getGoalMap();
				if (goalMap6 == null) {
					goalMap6 = new HashMap<>();
					goalNumInfo.setGoalMap(goalMap6);
				}
				break;
			case GOAL_15:
				SpecialTreasure specialTreasure = hero.getSpecialTreasure();
				if (specialTreasure != null) {
					goalNumInfo.setNum(specialTreasure.getTreasureStar().size());
				}
				break;
			case GOAL_16:
				SpecialTreasure specialTreasure1 = hero.getSpecialTreasure();
				if (specialTreasure1 != null) {
					Map<Integer, Integer> treasureStarMap = specialTreasure1.getTreasureStar();
					ybMap = new HashMap<>();
					int num = 0;
					for (Integer id : treasureStarMap.keySet()) {
						int pinzhi = Config_yb_217.getIns().get(id).getPin();
						int star = treasureStarMap.get(id);
						for (int i = 1; i <= pinzhi; i++) {
							if (ybMap.get(i) == null) {
								num = 0;
								ybMap.put(i, num);
							}
							num = star + ybMap.get(i);
							ybMap.put(i, num);
						}
					}
				}
				Map<Integer, Integer> goalMap7 = goalNumInfo.getGoalMap();
				if (goalMap7 == null) {
					goalMap7 = new HashMap<>();
					goalNumInfo.setGoalMap(goalMap7);
				}
				break;
			case GOAL_17:
				BingFa bingfa = hero.getBingfa();
				if (bingfa != null) {
					goalNumInfo.setNum(bingfa.getBingfas().size());
				}
				break;
			case GOAL_18:
				BingFa bingfa1 = hero.getBingfa();
				if (bingfa1 != null) {
					Map<Integer, BingFaModel> bingfaMap = bingfa1.getBingfas();
					bfMap = new HashMap<>();
					int num = 0;
					for (BingFaModel bingFaModel : bingfaMap.values()) {
						int id = bingFaModel.getIndex();
						int pinzhi = Config_book_213.getIns().get(id).getPin();
						int star = bingFaModel.getStar();
						for (int i = 1; i <= pinzhi; i++) {
							if (bfMap.get(i) == null) {
								num = 0;
								bfMap.put(i, num);
							}
							num = star + bfMap.get(i);
							bfMap.put(i, num);
						}
					}
				}
				Map<Integer, Integer> goalMap8 = goalNumInfo.getGoalMap();
				if (goalMap8 == null) {
					goalMap8 = new HashMap<>();
					goalNumInfo.setGoalMap(goalMap8);
				}
				break;
			case GOAL_19:
				FashionClothes fashionClothes = hero.getFashionClothes();
				if (fashionClothes != null) {
					goalNumInfo.setNum(fashionClothes.getClothesStar().size());
				}
				break;
			case GOAL_20:
				FashionClothes fashionClothes1 = hero.getFashionClothes();
				if (fashionClothes1 != null) {
					Map<Integer, Integer> ClothesStar = fashionClothes1.getClothesStar();
					szMap = new HashMap<>();
					int num = 0;
					for (Integer id : ClothesStar.keySet()) {
						int wujiangId = Config_sz_739.getIns().get(id).getID() / 1000;
						int pinzhi = Config_hero_211.getIns().get(wujiangId).getPinzhi();
						int star = ClothesStar.get(id);
						for (int i = 1; i <= pinzhi; i++) {
							if (szMap.get(i) == null) {
								num = 0;
								szMap.put(i, num);
							}
							num = star + szMap.get(i);
							szMap.put(i, num);
						}
					}
				}
				Map<Integer, Integer> goalMap9 = goalNumInfo.getGoalMap();
				if (goalMap9 == null) {
					goalMap9 = new HashMap<>();
					goalNumInfo.setGoalMap(goalMap9);
				}
				break;
			case GOAL_21:
				ArchiveData archiveData = hero.getArchiveData();
				if (archiveData != null) {
					goalNumInfo.setNum(archiveData.getArchiveMap().size());
				}
				break;
			case GOAL_22:
				ArchiveData archiveData1 = hero.getArchiveData();
				if (archiveData1 != null) {
					Map<Integer, ArchiveModel> archiveMap = archiveData1.getArchiveMap();
					tjMap = new HashMap<>();
					int num = 0;
					for (ArchiveModel archiveModel : archiveMap.values()) {
						int id = archiveModel.getId();
						int pinzhi = Config_picture_005.getIns().get(id).getQuality();
						int star = archiveModel.getStarLevelIndex();
						Struct_picstar_005 struct_picstar_005 = Config_picstar_005.getIns().get(star);
						int lv = struct_picstar_005.getLv();
						for (int i = 1; i <= pinzhi; i++) {
							if (tjMap.get(i) == null) {
								num = 0;
								tjMap.put(i, num);
							}
							num = lv + tjMap.get(i);
							tjMap.put(i, num);
						}
					}
				}
				Map<Integer, Integer> goalMap10 = goalNumInfo.getGoalMap();
				if (goalMap10 == null) {
					goalMap10 = new HashMap<>();
					goalNumInfo.setGoalMap(goalMap10);
				}
				break;
			case GOAL_23:
				GodBook godbook = hero.getGodbook();
				if (godbook != null) {
					goalNumInfo.setNum(godbook.getHasBooks().size());
				}
				break;
			case GOAL_24:
				GodBook godbook1 = hero.getGodbook();
				if (godbook1 != null) {
					Map<Integer, GodBookModel> bookMap = godbook1.getHasBooks();
					tsMap = new HashMap<>();
					int num = 0;
					for (GodBookModel godBookModel : bookMap.values()) {
						int id = godBookModel.getId();
						int pinzhi = Config_book_215.getIns().get(id).getPin();
						int star = godBookModel.getStar();
						for (int i = 1; i <= pinzhi; i++) {
							if (tsMap.get(i) == null) {
								num = 0;
								tsMap.put(i, num);
							}
							num = star + tsMap.get(i);
							tsMap.put(i, num);
						}
					}
				}
				Map<Integer, Integer> goalMap11 = goalNumInfo.getGoalMap();
				if (goalMap11 == null) {
					goalMap11 = new HashMap<>();
					goalNumInfo.setGoalMap(goalMap11);
				}
				break;
			case GOAL_25:
				GeneralSoul generalSoul = hero.getGeneralSoul();
				if (generalSoul != null) {
					goalNumInfo.setNum(generalSoul.getGeneralSoulMap().size());
				}
				break;
			case GOAL_26:
				SpecialAnimalDir specialAnimalDir = hero.getSpecialAnimalDir();
				if (specialAnimalDir != null) {
					goalNumInfo.setNum(specialAnimalDir.getInfoMap().size());
				}
				break;
			case GOAL_27:
				SpecialAnimalDir specialAnimalDir1 = hero.getSpecialAnimalDir();
				if (specialAnimalDir1 != null) {
					Iterator<SpecialAnimalDirInfo> iterator = specialAnimalDir1.getInfoMap().values().iterator();
					int talentSkillSum = 0;
					while (iterator.hasNext()) {
						SpecialAnimalDirInfo specialAnimalDirInfo = iterator.next();
						int talentSkill = specialAnimalDirInfo.getTalentSkill() % 1000;
						if (talentSkill > 0) {
							talentSkillSum += 1;
						}
					}
					goalNumInfo.setNum(talentSkillSum);
				}
				break;
			case GOAL_28:
				GodWeapon godWeapon = hero.getGodWeapon();
				if (godWeapon != null) {
					goalNumInfo.setNum(godWeapon.getWeaponIdByWuJiang().size());
				}
				break;
			case GOAL_29:
				GodWeapon godWeapon1 = hero.getGodWeapon();
				if (godWeapon1 != null) {
					Map<Integer, GodWeaponInfo> godWeaponMap = godWeapon1.getWeaponIdByWuJiang();
					sbMap = new HashMap<>();
					int num = 0;
					for (GodWeaponInfo godWeaponInfo : godWeaponMap.values()) {
						int id = godWeaponInfo.getType() * 1000;
						int pinzhi = Config_sb_750.getIns().get(id).getPinzhi();
						int star = godWeaponInfo.getStar();
						for (int i = 1; i <= pinzhi; i++) {
							if (sbMap.get(i) == null) {
								num = 0;
								sbMap.put(i, num);
							}
							num = star + sbMap.get(i);
							sbMap.put(i, num);
						}
					}
				}
				Map<Integer, Integer> goalMap12 = goalNumInfo.getGoalMap();
				if (goalMap12 == null) {
					goalMap12 = new HashMap<>();
					goalNumInfo.setGoalMap(goalMap12);
				}
				break;
			case GOAL_30:
				QiCe qiCe = hero.getQiCe();
				if (qiCe != null) {
					goalNumInfo.setNum(qiCe.getQiCeMap().size());
				}
				break;
			case GOAL_31:
				QiCe qiCe1 = hero.getQiCe();
				if (qiCe1 != null) {
					Map<Integer, QiCeModel> qiceMap = qiCe1.getQiCeMap();
					qcMap = new HashMap<>();
					int num = 0;
					for (QiCeModel qiCeModel : qiceMap.values()) {
						int id = qiCeModel.getIndex();
						int pinzhi = Config_qc_760.getIns().get(id).getPz();
						int star = qiCeModel.getStar();
						for (int i = 1; i <= pinzhi; i++) {
							if (qcMap.get(i) == null) {
								num = 0;
								qcMap.put(i, num);
							}
							num = star + qcMap.get(i);
							qcMap.put(i, num);
						}
					}
				}
				Map<Integer, Integer> goalMap13 = goalNumInfo.getGoalMap();
				if (goalMap13 == null) {
					goalMap13 = new HashMap<>();
					goalNumInfo.setGoalMap(goalMap13);
				}
				break;
			case GOAL_32:
				zhenyanHandleMap = zhenyanHandle(hero);
				Map<Integer, Integer> goalMap18 = goalNumInfo.getGoalMap();
				if (goalMap18 == null) {
					goalMap18 = new HashMap<>();
					goalNumInfo.setGoalMap(goalMap18);
				}
				break;
			case GOAL_33:
				LittleLeader littleLeader1 = hero.getLittleLeader();
				if (littleLeader1 != null) {
					LittleLeaderModel littleLeaderModel = littleLeader1.getHasLittleLeaderModels().get(1);
					if (littleLeaderModel != null) {
						int star = littleLeaderModel.getStar();
						goalNumInfo.setNum(star);
					}
				}
				break;
			case GOAL_34:
				LittleLeader littleLeader2 = hero.getLittleLeader();
				if (littleLeader2 != null) {
					LittleLeaderModel littleLeaderModel2 = littleLeader2.getHasLittleLeaderModels().get(2);
					if (littleLeaderModel2 != null) {
						int star = littleLeaderModel2.getStar();
						goalNumInfo.setNum(star);
					}
				}
				break;
			case GOAL_35:
				LittleLeader littleLeader3 = hero.getLittleLeader();
				if (littleLeader3 != null) {
					LittleLeaderModel littleLeaderModel3 = littleLeader3.getHasLittleLeaderModels().get(3);
					if (littleLeaderModel3 != null) {
						int star = littleLeaderModel3.getStar();
						goalNumInfo.setNum(star);
					}
				}
				break;
			case GOAL_36:
				Guanqia guanqia = hero.getGuanqia();
				if (guanqia != null) {
					goalNumInfo.setNum(guanqia.getCurGuanqia());
				}
				break;
			case GOAL_37:
				PeacockFloor peacockFloor = hero.getPeacockFloor();
				if (peacockFloor != null) {
					goalNumInfo.setNum(peacockFloor.getFloorNum());
				}
				break;
			/*case GOAL_38:
				Integer maxNum = hero.getRunningMan().getMaxHisnum();
				if (maxNum != null) {
					goalNumInfo.setNum(maxNum % 1000);
				}
				break;*/
			case GOAL_39:
				HuoShaoChiBi huoShaoChiBi = hero.getHuoShaoChiBi();
				if (huoShaoChiBi != null) {
					goalNumInfo.setNum(huoShaoChiBi.getFloorNum());
				}
				break;
			case GOAL_40:
				Map<Integer, Map<Integer, Integer>> bossMap = hero.getAchievement().getCountMap();
				mhMap = bossMap.get(AchievementConst.count_1);
				if (mhMap == null) {
					mhMap = new HashMap<>();
					bossMap.put(AchievementConst.count_1, mhMap);
				}
				if (addNum == 0) {
					break;
				}
				for (int i = 1; i <= 10; i++) {
					if (i < addNum) {
						continue;
					}
					Integer mhNum = mhMap.get(i);
					if (mhNum == null) {
						mhNum = 0;
					}
					mhMap.put(i, mhNum + 1);
				}
				Map<Integer, Integer> goalMap14 = goalNumInfo.getGoalMap();
				if (goalMap14 == null) {
					goalMap14 = new HashMap<>();
					goalNumInfo.setGoalMap(goalMap14);
				}
				break;
			case GOAL_41:
				Map<Integer, Map<Integer, Integer>> bossMap1 = hero.getAchievement().getCountMap();
				lbbossMap = bossMap1.get(AchievementConst.count_2);
				if (lbbossMap == null) {
					lbbossMap = new HashMap<>();
					bossMap1.put(AchievementConst.count_2, lbbossMap);
				}
				if (addNum == 0) {
					break;
				}
				for (int i = 1; i <= 10; i++) {
					if (i < addNum) {
						continue;
					}
					Integer lbNum = lbbossMap.get(i);
					if (lbNum == null) {
						lbNum = 0;
					}
					lbbossMap.put(i, lbNum + 1);
				}
				Map<Integer, Integer> goalMap15 = goalNumInfo.getGoalMap();
				if (goalMap15 == null) {
					goalMap15 = new HashMap<>();
					goalNumInfo.setGoalMap(goalMap15);
				}
				break;
			case GOAL_42:
				Map<Integer, Map<Integer, Integer>> countMap = hero.getAchievement().getCountMap();
				ddMap = countMap.get(AchievementConst.count_3);
				if (ddMap == null) {
					ddMap = new HashMap<>();
					countMap.put(AchievementConst.count_3, ddMap);
				}
				Integer ddNum = ddMap.get(addNum);
				if (ddNum == null) {
					ddNum = 0;
				}
				ddMap.put(addNum, ddNum + 1);
				Map<Integer, Integer> goalMap16 = goalNumInfo.getGoalMap();
				if (goalMap16 == null) {
					goalMap16 = new HashMap<>();
					goalNumInfo.setGoalMap(goalMap16);
				}
				break;
			case GOAL_43:
				Map<Integer, Map<Integer, Integer>> countMap1 = hero.getAchievement().getCountMap();
				xxMap = countMap1.get(AchievementConst.count_4);
				if (xxMap == null) {
					xxMap = new HashMap<>();
					countMap1.put(AchievementConst.count_4, xxMap);
				}
				Integer xxNum = xxMap.get(addNum);
				if (xxNum == null) {
					xxNum = 0;
				}
				xxMap.put(addNum, xxNum + 1);
				Map<Integer, Integer> goalMap17 = goalNumInfo.getGoalMap();
				if (goalMap17 == null) {
					goalMap17 = new HashMap<>();
					goalNumInfo.setGoalMap(goalMap17);
				}
				break;
			case GOAL_44:
				Integer vipLv = hero.getVipLv();
				if (vipLv != null) {
					goalNumInfo.setNum(vipLv);
				}
				break;
			case GOAL_45:
				PrivilegeCardFunction.getIns().checkPrivilegeCard(hero);
				WeekCardModel weekCardModel = hero.getWeekCardModel();
				int cardNum = 0;
				if (weekCardModel != null) {
					int endTime = weekCardModel.getEndTime();
					int currentTime = TimeDateUtil.getCurrentTime();
					if (endTime >= currentTime) {
						cardNum = 1;
					}
				}
				Map<Integer, int[]> privilegeCardMap = hero.getPrivilegeCardMap();
				if (privilegeCardMap != null) {
					int size = privilegeCardMap.size();
					cardNum += size;
				}
				goalNumInfo.setNum(cardNum);
				break;
			}

			Map<Integer, Integer> taskMap = model.getGoalTaskMap().get(type.getType());

			Iterator<Struct_cj_746> iterator = map.values().iterator();
			Struct_cj_746 cj_746 = null;
			for (; iterator.hasNext();) {
				cj_746 = iterator.next();
				c1 = cj_746.getCs1();
				c2 = cj_746.getCs2();
				if (taskMap.containsKey(cj_746.getId())) {
					continue;
				}
				switch (type) {
				case GOAL_1:
					Integer baoshilvNum = bsMap.get((int) c2);
					if (baoshilvNum == null) {
						baoshilvNum = 0;
					}
					Map<Integer, Integer> goalMap1 = goalNumInfo.getGoalMap();
					goalMap1.put(cj_746.getId(), baoshilvNum);
					if (baoshilvNum >= c1) {
						taskMap.put(cj_746.getId(), AchievementConst.CAN_GET);
					}
					break;
				case GOAL_2:
					if (goalNumInfo.getNum() >= c1) {
						taskMap.put(cj_746.getId(), AchievementConst.CAN_GET);
					}
					break;
				case GOAL_3:
					if (goalNumInfo.getNum() >= c1) {
						taskMap.put(cj_746.getId(), AchievementConst.CAN_GET);
					}
					break;
				/*case GOAL_4:
					Integer xtNum = xtMap.get(c2);
					if (xtNum == null) {
						xtNum = 0;
					}
					Map<Integer, Integer> goalMap2 = goalNumInfo.getGoalMap();
					goalMap2.put(cj_746.getId(), xtNum);
					if (xtNum >= c2) {
						taskMap.put(cj_746.getId(), AchievementConst.CAN_GET);
					}
					break;*/
				case GOAL_5:
					if (goalNumInfo.getNum() >= c1) {
						taskMap.put(cj_746.getId(), AchievementConst.CAN_GET);
					}
					break;
				case GOAL_6:
					if (goalNumInfo.getNum() >= c1) {
						taskMap.put(cj_746.getId(), AchievementConst.CAN_GET);
					}
					break;
				case GOAL_7:
					if (goalNumInfo.getNum() >= c1) {
						taskMap.put(cj_746.getId(), AchievementConst.CAN_GET);
					}
					break;
				case GOAL_8:
					Integer wjNum = wjMap.get((int) c2);
					if (wjNum == null) {
						wjNum = 0;
					}
					Map<Integer, Integer> goalMap3 = goalNumInfo.getGoalMap();
					goalMap3.put(cj_746.getId(), wjNum);
					if (wjNum >= c1) {
						taskMap.put(cj_746.getId(), AchievementConst.CAN_GET);
					}
					break;
				case GOAL_9:
					if (goalNumInfo.getNum() >= c1) {
						taskMap.put(cj_746.getId(), AchievementConst.CAN_GET);
					}
					break;
				case GOAL_10:
					Integer zjNum = zjMap.get((int) c2);
					if (zjNum == null) {
						zjNum = 0;
					}
					Map<Integer, Integer> goalMap4 = goalNumInfo.getGoalMap();
					goalMap4.put(cj_746.getId(), zjNum);
					if (zjNum >= c1) {
						taskMap.put(cj_746.getId(), AchievementConst.CAN_GET);
					}
					break;
				case GOAL_11:
					if (goalNumInfo.getNum() >= c1) {
						taskMap.put(cj_746.getId(), AchievementConst.CAN_GET);
					}
					break;
				case GOAL_12:
					Integer bwNum = bwMap.get((int) c2);
					if (bwNum == null) {
						bwNum = 0;
					}
					Map<Integer, Integer> goalMap5 = goalNumInfo.getGoalMap();
					goalMap5.put(cj_746.getId(), bwNum);
					if (bwNum >= c1) {
						taskMap.put(cj_746.getId(), AchievementConst.CAN_GET);
					}
					break;
				case GOAL_13:
					if (goalNumInfo.getNum() >= c1) {
						taskMap.put(cj_746.getId(), AchievementConst.CAN_GET);
					}
					break;
				case GOAL_14:
					Integer sjNum = sjMap.get((int) c2);
					if (sjNum == null) {
						sjNum = 0;
					}
					Map<Integer, Integer> goalMap6 = goalNumInfo.getGoalMap();
					goalMap6.put(cj_746.getId(), sjNum);
					if (sjNum >= c1) {
						taskMap.put(cj_746.getId(), AchievementConst.CAN_GET);
					}
					break;
				case GOAL_15:
					if (goalNumInfo.getNum() >= c1) {
						taskMap.put(cj_746.getId(), AchievementConst.CAN_GET);
					}
					break;
				case GOAL_16:
					Integer ybNum = ybMap.get((int) c2);
					if (ybNum == null) {
						ybNum = 0;
					}
					Map<Integer, Integer> goalMap7 = goalNumInfo.getGoalMap();
					goalMap7.put(cj_746.getId(), ybNum);
					if (ybNum >= c1) {
						taskMap.put(cj_746.getId(), AchievementConst.CAN_GET);
					}
					break;
				case GOAL_17:
					if (goalNumInfo.getNum() >= c1) {
						taskMap.put(cj_746.getId(), AchievementConst.CAN_GET);
					}
					break;
				case GOAL_18:
					Integer bfNum = bfMap.get((int) c2);
					if (bfNum == null) {
						bfNum = 0;
					}
					Map<Integer, Integer> goalMap8 = goalNumInfo.getGoalMap();
					goalMap8.put(cj_746.getId(), bfNum);
					if (bfNum >= c1) {
						taskMap.put(cj_746.getId(), AchievementConst.CAN_GET);
					}
					break;
				case GOAL_19:
					if (goalNumInfo.getNum() >= c1) {
						taskMap.put(cj_746.getId(), AchievementConst.CAN_GET);
					}
					break;
				case GOAL_20:
					Integer szNum = szMap.get((int) c2);
					if (szNum == null) {
						szNum = 0;
					}
					Map<Integer, Integer> goalMap9 = goalNumInfo.getGoalMap();
					goalMap9.put(cj_746.getId(), szNum);
					if (szNum >= c1) {
						taskMap.put(cj_746.getId(), AchievementConst.CAN_GET);
					}
					break;
				case GOAL_21:
					if (goalNumInfo.getNum() >= c1) {
						taskMap.put(cj_746.getId(), AchievementConst.CAN_GET);
					}
					break;
				case GOAL_22:
					Integer tjNum = tjMap.get((int) c2);
					if (tjNum == null) {
						tjNum = 0;
					}
					Map<Integer, Integer> goalMap10 = goalNumInfo.getGoalMap();
					goalMap10.put(cj_746.getId(), tjNum);
					if (tjNum >= c1) {
						taskMap.put(cj_746.getId(), AchievementConst.CAN_GET);
					}
					break;
				case GOAL_23:
					if (goalNumInfo.getNum() >= c1) {
						taskMap.put(cj_746.getId(), AchievementConst.CAN_GET);
					}
					break;
				case GOAL_24:
					Integer tsNum = tsMap.get((int) c2);
					if (tsNum == null) {
						tsNum = 0;
					}
					Map<Integer, Integer> goalMap11 = goalNumInfo.getGoalMap();
					goalMap11.put(cj_746.getId(), tsNum);
					if (tsNum >= c1) {
						taskMap.put(cj_746.getId(), AchievementConst.CAN_GET);
					}
					break;
				case GOAL_25:
					if (goalNumInfo.getNum() >= c1) {
						taskMap.put(cj_746.getId(), AchievementConst.CAN_GET);
					}
					break;
				case GOAL_26:
					if (goalNumInfo.getNum() >= c1) {
						taskMap.put(cj_746.getId(), AchievementConst.CAN_GET);
					}
					break;
				case GOAL_27:
					if (goalNumInfo.getNum() >= c1) {
						taskMap.put(cj_746.getId(), AchievementConst.CAN_GET);
					}
					break;
				case GOAL_28:
					if (goalNumInfo.getNum() >= c1) {
						taskMap.put(cj_746.getId(), AchievementConst.CAN_GET);
					}
					break;
				case GOAL_29:
					Integer sbNum = sbMap.get((int) c2);
					if (sbNum == null) {
						sbNum = 0;
					}
					Map<Integer, Integer> goalMap12 = goalNumInfo.getGoalMap();
					goalMap12.put(cj_746.getId(), sbNum);
					if (sbNum >= c1) {
						taskMap.put(cj_746.getId(), AchievementConst.CAN_GET);
					}
					break;
				case GOAL_30:
					if (goalNumInfo.getNum() >= c1) {
						taskMap.put(cj_746.getId(), AchievementConst.CAN_GET);
					}
					break;
				case GOAL_31:
					Integer qcNum = qcMap.get((int) c2);
					if (qcNum == null) {
						qcNum = 0;
					}
					Map<Integer, Integer> goalMap13 = goalNumInfo.getGoalMap();
					goalMap13.put(cj_746.getId(), qcNum);
					if (qcNum >= c1) {
						taskMap.put(cj_746.getId(), AchievementConst.CAN_GET);
					}
					break;
				case GOAL_32:
					Integer zhenyanNum = zhenyanHandleMap.get((int) c2);
					if (zhenyanNum == null) {
						zhenyanNum = 0;
					}
					Map<Integer, Integer> goalMap18 = goalNumInfo.getGoalMap();
					goalMap18.put(cj_746.getId(), zhenyanNum);
					if (zhenyanNum >= c1) {
						taskMap.put(cj_746.getId(), AchievementConst.CAN_GET);
					}
					break;
				case GOAL_33:
					if (goalNumInfo.getNum() >= c1) {
						taskMap.put(cj_746.getId(), AchievementConst.CAN_GET);
					}
					break;
				case GOAL_34:
					if (goalNumInfo.getNum() >= c1) {
						taskMap.put(cj_746.getId(), AchievementConst.CAN_GET);
					}
					break;
				case GOAL_35:
					if (goalNumInfo.getNum() >= c1) {
						taskMap.put(cj_746.getId(), AchievementConst.CAN_GET);
					}
					break;
				case GOAL_36:
					if (goalNumInfo.getNum() >= c1) {
						taskMap.put(cj_746.getId(), AchievementConst.CAN_GET);
					}
					break;
				case GOAL_37:
					if (goalNumInfo.getNum() >= c1) {
						taskMap.put(cj_746.getId(), AchievementConst.CAN_GET);
					}
					break;
				/*case GOAL_38:
					if (goalNumInfo.getNum() >= c1) {
						taskMap.put(cj_746.getId(), AchievementConst.CAN_GET);
					}
					break;*/
				case GOAL_39:
					if (goalNumInfo.getNum() >= c1) {
						taskMap.put(cj_746.getId(), AchievementConst.CAN_GET);
					}
					break;
				case GOAL_40:
					Integer mhNum = mhMap.get((int) c2);
					if (mhNum == null) {
						mhNum = 0;
					}
					Map<Integer, Integer> goalMap14 = goalNumInfo.getGoalMap();
					goalMap14.put(cj_746.getId(), mhNum);
					if (mhNum >= c1) {
						taskMap.put(cj_746.getId(), AchievementConst.CAN_GET);
					}
					break;
				case GOAL_41:
					Integer lbbossNum = lbbossMap.get((int) c2);
					if (lbbossNum == null) {
						lbbossNum = 0;
					}
					Map<Integer, Integer> goalMap15 = goalNumInfo.getGoalMap();
					goalMap15.put(cj_746.getId(), lbbossNum);
					if (lbbossNum >= c1) {
						taskMap.put(cj_746.getId(), AchievementConst.CAN_GET);
					}
					break;
				case GOAL_42:
					Integer ddNum = ddMap.get((int) c2);
					if (ddNum == null) {
						ddNum = 0;
					}
					Map<Integer, Integer> goalMap16 = goalNumInfo.getGoalMap();
					goalMap16.put(cj_746.getId(), ddNum);
					if (ddNum >= c1) {
						taskMap.put(cj_746.getId(), AchievementConst.CAN_GET);
					}
					break;
				case GOAL_43:
					Integer xxNum = xxMap.get((int) c2);
					if (xxNum == null) {
						xxNum = 0;
					}
					Map<Integer, Integer> goalMap17 = goalNumInfo.getGoalMap();
					goalMap17.put(cj_746.getId(), xxNum);
					if (xxNum >= c1) {
						taskMap.put(cj_746.getId(), AchievementConst.CAN_GET);
					}
					break;
				case GOAL_44:
					if (goalNumInfo.getNum() >= c1) {
						taskMap.put(cj_746.getId(), AchievementConst.CAN_GET);
					}
					break;
				case GOAL_45:
					if (goalNumInfo.getNum() >= c1) {
						taskMap.put(cj_746.getId(), AchievementConst.CAN_GET);
					}
					break;
				}
			}
			updateRedPoint(hero);
		} catch (Exception e) {
			LogTool.error(e, AchievementFunction.class, hid, hero.getName(),
					"AchievementFunction checkTask, type=" + type);
		}
	}

	/**
	 * 检测宝石方法
	 * 
	 * @param hero
	 * @return
	 */
	public Map<Integer, Integer> sumINT(Hero hero) {
		Map<Integer, Integer> bsMap = new HashMap<>();
		try {
			for (int i = GameConst.INDEX_EQUIP_0; i <= GameConst.INDEX_EQUIP_9; i++) {
				int[] GemLevel = hero.getForge().getForgeModelMap().get(i).getGemLevel();
				for (int ii = 0; ii < GemLevel.length; ii++) {
					if (GemLevel[ii] > 0) {
						int lv = Config_dzgem_209.getIns().get(GemLevel[ii]).getLv();
						for (int x = 1; x <= lv; x++) {
							Integer num = bsMap.get(x);
							if (num == null) {
								num = 0;
							}
							bsMap.put(x, num + 1);
						}
					}
				}
			}
		} catch (Exception e) {
			LogTool.error(e, AchievementFunction.class, hero.getId(), hero.getName(), "AchievementFunction sumINT");
		}
		return bsMap;
	}

	/**
	 * 阵眼检查
	 * 
	 * @param hero
	 * @return
	 */
	public Map<Integer, Integer> zhenyanHandle(Hero hero) {
		Map<Integer, Integer> zhenyanMap = new HashMap<>();
		try {
			ZhenYan zhenYan = hero.getZhenYan();
			if (zhenYan != null) {
				Map<Integer, Integer> zhenYanLevelMap = zhenYan.getZhenYanLevelMap();
				Iterator<Integer> iterator = zhenYanLevelMap.keySet().iterator();
				while (iterator.hasNext()) {
					Integer id = iterator.next();
					Integer star = zhenYanLevelMap.get(id);
					star = (star % 10000) / 10;
						for (int i = 0; i <= star; i++) {
							Integer num = zhenyanMap.get(i);
							if (num == null) {
								num = 0;
							}
							zhenyanMap.put(i, num + 1);
						}
				}
			}
		} catch (Exception e) {
			LogTool.error(e, AchievementFunction.class, hero.getId(), hero.getName(),
					"AchievementFunction zhenyanHandle");
		}
		return zhenyanMap;
	}

	/**
	 * 检测所有类型任务
	 * 
	 * @param hero
	 */
	public void checkAllTask(Hero hero) {
		checkTask(hero, AchievementEnum.GOAL_1, 0);
		checkTask(hero, AchievementEnum.GOAL_2, 0);
		checkTask(hero, AchievementEnum.GOAL_3, 0);
		checkTask(hero, AchievementEnum.GOAL_5, 0);
		checkTask(hero, AchievementEnum.GOAL_6, 0);
		checkTask(hero, AchievementEnum.GOAL_7, 0);
		checkTask(hero, AchievementEnum.GOAL_8, 0);
		checkTask(hero, AchievementEnum.GOAL_9, 0);
		checkTask(hero, AchievementEnum.GOAL_10, 0);
		checkTask(hero, AchievementEnum.GOAL_11, 0);
		checkTask(hero, AchievementEnum.GOAL_12, 0);
		checkTask(hero, AchievementEnum.GOAL_13, 0);
		checkTask(hero, AchievementEnum.GOAL_14, 0);
		checkTask(hero, AchievementEnum.GOAL_15, 0);
		checkTask(hero, AchievementEnum.GOAL_16, 0);
		checkTask(hero, AchievementEnum.GOAL_17, 0);
		checkTask(hero, AchievementEnum.GOAL_18, 0);
		checkTask(hero, AchievementEnum.GOAL_19, 0);
		checkTask(hero, AchievementEnum.GOAL_20, 0);
		checkTask(hero, AchievementEnum.GOAL_21, 0);
		checkTask(hero, AchievementEnum.GOAL_22, 0);
		checkTask(hero, AchievementEnum.GOAL_23, 0);
		checkTask(hero, AchievementEnum.GOAL_24, 0);
		checkTask(hero, AchievementEnum.GOAL_25, 0);
		checkTask(hero, AchievementEnum.GOAL_26, 0);
		checkTask(hero, AchievementEnum.GOAL_27, 0);
		checkTask(hero, AchievementEnum.GOAL_28, 0);
		checkTask(hero, AchievementEnum.GOAL_29, 0);
		checkTask(hero, AchievementEnum.GOAL_30, 0);
		checkTask(hero, AchievementEnum.GOAL_31, 0);
		checkTask(hero, AchievementEnum.GOAL_32, 0);
		checkTask(hero, AchievementEnum.GOAL_33, 0);
		checkTask(hero, AchievementEnum.GOAL_34, 0);
		checkTask(hero, AchievementEnum.GOAL_35, 0);
		checkTask(hero, AchievementEnum.GOAL_36, 0);
		checkTask(hero, AchievementEnum.GOAL_37, 0);
		checkTask(hero, AchievementEnum.GOAL_39, 0);
		checkTask(hero, AchievementEnum.GOAL_40, 0);
		checkTask(hero, AchievementEnum.GOAL_41, 0);
		checkTask(hero, AchievementEnum.GOAL_44, 0);
		checkTask(hero, AchievementEnum.GOAL_45, 0);
	}

	/**
	 * 更新红点
	 * 
	 * @param hero
	 */
	public void updateRedPoint(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.ACHIEVEMENT)) {
				return;
			}
			boolean redPoint = checkRedPoint(hero);
			if (redPoint) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.ACHIEVEMENT, RedPointConst.RED_1,
						RedPointConst.HAS_RED);
				// RedPointFunction.getIns().sendFastRedPointHandle(hero);
			} else {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.ACHIEVEMENT, RedPointConst.RED_1,
						RedPointConst.NO_RED);
				// RedPointFunction.getIns().sendFastRedPointHandle(hero);
			}
		} catch (Exception e) {
			LogTool.error(e, AchievementFunction.class, hero.getId(), hero.getName(),
					"AchievementFunction checkRedPoint");
		}
	}

	/**
	 * 检测红点
	 * 
	 * @param hero
	 * @return
	 */
	public boolean checkRedPoint(Hero hero) {
		if (hero == null) {
			return false;
		}
		try {
			Achievement model = hero.getAchievement();
			if (model == null) {
				return false;
			}
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.ACHIEVEMENT)) {
				return false;
			}
			Map<Integer, Map<Integer, Integer>> goalTaskMap = model.getGoalTaskMap();
			Iterator<Map<Integer, Integer>> iterator = goalTaskMap.values().iterator();
			for (; iterator.hasNext();) {
				Map<Integer, Integer> map = iterator.next();
				Iterator<Integer> iterator2 = map.values().iterator();
				for (; iterator2.hasNext();) {
					Integer state = iterator2.next();
					if (state != null && state == AchievementConst.CAN_GET) {
						return true;
					}
				}
			}
			Map<Integer, Integer> rewardMap = model.getRewardMap();
			Iterator<Integer> iterator2 = rewardMap.values().iterator();
			while (iterator2.hasNext()) {
				Integer state = iterator2.next();
				if (state != null && state == AchievementConst.CAN_GET) {
					return true;
				}
			}
			int goalPoint = model.getGoalPoint();
			int goalJie = model.getGoalJie();
			Struct_cjds_746 struct_cjds_746 = Config_cjds_746.getIns().get(goalJie + 1);
			if (struct_cjds_746 == null) {
				return false;
			}
			if (goalPoint >= struct_cjds_746.getCjd()) {
				return true;
			}
		} catch (Exception e) {
			LogTool.error(e, AchievementFunction.class, hero.getId(), hero.getName(),
					"AchievementFunction checkRedPoint");
		}
		return false;
	}

	/**
	 * Gm调任务
	 * 
	 * @param hero
	 * @param param
	 */
	public void GM(Hero hero, String[] param) {
		int num0 = Integer.parseInt(param[0]);
		int num1 = Integer.parseInt(param[1]);
		int addNum = Integer.parseInt(param[2]);
		Achievement achievement = hero.getAchievement();
		if(achievement!=null) {
			Map<Integer, Map<Integer, Integer>> countMap = achievement.getCountMap();
			Map<Integer, Integer> map = countMap.get(num0);
			if (map == null) {
				map = new HashMap<>();
				countMap.put(num0, map);
			}
			Integer integer = map.get(num1);
			if (integer == null) {
				integer = 0;
			}
			map.put(num1, integer + addNum);
			checkTask(hero, AchievementEnum.GOAL_42, 0);
			checkTask(hero, AchievementEnum.GOAL_43, 0);
		}
		return;
	}
}
