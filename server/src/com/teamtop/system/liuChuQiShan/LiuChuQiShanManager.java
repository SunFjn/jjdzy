package com.teamtop.system.liuChuQiShan;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.cross.CrossCache;
import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.ativitys.achievementTree.AchievementTreeEnum;
import com.teamtop.system.activity.ativitys.achievementTree.AchievementTreeFunction;
import com.teamtop.system.battle.BattleConst;
import com.teamtop.system.battle.BattleFunction;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.liuChuQiShan.model.LiuChuQiShan;
import com.teamtop.system.liuChuQiShan.model.LiuChuQiShanBoss;
import com.teamtop.system.team.TeamCache;
import com.teamtop.system.team.TeamConst;
import com.teamtop.system.team.TeamFunction;
import com.teamtop.system.team.model.Team;
import com.teamtop.system.team.model.TeamMember;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_six_279;
import excel.struct.Struct_six_279;

public class LiuChuQiShanManager {
	private static LiuChuQiShanManager ins = null;

	public static LiuChuQiShanManager getIns() {
		if (ins == null) {
			ins = new LiuChuQiShanManager();
		}
		return ins;
	}

	public void openUI(Hero hero) {
		try {
			if (hero == null) {
				return;
			}
			if (!HeroFunction.getIns().checkSystemOpen(hero, LiuChuQiShanConst.sysId)) {
				return;
			}
			LiuChuQiShan liuChuQiShan = hero.getLiuChuQiShan();
			int needHelpNum = liuChuQiShan.getNeedHelpNum();
			int numHelpAwards = liuChuQiShan.getNumHelpAwards();
			int gqId = liuChuQiShan.getGqId();
			int saoDangNum = liuChuQiShan.getSaoDangNum();
			Set<Integer> passSet = liuChuQiShan.getPassSet();
			int state = 0;// 告诉前端是否可以扫荡
			List<Struct_six_279> sortList = Config_six_279.getIns().getSortList();
			for (Struct_six_279 excel : sortList) {
				int id = excel.getId();
				if (id >= gqId) {
					break;
				}
				if (passSet.contains(id)) {
					// 判断该关卡是否今天才首通
					continue;
				}
				state = 1;// 有可以扫荡的关卡就告诉前端
				break;
			}
			LiuChuQiShanSender.sendCmd_8202(hero.getId(), needHelpNum, numHelpAwards, gqId, saoDangNum,
					state);
			int size = sortList.size();
			Struct_six_279 struct_six_279 = sortList.get(size - 1);
			int next = struct_six_279.getNext();// 通关后存的关卡id
			if (gqId >= next) {
				// 成就树
				AchievementTreeFunction.getIns().checkTask(hero, AchievementTreeEnum.TASK_11, 2, 0);
			}
		} catch (Exception e) {
			LogTool.error(e, LiuChuQiShanManager.class, hero.getId(), hero.getName(), "openUi has wrong!");
		}
	}

	public void getTeamData(Hero hero, int id) {
		try {
			if (hero == null) {
				return;
			}
			if (!HeroFunction.getIns().checkSystemOpen(hero, LiuChuQiShanConst.sysId)) {
				return;
			}
			List<Object[]> sendData = new ArrayList<>();
			Struct_six_279 excelMJ = Config_six_279.getIns().get(id);
			if (excelMJ == null) {
				// 副本不存在
				LiuChuQiShanSender.sendCmd_8204(hero.getId(), 2, id, sendData.toArray());
				return;
			}
			Integer teamIDInt = TeamCache.getHidToTeamIDMap().get(hero.getId());
			if (teamIDInt != null) {
				// 你已经有队伍，不能重复加入
				LiuChuQiShanFunction.getIns().sendMyTeamData(hero.getId(), 1);// 刷新队友数据
				return;
			}
			int getlocalPartId = CrossCache.getlocalPartId();
			ConcurrentHashMap<Integer, Team> teamMap = TeamFunction.getIns().getTeamMapByID(TeamConst.TEAM_SHOW_MAX, id,
					LiuChuQiShanConst.sysId, TeamConst.TEAM_MEMBER_MAX, getlocalPartId);
			Iterator<Team> iterator = teamMap.values().iterator();
			while (iterator.hasNext()) {
				Team team = iterator.next();
				int teamID = team.getId();
				long leader = team.getLeader();
				Hero heroTemp = HeroCache.getHero(leader);
				if (heroTemp == null)
					continue;
				Map<Long, TeamMember> members = team.getMembers();
				sendData.add(new Object[] { heroTemp.getName(), teamID, heroTemp.getIcon(), heroTemp.getFrame(),
						members.size() });
				if (sendData.size() >= TeamConst.TEAM_SHOW_MAX) {
					break;
				}
			}
			LiuChuQiShanSender.sendCmd_8204(hero.getId(), 1, id, sendData.toArray());
		} catch (Exception e) {
			LogTool.error(e, LiuChuQiShanManager.class, hero.getId(), hero.getName(), "getTeamData has wrong!");
		}
	}

