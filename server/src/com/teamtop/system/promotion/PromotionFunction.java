package com.teamtop.system.promotion;

import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.bingfa.BingFa;
import com.teamtop.system.daytask.DayTask;
import com.teamtop.system.daytask.DayTaskModel;
import com.teamtop.system.destiny.DestinyFunction;
import com.teamtop.system.destiny.model.PersonalDestiny;
import com.teamtop.system.excalibur.model.Excalibur;
import com.teamtop.system.forge.ForgeFunction;
import com.teamtop.system.forge.model.Forge;
import com.teamtop.system.forge.model.ForgeModel;
import com.teamtop.system.godbook.GodBook;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.littleLeader.LittleLeader;
import com.teamtop.system.littleLeader.LittleLeaderModel;
import com.teamtop.system.monsterSpirit.model.MonsterSpiritInfo;
import com.teamtop.system.monsterSpirit.model.MonsterSpiritModel;
import com.teamtop.system.promotion.model.PromotionModel;
import com.teamtop.system.promotion.model.TaskInfo;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.system.specialTreasure.SpecialTreasure;
import com.teamtop.system.treasure.model.TreasureData;
import com.teamtop.system.wujiang.WuJiang;
import com.teamtop.system.zhanjia.ZhanJia;
import com.teamtop.util.log.LogTool;

import excel.config.Config_bao_214;
import excel.config.Config_book_213;
import excel.config.Config_book_215;
import excel.config.Config_clothes_212;
import excel.config.Config_daoju_204;
import excel.config.Config_hero_211;
import excel.config.Config_sword_216;
import excel.config.Config_up_231;
import excel.config.Config_uptask_231;
import excel.config.Config_yb_217;
import excel.struct.Struct_bao_214;
import excel.struct.Struct_book_213;
import excel.struct.Struct_book_215;
import excel.struct.Struct_clothes_212;
import excel.struct.Struct_daoju_204;
import excel.struct.Struct_hero_211;
import excel.struct.Struct_sword_216;
import excel.struct.Struct_up_231;
import excel.struct.Struct_uptask_231;
import excel.struct.Struct_yb_217;

public class PromotionFunction {

	private static PromotionFunction promotionFunction;

	private PromotionFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized PromotionFunction getIns() {
		if (promotionFunction == null) {
			promotionFunction = new PromotionFunction();
		}
		return promotionFunction;
	}

