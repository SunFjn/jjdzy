package com.teamtop.system.crossRebornFB;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.CrossEnum;
import com.teamtop.cross.CrossZone;
import com.teamtop.gameCommon.GameConst;
import com.teamtop.netty.server.server2.Client_2;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.battle.BattleConst;
import com.teamtop.system.battle.BattleFunction;
import com.teamtop.system.battleNew.BuffConst;
import com.teamtop.system.battleNew.BuffFunction;
import com.teamtop.system.boss.qmboss.QMBossFunction;
import com.teamtop.system.crossRebornFB.model.BatterInfo;
import com.teamtop.system.crossRebornFB.model.RebornFBBoss;
import com.teamtop.system.crossRebornFB.model.RebornFBLocal;
import com.teamtop.system.crossRebornFB.model.RebornFBRankModel;
import com.teamtop.system.crossTeamFuBen.CrossTeamFuBenConst;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalSender;
import com.teamtop.system.hero.FightAttr;
import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.system.team.TeamCache;
import com.teamtop.system.team.model.Team;
import com.teamtop.system.team.model.TeamMember;
import com.teamtop.system.zhenYan.ZhenYanFunction;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventUtil;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.excel.ExcelJsonUtils;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_lhfb_337;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_lhfb_337;
import io.netty.channel.Channel;

public class RebornFBFunction {
	private static RebornFBFunction ins;

	public static synchronized RebornFBFunction getIns() {
		if (ins == null) {
			ins = new RebornFBFunction();
		}
		return ins;
	}

	/**
	 * ?????????????????????
	 * 
	 * @param local
	 */
	public void initBatterInfo(RebornFBLocal local, boolean isStar) {
		Map<Integer, BatterInfo> map = local.getBatterInfoMap();
		if (map == null) {
			map = new HashMap<>();
		}
		Map<Integer, Integer> starMap = new HashMap<>();
		if (!isStar) {
			for (int k : map.keySet()) {
				BatterInfo info = map.get(k);
				starMap.put(k, info.getStar());
			}
		}
		map.clear();
		Map<Integer, ProbabilityEventModel> initFBMap = RebornFBCache.getInitFBMap();
		int maxLevel = initFBMap.size();
		for (int level = 1; level <= maxLevel; level++) {
			if (map.containsKey(level)) {
				continue;
			}
			// ???????????????
			ProbabilityEventModel model = initFBMap.get(level);
			int star = (int) ProbabilityEventUtil.getEventByProbability(model) % 10;
			BatterInfo info = new BatterInfo();
			info.setLevel(level);
			if (!isStar) {
				Integer bStar = starMap.get(level);
				if (bStar != null) {
					star = bStar;
				}
			}
			info.setStar(star);
			info.setTimes(0);
			info.setYz(0);
			map.put(level, info);
		}
		local.setBatterInfoMap(map);
	}

	/**
	 * ??????????????????[L:??????idI:??????I:?????????U:????????????I:??????L:??????]
	 * 
	 * @param team
	 * @return
	 */
	public List<Object[]> getTeamInfo(Team team) {
		List<Object[]> list = new ArrayList<>();
		for (TeamMember temp : team.getMembers().values()) {
			Hero hero = HeroCache.getHero(temp.getHid());
			if (hero != null) {
				list.add(new Object[] { hero.getId(), hero.getIcon(), hero.getFrame(), hero.getNameZoneid(),
						hero.getLevel(), hero.getTotalStrength(), hero.getReincarnationLevel() });
			} else {
				// ????????????????????????
			}
		}

		return list;
	}

