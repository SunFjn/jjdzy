package com.teamtop.system.guanQiaHelp;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.antiAddictionSystem.AntiAddictionFunction;
import com.teamtop.system.battle.BattleFunction;
import com.teamtop.system.battleNew.BuffConst;
import com.teamtop.system.battleNew.BuffFunction;
import com.teamtop.system.boss.qmboss.QMBossFunction;
import com.teamtop.system.crossSJMiJing.CrossSJMiJingConst;
import com.teamtop.system.crossSJMiJing.CrossSJMiJingFunction;
import com.teamtop.system.event.systemEvent.SystemEventFunction;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.global.GlobalSender;
import com.teamtop.system.guanQiaHelp.model.GuanQiaHelpBoss;
import com.teamtop.system.guanQiaHelp.model.GuanQiaHelpModel;
import com.teamtop.system.guanqia.Guanqia;
import com.teamtop.system.guanqia.GuanqiaCache;
import com.teamtop.system.guanqia.GuanqiaConst;
import com.teamtop.system.guanqia.GuanqiaFunction;
import com.teamtop.system.hero.FightAttr;
import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.team.model.TeamMember;
import com.teamtop.system.zhenYan.ZhenYanFunction;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_BOSS_205;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_BOSS_205;
import excel.struct.Struct_xtcs_004;

public class GuanQiaHelpFunction {
	private static GuanQiaHelpFunction ins = null;

	public static GuanQiaHelpFunction getIns() {
		if (ins == null) {
			ins = new GuanQiaHelpFunction();
		}
		return ins;
	}

	/**
	 * 有人死亡，刷新缓存、前端
	 * 
	 * @param noShowUIHid
	 *            不显示结算页面的玩家ID(奇葩需求)
	 */
	public void death(long seekHelpId, long hid, long noShowUIHid) {
		GuanQiaHelpBoss boss = GuanQiaHelpCache.getGuanQiaHelpBossMap().get(seekHelpId);
		if (boss == null) {
			return;
		}
		long deadId = 0;
		if (boss.getHid() == hid) {
			// 本人死亡
			boss.getMyModel().setDeath(1);
			deadId = boss.getHid();
		} else {
			// 协助者死亡
			boss.getOtherModel().setDeath(1);
			deadId = boss.getOtherId();
		}
		GuanQiaHelpSender.sendCmd_5910(boss.getHid(), deadId);
		GuanQiaHelpSender.sendCmd_5910(boss.getOtherId(), deadId);
	}