	public void updatePromotionTask(long hid, PromotionTaskType ptType, Object obj) {
		try {
			Hero hero = HeroCache.getHero(hid);
			if (hero == null) {
				return;
			}
			PromotionModel promotionModel = hero.getPromotionModel();
			if (promotionModel==null) {
				return;
			}
			if (!HeroFunction.getIns().checkSystemOpen(hero, PromotionConst.SysId)) {
				return;
			}
			List<Integer> list = PromotionCache.getTypeTaskCache().get(ptType.getTaskType());
			if(list==null) {
				System.err.println(ptType.getTaskType());
				LogTool.info("PromotionFunction ptType=" + ptType.getTaskType(), PromotionFunction.class);
				return;
			}
			int first = list.get(0);
			int teamId = first / PromotionConst.TEAM_DIVISOR;
			Map<Integer, TaskInfo> taskMap = promotionModel.getTaskMap();
			Map<Integer, Integer> teamTask = promotionModel.getTeamTask();
			Integer taskId = teamTask.get(teamId);
			if(taskId==null) {
				return;
			}
			Struct_uptask_231 task = Config_uptask_231.getIns().get(taskId);
			if (task == null) {
				return;
			}
			int type = task.getType();
			TaskInfo taskInfo = taskMap.get(taskId);
			if(taskInfo==null) {
				LogTool.info("Promotion taskId:"+taskId, PromotionFunction.class);
				return;
			}
			if (type == PromotionTaskType.REBORN.getTaskType()) {// 转生
				taskInfo.setProgress(hero.getRebornlv());
			} else if (type == PromotionTaskType.ACTIVATE_TREASURE.getTaskType()) {
				TreasureData treasureData = hero.getTreasureData();
				if (treasureData != null) {
					int num = 0;
					Iterator<Integer> iterator = treasureData.getTreasureMap().keySet().iterator();
					int tid = 0;
					Struct_bao_214 bao = null;
					for (; iterator.hasNext();) {
						tid = iterator.next();
						bao = Config_bao_214.getIns().get(tid);
						if (bao.getPin() >= task.getCan2()) {
							num += 1;
						}
					}
					taskInfo.setProgress(num);
				}
			} else if (type == PromotionTaskType.ACTIVATE_GODBOOK.getTaskType()) {
				GodBook godbook = hero.getGodbook();
				if (godbook != null) {
					int num = 0;
					Iterator<Integer> iterator = godbook.getHasBooks().keySet().iterator();
					int bid = 0;
					Struct_book_215 book = null;
					for (; iterator.hasNext();) {
						bid = iterator.next();
						book = Config_book_215.getIns().get(bid);
						if (book.getPin() >= task.getCan2()) {
							num += 1;
						}
					}
					taskInfo.setProgress(num);
				}
			} else if (type == PromotionTaskType.ACTIVATE_EXCARIBUR.getTaskType()) {
				Excalibur excalibur = hero.getExcalibur();
				if (excalibur != null) {
					int num = 0;
					Iterator<Integer> iterator = excalibur.getExcaliburMap().keySet().iterator();
					int eid = 0;
					Struct_sword_216 sword = null;
					for (; iterator.hasNext();) {
						eid = iterator.next();
						sword = Config_sword_216.getIns().get(eid);
						if (sword.getPin() >= task.getCan2()) {
							num += 1;
						}
					}
					taskInfo.setProgress(num);
				}
			} else if (type == PromotionTaskType.ACTIVATE_SPECIALTREASURE.getTaskType()) {
				SpecialTreasure specialTreasure = hero.getSpecialTreasure();
				if (specialTreasure != null) {
					int num = 0;
					Iterator<Integer> iterator = specialTreasure.getTreasureStar().keySet().iterator();
					int stid = 0;
					Struct_yb_217 yb = null;
					for (; iterator.hasNext();) {
						stid = iterator.next();
						yb = Config_yb_217.getIns().get(stid);
						if (yb.getPin() >= task.getCan2()) {
							num += 1;
						}
					}
					taskInfo.setProgress(num);
				}
			} else if (type == PromotionTaskType.ACTIVATE_GENERAL.getTaskType()) {
				WuJiang wujiang = hero.getWujiang();
				if (wujiang != null) {
					int num = 0;
					Iterator<Integer> iterator = wujiang.getWujiangs().keySet().iterator();
					int gid = 0;
					Struct_hero_211 general = null;
					int toolId = 0;
					Struct_daoju_204 tool = null;
					int[][] activation = null;
					for (; iterator.hasNext();) {
						gid = iterator.next();
						general = Config_hero_211.getIns().get(gid);
						activation = general.getActivation();
						if(activation==null) {
							continue;
						}
						toolId = activation[0][1];
						tool = Config_daoju_204.getIns().get(toolId);
						if (tool.getQuality() >= task.getCan2()) {
							num += 1;
						}
					}
					taskInfo.setProgress(num);
				}
			} else if (type == PromotionTaskType.HERO_LEVEL.getTaskType()) {
				taskInfo.setProgress(hero.getRealLevel());
			} else if (type == PromotionTaskType.FORGE_INTENSIFY.getTaskType()) {
				Forge forge = hero.getForge();
				if (forge != null) {
					Iterator<ForgeModel> iterator = forge.getForgeModelMap().values().iterator();
					int num = 0;
					ForgeModel model = null;
					for (; iterator.hasNext();) {
						model = iterator.next();
						if (model.getStrengthen() >= task.getCan2()) {
							num += 1;
						}
					}
					taskInfo.setProgress(num);
				}
			} else if (type == PromotionTaskType.FORGE_STARLEVEL.getTaskType()) {
				Forge forge = hero.getForge();
				if (forge != null) {
					Iterator<ForgeModel> iterator = forge.getForgeModelMap().values().iterator();
					int num = 0;
					ForgeModel model = null;
					for (; iterator.hasNext();) {
						model = iterator.next();
						if (model.getStarLevel() >= task.getCan2()) {
							num += 1;
						}
					}
					taskInfo.setProgress(num);
				}
			} else if (type == PromotionTaskType.FORGE_GEM.getTaskType()) {
				int maxBaoShiSum = ForgeFunction.getIns().maxBaoShiSum(hero);
				taskInfo.setProgress(maxBaoShiSum);
			} else if (type == PromotionTaskType.TREASURE_LEVEL.getTaskType()) {
				TreasureData treasureData = hero.getTreasureData();
				if (treasureData != null) {
					taskInfo.setProgress(treasureData.getLevel());
				}
			} else if (type == PromotionTaskType.GODBOOK_LEVEL.getTaskType()) {
				GodBook godbook = hero.getGodbook();
				if (godbook != null) {
					taskInfo.setProgress(godbook.getLevel());
				}
			} else if (type == PromotionTaskType.GENERAL_LEVEL.getTaskType()) {
				WuJiang wujiang = hero.getWujiang();
				if (wujiang != null) {
					taskInfo.setProgress(wujiang.getJieLv());
				}
			} else if (type == PromotionTaskType.ZHANJIA_LEVEL.getTaskType()) {
				ZhanJia zhanJia = hero.getZhanJia();
				if (zhanJia != null) {
					taskInfo.setProgress(zhanJia.getJieLv());
				}
			} else if (type == PromotionTaskType.ZHANGONG.getTaskType()) {
				taskInfo.setProgress(hero.getZhanGong());
			} else if (type == PromotionTaskType.DAILY_TASK.getTaskType()) {
				DayTask dayTask = hero.getDayTask();
				if (dayTask != null) {
					int num = 0;
					Iterator<DayTaskModel> iterator = dayTask.getDayTasks().values().iterator();
					DayTaskModel dayTaskModel = null;
					for (; iterator.hasNext();) {
						dayTaskModel = iterator.next();
						if (dayTaskModel.getReward() > GameConst.REWARD_0) {
							num += 1;

						}
					}
					taskInfo.setProgress(num);
				}
			} else if (type == PromotionTaskType.EXCALIBUR_LEVEL.getTaskType()) {
				Excalibur excalibur = hero.getExcalibur();
				if (excalibur != null) {
					taskInfo.setProgress(excalibur.getJieLv());
				}
			} else if (type == PromotionTaskType.SPECIALTREASURE_LEVEL.getTaskType()) {
				SpecialTreasure specialTreasure = hero.getSpecialTreasure();
				if (specialTreasure != null) {
					taskInfo.setProgress(specialTreasure.getJieLv());
				}
			}else if (type == PromotionTaskType.BINGFA_LEVEL.getTaskType()) {
				BingFa bingfa = hero.getBingfa();
				if (bingfa != null) {
					taskInfo.setProgress(bingfa.getJieLv());
				}
			}else if (type == PromotionTaskType.ZHANJIA_JIHUO.getTaskType()) {
				ZhanJia zhanJia = hero.getZhanJia();
				if (zhanJia != null) {
					int num = 0;
					Iterator<Integer> iterator = zhanJia.getZhanjias().keySet().iterator();
					int gid = 0;
					Struct_clothes_212 clothes = null;
					for (; iterator.hasNext();) {
						gid = iterator.next();
						clothes = Config_clothes_212.getIns().get(gid);
						if(clothes==null) {
							continue;
						}
						if (clothes.getPinzhi() >= task.getCan2()) {
							num += 1;
						}
					}
					taskInfo.setProgress(num);
				}
			}else if (type == PromotionTaskType.BINGFA_JIHUO.getTaskType()) {
				BingFa bingfa = hero.getBingfa();
				if (bingfa != null) {
					int num = 0;
					Iterator<Integer> iterator = bingfa.getBingfas().keySet().iterator();
					int gid = 0;
					Struct_book_213 bingfas = null;
					for (; iterator.hasNext();) {
						gid = iterator.next();
						bingfas = Config_book_213.getIns().get(gid);
						if(bingfas==null) {
							continue;
						}
						if (bingfas.getPin() >= task.getCan2()) {
							num += 1;
						}
					}
					taskInfo.setProgress(num);
				}
			}else if (type == PromotionTaskType.DESTINY_LEVEL.getTaskType()) {
				//符文总等级
				PersonalDestiny personalDestiny = hero.getPersonalDestiny();
				if (personalDestiny != null) {
					int num = 0;
					num = DestinyFunction.getIns().getfuwenSumLevel(hero);
					taskInfo.setProgress(num);
				}
			}else if (type == PromotionTaskType.MONSTER_NUM.getTaskType()) {
				//兽灵洗练次数
				MonsterSpiritModel monsterSpiritModel = hero.getMonsterSpiritModel();
				if (monsterSpiritModel != null) {
					int num = monsterSpiritModel.getWashNum();
					taskInfo.setProgress(num);
				}
			}else if (type == PromotionTaskType.XINGXIU_DONG_LEVEL.getTaskType()) {
				//24：东方星宿等级 参数1：1            参数2：星宿等级
				MonsterSpiritModel monsterSpiritModel = hero.getMonsterSpiritModel();
				if (monsterSpiritModel != null) {
					MonsterSpiritInfo monsterSpiritInfo = monsterSpiritModel.getMonsterSpiritMap().get(1);
					if (monsterSpiritInfo!=null) {
						int num = monsterSpiritInfo.getStarLevel();
						taskInfo.setProgress(num);
					}
				}
			}else if (type == PromotionTaskType.XINGXIU_XI_LEVEL.getTaskType()) {
				//25：西方星宿等级 参数1：1            参数2：星宿等级
				MonsterSpiritModel monsterSpiritModel = hero.getMonsterSpiritModel();
				if (monsterSpiritModel != null) {
					MonsterSpiritInfo monsterSpiritInfo = monsterSpiritModel.getMonsterSpiritMap().get(2);
					if (monsterSpiritInfo!=null) {
						int num = monsterSpiritInfo.getStarLevel();
						taskInfo.setProgress(num);
					}
				}
			
			}else if (type == PromotionTaskType.XINGXIU_NAN_LEVEL.getTaskType()) {
				//26：南方星宿等级 参数1：1            参数2：星宿等级
				MonsterSpiritModel monsterSpiritModel = hero.getMonsterSpiritModel();
				if (monsterSpiritModel != null) {
					MonsterSpiritInfo monsterSpiritInfo = monsterSpiritModel.getMonsterSpiritMap().get(3);
					if (monsterSpiritInfo!=null) {
						int num = monsterSpiritInfo.getStarLevel();
						taskInfo.setProgress(num);
					}
				}
			
			}else if (type == PromotionTaskType.XINGXIU_BIE_LEVEL.getTaskType()) {
				//27：北方星宿等级 参数1：1            参数2：星宿等级
				MonsterSpiritModel monsterSpiritModel = hero.getMonsterSpiritModel();
				if (monsterSpiritModel != null) {
					MonsterSpiritInfo monsterSpiritInfo = monsterSpiritModel.getMonsterSpiritMap().get(4);
					if (monsterSpiritInfo!=null) {
						int num = monsterSpiritInfo.getStarLevel();
						taskInfo.setProgress(num);
					}
				}
			
			}else if (type == PromotionTaskType.LIU_LEALEAD_LEVEL.getTaskType()) {
				//28：刘禅亲密度等级 参数1：1            参数2：亲密度等级
				LittleLeader littleLeader = hero.getLittleLeader();
				if (littleLeader != null) {
					LittleLeaderModel littleLeaderModel = littleLeader.getHasLittleLeaderModels().get(1);
					if (littleLeaderModel!=null) {
						int num = littleLeaderModel.getQimiduLv();
						taskInfo.setProgress(num);
					}
				}
			
			}else if (type == PromotionTaskType.CAO_LEALEAD_LEVEL.getTaskType()) {
				//29：曹冲亲密度等级 参数1：1            参数2：亲密度等级
				LittleLeader littleLeader = hero.getLittleLeader();
				if (littleLeader != null) {
					LittleLeaderModel littleLeaderModel = littleLeader.getHasLittleLeaderModels().get(2);
					if (littleLeaderModel!=null) {
						int num = littleLeaderModel.getQimiduLv();
						taskInfo.setProgress(num);
					}
				}
			
			}else if (type == PromotionTaskType.SUN_LEALEAD_LEVEL.getTaskType()) {
				//30：孙鲁育亲密度等级 参数1：1            参数2：亲密度等级
				LittleLeader littleLeader = hero.getLittleLeader();
				if (littleLeader != null) {
					LittleLeaderModel littleLeaderModel = littleLeader.getHasLittleLeaderModels().get(3);
					if (littleLeaderModel!=null) {
						int num = littleLeaderModel.getQimiduLv();
						taskInfo.setProgress(num);
					}
				}
			
			}
			
			boolean checkTaskFinish = checkTaskFinish(hero, taskInfo, taskId);
			if (checkTaskFinish) {
				if(taskInfo.getGetAward()!=PromotionConst.TASK_STATE_HAD_GET) {					
					taskInfo.setGetAward(PromotionConst.TASK_STATE_CAN_GET);
				}
				updateRedPoint(hero);
			}
		} catch (Exception e) {
			LogTool.error(e, PromotionFunction.class, "Promotion updatePromotionTask fail");
		}
	}


