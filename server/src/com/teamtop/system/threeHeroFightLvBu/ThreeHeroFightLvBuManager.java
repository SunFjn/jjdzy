package com.teamtop.system.threeHeroFightLvBu;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.OpTaskConst;
import com.teamtop.synHandleCore.orderedRunnable.ThreeHeroFightLvbuRunnable;
import com.teamtop.system.NPC.NPC;
import com.teamtop.system.battle.BattleFunction;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.scene.SceneCache;
import com.teamtop.system.scene.SceneFunction;
import com.teamtop.system.team.TeamCache;
import com.teamtop.system.team.TeamConst;
import com.teamtop.system.team.TeamFunction;
import com.teamtop.system.team.model.Team;
import com.teamtop.system.team.model.TeamMember;
import com.teamtop.system.threeHeroFightLvBu.model.PersonalChaInfo;
import com.teamtop.system.threeHeroFightLvBu.model.TeamChaInfo;
import com.teamtop.system.threeHeroFightLvBu.model.ThreeHeroFightLvBu;
import com.teamtop.system.threeHeroFightLvBu.model.ThreeHeroFightLvBuBoss;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_sycs_762;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_sycs_762;
import excel.struct.Struct_syzlb_762;

public class ThreeHeroFightLvBuManager {
	
	private static ThreeHeroFightLvBuManager ins;
	
	private ThreeHeroFightLvBuManager() {
		// TODO Auto-generated constructor stub
	}
	
	public static synchronized ThreeHeroFightLvBuManager getIns() {
		if(ins==null) {
			ins = new ThreeHeroFightLvBuManager();
		}
		return ins;
	}

	public void openUI(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.THREE_HERO_FIGHT_LVBU)) {
				return;
			}
			ThreeHeroFightLvBu threeHeroFightLvBu = hero.getThreeHeroFightLvBu();
			int chaNum = threeHeroFightLvBu.getChaNum();
			int buyNum = threeHeroFightLvBu.getBuyNum();
			Integer teamId = TeamCache.getHidToTeamIDMap().get(hero.getId());
			List<Object[]> sendData = new ArrayList<>();
			int hardType = threeHeroFightLvBu.getHardType();
			if (teamId != null) {
				Team team = TeamCache.getTeamMap().get(teamId);
				if(team.getTeamType()==SystemIdConst.THREE_HERO_FIGHT_LVBU) {					
					Integer selectType = ThreeHeroFightLvBuSysCache.getTeamHardMap().get(teamId);
					ThreeHeroFightLvBuSender.sendCmd_9772(hid, chaNum, buyNum, hardType, sendData.toArray());
					Object[] myTeamData = TeamFunction.getIns().getTeamSendDataNotRobot(teamId);
					ThreeHeroFightLvBuSender.sendCmd_9774(hid, 1, teamId, hardType, myTeamData);
					return;
				}
			}
//			else {
				Set<Integer> teamIdSet = new HashSet<>();
				for (int i = 1; i <= hardType; i++) {
					Set<Integer> hardTeamIdSet = ThreeHeroFightLvBuSysCache.getHardTeamMap().get(i);
					teamIdSet.addAll(hardTeamIdSet);
				}
				ConcurrentHashMap<Integer, TeamChaInfo> teamChaMap = ThreeHeroFightLvBuSysCache.getTeamChaMap();
				ConcurrentHashMap<Integer, Team> teamMap = TeamFunction.getIns().getTeamMapByID(TeamConst.TEAM_SHOW_MAX,
						ThreeHeroFightLvBuConst.TEAM_SPE_ID, SystemIdConst.THREE_HERO_FIGHT_LVBU,
						TeamConst.TEAM_MEMBER_MAX, 0);
				Iterator<Team> iterator = teamMap.values().iterator();
				while (iterator.hasNext()) {
					Team team = iterator.next();
					int teamID = team.getId();
					if (teamChaMap.containsKey(teamID)) {
						continue;
					}
					if (!teamIdSet.contains(teamID)) {
						continue;
					}
					long leader = team.getLeader();
					Hero heroTemp = HeroCache.getHero(leader);
					if (heroTemp == null)
						continue;
					Map<Long, TeamMember> members = team.getMembers();
					Integer selectType = ThreeHeroFightLvBuSysCache.getTeamHardMap().get(teamID);
					sendData.add(new Object[] { heroTemp.getName(), teamID, heroTemp.getIcon(), heroTemp.getFrame(),
							members.size(), selectType });
					if (sendData.size() >= TeamConst.TEAM_SHOW_MAX) {
						break;
					}
				}
				ThreeHeroFightLvBuSender.sendCmd_9772(hid, chaNum, buyNum, hardType, sendData.toArray());