	/**
	 * ???????????????????????????
	 * 
	 * @return ?????????????????????????????????ID
	 */
	public List<Long> leaveAndModifyTeamData(long hid) {
		List<Long> reflashHero = new ArrayList<Long>();
		Integer teamIDInt = TeamCache.getHidToTeamIDMap().get(hid);
		if (teamIDInt == null) {
			// ???????????????
			return reflashHero;
		}
		Team team = TeamCache.getTeamMap().get(teamIDInt);
		if (team == null) {
			// ??????????????????
			return reflashHero;
		}
		long leader = team.getLeader();
		if (hid == leader) {
			// ??????????????????
			Map<Long, TeamMember> members = team.getMembers();
			Iterator<Long> iterator = members.keySet().iterator();
			while (iterator.hasNext()) {
				long hidTemp = iterator.next();
				TeamCache.removeHidToTeamIDMap(hidTemp);
			}
			TeamCache.removeTeamMap(teamIDInt);
		} else {
			// ????????????????????????
			Map<Long, TeamMember> members = team.getMembers();
			members.remove(hid);
			TeamCache.removeHidToTeamIDMap(hid);

			Iterator<Long> iterator = members.keySet().iterator();
			while (iterator.hasNext()) {
				long hidTemp = iterator.next();
				boolean online = HeroFunction.getIns().isOnline(hidTemp);
				if (online) {
					reflashHero.add(hidTemp);
				}
			}
		}
		return reflashHero;
	}

	/**
	 * ???????????????????????????????????????????????????
	 */
	public void sendMyTeamBattleData(Map<Long, TeamMember> members) {
		for (TeamMember temp : members.values()) {
			long hidTemp = temp.getHid();
			boolean online = HeroFunction.getIns().isOnline(hidTemp);
			if (!online)
				continue;
			Hero heroTemp = HeroCache.getHero(hidTemp);
			if (heroTemp == null)
				continue;
			for (TeamMember temp2 : members.values()) {
				long hidTemp2 = temp2.getHid();
				if (hidTemp == hidTemp2)
					continue;
				HeroFunction.getIns().sendBattleHeroAttr(heroTemp, hidTemp2);
			}
		}
	}

	/**
	 * ????????????????????????????????????
	 */
	public void initMembersBattleData(Map<Long, TeamMember> members, RebornFBBoss boss) {
		List<RebornFBRankModel> rankList = boss.getRankList();
		long timeNow = TimeDateUtil.getCurrentTimeInMillis();
		for (TeamMember member : members.values()) {
			Hero hero = HeroCache.getHero(member.getHid());
			if (hero == null)
				continue;
			RebornFBRankModel model = new RebornFBRankModel();
			model.setHid(hero.getId());
			if (!rankList.contains(model)) {
				model.setName(hero.getName());
				rankList.add(model);
			} else {
				model = rankList.get(rankList.indexOf(model));
			}
			FinalFightAttr fightAttr = BattleFunction.initHero(hero);
			model.setAttrmap(fightAttr);
			model.fullHp();
			// ???3?????????
			model.setInvincibleTime(timeNow + BattleConst.ATT_WUDI_BEGIN_CONST * 1000);
		}
	}

	/**
	 * ??????????????????boss
	 */
	public void scheduleTeamAttBoss(RebornFBBoss boss, int teamID) {
		try {
			List<RebornFBRankModel> rank = boss.getRankList();
			if (rank.size() < 0 || boss.getHp() <= 0) {
				// ??????boss
				RebornFBCache.removeBossMap(teamID);
				return;
			}
			Team team = TeamCache.getTeamById(teamID);
			if (team == null) {
				LogTool.warn("scheduleAttQmBoss.team is null.teamID:" + teamID, this);
				RebornFBCache.removeBossMap(teamID);
				return;
			}
			long timeNow = TimeDateUtil.getCurrentTimeInMillis();
			long invincibleTime = boss.getInvincibleTime();
			if (invincibleTime > timeNow) {
				// System.out.println("??????Boss??????");
				return;
			}

			List<Object[]> hurtList = new ArrayList<Object[]>();
			FinalFightAttr attrBoss = boss.getAttr();
			Map<Long, TeamMember> members = team.getMembers();
			for (RebornFBRankModel model : rank) {
				int death = model.getDeath();
				if (death == 0) {
					FinalFightAttr attMember = model.getAttrmap();
					// buff????????????
					TeamMember teamMember = members.get(model.getHid());
					int[][] tempAttr = BuffFunction.getIns().getBuffTempAttr(teamMember);
					Hero hero = HeroCache.getHero(model.getHid());
					FightAttr fightAttr = null;
					if (hero != null) {
						fightAttr = hero.getFightAttr();
					}
					long hurt = (long) Math.max(BattleFunction.calcDamg(attMember, attrBoss, tempAttr, fightAttr), 1);
					// LogTool.info("hero hit qmboss id:"+qmboss.getBossId()+"
					// damg:"+damg+",hurt:"+hurt+",hid:"+hero.getId()+",name:"+hero.getName(),this);
					double curhp = boss.getHp();
					curhp = Math.max(0, curhp - hurt);
					boss.setHp(curhp);
					// LogTool.info("?????????boss???bossID:"+boss.getBossId()+" hurt:"+hurt+"
					// hpNow:"+curhp,this);
					model.setHurt(model.getHurt() + hurt);
					hurtList.add(new Object[] { model.getName(), model.getHurt() });

					if (curhp <= 0) {
						break;
					}
				}
			}
			// ??????????????????????????????????????????
			sendAwards(boss, hurtList, team);
			// System.out.println("??????????????????????????????,TeamAttBoss TeamID:"+teamID+"
			// bossHp:"+boss.getHp());//TODO
		} catch (Exception e) {
			LogTool.error(e, RebornFBFunction.class, "scheduleAttQmBoss has wrong");
		}
	}