	public boolean checkTaskFinish(Hero hero, TaskInfo taskInfo, int taskId) {
		try {
			Struct_uptask_231 task = Config_uptask_231.getIns().get(taskId);
			int type = task.getType();
			int progress = taskInfo.getProgress();
			if (type == PromotionTaskType.REBORN.getTaskType()) {// 转生
				return task.getCan2() <= progress;
			} else if (type == PromotionTaskType.ACTIVATE_TREASURE.getTaskType()) {
				return progress >= task.getCan1();
			} else if (type == PromotionTaskType.ACTIVATE_GODBOOK.getTaskType()) {
				return progress >= task.getCan1();
			} else if (type == PromotionTaskType.ACTIVATE_EXCARIBUR.getTaskType()) {
				return progress >= task.getCan1();
			} else if (type == PromotionTaskType.ACTIVATE_SPECIALTREASURE.getTaskType()) {
				return progress >= task.getCan1();
			} else if (type == PromotionTaskType.ACTIVATE_GENERAL.getTaskType()) {
				return progress >= task.getCan1();
			} else if (type == PromotionTaskType.HERO_LEVEL.getTaskType()) {
				return progress >= task.getCan2();
			} else if (type == PromotionTaskType.FORGE_INTENSIFY.getTaskType()) {
				return progress >= task.getCan1();
			} else if (type == PromotionTaskType.FORGE_STARLEVEL.getTaskType()) {
				return progress >= task.getCan1();
			} else if (type == PromotionTaskType.FORGE_GEM.getTaskType()) {
				return progress >= task.getCan2();
			} else if (type == PromotionTaskType.TREASURE_LEVEL.getTaskType()) {
				return progress >= task.getCan2();
			} else if (type == PromotionTaskType.GODBOOK_LEVEL.getTaskType()) {
				return progress >= task.getCan2();
			} else if (type == PromotionTaskType.GENERAL_LEVEL.getTaskType()) {
				return progress >= task.getCan2();
			} else if (type == PromotionTaskType.ZHANJIA_LEVEL.getTaskType()) {
				return progress >= task.getCan2();
			} else if (type == PromotionTaskType.ZHANGONG.getTaskType()) {
				return progress >= task.getCan2();
			} else if (type == PromotionTaskType.DAILY_TASK.getTaskType()) {
				return progress >= task.getCan2();
			} else if (type == PromotionTaskType.EXCALIBUR_LEVEL.getTaskType()) {
				return progress >= task.getCan2();
			} else if (type == PromotionTaskType.SPECIALTREASURE_LEVEL.getTaskType()) {
				return progress >= task.getCan2();
			} else if (type == PromotionTaskType.BINGFA_LEVEL.getTaskType()) {
				return progress >= task.getCan2();
			} else if (type == PromotionTaskType.ZHANJIA_JIHUO.getTaskType()) {
				return progress >= task.getCan1();
			} else if (type == PromotionTaskType.BINGFA_JIHUO.getTaskType()) {
				return progress >= task.getCan1();
			}else if (type == PromotionTaskType.DESTINY_LEVEL.getTaskType()) {
				return progress >= task.getCan2();
			}else if (type == PromotionTaskType.MONSTER_NUM.getTaskType()) {
				return progress >= task.getCan2();
			}else if (type == PromotionTaskType.XINGXIU_DONG_LEVEL.getTaskType()) {
				return progress >= task.getCan2();
			}else if (type == PromotionTaskType.XINGXIU_XI_LEVEL.getTaskType()) {
				return progress >= task.getCan2();
			}else if (type == PromotionTaskType.XINGXIU_NAN_LEVEL.getTaskType()) {
				return progress >= task.getCan2();
			}else if (type == PromotionTaskType.XINGXIU_BIE_LEVEL.getTaskType()) {
				return progress >= task.getCan2();
			}else if (type == PromotionTaskType.LIU_LEALEAD_LEVEL.getTaskType()) {
				return progress >= task.getCan2();
			}else if (type == PromotionTaskType.CAO_LEALEAD_LEVEL.getTaskType()) {
				return progress >= task.getCan2();
			}else if (type == PromotionTaskType.SUN_LEALEAD_LEVEL.getTaskType()) {
				return progress >= task.getCan2();
			}
			
		} catch (Exception e) {
			LogTool.error(e, PromotionFunction.class, hero.getId(), hero.getName(),
					"PromotionFunction checkTaskFinish");
		}
		return false;
	}

