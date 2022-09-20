package com.teamtop.system.threeHeroFightLvBu;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.battle.BattleConst;
import com.teamtop.system.battle.BattleFunction;
import com.teamtop.system.battleNew.BuffConst;
import com.teamtop.system.battleNew.BuffFunction;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.FightAttr;
import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.qice.QiCeConst;
import com.teamtop.system.qice.model.QiCe;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.system.scene.SceneCache;
import com.teamtop.system.scene.SceneFunction;
import com.teamtop.system.skill.SkillConst;
import com.teamtop.system.skill.model.SkillInfo;
import com.teamtop.system.team.TeamCache;
import com.teamtop.system.team.TeamFunction;
import com.teamtop.system.team.model.Team;
import com.teamtop.system.team.model.TeamMember;
import com.teamtop.system.threeHeroFightLvBu.model.PersonalChaInfo;
import com.teamtop.system.threeHeroFightLvBu.model.TeamChaInfo;
import com.teamtop.system.threeHeroFightLvBu.model.ThreeHeroFightLvBu;
import com.teamtop.system.threeHeroFightLvBu.model.ThreeHeroFightLvBuBoss;
import com.teamtop.system.zhenYan.ZhenYanFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_buff_011;
import excel.config.Config_map_200;
import excel.config.Config_skill_210;
import excel.config.Config_syzlb_762;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_buff_011;
import excel.struct.Struct_skill_210;
import excel.struct.Struct_syzlb_762;

public class ThreeHeroFightLvBuFunction {

	private static ThreeHeroFightLvBuFunction ins;

	private ThreeHeroFightLvBuFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized ThreeHeroFightLvBuFunction getIns() {
		if (ins == null) {
			ins = new ThreeHeroFightLvBuFunction();
		}
		return ins;
	}

	public void leaveHandle(int teamId, Hero hero) {
		try {

		} catch (Exception e) {
			LogTool.error(e, ThreeHeroFightLvBuFunction.class, hero.getId(), hero.getName(),
					"ThreeHeroFightLvBuFunction leaveHandle");
		}
	}
	
	/**
	 * 定时检查人打boss
	 */
	public void scheduleTeamAttBoss(ThreeHeroFightLvBuBoss boss, int teamId) {
		try {
			if (boss.getHp() <= 0) {
				//结算boss
				return;
			}
			Team team = TeamCache.getTeamById(teamId);
			if( team==null){
				LogTool.warn("ThreeHeroFightLvBu.team is null.teamID:" + teamId, this);
				TeamChaInfo teamChaInfo = ThreeHeroFightLvBuSysCache.getTeamChaMap().get(teamId);
				eixtAndRemoveAllCache(teamId, teamChaInfo);
				Integer selectType = ThreeHeroFightLvBuSysCache.getTeamHardMap().remove(teamId);
				if (selectType != null) {
					ThreeHeroFightLvBuSysCache.getHardTeamMap().get(selectType).remove(teamId);
				}
				return;
			}
			long timeNow = TimeDateUtil.getCurrentTimeInMillis();
			long invincibleTime = boss.getInvincibleTime();
			if( invincibleTime> timeNow) {
				return;
			}
//			OpTaskExecutorService.PublicOrderService.execute(new RankingOpTaskRunnable() {
//				@Override
//				public void run() {
//					try {					
						handlePVB(teamId);
//					} catch (Exception e) {
//						LogTool.error(e, ThreeHeroFightLvBuFunction.class, 0, "定时器触发", "");
//					}
//				}
//				@Override
//				public Object getSession() {
//					return OpTaskConst.LIUCHUQISHAN;
//				}
//			});
		} catch (Exception e) {
			LogTool.error(e, ThreeHeroFightLvBuFunction.class, "ThreeHeroFightLvBuFunction scheduleTeamAttBoss");
		}
	}
	
