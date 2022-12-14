package com.teamtop.system.house.yard;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossFunction;
import com.teamtop.cross.CrossSender;
import com.teamtop.cross.CrossZone;
import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.battle.BattleFunction;
import com.teamtop.system.crossCommonRank.CommonRankSysCache;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.global.GlobalSender;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.house.yard.cross.CrossHouseCache;
import com.teamtop.system.house.yard.cross.CrossHouseFunction;
import com.teamtop.system.house.yard.event.CrossHouseSceneEvent;
import com.teamtop.system.house.yard.model.CrossHouse;
import com.teamtop.system.house.yard.model.GoldRecord;
import com.teamtop.system.house.yard.model.LocalHouse;
import com.teamtop.system.house.yard.model.RandomEvent;
import com.teamtop.system.house.yard.model.RobberNpc;
import com.teamtop.system.houseShopTask.HouseShopTaskConst;
import com.teamtop.system.houseShopTask.HouseShopTaskFunction;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.scene.SceneFunction;
import com.teamtop.system.scene.SceneManager;
import com.teamtop.util.ProbabilityEvent.RandomUtil;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_daoju_204;
import excel.config.Config_fddc_019;
import excel.config.Config_fdjk_019;
import excel.config.Config_fdqd_019;
import excel.config.Config_fdsj_019;
import excel.config.Config_fdsjsj_019;
import excel.config.Config_fdtgl_019;
import excel.config.Config_fdyqs_019;
import excel.config.Config_fdzssj_019;
import excel.config.Config_jdjins_021;
import excel.config.Config_jdskill_021;
import excel.config.Config_xtcs_004;
import excel.config.Config_zsfl_019;
import excel.struct.Struct_daoju_204;
import excel.struct.Struct_fddc_019;
import excel.struct.Struct_fdqd_019;
import excel.struct.Struct_fdsj_019;
import excel.struct.Struct_fdsjsj_019;
import excel.struct.Struct_fdtgl_019;
import excel.struct.Struct_fdyqs_019;
import excel.struct.Struct_fdzssj_019;
import excel.struct.Struct_jdjins_021;
import excel.struct.Struct_jdskill_021;
import excel.struct.Struct_zsfl_019;

public class YardManager {
	private static YardManager ins;

	private YardManager() {
	}

	public static synchronized YardManager getIns() {
		if (ins == null) {
			ins = new YardManager();
		}
		return ins;
	}

