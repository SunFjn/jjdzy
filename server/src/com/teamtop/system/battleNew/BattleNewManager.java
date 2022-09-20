package com.teamtop.system.battleNew;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.BattleNewOpTaskRunnable;
import com.teamtop.system.battleNew.event.BattleNewEvent;
import com.teamtop.system.battleNew.model.BattleNewInfo;
import com.teamtop.system.battleNew.model.BuffInfo;
import com.teamtop.system.battleNew.model.PeronalBattleData;
import com.teamtop.system.battleNew.model.SkillDamage;
import com.teamtop.system.godbook.GodBook;
import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.skill.SkillConst;
import com.teamtop.system.treasure.model.TreasureData;
import com.teamtop.system.wujiang.WuJiangModel;
import com.teamtop.system.zhenYan.ZhenYanFunction;
import com.teamtop.util.ProbabilityEvent.RandomUtil;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_buff_011;
import excel.config.Config_changshu_101;
import excel.config.Config_hero_211;
import excel.config.Config_skill_210;
import excel.struct.Struct_buff_011;
import excel.struct.Struct_hero_211;
import excel.struct.Struct_skill_210;

public class BattleNewManager {

	private static BattleNewManager battleNewManager;

	private BattleNewManager() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized BattleNewManager getIns() {
		if (battleNewManager == null) {
			battleNewManager = new BattleNewManager();
		}
		return battleNewManager;
	}