	public boolean checkTaskFinishOld(Hero hero, TaskInfo taskInfo, int taskId) {
		try {
			Struct_uptask_231 task = Config_uptask_231.getIns().get(taskId);
			int type = task.getType();
			if (type == PromotionTaskType.REBORN.getTaskType()) {// 转生
				return task.getCan2() <= hero.getRebornlv();
			} else if (type == PromotionTaskType.ACTIVATE_TREASURE.getTaskType()) {
				TreasureData treasureData = hero.getTreasureData();
				if (treasureData != null) {
					int num = 0;
					Iterator<Integer> iterator = treasureData.getTreasureMap().keySet().iterator();
					int tid = 0;
					Struct_bao_214 bao = null;
					for (; iterator.hasNext();) {
						tid = iterator.next();
						bao = Config_bao_214.getIns().get(tid);
						if (bao.getPin() >= task.getCan2()) {
							num += 1;
						}
					}
					return num >= task.getCan1();
				}
			} else if (type == PromotionTaskType.ACTIVATE_GODBOOK.getTaskType()) {
				GodBook godbook = hero.getGodbook();
				if (godbook != null) {
					int num = 0;
					Iterator<Integer> iterator = godbook.getHasBooks().keySet().iterator();
					int bid = 0;
					Struct_book_215 book = null;
					for (; iterator.hasNext();) {
						bid = iterator.next();
						book = Config_book_215.getIns().get(bid);
						if (book.getPin() >= task.getCan2()) {
							num += 1;
						}
					}
					return num >= task.getCan1();
				}
			} else if (type == PromotionTaskType.ACTIVATE_EXCARIBUR.getTaskType()) {
				Excalibur excalibur = hero.getExcalibur();
				if (excalibur != null) {
					int num = 0;
					Iterator<Integer> iterator = excalibur.getExcaliburMap().keySet().iterator();
					int eid = 0;
					Struct_sword_216 sword = null;
					for (; iterator.hasNext();) {
						eid = iterator.next();
						sword = Config_sword_216.getIns().get(eid);
						if (sword.getPin() >= task.getCan2()) {
							num += 1;
						}
					}
					return num >= task.getCan1();
				}
			} else if (type == PromotionTaskType.ACTIVATE_SPECIALTREASURE.getTaskType()) {
				SpecialTreasure specialTreasure = hero.getSpecialTreasure();
				if (specialTreasure != null) {
					int num = 0;
					Iterator<Integer> iterator = specialTreasure.getTreasureStar().keySet().iterator();
					int stid = 0;
					Struct_yb_217 yb = null;
					for (; iterator.hasNext();) {
						stid = iterator.next();
						yb = Config_yb_217.getIns().get(stid);
						if (yb.getPin() >= task.getCan2()) {
							num += 1;
						}
					}
					return num >= task.getCan1();
				}
			} else if (type == PromotionTaskType.ACTIVATE_GENERAL.getTaskType()) {
				WuJiang wujiang = hero.getWujiang();
				if (wujiang != null) {
					int num = 0;
					Iterator<Integer> iterator = wujiang.getWujiangs().keySet().iterator();
					int gid = 0;
					Struct_hero_211 general = null;
					int toolId = 0;
					Struct_daoju_204 tool = null;
					int[][] activation = null;
					for (; iterator.hasNext();) {
						gid = iterator.next();
						general = Config_hero_211.getIns().get(gid);
						activation = general.getActivation();
						if(activation==null) {
							continue;
						}
						toolId = activation[0][1];
						tool = Config_daoju_204.getIns().get(toolId);
						if (tool.getQuality() >= task.getCan2()) {
							num += 1;
						}
					}
					return num >= task.getCan1();
				}
			} else if (type == PromotionTaskType.HERO_LEVEL.getTaskType()) {
				return hero.getRealLevel() >= task.getCan2();
			} else if (type == PromotionTaskType.FORGE_INTENSIFY.getTaskType()) {
				Forge forge = hero.getForge();
				if (forge != null) {
					Iterator<ForgeModel> iterator = forge.getForgeModelMap().values().iterator();
					int num = 0;
					ForgeModel model = null;
					for (; iterator.hasNext();) {
						model = iterator.next();
						if (model.getStrengthen() >= task.getCan2()) {
							num += 1;
						}
					}
					return num >= task.getCan1();
				}
			} else if (type == PromotionTaskType.FORGE_STARLEVEL.getTaskType()) {
				Forge forge = hero.getForge();
				if (forge != null) {
					Iterator<ForgeModel> iterator = forge.getForgeModelMap().values().iterator();
					int num = 0;
					ForgeModel model = null;
					for (; iterator.hasNext();) {
						model = iterator.next();
						if (model.getStarLevel() >= task.getCan2()) {
							num += 1;
						}
					}
					return num >= task.getCan1();
				}
			} else if (type == PromotionTaskType.FORGE_GEM.getTaskType()) {
				int maxBaoShiSum = ForgeFunction.getIns().maxBaoShiSum(hero);
				return maxBaoShiSum >= task.getCan2();
			} else if (type == PromotionTaskType.TREASURE_LEVEL.getTaskType()) {
				TreasureData treasureData = hero.getTreasureData();
				if (treasureData != null) {
					return treasureData.getLevel() >= task.getCan2();
				}
			} else if (type == PromotionTaskType.GODBOOK_LEVEL.getTaskType()) {
				GodBook godbook = hero.getGodbook();
				if (godbook != null) {
					return godbook.getLevel() >= task.getCan2();
				}
			} else if (type == PromotionTaskType.GENERAL_LEVEL.getTaskType()) {
				WuJiang wujiang = hero.getWujiang();
				if (wujiang != null) {
					return wujiang.getJieLv() >= task.getCan2();
				}
			} else if (type == PromotionTaskType.ZHANJIA_LEVEL.getTaskType()) {
				ZhanJia zhanJia = hero.getZhanJia();
				if (zhanJia != null) {
					return zhanJia.getJieLv() >= task.getCan2();
				}
			} else if (type == PromotionTaskType.ZHANGONG.getTaskType()) {
				return hero.getZhanGong() >= task.getCan2();
			} else if (type == PromotionTaskType.DAILY_TASK.getTaskType()) {
				DayTask dayTask = hero.getDayTask();
				if (dayTask != null) {
					int num = 0;
					Iterator<DayTaskModel> iterator = dayTask.getDayTasks().values().iterator();
					DayTaskModel dayTaskModel = null;
					for (; iterator.hasNext();) {
						dayTaskModel = iterator.next();
						if (dayTaskModel.getReward() > GameConst.REWARD_0) {
							num += 1;
						}
					}
					return num >= task.getCan2();
				}
			}
		} catch (Exception e) {
			LogTool.error(e, PromotionFunction.class, hero.getId(), hero.getName(),
					"PromotionFunction checkTaskFinish");
		}
		return false;
	}