	public void buildTeam(Hero hero, int id) {
		try {
			if (hero == null) {
				return;
			}
			if (!HeroFunction.getIns().checkSystemOpen(hero, LiuChuQiShanConst.sysId)) {
				return;
			}
			Struct_six_279 excelMJ = Config_six_279.getIns().get(id);
			if (excelMJ == null) {
				// 副本不存在
				LiuChuQiShanSender.sendCmd_8206(hero.getId(), 3, 0, id, new Object[] {});
				return;
			}
			int chackInTeam = TeamFunction.getIns().chackInTeam(hero.getId(), LiuChuQiShanConst.sysId);
			if (chackInTeam == TeamConst.HERO_HAD_TEAM_OTHER_TYPE) {// 强行退出其他队伍
				TeamFunction.getIns().leaveByType(hero.getId(), LiuChuQiShanConst.sysId, 0);
			}
			LiuChuQiShan liuChuQiShan = hero.getLiuChuQiShan();
			int gqId = liuChuQiShan.getGqId();
			if (gqId < id && gqId != 0) {
				// 需要通关前面的副本才能打这个副本
				LiuChuQiShanSender.sendCmd_8206(hero.getId(), 4, 0, id, new Object[] {});
				return;
			}
			if (gqId > id) {
				// 已通关关卡不可创建队伍
				LiuChuQiShanSender.sendCmd_8206(hero.getId(), 5, 0, id, new Object[] {});
				return;
			}
			ConcurrentHashMap<Long, Integer> hidToTeamIDMap = TeamCache.getHidToTeamIDMap();
			Integer teamIDInt = hidToTeamIDMap.get(hero.getId());
			if (teamIDInt != null) {
				// 你已经有队伍，不能重复加入
				LiuChuQiShanFunction.getIns().sendMyTeamData(hero.getId(), 1);
				return;
			}

			TeamMember member = new TeamMember(hero.getId());
			member.setType(TeamConst.TYPE_MEMBER);
			member.setName(hero.getNameZoneid());
			member.setTimeJoin(TimeDateUtil.getCurrentTime());

			Map<Long, TeamMember> members = null;
			int teamID = TeamCache.getTeamId();
			int partId = CrossCache.getPartId(hero.getZoneid());
			Team team = new Team(teamID, TimeDateUtil.getCurrentTime(), LiuChuQiShanConst.sysId, partId);
			team.setId(teamID);
			team.setLeader(hero.getId());
			members = new HashMap<Long, TeamMember>();
			member.setType(TeamConst.TYPE_LEADER);
			members.put(hero.getId(), member);
			team.setMembers(members);
			team.setIdRoom(id);
			TeamCache.setTeamMap(teamID, team);
			TeamCache.setHidToTeamIDMap(hero.getId(), teamID);

			for (TeamMember temp : members.values()) {
				long hidTemp = temp.getHid();
				boolean online = HeroFunction.getIns().isOnline(hidTemp);
				if (online) {
					LiuChuQiShanFunction.getIns().sendMyTeamData(hero.getId(), 1);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, LiuChuQiShanManager.class, hero.getId(), hero.getName(), "buildTeam has wrong!");
		}
	}

	public void removeMember(Hero hero, long hidOth) {
		try {
			if (hero == null) {
				return;
			}
			if (!HeroFunction.getIns().checkSystemOpen(hero, LiuChuQiShanConst.sysId)) {
				return;
			}
			long hid = hero.getId();
			Integer teamIDInt = TeamCache.getHidToTeamIDMap().get(hid);
			if (teamIDInt == null) {
				// 你没在队伍中
				LiuChuQiShanSender.sendCmd_8208(hid, 2);
				return;
			}
			Team team = TeamCache.getTeamMap().get(teamIDInt);
			if (team == null) {
				// 队伍缓存异常
				LiuChuQiShanSender.sendCmd_8208(hid, 3);
				return;
			}
			long leader = team.getLeader();
			if (hid != leader) {
				// 你不是队长
				LiuChuQiShanSender.sendCmd_8208(hid, 4);
				return;
			}
			Map<Long, TeamMember> members = team.getMembers();
			TeamMember memberOth = members.get(hidOth);
			if (memberOth == null) {
				// 该队员不存在
				LiuChuQiShanSender.sendCmd_8208(hid, 5);
				return;
			}

			List<Long> reflashHidList = TeamFunction.getIns().leaveAndModifyTeamData(teamIDInt, hidOth);
			boolean online = HeroFunction.getIns().isOnline(hidOth);
			if (online) {
				Hero heroOth = HeroCache.getHero(hidOth);
				getTeamData(heroOth, team.getIdRoom());
			}
			if (hidOth != hid) {
				// 提示玩家被踢出队伍
				LiuChuQiShanSender.sendCmd_8208(hidOth, 6);
			}

			// 刷新队伍数据
			for (long hidTemp : reflashHidList) {
				boolean onlineTemp = HeroFunction.getIns().isOnline(hidTemp);
				if (onlineTemp) {
					LiuChuQiShanFunction.getIns().sendMyTeamData(hidTemp, 1);
				}
			}
			LiuChuQiShanSender.sendCmd_8208(hid, 1);
		} catch (Exception e) {
			LogTool.error(e, LiuChuQiShanManager.class, hero.getId(), hero.getName(), "removeMember has wrong!");
		}
	}

	public void broadCast(Hero hero) {
		try {
			if (hero == null) {
				return;
			}
			if (!HeroFunction.getIns().checkSystemOpen(hero, LiuChuQiShanConst.sysId)) {
				return;
			}
			long hid = hero.getId();
			Integer teamIDInt = TeamCache.getHidToTeamIDMap().get(hid);
			if (teamIDInt == null) {
				// 你没在队伍中
				LiuChuQiShanSender.sendCmd_8210(hid, 2);
				return;
			}
			Team team = TeamCache.getTeamMap().get(teamIDInt);
			if (team == null) {
				// 队伍缓存异常
				LiuChuQiShanSender.sendCmd_8210(hid, 3);
				return;
			}
			long leader = team.getLeader();
			if (hid != leader) {
				// 你不是队长
				LiuChuQiShanSender.sendCmd_8210(hid, 4);
				return;
			}
			Map<Long, TeamMember> members = team.getMembers();
			int size = members.size();
			if (size >= TeamConst.TEAM_MEMBER_MAX) {
				// 队员已满
				LiuChuQiShanSender.sendCmd_8210(hid, 5);
				return;
			}
			LiuChuQiShan liuChuQiShan = hero.getLiuChuQiShan();
			int needHelpNum = liuChuQiShan.getNeedHelpNum();
			if (needHelpNum <= 0) {
				// 求助次数已用完
				LiuChuQiShanSender.sendCmd_8210(hid, 7);
				return;
			}
			/*int timeBuilTeam = liuChuQiShan.getTimeBuilTeam();
			int timeNow = TimeDateUtil.getCurrentTime();
			if (timeBuilTeam > timeNow) {
				// 操作太频繁
				LiuChuQiShanSender.sendCmd_8210(hid, 6);
				return;
			}
			liuChuQiShan.setTimeBuilTeam(timeNow + 2);*/

			int idRoom = team.getIdRoom();// 关卡id
			int idTeam = team.getId();// 队伍id
			Struct_six_279 struct_six_279 = Config_six_279.getIns().get(idRoom);
			int hard = struct_six_279.getHard();// 难度 不入库
			// 广播发送发信息
			ChatManager.getIns().broadCast(ChatConst.LIUCHUQISHAN_NOTIC,
					new Object[] { hero.getNameZoneid(), idRoom, idTeam, hard });
			LiuChuQiShanSender.sendCmd_8210(hid, 1);
		} catch (Exception e) {
			LogTool.error(e, LiuChuQiShanManager.class, hero.getId(), hero.getName(), "broadCast has wrong!");
		}
	}

	public void leave(Hero hero, int id) {
		try {
			if (hero == null) {
				return;
			}
			if (!HeroFunction.getIns().checkSystemOpen(hero, LiuChuQiShanConst.sysId)) {
				return;
			}
			long hid = hero.getId();
			LiuChuQiShan liuChuQiShan = hero.getLiuChuQiShan();
			if (liuChuQiShan == null) {
				return;
			}
			Integer teamIDInt = TeamCache.getHidToTeamIDMap().get(hid);
			if (teamIDInt == null) {
				// 你没在队伍中
				LiuChuQiShanSender.sendCmd_8212(hid, 1);
				getTeamData(hero, id);
				return;
			}
			Team team = TeamCache.getTeamMap().get(teamIDInt);
			if (team == null) {
				// 队伍缓存异常
				LiuChuQiShanSender.sendCmd_8212(hid, 1);
				getTeamData(hero, id);
				TeamCache.removeHidToTeamIDMap(hid);
				return;
			}
			if (team.getTeamType() != LiuChuQiShanConst.sysId) {
				// 你在其他队伍
				LiuChuQiShanSender.sendCmd_8212(hid, 1);
				return;
			}

			List<Long> memberList = null;
			long leader = team.getLeader();
			if (hid == leader) {
				memberList = TeamFunction.getIns().leaveAllAndModifyTeamData(hid);
				for (long hidTemp : memberList) {
					boolean online = HeroFunction.getIns().isOnline(hidTemp);
					if (online) {
						Hero heroTemp = HeroCache.getHero(hidTemp);
						getTeamData(heroTemp, id);
						// 队伍已解散
						LiuChuQiShanSender.sendCmd_8212(hidTemp, 2);
					}
				}
			} else {
				memberList = TeamFunction.getIns().leaveAndModifyTeamData(hid);
				for (long hidMember : memberList) {
					LiuChuQiShanFunction.getIns().sendMyTeamData(hidMember, 1);// 刷新队友数据
				}
			}
			LiuChuQiShanSender.sendCmd_8212(hid, 1);
		} catch (Exception e) {
			LogTool.error(e, LiuChuQiShanManager.class, hero.getId(), hero.getName(), "leave has wrong!");
		}
	}

	public void joinByTeamID(Hero hero, int teamID, int id) {
		try {
			if (hero == null) {
				return;
			}
			if (!HeroFunction.getIns().checkSystemOpen(hero, LiuChuQiShanConst.sysId)) {
				return;
			}
			long hid = hero.getId();
			LiuChuQiShan liuChuQiShan = hero.getLiuChuQiShan();
			int numHelpAwards = liuChuQiShan.getNumHelpAwards();
			if (numHelpAwards <= 0) {
				// 今日帮助次数已用尽
				LiuChuQiShanSender.sendCmd_8214(hid, 7);
				return;
			}
			int chackInTeam = TeamFunction.getIns().chackInTeam(hero.getId(), LiuChuQiShanConst.sysId);
			if (chackInTeam == TeamConst.HERO_HAD_TEAM_OTHER_TYPE) {
				TeamFunction.getIns().leaveByType(hero.getId(), LiuChuQiShanConst.sysId, 0);
			}
			Integer teamIDInt = TeamCache.getHidToTeamIDMap().get(hero.getId());
			if (teamIDInt != null) {
				// 你已经有队伍，不能重复加入
				LiuChuQiShanSender.sendCmd_8214(hid, 2);
				LiuChuQiShanFunction.getIns().sendMyTeamData(hid, 1);// 刷新队友数据
				return;
			}
			Team teamOth = TeamCache.getTeamMap().get(teamID);
			if (teamOth == null) {
				// 队伍不存在
				LiuChuQiShanSender.sendCmd_8214(hid, 3);
				if (id != 0)
					getTeamData(hero, id);
				return;
			}
			long leader = teamOth.getLeader();
			Hero leaderHero = HeroCache.getHeroMap().get(leader);
			LiuChuQiShan leaderLiuChuQiShan = leaderHero.getLiuChuQiShan();
			int needHelpNum = leaderLiuChuQiShan.getNeedHelpNum();
			if (needHelpNum <= 0) {
				// 该玩家已经没有求助次数，不能加入
				LiuChuQiShanSender.sendCmd_8214(hid, 8);
				return;
			}
			Map<Long, TeamMember> membersOth = teamOth.getMembers();
			if (membersOth.size() >= TeamConst.TEAM_MEMBER_MAX) {
				// 队伍已满
				LiuChuQiShanSender.sendCmd_8214(hid, 4);
				int idExcel = teamOth.getIdRoom();
				getTeamData(hero, idExcel);
				return;
			}
			LiuChuQiShanBoss boss = LiuChuQiShanCache.getliuChuQiShanBossMap().get(teamID);
			if (boss != null) {
				// 队伍已进入战斗，无法加入
				LiuChuQiShanSender.sendCmd_8214(hid, 5);
				return;
			}
			int gqId = liuChuQiShan.getGqId();
			if (gqId < id && gqId != 0) {
				// 需要通关前面的副本才能打这个副本
				LiuChuQiShanSender.sendCmd_8214(hid, 6);
				return;
			}
			TeamMember member = new TeamMember(hero.getId());
			member.setType(TeamConst.TYPE_MEMBER);
			member.setName(hero.getNameZoneid());
			member.setTimeJoin(TimeDateUtil.getCurrentTime());
			membersOth.put(hero.getId(), member);
			TeamCache.setHidToTeamIDMap(hero.getId(), teamID);

			for (TeamMember temp : membersOth.values()) {
				long hidTemp = temp.getHid();
				boolean online = HeroFunction.getIns().isOnline(hidTemp);
				if (online) {
					LiuChuQiShanFunction.getIns().sendMyTeamData(hidTemp, 1);
				}
			}
			LiuChuQiShanSender.sendCmd_8214(hid, 1);

			// 同步属性
			LiuChuQiShanFunction.getIns().sendMyTeamBattleData(membersOth);
		} catch (Exception e) {
			LogTool.error(e, LiuChuQiShanManager.class, hero.getId(), hero.getName(), "joinByTeamID has wrong!");
		}
	}

	public void battle(Hero hero) {
		try {
			if (hero == null) {
				return;
			}
			long hid = hero.getId();
			Integer teamIDInt = TeamCache.getHidToTeamIDMap().get(hero.getId());
			if (teamIDInt == null) {
				// 没有队伍
				LiuChuQiShanSender.sendCmd_8216(hid, 2);
				return;
			}
			Team team = TeamCache.getTeamMap().get(teamIDInt);
			if (team == null) {
				// 两个缓存不同步，没有队伍缓存
				LiuChuQiShanSender.sendCmd_8216(hid, 3);
				return;
			}
			long leader = team.getLeader();
			if (leader != hero.getId()) {
				// 队长才能开始战斗
				LiuChuQiShanSender.sendCmd_8216(hid, 4);
				return;
			}
			Map<Long, TeamMember> members = team.getMembers();

			LiuChuQiShanBoss boss = LiuChuQiShanCache.getliuChuQiShanBossMap().get(teamIDInt);
			if (boss != null) {
				// 队伍还在战斗中
				LiuChuQiShanSender.sendCmd_8216(hid, 5);
				return;
			}

			// 初始化boss
			Struct_six_279 excel = Config_six_279.getIns().get(team.getIdRoom());
			FinalFightAttr battleFightAttr = BattleFunction.initNPC(excel.getNpc());
			long hp = battleFightAttr.getHp();
			boss = new LiuChuQiShanBoss();
			boss.setBossId(excel.getNpc());
			boss.setHpmax(hp);
			boss.setHp(hp);
			boss.setAttr(battleFightAttr);
			boss.setInvincibleTime(TimeDateUtil.getCurrentTimeInMillis() + BattleConst.ATT_WUDI_BEGIN_CONST * 1000);
			LiuChuQiShanCache.setliuChuQiShanBossMap(teamIDInt, boss);
			LiuChuQiShanFunction.getIns().initMembersBattleData(members, boss);
			// 成就树
			AchievementTreeFunction.getIns().checkTask(hero, AchievementTreeEnum.TASK_11, 1, 0);
			for (TeamMember member : members.values()) {
				long hidTemp = member.getHid();
				member.getBuffMap().clear();
				boolean online = HeroFunction.getIns().isOnline(hidTemp);
				if (online) {
					LiuChuQiShanSender.sendCmd_8216(hidTemp, 1);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, LiuChuQiShanManager.class, hero.getId(), hero.getName(), "battle has wrong!");
		}
	}

	public void leaveBattle(Hero hero) {
		try {
			if (hero == null) {
				return;
			}
			long hid = hero.getId();
			Integer teamIDInt = TeamCache.getHidToTeamIDMap().get(hid);
			if (teamIDInt == null) {
				return;
			}
			Team team = TeamCache.getTeamMap().get(teamIDInt);
			if (team == null) {
				TeamCache.removeHidToTeamIDMap(hid);
				return;
			}
			if (team.getTeamType() != LiuChuQiShanConst.sysId) {
				return;
			}

			LiuChuQiShanFunction.getIns().death(teamIDInt, hero.getId(), hero.getId());

			List<Long> memberList = TeamFunction.getIns().leaveAndModifyTeamData(hid);
			for (long hidMember : memberList) {
				LiuChuQiShanFunction.getIns().sendMyTeamData(hidMember, 2);// 刷新队友数据
			}
			int id = team.getIdRoom();
			leave(hero, id);
		} catch (Exception e) {
			LogTool.error(e, LiuChuQiShanManager.class, hero.getId(), hero.getName(), "leaveBattle has wrong!");
		}
	}

	/**
	 * 扫荡
	 */
	public void saoDang(Hero hero) {
		try {
			if (hero == null) {
				return;
			}
			LiuChuQiShan liuChuQiShan = hero.getLiuChuQiShan();
			List<int[]> dropArr = new ArrayList<int[]>();
			List<Object[]> dropTips = new ArrayList<Object[]>();
			int saoDangNum = liuChuQiShan.getSaoDangNum();
			if (saoDangNum <= 0) {
				// 没扫荡次数
				LiuChuQiShanSender.sendCmd_8226(hero.getId(), 2, dropTips.toArray());
				return;
			}
			int gqId = liuChuQiShan.getGqId();
			List<Struct_six_279> sortList = Config_six_279.getIns().getSortList();
			int guanqiaId = sortList.get(0).getId();
			if (gqId == guanqiaId) {
				// 首关都未通关，不能扫荡
				LiuChuQiShanSender.sendCmd_8226(hero.getId(), 3, dropTips.toArray());
				return;
			}
			for (Struct_six_279 six_279 : sortList) {
				int id = six_279.getId();
				if (gqId <= id) {
					// 未通关，不发奖励
					break;
				}
				if (liuChuQiShan.getPassSet().contains(id)) {
					// 今天才首通的不发奖励
					continue;
				}
				List<ProbabilityEventModel> pelist = LiuChuQiShanCache.getBossAwardsMap().get(id);
				int size = pelist.size();
				List<Object[]> dropTips2 = new ArrayList<Object[]>();
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
								dropTips2.add(new Object[] { js[0], js[1], js[2], GlobalConst.YTPE_0_WAI });
							}
						} else {
							dropArr.add(js);
							dropTips2.add(new Object[] { js[0], js[1], js[2], GlobalConst.YTPE_0_WAI });
						}
					}
				}
				dropTips.add(new Object[] { id, dropTips2.toArray() });
			}

			if (dropTips.size() == 0) {
				// 无可扫荡副本(今天才首通扫荡没有奖励)
				LiuChuQiShanSender.sendCmd_8226(hero.getId(), 4, dropTips.toArray());
				LiuChuQiShanManager.getIns().openUI(hero);
				return;
			}
			liuChuQiShan.setSaoDangNum(saoDangNum - 1);
			// 成就树
			AchievementTreeFunction.getIns().checkTask(hero, AchievementTreeEnum.TASK_11, 1, 0);
			int[][] drops = new int[dropArr.size()][];
			dropArr.toArray(drops);
			UseAddUtil.add(hero, drops, SourceGoodConst.LIUCHUQISHAN_SAODANG, UseAddUtil.getDefaultMail(), true);
			LiuChuQiShanManager.getIns().openUI(hero);
			LiuChuQiShanSender.sendCmd_8226(hero.getId(), 1, dropTips.toArray());
		} catch (Exception e) {
			LogTool.error(e, LiuChuQiShanManager.class, hero.getId(), hero.getName(), "saoDang has wrong!");
		}
	}

}