	public void handlePVB(int teamId) {
		try {
			TeamChaInfo teamChaInfo = ThreeHeroFightLvBuSysCache.getTeamChaMap().get(teamId);
			ThreeHeroFightLvBuBoss boss = teamChaInfo.getBoss();
			FinalFightAttr attrBoss = boss.getAttr();
			ConcurrentHashMap<Long, PersonalChaInfo> memberChaMap = teamChaInfo.getMemberChaMap();
			Iterator<Long> iterator = memberChaMap.keySet().iterator();
			long killer = 0L;
			Team team = TeamCache.getTeamById(teamId);
			Map<Long, TeamMember> members = team.getMembers();
			for(;iterator.hasNext();) {
				Long pid = iterator.next();
				PersonalChaInfo personalChaInfo = memberChaMap.get(pid);
				if (personalChaInfo.getHp() <= 0) {
					continue;
				}
				FinalFightAttr pAttr = personalChaInfo.getAttr();
				TeamMember teamMember = members.get(pid);
				if (teamMember == null) {
					continue;
				}
				int[][] tempAttr = BuffFunction.getIns().getBuffTempAttr(teamMember);
				Hero hero = HeroCache.getHero(pid);
				FightAttr fightAttr = null;
				if (hero != null) {
					fightAttr = hero.getFightAttr();
				}
				long hurt = (long) Math.max(BattleFunction.calcDamg(pAttr, attrBoss, tempAttr, fightAttr), 1);
				boss.addHp(-1 * hurt);
				double curhp = boss.getHp();
				if (curhp <= 0) {
					killer = pid;
					break;
				}
			}
			double curhp = boss.getHp();
			long sendHp = (long) curhp;
			if (curhp <= 0) {
				killBossHandle(killer, teamChaInfo);
				sendHp = 0;
			}
			for (long hid : memberChaMap.keySet()) {
				ThreeHeroFightLvBuSender.sendCmd_9802(hid, sendHp);
			}
		} catch (Exception e) {
			LogTool.error(e, ThreeHeroFightLvBuFunction.class, "ThreeHeroFightLvBuFunction handlePVB");
		}
	}
	