	/**
	 * 更新伤害榜，发奖励，清理缓存
	 */
	public void sendAwards(GuanQiaHelpBoss boss) {
		long hid = boss.getHid();
		Hero hero = HeroCache.getHero(hid);
		if (hero != null) {
			GuanQiaHelpSender.sendCmd_5914(hid, (long) boss.getHpmax(), (long) boss.getHp());
		}

		long otherId = boss.getOtherId();
		Hero otherHero = HeroCache.getHero(otherId);
		if (otherHero != null) {
			GuanQiaHelpSender.sendCmd_5914(otherId, (long) boss.getHpmax(), (long) boss.getHp());
		}

		if (boss.getHp() <= 0) {
			// boss被打败
			boss.setState(3);

			if (boss.getMyModel().getDeath() != 3) {
				hero.getGuanqiahelp().setSeekHelpTimes(hero.getGuanqiahelp().getSeekHelpTimes() - 1);
			}

			if (boss.getOtherModel().getDeath() != 3) {
				otherHero.getGuanqiahelp().setHelpTimes(otherHero.getGuanqiahelp().getHelpTimes() - 1);
			}

			// 奖励提示
			List<Object[]> dropTips = new ArrayList<Object[]>();

			Struct_xtcs_004 excel = Config_xtcs_004.getIns().get(GuanQiaHelpConst.CONST_3927);
			int[][] helpAward = excel.getOther();

			Guanqia guanqia = hero.getGuanqia();
			int curGuanqia = guanqia.getCurGuanqia();

			List<ProbabilityEventModel> pelist = GuanqiaCache.getBossDropMap().get(curGuanqia);
			int size = pelist.size();
			int punish = AntiAddictionFunction.getIns().getPunish(hero);
			List<int[]> dropArr = new ArrayList<int[]>();
			for (int i = 0; i < size; i++) {
				ProbabilityEventModel pe = pelist.get(i);
				int[] js = (int[]) ProbabilityEventUtil.getEventByProbability(pe);
				if (js != null) {
					int type = js[0];
					if (type == GameConst.GENDROP) {
						int num = js[2];
						ProbabilityEventModel droppe = HeroCache.getDrop(js[1]);
						for (int j = 1; j <= num; j++) {
							js = (int[]) ProbabilityEventUtil.getEventByProbability(droppe);
							dropArr.add(js);
							dropTips.add(new Object[] { js[0], js[1], js[2], 0 });
						}
					} else {
						if (punish > 0) {
							js[2] = js[2] / punish;
						}
						dropArr.add(js);
						dropTips.add(new Object[] { js[0], js[1], js[2], 0 });
					}
				}
			}
			List<Object[]> jingJiadropTips = new ArrayList<Object[]>();
			List<int[]> jingJiadropArr = new ArrayList<int[]>();
			int[] jingJiaSateByGuan = guanqia.getJingJiaSateByGuan();
			Struct_xtcs_004 struct_xtcs_004 = Config_xtcs_004.getIns().get(GuanqiaConst.GUANQIA_NUM);
			// 关卡＜X不刷金甲兵
			if (curGuanqia >= struct_xtcs_004.getNum() && jingJiaSateByGuan[0] == curGuanqia) {

				if (jingJiaSateByGuan[1] == GuanqiaConst.HAS_JINGJIA) {
					// 有金甲兵
					struct_xtcs_004 = Config_xtcs_004.getIns().get(GuanqiaConst.JINGJIA_REWARD);
					int[][] other = struct_xtcs_004.getOther();
					for (int i = 0; i < other.length; i++) {
						int[] js = other[i];
						jingJiadropArr.add(new int[] { js[0], js[1], js[2] });
						jingJiadropTips.add(new Object[] { js[0], js[1], js[2] });
					}
					// 概率恢复初始化
					guanqia.setJingJiaPro(GuanqiaConst.JINGJIA_BASEPRO);
					guanqia.setNoJingJia(0);
				} else {
					// 没有金甲兵 概率成长 关卡成长
					guanqia.setNoJingJia(guanqia.getNoJingJia() + 1);
					guanqia.setJingJiaPro(guanqia.getJingJiaPro() + GuanqiaConst.JINGJIA_ADDPRO);
				}
			}

			int[][] drops = new int[dropArr.size()][];
			dropArr.toArray(drops);

			int[][] jingJiadrops = new int[jingJiadropArr.size()][];
			jingJiadropArr.toArray(jingJiadrops);

			if (punish > 0) {
				UseAddUtil.add(hero, drops, SourceGoodConst.GUANQIA_BOSS_DROP, UseAddUtil.getDefaultMail(), false);
				UseAddUtil.add(hero, jingJiadrops, SourceGoodConst.JINGJIABING_DROP, UseAddUtil.getDefaultMail(),
						false);

				// UseAddUtil.add(otherHero, drops, SourceGoodConst.HELP_GUA_QIA_AWARD,
				// UseAddUtil.getDefaultMail(),
				// false);
				// UseAddUtil.add(otherHero, jingJiadrops, SourceGoodConst.HELP_GOLD_MONSTER,
				// UseAddUtil.getDefaultMail(),
				// false);

				UseAddUtil.add(otherHero, helpAward, SourceGoodConst.HELP_HELP_AWARD, UseAddUtil.getDefaultMail(),
						false);
			} else if (punish == 0) {
				dropTips.clear();
				jingJiadropTips.clear();
			}

			int newGuanqia = curGuanqia + 1;
			int maxGuanqia = Config_BOSS_205.getIns().getSortList().size();
			if (newGuanqia >= maxGuanqia) {
				newGuanqia = maxGuanqia;
			}

			guanqia.setCurMonster(0);
			hero.setOperateTempStrength(0);
			if (newGuanqia != curGuanqia) {
				guanqia.setCurGuanqia(newGuanqia);
				guanqia.setTimeTopGuanQia(TimeDateUtil.getCurrentTime());
				GuanqiaFunction.getIns().refreshRank(hero, newGuanqia);
				// 通关事件触发
				SystemEventFunction.triggerPassGuanqiaEvent(hero, newGuanqia);
			}

			GlobalSender.sendCmd_262(hid, 1, dropTips.toArray());
			GuanQiaHelpSender.sendCmd_5918(hid, guanqia.getCurGuanqia());

			List<Object[]> otherDropTips = new ArrayList<Object[]>();
			for (int[] award : helpAward) {
				otherDropTips.add(0, new Object[] { award[0], award[1], award[2], 3 });
			}

			GlobalSender.sendCmd_262(otherId, 1, otherDropTips.toArray());

			GuanQiaHelpCache.getGuanQiaHelpBossMap().remove(boss.getHid());
		}
	}