	/**
	 * ????????????boss??????
	 */
	public void scheduleBossAttTeam(RebornFBBoss boss, int teamID) {
		try {
			List<RebornFBRankModel> rank = boss.getRankList();
			if (rank.size() < 0 || boss.getHp() <= 0) {
				// ??????boss
				RebornFBCache.removeBossMap(teamID);
				return;
			}
			Team team = TeamCache.getTeamById(teamID);
			if (team == null) {
				LogTool.warn("scheduleBossAttTeam.team is null.teamID:" + teamID, this);
				RebornFBCache.removeBossMap(teamID);
				return;
			}

			boolean allDeath = true;
			List<Object[]> hurtList = new ArrayList<Object[]>();
			FinalFightAttr attrBoss = boss.getAttr();
			long timeNow = TimeDateUtil.getCurrentTimeInMillis();
			// ??????buff
			BuffFunction.getIns().checkBuffHandle(timeNow, team);
			for (RebornFBRankModel model : rank) {
				int death = model.getDeath();
				if (death == CrossTeamFuBenConst.DEATH_NO) {
					allDeath = false;
					long invincibleTime = model.getInvincibleTime();
					if (invincibleTime > timeNow) {
						continue;
					}
				}

				if (death == CrossTeamFuBenConst.DEATH_NO) {
					FinalFightAttr attrMember = model.getAttrmap();
					long hurt = (long) Math.max(BattleFunction.calcDamg(attrBoss, attrMember), 1);
					double curhp = attrMember.getHp();
					curhp = Math.max(0, curhp - hurt);
					attrMember.setHp((long) curhp);
					if (curhp <= 0) {
						int buffId = BuffConst.RELIVE_BUFF;
						TeamMember member = team.getMembers().get(model.getHid());
						Hero hero = HeroCache.getHero(model.getHid());
						int lv = 0;
						if (hero != null) {
							lv = ZhenYanFunction.getIns().getZhenXinLevel(hero);
						}
						if (lv > 0) {
							// ????????????
							BuffFunction.getIns().buffEffectHandle(buffId, lv, attrMember, member);
							curhp = attrMember.getHp();
						}
						if (curhp <= 0) {
							model.setDeath(CrossTeamFuBenConst.DEATH_YES);
							// ????????????????????????
							death(teamID, model.getHid(), 0);
						}
					}
					hurtList.add(new Object[] { model.getHid(), attrMember.getHp() });
				}
				death = model.getDeath();
				if (death == CrossTeamFuBenConst.DEATH_NO)
					allDeath = false;
			}
			// ????????????
			Map<Long, TeamMember> members = team.getMembers();
			for (TeamMember member : members.values()) {
				long hid = member.getHid();
				RebornFBSender.sendCmd_11890(hid, hurtList.toArray());
				if (allDeath) {
					GlobalSender.sendCmd_262(member.getHid(), 2, new Object[] {});
				}
			}
			// ????????????
			if (allDeath) {
				RebornFBCache.removeBossMap(teamID);
			}
		} catch (Exception e) {
			LogTool.error(e, QMBossFunction.class, "scheduleAttQmBoss has wrong");
		}
	}