//			}
		} catch (Exception e) {
			LogTool.error(e, ThreeHeroFightLvBuManager.class, hid, hero.getName(), "ThreeHeroFightLvBuManager openUI");
		}
	}

	/**
	 * 创建队伍
	 * @param hero
	 * @param selectType 选择的难度
	 */
	public void createTeam(Hero hero, int selectType) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.THREE_HERO_FIGHT_LVBU)) {
				return;
			}
			int chackInTeam = TeamFunction.getIns().chackInTeam(hero.getId(), SystemIdConst.THREE_HERO_FIGHT_LVBU);
			if (chackInTeam == TeamConst.HERO_HAD_TEAM_OTHER_TYPE) {// 强行退出其他队伍
				TeamFunction.getIns().leaveByType(hero.getId(), SystemIdConst.THREE_HERO_FIGHT_LVBU, 0);
			}
			ConcurrentHashMap<Long, Integer> hidToTeamIDMap = TeamCache.getHidToTeamIDMap();
			Integer teamId = hidToTeamIDMap.get(hero.getId());
			List<Object[]> teamData = new ArrayList<>();
			ThreeHeroFightLvBu threeHeroFightLvBu = hero.getThreeHeroFightLvBu();
			int hardType = threeHeroFightLvBu.getHardType();
			if (teamId != null) {
				// 你已经有队伍，不能重复加入
				ThreeHeroFightLvBuSender.sendCmd_9774(hid, 0, 1, hardType, teamData.toArray());
				return;
			}
			if (threeHeroFightLvBu.getChaNum() <= 0) {
				if (!UseAddUtil.canUse(hero, GameConst.TOOL, 1, ThreeHeroFightLvBuConst.TOOL_ID)) {
					// 今日已无挑战次数
					ThreeHeroFightLvBuSender.sendCmd_9774(hid, 0, 2, hardType, teamData.toArray());
					return;
				}
			}
			if (selectType > hardType) {
				// 未开通改难度
				ThreeHeroFightLvBuSender.sendCmd_9774(hid, 0, 3, hardType, teamData.toArray());
				return;
			}

			TeamMember member = new TeamMember(hero.getId());
			member.setType(TeamConst.TYPE_MEMBER);
			member.setName(hero.getNameZoneid());
			member.setTimeJoin(TimeDateUtil.getCurrentTime());

			Map<Long, TeamMember> members = null;
			teamId = TeamCache.getTeamId();
			Team team = new Team(teamId, TimeDateUtil.getCurrentTime(), SystemIdConst.THREE_HERO_FIGHT_LVBU, 0);
			team.setId(teamId);
			team.setLeader(hero.getId());
			members = new HashMap<Long, TeamMember>();
			member.setType(TeamConst.TYPE_LEADER);
			members.put(hero.getId(), member);
			team.setMembers(members);
			team.setIdRoom(ThreeHeroFightLvBuConst.TEAM_SPE_ID);
			TeamCache.setTeamMap(teamId, team);
			TeamCache.setHidToTeamIDMap(hero.getId(), teamId);
			ThreeHeroFightLvBuSysCache.getTeamHardMap().put(teamId, selectType);