	/**
	 * 定时检查人打boss
	 */
	public void scheduleTeamAttBoss(GuanQiaHelpBoss boss) {
		try {
			if (boss.getState() != GuanQiaHelpConst.STATE_1) {
				return;
			}
			if (boss.getHp() <= 0) {
				// 结算boss
				GuanQiaHelpCache.getGuanQiaHelpBossMap().remove(boss.getHid());
				return;
			}
			long timeNow = TimeDateUtil.getCurrentTimeInMillis();
			long invincibleTime = boss.getInvincibleTime();
			if (invincibleTime > timeNow) {
				// System.out.println("无敌Boss时间");
				return;
			}

			FinalFightAttr attrBoss = boss.getAttr();

			double curhp = boss.getHp();

			GuanQiaHelpModel model = boss.getMyModel();
			int death = model.getDeath();
			if (death == 0) {
				FinalFightAttr attMember = model.getAttrmap();
				// buff加成处理
				TeamMember teamMember = model.getMember();
				int[][] tempAttr = BuffFunction.getIns().getBuffTempAttr(teamMember);
				Hero hero = HeroCache.getHero(model.getHid());
				FightAttr fightAttr = null;
				if (hero != null) {
					fightAttr = hero.getFightAttr();
				}
				long hurt = (long) Math.max(BattleFunction.calcDamg(attMember, attrBoss, tempAttr, fightAttr), 1);

				curhp = Math.max(0, curhp - hurt);
				boss.setHp(curhp);
			}

			if (curhp > 0) {
				model = boss.getOtherModel();
				death = model.getDeath();
				if (death == 0) {
					FinalFightAttr attMember = model.getAttrmap();
					TeamMember teamMember = model.getMember();
					int[][] tempAttr = BuffFunction.getIns().getBuffTempAttr(teamMember);
					Hero hero = HeroCache.getHero(model.getHid());
					FightAttr fightAttr = null;
					if (hero != null) {
						fightAttr = hero.getFightAttr();
					}
					long hurt = (long) Math.max(BattleFunction.calcDamg(attMember, attrBoss, tempAttr, fightAttr), 1);
					curhp = Math.max(0, curhp - hurt);
					boss.setHp(curhp);
				}
			}

			sendAwards(boss);
		} catch (

		Exception e) {
			LogTool.error(e, CrossSJMiJingFunction.class, "SJMJ.scheduleAttQmBoss has wrong");
		}
	}