	/**
	 * 使用技能
	 * 
	 * @param hero
	 * @param skillId
	 * @param target
	 */
	public void useSkill(Hero hero, int skillId) {
		try {
			long hid = hero.getId();
			ConcurrentHashMap<Long, Long> heroBattleMap = BattleNewSysCache.getHeroBattleMap();
			if (!heroBattleMap.containsKey(hid)) {
				return;
			}
			long battleUid = heroBattleMap.get(hid);
			// 同一场战斗单线程进行
			OpTaskExecutorService.PublicOrderService.execute(new BattleNewOpTaskRunnable() {

				@Override
				public void run() {
					BattleNewInfo battleNewInfo = BattleNewSysCache.getBattleMap().get(battleUid);
					int battleType = battleNewInfo.getBattleType();
					BattleSysType type = battleNewInfo.getSysType();
					Map<Long, PeronalBattleData> playerDataMap = battleNewInfo.getPlayerDataMap();
					PeronalBattleData myBattleData = playerDataMap.get(hid);
					Map<Integer, SkillDamage> skillMap = myBattleData.getSkillMap();
					SkillDamage skillDamage = skillMap.get(skillId);
					if (skillDamage == null) {
						skillDamage = new SkillDamage(skillId, 0);
						skillMap.put(skillId, skillDamage);
					} else {
						skillDamage.getCriticalSet().clear();
						skillDamage.getDamageMap().clear();
					}
					long lastUseTime = skillDamage.getLastUseTime();
					Struct_skill_210 skill = Config_skill_210.getIns().get(skillId);
					long currentTime = TimeDateUtil.getCurrentTimeInMillis();
					long passTime = currentTime - lastUseTime;
					int cdTime = skill.getCd() * 1000;
					if (skill.getType() == SkillConst.TYPE_4 || skill.getType() == SkillConst.TYPE_5) {
						// 是否被沉默
						Map<Integer, BuffInfo> buffMap = myBattleData.getBuffMap();
						Iterator<BuffInfo> iterator = buffMap.values().iterator();
						for (; iterator.hasNext();) {
							BuffInfo buffInfo = iterator.next();
							int buffId = buffInfo.getBuffId();
							Map<Integer, Struct_buff_011> sysBuffMap = Config_buff_011.getIns().getMap();
							Struct_buff_011 buff_011 = sysBuffMap.get(buffId);
							if (buff_011 != null && buff_011.getType() == 3) {
								long cdEndTime = buffInfo.getCdEndTime();
								if (TimeDateUtil.getCurrentTimeInMillis() < cdEndTime) {
									return;
								}
							}
						}
						// 异兽天赋减少cd
						int cdCutDown = hero.getFinalFightAttr().getCdCutDown();
						if (passTime < (cdTime - cdCutDown)) {
							// 技能还没冷却
							return;
						}
					} else {
						if (passTime < cdTime) {
							// 技能还没冷却
							return;
						}
					}
//					boolean canUseSkill = checkBuffCanUseSkill(myBattleData);
//					if (!canUseSkill) {
//						// 处于buff限制状态
//						return;
//					}
					PeronalBattleData battleData = playerDataMap.get(hero.getId());
					Map<Integer, Long> skillEffectMap = battleData.getSkillEffectMap();
					if (skillEffectMap.containsKey(3)) {
						// 是否被定身判断
						int beControlTimeCutDown = hero.getFinalFightAttr().getBeControlTimeCutDown();
						Long endTime = skillEffectMap.get(3);
						if (endTime != null) {
							endTime -= beControlTimeCutDown;
							if (TimeDateUtil.getCurrentTimeInMillis() < endTime) {
								// 当前被定身
								return;
							} else {
								skillEffectMap.remove(3);
							}
						}
					}
					skillDamage.setLastUseTime(currentTime);
					int campType = myBattleData.getCampType();
					byte enermyCamp = 0;
					if (campType == BattleNewConst.CAMP_1) {
						enermyCamp = BattleNewConst.CAMP_2;
					} else {
						enermyCamp = BattleNewConst.CAMP_1;
					}
					Set<Long> enermys = battleNewInfo.getCampMap().get(enermyCamp);
					
					if (skill.getHdxg() > 0) {
						int effectType = skill.getHdxg();
						int tId = skill.getDybw();// 技能对应宝物id
						int starLve = 1;
						if (tId > 0) {
							boolean hasTid = false;
							TreasureData treasureData = hero.getTreasureData();
							if (treasureData != null && treasureData.getTreasureMap().containsKey(tId)
									&& treasureData.getWearTreasureList().contains(tId)) {
								starLve = treasureData.getTreasureMap().get(tId).getStarLevel();
								hasTid = true;
							}
							GodBook godbook = hero.getGodbook();
							int wearid = godbook.getWearid();
							if (godbook != null && godbook.getHasBooks().containsKey(tId) && wearid == tId) {
								starLve = godbook.getHasBooks().get(tId).getStar();
								hasTid = true;
							}
							if (!hasTid) {
								return;
							}
							LogTool.info("宝物天书  tid=" + tId, this);
						}
						if (effectType == 1) {
							// 加血
							int cureEffect = hero.getFinalFightAttr().getCureEffect();
							long hpMax = hero.getFinalFightAttr().getHpMax();
							int addTime = skill.getAttpg() * starLve;
							double addHp = hpMax * (skill.getAttp() + addTime) / 100000;
							// 敌方异兽天赋降低
							int lowerCureEffect = 0;
							for (Long eid : enermys) {
								Hero enermy = HeroCache.getHero(eid);
								if (enermy != null) {
									lowerCureEffect += enermy.getFinalFightAttr().getLowerCureEffect();
								}
							}
							double lowerHp = 0;
							if (lowerCureEffect > 0) {
								lowerHp = addHp * lowerCureEffect / 100000;
							}
							// 自身异兽天赋加成
							if (cureEffect > 0) {
								addHp = addHp + addHp * cureEffect / 100000 - lowerHp;
							} else {
								addHp = addHp - lowerHp;
							}
							long hp = myBattleData.getHp() + (long) addHp;
							if (hp >= hpMax) {
								hp = hpMax;
							}
							myBattleData.setHp(hp);
							List<Object[]> hpDataList = new ArrayList<>();
							hpDataList.add(new Object[] { hid, myBattleData.getHp() + myBattleData.getHudun() });
							for (long pid : playerDataMap.keySet()) {
								BattleNewSender.sendCmd_3870(pid, hpDataList.toArray());
							}
						} else if (effectType == 2) {
							// 设置无敌状态
							// PeronalBattleData battleData = playerDataMap.get(hero.getId());
							// Map<Integer, Long> skillEffectMap = battleData.getSkillEffectMap();
							int addTime = skill.getAttpg()*starLve;
							skillEffectMap.put(effectType, TimeDateUtil.getCurrentTimeInMillis() + skill.getAttp() + addTime);
						} else if (effectType == 3) {
							// PeronalBattleData battleData = playerDataMap.get(hero.getId());
							// Map<Integer, Long> skillEffectMap = battleData.getSkillEffectMap();
							int addTime = skill.getAttpg()*starLve;
							for(Long pid : enermys) {	
								PeronalBattleData emBattleData = playerDataMap.get(pid);
								Map<Integer, Long> emSkillEffectMap = emBattleData.getSkillEffectMap();
								emSkillEffectMap.put(effectType, TimeDateUtil.getCurrentTimeInMillis() + skill.getAttp() + addTime);
							}
						}
					}
					// 技能伤害处理
					skillDamageHandle(hero, skillId, enermys, battleNewInfo, myBattleData);
					Map<Long, Long> damageMap = skillDamage.getDamageMap();
					Set<Long> criticalSet = skillDamage.getCriticalSet();
					// 返回技能结果数据
					List<Object[]> playerData = new ArrayList<>();
					byte critical = 0;
					for (Long pid : enermys) {
						// L:放技能的玩家I:技能id[L:玩家idL:当前血量[I:buffid]]玩家信息
						PeronalBattleData pbData = playerDataMap.get(pid);
						Iterator<Integer> iterator = pbData.getBuffMap().keySet().iterator();
						List<Object[]> buffList = new ArrayList<>();
						for (; iterator.hasNext();) {
							buffList.add(new Object[] { iterator.next() });
						}
						Long damage = damageMap.get(pid);
						if (damage == null) {
							damage = 0L;
						}
						if (criticalSet.contains(pid)) {
							critical = 1;
						} else {
							critical = 0;
						}
						playerData.add(new Object[] { pid, damage, critical, buffList.toArray() });
					}
					int skillType = skill.getType();
					if (skillType != 8) {
						Set<Long> synHidSet = battleNewInfo.getSynHidSet();
						if (battleNewInfo.getSysType() == BattleSysType.ROUND_PVP) {
							for (Long sHid : synHidSet) {
								if (sHid != null) {
									BattleNewSender.sendCmd_3864(sHid, hid, skillId, playerData.toArray());
								}
							}
						} else {
							Iterator<Long> iterator = playerDataMap.keySet().iterator();
							for (; iterator.hasNext();) {
								long pid = iterator.next();
								BattleNewSender.sendCmd_3864(pid, hid, skillId, playerData.toArray());
							}
						}
					}
				}

				@Override
				public Object getSession() {
					return battleUid;
				}
			});
		} catch (Exception e) {
			LogTool.error(e, BattleNewManager.class, hero.getId(), hero.getName(), "BattleNewManager useSkill");
		}
	}

