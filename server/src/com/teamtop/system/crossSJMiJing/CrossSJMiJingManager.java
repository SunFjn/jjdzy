package com.teamtop.system.crossSJMiJing;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossFunction;
import com.teamtop.cross.CrossZone;
import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.battle.BattleConst;
import com.teamtop.system.battle.BattleFunction;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.crossSJMiJing.cross.CrossSJMiJingCrossToLocal;
import com.teamtop.system.crossSJMiJing.cross.CrossSJMiJingLocalToCross;
import com.teamtop.system.crossSJMiJing.model.CrossSJMiJing;
import com.teamtop.system.crossSJMiJing.model.CrossSJMiJingBoss;
import com.teamtop.system.daytask.DayTaskConst;
import com.teamtop.system.daytask.DayTaskFunction;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.team.TeamCache;
import com.teamtop.system.team.TeamConst;
import com.teamtop.system.team.TeamFunction;
import com.teamtop.system.team.model.Team;
import com.teamtop.system.team.model.TeamMember;
import com.teamtop.system.weekCard.WeekCardFunction;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_sjmj_258;
import excel.config.Config_sjmjfb_258;
import excel.config.Config_zhuangbei_204;
import excel.struct.Struct_sjmj_258;
import excel.struct.Struct_sjmjfb_258;
import excel.struct.Struct_zhuangbei_204;

public class CrossSJMiJingManager {
	private static CrossSJMiJingManager ins = null;

	public static CrossSJMiJingManager getIns() {
		if (ins == null) {
			ins = new CrossSJMiJingManager();
		}
		return ins;
	}

	public void openUI(Hero hero) {
		CrossSJMiJing crossSJMiJing = hero.getCrossSJMiJing();
		List<Object[]> sendData = new ArrayList<>();
		Map<Integer, Integer> miJingIDMap = crossSJMiJing.getMiJingIDMap();
		Map<Integer, Integer> saoDangMap = crossSJMiJing.getSaoDangMap();
		Iterator<Entry<Integer, Integer>> iterator = miJingIDMap.entrySet().iterator();
		int weekCardAdd = WeekCardFunction.getIns().getMJMopUp(hero);
		int totalNum = CrossSJMiJingConst.SAO_DANG_NUM + weekCardAdd;
		List<Struct_sjmj_258> sortList = Config_sjmj_258.getIns().getSortList();
		Set<Integer> ownType = new HashSet<>();
		while (iterator.hasNext()) {
			Entry<Integer, Integer> next = iterator.next();
			Integer mjID = next.getKey();
			int typeByID = CrossSJMiJingFunction.getIns().getTypeByID(mjID);
			Integer num = saoDangMap.get(typeByID);
			num = num == null ? 0 : num;
			sendData.add(new Object[] { typeByID, mjID, totalNum - num });
			ownType.add(typeByID);
		}
		int size = sortList.size();
		for (int i = 0; i < size; i++) {
			int typeId = sortList.get(i).getId();
			if (ownType.contains(typeId)) {
				continue;
			}
			sendData.add(new Object[] { typeId, 0, totalNum });
		}

		List<Object[]> sendData2 = new ArrayList<>();
		Map<Integer, Integer> boxMap = crossSJMiJing.getBoxMap();
		Iterator<Entry<Integer, Integer>> iterator2 = boxMap.entrySet().iterator();
		while (iterator2.hasNext()) {
			Entry<Integer, Integer> next = iterator2.next();
			Integer mjID = next.getKey();
			Integer state = next.getValue();
			if (state == CrossSJMiJingConst.STATE_GET) {
				sendData2.add(new Object[] { mjID });
			}
		}
		CrossSJMiJingSender.sendCmd_3762(hero.getId(), sendData.toArray(), sendData2.toArray());
	}