	/**
	 * 定时检查boss打人
	 */
	public void scheduleBossAttTeam(GuanQiaHelpBoss boss) {
		try {
			if (boss.getState() != GuanQiaHelpConst.STATE_1) {
				return;
			}
			if (boss.getHp() <= 0) {
				// 结算boss
				GuanQiaHelpCache.getGuanQiaHelpBossMap().remove(boss.getHid());
				return;
			}

			List<Object[]> hpInfo = new ArrayList<Object[]>();

			int death_1 = 1;
			int death_2 = 1;
			FinalFightAttr attrBoss = boss.getAttr();
			long timeNow = TimeDateUtil.getCurrentTimeInMillis();
			// 检测buff
			BuffFunction.getIns().checkBuffHandleMember(timeNow, boss.getMyModel().getMember());
			BuffFunction.getIns().checkBuffHandleMember(timeNow, boss.getOtherModel().getMember());
			GuanQiaHelpModel model = boss.getMyModel();
			death_1 = model.getDeath();
			if (death_1 == 0) {
				long invincibleTime = model.getInvincibleTime();
				if (invincibleTime <= timeNow) {
					FinalFightAttr attrMember = model.getAttrmap();
					long hurt = (long) Math.max(BattleFunction.calcDamg(attrBoss, attrMember), 1);
					double curhp = attrMember.getHp();
					curhp = Math.max(0, curhp - hurt);
					attrMember.setHp((long) curhp);

					if (curhp <= 0) {
						int buffId = BuffConst.RELIVE_BUFF;
						TeamMember member = model.getMember();
						Hero hero = HeroCache.getHero(model.getHid());
						int lv = 0;
						if (hero != null) {
							lv = ZhenYanFunction.getIns().getZhenXinLevel(hero);
						}
						if (lv > 0) {
							// 复活效果
							BuffFunction.getIns().buffEffectHandle(buffId, lv, attrMember, member);
							curhp = attrMember.getHp();
						}
						if (curhp <= 0) {
							model.setDeath(CrossSJMiJingConst.DEATH_YES);
							// 刷新前端有人死亡
							death(boss.getHid(), model.getHid(), 0);
							death_1 = 1;
						}
					}
					hpInfo.add(new Object[] { model.getHid(), attrMember.getHp() });
				}
			}

			model = boss.getOtherModel();
			death_2 = model.getDeath();
			if (death_2 == 0) {
				long invincibleTime = model.getInvincibleTime();
				if (invincibleTime <= timeNow) {
					FinalFightAttr attrMember = model.getAttrmap();
					long hurt = (long) Math.max(BattleFunction.calcDamg(attrBoss, attrMember), 1);
					double curhp = attrMember.getHp();
					curhp = Math.max(0, curhp - hurt);
					attrMember.setHp((long) curhp);

					if (curhp <= 0) {
						int buffId = BuffConst.RELIVE_BUFF;
						TeamMember member = model.getMember();
						Hero hero = HeroCache.getHero(model.getHid());
						int lv = 0;
						if (hero != null) {
							lv = ZhenYanFunction.getIns().getZhenXinLevel(hero);
						}
						if (lv > 0) {
							// 复活效果
							BuffFunction.getIns().buffEffectHandle(buffId, lv, attrMember, member);
							curhp = attrMember.getHp();
						}
						if (curhp <= 0) {
							model.setDeath(CrossSJMiJingConst.DEATH_YES);
							// 刷新前端有人死亡
							death(boss.getHid(), model.getHid(), 0);
							death_2 = 1;
						}
					}
					hpInfo.add(new Object[] { model.getHid(), attrMember.getHp() });
				}
			}

			boolean online = HeroFunction.getIns().isOnline(boss.getHid());
			if (online) {
				GuanQiaHelpSender.sendCmd_5912(boss.getHid(), hpInfo.toArray());
			}

			online = HeroFunction.getIns().isOnline(boss.getOtherId());
			if (online) {
				GuanQiaHelpSender.sendCmd_5912(boss.getOtherId(), hpInfo.toArray());
			}

			if (death_1 != 0 && death_2 != 0) {
				boss.setState(3);
				GlobalSender.sendCmd_262(boss.getHid(), 2, new Object[] {});
				GlobalSender.sendCmd_262(boss.getOtherId(), 2, new Object[] {});
				GuanQiaHelpCache.getGuanQiaHelpBossMap().remove(boss.getHid());
			}

		} catch (Exception e) {
			LogTool.error(e, QMBossFunction.class, "SJMJ.scheduleAttQmBoss has wrong");
		}
	}