	public void generalCheck(Hero hero, PeronalBattleData myBattleData, BattleNewInfo battleNewInfo) {
		try {
			LogTool.info("generalCheck start", this);
			int job = hero.getJob();
			int skillJob = job;
			if(job>1000) {
				skillJob = job/1000;
			}
			WuJiangModel wuJiangModel = hero.getWujiang().getWujiangs().get(skillJob);
			Struct_hero_211 struct_hero_211 = Config_hero_211.getIns().getMap().get(skillJob);
			int buffid = struct_hero_211.getBuffid();
			if(buffid==0) {
				return;
			}
			int lv = wuJiangModel.getStar();
			int[][] buffArr = new int[1][];
			buffArr[0] = new int[] { 100000, buffid };
			Map<Integer, SkillDamage> skillMap = myBattleData.getSkillMap();
			buffHandle(hero.getId(), buffArr, battleNewInfo, lv);
			LogTool.info("generalCheck end", this);
		} catch (Exception e) {
			LogTool.error(e, BattleNewManager.class, hero.getId(), hero.getName(), "BattleNewManager generalCheck");
		}
	}

	public boolean nomalSkill(Hero hero, long battleUid, int skillId) {
		long hid = hero.getId();
		BattleNewInfo battleNewInfo = BattleNewSysCache.getBattleMap().get(battleUid);
		Map<Long, PeronalBattleData> playerDataMap = battleNewInfo.getPlayerDataMap();
		PeronalBattleData myBattleData = playerDataMap.get(hid);
		Map<Integer, SkillDamage> skillMap = myBattleData.getSkillMap();
		// 神将技能buff触发检测
		generalCheck(hero, myBattleData, battleNewInfo);
		SkillDamage skillDamage = skillMap.get(skillId);
		if (skillDamage != null) {
//			return false;
		}else {			
			skillDamage = new SkillDamage(skillId, 0);
			skillMap.put(skillId, skillDamage);
		}
		long lastUseTime = skillDamage.getLastUseTime();
		Struct_skill_210 skill = Config_skill_210.getIns().get(skillId);
		long currentTime = TimeDateUtil.getCurrentTimeInMillis();
		long passTime = currentTime - lastUseTime;
		int cdTime = skill.getCd() * 1000;
		if (passTime < cdTime) {
			// 技能还没冷却
			return false;
		}
//		boolean canUseSkill = checkBuffCanUseSkill(myBattleData);
//		if (!canUseSkill) {
//			// 处于buff限制状态
//			return false;
//		}
		skillDamage.setLastUseTime(currentTime);
		int campType = myBattleData.getCampType();
		byte enermyCamp = 0;
		if (campType == BattleNewConst.CAMP_1) {
			enermyCamp = BattleNewConst.CAMP_2;
		} else {
			enermyCamp = BattleNewConst.CAMP_1;
		}
		Set<Long> enermys = battleNewInfo.getCampMap().get(enermyCamp);
		// 技能伤害处理
		skillDamageHandle(hero, skillId, enermys, battleNewInfo, myBattleData);
		return true;
	}