	/**
	 * ????????????????????????????????????
	 * 
	 * @param teamID
	 * @param hid
	 * @param robotID
	 * @param noShowUIHid
	 *            ??????????????????????????????ID(????????????)
	 */
	public void death(int teamID, long hid, long noShowUIHid) {
		if (!CrossZone.isCrossServer()) {
			return;
		}
		Team team = TeamCache.getTeamById(teamID);
		if (team == null) {
			LogTool.warn("death.team is null.hid:" + hid, this);
			return;
		}
		RebornFBBoss boss = RebornFBCache.getBossMap().get(teamID);
		if (boss == null) {
			LogTool.warn("death.boss is null.hid:" + hid, this);
			return;
		}

		long deathID = 0;// ?????????ID
		List<RebornFBRankModel> rankList = boss.getRankList();
		for (RebornFBRankModel model : rankList) {
			long hidTemp = model.getHid();
			if (hid != 0 && hid == hidTemp) {
				model.setDeath(1);
				deathID = hid;
				break;
			}
		}
		Map<Long, TeamMember> members = team.getMembers();
		for (TeamMember member : members.values()) {
			RebornFBSender.sendCmd_11886(member.getHid(), deathID);
		}
	}

	/**
	 * ??????????????????????????????????????????
	 */
	public void sendAwards(RebornFBBoss boss, List<Object[]> hurtList, Team team) {
		int excelID = team.getIdRoom();
		List<RebornFBRankModel> rank = boss.getRankList();
		Map<Long, TeamMember> members = team.getMembers();

		// ?????????????????????????????????????????????
		for (RebornFBRankModel model : rank) {
			long hid = model.getHid();
			Hero hero = HeroCache.getHero(hid);
			if (hero == null)
				continue;
			RebornFBLocal crossTeamFuBen = hero.getRebornFBLocal();
			if (crossTeamFuBen == null) {
				continue;
			}
		}

		for (RebornFBRankModel model : rank) {
			long hid = model.getHid();
			Hero hero = HeroCache.getHero(hid);
			if (hero == null)
				continue;
			if (!members.containsKey(hid))
				continue;
			RebornFBSender.sendCmd_11884(hid, (long) boss.getHpmax(), (long) boss.getHp(), model.getHurt(),
					hurtList.toArray());

			// boss?????????
			if (boss.getHp() <= 0) {
				// ???????????? 262??????
				List<Object[]> dropTips = new ArrayList<Object[]>();
				// ????????????
				List<int[]> dropArr = new ArrayList<int[]>();
				// ????????????
				if (hid == team.getLeader()) {
					// ????????????????????????
					int maxTimes = Config_xtcs_004.getIns().get(RebornFBConst.CONST_8231).getNum();
					if (hero.getRebornFBLocal().getBatterInfoMap().get(excelID / 1000).getTimes() < maxTimes) {
						int now = hero.getRebornFBLocal().getBatterInfoMap().get(excelID / 1000).getTimes();
						hero.getRebornFBLocal().getBatterInfoMap().get(excelID / 1000).setTimes(now + 1);
						List<ProbabilityEventModel> pelist = RebornFBCache.getCommonAwardsMap().get(excelID);
						if (pelist == null) {
							List<Struct_lhfb_337> excelList = Config_lhfb_337.getIns().getSortList();
							for (Struct_lhfb_337 excel : excelList) {
								if (excelID == excel.getId()) {
									pelist = ExcelJsonUtils.getGeneralDropData(excel.getDiaoluo());
								}
							}
						}

						// ????????????
						ProbabilityEventModel m = new ProbabilityEventModel();
						for (Struct_lhfb_337 c : Config_lhfb_337.getIns().getSortList()) {
							if (c.getId() / 1000 == excelID / 1000) {
								m.addProbabilityEvent(c.getCs(), c.getId());
							}
						}
						int star = (int) ProbabilityEventUtil.getEventByProbability(m) % 10;
						hero.getRebornFBLocal().getBatterInfoMap().get(excelID / 1000).setStar(star);

						// ????????????????????????
						team.setIdRoom(excelID / 1000 * 1000 + star);
						List<Object[]> teamInfo = RebornFBFunction.getIns().getTeamInfo(team);
						RebornFBSender.sendCmd_11866(hero.getId(), 4, team.getLeader(), team.getId(),
								team.getIdRoom() / 1000, team.getIdRoom() % 10, teamInfo.toArray());

						int size = pelist.size();
						for (int a = 0; a < size; a++) {
							ProbabilityEventModel pe = pelist.get(a);
							int[] js = (int[]) ProbabilityEventUtil.getEventByProbability(pe);
							if (js != null) {
								int type = js[0];
								if (type == GameConst.GENDROP) {
									int num = js[2];
									ProbabilityEventModel droppe = HeroCache.getDrop(js[1]);
									for (int j = 1; j <= num; j++) {
										js = (int[]) ProbabilityEventUtil.getEventByProbability(droppe);
										dropArr.add(js);
										dropTips.add(new Object[] { js[0], js[1], js[2], GlobalConst.YTPE_0_WAI });
									}
								} else {
									dropArr.add(js);
									dropTips.add(new Object[] { js[0], js[1], js[2], GlobalConst.YTPE_0_WAI });
								}
							}
						}
					}
				} else {
					// ????????????????????????
					int maxTimes2 = Config_xtcs_004.getIns().get(RebornFBConst.CONST_8232).getNum();
					if (hero.getRebornFBLocal().getHelpNum() < maxTimes2) {
						hero.getRebornFBLocal().setHelpNum(hero.getRebornFBLocal().getHelpNum() + 1);
						int[][] js = Config_xtcs_004.getIns().get(RebornFBConst.CONST_8233).getOther();
						for (int[] j : js) {
							dropArr.add(j);
							dropTips.add(new Object[] { j[0], j[1], j[2], GlobalConst.YTPE_0_WAI });
						}
					}
				}
				int[][] drops = new int[dropArr.size()][];
				dropArr.toArray(drops);
				// ?????????????????????
				RebornFBFunction.getIns().saveBattleDataCL(hero, hero.getRebornFBLocal(), drops, dropTips);
			}
		}

		if (boss.getHp() <= 0) {
			RebornFBCache.removeBossMap(team.getId());
			// ??????????????????
			for (RebornFBRankModel model : rank) {
				long hid = model.getHid();
				if (hid != team.getLeader()) {
					Hero hero = HeroCache.getHero(hid);
					if (hero == null)
						continue;
					RebornFBManager.getIns().exitTeam(hero);
				}
			}
		}
	}