	/**
	 * 创建协助
	 * 
	 * @return
	 */
	public GuanQiaHelpBoss createHelpBoss(Hero hero) {
		GuanQiaHelpBoss boss = new GuanQiaHelpBoss();
		boss.setHid(hero.getId());
		boss.setCreateTime(new Date().getTime());

		Struct_BOSS_205 struct_BOSS_205 = Config_BOSS_205.getIns().get(hero.getGuanqia().getCurGuanqia());
		FinalFightAttr battleFightAttr = BattleFunction.initNPC(struct_BOSS_205.getBL()[0][1]);
		long hp = battleFightAttr.getHp();
		boss.setAttr(battleFightAttr);
		boss.setHpmax(hp);
		boss.setHp(hp);
		boss.setBossId(struct_BOSS_205.getBL()[0][1]);
		boss.setGuanQiaNum(hero.getGuanqia().getCurGuanqia());

		boss.setHasGoldMonster(hasGoldMonster(hero) ? 1 : 0);

		return boss;
	}

	/**
	 * 创建战斗模块
	 * 
	 * @param hero
	 * @return
	 */
	public GuanQiaHelpModel createHelpModel(Hero hero) {
		GuanQiaHelpModel model = new GuanQiaHelpModel();
		model.setHid(hero.getId());
		model.setName(hero.getNameZoneid());
		model.setDeath(0);
		FinalFightAttr fightAttr = BattleFunction.initHero(hero);
		model.setAttrmap(fightAttr);
		model.setMember(new TeamMember(hero.getId()));
		model.fullHp();
		return model;
	}

	/**
	 * 是否有金甲兵
	 * 
	 * @return
	 */
	public boolean hasGoldMonster(Hero hero) {
		Struct_xtcs_004 struct_xtcs_004 = Config_xtcs_004.getIns().get(GuanqiaConst.GUANQIA_NUM);
		Guanqia guanqia = hero.getGuanqia();
		int curGuanqia = guanqia.getCurGuanqia();
		int[] jingJiaSateByGuan = guanqia.getJingJiaSateByGuan();
		// 关卡＜X不刷金甲兵
		if (curGuanqia >= struct_xtcs_004.getNum() && jingJiaSateByGuan[0] == curGuanqia) {
			return jingJiaSateByGuan[1] == GuanqiaConst.HAS_JINGJIA;
		}
		return false;
	}