	public void skillHit(Hero hero, int skillId, Object[] target) {
		try {
			long hid = hero.getId();
			ConcurrentHashMap<Long, Long> heroBattleMap = BattleNewSysCache.getHeroBattleMap();
			if (!heroBattleMap.containsKey(hid)) {
				return;
			}
			long battleUid = heroBattleMap.get(hid);
			// 同一场战斗单线程进行
			OpTaskExecutorService.PublicOrderService.execute(new BattleNewOpTaskRunnable() {

				@Override
				public void run() {
					try {
						BattleNewInfo battleNewInfo = BattleNewSysCache.getBattleMap().get(battleUid);
						if(battleNewInfo==null){
							return;
						}
						Map<Long, PeronalBattleData> playerDataMap = battleNewInfo.getPlayerDataMap();
						PeronalBattleData myBattleData = playerDataMap.get(hid);
						// 扣除伤害
						boolean nomalSkill = nomalSkill(hero, battleUid, skillId);
						if (!nomalSkill) {
							return;
						}
						SkillDamage skillDamage = myBattleData.getSkillMap().get(skillId);
						if (skillDamage == null) {
							return;
						}
						Map<Long, Long> damageMap = skillDamage.getDamageMap();
						List<Object[]> hpDataList = new ArrayList<>();
						for (Object obj : target) {
							if (obj == null) {
								continue;
							}
							long pid = (Long) obj;
							if (damageMap.containsKey(pid)) {
								Long damage = damageMap.remove(pid);
								if (damage == null) {
									continue;
								}
								PeronalBattleData battleData = playerDataMap.get(pid);
								long hp = battleData.getHp();
								long hudunValue = battleData.getHudun() + damage;
								long leftHp = hp;
								if (hudunValue < 0) {
									battleData.setHudun(0);
									leftHp = hp + damage;
								} else {
									battleData.setHudun(hudunValue);
								}
								if (leftHp <= 0) {
									// 被攻击者死亡
									leftHp = 0;
								}
								battleData.setHp(leftHp);
								if (leftHp == 0) {
									int[][] buffArr = new int[1][];
									int buffId = BuffConst.RELIVE_BUFF;
									buffArr[0] = new int[] { 100000, buffId };
									Hero enermyHero = HeroCache.getHero(pid);
									int lv = ZhenYanFunction.getIns().getZhenXinLevel(enermyHero);
									if (lv > 0) {
										buffHandle(pid, buffArr, battleNewInfo, lv);
									}
								}
								hpDataList.add(new Object[] { pid, battleData.getHp() + battleData.getHudun() });
							}
						}
//						myBattleData.getSkillMap().remove(skillId);
						// 检测战斗是否结束
						int campType = myBattleData.getCampType();
						byte enermyCamp = 0;
						if (campType == BattleNewConst.CAMP_1) {
							enermyCamp = BattleNewConst.CAMP_2;
						} else {
							enermyCamp = BattleNewConst.CAMP_1;
						}
						Set<Long> enermys = battleNewInfo.getCampMap().get(enermyCamp);
						int deadNum = 0;
						int size = enermys.size();
						for (long pid : enermys) {
							PeronalBattleData battleData = playerDataMap.get(pid);
							if (battleData.getHp() == 0) {
								deadNum += 1;
							}
						}
						// LogTool.info("999999999 skillId="+skillId+", hid:" + hid + ", arr==" +
						// JSON.toJSONString(hpDataList), this);
						Set<Long> synHidSet = battleNewInfo.getSynHidSet();
						if (battleNewInfo.getSysType() == BattleSysType.ROUND_PVP) {
							for (Long sHid : synHidSet) {
								if (sHid != null) {
									BattleNewSender.sendCmd_3870(sHid, hpDataList.toArray());
								}
							}
						} else {
							BattleNewSender.sendCmd_3870(hid, hpDataList.toArray());
							for (Object obj : target) {
								if (obj == null) {
									continue;
								}
								long pid = (Long) obj;
								BattleNewSender.sendCmd_3870(pid, hpDataList.toArray());
							}
						}
						if (deadNum == size) {
							// 战斗结束处理
							battleEnd(campType, battleNewInfo);
						}
					} catch (Exception e) {
						LogTool.error(e, BattleNewManager.class, "BattleNewManager skillHit, hid=" + hid);
					}
				}

				@Override
				public Object getSession() {
					return battleUid;
				}
			});
		} catch (Exception e) {
			LogTool.error(e, BattleNewManager.class, hero.getId(), hero.getName(), "BattleNewManager skillHit");
		}
	}