	public void getMiJingTeamData(Hero hero, int id) {
		List<Object[]> sendData = new ArrayList<Object[]>();
		if (!CrossZone.isCrossServer()) {
			// 请连跨服
//			CrossSJMiJingSender.sendCmd_3764(hero.getId(), 2, id, sendData.toArray());
			return;
		}
		Struct_sjmjfb_258 excelMJ = Config_sjmjfb_258.getIns().get(id);
		if (excelMJ == null) {
			// 副本不存在
			CrossSJMiJingSender.sendCmd_3764(hero.getId(), 3, id, sendData.toArray());
			return;
		}
		int type = CrossSJMiJingFunction.getIns().getTypeByID(id);
		Struct_sjmj_258 excelType = Config_sjmj_258.getIns().get(type);
		int lvOpen = excelType.getLv();
		int level = hero.getRealLevel();
		if (lvOpen > level) {
			// 等级不足
			CrossSJMiJingSender.sendCmd_3764(hero.getId(), 4, id, sendData.toArray());
			return;
		}
		int chackInTeam = TeamFunction.getIns().chackInTeam(hero.getId(), SystemIdConst.CROSS_S_J_MI_JING);
		if (chackInTeam == TeamConst.HERO_HAD_TEAM_OTHER_TYPE) {// 强行退出其他队伍
			TeamFunction.getIns().leaveByType(hero.getId(), SystemIdConst.CROSS_S_J_MI_JING, 0);
		}
		Integer teamIDInt = TeamCache.getHidToTeamIDMap().get(hero.getId());
		if (teamIDInt != null) {
			// 你已经有队伍，不能重复加入
			CrossSJMiJingFunction.getIns().sendMyTeamData(hero.getId(), 1);// 刷新队友数据
			return;
		}

		int partId = CrossCache.getPartId(hero.getZoneid());
		ConcurrentHashMap<Integer, Team> teamMap = TeamFunction.getIns().getTeamMapByID(TeamConst.TEAM_SHOW_MAX, id,
				SystemIdConst.CROSS_S_J_MI_JING, TeamConst.TEAM_MEMBER_MAX, partId);
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
		CrossSJMiJingSender.sendCmd_3764(hero.getId(), 1, id, sendData.toArray());
	}