	/**
	 * 是否可以广播协助
	 * 
	 * @param hero
	 * @return
	 */
	public boolean canBroadCast(Hero hero) {
		GuanQiaHelp guanQiaHelp = hero.getGuanqiahelp();
		if (guanQiaHelp.getSeekHelpTimes() <= 0) {
			// 求助次数不足
			GuanQiaHelpSender.sendCmd_5902(hero.getId(), 2);
			return false;
		}

		Guanqia guanqia = hero.getGuanqia();
		Struct_xtcs_004 excel = Config_xtcs_004.getIns().get(GuanQiaHelpConst.CONST_3924);
		if (guanqia.getCurGuanqia() < excel.getNum()) {
			// 协助系统未开启
			return false;
		}

		int curGuanqia = guanqia.getCurGuanqia();
		Struct_BOSS_205 struct_BOSS_205 = Config_BOSS_205.getIns().get(curGuanqia);
		int bs = struct_BOSS_205.getBS();
		int curMonster = guanqia.getCurMonster();
		if (curMonster < bs) {
			// 波数未达标
			GuanQiaHelpSender.sendCmd_5902(hero.getId(), 4);
			return false;
		}

		int bigGuanqia = guanqia.getBigGuanqia();
		int nowBig = GuanqiaFunction.getIns().getBigGuanqia(curGuanqia);
		if (bigGuanqia != nowBig) {
			// 请先前往下一关
			GuanQiaHelpSender.sendCmd_5902(hero.getId(), 5);
			return false;
		}

		GuanQiaHelpBoss boss = GuanQiaHelpCache.getGuanQiaHelpBossMap().get(hero.getId());
		if (boss != null) {
			if (System.currentTimeMillis() - boss.getCreateTime() < 10 * 1000) {
				// CD中
				GuanQiaHelpSender.sendCmd_5902(hero.getId(), 3);
				return false;
			}
			if (guanqia.getCurGuanqia() == boss.getGuanQiaNum()) {
				if (boss.getState() == GuanQiaHelpConst.STATE_1) {
					// 正在战斗或等待确认进入战斗
					GuanQiaHelpSender.sendCmd_5902(hero.getId(), 6);
					return false;
				} else if (boss.getState() == GuanQiaHelpConst.STATE_2 || boss.getState() == GuanQiaHelpConst.STATE_4) {
					// 协助流程正在跑
					if (System.currentTimeMillis() - boss.getAskTime() <= 10 * 1000) {
						GuanQiaHelpSender.sendCmd_5902(hero.getId(), 6);
						return false;
					}
				}
			}
		}
		return true;
	}

	/**
	 * 是否可以协助该玩家
	 * 
	 * @param hero
	 * @param boss
	 * @return
	 */
	public boolean canAgree(Hero hero, GuanQiaHelpBoss boss) {
		if (boss == null) {
			// 该求助已超时
			GuanQiaHelpSender.sendCmd_5906(hero.getId(), -2);
			return false;
		}

		if (System.currentTimeMillis() - boss.getCreateTime() > 5 * 60 * 1000) {
			// 该求助已超时
			GuanQiaHelpSender.sendCmd_5906(hero.getId(), -2);
			return false;
		}

		// 求助者在副本中(实际上该求助不是可接受求助状态)
		if (boss.getState() == GuanQiaHelpConst.STATE_2 || boss.getState() == GuanQiaHelpConst.STATE_4) {
			if (System.currentTimeMillis() - boss.getAskTime() <= 10 * 1000) {
				GuanQiaHelpSender.sendCmd_5906(hero.getId(), -3);
				return false;
			}
		} else if (boss.getState() != GuanQiaHelpConst.STATE_0) {
			GuanQiaHelpSender.sendCmd_5906(hero.getId(), -3);
			return false;
		}

		if (hero.getGuanqia().getCurGuanqia() < boss.getGuanQiaNum()) {
			// 需通关该关卡
			GuanQiaHelpSender.sendCmd_5906(hero.getId(), -4);
			return false;
		}

		if (hero.getGuanqiahelp().getHelpTimes() <= 0) {
			// 帮助次数不足
			GuanQiaHelpSender.sendCmd_5906(hero.getId(), -5);
			return false;
		}

		Hero seekHero = HeroCache.getHero(boss.getHid());
		if (seekHero == null) {
			// 角色不存在
			GuanQiaHelpSender.sendCmd_5906(hero.getId(), -7);
			return false;
		}
		if (seekHero.getGuanqia().getCurGuanqia() > boss.getGuanQiaNum()) {
			// 求助者已通关该关卡
			GuanQiaHelpSender.sendCmd_5906(hero.getId(), -1);
			return false;
		}

		if (!seekHero.isOnline()) {
			// 求助者不在线
			GuanQiaHelpSender.sendCmd_5906(hero.getId(), -6);
			return false;
		}

		return true;
	}
}