	/**
	 * 战斗结束
	 * @param winCamp 胜利方阵营
	 * @param battleNewInfo
	 */
	public void battleEnd(int winCamp, BattleNewInfo battleNewInfo) {
		try {
			battleNewInfo.setWinCamp(winCamp);
			long battleUid = battleNewInfo.getBattleUid();
			int sysId = battleNewInfo.getSysId();
			BattleNewEvent battleNewEvent = BattleNewSysCache.battleNewEventMap.get(sysId);
			if (battleNewEvent.isNomalSendBack()) {
				int[][] rewardWin = battleNewEvent.battleCountWin(battleUid);
				List<Object[]> winList = new ArrayList<>();
				List<Object[]> loseList = new ArrayList<>();
				if (rewardWin != null) {
					for (int[] win : rewardWin) {
						winList.add(new Object[] { win[0], win[1], win[2], win[3] });
					}
				}
				int[][] rewardLose = battleNewEvent.battleCountLose(battleUid);
				if (rewardLose != null) {
					for (int[] lose : rewardLose) {
						loseList.add(new Object[] { lose[0], lose[1], lose[2], lose[3] });
					}
				}
				Map<Byte, Set<Long>> campMap = battleNewInfo.getCampMap();
				Iterator<Entry<Byte, Set<Long>>> iterator = campMap.entrySet().iterator();
				List<Object[]> sendList = null;
				for (; iterator.hasNext();) {
					Entry<Byte, Set<Long>> entry = iterator.next();
					Byte campType = entry.getKey();
					Set<Long> players = entry.getValue();
					int result = 0;
					sendList = loseList;
					if (campType == winCamp) {
						result = 1;
						sendList = winList;
					}
					for (long pid : players) {
						BattleNewSender.sendCmd_3868(pid, battleUid, result, battleNewInfo.getSysId(), sendList.toArray());
					}
				}
			}
			if (battleNewEvent != null) {
				try {
					battleNewEvent.battleEnd(battleNewInfo);
				} catch (Exception e) {
					LogTool.error(e, BattleNewManager.class, "BattleNewManager ,sysId=" + battleNewInfo.getSysId()
							+ ", attHid=" + battleNewInfo.getAttHid());
				}
			}

			// 移除战斗信息
			BattleNewSysCache.getBattleMap().remove(battleUid);
			Map<Long, PeronalBattleData> playerDataMap = battleNewInfo.getPlayerDataMap();
			ConcurrentHashMap<Long, Set<Long>> heroBuffMap = BattleNewSysCache.getHeroBuffMap();
			heroBuffMap.remove(battleUid);
			Iterator<Long> playerIterator = playerDataMap.keySet().iterator();
			ConcurrentHashMap<Long, Long> heroBattleMap = BattleNewSysCache.getHeroBattleMap();
			for (; playerIterator.hasNext();) {
				long hid = playerIterator.next();
				heroBattleMap.remove(hid);
			}
			if (battleNewEvent != null) {
				try {
					battleNewEvent.afterBattleEnd(battleNewInfo);
				} catch (Exception e) {
					LogTool.error(e, BattleNewManager.class, "BattleNewManager afterBattleEnd ,sysId="
							+ battleNewInfo.getSysId() + ", attHid=" + battleNewInfo.getAttHid());
				}
			}
		} catch (Exception e) {
			LogTool.error(e, BattleNewManager.class, "BattleNewManager battleEnd");
		}
	}

	/**
	 * 检测自身buff是否允许释放技能（如：被定身）
	 * 
	 * @param myBattleData
	 * @return
	 */
	public boolean checkBuffCanUseSkill(PeronalBattleData myBattleData) {
		Map<Integer, BuffInfo> buffMap = myBattleData.getBuffMap();
		Iterator<Entry<Integer, BuffInfo>> iterator = buffMap.entrySet().iterator();
		Entry<Integer, BuffInfo> entry = null;
		for (; iterator.hasNext();) {
			entry = iterator.next();
			int buffId = entry.getKey();
			Struct_buff_011 buff_011 = Config_buff_011.getIns().get(buffId);
			int[][] xiaoguo = buff_011.getXiaoguo();
			if (xiaoguo[0][0] == GameConst.BUFF_HOLD_PERSON) {// 定身
				return false;
			}
		}
		return true;
	}