	public void buildTeam(Hero hero, int id) {
		if (!CrossZone.isCrossServer()) {
			// 请连跨服
//			CrossSJMiJingSender.sendCmd_3766(hero.getId(), 5, 0, id, new Object[]{});
			return;
		}

		Struct_sjmjfb_258 excelMJ = Config_sjmjfb_258.getIns().get(id);
		if (excelMJ == null) {
			// 副本不存在
			CrossSJMiJingSender.sendCmd_3766(hero.getId(), 3, 0, id, new Object[] {});
			return;
		}

		int type = CrossSJMiJingFunction.getIns().getTypeByID(id);
		Struct_sjmj_258 excelType = Config_sjmj_258.getIns().get(type);
		int lvOpen = excelType.getLv();
		int level = hero.getRealLevel();
		if (lvOpen > level) {
			// 等级不足
			CrossSJMiJingSender.sendCmd_3766(hero.getId(), 4, 0, id, new Object[] {});
			return;
		}

		int chackInTeam = TeamFunction.getIns().chackInTeam(hero.getId(), SystemIdConst.CROSS_S_J_MI_JING);
		if (chackInTeam == TeamConst.HERO_HAD_TEAM_OTHER_TYPE) {// 强行退出其他队伍
			TeamFunction.getIns().leaveByType(hero.getId(), SystemIdConst.CROSS_S_J_MI_JING, 0);
		}
		int miJingNextID = CrossSJMiJingFunction.getIns().getMiJingNextID(hero, id);
		if (miJingNextID < id && miJingNextID!=0) {
			// 需要通关前面的副本才能打这个副本
			CrossSJMiJingSender.sendCmd_3766(hero.getId(), 7, 0, id, new Object[] {});
			return;
		}
		CrossSJMiJing crossSJMiJing = hero.getCrossSJMiJing();
		Map<Integer, Integer> saoDangMap = crossSJMiJing.getSaoDangMap();
		if (miJingNextID > id||miJingNextID==0) {
			int weekCardAdd = WeekCardFunction.getIns().getMJMopUp(hero);
			int totalNum = CrossSJMiJingConst.SAO_DANG_NUM + weekCardAdd;
			// 该副本已通关，创建队伍 使用扫荡次数
			Integer numSaoDang = saoDangMap.get(type);
			numSaoDang = numSaoDang == null ? 0 : numSaoDang;
			if (totalNum - numSaoDang <= 0) {
				// 没扫荡次数
				return;
			}
		}
		ConcurrentHashMap<Long, Integer> hidToTeamIDMap = TeamCache.getHidToTeamIDMap();
		Integer teamIDInt = hidToTeamIDMap.get(hero.getId());
		if (teamIDInt != null) {
			// 你已经有队伍，不能重复加入
			CrossSJMiJingFunction.getIns().sendMyTeamData(hero.getId(), 1);
			return;
		}

		boolean checkJie = CrossSJMiJingFunction.getIns().checkJie(hero, id);
		if (!checkJie) {
			// 阶数不足
			CrossSJMiJingSender.sendCmd_3766(hero.getId(), 8, 0, id, new Object[] {});
			return;
		}

		TeamMember member = new TeamMember(hero.getId());
		member.setType(TeamConst.TYPE_MEMBER);
		member.setName(hero.getNameZoneid());
		member.setTimeJoin(TimeDateUtil.getCurrentTime());

		Map<Long, TeamMember> members = null;
//		CrossSJMiJing crossSJMiJing = hero.getCrossSJMiJing();
//		int timeBuilTeam = crossSJMiJing.getTimeBuilTeam();
//		int timeNow = TimeDateUtil.getCurrentTime();
//		if(timeBuilTeam > timeNow) {
//			//操作太频繁
//			CrossSJMiJingSender.sendCmd_3766(hero.getId(), 6, 0, id, new Object[]{});
//			return;
//		}
//		crossSJMiJing.setTimeBuilTeam(timeNow+2);

		int teamID = TeamCache.getTeamId();
		int partId = CrossCache.getPartId(hero.getZoneid());
		Team team = new Team(teamID, TimeDateUtil.getCurrentTime(), SystemIdConst.CROSS_S_J_MI_JING, partId);
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
				CrossSJMiJingFunction.getIns().sendMyTeamData(hero.getId(), 1);
			}
		}
	}

	public void removeMember(Hero hero, long hidOth) {
		long hid = hero.getId();
		if (!CrossZone.isCrossServer()) {
			// 请访问中央服
//			CrossSJMiJingSender.sendCmd_3768(hid, 6);
			return;
		}
		Integer teamIDInt = TeamCache.getHidToTeamIDMap().get(hid);
		if (teamIDInt == null) {
			// 你没在队伍中
			CrossSJMiJingSender.sendCmd_3768(hid, 2);
			return;
		}
		Team team = TeamCache.getTeamMap().get(teamIDInt);
		if (team == null) {
			// 队伍缓存异常
			CrossSJMiJingSender.sendCmd_3768(hid, 3);
			return;
		}
		long leader = team.getLeader();
		if (hid != leader) {
			// 你不是队长
			CrossSJMiJingSender.sendCmd_3768(hid, 4);
			return;
		}
		Map<Long, TeamMember> members = team.getMembers();
		TeamMember memberOth = members.get(hidOth);
		if (memberOth == null) {
			// 该队员不存在
			CrossSJMiJingSender.sendCmd_3768(hid, 5);
			return;
		}

		List<Long> reflashHidList = TeamFunction.getIns().leaveAndModifyTeamData(teamIDInt, hidOth);
		boolean online = HeroFunction.getIns().isOnline(hidOth);
		if (online) {
			Hero heroOth = HeroCache.getHero(hidOth);
			getMiJingTeamData(heroOth, team.getIdRoom());
		}
		if (hidOth != hid) {
			// 提示玩家被踢出队伍
			CrossSJMiJingSender.sendCmd_3768(hidOth, 7);
		}

		// 刷新队伍数据
		for (long hidTemp : reflashHidList) {
			boolean onlineTemp = HeroFunction.getIns().isOnline(hidTemp);
			if (onlineTemp) {
				CrossSJMiJingFunction.getIns().sendMyTeamData(hidTemp, 1);
			}
		}
		CrossSJMiJingSender.sendCmd_3768(hid, 1);
	}

	public void broadCast(Hero hero) {
		if (!CrossZone.isCrossServer()) {
			return;
		}
		long hid = hero.getId();
		Integer teamIDInt = TeamCache.getHidToTeamIDMap().get(hid);
		if (teamIDInt == null) {
			// 你没在队伍中
			CrossSJMiJingSender.sendCmd_3770(hid, 2);
			return;
		}
		Team team = TeamCache.getTeamMap().get(teamIDInt);
		if (team == null) {
			// 队伍缓存异常
			CrossSJMiJingSender.sendCmd_3770(hid, 3);
			return;
		}
		long leader = team.getLeader();
		if (hid != leader) {
			// 你不是队长
			CrossSJMiJingSender.sendCmd_3770(hid, 4);
			return;
		}
		Map<Long, TeamMember> members = team.getMembers();
		int size = members.size();
		if (size >= TeamConst.TEAM_MEMBER_MAX) {
			// 队员已满
			CrossSJMiJingSender.sendCmd_3770(hid, 5);
			return;
		}
		CrossSJMiJing crossSJMiJing = hero.getCrossSJMiJing();
		int timeBuilTeam = crossSJMiJing.getTimeBuilTeam();
		int timeNow = TimeDateUtil.getCurrentTime();
		if (timeBuilTeam > timeNow) {
			// 操作太频繁
			CrossSJMiJingSender.sendCmd_3770(hid, 6);
			return;
		}
		crossSJMiJing.setTimeBuilTeam(timeNow + 2);

		int idRoom = team.getIdRoom();
		int idTeam = team.getId();
		int zoneid = hero.getBelongZoneid();
		int partId = CrossCache.getPartId(zoneid);
		// 跨服频道发信息
		CrossSJMiJingCrossToLocal.getIns().sendNewTeamDataCL(idRoom, idTeam, hero.getNameZoneid(), partId);
		CrossSJMiJingSender.sendCmd_3770(hid, 1);
	}

	public void leave(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		if (!CrossZone.isCrossServer()) {
			// 请访问中央服
//			CrossSJMiJingSender.sendCmd_3772(hid, 2);
			return;
		}
		CrossSJMiJing crossSJMiJing = hero.getCrossSJMiJing();
		if (crossSJMiJing == null) {
			return;
		}
		int id = Math.max(1001, crossSJMiJing.getFristId());
		Integer teamIDInt = TeamCache.getHidToTeamIDMap().get(hid);
		if (teamIDInt == null) {
			// 你没在队伍中
			CrossSJMiJingSender.sendCmd_3772(hid, 1);
			getMiJingTeamData(hero, id);
			return;
		}
		Team team = TeamCache.getTeamMap().get(teamIDInt);
		if (team == null) {
			// 队伍缓存异常
			CrossSJMiJingSender.sendCmd_3772(hid, 1);
			getMiJingTeamData(hero, id);
			TeamCache.removeHidToTeamIDMap(hid);
			return;
		}
		if (team.getTeamType() != SystemIdConst.CROSS_S_J_MI_JING) {
			// 你在其他队伍
			CrossSJMiJingSender.sendCmd_3772(hid, 1);
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
					getMiJingTeamData(heroTemp, id);
					// 队伍已解散
					CrossSJMiJingSender.sendCmd_3772(hidTemp, 3);
				}
			}
		} else {
			memberList = TeamFunction.getIns().leaveAndModifyTeamData(hid);
			for (long hidMember : memberList) {
				CrossSJMiJingFunction.getIns().sendMyTeamData(hidMember, 1);// 刷新队友数据
			}
		}
		CrossSJMiJingSender.sendCmd_3772(hid, 1);
	}

	public void joinByTeamID(Hero hero, int teamID, int id) {
		long hid = hero.getId();
		if (!CrossZone.isCrossServer()) {
			// 请访问中央服
//			CrossSJMiJingSender.sendCmd_3774(hid, 7);
			return;
		}
		int chackInTeam = TeamFunction.getIns().chackInTeam(hero.getId(), SystemIdConst.CROSS_S_J_MI_JING);
		if (chackInTeam == TeamConst.HERO_HAD_TEAM_OTHER_TYPE) {
			TeamFunction.getIns().leaveByType(hero.getId(), SystemIdConst.CROSS_S_J_MI_JING, 0);
		}
		Integer teamIDInt = TeamCache.getHidToTeamIDMap().get(hero.getId());
		if (teamIDInt != null) {
			// 你已经有队伍，不能重复加入
			CrossSJMiJingSender.sendCmd_3774(hid, 2);
			CrossSJMiJingFunction.getIns().sendMyTeamData(hid, 1);// 刷新队友数据
			return;
		}
		Team teamOth = TeamCache.getTeamMap().get(teamID);
		if (teamOth == null) {
			// 队伍不存在
			CrossSJMiJingSender.sendCmd_3774(hid, 3);
			if (id != 0)
				getMiJingTeamData(hero, id);
			return;
		}
		Map<Long, TeamMember> membersOth = teamOth.getMembers();
		if (membersOth.size() >= TeamConst.TEAM_MEMBER_MAX) {
			// 队伍已满
			CrossSJMiJingSender.sendCmd_3774(hid, 4);
			int idExcel = teamOth.getIdRoom();
			getMiJingTeamData(hero, idExcel);
			return;
		}
		CrossSJMiJingBoss boss = CrossSJMiJingCache.getCrossSJMJBossMap().get(teamID);
		if (boss != null) {
			// 队伍已进入战斗，无法加入
			CrossSJMiJingSender.sendCmd_3774(hid, 6);
			return;
		}

		int miJingNextID = CrossSJMiJingFunction.getIns().getMiJingNextID(hero, id);
		if (miJingNextID < id && miJingNextID!=0) {
			// 需要通关前面的副本才能打这个副本
			CrossSJMiJingSender.sendCmd_3774(hid, 8);
			return;
		}
		boolean checkJie = CrossSJMiJingFunction.getIns().checkJie(hero, id);
		if (!checkJie) {
			// 阶数不足
			CrossSJMiJingSender.sendCmd_3774(hid, 9);
			return;
		}

		int type = CrossSJMiJingFunction.getIns().getTypeByID(id);
		Struct_sjmj_258 excelType = Config_sjmj_258.getIns().get(type);
		int lvOpen = excelType.getLv();
		int level = hero.getRealLevel();
		if (lvOpen > level) {
			// 等级不足
			CrossSJMiJingSender.sendCmd_3774(hid, 5);
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
				CrossSJMiJingFunction.getIns().sendMyTeamData(hidTemp, 1);
			}
		}
		CrossSJMiJingSender.sendCmd_3774(hid, 1);

		// 同步130属性
		CrossSJMiJingFunction.getIns().sendMyTeamBattleData(membersOth);
	}

	public void battle(Hero hero) {
		long hid = hero.getId();
		if (!CrossZone.isCrossServer()) {
			// 请访问中央服
//			CrossSJMiJingSender.sendCmd_3776(hid, 5);
			return;
		}
		Integer teamIDInt = TeamCache.getHidToTeamIDMap().get(hero.getId());
		if (teamIDInt == null) {
			// 没有队伍
			CrossSJMiJingSender.sendCmd_3776(hid, 2);
			return;
		}
		Team team = TeamCache.getTeamMap().get(teamIDInt);
		if (team == null) {
			// 两个缓存不同步，没有队伍缓存
			CrossSJMiJingSender.sendCmd_3776(hid, 3);
			return;
		}
		long leader = team.getLeader();
		if (leader != hero.getId()) {
			// 队长才能开始战斗
			CrossSJMiJingSender.sendCmd_3776(hid, 4);
			return;
		}
		Map<Long, TeamMember> members = team.getMembers();

		CrossSJMiJingBoss boss = CrossSJMiJingCache.getCrossSJMJBossMap().get(teamIDInt);
		if (boss != null) {
			// 队伍还在战斗中
			CrossSJMiJingSender.sendCmd_3776(hid, 4);
			return;
		}

		// 初始化boss
		Struct_sjmjfb_258 excel = Config_sjmjfb_258.getIns().get(team.getIdRoom());
		FinalFightAttr battleFightAttr = BattleFunction.initNPC(excel.getBoss());
		long hp = battleFightAttr.getHp();
		boss = new CrossSJMiJingBoss();
		boss.setBossId(excel.getBoss());
		boss.setHpmax(hp);
		boss.setHp(hp);
		boss.setAttr(battleFightAttr);
		boss.setInvincibleTime(TimeDateUtil.getCurrentTimeInMillis() + BattleConst.ATT_WUDI_BEGIN_CONST * 1000);
		CrossSJMiJingCache.setCrossSJMJBossMap(teamIDInt, boss);
		CrossSJMiJingFunction.getIns().initMembersBattleData(members, boss);

		for (TeamMember member : members.values()) {
			long hidTemp = member.getHid();
			member.getBuffMap().clear();
			boolean online = HeroFunction.getIns().isOnline(hidTemp);
			if (online) {
				CrossSJMiJingSender.sendCmd_3776(hidTemp, 1);
				CrossSJMiJingCrossToLocal.getIns().battleCL(hidTemp);
			}
		}
	}

	public void loginCross(Hero hero, int id, int teamID) {
		if (CrossZone.isCrossServer()) {
			return;
		}
		boolean checkSystemOpen = HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.CROSS_S_J_MI_JING);
		if (!checkSystemOpen) {
			LogTool.info("loginCross.sjmj 系统未开启。hid:" + hero.getId(), this);
			return;
		}

		Struct_sjmjfb_258 excelMJ = Config_sjmjfb_258.getIns().get(id);
		if (excelMJ == null) {
			// 副本不存在
			CrossSJMiJingSender.sendCmd_3778(hero.getId(), 2);
			return;
		}

		int type = CrossSJMiJingFunction.getIns().getTypeByID(id);
		Struct_sjmj_258 excelType = Config_sjmj_258.getIns().get(type);
		int lvOpen = excelType.getLv();
		int level = hero.getRealLevel();
		if (lvOpen > level) {
			// 等级不足
			CrossSJMiJingSender.sendCmd_3778(hero.getId(), 3);
			return;
		}

		int miJingNextID = CrossSJMiJingFunction.getIns().getMiJingNextID(hero, id);
		if (id > miJingNextID &&miJingNextID!=0) {
			// 需要通关前面的副本才能打这个副本
			CrossSJMiJingSender.sendCmd_3778(hero.getId(), 4);
			return;
		}

		boolean checkJie = CrossSJMiJingFunction.getIns().checkJie(hero, id);
		if (!checkJie) {
			// 阶数不足
			CrossSJMiJingSender.sendCmd_3778(hero.getId(), 6);
			return;
		}

		CrossSJMiJing crossSJMiJing = hero.getCrossSJMiJing();
		crossSJMiJing.setFristId(id);
		crossSJMiJing.setTeamID(teamID);

		int timeBuilTeam = crossSJMiJing.getTimeBuilTeam();
		int timeNow = TimeDateUtil.getCurrentTime();
		if (timeBuilTeam > timeNow) {
			// 操作太频繁
//			CrossSJMiJingSender.sendCmd_3778(hero.getId(), 5);
			return;
		}
		crossSJMiJing.setTimeBuilTeam(timeNow + 1);

		if (teamID == 0) {
			CrossFunction.askCross(hero, SystemIdConst.CROSS_S_J_MI_JING);
		} else {
			// 判断队伍是否存在
			CrossSJMiJingLocalToCross.getIns().checkTeamIDLC(hero, teamID, id);
		}
	}

	public void leaveBattle(Hero hero) {
		if (!CrossZone.isCrossServer()) {
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
		if (team.getTeamType() != SystemIdConst.CROSS_S_J_MI_JING) {
			return;
		}

		CrossSJMiJingFunction.getIns().death(teamIDInt, hero.getId(), hero.getId());

		List<Long> memberList = TeamFunction.getIns().leaveAndModifyTeamData(hid);
		for (long hidMember : memberList) {
			CrossSJMiJingFunction.getIns().sendMyTeamData(hidMember, 1);// 刷新队友数据
		}
	}

	/**
	 * （子服）扫荡 3787
	 * 
	 * @param id| 类型 0扫荡全部 扫荡1个秘境就发秘境ID| short
	 */
	public void saoDang(Hero hero, int id) {
		if (CrossZone.isCrossServer()) {
			return;
		}
		CrossSJMiJing crossSJMiJing = hero.getCrossSJMiJing();
//		Map<Integer, Integer> miJingIDMap = crossSJMiJing.getMiJingIDMap();
		Map<Integer, Integer> saoDangMap = crossSJMiJing.getSaoDangMap();

		List<int[]> dropArr = new ArrayList<int[]>();
		List<Object[]> dropTips = new ArrayList<Object[]>();
		int weekCardAdd = WeekCardFunction.getIns().getMJMopUp(hero);
		int totalNum = CrossSJMiJingConst.SAO_DANG_NUM + weekCardAdd;
		if (id != 0) {
			int typeByID = CrossSJMiJingFunction.getIns().getTypeByID(id);
			Integer numSaoDang = saoDangMap.get(typeByID);
			numSaoDang = numSaoDang == null ? 0 : numSaoDang;
			if (totalNum - numSaoDang <= 0) {
				// 没扫荡次数
				CrossSJMiJingSender.sendCmd_3788(hero.getId(), 2, dropTips.toArray());
				return;
			}
			Struct_sjmjfb_258 excelMJ = Config_sjmjfb_258.getIns().get(id);
			if (excelMJ == null) {
				// 奖励已领取
				CrossSJMiJingSender.sendCmd_3788(hero.getId(), 3, dropTips.toArray());
				return;
			}
			boolean checkMiJingBattled = CrossSJMiJingFunction.getIns().checkMiJingBattled(hero, id);
			if (!checkMiJingBattled) {
				// 未通关，不能扫荡
				CrossSJMiJingSender.sendCmd_3788(hero.getId(), 4, dropTips.toArray());
				return;
			}
			List<ProbabilityEventModel> pelist = CrossSJMiJingCache.getBossAwardsMap().get(id);
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
					//红色装备广播
					if(js[0]==GameConst.EQUIP) {
						Struct_zhuangbei_204 excelEquip = Config_zhuangbei_204.getIns().get(js[1]);
						if(excelEquip!=null) {
							int q = excelEquip.getQ();
							if(q == GameConst.RED) {
								ChatManager.getIns().broadCast(ChatConst.CROSS_S_J_MI_JING_GET_RED_EQUIP, new Object[] { hero.getName(), js[1] });
							}
						}
					}
				}
			}
			dropTips.add(new Object[] { id, dropTips2.toArray() });
			saoDangMap.put(typeByID, numSaoDang + 1);
		} else {
			Map<Integer, Integer> miJingIDMap = crossSJMiJing.getMiJingIDMap();
			Iterator<Entry<Integer, Integer>> iterator = miJingIDMap.entrySet().iterator();
			while (iterator.hasNext()) {
				Entry<Integer, Integer> next = iterator.next();
				Integer mjID = next.getKey();
				int typeByID = CrossSJMiJingFunction.getIns().getTypeByID(mjID);
				Integer numSaoDang = saoDangMap.get(typeByID);
				numSaoDang = numSaoDang == null ? 0 : numSaoDang;
				if (totalNum - numSaoDang <= 0) {
					continue;
				}
				List<Object[]> dropTips2 = new ArrayList<Object[]>();
				List<ProbabilityEventModel> pelist = CrossSJMiJingCache.getBossAwardsMap().get(mjID);
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
								dropTips2.add(new Object[] { js[0], js[1], js[2], GlobalConst.YTPE_0_WAI });
							}
						} else {
							dropArr.add(js);
							dropTips2.add(new Object[] { js[0], js[1], js[2], GlobalConst.YTPE_0_WAI });
						}
						//红色装备广播
						if(js[0]==GameConst.EQUIP) {
							Struct_zhuangbei_204 excelEquip = Config_zhuangbei_204.getIns().get(js[1]);
							if(excelEquip!=null) {
								int q = excelEquip.getQ();
								if(q == GameConst.RED) {
									ChatManager.getIns().broadCast(ChatConst.CROSS_S_J_MI_JING_GET_RED_EQUIP, new Object[] { hero.getName(), js[1] });
								}
							}
						}
					}
				}
				dropTips.add(new Object[] { mjID, dropTips2.toArray() });
				saoDangMap.put(typeByID, numSaoDang + 1);
			}
		}
		if (dropTips.size() == 0) {
			// 无可扫荡副本
			CrossSJMiJingSender.sendCmd_3788(hero.getId(), 5, dropTips.toArray());
			CrossSJMiJingManager.getIns().openUI(hero);
			return;
		}

		int[][] drops = new int[dropArr.size()][];
		dropArr.toArray(drops);
		UseAddUtil.add(hero, drops, SourceGoodConst.CROSS_S_J_MI_JING_SAO_DANG, UseAddUtil.getDefaultMail(), true);