	/**
	 * 定时检查boss打人
	 */
	public void scheduleBossAttTeam(ThreeHeroFightLvBuBoss boss, int teamId) {
		try {
			if (boss.getHp() <= 0) {
				//结算boss
				return;
			}
			Team team = TeamCache.getTeamById(teamId);
			if( team==null){
				LogTool.warn("ThreeHeroFightLvBuFunction.scheduleBossAttTeam.team is null.teamID:" + teamId, this);
				TeamChaInfo teamChaInfo = ThreeHeroFightLvBuSysCache.getTeamChaMap().get(teamId);
				eixtAndRemoveAllCache(teamId, teamChaInfo);
				Integer selectType = ThreeHeroFightLvBuSysCache.getTeamHardMap().remove(teamId);
				if (selectType != null) {
					ThreeHeroFightLvBuSysCache.getHardTeamMap().get(selectType).remove(teamId);
				}
				return;
			}
			boolean allDeath = true;
			boolean needSend = false;
			FinalFightAttr attrBoss = boss.getAttr();
			long timeNow = TimeDateUtil.getCurrentTimeInMillis();
			// 检测buff
			BuffFunction.getIns().checkBuffHandle(timeNow, team);
			TeamChaInfo teamChaInfo = ThreeHeroFightLvBuSysCache.getTeamChaMap().get(teamId);
			Map<Long, TeamMember> members = team.getMembers();
			ConcurrentHashMap<Long, PersonalChaInfo> memberChaMap = teamChaInfo.getMemberChaMap();
			Iterator<Long> iterator = memberChaMap.keySet().iterator();
			List<Object[]> hpData = new ArrayList<>();
			for (; iterator.hasNext();) {
				Long pid = iterator.next();
				PersonalChaInfo personalChaInfo = memberChaMap.get(pid);
				double hp = personalChaInfo.getHp();
				if (hp > 0) {
					needSend = true;
					long invincibleTime = personalChaInfo.getInvincibleTime();
					if( invincibleTime> timeNow) {
						allDeath = false;
						continue;
					}
					FinalFightAttr memberAttr = personalChaInfo.getAttr();
					long hurt = (long) Math.max(BattleFunction.calcDamg(attrBoss, memberAttr), 1);
					long cutDownTime = personalChaInfo.getCutDownTime();// 新增减伤结束时间
					if (cutDownTime > timeNow) {
						// 爆气减伤存在
						Hero hero = HeroCache.getHero(pid);
						if (hero != null) {
							QiCe qiCe = hero.getQiCe();
							if (qiCe != null) {
								int taozhuangLv = qiCe.getTaozhuangLv();// 套装等级
								Struct_buff_011 struct_buff_011 = Config_buff_011.getIns().get(QiCeConst.index);
								int cundown = struct_buff_011.getXiaoguo()[0][1];// buff基础效果
								int cz = struct_buff_011.getCz()[0][1];// 效果成长
								hurt = Math.max(1, hurt * (100000 - (cundown + cz * taozhuangLv)) / 100000);								
							}
						}
					}
					personalChaInfo.addHp(-1 * hurt);
					long nowHp = personalChaInfo.getHp();
					
					if (nowHp <= 0) {
						// 通知前端有人死亡
						// members = team.getMembers();
						// 复活效果
						int buffId = BuffConst.RELIVE_BUFF;
						TeamMember deadMember = team.getMembers().get(pid);
						Hero hero = HeroCache.getHero(pid);
						int lv = 0;
						if (hero != null) {
							lv = ZhenYanFunction.getIns().getZhenXinLevel(hero);
						}
						if (lv > 0) {
							memberAttr.setHp(0);
							BuffFunction.getIns().buffEffectHandle(buffId, lv, memberAttr, deadMember);
							nowHp = memberAttr.getHp();
						}
						if (nowHp <= 0) {
							for (TeamMember member : members.values()) {
								long hid = member.getHid();
								ThreeHeroFightLvBuSender.sendCmd_9796(hid, pid);
							}
						} else {
							personalChaInfo.setHp(nowHp);
							hpData.add(new Object[] { pid, nowHp });
						}
					} else {
						hpData.add(new Object[] { pid, nowHp });
					}
				}

				long nowHp = personalChaInfo.getHp();
				if (nowHp > 0) {					
					allDeath = false;
				}
			}
			//刷新前端
			int reliveNum = teamChaInfo.getReliveNum();
			int maxReliveNum = Config_xtcs_004.getIns().get(ThreeHeroFightLvBuConst.RELIVE_NUM_ID).getNum();
			int leftNum = maxReliveNum - reliveNum;
			if (leftNum < 0) {
				leftNum = 0;
			}
			for(TeamMember member:members.values()) {
				long hid = member.getHid();
				ThreeHeroFightLvBuSender.sendCmd_9800(hid, hpData.toArray());
				if (allDeath && needSend) {
					// 通知复活
					ThreeHeroFightLvBuSender.sendCmd_9798(hid, leftNum);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, ThreeHeroFightLvBuFunction.class, "ThreeHeroFightLvBuFunction scheduleBossAttTeam");
		}
	}

	/**
	 * 击杀boss处理
	 * @param killer
	 * @param teamChaInfo
	 */
	public void killBossHandle(long killer, TeamChaInfo teamChaInfo) {
		try {
			int teamId = teamChaInfo.getTeamId();
			// 移除战斗检测
			ConcurrentHashMap<Integer, Integer> fightingMap = ThreeHeroFightLvBuSysCache.getFightingMap();
			// 移除npc
			long npcUid = teamChaInfo.getBoss().getNpcUid();
			SceneFunction.getIns().removeNpcFromScene(npcUid);
			fightingMap.remove(teamId);
			// 结算并初始化下一关
			int guanqia = teamChaInfo.getGuanqia();
			LogTool.info(killer, "", "ThreeHeroFightLvBuFunction kill boss, guanqia=" + guanqia, this);
			// 击杀boss 发放奖励
			Struct_syzlb_762 struct_syzlb_762 = Config_syzlb_762.getIns().get(guanqia);
			int[][] reward = struct_syzlb_762.getTgjl();
			int nextGuanqia = struct_syzlb_762.getXyg();
			List<Object[]> rewardList = new ArrayList<>();
			for (int[] arr : reward) {
				rewardList.add(new Object[] { arr[0], arr[1], arr[2] });
			}
			Object[] rewardData = rewardList.toArray();
			Iterator<Long> iterator = teamChaInfo.getMemberChaMap().keySet().iterator();
			for (; iterator.hasNext();) {
				Long memberId = iterator.next();
				Hero hero = HeroCache.getHero(memberId);
				if (hero != null && hero.isOnline()) {
					UseAddUtil.add(hero, reward, SourceGoodConst.SH_LVBU_PASS_REWARD, UseAddUtil.getDefaultMail(),
							true);
				}
				ThreeHeroFightLvBuSender.sendCmd_9794(memberId, 1, rewardData);
			}
			Struct_syzlb_762 syzlb_762 = Config_syzlb_762.getIns().get(nextGuanqia);
			if (syzlb_762 != null) {
				teamChaInfo.setGoNext(true);
				teamChaInfo.setGuanqia(nextGuanqia);
				int sceneUnitId = SceneCache.getSceneUnitId();
				teamChaInfo.setSceneUnitId(sceneUnitId);
				teamChaInfo.setSceneId(syzlb_762.getDt2());
				ThreeHeroFightLvBuBoss boss = initBoss(nextGuanqia);
				teamChaInfo.setBoss(boss);
			} else {
				Integer selectType = ThreeHeroFightLvBuSysCache.getTeamHardMap().remove(teamId);
				int maxHardType = ThreeHeroFightLvBuSysCache.getHardGuanqiaMap().size();
				Iterator<Long> iterator1 = teamChaInfo.getMemberChaMap().keySet().iterator();
				for (; iterator1.hasNext();) {
					Long memberId = iterator1.next();
					Hero hero = HeroCache.getHero(memberId);
					if (hero != null && hero.isOnline()) {
						ThreeHeroFightLvBu threeHeroFightLvBu = hero.getThreeHeroFightLvBu();
						int hardType = threeHeroFightLvBu.getHardType();
						if (selectType == hardType && hardType < maxHardType) {
							threeHeroFightLvBu.setHardType(hardType + 1);
						}
					}
				}
				// 最后一关
				ThreeHeroFightLvBuFunction.getIns().eixtAndRemoveAllCacheNotSend(teamId, teamChaInfo);
				TeamFunction.getIns().leaveAllAndModifyTeamData(killer);
				if (selectType != null) {
					ThreeHeroFightLvBuSysCache.getHardTeamMap().get(selectType).remove(teamId);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, ThreeHeroFightLvBuFunction.class, killer, "",
					"ThreeHeroFightLvBuFunction leaveTeamAtFight");
		}
	}

	/** 初始化BOSS*/
	public ThreeHeroFightLvBuBoss initBoss(int guanqia) {
		Struct_syzlb_762 struct_syzlb_762 = Config_syzlb_762.getIns().get(guanqia);
		int[][] bossData = struct_syzlb_762.getBoss();
		int bossId = bossData[0][1];
		ThreeHeroFightLvBuBoss boss = new ThreeHeroFightLvBuBoss();
		boss.setGuanqia(guanqia);
		boss.setBossId(bossId);
		FinalFightAttr finalFightAttr = BattleFunction.initNPC(bossId);
		boss.setAttr(finalFightAttr);
		boss.setHp(finalFightAttr.getHpMax());
		boss.setHpMax(finalFightAttr.getHpMax());
		int[][] sc = struct_syzlb_762.getSc();
		boss.setPosX(sc[0][0]);
		boss.setPosY(sc[0][1]);
		return boss;
	}

	/**
	 * 战斗中离开队伍处理
	 */
	public void leaveTeamAtFight(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			Integer teamId = TeamCache.getHidToTeamIDMap().get(hid);
			if (teamId == null) {
				// 你没在队伍中
				ThreeHeroFightLvBuSender.sendCmd_9780(hid, 0, 1);
				return;
			}
			TeamChaInfo teamChaInfo = ThreeHeroFightLvBuSysCache.getTeamChaMap().get(teamId);
			teamChaInfo.getMemberChaMap().remove(hid);
			if (teamChaInfo.getMemberChaMap().size() == 0) {
				ThreeHeroFightLvBuSysCache.getTeamChaMap().remove(teamId);
				ThreeHeroFightLvBuSysCache.getFightingMap().remove(teamId);
			}
			List<Long> memberList = TeamFunction.getIns().leaveAndModifyTeamData(teamId, hid);
			Integer hardType = ThreeHeroFightLvBuSysCache.getTeamHardMap().get(teamId);
			ThreeHeroFightLvBuManager.getIns().updateTeamInfo(teamId, memberList, hardType);
			for(Long memberId : memberList) {				
				ThreeHeroFightLvBuSender.sendCmd_9796(memberId, hid);
			}
		} catch (Exception e) {
			LogTool.error(e, ThreeHeroFightLvBuFunction.class, hid, hero.getName(),
					"ThreeHeroFightLvBuFunction leaveTeamAtFight");
		}
	}

	/**
	 * 检测是否最后一个存活
	 * @param hid
	 * @param teamId
	 * @return
	 */
	public boolean checkLastLive(long hid, int teamId) {
		try {
			TeamChaInfo teamChaInfo = ThreeHeroFightLvBuSysCache.getTeamChaMap().get(teamId);
			int live = 0;
			for (PersonalChaInfo info : teamChaInfo.getMemberChaMap().values()) {
				if (info.getHp() > 0) {
					live += 1;
				}
			}
			if (live == 1) {
				PersonalChaInfo personalChaInfo = teamChaInfo.getMemberChaMap().get(hid);
				if(personalChaInfo!=null&&personalChaInfo.getHp()>0) {					
					return true;
				}
			}
		} catch (Exception e) {
			LogTool.error(e, ThreeHeroFightLvBuFunction.class, hid, "", "ThreeHeroFightLvBuFunction checkLastLive");
		}
		return false;
	}

	public void eixtAndRemoveAllCache(int teamId, TeamChaInfo teamChaInfo) {
		ThreeHeroFightLvBuSysCache.getFightingMap().remove(teamId);
		for (long pid : teamChaInfo.getMemberChaMap().keySet()) {
			Hero hero = HeroCache.getHero(pid);
			TeamFunction.getIns().leaveAndModifyTeamData(teamId, pid);
			if (hero != null) {
				ThreeHeroFightLvBuSender.sendCmd_9790(pid, 1, 0);
				SceneFunction.getIns().exitScene(hero, true);
			}
		}
		int sceneUnitId = teamChaInfo.getSceneUnitId();
		int sceneId = teamChaInfo.getSceneId();
		int severtype = Config_map_200.getIns().get(sceneId).getSevertype();
		SceneFunction.getIns().delScene(sceneUnitId, severtype);
		ThreeHeroFightLvBuSysCache.getTeamChaMap().remove(teamId);
	}
	
	public void eixtAndRemoveAllCacheNotSend(int teamId, TeamChaInfo teamChaInfo) {
		ThreeHeroFightLvBuSysCache.getFightingMap().remove(teamId);
		for (long pid : teamChaInfo.getMemberChaMap().keySet()) {
			Hero hero = HeroCache.getHero(pid);
			TeamFunction.getIns().leaveAndModifyTeamData(teamId, pid);
			if (hero != null) {
//				ThreeHeroFightLvBuSender.sendCmd_9790(pid, 1, 0);
//				SceneFunction.getIns().exitScene(hero, true);
			}
		}
		int sceneUnitId = teamChaInfo.getSceneUnitId();
		int sceneId = teamChaInfo.getSceneId();
		int severtype = Config_map_200.getIns().get(sceneId).getSevertype();
		SceneFunction.getIns().delScene(sceneUnitId, severtype);
		ThreeHeroFightLvBuSysCache.getTeamChaMap().remove(teamId);
	}

	public void useSkill(Hero hero, int skillType, SkillInfo skillInfo, double skillHurt) {
		long hid = hero.getId();
		try {
			if (skillType == SkillConst.skiil_site_4) {
				skillAttBoss(0, skillHurt, hero);
			} else if (skillType == SkillConst.skiil_site_5 || skillType == SkillConst.skiil_site_6) {
				// 六出祁山 加血 设置无敌 将对面变形 生效
				Struct_skill_210 skill_210 = Config_skill_210.getIns().get(skillInfo.getId());

				if (skill_210 != null && skill_210.getHdxg() > 0) {
					int effectType = skill_210.getHdxg();
					int starLve = skillInfo.getLevel();
					if (effectType == 1) {
						// 加血
						long hpMax = hero.getFinalFightAttr().getHpMax();
						int addTime = skill_210.getAttpg() * starLve;
						double addHp = hpMax * (skill_210.getAttp() + addTime) / 100000;
						skillAttBoss(1, addHp, hero);

					} else if (effectType == 2) {
						// 设置无敌状态 以及时间
						int addTime = skill_210.getAttp() + skill_210.getAttpg() * starLve;
						skillAttBoss(2, addTime, hero);
					} else if (effectType == 3) {
						// 设置无敌状态 以及时间
						int addTime = skill_210.getAttp() + skill_210.getAttpg() * starLve;
						skillAttBoss(3, addTime, hero);
					}
				} else if (skill_210 != null && skill_210.getHdxg() == 0) {
					// 宝物伤害
					skillAttBoss(0, skillHurt, hero);
				}
			} else if (skillType == SkillConst.skiil_site_8) {
				// 爆气
				QiCe qiCe = hero.getQiCe();
				if (qiCe == null) {
					return;
				}
				Struct_buff_011 struct_buff_011 = Config_buff_011.getIns().get(QiCeConst.index);
				// 设置减伤状态 以及时间
				int addTime = struct_buff_011.getShijian();
				skillAttBoss(4, addTime, hero);
			} else if (skillType == SkillConst.skiil_site_7) {
				// 天书伤害
				skillAttBoss(0, skillHurt, hero);
			}
		} catch (Exception e) {
			LogTool.error(e, ThreeHeroFightLvBuFunction.class, hid, "", "ThreeHeroFightLvBuFunction useSkill");
		}
	}

	/**
	 * 手动释放技能
	 * @param type 技能类型 0增加伤害 1加血 2是无敌 3自己无敌 对方被控制 
	 * @param damg 技能效果
	 * @param hero
	 */
	public void skillAttBoss(int type, double damg, Hero hero) {
		long hid = hero.getId();
		Integer teamID = TeamCache.getHidToTeamIDMap().get(hid);
		if (teamID == null) {
			// 不在队伍中
			LogTool.warn("ThreeHeroFightLvBuFunction teamID is null.hid:" + hero.getId(), this);
			return;
		}
		Team team = TeamCache.getTeamById(teamID);
		if (team == null) {
			LogTool.warn("ThreeHeroFightLvBuFunction team is null.hid:" + hero.getId(), this);
			return;
		}
		TeamChaInfo teamChaInfo = ThreeHeroFightLvBuSysCache.getTeamChaMap().get(teamID);
		ThreeHeroFightLvBuBoss boss = teamChaInfo.getBoss();
		if (boss == null) {
			LogTool.warn("ThreeHeroFightLvBuFunction boss is null.hid:" + hero.getId(), this);
			return;
		}
		long curhp = boss.getHp();
		if (curhp <= 0) {
			LogTool.warn("ThreeHeroFightLvBuFunction boss is death.hid:" + hero.getId(), this);
			return;
		}
		if (type == 0) {
			boss.addHp(-1 * (long) damg);
			curhp = boss.getHp();
			long sendHp = curhp;
			if (curhp <= 0) {
				killBossHandle(hid, teamChaInfo);
				sendHp = 0;
			}
			ConcurrentHashMap<Long, PersonalChaInfo> memberChaMap = teamChaInfo.getMemberChaMap();
			for (long memberId : memberChaMap.keySet()) {
				ThreeHeroFightLvBuSender.sendCmd_9802(memberId, sendHp);
			}
		} else if (type == 1) {
			// 回血
			ConcurrentHashMap<Long, PersonalChaInfo> memberChaMap = teamChaInfo.getMemberChaMap();
			PersonalChaInfo personalChaInfo = memberChaMap.get(hid);

			long nowHp = personalChaInfo.getHp();
			long addHp = (long) damg;
			long temphp = nowHp + addHp;
			long hpMax = personalChaInfo.getAttr().getHpMax();
			if (temphp >= hpMax) {
				personalChaInfo.setHp(hpMax);
			} else {
				personalChaInfo.addHp((long) damg);
			}
			List<Object[]> hpData = new ArrayList<>();
			hpData.add(new Object[] { hid, personalChaInfo.getHp() });
			ThreeHeroFightLvBuSender.sendCmd_9800(hid, hpData.toArray());
			long timeNow = TimeDateUtil.getCurrentTimeInMillis();
			personalChaInfo.setInvincibleTime(timeNow + BattleConst.ATT_WUDI_CONST * 1000);
		} else if (type == 2) {
			// 无敌
			ConcurrentHashMap<Long, PersonalChaInfo> memberChaMap = teamChaInfo.getMemberChaMap();
			PersonalChaInfo personalChaInfo = memberChaMap.get(hid);
			long timeNow = TimeDateUtil.getCurrentTimeInMillis();
			personalChaInfo.setInvincibleTime(timeNow + (long) damg);
		} else if (type == 3) {
			// 无敌
			ConcurrentHashMap<Long, PersonalChaInfo> memberChaMap = teamChaInfo.getMemberChaMap();
			PersonalChaInfo personalChaInfo = memberChaMap.get(hid);
			long timeNow = TimeDateUtil.getCurrentTimeInMillis();
			personalChaInfo.setInvincibleTime(timeNow + (long) damg);
		} else if (type == 4) {
			// 爆气减伤
			ConcurrentHashMap<Long, PersonalChaInfo> memberChaMap = teamChaInfo.getMemberChaMap();
			PersonalChaInfo personalChaInfo = memberChaMap.get(hid);
			long timeNow = TimeDateUtil.getCurrentTimeInMillis();
			personalChaInfo.setCutDownTime(timeNow + (long) damg);

		}
	}

	/**
	 * 使用道具添加挑战次数
	 * @param hero
	 * @param id
	 * @param num
	 * @return
	 */
	public boolean addChaNum(Hero hero, int id, int num) {
		if (hero == null) {
			return false;
		}
		long hid = hero.getId();
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.THREE_HERO_FIGHT_LVBU)) {
				return false;
			}
			ThreeHeroFightLvBu threeHeroFightLvBu = hero.getThreeHeroFightLvBu();
			threeHeroFightLvBu.addChaNum(num);
			return true;
		} catch (Exception e) {
			LogTool.error(e, ThreeHeroFightLvBuFunction.class, hid, "", "ThreeHeroFightLvBuFunction addChaNum");
		}
		return false;
	}

	/**
	 * 检测红点
	 * @param hero
	 */
	public boolean checkRedPoint(Hero hero) {
		if (hero == null) {
			return false;
		}
		long hid = hero.getId();
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.THREE_HERO_FIGHT_LVBU)) {
				return false;
			}
			ThreeHeroFightLvBu threeHeroFightLvBu = hero.getThreeHeroFightLvBu();
			int chaNum = threeHeroFightLvBu.getChaNum();
			if (chaNum > 0) {
				return true;
			}
		} catch (Exception e) {
			LogTool.error(e, ThreeHeroFightLvBuFunction.class, hid, hero.getName(),
					"ThreeHeroFightLvBuFunction checkRedPoint");
		}
		return false;
	}

	/**
	 * 更新红点
	 * @param hero
	 */
	public void updateRedPoint(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.THREE_HERO_FIGHT_LVBU)) {
				return;
			}
			boolean checkRedPoint = checkRedPoint(hero);
			if (checkRedPoint) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.THREE_HERO_FIGHT_LVBU,
						RedPointConst.RED_1, RedPointConst.HAS_RED);
			} else {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.THREE_HERO_FIGHT_LVBU,
						RedPointConst.RED_1, RedPointConst.NO_RED);
			}
		} catch (Exception e) {
			LogTool.error(e, ThreeHeroFightLvBuFunction.class, hid, hero.getName(),
					"ThreeHeroFightLvBuFunction checkRedPoint");
		}
	}

	public void gm(Hero hero, String[] param) {
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.THREE_HERO_FIGHT_LVBU)) {
			return;
		}
		int type = Integer.parseInt(param[0]);
		if (type == 1) {
			int chaNum = Integer.parseInt(param[1]);
			if (chaNum <= 0) {
				return;
			}
			ThreeHeroFightLvBu threeHeroFightLvBu = hero.getThreeHeroFightLvBu();
			threeHeroFightLvBu.addChaNum(chaNum);
		} else if (type == 2) {
			long hid = hero.getId();
			Integer teamId = TeamCache.getHidToTeamIDMap().get(hid);
			if (teamId == null) {
				return;
			}
			Team team = TeamCache.getTeamMap().get(teamId);
			long leader = team.getLeader();
			if (hid != leader) {
				// 不是队长不能操作
				ThreeHeroFightLvBuSender.sendCmd_9786(hid, 0, 2);
				return;
			}
			int nextGuanqia = Integer.parseInt(param[1]);
			TeamChaInfo info = ThreeHeroFightLvBuSysCache.getTeamChaMap().get(teamId);
			Struct_syzlb_762 syzlb_762 = Config_syzlb_762.getIns().get(nextGuanqia);
			if (syzlb_762 != null) {
				info.setGuanqia(nextGuanqia);
				int sceneUnitId = SceneCache.getSceneUnitId();
				info.setSceneUnitId(sceneUnitId);
				info.setSceneId(syzlb_762.getDt2());
				ThreeHeroFightLvBuBoss boss = initBoss(nextGuanqia);
				info.setBoss(boss);
			}
		}
	}

}