	@SuppressWarnings("unused")
	public void skillDamageHandle(Hero hero, int skillId, Set<Long> enermys, BattleNewInfo battleNewInfo, PeronalBattleData myBattleData) {
		try {
			Map<Integer, SkillDamage> skillMap = myBattleData.getSkillMap();
			SkillDamage skillDamage = skillMap.get(skillId);

			Struct_skill_210 skill = Config_skill_210.getIns().get(skillId);
			int[][] buffArr = skill.getBuff();
			buffHandle(hero.getId(), buffArr, battleNewInfo, 0);
			BattleNewFunction function = BattleNewFunction.getIns();
			for (Long pid : enermys) {
				Hero enermy = HeroCache.getHero(pid);
				Map<Long, PeronalBattleData> playerDataMap = battleNewInfo.getPlayerDataMap();
				Map<Long, Long> damageMap = skillDamage.getDamageMap();
				if (skillId == 120006) {
					int hpHurt = hero.getFinalFightAttr().getHpHurt();
					double damage = hero.getFinalFightAttr().getHpMax() * hpHurt / 100000;
					FinalFightAttr enermyFightAttr = enermy.getFinalFightAttr();
					double hpMaxE = enermyFightAttr.getHpMax();
					double maxDamgPercent = Config_changshu_101.getIns().get(BattleNewConst.MAX_DAMAGE_LIMIT).getNum() / 100000;
					damage = Math.max(damage, hpMaxE * maxDamgPercent) * RandomUtil.getRandomNumInAreas(95, 105) / 100;
					damageMap.put(pid, (long)damage * -1);
				} else {
					// PeronalBattleData enermyBattleData = playerDataMap.get(pid);
					// // 神将技能buff触发检测
					// generalCheck(enermy, enermyBattleData, battleNewInfo);
					long damage = function.calculateDamage(hero, enermy, skillId, playerDataMap, skillDamage);
				}
				// long hp = battleData.getHp();
				// long leftHp = hp - damage;
				// if (leftHp <= 0) {
				// // 被攻击者死亡
				// leftHp = 0;
				// }
				// battleData.setHp(leftHp);
			}
		} catch (Exception e) {
			LogTool.error(e, BattleNewManager.class, hero.getId(), hero.getName(),
					"BattleNewManager skillDamageHandle");
		}
	}