//			ConcurrentHashMap<Integer, Set<Integer>> hardTeamMap = ThreeHeroFightLvBuSysCache.getHardTeamMap();
//			if (hardTeamMap.get(selectType) == null) {
//				hardTeamMap.put(selectType, new HashSet<>());
//			}
			ThreeHeroFightLvBuSysCache.getHardTeamMap().get(selectType).add(teamId);

			Object[] sendData = TeamFunction.getIns().getTeamSendDataNotRobot(teamId);
			for (TeamMember temp : members.values()) {
				long hidTemp = temp.getHid();
				boolean online = HeroFunction.getIns().isOnline(hidTemp);
				if (online) {
					ThreeHeroFightLvBuSender.sendCmd_9774(hid, 1, teamId, selectType, sendData);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, ThreeHeroFightLvBuManager.class, hid, hero.getName(), "ThreeHeroFightLvBuManager createTeam");
		}
	}

	/**
	 * 新加队伍挑战信息
	 * @param teamId
	 */
	public TeamChaInfo newTeamChaInfo(int teamId, int selectType) {
		List<Struct_syzlb_762> guanqiaList = ThreeHeroFightLvBuSysCache.getHardGuanqiaMap().get(selectType);
		Struct_syzlb_762 struct_syzlb_762 = guanqiaList.get(0);
		int guanqia = struct_syzlb_762.getTgs();
		ThreeHeroFightLvBuBoss boss = ThreeHeroFightLvBuFunction.getIns().initBoss(guanqia);
		TeamChaInfo info = new TeamChaInfo(teamId, guanqia, 0, boss);
		int sceneId = struct_syzlb_762.getDt2();
		info.setSceneId(sceneId);
		ThreeHeroFightLvBuSysCache.getTeamChaMap().put(teamId, info);
		ConcurrentHashMap<Long, PersonalChaInfo> memberChaMap = info.getMemberChaMap();
		Team team = TeamCache.getTeamMap().get(teamId);
		Map<Long, TeamMember> members = team.getMembers();
		for (long memberId : members.keySet()) {
			PersonalChaInfo chaInfo = memberChaMap.get(memberId);
			if (chaInfo == null) {
				chaInfo = new PersonalChaInfo();
				Hero hero = HeroCache.getHero(memberId);
				// FinalFightAttr fightAttr = hero.getFinalFightAttr();
				FinalFightAttr fightAttr = BattleFunction.initHero(hero);
				chaInfo.setHid(memberId);
				chaInfo.setHp(fightAttr.getHpMax() + fightAttr.getHudun());
				chaInfo.setAttr(fightAttr);
				memberChaMap.put(memberId, chaInfo);
			}
		}
		return info;
	}

	/**
	 * 踢出队伍
	 * @param hero
	 * @param hidOth
	 */
	public void kickOut(Hero hero, long hidOth) {
		try {
			if (hero == null) {
				return;
			}
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.THREE_HERO_FIGHT_LVBU)) {
				return;
			}
			long hid = hero.getId();
			Integer teamId = TeamCache.getHidToTeamIDMap().get(hid);
			if (teamId == null) {
				// 你没在队伍中
				ThreeHeroFightLvBuSender.sendCmd_9776(hid, 0, 1);
				return;
			}
			Team team = TeamCache.getTeamMap().get(teamId);
			if (team == null) {
				// 队伍数据异常
				ThreeHeroFightLvBuSender.sendCmd_9776(hid, 0, 2);
				TeamCache.removeHidToTeamIDMap(hid);
				return;
			}
			long leader = team.getLeader();
			if (hid != leader) {
				// 你不是队长
				ThreeHeroFightLvBuSender.sendCmd_9776(hid, 0, 3);
				return;
			}
			Map<Long, TeamMember> members = team.getMembers();
			TeamMember memberOth = members.get(hidOth);
			if (memberOth == null) {
				// 该队员不存在
				ThreeHeroFightLvBuSender.sendCmd_9776(hid, 0, 4);
				return;
			}

			List<Long> reflashHidList = TeamFunction.getIns().leaveAndModifyTeamData(teamId, hidOth);
			boolean online = HeroFunction.getIns().isOnline(hidOth);
			if (online) {
				Hero heroOth = HeroCache.getHero(hidOth);
			}
			if (hidOth != hid) {
				// 提示玩家被踢出队伍
				ThreeHeroFightLvBuSender.sendCmd_9776(hidOth, 1, 2);
			}

			// 刷新队伍数据
			Integer hardType = ThreeHeroFightLvBuSysCache.getTeamHardMap().get(teamId);
			updateTeamInfo(teamId, reflashHidList, hardType);
			ThreeHeroFightLvBuSender.sendCmd_9776(hid, 1, 1);
		} catch (Exception e) {
			LogTool.error(e, ThreeHeroFightLvBuManager.class, hero.getId(), hero.getName(),
					"ThreeHeroFightLvBuManager kickOut, beKick=" + hidOth);
		}
	}

	public void updateTeamInfo(int teamId, long hid, int hardType) {
		Object[] sendData = TeamFunction.getIns().getTeamSendDataNotRobot(teamId);
		ThreeHeroFightLvBuSender.sendCmd_9774(hid, 2, teamId, hardType, sendData);
	}

	public void updateTeamInfo(int teamId, List<Long> reflashHidList, int hardType) {
		Object[] sendData = TeamFunction.getIns().getTeamSendDataNotRobot(teamId);
		for (long memberId : reflashHidList) {
			boolean member = HeroFunction.getIns().isOnline(memberId);
			if (member) {
				ThreeHeroFightLvBuSender.sendCmd_9774(memberId, 2, teamId, hardType, sendData);
			}
		}
	}

	/**
	 * 邀请组队
	 * @param hero
	 */
	public void broadCastInvite(Hero hero) {
		try {
			if (hero == null) {
				return;
			}
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.THREE_HERO_FIGHT_LVBU)) {
				return;
			}
			long hid = hero.getId();
			Integer teamIDInt = TeamCache.getHidToTeamIDMap().get(hid);
			if (teamIDInt == null) {
				// 你没在队伍中
				ThreeHeroFightLvBuSender.sendCmd_9778(hid, 0, 1);
				return;
			}
			Team team = TeamCache.getTeamMap().get(teamIDInt);
			if (team == null) {
				// 队伍数据异常
				ThreeHeroFightLvBuSender.sendCmd_9778(hid, 0, 2);
				TeamCache.removeHidToTeamIDMap(hid);
				return;
			}
			long leader = team.getLeader();
			if (hid != leader) {
				// 你不是队长
				ThreeHeroFightLvBuSender.sendCmd_9778(hid, 0, 3);
				return;
			}
			Map<Long, TeamMember> members = team.getMembers();
			int size = members.size();
			if (size >= TeamConst.TEAM_MEMBER_MAX) {
				// 队员已满
				ThreeHeroFightLvBuSender.sendCmd_9778(hid, 0, 4);
				return;
			}

			int idTeam = team.getId();// 队伍id
			ThreeHeroFightLvBu threeHeroFightLvBu = hero.getThreeHeroFightLvBu();
			// int hardType = threeHeroFightLvBu.getHardType();
			Integer selectType = ThreeHeroFightLvBuSysCache.getTeamHardMap().get(idTeam);
			List<Struct_syzlb_762> list = ThreeHeroFightLvBuSysCache.getHardGuanqiaMap().get(selectType);
			Struct_syzlb_762 struct_syzlb_762 = list.get(0);
			int guanqia = struct_syzlb_762.getTgs();
			// 广播发送发信息
			ChatManager.getIns().broadCast(ChatConst.THREE_HERO_FIGHT_LVBU,
					new Object[] { hero.getNameZoneid(), guanqia, idTeam });
			ThreeHeroFightLvBuSender.sendCmd_9778(hid, 1, 0);
		} catch (Exception e) {
			LogTool.error(e, ThreeHeroFightLvBuManager.class, hero.getId(), hero.getName(), "broadCast has wrong!");
		}
	}

	/**
	 * 离开队伍
	 * @param hero
	 * @param id
	 */
	public void leaveTeam(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.THREE_HERO_FIGHT_LVBU)) {
				return;
			}
			Integer teamId = TeamCache.getHidToTeamIDMap().get(hid);
			if (teamId == null) {
				// 你没在队伍中
				ThreeHeroFightLvBuSender.sendCmd_9780(hid, 0, 1);
				return;
			}
			Team team = TeamCache.getTeamMap().get(teamId);
			if (team == null) {
				// 队伍数据异常
				ThreeHeroFightLvBuSender.sendCmd_9780(hid, 0, 2);
				TeamCache.removeHidToTeamIDMap(hid);
				return;
			}
			if (team.getTeamType() != SystemIdConst.THREE_HERO_FIGHT_LVBU) {
				// 你在其他队伍
				ThreeHeroFightLvBuSender.sendCmd_9780(hid, 0, 3);
				return;
			}

			List<Long> memberList = null;
			long leader = team.getLeader();
			// if (hid == leader) {
			// memberList = TeamFunction.getIns().leaveAllAndModifyTeamData(hid);
			// for (long memberId : memberList) {
			// boolean online = HeroFunction.getIns().isOnline(memberId);
			// if (online) {
			// Hero member = HeroCache.getHero(memberId);
			//
			// // 队伍已解散
			// ThreeHeroFightLvBuSender.sendCmd_9780(memberId, 1, 0);
			// }
			// }
			// } else {
			Integer selectType = ThreeHeroFightLvBuSysCache.getTeamHardMap().get(teamId);
			memberList = TeamFunction.getIns().leaveAndModifyTeamData(hid);
			updateTeamInfo(teamId, memberList, selectType);
			if (hid == leader) {
				if (selectType != null && memberList.size() == 0) {
					ThreeHeroFightLvBuSysCache.getHardTeamMap().get(selectType).remove(teamId);
					ThreeHeroFightLvBuSysCache.getTeamHardMap().remove(teamId);
				}
			}
			// }
			ThreeHeroFightLvBuSender.sendCmd_9780(hid, 1, 0);
		} catch (Exception e) {
			LogTool.error(e, ThreeHeroFightLvBuManager.class, hero.getId(), hero.getName(), "leave has wrong!");
		}
	}

	/**
	 * 加入队伍
	 * @param hero
	 * @param teamId
	 */
	public void joinByTeamId(Hero hero, int teamId) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.THREE_HERO_FIGHT_LVBU)) {
				return;
			}

			ThreeHeroFightLvBu threeHeroFightLvBu = hero.getThreeHeroFightLvBu();
			int chaNum = threeHeroFightLvBu.getChaNum();
			if (chaNum <= 0) {
				if (!UseAddUtil.canUse(hero, GameConst.TOOL, 1, ThreeHeroFightLvBuConst.TOOL_ID)) {
					// 今日已无挑战次数
					ThreeHeroFightLvBuSender.sendCmd_9782(hid, 0, 1);
					return;
				}
			}
			int chackInTeam = TeamFunction.getIns().chackInTeam(hero.getId(), SystemIdConst.THREE_HERO_FIGHT_LVBU);
			if (chackInTeam == TeamConst.HERO_HAD_TEAM_OTHER_TYPE) {
				TeamFunction.getIns().leaveByType(hero.getId(), SystemIdConst.THREE_HERO_FIGHT_LVBU, 0);
			}
			Integer teamIDInt = TeamCache.getHidToTeamIDMap().get(hero.getId());
			if (teamIDInt != null) {
				// 你已经有队伍，不能重复加入
				ThreeHeroFightLvBuSender.sendCmd_9782(hid, 0, 2);
				// 刷新队友数据
				Integer hardType = ThreeHeroFightLvBuSysCache.getTeamHardMap().get(teamIDInt);
				updateTeamInfo(teamIDInt, hid, hardType);
				return;
			}
			Team teamOth = TeamCache.getTeamMap().get(teamId);
			if (teamOth == null) {
				// 队伍不存在
				ThreeHeroFightLvBuSender.sendCmd_9782(hid, 0, 3);
				return;
			}
			long leader = teamOth.getLeader();
			Hero leaderHero = HeroCache.getHeroMap().get(leader);

			Map<Long, TeamMember> membersOth = teamOth.getMembers();
			if (membersOth.size() >= TeamConst.TEAM_MEMBER_MAX) {
				// 队伍已满
				ThreeHeroFightLvBuSender.sendCmd_9782(hid, 0, 4);
				return;
			}
			TeamChaInfo teamChaInfo = ThreeHeroFightLvBuSysCache.getTeamChaMap().get(teamId);
			if (teamChaInfo != null) {
				// 队伍已进入战斗，无法加入
				ThreeHeroFightLvBuSender.sendCmd_9782(hid, 0, 5);
				return;
			}
			Integer selectType = ThreeHeroFightLvBuSysCache.getTeamHardMap().get(teamId);
			int hardType = threeHeroFightLvBu.getHardType();
			if (hardType < selectType) {
				// 未解锁该难度
				ThreeHeroFightLvBuSender.sendCmd_9782(hid, 0, 6);
				return;
			}

			TeamMember member = new TeamMember(hid);
			member.setType(TeamConst.TYPE_MEMBER);
			member.setName(hero.getNameZoneid());
			member.setTimeJoin(TimeDateUtil.getCurrentTime());
			membersOth.put(hid, member);
			TeamCache.setHidToTeamIDMap(hid, teamId);
			List<Long> memberList = new ArrayList<>(membersOth.keySet());
			updateTeamInfo(teamId, memberList, selectType);
			ThreeHeroFightLvBuSender.sendCmd_9782(hid, 1, 0);
			sendMyTeamBattleData(membersOth);
		} catch (Exception e) {
			LogTool.error(e, ThreeHeroFightLvBuManager.class, hero.getId(), hero.getName(),
					"ThreeHeroFightLvBuManager joinByTeamId, teamId=" + teamId);
		}
	}

	/**
	 * 队伍所有成员刷新所有成员的战斗数据
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
	 * 转让队长
	 */
	public void changeLeader(Hero hero, long memberId) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.THREE_HERO_FIGHT_LVBU)) {
				return;
			}
			if(hid==memberId) {
				//不能转让给自己
				ThreeHeroFightLvBuSender.sendCmd_9804(hid, 0, 3);
				return;
			}
			Integer teamId = TeamCache.getHidToTeamIDMap().get(hid);
			if (teamId == null) {
				// 你没在队伍中
				ThreeHeroFightLvBuSender.sendCmd_9804(hid, 0, 1);
				return;
			}
			Integer memberTeamId = TeamCache.getHidToTeamIDMap().get(memberId);
			if (memberTeamId == null) {
				// 不是队员
				ThreeHeroFightLvBuSender.sendCmd_9804(hid, 0, 5);
				return;
			}
			if (!memberTeamId.equals(teamId)) {
				// 不是队员
				ThreeHeroFightLvBuSender.sendCmd_9804(hid, 0, 5);
				return;
			}
			Team team = TeamCache.getTeamMap().get(teamId);
			if (team == null) {
				// 队伍数据异常
				ThreeHeroFightLvBuSender.sendCmd_9804(hid, 0, 2);
				TeamCache.removeHidToTeamIDMap(hid);
				return;
			}
			long leader = team.getLeader();
			if (leader != hid) {
				// 不是队长
				ThreeHeroFightLvBuSender.sendCmd_9804(hid, 0, 4);
				return;
			}
			List<Long> memberList = new ArrayList<>(team.getMembers().keySet());
			Hero member = HeroCache.getHero(memberId);
			if (member == null) {
				return;
			}
			TeamFunction.getIns().changeLeader(hero, member);
			Integer selectType = ThreeHeroFightLvBuSysCache.getTeamHardMap().get(teamId);
			updateTeamInfo(teamId, memberList, selectType);
		} catch (Exception e) {
			LogTool.error(e, ThreeHeroFightLvBuManager.class, hero.getId(), hero.getName(),
					"ThreeHeroFightLvBuManager changeLeader");
		}
	}

	/**
	 * 挑战
	 * @param hero
	 */
	public void challenge(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.THREE_HERO_FIGHT_LVBU)) {
				return;
			}
			Integer teamId = TeamCache.getHidToTeamIDMap().get(hero.getId());
			if (teamId == null) {
				// 没有队伍
				ThreeHeroFightLvBuSender.sendCmd_9784(hid, 0, 1);
				return;
			}
			Team team = TeamCache.getTeamMap().get(teamId);
			long leader = team.getLeader();
			if (hid != leader) {
				// 不是队长不能操作
				ThreeHeroFightLvBuSender.sendCmd_9784(hid, 0, 2);
				return;
			}
			if (ThreeHeroFightLvBuSysCache.getTeamChaMap().containsKey(teamId)) {
				// 已加入挑战
				return;
			}
			Map<Long, TeamMember> members = team.getMembers();
			// 检测次数
			for (long memberId : members.keySet()) {
				Hero member = HeroCache.getHero(memberId);
				if (member != null) {
					int chaNum = member.getThreeHeroFightLvBu().getChaNum();
					if (chaNum < 0) {
						if (!UseAddUtil.canUse(member, GameConst.TOOL, 1, ThreeHeroFightLvBuConst.TOOL_ID)) {
							TeamFunction.getIns().leaveAllAndModifyTeamData(hid);
							return;
						}
					}
				}
			}
			for (long memberId : members.keySet()) {
				Hero member = HeroCache.getHero(memberId);
				if (member != null) {
					int chaNum = member.getThreeHeroFightLvBu().getChaNum();
					if(member.getThreeHeroFightLvBu().getChaNum()>0) {
						int nowCha = member.getThreeHeroFightLvBu().addChaNum(-1);
						LogTool.info(memberId, "", "ThreeHeroFightLvBuManager challenge chaNum=" + nowCha,
								ThreeHeroFightLvBuManager.class);
					}else {
						if (UseAddUtil.canUse(member, GameConst.TOOL, 1, ThreeHeroFightLvBuConst.TOOL_ID)) {
							UseAddUtil.use(member, GameConst.TOOL, 1, ThreeHeroFightLvBuConst.TOOL_ID,
									SourceGoodConst.SH_LVBU_CHALLENGE, true);
						}
					}
					// SceneManager.getIns().inscene(member, sceneId);
//					ThreeHeroFightLvBuFunction.getIns().updateRedPoint(hero);
				}
			}
			int selectType = ThreeHeroFightLvBuSysCache.getTeamHardMap().get(teamId);
			TeamChaInfo info = newTeamChaInfo(teamId, selectType);
			int guanqia = info.getGuanqia();
			int sceneId = info.getSceneId();
			int sceneUnitId = SceneCache.getSceneUnitId();
			info.setSceneUnitId(sceneUnitId);
			// 创建npc
			ThreeHeroFightLvBuBoss boss = info.getBoss();
			int bossId = boss.getBossId();
			int posX = boss.getPosX();
			int posY = boss.getPosY();
			NPC npc = SceneFunction.getIns().addNpcToScene(bossId, posX, posY, -1, sceneUnitId, sceneId, true);
			boss.setNpcUid(npc.getId());
			for (long memberId : members.keySet()) {
				Hero member = HeroCache.getHero(memberId);
				if (member != null) {
					ThreeHeroFightLvBuSender.sendCmd_9784(memberId, 1, guanqia);
					ThreeHeroFightLvBuFunction.getIns().updateRedPoint(hero);
				}
			}
			LogTool.info(hid, hero.getName(), "ThreeHeroFightLvBuManager guanqia="+guanqia+", teamId="+teamId, ThreeHeroFightLvBuManager.class);
		} catch (Exception e) {
			LogTool.error(e, ThreeHeroFightLvBuManager.class, hero.getId(), hero.getName(),
					"ThreeHeroFightLvBuManager challenge");
		}
	}

	/**
	 * 进入下一关
	 * @param hero
	 */
	public void enterNext(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.THREE_HERO_FIGHT_LVBU)) {
				return;
			}
			Integer teamId = TeamCache.getHidToTeamIDMap().get(hero.getId());
			if (teamId == null) {
				// 没有队伍
				ThreeHeroFightLvBuSender.sendCmd_9786(hid, 0, 1);
				return;
			}
			Team team = TeamCache.getTeamMap().get(teamId);
			long leader = team.getLeader();
			if (hid != leader) {
				// 不是队长不能操作
				ThreeHeroFightLvBuSender.sendCmd_9786(hid, 0, 2);
				return;
			}
			OpTaskExecutorService.PublicOrderService.execute(new ThreeHeroFightLvbuRunnable() {
				
				@Override
				public void run() {
					TeamChaInfo info = ThreeHeroFightLvBuSysCache.getTeamChaMap().get(teamId);
					if(!info.isGoNext()) {
						return;
					}
					info.setGoNext(false);
					int sceneId = info.getSceneId();
					int sceneUnitId = info.getSceneUnitId();
					int guanqia = info.getGuanqia();
					ThreeHeroFightLvBuBoss boss = info.getBoss();
					int bossId = boss.getBossId();
					int posX = boss.getPosX();
					int posY = boss.getPosY();
					NPC npc = SceneFunction.getIns().addNpcToScene(bossId, posX, posY, -1, sceneUnitId, sceneId, true);
					boss.setNpcUid(npc.getId());
					LogTool.info("ThreeHeroFightLvBuManager addNpcToScene hid="+hid+", npcid=" + npc.getId()+", npcSysId="+npc.getSysId() + ", sceneUnitId="
							+ sceneUnitId, ThreeHeroFightLvBuManager.class);
					Map<Long, TeamMember> members = team.getMembers();
					for (long memberId : members.keySet()) {
						ThreeHeroFightLvBuSender.sendCmd_9786(memberId, 1, guanqia);
						Hero member = HeroCache.getHero(memberId);
						if (member != null) {
							// SceneManager.getIns().inscene(member, sceneId);
						}
					}
					LogTool.info("ThreeHeroFightLvBuManager enterNext hid="+hid+", guanqia=" + guanqia, ThreeHeroFightLvBuManager.class);
				}
				
				@Override
				public Object getSession() {
					return OpTaskConst.THREE_HERO_FIGHT_LVBU;
				}
			});
		} catch (Exception e) {
			LogTool.error(e, ThreeHeroFightLvBuManager.class, hero.getId(), hero.getName(),
					"ThreeHeroFightLvBuManager challenge");
		}
	}

	/**
	 * 点击boss挑战
	 * @param hero
	 */
	public void chaBoss(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.THREE_HERO_FIGHT_LVBU)) {
				return;
			}
			Integer teamId = TeamCache.getHidToTeamIDMap().get(hero.getId());
			if (teamId == null) {
				// 没有队伍
				ThreeHeroFightLvBuSender.sendCmd_9792(hid, 0, 1);
				return;
			}
			Team team = TeamCache.getTeamMap().get(teamId);
			long leader = team.getLeader();
			if (hid != leader) {
				// 不是队长不能操作
				ThreeHeroFightLvBuSender.sendCmd_9792(hid, 0, 2);
				return;
			}
			// TeamChaInfo info = newTeamChaInfo(teamId);
			TeamChaInfo info = ThreeHeroFightLvBuSysCache.getTeamChaMap().get(teamId);
			int guanqia = info.getGuanqia();
			Map<Long, TeamMember> members = team.getMembers();
			ConcurrentHashMap<Integer, Integer> fightingMap = ThreeHeroFightLvBuSysCache.getFightingMap();
			if (fightingMap.containsKey(teamId)) {
				return;
			}
			fightingMap.put(teamId, TimeDateUtil.getCurrentTime());
			for (TeamMember teamMember : members.values()) {
				long memberId = teamMember.getHid();
				teamMember.getBuffMap().clear();
				ThreeHeroFightLvBuSender.sendCmd_9792(memberId, 1, 0);
				LogTool.info(memberId, "", "ThreeHeroFightLvBuManager chaBoss guanqia="+guanqia, ThreeHeroFightLvBuManager.class);
			}
		} catch (Exception e) {
			LogTool.error(e, ThreeHeroFightLvBuManager.class, hero.getId(), hero.getName(),
					"ThreeHeroFightLvBuManager challenge");
		}
	}

	/**
	 * 复活
	 */
	public void relive(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.THREE_HERO_FIGHT_LVBU)) {
				return;
			}
			Integer teamId = TeamCache.getHidToTeamIDMap().get(hero.getId());
			if (teamId == null) {
				// 没有队伍
				ThreeHeroFightLvBuSender.sendCmd_9788(hid, 0, 3, "");
				return;
			}
			TeamChaInfo info = ThreeHeroFightLvBuSysCache.getTeamChaMap().get(teamId);
			int reliveNum = info.getReliveNum();
			int maxReliveNum = Config_xtcs_004.getIns().get(ThreeHeroFightLvBuConst.RELIVE_NUM_ID).getNum();
			if (reliveNum >= maxReliveNum) {
				return;
			}
			ConcurrentHashMap<Long, PersonalChaInfo> memberChaMap = info.getMemberChaMap();
			long reliveOpHid = info.getReliveOpHid();
			Team team = TeamCache.getTeamMap().get(teamId);
			Map<Long, TeamMember> members = team.getMembers();
			if (reliveOpHid > 0) {
				// 已经复活
				String opName = info.getOpName();
				if (opName == null) {
					opName = "";
				}
				for (long memberId : members.keySet()) {
					ThreeHeroFightLvBuSender.sendCmd_9788(memberId, 0, 1, opName);
				}
				return;
			}
			int[][] cost = Config_xtcs_004.getIns().get(ThreeHeroFightLvBuConst.RELIVE_COST_ID).getOther();
			if (!UseAddUtil.canUse(hero, cost)) {
				ThreeHeroFightLvBuSender.sendCmd_9788(hid, 0, 2, "");
				return;
			}
			info.setReliveNum(reliveNum + 1);
			UseAddUtil.use(hero, cost, SourceGoodConst.SH_LVBU_COST, true);
			for (TeamMember teamMember : members.values()) {
				long memberId = teamMember.getHid();
				teamMember.getBuffMap().clear();
				PersonalChaInfo chaInfo = memberChaMap.get(memberId);
				if (chaInfo != null) {
					FinalFightAttr attr = chaInfo.getAttr();
					chaInfo.setHp(attr.getHpMax() + attr.getHudun());
				}
				ThreeHeroFightLvBuSender.sendCmd_9788(memberId, 1, 0, "");
			}
		} catch (Exception e) {
			LogTool.error(e, ThreeHeroFightLvBuManager.class, hero.getId(), hero.getName(),
					"ThreeHeroFightLvBuManager relive");
		}
	}

	/**
	 * 退出副本
	 */
	public void exitCha(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.THREE_HERO_FIGHT_LVBU)) {
				return;
			}
			Integer teamId = TeamCache.getHidToTeamIDMap().get(hero.getId());
			if (teamId == null) {
				// 没有队伍
				ThreeHeroFightLvBuSender.sendCmd_9790(hid, 0, 1);
				SceneFunction.getIns().exitScene(hero, true);
				LogTool.info(hid, hero.getName(), "ThreeHeroFightLvBuManager exitCha teamId null", ThreeHeroFightLvBuManager.class);
				return;
			}
			Team team = TeamCache.getTeamById(teamId);
			int size = team.getMembers().size();
			TeamChaInfo teamChaInfo = ThreeHeroFightLvBuSysCache.getTeamChaMap().get(teamId);
			boolean checkLastLive = ThreeHeroFightLvBuFunction.getIns().checkLastLive(hid, teamId);
			ThreeHeroFightLvBuFunction.getIns().leaveTeamAtFight(hero);
			if (checkLastLive) {
				ThreeHeroFightLvBuFunction.getIns().eixtAndRemoveAllCache(teamId, teamChaInfo);
				Integer selectType = ThreeHeroFightLvBuSysCache.getTeamHardMap().remove(teamId);
				if (selectType != null) {
					ThreeHeroFightLvBuSysCache.getHardTeamMap().get(selectType).remove(teamId);
				}
			} else if (size == 1) {
				ThreeHeroFightLvBuFunction.getIns().eixtAndRemoveAllCache(teamId, teamChaInfo);
				Integer selectType = ThreeHeroFightLvBuSysCache.getTeamHardMap().remove(teamId);
				if (selectType != null) {
					ThreeHeroFightLvBuSysCache.getHardTeamMap().get(selectType).remove(teamId);
				}
			} else {
				SceneFunction.getIns().exitScene(hero, true);
			}
			ThreeHeroFightLvBuSender.sendCmd_9790(hid, 1, 0);
			LogTool.info(hid, hero.getName(), "ThreeHeroFightLvBuManager exitCha teamId="+teamId, ThreeHeroFightLvBuManager.class);
		} catch (Exception e) {
			LogTool.error(e, ThreeHeroFightLvBuManager.class, hero.getId(), hero.getName(),
					"ThreeHeroFightLvBuManager exitCha");
		}
	}

	/**
	 * 
	 * @param hero
	 */
	public void buyChaNum(Hero hero, int buyNum) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.THREE_HERO_FIGHT_LVBU)) {
				return;
			}
			if (buyNum <= 0) {
				return;
			}
			ThreeHeroFightLvBu threeHeroFightLvBu = hero.getThreeHeroFightLvBu();
			int oldBuyNum = threeHeroFightLvBu.getBuyNum();
			int index = oldBuyNum + 1;
			int newBuyNum = oldBuyNum + buyNum;
			Map<Integer, Struct_sycs_762> map = Config_sycs_762.getIns().getMap();
			if (newBuyNum > map.size()) {
				// 超出最大可购买上限
				ThreeHeroFightLvBuSender.sendCmd_9806(hid, 0, 1, 0);
				return;
			}
			List<int[]> list = new ArrayList<>();
			for (int i = index; i <= newBuyNum; i++) {
				Struct_sycs_762 struct_sycs_762 = map.get(i);
				int[][] xh = struct_sycs_762.getXh();
				list.add(xh[0]);
			}
			int[][] cost = new int[list.size()][];
			list.toArray(cost);
			if (!UseAddUtil.canUse(hero, cost)) {
				// 元宝不足
				ThreeHeroFightLvBuSender.sendCmd_9806(hid, 0, 2, 0);
				return;
			}
			UseAddUtil.use(hero, cost, SourceGoodConst.SH_LVBU_BUY_CHANUM, true);
			int newChaNum = threeHeroFightLvBu.addChaNum(buyNum);
			threeHeroFightLvBu.setBuyNum(newBuyNum);
			ThreeHeroFightLvBuSender.sendCmd_9806(hid, 1, newBuyNum, newChaNum);
		} catch (Exception e) {
			LogTool.error(e, ThreeHeroFightLvBuManager.class, hero.getId(), hero.getName(),
					"ThreeHeroFightLvBuManager buyChaNum");
		}
	}

}