	/**
	 * 添加新任务
	 * 
	 * @param hero
	 * @param ptType
	 * @param taskId
	 */
	public void addNewTask(Hero hero, int type, int taskId) {
		if (hero == null) {
			return;
		}
		try {
			PromotionModel promotionModel = hero.getPromotionModel();
			if (promotionModel == null) {
				return;
			}
			if (!HeroFunction.getIns().checkSystemOpen(hero, PromotionConst.SysId)) {
				return;
			}
			Map<Integer, TaskInfo> taskMap = promotionModel.getTaskMap();
			List<Integer> list = PromotionCache.getTypeTaskCache().get(type);
			if (taskId == 0) {
				taskId = list.get(0);
			} else {
				int teamId = taskId / PromotionConst.TEAM_DIVISOR;
				Map<Integer, Integer> teamTask = promotionModel.getTeamTask();
				if (teamTask.containsKey(teamId)) {
					int nextId = Config_uptask_231.getIns().get(teamTask.get(teamId)).getNext();
					if (nextId == 0) {
						return;
					}
					if (nextId != taskId) {
						return;
					}
				}
			}
			if (taskMap.containsKey(taskId)) {
				return;
			}
			TaskInfo taskInfo = new TaskInfo(taskId, 0, 0);
			taskMap.put(taskId, taskInfo);
			int teamId = taskId / PromotionConst.TEAM_DIVISOR;
			promotionModel.getTeamTask().put(teamId, taskId);
			updatePromotionTask(hero.getId(), PromotionTaskType.getTaskType(type), null);
		} catch (Exception e) {
			LogTool.error(e, PromotionFunction.class, "Promotion addNewTask fail");
		}
	}