	/**
	 * buff处理
	 * 
	 * @param hero
	 * @param buffArr
	 */
	public void buffHandle(long hid, int[][] buffArr, BattleNewInfo battleNewInfo, int lv) {
		if (buffArr == null) {
			return;
		}
		Map<Long, PeronalBattleData> playerDataMap = battleNewInfo.getPlayerDataMap();
		PeronalBattleData peronalBattleData = playerDataMap.get(hid);
		Map<Integer, BuffInfo> buffMap = peronalBattleData.getBuffMap();
		Map<Integer, Struct_buff_011> sysBuffMap = Config_buff_011.getIns().getMap();
		long currentTime = TimeDateUtil.getCurrentTimeInMillis();
		long battleUid = battleNewInfo.getBattleUid();
		if (buffMap.size() > 0) {
			Set<Long> pSet = BattleNewSysCache.getHeroBuffMap().get(battleUid);
			ConcurrentHashMap<Long, BattleNewInfo> battleMap = BattleNewSysCache.getBattleMap();
			BattleNewFunction.getIns().checkBuffHandle(battleUid, currentTime, pSet, battleMap, sysBuffMap);
		}
		ConcurrentHashMap<Long, Set<Long>> heroBuffMap = BattleNewSysCache.getHeroBuffMap();
		Map<Integer, Long> pubBuffCdMap = peronalBattleData.getPubBuffCdMap();
		for (Long cdTime : pubBuffCdMap.values()) {
			if (currentTime < cdTime) {
				return;
			}
		}
		for (int[] buff : buffArr) {
			int buffId = buff[1];
			BuffInfo buffInfo = buffMap.get(buffId);
			if (buffInfo != null && buffInfo.getCdEndTime() > currentTime) {
				continue;
			}
			Struct_buff_011 buff_011 = sysBuffMap.get(buffId);
			if (buff_011 == null) {
				continue;
			}
			int cf = buff_011.getCf();
			int cd = buff_011.getCd();
			int[][] xiaoguo = buff_011.getXiaoguo();// 效果
			int[][] cz = buff_011.getCz();// 效果成长
			int cz1 = buff_011.getCz1();// 概率成长
			int gl = buff_011.getGl();// 概率
			int shijian = buff_011.getShijian();// 持续时间
			int sjcz = buff_011.getSjcz();// 时间成长
			int totalShijian = shijian;
			if(lv>0) {
				totalShijian = shijian + sjcz * lv;
			}
			int buffPercent = gl;
			long cdEndTime = currentTime + cd;
			long effectEndTime = currentTime + totalShijian;
			// 触发类型
			if (cf == 1) {

			}
			if (lv > 0) {
				buffPercent = gl + cz1 * lv;
			}
			int random = RandomUtil.getRandomNumInAreas(1, 100000);
			if (random > buffPercent) {
				continue;
			}
			if (buff_011.getType() == 2) {// 复活
				if (buffMap.containsKey(buff_011.getID())) {
					continue;
				}
				if (lv > 0) {
					int[][] allcz = CommonUtil.copyArrayAndNum(cz, lv, 1);
					int[][] arrayPlusArrays = CommonUtil.arrayPlusArrays(xiaoguo, allcz);
					long hpMax = peronalBattleData.getAttr().getHpMax();
					long reliveHp = hpMax * arrayPlusArrays[0][1] / 100000;
					peronalBattleData.setHp(reliveHp);
				}
			}
			if (buff_011.getType() == 3) {// 沉默
				if (lv > 0) {
					int[][] allcz = CommonUtil.copyArrayAndNum(cz, lv, 1);
					effectEndTime = effectEndTime+xiaoguo[0][1]+allcz[0][1];
				}
				Set<Integer> oeebSet = peronalBattleData.getOnceEffectEnermyBuffSet();
				if (oeebSet.contains(buff_011.getID())) {
					continue;
				}
				oeebSet.add(buff_011.getID());
				int campType = peronalBattleData.getCampType();
				byte enermyCamp = 0;
				if (campType == BattleNewConst.CAMP_1) {
					enermyCamp = BattleNewConst.CAMP_2;
				} else {
					enermyCamp = BattleNewConst.CAMP_1;
				}
				Set<Long> enermys = battleNewInfo.getCampMap().get(enermyCamp);
				Iterator<Long> iterator = enermys.iterator();
				for (; iterator.hasNext();) {
					Long eid = iterator.next();
					if (eid != null) {
						PeronalBattleData enermyBattleData = playerDataMap.get(eid);
						if (enermyBattleData != null) {
							enermyBuff(battleNewInfo, enermyBattleData, buffId, cdEndTime, effectEndTime, battleUid,
									buff_011.getType());
						}
					}
				}
				return;
			}
			if (lv > 0) {
				if (buff_011.getType() == 1) {// 属性类型
					int[][] allcz = CommonUtil.copyArrayAndNum(cz, lv, 1);
					int[][] arrayPlusArrays = CommonUtil.arrayPlusArrays(xiaoguo, allcz);
					peronalBattleData.getBuffTempAttrMap().put(buffId, arrayPlusArrays);
				}
			}
			BuffInfo bInfo = new BuffInfo();
			bInfo.setBuffId(buffId);
			bInfo.setCdEndTime(cdEndTime);
			bInfo.setEffectEndTime(effectEndTime);
			buffMap.put(buffId, bInfo);
			Set<Long> pSet = heroBuffMap.get(battleUid);
			if (pSet == null) {
				pSet = new HashSet<>();
				heroBuffMap.put(battleUid, pSet);
			}
			pSet.add(hid);
			LogTool.info("getTempFinalFightAttr 55, totalShijian=" + totalShijian + ", shijian=" + shijian, this);
			List<Object[]> data = new ArrayList<>();
			data.add(new Object[] { buffId, BattleNewConst.BUFF_STATE_START });
			List<Object[]> buffData = new ArrayList<>();
			buffData.add(new Object[] { hid, data.toArray() });
			Iterator<Long> pIterator = battleNewInfo.getPlayerDataMap().keySet().iterator();
			for (; pIterator.hasNext();) {
				long pid = pIterator.next();
				LogTool.info("BattleNewSender.sendCmd_3866 99", this);
				BattleNewSender.sendCmd_3866(pid, buffData.toArray());
			}
			
//			BattleNewFunction.getIns().checkBuffHandle(battleUid, currentTime, pSet, BattleNewSysCache.getBattleMap(),
//					sysBuffMap);
//			int time = buff_011.getShijian() * 1000;
//			int effectId = xiaoguo[0][0];
//			int effectValue = xiaoguo[0][1];
//			switch (effectId) {
//			case GameConst.BUFF_CLOAKING:// 隐身（无敌）
//				buffMap.put(buffId, TimeDateUtil.getCurrentTimeInMillis());
//				break;
//			case GameConst.BUFF_HEALTH_REGENERATION:// 回血
//				long hp = peronalBattleData.getHp();
//				long hpMax = peronalBattleData.getAttr().getHpMax();
//				long addHp = hpMax * effectValue / 100;
//				hp += addHp;
//				damageMap.put(hid, addHp);
//				if (hp > hpMax) {
//					hp = hpMax;
//				}
//				buffMap.put(buffId, -1L);
//				break;
//			case GameConst.BUFF_ANGER_REGENERATION:// 回怒
//				buffMap.put(buffId, -1L);
//				break;
//			case GameConst.BUFF_HOLD_PERSON:// 定身
//
//				break;
//			case GameConst.BUFF_VAMP:// 吸血
//
//				break;
//			case GameConst.BUFF_DOUBLE_HIT:// 连击
//
//				break;
//
//			default:
//				break;
//			}
			// if (sendBuff > 0) {
			// Iterator<Long> iterator = playerDataMap.keySet().iterator();
			// for (; iterator.hasNext();) {
			// long pid = iterator.next();
			// BattleNewSender.sendCmd_3868(pid, id, buffId);
			// }
			// }
		}
	}