	/**
	 * ????????????
	 * 
	 * @param hero
	 */
	public void updateRedPoint(Hero hero) {
		try {
			if (hero == null) {
				return;
			}
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.REBORN_FB)) {
				return;
			}
			boolean[] redPoint = checkRedPoint(hero);
			boolean hadRed = redPoint[1];
			if (hadRed) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.REBORN_FB, 1, RedPointConst.HAS_RED);
			} else {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.REBORN_FB, 1, RedPointConst.NO_RED);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * ????????????
	 * 
	 * @param hero
	 * @return
	 */
	public boolean[] checkRedPoint(Hero hero) {
		boolean[] hadRedPoint = new boolean[2];
		hadRedPoint[0] = false;
		hadRedPoint[1] = false;
		try {
			if (hero == null) {
				return hadRedPoint;
			}
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.REBORN_FB)) {
				return hadRedPoint;
			}
			RebornFBLocal local = hero.getRebornFBLocal();
			int maxTimes = Config_xtcs_004.getIns().get(RebornFBConst.CONST_8231).getNum();
			for (BatterInfo info : local.getBatterInfoMap().values()) {
				if (hero.getReincarnationLevel() < info.getLevel()) {
					continue;
				}
				if (info.getTimes() < maxTimes) {
					hadRedPoint[1] = true;
					break;
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return hadRedPoint;
	}

	/**
	 * ???????????????????????? ?????????????????????
	 */
	public void saveBattleDataLC(Hero hero) {
		long hid = hero.getId();
		CrossData crossData = new CrossData();
		crossData.putObject(CrossEnum.hid, hid);
		crossData.putObject(CrossEnum.data1, hero.getRebornFBLocal());
		Channel channel = Client_2.getIns().getCrossChannel();
		NettyWrite.writeXData(channel, CrossConst.CROSS_REBORN_FB_ZERO, crossData);
	}

	/**
	 * ???????????????????????? ?????????????????????
	 */
	public void saveBattleDataCL(Hero hero, RebornFBLocal local, int[][] drops, List<Object[]> dropTips) {
		long hid = hero.getId();
		int zid = CommonUtil.getZoneIdById(hid);
		Channel channel = CrossCache.getChannel(zid);
		CrossData crossData = new CrossData();
		crossData.putObject(CrossEnum.hid, hid);
		crossData.putObject(CrossEnum.data1, local);
		if (drops != null) {
			crossData.putObject(CrossEnum.data2, drops);
			crossData.putObject(CrossEnum.data3, dropTips);
		}
		NettyWrite.writeXData(channel, CrossConst.CROSS_REBORN_FB_END, crossData);
	}

	/**
	 * ??????????????????
	 */
	public void skillAttBoss(double damg, Hero hero) {
		if (!CrossZone.isCrossServer()) {
			return;
		}

		Integer teamID = TeamCache.getHidToTeamIDMap().get(hero.getId());
		if (teamID == null) {
			// ???????????????
			LogTool.warn("skillAttBoss.teamID is null.hid:" + hero.getId(), this);
			return;
		}
		Team team = TeamCache.getTeamById(teamID);
		if (team == null) {
			LogTool.warn("skillAttBoss.team is null.hid:" + hero.getId(), this);
			return;
		}

		RebornFBBoss boss = RebornFBCache.getBossMap().get(teamID);
		if (boss == null) {
			LogTool.warn("skillAttBoss.boss is null.hid:" + hero.getId(), this);
			return;
		}
		long curhp = (long) boss.getHp();
		if (curhp <= 0) {
			LogTool.warn("skillAttBoss.boss is death.hid:" + hero.getId(), this);
			return;
		}
		curhp = Math.max(0, curhp - (long) damg);
		boss.setHp(curhp);

		List<Object[]> hurtList = new ArrayList<Object[]>();
		List<RebornFBRankModel> rankList = boss.getRankList();
		for (RebornFBRankModel model : rankList) {
			long hidTemp = model.getHid();
			if (hidTemp == hero.getId()) {
				model.setHurt((long) (model.getHurt() + damg));
				hurtList.add(new Object[] { model.getName(), model.getHurt() });
				// ????????????????????????????????????????????????????????????
				long timeNow = TimeDateUtil.getCurrentTimeInMillis();
				model.setInvincibleTime(timeNow + BattleConst.ATT_WUDI_CONST * 1000);
				break;
			}
		}

		RebornFBFunction.getIns().sendAwards(boss, hurtList, team);
	}

	/**
	 * ???????????????
	 * 
	 * @param hero
	 * @param id
	 * @param num
	 * @return
	 */
	public boolean addNum(Hero hero, int id, int num) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.REBORN_FB)) {
				return false;
			}
			RebornFBLocal local = hero.getRebornFBLocal();
			if (id == GameConst.TYPE_REBORN_FB_HELP_NUM) {
				local.setHelpNum(local.getHelpNum() - num);
			} else {
				for (BatterInfo info : local.getBatterInfoMap().values()) {
					info.setTimes(info.getTimes() - num);
				}
			}

			return true;
		} catch (Exception e) {
			LogTool.error(e, RebornFBFunction.class, hero.getId(), hero.getName(), "RebornFBFunction addNum");
		}
		return false;
	}

}