	public boolean checkRedPoint(Hero hero) {
		try {
			PromotionModel promotionModel = hero.getPromotionModel();
			if (promotionModel == null) {
				return false;
			}
			if (!HeroFunction.getIns().checkSystemOpen(hero, PromotionConst.SysId)) {
				return false;
			}
			Map<Integer, TaskInfo> taskMap = promotionModel.getTaskMap();
			Set<Integer> taskIdSet = new HashSet<>(taskMap.keySet());
			Iterator<Integer> iterator = taskIdSet.iterator();
			int taskId = 0;
			TaskInfo taskInfo = null;
			for (; iterator.hasNext();) {
				taskId = iterator.next();
				taskInfo = taskMap.get(taskId);
				if (taskInfo.getGetAward() == PromotionConst.TASK_STATE_CAN_GET) {
					return true;
				}
			}
			int level = promotionModel.getLevel();
			Set<Integer> levelReward = promotionModel.getLevelReward();
			List<Struct_up_231> sortList = Config_up_231.getIns().getSortList();
			int size = sortList.size();
			for (int i = 0; i < size; i++) {
				Struct_up_231 struct_up_231 = sortList.get(i);
				if (!levelReward.contains(struct_up_231.getId()) && struct_up_231.getReward() != null
						&& struct_up_231.getId() <= level) {
					return true;
				}
			}
		} catch (Exception e) {
			LogTool.error(e, PromotionFunction.class, "Promotion checkRedPoint fail");
		}
		return false;
	}

	/**
	 * 更新红点
	 * @param hero
	 */
	public void updateRedPoint(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, PromotionConst.SysId)) {
				return;
			}
			boolean redPoint = checkRedPoint(hero);
			int state = RedPointConst.HAS_RED;
			if (!redPoint) {
				state = RedPointConst.NO_RED;
			}
			RedPointFunction.getIns().fastUpdateRedPoint(hero, PromotionConst.SysId, PromotionConst.redPoint, state);
		} catch (Exception e) {
			LogTool.error(e, PromotionFunction.class, "Promotion updateRedPoint");
		}
	}

}