	public void gotoYard(Hero hero, long heroId) {
		try {
			if (CrossZone.isCrossServer()) {
				return;
			}
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.YARD)) {
				return;
			}
			CrossFunction.askCross(hero, SystemIdConst.YARD);
		} catch (Exception e) {
			LogTool.error(e, YardManager.class, "gotoYard has wrong");
		}
	}

	public void outHouse(Hero hero) {
		try {
			// if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.YARD)) {
			// return;
			// }
			CrossFunction.logout(hero);
			YardSender.sendCmd_11104(hero.getId(), 0);
			CrossSender.sendCmd_1666(hero.getId(), SystemIdConst.YARD);
		} catch (Exception e) {
			LogTool.error(e, YardManager.class, "outMap has wrong");
		}
	}

	public void upHouseLv(Hero hero) {
		try {
			if (!CrossZone.isCrossServer()) {
				return;
			}
			CrossHouse cHouse = CrossHouseFunction.getIns().getHouseByHid(hero.getId());
			int lv = cHouse.getHouseLv();
			Struct_fdsj_019 lvCfg = Config_fdsj_019.getIns().get(lv);
			if (lvCfg == null) {
				// ???????????????
				YardSender.sendCmd_11106(hero.getId(), 1, lv);
				return;
			}

			Struct_fdsj_019 nextLvCfg = Config_fdsj_019.getIns().get(lv + 1);
			if (nextLvCfg == null) {
				// ????????????
				YardSender.sendCmd_11106(hero.getId(), 2, lv);
				return;
			}
			
			int[][] need = new int[][] { { GameConst.HOUSE_PROSPERITY, 0, lvCfg.getFanrongdu() } };
			if (!UseAddUtil.canUse(hero, need)) {
				// ???????????????
				YardSender.sendCmd_11106(hero.getId(), 3, lv);
				return;
			}

			if (!UseAddUtil.canUse(hero, lvCfg.getXiaohao())) {
				// ????????????
				YardSender.sendCmd_11106(hero.getId(), 4, lv);
				return;
			}
			if(nextLvCfg.getDc() > cHouse.getHouseDc()) {
				// ????????????
				YardSender.sendCmd_11106(hero.getId(), 5, lv);
				return;
			}

			UseAddUtil.use(hero, lvCfg.getXiaohao(), SourceGoodConst.UP_HOUSE_LV_COST, false);

			cHouse.setHouseLv(lv + 1);

			LocalHouse local = hero.getLocalHouse();
			local.setHouseLv(cHouse.getHouseLv());

			// ??????????????????
			CrossHouseFunction.getIns().updateHouseFight(hero);

			// ????????????
			CrossHouseFunction.getIns().updateHouseRank(cHouse,true);

			YardSender.sendCmd_11106(hero.getId(), 0, lv + 1);
			
			//????????????
			HouseShopTaskFunction.getIns().CTLSuccessTaskOrGoal(hero,HouseShopTaskConst.INDEXTYPE_3, HouseShopTaskConst.GOAL_TYPE_102, lv + 1,0);
			
		} catch (Exception e) {
			LogTool.error(e, YardManager.class, "upHouseLv has wrong");
		}
	}

	public void upHouseDc(Hero hero) {
		try {
			if (!CrossZone.isCrossServer()) {
				return;
			}
			CrossHouse cHouse = CrossHouseFunction.getIns().getHouseByHid(hero.getId());
			int lv = cHouse.getHouseLv();
			int dc = cHouse.getHouseDc();
			Struct_fddc_019 dcCfg = Config_fddc_019.getIns().get(dc);
			if (dcCfg == null) {
				// ???????????????
				YardSender.sendCmd_11108(hero.getId(), 1, dc);
				return;
			}

			Struct_fddc_019 nextDcCfg = Config_fddc_019.getIns().get(dc + 1);
			if (nextDcCfg == null) {
				// ????????????
				YardSender.sendCmd_11108(hero.getId(), 2, dc);
				return;
			}
			if (lv < dcCfg.getDengji()) {
				// ??????????????????
//				YardSender.sendCmd_11108(hero.getId(), 3, dc);
//				return;
			}
			if (!UseAddUtil.canUse(hero, dcCfg.getXiaohao())) {
				// ????????????
				YardSender.sendCmd_11108(hero.getId(), 4, dc);
				return;
			}

			UseAddUtil.use(hero, dcCfg.getXiaohao(), SourceGoodConst.UP_HOUSE_DC_COST, false);

			cHouse.setHouseDc(dc + 1);
			cHouse.setProsperity(cHouse.getProsperity() + nextDcCfg.getFrd());
			
			if(cHouse.getHouseDc() > 2) {
				// ??????????????????
				CrossHouseFunction.getIns().upDc(hero, cHouse.getHouseDc());
			}

			int[][] add = new int[][] { { GameConst.HOUSE_PROSPERITY, 0, nextDcCfg.getFrd() } };
			UseAddUtil.add(hero, add, SourceGoodConst.UP_HOUSE_DC_ADD, UseAddUtil.getDefaultMail(), true);

			// ????????????
			CrossHouseFunction.getIns().updateHouseRank(cHouse,true);

			YardSender.sendCmd_11108(hero.getId(), 0, dc + 1);
			//????????????
			HouseShopTaskFunction.getIns().CTLSuccessTaskOrGoal(hero,HouseShopTaskConst.INDEXTYPE_3,  HouseShopTaskConst.GOAL_TYPE_101, cHouse.getHouseDc(),0);
			
		} catch (Exception e) {
			LogTool.error(e, YardManager.class, "upHouseDc has wrong");
		}
	}

	public void upDecorateLv(Hero hero, int type) {
		try {
			if (!CrossZone.isCrossServer()) {
				return;
			}
			CrossHouse cHouse = CrossHouseFunction.getIns().getHouseByHid(hero.getId());
			Map<Integer, Integer> decorateLvMap = cHouse.getDecorateLvMap();
			Integer decorateLv = decorateLvMap.get(type);
			if (decorateLv == null) {
				decorateLv = type;
			}

			Struct_fdzssj_019 zsCfg = Config_fdzssj_019.getIns().get(decorateLv);
			if (zsCfg == null) {
				// ???????????????
				YardSender.sendCmd_11110(hero.getId(), 2, type, decorateLv);
				return;
			}

			Struct_fdzssj_019 nextZsCfg = Config_fdzssj_019.getIns().get(decorateLv + 1);
			if (nextZsCfg == null) {
				// ????????????
				YardSender.sendCmd_11110(hero.getId(), 3, type, decorateLv);
				return;
			}

			int lv = cHouse.getHouseLv();
			Struct_fdsj_019 lvCfg = Config_fdsj_019.getIns().get(lv);
			if (lvCfg == null) {
				// ???????????????
				YardSender.sendCmd_11110(hero.getId(), 4, type, decorateLv);
				return;
			}
			if (type == HouseConst.ID_100001 || type == HouseConst.ID_101001 || type == HouseConst.ID_102001) {
				if ((decorateLv + 1) % 100 > lvCfg.getGj()) {
					// ??????????????????
					YardSender.sendCmd_11110(hero.getId(), 5, type, decorateLv);
					return;
				}
			} else {
				if ((decorateLv + 1) % 100 > lvCfg.getZhuangshi()) {
					// ??????????????????
					YardSender.sendCmd_11110(hero.getId(), 5, type, decorateLv);
					return;
				}
			}

			if (!UseAddUtil.canUse(hero, zsCfg.getXiaohao())) {
				// ????????????
				YardSender.sendCmd_11110(hero.getId(), 6, type, decorateLv);
				return;
			}

			UseAddUtil.use(hero, zsCfg.getXiaohao(), SourceGoodConst.UP_DECORATE_LV_COST, false);

			decorateLvMap.put(type, decorateLv + 1);
			LocalHouse local = hero.getLocalHouse();
			local.setDecorateLvMap(decorateLvMap);
			// ????????????
			CrossHouseFunction.getIns().updateHouseFight(hero);

			YardSender.sendCmd_11110(hero.getId(), 0, type, decorateLv + 1);
			int nowLevel=decorateLv + 2-type;
			Struct_zsfl_019 struct_zsfl_019 = Config_zsfl_019.getIns().get(type);
			int zslx = struct_zsfl_019.getCf();
			int goalType=0;
			if (zslx==HouseConst.ZS_TYPE1) {
				//?????????????????????
				HouseShopTaskFunction.getIns().CTLSuccessTaskOrGoal(hero,HouseShopTaskConst.INDEXTYPE_3,  HouseShopTaskConst.GOAL_TYPE_201, nowLevel,0);
			}else if (zslx==HouseConst.ZS_TYPE2) {
				//?????????????????????
				HouseShopTaskFunction.getIns().CTLSuccessTaskOrGoal(hero,HouseShopTaskConst.INDEXTYPE_3,  HouseShopTaskConst.GOAL_TYPE_202, nowLevel,0);
			}else if (zslx==HouseConst.ZS_TYPE3) {
				//????????????
				HouseShopTaskFunction.getIns().CTLSuccessTaskOrGoal(hero,HouseShopTaskConst.INDEXTYPE_3,  HouseShopTaskConst.GOAL_TYPE_203, nowLevel,0);
			}else if (zslx==HouseConst.ZS_TYPE4) {
				goalType=HouseShopTaskConst.GOAL_TYPE_204;
			}else if(zslx==HouseConst.ZS_TYPE5) {
				goalType=HouseShopTaskConst.GOAL_TYPE_205;
			}else if(zslx==HouseConst.ZS_TYPE6) {
				goalType=HouseShopTaskConst.GOAL_TYPE_206;
			}
			if (goalType>0) {
				int sumLv=0;
				for (Struct_zsfl_019 zsfl_019:Config_zsfl_019.getIns().getSortList()) {
					if (zsfl_019.getCf()==zslx) {
						if (decorateLvMap.containsKey(zsfl_019.getZslx())) {
							int num=decorateLvMap.get(zsfl_019.getZslx())+1-zsfl_019.getZslx();
							sumLv=sumLv+num;
						}else {
							sumLv=sumLv+1;
						}
					}
				}
					HouseShopTaskFunction.getIns().CTLSuccessTaskOrGoal(hero,HouseShopTaskConst.INDEXTYPE_3,  goalType, sumLv,0);
				}
			
		} catch (Exception e) {
			LogTool.error(e, YardManager.class, "upDecorateLv has wrong");
		}
	}

	public void shakeTree(Hero hero) {
		try {
			if (!CrossZone.isCrossServer()) {
				return;
			}
			CrossHouse cHouse = CrossHouseFunction.getIns().getHouseByHid(hero.getId());
			int cd = Config_xtcs_004.getIns().get(HouseConst.CONST_7111).getNum();
			int now = TimeDateUtil.getCurrentTime();
			if (now < cHouse.getNextShakeTreeTime()) {
				// cd???
				YardSender.sendCmd_11112(hero.getId(), 1, 0);
				return;
			}

			Map<Integer, Integer> decorateLvMap = cHouse.getDecorateLvMap();
			Integer decorateLv = decorateLvMap.get(HouseConst.ID_100001);
			if (decorateLv == null) {
				decorateLv = HouseConst.ID_100001;
			}

			int min = 0;
			int max = 0;
			Struct_fdyqs_019 yqCfg = Config_fdyqs_019.getIns().get(decorateLv);
			if (yqCfg == null) {
				// ???????????????
				YardSender.sendCmd_11112(hero.getId(), 3, 0);
				return;
			}
			min = yqCfg.getXiaxian();
			max = yqCfg.getShangxian();
			int num = RandomUtil.getRandomNumInAreas(min, max);

			int dc = cHouse.getHouseDc();
			Struct_fddc_019 dcCfg = Config_fddc_019.getIns().get(dc);
			if (dcCfg == null) {
				// ???????????????
				YardSender.sendCmd_11112(hero.getId(), 4, 0);
				return;
			}

			if (dcCfg.getYqsbs() == 0) {
				// ??????????????????
				YardSender.sendCmd_11112(hero.getId(), 5, 0);
				return;
			}

			double add = (double) num * (double) dcCfg.getYqsbs() / 100000;
			num = (int) add;

			cHouse.setNextShakeTreeTime(now + cd);

			int[][] add2 = new int[][] { { GameConst.YUANBAO, 0, num  } };
			UseAddUtil.add(hero, add2, SourceGoodConst.SHAKE_TREE_ADD, UseAddUtil.getDefaultMail(), true);

			int time = Config_xtcs_004.getIns().get(HouseConst.CONST_7111).getNum();

			YardSender.sendCmd_11112(hero.getId(), 0, now + time);
			//????????????
			HouseShopTaskFunction.getIns().CTLSuccessTaskOrGoal(hero,HouseShopTaskConst.INDEXTYPE_4,  HouseShopTaskConst.GOAL_TYPE_503, 1, 0);
			
		} catch (Exception e) {
			LogTool.error(e, YardManager.class, "shakeTree has wrong");
		}
	}

	public void harvestMoney(Hero hero, long heroId) {
		try {
			if (!CrossZone.isCrossServer()) {
				return;
			}
			CrossHouse cHouse = CrossHouseFunction.getIns().getHouseByHid(heroId);
			int add = cHouse.getGoldHouseMoney();
			if (add == 0) {
				// ????????????
				YardSender.sendCmd_11114(hero.getId(), 1, 0, 0, 0);
				return;
			}
			int houseDc = cHouse.getHouseDc();
			int oneAward[][] = Config_fddc_019.getIns().get(houseDc).getZengjia();
			int oneCount = oneAward[0][2];
			Integer decorateLv = cHouse.getDecorateLvMap().get(HouseConst.ID_102001);
			if (decorateLv == null) {
				decorateLv = HouseConst.ID_102001;
			}
			int max = (Config_fdjk_019.getIns().get(decorateLv).getCishu() / HouseConst.GOLD_TIME) * oneCount;

			if (hero.getId() != heroId) {
				if (add < max * 5 / 10) {
					// ??????????????????????????????
					YardSender.sendCmd_11114(hero.getId(), 3, 0, 0, 0);
					return;
				}
				int nowTime = TimeDateUtil.getCurrentTime();
				if(nowTime < cHouse.getLastLostMoneyTime() + HouseConst.LOST_GOLD_TIME) {
					// ??????????????????
					YardSender.sendCmd_11114(hero.getId(), 2, 0, 0, 0);
					return;
				}
				cHouse.setLastLostMoneyTime(nowTime);
				
				// ???????????????
				add = (int) (add * 0.3);
				int now = add;
				int jm = add;
				int gl = 0;

				Struct_jdjins_021 struct_jdjins_021 = Config_jdjins_021.getIns().get(cHouse.getHouseKeepId());
				if (struct_jdjins_021 != null) {
					int[][] skill = struct_jdjins_021.getSkill();

					for (int i = 0; i < skill.length; i++) {
						int skillId = skill[i][0];
						Struct_jdskill_021 struct_jdskill_021 = Config_jdskill_021.getIns().get(skillId);
						int canshu1 = struct_jdskill_021.getCanshu1();
						int canshu2 = struct_jdskill_021.getCanshu2();
						if (skillId / 1000 == 20) {
							// ???????????????
							jm = jm * canshu2 / 100000;
							gl = canshu1;
							break;
						}
					}
				}

				if (RandomUtil.getRandomNumInAreas(0, 100000) < gl) {
					// ??????????????????
					now -= jm;
				} else {
					jm = 0;
				}
				CrossHouseFunction.getIns().addGoldMoney(cHouse, -now);
				
				int[][] add2 = new int[][] { { GameConst.HOUSE_COIN, 0, now  } };
				UseAddUtil.add(hero, add2, SourceGoodConst.HARVEST_MONEY_ADD, UseAddUtil.getDefaultMail(), true);
				
				YardSender.sendCmd_11114(hero.getId(), 0, cHouse.getNextShakeTreeTime(), now, jm);

				// ????????????
				CrossHouseFunction.getIns().addRecord(heroId, hero.getName(), 1, add, jm);
			} else {
				CrossHouseFunction.getIns().addGoldMoney(cHouse, -add);
				
				int[][] add2 = new int[][] { { GameConst.HOUSE_COIN, 0, add  } };
				UseAddUtil.add(hero, add2, SourceGoodConst.HARVEST_MONEY_ADD, UseAddUtil.getDefaultMail(), true);
				
				YardSender.sendCmd_11114(hero.getId(), 0, cHouse.getNextShakeTreeTime(), add, 0);
				//??????
				HouseShopTaskFunction.getIns().CTLSuccessTaskOrGoal(hero,HouseShopTaskConst.INDEXTYPE_1,  HouseShopTaskConst.DAYTASK_1, 0, 0);
				
			}
		} catch (Exception e) {
			LogTool.error(e, YardManager.class, "harvestMoney has wrong");
		}
	}

	public void drawAward(Hero hero, long heroId) {
		try {
			if (!CrossZone.isCrossServer()) {
				return;
			}
			CrossHouse cHouse = CrossHouseFunction.getIns().getHouseByHid(heroId);
			CrossHouse myHouse = CrossHouseFunction.getIns().getHouseByHid(hero.getId());
			LocalHouse local = hero.getLocalHouse();
			int dc = cHouse.getHouseDc();
			Struct_fddc_019 dcCfg = Config_fddc_019.getIns().get(dc);
			if (dcCfg == null) {
				// ???????????????
				YardSender.sendCmd_11116(hero.getId(), 1, 0, 0, 0, 0, 0);
				return;
			}
			int cost = dcCfg.getTglxh();
			int[][] need = new int[][] { { GameConst.HOUSE_JI_FEN, 0, cost } };
			if (!UseAddUtil.canUse(hero, need)) {
				// ????????????
				YardSender.sendCmd_11116(hero.getId(), 2, 0, 0, 0, 0, 0);
				return;
			}
			
			Map<Integer, Integer> decorateLvMap = myHouse.getDecorateLvMap();
			Integer decorateLv = decorateLvMap.get(HouseConst.ID_101001);
			if (decorateLv == null) {
				// ????????????
				decorateLv = HouseConst.ID_101001;
			}

			Struct_fdtgl_019 tglCfg = Config_fdtgl_019.getIns().get(decorateLv);
			if (tglCfg == null) {
				// ???????????????
				YardSender.sendCmd_11116(hero.getId(), 4, 0, 0, 0, 0, 0);
				return;
			}

			if (local.getDrawAwardTimes() >= tglCfg.getCishu()) {
				// ????????????
				YardSender.sendCmd_11116(hero.getId(), 5, 0, 0, 0, 0, 0);
				return;
			}

			local.setDrawAwardTimes(local.getDrawAwardTimes() + 1);

			UseAddUtil.use(hero, need, SourceGoodConst.DRAW_AWARD_COST, false);

			List<int[]> awardList = new ArrayList<int[]>();// ?????????????????????
			ArrayList<Object> awardObjList = new ArrayList<Object>();

			int[] genAward = CrossHouseFunction.getIns().drawAward(dc);
			awardList.add(new int[] { genAward[0], genAward[1], genAward[2] });
			awardObjList.add(new Object[] { genAward[0], genAward[1], genAward[2], genAward[4] });

			int size = awardList.size();
			int[][] AwardArray = new int[size][];
			awardList.toArray(AwardArray);

			UseAddUtil.add(hero, AwardArray, SourceGoodConst.DRAW_AWARD_ADD, UseAddUtil.getDefaultMail(), false);

			YardSender.sendCmd_11116(hero.getId(), 0, genAward[0], genAward[1], genAward[2], local.getJiFen(),
					tglCfg.getCishu() - local.getDrawAwardTimes());
			
			// ??????????????????(?????????)
			hero.getLocalHouse().setJiFen(hero.getLocalHouse().getJiFen()-cost);

			if (hero.getId() != heroId) {
				// ????????????
				int count = 0;
				int[][] reward = Config_xtcs_004.getIns().get(HouseConst.CONST_7115).getOther();
				count = reward[0][2];
				int max = Config_xtcs_004.getIns().get(HouseConst.CONST_7116).getNum();
				if(cHouse.getDrawAwardTimes() >= max) {
					count = 0;
				}
				CrossHouseFunction.getIns().addRecord(heroId, hero.getName(), 2, count, 0);
				if(count != 0) {
	                 MailFunction.getIns().sendMailWithFujianData2(heroId, MailConst.HOUSE_TIAN_GONG_LU,
	                         new Object[]{MailConst.HOUSE_TIAN_GONG_LU,hero.getName(),count}, reward);
				}
				cHouse.setDrawAwardTimes(cHouse.getDrawAwardTimes()+1);
			}
			//????????????
			HouseShopTaskFunction.getIns().CTLSuccessTaskOrGoal(hero,HouseShopTaskConst.INDEXTYPE_4,  HouseShopTaskConst.GOAL_TYPE_502, 1, 0);
			//??????
			HouseShopTaskFunction.getIns().CTLSuccessTaskOrGoal(hero,HouseShopTaskConst.INDEXTYPE_1,  HouseShopTaskConst.DAYTASK_4, 0, 0);
		} catch (Exception e) {
			LogTool.error(e, YardManager.class, "drawAward has wrong");
		}
	}

	public void sacrifice(Hero hero, Object[] itemInfo) {
		try {
			if (!CrossZone.isCrossServer()) {
				return;
			}
			long add = 0;
			// ??????????????????
			int[][] cost = new int[itemInfo.length][3];
			int i = 0;
			for (Object obj : itemInfo) {
				Object[] objs = (Object[]) obj;
				int itemType = Integer.valueOf(objs[0].toString());
				int itemId = (int) objs[1];
				int count = (int) objs[2];
				if (itemType == 1) {
					// ??????
					Struct_daoju_204 djCfg = Config_daoju_204.getIns().get(itemId);
					if (djCfg == null) {
						// ?????????????????????
						YardSender.sendCmd_11118(hero.getId(), 1, 0);
						return;
					}
					if (djCfg.getTgjf() == 0) {
						// ??????????????????
						YardSender.sendCmd_11118(hero.getId(), 2, 0);
						return;
					}
					add += djCfg.getTgjf() * count;
					cost[i][0] = itemType;
					cost[i][1] = itemId;
					cost[i][2] = count;
					i++;
				} else {
					// ??????????????????????????????
				}
			}

			// ????????????
			if (!UseAddUtil.canUse(hero, cost)) {
				// ????????????
				YardSender.sendCmd_11118(hero.getId(), 3, 0);
				return;
			}

			UseAddUtil.use(hero, cost, SourceGoodConst.SACRIFICE_COST, true);

			int[][] add2 = new int[][] { { GameConst.HOUSE_JI_FEN, 0, new Long(add).intValue()  } };
			UseAddUtil.add(hero, add2, SourceGoodConst.SACRIFICE_ADD, UseAddUtil.getDefaultMail(), true);

			// ??????????????????(?????????)
			hero.getLocalHouse().setJiFen(hero.getLocalHouse().getJiFen()+add);
			
			YardSender.sendCmd_11118(hero.getId(), 0, hero.getLocalHouse().getJiFen());
		} catch (Exception e) {
			LogTool.error(e, YardManager.class, "sacrifice has wrong");
		}
	}

	public void gotoRoom(Hero hero, long heroId) {
		try {
			if (!CrossZone.isCrossServer()) {
				return;
			}
			CrossHouseSceneEvent.getIns().out(hero);
			CrossHouse cHouse = CrossHouseFunction.getIns().getHouseByHid(heroId);
			int houseDc = cHouse.getHouseDc();
			int sceneUnitId = cHouse.getSceneUnitId();
			int mapId = CrossHouseFunction.getIns().getMapIdByDc(houseDc);
			SceneManager.getIns().exitScene(hero);

			CrossHouseSceneEvent.getIns().in(hero, mapId, sceneUnitId);

			CrossHouseFunction.getIns().sendYardMsg(hero, cHouse);
			// ????????????
			CrossHouseFunction.getIns().reshMapNpc(cHouse);

			YardSender.sendCmd_11120(hero.getId(), 0);
		} catch (Exception e) {
			LogTool.error(e, YardManager.class, "gotoRoom has wrong");
		}
	}

	public void openRankUI(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.YARD)) {
				return;
			}
			// [I:??????L:??????idU:????????????I:????????????I:???????????????I:????????????I:????????????I:????????????B:????????????????????????:0-??????,1-??????]
			List<Object[]> rankInfo = new ArrayList<>();

			Object[] openUIObjArray = CommonRankSysCache.getOpenUIObjArray(SystemIdConst.YARD);
			int myRank = 0;

			if (openUIObjArray != null) {
				for (Object obj : openUIObjArray) {
					Object[] objArray = (Object[]) obj;
					long hid = (Long) objArray[1];
					if (hid == hero.getId()) {
						myRank = (Integer) objArray[0];
					}
					rankInfo.add(objArray);
				}
			}

			YardSender.sendCmd_11122(hero.getId(), 0, myRank, rankInfo.toArray());
		} catch (Exception e) {
			LogTool.error(e, YardManager.class, "gotoRoom has wrong");
		}

	}

	public void getEventAward(Hero hero, long heroId, int eventId) {
		try {
			if (!CrossZone.isCrossServer()) {
				return;
			}
			CrossHouse cHouse = CrossHouseFunction.getIns().getHouseByHid(heroId);
			RandomEvent event = cHouse.getEventMap().get(eventId);
			if (event == null) {
				// ???????????????
				YardSender.sendCmd_11124(hero.getId(), 1, eventId);
				return;
			}
			Struct_fdsjsj_019 cfg = Config_fdsjsj_019.getIns().get(eventId);
			if (cfg == null) {
				// ???????????????
				YardSender.sendCmd_11124(hero.getId(), 2, eventId);
				return;
			}

			if (event.getState() != 1) {
				// ???????????????
				YardSender.sendCmd_11124(hero.getId(), 3, eventId);
				return;
			}

			int maxTimes = Config_xtcs_004.getIns().get(HouseConst.CONST_7112).getNum();
			if (hero.getId() == heroId) {
				if (hero.getLocalHouse().getCompleteEventTimes() >= maxTimes) {
					// ??????????????????
					YardSender.sendCmd_11124(hero.getId(), 4, eventId);
					return;
				}
			} else {
				maxTimes = Config_xtcs_004.getIns().get(HouseConst.CONST_7120).getNum();
				if (hero.getLocalHouse().getCompleteEventHelpTimes() >= maxTimes) {
					// ??????????????????
					YardSender.sendCmd_11124(hero.getId(), 4, eventId);
					return;
				}
			}

			event.setState(0);
			int min = cfg.getLengque()[0][0];
			int max = cfg.getLengque()[0][1];
			int time = RandomUtil.getRandomNumInAreas(min, max);
			event.setNextTime(TimeDateUtil.getCurrentTime() + time);

			if (hero.getId() == heroId) {
				hero.getLocalHouse().setCompleteEventTimes(hero.getLocalHouse().getCompleteEventTimes() + 1);
			} else {
				hero.getLocalHouse().setCompleteEventHelpTimes(hero.getLocalHouse().getCompleteEventHelpTimes() + 1);
			}

			UseAddUtil.add(hero, cfg.getJiangli(), SourceGoodConst.EVENT_AWARD_ADD, UseAddUtil.getDefaultMail(), true);

			YardSender.sendCmd_11124(hero.getId(), 0, eventId);

			// ?????????????????????
			List<Object[]> eventInfos = new ArrayList<>();
			eventInfos.add(new Object[] { event.getCfgId(), event.getState() });
			Object[] data = new Object[] { heroId, eventInfos.toArray() };
			SceneFunction.getIns().board(hero, data, 11126, false);
			
			//??????
			HouseShopTaskFunction.getIns().CTLSuccessTaskOrGoal(hero,HouseShopTaskConst.INDEXTYPE_1, HouseShopTaskConst.DAYTASK_6, 0, 0);
		} catch (Exception e) {
			LogTool.error(e, YardManager.class, "getEventAward has wrong");
		}
	}

	public void battleMonster(Hero hero, long heroId, long mid) {
		try {
			if (!CrossZone.isCrossServer()) {
				return;
			}
			CrossHouse cHouse = CrossHouseFunction.getIns().getHouseByHid(heroId);
			RobberNpc npc = cHouse.getNpcMap().get(-mid);
			if (npc == null) {
				// ???????????????
				YardSender.sendCmd_11128(hero.getId(), 1, mid);
				return;
			}
			int now = TimeDateUtil.getCurrentTime();
			if (npc.getState() != 0 && now < npc.getAtkTime() + 120) {
				// ?????????????????????
				YardSender.sendCmd_11128(hero.getId(), 2, mid);
				return;
			}

			int maxTimes = Config_xtcs_004.getIns().get(HouseConst.CONST_7118).getNum();
			if (hero.getLocalHouse().getCompleteRobberTimes() >= maxTimes) {
				// ??????????????????
				YardSender.sendCmd_11128(hero.getId(), 3, mid);
				return;
			}

			npc.setState(1);
			npc.setEnemyHid(hero.getId());
			npc.setAtkTime(now);
			hero.getLocalHouse().setAtkNpcId(npc.getUnitid());
			hero.getLocalHouse().setAtkHeroId(heroId);

			YardSender.sendCmd_11128(hero.getId(), 0, mid);
		} catch (Exception e) {
			LogTool.error(e, YardManager.class, "battleMonster has wrong");
		}
	}

	public void getBatMonReward(Hero hero, long heroId, long monsterid, int rest) {
		try {
			if (!CrossZone.isCrossServer()) {
				return;
			}

			List<Object[]> list = new ArrayList<>();

			CrossHouse cHouse = CrossHouseFunction.getIns().getHouseByHid(heroId);
			RobberNpc npc = cHouse.getNpcMap().get(-monsterid);
			if (npc == null) {
				// ???????????????
				// ????????????????????????
				SceneFunction.getIns().removeNpcFromScene(-monsterid);
				YardSender.sendCmd_11130(hero.getId(), monsterid, 0, list.toArray());

				SceneFunction.getIns().changeScene(hero, CrossHouseFunction.getIns().getMapIdByDc(cHouse.getHouseDc()),
						hero.getScene().getEndX(), hero.getScene().getEndY(), cHouse.getSceneUnitId());
				return;
			}

			if (npc.getEnemyHid() != hero.getId()) {
				// ??????????????????????????????
				YardSender.sendCmd_11130(hero.getId(), monsterid, rest, list.toArray());

				SceneFunction.getIns().changeScene(hero, CrossHouseFunction.getIns().getMapIdByDc(cHouse.getHouseDc()),
						hero.getScene().getEndX(), hero.getScene().getEndY(), cHouse.getSceneUnitId());
				return;
			}

			hero.getLocalHouse().setAtkNpcId(0);
			hero.getLocalHouse().setAtkHeroId(0);

			if (rest == 0) {
				// ????????????
				npc.setState(0);
				npc.setEnemyHid(0);
				npc.setAtkTime(0);
				YardSender.sendCmd_11130(hero.getId(), monsterid, rest, list.toArray());

				SceneFunction.getIns().changeScene(hero, CrossHouseFunction.getIns().getMapIdByDc(cHouse.getHouseDc()),
						hero.getScene().getEndX(), hero.getScene().getEndY(), cHouse.getSceneUnitId());
				return;
			}
			int result = BattleFunction.checkWinGuanqiaBoss(hero, npc.getSysId());// 0:?????????1????????????

			if (rest == 1 && result != 0) {
				// ??????
				SceneFunction.getIns().removeNpcFromScene(npc.getUnitid());
				for (Struct_fdqd_019 config : Config_fdqd_019.getIns().getSortList()) {
					if (config.getId() == npc.getSysId()) {
						int[][] award = config.getJiangli();
						for(int a[] : award) {
							list.add(new Object[] { a[0], a[1], a[2] });
						}
						UseAddUtil.add(hero, award, SourceGoodConst.NPC_AWARD_ADD, UseAddUtil.getDefaultMail(), true);
						break;
					}
				}
				cHouse.getNpcMap().remove(npc.getUnitid());

				hero.getLocalHouse().setCompleteRobberTimes(hero.getLocalHouse().getCompleteRobberTimes() + 1);
				
				int maxTimes = Config_xtcs_004.getIns().get(HouseConst.CONST_7118).getNum();
				if(hero.getLocalHouse().getCompleteRobberTimes() >= maxTimes) {
					// ?????????
					GlobalSender.sendCmd_260(hero.getId(), 1, "??????????????????????????????");
				}else {
					int num = maxTimes - hero.getLocalHouse().getCompleteRobberTimes();
					GlobalSender.sendCmd_260(hero.getId(), 1, "??????????????????" + num + "?????????");
				}
			}
			YardSender.sendCmd_11130(hero.getId(), monsterid, rest, list.toArray());

			SceneFunction.getIns().changeScene(hero, CrossHouseFunction.getIns().getMapIdByDc(cHouse.getHouseDc()),
					hero.getScene().getEndX(), hero.getScene().getEndY(), cHouse.getSceneUnitId());

			CrossHouseFunction.getIns().sendYardMsg(hero, cHouse);
			//??????
			HouseShopTaskFunction.getIns().CTLSuccessTaskOrGoal(hero,HouseShopTaskConst.INDEXTYPE_1, HouseShopTaskConst.DAYTASK_5, 0, 0);
		} catch (Exception e) {
			LogTool.error(e, YardManager.class, "getBatMonReward has wrong");
		}
	}

	public void getGoldInfo(Hero hero) {
		try {
			if (!CrossZone.isCrossServer()) {
				return;
			}
			CrossHouse cHouse = CrossHouseFunction.getIns().getHouseByHid(hero.getId());
			YardSender.sendCmd_11132(hero.getId(), cHouse.getGoldHouseMoney(),
					cHouse.getLastAddMoneyTime() + HouseConst.GOLD_TIME);
		} catch (Exception e) {
			LogTool.error(e, YardManager.class, "getGoldInfo has wrong");
		}
	}

	public void openLog(Hero hero, int type) {
		try {
			if (!CrossZone.isCrossServer()) {
				return;
			}
			List<Object[]> logdata = new ArrayList<>();
			int partId = CrossCache.getPartId(CommonUtil.getZoneIdById(hero.getId()));
			List<GoldRecord> list = null;
			if (type == 1) {
				// ????????????
				list = CrossHouseCache.pAllGoldRecordCache.get(partId).get(hero.getId());
			} else {
				// ?????????????????????
				list = CrossHouseCache.pAllTGLRecordCache.get(partId).get(hero.getId());
			}
			if(list != null) {
				for (GoldRecord record : list) {
					logdata.add(new Object[] { type, record.getName(), record.getCount(), record.getNumber() });
				}
			}
			YardSender.sendCmd_11134(hero.getId(), logdata.toArray());
		} catch (Exception e) {
			LogTool.error(e, YardManager.class, "openLog has wrong");
		}
	}

}
