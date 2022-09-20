package com.teamtop.system.crossRebornFB;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.CrossFunction;
import com.teamtop.cross.CrossZone;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.battle.BattleConst;
import com.teamtop.system.battle.BattleFunction;
import com.teamtop.system.crossRebornFB.model.BatterInfo;
import com.teamtop.system.crossRebornFB.model.RebornFBBoss;
import com.teamtop.system.crossRebornFB.model.RebornFBLocal;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.global.GlobalSender;
import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.team.TeamCache;
import com.teamtop.system.team.TeamConst;
import com.teamtop.system.team.TeamFunction;
import com.teamtop.system.team.model.Team;
import com.teamtop.system.team.model.TeamMember;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventUtil;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_lhfb_337;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_lhfb_337;
import excel.struct.Struct_xtcs_004;
import io.netty.channel.Channel;

public class RebornFBManager {
	private static RebornFBManager ins;

	public static RebornFBManager getIns() {
		if (ins == null) {
			ins = new RebornFBManager();
		}
		return ins;
	}

	public void openUi(Hero hero) {
		if (CrossZone.isCrossServer()) {
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.REBORN_FB)) {
			return;
		}
		RebornFBLocal local = hero.getRebornFBLocal();
		List<Object[]> battleInfo = new ArrayList<>();
		for (Struct_lhfb_337 config : Config_lhfb_337.getIns().getSortList()) {
			if (config.getId() % 10 != 1) {
				continue;
			}
			int level = config.getId() / 1000;
			BatterInfo info = local.getBatterInfoMap().get(level);
			battleInfo.add(new Object[] { level, info.getStar(), info.getTimes() });
		}