	public void enermyBuff(BattleNewInfo battleNewInfo, PeronalBattleData enermyBattleData, int buffId, long cdEndTime,
			long effectEndTime, long battleUid, int buffType) {
		long hid = enermyBattleData.getHid();
		try {
			BuffInfo bInfo = new BuffInfo();
			bInfo.setBuffId(buffId);
			bInfo.setCdEndTime(cdEndTime);
			bInfo.setEffectEndTime(effectEndTime);
			Map<Integer, BuffInfo> buffMap = enermyBattleData.getBuffMap();
			buffMap.put(buffId, bInfo);
			ConcurrentHashMap<Long, Set<Long>> heroBuffMap = BattleNewSysCache.getHeroBuffMap();
			Set<Long> pSet = heroBuffMap.get(battleUid);
			if (pSet == null) {
				pSet = new HashSet<>();
				heroBuffMap.put(battleUid, pSet);
			}
			pSet.add(hid);
			LogTool.info("enermyBuff getTempFinalFightAttr endTIme=" + effectEndTime + ", cdEndTime=" + cdEndTime+", hid="+hid, this);
			List<Object[]> data = new ArrayList<>();
			data.add(new Object[] { buffId, BattleNewConst.BUFF_STATE_START });
			List<Object[]> buffData = new ArrayList<>();
			buffData.add(new Object[] { hid, data.toArray() });
			if (buffType == 3) {
				BattleNewSender.sendCmd_3866(hid, buffData.toArray());
			} else {
				Iterator<Long> pIterator = battleNewInfo.getPlayerDataMap().keySet().iterator();
				for (; pIterator.hasNext();) {
					long pid = pIterator.next();
					LogTool.info("BattleNewSender.sendCmd_3866 99", this);
					BattleNewSender.sendCmd_3866(pid, buffData.toArray());
				}
			}
		} catch (Exception e) {
			LogTool.error(e, BattleNewManager.class, hid, "", "BattleNewManager enermyBuff");
		}
	}

	/**
	 * 使用宝物
	 */
	public void useTreasure(Hero hero, int tid) {
		try {
			long hid = hero.getId();
			ConcurrentHashMap<Long, Long> heroBattleMap = BattleNewSysCache.getHeroBattleMap();
			if (!heroBattleMap.containsKey(hid)) {
				return;
			}
		} catch (Exception e) {
			LogTool.error(e, BattleNewManager.class, hero.getId(), hero.getName(), "BattleNewManager useSkill");
		}
	}

	public void leave(Hero hero) {
		try {
			long hid = hero.getId();
			ConcurrentHashMap<Long, Long> heroBattleMap = BattleNewSysCache.getHeroBattleMap();
			if (!heroBattleMap.containsKey(hid)) {
				return;
			}
			long battleUid = heroBattleMap.get(hid);
			OpTaskExecutorService.PublicOrderService.execute(new BattleNewOpTaskRunnable() {

				@Override
				public void run() {
					BattleNewInfo battleNewInfo = BattleNewSysCache.getBattleMap().get(battleUid);
					Map<Long, PeronalBattleData> playerDataMap = battleNewInfo.getPlayerDataMap();
					PeronalBattleData myBattleData = playerDataMap.get(hid);
					int campType = myBattleData.getCampType();
					Iterator<Long> iterator = playerDataMap.keySet().iterator();
					for (; iterator.hasNext();) {
						Long pid = iterator.next();
						BattleNewSender.sendCmd_3872(pid, hid);
					}
					int winCamp = BattleNewConst.CAMP_1;
					if (campType == BattleNewConst.CAMP_1) {
						winCamp = BattleNewConst.CAMP_2;
					}
					battleEnd(winCamp, battleNewInfo);
				}

				@Override
				public Object getSession() {
					return battleUid;
				}
			});
		} catch (Exception e) {
			LogTool.error(e, BattleNewManager.class, hero.getId(), hero.getName(), "BattleNewManager leave");
		}
	}

	/**
	 * 测试战斗用
	 * 
	 * @param hero
	 * @param type
	 */
	public void testBattle(Hero hero, int type) {
		try {
			if (type == 1) {
				Hero enermy = null;
				Map<Long, Hero> heroMap = HeroCache.getHeroMap();
				for (Hero player : heroMap.values()) {
					if (player.getId() != hero.getId()) {
						enermy = player;
					}
				}
				BattleNewFunction.getIns().startPVPBattle(hero, enermy, SystemIdConst.SOLO_RUN, 1, 0, 0, 0, 0, 0);
			} else {
				List<Hero> members = new ArrayList<>();
				Map<Long, Hero> heroMap = HeroCache.getHeroMap();
				for (Hero player : heroMap.values()) {
					if (player.getId() != hero.getId()) {
						members.add(player);
					}
				}
				List<Long> enemyList = new ArrayList<>();
				BattleNewFunction.getIns().startPVEBattle(members, SystemIdConst.SOLO_RUN, enemyList, 2,
						BattleNewConst.HP_PERCENT, null, null, 0);
			}
		} catch (Exception e) {
			LogTool.error(e, BattleNewManager.class, "");
		}
	}

}