//		GlobalSender.sendCmd_262(hero.getId(), 1, dropTips.toArray());
		CrossSJMiJingManager.getIns().openUI(hero);
		CrossSJMiJingSender.sendCmd_3788(hero.getId(), 1, dropTips.toArray());
		// 每日任务
		DayTaskFunction.getIns().successDayTaskType(hero, DayTaskConst.DATTASK_TYPE23);
	}

	public void buyBox(Hero hero, int id) {
		if (CrossZone.isCrossServer()) {
			// 请访问子服
//			CrossSJMiJingSender.sendCmd_3790(hero.getId(), 2);
			return;
		}
		Struct_sjmjfb_258 excelMJ = Config_sjmjfb_258.getIns().get(id);
		if (excelMJ == null) {
			// 副本不存在
			CrossSJMiJingSender.sendCmd_3790(hero.getId(), 3);
			return;
		}
		CrossSJMiJing crossSJMiJing = hero.getCrossSJMiJing();
		Map<Integer, Integer> boxMap = crossSJMiJing.getBoxMap();
		Integer state = boxMap.get(id);
		if (state != null && state == CrossSJMiJingConst.STATE_GET) {
			// 宝箱已购买
			CrossSJMiJingSender.sendCmd_3790(hero.getId(), 4);
			return;
		}
		boolean checkMiJingBattled = CrossSJMiJingFunction.getIns().checkMiJingBattled(hero, id);
		if (!checkMiJingBattled) {
			// 关卡未通关
			CrossSJMiJingSender.sendCmd_3790(hero.getId(), 5);
			return;
		}

		int[][] money = excelMJ.getMoney();
		boolean canUse = UseAddUtil.canUse(hero, money);
		if (!canUse) {
			// 道具不足
			CrossSJMiJingSender.sendCmd_3790(hero.getId(), 6);
			return;
		}

		UseAddUtil.use(hero, money, SourceGoodConst.CROSS_S_J_MI_JING_BOX, true);
		UseAddUtil.add(hero, excelMJ.getReward4(), SourceGoodConst.CROSS_S_J_MI_JING_BOX, UseAddUtil.getDefaultMail(),
				true);
		boxMap.put(id, CrossSJMiJingConst.STATE_GET);
		CrossSJMiJingSender.sendCmd_3790(hero.getId(), 1);
	}

}