		RebornFBSender.sendCmd_11862(hero.getId(), local.getHelpNum(), battleInfo.toArray());

	}

	public void createTeam(Hero hero, int rebornLv) {
		if (!CrossZone.isCrossServer()) {
			// 请连跨服
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.REBORN_FB)) {
			return;
		}

		RebornFBLocal local = hero.getRebornFBLocal();
		int rLv = hero.getReincarnationLevel();
		Map<Integer, BatterInfo> map = local.getBatterInfoMap();
		BatterInfo info = map.get(rebornLv);
		if (info == null) {
			// 数据不存在
			RebornFBSender.sendCmd_11864(hero.getId(), 1);
			return;
		}

		Struct_lhfb_337 excel = Config_lhfb_337.getIns().get(info.getLevel() * 1000 + info.getStar());
		if (excel == null) {
			// 配置不存在
			RebornFBSender.sendCmd_11864(hero.getId(), 2);
			return;
		}
		if (rebornLv > rLv) {
			// 轮回等级不足
			RebornFBSender.sendCmd_11864(hero.getId(), 3);
			return;
		}

		int chackInTeam = TeamFunction.getIns().chackInTeam(hero.getId(), SystemIdConst.REBORN_FB);
		if (chackInTeam == TeamConst.HERO_HAD_TEAM_OTHER_TYPE) {// 强行退出其他队伍
			TeamFunction.getIns().leaveByType(hero.getId(), SystemIdConst.REBORN_FB, 0);
		}

		ConcurrentHashMap<Long, Integer> hidToTeamIDMap = TeamCache.getHidToTeamIDMap();
		Integer teamIDInt = hidToTeamIDMap.get(hero.getId());
		if (teamIDInt != null) {
			// 你已经有队伍，不能重复加入
			RebornFBSender.sendCmd_11864(hero.getId(), 4);
			return;
		}

		TeamMember member = new TeamMember(hero.getId());
		member.setType(TeamConst.TYPE_MEMBER);
		member.setName(hero.getNameZoneid());
		member.setTimeJoin(TimeDateUtil.getCurrentTime());

		Map<Long, TeamMember> members = new HashMap<Long, TeamMember>();

		int teamID = TeamCache.getTeamId();
		int partId = CrossCache.getPartId(hero.getZoneid());
		Team team = new Team(teamID, TimeDateUtil.getCurrentTime(), SystemIdConst.REBORN_FB, partId);
		team.setId(teamID);
		team.setLeader(hero.getId());
		member.setType(TeamConst.TYPE_LEADER);
		members.put(hero.getId(), member);
		team.setMembers(members);
		team.setIdRoom(rebornLv * 1000 + info.getStar());
		TeamCache.setTeamMap(teamID, team);
		TeamCache.setHidToTeamIDMap(hero.getId(), teamID);

		List<Object[]> teamInfo = RebornFBFunction.getIns().getTeamInfo(team);
		RebornFBSender.sendCmd_11866(hero.getId(), 0, hero.getId(), teamID, rebornLv, info.getStar(),
				teamInfo.toArray());

		RebornFBSender.sendCmd_11864(hero.getId(), 0);
	}

	public void joinTeam(Hero hero, int teamId) {
		if (!CrossZone.isCrossServer()) {
			// 请连跨服
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.REBORN_FB)) {
			return;
		}

		RebornFBLocal local = hero.getRebornFBLocal();
		int maxTimes = Config_xtcs_004.getIns().get(RebornFBConst.CONST_8232).getNum();
		
		if (local.getHelpNum() >= maxTimes) {
			// 协助次数已满
			RebornFBSender.sendCmd_11868(hero.getId(), 1);
			return;
		}

		int chackInTeam = TeamFunction.getIns().chackInTeam(hero.getId(), SystemIdConst.REBORN_FB);
		if (chackInTeam == TeamConst.HERO_HAD_TEAM_OTHER_TYPE) {
			TeamFunction.getIns().leaveByType(hero.getId(), SystemIdConst.REBORN_FB, 0);
		}
		Integer teamIDInt = TeamCache.getHidToTeamIDMap().get(hero.getId());
		if (teamIDInt != null) {
			// 你已经有队伍，不能重复加入
			RebornFBSender.sendCmd_11868(hero.getId(), 2);
			return;
		}
		Team teamOth = TeamCache.getTeamMap().get(teamId);
		if (teamOth == null) {
			// 队伍不存在
			RebornFBSender.sendCmd_11868(hero.getId(), 3);
			return;
		}
		Map<Long, TeamMember> membersOth = teamOth.getMembers();
		if (membersOth.size() >= TeamConst.TEAM_MEMBER_MAX) {
			// 队伍已满
			RebornFBSender.sendCmd_11868(hero.getId(), 4);
			return;
		}
		RebornFBBoss boss = RebornFBCache.getBossMap().get(teamId);
		if (boss != null) {
			// 队伍已进入战斗，无法加入
			RebornFBSender.sendCmd_11868(hero.getId(), 5);
			return;
		}

		int idRoom = teamOth.getIdRoom();
		int rebornlv = hero.getReincarnationLevel();
		if (idRoom / 1000 > rebornlv) {
			// 轮回等级不够，不能加入
			RebornFBSender.sendCmd_11868(hero.getId(), 6);
			return;
		}

		TeamMember member = new TeamMember(hero.getId());
		member.setType(TeamConst.TYPE_MEMBER);
		member.setName(hero.getNameZoneid());
		member.setTimeJoin(TimeDateUtil.getCurrentTime());
		membersOth.put(hero.getId(), member);

		TeamCache.setHidToTeamIDMap(hero.getId(), teamId);

		for (TeamMember temp : membersOth.values()) {
			long hidTemp = temp.getHid();
			boolean online = HeroFunction.getIns().isOnline(hidTemp);
			if (online) {
				List<Object[]> teamInfo = RebornFBFunction.getIns().getTeamInfo(teamOth);
				RebornFBSender.sendCmd_11866(hidTemp, 1, teamOth.getLeader(), teamOth.getId(),
						teamOth.getIdRoom() / 1000, teamOth.getIdRoom() % 10, teamInfo.toArray());
			}
		}
		RebornFBSender.sendCmd_11868(hero.getId(), 0);

		// 同步130属性
		RebornFBFunction.getIns().sendMyTeamBattleData(membersOth);
	}

	public void invitation(Hero hero) {
		if (!CrossZone.isCrossServer()) {
			// 请连跨服
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.REBORN_FB)) {
			return;
		}

		ConcurrentHashMap<Long, Integer> hidToTeamIDMap = TeamCache.getHidToTeamIDMap();
		Integer teamIDInt = hidToTeamIDMap.get(hero.getId());
		if (teamIDInt == null) {
			// 你不在队伍中
			RebornFBSender.sendCmd_11870(hero.getId(), 1);
			return;
		}

		Team team = TeamCache.getTeamById(teamIDInt);
		if (team != null) {
			long captainhid = team.getLeader();
			if (captainhid != hero.getId()) {
				// 不是队长 不能发邀请
				RebornFBSender.sendCmd_11870(hero.getId(), 2);
				return;
			} else if (team.getMembers().size() >= 3) {
				// 队伍已满人
				RebornFBSender.sendCmd_11870(hero.getId(), 3);
				return;
			}
		} else {
			// 队伍不存在
			RebornFBSender.sendCmd_11870(hero.getId(), 4);
			return;
		}

		// 广播对应区服的 对应转生区间
		int partId = CrossCache.getPartId(hero.getBelongZoneid());

		CrossData crossData = new CrossData();
		crossData.putObject(RebornFBType.data1, hero.getNameZoneid());
		crossData.putObject(RebornFBType.data2, team.getIdRoom());
		crossData.putObject(RebornFBType.data3, teamIDInt);

		ConcurrentHashMap<Channel, List<Integer>> map = CrossCache.getChannelToZoneidByPartId(partId);
		Iterator<Channel> channelSetIterator = map.keySet().iterator();
		for (; channelSetIterator.hasNext();) {
			Channel tempChannel = channelSetIterator.next();
			if (tempChannel == null) {
				continue;
			}
			NettyWrite.writeXData(tempChannel, CrossConst.CROSS_REBORN_FB_YAOQING, crossData);
		}

		RebornFBSender.sendCmd_11870(hero.getId(), 0);
	}

	public void exitTeam(Hero hero) {
		if (!CrossZone.isCrossServer()) {
			// 请连跨服
			return;
		}
		long hid = hero.getId();
//		RebornFBLocal local = hero.getRebornFBLocal();
//		if (local == null) {
//			// 数据不存在
//			return;
//		}
		Integer teamIDInt = TeamCache.getHidToTeamIDMap().get(hid);
		if (teamIDInt == null) {
			// 你没在队伍中
			RebornFBSender.sendCmd_11874(hid, 0);
			return;
		}
		Team team = TeamCache.getTeamMap().get(teamIDInt);
		if (team == null) {
			// 队伍缓存异常
			RebornFBSender.sendCmd_11874(hid, 0);
			TeamCache.removeHidToTeamIDMap(hid);
			return;
		}
		if (team.getTeamType() != SystemIdConst.REBORN_FB) {
			RebornFBSender.sendCmd_11874(hid, 0);
			return;
		}

		List<Long> memberList = RebornFBFunction.getIns().leaveAndModifyTeamData(hid);
		if (team.getLeader() == hid) {
			// 通知队友队伍解散
			List<Object[]> teamInfo = new ArrayList<>();
			for (long hidMember : team.getMembers().keySet()) {
				RebornFBSender.sendCmd_11866(hidMember, 3, team.getLeader(), team.getId(), team.getIdRoom() / 1000,
						team.getIdRoom() % 10, teamInfo.toArray());// 刷新队友数据
			}
		} else {
			List<Object[]> teamInfo = RebornFBFunction.getIns().getTeamInfo(team);
			for (long hidMember : memberList) {
				RebornFBSender.sendCmd_11866(hidMember, 2, team.getLeader(), team.getId(), team.getIdRoom() / 1000,
						team.getIdRoom() % 10, teamInfo.toArray());// 刷新队友数据
			}
		}

		RebornFBBoss boss = RebornFBCache.getBossMap().get(team.getId());
		if (boss != null) {
			// 战斗中退出的话..发送相关消息
			if (team.getLeader() == hid) {
				// 解散队伍后推送所有队员失败结算界面
				RebornFBCache.removeBossMap(team.getId());
				for (long hidMember : team.getMembers().keySet()) {
					GlobalSender.sendCmd_262(hidMember, 2, new Object[] {});
				}
			} else {
				// 推送自己失败结算界面
				// 刷新前端有人死亡
				GlobalSender.sendCmd_262(hero.getId(), 2, new Object[] {});
				RebornFBFunction.getIns().death(team.getId(), hero.getId(), 0);
			}
		}

		RebornFBSender.sendCmd_11874(hid, 0);
	}

	public void moveMeber(Hero hero, long memHid) {
		if (!CrossZone.isCrossServer()) {
			// 请连跨服
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.REBORN_FB)) {
			return;
		}

		long hid = hero.getId();
		Integer teamIDInt = TeamCache.getHidToTeamIDMap().get(hid);
		if (teamIDInt == null) {
			// 你没在队伍中
			RebornFBSender.sendCmd_11876(hid, 1);
			return;
		}
		Team team = TeamCache.getTeamMap().get(teamIDInt);
		if (team == null) {
			// 队伍缓存异常
			RebornFBSender.sendCmd_11876(hid, 2);
			return;
		}
		long leader = team.getLeader();
		if (hid != leader) {
			// 你不是队长
			RebornFBSender.sendCmd_11876(hid, 3);
			return;
		}
		Map<Long, TeamMember> members = team.getMembers();
		TeamMember memberOth = members.get(memHid);
		if (memberOth == null) {
			// 该队员不存在
			RebornFBSender.sendCmd_11876(hid, 4);
			return;
		}

		List<Long> memberList = RebornFBFunction.getIns().leaveAndModifyTeamData(memHid);
		boolean online = HeroFunction.getIns().isOnline(memHid);
		if (online) {
			// 提示玩家被踢出队伍
			RebornFBSender.sendCmd_11876(memHid, 0);
		}
		// 提示队长队员已踢出
		RebornFBSender.sendCmd_11876(hid, 0);

		// 刷新队伍数据
		for (long hidTemp : memberList) {
			List<Object[]> teamInfo = RebornFBFunction.getIns().getTeamInfo(team);
			RebornFBSender.sendCmd_11866(hidTemp, 2, team.getLeader(), team.getId(), team.getIdRoom() / 1000,
					team.getIdRoom() % 10, teamInfo.toArray());
		}
	}

	public void refreshStar(Hero hero) {
		if (!CrossZone.isCrossServer()) {
			// 请连跨服
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.REBORN_FB)) {
			return;
		}

		Integer teamIDInt = TeamCache.getHidToTeamIDMap().get(hero.getId());
		if (teamIDInt == null) {
			// 你没在队伍中
			RebornFBSender.sendCmd_11878(hero.getId(), 1, 0);
			return;
		}
		Team team = TeamCache.getTeamMap().get(teamIDInt);
		if (team == null) {
			// 队伍缓存异常
			RebornFBSender.sendCmd_11878(hero.getId(), 2, 0);
			return;
		}

		RebornFBLocal local = hero.getRebornFBLocal();
		Map<Integer, BatterInfo> map = local.getBatterInfoMap();
		BatterInfo info = map.get(team.getIdRoom() / 1000);

		Struct_lhfb_337 config = Config_lhfb_337.getIns().get(team.getIdRoom());
		if (config.getXs() == 5) {
			// 最高星级
			RebornFBSender.sendCmd_11878(hero.getId(), 3, info.getStar());
			return;
		}

		Struct_xtcs_004 excel = Config_xtcs_004.getIns().get(RebornFBConst.CONST_8230);

		if (!UseAddUtil.canUse(hero, excel.getOther())) {
			// 道具不足
			RebornFBSender.sendCmd_11878(hero.getId(), 4, info.getStar());
			return;
		}

		UseAddUtil.use(hero, excel.getOther(), SourceGoodConst.REBORN_FB_REFRESH, true);

		ProbabilityEventModel model = new ProbabilityEventModel();
		for (int[] up : config.getUp()) {
			model.addProbabilityEvent(up[1], up[0]);
		}
		int star = (int) ProbabilityEventUtil.getEventByProbability(model);
		if (star == config.getXs()) {
			// 品质不变
			if (info.getYz() >= config.getYz()) {
				// 变下一档品质
				if (star != 5) {
					star++;
				}
				info.setYz(0);
			} else {
				info.setYz(info.getYz() + config.getAddyz());
			}
		} else {
			info.setYz(0);
		}
		info.setStar(star);
		team.setIdRoom(team.getIdRoom() / 1000 * 1000 + info.getStar());

		for (TeamMember temp : team.getMembers().values()) {
			long hidTemp = temp.getHid();
			boolean online = HeroFunction.getIns().isOnline(hidTemp);
			if (online) {
				List<Object[]> teamInfo = RebornFBFunction.getIns().getTeamInfo(team);
				RebornFBSender.sendCmd_11866(hidTemp, 4, team.getLeader(), team.getId(), team.getIdRoom() / 1000,
						team.getIdRoom() % 10, teamInfo.toArray());
			}
		}
		
		RebornFBFunction.getIns().saveBattleDataCL(hero, local, null, null);
		
		RebornFBSender.sendCmd_11878(hero.getId(), 0, info.getStar());
	}

	public void battle(Hero hero) {
		if (!CrossZone.isCrossServer()) {
			return;
		}
		Integer teamIDInt = TeamCache.getHidToTeamIDMap().get(hero.getId());
		if (teamIDInt == null) {
			// 没有队伍
			RebornFBSender.sendCmd_11882(hero.getId(), 1);
			return;
		}
		Team team = TeamCache.getTeamMap().get(teamIDInt);
		if (team == null) {
			// 两个缓存不同步，没有队伍缓存
			RebornFBSender.sendCmd_11882(hero.getId(), 2);
			return;
		}
		long leader = team.getLeader();
		if (leader != hero.getId()) {
			// 队长才能开始战斗
			RebornFBSender.sendCmd_11882(hero.getId(), 3);
			return;
		}
		Map<Long, TeamMember> members = team.getMembers();

		// 初始化boss
		Struct_lhfb_337 excel = Config_lhfb_337.getIns().get(team.getIdRoom());
		FinalFightAttr battleFightAttr = BattleFunction.initNPC(excel.getBoss());
		long hp = battleFightAttr.getHp();
		RebornFBBoss boss = new RebornFBBoss();
		boss.setBossId(excel.getBoss());
		boss.setHpmax(hp);
		boss.setHp(hp);

		boss.setAttr(battleFightAttr);
		boss.setInvincibleTime(TimeDateUtil.getCurrentTimeInMillis() + BattleConst.ATT_WUDI_BEGIN_CONST * 1000);
		RebornFBCache.setBossMap(teamIDInt, boss);
		RebornFBFunction.getIns().initMembersBattleData(members, boss);

		for (TeamMember member : members.values()) {
			long hidTemp = member.getHid();
			member.getBuffMap().clear();
			boolean online = HeroFunction.getIns().isOnline(hidTemp);
			if (online) {
				RebornFBSender.sendCmd_11882(hidTemp, 0);
			}
		}
	}

	public void leaveBattle(Hero hero) {
	}

	public void loginCross(Hero hero) {
		if (CrossZone.isCrossServer()) {
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.REBORN_FB)) {
			return;
		}
		// 进入跨服
		CrossFunction.askCross(hero, SystemIdConst.REBORN_FB);
	}
}
